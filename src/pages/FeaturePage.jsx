// Flazyn — template shared by every product and solution page.
// `k` is the page's content key (e.g. "p.whatsapp"); every piece of copy
// below is editable from the admin panel under that prefix, and the admin
// can add their own blocks after the hero and before the closing CTA.
import { PageHero, HeroActions, SectionHead, FeatureGrid, Split, FAQ, CTA } from '../components/sections.jsx';
import { Blocks } from '../lib/content.jsx';

export default function FeaturePage({ k, eyebrow, title, lead, heroArt, capabilities, rows = [], faq, cta }) {
  return (
    <>
      <PageHero k={`${k}.hero`} eyebrow={eyebrow} title={title} lead={lead} art={heroArt}>
        <HeroActions />
      </PageHero>

      <Blocks k={`${k}.top`} />

      {capabilities && (
        <section className="section section-alt">
          <div className="shell">
            <SectionHead k={`${k}.cap`} eyebrow={capabilities.eyebrow} title={capabilities.title} lead={capabilities.lead} />
            <FeatureGrid k={`${k}.cap.items`} items={capabilities.items} cols={capabilities.cols || 3} />
          </div>
        </section>
      )}

      {rows.length > 0 && (
        <section className="section">
          <div className="shell">
            {rows.map((r, i) => <Split key={r.title} k={`${k}.row${i}`} flip={i % 2 === 1} {...r} />)}
          </div>
        </section>
      )}

      {faq && (
        <section className="section section-alt">
          <div className="shell">
            <SectionHead k={`${k}.faqHead`} eyebrow="FAQ" title="Questions, answered." />
            <FAQ k={`${k}.faq`} items={faq} />
          </div>
        </section>
      )}

      <Blocks k={`${k}.bottom`} />

      {/* A page-specific CTA gets its own key; otherwise the shared one. */}
      <CTA k={cta?.title ? `${k}.cta` : 'cta'} {...cta} />
    </>
  );
}
