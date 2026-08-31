// Zomic marketing — central content/nav data.
// Single source of truth so the navbar mega-menus, footer, and page
// links never drift. Every entry resolves to a real built page.

export const PRODUCT_GROUPS = [
  {
    title: 'Core',
    items: [
      { to: '/product/lead-management', label: 'Lead Management', desc: 'Pipeline, stages, and a single inbox for every lead.', icon: 'Users' },
      { to: '/product/whatsapp-automation', label: 'WhatsApp Automation', desc: 'Send, receive, and automate WhatsApp at scale.', icon: 'MessageCircle' },
      { to: '/product/email-system', label: 'Email Marketing System', desc: 'Campaigns, templates, and deliverability built in.', icon: 'Mail' },
      { to: '/product/lead-management#team', label: 'Team Management', desc: 'Roles, assignments, and shared visibility.', icon: 'UsersRound' },
    ],
  },
  {
    title: 'Automations',
    items: [
      { to: '/product/automations', label: 'Facebook & Instagram Lead Ads', desc: 'Capture ad leads straight into your pipeline.', icon: 'Megaphone' },
      { to: '/product/automations#wordpress', label: 'WordPress Integration', desc: 'Turn form submissions into qualified leads.', icon: 'Globe' },
      { to: '/product/automations#zapier', label: 'Zapier & Webhooks', desc: 'Connect Zomic to the 6,000+ tools you already use.', icon: 'Plug' },
      { to: '/product/automations#rules', label: 'Automation Rules', desc: 'Trigger-based workflows without a single line of code.', icon: 'Workflow' },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { to: '/product/analytics', label: 'Analytics & Reporting', desc: 'Dashboards that show what is actually closing.', icon: 'BarChart3' },
      { to: '/product/analytics#signal', label: 'Conversion Signal', desc: 'Engagement scoring that flags your hottest leads.', icon: 'Flame' },
      { to: '/product/analytics#ai', label: 'AI-Powered Insights', desc: 'Next-best-action suggestions, written in plain English.', icon: 'Sparkles' },
    ],
  },
];

export const PRODUCT_FEATURED = {
  badge: 'New',
  title: 'Zomic Mail',
  desc: 'Broadcast email campaigns with a drag-and-drop builder, baked right into your CRM. No separate tool, no separate bill.',
  to: '/product/email-system',
  cta: 'Learn more',
};

export const SOLUTIONS = [
  { to: '/solutions/real-estate', label: 'For Real Estate', desc: 'Close more listings with instant lead follow-up.', icon: 'Home' },
  { to: '/solutions/sales-teams', label: 'For Sales Teams', desc: 'Pipeline velocity, coaching, and forecasting.', icon: 'TrendingUp' },
  { to: '/solutions/agencies', label: 'For Agencies', desc: 'Manage every client pipeline from one workspace.', icon: 'Building2' },
  { to: '/solutions/startups', label: 'For Startups', desc: 'Enterprise-grade CRM without the enterprise bill.', icon: 'Rocket' },
];

export const RESOURCES = [
  { to: '/blog', label: 'Blog', desc: 'Playbooks on leads, automation, and growth.', icon: 'BookOpen' },
  { to: '/resources/help-center', label: 'Help Center', desc: 'Guides, walkthroughs, and answers.', icon: 'LifeBuoy' },
  { to: '/security', label: 'Security', desc: 'How we keep your data safe.', icon: 'ShieldCheck' },
  { to: '/resources/api-docs', label: 'API Docs', desc: 'Build on top of Zomic.', icon: 'Code2' },
];

export const COMPANY = [
  { to: '/about', label: 'About', desc: 'Why we are building Zomic.', icon: 'Info' },
  { to: '/careers', label: 'Careers', desc: 'Open roles and our team.', icon: 'Briefcase' },
  { to: '/contact', label: 'Contact', desc: 'Talk to a human.', icon: 'Mail' },
  { to: '/blog', label: 'Blog', desc: 'News and ideas.', icon: 'Newspaper' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { to: '/product/lead-management', label: 'Lead Management' },
      { to: '/product/whatsapp-automation', label: 'WhatsApp Automation' },
      { to: '/product/email-system', label: 'Email System' },
      { to: '/product/analytics', label: 'Analytics' },
      { to: '/product/automations', label: 'Automations' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { to: '/solutions/real-estate', label: 'Real Estate' },
      { to: '/solutions/sales-teams', label: 'Sales Teams' },
      { to: '/solutions/agencies', label: 'Agencies' },
      { to: '/solutions/startups', label: 'Startups' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/careers', label: 'Careers' },
      { to: '/contact', label: 'Contact' },
      { to: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/blog', label: 'Blog' },
      { to: '/resources/help-center', label: 'Help Center' },
      { to: '/security', label: 'Security' },
      { to: '/resources/api-docs', label: 'API Docs' },
    ],
  },
];

export const LEGAL_LINKS = [
  { to: '/legal/privacy', label: 'Privacy Policy' },
  { to: '/legal/terms', label: 'Terms of Service' },
];

// Pricing tiers — referenced by homepage preview + /pricing.
export const PRICING = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    tagline: 'For a solo founder finding their first 100 customers.',
    cta: 'Start free',
    to: '/signup',
    features: [
      'Up to 500 leads',
      'WhatsApp & email — 1 number, 1 sender',
      'Pipeline with 5 stages',
      'Basic analytics',
      '1 user',
    ],
    highlight: false,
  },
  {
    name: 'Growth',
    price: 29,
    period: 'per user / month',
    tagline: 'For teams turning conversations into a repeatable engine.',
    cta: 'Start free trial',
    to: '/signup',
    features: [
      'Unlimited leads',
      'WhatsApp & email automation',
      'Facebook & Instagram lead ads',
      'Conversion Signal scoring',
      'Automation rules + Zapier',
      'Up to 10 users',
    ],
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Scale',
    price: 79,
    period: 'per user / month',
    tagline: 'For agencies and revenue teams running multiple pipelines.',
    cta: 'Book a demo',
    to: '/contact',
    features: [
      'Everything in Growth',
      'AI-powered insights',
      'Unlimited users & workspaces',
      'WordPress + custom webhooks',
      'Advanced reporting & exports',
      'Priority support + SLA',
    ],
    highlight: false,
  },
];
