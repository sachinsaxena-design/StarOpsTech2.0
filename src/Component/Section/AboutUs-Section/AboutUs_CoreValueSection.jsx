import React, { useEffect, useRef } from "react";
import authenticity from "../../../assets/about-image/authenticity.png";
import arms from "../../../assets/about-image/arms.png";
import employee from "../../../assets/about-image/employee.png";
import opportunity from "../../../assets/about-image/opportunity.png";
import perfection from "../../../assets/about-image/perfection.png";
import teamleader from "../../../assets/about-image/team-leader.png";
import pythonIcon from "../../../assets/python-icon.png";
import reactIcon from "../../../assets/react.png";
import nextIcon from "../../../assets/nextjs.png";
import devopsIcon from "../../../assets/devops-icon.png";
import djangoIcon from "../../../assets/django-icon.png";
import flutterIcon from "../../../assets/flutter-icon.png";


const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
const mix = (a, b, t) => Math.round(a + (b - a) * t);

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap');
.cv-sans { font-family: 'Inter Tight', system-ui, sans-serif; }

/* reveal: toggles in/out so it replays whenever the section is reached */
.cv-rv { opacity: 0; transform: translateY(36px); filter: blur(8px);
  transition: opacity .9s cubic-bezier(.22,1,.36,1), transform 1.1s cubic-bezier(.22,1,.36,1), filter .9s cubic-bezier(.22,1,.36,1);
  transition-delay: var(--d, 0ms); will-change: opacity, transform; }
.cv-rv.is-in { opacity: 1; transform: none; filter: blur(0); }

/* heading words rise out of a mask */
.cv-mask { display: inline-block; overflow: hidden; padding-bottom: .14em; margin-bottom: -.14em; vertical-align: bottom; }
.cv-word { display: inline-block; transform: translateY(115%); transition: transform 1s cubic-bezier(.22,1,.36,1); transition-delay: var(--d, 0ms); }
.is-in .cv-word { transform: none; }

/* cards */
.cv-card { position: relative; overflow: hidden; background: #fff; border: 1px solid rgba(7,9,13,.07);
  transition: transform .55s cubic-bezier(.22,1,.36,1), box-shadow .55s cubic-bezier(.22,1,.36,1), border-color .4s; }
.cv-card::before { content: ""; position: absolute; inset: 0; border-radius: inherit; opacity: 0; pointer-events: none;
  transition: opacity .45s; background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgba(7,9,13,.07), transparent 65%); }
