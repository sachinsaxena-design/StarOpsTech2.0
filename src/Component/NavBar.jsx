import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
/* Usage: import Navbar from "./NavbarResponsive"; <Navbar /> */
import webapp from '../assets/coding.png'
import mobileapp from '../assets/mobile-app.png'
import devops from '../assets/devops.png'
import product from '../assets/product.png'
import itconsulting from '../assets/it-consulting.png'
import saas from '../assets/saas.png'
import reacticon from '../assets/react.png'
import pythonicon from '../assets/python-icon.png'
import djangoicon from '../assets/django-icon.png'
import nexticon from '../assets/nextjs.png'
import fluttericon from '../assets/flutter-icon.png'
import devopsicon from '../assets/devops-icons.png'
import career from '../assets/career.png'
import blog from '../assets/blog.png'
import portfolio from '../assets/portfolio.png'
import gallery from '../assets/gallery.png'
import { Link, useLocation } from "react-router-dom";

// Pages with a WHITE hero where the navbar text must be dark until you scroll.
// Add more routes here if needed, e.g. ["/contact-us", "/privacy-policy"]
const LIGHT_HERO_ROUTES = ["/contact-us"];

// [icon key, title, description, href]
// Service hrefs are the URLs of the service pages: /services/<slug>
// (slugs must match the keys in src/data/services/index.js)
// Expertise hrefs are /expertise/<slug> (keys in src/data/expertise/index.js)
const SERVICES = [
  ["code", "Web Development", "Empower Your Vision with Dynamic Web Solutions.", "/services/web-development"],
  ["phone", "Mobile Development", "Elevate Your Vision through Innovative App Solutions.", "/services/mobile-development"],
  ["inf", "DevOps", "Drive Visionary Success with Agile DevOps Excellence.", "/services/devops"],
  ["box", "Product", "Crafting Innovation Through Product Engineering Services", "/services/product"],
  ["users", "IT Consulting", "Navigating IT Excellence: Our Comprehensive Consulting Services", "/services/it-consulting"],
  ["cloud", "SaaS", "Empowering Your Vision with Expert SaaS Product Development Services", "/services/saas"],
];

const EXPERTISE = [
  ["atom", "React Js", "Dynamic web solutions for empowered vision.", "/expertise/react-js"],
  ["py", "Python Development", "Innovative app solutions with Python.", "/expertise/python"],
  ["N", "Next.Js", "Visionary success with agile DevOps using Next.js.", "/expertise/next-js"],
  ["dj", "Django Development", "Innovation through Django product engineering.", "/expertise/django"],
  ["gear", "DevOps", "Drive Visionary Success with Agile DevOps Excellence.", "/expertise/devops"],
  ["flutter", "Flutter", "StarOps excels in innovative Flutter app development for businesses.", "/expertise/flutter"],
];

// [title, image, href]
const INSIGHT = [
  ["Portfolio", portfolio, "/portfolio"],
  ["Career", career, "/career"],
  ["Blog", blog, "/blog"],
  ["Gallery", gallery, "/gallery"],
];

// Icons that are image files
const IMG_ICONS = {
  code: [webapp, "Web Development"],
  phone: [mobileapp, "Mobile Development"],
  inf: [devops, "DevOps"],
  box: [product, "Product"],
  users: [itconsulting, "IT Consulting"],
  cloud: [saas, "SaaS"],
  atom: [reacticon, "React Js"],
  py: [pythonicon, "Python Development"],
  gear: [devopsicon, "DevOps"],
  flutter: [fluttericon, "Flutter"],
  dj: [djangoicon, "Django Development"],
  N: [nexticon, "Next.Js"],
};

function Icon({ name }) {
  const [src, alt] = IMG_ICONS[name];
  return <img src={src} alt={alt} />;
}

/* internal paths ("/services/…") use the router (no page reload),
   anything else ("#", external) stays a normal link */
