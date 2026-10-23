import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import staticimg from "../../assets/static.jpg";
import lines from "../../assets/lines.avif";
import dollar from "../../assets/dollar.avif";
import sts from "../../assets/sts.png";
import hands from "../../assets/hands.avif";
import chain from "../../assets/chain.avif";
import nextjs from '../../assets/nextjs.png'
import aws from '../../assets/aws.png'
import firebase from '../../assets/firebase.png'
import jenkins from '../../assets/jenkins.png'
import tailwindcss from '../../assets/tailwindcss.png'
import elasticsearch from '../../assets/elasticsearch.png'

const AVATAR_IMGS = [null, null, null, null, null];
const SUPPORT_AVATAR = null;

const SPIN_SECONDS = 9; // credit-card dollar: seconds per full turn

const CHAIN = { left: "31%", top: "52%", width: "104%" };

const CHAIN_OPACITY = 0.45;
const HANDS_OPACITY = 0.5;

const FADE_CHAIN = "linear-gradient(135deg, transparent 0%, #000 45%)";
const FADE_HANDS = "linear-gradient(to top, transparent 0%, #000 55%)";

const GROWTH_POINTS = ["Tailored solutions", "Modern technology", "Scalable development", "Reliable delivery", "Long-term support"];

const GAP = "gap-3"; // 12px, same as Framer
const TOP = "aspect-[518/442]";
const BOTTOM = "aspect-[341/338]";

/* all type + spacing inside a card is in cqw (container width) so a card scales as one piece */
const fs = (cqw, min = 11) => ({ fontSize: `max(${min}px, ${cqw}cqw)` });

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.wc-sans { font-family: 'Inter', system-ui, sans-serif; }

/* ---- card + mouse-follow glow ---- */
.wc-card { position: relative; isolation: isolate; transition: box-shadow .45s ease; }
.wc-card::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
  background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--g) / .95), transparent 70%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  opacity: 0; transition: opacity .4s ease; pointer-events: none; z-index: 6;
}
.wc-card::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--g) / .2), transparent 65%);
  opacity: 0; transition: opacity .4s ease; pointer-events: none; z-index: 5;
}
.wc-card:hover::before, .wc-card:hover::after { opacity: 1; }
.wc-card:hover { box-shadow: 0 24px 70px -28px rgb(var(--g) / .7), 0 0 0 1px rgb(var(--g) / .08); }

