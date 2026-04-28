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

const DOCS = [
  {type:'JUDGEMENT',bg:'#E8F0FB',tc:'#1A4B8B',name:'Ram Lal vs. State of U.P. — Civil Appeal',meta:'Modified 2 hrs ago · Allahabad HC',status:'Draft',sc:'#8B6A1A'},
  {type:'PETITION',bg:'#E8F5EE',tc:'#1A6B3C',name:'Writ Petition — Habeas Corpus No. 1123/2026',meta:'Modified yesterday · Supreme Court',status:'Final',sc:'#1A6B3C'},
  {type:'ORDER',bg:'#FBF0E8',tc:'#8B3A1A',name:'Interim Order — Shyam vs. Union of India',meta:'Modified 3 days ago · Delhi HC',status:'Draft',sc:'#8B6A1A'},
  {type:'NOTICE',bg:'#F5E8FB',tc:'#5A1A8B',name:'Legal Notice — Property Dispute, Lucknow',meta:'Modified 4 days ago',status:'Final',sc:'#1A6B3C'},
]

export default function DashboardPage() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',background:'#FDFAF4',color:'#0B1F3A'}}>
      <Navbar/>
      <div style={{display:'flex',flex:1}}>
        <aside style={{width:'220px',background:'#fff',borderRight:'1px solid #EDE6D3',padding:'1.25rem 0'}}>
          {[['Dashboard','/dashboard'],['New Draft','/draft'],['SC Precedents','/precedents'],['My Documents','/dashboard'],['Pricing','/pricing']].map(([l,h])=>(
            <Link key={l} href={h} style={{display:'flex',alignItems:'center',gap:'8px',padding:'9px 1.25rem',fontSize:'13px',color:'#3D5070',textDecoration:'none',fontWeight:'500'}}>{l}</Link>
          ))}
        </aside>
        <main style={{flex:1,padding:'1.75rem',background:'#FDFAF4'}}>
          <h1 style={{fontFamily:'Georgia,serif',fontSize:'24px',marginBottom:'4px'}}>Good Morning, Adv. Sharma ⚖️</h1>
          <p style={{color:'#7A8BA8',fontSize:'13px',marginBottom:'1.75rem'}}>Tuesday, 29 April 2026 · 3 documents pending review</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'1.75rem'}}>
            {[['47','Total Drafts','↑ 8 this month'],['12','Active Cases','↑ 2 new'],['23,840+','SC Precedents','↑ 2 today'],['98%','Citation Accuracy','AI-verified']].map(([n,l,c])=>(
              <div key={l} style={{background:'#fff',border:'1px solid #EDE6D3',borderTop:'3px solid #C9A84C',borderRadius:'8px',padding:'1rem 1.25rem'}}>
                <div style={{fontFamily:'Georgia,serif',fontSize:'26px',fontWeight:'700',color:'#0B1F3A'}}>{n}</div>
                <div style={{fontSize:'11px',color:'#7A8BA8',textTransform:'uppercase',letterSpacing:'0.06em',marginTop:'2px'}}>{l}</div>
                <div style={{fontSize:'11px',color:'#1A6B3C',fontWeight:'500',marginTop:'4px'}}>{c}</div>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:'1px solid #EDE6D3',borderRadius:'8px'}}>
            <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid #EDE6D3',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontWeight:'600',color:'#0B1F3A',fontSize:'14px'}}>Recent Documents</span>
              <Link href="/draft" style={{fontSize:'12px',border:'1px solid #EDE6D3',borderRadius:'4px',padding:'5px 12px',color:'#3D5070',textDecoration:'none'}}>+ New Draft</Link>
            </div>
            {DOCS.map((d,i)=>(
              <Link key={i} href="/draft" style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 1.25rem',borderBottom:'1px solid #EDE6D3',textDecoration:'none'}}>
                <span style={{fontSize:'10px',fontWeight:'700',padding:'3px 8px',borderRadius:'4px',background:d.bg,color:d.tc,whiteSpace:'nowrap'}}>{d.type}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:'13px',fontWeight:'500',color:'#0B1F3A',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.name}</div>
                  <div style={{fontSize:'11px',color:'#7A8BA8'}}>{d.meta}</div>
                </div>
                <span style={{fontSize:'12px',fontWeight:'600',color:d.sc}}>{d.status}</span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
