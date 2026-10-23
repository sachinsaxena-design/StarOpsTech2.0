import React from "react";
import { Link } from "react-router-dom";
const MAIN_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact" },
];

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.7c0-.9.3-1.5 1.6-1.5h1.6V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.1H8v3h2.5V21h3z" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <path d="M6.9 8.9H4V20h2.9V8.9zM5.5 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20 13.6c0-2.7-1.4-4.9-3.8-4.9-1.2 0-2.1.6-2.6 1.4V8.9h-2.8V20h2.9v-6c0-1.5.6-2.4 1.7-2.4 1.1 0 1.7.8 1.7 2.4V20H20v-6.4z" />,
  },
  {
    name: "Twitter/X",
    href: "https://x.com",
    icon: <path d="M17.8 3h3.2l-7 8 8.2 11h-6.4l-5-6.6L5 22H1.8l7.5-8.6L1.4 3H8l4.5 6.1L17.8 3zm-1.1 17h1.8L6.6 4.9H4.7L16.7 20z" transform="translate(1 0) scale(.92)" />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.2" />
      </>
    ),
  },
];

/* ---------- moving stars (smooth drifting + twinkling background) ---------- */
// small seeded random generator so the stars are the same on every render
const rand = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const r = rand(7);
const between = (a, b) => a + (b - a) * r();

const STARS = Array.from({ length: 36 }, (_, i) => {
  const sparkle = i < 14; // first 14 are 4-point sparkles, the rest are tiny dots
  return {
    id: i,
    sparkle,
    blue: i % 5 === 0,
    left: between(2, 98),            // start position (% of footer)
    top: between(3, 92),
    size: sparkle ? between(7, 15) : between(1.5, 3.2),
    dx: between(-30, 30),            // how far it wanders (vw / px)
    dy: between(-130, 130),
    rot: sparkle ? between(-180, 180) : 0,
    move: between(22, 48),           // seconds for one drift
    twinkle: between(2.6, 6),        // seconds for one twinkle
    delay: -between(0, 40),          // negative = already mid-motion on load
    o1: between(0.08, 0.25),
    o2: between(0.5, 0.95),
  };
});

const starCss = `
.sf-drift{will-change:transform;animation:sf-drift 30s ease-in-out infinite alternate}
@keyframes sf-drift{
  from{transform:translate3d(0,0,0) rotate(0deg)}
  to{transform:translate3d(var(--dx),var(--dy),0) rotate(var(--rot))}
}
.sf-twinkle{animation:sf-twinkle 4s ease-in-out infinite;filter:drop-shadow(0 0 3px currentColor)}
@keyframes sf-twinkle{
  0%,100%{opacity:var(--o1);scale:.55}
  50%{opacity:var(--o2);scale:1.1}
}
.sf-shoot{position:absolute;width:110px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.9));transform-origin:left center;opacity:0;animation:sf-shoot 10s ease-out infinite}
@keyframes sf-shoot{
  0%{opacity:0;transform:translate3d(0,0,0) rotate(28deg)}
  2%{opacity:1}
  10%{opacity:0;transform:translate3d(38vw,20vw,0) rotate(28deg)}
  100%{opacity:0;transform:translate3d(38vw,20vw,0) rotate(28deg)}
}
@media (prefers-reduced-motion: reduce){
  .sf-drift,.sf-twinkle,.sf-shoot{animation:none}
  .sf-shoot{display:none}
}
`;

