// Shared state between the page (UniverseHost) and the 3D workspace
// (three/Universe.jsx). Plain object + listeners — no React state, so the
// 3D scene can read it every frame without re-rendering.
//   mode   'intro' | 'hero' | 'left' | 'far'  (far = hidden & paused)
//   stage  0–3, the pipeline stage the demo lead is in
export const scene = {
  mode: 'hero',
  stage: 0,
  introDone: false,
  listeners: new Set(),
  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  emit() { this.listeners.forEach((fn) => fn(this)); },
  setMode(m) { if (m !== this.mode) { this.mode = m; this.emit(); } },
  setStage(s) { if (s !== this.stage) { this.stage = s; this.emit(); } },
  finishIntro() { if (!this.introDone) { this.introDone = true; this.emit(); } },
};