function NavItem({ href, children, ...rest }) {
  if (href && href.startsWith("/")) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

function Column({ title, items, onNavigate }) {
  return (
    <div>
      <h6>{title}</h6>
      {items.map(([icon, name, desc, href]) => (
        <NavItem className="so-item" href={href} key={title + name} onClick={onNavigate}>
          <div className="so-ic"><Icon name={icon} /></div>
          <div>
            <b>{name}</b>
            <p>{desc}</p>
          </div>
        </NavItem>
      ))}
    </div>
  );
}

function MobileGroup({ title, children }) {
  return (
    <div className="so-mg">
      <h6>{title}</h6>
      {children}
    </div>
  );
}

export default function Navbar() {
  const { pathname: path } = useLocation(); // re-renders on every route change, so the active link stays correct
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [feat, setFeat] = useState(false); // mobile "Features" accordion
  const [ddHide, setDdHide] = useState(false); // desktop mega menu: hidden after a click until the mouse leaves

  // white-hero pages: dark text at the top, switches to white once the navbar turns solid (dark)
  const cleanPath = path.length > 1 ? path.replace(/\/$/, "") : path;
  const lightHero = LIGHT_HERO_ROUTES.includes(cleanPath);
  const light = lightHero && !solid && !open;

  const close = () => {
    setOpen(false);
    setFeat(false);
  };

  // clicking a link in the desktop mega menu closes it (otherwise hover/focus keeps it open)
  const onDesktopNavigate = () => {
    setDdHide(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  // also close the mobile menu whenever the route changes
  useEffect(() => {
    close();
  }, [path]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]); // re-check on route change so the colour is right on arrival

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    const onResize = () => window.innerWidth > 900 && close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <style>{css}</style>

      <header className={`so-header ${solid || open ? "so-solid" : ""} ${light ? "so-light" : ""}`}>
        <div className="so-left">
          <Link to="/" aria-label="StarOps home" onClick={close}>
            <img src={logo} alt="StarOps" className="w-16" />
          </Link>
          {/*DESKTOP NAV*/}
          <nav className="so-nav-desktop">
            <ul>
              <li>
                <Link className={`so-link ${path === "/" ? "so-active" : ""}`} to="/">Home</Link>
              </li>
              <li>
                <Link className={`so-link ${path === "/about-us" ? "so-active" : ""}`} to="/about-us">About Us</Link>
              </li>
              <li className={`so-has-dd ${ddHide ? "so-dd-hide" : ""}`} onMouseLeave={() => setDdHide(false)}>
                <a className={`so-trigger`} href="#" tabIndex={0} onClick={(e) => e.preventDefault()}>
                  Features
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </a>
                <div className="so-mega">
                  <div className="so-cols">
                    <Column title="SERVICES" items={SERVICES} onNavigate={onDesktopNavigate} />
                    <Column title="EXPERTISE" items={EXPERTISE} onNavigate={onDesktopNavigate} />
                    <div className="so-insight">
                      <h6>INSIGHT</h6>
                      {INSIGHT.map(([name, img, href]) => (
                        <NavItem className="so-item" href={href} key={name} onClick={onDesktopNavigate}>
                          <div className="so-ic"><img src={img} alt={name} /></div>
                          <b>{name}</b>
                        </NavItem>
                      ))}
                    </div>
                  </div>
                  <div className="so-foot">
                    <NavItem href="/contact-us" onClick={onDesktopNavigate}>
                      Contact Us
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </NavItem>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <Link className="so-pill" to="/contact-us">Contact Us</Link>

        <button
          type="button"
          className={`so-burger ${open ? "so-burger-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="so-mobile"
          onClick={() => (open ? close() : setOpen(true))}
        >
          <span /><span /><span />
        </button>
      </header>

      <div id="so-mobile" className={`so-mobile ${open ? "so-open" : ""}`} aria-hidden={!open}>
        <ul className="so-m-list">
          <li>
            <Link className={`so-m-link ${path === "/" ? "so-active" : ""}`} to="/" onClick={close}>Home</Link>
          </li>
          <li>
            <Link className={`so-m-link ${path === "/about-us" ? "so-active" : ""}`} to="/about-us" onClick={close}>About Us</Link>
          </li>
          <li>
            <button
              type="button"
              className={`so-m-link so-m-toggle ${feat ? "so-feat-open" : ""}`}
              aria-expanded={feat}
              onClick={() => setFeat((v) => !v)}
            >
              Features
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div className={`so-acc ${feat ? "so-acc-open" : ""}`}>
              <div className="so-acc-in">
                <MobileGroup title="SERVICES">
                  {SERVICES.map(([icon, name, desc, href]) => (
                    <NavItem className="so-mi" href={href} key={"s" + name} onClick={close}>
                      <span className="so-mic"><Icon name={icon} /></span>
                      <span><b>{name}</b><small>{desc}</small></span>
                    </NavItem>
                  ))}
                </MobileGroup>

                <MobileGroup title="EXPERTISE">
                  {EXPERTISE.map(([icon, name, desc, href]) => (
                    <NavItem className="so-mi" href={href} key={"e" + name} onClick={close}>
                      <span className="so-mic"><Icon name={icon} /></span>
                      <span><b>{name}</b><small>{desc}</small></span>
                    </NavItem>
                  ))}
                </MobileGroup>

                <MobileGroup title="INSIGHT">
                  <div className="so-m-insight">
                    {INSIGHT.map(([name, img, href]) => (
                      <NavItem className="so-mi" href={href} key={"i" + name} onClick={close}>
                        <span className="so-mic"><img src={img} alt="" /></span>
                        <span><b>{name}</b></span>
                      </NavItem>
                    ))}
                  </div>
                </MobileGroup>
              </div>
            </div>
          </li>
        </ul>

        <Link className="so-m-cta" to="/contact-us" onClick={close}>
          Contact Us
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </>
  );
}

const css = `
/* ============ HEADER ============ */
.so-header{display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 16px;height:76px;position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(5,6,10,0);transition:background-color .5s cubic-bezier(.4,0,.2,1),height .5s cubic-bezier(.4,0,.2,1),box-shadow .5s ease,backdrop-filter .5s ease,-webkit-backdrop-filter .5s ease,color .4s ease;color:#fff;font-family:Inter,"Helvetica Neue",Arial,sans-serif;box-sizing:border-box}
.so-header *,.so-mobile,.so-mobile *{box-sizing:border-box}
.so-header.so-solid{height:62px;background:rgba(5,6,10,.92);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 1px 0 rgba(255,255,255,.08),0 10px 30px rgba(0,0,0,.35)}
.so-left{display:flex;align-items:center;gap:28px}
.so-left > a{display:flex;align-items:center}

/* ============ DESKTOP NAV ============ */
.so-header nav ul{display:flex;align-items:center;gap:8px;list-style:none;margin:0;padding:0}
.so-header nav a{color:#fff;text-decoration:none;font-size:15px;font-weight:500;transition:color .4s ease}
.so-header nav a.so-link{padding:8px 16px;border-radius:999px;transition:background .25s,color .4s,transform .25s}
.so-header nav a.so-link:hover{background:#fff;color:#05060a;transform:translateY(-1px)}
.so-header nav a.so-link.so-active{background:rgba(255,255,255,.15)}
.so-header nav a.so-link.so-active:hover{background:#fff}
.so-trigger{display:flex;align-items:center;gap:5px;cursor:pointer;padding:24px 16px}
.so-trigger svg{transition:transform .2s,stroke .4s ease}
.so-has-dd:hover .so-trigger svg{transform:rotate(180deg)}
.so-pill{background:#fff;color:#000;border-radius:999px;padding:10px 18px;font-size:15px;text-decoration:none;white-space:nowrap;transition:background-color .4s ease,color .4s ease}

/* ---- white-hero pages (e.g. /contact-us): dark text until the navbar turns solid ---- */
.so-header.so-light{color:#07090d}
.so-header.so-light nav a{color:#07090d}
.so-header.so-light nav a.so-link:hover{background:#07090d;color:#fff}
.so-header.so-light nav a.so-link.so-active{background:rgba(7,9,13,.08)}
.so-header.so-light nav a.so-link.so-active:hover{background:#07090d}
.so-header.so-light .so-trigger svg{stroke:#07090d}
.so-header.so-light .so-pill{background:#07090d;color:#fff}
.so-header.so-light .so-burger{background:rgba(7,9,13,.06)}
.so-header.so-light .so-burger:hover{background:rgba(7,9,13,.12)}
.so-header.so-light .so-burger span{background:#07090d}

/* mega menu */
.so-mega{position:fixed;top:48px;left:40px;width:min(960px,calc(100vw - 80px));max-height:calc(100vh - 56px);overflow:auto;background:#fff;color:#111;border-radius:24px;padding:18px 20px 16px;opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .2s,transform .2s,visibility .2s;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.so-has-dd:hover .so-mega,.so-has-dd:focus-within .so-mega{opacity:1;visibility:visible;transform:none}
/* closed after clicking a link, until the mouse leaves the menu */
.so-has-dd.so-dd-hide:hover .so-mega,.so-has-dd.so-dd-hide:focus-within .so-mega{opacity:0;visibility:hidden;transform:translateY(-8px)}
.so-cols{display:grid;grid-template-columns:1.15fr 1.05fr .8fr;gap:20px}
.so-mega h6{margin:4px 0 14px;font-size:12px;letter-spacing:2.2px;font-weight:500}
.so-header .so-mega a.so-item{display:flex;gap:12px;align-items:flex-start;margin-bottom:17px;color:#111;text-decoration:none}
.so-ic{flex:0 0 36px;width:36px;height:36px;display:grid;place-items:center}
.so-ic img{width:28px;height:28px;object-fit:contain}
.so-item b{display:block;font-size:16px;font-weight:500;margin-bottom:2px}
.so-item p{margin:0;font-size:13.5px;line-height:1.3;color:#222}
.so-insight .so-item{align-items:center;margin-bottom:20px}
.so-insight .so-item b{font-weight:600;margin:0}
.so-foot{border-top:1px solid #111;margin-top:4px;padding-top:12px;display:flex;justify-content:flex-end}
.so-header .so-foot a{color:#111;font-size:16px;display:flex;gap:8px;align-items:center;text-decoration:none}

/* tablet-landscape / small laptop (still desktop layout) */
@media(max-width:1100px){
  .so-header nav a.so-link{padding:8px 12px}
  .so-trigger{padding:24px 12px}
  .so-mega{left:20px;width:calc(100vw - 40px)}
  .so-cols{gap:14px}
  .so-item p{font-size:12.5px}
}

/* ============ HAMBURGER (hidden on desktop) ============ */
.so-burger{display:none;position:relative;width:44px;height:44px;margin-right:4px;border:0;border-radius:50%;background:rgba(255,255,255,.1);cursor:pointer;padding:0;transition:background .25s}
.so-burger:hover{background:rgba(255,255,255,.18)}
.so-burger span{position:absolute;left:12px;right:12px;height:2px;border-radius:2px;background:#fff;transition:transform .35s cubic-bezier(.4,0,.2,1),opacity .2s ease,top .35s cubic-bezier(.4,0,.2,1),background-color .4s ease}
.so-burger span:nth-child(1){top:15px}
.so-burger span:nth-child(2){top:21px}
.so-burger span:nth-child(3){top:27px}
.so-burger-open span:nth-child(1){top:21px;transform:rotate(45deg)}
.so-burger-open span:nth-child(2){opacity:0}
.so-burger-open span:nth-child(3){top:21px;transform:rotate(-45deg)}

/* ============ MOBILE MENU ============ */
.so-mobile{display:none}

@media(max-width:900px){
  .so-nav-desktop{display:none}
  .so-pill{display:none}
  .so-burger{display:block}
  .so-header{height:64px;padding:0 12px 0 16px}
  .so-header.so-solid{height:60px}

  .so-mobile{display:flex;flex-direction:column;position:fixed;inset:0;z-index:40;background:#05060a;color:#fff;font-family:Inter,"Helvetica Neue",Arial,sans-serif;padding:76px 18px calc(24px + env(safe-area-inset-bottom,0px));overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;opacity:0;visibility:hidden;transform:translateY(-12px);transition:opacity .3s ease,transform .35s cubic-bezier(.4,0,.2,1),visibility .35s}
  .so-mobile.so-open{opacity:1;visibility:visible;transform:none}

  .so-m-list{list-style:none;margin:0;padding:0}
  .so-m-link{display:flex;align-items:center;justify-content:space-between;width:100%;padding:16px 4px;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.85);font:500 22px/1.2 Inter,"Helvetica Neue",Arial,sans-serif;text-align:left;text-decoration:none;cursor:pointer;transition:color .2s,padding-left .25s}
  .so-m-link:hover,.so-m-link.so-active{color:#fff;padding-left:10px}
  .so-m-link.so-active::before{content:"";width:7px;height:7px;border-radius:50%;background:#1a5cff;margin-right:10px;flex:none}
  .so-m-link.so-active{justify-content:flex-start}
  .so-m-toggle svg{transition:transform .3s ease}
  .so-feat-open svg{transform:rotate(180deg)}
  .so-feat-open{color:#fff}

  /* accordion (0fr -> 1fr animates the height) */
  .so-acc{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.4,0,.2,1)}
  .so-acc-open{grid-template-rows:1fr}
  .so-acc-in{overflow:hidden;min-height:0}

  .so-mg{padding:18px 0 4px}
  .so-mg h6{margin:0 0 10px;font-size:11px;letter-spacing:2.2px;font-weight:600;color:#8b90a0}
  .so-mi{display:flex;align-items:center;gap:12px;padding:10px;margin:0 -10px 2px;border-radius:14px;color:#fff;text-decoration:none;transition:background .2s}
  .so-mi:hover,.so-mi:active{background:rgba(255,255,255,.08)}
  .so-mic{flex:0 0 42px;width:42px;height:42px;border-radius:12px;background:#fff;display:grid;place-items:center}
  .so-mic img{width:26px;height:26px;object-fit:contain}
  .so-mi b{display:block;font-size:15.5px;font-weight:500}
  .so-mi small{display:block;margin-top:2px;font-size:12.5px;line-height:1.35;color:#9aa0b0}
  .so-m-insight{display:grid;grid-template-columns:1fr 1fr;gap:4px 10px}

  .so-m-cta{margin-top:26px;display:flex;align-items:center;justify-content:center;gap:10px;background:#fff;color:#000;border-radius:999px;padding:15px 20px;font-size:17px;font-weight:500;text-decoration:none;flex:none}

  /* staggered fade-in of the menu rows */
  .so-mobile.so-open .so-m-list > li,.so-mobile.so-open .so-m-cta{animation:soIn .5s cubic-bezier(.22,1,.36,1) both}
  .so-mobile.so-open .so-m-list > li:nth-child(1){animation-delay:.05s}
  .so-mobile.so-open .so-m-list > li:nth-child(2){animation-delay:.1s}
  .so-mobile.so-open .so-m-list > li:nth-child(3){animation-delay:.15s}
  .so-mobile.so-open .so-m-cta{animation-delay:.22s}
}
@keyframes soIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}

@media(max-width:380px){
  .so-m-link{font-size:20px}
  .so-m-insight{grid-template-columns:1fr}
}
@media(min-width:901px){.so-mobile{display:none !important}}
@media(prefers-reduced-motion:reduce){
  .so-mobile,.so-acc,.so-burger span{transition:none}
  .so-mobile.so-open .so-m-list > li,.so-mobile.so-open .so-m-cta{animation:none}
}
`;