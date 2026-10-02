// Flazyn — About page.
import { Heart, Target, Sparkles, ShieldCheck } from 'lucide-react';
import { PageHero, HeroActions, SectionHead, FeatureGrid, CTA } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import { Photo } from '../components/Photo.jsx';
import { T, Blocks } from '../lib/content.jsx';

const VALUES = [
  { icon: Heart, hue: 'coral', title: 'Conversations over contacts', body: 'A contact is a row in a database. A conversation is a future customer. We build for the conversation.' },
  { icon: Target, title: 'Calm over chaos', body: 'Software should lower your stress, not add to it. Every screen should feel clear, even when the pipeline is busy.' },
  { icon: Sparkles, hue: 'sun', title: 'Speed is a feature', body: 'Fast pages, fast replies, fast setup. The first reply wins, so the tool should never slow you down.' },
  { icon: ShieldCheck, hue: 'mint', title: 'Trust by default', body: 'Customer data belongs to our customers. We collect what we need, protect it and delete it when asked.' },
];

export default function About() {
  return (
    <>
      <PageHero
        k="about.hero"
        eyebrow="About Flazyn"
        title="We’re building the CRM we wished existed."
        lead="Most CRMs are either a spreadsheet with extra steps or an enterprise project that needs a consultant. Flazyn is calm, fast and built around how small teams really sell: in conversations."
      >
        <HeroActions />
      </PageHero>

      <section style={{ paddingBottom: 24 }}>
        <div className="shell">
          <Reveal variant="fade"><Photo k="about.photo" src="/images/about-team.webp" alt="A small team working together on laptops around a table" style={{ aspectRatio: '21 / 9' }} /></Reveal>
        </div>
      </section>

      <Blocks k="about.top" />

      <section className="section">
        <div className="shell">
          <SectionHead k="about.story" eyebrow="Our story" title="Leads were never the problem. Follow-up was." />
          <Reveal stagger={0.08} className="prose">
            <RevealItem as="p"><T k="about.story.0">Talk to any small sales team and you hear the same story. The leads are there. The conversations are happening. But they are spread across WhatsApp, email, a spreadsheet and a few tools that don’t talk to each other.</T></RevealItem>
            <RevealItem as="p"><T k="about.story.1">Deals slip not because the product is wrong, but because the first reply was slow and the follow-up was forgotten.</T></RevealItem>
            <RevealItem as="p"><T k="about.story.2">Flazyn brings it together: one workspace that captures every lead, lets your team reply quickly on WhatsApp and email, and makes the next step obvious. We are building it in the open with a small group of early-access teams — if that sounds like you, we would love to hear from you.</T></RevealItem>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell">
          <SectionHead k="about.values" eyebrow="What we believe" title="The principles behind every screen." />
          <FeatureGrid k="about.values.items" items={VALUES} cols={2} />
        </div>
      </section>

      <Blocks k="about.bottom" />

      <CTA />
    </>
  );
}
