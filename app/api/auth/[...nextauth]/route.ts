// app/api/auth/[...nextauth]/route.ts
// NextAuth.js v4 — Credentials + Google OAuth

import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as any,

  providers: [
    // ── Email + Password Login ──────────────────
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        })

        if (!user || !user.password) {
          throw new Error('No account found with this email')
        }

        if (!user.isActive) {
          throw new Error('Your account has been deactivated')
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('Invalid password')
        }

        // Update last login
        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        })

        // Audit log
        await db.auditLog.create({
          data: {
            userId: user.id,
            action: 'auth.login',
            entityType: 'user',
            entityId: user.id,
          },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          plan: user.plan,
        }
      },
    }),

    // ── Google OAuth ────────────────────────────
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On sign in, add user data to token
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.plan = (user as any).plan
      }

      // On session update
      if (trigger === 'update' && session) {
        token.name = session.name
        token.role = session.role
        token.plan = session.plan
      }

      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.plan = token.plan as string
      }
      return session
    },

    async signIn({ user, account }) {
      // Allow all Google sign-ins
      if (account?.provider === 'google') {
        return true
      }
      // Allow credentials sign-in (handled in authorize)
      return true
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
    newUser: '/onboarding',
  },

  events: {
    async createUser({ user }) {
      // Send welcome email on new user creation
      console.log(`New user created: ${user.email}`)
    },
  },

  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
