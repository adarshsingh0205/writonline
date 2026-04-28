import Link from 'next/link'

function Navbar() {
  return (
    <nav style={{background:'#0B1F3A',padding:'0 2rem',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50,borderBottom:'1px solid rgba(201,168,76,0.2)'}}>
      <Link href="/" style={{display:'flex',alignItems:'center',gap:'8px',textDecoration:'none'}}>
        <div style={{width:'32px',height:'32px',background:'#C9A84C',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1F3A',fontWeight:'700',fontSize:'14px'}}>W</div>
        <span style={{fontFamily:'Georgia,serif',fontSize:'20px',color:'#fff'}}>Writ<span style={{color:'#E8C97A'}}>Online</span></span>
      </Link>
      <div style={{display:'flex',gap:'2rem'}}>
        {[['Home','/'],['Draft','/draft'],['SC Precedents','/precedents'],['Pricing','/pricing'],['Dashboard','/dashboard']].map(([l,h])=>(
          <Link key={h} href={h} style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>{l}</Link>
        ))}
      </div>
      <Link href="/draft" style={{background:'#C9A84C',color:'#0B1F3A',padding:'8px 20px',borderRadius:'4px',textDecoration:'none',fontSize:'14px',fontWeight:'700'}}>Start Drafting</Link>
    </nav>
  )
}

function Footer() {
  return (
    <footer style={{background:'#060F1E',padding:'2rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
      <span style={{fontFamily:'Georgia,serif',color:'#E8C97A',fontSize:'18px'}}>WritOnline</span>
      <div style={{display:'flex',gap:'2rem'}}>
        {[['Privacy','/'],['Terms','/'],['Contact','/']].map(([l,h])=>(
          <Link key={l} href={h} style={{color:'rgba(255,255,255,0.35)',textDecoration:'none',fontSize:'13px'}}>{l}</Link>
        ))}
      </div>
      <span style={{color:'rgba(255,255,255,0.25)',fontSize:'12px'}}>© 2026 WritOnline. Made in India 🇮🇳</span>
    </footer>
  )
}

export default function HomePage() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',background:'#FDFAF4',color:'#0B1F3A'}}>
      <Navbar/>

      {/* HERO */}
      <section style={{background:'#0B1F3A',padding:'80px 2rem',textAlign:'center'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',border:'1px solid rgba(201,168,76,0.4)',borderRadius:'40px',padding:'6px 18px',marginBottom:'2rem',fontSize:'12px',color:'#E8C97A',letterSpacing:'0.08em',textTransform:'uppercase'}}>
          <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#C9A84C',display:'inline-block'}}/>
          AI-Powered Legal Drafting for India
        </div>
        <h1 style={{fontFamily:'Georgia,serif',fontSize:'52px',fontWeight:'700',color:'#fff',lineHeight:'1.15',marginBottom:'1.25rem',maxWidth:'800px',margin:'0 auto 1.25rem'}}>
          Draft <em style={{color:'#E8C97A',fontStyle:'normal'}}>Judgements</em> &amp; Legal Documents with Precision
        </h1>
        <p style={{fontSize:'18px',color:'rgba(255,255,255,0.6)',maxWidth:'580px',margin:'0 auto 2.5rem',lineHeight:'1.8'}}>
          WritOnline empowers judges, advocates, and legal professionals across India to draft, review, and manage judicial documents — faster, smarter, and with constitutional accuracy.
        </p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/draft" style={{background:'#C9A84C',color:'#0B1F3A',padding:'14px 32px',borderRadius:'4px',fontSize:'15px',fontWeight:'700',textDecoration:'none'}}>Start Drafting Free →</Link>
          <Link href="/precedents" style={{border:'1px solid rgba(255,255,255,0.3)',color:'#fff',padding:'14px 32px',borderRadius:'4px',fontSize:'15px',fontWeight:'500',textDecoration:'none'}}>Browse SC Precedents</Link>
        </div>
      </section>

      {/* STATS */}
      <div style={{background:'#fff',borderBottom:'1px solid #EDE6D3',display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
        {[['50,000+','Documents Drafted'],['2,400+','Legal Professionals'],['500+','Court Templates'],['25','High Courts Covered']].map(([n,l])=>(
          <div key={l} style={{padding:'1.5rem 3rem',textAlign:'center',borderRight:'1px solid #EDE6D3'}}>
            <div style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:'700',color:'#0B1F3A'}}>{n}</div>
            <div style={{fontSize:'11px',color:'#7A8BA8',textTransform:'uppercase',letterSpacing:'0.06em',marginTop:'4px'}}>{l}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section style={{padding:'72px 2rem',background:'#fff'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <div style={{fontSize:'11px',fontWeight:'700',letterSpacing:'0.12em',textTransform:'uppercase',color:'#C9A84C',borderBottom:'2px solid #C9A84C',display:'inline-block',paddingBottom:'2px',marginBottom:'1rem'}}>Core Features</div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:'38px',color:'#0B1F3A',marginBottom:'1rem'}}>Everything a Legal Professional Needs</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'0',border:'1px solid #EDE6D3'}}>
            {[
              ['AI Judgement Drafting','Generate well-structured judgements aligned with Indian legal precedents, CPC, CrPC, and constitutional provisions — in minutes.'],
              ['500+ Legal Templates','Ready-to-use templates for petitions, writs, orders, notices, affidavits, vakalatnamas — formatted for every Indian court.'],
              ['SC Precedent Engine','Search and cite 23,000+ Supreme Court judgements — integrated directly into your drafting workflow.'],
              ['Smart Citation Assistant','Automatically suggests relevant case citations and statutory provisions as you draft.'],
              ['Secure & DPDP Compliant','Bank-grade encryption. Role-based access for chambers, court staff, and law firms.'],
              ['Hindi & English','Draft in English or Hindi. Bilingual document generation on all paid plans.'],
            ].map(([t,d])=>(
              <div key={t} style={{padding:'2.5rem 2rem',borderRight:'1px solid #EDE6D3',borderBottom:'1px solid #EDE6D3'}}>
                <div style={{width:'44px',height:'44px',background:'#0B1F3A',borderRadius:'6px',marginBottom:'1.25rem'}}/>
                <h3 style={{fontFamily:'Georgia,serif',fontSize:'19px',color:'#0B1F3A',marginBottom:'0.5rem'}}>{t}</h3>
                <p style={{fontSize:'14px',color:'#3D5070',lineHeight:'1.75'}}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO ITS FOR */}
      <section style={{padding:'72px 2rem',background:'#0B1F3A'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontFamily:'Georgia,serif',fontSize:'38px',color:'#fff',marginBottom:'3rem'}}>Built for Every Pillar of the Judiciary</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1.5rem'}}>
            {[
              ['⚖️','Judges & Registrars','Draft judgements and orders with AI. Reduce pendency, maintain consistency.'],
              ['📋','Advocates & Law Firms','Draft petitions and appeals faster. Spend more time on strategy.'],
              ['🏛️','Government Counsel','Standardised drafting for government responses and official communications.'],
              ['🎓','Law Students','Learn legal drafting with AI feedback and moot court templates.'],
            ].map(([icon,t,d])=>(
              <div key={t} style={{border:'1px solid rgba(201,168,76,0.2)',borderRadius:'8px',padding:'2rem 1.75rem',textAlign:'left'}}>
                <div style={{fontSize:'28px',marginBottom:'1rem'}}>{icon}</div>
                <h3 style={{fontFamily:'Georgia,serif',fontSize:'18px',color:'#fff',marginBottom:'0.5rem'}}>{t}</h3>
                <p style={{fontSize:'13px',color:'rgba(255,255,255,0.55)',lineHeight:'1.75'}}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'#0B1F3A',padding:'80px 2rem',textAlign:'center',borderTop:'1px solid rgba(201,168,76,0.2)'}}>
        <h2 style={{fontFamily:'Georgia,serif',fontSize:'42px',color:'#fff',marginBottom:'1rem'}}>Start Drafting Smarter Today</h2>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'2.5rem',maxWidth:'480px',margin:'0 auto 2.5rem'}}>Join thousands of legal professionals who trust WritOnline.</p>
        <Link href="/draft" style={{background:'#C9A84C',color:'#0B1F3A',padding:'16px 40px',borderRadius:'4px',fontSize:'16px',fontWeight:'700',textDecoration:'none'}}>Get Free Access →</Link>
        <p style={{color:'rgba(255,255,255,0.25)',fontSize:'12px',marginTop:'1rem'}}>No credit card required · 14-day free trial · Cancel anytime</p>
      </section>

      <Footer/>
    </div>
  )
}
