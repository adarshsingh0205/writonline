// app/api/documents/route.ts
// GET  /api/documents — List user's documents
// POST /api/documents — Create new document

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/lib/db'
import { z } from 'zod'

// ── GET — List Documents ──────────────────────
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '20')
    const status = searchParams.get('status')
    const courtLevel = searchParams.get('courtLevel')
    const search = searchParams.get('search')
    const skip = (page - 1) * limit

    const where: any = {
      userId: session.user.id,
      isArchived: false,
    }

    if (status) where.status = status
    if (courtLevel) where.courtLevel = courtLevel
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { caseNumber: { contains: search } },
        { documentType: { contains: search } },
      ]
    }

    const [documents, total] = await Promise.all([
      db.document.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          documentType: true,
          category: true,
          courtLevel: true,
          courtName: true,
          caseNumber: true,
          status: true,
          language: true,
          urgency: true,
          createdAt: true,
          updatedAt: true,
          finalizedAt: true,
          pdfUrl: true,
          docxUrl: true,
          petitioners: true,
          respondents: true,
          _count: { select: { attachments: true } },
        },
      }),
      db.document.count({ where }),
    ])

    return NextResponse.json({
      documents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: skip + limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('GET documents error:', error)
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}

// ── POST — Create Document ────────────────────
const createDocSchema = z.object({
  title: z.string().min(1),
  documentType: z.string(),
  category: z.string(),
  courtLevel: z.enum(['SUPREME_COURT', 'HIGH_COURT', 'DISTRICT_COURT', 'TRIBUNAL', 'SPECIAL_COURT']),
  courtName: z.string(),
  bench: z.string().optional(),
  caseNumber: z.string().optional(),
  caseYear: z.string().optional(),
  filingDate: z.string().optional(),
  hearingDate: z.string().optional(),
  nextDate: z.string().optional(),
  petitioners: z.array(z.object({ name: z.string(), type: z.string() })),
  respondents: z.array(z.object({ name: z.string(), type: z.string() })),
  content: z.record(z.any()).optional(),
  language: z.enum(['ENGLISH', 'HINDI', 'BILINGUAL']).default('ENGLISH'),
  urgency: z.enum(['NORMAL', 'URGENT', 'VERY_URGENT', 'EXPARTE']).default('NORMAL'),
  statutes: z.string().optional(),
  facts: z.string().optional(),
  advocateName: z.string().optional(),
  barCouncilNo: z.string().optional(),
  advocatePhone: z.string().optional(),
  advocateEmail: z.string().optional(),
  seniorAdvocate: z.string().optional(),
  chamberId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = createDocSchema.parse(body)

    const document = await db.document.create({
      data: {
        userId: session.user.id,
        chamberId: data.chamberId,
        title: data.title,
        documentType: data.documentType,
        category: data.category,
        courtLevel: data.courtLevel,
        courtName: data.courtName,
        bench: data.bench,
        caseNumber: data.caseNumber,
        caseYear: data.caseYear,
        filingDate: data.filingDate ? new Date(data.filingDate) : undefined,
        hearingDate: data.hearingDate ? new Date(data.hearingDate) : undefined,
        nextDate: data.nextDate ? new Date(data.nextDate) : undefined,
        petitioners: data.petitioners,
        respondents: data.respondents,
        content: data.content ?? {},
        language: data.language,
        urgency: data.urgency,
        statutes: data.statutes,
        facts: data.facts,
        advocateName: data.advocateName,
        barCouncilNo: data.barCouncilNo,
        advocatePhone: data.advocatePhone,
        advocateEmail: data.advocateEmail,
        seniorAdvocate: data.seniorAdvocate,
        status: 'DRAFT',
      },
    })

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'document.create',
        entityType: 'document',
        entityId: document.id,
        metadata: { documentType: data.documentType, courtLevel: data.courtLevel },
      },
    })

    return NextResponse.json({ success: true, document }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('POST document error:', error)
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 })
  }
}
