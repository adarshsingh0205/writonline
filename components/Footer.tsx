import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#060F1E] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm font-serif">W</div>
              <span className="font-serif text-xl text-white">Writ<span className="text-gold-light">Online</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              AI-powered legal drafting platform built for Indian judiciary — judges, advocates, and legal professionals.
            </p>
            <p className="text-white/30 text-xs mt-4">Made in India 🇮🇳 for Indian Courts</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 tracking-wide">Platform</h4>
            <ul className="space-y-2">
              {[['Draft Document', '/draft'], ['SC Precedents', '/precedents'], ['Dashboard', '/dashboard'], ['Pricing', '/pricing']].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-white/40 hover:text-gold-light text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 tracking-wide">Legal</h4>
            <ul className="space-y-2">
              {[['Privacy Policy', '/privacy'], ['Terms of Use', '/terms'], ['Disclaimer', '/disclaimer'], ['Contact Us', '/contact']].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-white/40 hover:text-gold-light text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">© 2026 WritOnline. All rights reserved.</p>
          <p className="text-white/25 text-xs">Powered by AI · Trusted by 2,400+ legal professionals across India</p>
        </div>
      </div>
    </footer>
  )
}
