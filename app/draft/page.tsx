'use client'
import { useState } from 'react'
import Link from 'next/link'

const HIGH_COURTS = ['Allahabad High Court','Bombay High Court','Calcutta High Court','Delhi High Court','Madras High Court','Karnataka High Court','Kerala High Court','Gujarat High Court','Rajasthan High Court','Patna High Court','Punjab & Haryana High Court','Madhya Pradesh High Court','Andhra Pradesh High Court','Telangana High Court','Himachal Pradesh High Court','Jammu & Kashmir High Court','Jharkhand High Court','Chhattisgarh High Court','Uttarakhand High Court','Gauhati High Court','Orissa High Court','Sikkim High Court','Tripura High Court','Manipur High Court','Meghalaya High Court']
const TRIBUNALS = ['National Green Tribunal (NGT)','National Company Law Tribunal (NCLT)','NCLAT','Income Tax Appellate Tribunal (ITAT)','CESTAT','Central Administrative Tribunal (CAT)','Consumer Disputes Redressal Commission (NCDRC)','Motor Accident Claims Tribunal (MACT)','Debt Recovery Tribunal (DRT)','RERA','Labour Court / Industrial Tribunal','CBI Court','PMLA Special Court','NIA Court','POCSO Court','Fast Track Court']

const SC_CATS = [
  {icon:'⚖',name:'Writ Jurisdiction',provision:'Art. 32',sub:['Writ Petition (Civil)','Writ Petition (Criminal)','Habeas Corpus','Mandamus','Certiorari','Prohibition','Quo Warranto','PIL — Environment','PIL — Human Rights','PIL — Prison Reform','PIL — Child Rights','PIL — Women Safety']},
  {icon:'📋',name:'Appellate Jurisdiction',provision:'Art. 136',sub:['Special Leave Petition (Civil)','Special Leave Petition (Criminal)','Appeal by Certificate (Art.132)','Appeal by Certificate (Art.133)','Appeal by Certificate (Art.134)','Transfer Petition (Civil)','Transfer Petition (Criminal)']},
  {icon:'🔍',name:'Review & Curative',provision:'Art. 137',sub:['Review Petition (Civil)','Review Petition (Criminal)','Curative Petition']},
  {icon:'📜',name:'Original Jurisdiction',provision:'Art. 131',sub:['Inter-State Dispute','Centre vs State','Presidential Reference (Art. 143)','Election Petition (Presidential/VP)']},
  {icon:'📑',name:'Contempt',provision:'Art. 129',sub:['Contempt Petition (Civil)','Contempt Petition (Criminal)','Suo Motu Contempt','Contempt of High Court']},
  {icon:'⚡',name:'SC Orders & Directions',provision:'Art. 136/142',sub:[
    // Constitutional Orders
    'Stay Order (SC)','Status Quo Order (SC)','Ad-Interim Stay (SC)','Absolute Stay (SC)','Conditional Stay (SC)',
    // Bail Orders
    'Bail Order (SC)','Anticipatory Bail (SC)','Interim Bail (SC)','Medical Bail (SC)','Bail Cancellation Order (SC)',
    // Directions
    'Direction to State Government','Direction to Central Government','Direction to Statutory Authority','Direction to High Court',
    'Direction for CBI Investigation','Direction for SIT Investigation','Direction for Compliance Report',
    // Constitutional Directions
    'Declaration of Unconstitutionality','Striking Down of Legislation','Reading Down of Provision',
    'Guidelines under Art. 142','Compensation Award (Art. 142)','Mandamus Direction (SC)',
    // Interim Orders
    'Interim Order (SC)','Interim Injunction (SC)','Interim Compensation (SC)',
    // Criminal Orders
    'Sentence Modification (SC)','Acquittal Order (SC)','Conviction Order (SC)','Death Sentence Confirmation',
    'Commutation of Sentence','Remission of Sentence','Pardon Direction',
    // Civil Orders
    'Decree (SC)','Ex-Parte Decree (SC)','Consent Order (SC)','Compromise Decree (SC)',
    // Miscellaneous
    'Order for Retrial','Transfer of Case','Consolidation of Cases','Appointment of Amicus Curiae',
    'Appointment of Court Commissioner','Order for Mediation','Sealing Order (SC)','Contempt Notice (SC)',
  ]},
]

