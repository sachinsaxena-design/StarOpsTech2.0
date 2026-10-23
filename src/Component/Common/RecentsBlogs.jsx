import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import blogdata from "../Data/blog/blogs.json";
import blogprofiles from "../Data/blog/blogprofile.json";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.bl-sans { font-family: 'Inter', system-ui, sans-serif; }`;

function useInView({ threshold = 0.1 } = {}) {
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
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ------------------------------------------------------------------ */
/*  Author photo lookup (blogprofile.json)                              */
/* ------------------------------------------------------------------ */
const NAME_KEYS = ["name", "author", "authorName", "username", "fullName"];
const IMG_KEYS = ["image", "img", "photo", "picture", "avatar", "profile", "profileImage", "profileUrl", "imageUrl", "photoUrl", "authorUrl", "url", "src"];

const norm = (s) => String(s ?? "").toLowerCase().replace(/\s+/g, " ").trim();

const pickImage = (v) => {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") for (const k of IMG_KEYS) if (typeof v[k] === "string" && v[k]) return v[k];
  return null;
};

/* accepts any of:  [{ name, image }]  |  { profiles: [...] }  |  { "Author Name": "img" }  |  { "Author Name": { image } } */
function buildProfileMap(raw) {
  const map = new Map();
  const list = Array.isArray(raw) ? raw : Array.isArray(raw?.profiles) ? raw.profiles : Array.isArray(raw?.authors) ? raw.authors : null;
  if (list) {
    list.forEach((p) => {
      const name = NAME_KEYS.map((k) => p?.[k]).find(Boolean);
      const img = pickImage(p);
      if (name && img) map.set(norm(name), img);
    });
  } else {
    Object.entries(raw || {}).forEach(([name, v]) => {
      const img = pickImage(v);
      if (img) map.set(norm(name), img);
    });
  }
  return map;
}
const PROFILE_MAP = buildProfileMap(blogprofiles);

/* if the JSON stores a bare file name ("ashok.jpeg"), find it in src/assets (Vite).
   Full URLs and /public paths are used as they are. */
const ASSET_FILES =
  typeof import.meta.glob === "function"
    ? import.meta.glob("../../assets/*.{png,jpg,jpeg,webp,avif,svg}", { eager: true, import: "default" })
    : {};

function resolveImage(value) {
  if (!value) return null;
  if (/^(https?:|data:|blob:|\/)/.test(value)) return value;
  const file = value.split("/").pop();
  const hit = Object.keys(ASSET_FILES).find((k) => k.endsWith(`/${file}`));
  return hit ? ASSET_FILES[hit] : value;
}

const authorNameOf = (blog) => {
  const v = blog?.author ?? blog?.authorName ?? blog?.writer ?? blog?.postedBy ?? blog?.by;
  return typeof v === "object" ? v?.name : v;
};

const warned = new Set();
function authorImageOf(blog) {
  const name = authorNameOf(blog);
  const found = PROFILE_MAP.get(norm(name));
  if (!found && name && import.meta.env?.DEV && !warned.has(name)) {
    warned.add(name);
    console.warn(`[RecentsBlogs] no profile image in blogprofile.json for author "${name}"`);
  }
  return resolveImage(found) || resolveImage(blog?.authorUrl) || null;
}

/* concave corner pieces: white fills the bottom-left, a quarter circle is cut from the top-right.
   Each one is 1px longer than needed so it overlaps the tile (no hairline seam). */
const CONCAVE_BG = "radial-gradient(circle at 100% 0%, transparent calc(4cqw - 0.5px), #fff 4cqw)";

function AuthorBadge({ src }) {
  return (
    <div className="pointer-events-none absolute -bottom-px -left-px z-10 overflow-hidden pr-[4cqw] pt-[4cqw]" aria-hidden="true">
      <div className="relative -translate-x-[102%] transition-transform duration-[750ms] ease-[cubic-bezier(.22,1,.36,1)] [will-change:transform] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none">
        <div className="flex items-end rounded-tr-[4.4cqw] bg-white pb-px pl-px pr-[2.9cqw] pt-[2.9cqw]">
          <span
            className="block h-[16.6cqw] w-[16.6cqw] -translate-x-[35%] scale-95 overflow-hidden rounded-[24%] bg-gradient-to-br from-[#d9a47a] to-[#5a3a22] opacity-0 transition-[transform,opacity] delay-100 duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] [will-change:transform] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          >
            {src ? (
              <img src={src} alt="" draggable={false} className="h-full w-full object-cover" />
            ) : (
              <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden="true">
                <circle cx="20" cy="16" r="7" fill="#f0cdb0" />
                <path d="M13 14c0-8 14-8 14 0-2-3-12-3-14 0z" fill="#1d1816" />
                <path d="M6 40c1-9 6-12 14-12s13 3 14 12z" fill="#e9e9ea" />
              </svg>
            )}
          </span>
        </div>

        <span className="absolute bottom-0 left-full" style={{ width: "calc(4cqw + 1px)", height: "4cqw", marginLeft: "-1px", background: CONCAVE_BG }} />
        <span className="absolute bottom-full left-0" style={{ width: "4cqw", height: "calc(4cqw + 1px)", marginBottom: "-1px", background: CONCAVE_BG }} />
      </div>
    </div>
  );
}

const BlogCard = ({ data, index, show }) => {
  return (
    <a
      href={`/blog/${data?.title}`}
      className="group flex h-full flex-col rounded-[4.4cqw] outline-none transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] [container-type:inline-size] focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-4 motion-reduce:transition-none"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(30px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* photo: 408 x 234 */}
      <div className="relative aspect-[408/234] w-full shrink-0">
        <div className="absolute inset-0 overflow-hidden rounded-[4.4cqw] bg-neutral-100">
          {data?.posterUrl && (
            <img src={data.posterUrl} alt={data?.heading || "starops article"} draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" />
          )}
        </div>
        <AuthorBadge src={authorImageOf(data)} />
      </div>

      {/* text */}
      <div className="mt-[7.4cqw] flex flex-1 flex-col">
        {data?.readTime && (
          <p className="mb-[2.4cqw] leading-[1.4] tracking-[-0.01em] text-[#1a1a1a]" style={{ fontSize: "clamp(14px,4.15cqw,17px)" }}>
            {data.readTime}
          </p>
        )}
        <h3 className="line-clamp-4 font-medium leading-[1.2] tracking-[-0.025em] text-[#0a0a0a]" style={{ fontSize: "clamp(20px,6.6cqw,28px)" }}>
          {data?.heading}
        </h3>
        <p className="mt-[4.6cqw] line-clamp-6 leading-[1.7] tracking-[-0.01em] text-neutral-500" style={{ fontSize: "clamp(14px,4.15cqw,17px)" }}>
          {data?.description}
        </p>
      </div>
    </a>
  );
};

const RecentsBlogs = ({ heading, recents = [], eyebrow = "Latest New & Blogs", allLink = "/blog" }) => {
  const [ref, inView] = useInView();

  /* look up each id, skip any id that is not in blogs.json */
  const items = recents.map((id) => blogdata.blogs.find((item) => item.id === id)).filter(Boolean);

  return (
    <section ref={ref} className="bl-sans w-full bg-white px-5 py-16 text-[#0a0a0a] sm:px-8 lg:py-[clamp(64px,7vw,130px)]">
      <style>{FONT_CSS}</style>

      <div className="mx-auto max-w-[1293px] [container-type:inline-size]">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-6">
          <div>
            <p className="flex items-center gap-[0.55em] font-normal tracking-[-0.01em]" style={{ fontSize: "clamp(15px,1.1vw,21px)" }}>
              <span className="h-[0.6em] w-[0.6em] rounded-full bg-[#2f5bff]" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 className="mt-[0.5em] max-w-[12ch] font-semibold leading-[1.04] tracking-[-0.04em]" style={{ fontSize: "clamp(36px,3.05vw,58px)" }}>
              {heading || "The latest blog from us."}
            </h2>
          </div>

          <a
            href={allLink}
            className="group/btn inline-flex items-center gap-[0.7em] rounded-full bg-[#0a0a0b] px-[1.45em] font-medium text-white outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2"
            style={{ fontSize: "clamp(16px,1.05vw,20px)", height: "clamp(48px,3.1vw,59px)" }}
          >
            View All Blog
            <ArrowRight className="h-[1em] w-[1em] transition-transform group-hover/btn:translate-x-0.5" />
          </a>
        </div>

        {/* cards: equal height (grid stretches every card to the tallest one) */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-x-[clamp(20px,2.63cqw,34px)] gap-y-12 md:grid-cols-2 lg:mt-[clamp(40px,6.1cqw,80px)] lg:grid-cols-3">
          {items.map((value, key) => (
            <BlogCard data={value} key={value.id} index={key} show={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentsBlogs;