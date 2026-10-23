import React, { useLayoutEffect, useRef } from "react";
import bgvideo from "../../assets/about-image/video3.mp4";
import g1 from "../../assets/about-image/about-img-1.jpg";
import g2 from "../../assets/about-image/about-img-2.jpg";
import g3 from "../../assets/about-image/about-img-3.jpg";
import g4 from "../../assets/about-image/about-img-4.jpg";
import g5 from "../../assets/about-image/about-img-5.jpg";
import g6 from "../../assets/about-image/about-img-6.jpg";
import g7 from "../../assets/about-image/about-img-7.jpg";
import g8 from "../../assets/about-image/about-img-8.jpg";
import g9 from "../../assets/about-image/about-img-9.jpg";
import MissionSection from "../Section/AboutUs-Section/AboutUs_MissionSection";
import CoreValues from "../Section/AboutUs-Section/AboutUs_CoreValueSection";
import FaqAccordion from "../Common/FAQSection";
import AboutUsLocation from "../Section/AboutUs-Section/AboutUs_Location";
import ContactUs from "../Section/ContactUsSections";

const HEADLINE = "We turn ideas into digital impact".split(" ");

/* Row by row. Index 4 (g5) is the CENTER image that starts zoomed in. */
const IMAGES = [g1, g2, g3, g4, g5, g6, g7, g8, g9];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Playball&family=Instrument+Serif:ital@1&display=swap');

.ab-sans  { font-family: 'Inter Tight', system-ui, sans-serif; }
.ab-serif { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; }
.ab-script{ font-family: 'Playball', cursive; }

@keyframes ab-word  { from { transform: translateY(110%); } to { transform: translateY(0); } }
@keyframes ab-fade  { from { opacity: 0; transform: translateY(18px); filter: blur(6px); } to { opacity: 1; transform: none; filter: blur(0); } }

.ab-word  { display: inline-block; animation: ab-word .95s cubic-bezier(.22,1,.36,1) both; }
.ab-fade  { animation: ab-fade .9s cubic-bezier(.22,1,.36,1) both; }

@media (prefers-reduced-motion: reduce) {
  .ab-word, .ab-fade { animation: none !important; }
}
`;

function PillButton({ href = "/contact", children, dark = true }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-[clamp(20px,2.4vw,40px)] rounded-full py-[3px] pl-[clamp(20px,1.9vw,32px)] pr-[3px] text-[clamp(14px,1.05vw,18px)] font-medium transition duration-300 hover:-translate-y-0.5 ${dark ? "bg-[#07090d] text-white" : "bg-white text-black"
        }`}
    >
      {children}
      <span
        className={`grid h-[clamp(38px,3.1vw,52px)] w-[clamp(38px,3.1vw,52px)] place-items-center rounded-full border transition-transform duration-300 group-hover:translate-x-0.5 ${dark ? "border-[#07090d] bg-white text-black" : "border-white bg-black text-white"
          }`}
      >
        <svg viewBox="0 0 24 24" className="h-[42%] w-[42%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}


function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-black px-6 pb-12 pt-28 sm:px-10 md:px-[3.3vw] md:pt-32">
      {/* background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={bgvideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* dark overlay for text legibility */}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-black/75" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-10rem)] max-w-[1750px] flex-col text-white">
        <div className="flex flex-1 flex-col justify-center py-10">
          <h1 className="max-w-[18ch] text-[clamp(38px,5.6vw,108px)] font-medium leading-[1.08] tracking-[-0.04em] md:max-w-none">
            {HEADLINE.map((w, i) => (
              <React.Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.14em] align-bottom mb-[-0.14em]">
                  <span className="ab-word" style={{ animationDelay: `${150 + i * 90}ms` }}>
                    {w}
                  </span>
                </span>{" "}
              </React.Fragment>
            ))}
          </h1>

          <div className="ab-fade mt-[clamp(24px,3.2vw,56px)] max-w-[40em] md:max-w-[min(48%,36em)]" style={{ animationDelay: "850ms" }}>
            <p className="text-[clamp(15px,1.3vw,24px)] leading-[1.35] tracking-[-0.01em]">
              <span className="text-white">
                At StarOps, we bring together engineering, creativity, and business thinking to turn ideas into products
                people can rely on.
              </span>{" "}
              <span className="text-white/70">
                We build with purpose, solve real challenges, and stay focused on creating technology that moves
                businesses forward.
              </span>
            </p>
            <div className="mt-[clamp(20px,2.2vw,40px)]">
              <PillButton href="/contact" dark={false}>
                Get started
              </PillButton>
            </div>
          </div>
        </div>

        <p className="ab-fade text-[clamp(12px,0.95vw,16px)] tracking-[-0.01em] text-white/90" style={{ animationDelay: "1100ms" }}>
          (28.48847° , 77.5071°)
        </p>
      </div>
    </section>
  );
}

const GAP = 12;
const PAD = 12;
const RADIUS = 16;
const MAX_TILE_RATIO = 1.35; // tablets / desktop: max tile height ÷ tile width
const PHONE_CELL_W = 0.55; // phones: center column = 55% of the screen width
const PHONE_CELL_RATIO = 0.95; // phones: tile height ÷ tile width (near-square tiles)

