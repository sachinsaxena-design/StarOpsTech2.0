import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import blogData from "../Data/blog/blogs.json";
import RenderProfile from "../Common/RenderProfile";
import SEOHead from "../Common/SEOHead";
import BlogPerformanceOptimizer from "../Common/BlogPerformanceOptimizer";
import { ArrowRight, ArrowUpRight, Plus, SearchX } from "lucide-react";

const INITIAL_VISIBLE = 8;
const LOAD_MORE_STEP = 9;

/* Fonts: clean grotesque for text, formal script for the accent word */
const SANS = "'Inter Tight', 'Inter', system-ui, -apple-system, sans-serif";
const SCRIPT = "'Allura', 'Snell Roundhand', cursive";
const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Allura&family=Inter+Tight:wght@400;500;600&display=swap');";

/* ---------- helpers ---------- */

const AUTHOR_NAMES = {
  ansul: "Ansul Tiwari",
  alkesh: "Alkesh Tiwari",
  dewang: "Dewang Sharma",
  divyanshu: "Divyanshu Verma",
  sachin: "Sachin Saxena",
};

const displayName = (author = "") => {
  const key = author.toLowerCase();
  if (AUTHOR_NAMES[key]) return AUTHOR_NAMES[key];
  return author
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const sameAuthor = (a, b) => a?.toLowerCase() === b?.toLowerCase();

const pad = (n) => String(n).padStart(2, "0");

/* ---------- small building blocks ---------- */

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white">
    {children}
  </span>
);

