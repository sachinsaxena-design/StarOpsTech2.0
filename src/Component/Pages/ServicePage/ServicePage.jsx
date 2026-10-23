import React, { useEffect, useId, useRef, useState } from "react";

/* ==================================================================
   ServicePage – one template for all 6 service pages.
   React + Vite + Tailwind. Fully responsive, scroll-reveal animations.

   Usage:
     import ServicePage from "../components/ServicePage/ServicePage";
     import webDevelopment from "../data/services/webDevelopment";
     export default function WebDevelopment() {
       return <ServicePage data={webDevelopment} />;
     }

   Page structure (top → bottom):
     1. Hero            – service name over a background image
     2. Intro           – heading + sub-title, paragraphs (left) + image (right)
     3. Cards section 1 – heading + sub-title + 6 cards   (variant "light")
     4. Cards section 2 – heading + sub-title + 6 cards   (variant "dark")
     5. FAQ             – accordion
   ================================================================== */

/* page-width container used by every section */
const WRAP = "mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-[4vw]";
const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

/* ------------------------------------------------------------------ */
/*  Scroll reveal helpers                                               */
/* ------------------------------------------------------------------ */
function useInView({ threshold = 0.15, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect(); // animate once
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, shown];
}

/* fades + slides its children up when scrolled into view.
   Put hover effects on a CHILD, not here (the delay would slow hovers). */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-[900ms] ${EASE} motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  1. HERO                                                             */
