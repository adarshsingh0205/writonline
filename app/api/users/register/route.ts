// app/api/users/register/route.ts
// POST /api/users/register — Create new user account

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['JUDGE', 'ADVOCATE', 'GOVERNMENT_COUNSEL', 'LAW_STUDENT', 'COURT_STAFF']).default('ADVOCATE'),
  barCouncilNo: z.string().optional(),
  phone: z.string().optional(),
  courtName: z.string().optional(),
  state: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = registerSchema.parse(body)

    // Check if email already exists
    const existing = await db.user.findUnique({
      where: { email: data.email.toLowerCase() },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)

    // Set trial end date (14 days)
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 14)

    // Create user
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
        role: data.role,
        barCouncilNo: data.barCouncilNo,
        phone: data.phone,
        courtName: data.courtName,
        state: data.state,
        plan: 'FREE',
        trialEndsAt,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        plan: true,
        createdAt: true,
      },
    })

    // Audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'auth.register',
        entityType: 'user',
        entityId: user.id,
        metadata: { role: data.role },
      },
    })

    // Create welcome notification
    await db.notification.create({
      data: {
        userId: user.id,
        title: 'Welcome to WritOnline!',
        message: 'Your 14-day free trial has started. Explore 500+ templates and 23,000+ SC precedents.',
        type: 'SUCCESS',
        link: '/dashboard',
      },
    })

    return NextResponse.json({
      success: true,
      user,
      message: 'Account created successfully',
    }, { status: 201 })

  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}
