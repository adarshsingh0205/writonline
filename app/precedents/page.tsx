'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PRECEDENTS, CATEGORIES } from '@/lib/data'
import Link from 'next/link'

export default function PrecedentsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = PRECEDENTS.filter((p) => {
    const matchCat = category === 'All' || p.area === category
    const q = search.toLowerCase()
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.principle.toLowerCase().includes(q) || p.citation.toLowerCase().includes(q) || p.applicability.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-navy py-12 px-4 border-b border-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block text-xs font-bold tracking-widest uppercase text-gold border-b-2 border-gold pb-0.5 mb-3">Precedent Database</div>
          <h1 className="font-serif text-4xl text-white mb-3">Supreme Court Precedents</h1>
          <p className="text-white/50 text-sm mb-6">23,840+ judgements indexed · Binding applicability mapped to High Courts and lower courts</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by case name, citation, principle, or keyword..."
            className="w-full max-w-xl bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-56 bg-white border-r border-[#EDE6D3] p-4 shrink-0">
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#7A8BA8] mb-3">Area of Law</p>
          <div className="space-y-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`w-full text-left text-sm px-3 py-2 rounded transition-colors font-medium ${category === c ? 'bg-gold-pale text-navy border-l-2 border-gold' : 'text-[#3D5070] hover:bg-gold-pale hover:text-navy'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-[#EDE6D3]">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#7A8BA8] mb-3">Bench Strength</p>
            {['Constitution Bench (5+)', 'Division Bench (3)', 'Double Bench (2)'].map((b) => (
              <label key={b} className="flex items-center gap-2 text-xs text-[#3D5070] py-1 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#C9A84C]" />
                {b}
              </label>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-5 bg-cream">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#7A8BA8]">Showing <strong className="text-navy">{filtered.length}</strong> precedents</p>
            <div className="flex gap-2">
              {CATEGORIES.slice(1, 5).map((c) => (
                <button key={c} onClick={() => setCategory(category === c ? 'All' : c)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${category === c ? 'bg-navy text-white border-navy' : 'border-[#EDE6D3] text-[#3D5070] hover:border-gold'}`}>
                  {c.replace(' Law', '')}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#7A8BA8] text-sm">No precedents match your search. Try different keywords.</div>
          )}

          <div className="space-y-3">
            {filtered.map((p) => (
              <div
                key={p.id}
                className={`bg-white border border-[#EDE6D3] rounded-lg p-5 cursor-pointer transition-all border-l-4 ${expanded === p.id ? 'border-l-gold shadow-sm' : 'border-l-transparent hover:border-l-gold'} ${!p.approved ? 'opacity-75' : ''}`}
                onClick={() => setExpanded(expanded === p.id ? null : p.id)}
              >
                {!p.approved && (
                  <div className="text-[10px] font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-1 rounded inline-block mb-2 tracking-widest uppercase">⚠ Overruled — See Current Law</div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base font-semibold text-navy mb-1">{p.title}</h3>
                    <p className="font-mono text-[11px] text-[#7A8BA8] mb-2">{p.citation}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded bg-navy-pale text-navy tracking-wide">{t}</span>
                      ))}
                    </div>
                    <p className="text-sm text-[#3D5070] leading-relaxed">{p.principle}</p>
                  </div>
                  <svg className={`w-4 h-4 text-[#7A8BA8] flex-shrink-0 mt-1 transition-transform ${expanded === p.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M19 9l-7 7-7-7" /></svg>
                </div>

                {expanded === p.id && (
                  <div className="mt-4 pt-4 border-t border-[#EDE6D3]">
                    <p className="text-xs text-[#7A8BA8] mb-2">⚖ Bench: <strong className="text-navy">{p.bench}</strong> · Year: <strong className="text-navy">{p.year}</strong></p>
                    <div className="bg-navy-pale border-l-4 border-gold p-3 rounded-r mb-3 text-sm text-navy leading-relaxed italic">
                      <strong className="not-italic text-[10px] uppercase tracking-widest text-[#7A8BA8] block mb-1">Holding</strong>
                      {p.holding}
                    </div>
                    <div className="text-sm text-[#3D5070] leading-relaxed mb-4">
                      <strong className="text-[10px] uppercase tracking-widest text-[#7A8BA8] block mb-1">Applicability to High Courts & Lower Courts</strong>
                      {p.applicability}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Link href="/draft" className="btn-gold text-xs py-2 px-4">Use in Draft →</Link>
                      <button onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(p.citation) }}
                        className="text-xs border border-[#EDE6D3] rounded px-3 py-2 text-[#3D5070] hover:border-gold hover:text-navy transition-colors font-medium">
                        Copy Citation
                      </button>
                      <button onClick={(e) => e.stopPropagation()}
                        className="text-xs border border-[#EDE6D3] rounded px-3 py-2 text-[#3D5070] hover:border-gold hover:text-navy transition-colors font-medium">
                        Bookmark
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