const HC_CATS = [
  {icon:'⚖',name:'Writ Jurisdiction',provision:'Art. 226',sub:['Writ Petition (Civil)','Writ Petition (Criminal)','Habeas Corpus','Mandamus','Certiorari','Prohibition','Quo Warranto','PIL','PIL — Environment','PIL — Road Safety','PIL — Healthcare','PIL — Education']},
  {icon:'🏛',name:'Civil Jurisdiction',provision:'CPC',sub:['Regular Civil Suit','Suit for Declaration','Suit for Injunction','Suit for Specific Performance','Suit for Partition','Suit for Possession','Matrimonial Petition (Divorce)','Matrimonial Petition (Restitution)','Matrimonial Petition (Annulment)','Letter Patent Appeal','Testamentary Suit','Succession Certificate','Probate Petition','Guardianship Petition']},
  {icon:'🔒',name:'Criminal Jurisdiction',provision:'CrPC',sub:['Criminal Appeal','Criminal Revision','Criminal Reference','Anticipatory Bail (S.438)','Regular Bail (S.439)','Interim Bail','Medical Bail','Bail Cancellation','Quashing of FIR (S.482)','Quashing of Chargesheet','Quashing of Cognizance','Quashing of Summons']},
  {icon:'📋',name:'Appellate Jurisdiction',provision:'CPC/CrPC',sub:['First Appeal (CPC Order 41)','Second Appeal (CPC S.100)','Regular First Appeal','Regular Second Appeal','Letters Patent Appeal','Revision (CPC S.115)','Revision (CrPC S.397)','Criminal Appeal against Acquittal','Criminal Appeal against Conviction']},
  {icon:'📜',name:'HC Civil Orders',provision:'CPC/Art.226',sub:[
    // Injunction Orders
    'Temporary Injunction (Order 39)','Permanent Injunction','Mandatory Injunction','Mareva Injunction',
    'Anti-suit Injunction','Injunction — IPR / Trademark','Injunction — Property Dispute',
    // Stay Orders
    'Stay of Proceedings','Stay of Execution','Stay of Decree','Interim Stay (HC)','Conditional Stay (HC)',
    'Stay of Auction','Stay of Dispossession','Stay of Demolition',
    // Attachment Orders
    'Attachment Before Judgment (Order 38)','Attachment of Property','Garnishee Order',
    'Attachment of Bank Account','Attachment of Salary','Receiver Order (Order 40)',
    // Execution Orders
    'Execution Decree','Warrant of Arrest (Execution)','Delivery of Possession','Arrest Before Judgment',
    // Miscellaneous Civil
    'Interim Compensation','Status Quo Order (HC)','Ex-Parte Order (HC)','Ad-Interim Order (HC)',
    'Restoration Application Order','Condonation of Delay Order','Amendment of Pleadings Order',
    'Commission for Local Investigation','Commission for Examination of Witness',
  ]},
  {icon:'🔐',name:'HC Criminal Orders',provision:'CrPC/IPC',sub:[
    // Bail Orders
    'Bail Order — IPC Offences','Bail Order — NDPS Act','Bail Order — PMLA','Bail Order — POCSO',
    'Bail Order — Rape / Sexual Assault','Bail Order — Murder (S.302)','Bail Order — Dowry Death',
    'Bail Order — Corruption / Prevention of Corruption Act','Bail Order — Cyber Crime',
    'Bail Order — Economic Offence','Bail Order — Cheating (S.420)','Bail Order — NI Act S.138',
    'Bail Cancellation Order','Interim Bail (Medical Grounds)','Interim Bail (Personal Grounds)',
    // Quashing Orders
    'Quashing of FIR — Matrimonial Dispute','Quashing of FIR — Commercial Dispute',
    'Quashing of FIR — S.498A IPC','Quashing of FIR — S.138 NI Act',
    'Quashing of Chargesheet','Quashing of Cognizance Order','Quashing of Summoning Order',
    // Sentencing / Conviction
    'Conviction Order (HC)','Acquittal Order (HC)','Sentence Enhancement','Sentence Reduction',
    'Suspension of Sentence','Death Sentence — Murder Reference','Death Sentence — Commutation',
    // Remand & Custody
    'Remand Order — Police Custody','Remand Order — Judicial Custody','Bail during Trial',
    // Miscellaneous Criminal
    'Compensation Order (S.357 CrPC)','Restitution Order','Probation Order','Fine Order',
    'Forfeiture Order','Confiscation Order','Cancellation of Arms Licence','Externment Order',
  ]},
  {icon:'👨‍👩‍👧',name:'Family Court Orders',provision:'HMA/MMDA/DVA',sub:[
    'Divorce Decree — Mutual Consent','Divorce Decree — Cruelty','Divorce Decree — Desertion',
    'Divorce Decree — Adultery','Restitution of Conjugal Rights','Judicial Separation Order',
    'Annulment of Marriage','Maintenance Order (S.125 CrPC)','Interim Maintenance Order',
    'Permanent Alimony Order','Child Custody Order — Interim','Child Custody Order — Final',
    'Visitation Rights Order','Guardianship Order','Adoption Order',
    'Domestic Violence Protection Order','Residence Order (DVA)','Monetary Relief Order (DVA)',
    'Custody Order (DVA)','Compensation Order (DVA)',
    'Matrimonial Property Division','Dowry Return Order','Stridhan Return Order',
  ]},
  {icon:'🌿',name:'Revenue & Land Orders',provision:'State Acts',sub:[
    'Land Acquisition Award','Enhanced Compensation Order','Reference Order (S.18 LA Act)',
    'Revenue Court Appeal Order','Tenancy Dispute Order','Eviction Order — Rent Control',
    'Rent Fixation Order','Consolidation Appeal Order','Mutation Order','Partition Order',
    'Nazul Property Order','Forest Land Dispute Order','Tribal Land Protection Order',
    'Urban Land Ceiling Order','Benami Property Order',
  ]},
  {icon:'💰',name:'Company & Tax Orders',provision:'Companies Act / IT Act',sub:[
    'Income Tax Appeal Order','GST Appeal Order','Customs Duty Order','Stamp Duty Order',
    'Company Petition Order','Winding Up Order','Liquidation Order','NCLT Appeal Order',
    'Insolvency Resolution Order','SARFAESI Challenge Order','DRT Appeal Order',
    'Commercial Suit Decree','Commercial Injunction Order',
  ]},
  {icon:'👔',name:'Service & Labour Orders',provision:'Art. 226 / Service Rules',sub:[
    'Reinstatement Order','Back Wages Order','Promotion Order','Seniority Order',
    'Departmental Inquiry Stay','Suspension Challenge Order','Dismissal Challenge Order',
    'Compulsory Retirement Challenge','Pay & Allowances Order','Pension Order',
    'Service Benefits Order','Transfer Challenge Order','Labour Court Order Challenge',
    'Industrial Dispute Order','Retrenchment Challenge Order','Workmen Compensation Order',
  ]},
  {icon:'⚡',name:'Contempt & Miscellaneous',provision:'Art. 215 / Contempt Act',sub:[
    'Civil Contempt Order','Criminal Contempt Order','Contempt Notice','Commitment Order',
    'Purging of Contempt Order','Motor Accident Claim (MACT Appeal)','NGT Order Challenge',
    'Election Petition Order','Adoption Order (HC)','Succession Certificate Order',
    'Letters of Administration','Writ of Possession','Writ of Delivery',
  ]},
]

