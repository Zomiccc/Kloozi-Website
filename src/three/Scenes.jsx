// ═══════════════════════════════════════════════════════════════════
// FLAZYN — 3D SCENES (lazy-loaded chunk; never part of the first paint)
//
// Everything here is procedural — no model files to download.
//   HeroScene   the extruded Flazyn logo tile, orbited by glossy
//               channel objects (chat bubble, envelope, chart, contact,
//               automation bolt). Follows the pointer; click to spin.
//   MascotScene "Flazzy", an original mascot: eyes track the pointer,
//               blinks, waves, and hops when clicked.
// ═══════════════════════════════════════════════════════════════════
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/* ─── shared pointer (window-wide, so objects react even when the
       cursor is over the text next to the canvas) ─── */
export const pointer = { x: 0, y: 0 };
export function usePointer() {
  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
}

const lerp = THREE.MathUtils.lerp;

/* ─── geometry helpers ─── */
export function roundedRect(x, y, w, h, r, shape = new THREE.Shape()) {
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x + w, y + h - r);
  shape.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(x + r, y + h);
  shape.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + r);
  shape.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return shape;
}

export function extrude(shapes, depth, bevel = 0.06, segments = 5) {
  const g = new THREE.ExtrudeGeometry(shapes, {
    depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * 0.85,
    bevelSegments: segments, curveSegments: 28,
  });
  g.center();
  return g;
}

/* Paint a violet → orchid → coral gradient into vertex colours. */
const STOPS = ['#7a5cff', '#b04bff', '#ff6b4a'].map((c) => new THREE.Color(c));
function paintFlare(geometry) {
  geometry.computeBoundingBox();
  const { min, max } = geometry.boundingBox;
  const pos = geometry.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const tx = (pos.getX(i) - min.x) / (max.x - min.x);
    const ty = (max.y - pos.getY(i)) / (max.y - min.y);
    const t = THREE.MathUtils.clamp(tx * 0.6 + ty * 0.4, 0, 1);
    if (t < 0.5) c.copy(STOPS[0]).lerp(STOPS[1], t * 2);
    else c.copy(STOPS[1]).lerp(STOPS[2], (t - 0.5) * 2);
    colors.set([c.r, c.g, c.b], i * 3);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function starShape(cx, cy, outer, inner) {
  const s = new THREE.Shape();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / 8) * Math.PI * 2 + Math.PI / 2;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    if (i === 0) s.moveTo(px, py); else s.lineTo(px, py);
  }
  s.closePath();
  return s;
}

/* A soft radial shadow texture for "contact" shadows. */
export function useShadowTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(60,30,160,0.55)');
    grd.addColorStop(1, 'rgba(60,30,160,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
}

export function Shadow({ y, width = 3, depth = 1 }) {
  const map = useShadowTexture();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} scale={[width, depth, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={map} transparent depthWrite={false} opacity={0.6} />
    </mesh>
  );
}

/* Image-based lighting from three's built-in RoomEnvironment — gives the
   glossy clear-coat reflections without fetching an HDR file. */
export function Lighting() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.9;
    return () => { scene.environment = null; env.dispose(); pmrem.dispose(); };
  }, [gl, scene]);
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <pointLight position={[-5, -2, 4]} intensity={25} color="#ff8a6b" />
      <pointLight position={[5, 3, 2]} intensity={18} color="#8f7bff" />
    </>
  );
}

export const glossy = (color, extra = {}) =>
  new THREE.MeshPhysicalMaterial({ color, roughness: 0.28, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.12, ...extra });

/* ═════════════════════════ HERO ═════════════════════════ */

