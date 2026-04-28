# WritOnline — Deployment Guide for Cloudflare Pages

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Cloudflare Pages (via @cloudflare/next-on-pages)

---

## Prerequisites

Install these on your local machine:
- Node.js 18+ → https://nodejs.org
- Git → https://git-scm.com
- A GitHub account → https://github.com
- A Cloudflare account → https://dash.cloudflare.com

---

## Step 1 — Install Dependencies

Open terminal in this folder and run:

```bash
npm install
```

---

## Step 2 — Test Locally

```bash
npm run dev
```

Open http://localhost:3000 — you should see WritOnline.

---

## Step 3 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial WritOnline deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/writonline.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 4 — Connect to Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** in the left sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Select your `writonline` GitHub repository
5. Configure build settings:

| Setting | Value |
|---|---|
| Framework preset | `Next.js` |
| Build command | `npx @cloudflare/next-on-pages@1` |
| Build output directory | `.vercel/output/static` |
| Node.js version | `18` |

6. Add this Environment Variable:
   - Name: `NODE_VERSION`
   - Value: `18`

7. Click **Save and Deploy**

Cloudflare will build and deploy your site. This takes 2–3 minutes.

---

## Step 5 — Connect Your Domain

1. In Cloudflare Pages, go to your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain: `writonline.in` (or `www.writonline.in`)
4. Since your domain is already on Cloudflare DNS, it will auto-configure
5. Cloudflare will add a CNAME record automatically

Done! Your site will be live at your domain within minutes with:
- Free SSL/HTTPS certificate (auto-renewed)
- Global CDN (fast loading across India)
- DDoS protection
- Free bandwidth

---

## Step 6 — Environment Variables (Optional)

In Cloudflare Pages → Settings → Environment variables, add:

```
NEXT_PUBLIC_SITE_URL=https://writonline.in
NEXT_PUBLIC_CONTACT_EMAIL=hello@writonline.in
```

---

## Automatic Deployments

Every time you push to GitHub `main` branch, Cloudflare automatically rebuilds and redeploys your site. Zero manual work.

---

## Project Structure

```
writonline/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── globals.css         # Tailwind + custom CSS
│   ├── page.tsx            # Homepage (landing page)
│   ├── dashboard/
│   │   └── page.tsx        # User dashboard
│   ├── draft/
│   │   └── page.tsx        # Smart draft wizard (6-step form)
│   ├── precedents/
│   │   └── page.tsx        # SC Precedents database
│   └── pricing/
│       └── page.tsx        # Pricing plans
├── components/
│   ├── Navbar.tsx          # Top navigation
│   └── Footer.tsx          # Footer
├── lib/
│   └── data.ts             # SC precedents, document categories, clauses
├── public/                 # Static assets (add favicon.ico here)
├── next.config.js
├── tailwind.config.ts
├── wrangler.toml           # Cloudflare config
└── package.json
```

---

## Adding More Pages

To add a new page (e.g. `/contact`):

```bash
mkdir app/contact
# Create app/contact/page.tsx
```

---

## Support

For Cloudflare Pages issues: https://developers.cloudflare.com/pages/framework-guides/nextjs/
For Next.js docs: https://nextjs.org/docs