const DC_CATS = [
  {icon:'⚖',name:'Civil Suits',provision:'CPC',sub:[
    'Suit for Recovery of Money','Suit for Declaration','Suit for Permanent Injunction',
    'Suit for Mandatory Injunction','Suit for Specific Performance','Suit for Partition',
    'Suit for Possession','Suit for Damages','Suit for Rendition of Accounts',
    'Summary Suit (Order 37)','Suit for Redemption of Mortgage','Suit for Foreclosure',
    'Suit for Eviction (Transfer of Property Act)','Suit on Promissory Note','Suit on Cheque',
  ]},
  {icon:'📜',name:'Civil Orders',provision:'CPC',sub:[
    // Injunction Orders
    'Temporary Injunction (Order 39 Rule 1)','Temporary Injunction (Order 39 Rule 2)',
    'Ad-Interim Injunction','Ex-Parte Injunction','Injunction against Dispossession',
    'Injunction against Construction','Injunction against Alienation',
    // Stay Orders  
    'Stay of Suit','Stay of Execution of Decree','Conditional Stay',
    // Attachment Orders
    'Attachment Before Judgment (Order 38 Rule 5)','Attachment of Immovable Property',
    'Attachment of Movable Property','Attachment of Bank Account','Garnishee Order',
    'Appointment of Receiver (Order 40)','Interim Receiver Order',
    // Execution Orders
    'Execution of Decree','Delivery of Possession Order','Arrest in Execution',
    'Detention in Civil Prison','Sale of Attached Property','Auction Sale Order',
    // Interlocutory Orders
    'Status Quo Order','Ex-Parte Decree','Setting Aside Ex-Parte Decree',
    'Amendment of Plaint / Written Statement','Rejection of Plaint (Order 7 Rule 11)',
    'Return of Plaint','Striking of Defence','Local Commissioner Order',
    'Commission for Examination of Witness','Examination of Judgment Debtor',
    'Condonation of Delay','Restoration of Suit','Substitution of Legal Representatives',
    // Compromise
    'Compromise Decree (Order 23 Rule 3)','Consent Order','Consent Decree',
  ]},
  {icon:'🔒',name:'Criminal Cases & Orders',provision:'CrPC / IPC',sub:[
    // Trials
    'Sessions Trial — Conviction','Sessions Trial — Acquittal','Magistrate Trial — Conviction',
    'Magistrate Trial — Acquittal','Summary Trial Order','POCSO Trial Order',
    'NI Act S.138 Trial Order','Domestic Violence Trial Order',
    // Bail Orders
    'Bail Order — Sessions Court','Bail Order — Magistrate Court',
    'Bail Order — NDPS Act','Bail Order — SC/ST Act','Bail Order — Juvenile',
    'Bail Cancellation — Sessions Court','Interim Bail — Sessions Court',
    'Surety Bond Order','Personal Bond Order','Cash Security Order',
    // Pre-Trial Orders
    'Remand Order — Police Custody (S.167)','Remand Order — Judicial Custody',
    'Extension of Remand','Production Warrant','Non-Bailable Warrant','Bailable Warrant',
    'Proclamation Order (S.82 CrPC)','Attachment under S.83 CrPC',
    // Sentencing Orders
    'Sentence Order — Imprisonment','Sentence Order — Fine',
    'Sentence Order — Both (Imprisonment + Fine)','Probation Order (S.360 CrPC)',
    'Compensation to Victim (S.357 CrPC)','Restitution Order',
    // Miscellaneous Criminal
    'Maintenance Order (S.125 CrPC)','Interim Maintenance Order',
    'Protection Order (DVA)','Cognizance Order','Summoning Order',
    'Discharge Order','Framing of Charges Order','Committal Order to Sessions',
    'Order for Medical Examination','Order for DNA Test','Order for Lie Detector Test',
    'Cancellation of Bail','Forfeiture of Surety','Arms Licence Cancellation',
  ]},
  {icon:'👨‍👩‍👧',name:'Family Court Orders',provision:'HMA / MMDA / DVA',sub:[
    'Divorce Decree — Mutual Consent (S.13B HMA)','Divorce Decree — Cruelty (S.13 HMA)',
    'Divorce Decree — Desertion','Restitution of Conjugal Rights (S.9 HMA)',
    'Judicial Separation (S.10 HMA)','Interim Maintenance (S.24 HMA)',
    'Permanent Alimony (S.25 HMA)','Custody Order — Interim','Custody Order — Final',
    'Visitation Rights Order','Guardianship Order (GWA)','Adoption Order',
    'Domestic Violence Protection Order (DVA S.18)','Residence Order (DVA S.19)',
    'Monetary Relief Order (DVA S.20)','Compensation Order (DVA S.22)',
    'Maintenance under Muslim Law','Maintenance under Christian Law',
    'Dowry Return Direction','Stridhan Return Order',
  ]},
  {icon:'🏘',name:'Revenue & Rent Orders',provision:'State Rent Acts / Revenue Code',sub:[
    'Eviction Order — Non-Payment of Rent','Eviction Order — Personal Need',
    'Eviction Order — Subletting','Eviction Order — Misuse of Premises',
    'Rent Fixation Order','Enhancement of Rent Order','Arrears of Rent Decree',
    'Tenancy Declaration Order','Mutation Order','Partition of Agricultural Land',
    'Consolidation Order','Correction of Revenue Records',
  ]},
  {icon:'📋',name:'Execution & Miscellaneous',provision:'CPC Order 21',sub:[
    'Execution Petition Order','Delivery of Movable Property','Delivery of Immovable Property',
    'Arrest and Detention in Execution','Sale Proclamation Order','Confirmation of Sale',
    'Setting Aside of Auction Sale','Restitution after Reversal of Decree',
    'Certificate of Sale','Caveat Order','Probate Order (District Court)',
    'Succession Certificate Order','Letters of Administration',
    'Court Fees Refund Order','Order for Security for Costs',
  ]},
]

