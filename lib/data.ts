export const ACCENT = '#ae42a5'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

export const SOCIALS = [
  { k: 'GH', l: 'GitHub', u: 'https://github.com/Maame-Yaa' },
  { k: 'in', l: 'LinkedIn', u: 'https://linkedin.com/in/mytwumasi' },
  { k: '@', l: 'Email', u: 'mailto:maameyaamtwumasi@gmail.com' },
]

export const STATS = [
  { num: '3+', label: 'Years experience' },
  { num: 'AWS', label: 'Certified Cloud Practitioner' },
  { num: 'B.Sc', label: 'Computer Engineering' },
  { num: 'VA', label: 'Based in Virginia' },
]

export const SKILLS: [string, string][] = [
  ['JavaScript', 'Frontend'], ['TypeScript', 'Frontend'], ['React', 'Frontend'],
  ['Next.js', 'Frontend'], ['Vue.js', 'Frontend'], ['Nuxt.js', 'Frontend'],
  ['Tailwind CSS', 'Frontend'], ['HTML/CSS', 'Frontend'],
  ['Python', 'Backend'], ['FastAPI', 'Backend'], ['Node.js', 'Backend'],
  ['Express', 'Backend'], ['NestJS', 'Backend'], ['PostgreSQL', 'Backend'],
  ['SQLAlchemy', 'Backend'], ['Prisma', 'Backend'], ['Pydantic', 'Backend'], ['REST APIs', 'Backend'],
  ['AWS', 'Cloud & DevOps'], ['Docker', 'Cloud & DevOps'], ['Git', 'Cloud & DevOps'],
  ['GitHub', 'Cloud & DevOps'], ['GitLab', 'Cloud & DevOps'], ['Alembic', 'Cloud & DevOps'], ['Pytest', 'Cloud & DevOps'],
  ['Figma', 'Tools'], ['Postman', 'Tools'],
]

export const SKILL_ABBR: Record<string, string> = {
  'JavaScript': 'JS', 'TypeScript': 'TS', 'React': 'Re', 'Next.js': 'Nx',
  'Vue.js': 'Vu', 'Nuxt.js': 'Nu', 'Tailwind CSS': 'Tw', 'HTML/CSS': '<>',
  'Python': 'Py', 'FastAPI': 'Fa', 'Node.js': 'No', 'Express': 'Ex', 'NestJS': 'Ne',
  'PostgreSQL': 'Pg', 'SQLAlchemy': 'SA', 'Prisma': 'Pr', 'Pydantic': 'Pd', 'REST APIs': '{}',
  'AWS': 'aws', 'Docker': 'Dk', 'Git': 'Git', 'GitHub': 'GH', 'GitLab': 'GL',
  'Alembic': 'Al', 'Pytest': 'Pt', 'Figma': 'Fi', 'Postman': 'Pm',
}

export const SKILL_SLUGS: Record<string, string> = {
  'JavaScript': 'javascript', 'TypeScript': 'typescript', 'React': 'react',
  'Next.js': 'nextdotjs', 'Vue.js': 'vuedotjs', 'Nuxt.js': 'nuxt',
  'Tailwind CSS': 'tailwindcss', 'HTML/CSS': 'html5', 'Python': 'python',
  'FastAPI': 'fastapi', 'Node.js': 'nodedotjs', 'Express': 'express',
  'NestJS': 'nestjs', 'PostgreSQL': 'postgresql', 'SQLAlchemy': 'sqlalchemy',
  'Prisma': 'prisma', 'Pydantic': 'pydantic', 'Docker': 'docker', 'Git': 'git',
  'GitHub': 'github', 'GitLab': 'gitlab', 'Pytest': 'pytest', 'Figma': 'figma',
  'Postman': 'postman',
}

export const SKILL_LOCAL: Record<string, { url: (theme: string) => string; tile?: boolean; size?: string }> = {
  'AWS': { url: (t) => t === 'light' ? '/assets/aws-light.png' : '/assets/aws-dark.png', tile: false, size: '25px' },
  'REST APIs': { url: () => '/assets/rest-api-logo.png', tile: false, size: '24px' },
  'Alembic': { url: () => '/assets/alembic-logo.png', tile: true, size: '26px' },
}

