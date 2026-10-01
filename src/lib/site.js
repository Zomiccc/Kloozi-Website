// Flazyn marketing — site-wide facts. Change business details HERE only;
// every page, the legal pages, structured data and the footer read from it.

export const SITE = {
  name: 'Flazyn',
  // Registered business (Australia). Shown in the footer, legal pages and
  // structured data — keep in sync with the ABN register.
  legalName: 'HB&YM Pty Ltd',
  abn: '27 688 842 140',
  address: { street: '87 Eccles Cct', locality: 'Macgregor', region: 'ACT', postcode: '2615', country: 'Australia', countryCode: 'AU' },
  domain: 'flazyn.com',
  url: 'https://flazyn.com',
  email: 'hello@flazyn.com',
  tagline: 'The CRM that turns conversations into customers.',
  description:
    'Flazyn is a CRM for teams that sell through conversations. Capture leads, reply on WhatsApp and email, and move every deal forward from one workspace. Now in early access.',
  status: 'Early access',
};

export const addressLine = () => `${SITE.address.street}, ${SITE.address.locality} ${SITE.address.region} ${SITE.address.postcode}, ${SITE.address.country}`;

export const PRODUCT_LINKS = [
  { to: '/product/lead-management', label: 'Lead Management', desc: 'One pipeline for every lead, from every source.', icon: 'Users' },
  { to: '/product/whatsapp-automation', label: 'WhatsApp Inbox', desc: 'Official WhatsApp Business Platform messaging.', icon: 'MessageCircle' },
  { to: '/product/email-system', label: 'Email Campaigns', desc: 'Broadcasts and follow-ups built into your CRM.', icon: 'Mail' },
  { to: '/product/automations', label: 'Automations', desc: 'Lead capture and follow-up rules, no code.', icon: 'Workflow' },
  { to: '/product/analytics', label: 'Analytics', desc: 'See what moves deals forward.', icon: 'BarChart3' },
];

export const SOLUTION_LINKS = [
  { to: '/solutions/real-estate', label: 'Real Estate', desc: 'Reply to property enquiries first.', icon: 'Home' },
  { to: '/solutions/sales-teams', label: 'Sales Teams', desc: 'A shared pipeline the whole team trusts.', icon: 'TrendingUp' },
  { to: '/solutions/agencies', label: 'Agencies', desc: 'Every client pipeline in one place.', icon: 'Building2' },
  { to: '/solutions/startups', label: 'Startups', desc: 'A real CRM from your first customer.', icon: 'Rocket' },
];

export const COMPANY_LINKS = [
  { to: '/about', label: 'About', desc: 'Why we are building Flazyn.', icon: 'Info' },
  { to: '/blog', label: 'Blog', desc: 'Playbooks for conversational selling.', icon: 'BookOpen' },
  { to: '/security', label: 'Trust & Security', desc: 'How we treat your data.', icon: 'ShieldCheck' },
  { to: '/contact', label: 'Contact', desc: 'Talk to the team.', icon: 'Mail' },
];

export const FOOTER_COLUMNS = [
  { title: 'Product', links: PRODUCT_LINKS.map(({ to, label }) => ({ to, label })) },
  { title: 'Solutions', links: SOLUTION_LINKS.map(({ to, label }) => ({ to, label })) },
  { title: 'Company', links: [...COMPANY_LINKS.map(({ to, label }) => ({ to, label })), { to: '/early-access', label: 'Early access' }] },
  {
    title: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/data-deletion', label: 'Data Deletion' },
    ],
  },
];
