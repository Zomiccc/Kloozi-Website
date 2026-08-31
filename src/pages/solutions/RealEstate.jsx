// Zomic marketing — solution page: Real Estate.
import { Clock, MapPinned, Building, PhoneOff } from 'lucide-react';
import SolutionPage from './SolutionPage.jsx';

export default function RealEstate() {
  return (
    <SolutionPage
      eyebrow="Solutions · Real Estate"
      title="The first agent to reply wins the listing. Be that agent."
      lead="Buyers and sellers message five agents at once. The one who replies first almost always gets the deal. Zomic makes sure that is you — on WhatsApp, every time."
      mascotMood="wave"
      painPoints={{
        title: 'Real estate moves at the speed of the first reply.',
        lead: 'Every minute a lead waits, your chance of winning drops. Most agents lose listings before they even see the enquiry.',
        items: [
          { icon: <Clock size={22} />, title: 'Slow first response', body: 'Leads come in at all hours. By morning, they have already booked a viewing with someone faster.' },
          { icon: <PhoneOff size={22} />, title: 'Calls go unanswered', body: 'You are in a viewing. The lead on WhatsApp moves on to the next agent.' },
          { icon: <MapPinned size={22} />, title: 'No follow-up system', body: 'Past enquiries sit in a notebook. You forget to nurture them, and they buy with a competitor.' },
          { icon: <Building size={22} />, title: 'Listings scattered', body: 'WhatsApp, email, portal messages — leads everywhere, no single view of who is interested in what.' },
        ],
      }}
      featureRows={[
        {
          eyebrow: 'Instant WhatsApp reply',
          title: 'Reply in seconds, 24/7 — even mid-viewing.',
          body: 'The moment a lead messages about a listing, Zomic replies on WhatsApp with the details and offers viewings. You step in when they respond, already warmed up.',
          bullets: ['Auto-reply with listing details', 'Auto-book viewings into your calendar', 'Pause the bot the moment you take over', 'Works across all your listings at once'],
          flip: false,
          art: (
            <div className="mini-mock" style={{ maxWidth: 320 }}>
              <div className="flex gap-2 mb-3"><div style={{ background: 'var(--mint)', borderRadius: 14, padding: '10px 14px', fontSize: 13, fontWeight: 600, color: '#1f6b43' }}>Hi! Is the 3-bed on Elm St still available?</div></div>
              <div className="flex justify-end mb-3"><div style={{ background: 'var(--accent)', borderRadius: 14, padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Yes! I can show it tomorrow at 3pm or 5pm 🏠</div></div>
              <div className="flex gap-2"><div style={{ background: 'var(--canvas-alt)', borderRadius: 14, padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>3pm works 🙌</div></div>
            </div>
          ),
        },
        {
          eyebrow: 'Pipeline per listing',
          title: 'Every enquiry, every listing, one calm board.',
          body: 'Track each lead against the listing they care about. See who has viewed, who has booked, who is negotiating — without spreadsheets or sticky notes.',
          bullets: ['One pipeline per listing', 'Stage: enquiry → viewing → offer → won', 'Auto-log every WhatsApp & email', 'Filter by source portal'],
          flip: true,
          art: (
            <div className="mini-mock" style={{ maxWidth: 320 }}>
              {['Elm St · 3-bed', 'Park Ave · 2-bed', 'Lake Rd · 4-bed'].map((l, i) => (
                <div key={l} className="hero-mock-row">
                  <span className="hero-mock-avatar" style={{ background: ['#C9BBFF', '#BFE3F5', '#A8E6C1'][i] }}>{['E', 'P', 'L'][i]}</span>
                  <div className="flex-1"><div className="hero-mock-name">{l}</div><div className="hero-mock-meta">{[3, 5, 2][i]} active leads</div></div>
                  <span className="badge" style={{ background: ['#BFE3F5', '#FFE9A8', '#A8E6C1'][i], color: 'var(--ink)' }}>{['Viewing', 'Offer', 'Enquiry'][i]}</span>
                </div>
              ))}
            </div>
          ),
        },
      ]}
      outcomes={{ title: 'Reply first. Win the listing. Repeat.' }}
      stat={[
        { value: '4 min → 4 sec', label: 'average first response time' },
        { value: '2×', label: 'more viewings booked' },
      ]}
      testimonial={{ quote: 'We went from replying to leads in 4 hours to 4 seconds. Our booking rate doubled in the first month.', name: 'Aisha Khan', role: 'Sales Lead, Northwind Realty', initial: 'A', bg: '#C9BBFF' }}
    />
  );
}