export const SKILL_MONO = ['nextdotjs', 'express', 'prisma', 'github']

export const EXPERIENCE = [
  {
    role: 'Software Engineer',
    tag: 'Full Stack · Backend-Leaning',
    company: 'Cher Inc',
    loc: 'Remote',
    cur: true,
    blurb: 'Worked on the backend foundation for an early-stage CRM & Loan Origination System for the mortgage 1003 workflow: a 7-entity PostgreSQL schema, an 11-state application lifecycle, a document-upload API on AWS S3, and a Next.js auth layer with NextAuth.js.',
    chips: ['Python', 'FastAPI', 'PostgreSQL', 'Next.js', 'AWS S3', 'Docker'],
    leaves: [
      { kind: 'repo' as const, label: 'Backend\nsample', url: 'https://github.com/Maame-Yaa/Cher-Backend' },
      { kind: 'repo' as const, label: 'Frontend\nsample', url: 'https://github.com/Maame-Yaa/Cher-Frontend' },
    ],
  },
  {
    role: 'Software Engineer',
    tag: 'Frontend',
    company: 'Aortem',
    loc: 'Remote',
    cur: false,
    blurb: 'Built a SaaS admin platform in Vue 3 / Nuxt 3, with dynamic dashboards, tables, pagination, and multi-step modal flows from Figma. Shipped 10+ reusable components and shared composables, and wired auth & gated onboarding with Firebase.',
    chips: ['Vue 3', 'Nuxt 3', 'Figma', 'Firebase', 'GitLab'],
    leaves: [
      { kind: 'repo' as const, label: 'Vue admin\nsample', url: 'https://github.com/Maame-Yaa/intellitoggle' },
    ],
  },
  {
    role: 'Website Developer',
    tag: 'Frontend · SEO',
    company: 'The Dayton Weekly News',
    loc: 'Dayton, OH',
    cur: false,
    blurb: "Rebuilt and managed the organization's website, improving mobile responsiveness and structure. Drove a 78% increase in homepage traffic through SEO and content optimization, informed by Google Analytics.",
    chips: ['Wix', 'SEO', 'Google Analytics'],
    leaves: [],
  },
  {
    role: 'Founder & Software Developer',
    tag: 'Part-time · Freelance',
    company: 'Camara Ghana Web Development',
    loc: 'Remote',
    cur: true,
    blurb: 'Co-founded a small web studio building custom sites for small businesses on the MERN stack and CMS platforms (WordPress, Shopify, Wix). Led projects end to end: requirements, design, deployment, payment-gateway integrations, and post-launch support.',
    chips: ['MERN', 'WordPress', 'Shopify', 'Wix'],
    leaves: [
      { kind: 'site' as const, label: 'electrohousegh.com', url: 'https://electrohousegh.com' },
      { kind: 'site' as const, label: 'vannardesigns.com', url: 'https://vannardesigns.com' },
    ],
  },
]

export const HOME_PROJECTS = [
  {
    name: 'Elopement Tracker',
    tag: 'Safety · IoT',
    soon: false,
    shot: 'Live geofence map + instant alerts',
    img: '/assets/elopement-tracker.png',
    desc: 'A real-time geofencing alert system for children with autism. Live fence drawing via the Google Maps API with instant alerts over GPS, LoRaWAN, and MQTT.',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'Google Cloud', 'Socket.IO', 'MQTT', 'LoRaWAN'],
    links: [{ l: 'GitHub', u: 'https://github.com/Maame-Yaa/Autism-Elopement-Tracker' }],
  },
  {
    name: 'ServiceOps Lite',
    tag: 'Coming Soon',
    soon: true,
    shot: 'Intake pipeline, in development',
    img: null as string | null,
    desc: 'A full-stack intake and inquiry management tool for service businesses. In active development, shipping soon.',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'AWS'],
    links: [{ l: 'GitHub', u: 'https://github.com/Maame-Yaa/ServiceOps-Lite' }],
  },
]

export const WORK_GROUPS = [
  { name: 'LIVE SITES', color: '#1f8a5b', tint: 'rgba(31,138,91,0.16)' },
  { name: 'IOT', color: '#2a6fdb', tint: 'rgba(42,111,219,0.16)' },
  { name: 'FULL-STACK', color: '#8a5cf6', tint: 'rgba(138,92,246,0.16)' },
]

