// ═══════════════════════════════════════════════════════════════════
// FLAZYN — THE 3D CRM WORKSPACE
// One full-screen WebGL scene that lives behind every page and shows the
// product itself, in 3D:
//
//   • Pipeline board  a glossy board with four stage columns
//                     (New → Contacted → Qualified → Won) and lead cards.
//   • The journey     one highlighted lead drops in, then hops column to
//                     column and bursts into confetti when it's won.
//   • Phone           WhatsApp chat bubbles pop in as the deal advances.
//   • Chart           bars grow with each stage.
//   • Brand           the extruded Flazyn logo + floating channel objects.
//
// Placement follows the page: an element with data-scene="hero|left|far"
// claims the scene while it's in the middle of the viewport. "far" sinks
// the workspace into the background (and fades it via CSS) so content
// stays readable. The pointer tilts everything.
// ═══════════════════════════════════════════════════════════════════
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  pointer, usePointer, Lighting, glossy, roundedRect, extrude, Shadow,
  LogoTile, Floater, ChatBubble, Envelope, Contact,
} from './Scenes.jsx';
import { scene } from '../lib/sceneStore.js';

const lerp = THREE.MathUtils.lerp;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const STAGES = [
  { label: 'New lead', color: '#3b9bff', tray: '#e6f1ff' },
  { label: 'Contacted', color: '#7a5cff', tray: '#efebff' },
  { label: 'Qualified', color: '#b04bff', tray: '#f6ebff' },
  { label: 'Won', color: '#16c79a', tray: '#e3f8f1' },
];
const COL_X = [-2.625, -0.875, 0.875, 2.625];
const SLOT_Y = [0.62, -0.18, -0.98];
const CARD_Z = 0.3;
const STAGE_TIME = 2.8;

/* One clock drives the whole story so the board, phone and chart agree. */
function useStory() {
  return useRef({ stage: 0, t: 0 });
}

/* ─── text sprite ─── */
function useLabel(text, dot) {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 112;
    const g = c.getContext('2d');
    g.font = '600 44px Inter, system-ui, sans-serif';
    g.textBaseline = 'middle';
    let x = 8;
    if (dot) { g.fillStyle = dot; g.beginPath(); g.arc(30, 56, 14, 0, Math.PI * 2); g.fill(); x = 58; }
    g.fillStyle = '#26262c';
    g.fillText(text, x, 58);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [text, dot]);
}

function Label({ text, dot, position, width = 1.5 }) {
  const map = useLabel(text, dot);
  return (
    <mesh position={position}>
      <planeGeometry args={[width, width * (112 / 512)]} />
      <meshBasicMaterial map={map} transparent depthWrite={false} />
    </mesh>
  );
}

/* ─── lead card ─── */
const CARD_W = 1.38, CARD_H = 0.64;
function useCardGeometry() {
  return useMemo(() => ({
    body: extrude(roundedRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, 0.12), 0.07, 0.03, 3),
    outline: extrude(roundedRect(-CARD_W / 2 - 0.05, -CARD_H / 2 - 0.05, CARD_W + 0.1, CARD_H + 0.1, 0.16), 0.05, 0.02, 2),
    bar: new THREE.BoxGeometry(1, 0.07, 0.02),
    avatar: new THREE.SphereGeometry(0.14, 24, 24),
  }), []);
}

const MATS = {};
const mat = (color, extra) => (MATS[color + JSON.stringify(extra || {})] ||= glossy(color, extra));

