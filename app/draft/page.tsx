'use client'
import { useState } from 'react'
import Link from 'next/link'
import { DOCUMENT_CATEGORIES, HIGH_COURTS } from '@/lib/data'

type Court = 'SC'|'HC'|'DC'|'TRI'

const TRIBUNALS = ['National Green Tribunal (NGT)','National Company Law Tribunal (NCLT)','NCLAT','Income Tax Appellate Tribunal (ITAT)','CESTAT','Central Administrative Tribunal (CAT)','Consumer Disputes Redressal Commission (NCDRC)','Motor Accident Claims Tribunal (MACT)','Debt Recovery Tribunal (DRT)','RERA','Labour Court / Industrial Tribunal','CBI Court','PMLA Special Court','NIA Court','POCSO Court','Fast Track Court']
const STEPS = ['Court & Level','Document Type','Case Details','Parties','Attachments','Review']

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

const inputStyle:React.CSSProperties = {width:'100%',border:'1px solid #D6C9A8',borderRadius:'6px',padding:'9px 12px',fontSize:'13px',color:'#0B1F3A',background:'#fff',outline:'none',fontFamily:'system-ui,sans-serif',boxSizing:'border-box'}
const labelStyle:React.CSSProperties = {display:'block',fontSize:'11px',fontWeight:'700',textTransform:'uppercase' as const,letterSpacing:'0.06em',color:'#7A8BA8',marginBottom:'6px'}
const fieldStyle:React.CSSProperties = {marginBottom:'1rem'}

