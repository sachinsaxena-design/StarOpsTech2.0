import image1 from '../../assets/about-image/about-img-4.jpg'
import image2 from '../../assets/mobileapp.jpg'
import image3 from '../../assets/dev.jpg'
import image4 from '../../assets/about-image/about-img-5.jpg'
import image5 from '../../assets/about-image/about-img-6.jpg'
import image6 from '../../assets/about-image/about-img-2.jpg'

// pos: optional Tailwind object-position class to control cropping per image
const THUMBS = [
  { alt: "Web applications", src: image1, pos: "object-center" },
  { alt: "Mobile apps", src: image2, pos: "object-center" },
  { alt: "Cloud & DevOps", src: image3, pos: "object-center" },
  { alt: "Analytics dashboards", src: image4, pos: "object-center" },
  { alt: "Product engineering", src: image5, pos: "object-center" },
  { alt: "Staff augmentation", src: image6, pos: "object-right" },
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Playfair+Display:ital,wght@1,400&display=swap');

.hero-sans  { font-family: 'Inter Tight', system-ui, sans-serif; }
.hero-amp   { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 400; }

@keyframes hero-rise {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-rise { animation: hero-rise .9s cubic-bezier(.22,1,.36,1) both; }

@media (prefers-reduced-motion: reduce) {
  .hero-rise { animation: none !important; }
}
`;

function Spark({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill="currentColor">
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.100 11.400 11.400 6.600 12 0Z" />
    </svg>
  );
}

function Thumb({ t, i }) {
  return (
    <li
      className="hero-rise relative aspect-[5/3] min-w-0 overflow-hidden rounded-[clamp(10px,0.9vw,18px)]"
      style={{ animationDelay: `${700 + i * 70}ms` }}
    >
      <img
        src={t.src}
        alt={t.alt}
        loading="lazy"
        className={`h-full w-full object-cover ${t.pos || "object-center"}`}
      />
    </li>
  );
}

export default function IdeaSection() {
  return (
    <section className="hero-sans relative flex min-h-svh w-full flex-col overflow-hidden bg-white px-5 pb-8 pt-8 text-[#07090d] sm:px-8 md:px-[4vw] md:pb-[min(3vw,57px)] md:pt-[min(2.5vw,48px)]">
      <style>{styles}</style>

      <div className="mx-auto flex w-full max-w-[1750px] min-w-0 flex-1 flex-col">
        {/* label: left on mobile, right on laptop */}
        <div className="hero-rise flex justify-start md:justify-end">
          <p className="flex items-center gap-2 text-[clamp(12px,0.95vw,17px)] font-medium tracking-[-0.01em]">
            <Spark className="h-[1.1em] w-[1.1em]" />
            Software &amp; Product Engineering
          </p>
        </div>

        {/* headline */}
        <h1 className="relative mt-3 [container-type:inline-size] md:mt-[clamp(24px,5.5vw,110px)]">
          <span
            className="hero-rise inline-block text-[length:19.5cqw] font-medium leading-[1.12] tracking-[-0.055em] md:block md:text-[length:11.1cqw] md:leading-[0.9] md:tracking-[-0.035em]"
            style={{ animationDelay: "100ms" }}
          >
            Ideas
          </span>

          {/* mobile: small italic "&" right after "Ideas"  |  laptop: big "&" overlapping both words */}
          <span
            aria-hidden="true"
            className="hero-amp hero-rise pointer-events-none ml-[2.5cqw] inline-block text-[length:17cqw] leading-none text-[#a9a9ae] md:absolute md:left-[23.4cqw] md:top-[-2.4cqw] md:ml-0 md:block md:text-[length:25cqw]"
            style={{ animationDelay: "250ms" }}
          >
            &amp;
          </span>

          <span
            className="hero-rise relative mt-[0.5cqw] block max-w-full text-[length:19.5cqw] font-medium leading-[1.12] tracking-[-0.055em] md:ml-auto md:mt-[1.3cqw] md:w-fit md:text-[length:10.65cqw] md:leading-[0.95] md:tracking-[-0.035em]"
            style={{ animationDelay: "400ms" }}
          >
            Engineering
          </span>
          <span className="sr-only"> — Ideas and Engineering</span>
        </h1>

        {/* bottom area */}
        <div className="mt-9 grid grid-cols-1 gap-5 md:mt-auto md:grid-cols-[1fr_1.4fr] md:items-start md:gap-x-[clamp(24px,2vw,40px)] md:gap-y-0 md:pt-[min(3vw,57px)]">
          <p
            className="hero-rise text-[clamp(22px,2.2vw,40px)] font-normal leading-none tracking-[-0.03em]"
            style={{ animationDelay: "550ms" }}
          >
            (@2K20)
          </p>

          <div className="min-w-0">
            <p
              className="hero-rise max-w-[34em] text-[clamp(15px,1.3vw,23px)] leading-[1.3] tracking-[-0.015em] text-neutral-500 md:max-w-none"
              style={{ animationDelay: "550ms" }}
            >
              From web applications to scalable SaaS platforms, we combine engineering expertise, modern technologies, and
              product thinking to turn ideas into reliable digital solutions.
            </p>

            <p
              className="hero-rise mt-6 flex items-center gap-2 text-[clamp(12px,0.95vw,17px)] font-medium tracking-[-0.01em] md:mt-[min(2.2vw,42px)]"
              style={{ animationDelay: "650ms" }}
            >
              <Spark className="h-[1.1em] w-[1.1em]" />
              What We Build
            </p>

            <ul className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 md:mt-[min(1.1vw,21px)] md:grid-cols-6 md:gap-[min(0.65vw,12px)]">
              {THUMBS.map((t, i) => (
                <Thumb key={t.alt} t={t} i={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}