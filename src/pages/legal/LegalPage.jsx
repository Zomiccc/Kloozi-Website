// Zomic marketing — shared legal page layout.
import { PageHero } from '../../components/sections.jsx';
import { Reveal, RevealItem } from '../../lib/motion.jsx';

export default function LegalPage({ title, updated, intro, sections }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        lead={`Last updated: ${updated}`}
        align="center"
      />
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="shell">
          <Reveal stagger={0.06} className="blog-post blog-post-body">
            <RevealItem as="p"><p>{intro}</p></RevealItem>
            {sections.map((s, i) => (
              <RevealItem key={i} as="div">
                <h2>{s.title}</h2>
                {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                {s.list && <ul>{s.list.map((li, j) => <li key={j}>{li}</li>)}</ul>}
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