.cv-card:hover { transform: translateY(-6px); border-color: rgba(7,9,13,.16); box-shadow: 0 28px 50px -28px rgba(7,9,13,.28); }
.cv-card:hover::before { opacity: 1; }
.cv-icon { background: #f2f2f2; color: #07090d; transition: background-color .45s, color .45s, transform .6s cubic-bezier(.22,1,.36,1); }
.cv-card:hover .cv-icon { background: #07090d; color: #fff; transform: rotate(-6deg) scale(1.06); }
.cv-img { transition: filter .45s; }
.cv-card:hover .cv-img { filter: invert(1); }
.cv-bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: #07090d; transform: scaleX(0); transform-origin: left; transition: transform .7s cubic-bezier(.22,1,.36,1); }
.cv-card:hover .cv-bar { transform: scaleX(1); }

/* ---- technologies cards: dark fill wipes in from the cursor ---- */
.tc { position: relative; overflow: hidden; isolation: isolate; background: #f5f5f5; color: #07090d;
  transition: color .5s; }
.tc::before { content: ""; position: absolute; inset: 0; z-index: -1; background: #07090d;
  clip-path: circle(0px at var(--mx, 50%) var(--my, 100%));
  transition: clip-path .8s cubic-bezier(.22,1,.36,1); }
.tc:hover::before { clip-path: circle(150% at var(--mx, 50%) var(--my, 100%)); }
.tc:hover { color: #fff; }
.tc .tc-text { color: #737373; transition: color .5s; }
.tc:hover .tc-text { color: rgba(255,255,255,.72); }
.tc .tc-rule { background: rgba(7,9,13,.1); transition: background-color .5s; }
.tc:hover .tc-rule { background: rgba(255,255,255,.18); }
.tc .tc-img { transition: filter .5s, transform .7s cubic-bezier(.22,1,.36,1); }
.tc:hover .tc-img { filter: invert(1); transform: scale(1.08) rotate(-4deg); }
.tc .tc-go { background: #07090d; color: #fff; transition: background-color .5s, color .5s, transform .6s cubic-bezier(.22,1,.36,1); }
.tc:hover .tc-go { background: #fff; color: #07090d; transform: rotate(45deg); }
@media (hover: none) { .tc::before { clip-path: none; opacity: 0; } .tc:hover { color: #07090d; } .tc:hover .tc-text { color: #737373; } .tc:hover .tc-img { filter: none; transform: none; } .tc:hover .tc-go { background: #07090d; color: #fff; transform: none; } }
@media (prefers-reduced-motion: reduce) { .tc, .tc::before, .tc .tc-text, .tc .tc-rule, .tc .tc-img, .tc .tc-go { transition: none !important; } }

@media (prefers-reduced-motion: reduce) {
  .cv-rv, .cv-word, .cv-card, .cv-icon, .cv-bar { transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
  .cv-card:hover .cv-bar { transform: scaleX(1) !important; }
}
`;

const VALUES = [
  {
    icon: authenticity,
    title: "Authenticity",
    text: "At StarOps, authenticity is our core value. Our dedicated team follows industry best practices to deliver exceptional results, ensuring trust and reliability. We believe in being true to our commitments and delivering excellence.",
  },
  {
    icon: arms,
    title: "Diversity",
    text: "Diversity is embraced at StarOps. Our team, diverse in skills and perspectives, collaborates to deliver the best results. We believe that a varied team brings creativity and innovation, ensuring we meet unique challenges effectively.",
  },
  {
    icon: employee,
    title: "Technology",
    text: "StarOps boasts a high-tech team that excels in delivering cutting-edge solutions. Our experts follow industry best practices, staying at the forefront of technology to ensure we provide the most advanced and innovative services.",
  },
  {
    icon: opportunity,
    title: "Opportunity",
    text: "At StarOps, we see opportunities in every challenge. Our team is driven to explore possibilities and turn challenges into successes. We believe in continuous improvement, creating a culture where opportunities thrive.",
  },
  {
    icon: perfection,
    title: "Perfection",
    text: "Striving for perfection is ingrained in StarOps' culture. Our dedicated team follows the best practices in the industry, aiming for perfection in every aspect. We believe in delivering solutions that meet the highest standards.",
  },
  {
    icon: teamleader,
    title: "Leadership",
    text: "Leadership is a fundamental value at StarOps. Our team operates with a leadership mindset, taking ownership and guiding projects to success. We believe in fostering leadership qualities within our team for continuous growth.",
  },
];

const STATEMENT =
  "From early-stage ideas to evolving digital products, we work closely with our clients to turn challenges into thoughtful, scalable solutions that create lasting value.";

function Spark({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill="currentColor">
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

function PillButton({ href = "/contact", children }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-[clamp(20px,2.4vw,40px)] rounded-full bg-[#07090d] py-[3px] pl-[clamp(20px,1.9vw,32px)] pr-[3px] text-[clamp(14px,1.05vw,18px)] font-medium text-white transition duration-300 hover:-translate-y-0.5"
    >
      {children}
      <span className="grid h-[clamp(38px,3.1vw,52px)] w-[clamp(38px,3.1vw,52px)] place-items-center rounded-full border border-[#07090d] bg-white text-black transition-transform duration-300 group-hover:translate-x-0.5">
        <svg viewBox="0 0 24 24" className="h-[42%] w-[42%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}

function ValueCard({ v, delay }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className="cv-rv" style={{ "--d": `${delay}ms` }}>
      <article
        onMouseMove={onMove}
        className="cv-card flex h-full flex-col rounded-[clamp(18px,1.4vw,26px)] p-[clamp(24px,2.2vw,40px)]"
      >
        <div className="cv-icon grid h-[clamp(52px,4vw,68px)] w-[clamp(52px,4vw,68px)] place-items-center rounded-[clamp(14px,1.1vw,20px)]">
          <img src={v.icon} alt="" draggable="false" className="cv-img h-[62%] w-[62%] object-contain" />
        </div>
        <h3 className="mt-[clamp(28px,3vw,52px)] text-[clamp(20px,1.6vw,28px)] font-medium tracking-[-0.03em]">{v.title}</h3>
        <p className="mt-[0.7em] text-[clamp(15px,1.1vw,19px)] leading-[1.45] tracking-[-0.01em] text-neutral-500">{v.text}</p>
        <span className="cv-bar" aria-hidden="true" />
      </article>
    </div>
  );
}

function ValuesSection() {
  const rootRef = useRef(null);
  const stmtRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 1) reveal / replay on enter
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.target.classList.toggle("is-in", en.isIntersecting)),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    root.querySelectorAll(".cv-rv").forEach((el) => io.observe(el));

    // 2) scroll-linked word-by-word fill on the closing statement
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const el = stmtRef.current;
      if (!el) return;
      const words = wordsRef.current;
      const n = words.length;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const start = vh * 0.88;
      const end = vh * 0.4;
      const p = reduced ? 1 : clamp((start - r.top) / (start - end + r.height * 0.5), 0, 1);
      words.forEach((w, i) => {
        if (!w) return;
        const t = clamp(p * (n + 3) - i, 0, 1);
        const c = mix(205, 7, t);
        w.style.color = `rgb(${c},${c},${mix(210, 13, t)})`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const words = STATEMENT.split(" ");

  return (
    <section
      ref={rootRef}
      className="cv-sans relative overflow-x-clip bg-[#f5f5f5] px-[clamp(12px,1.7vw,32px)] py-[clamp(72px,9vw,150px)] text-[#07090d]"
      aria-label="Our core values"
    >
      {/* header */}
      <div className="mx-auto flex max-w-[1750px] flex-col items-center text-center">
        <div className="cv-rv flex items-center gap-2 text-[clamp(14px,1.05vw,18px)] font-medium" style={{ "--d": "0ms" }}>
          <Spark className="h-[1.1em] w-[1.1em]" />
          <span>Our core values</span>
        </div>

        <h2 className="cv-rv mt-[clamp(16px,1.6vw,28px)] max-w-[20ch] text-[clamp(34px,4.4vw,80px)] font-semibold leading-[1.05] tracking-[-0.045em]" style={{ "--d": "80ms" }}>
          {["Excellence", "in", "every", "line", "of", "code"].map((w, i) => (
            <React.Fragment key={i}>
              <span className="cv-mask">
                <span className="cv-word" style={{ "--d": `${120 + i * 70}ms` }}>{w}</span>
              </span>{" "}
            </React.Fragment>
          ))}
        </h2>

        <p className="cv-rv mt-[clamp(18px,1.8vw,30px)] max-w-[40em] text-[clamp(15px,1.15vw,20px)] leading-[1.4] tracking-[-0.01em] text-neutral-500" style={{ "--d": "300ms" }}>
          We believe great digital products start with great standards. From thoughtful planning to precise execution,
          we combine best practices, technical expertise, and a commitment to quality to deliver work we’re proud to
          stand behind.
        </p>
      </div>

      {/* cards */}
      <div className="mx-auto mt-[clamp(40px,5vw,88px)] grid max-w-[1750px] gap-[clamp(10px,1vw,20px)] sm:grid-cols-2 xl:grid-cols-3">
        {VALUES.map((v, i) => (
          <ValueCard key={v.title} v={v} delay={(i % 3) * 120} />
        ))}
      </div>

      {/* closing statement */}
      <div className="mx-auto mt-[clamp(72px,9vw,160px)] grid max-w-[1750px] gap-y-8 px-[clamp(12px,3vw,56px)] md:grid-cols-[minmax(0,26%)_minmax(0,1fr)] md:gap-x-[clamp(40px,7vw,112px)] md:px-[calc(8.6vw-1.7vw)]">
        <div className="cv-rv flex items-start gap-2 text-[clamp(14px,1.05vw,18px)] font-medium md:pt-[0.7em]">
          <Spark className="mt-[0.15em] h-[1.1em] w-[1.1em]" />
          <span>Trusted by ambitious teams</span>
        </div>

        <div>
          <p ref={stmtRef} className="max-w-[26em] text-[clamp(26px,3.3vw,62px)] font-medium leading-[1.12] tracking-[-0.04em]" aria-label={STATEMENT}>
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span
                  ref={(el) => (wordsRef.current[i] = el)}
                  aria-hidden="true"
                  style={{ color: "rgb(205,205,210)", transition: "color .25s linear" }}
                >
                  {w}
                </span>{" "}
              </React.Fragment>
            ))}
          </p>

          <div className="cv-rv mt-[clamp(24px,2.6vw,48px)]" style={{ "--d": "150ms" }}>
            <PillButton href="/careers">Join us now</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- EMERGING TECHNOLOGIES ---------- */
const TECH = [
  {
    icon: pythonIcon,
    title: "Python",
    text: "StarOps harnesses the power of Python for versatile and efficient software development. Our Python experts ensure robust and scalable solutions, making us a reliable choice for diverse projects.",
  },
  {
    icon: reactIcon,
    title: "React Js",
    text: "StarOps excels in ReactJS development, creating dynamic and responsive user interfaces. Our team leverages the power of ReactJS to deliver engaging and high-performance web applications for our clients.",
  },
  {
    icon: nextIcon,
    title: "Next Js",
    text: "With Next.js, StarOps brings server-side rendering and efficient React applications to the forefront. Our team leverages Next.js to build scalable and SEO-friendly web solutions for our clients.",
  },
  {
    icon: devopsIcon,
    title: "DevOps",
    text: "At StarOps, we embrace DevOps practices to streamline our development and operations processes. Our dedicated team ensures seamless collaboration, continuous integration, and reliable delivery for exceptional results.",
  },
  {
    icon: djangoIcon,
    title: "Django",
    text: "Incorporating Django, StarOps develops secure and scalable web applications. Our Django specialists follow best practices to deliver high-quality solutions, ensuring the success of our clients' projects.",
  },
  {
    icon: flutterIcon,
    title: "Flutter",
    text: "StarOps excels in Flutter development, delivering cutting-edge solutions for cross-platform applications. Our team focuses on creating applications that seamlessly adapt to modern business requirements.",
  },
];

function TechCard({ t, delay }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className="cv-rv min-w-0" style={{ "--d": `${delay}ms` }}>
      <article
        onMouseEnter={onMove}
        onMouseMove={onMove}
        className="tc flex h-full flex-col rounded-[clamp(20px,1.8vw,32px)] p-[clamp(22px,2.2vw,40px)]"
      >
        <div className="flex items-center gap-[clamp(12px,1.1vw,20px)]">
          <img src={t.icon} alt="" draggable="false" className="tc-img h-[clamp(40px,3.6vw,60px)] w-[clamp(40px,3.6vw,60px)] shrink-0 object-contain" />
          <h3 className="min-w-0 flex-1 text-[clamp(22px,2vw,34px)] font-medium tracking-[-0.04em]">{t.title}</h3>
          <span className="tc-go grid h-[clamp(34px,2.6vw,44px)] w-[clamp(34px,2.6vw,44px)] shrink-0 place-items-center rounded-full" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-[42%] w-[42%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 19 19 5M8 5h11v11" />
            </svg>
          </span>
        </div>

        <span className="tc-rule my-[clamp(18px,1.8vw,32px)] block h-px w-full" aria-hidden="true" />

        <p className="tc-text text-[clamp(15px,1.1vw,19px)] leading-[1.5] tracking-[-0.01em]">{t.text}</p>
      </article>
    </div>
  );
}

function TechSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.target.classList.toggle("is-in", en.isIntersecting)),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    root.querySelectorAll(".cv-rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="cv-sans relative overflow-x-clip bg-white px-[clamp(12px,1.7vw,32px)] py-[clamp(72px,9vw,150px)] text-[#07090d]"
      aria-label="Technologies we use"
    >
      <div className="mx-auto flex max-w-[1750px] flex-col items-center text-center">
        <h2 className="cv-rv max-w-[18ch] text-[clamp(32px,4.2vw,76px)] font-semibold leading-[1.05] tracking-[-0.045em]" style={{ "--d": "0ms" }}>
          {["Using", "Emerging", "Technologies"].map((w, i) => (
            <React.Fragment key={i}>
              <span className="cv-mask">
                <span className="cv-word" style={{ "--d": `${100 + i * 90}ms` }}>{w}</span>
              </span>{" "}
            </React.Fragment>
          ))}
        </h2>
        <p className="cv-rv mt-[clamp(16px,1.6vw,28px)] max-w-[36em] text-[clamp(15px,1.15vw,20px)] leading-[1.4] tracking-[-0.01em] text-neutral-500" style={{ "--d": "260ms" }}>
          Capitalizing on cutting-edge technologies, our exceptional team ensures superior results by following
          industry-best practices.
        </p>
      </div>

      <div className="mx-auto mt-[clamp(36px,5vw,88px)] grid max-w-[1750px] gap-[clamp(10px,1vw,20px)] sm:grid-cols-2 lg:grid-cols-3">
        {TECH.map((t, i) => (
          <TechCard key={t.title} t={t} delay={(i % 3) * 120} />
        ))}
      </div>
    </section>
  );
}

/* ---------- default export: both sections, one stylesheet ---------- */
export default function CoreValues() {
  return (
    <>
      <style>{styles}</style>
      <ValuesSection />
      <TechSection />
    </>
  );
}

export { ValuesSection, TechSection };