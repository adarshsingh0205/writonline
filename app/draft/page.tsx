'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { DOCUMENT_CATEGORIES, HIGH_COURTS } from '@/lib/data'

type Court = 'SC' | 'HC' | 'DC' | 'TRI'

const COURTS: { code: Court; label: string; desc: string }[] = [
  { code: 'SC', label: 'Supreme Court of India', desc: 'Binding on all courts. Art. 32, 136, 131, 137 jurisdiction.' },
  { code: 'HC', label: 'High Court', desc: 'Binding within state. Art. 226 writ, appellate, revisional, supervisory jurisdiction.' },
  { code: 'DC', label: 'District / Sessions Court', desc: 'Original jurisdiction in civil and criminal matters under CPC and CrPC.' },
  { code: 'TRI', label: 'Tribunal / Special Court', desc: 'Special statutory jurisdiction. Appeals lie to HC / SC.' },
]

const TRIBUNALS = [
  'National Green Tribunal (NGT)', 'National Company Law Tribunal (NCLT)',
  'National Company Law Appellate Tribunal (NCLAT)', 'Income Tax Appellate Tribunal (ITAT)',
  'Customs Excise & Service Tax Appellate Tribunal (CESTAT)', 'Armed Forces Tribunal (AFT)',
  'Central Administrative Tribunal (CAT)', 'Consumer Disputes Redressal Commission (NCDRC)',
  'Motor Accident Claims Tribunal (MACT)', 'Debt Recovery Tribunal (DRT)',
  'Real Estate Regulatory Authority (RERA)', 'Labour Court / Industrial Tribunal',
  'CBI Court', 'PMLA Special Court', 'NIA Court', 'POCSO Court', 'Fast Track Court',
]

const STEPS = ['Court & Level', 'Document Type', 'Case Details', 'Parties', 'Attachments', 'Review']

