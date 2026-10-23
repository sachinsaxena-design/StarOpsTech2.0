import { useEffect, useRef, useState } from "react";


const STEPS = [
  {
    title: "Discover & Define",
    text: "We explore your goals, audience, and challenges to uncover meaningful insights and define a clear, strategic direction for your product.",
    Art: CompassArt,
  },
  {
    title: "Design & Build",
    text: "With a clear strategy in place, we transform ideas into intuitive designs and high-performing digital solutions tailored to your business, users, and goals.",
    Art: MonitorArt,
  },
  {
    title: "Launch & Grow",
    text: "We launch, refine, and scale your digital product with continuous optimization and ongoing support built for long-term growth.",
    Art: RocketArt,
  },
];


const SPLIT = [0.02, 0.3]; // heading opens up
const ENTER = [
  [0.05, 0.32], // card 1 rises
  [0.42, 0.64], // card 2 covers card 1
  [0.72, 0.94], // card 3 covers card 2
];


const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const seg = (p, [a, b]) => clamp((p - a) / (b - a));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(total > 0 ? clamp(-r.top / total) : 0);
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [ref]);
  return p;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    setReduced(m.matches);
    const h = (e) => setReduced(e.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);
  return reduced;
}


function Spark({ className = "", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill={color}>
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

function Label({ className = "", style }) {
  return (
    <p className={`flex items-center gap-2 text-[clamp(12px,0.95vw,17px)] font-medium tracking-[-0.01em] ${className}`} style={style}>
      <Spark className="h-[1.15em] w-[1.15em]" />
      From concept to launch
    </p>
  );
}

const Brand = () => <span className="is-script inline-block text-[1.12em] font-normal leading-none tracking-normal">Brand</span>;

function Card({ step, index }) {
  const { Art } = step;
  return (
    <article className="h-full w-full rounded-[clamp(18px,2vw,34px)] bg-white p-[clamp(8px,0.8vw,14px)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)] [container-type:inline-size]">
      <div className="flex h-full flex-col rounded-[clamp(12px,1.4vw,24px)] border border-black/[0.07] p-[5.5cqw]">
        <header className="flex items-center justify-between gap-3">
          <h3 className="font-medium leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(17px,5.6cqw,32px)" }}>
            {step.title}
          </h3>
          <div className="flex gap-[1.6cqw]" aria-label={`Step ${index + 1} of ${STEPS.length}`}>
            {STEPS.map((_, i) => (
              <Spark key={i} className="h-[4.4cqw] w-[4.4cqw] min-h-3.5 min-w-3.5" color={i <= index ? "#0a0a0a" : "#c9c9cd"} />
            ))}
          </div>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center py-[3cqw]">
          <Art className="h-full max-h-[62cqw] w-auto" />
        </div>

        <p className="leading-[1.3] tracking-[-0.015em] text-neutral-600" style={{ fontSize: "clamp(12px,3.4cqw,17px)" }}>
          {step.text}
        </p>
      </div>
    </article>
  );
}

function CompassArt({ className }) {
  return (
    <svg viewBox="0 0 220 220" className={className} role="img" aria-label="Compass">
      <circle cx="78" cy="40" r="15" fill="none" stroke="#b9b9bd" strokeWidth="6" />
      <rect x="82" y="46" width="18" height="30" rx="6" fill="#0a0a0a" transform="rotate(-18 91 61)" />
      <circle cx="110" cy="125" r="78" fill="#fff" stroke="#0a0a0a" strokeWidth="9" />
      <circle cx="110" cy="125" r="66" fill="none" stroke="#d0d0d4" strokeWidth="1" />
      <circle cx="110" cy="125" r="61" fill="none" stroke="#8a8a8f" strokeWidth="6" strokeDasharray="1.2 5" />
      <circle cx="110" cy="125" r="34" fill="#ececee" />
      <polygon points="110,78 118,117 158,125 118,133 110,172 102,133 62,125 102,117" fill="#d4d4d8" />
      <g transform="rotate(-25 110 125)" fill="#0a0a0a" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Inter Tight, sans-serif">
        <text x="110" y="88">N</text>
        <text x="156" y="129">E</text>
        <text x="110" y="170">S</text>
        <text x="64" y="129">W</text>
      </g>
      <polygon points="110,58 118,125 102,125" fill="#0a0a0a" />
      <polygon points="110,192 118,125 102,125" fill="#c5c5c9" />
      <circle cx="110" cy="125" r="8" fill="#0a0a0a" />
    </svg>
  );
}

function MonitorArt({ className }) {
  return (
    <svg viewBox="0 0 260 200" className={className} role="img" aria-label="Design and development">
      <rect x="20" y="30" width="170" height="115" rx="8" fill="#fff" stroke="#0a0a0a" strokeWidth="6" />
      <line x1="20" y1="124" x2="190" y2="124" stroke="#0a0a0a" strokeWidth="4" />
      <line x1="105" y1="145" x2="105" y2="168" stroke="#0a0a0a" strokeWidth="10" />
      <line x1="72" y1="173" x2="138" y2="173" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round" />
      <path d="M80 92 Q105 38 130 92" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
      <rect x="76" y="90" width="8" height="8" fill="#0a0a0a" />
      <rect x="126" y="90" width="8" height="8" fill="#0a0a0a" />
      <circle cx="105" cy="56" r="4.5" fill="#0a0a0a" />
      <polygon points="105,86 112,104 105,100 98,104" fill="#0a0a0a" />
      <rect x="178" y="58" width="58" height="112" rx="11" fill="#fff" stroke="#0a0a0a" strokeWidth="6" />
      <line x1="199" y1="70" x2="215" y2="70" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
      <text x="207" y="120" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0a0a0a" fontFamily="Inter Tight, sans-serif">
        {"</>"}
      </text>
    </svg>
  );
}

