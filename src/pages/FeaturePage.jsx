// Flazyn — template shared by every product and solution page.
import { PageHero, HeroActions, SectionHead, FeatureGrid, Split, FAQ, CTA } from '../components/sections.jsx';

export default function FeaturePage({ eyebrow, title, lead, heroArt, capabilities, rows = [], faq, cta }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} art={heroArt}>
        <HeroActions />
      </PageHero>

      {capabilities && (
        <section className="section section-alt">
          <div className="shell">
            <SectionHead eyebrow={capabilities.eyebrow} title={capabilities.title} lead={capabilities.lead} />
            <FeatureGrid items={capabilities.items} cols={capabilities.cols || 3} />
          </div>
        </section>
      )}

      {rows.length > 0 && (
        <section className="section">
          <div className="shell">
            {rows.map((r, i) => <Split key={r.title} flip={i % 2 === 1} {...r} />)}
          </div>
        </section>
      )}

      {faq && (
        <section className="section section-alt">
          <div className="shell">
            <SectionHead eyebrow="FAQ" title="Questions, answered." />
            <FAQ items={faq} />
          </div>
        </section>
      )}

      <CTA {...cta} />
    </>
  );
}
