import { useCallback, useEffect, useRef, useState } from "react";
import { Smartphone, Globe, Cloud, Layers, Boxes, Users } from "lucide-react";
import mobileimage from "../../assets/mobile-development.jpg";
import webimage from "../../assets/web-development.jpg";
import devopsimage from "../../assets/devops-development.jpg";
import saasimage from "../../assets/saas-development.jpg";
import productimage from "../../assets/product-development.jpg";
import itstaffimage from "../../assets/it-staff.jpg";

/* Each slide uses its own background photo. If `image` is empty, a gradient placeholder shows. */
const SLIDES = [
  {
    title: "Mobile App Development",
    script: "Apps People Love",
    tag: "Mobile App Development",
    stack: "Flutter / React Native / Swift",
    image: mobileimage,
    icon: Smartphone,
    glow: "#14e3c0",
  },
  {
    title: "Web Development",
    script: "Modern Digital Platforms",
    tag: "Web Development",
    stack: "React / Next.js / Node.js",
    image: webimage,
    icon: Globe,
    glow: "#6366f1",
  },
  {
    title: "DevOps Consulting",
    script: "Ship With Confidence",
    tag: "DevOps Consulting",
    stack: "Docker / Kubernetes / AWS",
    image: devopsimage,
    icon: Cloud,
    glow: "#f59e0b",
  },
  {
    title: "SaaS Product Development",
    script: "Products That Scale",
    tag: "SaaS Development",
    stack: "Multi-tenant / Billing / APIs",
    image: saasimage,
    icon: Layers,
    glow: "#ec4899",
  },
  {
    title: "Product Engineering",
    script: "Built To Last",
    tag: "Product Engineering",
    stack: "Discovery / QA / CI-CD",
    image: productimage,
    icon: Boxes,
    glow: "#22c55e",
  },
  {
    title: "IT Staff Augmentation",
    script: "Teams On Demand",
    tag: "Staff Augmentation",
    stack: "Senior Talent / Flexible / Fast",
    image: itstaffimage,
    icon: Users,
    glow: "#38bdf8",
  },
];

const AUTOPLAY_MS = 6500;

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Playball&display=swap');

.sc-sans   { font-family: 'Inter Tight', system-ui, sans-serif; }
.sc-script { font-family: 'Playball', cursive; }

@keyframes sc-rise {
  from { opacity: 0; transform: translateY(22px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
.sc-rise { animation: sc-rise .9s cubic-bezier(.22,1,.36,1) both; }

@media (prefers-reduced-motion: reduce) {
  .sc-rise { animation: none !important; }
  .sc-t    { transition: none !important; }
}
`;

function Arrow({ dir = "right" }) {
  return (
    <svg
      viewBox="0 0 48 12"
      aria-hidden="true"
      className={`h-3 w-[clamp(34px,3.4vw,52px)] ${dir === "left" ? "-scale-x-100" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 6h46M41 1l5 5-5 5" />
    </svg>
  );
}

export default function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const total = SLIDES.length;

  const go = useCallback((n) => setIndex(((n % total) + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // autoplay (off for reduced motion, paused on hover / focus)
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next, index]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const onPointerDown = (e) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  const current = SLIDES[index];

  return (
    <section
      className="sc-sans relative h-svh min-h-[560px] w-full select-none overflow-hidden bg-[#0b0d0e] text-white outline-none"
      style={{ touchAction: "pan-y" }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Our services"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <style>{styles}</style>

      {/* slides: cross-fade with a slow settle */}
      {SLIDES.map((s, i) => {
        const on = i === index;
        const Icon = s.icon;
        return (
          <div
            key={s.title}
            aria-hidden={!on}
            className={`sc-t absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
              on ? "scale-100 opacity-100" : "scale-[1.08] opacity-0"
            }`}
          >
            {s.image ? (
              <img
                src={s.image}
                alt=""
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  backgroundImage: `radial-gradient(70% 60% at 80% 20%, ${s.glow}66 0%, ${s.glow}1a 45%, transparent 75%)`,
                }}
              >
                <Icon className="h-[38%] w-[38%] text-white/[0.06]" strokeWidth={0.6} />
              </div>
            )}
          </div>
        );
      })}

      {/* legibility overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      {/* title block: re-keyed so the entrance replays on every slide */}
      <div
        key={index}
        className="absolute inset-x-0 top-0 px-5 pt-[clamp(72px,14vh,150px)] sm:px-8 lg:px-[4vw]"
        aria-live="polite"
      >
        <h2
          className="sc-rise text-[clamp(38px,7.4vw,140px)] font-medium leading-[1] tracking-[-0.045em]"
          style={{ animationDelay: "50ms" }}
        >
          {current.title}
        </h2>
        <p
          className="sc-script sc-rise -mt-[0.1em] ml-[8%] text-[clamp(30px,6.4vw,120px)] leading-[1.1] tracking-normal sm:ml-[12%]"
          style={{ animationDelay: "200ms" }}
        >
          {current.script}
        </p>
      </div>

      {/* bottom bar: tags left, controls centre */}
      <div className="absolute inset-x-0 bottom-0 grid grid-cols-1 items-end gap-6 px-5 pb-7 sm:px-8 lg:grid-cols-3 lg:px-[4vw] lg:pb-[clamp(28px,3.2vw,60px)]">
        <ul key={`tags-${index}`} className="sc-rise flex flex-col items-start gap-3" style={{ animationDelay: "350ms" }}>
          {[current.tag, current.stack].map((t) => (
            <li
              key={t}
              className="rounded-full bg-white/15 px-4 py-1.5 text-[clamp(12px,0.95vw,17px)] font-medium tracking-[-0.01em] text-white/90 backdrop-blur-md"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center gap-[clamp(14px,1.6vw,28px)] lg:pb-1.5">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="rounded-full p-2 text-white/80 outline-none transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-white/60"
          >
            <Arrow dir="left" />
          </button>

          <p className="min-w-[5ch] text-center text-[clamp(14px,1.15vw,21px)] tabular-nums tracking-[-0.01em]" aria-label={`Slide ${index + 1} of ${total}`}>
            <span className="font-semibold text-white">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-white/55"> / {String(total).padStart(2, "0")}</span>
          </p>

          <button
            onClick={next}
            aria-label="Next slide"
            className="rounded-full p-2 text-white/80 outline-none transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-white/60"
          >
            <Arrow dir="right" />
          </button>
        </div>

        {/* spacer keeps the controls centred on desktop */}
        <div className="hidden lg:block" />
      </div>

      {/* thin progress line */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/15">
        <span
          className="sc-t block h-full bg-white/70 transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </span>
    </section>
  );
}