/* ------------------------------------------------------------------ */
export function ServiceHero({ title, image }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const words = title.split(" ");

  return (
    <section className="relative isolate flex min-h-[clamp(340px,50vw,600px)] items-center justify-center overflow-hidden bg-neutral-900 px-5 pb-12 pt-28 text-center sm:px-8">
      {image ? (
        <img
          src={image}
          alt=""
          fetchpriority="high"
          decoding="async"
          className={`absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[2200ms] ${EASE} motion-reduce:transition-none ${
            ready ? "scale-100" : "scale-[1.12]"
          }`}
        />
      ) : (
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-neutral-700 via-neutral-900 to-black" />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />

      <h1 className="max-w-[14ch] text-[clamp(38px,7vw,128px)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
        {words.map((w, i) => (
          <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom last:mr-0">
            <span
              style={{ transitionDelay: `${200 + i * 120}ms` }}
              className={`inline-block transition-transform duration-[1000ms] ${EASE} motion-reduce:!translate-y-0 motion-reduce:transition-none ${
                ready ? "translate-y-0" : "translate-y-[110%]"
              }`}
            >
              {w}
            </span>
          </span>
        ))}
      </h1>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared section heading                                              */
/* ------------------------------------------------------------------ */
function SectionHeading({ title, subtitle }) {
  return (
    <Reveal className="mx-auto max-w-[760px] text-center">
      <h2 className="text-[clamp(26px,3.4vw,56px)] font-medium leading-[1.1] tracking-[-0.035em]">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-[60ch] text-[clamp(13px,1.1vw,18px)] leading-[1.45] text-neutral-500 sm:mt-4">{subtitle}</p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  2. INTRO  (heading + paragraphs left, image right)                  */
/* ------------------------------------------------------------------ */
export function ServiceIntro({ title, subtitle, paragraphs = [], image, imageAlt = "", cta }) {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[clamp(72px,7vw,130px)]">
      <div className={WRAP}>
        <SectionHeading title={title} subtitle={subtitle} />

        {cta && (
          <Reveal delay={100} className="mt-8 flex justify-center sm:justify-end lg:mt-10">
            <a
              href={cta.href}
              className="group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {cta.label}
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#07090d] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </Reveal>
        )}

        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-[clamp(32px,4vw,72px)]">
          <Reveal className="space-y-5 text-[clamp(14px,1.15vw,18px)] leading-[1.6] text-neutral-600 sm:space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={150} className="h-full">
            <div className="group relative h-full min-h-[260px] overflow-hidden rounded-2xl bg-neutral-200 sm:min-h-[360px] lg:min-h-[420px]">
              {image ? (
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ${EASE} group-hover:scale-105 motion-reduce:transition-none`}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-400" />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3 + 4. CARD SECTIONS  (variant: "light" | "dark")                   */
/* ------------------------------------------------------------------ */
function Pin({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path d="M19 21 8 35" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="14" r="9" fill="#d91e2a" />
      <ellipse cx="19" cy="10.5" rx="3.2" ry="2" fill="#fff" opacity=".45" />
    </svg>
  );
}

/* light card: white card, pin, number, peach inner box */
function LightCard({ item, index }) {
  const number = item.number ?? String(index + 1).padStart(2, "0");
  return (
    <article className="group relative h-full rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition duration-500 hover:-translate-y-1.5 hover:shadow-xl sm:p-5">
      <Pin className="absolute -top-3 right-[22%] h-9 w-9 origin-bottom-left drop-shadow-md transition-transform duration-500 group-hover:rotate-12" />
      <span className="text-[13px] text-neutral-500">{number}</span>
      <div className="mt-3 rounded-xl bg-[#fdeee3] p-4 transition-colors duration-500 group-hover:bg-[#fde4d3] sm:p-5">
        <h3 className="text-[clamp(15px,1.25vw,20px)] font-semibold leading-snug tracking-[-0.02em]">{item.title}</h3>
        <p className="mt-2.5 text-[clamp(12.5px,0.95vw,15px)] leading-[1.5] text-neutral-700">{item.text}</p>
      </div>
    </article>
  );
}

/* dark card: black card, white title, grey text, line grows on hover */
function DarkCard({ item }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-[#0e0e0f] p-6 text-white transition duration-500 hover:-translate-y-1.5 hover:bg-[#171718] hover:shadow-2xl sm:p-7 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white/70 after:transition-transform after:duration-500 hover:after:scale-x-100">
      <h3 className="text-[clamp(16px,1.4vw,22px)] font-semibold leading-snug tracking-[-0.025em]">{item.title}</h3>
      <p className="mt-3 text-[clamp(12.5px,0.95vw,15px)] leading-[1.55] text-neutral-400 transition-colors duration-500 group-hover:text-neutral-300">{item.text}</p>
    </article>
  );
}

const CARD_VARIANTS = {
  light: { section: "bg-white", Card: LightCard, grid: "gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-9" },
  dark: { section: "bg-white", Card: DarkCard, grid: "gap-4 sm:gap-5" },
};

export function ServiceCardSection({ title, subtitle, items = [], variant = "light" }) {
  const { section, Card, grid } = CARD_VARIANTS[variant] || CARD_VARIANTS.light;
  return (
    <section className={`${section} py-12 sm:py-16 lg:py-[clamp(64px,6vw,110px)]`}>
      <div className={WRAP}>
        <SectionHeading title={title} subtitle={subtitle} />
        <ul className={`mt-10 grid grid-cols-1 pt-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 ${grid}`}>
          {items.map((item, i) => (
            <li key={item.title + i} className="list-none">
              <Reveal delay={(i % 3) * 110} className="h-full">
                <Card item={item} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. FAQ                                                              */
/* ------------------------------------------------------------------ */
function FaqItem({ q, a, open, onToggle, id }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-md">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-[clamp(13px,1.05vw,16px)] font-medium tracking-[-0.01em] outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:px-6 sm:py-5"
        >
          <span>{q}</span>
          <span
            aria-hidden="true"
            className={`relative h-3.5 w-3.5 shrink-0 transition-transform duration-500 ${EASE} ${open ? "rotate-45" : "rotate-0"}`}
          >
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ${EASE} motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-5 text-[clamp(12.5px,0.95vw,15px)] leading-[1.6] text-neutral-600 sm:px-6">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function ServiceFaq({ title, subtitle, items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  const base = useId();

  return (
    <section className="bg-white pb-16 pt-6 sm:pb-24 lg:pb-[clamp(80px,8vw,150px)]">
      <div className={`${WRAP} max-w-[1100px]`}>
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="mt-8 space-y-2 rounded-2xl bg-[#f1f1f1] p-2.5 sm:mt-12 sm:space-y-2.5 sm:p-3.5">
          {items.map((it, i) => (
            <Reveal key={it.question} delay={Math.min(i, 5) * 60}>
              <FaqItem
                id={`${base}-${i}`}
                q={it.question}
                a={it.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  The page                                                            */
/* ------------------------------------------------------------------ */
export default function ServicePage({ data }) {
  const { hero, intro, solutions, caseStudies, faq } = data;
  return (
    <main className="overflow-x-clip bg-white text-[#07090d]">
      <ServiceHero {...hero} />
      <ServiceIntro {...intro} />
      <ServiceCardSection {...solutions} variant="light" />
      <ServiceCardSection {...caseStudies} variant="dark" />
      <ServiceFaq {...faq} />
    </main>
  );
}