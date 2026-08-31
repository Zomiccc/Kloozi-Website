// Zomic marketing — Contact page (real form, posts nowhere but validates).
import { useState } from 'react';
import { Mail, Phone, MapPin, Check, ArrowRight } from 'lucide-react';
import { PageHero, SectionHeading } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import Mascot from '../components/Mascot.jsx';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', teamSize: '1-5', message: '' });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    // No backend on the marketing site yet — confirm visually and reset.
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a human."
        lead="Whether you want a demo, a quote, or just to ask a question — we read every message and reply within one business day."
        mascotMood="wave"
      />

      <section className="section">
        <div className="shell">
          <div className="grid gap-12" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
            {/* form */}
            <Reveal stagger={0.08} className="card p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="flex justify-center mb-4"><Mascot size={96} mood="celebrate" /></div>
                  <h3 className="t-section">Got it — thank you!</h3>
                  <p className="t-body mt-3">We will reply to <b style={{ color: 'var(--ink)' }}>{form.email || 'your inbox'}</b> within one business day.</p>
                  <button className="btn btn-secondary mt-6" onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', teamSize: '1-5', message: '' }); }}>Send another</button>
                </div>
              ) : (
                <form onSubmit={submit} className="form">
                  <RevealItem><h3 className="t-h2">Send us a message</h3></RevealItem>
                  <RevealItem>
                    <div className="form-row">
                      <div>
                        <label className="field-label">Full name</label>
                        <input className="input" required value={form.name} onChange={update('name')} placeholder="Aisha Khan" />
                      </div>
                      <div>
                        <label className="field-label">Work email</label>
                        <input className="input" type="email" required value={form.email} onChange={update('email')} placeholder="you@company.com" />
                      </div>
                    </div>
                  </RevealItem>
                  <RevealItem>
                    <div className="form-row">
                      <div>
                        <label className="field-label">Company</label>
                        <input className="input" value={form.company} onChange={update('company')} placeholder="Northwind Realty" />
                      </div>
                      <div>
                        <label className="field-label">Team size</label>
                        <select className="input" value={form.teamSize} onChange={update('teamSize')}>
                          <option>1-5</option><option>6-20</option><option>21-50</option><option>51-200</option><option>200+</option>
                        </select>
                      </div>
                    </div>
                  </RevealItem>
                  <RevealItem>
                    <div>
                      <label className="field-label">How can we help?</label>
                      <textarea className="input" required value={form.message} onChange={update('message')} placeholder="Tell us a bit about your team and what you are looking for…" />
                    </div>
                  </RevealItem>
                  <RevealItem>
                    <button type="submit" className="btn btn-accent btn-lg">Send message <ArrowRight size={18} /></button>
                  </RevealItem>
                </form>
              )}
            </Reveal>

            {/* contact details */}
            <Reveal stagger={0.1} className="flex flex-col gap-4">
              <RevealItem><div className="card p-6 flex items-center gap-4"><span className="hero-mock-avatar" style={{ background: 'var(--accent)' }}><Mail size={18} /></span><div><div className="hero-mock-name">Email</div><div className="hero-mock-meta">hello@zomic.com</div></div></div></RevealItem>
              <RevealItem><div className="card p-6 flex items-center gap-4"><span className="hero-mock-avatar" style={{ background: 'var(--sky)' }}><Phone size={18} /></span><div><div className="hero-mock-name">Phone</div><div className="hero-mock-meta">+1 (555) 014-2026</div></div></div></RevealItem>
              <RevealItem><div className="card p-6 flex items-center gap-4"><span className="hero-mock-avatar" style={{ background: 'var(--mint)' }}><MapPin size={18} /></span><div><div className="hero-mock-name">Where we are</div><div className="hero-mock-meta">Remote-first · team across 9 time zones</div></div></div></RevealItem>
              <RevealItem>
                <div className="card p-6" style={{ background: 'var(--canvas-alt)' }}>
                  <div className="flex items-center gap-2 mb-2"><Check size={16} style={{ color: 'var(--mint-deep)' }} /><span style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>What happens next</span></div>
                  <ol className="t-body" style={{ paddingLeft: 18, margin: 0 }}>
                    <li>We read your message within one business day.</li>
                    <li>If it is a demo request, we propose two times that suit you.</li>
                    <li>No pushy sales sequence — promise.</li>
                  </ol>
                </div>
              </RevealItem>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--canvas-alt)', paddingTop: 0 }}>
        <div className="shell">
          <SectionHeading eyebrow="Anything else" title="Prefer to start on your own?" />
          <Reveal variant="fade" className="text-center mt-6">
            <a href="/signup" className="btn btn-accent btn-lg">Start free trial <ArrowRight size={18} /></a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
