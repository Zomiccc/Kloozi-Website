// Flazyn — Contact page.
import { Mail, Clock, ShieldCheck } from 'lucide-react';
import { PageHero } from '../components/sections.jsx';
import { ContactForm } from '../components/Forms.jsx';
import { SITE } from '../lib/site.js';
import { Photo } from '../components/Photo.jsx';
import { T, useSettings } from '../lib/content.jsx';

export default function Contact() {
  const { email } = useSettings();
  return (
    <>
      <PageHero
        k="contact.hero"
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
              <Photo k="contact.photo" src="/images/contact.webp" alt="A business owner on a phone call at her laptop" style={{ aspectRatio: '16 / 10' }} />
              <a href={`mailto:${email}`} className="trust-item" style={{ background: '#fff' }}>
                <span className="chip3d sm coral"><Mail size={17} /></span>
                <div><strong><T k="contact.email.title">Email us</T></strong><p>{email}</p></div>
              </a>
              <div className="trust-item" style={{ background: '#fff' }}>
                <span className="chip3d sm sky"><Clock size={17} /></span>
                <div><strong><T k="contact.response.title">Response time</T></strong><p><T k="contact.response.body">We read every message and reply as soon as we can, usually within two business days.</T></p></div>
              </div>
              <div className="trust-item" style={{ background: '#fff' }}>
                <span className="chip3d sm mint"><ShieldCheck size={17} /></span>
                <div><strong><T k="contact.data.title">Data requests</T></strong><p><T k="contact.data.body">To access or delete your data, choose “Privacy or data request” as the topic, or see our data deletion page.</T></p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