const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function ZoomGallery() {
  const wrapRef = useRef(null); // tall scroll track
  const stageRef = useRef(null); // sticky viewport-sized stage
  const gridRef = useRef(null); // the 3x3 grid
  const labelRef = useRef(null); // text over the center image
  const tilesRef = useRef([]); // all tiles
  const m = useRef({ W: 0, H: 0, gridW: 0, gridH: 0, S: 3 });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const grid = gridRef.current;
    if (!wrap || !stage || !grid) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* runs on mount and when the stage size really changes (rotate / resize) */
    const measure = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const phone = W < 768;
      const gap = phone ? 14 : GAP;
      const pad = PAD;

      // phones: big center column, side columns + top/bottom rows peek in from the edges
      // tablets / desktop: the whole 3x3 grid fits on screen
      const cellW = phone ? W * PHONE_CELL_W : (W - pad * 2 - gap * 2) / 3;
      const cellH = phone
        ? cellW * PHONE_CELL_RATIO
        : Math.min((H - pad * 2 - gap * 2) / 3, cellW * MAX_TILE_RATIO);

      const gridW = cellW * 3 + gap * 2; // final (zoomed-out) size
      const gridH = cellH * 3 + gap * 2;
      const S = Math.max(W / cellW, H / cellH); // scale at which the CENTER tile covers the stage

      // laid out once at the LARGEST size; scrolling only scales it down with transform
      grid.style.width = `${gridW * S}px`;
      grid.style.height = `${gridH * S}px`;
      grid.style.gap = `${gap * S}px`;

      m.current = { W, H, gridW, gridH, S };
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const { W, H, gridW, gridH, S } = m.current;
      if (!W || !H) return;

      const rect = wrap.getBoundingClientRect();
      const total = Math.max(1, rect.height - H);
      const raw = clamp(-rect.top / total, 0, 1);
      // zoom happens across the first ~85% of the scroll, then it rests
      const p = reduced ? 1 : easeInOut(clamp(raw / 0.85, 0, 1));

      const scale = S + (1 - S) * p; // S → 1  (how big the grid looks on screen)
      const k = scale / S; // transform scale applied to the large layout (1 → 1/S)
      const tx = (W - gridW * scale) / 2;
      const ty = (H - gridH * scale) / 2;

      // transform only → no layout, no layout shift
      grid.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${k})`;

      const radius = (RADIUS * p) / k; // looks full-bleed at the start, 16px once zoomed out
      const sideOpacity = clamp((p - 0.05) / 0.5, 0, 1);

      tilesRef.current.forEach((el, i) => {
        if (!el) return;
        el.style.borderRadius = `${radius}px`;
        el.style.opacity = i === 4 ? "1" : String(sideOpacity);
      });

      const label = labelRef.current;
      if (label) {
        label.style.opacity = String(clamp(1 - p * 2.5, 0, 1));
        label.style.transform = `translateY(${p * -30}px)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    update();

    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(stage);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[320svh] bg-[#05070a]" aria-label="Our work gallery">
      <div ref={stageRef} className="sticky top-0 h-svh w-full overflow-hidden">
        <div
          ref={gridRef}
          className="absolute left-0 top-0 grid origin-top-left grid-cols-3 grid-rows-3 will-change-transform"
        >
          {IMAGES.map((src, i) => (
            <div
              key={i}
              ref={(el) => (tilesRef.current[i] = el)}
              className="relative min-h-0 min-w-0 overflow-hidden bg-[#0d1117]"
            >
              <img
                src={src}
                alt=""
                loading="eager"
                decoding="async"
                draggable="false"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* text that sits on the zoomed-in center image */}
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-6 text-center">
          <p
            ref={labelRef}
            className="max-w-[16ch] text-[clamp(30px,5vw,88px)] font-medium leading-[1.05] tracking-[-0.04em] text-white"
          >
            Built by people who love the craft
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AboutUs() {
  return (
    <main className="ab-sans bg-black text-[#07090d]">
      <style>{styles}</style>
      <Hero />
      <ZoomGallery />
      <MissionSection />
      <CoreValues />
      <FaqAccordion
        label="Find the answer"
        items={[
          { question: "What services do you offer?", answer: "StarOps delivers end-to-end design and no-code/low-code development — from product design and branding to full website and web-app builds, plus ongoing support after launch." },
          { question: "Do you work with startups or only big brands?", answer: "We work with both. From startups building their first product to growing companies and established businesses looking to modernize or scale, we adapt our approach to fit your goals, technology needs, and stage of growth." },
          { question: "How long does a typical project take?", answer: "Project timelines depend on the scope, complexity, and requirements. At StarOps, we start by understanding your goals and then create a clear roadmap with milestones and delivery timelines. Whether it’s a focused website or a larger digital product, we keep the process transparent from start to finish." },
          { question: "Do you offer ongoing development and support?", answer: "Yes. Our partnership doesn’t have to end when a project goes live. StarOps provides ongoing development, maintenance, improvements, and technical support to help your product stay secure, reliable, and ready to scale as your business grows." },
        ]} />
        <AboutUsLocation/>
        <ContactUs/>
    </main>
  );
}