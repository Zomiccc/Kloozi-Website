// Flazyn — solution pages (content only; layout lives in FeaturePage).
import {
  Clock, PhoneOff, MapPinned, Building, Users, GitCommitVertical, EyeOff, Scale,
  Building2, Layers, Repeat, FolderKanban, Rocket, Wallet, Cpu, Sprout,
} from 'lucide-react';
import FeaturePage from './FeaturePage.jsx';
import { PipelineMock, ChatMock, FlowMock, ChartMock, SourcesMock } from '../components/Mocks.jsx';
import { PhotoStage, BubbleCard, StatCard } from '../components/Photo.jsx';
import { UserPlus, FileSpreadsheet, FolderKanban as Folder } from 'lucide-react';

export function RealEstate() {
  return (
    <FeaturePage
      k="s.realestate"
      eyebrow="Solutions · Real Estate"
      title="Reply to property enquiries first. Win more listings."
      lead="Buyers and sellers message several agents at once. Flazyn helps you answer first on WhatsApp, track every buyer by listing and follow up on time."
      heroArt={<PhotoStage eager k="s.realestate.photo" src="/images/real-estate.webp" alt="An estate agent showing a home to a young couple"><BubbleCard className="bl" who="WhatsApp · new enquiry" text="Hi! Is the 3-bed on Elm Street still available?" reply="It is! I can show it tomorrow at 11am or 4pm." /></PhotoStage>}
      capabilities={{
        eyebrow: 'The problem',
        title: 'Real estate moves at the speed of the first reply.',
        cols: 2,
        items: [
          { icon: Clock, hue: 'coral', title: 'Slow first response', body: 'Enquiries arrive in the evening and at weekends. By morning, the buyer has booked with someone else.' },
          { icon: PhoneOff, hue: 'sun', title: 'Missed while on a viewing', body: 'You are showing a property while a new lead waits on WhatsApp.' },
          { icon: MapPinned, hue: 'sky', title: 'No follow-up system', body: 'Past enquiries sit in a notebook or a phone, and nobody nurtures them.' },
          { icon: Building, title: 'Leads everywhere', body: 'Portals, WhatsApp, email and calls — no single view of who wants what.' },
        ],
      }}
      rows={[
        { eyebrow: 'Instant reply', title: 'Answer in minutes, even mid-viewing.', body: 'New WhatsApp enquiries are routed to the right agent, with a template first reply so every buyer hears back fast.', bullets: ['Template first replies', 'Routing by listing or area', 'Reminders for chats waiting on you'], art: <ChatMock /> },
        { eyebrow: 'Pipeline per listing', title: 'Every buyer, every listing, one calm board.', body: 'Track each lead against the property they are interested in, from enquiry to viewing to offer.', bullets: ['Stages: enquiry → viewing → offer → won', 'Every message on the lead record', 'Filter by source and listing'], art: <PipelineMock /> },
      ]}
      cta={{ title: 'Be the first agent to reply.' }}
    />
  );
}

export function SalesTeams() {
  return (
    <FeaturePage
      k="s.sales"
      eyebrow="Solutions · Sales Teams"
      title="A pipeline your whole sales team trusts."
      lead="Shared inboxes, fair lead assignment and clear next steps — so managers see the real picture and reps spend their time selling."
      heroArt={<PhotoStage eager k="s.sales.photo" src="/images/sales-team.webp" alt="A sales team gathered around a laptop"><StatCard className="bl" icon={UserPlus} hue="mint" title="New lead assigned" sub="Round-robin · Marco" /></PhotoStage>}
      capabilities={{
        eyebrow: 'The problem',
        title: 'When the CRM is a chore, the data is wrong.',
        cols: 2,
        items: [
          { icon: EyeOff, hue: 'coral', title: 'No visibility', body: 'Conversations live in personal phones and inboxes. Managers only hear about deals at the end.' },
          { icon: Scale, hue: 'sun', title: 'Unfair lead distribution', body: 'The fastest grabber wins, not the best fit. Good reps burn out.' },
          { icon: GitCommitVertical, hue: 'sky', title: 'Forecasts are guesses', body: 'Stages mean different things to different reps, so the numbers can’t be trusted.' },
          { icon: Users, title: 'Tools nobody opens', body: 'Complex CRMs get updated on Friday afternoon — if at all.' },
        ],
      }}
      rows={[
        { eyebrow: 'Fair assignment', title: 'The right lead to the right rep.', body: 'Round-robin or rule-based assignment routes each lead instantly, with ownership clear to everyone.', bullets: ['Round-robin and rules', 'Reassign in one click', 'Shared team views'], art: <FlowMock /> },
        { eyebrow: 'Clarity', title: 'See the whole pipeline at a glance.', body: 'Consistent stages, response-time reporting and stuck-deal alerts give managers the truth without chasing updates.', bullets: ['Response time by rep', 'Conversion by stage', 'Stuck-deal highlights'], art: <ChartMock /> },
      ]}
    />
  );
}

