import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHead = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = "website",
  structuredData,
  noindex = false,
  nofollow = false,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}) => {
  const fullTitle = title
    ? `${title} | StarOps Technologies`
    : "StarOps Technologies Pvt Ltd | IT, Web, App, and DevOps Excellence";
  const fullDescription =
    description ||
    "Discover how StarOps drives business excellence through innovative IT solutions, web and app development, and top-tier DevOps services.";
  const fullKeywords = [
    ...keywords,
    "StarOps Technologies",
    "IT services",
    "web development",
    "app development",
    "DevOps",
    "software development",
    "offshore development",
    "India",
  ].join(", ");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author || "StarOps Technologies"} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Robots Meta */}
      {noindex && <meta name="robots" content="noindex" />}
      {nofollow && <meta name="robots" content="nofollow" />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl || window.location.href} />
      <meta property="og:site_name" content="StarOps Technologies" />
      <meta property="og:locale" content="en_US" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:site" content="@StarOpsTech" />
      <meta name="twitter:creator" content="@StarOpsTech" />

      {/* Article Specific Meta Tags */}
      {ogType === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#427ee6" />
      <meta name="msapplication-TileColor" content="#427ee6" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://cdn.staropstech.com" />
      <link rel="dns-prefetch" href="https://cdn.staropstech.com" />
    </Helmet>
  );
};

export default SEOHead;
