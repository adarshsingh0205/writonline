import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WritOnline — AI-Powered Judiciary Drafting for India',
  description: 'Draft judgements, writ petitions, legal notices and all judicial documents with AI assistance. Access 23,000+ Supreme Court precedents. Built for Indian courts.',
  keywords: 'legal drafting india, judgement drafting, writ petition, supreme court precedents, allahabad high court, judiciary AI',
  openGraph: {
    title: 'WritOnline — AI-Powered Judiciary Drafting',
    description: 'Draft legal documents for Indian courts with AI assistance and Supreme Court precedents.',
    url: 'https://writonline.in',
    siteName: 'WritOnline',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Source+Sans+3:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans bg-cream text-navy antialiased">{children}</body>
    </html>
  )
}