function RocketArt({ className }) {
  const spark = "M0 -6 Q0 0 6 0 Q0 0 0 6 Q0 0 -6 0 Q0 0 0 -6Z";
  return (
    <svg viewBox="0 0 220 220" className={className} role="img" aria-label="Rocket launch">
      <g transform="translate(110 106) rotate(40)">
        <path d="M-9 44 Q0 86 9 44Z" fill="#c5c5c9" />
        <path d="M-20 14 L-44 46 L-20 40Z" fill="#0a0a0a" />
        <path d="M20 14 L44 46 L20 40Z" fill="#0a0a0a" />
        <path d="M0 -78 C26 -52 30 -8 20 36 L-20 36 C-30 -8 -26 -52 0 -78Z" fill="#0a0a0a" />
        <line x1="-23" y1="14" x2="23" y2="14" stroke="#fff" strokeWidth="3" />
        <circle cx="0" cy="-30" r="12" fill="#fff" stroke="#8a8a8f" strokeWidth="4" />
        <circle cx="0" cy="-30" r="5" fill="#0a0a0a" />
        <rect x="-10" y="36" width="20" height="8" rx="2" fill="#8a8a8f" />
      </g>
      {[[40, 168], [28, 132], [176, 58], [190, 150], [64, 196], [168, 190]].map(([x, y], i) => (
        <path key={i} d={spark} transform={`translate(${x} ${y}) scale(${i % 2 ? 0.8 : 1.15})`} fill="#0a0a0a" />
      ))}
      {[[54, 150], [150, 30], [200, 110], [30, 190]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill="#8a8a8f" />
      ))}
    </svg>
  );
}

function Desktop() {
  const wrap = useRef(null);
  const p = useScrollProgress(wrap);

  const split = easeOut(seg(p, SPLIT));
  const enters = ENTER.map((r) => easeInOut(seg(p, r)));

  return (
    <div ref={wrap} className="relative hidden h-[520vh] lg:block">
      <div className="sticky top-0 h-svh overflow-hidden" style={{ "--cw": "min(29vw, 60svh)" }}>
        {/* label drifts up as the layout opens */}
        <Label className="absolute left-1/2 -translate-x-1/2" style={{ top: `${lerp(22, 9, split)}%` }} />

        {/* heading: left and right halves part to make room for the card */}
        <h2
          className="is-sans absolute inset-x-0 flex items-start justify-center text-[clamp(34px,4.1vw,92px)] font-medium leading-[1.16] tracking-[-0.045em]"
          style={{
            top: `${lerp(46, 50, split)}%`,
            transform: "translateY(-50%)",
            columnGap: `calc(0.28em + (var(--cw) + 5vw) * ${split})`,
          }}
        >
          <span className="text-right">
            <span className="block">Your ideas</span>
            <span className="block">
              into <Brand />
            </span>
          </span>
          <span className="text-left">
            <span className="block">transform</span>
            <span className="block">stories</span>
          </span>
        </h2>

        {/* cards */}
        {STEPS.map((s, i) => {
          const e = enters[i];
          const cover = i < STEPS.length - 1 ? enters[i + 1] : 0;
          const y = (1 - e) * 118 - cover * 3;
          return (
            <div
              key={s.title}
              aria-hidden={e === 0}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{
                width: "var(--cw)",
                aspectRatio: "1 / 1.04",
                zIndex: i + 1,
                visibility: e === 0 ? "hidden" : "visible",
                transform: `translate(-50%, calc(-50% + ${y}svh)) scale(${1 - 0.05 * cover})`,
              }}
            >
              <Card step={s} index={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
}


function Stacked({ always }) {
  return (
    <div className={`px-5 pb-20 pt-16 sm:px-8 ${always ? "" : "lg:hidden"}`}>
      <Label className="justify-center" />
      <h2 className="is-sans mx-auto mt-8 max-w-[18ch] text-center text-[clamp(34px,9vw,64px)] font-medium leading-[1.12] tracking-[-0.045em]">
        Your ideas transform into <Brand /> stories
      </h2>
      <div className="mx-auto mt-12 flex max-w-115 flex-col gap-5">
        {STEPS.map((s, i) => (
          <div key={s.title} style={{ aspectRatio: "1 / 1.04" }}>
            <Card step={s} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Playball&display=swap');
.is-sans   { font-family: 'Inter Tight', system-ui, sans-serif; }
.is-script { font-family: 'Playball', cursive; }
`;

export default function StepSection() {
  const reduced = useReducedMotion();
  return (
    // NOTE: no ancestor of this section may use overflow:hidden, or position:sticky stops working.
    <section className="is-sans relative w-full bg-[#f4f4f4] text-[#07090d]">
      <style>{css}</style>
      {reduced ? <Stacked always /> : (
        <>
          <Desktop />
          <Stacked />
        </>
      )}
    </section>
  );
}