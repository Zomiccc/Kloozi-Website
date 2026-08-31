// Zomic marketing — solution page: Agencies.
import { Building2, Layers, Repeat, Receipt } from 'lucide-react';
import SolutionPage from './SolutionPage.jsx';

export default function Agencies() {
  return (
    <SolutionPage
      eyebrow="Solutions · Agencies"
      title="Run every client pipeline from one calm workspace."
      lead="You are not selling one product — you are running lead engines for many clients at once. Zomic keeps each client isolated, each report white-labelled, and each invoice clean."
      mascotMood="wave"
      painPoints={{
        title: 'Agencies juggle clients, tools, and tabs until something drops.',
        lead: 'A different CRM per client, leads leaking between accounts, and reporting that takes a full day every month. It does not scale.',
        items: [
          { icon: <Building2 size={22} />, title: 'One CRM per client', body: 'You log into five different tools to manage five clients. Context-switching kills your team’s throughput.' },
          { icon: <Layers size={22} />, title: 'Leads bleed between clients', body: 'No clean separation. A lead for client A ends up in client B’s pipeline. Awkward conversations follow.' },
          { icon: <Repeat size={22} />, title: 'No reusable workflows', body: 'You rebuild the same WhatsApp sequence from scratch for every new client. Hours lost, every time.' },
          { icon: <Receipt size={22} />, title: 'Reporting is a full day', body: 'Monthly client reports mean exporting, formatting, and emailing — manually, for every account.' },
        ],
      }}
      featureRows={[
        {
          eyebrow: 'Client workspaces',
          title: 'Each client in their own isolated workspace.',
          body: 'Per-client pipelines, leads, WhatsApp numbers, and team members — all under one login. Switch clients in a click. Nothing leaks between accounts.',
          bullets: ['Unlimited client workspaces', 'Per-client WhatsApp numbers', 'Isolated leads & pipelines', 'One login, switch in a click'],
          flip: false,
          art: (
            <div className="mini-mock" style={{ maxWidth: 320 }}>
              {[
                { n: 'Northwind Realty', l: 124, bg: '#C9BBFF' },
                { n: 'Brightpath Co.', l: 86, bg: '#BFE3F5' },
                { n: 'Lumen Labs', l: 52, bg: '#A8E6C1' },
              ].map((c) => (
                <div key={c.n} className="hero-mock-row">
                  <span className="hero-mock-avatar" style={{ background: c.bg }}>{c.n[0]}</span>
                  <div className="flex-1"><div className="hero-mock-name">{c.n}</div><div className="hero-mock-meta">{c.l} leads this month</div></div>
                </div>
              ))}
            </div>
          ),
        },
        {
          eyebrow: 'Reusable templates',
          title: 'Build the sequence once. Roll it out to every new client.',
          body: 'Save your best-performing WhatsApp sequences, email campaigns, and pipelines as templates. Onboard a new client in minutes, not a week.',
          bullets: ['Save pipelines as templates', 'Reusable WhatsApp & email sequences', 'White-labelled client reports', 'Automated monthly report delivery'],
          flip: true,
          art: (
            <div className="mini-mock" style={{ maxWidth: 320 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 8 }}>Templates</div>
              {['Realty · instant reply + viewing', 'SaaS · 5-step nurture', 'Local biz · seasonal offer'].map((t, i) => (
                <div key={t} className="hero-mock-row">
                  <span className="hero-mock-avatar" style={{ background: ['#C9BBFF', '#BFE3F5', '#FFE9A8'][i], width: 28, height: 28, fontSize: 11 }}>★</span>
                  <div className="flex-1"><div className="hero-mock-name" style={{ fontSize: 13 }}>{t}</div></div>
                  <span className="badge">Use</span>
                </div>
              ))}
            </div>
          ),
        },
      ]}
      outcomes={{ title: 'Onboard a new client in minutes. Scale without adding chaos.' }}
      stat={[
        { value: '5×', label: 'faster client onboarding' },
        { value: '1 day → 0', label: 'monthly reporting effort' },
      ]}
      testimonial={{ quote: 'Finally a CRM my team actually opens. The WhatsApp automation alone replaced two tools we were paying for.', name: 'Marco Diaz', role: 'Founder, Brightpath Agency', initial: 'M', bg: '#BFE3F5' }}
    />
  );
}
