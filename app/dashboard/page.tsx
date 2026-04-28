import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const RECENT_DOCS = [
  { type: 'JUDGEMENT', typeColor: 'bg-blue-50 text-blue-800', name: 'Ram Lal vs. State of U.P. — Civil Appeal', meta: 'Modified 2 hrs ago · Allahabad HC Format', status: 'Draft', statusColor: 'text-amber-700' },
  { type: 'PETITION', typeColor: 'bg-green-50 text-green-800', name: 'Writ Petition — Habeas Corpus No. 1123/2026', meta: 'Modified yesterday · Supreme Court', status: 'Final', statusColor: 'text-green-700' },
  { type: 'ORDER', typeColor: 'bg-orange-50 text-orange-800', name: 'Interim Order — Shyam vs. Union of India', meta: 'Modified 3 days ago · Delhi HC Format', status: 'Draft', statusColor: 'text-amber-700' },
  { type: 'NOTICE', typeColor: 'bg-purple-50 text-purple-800', name: 'Legal Notice — Property Dispute, Lucknow', meta: 'Modified 4 days ago', status: 'Final', statusColor: 'text-green-700' },
  { type: 'JUDGEMENT', typeColor: 'bg-blue-50 text-blue-800', name: 'Meena Devi vs. Rajesh Kumar — Matrimonial', meta: 'Modified last week · Family Court', status: 'Final', statusColor: 'text-green-700' },
]

const METRICS = [
  { num: '47', label: 'Total Drafts', change: '↑ 8 this month' },
  { num: '12', label: 'Active Cases', change: '↑ 2 new' },
  { num: '23,840+', label: 'SC Precedents', change: '↑ 2 indexed today' },
  { num: '98%', label: 'Citation Accuracy', change: 'AI-verified' },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-[#EDE6D3] py-5">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#7A8BA8] mb-2">Main</p>
            {[['Dashboard', '/dashboard', true], ['New Draft', '/draft', false], ['My Documents', '/dashboard', false], ['SC Precedents', '/precedents', false]].map(([label, href, active]) => (
              <Link key={label as string} href={href as string}
                className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium mb-1 transition-colors ${active ? 'bg-gold-pale text-navy border-l-2 border-gold' : 'text-[#3D5070] hover:bg-gold-pale hover:text-navy'}`}>
                {label as string}
              </Link>
            ))}
          </div>
          <div className="px-4">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#7A8BA8] mb-2">Document Types</p>
            {['Judgements', 'Petitions & Writs', 'Orders & Decrees', 'Notices', 'Affidavits'].map((label) => (
              <Link key={label} href="/draft"
                className="flex items-center gap-2 px-3 py-2 rounded text-sm text-[#3D5070] hover:bg-gold-pale hover:text-navy transition-colors mb-1 font-medium">
                {label}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 bg-cream">
          <div className="mb-6">
            <h1 className="font-serif text-2xl text-navy mb-1">Good Morning, Adv. Sharma ⚖️</h1>
            <p className="text-[#7A8BA8] text-sm">Tuesday, 28 April 2026 · 3 documents pending review · 2 new SC judgements indexed</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {METRICS.map((m) => (
              <div key={m.label} className="card p-4 border-t-4 border-t-gold">
                <div className="font-serif text-3xl font-bold text-navy">{m.num}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#7A8BA8] mt-1">{m.label}</div>
                <div className="text-xs text-green-700 font-medium mt-1">{m.change}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent docs */}
            <div className="card lg:col-span-2">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE6D3]">
                <h2 className="font-semibold text-navy text-sm">Recent Documents</h2>
                <Link href="/draft" className="text-xs border border-[#EDE6D3] rounded px-3 py-1 text-[#3D5070] hover:border-gold hover:text-navy transition-colors font-medium">+ New Draft</Link>
              </div>
              <div className="divide-y divide-[#EDE6D3]">
                {RECENT_DOCS.map((d, i) => (
                  <Link key={i} href="/draft" className="flex items-center gap-3 px-5 py-3 hover:bg-gold-pale transition-colors">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${d.typeColor} shrink-0`}>{d.type}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-navy truncate">{d.name}</div>
                      <div className="text-[11px] text-[#7A8BA8]">{d.meta}</div>
                    </div>
                    <span className={`text-xs font-semibold ${d.statusColor} shrink-0`}>{d.status}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick actions + Alerts */}
            <div className="flex flex-col gap-4">
              <div className="card">
                <div className="px-4 py-3 border-b border-[#EDE6D3]"><h2 className="font-semibold text-navy text-sm">Quick Actions</h2></div>
                <div className="p-4 space-y-2">
                  {[['Draft New Judgement', '/draft'], ['Search SC Precedents', '/precedents'], ['AI Legal Research', '/draft']].map(([label, href]) => (
                    <Link key={label as string} href={href as string}
                      className="flex items-center gap-2 w-full text-sm font-medium text-navy border border-[#EDE6D3] rounded px-3 py-2.5 hover:border-gold hover:bg-gold-pale transition-all">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {label as string}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="px-4 py-3 border-b border-[#EDE6D3]"><h2 className="font-semibold text-navy text-sm">Recent SC Updates</h2></div>
                <div className="p-4 space-y-2 text-xs">
                  <div className="bg-green-50 text-green-800 rounded p-2.5 leading-relaxed border border-green-200">✓ <strong>New:</strong> SC on PMLA bail conditions — Vijay Madanlal Choudhary (2026)</div>
                  <div className="bg-blue-50 text-blue-800 rounded p-2.5 leading-relaxed border border-blue-200">ℹ <strong>Updated:</strong> Article 370 — precedent scope clarified in follow-up orders</div>
                  <div className="bg-blue-50 text-blue-800 rounded p-2.5 leading-relaxed border border-blue-200">ℹ <strong>New:</strong> SC on Arbitration Act S.34 — 5-judge bench ruling indexed</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
