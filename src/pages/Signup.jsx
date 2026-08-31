// Zomic marketing — Signup page (real form, posts nowhere but validates).
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import { PRICING } from '../lib/content.js';
import Mascot from '../components/Mascot.jsx';

export default function Signup() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', plan: 'Starter' });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section className="page-hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="shell relative w-full">
        <div className="signup-grid">
          {/* form side */}
          <Reveal stagger={0.08} className="card p-8 max-w-md w-full mx-auto">
            {sent ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4"><Mascot size={96} mood="celebrate" /></div>
                <h3 className="t-section">Welcome aboard!</h3>
                <p className="t-body mt-3">We have sent a confirmation link to <b style={{ color: 'var(--ink)' }}>{form.email || 'your inbox'}</b>. Click it to start your free trial.</p>
                <Link to="/" className="btn btn-secondary mt-6">Back to home</Link>
              </div>
            ) : (
              <form onSubmit={submit} className="form">
                <RevealItem><div className="flex items-center gap-2 mb-2"><Sparkles size={18} style={{ color: 'var(--accent-deep)' }} /><span className="eyebrow">Start free trial</span></div></RevealItem>
                <RevealItem><h2 className="t-section">No credit card. Live in 2 minutes.</h2></RevealItem>
                <RevealItem>
                  <div>
                    <label className="field-label">Full name</label>
                    <input className="input" required value={form.name} onChange={update('name')} placeholder="Aisha Khan" />
                  </div>
                </RevealItem>
                <RevealItem>
                  <div>
                    <label className="field-label">Work email</label>
                    <input className="input" type="email" required value={form.email} onChange={update('email')} placeholder="you@company.com" />
                  </div>
                </RevealItem>
                <RevealItem>
                  <div>
                    <label className="field-label">Company</label>
                    <input className="input" value={form.company} onChange={update('company')} placeholder="Northwind Realty" />
                  </div>
                </RevealItem>
                <RevealItem>
                  <div>
                    <label className="field-label">Plan</label>
                    <select className="input" value={form.plan} onChange={update('plan')}>
                      {PRICING.map((p) => <option key={p.name}>{p.name}</option>)}
                    </select>
                  </div>
                </RevealItem>
                <RevealItem>
                  <button type="submit" className="btn btn-accent btn-lg w-full">Create my account <ArrowRight size={18} /></button>
                </RevealItem>
                <RevealItem>
                  <p className="t-body text-center" style={{ fontSize: 13 }}>By signing up you agree to our <Link to="/legal/terms" className="nav-underline inline">Terms</Link> and <Link to="/legal/privacy" className="nav-underline inline">Privacy Policy</Link>.</p>
                </RevealItem>
              </form>
            )}
          </Reveal>

          {/* pitch side */}
          <Reveal stagger={0.1} delay={0.1}>
            <RevealItem><h1 className="t-hero-lg">Turn conversations into customers.</h1></RevealItem>
            <RevealItem><p className="t-lead mt-5">Lead management, WhatsApp automation, and a full email marketing system — in one calm, fast workspace.</p></RevealItem>
            <RevealItem>
              <ul className="check-list mt-6">
                {['Free forever for your first 500 leads', 'No credit card required', 'Connect WhatsApp in minutes', 'Cancel anytime'].map((b) => (
                  <li className="check-item" key={b}><span className="check-ico"><Check size={13} strokeWidth={3} /></span><span>{b}</span></li>
                ))}
              </ul>
            </RevealItem>
            <RevealItem>
              <div className="flex items-center gap-3 mt-8 p-4 card" style={{ background: 'var(--canvas-alt)' }}>
                <Mascot size={48} mood="wave" seed={8} />
                <p className="t-body" style={{ fontSize: 14 }}>“We went live in an afternoon and captured our first lead the same day.” <br /><b style={{ color: 'var(--ink)' }}>— Tom Becker, Coral & Co.</b></p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