const TRI_CATS = [
  {icon:'🌿',name:'NGT Orders',provision:'NGT Act',sub:[
    'Original Application (OA) Order','Interim Stay on Project (NGT)',
    'Compensation Order (NGT)','Restoration Order (NGT)',
    'Direction to State Pollution Control Board','Direction to CPCB',
    'Direction to MoEF','Environmental Compliance Order',
    'Closure Order — Polluting Industry','Demolition Order (NGT)',
    'Remediation Order','Penalty Order (NGT)',
    'Appeal against NGT Order (to SC)',
  ]},
  {icon:'🏢',name:'NCLT / NCLAT Orders',provision:'Companies Act / IBC',sub:[
    'Admission of Insolvency Petition (CIRP)','Moratorium Order (IBC S.14)',
    'Appointment of IRP / RP Order','Resolution Plan Approval Order',
    'Liquidation Order (IBC S.33)','Winding Up Order (Companies Act)',
    'Order for Inspection of Books','Oppression & Mismanagement Order',
    'Rectification of Register Order','Restoration of Company Order',
    'Strike Off Challenge Order','NCLAT Appeal Order',
    'Contempt Order (NCLT)','Fee Order (NCLT)',
  ]},
  {icon:'💰',name:'Tax Tribunal Orders',provision:'IT Act / GST / Customs',sub:[
    'ITAT — Appeal Allowed Order','ITAT — Appeal Dismissed Order',
    'ITAT — Remand Order','ITAT — Stay of Demand Order',
    'ITAT — Penalty Order','ITAT — Reassessment Order',
    'CESTAT — Customs Duty Order','CESTAT — Service Tax Order',
    'CESTAT — Central Excise Order','CESTAT — Stay Order',
    'GST Appellate Order','GST Advance Ruling Order',
    'GST Anti-Profiteering Order','GST Refund Order',
    'Income Tax Settlement Commission Order',
  ]},
  {icon:'🚗',name:'MACT Orders',provision:'Motor Vehicles Act',sub:[
    'Compensation Award Order','Enhanced Compensation Order',
    'Interim Compensation Order (S.140 MV Act)','Structured Formula Compensation',
    'No-Fault Liability Compensation','Compensation — Death Case',
    'Compensation — Permanent Disability','Compensation — Temporary Disability',
    'Compensation — Medical Expenses','Insurance Company Liability Order',
    'Hit and Run Compensation Order','Solatium Fund Order',
  ]},
  {icon:'🏠',name:'RERA Orders',provision:'RERA Act 2016',sub:[
    'Registration of Complaint (RERA)','Interim Stay on Project',
    'Refund Order (RERA)','Interest on Delayed Possession',
    'Compensation Order (RERA)','Penalty Order on Builder',
    'Revocation of Registration (RERA)','Appellate Tribunal Order (RERA)',
    'Direction for Possession','Direction for Completion of Project',
    'RERA Complaint Dismissal Order',
  ]},
  {icon:'👔',name:'Labour / Service Tribunal',provision:'ID Act / Service Rules',sub:[
    'CAT — Reinstatement Order','CAT — Back Wages Order','CAT — Promotion Order',
    'CAT — Seniority Order','CAT — Pension Order','CAT — Transfer Challenge Order',
    'CAT — Departmental Inquiry Stay','CAT — Contempt Order',
    'Industrial Tribunal — Reinstatement','Industrial Tribunal — Retrenchment Order',
    'Industrial Tribunal — Closure Permission','Industrial Tribunal — Strike Order',
    'Labour Court — Workman Reinstatement','Labour Court — Compensation Order',
    'Labour Court — Gratuity Order','Labour Court — PF Order',
    'Labour Court — ESI Order','Labour Court — Minimum Wages Order',
  ]},
  {icon:'📜',name:'Consumer Forum Orders',provision:'CPA 2019',sub:[
    'Consumer Complaint — Admitted','Consumer Complaint — Dismissed',
    'Interim Relief Order (Consumer)','Replacement Order (Defective Product)',
    'Refund Order (Consumer)','Compensation Order (Consumer)',
    'Deficiency in Service Order','Unfair Trade Practice Order',
    'Medical Negligence Compensation Order','Insurance Claim Order',
    'Banking Service Deficiency Order','Telecom Service Order',
    'E-Commerce Deficiency Order','Real Estate (Consumer) Order',
    'State Commission Appeal Order','NCDRC Revision Order',
    'Execution of Consumer Order',
  ]},
  {icon:'💳',name:'DRT / DRAT Orders',provision:'RDDBFI Act / SARFAESI',sub:[
    'OA for Recovery — Admitted','OA for Recovery — Decree',
    'SARFAESI — Symbolic Possession','SARFAESI — Physical Possession',
    'SARFAESI — Sale Order','Auction Sale Confirmation (DRT)',
    'Stay of SARFAESI Action','Recovery Certificate',
    'Attachment Order (DRT)','Garnishee Order (DRT)',
    'Counter Claim Order','DRAT Appeal Order',
    'Objection to Recovery Certificate','DRT Contempt Order',
  ]},
  {icon:'⚔',name:'Special Courts',provision:'Special Acts',sub:[
    'CBI Court — Conviction Order','CBI Court — Acquittal Order',
    'CBI Court — Bail Order','PMLA Court — Attachment Order',
    'PMLA Court — Confiscation Order','PMLA Court — Bail Order (PMLA)',
    'PMLA Court — Money Laundering Conviction','NIA Court — Terror Conviction',
    'NIA Court — Bail (Terror Case)','NIA Court — Remand Order',
    'POCSO Court — Conviction Order','POCSO Court — Bail Order',
    'POCSO Court — Compensation (S.33(8) POCSO)',
    'Fast Track Court — Rape Conviction','Fast Track Court — POCSO Order',
    'Lok Adalat Award','Permanent Lok Adalat Order',
  ]},
]

const STEPS = ['Court & Level','Document Type','Case Details','Parties','Attachments','Review']
type Court = 'SC'|'HC'|'DC'|'TRI'

