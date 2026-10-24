import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import teamImg from "../../assets/cardimage.jpg";
import leadImg from "../../assets/boy.png";
// Replace these with your own images

/* Usage: <Navbar /> <Hero /> <AboutSection />
   Script font: add to your index.html <head>:
   <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap" rel="stylesheet"> */

const TEXT =
  "Powered by technology, driven by innovation. We build scalable software solutions that help businesses grow and succeed in the digital world.";

// words styled in the handwritten/script font (as in your reference)
const SCRIPT_WORDS = ["technology,", "innovation."];

// "Discuss your projects" opens WhatsApp with this message pre-filled.
// Number = country code + number, digits only (no +, spaces or dashes).
const WHATSAPP_NUMBER = "917530882800";
const WHATSAPP_MESSAGE =
  "Hi StarOps team, I came across your website and would like to discuss a project. Could we set up a quick call?";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function Stars({ filled }) {
  return (
    <span className="ai-stars" aria-label={`${filled} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ opacity: i < filled ? 1 : 0.2 }}>★</span>
      ))}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const wordRefs = useRef([]);
  const words = TEXT.split(" ");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const sec = sectionRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const START = window.innerHeight * 0.55;
      const p = reduce ? 1 : clamp((START - r.top) / (total + START) / 0.9);
      const SPAN = 2.5;
      const lit = p * (words.length + SPAN);
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = clamp((lit - i) / SPAN); // 0 = hidden, 1 = fully shown
        el.style.opacity = o;
        el.style.filter = o >= 1 ? "none" : `blur(${(1 - o) * 14}px)`;
        el.style.transform = o >= 1 ? "none" : `translateY(${(1 - o) * 14}px) scale(${0.96 + 0.04 * o})`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [words.length]);

  return (
    <>
      <style>{css}</style>

      {/* 1. Scroll-driven text reveal */}
      <section ref={sectionRef} className="ai-scroll">
        <div className="ai-sticky">
          <div className="ai-meta">
            <span className="ai-meta-l">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#111" aria-hidden="true">
                <path d="M12 1c.6 6.4 4.6 10.4 11 11-6.4.6-10.4 4.6-11 11-.6-6.4-4.6-10.4-11-11C7.4 11.4 11.4 7.4 12 1z" />
              </svg>
              Inside the Studio
            </span>
            <span className="ai-meta-c">(©20-26)</span>
            <span className="ai-meta-r">(28.48847° , 77.5071°)</span>
          </div>
          <p className="ai-text">
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span
                  ref={(el) => (wordRefs.current[i] = el)}
                  className={`ai-word ${SCRIPT_WORDS.includes(w) ? "ai-script" : ""}`}
                >
                  {w}
                </span>{" "}
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>

      {/* 2. Reviews + image card */}
      <section className="ai-card-section">
        <div className="ai-reviews">
          <div className="ai-review">
            <div className="ai-logo">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 8.5A8 8 0 1 0 19 15.5" stroke="#111" strokeWidth="3.2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2.6" fill="#e8322c" />
              </svg>
            </div>
            <div>
              <Stars filled={5} />
              <div className="ai-rate"><b>4.9/5</b> Based on 250 reviews</div>
            </div>
          </div>
          <div className="ai-divider" />
          <div className="ai-review">
            <div className="ai-logo">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#111" aria-hidden="true">
                <path d="M12 1c.6 6.4 4.6 10.4 11 11-6.4.6-10.4 4.6-11 11-.6-6.4-4.6-10.4-11-11C7.4 11.4 11.4 7.4 12 1z" />
              </svg>
            </div>
            <div>
              <Stars filled={4} />
              <div className="ai-rate"><b>4.0/5</b> Based on 186 reviews</div>
            </div>
          </div>
        </div>

        <div className="ai-card">
          <div className="ai-img">
            <img src={teamImg} alt="Our team" />
          </div>

          {/* opens WhatsApp with a ready-made message (visitor just taps Send) */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ai-chip"
            aria-label="Discuss your projects on WhatsApp"
          >
            <span className="ai-av">
              <img className="ai-avatar" src={leadImg} alt="Team lead" />
              <em className="ai-dot" />
            </span>
            <span className="ai-extra">
              <span className="ai-extra-in">
                <i className="ai-plus">+</i>
                <span className="ai-phone" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="#fff">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>
              </span>
            </span>
            <span className="ai-chip-text">
              <b>Discuss your projects</b>
              <small>Speak with the team lead</small>
            </span>
          </a>
        </div>

        <p className="ai-desc">
          We're not just developers — we're <b>problem-solvers</b> and <b>innovators</b>.
          Combining creativity, strategy, and technology, we build digital solutions that
          solve real problems, drive growth, and make an impact.
        </p>

        <Link to="/contact-us" className="ai-btn">
          Contact Us
          <span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </section>
    </>
  );
}

const css = `
.ai-scroll,.ai-card-section{background:#f5f5f5;color:#111;font-family:Inter,"Helvetica Neue",Arial,sans-serif;box-sizing:border-box}
.ai-scroll *,.ai-card-section *{box-sizing:border-box}

/* scroll reveal: height controls how long the animation lasts */
.ai-scroll{height:260vh;position:relative}
.ai-sticky{position:sticky;top:0;height:100vh;height:100svh;display:flex;align-items:center;justify-content:center;padding:0 24px}
.ai-meta{position:absolute;top:clamp(80px,17vh,170px);left:20px;right:20px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;font-size:clamp(12px,.85vw,16px);color:#111}
.ai-meta-l{display:flex;align-items:center;gap:6px}
.ai-meta-c{color:#777}
.ai-meta-r{text-align:right}
@media(max-width:600px){.ai-meta{grid-template-columns:1fr 1fr;row-gap:8px}.ai-meta-c{display:none}}
.ai-text{max-width:900px;margin:0;text-align:center;font-size:clamp(24px,4vw,50px);line-height:1.15;font-weight:500;letter-spacing:-.025em}
.ai-word{display:inline-block;opacity:0;filter:blur(14px);transform:translateY(14px);will-change:opacity,filter,transform;transition:opacity .12s linear,filter .12s linear,transform .12s linear}
.ai-script{font-family:"Pinyon Script","Great Vibes","Snell Roundhand","Brush Script MT",cursive;font-weight:400;letter-spacing:0;font-size:1.18em;line-height:1}

/* card section */
.ai-card-section{padding:40px 20px 110px;display:flex;flex-direction:column;align-items:center}
.ai-reviews{display:flex;align-items:center;gap:clamp(18px,3.5vw,36px);margin-bottom:clamp(22px,4vw,44px);flex-wrap:wrap;justify-content:center}
.ai-review{display:flex;align-items:center;gap:clamp(10px,1.6vw,18px)}
.ai-logo{width:clamp(44px,6vw,60px);height:clamp(44px,6vw,60px);background:#fff;border-radius:12px;display:grid;place-items:center}
.ai-stars{font-size:clamp(14px,1.8vw,19px);letter-spacing:3px;display:block;line-height:1.1}
.ai-rate{font-size:clamp(12px,1.5vw,16px);color:#666;margin-top:4px}
.ai-rate b{font-weight:500;color:#111}
.ai-divider{width:1px;height:clamp(44px,5.6vw,60px);background:#d4d4d4}

.ai-card{position:relative;width:min(580px,100%);padding:clamp(8px,1.2vw,10px);border-radius:clamp(16px,2.2vw,22px);background:rgba(255,255,255,.35);border:1px solid #e6e6e6;display:flex;flex-direction:column;align-items:center}
.ai-img{width:100%;border-radius:clamp(12px,1.8vw,16px);overflow:hidden;aspect-ratio:1/1.05;background:#ddd}
.ai-img img{width:100%;height:100%;object-fit:cover;display:block}

.ai-chip{--s:clamp(34px,5vw,50px);--g:clamp(26px,3.4vw,42px);--ease:cubic-bezier(.16,1,.3,1);--dur:.85s;position:relative;overflow:hidden;display:flex;align-items:center;margin:clamp(10px,1.4vw,14px) 0 clamp(2px,.6vw,6px);background:#fff;border-radius:999px;border:2px solid #111;padding:clamp(4px,.8vw,7px) clamp(18px,3vw,30px) clamp(4px,.8vw,7px) clamp(4px,.8vw,7px);text-decoration:none;color:#111;transition:transform .6s var(--ease),box-shadow .5s ease,border-color .5s ease}
.ai-chip:hover,.ai-chip:focus-visible{border-color:transparent;transform:translateY(-4px);box-shadow:0 22px 44px -12px rgba(0,0,0,.22)}
.ai-chip:active{transform:translateY(-1px) scale(.985)}

/* avatar (sits above the phone while it is tucked behind it) */
.ai-av{position:relative;z-index:2;flex:none;display:block}
.ai-avatar{display:block;width:var(--s);height:var(--s);border-radius:50%;object-fit:cover;background:#f08a4b}
.ai-dot{position:absolute;right:0;bottom:2%;width:clamp(12px,1.9vw,16px);aspect-ratio:1;border-radius:50%;background:#22c55e;border:2.5px solid #fff;transform:scale(0);transition:transform .5s cubic-bezier(.34,1.56,.64,1) .6s}
.ai-chip:hover .ai-dot,.ai-chip:focus-visible .ai-dot{transform:scale(1);animation:aiPulse 1.8s ease-out 1.2s infinite}
@keyframes aiPulse{0%{box-shadow:0 0 0 0 rgba(34,197,94,.55)}100%{box-shadow:0 0 0 9px rgba(34,197,94,0)}}

/* The phone starts hidden exactly behind the photo, then splits away from it.
   Width and slide use the SAME easing/duration, so the phone's right edge always
   equals the opening width and never overlaps the text. */
.ai-extra{position:relative;z-index:1;display:grid;grid-template-columns:0fr;transition:grid-template-columns var(--dur) var(--ease)}
.ai-chip:hover .ai-extra,.ai-chip:focus-visible .ai-extra{grid-template-columns:1fr}
.ai-extra-in{position:relative;display:flex;align-items:center;min-width:0}
.ai-phone{flex:none;margin-left:var(--g);width:var(--s);height:var(--s);border-radius:50%;background:#0a0a0a;display:grid;place-items:center;transform:translateX(calc(-1 * (var(--g) + var(--s))));transition:transform var(--dur) var(--ease)}
.ai-phone svg{width:42%;height:42%}
.ai-chip:hover .ai-phone,.ai-chip:focus-visible .ai-phone{transform:none;animation:aiRing .8s ease .85s}
@keyframes aiRing{0%,100%{rotate:0deg}15%{rotate:-16deg}30%{rotate:14deg}45%{rotate:-12deg}60%{rotate:9deg}75%{rotate:-5deg}}
/* "+" blooms in the gap the phone leaves behind */
.ai-plus{position:absolute;left:0;top:50%;width:var(--g);margin-top:-.5em;text-align:center;font-style:normal;font-size:clamp(16px,2vw,22px);line-height:1;color:#444;opacity:0;transform:scale(.2) rotate(-90deg);transition:transform .5s cubic-bezier(.34,1.56,.64,1),opacity .3s ease}
.ai-chip:hover .ai-plus,.ai-chip:focus-visible .ai-plus{opacity:1;transform:none;transition-delay:.4s}

.ai-chip-text{display:flex;flex-direction:column;margin-left:clamp(10px,1.5vw,16px);white-space:nowrap}
.ai-chip-text b{font-size:clamp(14px,1.9vw,18px);font-weight:500;letter-spacing:-.01em;line-height:1.15}
.ai-chip-text small{font-size:clamp(11px,1.4vw,14px);color:#666;margin-top:3px}

.ai-desc{max-width:740px;margin:clamp(36px,6vw,70px) 0 clamp(22px,3.4vw,34px);text-align:center;font-size:clamp(15px,2.4vw,23px);line-height:1.25;color:#6b6b6b;font-weight:400;letter-spacing:-.01em}
.ai-desc b{color:#111;font-weight:500}
.ai-btn{display:inline-flex;align-items:center;gap:clamp(12px,2vw,20px);background:#0b0b0b;color:#fff;text-decoration:none;font-size:clamp(14px,1.9vw,18px);font-weight:500;padding:2px 2px 2px clamp(20px,2.8vw,26px);border-radius:999px;border:1px solid #0b0b0b;transition:transform .3s ease}
.ai-btn:hover{transform:translateY(-3px)}
.ai-btn span{width:clamp(38px,4.6vw,44px);height:clamp(38px,4.6vw,44px);border-radius:50%;background:#fff;display:grid;place-items:center;transition:transform .3s ease}
.ai-btn:hover span{transform:translateX(3px)}

@media(max-width:600px){.ai-scroll{height:300vh}.ai-divider{display:none}}
@media(prefers-reduced-motion:reduce){.ai-word{transition:none}.ai-chip,.ai-dot,.ai-plus,.ai-phone,.ai-extra{transition:none}.ai-chip:hover .ai-phone,.ai-chip:hover .ai-dot{animation:none}}
`;