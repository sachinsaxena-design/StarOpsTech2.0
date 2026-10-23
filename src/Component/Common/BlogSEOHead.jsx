import React from "react";
import { Helmet } from "react-helmet-async";

const BlogSEOHead = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  author,
  publishedTime,
  modifiedTime,
  section = "Technology",
  tags = [],
  readingTime,
  category,
  featured = false,
}) => {
  const fullTitle = title
    ? `${title} | StarOps Technologies Blog`
    : "StarOps Technologies Blog | Latest Insights & Industry Trends";
  const fullDescription =
    description ||
    "Stay informed with the latest insights, industry trends, and expert advice from StarOps Technologies. Explore our blogs for valuable content on IT, web, app development, and DevOps.";
  const fullKeywords = [
    ...keywords,
    "StarOps Technologies",
    "IT blog",
    "web development blog",
    "app development insights",
    "DevOps trends",
    "technology blog",
    "software development tips",
  ].join(", ");

  // Enhanced structured data for blog posts
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: ogImage,
    author: {
      "@type": "Person",
      name: author || "StarOps Team",
    },
    publisher: {
      "@type": "Organization",
      name: "StarOps Technologies Pvt Ltd",
      logo: {
        "@type": "ImageObject",
        url: "https://staropstech.com/logo.png",
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: keywords.join(", "),
    articleSection: section,
    inLanguage: "en-US",
    wordCount: description ? description.split(" ").length : 0,
    timeRequired: readingTime ? `PT${readingTime}M` : undefined,
    articleCategory: category,
    isAccessibleForFree: true,
    isPartOf: {
      "@type": "Blog",
      name: "StarOps Technologies Blog",
      url: "https://staropstech.com/blog",
    },
  };

  // Add featured article markup if applicable
  if (featured) {
    structuredData["@type"] = "TechArticle";
    structuredData["publisher"] = {
      "@type": "Organization",
      name: "StarOps Technologies Pvt Ltd",
      logo: {
        "@type": "ImageObject",
        url: "https://staropstech.com/logo.png",
      },
      sameAs: [
        "https://www.linkedin.com/company/starops-technologies",
        "https://twitter.com/StarOpsTech",
      ],
    };
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author || "StarOps Technologies"} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Article Specific Meta Tags */}
      <meta property="article:published_time" content={publishedTime} />
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      <meta property="article:section" content={section} />
      <meta
        property="article:author"
        content={author || "StarOps Technologies"}
      />
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="StarOps Technologies Blog" />
      <meta property="og:locale" content="en_US" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      <meta property="og:article:published_time" content={publishedTime} />
      {modifiedTime && (
        <meta property="og:article:modified_time" content={modifiedTime} />
      )}
      <meta property="og:article:section" content={section} />
      <meta
        property="og:article:author"
        content={author || "StarOps Technologies"}
      />
      {tags.map((tag, index) => (
        <meta key={index} property="og:article:tag" content={tag} />
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:site" content="@StarOpsTech" />
      <meta name="twitter:creator" content="@StarOpsTech" />

      {/* Reading Time and Category */}
      {readingTime && (
        <meta name="article:reading_time" content={readingTime} />
      )}
      {category && <meta name="article:category" content={category} />}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#427ee6" />
      <meta name="msapplication-TileColor" content="#427ee6" />

      {/* Blog-specific meta tags */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://cdn.staropstech.com" />
      <link rel="dns-prefetch" href="https://cdn.staropstech.com" />
    </Helmet>
  );
};

export default BlogSEOHead;