export default function DraftPage() {
  const [step, setStep] = useState(0)
  const [court, setCourt] = useState<Court>('SC')
  const [hcName, setHcName] = useState('Supreme Court of India')
  const [catIdx, setCatIdx] = useState<number | null>(null)
  const [sub, setSub] = useState<string | null>(null)
  const [caseNum, setCaseNum] = useState('')
  const [facts, setFacts] = useState('')
  const [statutes, setStatutes] = useState('')
  const [lang, setLang] = useState('English')
  const [urgency, setUrgency] = useState('Normal')
  const [petitioners, setPetitioners] = useState([''])
  const [respondents, setRespondents] = useState([''])
  const [advocate, setAdvocate] = useState('')
  const [files, setFiles] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const cats = DOCUMENT_CATEGORIES[court === 'SC' ? 'SC' : 'HC'] ?? DOCUMENT_CATEGORIES.HC

  function next() { if (step < 5) setStep(step + 1) }
  function back() { if (step > 0) setStep(step - 1) }

  if (done) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h1 className="font-serif text-3xl text-navy mb-3">Draft Generated Successfully</h1>
            <p className="text-[#7A8BA8] text-sm mb-8 leading-relaxed">Your document has been created with AI-assisted structure, SC precedents auto-cited, and all attachments indexed.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard" className="btn-navy text-sm py-3 px-6">Open in Editor</Link>
              <button className="btn-gold text-sm py-3 px-6">Export as PDF</button>
              <button className="btn-outline text-sm py-3 px-6">Export as DOCX</button>
            </div>
            <div className="mt-6 bg-navy-pale rounded-lg p-4 text-xs text-[#3D5070] text-left">
              <strong>AI auto-applied:</strong> Court-specific formatting · Relevant SC precedent citations · Statutory provisions · Standard legal language per selected document type
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex-1">

        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-6 flex-wrap">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${i < step ? 'bg-green-600 border-green-600 text-white' : i === step ? 'bg-gold-pale border-gold text-navy' : 'bg-white border-[#D6C9A8] text-[#7A8BA8]'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-[10px] mt-1 font-medium hidden sm:block ${i === step ? 'text-navy' : i < step ? 'text-green-700' : 'text-[#7A8BA8]'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`w-8 sm:w-12 h-0.5 mb-3 mx-1 transition-colors ${i < step ? 'bg-green-600' : 'bg-[#EDE6D3]'}`} />}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="h-1 bg-[#EDE6D3] rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-gold rounded-full transition-all duration-500" style={{ width: `${((step) / 5) * 100}%` }} />
        </div>

        {/* STEP 0: Court */}
        {step === 0 && (
          <div className="card">
            <div className="bg-navy px-6 py-4"><h2 className="font-serif text-white text-lg font-medium">Select Court Level</h2><p className="text-white/50 text-xs mt-0.5">Choose the court where this document will be filed</p></div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {COURTS.map((c) => (
                  <div key={c.code} onClick={() => { setCourt(c.code); setHcName(c.code === 'SC' ? 'Supreme Court of India' : hcName); setCatIdx(null); setSub(null) }}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${court === c.code ? 'border-gold bg-gold-pale' : 'border-[#EDE6D3] hover:border-gold hover:bg-gold-pale'}`}>
                    <div className="font-semibold text-navy text-sm mb-1">{c.label}</div>
                    <div className="text-xs text-[#7A8BA8] leading-relaxed">{c.desc}</div>
                  </div>
                ))}
              </div>
              {court === 'HC' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Select High Court *</label>
                    <select className="input-field" value={hcName} onChange={(e) => setHcName(e.target.value)}>
                      <option value="">— Select High Court —</option>
                      {HIGH_COURTS.map((hc) => <option key={hc}>{hc}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Bench / Circuit</label>
                    <select className="input-field">
                      <option>Principal Bench</option><option>Lucknow Bench</option>
                      <option>Nagpur Bench</option><option>Jabalpur Bench</option>
                      <option>Gwalior Bench</option><option>Dharwad Bench</option>
                    </select>
                  </div>
                </div>
              )}
              {court === 'DC' && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">State *</label>
                    <select className="input-field"><option>Uttar Pradesh</option><option>Maharashtra</option><option>Delhi</option><option>Bihar</option><option>West Bengal</option><option>Rajasthan</option><option>Karnataka</option><option>Tamil Nadu</option></select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">District *</label>
                    <input className="input-field" placeholder="e.g. Lucknow, Kanpur" />
                  </div>
                </div>
              )}
              {court === 'TRI' && (
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Tribunal / Special Court *</label>
                  <select className="input-field">{TRIBUNALS.map((t) => <option key={t}>{t}</option>)}</select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 1: Document Type */}
        {step === 1 && (
          <div className="card">
            <div className="bg-navy px-6 py-4"><h2 className="font-serif text-white text-lg font-medium">Select Document Category & Type</h2><p className="text-white/50 text-xs mt-0.5">{hcName}</p></div>
            <div className="p-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-3">Main Category *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-5">
                {cats.map((c, i) => (
                  <div key={i} onClick={() => { setCatIdx(i); setSub(null) }}
                    className={`border-2 rounded-lg p-3 cursor-pointer text-center transition-all ${catIdx === i ? 'border-gold bg-gold-pale' : 'border-[#EDE6D3] hover:border-gold hover:bg-gold-pale'}`}>
                    <div className="text-xl mb-1">{c.icon}</div>
                    <div className="text-xs font-semibold text-navy leading-tight">{c.name}</div>
                    <div className="text-[10px] text-[#7A8BA8] mt-0.5">{c.provision}</div>
                  </div>
                ))}
              </div>
              {catIdx !== null && (
                <>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-3">Document Sub-Type *</label>
                  <div className="flex flex-wrap gap-2">
                    {cats[catIdx].sub.map((s) => (
                      <button key={s} onClick={() => setSub(s)}
                        className={`text-xs px-3 py-1.5 rounded-full border-2 font-medium transition-all ${sub === s ? 'border-navy bg-navy text-white' : 'border-[#EDE6D3] text-[#3D5070] hover:border-gold hover:text-navy'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Case Details */}
        {step === 2 && (
          <div className="card">
            <div className="bg-navy px-6 py-4"><h2 className="font-serif text-white text-lg font-medium">Case Details</h2><p className="text-white/50 text-xs mt-0.5">{sub} — {hcName}</p></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Case Number / Diary No.</label>
                  <input className="input-field" placeholder="e.g. W.P. No. 1234/2026" value={caseNum} onChange={(e) => setCaseNum(e.target.value)} />
                  <p className="text-[11px] text-[#7A8BA8] mt-1">Leave blank if not yet assigned</p>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Year of Filing *</label>
                  <input className="input-field" defaultValue="2026" />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Date of Filing *</label>
                  <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Date of Hearing</label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Next Date</label>
                  <input type="date" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Brief Facts / Subject Matter *</label>
                <textarea className="input-field" rows={5} placeholder="Briefly describe the facts giving rise to this matter, the relief sought, and relevant background..." value={facts} onChange={(e) => setFacts(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Relevant Statutes / Provisions</label>
                <input className="input-field" placeholder="e.g. Article 226 Constitution, Section 138 NI Act, Order VII Rule 11 CPC" value={statutes} onChange={(e) => setStatutes(e.target.value)} />
                <p className="text-[11px] text-[#7A8BA8] mt-1">Comma-separated. AI will suggest additional applicable provisions.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Language *</label>
                  <select className="input-field" value={lang} onChange={(e) => setLang(e.target.value)}><option>English</option><option>Hindi</option><option>English & Hindi (Bilingual)</option></select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Urgency</label>
                  <select className="input-field" value={urgency} onChange={(e) => setUrgency(e.target.value)}><option>Normal</option><option>Urgent (Mention)</option><option>Very Urgent (Interim Relief)</option><option>Ex-Parte (Without Notice)</option></select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Parties */}
        {step === 3 && (
          <div className="card">
            <div className="bg-navy px-6 py-4"><h2 className="font-serif text-white text-lg font-medium">Parties to the Case</h2><p className="text-white/50 text-xs mt-0.5">Add all petitioners, respondents, and counsel details</p></div>
            <div className="p-6 space-y-6">
              <div className="bg-navy-pale border-l-4 border-gold rounded-r-lg p-4">
                <h3 className="font-semibold text-navy text-sm mb-3">Petitioner(s) / Appellant(s)</h3>
                {petitioners.map((p, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input className="input-field flex-1" placeholder={`Full name of petitioner ${i + 1}`} value={p} onChange={(e) => { const a = [...petitioners]; a[i] = e.target.value; setPetitioners(a) }} />
                    <select className="input-field w-36 shrink-0"><option>Individual</option><option>Company</option><option>State Govt.</option><option>Union of India</option><option>Trust / Society</option></select>
                    {petitioners.length > 1 && <button onClick={() => setPetitioners(petitioners.filter((_, j) => j !== i))} className="text-red-700 border border-red-200 rounded px-2 text-xs hover:bg-red-50">×</button>}
                  </div>
                ))}
                <button onClick={() => setPetitioners([...petitioners, ''])} className="w-full mt-1 text-xs font-semibold text-navy border-2 border-dashed border-[#D6C9A8] rounded py-2 hover:border-gold hover:bg-gold-pale transition-all">+ Add Petitioner</button>
              </div>
              <div className="bg-navy-pale border-l-4 border-gold rounded-r-lg p-4">
                <h3 className="font-semibold text-navy text-sm mb-3">Respondent(s) / Opposite Party(s)</h3>
                {respondents.map((r, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input className="input-field flex-1" placeholder={`Full name of respondent ${i + 1}`} value={r} onChange={(e) => { const a = [...respondents]; a[i] = e.target.value; setRespondents(a) }} />
                    <select className="input-field w-36 shrink-0"><option>Individual</option><option>State Govt.</option><option>Union of India</option><option>Company</option><option>Statutory Authority</option></select>
                    {respondents.length > 1 && <button onClick={() => setRespondents(respondents.filter((_, j) => j !== i))} className="text-red-700 border border-red-200 rounded px-2 text-xs hover:bg-red-50">×</button>}
                  </div>
                ))}
                <button onClick={() => setRespondents([...respondents, ''])} className="w-full mt-1 text-xs font-semibold text-navy border-2 border-dashed border-[#D6C9A8] rounded py-2 hover:border-gold hover:bg-gold-pale transition-all">+ Add Respondent</button>
              </div>
              <div className="border border-[#EDE6D3] rounded-lg p-4">
                <h3 className="font-semibold text-navy text-sm mb-3">Counsel Details</h3>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Advocate on Record *</label>
                    <input className="input-field" placeholder="Full name" value={advocate} onChange={(e) => setAdvocate(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Bar Council Enrolment No.</label>
                    <input className="input-field" placeholder="e.g. UP/1234/2010" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Mobile *</label>
                    <input className="input-field" type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8BA8] mb-1.5">Email</label>
                    <input className="input-field" type="email" placeholder="advocate@lawfirm.com" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Attachments */}
        {step === 4 && (
          <div className="card">
            <div className="bg-navy px-6 py-4"><h2 className="font-serif text-white text-lg font-medium">Attachments & Supporting Documents</h2><p className="text-white/50 text-xs mt-0.5">Upload all required documents for this filing</p></div>
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 text-xs text-blue-800 leading-relaxed">
                <strong>Required for {sub || 'this document'}:</strong> Petition / Application · Affidavit · Vakalatnama · Annexures (certified copies) · Court Fees Receipt
              </div>
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-[#D6C9A8] rounded-lg p-8 text-center hover:border-gold hover:bg-gold-pale transition-all">
                  <div className="w-10 h-10 bg-navy-pale rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  </div>
                  <div className="font-semibold text-navy text-sm mb-1">Click to upload or drag & drop</div>
                  <div className="text-xs text-[#7A8BA8]">PDF, DOCX, JPG/PNG, XLS, ZIP supported</div>
                  <div className="flex gap-2 justify-center mt-3">
                    {['PDF', 'DOCX', 'JPG/PNG', 'XLS', 'ZIP'].map((f) => (
                      <span key={f} className="text-[10px] font-bold px-2 py-0.5 bg-navy-pale text-navy rounded tracking-wide">{f}</span>
                    ))}
                  </div>
                </div>
                <input type="file" className="hidden" multiple onChange={(e) => {
                  const names = Array.from(e.target.files || []).map((f) => f.name)
                  setFiles([...files, ...names])
                }} />
              </label>
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
                      <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded">{f.split('.').pop()?.toUpperCase()}</span>
                      <span className="flex-1 text-sm font-medium text-navy truncate">{f}</span>
                      <select className="text-xs border border-[#EDE6D3] rounded px-2 py-1 text-[#3D5070] outline-none">
                        <option>Select label...</option>
                        <option>Vakalatnama</option><option>Petition / Application</option><option>Affidavit</option>
                        <option>Annexure A</option><option>Annexure B</option><option>Impugned Order</option>
                        <option>FIR Copy</option><option>Identity Proof</option><option>Court Fees Receipt</option>
                      </select>
                      <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-red-700 text-xs hover:text-red-900">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Review */}
        {step === 5 && (
          <div className="card">
            <div className="bg-navy px-6 py-4"><h2 className="font-serif text-white text-lg font-medium">Review & Generate Draft</h2><p className="text-white/50 text-xs mt-0.5">Confirm all details before AI generates your document</p></div>
            <div className="p-6">
              <div className="bg-navy rounded-xl p-5 text-white mb-4">
                <h3 className="font-serif text-lg border-b border-white/15 pb-3 mb-4">Document Summary</h3>
                {[
                  ['Court', hcName],
                  ['Document Type', `${catIdx !== null ? cats[catIdx]?.name : '—'} → ${sub || '—'}`],
                  ['Case Number', caseNum || 'New Filing'],
                  ['Petitioner(s)', petitioners.filter(Boolean).join(', ') || '(not filled)'],
                  ['Respondent(s)', respondents.filter(Boolean).join(', ') || '(not filled)'],
                  ['Counsel', advocate || '(not filled)'],
                  ['Language', lang],
                  ['Urgency', urgency],
                  ['Statutes', statutes || 'AI will suggest based on document type'],
                  ['Facts', facts ? facts.substring(0, 120) + (facts.length > 120 ? '...' : '') : '(not filled)'],
                  ['Attachments', files.length ? files.join(', ') : 'No files uploaded'],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-4 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 w-32 flex-shrink-0 pt-0.5">{label}</span>
                    <span className="text-sm text-white flex-1">{value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-3 text-xs text-blue-800 leading-relaxed">
                AI will auto-apply: {hcName} formatting rules · Relevant SC precedents for <strong>{sub || 'this document type'}</strong> · Standard legal recitals · Court-specific header & footer · Natural justice references
              </div>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-5">
          {step > 0
            ? <button onClick={back} className="btn-outline text-sm py-2.5 px-6">← Back</button>
            : <div />}
          {step < 5
            ? <button onClick={next} className="btn-navy text-sm py-2.5 px-6">Next →</button>
            : <button onClick={() => setDone(true)} className="btn-gold text-base py-3 px-8 font-bold">Generate Draft Document →</button>}
        </div>
      </div>
      <Footer />
    </div>
  )
}