export function LogoTile() {
  const ref = useRef();
  const spin = useRef(0);
  const [hover, setHover] = useState(false);

  const { tile, glyph, spark, tileMat, whiteMat, glyphZ } = useMemo(() => {
    // Geometry mirrors the SVG mark (64-unit grid → world units / 20).
    const tile = paintFlare(extrude(roundedRect(-1.4, -1.325, 2.8, 2.65, 0.85), 0.5, 0.14, 8));
    const bars = [
      roundedRect(-0.65, -0.775, 0.425, 1.5, 0.2125),
      roundedRect(-0.65, 0.3, 1.3, 0.425, 0.2125),
      roundedRect(-0.65, -0.35, 0.85, 0.4, 0.2),
    ];
    const glyph = new THREE.ExtrudeGeometry(bars, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 5, curveSegments: 20 });
    const spark = new THREE.ExtrudeGeometry(starShape(0.625, -0.275, 0.2, 0.07), { depth: 0.14, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 3 });
    return {
      tile, glyph, spark,
      glyphZ: 0.25 + 0.14 - 0.02,
      tileMat: glossy('#ffffff', { vertexColors: true, roughness: 0.22 }),
      whiteMat: glossy('#ffffff', { roughness: 0.18 }),
    };
  }, []);

  useFrame((state, dt) => {
    const g = ref.current;
    const t = state.clock.elapsedTime;
    g.rotation.y = lerp(g.rotation.y, spin.current + pointer.x * 0.5 + Math.sin(t * 0.6) * 0.12, 1 - Math.pow(0.02, dt));
    g.rotation.x = lerp(g.rotation.x, -pointer.y * 0.3 + Math.sin(t * 0.8) * 0.05, 1 - Math.pow(0.02, dt));
    g.position.y = Math.sin(t * 1.1) * 0.12;
    const s = hover ? 1.06 : 1;
    g.scale.setScalar(lerp(g.scale.x, s, 1 - Math.pow(0.001, dt)));
  });

  return (
    <group
      ref={ref}
      onClick={(e) => { e.stopPropagation(); spin.current += Math.PI * 2; }}
      onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = ''; }}
    >
      <mesh geometry={tile} material={tileMat} />
      <mesh geometry={glyph} material={whiteMat} position={[0, 0, glyphZ]} />
      <mesh geometry={spark} material={whiteMat} position={[0, 0, glyphZ]} />
    </group>
  );
}

/* Floating wrapper: bob, sway and parallax toward the pointer. */
export function Floater({ position, depth = 1, speed = 1, phase = 0, amp = 0.18, children, spinY = 0.5 }) {
  const ref = useRef();
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime * speed + phase;
    const g = ref.current;
    const k = 1 - Math.pow(0.05, dt);
    g.position.x = lerp(g.position.x, position[0] + pointer.x * 0.25 * depth, k);
    g.position.y = lerp(g.position.y, position[1] + Math.sin(t) * amp + pointer.y * 0.18 * depth, k);
    g.position.z = position[2];
    g.rotation.y = Math.sin(t * 0.7) * spinY + pointer.x * 0.4;
    g.rotation.x = Math.cos(t * 0.6) * 0.18 - pointer.y * 0.2;
    g.rotation.z = Math.sin(t * 0.5) * 0.08;
  });
  return <group ref={ref} position={position}>{children}</group>;
}

export function ChatBubble() {
  const { body, dot, mat, white } = useMemo(() => {
    const s = roundedRect(-0.55, -0.35, 1.1, 0.75, 0.3);
    const tail = new THREE.Shape();
    tail.moveTo(-0.35, -0.3); tail.lineTo(-0.5, -0.6); tail.lineTo(-0.08, -0.33); tail.closePath();
    return { body: extrude([s, tail], 0.22, 0.07), dot: new THREE.SphereGeometry(0.075, 20, 20), mat: glossy('#19c99b'), white: glossy('#ffffff') };
  }, []);
  return (
    <group>
      <mesh geometry={body} material={mat} />
      {[-0.25, 0, 0.25].map((x) => <mesh key={x} geometry={dot} material={white} position={[x, 0.04, 0.2]} />)}
    </group>
  );
}

export function Envelope() {
  const { body, flap, mat, paper } = useMemo(() => {
    const f = new THREE.Shape();
    f.moveTo(-0.5, 0.32); f.lineTo(0.5, 0.32); f.lineTo(0, -0.06); f.closePath();
    return {
      body: extrude(roundedRect(-0.55, -0.37, 1.1, 0.74, 0.12), 0.18, 0.05),
      flap: extrude(f, 0.03, 0.02, 2),
      mat: glossy('#ff6b4a'),
      paper: glossy('#fff1ec'),
    };
  }, []);
  return (
    <group>
      <mesh geometry={body} material={mat} />
      <mesh geometry={flap} material={paper} position={[0, 0.12, 0.15]} />
    </group>
  );
}

export function Chart() {
  const { bars, base, mat, baseMat } = useMemo(() => ({
    bars: [0.45, 0.75, 1.05].map((h) => extrude(roundedRect(-0.11, 0, 0.22, h, 0.1), 0.22, 0.04)),
    base: extrude(roundedRect(-0.55, -0.08, 1.1, 0.16, 0.08), 0.4, 0.04),
    mat: glossy('#3b9bff'),
    baseMat: glossy('#ffffff'),
  }), []);
  return (
    <group>
      <mesh geometry={base} material={baseMat} position={[0, -0.55, 0]} />
      {bars.map((g, i) => {
        const h = [0.45, 0.75, 1.05][i];
        return <mesh key={i} geometry={g} material={mat} position={[-0.32 + i * 0.32, -0.47 + h / 2, 0]} />;
      })}
    </group>
  );
}

