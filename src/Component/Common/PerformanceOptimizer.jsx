import React, { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical images
      const criticalImages = [
        "https://cdn.staropstech.com/starops/assets/pages_banner/homepage.webp",
        "https://cdn.staropstech.com/starops/assets/logo.png",
      ];

      criticalImages.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });

      // Preload critical fonts if any
      const fontLink = document.createElement("link");
      fontLink.rel = "preload";
      fontLink.as = "font";
      fontLink.crossOrigin = "anonymous";
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(fontLink);
    };

    // Lazy load images
    const lazyLoadImages = () => {
      const images = document.querySelectorAll("img[data-src]");
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            observer.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    };

    // Optimize Core Web Vitals
    const optimizeCoreWebVitals = () => {
      // Add loading="lazy" to non-critical images
      const nonCriticalImages = document.querySelectorAll("img:not([loading])");
      nonCriticalImages.forEach((img) => {
        if (!img.classList.contains("critical")) {
          img.loading = "lazy";
        }
      });

      // Add fetchpriority="high" to critical images
      const criticalImages = document.querySelectorAll("img.critical");
      criticalImages.forEach((img) => {
        img.fetchPriority = "high";
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    lazyLoadImages();
    optimizeCoreWebVitals();

    // Cleanup
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
