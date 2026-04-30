// prisma/seed.ts
// Run: npx prisma db seed
// Seeds: SC Precedents, Standard Clauses, Admin user

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Starting WritOnline database seed...')

  // ── Admin User ─────────────────────────────
  const adminPassword = await bcrypt.hash('Admin@WritOnline2026', 12)
  const admin = await db.user.upsert({
    where: { email: 'admin@writonline.in' },
    update: {},
    create: {
      name: 'WritOnline Admin',
      email: 'admin@writonline.in',
      password: adminPassword,
      role: 'ADMIN',
      plan: 'ENTERPRISE',
      isVerified: true,
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // ── SC Precedents ──────────────────────────
  const precedents = [
    {
      title: 'Kesavananda Bharati v. State of Kerala',
      citation: 'AIR 1973 SC 1461',
      year: 1973,
      bench: '13-Judge Constitution Bench',
      benchStrength: 13,
      category: 'Constitutional Law',
      area: 'Constitutional Law',
      tags: JSON.stringify(['Constitutional', 'Fundamental Rights', 'Basic Structure']),
      principle: 'Basic Structure Doctrine — Parliament cannot amend the Constitution so as to destroy its basic structure including judicial review, rule of law, separation of powers, and fundamental rights.',
      holding: 'The power of Parliament under Article 368 does not include power to abrogate or emasculate the basic elements or fundamental features of the Constitution.',
      applicability: 'Binding on all courts in India. Applied in all cases involving constitutional amendments, judicial review of legislative action, and fundamental rights challenges. High Courts must follow while examining state legislation.',
      isApproved: true,
      isOverruled: false,
    },
    {
      title: 'Maneka Gandhi v. Union of India',
      citation: 'AIR 1978 SC 597',
      year: 1978,
      bench: '7-Judge Constitution Bench',
      benchStrength: 7,
      category: 'Constitutional Law',
      area: 'Constitutional Law',
      tags: JSON.stringify(['Article 21', 'Personal Liberty', 'Natural Justice']),
      principle: 'Article 21 — procedure established by law must be just, fair, and reasonable. Articles 14, 19 and 21 are not mutually exclusive.',
      holding: 'The expression "procedure established by law" in Article 21 must be right, just, fair and not arbitrary, fanciful or oppressive.',
      applicability: 'Binding on all courts. Fundamental in any case involving deprivation of life or personal liberty.',
      isApproved: true,
      isOverruled: false,
    },
    {
      title: 'Bachan Singh v. State of Punjab',
      citation: 'AIR 1980 SC 898',
      year: 1980,
      bench: '5-Judge Constitution Bench',
      benchStrength: 5,
      category: 'Criminal Law',
      area: 'Criminal Law',
      tags: JSON.stringify(['Death Penalty', 'Rarest of Rare', 'Sentencing']),
      principle: 'Death penalty is constitutionally valid but must be awarded only in the rarest of rare cases after weighing aggravating and mitigating circumstances.',
      holding: 'Section 302 IPC providing death penalty is not violative of Articles 19 and 21. The rarest of rare doctrine governs sentencing discretion.',
      applicability: 'Binding on all criminal courts. Applied mandatorily in all capital punishment sentencing.',
      isApproved: true,
      isOverruled: false,
    },
    {
      title: 'Justice K.S. Puttaswamy v. Union of India',
      citation: '(2017) 10 SCC 1',
      year: 2017,
      bench: '9-Judge Constitution Bench',
      benchStrength: 9,
      category: 'Constitutional Law',
      area: 'Constitutional Law',
      tags: JSON.stringify(['Privacy', 'Fundamental Rights', 'Aadhaar', 'Data Protection']),
      principle: 'Right to Privacy is a fundamental right under Articles 14, 19 and 21 of the Constitution. It protects individual autonomy, dignity, and freedom of choice.',
      holding: 'Privacy is a constitutionally protected right as an intrinsic part of life and personal liberty under Article 21.',
      applicability: 'Binding on all courts. Applicable in data protection, surveillance challenges, Aadhaar cases, and all matters involving personal information.',
      isApproved: true,
      isOverruled: false,
    },
    {
      title: 'Arnesh Kumar v. State of Bihar',
      citation: '(2014) 8 SCC 273',
      year: 2014,
      bench: '2-Judge Bench',
      benchStrength: 2,
      category: 'Criminal Law',
      area: 'Criminal Law',
      tags: JSON.stringify(['Arrest', 'Bail', 'Section 498A', 'CrPC']),
      principle: 'Police cannot arrest automatically in all cases under Section 498A IPC. Magistrates must apply mind before authorising arrest or detention.',
      holding: 'Detailed guidelines issued for arrest in offences punishable with less than 7 years imprisonment. Checklist mandatory before arrest.',
      applicability: 'Binding on all criminal courts in India. Magistrates must follow checklist before remand. Applied in bail applications and habeas corpus petitions.',
      isApproved: true,
      isOverruled: false,
    },
    {
      title: 'Lalita Kumari v. Government of U.P.',
      citation: '(2014) 2 SCC 1',
      year: 2014,
      bench: '5-Judge Constitution Bench',
      benchStrength: 5,
      category: 'Criminal Law',
      area: 'Criminal Law',
      tags: JSON.stringify(['FIR', 'CrPC Section 154', 'Cognizable Offence']),
      principle: 'Registration of FIR is mandatory if a cognizable offence is disclosed. Police have no discretion to conduct preliminary inquiry except in specific exceptional categories.',
      holding: 'Section 154 CrPC mandates registration of FIR immediately upon receipt of information disclosing a cognizable offence.',
      applicability: 'Binding on all criminal courts. Applied in writ petitions seeking registration of FIR and habeas corpus matters.',
      isApproved: true,
      isOverruled: false,
    },
    {
      title: 'Indra Sawhney v. Union of India',
      citation: 'AIR 1993 SC 477',
      year: 1992,
      bench: '9-Judge Constitution Bench',
      benchStrength: 9,
      category: 'Constitutional Law',
      area: 'Constitutional Law',
      tags: JSON.stringify(['Reservation', 'OBC', 'Article 16', 'Creamy Layer']),
      principle: 'OBC reservation up to 27% is valid. Total reservation cannot exceed 50% except in extraordinary circumstances. Creamy layer must be excluded.',
      holding: 'Backward class of citizens in Article 16(4) can be identified on caste basis. 50% ceiling on reservations subject to exceptional situations.',
      applicability: 'Binding on all courts. Applied in all reservation matters, OBC quota challenges, service law disputes involving reservations.',
      isApproved: true,
      isOverruled: false,
    },
    {
      title: 'Wander Ltd. v. Antox India Pvt. Ltd.',
      citation: '1990 Supp SCC 727',
      year: 1990,
      bench: '2-Judge Bench',
      benchStrength: 2,
      category: 'Civil Law',
      area: 'Civil Law',
      tags: JSON.stringify(['Injunction', 'Interim Relief', 'Balance of Convenience']),
      principle: 'Three-pronged test for interim injunction: (1) prima facie case, (2) balance of convenience, (3) irreparable harm if not granted.',
      holding: 'Courts granting interlocutory injunctions must be satisfied of prima facie case, balance of convenience favouring the applicant, and irreparable injury.',
      applicability: 'Binding on all civil courts. Applied in every interim injunction application before district courts and High Courts.',
      isApproved: true,
      isOverruled: false,
    },
  ]

  for (const p of precedents) {
    await db.precedent.upsert({
      where: { citation: p.citation },
      update: {},
      create: { ...p, addedBy: admin.id },
    })
  }
  console.log(`✅ ${precedents.length} SC precedents seeded`)

  // ── Standard Clauses ───────────────────────
  const clauses = [
    { title: 'Delay condonation clause', category: 'Procedural', content: 'That the present petition has been filed within limitation. However, if this Hon\'ble Court finds any delay, the same may kindly be condoned in the interest of justice as the Petitioner has been pursuing the matter bonafide and has not been responsible for any delay.' },
    { title: 'No alternative remedy clause', category: 'Procedural', content: 'That the Petitioner has no alternative efficacious remedy available under any other statute or law for the redressal of the grievance, and the present Writ Petition is the only remedy available to the Petitioner.' },
    { title: 'Locus standi affirmation', category: 'Procedural', content: 'That the Petitioner has locus standi to file the present petition as a person aggrieved by the impugned order/action and is directly and adversely affected by the same.' },
    { title: 'Territorial jurisdiction clause', category: 'Jurisdictional', content: 'That this Hon\'ble Court has jurisdiction to entertain and decide the present petition under Article 226 of the Constitution of India. The cause of action, wholly or in part, has arisen within the territorial jurisdiction of this Hon\'ble Court.' },
    { title: 'No previous petition clause', category: 'Procedural', content: 'That the Petitioner has not filed any similar petition before this Hon\'ble Court or before the Hon\'ble Supreme Court of India or before any other Court or Authority in respect of the subject matter of the present petition.' },
    { title: 'Balance of convenience (interim relief)', category: 'Interim Relief', content: 'That the balance of convenience is entirely in favour of the Petitioner inasmuch as no prejudice whatsoever shall be caused to the Respondents if the interim relief prayed for is granted, whereas the Petitioner shall suffer irreparable loss and injury if the same is not granted.' },
    { title: 'Clean hands affirmation', category: 'Procedural', content: 'That the Petitioner approaches this Hon\'ble Court with clean hands, utmost good faith, and without suppression of any material fact. All facts material to the present petition have been fully and fairly disclosed.' },
    { title: 'Irreparable loss clause', category: 'Interim Relief', content: 'That the Petitioner will suffer irreparable loss and injury which cannot be compensated in terms of money if the interim relief is not granted. The impugned order/action is being actively enforced causing great prejudice to the Petitioner.' },
    { title: 'Natural justice violation clause', category: 'Substantive', content: 'That the impugned order has been passed in complete violation of the principles of natural justice, inasmuch as no notice was issued to the Petitioner and no opportunity of hearing was afforded before passing the said order, as mandated by the Hon\'ble Supreme Court in A.K. Kraipak v. Union of India, AIR 1970 SC 150.' },
    { title: 'Article 14 arbitrariness clause', category: 'Substantive', content: 'That the impugned action/order is wholly arbitrary, unreasonable, and violative of Article 14 of the Constitution of India. It is well settled that arbitrariness is the antithesis of equality as held by the Hon\'ble Supreme Court in E.P. Royappa v. State of Tamil Nadu, (1974) 4 SCC 3.' },
    { title: 'Article 21 due process clause', category: 'Substantive', content: 'That the impugned action adversely affects the Petitioner\'s fundamental right to life and personal liberty guaranteed under Article 21 of the Constitution of India. The procedure followed is not just, fair, or reasonable as mandated by the Hon\'ble Supreme Court in Maneka Gandhi v. Union of India, (1978) 1 SCC 248.' },
    { title: 'Proportionality doctrine clause', category: 'Substantive', content: 'That the impugned order/punishment is grossly disproportionate to the alleged act or omission. The doctrine of proportionality, as laid down in Om Kumar v. Union of India, (2001) 2 SCC 386, requires that the measure adopted must not be excessive and must be proportionate to the object sought to be achieved.' },
  ]

  for (const clause of clauses) {
    await db.clause.upsert({
      where: { id: clause.title }, // Use title as temp id for upsert
      update: {},
      create: clause,
    }).catch(async () => {
      // If id doesn't work, just create
      await db.clause.create({ data: clause }).catch(() => {})
    })
  }
  console.log(`✅ ${clauses.length} standard clauses seeded`)

  console.log('🎉 Database seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