export type ProjectKind = 'live' | 'shot' | 'walkthrough' | 'building'
export type RoadmapStatus = 'done' | 'active' | 'next'

export const WORK_PROJECTS = [
  {
    id: 'electrohouse',
    group: 'LIVE SITES',
    name: 'Electro House Ghana',
    label: 'electrohousegh.com',
    fav: '/assets/electrohouse.png',
    kind: 'live' as ProjectKind,
    url: 'https://electrohousegh.com',
    repo: undefined as string | undefined,
    tag: 'WordPress Site',
    blurb: 'A WordPress business site I built and shipped for an electrical & lighting supplier in Ghana.',
    problem: 'Electro House Ghana, an electrical and lighting supply company, needed a credible business website: a browsable product catalog and a quote-request flow that the owner could keep updated himself.',
    approach: 'I built the full WordPress site in LocalWP with Elementor, then migrated it to live hosting by hand: exporting the database, fixing a table-prefix mismatch, rewriting all the site URLs, and clearing caches. I also normalized the product photos and prepared a bulk catalog import for the lighting range.',
    stack: ['WordPress', 'WooCommerce', 'Elementor', 'phpMyAdmin', 'cPanel', 'SEO'],
    note: 'Live embed: the real electrohousegh.com runs in the frame. If the site blocks embedding, use the "Open site" button, top-right.',
    shot: undefined as string | undefined,
    video: undefined as string | undefined,
    img: undefined as string | undefined,
    challenges: undefined as string | undefined,
    modules: undefined as { n: string; d: string }[] | undefined,
    layers: undefined as { tier: string; tech: string; host: string }[] | undefined,
    roadmap: undefined as { m: string; status: RoadmapStatus }[] | undefined,
  },
  {
    id: 'vannar',
    group: 'LIVE SITES',
    name: 'Vannar Designs',
    label: 'vannardesigns.com',
    fav: '/assets/vannar.png',
    kind: 'shot' as ProjectKind,
    url: 'https://vannardesigns.com',
    repo: undefined as string | undefined,
    shot: '/assets/vannar-screenshot.png',
    tag: 'Shopify Store',
    blurb: 'A Shopify storefront for Vannar Designs, a fashion & lifestyle brand by Naa Kwamah Nartey.',
    problem: 'A fashion and lifestyle label needed an online store to sell across many categories, bags, clothing, wigs, and home pieces, with a polished, on-brand shopping experience.',
    approach: "A Shopify storefront spanning 11 product collections, with quick add-to-cart, image-hover swaps, a currency and country selector, newsletter signup, and an FAQ, all under the brand's \"Timeless. Captivating. Fabulous.\" identity.",
    stack: ['Shopify', 'E-commerce', 'Responsive', 'SEO'],
    note: 'This is a screenshot of the live vannardesigns.com, the store blocks being embedded, so use "Open site" to visit and shop it for real.',
    video: undefined as string | undefined,
    img: undefined as string | undefined,
    challenges: undefined as string | undefined,
    modules: undefined as { n: string; d: string }[] | undefined,
    layers: undefined as { tier: string; tech: string; host: string }[] | undefined,
    roadmap: undefined as { m: string; status: RoadmapStatus }[] | undefined,
  },
  {
    id: 'elopement',
    group: 'IOT',
    name: 'Elopement Tracker',
    label: 'elopement-tracker',
    fav: '/assets/elopement-tracker.png',
    kind: 'walkthrough' as ProjectKind,
    url: undefined as string | undefined,
    repo: 'https://github.com/Maame-Yaa/Autism-Elopement-Tracker',
    img: '/assets/elopement-tracker.png',
    video: '/assets/elopement-walkthrough.mp4',
    tag: 'Safety · IoT',
    blurb: 'A real-time geofencing safety system for children with autism.',
    problem: 'Children with autism are prone to elopement, wandering away from safe areas, which can be dangerous. Caregivers needed a real-time safety net that warns them the instant a child crosses a boundary.',
    approach: 'A caregiver draws a safe geofence on a live map. A GPS device streams location over LoRaWAN and MQTT to the server, which checks each position against the fence and pushes an instant alert over Socket.IO the moment the boundary is crossed.',
    challenges: 'Reliable real-time delivery, accurate fence-breach detection, and bridging physical LoRaWAN hardware with a live web stack.',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'Socket.IO', 'MQTT', 'LoRaWAN', 'Google Maps'],
    note: 'Walkthrough: a 49-second screen recording of the system, using a simulated GPS tracker in place of the physical LoRaWAN hardware. Code is on GitHub.',
    shot: undefined as string | undefined,
    modules: undefined as { n: string; d: string }[] | undefined,
    layers: undefined as { tier: string; tech: string; host: string }[] | undefined,
    roadmap: undefined as { m: string; status: RoadmapStatus }[] | undefined,
  },
  {
    id: 'serviceops',
    group: 'FULL-STACK',
    name: 'ServiceOps Lite',
    label: 'serviceops-lite',
    fav: '/assets/aws-dark.png',
    kind: 'building' as ProjectKind,
    url: undefined as string | undefined,
    repo: 'https://github.com/Maame-Yaa/ServiceOps-Lite',
    tag: 'In Development',
    blurb: 'A lightweight intake & inquiry tool for service businesses, built to demonstrate full-stack and cloud depth.',
    problem: 'Small service businesses capture leads across scattered DMs and email with no structure, and lose track of who asked for what.',
    approach: 'A public intake form and contact form feed a single admin dashboard where every lead gets a status, internal notes, tags, and search, with optional admin-triggered AI inquiry summarization.',
    layers: [
      { tier: 'CLIENT', tech: 'Next.js · TypeScript · Tailwind', host: 'hosted on S3 + CloudFront' },
      { tier: 'API', tech: 'NestJS · REST', host: 'running on ECS Fargate' },
      { tier: 'DATA', tech: 'Prisma · PostgreSQL', host: 'Amazon RDS' },
      { tier: 'AUTH', tech: 'Amazon Cognito', host: 'secrets in Secrets Manager' },
    ],
    modules: [
      { n: 'Client Intake & Discovery', d: 'Structured project details, status workflow, tags, search and filtering.' },
      { n: 'Inquiry Management', d: 'Contact inquiries with statuses, internal notes per record, and filtering.' },
    ],
    roadmap: [
      { m: 'M0 · Scaffold & docs', status: 'done' as RoadmapStatus },
      { m: 'M1 · DB & API backbone', status: 'active' as RoadmapStatus },
      { m: 'M2 · Admin UI', status: 'next' as RoadmapStatus },
      { m: 'M3 · Public forms', status: 'next' as RoadmapStatus },
      { m: 'M3.5 · AI add-on', status: 'next' as RoadmapStatus },
      { m: 'M4 · Deploy & freeze', status: 'next' as RoadmapStatus },
    ],
    stack: ['Next.js', 'NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Cognito', 'ECS Fargate', 'RDS', 'S3 + CloudFront', 'AWS CDK'],
    note: 'In active development: Milestone 0 (monorepo, Docker Postgres, infra scaffold) is complete; Milestone 1 (Prisma schema + NestJS REST API) is underway.',
    shot: undefined as string | undefined,
    img: undefined as string | undefined,
    video: undefined as string | undefined,
    challenges: undefined as string | undefined,
  },
]

export const JOURNEY = ['HTML / CSS', 'JavaScript', 'Bootstrap', 'MERN stack', 'Python', 'Docker', 'Git & CI/CD']

export const CONTACTS = [
  { label: 'email', value: 'maameyaamtwumasi@gmail.com', arrow: '→', url: 'mailto:maameyaamtwumasi@gmail.com', target: '_self' },
  { label: 'github', value: 'github.com/Maame-Yaa', arrow: '↗', url: 'https://github.com/Maame-Yaa', target: '_blank' },
  { label: 'linkedin', value: 'linkedin.com/in/mytwumasi', arrow: '↗', url: 'https://linkedin.com/in/mytwumasi', target: '_blank' },
]

export const TYPEWRITER_PHRASES = [
  'Full Stack Software Engineer',
  'AWS Certified Cloud Practitioner',
  'Tech Enthusiast',
  'Problem Solver',
]
