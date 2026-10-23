import React, { useEffect, useRef } from "react";
import missionImg from "../../../assets/about-image/mission.jpg";
import client1 from "../../../assets/ContactVerse.png";
import client2 from "../../../assets/Arcaptor.jpg";
import client3 from "../../../assets/cxpoint.png";
import client4 from "../../../assets/six30labs.png";
import client5 from "../../../assets/ashok.jpeg";
import client6 from "../../../assets/nitin.png";

/* Client avatars, in stacking order (first = back, last = front).
   fit: "cover"   -> photos, fill the tile
        "contain" -> logos, shown whole with a little padding
   bg:  tile background behind the image (logos with transparent areas need one;
        use a dark bg like "#05070a" for white/light logos so they stay visible) */
const CLIENTS = [
  { src: client1, fit: "contain", bg: "#d946ef" }, // ContactVerse (white logo on pink)
  { src: client2, fit: "cover", bg: "#ffffff" },
  { src: client3, fit: "contain", bg: "#ffffff" }, // cxpoint
  { src: client4, fit: "contain", bg: "#ffffff" },
  { src: client5, fit: "cover", bg: "#ffffff" },
  { src: client6, fit: "cover", bg: "#ffffff" },
];

const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Instrument+Serif:ital@1&display=swap');
.ab-sans { font-family: 'Inter Tight', system-ui, sans-serif; }
.ab-serif { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; }

/* scroll reveal: toggles in/out so it replays every time the section is reached */
.ab-rv { opacity: 0; transform: translateY(34px); filter: blur(8px);
  transition: opacity .9s cubic-bezier(.22,1,.36,1), transform 1.1s cubic-bezier(.22,1,.36,1), filter .9s cubic-bezier(.22,1,.36,1);
  transition-delay: var(--d, 0ms); will-change: opacity, transform; }
.ab-rv.is-in { opacity: 1; transform: none; filter: blur(0); }
.ab-card { clip-path: inset(14% 14% 14% 14% round 40px); transform: scale(.94);
  transition: clip-path 1.4s cubic-bezier(.22,1,.36,1) .1s, transform 1.4s cubic-bezier(.22,1,.36,1) .1s; }
