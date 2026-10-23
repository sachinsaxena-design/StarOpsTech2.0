import React, { useEffect, useId, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Reusable FAQ section.

   Usage:
     import FaqAccordion, { Accordion } from "./FaqAccordion";

     <FaqAccordion
       label="Have questions?"
       items={[
         { question: "What services do you offer?", answer: "..." },
         { question: "How long does a project take?", answer: "..." },
       ]}
     />

   Props (all optional except items):
     items          [{ question: string, answer: string | ReactNode }]
     label          small text next to the spark icon
     heading        ReactNode shown on the left (default: "Find The answers")
     defaultOpen    index open on first render (default: -1 = all closed)
     multiple       true = several items can be open at once (default: false)
     className      extra classes on the <section>

   Need just the list with no heading column? Use <Accordion items={...} />.
------------------------------------------------------------------- */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Playball&display=swap');
.fq-sans   { font-family: 'Inter Tight', system-ui, sans-serif; }
.fq-script { font-family: 'Playball', cursive; font-weight: 400; letter-spacing: 0; }

/* reveal on enter (replays every time the section is reached) */
.fq-rv { opacity: 0; transform: translateY(30px); filter: blur(6px);
  transition: opacity .8s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1), filter .8s cubic-bezier(.22,1,.36,1);
  transition-delay: var(--d, 0ms); }
.fq-rv.is-in { opacity: 1; transform: none; filter: blur(0); }

/* item: reveal (opacity/transform/filter, staggered) + hover/open transitions together */
.fq-item { background: #f4f4f4; opacity: 0; transform: translateY(30px); filter: blur(6px);
  transition: opacity .8s cubic-bezier(.22,1,.36,1) var(--d, 0ms), transform 1s cubic-bezier(.22,1,.36,1) var(--d, 0ms),
              filter .8s cubic-bezier(.22,1,.36,1) var(--d, 0ms), background-color .4s ease 0s, box-shadow .5s ease 0s; }
