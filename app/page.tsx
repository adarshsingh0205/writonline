import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const STATS = [
  { num: '50,000+', label: 'Documents Drafted' },
  { num: '2,400+', label: 'Legal Professionals' },
  { num: '500+', label: 'Court Templates' },
  { num: '25', label: 'High Courts Covered' },
]

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#C9A84C" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'AI Judgement Drafting',
    desc: 'Generate well-structured judgements aligned with Indian legal precedents, CPC, CrPC, and constitutional provisions — in minutes, not days.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#C9A84C" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M4 6h16M4 10h16M4 14h10" />
      </svg>
    ),
    title: '500+ Legal Templates',
    desc: 'Ready-to-use templates for petitions, writs, orders, notices, affidavits, vakalatnamas — formatted for every Indian court from SC to district level.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#C9A84C" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'SC Precedent Engine',
    desc: 'Search and cite 23,000+ Supreme Court and High Court judgements — integrated directly into your drafting workflow with one-click insertion.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#C9A84C" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Smart Citation Assistant',
    desc: 'Automatically suggests relevant case citations, section references, and statutory provisions as you draft — no manual lookup required.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#C9A84C" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: 'Secure & DPDP Compliant',
    desc: 'Bank-grade encryption for all your drafts. Role-based access for chambers, court staff, and law firms. Fully compliant with DPDP Act 2023.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#C9A84C" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    title: 'Bilingual — Hindi & English',
    desc: 'Draft in English or Hindi. Regional language support for 12 Indian languages including Tamil, Telugu, Marathi, Bengali — coming soon.',
  },
]

const WHO = [
  { icon: '⚖️', title: 'Judges & Registrars', desc: 'Draft judgements, interlocutory orders, and cause lists with AI assistance. Reduce pendency, maintain consistency across your chamber.' },
  { icon: '📋', title: 'Advocates & Law Firms', desc: 'Draft petitions, replies, written statements, and appeals faster. Spend more time on strategy, less on formatting and precedent lookup.' },
  { icon: '🏛️', title: 'Government Counsel', desc: 'Standardised drafting for government responses, compliance affidavits, and official legal communications across all departments.' },
  { icon: '🎓', title: 'Law Students & Researchers', desc: 'Learn legal drafting with AI feedback. Access case law, moot court templates, and research tools — all in one place.' },
]

const TESTIMONIALS = [
  {
    quote: 'WritOnline has transformed how I draft orders. What used to take 3 hours now takes under 30 minutes. The citation suggestions are remarkably accurate for Allahabad HC format.',
    author: 'Hon. Justice R. Sharma (Retd.)',
    role: 'Former Judge, Allahabad High Court',
    stars: 5,
  },
  {
    quote: 'The writ petition templates follow the exact format required by our High Court. It understands Indian legal language far better than any other tool I have used in my practice.',
    author: 'Adv. Priya Malhotra',
    role: 'Senior Advocate, Delhi High Court',
    stars: 5,
  },
  {
    quote: 'As a law student preparing for moot courts, the research integration and template access have been invaluable. It is like having a senior advocate guiding you every step.',
    author: 'Arjun Verma',
    role: 'Final Year LLB, NLU Lucknow',
    stars: 4,
  },
]

