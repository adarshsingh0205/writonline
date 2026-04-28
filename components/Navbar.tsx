'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-navy sticky top-0 z-50 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm font-serif">W</div>
            <span className="font-serif text-xl text-white">
              Writ<span className="text-gold-light">Online</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/draft" className="nav-link">Draft</Link>
            <Link href="/precedents" className="nav-link">SC Precedents</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Sign In</Link>
            <Link href="/draft" className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded hover:bg-gold-light transition-colors">
              Start Drafting
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-mid border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          <Link href="/" className="text-white/70 hover:text-white text-sm font-medium py-1">Home</Link>
          <Link href="/draft" className="text-white/70 hover:text-white text-sm font-medium py-1">Draft Document</Link>
          <Link href="/precedents" className="text-white/70 hover:text-white text-sm font-medium py-1">SC Precedents</Link>
          <Link href="/pricing" className="text-white/70 hover:text-white text-sm font-medium py-1">Pricing</Link>
          <Link href="/dashboard" className="text-white/70 hover:text-white text-sm font-medium py-1">Dashboard</Link>
          <Link href="/draft" className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded text-center mt-2">
            Start Drafting Free
          </Link>
        </div>
      )}
    </nav>
  )
}
