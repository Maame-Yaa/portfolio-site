# Maame Yaa Twumasi — Portfolio

Personal portfolio site built with Next.js 16, TypeScript, and Tailwind CSS v4.

---

## Pages

- **Home** — hero with interactive terminal shell, skills grid with category tabs, and project preview cards
- **About** — story, values, and tech journey
- **Work** — experience timeline and a project browser with live embeds, screenshots, and walkthroughs inside device frames
- **Contact** — direct links and a contact form that sends email via the API route

## Built With

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 + CSS custom properties for theming
- **Fonts** — Space Grotesk, Manrope, JetBrains Mono (Google Fonts)
- **Email** — nodemailer via `/api/contact`
- **Deployment** — Vercel
- **Designed in** — Claude Design
- **Built with** — Claude Code

## Features

- Dark / light theme toggle persisted to `localStorage`
- Canvas-based fluid particle effect that follows the cursor
- Custom SVG cursors (ring + dot default, filled circle on hover targets)
- First-visit loading screen with name reveal and progress bar
- Interactive terminal on the home page with command history and arrow-key navigation
- Responsive device frames on the Work page (laptop on desktop, phone on mobile)
- Per-page metadata and Open Graph tags

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form setup

The form POSTs to `/api/contact` which sends email via nodemailer. Create a `.env.local` file:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
```

For Gmail, generate an App Password at **Google Account → Security → App passwords** (requires 2FA).