.fq-item.is-in { opacity: 1; transform: none; filter: blur(0); }
.fq-item:hover { background: #efefef; }
.fq-item.is-open { background: #fff; box-shadow: 0 0 0 1px rgba(7,9,13,.08), 0 24px 40px -28px rgba(7,9,13,.25); }

/* plus -> cross */
.fq-icon { background: #07090d; color: #fff; transition: transform .55s cubic-bezier(.22,1,.36,1), background-color .3s; }
.fq-item.is-open .fq-icon { transform: rotate(135deg); }
.fq-btn:focus-visible { outline: 2px solid #07090d; outline-offset: -2px; border-radius: inherit; }

/* smooth height without measuring: grid rows 0fr -> 1fr */
.fq-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .6s cubic-bezier(.22,1,.36,1); }
.fq-item.is-open .fq-panel { grid-template-rows: 1fr; }
.fq-inner { overflow: hidden; min-height: 0; }
.fq-answer { opacity: 0; transform: translateY(-8px); transition: opacity .45s ease, transform .6s cubic-bezier(.22,1,.36,1); }
.fq-item.is-open .fq-answer { opacity: 1; transform: none; transition-delay: .12s; }

@media (prefers-reduced-motion: reduce) {
  .fq-rv, .fq-item, .fq-icon, .fq-panel, .fq-answer { transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
  .fq-item.is-open .fq-icon { transform: rotate(135deg) !important; }
}
`;

const DEFAULT_ITEMS = [
  {
    question: "What services do you offer?",
    answer:
      "We build software and web products end to end: custom web apps, mobile apps, SaaS platforms, and IT consulting and digital transformation, backed by DevOps for reliable delivery.",
  },
  {
    question: "Do you work with startups or only big brands?",
    answer:
      "Both. We work with early-stage founders turning an idea into a first product, and with established businesses modernising how they operate.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A focused MVP can take a few weeks, while larger platforms run for several months. We share a clear timeline after the first discovery call.",
  },
  {
    question: "Do you offer ongoing development and support?",
    answer:
      "Yes. After launch we stay on for maintenance, new features, monitoring and performance work, so your product keeps improving.",
  },
];

function Spark({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill="currentColor">
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

/* ---------- the list only ---------- */
export function Accordion({ items = DEFAULT_ITEMS, defaultOpen = -1, multiple = false }) {
  const uid = useId();
  const listRef = useRef(null);
  const [open, setOpen] = useState(() => new Set(defaultOpen >= 0 ? [defaultOpen] : []));

  // reveal state is kept in React (NOT classList) so re-renders never wipe it
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([en]) => setInView(en.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div ref={listRef} className="fq-sans flex flex-col gap-[clamp(8px,0.9vw,16px)]">
      <style>{styles}</style>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        const btnId = `${uid}-b${i}`;
        const panelId = `${uid}-p${i}`;
        return (
          <div
            key={i}
            className={`fq-item rounded-[clamp(16px,1.3vw,24px)] ${inView ? "is-in" : ""} ${isOpen ? "is-open" : ""}`}
            style={{ "--d": `${i * 90}ms` }}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                className="fq-btn flex w-full items-center justify-between gap-4 px-[clamp(18px,1.8vw,34px)] py-[clamp(18px,1.9vw,34px)] text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="min-w-0 text-[clamp(16px,1.35vw,24px)] font-medium leading-tight tracking-[-0.02em]">
                  {it.question}
                </span>
                <span className="fq-icon grid h-[clamp(26px,1.9vw,32px)] w-[clamp(26px,1.9vw,32px)] shrink-0 place-items-center rounded-full" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>

            <div id={panelId} role="region" aria-labelledby={btnId} className="fq-panel">
              <div className="fq-inner">
                <div className="fq-answer px-[clamp(18px,1.8vw,34px)] pb-[clamp(18px,1.9vw,34px)] pr-[clamp(56px,5vw,96px)] text-[clamp(14px,1.1vw,19px)] leading-normal tracking-[-0.01em] text-neutral-500">
                  {it.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- full section (heading left, list right) ---------- */
export default function FaqAccordion({
  items = DEFAULT_ITEMS,
  label = "Have questions?",
  heading,
  defaultOpen = -1,
  multiple = false,
  className = "",
}) {
  const ref = useRef(null);

  // reveal state lives in React (not classList) so nothing can wipe it; observe the whole section
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([en]) => setInView(en.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`fq-sans relative overflow-x-clip bg-white px-6 py-[clamp(64px,9vw,150px)] text-[#07090d] sm:px-10 md:px-[8.6vw] ${className}`}
      aria-label="Frequently asked questions"
    >
      <style>{styles}</style>

      <div className="mx-auto grid max-w-[1750px] gap-x-[clamp(40px,7vw,112px)] gap-y-[clamp(28px,5vw,56px)] md:grid-cols-[minmax(0,26%)_minmax(0,1fr)]">
        {/* left: label + heading */}
        <div className="md:pt-[0.2em]">
          <div className={`fq-rv ${inView ? "is-in" : ""} flex items-center gap-2 text-[clamp(13px,1.05vw,18px)] font-medium`}>
            <Spark className="h-[1.1em] w-[1.1em]" />
            <span>{label}</span>
          </div>

          <h2 className={`fq-rv ${inView ? "is-in" : ""} mt-[clamp(12px,1.2vw,20px)] text-[clamp(44px,5.6vw,108px)] font-medium leading-[1.02] tracking-tighter`} style={{ "--d": "100ms" }}>
            {heading ?? (
              <>
                Find <span className="fq-script tracking-normal">The</span>
                <br />
                answers
              </>
            )}
          </h2>
        </div>

        {/* right: list */}
        <div className="min-w-0">
          <Accordion items={items} defaultOpen={defaultOpen} multiple={multiple} />
        </div>
      </div>
    </section>
  );
}