function LeadCard({ color = '#7a5cff', hero = false, won = false }) {
  const g = useCardGeometry();
  return (
    <group>
      {hero && <mesh geometry={g.outline} material={mat(won ? '#16c79a' : '#7a5cff')} position={[0, 0, -0.02]} />}
      <mesh geometry={g.body} material={mat('#ffffff')} />
      <mesh geometry={g.avatar} material={mat(color)} position={[-0.44, 0.06, 0.08]} scale={[1, 1, 0.5]} />
      <mesh geometry={g.bar} material={mat('#3a3a44', { roughness: 0.6, clearcoat: 0 })} position={[0.12, 0.13, 0.07]} scale={[0.62, 1, 1]} />
      <mesh geometry={g.bar} material={mat('#c9c6d6', { roughness: 0.6, clearcoat: 0 })} position={[0.02, -0.01, 0.07]} scale={[0.42, 0.8, 1]} />
      <mesh geometry={g.bar} material={mat(hero ? (won ? '#16c79a' : '#7a5cff') : '#e2dff0', { roughness: 0.5, clearcoat: 0 })} position={[-0.06, -0.17, 0.07]} scale={[0.26, 1.1, 1]} />
    </group>
  );
}

/* ─── the board ─── */
const STATIC_CARDS = [
  [{ slot: 1, color: '#ffb62e' }, { slot: 2, color: '#3b9bff' }],
  [{ slot: 1, color: '#ff6b4a' }],
  [{ slot: 1, color: '#16c79a' }, { slot: 2, color: '#b04bff' }],
  [{ slot: 1, color: '#3b9bff' }],
];

function Board({ story }) {
  const geo = useMemo(() => ({
    slab: extrude(roundedRect(-3.6, -2.15, 7.2, 4.3, 0.34), 0.22, 0.06, 5),
    tray: extrude(roundedRect(-0.775, -1.62, 1.55, 3.24, 0.16), 0.03, 0.02, 2),
    dotRow: new THREE.CircleGeometry(0.05, 16),
  }), []);
  const hero = useRef();
  const burst = useRef();
  const heroCardRef = useRef({ won: false });

  useFrame((s, dt) => {
    const st = story.current;
    const intro = scene.mode === 'intro';
    st.t += dt * (intro ? 1.8 : 1);
    if (st.t > STAGE_TIME) { st.t = 0; st.stage = (st.stage + 1) % 4; if (st.stage === 3) burst.current.fire(); scene.setStage(st.stage); }
    if (intro && st.stage === 3 && st.t > STAGE_TIME * 0.75) scene.finishIntro();
    const k = Math.min(1, st.t / 0.9);
    const e = ease(k);
    const h = hero.current;
    if (st.stage === 0) {
      // drop in from above the board
      h.position.set(COL_X[0], SLOT_Y[0], CARD_Z + (1 - e) * 2.6);
      h.rotation.set(0, 0, (1 - e) * 0.5);
    } else {
      const from = COL_X[st.stage - 1], to = COL_X[st.stage];
      h.position.set(lerp(from, to, e), SLOT_Y[0] + Math.sin(e * Math.PI) * 0.25, CARD_Z + Math.sin(e * Math.PI) * 1.1);
      h.rotation.set(0, Math.sin(e * Math.PI) * -0.35, Math.sin(e * Math.PI) * 0.12);
    }
    const s2 = 1 + Math.sin(e * Math.PI) * 0.08;
    h.scale.setScalar(s2);
    heroCardRef.current.won = st.stage === 3;
  });

  return (
    <group>
      <mesh geometry={geo.slab} material={mat('#ffffff', { roughness: 0.35 })} />
      <Label text="Sales pipeline" position={[-2.55, 1.86, 0.19]} width={1.9} />
      <Label text="Sample data" dot="#16c79a" position={[2.75, 1.86, 0.19]} width={1.3} />
      {STAGES.map((s, i) => (
        <group key={s.label} position={[COL_X[i], -0.12, 0.17]}>
          <mesh geometry={geo.tray} material={mat(s.tray, { roughness: 0.7, clearcoat: 0.2 })} />
          <Label text={s.label} dot={s.color} position={[-0.12, 1.4, 0.05]} width={1.22} />
          {STATIC_CARDS[i].map((c) => (
            <group key={c.slot} position={[0, SLOT_Y[c.slot] + 0.12, CARD_Z - 0.17]}>
              <LeadCard color={c.color} />
            </group>
          ))}
        </group>
      ))}
      <group ref={hero} position={[COL_X[0], SLOT_Y[0], CARD_Z]}>
        <group position={[0, 0, 0]}><HeroCard state={heroCardRef} /></group>
      </group>
      <Confetti ref={burst} origin={[COL_X[3], SLOT_Y[0], 0.8]} />
    </group>
  );
}

