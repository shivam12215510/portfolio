// Single source of truth for all portfolio content.
// Everything below is taken from the resume. Edit here to update the site.

export const profile = {
  name: 'Shivam Thakur',
  firstName: 'Shivam',
  location: 'Punjab, India',
  email: 'shivt1045@gmail.com',
  github: 'https://github.com/shivam12215510',
  githubUser: 'shivam12215510',
  linkedin: 'https://linkedin.com/in/Shivam',
  githubLabel: 'github.com/shivam12215510',
  linkedinLabel: 'linkedin.com/in/Shivam',
  resume: '/Shivam_Thakur_Resume.pdf',
  photo: {
    src: '/images/shivam-720.webp',
    srcSet: '/images/shivam-480.webp 480w, /images/shivam-720.webp 720w, /images/shivam-1000.webp 1000w',
    sizes: '(min-width: 1024px) 420px, 340px',
    width: 720,
    height: 900,
    alt: 'Portrait of Shivam Thakur in a black blazer, standing in front of a sunlit wall',
  },
  roles: ['Full Stack Software Engineer', 'SaaS Builder', 'Startup Founder', 'AI/ML Enthusiast'],
}

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export const about = {
  paragraphs: [
    'I’m a Computer Science graduate with Honors in Data Science from Lovely Professional University, and I build full-stack applications and scalable SaaS products end to end — from database design and APIs to polished, role-aware interfaces.',
    'I have production experience developing healthcare CRM systems: shipping software that consultants and admins use for lead management, client tracking and automated follow-ups.',
    'I also founded Scholarly, an education startup, and secured ₹1 lakh in university startup funding to take it from idea to a platform with real users.',
  ],
  highlights: [
    { label: 'Education', value: 'B.Tech CSE, Honors in Data Science', sub: 'Lovely Professional University · 2022 – 2026' },
    { label: 'Focus', value: 'Production SaaS & healthcare tech', sub: 'FastAPI · React · PostgreSQL' },
    { label: 'Founder', value: 'Scholarly (EdTech)', sub: '₹1 lakh university startup funding' },
    { label: 'Base', value: 'Punjab, India', sub: 'Available for opportunities' },
  ],
  education: [
    { school: 'Lovely Professional University', place: 'Phagwara, Punjab', degree: 'Bachelor of Technology in Computer Science, Honors in Data Science', period: 'Aug 2022 – Jun 2026' },
    { school: 'Acme Public School', place: 'Hamirpur, Himachal Pradesh', degree: 'Higher Secondary Certificate (HSC)', period: 'Mar 2020 – Mar 2022' },
  ],
}

export type Project = {
  id: string
  index: string
  title: string
  category: string
  flagship?: boolean
  description: string
  stack: string[]
  features: string[]
  metrics?: { value: string; label: string }[]
  /** One-line headline for the showcase */
  tagline: string
  /** "r g b" triples: mid tone, light-on-dark text tone, dark-on-light text tone */
  accent: string
  accentSoft: string
  accentDeep: string
  /** Lower-case words that must all appear in a GitHub repo name for it to be linked to this project */
  repoMatch: string[]
  icon: 'heart' | 'book' | 'film' | 'activity'
  /** Optional live URL. Leave empty — no live links are invented. */
  liveUrl?: string
  /** Optional repository URL. Falls back to the GitHub profile. */
  repoUrl?: string
  caseStudy: { goal: string; built: string[] }
}

