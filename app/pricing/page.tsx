import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Student',
    price: '₹0',
    period: '/ month',
    desc: 'Perfect for law students and researchers',
    popular: false,
    features: [
      '20 documents / month',
      'Basic SC precedent search',
      '50+ moot court templates',
      'PDF export',
      'AI suggestions (limited)',
      'Community support',
    ],
    cta: 'Get Started Free',
    href: '/draft',
    style: 'btn-outline',
  },
  {
    name: 'Advocate',
    price: '₹999',
    period: '/ month',
    desc: 'For practising advocates and small law firms',
    popular: true,
    features: [
      'Unlimited documents',
      'Full SC precedent database (23,840+)',
      '500+ court-specific templates',
      'AI drafting + citation engine',
      'PDF, DOCX, eFiling export',
      'Hindi & English bilingual',
      'Priority support',
      'All 25 High Court formats',
    ],
    cta: 'Start 14-Day Free Trial',
    href: '/draft',
    style: 'btn-gold',
  },
  {
    name: 'Judicial / Court',
    price: '₹4,999',
    period: '/ month',
    desc: 'For chambers, court staff, and law departments',
    popular: false,
    features: [
      'Everything in Advocate',
      'Up to 25 users',
      'Role-based access control',
      'Cause list generation',
      'Court registry integration',
      'Custom High Court formatting',
      'Dedicated account manager',
      'On-premise deployment option',
    ],
    cta: 'Contact Us',
    href: '/contact',
    style: 'btn-outline',
  },
]

const FAQS = [
  { q: 'Is my data secure?', a: 'Yes. WritOnline uses bank-grade AES-256 encryption for all data at rest and in transit. We are fully DPDP Act 2023 compliant. Your drafts are never shared or used for AI training without explicit consent.' },
  { q: 'Can I use WritOnline for all Indian courts?', a: 'Yes. WritOnline supports all 25 High Courts, Supreme Court of India, all district and sessions courts, and 20+ tribunals including NGT, NCLT, ITAT, MACT, and RERA.' },
  { q: 'Is there a free trial?', a: 'Yes. The Advocate plan comes with a 14-day free trial with full access to all features. No credit card required to start.' },
  { q: 'Can I draft in Hindi?', a: 'Yes. WritOnline supports drafting in English and Hindi. Full bilingual document generation is available on all paid plans.' },
  { q: 'How accurate are the SC precedent citations?', a: 'Our citation engine has a 98%+ accuracy rate verified by legal experts. All precedents are cross-referenced with SCC Online and Manupatra databases.' },
  { q: 'Is WritOnline suitable for government law departments?', a: 'Yes. The Judicial / Court plan is ideal for government law departments with multi-user access, role-based permissions, and on-premise deployment options.' },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-navy py-16 px-4 text-center border-b border-gold/20">
        <div className="inline-block text-xs font-bold tracking-widest uppercase text-gold border-b-2 border-gold pb-0.5 mb-3">Simple Pricing</div>
        <h1 className="font-serif text-4xl text-white mb-3">Plans for Every Legal Professional</h1>
        <p className="text-white/50 text-sm">Start free, scale as you grow. All plans include Supreme Court precedent access.</p>
      </section>

      <section className="py-16 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div key={p.name} className={`bg-white rounded-xl p-7 relative ${p.popular ? 'border-2 border-gold shadow-lg shadow-gold/10' : 'border border-[#EDE6D3]'}`}>
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-navy text-[11px] font-bold px-4 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <h2 className="font-serif text-xl text-navy mb-1">{p.name}</h2>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-serif text-4xl font-bold text-navy">{p.price}</span>
                  <span className="text-sm text-[#7A8BA8]">{p.period}</span>
                </div>
                <p className="text-xs text-[#7A8BA8] mb-5 pb-5 border-b border-[#EDE6D3]">{p.desc}</p>
                <ul className="space-y-2.5 mb-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#3D5070]">
                      <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={p.href} className={`block text-center text-sm font-semibold py-3 rounded transition-all ${p.style === 'btn-gold' ? 'bg-gold text-navy hover:bg-gold-light' : 'border-2 border-navy text-navy hover:bg-navy hover:text-white'}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#7A8BA8] mt-8">
            All prices in Indian Rupees (INR) · GST applicable · Annual plans available at 20% discount · Contact us for custom enterprise pricing
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-white border-t border-[#EDE6D3]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-navy text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="border border-[#EDE6D3] rounded-lg p-5">
                <h3 className="font-semibold text-navy text-sm mb-2">{f.q}</h3>
                <p className="text-sm text-[#3D5070] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
