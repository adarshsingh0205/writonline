# WritOnline — Backend Setup Guide

## Tech Stack
- **ORM:** Prisma
- **Database:** MySQL (PlanetScale — free)
- **Auth:** NextAuth.js v4
- **API:** Next.js App Router API Routes
- **Storage:** Cloudflare R2 (optional)
- **Payments:** Razorpay (optional)

---

## Step 1 — Set up MySQL Database (PlanetScale — Free)

1. Go to **planetscale.com** → Sign up free
2. Click **Create database** → name it `writonline` → region: `ap-south-1` (Mumbai)
3. Click **Connect** → Select **Prisma** from dropdown
4. Copy the `DATABASE_URL` — it looks like:
   ```
   mysql://username:password@host.ap-south-1.psdb.cloud/writonline?sslaccept=strict
   ```
5. Add to your `.env.local` file

---

## Step 2 — Configure Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in at minimum:
```env
DATABASE_URL="your-planetscale-url"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

---

## Step 3 — Install Dependencies

```bash
npm install
```

---

## Step 4 — Push Database Schema

```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to PlanetScale
```

PlanetScale doesn't support migrations — `db push` directly syncs the schema.

---

## Step 5 — Seed Database

```bash
npm run db:seed
```

This creates:
- Admin user (admin@writonline.in / Admin@WritOnline2026)
- 8 SC Precedents
- 12 Standard Clauses

**Change the admin password immediately after seeding!**

---

## Step 6 — Run Locally

```bash
npm run dev
```

Visit http://localhost:3000 — your site with full backend is running.

---

## Step 7 — Deploy to Vercel with Database

In Vercel → your project → **Settings → Environment Variables**, add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your PlanetScale URL |
| `NEXTAUTH_SECRET` | Random 32-char string |
| `NEXTAUTH_URL` | https://writonline.in |
| `GOOGLE_CLIENT_ID` | (optional) |
| `GOOGLE_CLIENT_SECRET` | (optional) |

Then redeploy.

---

## API Routes Reference

### Authentication
```
POST /api/users/register    — Create account
POST /api/auth/signin       — Sign in (NextAuth)
GET  /api/auth/session      — Get current session
POST /api/auth/signout      — Sign out
```

### Documents
```
GET    /api/documents              — List documents (paginated)
POST   /api/documents              — Create document
GET    /api/documents/:id          — Get single document
PUT    /api/documents/:id          — Update document
DELETE /api/documents/:id          — Archive document
```

### Drafts (Auto-save)
```
GET  /api/drafts    — List drafts
POST /api/drafts    — Save / update draft
```

### Precedents
```
GET  /api/precedents    — Search precedents (paginated)
POST /api/precedents    — Add precedent (admin only)
```

---

## Database Schema — Tables

| Table | Description |
|-------|-------------|
| `users` | User accounts with role and plan |
| `accounts` | OAuth provider accounts (NextAuth) |
| `sessions` | Active sessions (NextAuth) |
| `verification_tokens` | Email verification (NextAuth) |
| `chambers` | Law firms and court chambers |
| `chamber_members` | Users belonging to chambers |
| `documents` | Final/filed legal documents |
| `document_versions` | Version history of documents |
| `drafts` | Auto-saved wizard state |
| `attachments` | Files attached to documents |
| `precedents` | SC judgement database |
| `bookmarks` | Saved documents/precedents |
| `annotations` | Inline comments on documents |
| `search_history` | User search history |
| `notifications` | In-app notifications |
| `subscriptions` | Razorpay subscription data |
| `payments` | Payment transaction history |
| `audit_logs` | All user actions logged |
| `templates` | Reusable document templates |
| `clauses` | Standard legal clauses library |
| `cause_lists` | Judicial cause list entries |

---

## Prisma Studio (Visual DB Editor)

```bash
npm run db:studio
```

Opens a visual interface to view and edit your database at http://localhost:5555

---

## Adding Google Login (Optional)

1. Go to **console.cloud.google.com**
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client → Web application
4. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env.local`
