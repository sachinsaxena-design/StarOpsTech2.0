import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import image1 from '../../assets/image1.jpg'
import image2 from '../../assets/image2.jpg'
import image3 from '../../assets/image3.jpg'
import image4 from '../../assets/image4.jpg'
import image5 from '../../assets/image5.jpg'
import image6 from '../../assets/image6.jpg'
import client1 from '../../assets/ContactVerse.png'
import client2 from '../../assets/cxpoint.png'
import client3 from '../../assets/Arcaptor.jpg'
import client4 from '../../assets/six30labs.png'
import client5 from '../../assets/ashok.jpeg'
import client6 from '../../assets/nitin.png'

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.rv-sans { font-family: 'Inter', system-ui, sans-serif; }`;

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

function SolidStar({ className = "", fill = "#fff" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill={fill}>
      <path d="M12 1.6l3.1 6.9 7.5.8-5.6 5 1.6 7.4L12 17.8 5.4 22.7 7 15.3 1.4 10.3l7.5-.8z" />
    </svg>
  );
}

const REVIEWS = [
  {
    company: "ContactVerse",
    color: "#e61fc4",
    image: image4,
    logo: client1,
    logoBg: "#e61fc4", // its logo is white on transparent, so it needs a coloured tile behind it
    tint: ["#0a1b45", "#2f5fb3", "#12306b", "#08122b"],
    text: "Working with StarOps was a seamless experience from strategy and development through delivery. Their team took the time to understand our product goals, translated complex requirements into an intuitive user experience, and built ContactVerse with scalability and performance in mind. Their professionalism, technical expertise, and attention to detail were evident throughout the engagement. The result is a modern, reliable platform that provides a strong foundation for our continued growth",
  },
  {
    company: "CxPoint",
    color: "#2563eb",
    image: image6,
    logo: client2,
    tint: ["#071a2e", "#1f7a8c", "#0f3d57", "#061420"],
    text: "StarOps transformed our CXPoint vision into a modern, intuitive, and scalable digital platform. Their team combined strong technical expertise with thoughtful design and attention to detail to create a seamless user experience. Their collaborative approach and commitment to quality made the entire development process smooth and effective, delivering a solution that exceeded our expectations",
  },
  {
    company: "Arcaptor Technologies Private Limited",
    color: "#10b981",
    image: image3,
    logo: client3,
    tint: ["#1a0f33", "#6b46c1", "#2b1a5c", "#0e0820"],
    text: "Working with StarOps was a great experience from start to finish. Their team understood our requirements quickly, brought strong technical expertise to the table, and delivered a solution that was reliable, scalable, and built around our business goals. The professionalism, attention to detail, and commitment throughout the project really stood out.",
  },
  {
    company: "Six30labs",
    color: "#10b981",
    image: image2,
    logo: client4,
    tint: ["#1a0f33", "#6b46c1", "#2b1a5c", "#0e0820"],
    text: "StarOps made the entire website development process smooth and effortless. They understood our vision, paid close attention to every detail, and delivered a modern, user-friendly website that feels both professional and intuitive. The final result went beyond what we expected, and we truly appreciated their dedication throughout the project",
  },
  {
    company: "Ashok Kumar Shukla",
    color: "#10b981",
    image: image1,
    logo: client5,
    tint: ["#1a0f33", "#6b46c1", "#2b1a5c", "#0e0820"],
    text: "StarOps went beyond our expectations in bringing our vision to life. Their team created a modern, user-friendly financial services website that is easy to navigate and built around our needs. Their responsiveness, attention to detail, and commitment to delivering quality work made the entire experience seamless",
  },
  {
    company: "CA Nitin Rajpal",
    color: "#10b981",
    image: image5,
    logo: client6,
    tint: ["#1a0f33", "#6b46c1", "#2b1a5c", "#0e0820"],
    text: "StarOps exceeded our expectations with a modern and user-friendly financial services website. They understood our requirements, maintained excellent attention to detail, and delivered a smooth experience from start to finish. Their dedication and commitment to quality made working with them a great experience",
  },
];

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

/* Logo: shown uncropped on a tile. The tile is white unless the review sets `logoBg`
   (needed for logos that are white/transparent, like ContactVerse).
   With no logo image at all we fall back to a coloured icon tile. */
function ReviewLogo({ r }) {
  const size = "clamp(32px,4.4cqw,44px)";

  if (r.logo) {
    return (
      <span
        className="grid shrink-0 place-items-center overflow-hidden rounded-[24%] ring-1 ring-black/10"
        style={{ width: size, height: size, background: r.logoBg ?? "#fff" }}
      >
        <img src={r.logo} alt="" draggable={false} className="h-full w-full object-contain" />
      </span>
    );
  }

  return (
    <span className="grid shrink-0 place-items-center rounded-[24%]" style={{ width: size, height: size, background: r.color }}>
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <path d="M4 8c4-5 12-5 16 0M4 12c4-5 12-5 16 0M4 16c4-5 12-5 16 0M4 20c4-5 12-5 16 0" />
      </svg>
    </span>
  );
}

export default function ReviewsSection() {
  const [ref, inView] = useInView();
  const [i, setI] = useState(0);
  const startX = useRef(null);
  const total = REVIEWS.length;
  /* loops: next on the last review goes back to the first, previous on the first goes to the last */
  const go = (n) => setI(((n % total) + total) % total);
  const cur = REVIEWS[i];

  return (
    <section
      ref={ref}
      className="rv-sans relative w-full overflow-hidden bg-[#0b0b0c] px-5 py-16 text-white sm:px-8 lg:py-[clamp(64px,6vw,110px)]"
    >
      <style>{FONT_CSS}</style>
      <style>{`@keyframes rv-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }`}</style>

      {/* grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen" style={{ backgroundImage: NOISE }} aria-hidden="true" />

      <div className="relative mx-auto">
        <p className="flex items-center justify-center gap-2 text-[clamp(12px,0.95vw,17px)] font-medium tracking-[-0.01em]">
          <Spark className="h-[1.15em] w-[1.15em]" />
          What our clients say
        </p>

        <h2 className="mx-auto mt-4 text-center text-[clamp(34px,4.4vw,72px)] font-medium leading-[1.1] tracking-[-0.04em] lg:mt-[1.2vw]">
          Real experiences.
          <br />
          Real results.
        </h2>

        <div
          className="mx-auto mt-10 max-w-280 rounded-[clamp(14px,1.6vw,24px)] bg-white p-1.25 text-black transition-[opacity,transform] duration-900 ease-[cubic-bezier(.22,1,.36,1)] @container motion-reduce:transition-none sm:p-[clamp(5px,0.55cqw,10px)] lg:mt-[clamp(32px,3vw,52px)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(34px)" }}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client reviews"
        >
          {/* photo + review */}
          <div
            className="overflow-hidden rounded-[clamp(10px,1.1vw,20px)] [touch-action:pan-y]"
            onPointerDown={(e) => (startX.current = e.clientX)}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              startX.current = null;
              if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
            }}
            onPointerCancel={() => (startX.current = null)}
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {REVIEWS.map((r, n) => (
                <div
                  key={n}
                  className="relative aspect-4/5 w-full shrink-0 overflow-hidden bg-[#0a1b45] sm:aspect-622/234"
                  aria-hidden={n !== i}
                  aria-label={`${n + 1} of ${total}`}
                  aria-roledescription="slide"
                >
                  {r.image ? (
                    <img src={r.image} alt="" draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 22px), repeating-linear-gradient(25deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 26px), linear-gradient(165deg, ${r.tint[0]} 0%, ${r.tint[1]} 38%, ${r.tint[2]} 68%, ${r.tint[3]} 100%)`,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-[clamp(16px,1.6cqw,24px)]">
                    <div className="flex gap-[0.35cqw]" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <SolidStar key={k} fill="#fff" className="h-[clamp(12px,1.4cqw,16px)] w-[clamp(12px,1.4cqw,16px)]" />
                      ))}
                    </div>
                    <p
                      className="mt-[max(8px,1.1cqw)] max-w-full font-semibold leading-[1.38] tracking-[-0.01em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] sm:max-w-[56cqw]"
                      style={{ fontSize: "clamp(13px,1.5cqw,17px)" }}
                    >
                      {r.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* company + arrows */}
          <div className="flex items-center justify-between px-[clamp(8px,1.6cqw,18px)] py-[clamp(10px,1.4cqw,16px)]">
            <div key={i} className="flex items-center gap-[1.4cqw] max-sm:gap-3" style={{ animation: "rv-fade .5s ease both" }}>
              <ReviewLogo r={cur} />
              <span className="font-medium tracking-[-0.01em]" style={{ fontSize: "clamp(13px,1.6cqw,16px)" }}>
                {cur.company}
              </span>
            </div>

            <div className="flex items-center gap-[max(6px,1cqw)]" style={{ fontSize: "clamp(16px,2.2cqw,20px)" }}>
              <button
                type="button"
                onClick={() => go(i - 1)}
                aria-label="Previous review"
                className="grid h-[2.2em] w-[2.2em] place-items-center rounded-full text-black outline-none transition hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/40"
              >
                <ArrowLeft className="h-[0.9em] w-[0.9em]" />
              </button>
              <button
                type="button"
                onClick={() => go(i + 1)}
                aria-label="Next review"
                className="grid h-[2.2em] w-[2.2em] place-items-center rounded-full text-black outline-none transition hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/40"
              >
                <ArrowRight className="h-[0.9em] w-[0.9em]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}