const AuthorFilterBar = ({ authors, selectedAuthor, onSelect, totalCount }) => {
  const base =
    "shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";
  const idle = "bg-[#F3F3F3] text-black hover:bg-[#E8E8E8]";
  const active = "bg-black text-white";

  return (
    <div
      role="group"
      aria-label="Filter blogs by author"
      className="mx-auto flex w-max max-w-full items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <button
        type="button"
        onClick={() => onSelect("")}
        aria-pressed={!selectedAuthor}
        className={`${base} ${!selectedAuthor ? active : idle}`}
      >
        All writers
        <span className={!selectedAuthor ? "text-white/60" : "text-black/40"}>
          {totalCount}
        </span>
      </button>

      {authors.map(({ author, count }) => {
        const isActive = sameAuthor(author, selectedAuthor);
        return (
          <button
            key={author}
            type="button"
            onClick={() => onSelect(author)}
            aria-pressed={isActive}
            className={`${base} ${isActive ? active : idle}`}
          >
            {displayName(author)}
            <span className={isActive ? "text-white/60" : "text-black/40"}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const Poster = ({ src, alt, ratio, eager = false }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-[#E4E4E4] ${ratio}`}>
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-2xl"
    />
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className="relative h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
    />
  </div>
);

/* ---------- Standard card ---------- */

const PostCard = ({ data }) => (
  <a
    href={`/blog/${data.title}`}
    className="group flex flex-col rounded-[22px] bg-[#F3F3F3] p-2.5 transition duration-300 hover:-translate-y-1 hover:bg-[#ECECEC] hover:shadow-[0_14px_30px_rgba(0,0,0,0.07)]"
  >
    <Poster src={data.posterUrl} alt={data.heading} ratio="aspect-[4/3]" />
    <div className="flex flex-1 flex-col px-2.5 pb-2 pt-4">
      <p className="text-xs text-black/50">
        {displayName(data.author)} · {data.date}
      </p>
      <h3 className="mt-2 line-clamp-3 text-base font-medium leading-snug text-black md:text-[17px]">
        {data.heading}
      </h3>
    </div>
  </a>
);

/* ---------- Writer of the week (bento tile) ---------- */

const WriterOfTheWeek = ({ author, posts, onViewPosts, className = "" }) => {
  const latest = posts.slice(0, 3);

  return (
    <aside
      className={`flex flex-col rounded-[22px] bg-[#F3F3F3] p-5 md:p-6 ${className}`}
    >
      <div>
        <Pill>Writer of the week</Pill>
      </div>

      <div className="mt-5 rounded-2xl bg-white p-4">
        <RenderProfile name={author} />
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-5xl font-medium leading-none tracking-tight text-black">
          {posts.length}
        </span>
        <span className="pb-1 text-sm text-black/50">
          {posts.length === 1 ? "article published" : "articles published"}
        </span>
      </div>

      {latest.length > 0 && (
        <ul className="mt-5 flex-1 divide-y divide-black/10 border-t border-black/10">
          {latest.map((p) => (
            <li key={p.title}>
              <a
                href={`/blog/${p.title}`}
                className="block py-3 text-sm leading-snug text-black/70 transition hover:text-black"
              >
                <span className="line-clamp-2">{p.heading}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={onViewPosts}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
      >
        View all posts
        <ArrowRight className="h-4 w-4" />
      </button>
    </aside>
  );
};

/* ---------- Page ---------- */

const BlogMainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const selectedAuthor = searchParams.get("author") || "";

  // Start from the first batch again whenever the author filter changes
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [selectedAuthor]);

  const filteredBlogs = selectedAuthor
    ? blogData.blogs.filter((post) => sameAuthor(post.author, selectedAuthor))
    : blogData.blogs;

  // Every post uses the same card. Writer of the week sits in the grid as a tile
  // (only when no author filter is applied).
  const showWriterTile = !selectedAuthor && filteredBlogs.length > 0;
  const gridPosts = filteredBlogs;
  const visiblePosts = gridPosts.slice(0, visibleCount);
  const remaining = gridPosts.length - visiblePosts.length;

  // Unique authors with post counts (case-insensitive)
  const authors = Object.values(
    blogData.blogs.reduce((acc, post) => {
      if (!post.author) return acc;
      const key = post.author.toLowerCase();
      if (!acc[key]) acc[key] = { author: post.author, count: 0 };
      acc[key].count += 1;
      return acc;
    }, {})
  ).sort((a, b) => b.count - a.count);

  const topWriter = blogData.blogs[0]?.author;
  const topWriterPosts = blogData.blogs.filter((post) =>
    sameAuthor(post.author, topWriter)
  );

  const handleAuthorSelect = (author) => {
    const params = new URLSearchParams(searchParams);
    if (author) {
      params.set("author", author);
    } else {
      params.delete("author");
    }
    params.delete("page"); // clear any old pagination param
    setSearchParams(params);
  };

  // Structured data for blog listing page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "StarOps Technologies Blog",
    description:
      "Latest insights, industry trends, and expert advice from StarOps Technologies on IT, web, app development, and DevOps.",
    url: "https://staropstech.com/blog",
    publisher: {
      "@type": "Organization",
      name: "StarOps Technologies Pvt Ltd",
      logo: {
        "@type": "ImageObject",
        url: "https://staropstech.com/logo.png",
      },
    },
    blogPost: blogData.blogs.slice(0, 5).map((post) => ({
      "@type": "BlogPosting",
      headline: post.heading,
      description: post.description,
      url: `https://staropstech.com/blog/${post.title}`,
      author: {
        "@type": "Person",
        name: post.author,
      },
      datePublished: post.date,
    })),
  };

  return (
    <>
      <BlogPerformanceOptimizer />
      <SEOHead
        title="Blogs - Latest Insights & Industry Trends"
        description="Stay informed with the latest insights, industry trends, and expert advice from StarOps Technologies. Explore our blogs for valuable content on IT, web, app development, and DevOps."
        keywords={[
          "IT blog",
          "web development blog",
          "app development insights",
          "DevOps trends",
          "technology blog",
          "software development tips",
          "IT consulting blog",
          "StarOps blog",
        ]}
        canonicalUrl="https://staropstech.com/blog"
        ogImage="https://cdn.staropstech.com/starops/assets/pages_banner/homepage.webp"
        structuredData={structuredData}
      />

      <style>{FONT_IMPORT}</style>

      <div
        style={{ fontFamily: SANS }}
        className="w-full bg-white text-black antialiased"
      >
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          {/* faint script watermark, like the reference */}
          <span
            aria-hidden="true"
            style={{ fontFamily: SCRIPT }}
            className="pointer-events-none absolute -left-6 -top-16 select-none text-[18rem] leading-none text-[#F2F2F2] md:text-[26rem]"
          >
            B
          </span>

          <div className="container relative mx-auto px-4 pb-10 pt-16 text-center md:px-8 md:pb-14 md:pt-24">
            <h1 className="text-5xl font-medium tracking-tight text-black sm:text-7xl md:text-8xl">
              Explore{" "}
              <span
                style={{ fontFamily: SCRIPT }}
                className="inline-block px-1 text-[1.2em] font-normal leading-none"
              >
                Our
              </span>{" "}
              blog
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/55 md:text-lg">
              Explore StarOps' expertise in IT services and consulting through
              insightful blogs. Stay updated on the latest trends in IT,
              business services, and software development.
            </p>

            <p className="mt-4 text-sm text-black/40">
              {pad(blogData.blogs.length)} articles · {pad(authors.length)} writers
            </p>
          </div>
        </section>

        {/* ================= LISTING ================= */}
        <section className="container mx-auto px-4 pb-16 md:px-8 md:pb-24">
          <AuthorFilterBar
            authors={authors}
            selectedAuthor={selectedAuthor}
            onSelect={handleAuthorSelect}
            totalCount={blogData.blogs.length}
          />

          {selectedAuthor && (
            <p className="mt-8 text-center text-sm text-black/50">
              {pad(filteredBlogs.length)}{" "}
              {filteredBlogs.length === 1 ? "article" : "articles"} by{" "}
              <span className="font-medium text-black">
                {displayName(selectedAuthor)}
              </span>
            </p>
          )}

          {/* Card grid: all posts look the same */}
          {visiblePosts.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post, i) => (
                <Fragment key={post.title}>
                  <PostCard data={post} />
                  {/* Writer of the week tile after the first two posts */}
                  {showWriterTile && topWriter && i === 1 && (
                    <WriterOfTheWeek
                      author={topWriter}
                      posts={topWriterPosts}
                      onViewPosts={() => {
                        handleAuthorSelect(topWriter);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredBlogs.length === 0 && (
            <div className="mt-8 flex flex-col items-center rounded-[22px] bg-[#F3F3F3] px-6 py-20 text-center">
              <SearchX className="h-8 w-8 text-black/40" />
              <h3 className="mt-4 text-lg font-medium">No articles found</h3>
              <p className="mt-1 max-w-sm text-sm text-black/50">
                There are no articles for this writer yet.
              </p>
              <button
                type="button"
                onClick={() => handleAuthorSelect("")}
                className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
              >
                Show all articles
              </button>
            </div>
          )}

          {/* Load more */}
          {remaining > 0 && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + LOAD_MORE_STEP)}
                className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Load more
                <span className="text-white/50">{remaining}</span>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>

        {/* ================= CTA ================= */}
        <section className="container mx-auto px-4 pb-16 md:px-8 md:pb-24">
          <div className="rounded-[28px] bg-black px-6 py-16 text-center text-white md:px-12 md:py-24">
            <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
              Do you like what you{" "}
              <span
                style={{ fontFamily: SCRIPT }}
                className="inline-block text-[1.2em] font-normal leading-none"
              >
                see
              </span>
              ?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/60 md:text-lg">
              Let's work together to turn your dream project into reality.
            </p>
            <a
              href="/contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-white/85"
            >
              Let's talk with us
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogMainPage;