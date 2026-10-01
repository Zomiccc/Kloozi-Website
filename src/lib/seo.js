// Flazyn marketing — per-route SEO metadata. Single source for:
//   • the build-time prerenderer (scripts/prerender.mjs)
//   • sitemap.xml
//   • <title>/<meta> updates during client-side navigation (Layout.jsx)
import { SITE } from './site.js';
import { POSTS } from './posts.js';

const PAGES = [
  { path: '/', title: 'Flazyn — The CRM that turns conversations into customers', description: 'Capture leads, reply on WhatsApp and email, and move every deal forward from one workspace. Flazyn is the conversational CRM for growing teams. Join early access.', priority: 1.0 },
  { path: '/product/lead-management', title: 'Lead Management CRM — one pipeline for every lead | Flazyn', description: 'Capture leads from forms, ads and messages into one visual pipeline. Assign owners, track every conversation and never lose a follow-up with Flazyn.', priority: 0.9 },
  { path: '/product/whatsapp-automation', title: 'WhatsApp CRM & Business Inbox | Flazyn', description: 'Manage WhatsApp Business conversations as a team, reply fast with approved templates and quick replies, and keep every chat linked to the lead in your CRM.', priority: 0.9 },
  { path: '/product/email-system', title: 'Email Campaigns inside your CRM | Flazyn', description: 'Send email broadcasts and follow-ups to segments built from your live pipeline. No exports, no separate email tool.', priority: 0.8 },
  { path: '/product/automations', title: 'CRM Automation — lead capture & follow-up rules | Flazyn', description: 'Route new leads, send first replies and create follow-up tasks automatically. Connect Facebook & Instagram lead ads, website forms and webhooks.', priority: 0.8 },
  { path: '/product/analytics', title: 'Sales Analytics & Pipeline Reports | Flazyn', description: 'See response times, conversion by source and pipeline health at a glance, so your team knows where to focus next.', priority: 0.8 },
  { path: '/solutions/real-estate', title: 'Real Estate CRM with WhatsApp | Flazyn', description: 'Reply to property enquiries first, track every buyer and listing, and follow up automatically. A WhatsApp-first CRM for agents and agencies.', priority: 0.8 },
  { path: '/solutions/sales-teams', title: 'CRM for Sales Teams | Flazyn', description: 'A shared pipeline, fair lead assignment and clear next steps for every rep. Flazyn helps sales teams close conversations faster.', priority: 0.7 },
  { path: '/solutions/agencies', title: 'CRM for Agencies | Flazyn', description: 'Run a separate pipeline for every client from one workspace, with shared inboxes and clean reporting.', priority: 0.7 },
  { path: '/solutions/startups', title: 'CRM for Startups | Flazyn', description: 'A simple, fast CRM you can set up in an afternoon. Capture leads, talk to customers on WhatsApp and email, and grow with a real pipeline.', priority: 0.7 },
  { path: '/about', title: 'About Flazyn — why we are building a conversational CRM', description: 'Flazyn is building a calm, fast CRM for teams that sell through conversations on WhatsApp, email and the web.', priority: 0.6 },
  { path: '/security', title: 'Trust & Security | Flazyn', description: 'How Flazyn protects customer data: encryption, access control, data minimisation and your right to deletion.', priority: 0.5 },
  { path: '/contact', title: 'Contact Flazyn', description: 'Questions, partnerships or early-access requests — send the Flazyn team a message and we will reply by email.', priority: 0.6 },
  { path: '/early-access', title: 'Get early access to Flazyn', description: 'Join the Flazyn early-access list and be among the first teams to use the conversational CRM for WhatsApp, email and lead management.', priority: 0.9 },
  { path: '/blog', title: 'Flazyn Blog — playbooks for conversational selling', description: 'Practical guides on lead response, WhatsApp Business, pipelines and CRM adoption from the Flazyn team.', priority: 0.6 },
  { path: '/privacy', title: 'Privacy Policy | Flazyn', description: 'How Flazyn (HB&YM Pty Ltd) collects, uses, shares and protects personal information, including lead data from Meta, LinkedIn and TikTok, under the Australian Privacy Principles.', priority: 0.3 },
  { path: '/terms', title: 'Terms of Service | Flazyn', description: 'The terms that govern use of flazyn.com and the Flazyn early-access CRM service, provided by HB&YM Pty Ltd.', priority: 0.3 },
  { path: '/data-deletion', title: 'Data Deletion Instructions | Flazyn', description: 'How to delete your data from Flazyn — leads, connected platforms such as Facebook, or your whole account — and how to request deletion by email.', priority: 0.3 },
];

const BLOG = POSTS.map((p) => ({
  path: `/blog/${p.slug}`,
  title: `${p.title} | Flazyn Blog`,
  description: p.description,
  priority: 0.5,
  type: 'article',
  date: p.date,
}));

export const ROUTES = [...PAGES, ...BLOG];

export const NOT_FOUND = {
  path: '/404',
  title: 'Page not found | Flazyn',
  description: 'This page could not be found.',
  noindex: true,
};

export function metaFor(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return ROUTES.find((r) => r.path === clean) || NOT_FOUND;
}

export const canonical = (path) => `${SITE.url}${path === '/' ? '' : path}`;