export function Contact() {
  const { card, head, body, cardMat, sun } = useMemo(() => ({
    card: extrude(roundedRect(-0.45, -0.52, 0.9, 1.04, 0.22), 0.16, 0.05),
    head: new THREE.SphereGeometry(0.19, 32, 32),
    body: new THREE.CapsuleGeometry(0.2, 0.12, 8, 24),
    cardMat: glossy('#ffffff'),
    sun: glossy('#ffb62e'),
  }), []);
  return (
    <group>
      <mesh geometry={card} material={cardMat} />
      <mesh geometry={head} material={sun} position={[0, 0.16, 0.18]} />
      <mesh geometry={body} material={sun} position={[0, -0.26, 0.12]} rotation={[0, 0, Math.PI / 2]} scale={[0.8, 1.3, 0.6]} />
    </group>
  );
}

export function Bolt() {
  const { geo, mat } = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.12, 0.55); s.lineTo(-0.32, -0.04); s.lineTo(-0.02, -0.04);
    s.lineTo(-0.14, -0.55); s.lineTo(0.32, 0.08); s.lineTo(0.02, 0.08); s.closePath();
    return { geo: extrude(s, 0.18, 0.05), mat: glossy('#a23cf5') };
  }, []);
  return <mesh geometry={geo} material={mat} />;
}

function HeroRig() {
  const { viewport } = useThree();
  usePointer();
  const s = Math.min(1, viewport.width / 6.6);
  return (
    <group scale={s}>
      <LogoTile />
      <Floater position={[-2.35, 1.25, 0.4]} phase={0} depth={1.2}><ChatBubble /></Floater>
      <Floater position={[2.3, 1.45, -0.2]} phase={1.7} depth={0.8} speed={0.9}><Envelope /></Floater>
      <Floater position={[2.35, -1.25, 0.5]} phase={3.1} depth={1.3} speed={1.1}><Chart /></Floater>
      <Floater position={[-2.3, -1.35, -0.1]} phase={4.4} depth={0.9} speed={0.95}><Contact /></Floater>
      <Floater position={[0.15, 2.2, -1.2]} phase={2.2} depth={0.6} amp={0.12} speed={1.2}><group scale={0.7}><Bolt /></group></Floater>
      <Shadow y={-2.3} width={3.4} depth={1.1} />
    </group>
  );
}

/* ═════════════════════════ MASCOT ═════════════════════════ */