const nav:React.CSSProperties={background:'#0B1F3A',padding:'0 2rem',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50,borderBottom:'1px solid rgba(201,168,76,0.2)'}
const inp:React.CSSProperties={width:'100%',border:'1px solid #D6C9A8',borderRadius:'6px',padding:'9px 12px',fontSize:'13px',color:'#0B1F3A',background:'#fff',outline:'none',fontFamily:'system-ui,sans-serif',boxSizing:'border-box'}
const lbl:React.CSSProperties={display:'block',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.06em',color:'#7A8BA8',marginBottom:'6px'}
const fld:React.CSSProperties={marginBottom:'1rem'}

function Nav(){return(<nav style={nav}><Link href="/" style={{display:'flex',alignItems:'center',gap:'8px',textDecoration:'none'}}><div style={{width:'30px',height:'30px',background:'#C9A84C',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1F3A',fontWeight:'700',fontSize:'13px'}}>W</div><span style={{fontFamily:'Georgia,serif',fontSize:'19px',color:'#fff'}}>Writ<span style={{color:'#E8C97A'}}>Online</span></span></Link><div style={{display:'flex',gap:'1.5rem'}}>{[['Home','/'],['Draft','/draft'],['Precedents','/precedents'],['Pricing','/pricing'],['Dashboard','/dashboard']].map(([l,h])=><Link key={h} href={h} style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>{l}</Link>)}</div><Link href="/draft" style={{background:'#C9A84C',color:'#0B1F3A',padding:'7px 18px',borderRadius:'4px',textDecoration:'none',fontSize:'13px',fontWeight:'700'}}>Start Drafting</Link></nav>)}

export default function DraftPage(){
  const [step,setStep]=useState(0)
  const [court,setCourt]=useState<Court>('SC')
  const [hcName,setHcName]=useState('Supreme Court of India')
  const [catIdx,setCatIdx]=useState<number|null>(null)
  const [sub,setSub]=useState<string|null>(null)
  const [caseNum,setCaseNum]=useState('')
  const [facts,setFacts]=useState('')
  const [statutes,setStatutes]=useState('')
  const [lang,setLang]=useState('English')
  const [urgency,setUrgency]=useState('Normal')
  const [petitioners,setPetitioners]=useState([''])
  const [respondents,setRespondents]=useState([''])
  const [advocate,setAdvocate]=useState('')
  const [files,setFiles]=useState<string[]>([])
  const [done,setDone]=useState(false)
  const [subSearch,setSubSearch]=useState('')

  const cats = court==='SC'?SC_CATS:court==='HC'?HC_CATS:court==='DC'?DC_CATS:TRI_CATS
  const filteredSubs = catIdx!==null ? cats[catIdx].sub.filter(s=>s.toLowerCase().includes(subSearch.toLowerCase())) : []

  if(done)return(<div style={{minHeight:'100vh',fontFamily:'system-ui,sans-serif',background:'#FDFAF4'}}><Nav/><div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'4rem 2rem'}}><div style={{textAlign:'center',maxWidth:'480px'}}><div style={{width:'64px',height:'64px',background:'#E8F5EE',border:'2px solid #A8D4B8',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1.5rem',fontSize:'28px'}}>✓</div><h1 style={{fontFamily:'Georgia,serif',fontSize:'28px',color:'#0B1F3A',marginBottom:'0.75rem'}}>Draft Generated Successfully</h1><p style={{color:'#7A8BA8',fontSize:'14px',lineHeight:'1.8',marginBottom:'2rem'}}>Your document has been created with AI-assisted structure, SC precedents auto-cited, and all attachments indexed.</p><div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}><Link href="/dashboard" style={{background:'#0B1F3A',color:'#fff',padding:'12px 24px',borderRadius:'6px',textDecoration:'none',fontSize:'14px',fontWeight:'700'}}>Open in Editor</Link><button style={{background:'#C9A84C',color:'#0B1F3A',padding:'12px 24px',borderRadius:'6px',border:'none',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>Export as PDF</button></div><div style={{marginTop:'1.5rem',background:'#EEF2F8',borderRadius:'8px',padding:'1rem',fontSize:'12px',color:'#3D5070',textAlign:'left' as const}}><strong>AI auto-applied:</strong> Court-specific formatting · SC precedent citations · Statutory provisions · Standard legal language</div></div></div></div>)

  return(<div style={{minHeight:'100vh',display:'flex',flexDirection:'column' as const,fontFamily:'system-ui,sans-serif',background:'#FDFAF4',color:'#0B1F3A'}}><Nav/>
  <div style={{maxWidth:'860px',margin:'0 auto',width:'100%',padding:'2rem 1rem',flex:1}}>

    {/* Stepper */}
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const,gap:'4px'}}>
      {STEPS.map((s,i)=>(<div key={s} style={{display:'flex',alignItems:'center'}}><div style={{display:'flex',flexDirection:'column' as const,alignItems:'center'}}><div style={{width:'28px',height:'28px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',border:'2px solid',borderColor:i<step?'#1A6B3C':i===step?'#C9A84C':'#D6C9A8',background:i<step?'#1A6B3C':i===step?'#FBF6EA':'#fff',color:i<step?'#fff':i===step?'#0B1F3A':'#7A8BA8'}}>{i<step?'✓':i+1}</div><span style={{fontSize:'10px',marginTop:'4px',color:i===step?'#0B1F3A':i<step?'#1A6B3C':'#7A8BA8',whiteSpace:'nowrap'}}>{s}</span></div>{i<STEPS.length-1&&<div style={{width:'28px',height:'2px',background:i<step?'#1A6B3C':'#EDE6D3',margin:'0 4px 16px'}}/>}</div>))}
    </div>
    <div style={{height:'4px',background:'#EDE6D3',borderRadius:'4px',marginBottom:'1.5rem',overflow:'hidden'}}><div style={{height:'100%',background:'#C9A84C',borderRadius:'4px',width:`${(step/5)*100}%`,transition:'width 0.4s'}}/></div>

    <div style={{background:'#fff',border:'1px solid #EDE6D3',borderRadius:'10px',overflow:'hidden'}}>
      <div style={{background:'#0B1F3A',padding:'1rem 1.5rem'}}><h2 style={{fontFamily:'Georgia,serif',color:'#fff',fontSize:'18px',fontWeight:'500'}}>{['Select Court Level','Document Category & Type','Case Details','Parties','Attachments','Review & Generate'][step]}</h2><p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginTop:'2px'}}>{hcName}{sub?' — '+sub:''}</p></div>
      <div style={{padding:'1.5rem'}}>

        {/* STEP 0 — Court */}
        {step===0&&<>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'1.5rem'}}>
            {([['SC','Supreme Court of India','Art. 32, 136, 131, 137, 142 jurisdiction. Binding on all courts.'],['HC','High Court','Art. 226 writ, appellate, revisional & supervisory jurisdiction.'],['DC','District / Sessions Court','Original civil & criminal jurisdiction under CPC and CrPC.'],['TRI','Tribunal / Special Court','Special statutory jurisdiction — NGT, NCLT, ITAT, MACT, RERA etc.']] as [Court,string,string][]).map(([code,label,desc])=>(<div key={code} onClick={()=>{setCourt(code);setHcName(code==='SC'?'Supreme Court of India':hcName);setCatIdx(null);setSub(null);setSubSearch('')}} style={{border:`2px solid ${court===code?'#C9A84C':'#EDE6D3'}`,borderRadius:'8px',padding:'1rem',cursor:'pointer',background:court===code?'#FBF6EA':'#fff'}}><div style={{fontWeight:'700',color:'#0B1F3A',fontSize:'14px',marginBottom:'4px'}}>{label}</div><div style={{fontSize:'12px',color:'#7A8BA8',lineHeight:'1.5'}}>{desc}</div></div>))}
          </div>
          {court==='HC'&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}><div style={fld}><label style={lbl}>Select High Court *</label><select style={inp} value={hcName} onChange={e=>setHcName(e.target.value)}><option value="">— Select High Court —</option>{HIGH_COURTS.map(hc=><option key={hc}>{hc}</option>)}</select></div><div style={fld}><label style={lbl}>Bench / Circuit</label><select style={inp}><option>Principal Bench</option><option>Lucknow Bench</option><option>Nagpur Bench</option><option>Jabalpur Bench</option><option>Gwalior Bench</option><option>Dharwad Bench</option><option>Aurangabad Bench</option></select></div></div>}
          {court==='DC'&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}><div style={fld}><label style={lbl}>State *</label><select style={inp}><option>Uttar Pradesh</option><option>Maharashtra</option><option>Delhi</option><option>Bihar</option><option>West Bengal</option><option>Rajasthan</option><option>Karnataka</option><option>Tamil Nadu</option><option>Kerala</option><option>Gujarat</option><option>Madhya Pradesh</option><option>Andhra Pradesh</option><option>Telangana</option><option>Punjab</option><option>Haryana</option></select></div><div style={fld}><label style={lbl}>District *</label><input style={inp} placeholder="e.g. Lucknow, Kanpur, Allahabad"/></div></div>}
          {court==='TRI'&&<div style={fld}><label style={lbl}>Tribunal / Special Court *</label><select style={inp}>{TRIBUNALS.map(t=><option key={t}>{t}</option>)}</select></div>}
        </>}

        {/* STEP 1 — Category & Sub */}
        {step===1&&<>
          <label style={{...lbl,marginBottom:'12px'}}>Main Category *</label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:'8px',marginBottom:'1.5rem'}}>
            {cats.map((c,i)=>(<div key={i} onClick={()=>{setCatIdx(i);setSub(null);setSubSearch('')}} style={{border:`2px solid ${catIdx===i?'#C9A84C':'#EDE6D3'}`,borderRadius:'8px',padding:'10px 8px',cursor:'pointer',textAlign:'center' as const,background:catIdx===i?'#FBF6EA':'#fff',transition:'all 0.15s'}}><div style={{fontSize:'18px',marginBottom:'5px'}}>{c.icon}</div><div style={{fontSize:'11px',fontWeight:'600',color:'#0B1F3A',lineHeight:'1.3'}}>{c.name}</div><div style={{fontSize:'10px',color:'#7A8BA8',marginTop:'2px'}}>{c.provision}</div></div>))}
          </div>
          {catIdx!==null&&<>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
              <label style={lbl}>Document / Order Type * <span style={{color:'#7A8BA8',fontWeight:'400',textTransform:'none',letterSpacing:'0',fontSize:'11px'}}>({cats[catIdx].sub.length} available)</span></label>
            </div>
            <input value={subSearch} onChange={e=>setSubSearch(e.target.value)} placeholder={`Search within ${cats[catIdx].name}...`} style={{...inp,marginBottom:'12px',background:'#FDFAF4'}}/>
            <div style={{maxHeight:'280px',overflowY:'auto' as const,border:'1px solid #EDE6D3',borderRadius:'8px',padding:'8px'}}>
              {filteredSubs.length===0&&<div style={{textAlign:'center' as const,padding:'2rem',color:'#7A8BA8',fontSize:'13px'}}>No results for &quot;{subSearch}&quot;</div>}
              {filteredSubs.map(s=>(<div key={s} onClick={()=>setSub(s)} style={{padding:'8px 12px',borderRadius:'6px',cursor:'pointer',fontSize:'13px',fontWeight:sub===s?'600':'400',background:sub===s?'#0B1F3A':'transparent',color:sub===s?'#fff':'#3D5070',marginBottom:'2px',transition:'all 0.15s',borderLeft:`3px solid ${sub===s?'#C9A84C':'transparent'}`}}>
                {sub===s&&<span style={{marginRight:'8px'}}>✓</span>}{s}
              </div>))}
            </div>
            {sub&&<div style={{marginTop:'10px',background:'#E8F5EE',border:'1px solid #A8D4B8',borderRadius:'6px',padding:'10px 14px',fontSize:'12px',color:'#1A6B3C',display:'flex',alignItems:'center',gap:'8px'}}><span>✓</span><strong>Selected:</strong> {sub}</div>}
          </>}
        </>}

        {/* STEP 2 — Case Details */}
        {step===2&&<>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div style={fld}><label style={lbl}>Case Number / Diary No.</label><input style={inp} placeholder="e.g. W.P. No. 1234/2026" value={caseNum} onChange={e=>setCaseNum(e.target.value)}/><p style={{fontSize:'11px',color:'#7A8BA8',marginTop:'4px'}}>Leave blank if not yet assigned</p></div>
            <div style={fld}><label style={lbl}>Year of Filing *</label><input style={inp} defaultValue="2026"/></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1rem'}}>
            <div style={fld}><label style={lbl}>Date of Filing *</label><input type="date" style={inp} defaultValue={new Date().toISOString().split('T')[0]}/></div>
            <div style={fld}><label style={lbl}>Date of Hearing</label><input type="date" style={inp}/></div>
            <div style={fld}><label style={lbl}>Next Date</label><input type="date" style={inp}/></div>
          </div>
          <div style={fld}><label style={lbl}>Brief Facts / Subject Matter *</label><textarea style={{...inp,minHeight:'100px',resize:'vertical' as const}} placeholder="Briefly describe the facts giving rise to this matter, the relief sought, and relevant background..." value={facts} onChange={e=>setFacts(e.target.value)}/></div>
          <div style={fld}><label style={lbl}>Relevant Statutes / Provisions</label><input style={inp} placeholder="e.g. Article 226 Constitution, Section 138 NI Act, Order 39 CPC..." value={statutes} onChange={e=>setStatutes(e.target.value)}/><p style={{fontSize:'11px',color:'#7A8BA8',marginTop:'4px'}}>Comma-separated. AI will suggest additional applicable provisions.</p></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div style={fld}><label style={lbl}>Language *</label><select style={inp} value={lang} onChange={e=>setLang(e.target.value)}><option>English</option><option>Hindi</option><option>English & Hindi (Bilingual)</option></select></div>
            <div style={fld}><label style={lbl}>Urgency</label><select style={inp} value={urgency} onChange={e=>setUrgency(e.target.value)}><option>Normal</option><option>Urgent (Mention)</option><option>Very Urgent (Interim Relief)</option><option>Ex-Parte (Without Notice)</option></select></div>
          </div>
        </>}

        {/* STEP 3 — Parties */}
        {step===3&&<>
          <div style={{background:'#EEF2F8',borderLeft:'4px solid #C9A84C',borderRadius:'0 8px 8px 0',padding:'1rem',marginBottom:'1.5rem'}}>
            <h3 style={{fontSize:'13px',fontWeight:'600',color:'#0B1F3A',marginBottom:'0.75rem'}}>Petitioner(s) / Appellant(s) / Applicant(s)</h3>
            {petitioners.map((p,i)=>(<div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}><input style={{...inp,flex:2}} placeholder={`Full name of petitioner ${i+1}`} value={p} onChange={e=>{const a=[...petitioners];a[i]=e.target.value;setPetitioners(a)}}/><select style={{...inp,width:'130px',flexShrink:0}}><option>Individual</option><option>Company</option><option>State Govt.</option><option>Union of India</option><option>Trust / Society</option><option>Minor (through guardian)</option></select>{petitioners.length>1&&<button onClick={()=>setPetitioners(petitioners.filter((_,j)=>j!==i))} style={{color:'#8B1A1A',border:'1px solid #F5C0C0',borderRadius:'4px',padding:'0 8px',background:'none',cursor:'pointer',fontSize:'16px'}}>×</button>}</div>))}
            <button onClick={()=>setPetitioners([...petitioners,''])} style={{width:'100%',marginTop:'4px',fontSize:'12px',fontWeight:'600',color:'#0B1F3A',border:'2px dashed #D6C9A8',borderRadius:'6px',padding:'8px',background:'none',cursor:'pointer'}}>+ Add Petitioner / Appellant</button>
          </div>
          <div style={{background:'#EEF2F8',borderLeft:'4px solid #C9A84C',borderRadius:'0 8px 8px 0',padding:'1rem',marginBottom:'1.5rem'}}>
            <h3 style={{fontSize:'13px',fontWeight:'600',color:'#0B1F3A',marginBottom:'0.75rem'}}>Respondent(s) / Opposite Party(s)</h3>
            {respondents.map((r,i)=>(<div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}><input style={{...inp,flex:2}} placeholder={`Full name of respondent ${i+1}`} value={r} onChange={e=>{const a=[...respondents];a[i]=e.target.value;setRespondents(a)}}/><select style={{...inp,width:'130px',flexShrink:0}}><option>Individual</option><option>State Govt.</option><option>Union of India</option><option>Company</option><option>Statutory Authority</option><option>Local Body</option><option>Police / Law Enforcement</option></select>{respondents.length>1&&<button onClick={()=>setRespondents(respondents.filter((_,j)=>j!==i))} style={{color:'#8B1A1A',border:'1px solid #F5C0C0',borderRadius:'4px',padding:'0 8px',background:'none',cursor:'pointer',fontSize:'16px'}}>×</button>}</div>))}
            <button onClick={()=>setRespondents([...respondents,''])} style={{width:'100%',marginTop:'4px',fontSize:'12px',fontWeight:'600',color:'#0B1F3A',border:'2px dashed #D6C9A8',borderRadius:'6px',padding:'8px',background:'none',cursor:'pointer'}}>+ Add Respondent</button>
          </div>
          <div style={{border:'1px solid #EDE6D3',borderRadius:'8px',padding:'1rem'}}>
            <h3 style={{fontSize:'13px',fontWeight:'600',color:'#0B1F3A',marginBottom:'1rem'}}>Counsel Details</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <div style={fld}><label style={lbl}>Advocate on Record / Filing Advocate *</label><input style={inp} placeholder="Full name" value={advocate} onChange={e=>setAdvocate(e.target.value)}/></div>
              <div style={fld}><label style={lbl}>Bar Council Enrolment No.</label><input style={inp} placeholder="e.g. UP/1234/2010"/></div>
              <div style={fld}><label style={lbl}>Mobile *</label><input style={inp} type="tel" placeholder="+91 98765 43210"/></div>
              <div style={fld}><label style={lbl}>Email</label><input style={inp} type="email" placeholder="advocate@lawfirm.com"/></div>
              <div style={{...fld,gridColumn:'1/-1'}}><label style={lbl}>Senior Advocate (if briefed)</label><input style={inp} placeholder="Name of Senior Advocate (if any)"/></div>
            </div>
          </div>
        </>}

        {/* STEP 4 — Attachments */}
        {step===4&&<>
          <div style={{background:'#EEF4FB',border:'1px solid #C5D8F0',borderRadius:'8px',padding:'12px',marginBottom:'1.5rem',fontSize:'12px',color:'#1A4B8B',lineHeight:'1.7'}}>
            <strong>Required for {sub||'this document'}:</strong> Petition / Application · Affidavit · Vakalatnama · Annexures (certified copies) · Court Fees Receipt · Synopsis & List of Dates (if SC/HC)
          </div>
          <label style={{display:'block',cursor:'pointer'}}>
            <div style={{border:'2px dashed #D6C9A8',borderRadius:'8px',padding:'2.5rem',textAlign:'center' as const,background:'#FDFAF4'}}>
              <div style={{fontSize:'36px',marginBottom:'8px'}}>📎</div>
              <div style={{fontWeight:'600',color:'#0B1F3A',fontSize:'14px',marginBottom:'4px'}}>Click to upload or drag & drop files</div>
              <div style={{fontSize:'12px',color:'#7A8BA8',marginBottom:'10px'}}>Upload all supporting documents, annexures, and exhibits</div>
              <div style={{display:'flex',gap:'6px',justifyContent:'center',flexWrap:'wrap' as const}}>
                {['PDF','DOCX','JPG/PNG','XLS','ZIP'].map(f=><span key={f} style={{fontSize:'10px',fontWeight:'700',padding:'3px 8px',background:'#EEF2F8',color:'#0B1F3A',borderRadius:'3px'}}>{f}</span>)}
              </div>
            </div>
            <input type="file" style={{display:'none'}} multiple onChange={e=>{const names=Array.from(e.target.files||[]).map(f=>f.name);setFiles([...files,...names])}}/>
          </label>
          {files.length>0&&<div style={{marginTop:'1rem'}}>
            {files.map((f,i)=>(<div key={i} style={{display:'flex',alignItems:'center',gap:'10px',background:'#E8F5EE',border:'1px solid #A8D4B8',borderRadius:'6px',padding:'10px 14px',marginBottom:'8px'}}>
              <span style={{fontSize:'10px',fontWeight:'700',background:'#C0DDB8',color:'#1A4B3C',padding:'2px 6px',borderRadius:'3px',flexShrink:0}}>{f.split('.').pop()?.toUpperCase()}</span>
              <span style={{flex:1,fontSize:'13px',fontWeight:'500',color:'#0B1F3A',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f}</span>
              <select style={{...inp,width:'160px',fontSize:'11px',padding:'4px 8px',flexShrink:0}}>
                <option>Label...</option>
                <option>Vakalatnama</option><option>Petition / Application</option><option>Affidavit</option>
                <option>Synopsis & List of Dates</option><option>Annexure A</option><option>Annexure B</option>
                <option>Annexure C</option><option>Impugned Judgment / Order</option>
                <option>FIR Copy</option><option>Chargesheet</option><option>Marriage Certificate</option>
                <option>Identity Proof</option><option>Address Proof</option>
                <option>Medical Records</option><option>Court Fees Receipt</option>
                <option>Power of Attorney</option><option>Custom Label</option>
              </select>
              <button onClick={()=>setFiles(files.filter((_,j)=>j!==i))} style={{color:'#8B1A1A',background:'none',border:'none',fontSize:'18px',cursor:'pointer',flexShrink:0}}>×</button>
            </div>))}
          </div>}
          <div style={{marginTop:'1rem',...fld}}><label style={lbl}>Additional Notes on Attachments</label><textarea style={{...inp,minHeight:'60px',resize:'vertical' as const}} placeholder="e.g. Annexure A is in Hindi — translation at Annexure A1"/></div>
        </>}

        {/* STEP 5 — Review */}
        {step===5&&<>
          <div style={{background:'#0B1F3A',borderRadius:'10px',padding:'1.5rem',color:'#fff',marginBottom:'1rem'}}>
            <h3 style={{fontFamily:'Georgia,serif',fontSize:'18px',borderBottom:'1px solid rgba(255,255,255,0.15)',paddingBottom:'12px',marginBottom:'1rem'}}>Document Summary — Ready to Draft</h3>
            {[
              ['Court',hcName],
              ['Category',(catIdx!==null?cats[catIdx]?.name:'—')],
              ['Document / Order Type',sub||'—'],
              ['Case Number',caseNum||'New Filing'],
              ['Petitioner(s)',petitioners.filter(Boolean).join(', ')||'(not filled)'],
              ['Respondent(s)',respondents.filter(Boolean).join(', ')||'(not filled)'],
              ['Counsel',advocate||'(not filled)'],
              ['Language',lang],
              ['Urgency',urgency],
              ['Statutes',statutes||'AI will suggest based on document type'],
              ['Brief Facts',facts?facts.substring(0,120)+(facts.length>120?'...':''):'(not filled)'],
              ['Attachments',files.length?`${files.length} file(s): ${files.join(', ')}`:'No files uploaded'],
            ].map(([l,v])=>(<div key={l} style={{display:'flex',gap:'1rem',marginBottom:'8px'}}><span style={{fontSize:'11px',fontWeight:'700',textTransform:'uppercase' as const,letterSpacing:'0.05em',color:'rgba(255,255,255,0.4)',width:'130px',flexShrink:0,paddingTop:'1px'}}>{l}</span><span style={{fontSize:'13px',color:'#fff',flex:1,lineHeight:'1.5'}}>{v}</span></div>))}
          </div>
          <div style={{background:'#EEF4FB',borderLeft:'4px solid #1A4B8B',borderRadius:'0 8px 8px 0',padding:'12px 16px',fontSize:'12px',color:'#1A4B8B',lineHeight:'1.8'}}>
            <strong>AI will auto-apply:</strong> {hcName} formatting rules · Relevant SC precedents for <strong>{sub||'this document type'}</strong> · Applicable statutory provisions · Standard legal recitals · Court-specific header, footer & cause title format
          </div>
        </>}

      </div>
    </div>

    {/* Navigation buttons */}
    <div style={{display:'flex',justifyContent:'space-between',marginTop:'1.25rem'}}>
      {step>0
        ?<button onClick={()=>setStep(step-1)} style={{border:'2px solid #D6C9A8',background:'none',color:'#3D5070',padding:'10px 24px',borderRadius:'6px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>← Back</button>
        :<div/>}
      {step<5
        ?<button onClick={()=>setStep(step+1)} style={{background:'#0B1F3A',color:'#fff',padding:'10px 28px',borderRadius:'6px',fontSize:'14px',fontWeight:'600',cursor:'pointer',border:'none'}}>Next →</button>
        :<button onClick={()=>setDone(true)} style={{background:'#C9A84C',color:'#0B1F3A',padding:'12px 36px',borderRadius:'6px',fontSize:'15px',fontWeight:'700',cursor:'pointer',border:'none'}}>Generate Draft Document →</button>}
    </div>
  </div></div>)
}
