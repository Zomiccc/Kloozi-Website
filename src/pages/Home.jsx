import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Mail, Zap, ChevronRight, MoveUpRight, Radio, Layers, MousePointer2 } from 'lucide-react';
import './home.css';

const journeys = [
  { name: 'Aisha Khan', company: 'Northwind Studio', initials: 'AK', value: '$12,400', color: 'peach', subject: 'A little interest. A big opportunity.', message: 'Hey! I’d love to know more about your team plan.', reply: 'Absolutely, Aisha. Let’s find the perfect fit for your team.', source: 'WhatsApp', score: 92 },
  { name: 'Marco Diaz', company: 'Brightpath Agency', initials: 'MD', value: '$8,600', color: 'lilac', subject: 'The right follow-up changes everything.', message: 'Thanks for the proposal. Can we walk through it together?', reply: 'Of course, Marco. I’ve sent over a time for us to connect.', source: 'Email', score: 86 },
  { name: 'Priya Sharma', company: 'Lumen Labs', initials: 'PS', value: '$18,200', color: 'green', subject: 'From first hello to a fresh start.', message: 'We’re ready to get started. What’s the next step?', reply: 'Welcome aboard, Priya. Your onboarding call is ready to book.', source: 'Web form', score: 98 },
];
const stages = ['Captured', 'Connected', 'Qualified', 'Won'];
function Workspace() {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(1);
  const lead = journeys[selected];
  return <div className="relationship-workspace" id="workspace">
    <div className="workspace-top"><span><span className="tiny-mark">z</span> Your relationship workspace</span><span className="sample-label"><i /> Interactive preview</span></div>
    <div className="workspace-body">
      <aside className="workspace-rail"><span className="rail-active"><Layers size={19}/></span><MessageCircle size={19}/><Mail size={19}/><Zap size={19}/><span className="rail-bottom">JD</span></aside>
      <div className="lead-list"><div className="panel-label">YOUR NEXT OPPORTUNITIES <span>03</span></div><h3>Good things in motion.</h3>
        {journeys.map((person, i) => <button key={person.name} className={`lead-button ${selected === i ? 'selected' : ''}`} onClick={() => { setSelected(i); setStage(1); }} aria-pressed={selected === i}><span className={`person-avatar ${person.color}`}>{person.initials}</span><span><strong>{person.name}</strong><small>{person.company}</small></span><ChevronRight size={15}/></button>)}
        <div className="list-note"><MousePointer2 size={15}/> Pick a person. Follow the possibility.</div>
      </div>
      <div className="journey-panel"><div className="journey-heading"><span className="panel-label">THE CONVERSATION → THE CUSTOMER</span><span className="source-tag">{lead.source}</span></div><h3>{lead.subject}</h3>
        <div className="journey-track">{stages.map((name, i) => <button key={name} onClick={() => setStage(i)} className={i <= stage ? 'complete' : ''} aria-pressed={stage === i}><span>{i < stage ? <Check size={12}/> : `0${i + 1}`}</span>{name}</button>)}</div>
        <div className="conversation" aria-live="polite"><div className="message incoming">{lead.message}<small>{lead.name.split(' ')[0]} · 10:42</small></div><div className="message outgoing">{stage === 3 ? `It’s official! Welcome to Zomic, ${lead.name.split(' ')[0]}.` : lead.reply}<small><Zap size={10}/> {stage === 3 ? 'Deal won' : 'Zomic automation'} <Check size={11}/></small></div></div>
        <div className="journey-bottom"><span><i/> {stage === 3 ? 'A new relationship, just beginning.' : 'The next step is already taken care of.'}</span><button onClick={() => setStage((stage + 1) % 4)}>{stage === 3 ? 'Replay journey' : 'Move to ' + stages[stage + 1]} <ArrowRight size={13}/></button></div>
      </div>
      <aside className="signal-panel"><span className="panel-label"><Radio size={13}/> CONVERSION SIGNAL</span><div className="signal-orbit"><span>{stage === 3 ? 100 : lead.score}<small>looking good</small></span></div><h4>{stage === 3 ? 'Made it official.' : 'A warm conversation.'}</h4><p>{stage === 3 ? 'One more customer. Every conversation brought you here.' : 'Engaged, interested, and ready for your next move.'}</p><div className="deal-value"><span>Deal potential</span><strong>{lead.value}</strong></div><span className="signal-note"><Zap size={12}/> Less guessing. More connecting.</span></aside>
    </div><div className="workspace-bottom"><span><i/> All your relationships. One connected place.</span><span>Sample workspace · Explore freely <ArrowUpRight size={12}/></span></div>
  </div>;
}
export default function Home() {
  return <div className="zomic-home">
    <section className="editorial-hero shell"><div className="hero-kicker"><span><i/> A LITTLE MORE HUMAN. A LOT MORE CONNECTED.</span><span>MEET YOUR NEXT CRM ↙</span></div>
      <div className="editorial-intro"><div><h1>Big on relationships.<br/>Small on <span>busywork.<svg viewBox="0 0 560 25" preserveAspectRatio="none" aria-hidden="true"><path d="M4 17 Q230 -2 554 9 M20 24 Q290 7 526 18"/></svg></span></h1></div><div className="hero-side"><span className="asterisk" aria-hidden="true">✳</span><p>Every lead has a story.<br/>Bring the conversations, follow-ups, and next chapters together in Zomic.</p><Link to="/signup" className="orange-button">Find your flow <ArrowUpRight size={19}/></Link><small>No credit card. Just possibilities.</small></div></div>
      <div className="preview-intro"><span><span className="handwritten">Less admin. More human.</span><svg width="48" height="25" viewBox="0 0 48 25" aria-hidden="true"><path d="M2 3 Q28 2 34 20 M26 16 L35 22 L40 13" fill="none" stroke="currentColor"/></svg></span><a href="#workspace">A CRM you can actually feel. Try it below <MoveUpRight size={13}/></a></div>
      <Workspace/>
    </section>
    <section className="connection-strip shell"><p>One workspace.<br/><strong>Every way you connect.</strong></p><span><MessageCircle/> WhatsApp</span><span><Mail/> Email</span><span><Layers/> Your pipeline</span><span><Zap/> Automations</span><span><Radio/> Real insights</span></section>
    <section className="possibilities shell" id="possibilities"><div className="section-caption">01 / LESS FRICTION. MORE FORWARD.</div><div className="section-intro"><h2>Keep the human.<br/><span>Lose the hassle.</span></h2><p>Your best work happens between people.<br/>Zomic takes care of everything in between.</p></div><div className="possibility-grid">
      <Link to="/product/lead-management" className="possibility-card paper-card"><div className="card-top"><span>01 — SEE THE WHOLE PICTURE</span><ArrowUpRight/></div><h3>A place for every<br/>“let’s talk.”</h3><p>Turn scattered leads into a clear next step, with a pipeline that keeps everyone in the loop.</p><div className="mini-pipeline"><div><span>New <b>2</b></span><article><i className="peach"/> Aisha Khan<small>New possibilities ↗</small></article></div><div><span>Connected <b>1</b></span><article><i className="green"/> Priya Sharma<small>Let’s make it happen ↗</small></article></div></div><span className="card-link">Explore your pipeline <ArrowRight size={16}/></span></Link>
      <Link to="/product/whatsapp-automation" className="possibility-card green-card"><div className="card-top"><span>02 — KEEP THE CONVERSATION GOING</span><ArrowUpRight/></div><h3>Right message.<br/>Really good timing.</h3><p>WhatsApp and email follow-ups that feel personal, even when they happen automatically.</p><div className="mini-flow"><span><MessageCircle size={18}/> A new hello</span><div className="flow-line"/><span><Zap size={18}/> A thoughtful reply <Check size={15}/></span></div><span className="card-link">Meet your automations <ArrowRight size={16}/></span></Link>
      <Link to="/product/analytics" className="possibility-card dark-card"><div className="card-top"><span>03 — KNOW YOUR NEXT MOVE</span><ArrowUpRight/></div><h3>A little signal.<br/>A lot of clarity.</h3><p>See which relationships are warming up, and give your attention where it matters.</p><div className="signal-chart"><span>Relationship momentum <strong>↗</strong></span><div>{[22, 35, 29, 46, 39, 62, 56, 73, 68, 89, 100].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div><small>FROM FIRST HELLO TO WHAT’S NEXT</small></div><span className="card-link">Follow the signal <ArrowRight size={16}/></span></Link>
    </div></section>
    <section className="manifesto shell"><span className="section-caption">BUILT AROUND PEOPLE, BY DESIGN.</span><h2>Behind every deal<br/>is a <em>real person.</em><span className="manifesto-star">✳</span></h2><div><p>A founder chasing a dream. A team building something better. A customer waiting for a reply. Make room for the relationships that move your business forward.</p><Link to="/about">A little more about us <ArrowUpRight size={18}/></Link></div></section>
    <section className="closing-section"><div className="shell"><span className="section-caption">YOUR NEXT CHAPTER STARTS WITH A HELLO.</span><h2>Good relationships.<br/>Great things ahead.</h2><Link to="/signup" className="orange-button">Let’s get you connected <ArrowUpRight size={20}/></Link><Link to="/contact" className="closing-secondary">Or, let’s talk first <ArrowRight size={16}/></Link></div><span aria-hidden="true" className="closing-art">z</span></section>
  </div>;
}
