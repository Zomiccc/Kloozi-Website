// Zomic marketing — API Docs (real, simple landing for the docs).
import { Link } from 'react-router-dom';
import { Code2, KeyRound, Webhook, BookOpen, ArrowRight, Terminal } from 'lucide-react';
import { PageHero, SectionHeading, CTASection } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';

const ENDPOINTS = [
  { method: 'GET', path: '/v1/leads', desc: 'List leads with filtering and pagination.' },
  { method: 'POST', path: '/v1/leads', desc: 'Create a lead. Triggers automations like any other source.' },
  { method: 'GET', path: '/v1/leads/:id', desc: 'Fetch a single lead with full activity timeline.' },
  { method: 'PATCH', path: '/v1/leads/:id', desc: 'Update stage, owner, custom fields, or score.' },
  { method: 'POST', path: '/v1/whatsapp/messages', desc: 'Send a WhatsApp message (template or free-form within the 24h window).' },
  { method: 'POST', path: '/v1/emails/campaigns', desc: 'Create and send an email campaign to a segment.' },
  { method: 'GET', path: '/v1/analytics/signal', desc: 'Fetch Conversion Signal scores for a set of leads.' },
  { method: 'POST', path: '/v1/webhooks', desc: 'Register a webhook for lead, message, or stage events.' },
];

export default function ApiDocs() {
  return (
    <>
      <PageHero
        eyebrow="Resources · API Docs"
        title="Build on top of Zomic."
        lead="A REST API and webhooks for everything inside Zomic — leads, WhatsApp, email campaigns, and Conversion Signal. Push data in, pull data out, react to events in real time."
        mascotMood="wave"
      >
        <div className="flex gap-3 flex-wrap">
          <Link to="/signup" className="btn btn-accent btn-lg">Get an API key <ArrowRight size={18} /></Link>
          <a href="#endpoints" className="btn btn-secondary btn-lg">See endpoints</a>
        </div>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Capabilities" title="What you can do with the API" />
          <Reveal stagger={0.08} className="card-grid card-grid-2 mt-12">
            {[
              { icon: Code2, title: 'REST API', body: 'A clean, predictable REST API with JSON responses, consistent error formats, and pagination on every list endpoint.' },
              { icon: KeyRound, title: 'API keys & scopes', body: 'Per-workspace keys with scoped permissions. Rotate or revoke anytime. Full audit log of every call.' },
              { icon: Webhook, title: 'Webhooks', body: 'Subscribe to lead.created, lead.stage_changed, message.received, and 20+ other events. Signed payloads, automatic retries.' },
              { icon: BookOpen, title: 'SDKs', body: 'Official SDKs for JavaScript, Python, and PHP. Community SDKs for Ruby and Go.' },
            ].map((c) => (
              <RevealItem key={c.title}>
                <div className="feature-card card-hover">
                  <span className="feature-card-ico"><c.icon size={22} /></span>
                  <div className="feature-card-title">{c.title}</div>
                  <div className="feature-card-body">{c.body}</div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="endpoints" className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <SectionHeading eyebrow="Endpoints" title="A sample of what is available" />
          <Reveal stagger={0.05} className="mt-10 max-w-3xl mx-auto flex flex-col gap-3">
            {ENDPOINTS.map((e) => (
              <RevealItem key={e.method + e.path}>
                <div className="card row-card" style={{ fontFamily: 'var(--font-mono, "IBM Plex Mono")' }}>
                  <span className="badge" style={{ background: e.method === 'GET' ? 'var(--sky)' : e.method === 'POST' ? 'var(--mint)' : 'var(--butter)', color: 'var(--ink)', fontFamily: 'inherit', minWidth: 56, justifyContent: 'center' }}>{e.method}</span>
                  <code style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{e.path}</code>
                  <span className="hero-mock-meta ml-auto" style={{ fontFamily: 'inherit' }}>{e.desc}</span>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal variant="image" className="mt-12 max-w-3xl mx-auto">
            <div className="card p-6" style={{ background: 'var(--ink)', color: '#E4DFF7' }}>
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={18} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#B3AAD1' }}>Example · create a lead</span>
              </div>
              <pre style={{ fontSize: 13, lineHeight: 1.7, fontFamily: '"IBM Plex Mono", monospace', margin: 0, overflowX: 'auto' }}>
{`curl -X POST https://api.zomic.com/v1/leads \\
  -H "Authorization: Bearer $ZOMIC_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Aisha Khan",
    "email": "aisha@northwind.com",
    "phone": "+15550142026",
    "source": "website_form",
    "custom_fields": { "listing": "Elm St 3-bed" }
  }'`}
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title="Ready to build?" primary={{ label: 'Get an API key', to: '/signup' }} secondary={{ label: 'Read full docs', to: '/contact' }} />
    </>
  );
}
