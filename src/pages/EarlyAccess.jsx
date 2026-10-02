// Flazyn — Early access sign-up.
import { Check } from 'lucide-react';
import { EarlyAccessForm } from '../components/Forms.jsx';
import { LogoMark } from '../components/Logo.jsx';
import { T } from '../lib/content.jsx';

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
            <p className="eyebrow" style={{ marginTop: 28 }}><T k="early.eyebrow">Early access</T></p>
            <h1 className="h1"><T k="early.title">Get early access to Flazyn.</T></h1>
            <p className="lead"><T k="early.lead">Flazyn is the CRM for teams that sell through conversations on WhatsApp, email and the web. We’re inviting teams in small groups so everyone gets a proper onboarding.</T></p>
            <ul className="check-list">
              {PERKS.map((p, i) => <li key={p}><span className="check"><Check size={14} strokeWidth={3} /></span><span><T k={`early.perks.${i}`}>{p}</T></span></li>)}
            </ul>
          </div>
          <div className="form-card"><EarlyAccessForm /></div>
        </div>
      </div>
    </section>
  );
}