/* ---- reveal ---- */
.wc-card[data-in="false"] { opacity: 0; transform: translateY(34px); }
.wc-card[data-in="true"]  { animation: wc-rise .9s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
@keyframes wc-rise { from { opacity: 0; transform: translateY(34px); } to { opacity: 1; transform: none; } }

/* ---- spinning dollar ---- */
@keyframes wc-spin { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
.wc-spin { animation: wc-spin var(--spin, 9s) linear infinite; transform-style: preserve-3d; }

@media (prefers-reduced-motion: reduce) {
  .wc-card[data-in="true"] { animation: none; }
  .wc-spin { animation: none; }
}
`;

function useInView({ once = true, threshold = 0.1 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);
  return [ref, inView];
}

function Spark({ className = "", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill={color}>
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

function SolidStar({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="#0a0a0a">
      <path d="M12 1.6l3.1 6.9 7.5.8-5.6 5 1.6 7.4L12 17.8 5.4 22.7 7 15.3 1.4 10.3l7.5-.8z" />
    </svg>
  );
}

/* rgb = "r g b" glow colour for this card */
function GlowCard({ rgb, className = "", delay = 0, show, children }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onPointerMove={onMove}
      data-in={show}
      className={`wc-card overflow-hidden rounded-[clamp(18px,1.5vw,30px)] @container ${className}`}
      style={{ "--g": rgb, "--d": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CostCard({ show }) {
  return (
    <GlowCard rgb="245 158 11" delay={0} show={show} className={`${TOP} bg-[#f4f4f4]`}>
      <div className="relative h-full">
        {/* waves: capped to the bottom ~40% so they only peek out around the card */}
        <img
          src={lines}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-[40%] w-full select-none object-cover object-bottom grayscale"
        />

        <div className="absolute left-[6.6cqw] right-[6.6cqw] top-[6.6cqw] z-2">
          <h3 className="font-medium leading-[1.15] tracking-[-0.03em]" style={fs(5.2, 17)}>
            Cost-Effective plans
          </h3>
          <p className="mt-[1.6cqw] max-w-[82cqw] leading-[1.3] tracking-[-0.01em] text-neutral-500" style={fs(3.3, 12)}>
            Build and scale your digital products with a practical approach to cost.
          </p>
        </div>

        {/* black credit card: 360x237 inside a 518 card */}
        <div className="absolute bottom-[7.4cqw] left-[15.3cqw] z-3 aspect-360/237 w-[69.5cqw] rounded-[2cqw] border border-white/10 bg-linear-to-br from-[#222224] via-[#141415] to-[#0a0a0b] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,0.06),transparent_40%)]" />

          {/* gold chip */}
          <span className="absolute left-[6.4%] top-[9.7%] h-[14.3%] w-[13.3%] overflow-hidden rounded-[0.5cqw] bg-linear-to-br from-[#fde68a] via-[#e3b83b] to-[#b7791f]">
            <svg viewBox="0 0 48 34" className="h-full w-full" aria-hidden="true">
              <path d="M16 0V34M32 0V34M0 11.5H48M0 22.5H48" stroke="#8a5a0b" strokeOpacity=".55" strokeWidth="1.4" fill="none" />
            </svg>
          </span>

          {/* dollar: 52% of card height, centred at ~47% */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[21%] flex h-[52%] items-center justify-center"
            style={{ perspective: "1100px" }}
            aria-hidden="true"
          >
            <img
              src={dollar}
              alt=""
              draggable={false}
              className="wc-spin h-full w-auto select-none object-contain"
              style={{ "--spin": `${SPIN_SECONDS}s` }}
            />
          </div>

          <p className="absolute bottom-[8.5%] right-[6.4%] flex items-center gap-[1.2cqw] whitespace-nowrap text-white/85" style={fs(3.3, 10)}>
            <Spark className="h-[0.95em] w-[0.95em]" /> Built around your budget
          </p>
        </div>
      </div>
    </GlowCard>
  );
}

const AVATARS = [
  { pos: ["49%", "47.7%"], d: "13.1cqw", from: "#d6a15a", to: "#6b3f12" },
  { pos: ["23.6%", "60.2%"], d: "13.1cqw", from: "#c8553d", to: "#5c1a12" },
  { pos: ["74.5%", "60.2%"], d: "13.1cqw", from: "#9aa7b4", to: "#3a4654" },
  { pos: ["12.9%", "90%"], d: "13.1cqw", from: "#b79b7d", to: "#4b3a2b" },
  { pos: ["85%", "90%"], d: "13.1cqw", from: "#8d7a68", to: "#2b241e" },
];

function Person({ i }) {
  const a = AVATARS[i];
  const src = AVATAR_IMGS[i];
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[0.3cqw] border-white/80 shadow-[0_6px_16px_-6px_rgba(0,0,0,0.25)]"
      style={{ left: a.pos[0], top: a.pos[1], width: a.d, height: a.d, backgroundImage: `linear-gradient(145deg,${a.from},${a.to})` }}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden="true">
          <circle cx="20" cy="15" r="7" fill="#f1d3b8" />
          <path d="M13 14c0-8 14-8 14 0-2-3-12-3-14 0z" fill="#1f1a17" />
          <path d="M5 40c1-9 7-13 15-13s14 4 15 13z" fill="#2c3a52" opacity=".9" />
        </svg>
      )}
    </span>
  );
}

