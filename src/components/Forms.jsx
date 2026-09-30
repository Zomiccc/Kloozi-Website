// Flazyn — contact + early-access forms. Both POST to /api/contact
// (a Vercel serverless function that emails the team via Resend).
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { SITE } from '../lib/site.js';

function useSubmit(type) {
  const [state, setState] = useState({ status: 'idle', error: '' });
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState({ status: 'sending', error: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Something went wrong.');
      setState({ status: 'sent', error: '' });
    } catch (err) {
      setState({ status: 'idle', error: `${err.message} You can also email us at ${SITE.email}.` });
    }
  };
  return { ...state, submit };
}

function Success({ title, body }) {
  return (
    <div className="form-success" role="status">
      <span className="chip3d mint"><Check size={32} strokeWidth={3} /></span>
      <h2 className="h3" style={{ fontSize: 26 }}>{title}</h2>
      <p className="body" style={{ marginTop: 10 }}>{body}</p>
      <Link to="/" className="btn btn-secondary" style={{ marginTop: 24 }}>Back to home</Link>
    </div>
  );
}

const Honeypot = () => (
  <div className="hp" aria-hidden="true">
    <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
  </div>
);

function SubmitButton({ sending, children }) {
  return (
    <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={sending}>
      {sending ? <><Loader2 size={18} className="spin" /> Sending…</> : <>{children} <ArrowRight size={18} /></>}
    </button>
  );
}

export function EarlyAccessForm() {
  const { status, error, submit } = useSubmit('early-access');
  if (status === 'sent') return <Success title="You’re on the list!" body="Thanks for your interest in Flazyn. We’ll email you as soon as your early-access spot is ready." />;
  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <div className="field"><label htmlFor="ea-name">Full name</label><input id="ea-name" name="name" className="input" required maxLength={100} autoComplete="name" /></div>
        <div className="field"><label htmlFor="ea-email">Work email</label><input id="ea-email" name="email" type="email" className="input" required maxLength={200} autoComplete="email" /></div>
      </div>
      <div className="form-row">
        <div className="field"><label htmlFor="ea-company">Company <span className="optional">(optional)</span></label><input id="ea-company" name="company" className="input" maxLength={120} autoComplete="organization" /></div>
        <div className="field">
          <label htmlFor="ea-size">Team size</label>
          <select id="ea-size" name="teamSize" className="input" defaultValue="1–5">
            <option>Just me</option><option>1–5</option><option>6–20</option><option>21–50</option><option>51+</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="ea-use">What would you use Flazyn for? <span className="optional">(optional)</span></label>
        <textarea id="ea-use" name="message" className="input" maxLength={2000} placeholder="e.g. We get most leads on WhatsApp and lose track of follow-ups." />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree to Flazyn emailing me about early access. I can unsubscribe at any time. See our <Link to="/legal/privacy">Privacy Policy</Link>.</span>
      </label>
      <Honeypot />
      {error && <div className="form-error" role="alert">{error}</div>}
      <SubmitButton sending={status === 'sending'}>Request early access</SubmitButton>
    </form>
  );
}

export function ContactForm() {
  const { status, error, submit } = useSubmit('contact');
  if (status === 'sent') return <Success title="Message sent — thank you!" body="We read every message and will reply by email as soon as we can." />;
  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <div className="field"><label htmlFor="c-name">Full name</label><input id="c-name" name="name" className="input" required maxLength={100} autoComplete="name" /></div>
        <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" className="input" required maxLength={200} autoComplete="email" /></div>
      </div>
      <div className="form-row">
        <div className="field"><label htmlFor="c-company">Company <span className="optional">(optional)</span></label><input id="c-company" name="company" className="input" maxLength={120} autoComplete="organization" /></div>
        <div className="field">
          <label htmlFor="c-topic">Topic</label>
          <select id="c-topic" name="topic" className="input" defaultValue="General question">
            <option>General question</option><option>Early access</option><option>Partnership</option><option>Privacy or data request</option><option>Press</option>
          </select>
        </div>
      </div>
      <div className="field"><label htmlFor="c-msg">Message</label><textarea id="c-msg" name="message" className="input" required minLength={10} maxLength={4000} /></div>
      <p className="small" style={{ margin: 0 }}>We use your details only to reply to you. See our <Link to="/legal/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</Link>.</p>
      <Honeypot />
      {error && <div className="form-error" role="alert">{error}</div>}
      <SubmitButton sending={status === 'sending'}>Send message</SubmitButton>
    </form>
  );
}
