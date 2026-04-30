// app/api/drafts/route.ts
// GET  /api/drafts — List user drafts
// POST /api/drafts — Save / auto-save draft

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/lib/db'

// GET — List Drafts
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const drafts = await db.draft.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      take: 20,
      select: {
        id: true,
        title: true,
        documentType: true,
        category: true,
        courtLevel: true,
        courtName: true,
        step: true,
        lastSavedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ drafts })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch drafts' }, { status: 500 })
  }
}

// POST — Save Draft (auto-save every 30 seconds from wizard)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, title, documentType, category, courtLevel, courtName, content, formData, step } = body

    // Set expiry 30 days from now
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    let draft

    if (id) {
      // Update existing draft
      draft = await db.draft.update({
        where: { id, userId: session.user.id },
        data: {
          title: title ?? 'Untitled Draft',
          documentType,
          category,
          courtLevel,
          courtName,
          content,
          formData,
          step: step ?? 0,
          lastSavedAt: new Date(),
          expiresAt,
        },
      })
    } else {
      // Create new draft
      draft = await db.draft.create({
        data: {
          userId: session.user.id,
          title: title ?? 'Untitled Draft',
          documentType,
          category,
          courtLevel,
          courtName,
          content,
          formData,
          step: step ?? 0,
          lastSavedAt: new Date(),
          expiresAt,
        },
      })
    }

    return NextResponse.json({ success: true, draft })
  } catch (error) {
    console.error('POST draft error:', error)
    return NextResponse.json({ error: 'Failed to save draft' }, { status: 500 })
  }
}