function TrustCard({ show }) {
  return (
    <GlowCard rgb="56 189 248" delay={90} show={show} className={`${TOP} bg-[#f4f4f4]`}>
      <div className="relative h-full">
        <div className="absolute left-[6.6cqw] right-[6.6cqw] top-[6.6cqw] flex items-start justify-between">
          <div>
            <div className="flex gap-[1.2cqw]" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <SolidStar key={i} className="h-[3.2cqw] min-h-3 w-[3.2cqw] min-w-3" />
              ))}
            </div>
            <p className="mt-[1.4cqw] leading-[1.3] tracking-[-0.01em] text-neutral-600" style={fs(3.3, 12)}>
              Trusted by businesses &amp; growing teams
            </p>
          </div>
          <p className="tracking-[-0.03em]" style={fs(5, 16)}>
            <span className="font-medium">4.9</span>
            <span className="text-neutral-500" style={{ fontSize: "0.58em" }}>/5.0</span>
          </p>
        </div>

        {/* orbit rings */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[18.5, 38, 65.6].map((d) => (
            <span
              key={d}
              className="absolute left-1/2 top-[61%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/5"
              style={{ width: `${d}cqw`, aspectRatio: "1" }}
            />
          ))}
        </div>

        {AVATARS.map((_, i) => (
          <Person key={i} i={i} />
        ))}

        <div className="absolute left-1/2 top-[83.9%] -translate-x-1/2 -translate-y-1/2">
          <img src={sts} alt="StarOps Technologies" draggable={false} className="w-[26.6cqw] select-none" />
        </div>
      </div>
    </GlowCard>
  );
}

function GrowthCard({ show }) {
  return (
    <GlowCard rgb="255 255 255" delay={180} show={show} className="aspect-518/790 bg-[#0a0a0b] text-white xl:aspect-auto xl:h-full">
      <div className="relative h-full">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_32%_at_18%_36%,rgba(255,255,255,0.07),transparent),radial-gradient(70%_50%_at_75%_100%,rgba(255,255,255,0.05),transparent)]" />

        {/* chain render: starts below the button, bleeds off the right + bottom edges */}
        <img
          src={chain}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute z-0 max-w-none select-none"
          style={{
            left: CHAIN.left,
            top: CHAIN.top,
            width: CHAIN.width,
            opacity: CHAIN_OPACITY,
            WebkitMaskImage: FADE_CHAIN,
            maskImage: FADE_CHAIN,
          }}
        />

        <div className="absolute left-[6.6cqw] right-[6.6cqw] top-[6.4cqw] z-2">
          <h3 className="max-w-[78cqw] font-medium leading-[1.14] tracking-[-0.03em]" style={fs(6, 20)}>
            Technology solutions built for growth
          </h3>

          <ul className="mt-[3.2cqw]">
            {GROWTH_POINTS.map((p) => (
              <li key={p} className="flex h-[6.85cqw] items-center gap-[2.4cqw] pl-[0.7cqw] text-[#d2d2d6]" style={fs(3.7, 13)}>
                <Spark className="h-[2.8cqw] min-h-2.5 w-[2.8cqw] min-w-2.5 text-[#a9a9ae]" />
                {p}
              </li>
            ))}
          </ul>

          <a
            href="/contact"
            className="mt-[5.2cqw] inline-flex items-center gap-[3.7cqw] rounded-full bg-white p-[0.3cqw] pl-[5.2cqw] font-medium text-black outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/60"
            style={fs(3.3, 13)}
          >
            Let&apos;s work together
            <span className="grid h-[8.5cqw] min-h-8 w-[8.5cqw] min-w-8 place-items-center rounded-full bg-black text-white">
              <ArrowRight className="h-[46%] w-[46%]" />
            </span>
          </a>
        </div>

        <p className="absolute bottom-[6.2cqw] left-[6.6cqw] z-2 font-medium tracking-[-0.02em] text-[#e6e6e8]" style={fs(4, 13)}>
          &copy; 2026 StarOps Technologies
        </p>
      </div>
    </GlowCard>
  );
}