function HeroCard({ state }) {
  const wonRef = useRef();
  const liveRef = useRef();
  useFrame(() => {
    wonRef.current.visible = state.current.won;
    liveRef.current.visible = !state.current.won;
  });
  return (
    <>
      <group ref={liveRef}><LeadCard hero color="#ff6b4a" /></group>
      <group ref={wonRef} visible={false}><LeadCard hero won color="#ff6b4a" /></group>
    </>
  );
}

/* ─── confetti burst when a deal is won ─── */
const Confetti = forwardRef(function Confetti({ origin }, ref) {
  const N = 36;
  const mesh = useRef();
  const parts = useMemo(() => Array.from({ length: N }, () => ({ p: new THREE.Vector3(), v: new THREE.Vector3(), r: new THREE.Euler(), life: 0 })), []);
  const colors = useMemo(() => {
    const cs = ['#7a5cff', '#ff6b4a', '#16c79a', '#ffb62e', '#3b9bff'];
    const arr = new Float32Array(N * 3);
    const c = new THREE.Color();
    for (let i = 0; i < N; i++) { c.set(cs[i % cs.length]); arr.set([c.r, c.g, c.b], i * 3); }
    return arr;
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useImperativeHandle(ref, () => ({
    fire() {
      parts.forEach((q) => {
        q.p.set(...origin);
        q.v.set((Math.random() - 0.5) * 3.2, Math.random() * 2.2 + 0.6, Math.random() * 3 + 1);
        q.r.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
        q.life = 1.4 + Math.random() * 0.5;
      });
    },
  }));
  useFrame((_, dt) => {
    parts.forEach((q, i) => {
      if (q.life > 0) {
        q.life -= dt;
        q.v.z -= 5.5 * dt; // "gravity" pulls back onto the board
        q.p.addScaledVector(q.v, dt);
        q.r.x += dt * 6; q.r.y += dt * 4;
      }
      dummy.position.copy(q.p);
      dummy.rotation.copy(q.r);
      dummy.scale.setScalar(q.life > 0 ? Math.min(1, q.life) : 0);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, N]} frustumCulled={false}>
      <boxGeometry args={[0.1, 0.16, 0.02]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
      <meshStandardMaterial vertexColors roughness={0.5} />
    </instancedMesh>
  );
});

/* ─── phone with a live WhatsApp thread ─── */
const BUBBLES = [
  { side: -1, w: 1.0, color: '#ffffff' },
  { side: 1, w: 0.92, color: '#d5f7ea' },
  { side: -1, w: 0.78, color: '#ffffff' },
  { side: 1, w: 0.96, color: '#d5f7ea' },
];

function Phone({ story }) {
  const geo = useMemo(() => ({
    body: extrude(roundedRect(-0.78, -1.55, 1.56, 3.1, 0.3), 0.14, 0.05, 5),
    screen: new THREE.ShapeGeometry(roundedRect(-0.68, -1.44, 1.36, 2.88, 0.22), 24),
    header: new THREE.ShapeGeometry(roundedRect(-0.68, 1.02, 1.36, 0.42, 0.18), 16),
    bubble: (w) => extrude(roundedRect(-w / 2, -0.15, w, 0.3, 0.14), 0.03, 0.015, 2),
  }), []);
  const bubbleGeos = useMemo(() => BUBBLES.map((b) => geo.bubble(b.w)), [geo]);
  const refs = useRef([]);
  const scales = useRef(BUBBLES.map(() => 0));

  useFrame((_, dt) => {
    const st = story.current;
    const visible = st.stage + 1; // one more message per stage
    BUBBLES.forEach((b, i) => {
      const target = i < visible ? 1 : 0;
      const sp = target ? 9 : 14;
      scales.current[i] = lerp(scales.current[i], target, 1 - Math.exp(-sp * dt));
      const el = refs.current[i];
      if (!el) return;
      const s = scales.current[i];
      el.scale.set(s, s, 1);
      el.visible = s > 0.01;
    });
  });

  return (
    <group>
      <mesh geometry={geo.body} material={mat('#fdfdff')} />
      <mesh geometry={geo.screen} material={mat('#f1eefb', { roughness: 0.6, clearcoat: 0.3 })} position={[0, 0, 0.125]} />
      <mesh geometry={geo.header} material={mat('#16c79a', { roughness: 0.4 })} position={[0, 0, 0.127]} />
      <Label text="Maya · WhatsApp" position={[0.02, 1.23, 0.13]} width={1.1} />
      {BUBBLES.map((b, i) => (
        <group key={i} ref={(el) => (refs.current[i] = el)} position={[b.side * (0.62 - b.w / 2), 0.62 - i * 0.46, 0.14]}>
          <mesh geometry={bubbleGeos[i]} material={mat(b.color, { roughness: 0.4 })} />
          <mesh position={[-b.w * 0.12, 0.03, 0.035]} material={mat('#9a97ab', { roughness: 0.7, clearcoat: 0 })}>
            <boxGeometry args={[b.w * 0.62, 0.045, 0.01]} />
          </mesh>
          <mesh position={[-b.w * 0.2, -0.06, 0.035]} material={mat('#c3c0d2', { roughness: 0.7, clearcoat: 0 })}>
            <boxGeometry args={[b.w * 0.44, 0.04, 0.01]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── 3D bar chart ─── */
const BAR_TARGETS = [
  [0.35, 0.5, 0.42, 0.3],
  [0.45, 0.62, 0.55, 0.5],
  [0.55, 0.8, 0.7, 0.72],
  [0.7, 0.95, 0.88, 1.0],
];
function ChartBars({ story }) {
  const geo = useMemo(() => ({
    base: extrude(roundedRect(-0.95, -0.1, 1.9, 0.2, 0.1), 1.0, 0.04, 3),
    bar: new THREE.BoxGeometry(0.3, 1, 0.3),
  }), []);
  const bars = useRef([]);
  useFrame((_, dt) => {
    const t = BAR_TARGETS[story.current.stage];
    bars.current.forEach((b, i) => {
      if (!b) return;
      const h = lerp(b.scale.y, t[i] * 1.6, 1 - Math.exp(-4 * dt));
      b.scale.y = h;
      b.position.y = h / 2;
    });
  });
  const colors = ['#3b9bff', '#7a5cff', '#b04bff', '#16c79a'];
  return (
    <group>
      <mesh geometry={geo.base} material={mat('#ffffff')} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} />
      {colors.map((c, i) => (
        <mesh key={c} ref={(el) => (bars.current[i] = el)} geometry={geo.bar} material={mat(c)} position={[-0.66 + i * 0.44, 0.3, 0]} scale={[1, 0.6, 1]} />
      ))}
    </group>
  );
}

/* ─── composition + placement ─── */
// Pause rendering entirely while the scene is hidden (after its fade-out).
function FrameGate({ reduce }) {
  const setFrameloop = useThree((s) => s.setFrameloop);
  useEffect(() => {
    let t;
    const sync = (s) => {
      clearTimeout(t);
      if (s.mode === 'far') t = setTimeout(() => setFrameloop('never'), 700);
      else setFrameloop(reduce ? 'demand' : 'always');
    };
    sync(scene);
    const off = scene.on(sync);
    return () => { off(); clearTimeout(t); };
  }, [setFrameloop, reduce]);
  return null;
}

function Workspace() {
  const root = useRef();
  const inner = useRef();
  const lastMode = useRef(scene.mode);
  const story = useStory();
  const { viewport } = useThree();
  usePointer();

  useLayoutEffect(() => {
    if (scene.mode !== 'intro') return;
    root.current.position.set(0, -7, -4);
    root.current.scale.setScalar(0.2);
    inner.current.rotation.set(0.9, -2.4, 0);
  }, []);

  useFrame((s, dt) => {
    const vw = viewport.width, vh = viewport.height;
    const narrow = vw / vh < 0.95;
    const fit = Math.min(vw * 0.5, vh * 1.25) / 11.2;
    let x = 0, y = 0, z = 0, sc;
    switch (scene.mode) {
      case 'intro': sc = narrow ? vw / 10.2 : Math.min(vw * 0.82, vh * 1.45) / 11.2; x = 0; y = narrow ? 0.4 : -0.2; break;
      case 'hero': sc = narrow ? vw / 11.2 : fit; x = narrow ? 0 : vw * 0.225; y = narrow ? vh * 0.24 : -0.1; break;
      case 'left': sc = narrow ? vw / 11.2 : fit; x = narrow ? 0 : -vw * 0.235; y = narrow ? vh * 0.24 : -0.1; break;
      default: sc = Math.min(vw, vh * 1.4) / 12.5; z = -3; y = 0;
    }
    // Returning from hidden: it was invisible, so jump straight to the new
    // spot (the CSS fade-in does the reveal) instead of sliding over content.
    const snap = lastMode.current === 'far' && scene.mode !== 'far';
    lastMode.current = scene.mode;
    const k = snap ? 1 : 1 - Math.pow(scene.mode === 'intro' ? 0.12 : 0.06, dt);
    const r = root.current;
    r.position.set(lerp(r.position.x, x, k), lerp(r.position.y, y, k), lerp(r.position.z, z, k));
    r.scale.setScalar(lerp(r.scale.x, sc, k));
    // gentle idle sway + pointer parallax + scroll turn
    const t = s.clock.elapsedTime;
    inner.current.rotation.y = lerp(inner.current.rotation.y, -0.38 + pointer.x * 0.22 + Math.sin(t * 0.25) * 0.05 + Math.min(window.scrollY * 0.00025, 0.35), k);
    inner.current.rotation.x = lerp(inner.current.rotation.x, 0.18 - pointer.y * 0.1, k);
  });

  return (
    <group ref={root}>
      <group ref={inner}>
        {/* the board lies back like a tablet on a desk */}
        <group position={[-0.5, -0.4, 0]} rotation={[-0.92, 0, 0]}>
          <Board story={story} />
        </group>
        <group position={[4.1, 0.55, 1.5]} rotation={[-0.05, -0.5, 0.05]}>
          <Phone story={story} />
        </group>
        <group position={[-4.6, -1.35, 1.2]} rotation={[0, 0.5, 0]} scale={0.8}>
          <ChartBars story={story} />
        </group>
        <Floater position={[-3.6, 2.5, -0.4]} phase={0.3} depth={0.6} amp={0.14}><group scale={0.5}><LogoTile /></group></Floater>
        <Floater position={[-1.3, 2.7, 0.8]} phase={1.8} depth={1.1}><group scale={0.42}><ChatBubble /></group></Floater>
        <Floater position={[1.6, 2.6, 0.2]} phase={3.4} depth={0.9} speed={0.9}><group scale={0.4}><Envelope /></group></Floater>
        <Floater position={[4.5, 2.9, -0.6]} phase={4.6} depth={0.8} speed={1.1}><group scale={0.4}><Contact /></group></Floater>
        <Shadow y={-2.5} width={11} depth={3.2} />
      </group>
    </group>
  );
}

export default function Universe({ onReady }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <Canvas
      dpr={mobile ? [1, 1.3] : [1, 1.6]}
      camera={{ position: [0, 0, 16], fov: 32 }}
      frameloop={reduce ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.NeutralToneMapping; gl.setClearColor(0x000000, 0); requestAnimationFrame(() => onReady?.()); }}
      style={{ pointerEvents: 'none' }}
    >
      <Lighting />
      <FrameGate reduce={reduce} />
      <Workspace />
    </Canvas>
  );
}