.ab-card.is-in { clip-path: inset(0% 0% 0% 0% round 22px); transform: none; }
.ab-card img { transform: scale(1.18); transition: transform 1.8s cubic-bezier(.22,1,.36,1) .1s; }
.ab-card.is-in img { transform: scale(1); }
@media (prefers-reduced-motion: reduce) {
  .ab-rv, .ab-card, .ab-card img { transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; clip-path: none !important; }
}
`;

function Spark({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill="currentColor">
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

function PillButton({ href = "/contact", children, dark = true }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-[clamp(20px,2.4vw,40px)] rounded-full py-[3px] pl-[clamp(20px,1.9vw,32px)] pr-[3px] text-[clamp(14px,1.05vw,18px)] font-medium transition duration-300 hover:-translate-y-0.5 ${
        dark ? "bg-[#07090d] text-white" : "bg-white text-black"
      }`}
    >
      {children}
      <span
        className={`grid h-[clamp(38px,3.1vw,52px)] w-[clamp(38px,3.1vw,52px)] place-items-center rounded-full border transition-transform duration-300 group-hover:translate-x-0.5 ${
          dark ? "border-[#07090d] bg-white text-black" : "border-white bg-black text-white"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-[42%] w-[42%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}

/* ---------- MISSION (light theme) ---------- */
const GOALS = [
  "Software & Web Development",
  "Mobile App Development",
  "SaaS Product Development",
  "IT Consulting & Digital Transformation",
  "Smart solutions, tailored for you",
];

const mix = (a, b, t) => Math.round(a + (b - a) * t);

/* ---------- STATS ---------- */
const STATS = [
  { title: "Years of experience", value: 6, suffix: "+", text: "Expertise that drives meaningful results." },
  { featured: true, value: 98, suffix: "%", text: "Clients stay for our quality and results." },
  { title: "Projects delivered", value: 100, suffix: "+", text: "Creative solutions built with purpose." },
  { title: "Brands transformed", value: 86, suffix: "+", text: "From strategy to standout visuals." },
];

// counts up from 0 each time the number scrolls into view
function CountUp({ to, suffix }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const out = el.querySelector("[data-n]");
    let raf = 0;

    const run = () => {
      cancelAnimationFrame(raf);
      if (reduced) {
        out.textContent = String(to);
        return;
      }
      const start = performance.now();
      const dur = 1700;
      const tick = (now) => {
        const t = clamp((now - start) / dur, 0, 1);
        const e = 1 - Math.pow(1 - t, 4); // easeOutQuart
        out.textContent = String(Math.round(to * e));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) run();
        else {
          cancelAnimationFrame(raf);
          out.textContent = "0";
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="inline-flex items-baseline leading-none tabular-nums" aria-label={`${to}${suffix}`}>
      <span data-n aria-hidden="true">0</span>
      <span aria-hidden="true" className="ab-serif ml-[0.04em] text-[0.55em]">{suffix}</span>
    </span>
  );
}

function Stars() {
  return (
    <div className="flex gap-[3px]" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-[clamp(13px,0.95vw,17px)] w-[clamp(13px,0.95vw,17px)]" fill="currentColor" aria-hidden="true">
          <path d="m12 1.8 3 6.8 7.4.7-5.6 4.9 1.7 7.3L12 17.7 5.5 21.5l1.7-7.3L1.6 9.3 9 8.6z" />
        </svg>
      ))}
    </div>
  );
}

function StatCard({ stat, delay }) {
  const dark = !!stat.featured;
  return (
    <div
      className={`ab-rv flex min-h-[clamp(240px,15.8vw,300px)] flex-col justify-between rounded-[clamp(16px,1.1vw,22px)] p-[clamp(22px,1.8vw,34px)] ${
        dark ? "bg-[#05070a] text-white" : "bg-white text-[#07090d]"
      }`}
      style={{ "--d": `${delay}ms` }}
    >
      {dark ? (
        <div className="flex items-center gap-[clamp(10px,1vw,18px)] -mt-[0.3em]">
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {CLIENTS.map((c, i) => (
              <img
                key={i}
                src={c.src}
                alt=""
                draggable="false"
                className={`h-[clamp(38px,2.5vw,48px)] w-[clamp(38px,2.5vw,48px)] rounded-[clamp(9px,0.65vw,12px)] border-2 border-[#05070a] ${
                  c.fit === "contain" ? "object-contain p-[5px]" : "object-cover"
                }`}
                style={{
                  backgroundColor: c.bg,
                  marginLeft: i === 0 ? 0 : "calc(clamp(38px,2.5vw,48px) * -0.45)",
                  zIndex: i + 1,
                }}
              />
            ))}
          </div>
          <div>
            <Stars />
            <p className="mt-[0.35em] text-[clamp(14px,1.05vw,18px)] font-medium tracking-[-0.01em] text-white/75">
              Happy clients worldwide
            </p>
          </div>
        </div>
      ) : (
        <h3 className="text-[clamp(14px,1.05vw,18px)] font-medium tracking-[-0.01em]">{stat.title}</h3>
      )}

      <div className="flex items-end justify-between gap-6">
        <div className="text-[clamp(52px,4.8vw,92px)] font-medium tracking-[-0.05em]">
          <CountUp to={stat.value} suffix={stat.suffix} />
        </div>
        <p
          className={`max-w-[13em] pb-[0.3em] text-right text-[clamp(14px,1.1vw,19px)] leading-[1.25] tracking-[-0.01em] ${
            dark ? "text-white/70" : "text-neutral-500"
          }`}
        >
          {stat.text}
        </p>
      </div>
    </div>
  );
}

export default function MissionSection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1) background glides from the gallery's dark to light as the section rises into view
    let raf = 0;
    const paint = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const t = clamp(1 - top / (vh * 0.85), 0, 1);
      const e = t * t * (3 - 2 * t); // smoothstep
      el.style.backgroundColor = `rgb(${mix(5, 245, e)},${mix(7, 245, e)},${mix(10, 245, e)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // 2) staggered content reveal, replays whenever the section is re-entered
    const targets = el.querySelectorAll(".ab-rv, .ab-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => en.target.classList.toggle("is-in", en.isIntersecting));
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const d = (ms) => ({ "--d": `${ms}ms` });

  return (
    <section
      ref={ref}
      className="ab-sans relative z-20 overflow-hidden rounded-t-[clamp(24px,3vw,48px)] py-[clamp(64px,8vw,120px)] text-[#07090d]"
      style={{ backgroundColor: "#05070a" }}
      aria-label="About StarOps"
    >
      <style>{styles}</style>
      <div className="mx-auto grid max-w-[1750px] px-6 sm:px-10 md:px-[8.6vw] gap-x-[clamp(40px,7vw,112px)] gap-y-[clamp(32px,4vw,72px)] md:grid-cols-[minmax(0,26%)_minmax(0,1fr)]">
        {/* row 1 left: label */}
        <div className="ab-rv flex items-start gap-2 text-[clamp(14px,1.05vw,18px)] font-medium md:pt-[0.6em]" style={d(0)}>
          <Spark className="mt-[0.15em] h-[1.1em] w-[1.1em]" />
          <span>More than just a technology partner</span>
        </div>

        {/* row 1 right: heading */}
        <h2 className="text-[clamp(34px,3.8vw,72px)] font-semibold leading-[1.05] tracking-[-0.045em]">
          <span className="ab-rv block" style={d(120)}>Turning technology</span>
          <span className="ab-rv block" style={d(220)}>into business growth</span>
        </h2>

        {/* row 2 left: image card (text is part of the image) */}
        <div className="ab-card overflow-hidden rounded-[22px] bg-neutral-900 md:self-end">
          <img
            src={missionImg}
            alt="People looking up at a glowing wall. Innovative solutions built around your business. — StarOps Technologies"
            className="block aspect-[476/467] h-auto w-full object-cover"
            draggable="false"
          />
        </div>

        {/* row 2 right: mission, goals, button, copyright */}
        <div className="flex flex-col justify-between gap-12">
          <div>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-[clamp(32px,5vw,96px)]">
              <div className="ab-rv" style={d(300)}>
                <h3 className="text-[clamp(20px,1.6vw,28px)] font-medium tracking-[-0.02em]">Our mission</h3>
                <p className="mt-[clamp(14px,1.3vw,22px)] max-w-[28em] text-[clamp(15px,1.15vw,20px)] leading-[1.28] tracking-[-0.01em] text-neutral-500">
                  To deliver <span className="text-[#07090d]">innovative</span>,{" "}
                  <span className="text-[#07090d]">scalable</span>, and tailored technology solutions that help
                  businesses navigate digital transformation. At StarOps, we combine emerging technologies, industry
                  expertise, and best practices to turn business challenges into meaningful digital solutions.
                </p>
              </div>

              <div className="ab-rv" style={d(400)}>
                <h3 className="text-[clamp(20px,1.6vw,28px)] font-medium tracking-[-0.02em]">Our goal</h3>
                <ul className="mt-[clamp(14px,1.3vw,22px)] space-y-[0.55em] text-[clamp(15px,1.15vw,20px)] tracking-[-0.01em] text-neutral-500">
                  {GOALS.map((g) => (
                    <li key={g} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-[0.62em] h-[0.3em] w-[0.3em] shrink-0 rounded-full bg-neutral-500" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="ab-rv mt-[clamp(28px,3vw,52px)]" style={d(500)}>
              <PillButton href="/about">Know us better</PillButton>
            </div>
          </div>

          <p className="ab-rv text-[clamp(13px,1vw,17px)] font-medium tracking-[-0.01em]" style={d(600)}>
            © 2020 StarOps Technologies Pvt Ltd
          </p>
        </div>
      </div>
      {/* stat cards */}
      <div className="mx-auto mt-[clamp(64px,8vw,140px)] grid max-w-[1900px] gap-[clamp(8px,0.6vw,12px)] px-[clamp(12px,1.7vw,32px)] sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((st, i) => (
          <StatCard key={i} stat={st} delay={i * 110} />
        ))}
      </div>
    </section>
  );
}