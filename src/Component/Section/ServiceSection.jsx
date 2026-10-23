import { useEffect, useRef, useState } from "react";
import { ChevronRight, Clock, Smartphone, Globe, Cloud, Layers, Boxes, Users, ScanSearch } from "lucide-react";
import html from "../../assets/html.png";
import js from "../../assets/js.png";
import tailwindcss from "../../assets/tailwindcss.png";
import bootstrap from "../../assets/bootstrap.png";
import materialui from "../../assets/materialui.png";
import nextjs from "../../assets/nextjs2.png";
import django from '../../assets/django.png';
import expressjs from '../../assets/expressjs.png';
import firebase from '../../assets/firebase.png'
import php from '../../assets/php.png'
import postman from '../../assets/postman.png'
import golang from '../../assets/golang.png'
import aws from '../../assets/aws.png'
import ansible from '../../assets/ansible.png'
import docker from '../../assets/docker.png'
import jenkins from '../../assets/jenkins.png'
import kubernetes from '../../assets/kubernetes.png'
import terraform from '../../assets/terraform.png'
import flutter from '../../assets/flutter.png'
import ionic from '../../assets/ionic.png'
import kotlin from '../../assets/kotlin.png'
import swift from '../../assets/swift.png'
import cassandra from '../../assets/cassandra.png'
import mysql from '../../assets/mysql.png'
import postgresql from '../../assets/postgresql.png'
import elasticsearch from '../../assets/elasticsearch.png'
import oracle from '../../assets/oracle.png'
import magento from '../../assets/magento.png'
import shopify from '../../assets/shopify.png'
import squarespace from '../../assets/squarespace.png'
import wix from '../../assets/wix.png'
import wordpress from '../../assets/wordpress.png'
import woocommerce from '../../assets/woocommerce.png'


const LOGO_FILES = import.meta.glob("../../assets/tech/*.{png,svg,webp}", {
  eager: true,
  import: "default",
});
const logo = (name) => {
  const hit = Object.keys(LOGO_FILES).find((p) => p.split("/").pop().split(".")[0] === name);
  return hit ? LOGO_FILES[hit] : undefined;
};

const SERVICES = [
  {
    title: "Mobile App Development",
    icon: ScanSearch,
    visual: Smartphone,
    text: "We build scalable, industry-focused mobile applications that turn ideas into intuitive digital experiences.",
    points: ["Native & Cross-Platform Apps", "Industry-Specific Solutions", "Scalable Architecture", "Seamless User Experience"],
    time: "4 - 12 weeks",
    image: null,
    glow: "#14e3c0",
  },
  {
    title: "Web Development",
    icon: Globe,
    visual: Globe,
    text: "Fast, accessible websites and web apps engineered to rank, convert and grow with your business.",
    points: ["Custom Web Applications", "Performance & SEO Ready", "Headless CMS Integration", "Responsive by Default"],
    time: "3 - 10 weeks",
    image: null,
    glow: "#6366f1",
  },
  {
    title: "DevOps Consulting",
    icon: Cloud,
    visual: Cloud,
    text: "Automate delivery, harden infrastructure and ship with confidence using proven cloud practices.",
    points: ["CI/CD Pipelines", "Cloud Migration & IaC", "Monitoring & Observability", "Security & Compliance"],
    time: "2 - 8 weeks",
    image: null,
    glow: "#f59e0b",
  },
  {
    title: "SaaS Product Development",
    icon: Layers,
    visual: Layers,
    text: "From first prototype to multi-tenant platform, we build subscription products that scale with demand.",
    points: ["Multi-Tenant Architecture", "Billing & Subscriptions", "Analytics Dashboards", "API & Integrations"],
    time: "8 - 20 weeks",
    image: null,
    glow: "#ec4899",
  },
  {
    title: "Product Engineering",
    icon: Boxes,
    visual: Boxes,
    text: "Dedicated engineering teams that own your roadmap, from architecture to long-term maintenance.",
    points: ["Discovery & Roadmapping", "Modernisation of Legacy Apps", "QA & Test Automation", "Continuous Delivery"],
    time: "Ongoing",
    image: null,
    glow: "#22c55e",
  },
  {
    title: "IT Staff Augmentation",
    icon: Users,
    visual: Users,
    text: "Add vetted engineers to your team within days and scale capacity up or down as needed.",
    points: ["Vetted Senior Talent", "Flexible Engagement", "Fast Onboarding", "Timezone-Aligned Teams"],
    time: "1 - 2 weeks",
    image: null,
    glow: "#38bdf8",
  },
];

/* subtle film grain for the page background */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Playball&family=Inter:wght@400;500;600&display=swap');

