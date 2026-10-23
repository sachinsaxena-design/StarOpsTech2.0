import React, { useEffect } from "react";

const BlogPerformanceOptimizer = () => {
  useEffect(() => {
    // Preload blog-specific critical resources
    const preloadBlogResources = () => {
      // Preload blog images
      const blogImages = [
        "https://cdn.staropstech.com/starops/assets/blogs/like.png",
        "https://cdn.staropstech.com/starops/assets/blogs/save.png",
        "https://cdn.staropstech.com/starops/assets/blogs/hot-topic.png",
        "https://cdn.staropstech.com/starops/assets/blogs/latest.png",
      ];

      blogImages.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });

      // Preload fonts for better typography
      const fontLink = document.createElement("link");
      fontLink.rel = "preload";
      fontLink.as = "font";
      fontLink.crossOrigin = "anonymous";
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(fontLink);
    };

    // Optimize blog images for better performance
    const optimizeBlogImages = () => {
      const blogImages = document.querySelectorAll(
        'img[src*="cdn.staropstech.com"]'
      );
      blogImages.forEach((img) => {
        // Add loading="lazy" to non-critical images
        if (!img.classList.contains("critical")) {
          img.loading = "lazy";
        }

        // Add fetchpriority="high" to critical images
        if (
          img.classList.contains("critical") ||
          img.src.includes("posterUrl")
        ) {
          img.fetchPriority = "high";
        }

        // Add alt text if missing
        if (!img.alt) {
          img.alt = "Blog image - StarOps Technologies";
        }
      });
    };

    // Implement reading progress indicator
    const implementReadingProgress = () => {
      const progressBar = document.createElement("div");
      progressBar.id = "reading-progress";
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #427ee6, #59B57B);
        z-index: 9999;
        transition: width 0.3s ease;
      `;
      document.body.appendChild(progressBar);

      const updateReadingProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
      };

      window.addEventListener("scroll", updateReadingProgress);
      updateReadingProgress();
    };

    // Optimize typography for better readability
    const optimizeTypography = () => {
      // Add optimal line height for blog content
      const blogContent = document.querySelector(".text-lg.sm\\:text-xl");
      if (blogContent) {
        blogContent.style.lineHeight = "1.8";
        blogContent.style.fontSize = "1.125rem";
      }
    };

    // Implement content preloading for related blogs
    const preloadRelatedContent = () => {
      const relatedLinks = document.querySelectorAll('a[href*="/blog/"]');
      relatedLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          const href = link.getAttribute("href");
          if (href) {
            const preloadLink = document.createElement("link");
            preloadLink.rel = "prefetch";
            preloadLink.href = href;
            document.head.appendChild(preloadLink);
          }
        });
      });
    };

    // Initialize all optimizations
    preloadBlogResources();
    optimizeBlogImages();
    implementReadingProgress();
    optimizeTypography();
    preloadRelatedContent();

    // Cleanup function
    return () => {
      const progressBar = document.getElementById("reading-progress");
      if (progressBar) {
        progressBar.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default BlogPerformanceOptimizer;
