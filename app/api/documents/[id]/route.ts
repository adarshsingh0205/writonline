// app/api/documents/[id]/route.ts
// GET    /api/documents/:id — Get single document
// PUT    /api/documents/:id — Update document
// DELETE /api/documents/:id — Archive document

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/lib/db'

type Params = { params: { id: string } }

// ── GET ───────────────────────────────────────
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const document = await db.document.findFirst({
      where: { id: params.id, userId: session.user.id, isArchived: false },
      include: {
        attachments: { orderBy: { order: 'asc' } },
        annotations: { orderBy: { createdAt: 'desc' } },
        versions: { orderBy: { version: 'desc' }, take: 10 },
      },
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Log view
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'document.view',
        entityType: 'document',
        entityId: document.id,
      },
    })

    return NextResponse.json({ document })
  } catch (error) {
    console.error('GET document error:', error)
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 })
  }
}

// ── PUT — Update Document ─────────────────────
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    // Get current document for version snapshot
    const current = await db.document.findFirst({
      where: { id: params.id, userId: session.user.id },
    })

    if (!current) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Save version snapshot before update
    if (body.content && JSON.stringify(body.content) !== JSON.stringify(current.content)) {
      await db.documentVersion.create({
        data: {
          documentId: params.id,
          version: current.version,
          content: current.content as any,
          changedBy: session.user.id,
          changeNote: body.changeNote ?? 'Auto-saved',
        },
      })
    }

    // Update document
    const updated = await db.document.update({
      where: { id: params.id },
      data: {
        ...body,
        version: { increment: body.content ? 1 : 0 },
        updatedAt: new Date(),
        finalizedAt: body.status === 'FINAL' ? new Date() : current.finalizedAt,
        // Remove fields that shouldn't be directly updated
        id: undefined,
        userId: undefined,
        createdAt: undefined,
        changeNote: undefined,
      },
    })

    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'document.update',
        entityType: 'document',
        entityId: params.id,
        metadata: { fields: Object.keys(body) },
      },
    })

    return NextResponse.json({ success: true, document: updated })
  } catch (error) {
    console.error('PUT document error:', error)
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 })
  }
}

// ── DELETE — Archive Document ─────────────────
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const document = await db.document.findFirst({
      where: { id: params.id, userId: session.user.id },
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Soft delete — archive instead of permanent delete
    await db.document.update({
      where: { id: params.id },
      data: { isArchived: true },
    })

    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'document.archive',
        entityType: 'document',
        entityId: params.id,
      },
    })

    return NextResponse.json({ success: true, message: 'Document archived' })
  } catch (error) {
    console.error('DELETE document error:', error)
    return NextResponse.json({ error: 'Failed to archive document' }, { status: 500 })
  }
}
