// Flazyn — Early access sign-up.
import { Check } from 'lucide-react';
import { EarlyAccessForm } from '../components/Forms.jsx';
import { LogoMark } from '../components/Logo.jsx';

const PERKS = [
  'Be among the first teams to use Flazyn',
  'Help shape the product with direct feedback',
  'Personal onboarding from the team',
  'No credit card, no commitment',
];

export default function EarlyAccess() {
  return (
    <section className="page-hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="shell">
        <div className="split" style={{ alignItems: 'start' }}>
          <div>
            <LogoMark className="fallback-logo" style={{ width: 88 }} />
            <p className="eyebrow" style={{ marginTop: 28 }}>Early access</p>
            <h1 className="h1">Get early access to Flazyn.</h1>
            <p className="lead">Flazyn is the CRM for teams that sell through conversations on WhatsApp, email and the web. We’re inviting teams in small groups so everyone gets a proper onboarding.</p>
            <ul className="check-list">
              {PERKS.map((p) => <li key={p}><span className="check"><Check size={14} strokeWidth={3} /></span><span>{p}</span></li>)}
            </ul>
          </div>
          <div className="form-card"><EarlyAccessForm /></div>
        </div>
      </div>
    </section>
  );
}