export default function DraftPage() {
  const [step,setStep] = useState(0)
  const [court,setCourt] = useState<Court>('SC')
  const [hcName,setHcName] = useState('Supreme Court of India')
  const [catIdx,setCatIdx] = useState<number|null>(null)
  const [sub,setSub] = useState<string|null>(null)
  const [caseNum,setCaseNum] = useState('')
  const [facts,setFacts] = useState('')
  const [statutes,setStatutes] = useState('')
  const [lang,setLang] = useState('English')
  const [urgency,setUrgency] = useState('Normal')
  const [petitioners,setPetitioners] = useState([''])
  const [respondents,setRespondents] = useState([''])
  const [advocate,setAdvocate] = useState('')
  const [files,setFiles] = useState<string[]>([])
  const [done,setDone] = useState(false)

  const cats = DOCUMENT_CATEGORIES[court==='SC'?'SC':'HC']??DOCUMENT_CATEGORIES.HC

  if(done) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',background:'#FDFAF4'}}>
      <Navbar/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
        <div style={{textAlign:'center',maxWidth:'480px'}}>
          <div style={{width:'64px',height:'64px',background:'#E8F5EE',border:'2px solid #A8D4B8',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1.5rem',fontSize:'28px'}}>✓</div>
          <h1 style={{fontFamily:'Georgia,serif',fontSize:'28px',color:'#0B1F3A',marginBottom:'0.75rem'}}>Draft Generated Successfully</h1>
          <p style={{color:'#7A8BA8',fontSize:'14px',lineHeight:'1.8',marginBottom:'2rem'}}>Your document has been created with AI-assisted structure, SC precedents auto-cited, and all attachments indexed.</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/dashboard" style={{background:'#0B1F3A',color:'#fff',padding:'12px 24px',borderRadius:'6px',textDecoration:'none',fontSize:'14px',fontWeight:'700'}}>Open in Editor</Link>
            <button style={{background:'#C9A84C',color:'#0B1F3A',padding:'12px 24px',borderRadius:'6px',border:'none',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>Export as PDF</button>
            <button style={{background:'none',color:'#0B1F3A',padding:'12px 24px',borderRadius:'6px',border:'2px solid #0B1F3A',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>Export as DOCX</button>
          </div>
          <div style={{marginTop:'1.5rem',background:'#EEF2F8',borderRadius:'8px',padding:'1rem',fontSize:'12px',color:'#3D5070',textAlign:'left'}}>
            <strong>AI auto-applied:</strong> Court-specific formatting · Relevant SC precedent citations · Statutory provisions · Standard legal language
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',background:'#FDFAF4',color:'#0B1F3A'}}>
      <Navbar/>
      <div style={{maxWidth:'800px',margin:'0 auto',width:'100%',padding:'2rem 1rem',flex:1}}>

        {/* Stepper */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'4px'}}>
          {STEPS.map((s,i)=>(
            <div key={s} style={{display:'flex',alignItems:'center'}}>
              <div style={{display:'flex',flexDirection:'column' as const,alignItems:'center'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',border:'2px solid',borderColor:i<step?'#1A6B3C':i===step?'#C9A84C':'#D6C9A8',background:i<step?'#1A6B3C':i===step?'#FBF6EA':'#fff',color:i<step?'#fff':i===step?'#0B1F3A':'#7A8BA8'}}>{i<step?'✓':i+1}</div>
                <span style={{fontSize:'10px',marginTop:'4px',color:i===step?'#0B1F3A':i<step?'#1A6B3C':'#7A8BA8',fontWeight:i===step?'600':'400',whiteSpace:'nowrap'}}>{s}</span>
              </div>
              {i<STEPS.length-1&&<div style={{width:'32px',height:'2px',background:i<step?'#1A6B3C':'#EDE6D3',margin:'0 4px 16px'}}/>}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{height:'4px',background:'#EDE6D3',borderRadius:'4px',marginBottom:'1.5rem',overflow:'hidden'}}>
          <div style={{height:'100%',background:'#C9A84C',borderRadius:'4px',width:`${(step/5)*100}%`,transition:'width 0.4s'}}/>
        </div>

        {/* Card */}
        <div style={{background:'#fff',border:'1px solid #EDE6D3',borderRadius:'10px',overflow:'hidden'}}>
          <div style={{background:'#0B1F3A',padding:'1rem 1.5rem'}}>
            <h2 style={{fontFamily:'Georgia,serif',color:'#fff',fontSize:'18px',fontWeight:'500'}}>{['Select Court Level','Document Category & Type','Case Details','Parties','Attachments','Review & Generate'][step]}</h2>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginTop:'2px'}}>{hcName}{sub?' — '+sub:''}</p>
          </div>
          <div style={{padding:'1.5rem'}}>

            {/* STEP 0 */}
            {step===0&&(
              <>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px',marginBottom:'1.5rem'}}>
                  {([['SC','Supreme Court of India','Art. 32, 136, 131 jurisdiction. Binding on all courts.'],['HC','High Court','Art. 226 writ, appellate & supervisory jurisdiction.'],['DC','District / Sessions Court','Original jurisdiction under CPC and CrPC.'],['TRI','Tribunal / Special Court','Special statutory jurisdiction.']] as [Court,string,string][]).map(([code,label,desc])=>(
                    <div key={code} onClick={()=>{setCourt(code);setHcName(code==='SC'?'Supreme Court of India':hcName);setCatIdx(null);setSub(null)}} style={{border:`2px solid ${court===code?'#C9A84C':'#EDE6D3'}`,borderRadius:'8px',padding:'1rem',cursor:'pointer',background:court===code?'#FBF6EA':'#fff'}}>
                      <div style={{fontWeight:'600',color:'#0B1F3A',fontSize:'14px',marginBottom:'4px'}}>{label}</div>
                      <div style={{fontSize:'12px',color:'#7A8BA8',lineHeight:'1.5'}}>{desc}</div>
                    </div>
                  ))}
                </div>
                {court==='HC'&&(
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                    <div style={fieldStyle}><label style={labelStyle}>Select High Court *</label><select style={inputStyle} value={hcName} onChange={e=>setHcName(e.target.value)}><option value="">— Select High Court —</option>{HIGH_COURTS.map(hc=><option key={hc}>{hc}</option>)}</select></div>
                    <div style={fieldStyle}><label style={labelStyle}>Bench / Circuit</label><select style={inputStyle}><option>Principal Bench</option><option>Lucknow Bench</option><option>Nagpur Bench</option><option>Jabalpur Bench</option><option>Gwalior Bench</option></select></div>
                  </div>
                )}
                {court==='DC'&&(
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                    <div style={fieldStyle}><label style={labelStyle}>State *</label><select style={inputStyle}><option>Uttar Pradesh</option><option>Maharashtra</option><option>Delhi</option><option>Bihar</option><option>West Bengal</option><option>Rajasthan</option><option>Karnataka</option><option>Tamil Nadu</option></select></div>
                    <div style={fieldStyle}><label style={labelStyle}>District *</label><input style={inputStyle} placeholder="e.g. Lucknow, Kanpur"/></div>
                  </div>
                )}
                {court==='TRI'&&(
                  <div style={fieldStyle}><label style={labelStyle}>Tribunal / Special Court *</label><select style={inputStyle}>{TRIBUNALS.map(t=><option key={t}>{t}</option>)}</select></div>
                )}
              </>
            )}

            {/* STEP 1 */}
            {step===1&&(
              <>
                <label style={{...labelStyle,marginBottom:'12px'}}>Main Category *</label>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'8px',marginBottom:'1.5rem'}}>
                  {cats.map((c,i)=>(
                    <div key={i} onClick={()=>{setCatIdx(i);setSub(null)}} style={{border:`2px solid ${catIdx===i?'#C9A84C':'#EDE6D3'}`,borderRadius:'8px',padding:'12px 10px',cursor:'pointer',textAlign:'center',background:catIdx===i?'#FBF6EA':'#fff'}}>
                      <div style={{fontSize:'20px',marginBottom:'6px'}}>{c.icon}</div>
                      <div style={{fontSize:'12px',fontWeight:'600',color:'#0B1F3A',lineHeight:'1.3'}}>{c.name}</div>
                      <div style={{fontSize:'10px',color:'#7A8BA8',marginTop:'2px'}}>{c.provision}</div>
                    </div>
                  ))}
                </div>
                {catIdx!==null&&(
                  <>
                    <label style={{...labelStyle,marginBottom:'12px'}}>Document Sub-Type *</label>
                    <div style={{display:'flex',flexWrap:'wrap' as const,gap:'8px'}}>
                      {cats[catIdx].sub.map(s=>(
                        <button key={s} onClick={()=>setSub(s)} style={{fontSize:'12px',padding:'6px 16px',borderRadius:'40px',border:`2px solid ${sub===s?'#0B1F3A':'#EDE6D3'}`,background:sub===s?'#0B1F3A':'#fff',color:sub===s?'#fff':'#3D5070',fontWeight:'500',cursor:'pointer'}}>{s}</button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {/* STEP 2 */}
            {step===2&&(
              <>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                  <div style={fieldStyle}><label style={labelStyle}>Case Number</label><input style={inputStyle} placeholder="e.g. W.P. No. 1234/2026" value={caseNum} onChange={e=>setCaseNum(e.target.value)}/></div>
                  <div style={fieldStyle}><label style={labelStyle}>Year of Filing *</label><input style={inputStyle} defaultValue="2026"/></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1rem'}}>
                  <div style={fieldStyle}><label style={labelStyle}>Date of Filing *</label><input type="date" style={inputStyle} defaultValue={new Date().toISOString().split('T')[0]}/></div>
                  <div style={fieldStyle}><label style={labelStyle}>Date of Hearing</label><input type="date" style={inputStyle}/></div>
                  <div style={fieldStyle}><label style={labelStyle}>Next Date</label><input type="date" style={inputStyle}/></div>
                </div>
                <div style={fieldStyle}><label style={labelStyle}>Brief Facts / Subject Matter *</label><textarea style={{...inputStyle,minHeight:'100px',resize:'vertical' as const}} placeholder="Briefly describe the facts, relief sought, and background..." value={facts} onChange={e=>setFacts(e.target.value)}/></div>
                <div style={fieldStyle}><label style={labelStyle}>Relevant Statutes / Provisions</label><input style={inputStyle} placeholder="e.g. Article 226 Constitution, Section 138 NI Act..." value={statutes} onChange={e=>setStatutes(e.target.value)}/><p style={{fontSize:'11px',color:'#7A8BA8',marginTop:'4px'}}>Comma-separated. AI will suggest additional provisions.</p></div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                  <div style={fieldStyle}><label style={labelStyle}>Language *</label><select style={inputStyle} value={lang} onChange={e=>setLang(e.target.value)}><option>English</option><option>Hindi</option><option>English & Hindi (Bilingual)</option></select></div>
                  <div style={fieldStyle}><label style={labelStyle}>Urgency</label><select style={inputStyle} value={urgency} onChange={e=>setUrgency(e.target.value)}><option>Normal</option><option>Urgent (Mention)</option><option>Very Urgent (Interim Relief)</option><option>Ex-Parte (Without Notice)</option></select></div>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step===3&&(
              <>
                <div style={{background:'#EEF2F8',borderLeft:'4px solid #C9A84C',borderRadius:'0 8px 8px 0',padding:'1rem',marginBottom:'1.5rem'}}>
                  <h3 style={{fontSize:'13px',fontWeight:'600',color:'#0B1F3A',marginBottom:'0.75rem'}}>Petitioner(s) / Appellant(s)</h3>
                  {petitioners.map((p,i)=>(
                    <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                      <input style={{...inputStyle,flex:2}} placeholder={`Full name of petitioner ${i+1}`} value={p} onChange={e=>{const a=[...petitioners];a[i]=e.target.value;setPetitioners(a)}}/>
                      <select style={{...inputStyle,width:'140px',flexShrink:0}}><option>Individual</option><option>Company</option><option>State Govt.</option><option>Union of India</option><option>Trust</option></select>
                      {petitioners.length>1&&<button onClick={()=>setPetitioners(petitioners.filter((_,j)=>j!==i))} style={{color:'#8B1A1A',border:'1px solid #F5C0C0',borderRadius:'4px',padding:'0 10px',background:'none',cursor:'pointer',fontSize:'16px'}}>×</button>}
                    </div>
                  ))}
                  <button onClick={()=>setPetitioners([...petitioners,''])} style={{width:'100%',marginTop:'4px',fontSize:'12px',fontWeight:'600',color:'#0B1F3A',border:'2px dashed #D6C9A8',borderRadius:'6px',padding:'8px',background:'none',cursor:'pointer'}}>+ Add Petitioner</button>
                </div>
                <div style={{background:'#EEF2F8',borderLeft:'4px solid #C9A84C',borderRadius:'0 8px 8px 0',padding:'1rem',marginBottom:'1.5rem'}}>
                  <h3 style={{fontSize:'13px',fontWeight:'600',color:'#0B1F3A',marginBottom:'0.75rem'}}>Respondent(s)</h3>
                  {respondents.map((r,i)=>(
                    <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                      <input style={{...inputStyle,flex:2}} placeholder={`Full name of respondent ${i+1}`} value={r} onChange={e=>{const a=[...respondents];a[i]=e.target.value;setRespondents(a)}}/>
                      <select style={{...inputStyle,width:'140px',flexShrink:0}}><option>Individual</option><option>State Govt.</option><option>Union of India</option><option>Company</option><option>Statutory Authority</option></select>
                      {respondents.length>1&&<button onClick={()=>setRespondents(respondents.filter((_,j)=>j!==i))} style={{color:'#8B1A1A',border:'1px solid #F5C0C0',borderRadius:'4px',padding:'0 10px',background:'none',cursor:'pointer',fontSize:'16px'}}>×</button>}
                    </div>
                  ))}
                  <button onClick={()=>setRespondents([...respondents,''])} style={{width:'100%',marginTop:'4px',fontSize:'12px',fontWeight:'600',color:'#0B1F3A',border:'2px dashed #D6C9A8',borderRadius:'6px',padding:'8px',background:'none',cursor:'pointer'}}>+ Add Respondent</button>
                </div>
                <div style={{border:'1px solid #EDE6D3',borderRadius:'8px',padding:'1rem'}}>
                  <h3 style={{fontSize:'13px',fontWeight:'600',color:'#0B1F3A',marginBottom:'1rem'}}>Counsel Details</h3>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                    <div style={fieldStyle}><label style={labelStyle}>Advocate on Record *</label><input style={inputStyle} placeholder="Full name" value={advocate} onChange={e=>setAdvocate(e.target.value)}/></div>
                    <div style={fieldStyle}><label style={labelStyle}>Bar Council Enrolment No.</label><input style={inputStyle} placeholder="e.g. UP/1234/2010"/></div>
                    <div style={fieldStyle}><label style={labelStyle}>Mobile *</label><input style={inputStyle} type="tel" placeholder="+91 98765 43210"/></div>
                    <div style={fieldStyle}><label style={labelStyle}>Email</label><input style={inputStyle} type="email" placeholder="advocate@lawfirm.com"/></div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 4 */}
            {step===4&&(
              <>
                <div style={{background:'#EEF4FB',border:'1px solid #C5D8F0',borderRadius:'8px',padding:'12px',marginBottom:'1.5rem',fontSize:'12px',color:'#1A4B8B',lineHeight:'1.6'}}>
                  <strong>Required for {sub||'this document'}:</strong> Petition / Application · Affidavit · Vakalatnama · Annexures (certified copies) · Court Fees Receipt
                </div>
                <label style={{display:'block',cursor:'pointer'}}>
                  <div style={{border:'2px dashed #D6C9A8',borderRadius:'8px',padding:'2.5rem',textAlign:'center',background:'#fff'}}>
                    <div style={{width:'48px',height:'48px',background:'#EEF2F8',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',fontSize:'24px'}}>📎</div>
                    <div style={{fontWeight:'600',color:'#0B1F3A',fontSize:'14px',marginBottom:'4px'}}>Click to upload or drag & drop</div>
                    <div style={{fontSize:'12px',color:'#7A8BA8'}}>PDF, DOCX, JPG/PNG, XLS, ZIP supported</div>
                  </div>
                  <input type="file" style={{display:'none'}} multiple onChange={e=>{const names=Array.from(e.target.files||[]).map(f=>f.name);setFiles([...files,...names])}}/>
                </label>
                {files.length>0&&(
                  <div style={{marginTop:'1rem'}}>
                    {files.map((f,i)=>(
                      <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',background:'#E8F5EE',border:'1px solid #A8D4B8',borderRadius:'6px',padding:'10px 14px',marginBottom:'8px'}}>
                        <span style={{fontSize:'10px',fontWeight:'700',background:'#C0DDB8',color:'#1A4B3C',padding:'2px 6px',borderRadius:'3px'}}>{f.split('.').pop()?.toUpperCase()}</span>
                        <span style={{flex:1,fontSize:'13px',fontWeight:'500',color:'#0B1F3A',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f}</span>
                        <select style={{...inputStyle,width:'160px',fontSize:'11px',padding:'4px 8px'}}><option>Select label...</option><option>Vakalatnama</option><option>Petition</option><option>Affidavit</option><option>Annexure A</option><option>Annexure B</option><option>Impugned Order</option><option>FIR Copy</option><option>Court Fees Receipt</option></select>
                        <button onClick={()=>setFiles(files.filter((_,j)=>j!==i))} style={{color:'#8B1A1A',background:'none',border:'none',fontSize:'18px',cursor:'pointer'}}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* STEP 5 */}
            {step===5&&(
              <div style={{background:'#0B1F3A',borderRadius:'10px',padding:'1.5rem',color:'#fff'}}>
                <h3 style={{fontFamily:'Georgia,serif',fontSize:'18px',borderBottom:'1px solid rgba(255,255,255,0.15)',paddingBottom:'12px',marginBottom:'1rem'}}>Document Summary</h3>
                {[['Court',hcName],['Document Type',(catIdx!==null?cats[catIdx]?.name:'—')+' → '+(sub||'—')],['Case Number',caseNum||'New Filing'],['Petitioner(s)',petitioners.filter(Boolean).join(', ')||'(not filled)'],['Respondent(s)',respondents.filter(Boolean).join(', ')||'(not filled)'],['Counsel',advocate||'(not filled)'],['Language',lang],['Urgency',urgency],['Statutes',statutes||'AI will suggest'],['Attachments',files.length?files.join(', '):'No files uploaded']].map(([l,v])=>(
                  <div key={l} style={{display:'flex',gap:'1rem',marginBottom:'10px'}}>
                    <span style={{fontSize:'11px',fontWeight:'700',textTransform:'uppercase' as const,letterSpacing:'0.06em',color:'rgba(255,255,255,0.4)',width:'130px',flexShrink:0,paddingTop:'1px'}}>{l}</span>
                    <span style={{fontSize:'13px',color:'#fff',flex:1}}>{v}</span>
                  </div>
                ))}
                <div style={{marginTop:'1rem',background:'#EEF4FB',borderRadius:'6px',padding:'12px',fontSize:'12px',color:'#1A4B8B',lineHeight:'1.7'}}>
                  AI will auto-apply: {hcName} formatting · SC precedents for <strong>{sub||'this document'}</strong> · Standard legal recitals · Court-specific header & footer
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nav buttons */}
        <div style={{display:'flex',justifyContent:'space-between',marginTop:'1.25rem'}}>
          {step>0
            ?<button onClick={()=>setStep(step-1)} style={{border:'2px solid #D6C9A8',background:'none',color:'#3D5070',padding:'10px 24px',borderRadius:'6px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>← Back</button>
            :<div/>}
          {step<5
            ?<button onClick={()=>setStep(step+1)} style={{background:'#0B1F3A',color:'#fff',padding:'10px 24px',borderRadius:'6px',fontSize:'14px',fontWeight:'600',cursor:'pointer',border:'none'}}>Next →</button>
            :<button onClick={()=>setDone(true)} style={{background:'#C9A84C',color:'#0B1F3A',padding:'12px 32px',borderRadius:'6px',fontSize:'15px',fontWeight:'700',cursor:'pointer',border:'none'}}>Generate Draft Document →</button>}
        </div>
      </div>
    </div>
  )
}
