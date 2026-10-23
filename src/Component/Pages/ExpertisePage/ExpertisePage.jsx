import React, { useEffect, useId, useRef, useState } from "react";
import ContactUs from '../../Section/ContactUsSections'

const WRAP = "mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-[4vw]";
const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

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

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-900 ${EASE} motion-reduce:translate-y-0! motion-reduce:opacity-100! motion-reduce:transition-none ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        } ${className}`}
    >
      {children}
    </div>
  );
}

function ExpertiseHero({ title, image }) {
  const [ready, setReady] = useState(false);
  console.log(image)
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
          className={`absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-2200 ${EASE} motion-reduce:transition-none ${ready ? "scale-100" : "scale-[1.12]"
            }`}
        />
      ) : (
        <div className="absolute inset-0 -z-20 bg-linear-to-br from-neutral-700 via-neutral-900 to-black" />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/45 to-black/65" />

      <h1 className="max-w-[14ch] text-[clamp(38px,7vw,128px)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
        {words.map((w, i) => (
          <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom last:mr-0">
            <span
              style={{ transitionDelay: `${200 + i * 120}ms` }}
              className={`inline-block transition-transform duration-1000 ${EASE} motion-reduce:translate-y-0! motion-reduce:transition-none ${ready ? "translate-y-0" : "translate-y-[110%]"
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


function ExpertiseHeading({ title, subtitle, dark = false }) {
  return (
    <Reveal className="mx-auto max-w-190 text-center">
      <h2 className="text-[clamp(26px,3.4vw,56px)] font-medium leading-[1.1] tracking-[-0.035em]">{title}</h2>
      {subtitle && (
        <p
          className={`mx-auto mt-3 max-w-[60ch] text-[clamp(13px,1.1vw,18px)] leading-[1.45] sm:mt-4 ${dark ? "text-neutral-400" : "text-neutral-500"
            }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}


function ExpertiseIntro({ title, subtitle, paragraphs = [], image, imageAlt = "", cta, imageFit = "cover" }) {
  const contain = imageFit === "contain";
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[clamp(72px,7vw,130px)]">
      <div className={WRAP}>
        <ExpertiseHeading title={title} subtitle={subtitle} />

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
            {/* <div className="group relative h-full min-h-65 overflow-hidden rounded-2xl bg-red-500 sm:min-h-90 lg:min-h-105">
              {image ? (
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    objectFit: contain ? "contain" : "cover",
                    padding: contain ? "clamp(32px, 6vw, 96px)" : 0,
                  }}
                  className={`absolute inset-0 h-full w-full transition-transform duration-1400 ${EASE} motion-reduce:transition-none ${contain ? "" : "group-hover:scale-105"
                    }`}
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-neutral-300 to-neutral-400" />
              )}
            </div> */}
            <div
              className={`group relative h-full min-h-65 overflow-hidden rounded-2xl sm:min-h-90 lg:min-h-105 ${contain ? "flex items-center justify-center bg-neutral-100" : "bg-neutral-200"
                }`}
            >
              {image ? (
                contain ? (
                  <img
                    src={image}
                    alt={imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square h-auto w-[55%] max-w-90 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={image}
                    alt={imageAlt}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1400 ${EASE} group-hover:scale-105 motion-reduce:transition-none`}
                  />
                )
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-neutral-300 to-neutral-400" />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


function NumberedCard({ item, index }) {
  const number = item.number ?? String(index + 1).padStart(2, "0");
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 transition duration-500 hover:-translate-y-1.5 hover:border-transparent hover:bg-[#07090d] hover:text-white hover:shadow-2xl sm:p-7">
      <div className="flex items-start justify-between">
        <span className="text-[clamp(44px,4.6vw,76px)] font-light leading-none tracking-[-0.04em] text-transparent transition duration-500 [-webkit-text-stroke:1px_rgba(0,0,0,0.35)] group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.85)]">
          {number}
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-black/15 transition duration-500 group-hover:rotate-45 group-hover:border-white/40 group-hover:bg-white group-hover:text-black">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </div>
      <div className="mt-6 h-px w-10 bg-black/20 transition-all duration-700 group-hover:w-full group-hover:bg-white/30" />
      <h3 className="mt-5 text-[clamp(16px,1.35vw,22px)] font-semibold leading-snug tracking-tight">{item.title}</h3>
      <p className="mt-3 text-[clamp(12.5px,0.95vw,15px)] leading-[1.55] text-neutral-600 transition-colors duration-500 group-hover:text-neutral-300">
        {item.text}
      </p>
    </article>
  );
}

function SpotlightCard({ item, index }) {
  const ref = useRef(null);
  const number = item.number ?? String(index + 1).padStart(2, "0");

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-6 transition duration-500 hover:-translate-y-1.5 hover:border-white/25 sm:p-7"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(380px circle at var(--x, 50%) var(--y, 0%), rgba(255,255,255,0.13), transparent 60%)" }}
      />
      <div className="relative">
        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-white/20 px-2 text-[12px] text-white/70 transition duration-500 group-hover:border-white/50 group-hover:text-white">
          {number}
        </span>
        <h3 className="mt-5 text-[clamp(16px,1.35vw,22px)] font-semibold leading-snug tracking-tight text-white">{item.title}</h3>
        <p className="mt-3 text-[clamp(12.5px,0.95vw,15px)] leading-[1.55] text-neutral-400 transition-colors duration-500 group-hover:text-neutral-300">
          {item.text}
        </p>
      </div>
    </article>
  );
}

const CARD_VARIANTS = {
  numbered: { section: "bg-[#f5f5f3]", Card: NumberedCard, dark: false },
  spotlight: { section: "bg-[#07090d] text-white", Card: SpotlightCard, dark: true },
};

/* heading + 6 cards (responsive: 1 → 2 → 3 columns, staggered reveal) */
function ExpertiseCardSection({ title, subtitle, items = [], variant = "numbered" }) {
  const { section, Card, dark } = CARD_VARIANTS[variant] || CARD_VARIANTS.numbered;
  return (
    <section className={`${section} py-12 sm:py-16 lg:py-[clamp(64px,6vw,110px)]`}>
      <div className={WRAP}>
        <ExpertiseHeading title={title} subtitle={subtitle} dark={dark} />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">
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
        className={`grid transition-[grid-template-rows,opacity] duration-500 ${EASE} motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-5 text-[clamp(12.5px,0.95vw,15px)] leading-[1.6] text-neutral-600 sm:px-6">{a}</p>
        </div>
      </div>
    </div>
  );
}

function ExpertiseFaq({ title, subtitle, items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  const base = useId();

  return (
    <section className="bg-white pb-16 pt-6 sm:pb-24 lg:pb-[clamp(80px,8vw,150px)]">
      <div className={`${WRAP} max-w-275`}>
        <ExpertiseHeading title={title} subtitle={subtitle} />
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


export default function ExpertisePage({ data }) {
  const { hero, intro, solutions, caseStudies, faq } = data;
  return (
    <main className="overflow-x-clip bg-white text-[#07090d]">
      <ExpertiseHero {...hero} />
      <ExpertiseIntro {...intro} />
      <ExpertiseCardSection {...solutions} variant="numbered" />
      <ExpertiseCardSection {...caseStudies} variant="spotlight" />
      <ExpertiseFaq {...faq} />
      <ContactUs/>
    </main>
  );
}