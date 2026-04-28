'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PRECEDENTS, CATEGORIES } from '@/lib/data'

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

export default function PrecedentsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState<number|null>(null)

  const filtered = PRECEDENTS.filter(p => {
    const matchCat = category === 'All' || p.area === category
    const q = search.toLowerCase()
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.principle.toLowerCase().includes(q) || p.citation.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',background:'#FDFAF4',color:'#0B1F3A'}}>
      <Navbar/>
      <div style={{background:'#0B1F3A',padding:'3rem 2rem',textAlign:'center'}}>
        <div style={{fontSize:'11px',fontWeight:'700',letterSpacing:'0.12em',textTransform:'uppercase',color:'#C9A84C',borderBottom:'2px solid #C9A84C',display:'inline-block',paddingBottom:'2px',marginBottom:'1rem'}}>Precedent Database</div>
        <h1 style={{fontFamily:'Georgia,serif',fontSize:'36px',color:'#fff',marginBottom:'0.75rem'}}>Supreme Court Precedents</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'1.5rem'}}>23,840+ judgements · Binding applicability mapped to High Courts and lower courts</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by case name, citation, principle..." style={{width:'100%',maxWidth:'560px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px 16px',color:'#fff',fontSize:'14px',outline:'none'}}/>
      </div>
      <div style={{display:'flex',flex:1}}>
        <aside style={{width:'220px',background:'#fff',borderRight:'1px solid #EDE6D3',padding:'1.25rem',flexShrink:0}}>
          <p style={{fontSize:'10px',fontWeight:'700',letterSpacing:'0.1em',textTransform:'uppercase',color:'#7A8BA8',marginBottom:'0.75rem'}}>Area of Law</p>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{display:'block',width:'100%',textAlign:'left',fontSize:'13px',padding:'8px 12px',borderRadius:'4px',border:'none',background:category===c?'#FBF6EA':'transparent',color:category===c?'#0B1F3A':'#3D5070',fontWeight:category===c?'600':'500',cursor:'pointer',marginBottom:'2px',borderLeft:category===c?'2px solid #C9A84C':'2px solid transparent'}}>{c}</button>
          ))}
        </aside>
        <main style={{flex:1,padding:'1.5rem',overflowY:'auto'}}>
          <p style={{fontSize:'13px',color:'#7A8BA8',marginBottom:'1rem'}}>Showing <strong style={{color:'#0B1F3A'}}>{filtered.length}</strong> precedents</p>
          {filtered.map(p=>(
            <div key={p.id} onClick={()=>setExpanded(expanded===p.id?null:p.id)} style={{background:'#fff',border:'1px solid #EDE6D3',borderLeft:expanded===p.id?'4px solid #C9A84C':'4px solid transparent',borderRadius:'8px',padding:'1.25rem',marginBottom:'12px',cursor:'pointer',transition:'all 0.2s'}}>
              {!p.approved&&<div style={{fontSize:'10px',fontWeight:'700',color:'#8B1A1A',background:'#FDEAEA',border:'1px solid #F5C0C0',padding:'3px 8px',borderRadius:'4px',display:'inline-block',marginBottom:'8px',letterSpacing:'0.06em'}}>⚠ OVERRULED — SEE CURRENT LAW</div>}
              <h3 style={{fontFamily:'Georgia,serif',fontSize:'15px',fontWeight:'600',color:'#0B1F3A',marginBottom:'4px'}}>{p.title}</h3>
              <p style={{fontFamily:'monospace',fontSize:'11px',color:'#7A8BA8',marginBottom:'8px'}}>{p.citation}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'8px'}}>
                {p.tags.map(t=><span key={t} style={{fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'3px',background:'#EEF2F8',color:'#0B1F3A'}}>{t}</span>)}
              </div>
              <p style={{fontSize:'13px',color:'#3D5070',lineHeight:'1.75'}}>{p.principle}</p>
              {expanded===p.id&&(
                <div style={{marginTop:'1rem',paddingTop:'1rem',borderTop:'1px solid #EDE6D3'}}>
                  <p style={{fontSize:'12px',color:'#7A8BA8',marginBottom:'8px'}}>⚖ Bench: <strong style={{color:'#0B1F3A'}}>{p.bench}</strong> · Year: <strong style={{color:'#0B1F3A'}}>{p.year}</strong></p>
                  <div style={{background:'#EEF2F8',borderLeft:'4px solid #C9A84C',padding:'12px',borderRadius:'0 4px 4px 0',marginBottom:'12px',fontSize:'13px',color:'#0B1F3A',lineHeight:'1.8',fontStyle:'italic'}}>
                    <strong style={{fontStyle:'normal',fontSize:'10px',textTransform:'uppercase',letterSpacing:'0.06em',color:'#7A8BA8',display:'block',marginBottom:'4px'}}>Holding</strong>
                    {p.holding}
                  </div>
                  <div style={{fontSize:'13px',color:'#3D5070',lineHeight:'1.8',marginBottom:'1rem'}}>
                    <strong style={{fontSize:'10px',textTransform:'uppercase',letterSpacing:'0.06em',color:'#7A8BA8',display:'block',marginBottom:'4px'}}>Applicability to High Courts & Lower Courts</strong>
                    {p.applicability}
                  </div>
                  <div style={{display:'flex',gap:'8px'}}>
                    <Link href="/draft" style={{background:'#C9A84C',color:'#0B1F3A',fontSize:'12px',padding:'6px 14px',borderRadius:'4px',textDecoration:'none',fontWeight:'700'}}>Use in Draft →</Link>
                    <button onClick={e=>{e.stopPropagation()}} style={{fontSize:'12px',border:'1px solid #EDE6D3',borderRadius:'4px',padding:'6px 14px',background:'none',cursor:'pointer',color:'#3D5070'}}>Copy Citation</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}
