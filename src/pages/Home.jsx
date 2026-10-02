// Flazyn — homepage.
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, MessageCircle, Mail, Globe, Megaphone, FileSpreadsheet,
  Users, Workflow, BarChart3, UsersRound, Inbox, Clock, FileCheck2, BellOff, UserPlus, Zap,
} from 'lucide-react';
import ProductDemo from '../components/ProductDemo.jsx';
import { PhotoStage, Photo, BubbleCard, StatCard } from '../components/Photo.jsx';
import { SectionHead, FAQ, CTA } from '../components/sections.jsx';
import { Reveal, RevealItem, ScrollTilt } from '../lib/motion.jsx';
import { T, Blocks } from '../lib/content.jsx';

const CHANNELS = [
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: Mail, label: 'Email' },
  { icon: Globe, label: 'Website forms' },
  { icon: Megaphone, label: 'Facebook & Instagram Lead Ads' },
  { icon: FileSpreadsheet, label: 'CSV import' },
];

export const HOME_FAQ = [
  { q: 'What is Flazyn?', a: 'Flazyn is a CRM for teams that sell through conversations. It brings your leads, WhatsApp chats and email into one workspace with a visual pipeline, so every lead gets a fast reply and a clear next step.' },
  { q: 'Is Flazyn available today?', a: 'Flazyn is in early access. Join the list and we will invite teams in small groups as features roll out, so we can onboard everyone properly.' },
  { q: 'How does Flazyn work with WhatsApp?', a: 'Flazyn is built for the official WhatsApp Business Platform from Meta. Your team replies to customers from a shared inbox, uses approved message templates, and only messages people who have opted in.' },
  { q: 'Who is Flazyn for?', a: 'Small and growing teams that get leads from WhatsApp, forms, ads and email — real estate agents, agencies, sales teams and startups in particular.' },
  { q: 'How is my data protected?', a: 'Data is encrypted in transit, access is limited to people who need it, and you can request deletion of your data at any time. See our Trust & Security page and Privacy Policy for details.' },
];

const AUDIENCES = [
  { to: '/solutions/real-estate', img: '/images/real-estate.webp', alt: 'An agent showing a home to a young couple', title: 'Real estate', body: 'Answer property enquiries first and track every buyer by listing.' },
  { to: '/solutions/sales-teams', img: '/images/sales-team.webp', alt: 'A sales team gathered around a laptop', title: 'Sales teams', body: 'One shared pipeline, fair lead assignment and clear next steps.' },
  { to: '/solutions/agencies', img: '/images/agency.webp', alt: 'An agency team meeting in a bright office', title: 'Agencies', body: 'A separate pipeline for every client, in one workspace.' },
  { to: '/solutions/startups', img: '/images/startup.webp', alt: 'Three founders laughing while working on a laptop', title: 'Startups', body: 'Move out of the spreadsheet in an afternoon.' },
];

const WA_RULES = [
  { icon: Check, title: 'Opt-in first', body: 'Every contact carries their consent status, so your team only messages people who agreed.' },
  { icon: Clock, title: 'Knows the 24-hour window', body: 'See when a conversation window is open, and switch to approved templates when it closes.' },
  { icon: FileCheck2, title: 'Approved templates', body: 'Start conversations with Meta-approved templates, managed in one place.' },
  { icon: BellOff, title: 'Opt-out, respected', body: 'Opt-out requests are honoured immediately and recorded on the contact.' },
];

const STEPS = [
  { n: '01', title: 'Capture every lead', body: 'WhatsApp messages, form submissions, ad leads and emails arrive in one list, tagged by source. No copy-pasting between apps.' },
  { n: '02', title: 'Reply while it matters', body: 'Your team answers from a shared inbox. Automations send the first message and remind you about the next one.' },
  { n: '03', title: 'Move the deal forward', body: 'Clear stages, owners and next steps for every lead, and reports that show what is actually working.' },
];