function StarField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <style>{starCss}</style>
      {STARS.map((s) => (
        <span
          key={s.id}
          // fewer stars on small screens
          className={`sf-drift absolute ${s.id > 18 ? "hidden sm:block" : ""}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            "--dx": `${s.dx}vw`,
            "--dy": `${s.dy}px`,
            "--rot": `${s.rot}deg`,
            animationDuration: `${s.move}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <span
            className="sf-twinkle block"
            style={{
              "--o1": s.o1,
              "--o2": s.o2,
              width: s.size,
              height: s.size,
              color: s.blue ? "#a9c2ff" : "#ffffff",
              animationDuration: `${s.twinkle}s`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.sparkle ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0Z" />
              </svg>
            ) : (
              <span className="block h-full w-full rounded-full bg-current" />
            )}
          </span>
        </span>
      ))}

      {/* occasional shooting stars */}
      <span className="sf-shoot" style={{ top: "12%", left: "8%", animationDelay: "2s" }} />
      <span className="sf-shoot" style={{ top: "40%", left: "45%", animationDelay: "7s", animationDuration: "13s" }} />
    </div>
  );
}

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SocialLink({ name, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between overflow-hidden border-b border-white/10 py-3.5 text-white/70 transition-colors duration-300 hover:text-white sm:py-4"
    >
      {/* background wash that slides in from the left */}
      <span className="pointer-events-none absolute inset-0 -z-0 -translate-x-full bg-gradient-to-r from-white/[0.09] to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0" />
      {/* bright line that draws across the bottom border */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <span className="relative flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] fill-current transition-all duration-300 group-hover:-rotate-6 group-hover:scale-125"
          aria-hidden="true"
        >
          {icon}
        </svg>
        <span className="text-base font-medium transition-transform duration-300 ease-out group-hover:translate-x-2 sm:text-[17px]">
          {name}
        </span>
      </span>

      {/* arrow turns diagonal and shoots out on hover */}
      <span className="relative mr-1 grid h-6 w-6 place-items-center overflow-hidden rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-black">
        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-rotate-45" />
      </span>
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <a href={href} className="group relative inline-block w-fit text-[15px] text-white/90 transition-colors hover:text-white">
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#060608] text-white">
      <StarField />
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_top,rgba(60,90,200,0.14),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-x-16">
          {/* CTA */}
          <div className="sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1">
            <h2 className="max-w-sm text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
              Do you like what you see?
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60 sm:text-[15px]">
              Let’s work together to turn your dream project into reality.
            </p>
            <a
              href="/contact"
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.45)]"
            >
              Let’s Talk with Us
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Main links */}
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <h3 className="mb-4 text-[15px] text-white/50">Main links</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-1 sm:gap-x-0 lg:grid-cols-2 lg:gap-x-10">
              {MAIN_LINKS.slice(0, 4).map((l) => (
                <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
              ))}
              <div className="col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto lg:col-start-2 lg:row-start-1">
                <FooterLink href={MAIN_LINKS[4].href}>{MAIN_LINKS[4].label}</FooterLink>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <h3 className="mb-4 text-[15px] text-white/50">Get in touch</h3>
            <a href="tel:+917530882800" className="block text-base font-medium transition-opacity hover:opacity-70">
              +91 7530882800
            </a>
            <a
              href="mailto:contact@staropstech.com"
              className="mt-2 block break-all text-xl font-medium tracking-tight transition-opacity hover:opacity-70 sm:text-2xl"
            >
              contact@staropstech.com
            </a>

            <h3 className="mb-4 mt-10 text-[15px] text-white/50">Offline</h3>
            <p className="text-[15px] font-medium">StarOps Technologies</p>
            <p className="mt-2 max-w-[18rem] text-[15px] leading-snug text-white/60">
              Block G, Gamma II, Greater Noida, Uttar Pradesh 201310
            </p>
          </div>

          {/* Socials */}
          <nav
            aria-label="Social media"
            className="sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:mt-6"
          >
            {SOCIALS.map((s) => (
              <SocialLink key={s.name} {...s} />
            ))}
          </nav>
        </div>
      </div>

      {/* Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-14 select-none overflow-hidden text-center font-semibold uppercase leading-none tracking-tight text-white/[0.05] [mask-image:linear-gradient(to_bottom,black_40%,transparent)] sm:mt-20"
        style={{ fontSize: "clamp(44px, 13.5vw, 230px)", whiteSpace: "nowrap" }}
      >
        StarOps Tech
      </div>

      <p className="relative px-5 pb-6 pt-2 text-center text-xs text-white/60 sm:pb-8 sm:text-[13px]">
        © All Right Reserved by StarOps Tech - {new Date().getFullYear()}
      </p>
    </footer>
  );
}   