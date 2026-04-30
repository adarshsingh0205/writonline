// app/api/precedents/route.ts
// GET /api/precedents — Search and list SC precedents

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') ?? ''
    const area = searchParams.get('area')
    const year = searchParams.get('year')
    const benchMin = searchParams.get('benchMin')
    const isOverruled = searchParams.get('isOverruled')
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '20')
    const skip = (page - 1) * limit

    const where: any = {}

    if (isOverruled !== null) where.isOverruled = isOverruled === 'true'
    if (area) where.area = area
    if (year) where.year = { gte: parseInt(year) }
    if (benchMin) where.benchStrength = { gte: parseInt(benchMin) }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { citation: { contains: search } },
        { principle: { contains: search } },
        { holding: { contains: search } },
        { applicability: { contains: search } },
      ]
    }

    const [precedents, total] = await Promise.all([
      db.precedent.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ usageCount: 'desc' }, { year: 'desc' }],
      }),
      db.precedent.count({ where }),
    ])

    // Save search history
    if (search) {
      await db.searchHistory.create({
        data: {
          userId: session.user.id,
          query: search,
          type: 'precedent',
          resultsCount: total,
        },
      }).catch(() => {}) // Non-blocking
    }

    return NextResponse.json({
      precedents,
      pagination: {
        page, limit, total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET precedents error:', error)
    return NextResponse.json({ error: 'Failed to fetch precedents' }, { status: 500 })
  }
}

// POST /api/precedents — Add new precedent (Admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()

    const precedent = await db.precedent.create({
      data: {
        ...body,
        addedBy: session.user.id,
      },
    })

    return NextResponse.json({ success: true, precedent }, { status: 201 })
  } catch (error) {
    console.error('POST precedent error:', error)
    return NextResponse.json({ error: 'Failed to create precedent' }, { status: 500 })
  }
}