function Bento() {
  return (
    <Reveal stagger={0.06} className="bento">
      <RevealItem className="xl">
        <div className="feature-card">
          <span className="chip3d"><Users size={20} /></span>
          <h3><T k="home.bento.0.title">A pipeline you can read at a glance</T></h3>
          <p><T k="home.bento.0.body">Every lead from every channel on one board. Drag deals between stages, assign owners and see who is following up.</T></p>
          <div className="bento-visual">
            {[['Aisha Khan', 'New', 'badge-sky', '#3b9bff'], ['Marco Diaz', 'Qualified', '', '#5b3ff0'], ['Priya Shah', 'Won', 'badge-mint', '#16c79a']].map(([n, s, b, bg]) => (
              <div key={n} className="mini-row"><span className="avatar" style={{ width: 26, height: 26, fontSize: 10, background: bg }}>{n.split(' ').map((p) => p[0]).join('')}</span>{n}<span className={`badge ${b}`}>{s}</span></div>
            ))}
          </div>
        </div>
      </RevealItem>
      <RevealItem>
        <div className="feature-card">
          <span className="chip3d mint"><Inbox size={20} /></span>
          <h3><T k="home.bento.1.title">Shared WhatsApp inbox</T></h3>
          <p><T k="home.bento.1.body">The whole team answers from one business number, with every chat linked to the right lead.</T></p>
        </div>
      </RevealItem>
      <RevealItem className="wide">
        <div className="feature-card">
          <span className="chip3d orchid"><Workflow size={20} /></span>
          <h3><T k="home.bento.2.title">Follow-up that runs itself</T></h3>
          <p><T k="home.bento.2.body">Route new leads, send a helpful first reply and create reminders — without writing a single rule from scratch.</T></p>
          <div className="bento-visual mini-flow">
            <div className="mini-flow-step"><Globe size={15} color="#3b9bff" />New form lead</div>
            <div className="mini-flow-line" />
            <div className="mini-flow-step"><MessageCircle size={15} color="#16c79a" />Send “Welcome” template</div>
            <div className="mini-flow-line" />
            <div className="mini-flow-step"><UsersRound size={15} color="#ffa51f" />Assign to next rep</div>
          </div>
        </div>
      </RevealItem>
      <RevealItem className="wide">
        <div className="feature-card">
          <span className="chip3d sky"><BarChart3 size={20} /></span>
          <h3><T k="home.bento.3.title">Reports that point to the next move</T></h3>
          <p><T k="home.bento.3.body">Response times, conversion by source and pipeline health — without building a spreadsheet.</T></p>
          <div className="bento-visual"><div className="mini-bars">{[38, 52, 45, 66, 58, 74, 70, 88, 96].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div></div>
        </div>
      </RevealItem>
      <RevealItem className="wide">
        <div className="feature-card">
          <span className="chip3d coral"><Mail size={20} /></span>
          <h3><T k="home.bento.4.title">Email, built in</T></h3>
          <p><T k="home.bento.4.body">Send campaigns to segments pulled straight from your pipeline. No exports, no second tool.</T></p>
        </div>
      </RevealItem>
      <RevealItem className="wide">
        <div className="feature-card">
          <span className="chip3d sun"><UsersRound size={20} /></span>
          <h3><T k="home.bento.5.title">Made for teams</T></h3>
          <p><T k="home.bento.5.body">Roles, fair lead assignment and shared views keep everyone working from the same picture.</T></p>
        </div>
      </RevealItem>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" data-scene="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <Link to="/early-access" className="pill"><span className="pill-tag"><T k="home.pill.tag">Early access</T></span> <T k="home.pill.text">Now inviting the first teams</T> <ArrowRight size={14} /></Link>
              <h1 className="display"><T k="home.hero.title">Turn conversations into</T> <span className="accent-text"><T k="home.hero.accent">customers.</T></span></h1>
              <p className="lead"><T k="home.hero.lead">Flazyn is the CRM for teams that sell on WhatsApp, email and the web. Capture every lead, reply in minutes and keep every deal moving — from one workspace.</T></p>
              <div className="actions">
                <Link to="/early-access" className="btn btn-primary btn-lg"><T k="cta.button.primary">Get early access</T> <ArrowRight size={18} /></Link>
                <a href="#product" className="btn btn-secondary btn-lg"><T k="home.hero.secondary">See how it works</T></a>
              </div>
              <div className="hero-note">
                <span><Check size={16} /> <T k="home.hero.note1">No credit card</T></span>
                <span><Check size={16} /> <T k="home.hero.note2">Built for the WhatsApp Business Platform</T></span>
              </div>
            </div>
            <div className="scene-slot" aria-hidden="true">
              <div className="scene-legend">
                <span><i style={{ background: '#3b9bff' }} />New</span>
                <span><i style={{ background: '#7a5cff' }} />Contacted</span>
                <span><i style={{ background: '#b04bff' }} />Qualified</span>
                <span><i style={{ background: '#16c79a' }} />Won</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHANNELS ── */}
      <section style={{ padding: '8px 0 40px' }}>
        <div className="shell">
          <div className="works-with">
            <span className="label"><T k="home.channels.label">Brings together</T></span>
            {CHANNELS.map(({ icon: Icon, label }) => <span key={label}><Icon size={17} /> {label}</span>)}
          </div>
        </div>
      </section>

      {/* ── PRODUCT DEMO ── */}
      <section className="section-tight" id="product">
        <div className="shell">
          <SectionHead k="home.demo" eyebrow="See it in action" title="Follow one lead from first message to closed deal." lead="Click through the steps below — this is the workflow Flazyn is built around." />
          <div className="demo-stage">
            <ScrollTilt><ProductDemo /></ScrollTilt>
          </div>
        </div>
      </section>

      <Blocks k="home.top" />

      {/* ── WHO IT'S FOR ── */}
      <section className="section">
        <div className="shell">
          <SectionHead k="home.audience" left eyebrow="Who it’s for" title="For teams whose best leads start with a message." />
          <Reveal stagger={0.07} className="audience">
            {AUDIENCES.map((a, i) => (
              <RevealItem key={a.to}>
                <Link to={a.to} className="audience-card">
                  <Photo k={`home.audience.${i}.photo`} src={a.img} alt={a.alt} />
                  <div className="txt">
                    <h3><T k={`home.audience.${i}.title`}>{a.title}</T></h3>
                    <p><T k={`home.audience.${i}.body`}>{a.body}</T></p>
                    <span className="link-arrow">Learn more <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section section-alt" id="features">
        <div className="shell">
          <SectionHead k="home.features" left eyebrow="The workspace" title="Everything a small sales team needs. Nothing it doesn’t." lead="Flazyn replaces the spreadsheet, the scattered chats and the separate email tool." />
          <Bento />
        </div>
      </section>

      {/* ── WHATSAPP DONE RIGHT ── */}
      <section className="section">
        <div className="shell">
          <div className="split">
            <Reveal variant="left">
              <PhotoStage k="home.wa.photo" src="/images/phone-smile.webp" alt="A customer smiling while messaging a business on her phone">
                <BubbleCard className="bl" who="WhatsApp · Sara" text="Hi! Is the 2-bed on Park Avenue still available?" reply="Yes it is! Would 4pm tomorrow work for a viewing?" />
                <StatCard className="tr" icon={UserPlus} hue="mint" title="New lead created" sub="Assigned to Sarah" />
              </PhotoStage>
            </Reveal>
            <Reveal className="split-copy">
              <p className="eyebrow"><T k="home.wa.eyebrow">WhatsApp, done properly</T></p>
              <h2 className="h2"><T k="home.wa.title">Fast replies that respect your customers.</T></h2>
              <p className="body"><T k="home.wa.body">Flazyn is designed around the WhatsApp Business Platform’s rules, so your team can move quickly without risking your number or your reputation.</T></p>
              <ul className="plain-list">
                {WA_RULES.map(({ icon: Icon, title, body }, i) => (
                  <li key={title}><Icon size={18} /><div><strong><T k={`home.wa.rules.${i}.title`}>{title}</T></strong><p><T k={`home.wa.rules.${i}.body`}>{body}</T></p></div></li>
                ))}
              </ul>
              <div style={{ marginTop: 24 }}><Link to="/product/whatsapp-automation" className="link-arrow"><T k="home.wa.link">WhatsApp in Flazyn</T> <ArrowRight size={16} /></Link></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section section-alt">
        <div className="shell">
          <SectionHead k="home.steps" left eyebrow="How it works" title="Three steps, every lead." />
          <Reveal stagger={0.08} className="steps">
            {STEPS.map((s, i) => (
              <RevealItem key={s.n}>
                <div className="step">
                  <span className="step-num">{s.n}</span>
                  <h3><T k={`home.steps.${i}.title`}>{s.title}</T></h3>
                  <p><T k={`home.steps.${i}.body`}>{s.body}</T></p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── SMALL BUSINESS ── */}
      <section className="section">
        <div className="shell">
          <div className="split flip">
            <Reveal variant="right">
              <PhotoStage k="home.smb.photo" src="/images/cafe-owner.webp" alt="A small business owner standing in her café">
                <StatCard className="bl" icon={Megaphone} hue="orchid" title="Instagram Lead Ad" sub="New enquiry · just now" />
                <StatCard className="br" icon={Zap} hue="sun" title="Follow-up scheduled" sub="Tomorrow, 10:00" />
              </PhotoStage>
            </Reveal>
            <Reveal className="split-copy">
              <p className="eyebrow"><T k="home.smb.eyebrow">Built for small teams</T></p>
              <h2 className="h2"><T k="home.smb.title">You run the business. Flazyn keeps track of the conversations.</T></h2>
              <p className="body"><T k="home.smb.body">When you are serving customers, on a viewing or in a meeting, leads keep arriving. Flazyn catches each one, sends a first reply and reminds you to follow up — so nothing waits until it’s too late.</T></p>
              <div className="actions" style={{ marginTop: 28 }}>
                <Link to="/early-access" className="btn btn-primary"><T k="cta.button.primary">Get early access</T> <ArrowRight size={16} /></Link>
                <Link to="/product/lead-management" className="btn btn-secondary"><T k="home.smb.secondary">Explore the product</T></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section-alt">
        <div className="shell">
          <div className="faq-split">
            <div>
              <p className="eyebrow"><T k="home.faqHead.eyebrow">Questions</T></p>
              <h2 className="h2" style={{ marginTop: 12 }}><T k="home.faqHead.title">Good to know.</T></h2>
              <p className="body" style={{ marginTop: 14 }}><T k="home.faqHead.lead">Can’t find what you’re looking for?</T> <Link to="/contact" className="link-arrow" style={{ display: 'inline-flex' }}><T k="cta.button.talk">Talk to us</T> <ArrowRight size={14} /></Link></p>
            </div>
            <FAQ k="home.faq" items={HOME_FAQ} />
          </div>
        </div>
      </section>

      <Blocks k="home.bottom" />

      <CTA />
    </>
  );
}