export function Agencies() {
  return (
    <FeaturePage
      k="s.agencies"
      eyebrow="Solutions · Agencies"
      title="Every client pipeline, one calm workspace."
      lead="Run a separate pipeline for each client, keep conversations organised and report clearly — without juggling logins."
      heroArt={<PhotoStage eager k="s.agencies.photo" src="/images/agency.webp" alt="An agency team meeting in a bright office"><StatCard className="bl" icon={Folder} hue="sky" title="Client pipeline: Northwind" sub="3 new leads today" /></PhotoStage>}
      capabilities={{
        eyebrow: 'The problem',
        title: 'Agencies juggle too many inboxes.',
        cols: 2,
        items: [
          { icon: Layers, title: 'Many clients, many tools', body: 'Each client has different forms, ads and inboxes to watch.' },
          { icon: Repeat, hue: 'sun', title: 'Manual reporting', body: 'Hours every month copying lead numbers into slides.' },
          { icon: FolderKanban, hue: 'sky', title: 'Leads handed over late', body: 'Ad leads sit in a spreadsheet before the client sees them.' },
          { icon: Building2, hue: 'coral', title: 'No single view', body: 'Hard to see which client needs attention today.' },
        ],
      }}
      rows={[
        { eyebrow: 'Per-client pipelines', title: 'Separate, tidy, and easy to switch between.', body: 'Give each client their own pipeline and lead sources, all managed from one workspace.', bullets: ['A pipeline per client', 'Lead Ads and forms per client', 'Team access per client'], art: <PipelineMock /> },
        { eyebrow: 'Reporting', title: 'Show clients the results.', body: 'Leads by source, response times and outcomes — ready to share without building a spreadsheet.', bullets: ['Source and conversion reports', 'CSV export', 'Consistent stages across clients'], art: <ChartMock /> },
      ]}
    />
  );
}

export function Startups() {
  return (
    <FeaturePage
      k="s.startups"
      eyebrow="Solutions · Startups"
      title="A real CRM from your very first customer."
      lead="Move out of the spreadsheet in an afternoon. Capture leads, talk to customers on WhatsApp and email, and build a pipeline that grows with you."
      heroArt={<PhotoStage eager k="s.startups.photo" src="/images/startup.webp" alt="Three founders working together on a laptop"><StatCard className="bl" icon={FileSpreadsheet} hue="sun" title="Spreadsheet imported" sub="Duplicates merged" /></PhotoStage>}
      capabilities={{
        eyebrow: 'Why Flazyn',
        title: 'Built for small teams that move fast.',
        cols: 2,
        items: [
          { icon: Rocket, hue: 'sun', title: 'Set up quickly', body: 'Import a CSV, connect a channel and you have a working pipeline.' },
          { icon: Wallet, hue: 'mint', title: 'No enterprise overhead', body: 'No consultants, no complex setup, no features you will never use.' },
          { icon: Cpu, title: 'Automation from day one', body: 'First replies and follow-up reminders that save founders hours.' },
          { icon: Sprout, hue: 'coral', title: 'Grows with you', body: 'Add teammates, stages and channels as your company grows.' },
        ],
      }}
      rows={[
        { eyebrow: 'Get organised', title: 'From spreadsheet to pipeline in an afternoon.', body: 'Import your existing list, set your stages and start working every lead from one place.', bullets: ['CSV import with duplicate detection', 'Simple, customisable stages', 'Every conversation on the lead'], art: <SourcesMock /> },
      ]}
    />
  );
}