export const projects: Project[] = [
  {
    id: 'healthy-manushya-crm',
    index: '01',
    title: 'Healthy Manushya CRM',
    category: 'Production SaaS / Healthcare Technology',
    flagship: true,
    description:
      'A production healthcare CRM designed to streamline lead management, consultant workflows, client tracking, supplement management, automated follow-ups, and business analytics.',
    stack: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'APScheduler', 'Vercel', 'Render'],
    features: [
      'Role-based dashboards for Admin, Consultant and Client',
      'Automated lead distribution',
      'Google Sheets synchronization',
      'Client management',
      'Supplement renewal workflows',
      'Automated reminders',
      'Analytics and reporting',
      'Progressive Web App support',
    ],
    tagline: 'A healthcare CRM, built for production.',
    accent: '16 185 129',
    accentSoft: '110 231 183',
    accentDeep: '4 120 87',
    repoMatch: ['manushya', 'crm'],
    icon: 'heart',
    caseStudy: {
      goal:
        'One platform for consultants and admins to run the client lifecycle — from lead management and follow-ups to supplement renewals and analytics.',
      built: [
        'FastAPI + SQLAlchemy backend with REST APIs and optimized PostgreSQL queries.',
        'Responsive React frontend with role-based dashboards for Admin, Consultant and Client users.',
        'Secure JWT authentication with role-based authorization (RBAC) across the platform.',
        'Automated lead distribution, plus Google Sheets synchronization for lead import and updates.',
        'Reminder scheduling with APScheduler and background jobs; supplement tracking, renewal workflows and analytics dashboards.',
        'PWA support for mobile users; deployed and maintained on Render and Vercel.',
      ],
    },
  },
  {
    id: 'scholarly',
    index: '02',
    title: 'Scholarly',
    category: 'Startup / EdTech',
    description:
      'An educational platform founded by me to improve the digital learning experience — launched with university funding and built around interactive learning.',
    stack: ['EdTech', 'Web Platform', 'Product', 'Growth'],
    features: [
      'Secured ₹1 lakh startup funding from Lovely Professional University',
      'Reached 100+ users in the first month',
      'Improved user engagement by 30%',
      'Introduced interactive learning features',
    ],
    metrics: [
      { value: '₹1 Lakh', label: 'University startup funding' },
      { value: '100+', label: 'Users in the first month' },
      { value: '30%', label: 'Engagement increase' },
      { value: '50%', label: 'More interaction from new features' },
      { value: '90%', label: 'Users with positive feedback' },
    ],
    tagline: 'Learning, made interactive.',
    accent: '245 158 11',
    accentSoft: '252 211 77',
    accentDeep: '180 83 9',
    repoMatch: ['scholarly'],
    icon: 'book',
    caseStudy: {
      goal: 'Improve the digital learning experience by building an education platform around interactive learning features.',
      built: [
        'Launched the Scholarly website, reaching 100+ users within the first month and driving a 30% increase in user engagement.',
        'Introduced new interactive learning features, increasing user interaction by 50% with positive feedback from 90% of users.',
        'Secured Rs. 1 lakh in startup funding from the university to accelerate development of the platform.',
      ],
    },
  },
  {
    id: 'movie-recommender',
    index: '03',
    title: 'Movie Recommender System',
    category: 'Machine Learning',
    description:
      'A content-based recommendation engine that turns movie metadata into fast, real-time top-N suggestions, shipped as an interactive Streamlit app.',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit'],
    features: [
      'Content-based recommendation engine',
      'TF-IDF / CountVectorizer',
      'Cosine similarity',
      'Real-time recommendations',
    ],
    tagline: 'Recommendations in real time.',
    accent: '139 92 246',
    accentSoft: '196 181 253',
    accentDeep: '109 40 217',
    repoMatch: ['movie', 'recommend'],
    icon: 'film',
    caseStudy: {
      goal: 'Turn movie metadata into relevant top-N suggestions, fast enough for real-time use in an interactive app.',
      built: [
        'Content-based engine using TF-IDF/CountVectorizer and cosine similarity on movie metadata to generate top-N suggestions.',
        'Optimized retrieval with efficient index mapping and pre-trained similarity matrices for fast, real-time predictions.',
        'Interactive Streamlit app with dynamic dropdown selections and error handling.',
      ],
    },
  },
  {
    id: 'heart-disease-prediction',
    index: '04',
    title: 'Heart Disease Prediction',
    category: 'Machine Learning / Healthcare AI',
    description:
      'A Logistic Regression model that predicts heart disease risk from patient health records, with a predictive tool for user medical inputs.',
    stack: ['Python', 'Scikit-learn', 'Logistic Regression'],
    features: [
      'Dataset of 1,025 records',
      '85% training accuracy',
      '80% test accuracy',
      'Data preprocessing and feature selection',
    ],
    metrics: [
      { value: '1,025', label: 'Records' },
      { value: '85%', label: 'Train accuracy' },
      { value: '80%', label: 'Test accuracy' },
    ],
    tagline: 'Predicting risk from patient records.',
    accent: '244 63 94',
    accentSoft: '253 164 175',
    accentDeep: '190 18 60',
    repoMatch: ['heart'],
    icon: 'activity',
    caseStudy: {
      goal: 'Identify the medical indicators that most influence heart disease risk and predict it from patient records.',
      built: [
        'Preprocessing, normalization and feature selection on 1,025 patient records.',
        'Exploratory data analysis of key indicators such as age, cholesterol and blood pressure.',
        'Validated with a confusion matrix and classification report; built a predictive tool for user medical inputs.',
      ],
    },
  },
]

