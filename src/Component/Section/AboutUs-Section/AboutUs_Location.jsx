import React, { useCallback, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl"; // npm i react-globe.gl
import worldMap from "../../../assets/about-image/countries.json"; // local world map (no network needed)

/* ------------------------------------------------------------------
   "Where to find us" — interactive dotted globe.

   Setup:  npm i react-globe.gl
   Usage:  import AboutUsLocation from "./AboutUs_location";
           <AboutUsLocation />

   Needs two things: `npm i react-globe.gl` and countries.json (world map)
   saved next to your other images, matching the import path above.

   - Auto-rotates; drag with the cursor to spin it in any direction.
   - Auto-rotation pauses while dragging and resumes shortly after release.
   - The "StarOps Technologies" label fades in whenever Noida faces the
     viewer, and fades out when it rotates to the far side.
------------------------------------------------------------------- */

// Noida (same coordinates as the hero)
const OFFICE = { lat: 28.48847, lng: 77.5071, name: "StarOps Technologies" };

// Globe spin speed. Positive = front surface moves left -> right.
// Flip the sign (e.g. -0.7) to spin the other way.
const AUTO_ROTATE_SPEED = 0.7;
const RESUME_AFTER_DRAG_MS = 1400;

const LAND = worldMap.features;

// stable references (new arrays/functions on every render would make the globe rebuild its layers)
const OFFICE_DATA = [OFFICE];
const landColor = () => "rgba(196,219,255,0.95)";
const ringColor = () => (t) => `rgba(141,180,255,${(1 - t) * 0.9})`;

const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap');
.al-sans { font-family: 'Inter Tight', system-ui, sans-serif; }

.al-rv { opacity: 0; transform: translateY(30px); filter: blur(8px);
  transition: opacity .9s cubic-bezier(.22,1,.36,1), transform 1.1s cubic-bezier(.22,1,.36,1), filter .9s cubic-bezier(.22,1,.36,1);
  transition-delay: var(--d, 0ms); }
.al-rv.is-in { opacity: 1; transform: none; filter: blur(0); }

.al-globe-wrap { opacity: 0; transform: scale(.92); transition: opacity 1.4s ease .2s, transform 1.8s cubic-bezier(.22,1,.36,1) .2s; }
.al-globe-wrap.is-in { opacity: 1; transform: none; }

/* grab cursor */
.al-globe canvas { cursor: grab; touch-action: pan-y; }
.al-globe.is-drag canvas { cursor: grabbing; }

/* location pin + label (elements are created by the globe, so these are global) */
.al-pin { pointer-events: none; }
.al-pin-inner { position: relative; width: 0; height: 0; opacity: 0; will-change: opacity, transform; }
.al-dot { position: absolute; left: -5px; top: -5px; width: 10px; height: 10px; border-radius: 999px; background: #8db4ff;
  box-shadow: 0 0 0 3px rgba(141,180,255,.25), 0 0 18px 4px rgba(141,180,255,.6); }
.al-tag { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; gap: 10px; white-space: nowrap;
  padding: 7px 12px 7px 14px; border-radius: 999px; background: rgba(12,18,38,.88); border: 1px solid rgba(180,205,255,.22);
  color: #fff; font: 500 clamp(12px, 1vw, 16px)/1 'Inter Tight', system-ui, sans-serif; letter-spacing: -.01em;
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.al-tag i { font-style: normal; font-weight: 400; opacity: .65; font-size: 1.15em; }
.al-tag::after { content: ""; position: absolute; left: 100%; top: 50%; width: 10px; height: 1px; background: rgba(180,205,255,.5); }

@media (prefers-reduced-motion: reduce) {
  .al-rv, .al-globe-wrap { transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
}
`;

function Spark({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill="currentColor">
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

function Pin({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function AboutUsLocation() {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const globeRef = useRef(null);
  const pinRef = useRef(null); // the inner element of the label (we fade it)
  const resumeTimer = useRef(0);

  const [mounted, setMounted] = useState(false); // client-only (WebGL)
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [dense, setDense] = useState(true);

  useEffect(() => {
    setMounted(true);
    setDense(window.innerWidth >= 768);
  }, []);

  // keep the canvas the same size as its wrapper (responsive)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width > 0 && height > 0) setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted]);

  // reveal + pause rendering when off screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setInView(en.isIntersecting), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g || !ready) return;
    try {
      inView ? g.resumeAnimation() : g.pauseAnimation();
    } catch (_) {}
  }, [inView, ready]);

  // label visibility: fade in only while Noida faces the camera
  useEffect(() => {
    if (!ready || !inView) return;
    let raf = 0;
    const tick = () => {
      const g = globeRef.current;
      const pin = pinRef.current;
      if (g && pin) {
        try {
          const c = g.camera().position;
          const p = g.getCoords(OFFICE.lat, OFFICE.lng, 0);
          const dot = (c.x * p.x + c.y * p.y + c.z * p.z) / (Math.hypot(c.x, c.y, c.z) * Math.hypot(p.x, p.y, p.z));
          // horizon is ~0.3 at this camera distance; fade across a small band in front of it
          const o = clamp((dot - 0.34) / 0.22, 0, 1);
          pin.style.opacity = String(o);
          pin.style.transform = `scale(${0.88 + 0.12 * o})`;
        } catch (_) {}
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, inView]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const onGlobeReady = () => {
    const g = globeRef.current;
    if (!g) return;
    try {
      // dark, matte sphere under the dots
      const mat = g.globeMaterial();
      mat.color.set("#070b16");
      mat.emissive?.set("#050913");
      mat.shininess = 0;

      const controls = g.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.7;

      // start with Asia facing the viewer
      g.pointOfView({ lat: 24, lng: 60, altitude: 2.3 }, 0);
    } catch (_) {}
    setReady(true);
  };

  // pause auto-rotate while dragging, resume shortly after release
  const startDrag = () => {
    clearTimeout(resumeTimer.current);
    setDragging(true);
    try {
      globeRef.current.controls().autoRotate = false;
    } catch (_) {}
  };
  const endDrag = () => {
    setDragging(false);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      try {
        globeRef.current.controls().autoRotate = true;
      } catch (_) {}
    }, RESUME_AFTER_DRAG_MS);
  };

  // DOM element for the label (created once by the globe)
  const makePin = useCallback(() => {
    const root = document.createElement("div");
    root.className = "al-pin";
    root.innerHTML = `<div class="al-pin-inner"><span class="al-dot"></span><span class="al-tag">${OFFICE.name}<i>+</i></span></div>`;
    pinRef.current = root.firstChild;
    return root;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="al-sans relative isolate overflow-hidden bg-[#05070a] px-6 pb-[clamp(40px,6vw,96px)] pt-[clamp(28px,3vw,56px)] text-white sm:px-10 md:px-[3vw] lg:min-h-svh"
      aria-label="Where to find us"
    >
      <style>{styles}</style>

      {/* text */}
      <div className="relative z-10 max-w-[1750px] lg:max-w-[46vw]">
        <div className={`al-rv ${inView ? "is-in" : ""} flex items-center gap-2 text-[clamp(14px,1.05vw,18px)] font-medium`}>
          <Spark className="h-[1.1em] w-[1.1em]" />
          <span>Office</span>
        </div>

        <h2
          className={`al-rv ${inView ? "is-in" : ""} mt-[clamp(12px,1.4vw,24px)] bg-clip-text pb-[0.08em] text-[clamp(44px,6.4vw,124px)] font-medium leading-[1.04] tracking-[-0.05em] text-transparent`}
          style={{ "--d": "100ms", backgroundImage: "linear-gradient(180deg,#ffffff 25%,rgba(255,255,255,.38) 100%)", WebkitBackgroundClip: "text" }}
        >
          Where to find us
        </h2>

        <p
          className={`al-rv ${inView ? "is-in" : ""} mt-[clamp(14px,1.6vw,28px)] max-w-[36em] text-[clamp(15px,1.45vw,24px)] leading-[1.35] tracking-[-0.01em] text-white/45`}
          style={{ "--d": "220ms" }}
        >
          StarOps Technologies operates globally, helping businesses build, scale and innovate with modern technology
          solutions.
        </p>

        <p
          className={`al-rv ${inView ? "is-in" : ""} mt-[clamp(16px,1.8vw,32px)] flex flex-wrap items-center gap-x-2 gap-y-1 text-[clamp(12px,1.1vw,19px)] tracking-[-0.005em] text-white/75`}
          style={{ "--d": "340ms" }}
        >
          <Pin className="h-[1.15em] w-[1.15em] shrink-0" />
          <span>GLOBAL TEAM</span>
          <span aria-hidden="true">•</span>
          <span>REMOTE FIRST</span>
          <span aria-hidden="true">•</span>
          <span>WORLDWIDE IMPACT</span>
        </p>
      </div>

      {/* globe */}
      <div
        ref={wrapRef}
        className={`al-globe-wrap ${inView ? "is-in" : ""} relative z-0 mx-auto mt-[clamp(8px,4vw,32px)] aspect-square w-full max-w-[620px] lg:absolute lg:right-[-2vw] lg:top-1/2 lg:mt-0 lg:w-[min(56vw,1000px)] lg:max-w-none lg:-translate-y-1/2`}
      >
        <div
          className={`al-globe h-full w-full ${dragging ? "is-drag" : ""}`}
          onPointerDown={startDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={() => dragging && endDrag()}
          role="img"
          aria-label={`Interactive globe showing our office in Noida, India. Drag to rotate.`}
        >
          {mounted && (
            <Globe
              ref={globeRef}
              width={size.w}
              height={size.h}
              backgroundColor="rgba(0,0,0,0)"
              onGlobeReady={onGlobeReady}
              /* dotted land */
              hexPolygonsData={LAND}
              hexPolygonResolution={dense ? 4 : 3}
              hexPolygonMargin={0.3}
              hexPolygonUseDots
              hexPolygonAltitude={0.004}
              hexPolygonColor={landColor}
              /* soft rim glow */
              showAtmosphere
              atmosphereColor="#6f9bff"
              atmosphereAltitude={0.14}
              /* pulsing ring on the office */
              ringsData={OFFICE_DATA}
              ringLat="lat"
              ringLng="lng"
              ringColor={ringColor}
              ringMaxRadius={4}
              ringPropagationSpeed={2}
              ringRepeatPeriod={1500}
              /* label (fades in/out via the loop above) */
              htmlElementsData={OFFICE_DATA}
              htmlLat="lat"
              htmlLng="lng"
              htmlAltitude={0.01}
              htmlElement={makePin}
            />
          )}
        </div>
      </div>
    </section>
  );
}