const DOCS = [
  'Civil Judgement', 'Criminal Judgement', 'Writ Petition (Civil)', 'Habeas Corpus',
  'Anticipatory Bail (S.438)', 'Quashing of FIR (S.482)', 'Interim Order', 'Legal Notice',
  'Show Cause Notice', 'Vakalatnama', 'Sworn Affidavit', 'Special Leave Petition',
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="bg-navy relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 120%, #C9A84C 0%, transparent 60%)' }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-gold/40 rounded-full px-4 py-1.5 mb-8 text-gold-light text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            AI-Powered Legal Drafting for India
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Draft <em className="text-gold-light not-italic">Judgements</em> &amp; Legal Documents with Precision
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            WritOnline empowers judges, advocates, and legal professionals across India to draft, review, and manage judicial documents — faster, smarter, and with constitutional accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/draft" className="btn-gold text-base px-8 py-4 inline-flex items-center justify-center gap-2">
              Start Drafting Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/precedents" className="border border-white/30 text-white text-base font-medium px-8 py-4 rounded hover:border-gold hover:text-gold-light transition-all inline-flex items-center justify-center">
              Browse SC Precedents
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-white border-b border-[#EDE6D3]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#EDE6D3]">
          {STATS.map((s) => (
            <div key={s.label} className="py-6 px-6 text-center">
              <div className="font-serif text-3xl font-bold text-navy">{s.num}</div>
              <div className="text-xs text-[#7A8BA8] uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-white border-b border-[#EDE6D3]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-tag">Core Features</div>
            <h2 className="font-serif text-4xl text-navy mb-4">Everything a Legal Professional Needs</h2>
            <p className="text-[#3D5070] text-base max-w-lg mx-auto">Purpose-built for the Indian judiciary — from district courts to the Supreme Court.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#EDE6D3]">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-8 border-b border-r border-[#EDE6D3] hover:bg-gold-pale transition-colors">
                <div className="w-10 h-10 bg-navy rounded-md flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="font-serif text-lg text-navy mb-2 font-medium">{f.title}</h3>
                <p className="text-sm text-[#3D5070] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENT TYPES */}
      <section className="py-20 px-4 bg-gold-pale border-b border-[#EDE6D3]">
        <div className="max-w-6xl mx-auto">
          <div className="section-tag">Document Library</div>
          <h2 className="font-serif text-4xl text-navy mb-2">Draft Any Legal Document</h2>
          <p className="text-[#3D5070] mb-8">From routine orders to complex constitutional petitions — every format covered.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {DOCS.map((d) => (
              <Link
                key={d}
                href="/draft"
                className="flex items-center gap-2 bg-white border border-[#EDE6D3] rounded-md px-3 py-3 text-xs font-medium text-navy hover:border-gold hover:shadow-sm transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                {d}
              </Link>
            ))}
          </div>
          <Link href="/draft" className="text-navy text-sm font-semibold underline underline-offset-2 hover:text-gold transition-colors">
            View all 500+ templates →
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-white border-b border-[#EDE6D3]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="section-tag">How It Works</div>
          <h2 className="font-serif text-4xl text-navy mb-2">Draft a Judgement in 4 Simple Steps</h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              ['01', 'Select Document Type', 'Choose from 500+ templates. Pick your court level and matter type.'],
              ['02', 'Enter Case Details', 'Input parties, case number, facts, and arguments. AI understands Indian legal structure.'],
              ['03', 'AI Drafts & Suggests', 'WritOnline generates a complete draft with citations, reasoning, and legal language.'],
              ['04', 'Review & Export', 'Edit inline, accept AI suggestions, then export to PDF, DOCX, or eFiling systems.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="text-center">
                <div className="font-serif text-5xl font-bold text-gold/40 leading-none mb-3">{num}</div>
                <h3 className="font-serif text-lg text-navy mb-2 font-medium">{title}</h3>
                <p className="text-sm text-[#3D5070] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 px-4 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-gold-light border-b-2 border-gold-light pb-0.5 mb-3">Who It&apos;s For</div>
            <h2 className="font-serif text-4xl text-white">Built for Every Pillar of the Judiciary</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHO.map((w) => (
              <div key={w.title} className="border border-gold/20 rounded-lg p-6 hover:border-gold/50 transition-colors">
                <div className="text-2xl mb-3">{w.icon}</div>
                <h3 className="font-serif text-lg text-white mb-2 font-medium">{w.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-white border-b border-[#EDE6D3]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag">Testimonials</div>
            <h2 className="font-serif text-4xl text-navy">Trusted by Legal Professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="card p-6 border-t-4 border-t-gold">
                <div className="text-gold text-sm mb-3">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
                <p className="font-serif text-sm text-navy italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="text-sm font-semibold text-navy">{t.author}</div>
                <div className="text-xs text-[#7A8BA8]">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-navy text-center border-t border-gold/20">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Start Drafting Smarter Today</h2>
        <p className="text-white/50 text-base mb-8 max-w-md mx-auto">
          Join thousands of legal professionals who trust WritOnline for accurate, efficient, and constitutionally sound document drafting.
        </p>
        <Link href="/draft" className="btn-gold text-base px-10 py-4 inline-flex items-center gap-2">
          Get Free Access →
        </Link>
        <p className="text-white/25 text-xs mt-4">No credit card required · 14-day free trial · Cancel anytime</p>
      </section>

      <Footer />
    </div>
  )
}
