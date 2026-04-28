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

const PLANS = [
  {name:'Student',price:'₹0',period:'/ month',desc:'For law students and researchers',popular:false,features:['20 documents / month','Basic SC precedent search','50+ moot court templates','PDF export','AI suggestions (limited)'],cta:'Get Started Free',href:'/draft'},
  {name:'Advocate',price:'₹999',period:'/ month',desc:'For practising advocates and law firms',popular:true,features:['Unlimited documents','Full SC precedent database (23,840+)','500+ court-specific templates','AI drafting + citation engine','PDF, DOCX, eFiling export','Hindi & English bilingual','Priority support'],cta:'Start 14-Day Free Trial',href:'/draft'},
  {name:'Judicial / Court',price:'₹4,999',period:'/ month',desc:'For chambers, court staff, law departments',popular:false,features:['Everything in Advocate','Up to 25 users','Role-based access control','Cause list generation','Court registry integration','Dedicated account manager'],cta:'Contact Us',href:'/draft'},
]

export default function PricingPage() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',background:'#FDFAF4',color:'#0B1F3A'}}>
      <Navbar/>
      <section style={{background:'#0B1F3A',padding:'4rem 2rem',textAlign:'center'}}>
        <div style={{fontSize:'11px',fontWeight:'700',letterSpacing:'0.12em',textTransform:'uppercase',color:'#C9A84C',borderBottom:'2px solid #C9A84C',display:'inline-block',paddingBottom:'2px',marginBottom:'1rem'}}>Simple Pricing</div>
        <h1 style={{fontFamily:'Georgia,serif',fontSize:'36px',color:'#fff',marginBottom:'0.5rem'}}>Plans for Every Legal Professional</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'15px'}}>Start free, scale as you grow. All plans include Supreme Court precedent access.</p>
      </section>
      <section style={{padding:'4rem 2rem',flex:1}}>
        <div style={{maxWidth:'1000px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem'}}>
          {PLANS.map(p=>(
            <div key={p.name} style={{background:'#fff',borderRadius:'10px',padding:'2rem',position:'relative',border:p.popular?'2px solid #C9A84C':'1px solid #EDE6D3',boxShadow:p.popular?'0 4px 24px rgba(201,168,76,0.15)':'none'}}>
              {p.popular&&<div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'#C9A84C',color:'#0B1F3A',fontSize:'11px',fontWeight:'700',padding:'4px 16px',borderRadius:'40px',letterSpacing:'0.06em',whiteSpace:'nowrap'}}>MOST POPULAR</div>}
              <h2 style={{fontFamily:'Georgia,serif',fontSize:'20px',color:'#0B1F3A',marginBottom:'0.5rem'}}>{p.name}</h2>
              <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'4px'}}>
                <span style={{fontFamily:'Georgia,serif',fontSize:'36px',fontWeight:'700',color:'#0B1F3A'}}>{p.price}</span>
                <span style={{fontSize:'14px',color:'#7A8BA8'}}>{p.period}</span>
              </div>
              <p style={{fontSize:'12px',color:'#7A8BA8',marginBottom:'1.5rem',paddingBottom:'1.5rem',borderBottom:'1px solid #EDE6D3'}}>{p.desc}</p>
              <ul style={{listStyle:'none',padding:0,marginBottom:'1.5rem'}}>
                {p.features.map(f=>(
                  <li key={f} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'13px',color:'#3D5070',marginBottom:'8px'}}>
                    <span style={{color:'#C9A84C',flexShrink:0}}>✦</span>{f}
                  </li>
                ))}
              </ul>
              <Link href={p.href} style={{display:'block',textAlign:'center',fontSize:'14px',fontWeight:'700',padding:'12px',borderRadius:'6px',textDecoration:'none',background:p.popular?'#C9A84C':'none',color:p.popular?'#0B1F3A':'#0B1F3A',border:p.popular?'none':'2px solid #0B1F3A'}}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
