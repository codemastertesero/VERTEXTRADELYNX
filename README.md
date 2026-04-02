# Vertex TradeLynx — Full-Stack Website

Professional freight forwarding website for **Vertex TradeLynx** built with React (frontend) and Node.js/Express (backend).

---

## 📁 Project Structure

```
vertex-tradelynx/
├── frontend/                   # React app
│   ├── public/
│   │   ├── index.html
│   │   └── logo.png           ← Put your logo here
│   └── src/
│       ├── App.jsx             # Router + layout
│       ├── index.js            # Entry point
│       ├── styles/
│       │   └── global.css      # Design system, variables
│       ├── components/
│       │   ├── Navbar.jsx      # Sticky nav with dropdown
│       │   ├── Navbar.css
│       │   ├── Footer.jsx
│       │   └── Footer.css
│       └── pages/
│           ├── Home.jsx        # Hero, stats, services, industries, CTA
│           ├── Home.css
│           ├── Services.jsx    # All 6 services in detail
│           ├── Services.css
│           ├── Industries.jsx  # 8 industry verticals
│           ├── Industries.css
│           ├── About.jsx       # Story, founder, values, timeline
│           ├── About.css
│           ├── Contact.jsx     # Click-to-call/email + enquiry form
│           ├── Contact.css
│           ├── Quote.jsx       # 4-step freight quote wizard
│           └── Quote.css
│
├── backend/
│   ├── server.js               # Express API + Nodemailer
│   ├── .env.example            # Copy to .env and fill credentials
│   └── package.json
│
├── package.json                # Root — runs both together
└── README.md
```

---

## 🚀 Quick Setup

### 1. Install dependencies

```bash
# From the root folder
npm install
npm run install:all
```

### 2. Configure email (REQUIRED for enquiry emails)

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and fill in:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password   # See below
```

**Getting a Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Create a new App Password (select "Mail" → "Other")
5. Copy the 16-character password into `EMAIL_PASS`

### 3. Run in development

```bash
# From root folder — starts both frontend (port 3000) and backend (port 5000)
npm run dev
```

Or run separately:
```bash
npm run start:backend    # API server on http://localhost:5000
npm run start:frontend   # React app on http://localhost:3000
```

---

## 🌐 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, services preview, industries, CTA |
| Services | `/services` | All 6 services with detail |
| Industries | `/industries` | 8 industry verticals |
| About | `/about` | Story, Nilesh's profile, values, timeline |
| Contact | `/contact` | Click-to-call/email + enquiry form |
| Quote | `/quote` | 4-step freight quote wizard |

---

## ✅ Features

- **Glass morphism UI** — deep navy/steel blue palette with blur effects
- **Responsive** — mobile-first, works on all screen sizes  
- **Click-to-call** — `tel:+919503645532` links throughout
- **Click-to-email** — `mailto:nilesh@vertextradelynx.com` links
- **Enquiry form** — sends email to nilesh@vertextradelynx.com + auto-reply to client
- **4-step quote wizard** — detailed freight quote with service picker
- **Sticky glass navbar** — with dropdown for services + mobile hamburger menu
- **Animated hero** — floating orbs, grid, pulse dots, scroll indicator
- **Page transitions** — smooth scroll-to-top on route changes

---

## 🛠 Tech Stack

**Frontend:** React 18, React Router v6, Lucide React icons, CSS3 animations  
**Backend:** Node.js, Express, Nodemailer  
**Email:** Gmail SMTP (configurable for any SMTP provider)

---

## 📦 Deployment

**Frontend (Vercel/Netlify):**
```bash
cd frontend && npm run build
# Deploy the /build folder
```

**Backend (Railway/Render/VPS):**
```bash
cd backend
# Set environment variables in your hosting dashboard
npm start
```

Update `FRONTEND_URL` in backend `.env` to your live domain, and set the `proxy` in `frontend/package.json` to your backend URL for production.

---

## 📞 Contact Details (Live in Website)

- **Phone:** +91 95036 45532 (clickable, opens dialer)
- **Email:** nilesh@vertextradelynx.com (clickable, opens mail client)
- **Location:** Mumbai, Maharashtra, India
- **Founder:** Nilesh Chavan