export const experience = [
  {
    company: 'Healthy Manushya',
    role: 'Full Stack Software Engineer',
    period: 'May 2026 – Present',
    location: 'Punjab, India',
    current: true,
    bullets: [
      'Built and deployed a production healthcare CRM used by consultants and admins for lead management, client tracking, follow-ups, and supplement management.',
      'Developed backend services with FastAPI, PostgreSQL, SQLAlchemy and REST APIs; built a responsive React frontend with role-based dashboards for Admin, Consultant and Client roles.',
      'Implemented secure JWT authentication and role-based authorization (RBAC) across the platform.',
      'Designed automated lead distribution and integrated Google Sheets synchronization for lead import and updates.',
      'Built reminder scheduling with APScheduler and background jobs; implemented supplement tracking, renewal workflows, and analytics/reporting dashboards.',
      'Optimized database queries and background processes, and deployed and maintained the application on Render and Vercel.',
    ],
    tags: ['FastAPI', 'React', 'PostgreSQL', 'JWT', 'APScheduler'],
  },
  {
    company: 'Scholarly',
    role: 'Founder',
    period: 'January 2024 – Present',
    location: 'Lovely Professional University',
    current: true,
    bullets: [
      'Secured ₹1 lakh in startup funding from the university to accelerate development of the Scholarly platform.',
      'Launched the Scholarly website, reaching 100+ users within the first month and driving a 30% increase in user engagement.',
      'Introduced new interactive learning features, increasing user interaction by 50% with positive feedback from 90% of users.',
    ],
    tags: ['Startup', 'EdTech', 'Product'],
  },
  {
    company: 'Google Developer Student Clubs',
    role: 'Machine Learning Member',
    period: 'August 2023 – Present',
    location: 'Punjab, India',
    current: true,
    bullets: [
      'Participated in 5+ Machine Learning workshops with 30+ attendees per session, focusing on neural networks, data preprocessing, and model deployment.',
      'Engaged 15+ club members, contributing to several ML projects showcased at regional tech events.',
      'Attended guest lectures and panel discussions with industry experts, helping bridge academia and industry in Machine Learning applications.',
    ],
    tags: ['Machine Learning', 'Community'],
  },
]

export const skillGroups = [
  { title: 'Languages', icon: 'code', items: ['Python', 'Java', 'SQL', 'JavaScript', 'HTML', 'CSS'] },
  { title: 'Frameworks', icon: 'layers', items: ['FastAPI', 'React', 'SQLAlchemy', 'Streamlit'] },
  { title: 'Backend', icon: 'server', items: ['REST APIs', 'JWT Authentication', 'RBAC'] },
  { title: 'Databases', icon: 'database', items: ['PostgreSQL', 'SQLite'] },
  { title: 'Tools', icon: 'wrench', items: ['Git', 'GitHub', 'Postman', 'Render', 'Vercel'] },
  { title: 'Data Science', icon: 'brain', items: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'] },
  { title: 'Other', icon: 'chart', items: ['Power BI', 'Tableau', 'Excel'] },
] as const

export const stats = [
  { value: 1, prefix: '₹', suffix: ' Lakh', label: 'Startup funding secured', note: 'Lovely Professional University' },
  { value: 100, prefix: '', suffix: '+', label: 'Users reached by Scholarly', note: 'In the first month' },
  { value: 4, prefix: '', suffix: '+', label: 'Major projects built', note: 'SaaS, EdTech & ML' },
  { value: null, prefix: '', suffix: '', text: 'Production SaaS', label: 'Healthcare CRM development', note: 'Used by consultants & admins' },
] as const
