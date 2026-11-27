/* Monili VLR graphics: one point-cloud engine for every product shape.
   Same stroke, same holographic palette, same motion everywhere, so the previews read as one family.
   Shapes: ring, building, redact, shield, transit, globe, orb. Each returns N points in [-1, 1]^3. */
(() => {
  'use strict';
  const N = 960;       // points per shape: dense lines, small points
  const D = 2;         // line density: points along every segment and ring
  const TAU = Math.PI * 2;
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const fill = (pts) => { const out = []; for (let i = 0; i < N; i++) out.push(pts[i % pts.length]); return out; };
  const seg = (a, b, n, out) => { n *= D; for (let i = 0; i <= n; i++) { const t = i / n; out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]); } };
  const box = (x0, x1, y0, y1, z0, z1, n, out) => {
    const P = [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
    [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]].forEach(([a, b]) => seg(P[a], P[b], n, out));
  };
  const SHAPES = {
    ring() { // GemCore: a ring with a twisted band
      const o = []; for (let i = 0; i < N; i++) { const u = (i / N) * TAU * 1, v = (i * 0.618 % 1) * TAU; const R = .62, r = .17 + .05 * Math.sin(3 * u + v);
        o.push([(R + r * Math.cos(v)) * Math.cos(u), r * Math.sin(v) * 1.2, (R + r * Math.cos(v)) * Math.sin(u)]); } return o; },
    building() { // Gapsman: two volumes, the upper one cantilevered
      const o = []; box(-.75, .35, .2, .62, -.35, .35, 12, o); box(-.45, .85, -.42, .2, -.42, .42, 12, o);
      for (let i = 0; i < 6; i++) seg([-.45 + i * .26, -.42, .42], [-.45 + i * .26, .2, .42], 6, o);
      seg([-.9, .62, .5], [.9, .62, .5], 18, o); return fill(o); },
    redact() { // ThirdBrain-PII: a page of text where names are blacked out
      const o = []; for (let row = 0; row < 11; row++) { const y = -.75 + row * .14; const len = .6 + .4 * Math.sin(row * 1.7) ** 2;
        for (let i = 0; i < 26 * D; i++) { const u = i / D; const x = -.7 + (u / 25) * 1.4 * len; const red = (row % 3 === 1 && u > 5 && u < 14) || (row % 4 === 2 && u > 15 && u < 22);
          o.push([x, y, 0]); if (red) { o.push([x, y + .03, .04]); o.push([x, y - .03, .04]); } } }
      seg([-.82, -.9, 0], [.82, -.9, 0], 20, o); seg([-.82, .9, 0], [.82, .9, 0], 20, o); seg([-.82, -.9, 0], [-.82, .9, 0], 20, o); seg([.82, -.9, 0], [.82, .9, 0], 20, o);
      return fill(o); },
    shield() { // T-Shadow: a shield with a scanning ring
      const o = []; for (let i = 0; i < 160 * D; i++) { const t = i / (160 * D - 1); const a = -Math.PI / 2 + t * Math.PI; const x = .75 * Math.cos(a), y = -.15 + .6 * Math.sin(a) * (a > 0 ? 1.5 : .45);
        o.push([x, -y, 0]); }
      for (let k = 1; k <= 3; k++) for (let i = 0; i < 70 * D; i++) { const a = i / (70 * D) * TAU; o.push([Math.cos(a) * .22 * k, Math.sin(a) * .22 * k - .05, .02 * k]); }
      seg([0, -.05, 0], [.55, -.6, 0], 24, o); return fill(o); },
    transit() { // Vertex: lines of a transit map with stations
      const o = []; const L = [[[-.9, -.5, 0], [-.3, -.5, 0], [.1, -.1, 0], [.9, -.1, 0]], [[-.6, .8, 0], [-.6, .1, 0], [0, -.5, 0], [0, -.9, 0]], [[-.9, .4, 0], [.3, .4, 0], [.7, .8, 0]]];
      L.forEach(line => { for (let i = 0; i < line.length - 1; i++) seg(line[i], line[i + 1], 22, o); line.forEach(p => { for (let j = 0; j < 14 * D; j++) { const a = j / (14 * D) * TAU; o.push([p[0] + .06 * Math.cos(a), p[1] + .06 * Math.sin(a), .05]); } }); });
      return fill(o); },
    globe() { // Claude VPN MCP: a globe with an exit arc
      const o = []; for (let i = 0; i < 380 * D; i++) { const y = 1 - (i / (380 * D - 1)) * 2, r = Math.sqrt(1 - y * y), a = i * 2.39996; o.push([r * Math.cos(a) * .78, y * .78, r * Math.sin(a) * .78]); }
      for (let i = 0; i <= 60 * D; i++) { const t = i / (60 * D), a = -1.2 + t * 2.2; const h = .78 + .35 * Math.sin(t * Math.PI); o.push([Math.cos(a) * h, .35 + .15 * Math.sin(t * Math.PI), Math.sin(a) * h]); }
      return fill(o); },
    orb() { const o = []; for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), a = i * 2.39996; o.push([r * Math.cos(a) * .8, y * .8, r * Math.sin(a) * .8]); } return o; }
  };
  // flat shapes swing gently instead of spinning, so they never turn edge-on
  const PLANAR = { redact: 1, shield: 1, transit: 1 };
  const TILT = { ring: -.95, building: -.42, globe: -.3, orb: -.3 };
  const cache = {};
  const shape = (name) => cache[name] || (cache[name] = fill((SHAPES[name] || SHAPES.orb)()));

  // holographic palette: mint, periwinkle, pink, peach
  const PAL = [[14, 159, 142], [79, 70, 229], [181, 39, 200], [226, 100, 26]];   // dark tones of the holographic palette, for white screens
  const holo = (t) => { t = ((t % 1) + 1) % 1 * PAL.length; const i = Math.floor(t), f = t - i, a = PAL[i], b = PAL[(i + 1) % PAL.length];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]; };
  // colours are computed once: 64 hues x 8 transparencies, so a frame allocates no strings
  const HUES = 64, ALPHAS = 8;
  const COL = Array.from({ length: HUES }, (_, h) => { const c = holo(h / HUES); return Array.from({ length: ALPHAS }, (_, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${(.35 + (a / (ALPHAS - 1)) * .6).toFixed(2)})`); });

  /* Quality adapts to the computer: a slow or busy machine gets fewer points, a lower resolution
     and fewer frames, so the page itself always stays responsive. */
  const lowEnd = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  const Q = { step: lowEnd ? 2 : 1, dprMax: lowEnd ? 1 : 1.5, frameMs: lowEnd ? 42 : 33 };

  /* A stage renders one shape (or a morph between shapes) on a canvas. */
  function Stage(canvas, opts = {}) {
    const ctx = canvas.getContext('2d');
    const st = { name: opts.shape || 'orb', from: shape(opts.shape || 'orb'), to: shape(opts.shape || 'orb'), k: 1, t0: 0, rot: rnd() * TAU, speed: opts.speed || .25, accent: opts.accent || null, scale: opts.scale || .38, hover: 0 };
    const jitter = Array.from({ length: N }, () => [rnd() - .5, rnd() - .5, rnd() - .5]);
    let w = 0, h = 0, dpr = 1;
    const size = () => { dpr = Math.min(Q.dprMax, window.devicePixelRatio || 1); const r = canvas.getBoundingClientRect(); w = r.width; h = r.height; canvas.width = Math.max(1, w * dpr); canvas.height = Math.max(1, h * dpr); };
    size();
    const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    function draw(now, dt) {
      if (!w) size();
      st.rot += dt * st.speed * (1 + st.hover * 2.5);
      const k = st.k < 1 ? Math.min(1, (now - st.t0) / 1400) : 1; if (st.k < 1) st.k = k;
      const ang = PLANAR[st.name] ? .55 * Math.sin(st.rot * 1.4) : st.rot, tilt = PLANAR[st.name] ? -.12 : (TILT[st.name] ?? -.32);
      const e = ease(k), cy = Math.cos(ang), sy = Math.sin(ang), ct = Math.cos(tilt), stl = Math.sin(tilt);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      const S = Math.min(w, h) * st.scale * 2.1, cx = w / 2, cyy = h / 2;
      const P = [];
      for (let i = 0; i < N; i += Q.step) {
        const a = st.from[i], b = st.to[i], j = jitter[i];
        const sc = Math.sin(Math.PI * e) * .35; // points scatter mid-morph, like a thought re-forming
        let x = a[0] + (b[0] - a[0]) * e + j[0] * sc, y = a[1] + (b[1] - a[1]) * e + j[1] * sc, z = a[2] + (b[2] - a[2]) * e + j[2] * sc;
        const x1 = x * cy - z * sy, z1 = x * sy + z * cy; const y1 = y * ct - z1 * stl, z2 = y * stl + z1 * ct;
        const p = 2.6 / (2.6 + z2); P.push([cx + x1 * S * p, cyy - y1 * S * p, z2, i]);
      }
      P.sort((m, n) => n[2] - m[2]);
      for (const [x, y, z, i] of P) {
        const depth = Math.max(0, Math.min(1, (1 - z) / 2)), hue = (((i / N + st.rot * .05 + x / (w * 3)) % 1) + 1) % 1;
        const r = (.45 + depth * .95) * Math.max(.8, Math.min(1.3, S / 220)) * (Q.step > 1 ? 1.3 : 1);
        ctx.fillStyle = COL[(hue * HUES) | 0][(depth * (ALPHAS - 1) + .5) | 0];
        ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      }
      if (st.accent) { // the product's own colour, only as one small beacon
        const q = P[P.length - 1]; ctx.fillStyle = st.accent; ctx.shadowColor = st.accent; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.arc(q[0], q[1], 3.4, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
      }
    }
    return {
      draw, size, st,
      morph(name, now) { const cur = this.current(now); st.from = cur; st.to = shape(name); st.name = name; st.k = 0; st.t0 = now; },
      current(now) { const e = st.k < 1 ? ease(Math.min(1, (now - st.t0) / 1400)) : 1; return st.from.map((a, i) => { const b = st.to[i]; return [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e, a[2] + (b[2] - a[2]) * e]; }); }
    };
  }

  /* One animation loop for all stages; only visible stages are drawn. */
  const stages = new Set(), visible = new WeakSet();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)), { rootMargin: '80px' }) : null;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let last = performance.now(), cost = 0, started = false;
  function loop(now) {
    requestAnimationFrame(loop);
    if (reduce || now - last < Q.frameMs) return;          // at most ~30 frames a second, none if motion is reduced
    const dt = Math.min(.08, (now - last) / 1000); last = now;
    const t = performance.now();
    for (const s of stages) if (!io || visible.has(s.canvas)) s.stage.draw(now, dt);
    cost = cost * .9 + (performance.now() - t) * .1;        // average drawing time per frame
    if (cost > 9 && Q.step < 3) { Q.step++; Q.dprMax = 1; Q.frameMs = Math.min(66, Q.frameMs + 12); cost = 0; stages.forEach(s => s.stage.size()); }
  }
  // animations start only after the page has painted its content
  const go = () => { if (started) return; started = true; last = performance.now(); requestAnimationFrame(loop); };
  if (document.readyState === 'complete') setTimeout(go, 200); else addEventListener('load', () => setTimeout(go, 200), { once: true });
  setTimeout(go, 3000);
  function mount(canvas, opts) {
    const stage = Stage(canvas, opts); stages.add({ canvas, stage }); if (io) io.observe(canvas); else visible.add(canvas);
    stage.draw(performance.now(), 0); return stage;
  }
  addEventListener('resize', () => stages.forEach(s => { s.stage.size(); s.stage.draw(performance.now(), 0); }));  // a resize clears a canvas: draw it again at once
  window.MFX = { mount, shapes: Object.keys(SHAPES), reduce };
})();
