// Flazyn — Contact page.
import { Mail, Clock, ShieldCheck } from 'lucide-react';
import { PageHero } from '../components/sections.jsx';
import { ContactForm } from '../components/Forms.jsx';
import { SITE } from '../lib/site.js';
import { Photo } from '../components/Photo.jsx';

export default function Contact() {
  return (
    <>
      <PageHero
        center
        eyebrow="Contact"
        title="Talk to the Flazyn team."
        lead="Questions about Flazyn, early access, partnerships or your data — send us a message and we’ll reply by email."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="split contact-split">
            <div className="form-card"><ContactForm /></div>
            <div style={{ display: 'grid', gap: 16 }}>
              <Photo src="/images/contact.webp" alt="A business owner on a phone call at her laptop" style={{ aspectRatio: '16 / 10' }} />
              <a href={`mailto:${SITE.email}`} className="trust-item" style={{ background: '#fff' }}>
                <span className="chip3d sm coral"><Mail size={17} /></span>
                <div><strong>Email us</strong><p>{SITE.email}</p></div>
              </a>
              <div className="trust-item" style={{ background: '#fff' }}>
                <span className="chip3d sm sky"><Clock size={17} /></span>
                <div><strong>Response time</strong><p>We read every message and reply as soon as we can, usually within two business days.</p></div>
              </div>
              <div className="trust-item" style={{ background: '#fff' }}>
                <span className="chip3d sm mint"><ShieldCheck size={17} /></span>
                <div><strong>Data requests</strong><p>To access or delete your data, choose “Privacy or data request” as the topic, or see our data deletion page.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
