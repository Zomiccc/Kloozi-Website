// Flazyn — shared legal page layout. Pages pass their text as children
// (plain prose markup: h2, p, ul) so nested lists and links stay readable.
import { PageHero } from '../../components/sections.jsx';
import { SITE, addressLine } from '../../lib/site.js';

export default function LegalPage({ title, effective, children }) {
  return (
    <>
      <PageHero center eyebrow="Legal" title={title} lead={`Effective date: ${effective}`} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <article className="prose">
            {children}
            <h2>Contact</h2>
            <p>
              {SITE.legalName} trading as {SITE.name} · ABN {SITE.abn} · {addressLine()} ·{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export const Mail = () => <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;