/* bg: circle colour behind each logo. Change it per logo if one looks bad on its background */
const LOGOS = [
  [
    { n: "Next.js", src: nextjs, bg: "bg-[#ececee]" },
    { n: "AWS", src: aws, bg: "bg-[#ececee]" },
    { n: "Firebase", src: firebase, bg: "bg-[#ececee]" },
  ],
  [
    { n: "Jenkins", src: jenkins, bg: "bg-[#ececee]" },
    { n: "Tailwind CSS", src: tailwindcss, bg: "bg-[#ececee]" },
    { n: "Elasticsearch", src: elasticsearch, bg: "bg-[#ececee]" },
    // no image imported for GitHub, so it keeps the react-icons logo
    { n: "GitHub", node: <FaGithub className="h-[75%] w-[75%] text-[#0a0a0a]" />, bg: "bg-[#ececee]" },
  ],
];

function ModernCard({ show }) {
  return (
    <GlowCard rgb="99 102 241" delay={120} show={show} className={`${BOTTOM} border border-black/[0.07] bg-white`}>
      <div className="relative h-full">
        <div className="absolute left-[10cqw] right-[10cqw] top-[10cqw]">
          <h3 className="max-w-[70cqw] font-medium leading-[1.2] tracking-[-0.03em]" style={fs(7.6, 17)}>
            Built with modern technology
          </h3>
          <p className="mt-[2.4cqw] max-w-[84cqw] leading-[1.28] tracking-[-0.01em] text-neutral-500" style={fs(5, 12)}>
            We use proven tools and technologies to build scalable digital products.
          </p>
        </div>

        {/* logo circles: 50px on a 341 card, rows touch vertically, 25px apart sideways */}
        <div className="absolute inset-x-0 bottom-[9.4cqw] flex flex-col items-center">
          {LOGOS.map((row, r) => (
            <div key={r} className="flex justify-center gap-[7.4cqw]">
              {row.map((l) => (
                <span
                  key={l.n}
                  role="img"
                  aria-label={l.n}
                  className={`flex aspect-square w-[14.7cqw] items-center justify-center overflow-hidden rounded-full ${l.bg}`}
                >
                  {l.src ? (
                    <img
                      src={l.src}
                      alt=""
                      draggable={false}
                      className="h-[80%] w-[80%] select-none object-contain"
                    />
                  ) : (
                    l.node
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

function ScalableCard({ show }) {
  return (
    <GlowCard rgb="20 227 192" delay={200} show={show} className={`${BOTTOM} bg-[#06100e] text-white`}>
      <div className="relative h-full">
        <img src={staticimg} alt="" aria-hidden="true" draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative flex h-full items-center justify-center text-center">
          <h3 className="font-medium leading-[1.1] tracking-[-0.03em]" style={fs(8.6, 18)}>
            Scalable &amp;
            <br />
            Future-ready
          </h3>
        </div>
      </div>
    </GlowCard>
  );
}

function SupportCard({ show }) {
  return (
    <GlowCard rgb="236 72 153" delay={280} show={show} className={`${BOTTOM} border border-black/[0.07] bg-white`}>
      <div className="relative h-full">
        <div className="absolute left-[10cqw] top-[9.6cqw]">
          <p className="font-normal leading-none tracking-[-0.03em]" style={fs(9.4, 22)}>
            24/7
          </p>
          <p className="mt-[2.6cqw] tracking-[-0.01em] text-neutral-500" style={fs(5, 12)}>
            Always-On support
          </p>
        </div>

        {/* hands photo, bottom-right */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 z-0 h-[51%] w-[40%]"
          style={{ opacity: HANDS_OPACITY, WebkitMaskImage: FADE_HANDS, maskImage: FADE_HANDS }}
          aria-hidden="true"
        >
          <img src={hands} alt="" draggable={false} className="h-full w-full select-none object-cover object-bottom" />
        </div>

        {/* chat bubbles */}
        <div className="absolute bottom-[10cqw] left-[10cqw] z-2 flex flex-col items-start">
          <div className="flex items-center gap-[2.9cqw]">
            <span className="h-[10.3cqw] w-[10.3cqw] shrink-0 overflow-hidden rounded-full bg-linear-to-br from-[#d9a47a] to-[#5a3a22]">
              {SUPPORT_AVATAR ? (
                <img src={SUPPORT_AVATAR} alt="" className="h-full w-full object-cover" />
              ) : (
                <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden="true">
                  <circle cx="20" cy="16" r="7" fill="#f0cdb0" />
                  <path d="M13 14c0-8 14-8 14 0-2-3-12-3-14 0z" fill="#1d1816" />
                  <path d="M6 40c1-9 6-12 14-12s13 3 14 12z" fill="#e9e9ea" />
                </svg>
              )}
            </span>
            <span className="rounded-[5cqw] bg-[#0a0a0a] px-[4.4cqw] py-[3.1cqw] font-medium leading-none text-white" style={fs(4.4, 11)}>
              Hey there!
            </span>
          </div>
          <div className="mt-[2.6cqw] flex items-center gap-[3.6cqw] pl-[16.3cqw]">
            <span className="whitespace-nowrap rounded-[5cqw] bg-[#0a0a0a] px-[4.4cqw] py-[3.1cqw] font-medium leading-none text-white" style={fs(4.4, 11)}>
              How can i help you?
            </span>
            <span className="grid h-[8.8cqw] w-[8.8cqw] shrink-0 place-items-center rounded-full bg-[#0a0a0a] text-white ring-[0.7cqw] ring-white">
              <Spark className="h-[52%] w-[52%]" />
            </span>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

export default function WhyUsSection() {
  const [ref, inView] = useInView();

  return (
    <>
    <section ref={ref} className="wc-sans w-full bg-white px-5 py-16 text-[#07090d] sm:px-8 lg:py-[6vw]">
      <style>{css}</style>

      {/* Framer container: 1576px max, ~83% of a 1900px screen */}
      <div className="mx-auto xl:w-[min(1576px,83%)]">
        <p className="flex items-center justify-center gap-2 text-[clamp(12px,0.95vw,17px)] font-medium tracking-[-0.01em]">
          <Spark className="h-[1.15em] w-[1.15em]" />
          Why businesses choose StarOps
        </p>

        <h2 className="mx-auto mt-5 max-w-[16ch] text-center text-[clamp(34px,5.6vw,104px)] font-bold leading-[1.02] tracking-tighter lg:mt-[1.4vw]">
          Your business Deserves better technology
        </h2>

        {/* single column (max 560px) below xl; Framer 3-column bento from xl up */}
        <div className={`mx-auto mt-10 grid max-w-140 ${GAP} xl:mt-[4vw] xl:max-w-none xl:grid-cols-3`}>
          <div className={`flex flex-col ${GAP} xl:col-span-2`}>
            <div className={`grid ${GAP} xl:grid-cols-2`}>
              <CostCard show={inView} />
              <TrustCard show={inView} />
            </div>
            <div className={`grid ${GAP} xl:grid-cols-3`}>
              <ModernCard show={inView} />
              <ScalableCard show={inView} />
              <SupportCard show={inView} />
            </div>
          </div>

          <div className="xl:col-span-1 xl:h-full">
            <GrowthCard show={inView} />
          </div>
        </div>
      </div>
    </section>
    <TrackRecordSection />
    </>
  );
}

const STATS = [
  { to: 100, text: "Digital projects delivered from strategy and architecture through development and deployment." },
  { to: 90, text: "Solutions built with modern frameworks, scalable architecture, and proven development practices." },
  { to: 80, text: "Specialized development engagements across web, mobile, AI, and business applications." },
  { to: 50, text: "Digital solutions designed around real business goals, users, and long-term growth." },
];
const COUNT_SECONDS = 1.8; // how long each number takes to reach its value

function CountUp({ to, run, delay = 0, seconds = COUNT_SECONDS }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) {
      setN(0); // reset so it counts again next time
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf;
    let start;
    const tick = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / (seconds * 1000), 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); // ease-out
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, to, delay, seconds]);

  return (
    <span className="relative inline-block">
      <span className="sr-only">{to}</span>
      {/* invisible final value reserves the width so "+" never jumps while counting */}
      <span className="invisible" aria-hidden="true">{to}</span>
      <span className="absolute left-0 top-0" aria-hidden="true">{n}</span>
    </span>
  );
}

function TrackRecordSection() {
  const [ref, inView] = useInView({ once: false, threshold: 0.3 });

  return (
    <section className="wc-sans relative w-full overflow-hidden bg-white px-5 py-16 text-[#07090d] sm:px-8 lg:py-[clamp(64px,8vw,150px)]">
      {/* faint line-art swirl on the left edge */}
      <svg
        viewBox="0 0 270 450"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 hidden h-[52%] max-h-112.5 lg:block"
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="1.4"
      >
        <path d="M0 70C90 10 235 20 255 95c14 55-40 105-62 140" />
        <path d="M0 95C80 50 210 55 232 110c10 40-30 80-48 110" />
        <path d="M0 235c85 35 160 105 158 215" />
        <path d="M0 330c50 30 90 70 95 120" />
      </svg>

      <div className="mx-auto max-w-140 @container lg:flex lg:w-[min(1576px,83%)] lg:max-w-none lg:items-start">
        {/* left: eyebrow, heading, button */}
        <div className="lg:w-[53.6%] lg:pt-[1.4cqw]">
          <p className="flex items-center gap-2 font-medium tracking-[-0.01em]" style={fs(1.15, 14)}>
            <Spark className="h-[1.05em] w-[1.05em]" />
            Our track record
          </p>

          <h2
            className="mt-[1.6cqw] max-w-[40cqw] font-bold tracking-tighter max-lg:mt-4 max-lg:max-w-none"
            style={{ ...fs(5.1, 38), lineHeight: 1.31 }}
          >
            Technology that moves business forward
          </h2>

          <a
            href="/services"
            className="group mt-[2.3cqw] inline-flex items-center gap-[1.15cqw] rounded-full bg-[#0a0a0b] pl-[1.7cqw] font-medium text-white outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-black/40 max-lg:mt-8"
            style={{ ...fs(1.15, 14), height: "max(44px, 3cqw)" }}
          >
            Explore our services
            <span className="grid aspect-square h-full place-items-center rounded-full border border-black bg-white text-black">
              <ArrowRight className="h-[44%] w-[44%] transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        {/* right: stats */}
        <ul ref={ref} className="mt-12 lg:mt-0 lg:w-[46.4%]">
          {STATS.map((s, i) => (
            <li
              key={s.to}
              className="grid grid-cols-[42%_1fr] items-start gap-x-3 border-b border-black/12 py-6 lg:h-[9.23cqw] lg:grid-cols-[47%_1fr] lg:gap-x-0 lg:py-0 lg:pt-[2cqw]"
            >
              <p className="font-medium leading-none tracking-[-0.06em]" style={fs(6.1, 52)}>
                <CountUp to={s.to} run={inView} delay={i * 120} />
                <span className="relative top-[-0.12em] ml-[0.04em] align-baseline font-light italic" style={{ fontSize: "0.47em" }} aria-hidden="true">
                  +
                </span>
                <span className="sr-only">+</span>
              </p>
              <p className="leading-[1.3] tracking-[-0.01em] text-neutral-600 lg:mt-[0.45cqw]" style={fs(1.2, 14)}>
                {s.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}