.sa-sans   { font-family: 'Inter', system-ui, sans-serif; letter-spacing: -0.02em; }
.sa-num    { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; letter-spacing: -0.01em; }
.sa-script { font-family: 'Playball', cursive; letter-spacing: 0; }

@keyframes sa-rise {
  from { opacity: 0; transform: translateY(16px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
@keyframes sa-pop {
  0%   { opacity: 0; transform: scale(.4) rotate(-90deg); }
  60%  { transform: scale(1.12) rotate(6deg); }
  100% { opacity: 1; transform: scale(1) rotate(0); }
}
@keyframes sa-sweep {
  from { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
  30%  { opacity: .3; }
  to   { transform: translateX(380%) skewX(-18deg); opacity: 0; }
}
@keyframes sa-float {
  0%, 100% { transform: translateY(0) rotate(-8deg); }
  50%      { transform: translateY(-10px) rotate(-5deg); }
}
.sa-rise  { animation: sa-rise .7s cubic-bezier(.22,1,.36,1) both; }
.sa-pop   { animation: sa-pop .7s cubic-bezier(.34,1.56,.64,1) both; }
.sa-sweep { animation: sa-sweep 1.2s ease-out .1s both; }
.sa-float { animation: sa-float 6s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .sa-rise, .sa-pop, .sa-sweep, .sa-float { animation: none !important; }
  .sa-t { transition: none !important; }
}
`;

function Visual({ service, active }) {
  const V = service.visual;
  return (
    <div
      aria-hidden={!active}
      className={`sa-t absolute inset-0 transition-all duration-900 ease-[cubic-bezier(.22,1,.36,1)] ${active
        ? "opacity-100 scale-100 blur-0 [clip-path:inset(0_0_0_0_round_14px)]"
        : "opacity-0 scale-[1.15] blur-md [clip-path:inset(0_0_0_100%_round_14px)]"
        }`}
    >
      {service.image ? (
        <img src={service.image} alt="" className="h-full w-full object-cover" />
      ) : (
        <div
          className="relative h-full w-full overflow-hidden bg-[#0b0d0e]"
          style={{ backgroundImage: `radial-gradient(85% 60% at 90% 0%, ${service.glow}bb 0%, ${service.glow}33 40%, transparent 72%)` }}
        >
          <div className="sa-float absolute left-[18%] top-[32%] flex h-[44%] w-[62%] items-center justify-center rounded-3xl border border-white/10 bg-linear-to-br from-white/15 to-white/2 shadow-2xl shadow-black/60 backdrop-blur-sm">
            <V className="h-[28%] w-[28%] text-white/80" strokeWidth={1.1} />
          </div>
        </div>
      )}
      {active && <div key={service.title} className="sa-sweep pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-xl" />}
    </div>
  );
}

function Details({ service, base = 0 }) {
  const Icon = service.icon;
  return (
    <div className="flex h-full flex-col">
      <Icon className="sa-pop h-[clamp(24px,2vw,38px)] w-[clamp(24px,2vw,38px)] text-white" strokeWidth={1.6} style={{ animationDelay: `${base}ms` }} />
      <p
        className="sa-rise mt-[clamp(18px,2.1vw,40px)] text-[clamp(13px,1.1vw,21px)] leading-[1.28] text-neutral-400"
        style={{ animationDelay: `${80 + base}ms`, maxWidth: "clamp(250px,25vw,480px)" }}
      >
        {service.text}
      </p>
      <ul className="mt-[clamp(16px,1.6vw,30px)] space-y-[clamp(7px,0.7vw,13px)]">
        {service.points.map((p, i) => (
          <li
            key={p}
            className="sa-rise flex items-center gap-[0.6vw] text-[clamp(13.5px,1.15vw,22px)] font-medium leading-tight text-white"
            style={{ animationDelay: `${170 + base + i * 85}ms` }}
          >
            <span className="h-1.25 w-1.25 shrink-0 rounded-full bg-white" />
            {p}
          </li>
        ))}
      </ul>
      <div
        className="sa-rise mt-auto flex items-center gap-[0.5vw] pt-6 text-[clamp(12px,1.05vw,20px)] text-neutral-400"
        style={{ animationDelay: `${540 + base}ms` }}
      >
        <Clock className="h-[1.1em] w-[1.1em]" />
        {service.time}
      </div>
    </div>
  );
}

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function ServicesAccordion() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];
  const [sectionRef, inView] = useInView();
  const [touched, setTouched] = useState(false); // false until the first click
  // when the section leaves the screen, reset so the intro plays again next time
  useEffect(() => {
    if (!inView) setTouched(false);
  }, [inView]);
  const select = (i) => {
    setTouched(true);
    setActive(i);
  };

  // scroll-reveal helpers
  const reveal = `sa-t transition-all duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] ${inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm"
    }`;
  const d = (ms) => ({ transitionDelay: `${ms}ms` });

  return (
    <section
      ref={sectionRef}
      className="sa-sans relative w-full overflow-hidden bg-[#0d0d0e] px-6 py-20 text-white sm:px-10 lg:px-[4vw] lg:py-[6vw]"
      style={{ backgroundImage: GRAIN, backgroundBlendMode: "soft-light" }}
    >
      <style>{styles}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_0%,rgba(255,255,255,0.05),transparent)]" />

      {/*
        Two-row grid on desktop:
          row 1 → [ label | heading ]
          row 2 → [ list  | card    ]
      */}
      <div className="relative mx-auto grid max-w-[1750px] grid-cols-1 lg:grid-cols-[1fr_2fr] lg:gap-x-[clamp(48px,6.5vw,124px)]">
        {/* label */}
        <div className={`flex items-start gap-2 text-[clamp(11px,0.75vw,14px)] text-neutral-300 ${reveal}`} style={d(0)}>
          <span className="text-[1.2em] leading-none">✦</span> What we craft
        </div>

        {/* heading */}
        <h2
          className={`mt-8 text-[clamp(40px,5.2vw,98px)] font-medium leading-[1.04] tracking-[-0.035em] lg:mt-[-1.6vw] ${reveal}`}
          style={d(150)}
        >
          Solutions that{" "}
          <span
            className={`sa-script sa-t inline-block text-[1.18em] font-normal transition-all duration-1100 ease-[cubic-bezier(.34,1.56,.64,1)] ${inView ? "rotate-0 scale-100 opacity-100" : "-rotate-12 scale-75 opacity-0"
              }`}
            style={d(700)}
          >
            Drive
          </span>
          <br className="hidden lg:block" /> results
        </h2>

        {/* accordion list */}
        <ul className="mt-8 lg:mt-[clamp(32px,4.6vw,90px)] lg:translate-y-[-2.2vw]" role="tablist" aria-orientation="vertical">
          {SERVICES.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.title} className={`relative border-b border-white/8 last:border-b-0 ${reveal}`} style={d(350 + i * 110)}>
                {/* animated active underline */}
                <span
                  className={`sa-t pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-white/60 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${on && inView ? "scale-x-100" : "scale-x-0"
                    }`}
                  style={{ transitionDelay: on && !touched ? "1100ms" : "0ms" }}
                />
                <button
                  role="tab"
                  aria-selected={on}
                  aria-controls={`panel-${i}`}
                  onClick={() => select(i)}
                  className="group grid w-full grid-cols-[clamp(52px,4.2vw,80px)_1fr_clamp(32px,2.7vw,50px)] items-center py-[clamp(16px,2.2vw,42px)] text-left outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                >
                  <span
                    className={`sa-num sa-t text-[clamp(26px,2vw,38px)] leading-none transition-colors duration-500 ${on ? "text-white" : "text-white/30 group-hover:text-white/60"
                      }`}
                  >
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <span
                    className={`sa-t pr-3 text-[clamp(20px,1.85vw,35px)] font-medium leading-[1.2] tracking-[-0.03em] transition-all duration-500 ${on ? "translate-x-0 text-white" : "text-white/35 group-hover:translate-x-1 group-hover:text-white/65"
                      }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`sa-t flex aspect-square w-full items-center justify-center justify-self-end rounded-full bg-white/12 transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${on ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                  >
                    <ChevronRight className="h-[45%] w-[45%]" />
                  </span>
                </button>

                {/* mobile: inline panel */}
                <div
                  id={`panel-${i}`}
                  className={`sa-t grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="mb-5 rounded-2xl bg-[#1a1a1b] p-5">
                      {on && <Details service={s} />}
                      <div className="relative mt-6 h-56 overflow-hidden rounded-xl">
                        <Visual service={s} active={on} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* desktop card */}
        <div
          className={`sa-t hidden h-[clamp(300px,27.4vw,522px)] grid-cols-[55fr_45fr] overflow-hidden rounded-[20px] border border-white/4 bg-[#1b1b1c] shadow-2xl shadow-black/50 transition-all duration-1100 ease-[cubic-bezier(.22,1,.36,1)] lg:mt-[clamp(32px,4.6vw,90px)] lg:grid ${inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-16 scale-[0.96] opacity-0"
            }`}
          style={d(600)}
        >
          {/* key includes inView so text animations start once the card is visible */}
          <div key={`${active}-${inView}`} role="tabpanel" className="px-[2.25vw] pb-[2.1vw] pt-[2.25vw]">
            <Details service={current} base={inView && !touched ? 900 : 0} />
          </div>
          <div className="p-[0.65vw]">
            <div
              className={`sa-t relative h-full overflow-hidden rounded-[14px] transition-[clip-path,transform] duration-1400 ease-[cubic-bezier(.22,1,.36,1)] ${inView ? "scale-100 [clip-path:inset(0_0_0_0_round_14px)]" : "scale-105 [clip-path:inset(0_0_0_100%_round_14px)]"
                }`}
              style={d(1000)}
            >
              {SERVICES.map((s, i) => (
                <Visual key={s.title} service={s} active={i === active} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Order matches the design: Frontend first (default tab), then Backend, Mobile / Database, DevOps, CMS */
const TECH_TABS = [
  {
    name: "Frontend",
    items: [
      { name: "HTML 5", image: html },
      { name: "JavaScript", image: js },
      { name: "Tailwind CSS", image: tailwindcss },
      { name: "Next.Js", image: nextjs },
      { name: "Bootstrap", image: bootstrap },
      { name: "MUI", image: materialui },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "django", image: django },
      { name: "Express.Js", image: expressjs },
      { name: "Firebase", image: firebase },
      { name: "Golang", image: golang },
      { name: "PHP", image: php },
      { name: "Postman", image: postman },
    ],
  },
  {
    name: "Mobile",
    items: [
      { name: "Flutter", image: flutter },
      { name: "Ionic", image: ionic },
      { name: "Kotlin", image: kotlin },
      { name: "Swift", image: swift }],
  },
  {
    name: "Database",
    items: [
      { name: "Cassandra", image: cassandra },
      { name: "Elasticsearch", image: elasticsearch },
      { name: "MySQL", image: mysql },
      { name: "Oracle", image: oracle },
      { name: "PostgreSQL", image: postgresql }
    ],
  },
  {
    name: "DevOps",
    items: [
      { name: "AWS", image: aws },
      { name: "Ansible", image: ansible },
      { name: "Docker", image: docker },
      { name: "Jenkins", image: jenkins },
      { name: "Kubernetes", image: kubernetes },
      { name: "Terraform", image: terraform },
    ],
  },
  {
    name: "CMS",
    items: [
      { name: "Magento", image: magento },
      { name: "Shopify", image: shopify },
      { name: "SqaureSpace", image: squarespace },
      { name: "Wix", image: wix },
      { name: "WordPress", image: wordpress },
      { name: "Woocommerce", image: woocommerce },
    ],
  },
];

const SHAPES = {
  square: "rounded-[4px]",
  round: "rounded-[22%]",
  circle: "rounded-full",
  shield: "",
  hex: "",
};
const CLIPS = {
  shield: "polygon(4% 0,96% 0,89% 84%,50% 100%,11% 84%)",
  hex: "polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
};

/* Real logo when `image` exists, otherwise the coloured badge fallback.
   Phones / tablets: a fixed 80px logo.  Laptop (lg+): scales with the screen. */
function TechLogo({ item }) {
  const size = "h-20 w-20 lg:h-[clamp(54px,5.4vw,104px)] lg:w-[clamp(54px,5.4vw,104px)]";
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        draggable={false}
        className={`${size} object-contain ${item.invert ? "invert" : ""}`}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={item.name}
      className={`${size} flex items-center justify-center font-semibold leading-none tracking-tight ${SHAPES[item.shape] || ""} ${item.ring ? "ring-1 ring-white/10" : ""
        }`}
      style={{
        background: item.bg,
        color: item.fg,
        fontSize: "clamp(20px,2.3vw,44px)",
        clipPath: CLIPS[item.shape],
      }}
    >
      {item.short}
    </span>
  );
}

/*
  TechExpertise layout
  - phone  (< 640px):  label above heading, tabs 3x2, logos 3 per row
  - tablet (640-1023): label | heading side by side, tabs 3x2 with dividers, logos 3 per row
  - laptop (>= 1024):  tabs in ONE row of 6 with the sliding underline, logos 6 per row
*/
function TechExpertise() {
  const [active, setActive] = useState(0);
  const [sectionRef, inView] = useInView();

  const reveal = `sa-t transition-all duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] ${inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm"
    }`;
  const d = (ms) => ({ transitionDelay: `${ms}ms` });

  return (
    <section
      ref={sectionRef}
      className="sa-sans relative w-full overflow-hidden bg-[#0d0d0e] px-6 pb-20 pt-10 text-white sm:px-10 lg:px-[4vw] lg:pb-[6vw] lg:pt-[3vw]"
      style={{ backgroundImage: GRAIN, backgroundBlendMode: "soft-light" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_30%_100%,rgba(255,255,255,0.04),transparent)]" />

      <div className="relative mx-auto max-w-[1750px]">
        {/* row 1 → label | heading (stacked on phones) */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] sm:gap-x-[clamp(32px,6.5vw,124px)] lg:gap-x-[clamp(48px,6.5vw,124px)]">
          <div className={`flex items-start gap-2 text-[clamp(12px,0.75vw,14px)] text-neutral-300 ${reveal}`} style={d(0)}>
            <span className="text-[1.2em] leading-none">✦</span> Technology &amp; expertise
          </div>

          <h2
            className={`mt-10 max-w-225 text-[clamp(18px,2.5vw,48px)] font-medium leading-[1.16] tracking-[-0.03em] sm:mt-0 ${reveal}`}
            style={d(150)}
          >
            We use modern technologies and proven engineering practices to build scalable, reliable, and high-performing digital
            solutions.
          </h2>
        </div>

        {/* row 2 → category tabs: 3x2 grid below lg, single row of 6 from lg */}
        <div className={`mt-14 lg:mt-[clamp(40px,4.6vw,90px)] ${reveal}`} style={d(350)}>
          <div className="relative grid grid-cols-3 lg:flex" role="tablist" aria-label="Technology categories">
            {TECH_TABS.map((t, i) => {
              const on = i === active;
              // divider after col 1 & 2 of every row (sm+); after col 3 only when everything is one row (lg+)
              const dividerShow = i % 3 !== 2 ? "sm:block" : "lg:block";
              return (
                <div key={t.name} className="relative flex justify-center lg:flex-1">
                  <button
                    role="tab"
                    aria-selected={on}
                    aria-controls={`tech-panel-${i}`}
                    onClick={() => setActive(i)}
                    className={`sa-t group w-full px-2 py-3 text-[clamp(17px,1.9vw,36px)] font-medium tracking-[-0.035em] outline-none transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:ring-1 focus-visible:ring-white/40 lg:w-auto ${on ? "scale-100 text-white" : "scale-[0.96] text-white/35 hover:scale-100 hover:text-white/70"
                      }`}
                  >
                    {t.name}
                  </button>
                  {i < TECH_TABS.length - 1 && (
                    <span
                      className={`pointer-events-none absolute right-0 top-1/2 hidden h-[clamp(28px,2.4vw,46px)] w-px -translate-y-1/2 bg-white/40 ${dividerShow}`}
                    />
                  )}
                </div>
              );
            })}

            {/* sliding underline that follows the active tab (single-row layout only) */}
            <span
              aria-hidden="true"
              className="sa-t pointer-events-none absolute -bottom-px left-0 hidden h-px w-[calc(100%/6)] justify-center transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:flex"
              style={{ transform: `translateX(${active * 100}%)` }}
            >
              <span className="h-px w-[40%] bg-white/70" />
            </span>
          </div>
        </div>

        {/* row 3 → logos. All panels are stacked so the old set can fade out while the new one fades in */}
        <div className="mt-14 grid lg:mt-[clamp(36px,4vw,76px)]">
          {TECH_TABS.map((t, p) => {
            const on = p === active;
            return (
              <div
                key={t.name}
                id={`tech-panel-${p}`}
                role="tabpanel"
                aria-hidden={!on}
                className={`col-start-1 row-start-1 grid grid-cols-3 content-start gap-y-14 lg:grid-cols-6 lg:gap-y-10 ${on ? "" : "pointer-events-none"}`}
              >
                {t.items.map((it, i) => (
                  <div
                    key={it.name}
                    className={`sa-t group flex flex-col items-center gap-6 text-center ease-[cubic-bezier(.22,1,.36,1)] lg:gap-[clamp(14px,1.6vw,30px)] ${on
                      ? "translate-y-0 scale-100 opacity-100 blur-0 duration-800"
                      : "translate-y-6 scale-90 opacity-0 blur-md duration-300"
                      } ${inView ? "" : "translate-y-10! opacity-0! blur-sm!"}`}
                    style={{ transitionDelay: on ? `${(inView ? 120 : 0) + i * 80}ms` : "0ms" }}
                  >
                    <span className="transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-2 group-hover:scale-105">
                      <TechLogo item={it} />
                    </span>
                    <span className="text-[clamp(14px,1vw,19px)] font-medium tracking-[-0.02em] text-white">{it.name}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ServicesSection() {
  return (
    <>
      <ServicesAccordion />
      <TechExpertise />
    </>
  );
}