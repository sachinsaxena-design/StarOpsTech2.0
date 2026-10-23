import React from "react";

/* Usage: <Navbar /> then <Hero /> at the top of your page.
   Put your video link below (a direct .mp4 / .webm URL or an imported file). */
import bgvideo from '../assets/bg-video.mp4';
import AboutSection from "./Section/AboutSection";
import ServicesSection from "./Section/ServiceSection";
import IdeaSection from "./Section/IdeaSection";
import ServicesCarousel from "./Section/ServicesCarousel";
import webimage from '../assets/web-development.jpg';
import mobileimage from '../assets/mobile-development.jpg';
import devopsimage from '../assets/devops-development.jpg';
import productimage from '../assets/product-development.jpg';
import saasimage from '../assets/saas-development.jpg';
import itstaffimage from '../assets/it-staff.jpg';
import StepSection from "./Section/StepSection";
import WhyUsSection from "./Section/WhyUsSection";
import ReviewSection from "./Section/ReviewSection"
import RecentsBlogs from './Common/RecentsBlogs'
import recentblogsdata from "./Data/blog/blogs.json";
import ContactUs from "./Section/ContactUsSections";
const VIDEO_URL = "YOUR_VIDEO_LINK_HERE";

const SERVICES = [
  ["01", "Mobile App Development", 0],
  ["02", "Web Development", 38],
  ["03", "DevOps Consulting", 0],
  ["04", "SaaS Product Development", 28],
  ["05", "Product Engineering", 0],
  ["06", "IT Staff Augmentation", 38],
];

export default function Hero() {
  return (
    <>
      <style>{css}</style>
      <section id="hero" className="hero">
        <video
          className="hero-video"
          src={bgvideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-overlay" />

        <h1 className="hero-title">
          Software
          <br />
          Solutions
        </h1>

        <div className="hero-bottom">
          <div className="hero-about">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path d="M12 1c.6 6.4 4.6 10.4 11 11-6.4.6-10.4 4.6-11 11-.6-6.4-4.6-10.4-11-11C7.4 11.4 11.4 7.4 12 1z" />
            </svg>
            <p>
              We build innovative software solutions and digital experiences that help
              businesses grow, scale, and succeed.
            </p>
            <small>© 2026 StarOps Technologies Pvt Ltd</small>
          </div>

          <div className="hero-right">
            <ul className="hero-list">
              {SERVICES.map(([n, label, indent]) => (
                <li key={n} style={{ "--indent": `${indent}px` }}>
                  <i>({n})</i> {label}
                </li>
              ))}
            </ul>
            <a href="/contact" className="hero-cta">
              Let's work together
              <span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>
      <AboutSection/>
      <ServicesSection/>
      <IdeaSection/>
      <ServicesCarousel/>
      <StepSection/>
      <WhyUsSection/>
      <ReviewSection/>
      <RecentsBlogs recents={recentblogsdata.recentblog} />
      <ContactUs  />
    </>
  );
}

const css = `
.hero{position:relative;min-height:100vh;min-height:100svh;overflow:hidden;background:#05060a;color:#fff;font-family:Inter,"Helvetica Neue",Arial,sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:96px 16px 24px;box-sizing:border-box}
.hero *{box-sizing:border-box}
.hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(5,6,10,.55) 0%,rgba(5,6,10,.1) 35%,rgba(5,6,10,.45) 100%)}
.hero-title{position:relative;z-index:2;margin:0;font-size:clamp(60px,14vw,195px);line-height:.92;font-weight:600;letter-spacing:-.045em;background:linear-gradient(180deg,#fff 20%,#b9b9bd 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:heroIn .9s ease both}
.hero-bottom{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-top:40px}
.hero-about{max-width:240px;animation:heroIn .9s .2s ease both}
.hero-about p{margin:6px 0 16px;font-size:13px;line-height:1.25;font-weight:500}
.hero-about small{font-size:11px;opacity:.9}
.hero-right{display:flex;flex-direction:column;align-items:flex-end;gap:20px;animation:heroIn .9s .35s ease both}
.hero-list{list-style:none;margin:0;padding:0;text-align:left}
.hero-list li{font-size:clamp(14px,1.3vw,18px);font-weight:500;line-height:1.5;padding-left:var(--indent);white-space:nowrap}
.hero-list i{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-weight:400;opacity:.85;margin-right:4px}
.hero-cta{display:inline-flex;align-items:center;gap:26px;background:#fff;color:#000;text-decoration:none;font-size:13px;font-weight:500;padding:5px 5px 5px 20px;border-radius:999px;transition:transform .25s}
.hero-cta:hover{transform:translateY(-2px)}
.hero-cta span{width:26px;height:26px;border-radius:50%;background:#000;display:grid;place-items:center}
@keyframes heroIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@media(max-width:800px){
  .hero-bottom{flex-direction:column;align-items:flex-start}
  .hero-right{align-items:flex-start}
  .hero-list li{white-space:normal}
}
@media(prefers-reduced-motion:reduce){.hero-title,.hero-about,.hero-right{animation:none}}
`;