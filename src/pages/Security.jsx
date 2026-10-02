// Flazyn — Trust & Security. States principles and practices only;
// no certifications are claimed.
import { Lock, KeyRound, Database, Trash2, EyeOff, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero, SectionHead, FeatureGrid, CTA } from '../components/sections.jsx';
import { SITE } from '../lib/site.js';
import { Blocks } from '../lib/content.jsx';

const PRACTICES = [
  { icon: Lock, title: 'Encryption in transit', body: 'All traffic to Flazyn is served over HTTPS/TLS.' },
  { icon: KeyRound, hue: 'sun', title: 'Access control', body: 'Role-based permissions inside each workspace, and access to production systems limited to the people who need it.' },
  { icon: Database, hue: 'sky', title: 'Data minimisation', body: 'We collect only the data needed to run the service, and never sell personal data.' },
  { icon: MessageCircle, hue: 'mint', title: 'WhatsApp data', body: 'Messages exchanged through the WhatsApp Business Platform are used only to provide the service to the business that owns the conversation.' },
  { icon: EyeOff, hue: 'orchid', title: 'No advertising use', body: 'Customer data and conversations are never used for advertising.' },
  { icon: Trash2, hue: 'coral', title: 'Deletion on request', body: 'You can ask us to delete your data at any time.' },
];

export default function Security() {
  return (
    <>
      <PageHero
        k="security.hero"
        center
        eyebrow="Trust & Security"
        title="Your customers’ trust is our product."
        lead="Flazyn handles your leads and conversations, so protecting that data is part of the job — not an afterthought."
      />
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="shell">
          <FeatureGrid k="security.items" items={PRACTICES} />
        </div>
      </section>
      <section className="section section-alt">
        <div className="shell">
          <SectionHead
            k="security.cta"
            eyebrow="Questions?"
            title="Talk to us about security."
            lead={<>Email <a href={`mailto:${SITE.email}`} className="link-arrow">{SITE.email}</a> or read our <Link to="/privacy" className="link-arrow">Privacy Policy</Link> and <Link to="/data-deletion" className="link-arrow">data deletion instructions</Link>.</>}
          />
        </div>
      </section>
      <Blocks k="security.bottom" />
      <CTA />
    </>
  );
}