function Flazzy() {
  const root = useRef();
  const bodyRef = useRef();
  const pupils = useRef();
  const eyes = useRef();
  const arm = useRef();
  const tuft = useRef();
  const jump = useRef(-1);

  const m = useMemo(() => ({
    body: glossy('#7a5cff', { roughness: 0.32 }),
    belly: glossy('#d9cfff', { roughness: 0.4 }),
    white: glossy('#ffffff', { roughness: 0.15 }),
    ink: glossy('#1b1640', { roughness: 0.1 }),
    coral: glossy('#ff7a5c'),
    cheek: glossy('#ff9ab0', { roughness: 0.5, clearcoat: 0.3 }),
    sun: glossy('#ffb62e'),
    feet: glossy('#5a3ff0'),
    sphere: new THREE.SphereGeometry(1, 48, 48),
    capsule: new THREE.CapsuleGeometry(0.14, 0.42, 8, 16),
    cone: new THREE.ConeGeometry(0.2, 0.62, 32),
    smile: new THREE.TorusGeometry(0.15, 0.035, 12, 32, Math.PI),
  }), []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const k = 1 - Math.pow(0.02, dt);
    // look toward the pointer
    root.current.rotation.y = lerp(root.current.rotation.y, pointer.x * 0.55, k);
    root.current.rotation.x = lerp(root.current.rotation.x, -pointer.y * 0.22, k);
    pupils.current.position.x = lerp(pupils.current.position.x, pointer.x * 0.07, k);
    pupils.current.position.y = lerp(pupils.current.position.y, pointer.y * 0.06, k);
    // idle breathing / bob
    let y = Math.sin(t * 2) * 0.05;
    let spinY = 0;
    if (jump.current >= 0) {
      jump.current += dt * 1.6;
      const p = jump.current;
      if (p >= 1) jump.current = -1;
      else { y += Math.sin(p * Math.PI) * 0.9; spinY = p * Math.PI * 2; }
    }
    bodyRef.current.position.y = y;
    bodyRef.current.rotation.y = spinY;
    bodyRef.current.scale.y = 1 + Math.sin(t * 4) * 0.012;
    // blink every ~3.5s
    const b = (t % 3.5);
    eyes.current.scale.y = b > 3.35 ? 0.12 : 1;
    // wave
    arm.current.rotation.z = -2.3 + Math.sin(t * 5) * 0.35;
    // flame tuft wobble
    tuft.current.rotation.z = Math.sin(t * 3) * 0.12;
  });

  return (
    <group
      ref={root}
      onClick={(e) => { e.stopPropagation(); if (jump.current < 0) jump.current = 0; }}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = ''; }}
    >
      <group ref={bodyRef}>
        {/* body + belly */}
        <mesh geometry={m.sphere} material={m.body} scale={[1.1, 1.02, 0.98]} />
        <mesh geometry={m.sphere} material={m.belly} position={[0, -0.5, 0.58]} scale={[0.58, 0.42, 0.36]} />
        {/* eyes */}
        <group ref={eyes} position={[0, 0.3, 0]}>
          {[-0.37, 0.37].map((x) => (
            <mesh key={x} geometry={m.sphere} material={m.white} position={[x, 0, 0.8]} scale={[0.26, 0.3, 0.18]} />
          ))}
          <group ref={pupils}>
            {[-0.37, 0.37].map((x) => (
              <group key={x} position={[x, -0.02, 0.96]}>
                <mesh geometry={m.sphere} material={m.ink} scale={[0.13, 0.15, 0.06]} />
                <mesh geometry={m.sphere} material={m.white} position={[0.045, 0.06, 0.05]} scale={0.035} />
              </group>
            ))}
          </group>
        </group>
        {/* cheeks + smile */}
        {[-0.62, 0.62].map((x) => (
          <mesh key={x} geometry={m.sphere} material={m.cheek} position={[x, 0.08, 0.78]} scale={[0.14, 0.08, 0.05]} rotation={[0, x > 0 ? 0.6 : -0.6, 0]} />
        ))}
        <mesh geometry={m.smile} material={m.ink} position={[0, 0.1, 0.99]} rotation={[0.2, 0, Math.PI]} />
        {/* flame tuft */}
        <group ref={tuft} position={[0, 0.98, 0]}>
          <mesh geometry={m.cone} material={m.coral} position={[0, 0.22, 0]} />
          <mesh geometry={m.cone} material={m.sun} position={[-0.2, 0.1, 0.05]} rotation={[0, 0, 0.5]} scale={0.7} />
          <mesh geometry={m.cone} material={m.sun} position={[0.2, 0.1, 0.05]} rotation={[0, 0, -0.5]} scale={0.7} />
        </group>
        {/* arms */}
        <mesh geometry={m.capsule} material={m.body} position={[-1.08, -0.25, 0.1]} rotation={[0, 0, -0.5]} />
        <group ref={arm} position={[1.02, -0.05, 0.1]}>
          <mesh geometry={m.capsule} material={m.body} position={[0, -0.3, 0]} />
        </group>
        {/* feet */}
        {[-0.45, 0.45].map((x) => (
          <mesh key={x} geometry={m.sphere} material={m.feet} position={[x, -1.0, 0.2]} scale={[0.3, 0.15, 0.36]} />
        ))}
      </group>
    </group>
  );
}

function MascotRig() {
  const { viewport } = useThree();
  usePointer();
  // Fill ~80% of the stage height (mascot is ~3.1 units tall).
  const s = Math.min(1.3, (viewport.height * 0.8) / 3.1, (viewport.width * 0.9) / 2.8);
  return (
    <group scale={s} position={[0, -0.05 * s, 0]}>
      <Flazzy />
      <Shadow y={-1.2} width={2.6} depth={0.9} />
    </group>
  );
}

/* ═════════════════════════ canvases ═════════════════════════ */

function Stage({ children, camera, active, onReady }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={camera}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.NeutralToneMapping; gl.setClearColor(0x000000, 0); requestAnimationFrame(() => onReady?.()); }}
    >
      <Lighting />
      {children}
    </Canvas>
  );
}

export function HeroScene(props) {
  return <Stage camera={{ position: [0, 0, 8.6], fov: 38 }} {...props}><HeroRig /></Stage>;
}

export function MascotScene(props) {
  return <Stage camera={{ position: [0, 0.2, 7], fov: 35 }} {...props}><MascotRig /></Stage>;
}
