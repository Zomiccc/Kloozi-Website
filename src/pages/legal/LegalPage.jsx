// Flazyn — shared legal page layout. Sections are plain data:
// { title, p: [paragraphs], list?: [items], after?: [paragraphs] }
import { PageHero } from '../../components/sections.jsx';

export default function LegalPage({ title, updated, intro, sections }) {
  return (
    <>
      <PageHero center eyebrow="Legal" title={title} lead={`Effective date: ${updated}`} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="prose">
            {intro.map((t, i) => <p key={i}>{t}</p>)}
            {sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.p?.map((t, i) => <p key={i}>{t}</p>)}
                {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
                {s.after?.map((t, i) => <p key={`a${i}`}>{t}</p>)}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
