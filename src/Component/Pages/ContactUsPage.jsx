import React, { useEffect, useRef, useState } from "react";
import FaqAccordion from "../Common/FAQSection";

const CONTACT = {
    phone: "+91 7530882800",
    email: "contact@staropstech.com",
    company: "StarOps Technologies Pvt Ltd",
    address: "Block G, Gamma II, Greater Noida, Uttar Pradesh 201310",
    quote: "Every great project begins with a simple conversation — let’s start yours.",
    founder: "Amit Tirpathi",
    role: "Founder & CEO",
};

// Optional: import a founder photo and put it here, e.g. import amit from "../assets/amit.jpg"
const FOUNDER_IMG = null;

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Pinyon+Script&family=Playball&display=swap');
.cu-sans   { font-family: 'Inter Tight', system-ui, sans-serif; }
.cu-script { font-family: 'Pinyon Script', 'Playball', cursive; font-weight: 400; letter-spacing: 0; }
.cu-swash  { font-family: 'Playball', cursive; }

@keyframes cu-float { 0%,100% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(-10px,14px,0) rotate(-1.5deg); } }
@keyframes cu-swash-in { from { opacity: 0; transform: translate3d(-6vw,2vh,0) rotate(-6deg) scale(.96); } to { opacity: 1; transform: none; } }
@keyframes cu-spin { to { transform: rotate(360deg); } }
@keyframes cu-draw { to { stroke-dashoffset: 0; } }
@keyframes cu-pop { 0% { transform: scale(.6); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); } }

.cu-swash-in { animation: cu-swash-in 1.6s cubic-bezier(.22,1,.36,1) .1s both; }
.cu-float    { animation: cu-float 14s ease-in-out infinite; }

/* reveal */
.cu-rv { opacity: 0; transform: translateY(30px); filter: blur(8px);
  transition: opacity .9s cubic-bezier(.22,1,.36,1), transform 1.1s cubic-bezier(.22,1,.36,1), filter .9s cubic-bezier(.22,1,.36,1);
  transition-delay: var(--d, 0ms); }
.cu-rv.is-in { opacity: 1; transform: none; filter: blur(0); }

/* heading: words rise from a mask, script word is "written" left to right */
.cu-mask { display: inline-block; overflow: hidden; padding-bottom: .16em; margin-bottom: -.16em; vertical-align: bottom; }
.cu-word { display: inline-block; transform: translateY(115%); transition: transform 1s cubic-bezier(.22,1,.36,1); transition-delay: var(--d, 0ms); }
.is-in .cu-word { transform: none; }
.cu-write { display: inline-block; padding: 0 .12em; margin: 0 -.12em; clip-path: inset(-30% 100% -30% 0);
  transition: clip-path 1.5s cubic-bezier(.65,0,.35,1); transition-delay: var(--d, 0ms); }
.is-in .cu-write { clip-path: inset(-30% 0 -30% 0); }

/* inputs */
.cu-field { background: #fff; border-radius: 12px; box-shadow: 0 0 0 1px transparent; transition: box-shadow .35s ease, transform .35s ease; }
.cu-field:hover { box-shadow: 0 0 0 1px rgba(7,9,13,.12); }
.cu-field:focus-within { box-shadow: 0 0 0 2px #07090d, 0 14px 28px -18px rgba(7,9,13,.45); transform: translateY(-1px); }
.cu-field.has-error { box-shadow: 0 0 0 1.5px #e5484d; }
.cu-input::placeholder { color: #a3a3a3; }
.cu-err { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows .4s cubic-bezier(.22,1,.36,1), opacity .3s; }
.cu-err.show { grid-template-rows: 1fr; opacity: 1; }
.cu-err > span { overflow: hidden; min-height: 0; }

/* submit */
.cu-submit { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, background-color .3s; }
.cu-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 28px -14px rgba(7,9,13,.6); }
.cu-submit:active:not(:disabled) { transform: translateY(0) scale(.98); }
.cu-spinner { width: 1.1em; height: 1.1em; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: 999px; animation: cu-spin .7s linear infinite; }

/* success */
.cu-check-circle { stroke-dasharray: 160; stroke-dashoffset: 160; animation: cu-draw .8s cubic-bezier(.22,1,.36,1) .1s forwards; }
.cu-check-tick   { stroke-dasharray: 40;  stroke-dashoffset: 40;  animation: cu-draw .5s cubic-bezier(.22,1,.36,1) .65s forwards; }
.cu-pop { animation: cu-pop .7s cubic-bezier(.22,1,.36,1) both; }

@media (prefers-reduced-motion: reduce) {
  .cu-rv, .cu-word, .cu-write, .cu-field, .cu-err, .cu-submit { transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; clip-path: none !important; }
  .cu-swash-in, .cu-float, .cu-pop { animation: none !important; }
  .cu-check-circle, .cu-check-tick { animation: none !important; stroke-dashoffset: 0 !important; }
  .cu-err.show { grid-template-rows: 1fr; }
}
`;

function Spark({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill="currentColor">
            <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0Z" />
        </svg>
    );
}

/* ---------- validation ---------- */
const FIELDS = [
    { name: "name", label: "Full name", required: true, placeholder: "Enter your full name", type: "text", autoComplete: "name" },
    { name: "mobile", label: "Mobile No", required: true, placeholder: "Enter your mobile no", type: "tel", autoComplete: "tel", inputMode: "tel" },
    { name: "country", label: "Country", required: true, placeholder: "Enter your country", type: "text", autoComplete: "country-name" },
    { name: "email", label: "Email address", required: true, placeholder: "Enter your email", type: "email", autoComplete: "email", inputMode: "email" },
];

const validate = (v) => {
    const e = {};
    if (!v.name.trim()) e.name = "Please enter your full name.";
    if (!v.mobile.trim()) e.mobile = "Please enter your mobile number.";
    else if (!/^\+?[0-9\s\-()]{7,18}$/.test(v.mobile.trim())) e.mobile = "Enter a valid mobile number.";
    if (!v.country.trim()) e.country = "Please enter your country.";
    if (!v.email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
    return e;
};

const EMPTY = { name: "", mobile: "", country: "", email: "", message: "" };

/* ---------- form card ---------- */
function ContactForm({ onSubmit, delay = 0, inView }) {
    const [values, setValues] = useState(EMPTY);
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const formRef = useRef(null);

    const errors = validate(values);
    const showErr = (n) => touched[n] && errors[n];

    const change = (e) => setValues((p) => ({ ...p, [e.target.name]: e.target.value }));
    const blur = (e) => setTouched((p) => ({ ...p, [e.target.name]: true }));

    const submit = async (e) => {
        e.preventDefault();
        if (status === "sending") return;
        const errs = validate(values);
        if (Object.keys(errs).length) {
            setTouched({ name: true, mobile: true, country: true, email: true });
            const first = Object.keys(errs)[0];
            formRef.current?.querySelector(`[name="${first}"]`)?.focus();
            return;
        }
        setStatus("sending");
        try {
            if (onSubmit) await onSubmit({ ...values });
            else await new Promise((r) => setTimeout(r, 1400)); // demo only
            setStatus("success");
            setValues(EMPTY);
            setTouched({});
        } catch (_) {
            setStatus("error");
        }
    };

    return (
        <div
            className={`cu-rv ${inView ? "is-in" : ""} rounded-[clamp(18px,1.6vw,26px)] bg-[#f4f4f4] p-[clamp(18px,2.2vw,36px)]`}
            style={{ "--d": `${delay}ms` }}
        >
            {status === "success" ? (
                <div className="flex min-h-[clamp(300px,28vw,420px)] flex-col items-center justify-center text-center" role="status">
                    <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none" stroke="#07090d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle className="cu-check-circle" cx="32" cy="32" r="25" />
                        <path className="cu-check-tick" d="m21 33 8 8 15-17" />
                    </svg>
                    <h3 className="cu-pop mt-6 text-[clamp(24px,2.2vw,36px)] font-medium tracking-[-0.03em]">Message sent</h3>
                    <p className="cu-pop mt-2 max-w-[24em] text-[clamp(14px,1.05vw,17px)] text-neutral-500" style={{ animationDelay: ".1s" }}>
                        Thanks for reaching out. We’ll get back to you shortly.
                    </p>
                    <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="cu-pop cu-submit mt-8 rounded-full bg-[#07090d] px-7 py-3 text-[14px] font-medium text-white"
                        style={{ animationDelay: ".2s" }}
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form ref={formRef} onSubmit={submit} noValidate>
                    <h2 className="text-[clamp(19px,1.6vw,26px)] font-medium tracking-[-0.03em]">Let’s work together</h2>

                    <div className="mt-[clamp(16px,1.8vw,28px)] flex flex-col gap-[clamp(10px,1vw,16px)]">
                        {FIELDS.map((f, i) => {
                            const err = showErr(f.name);
                            return (
                                <div key={f.name} className={`cu-rv ${inView ? "is-in" : ""}`} style={{ "--d": `${delay + 120 + i * 80}ms` }}>
                                    <label htmlFor={`cu-${f.name}`} className="mb-1.5 block text-[12.5px] font-medium tracking-[-0.01em] text-[#07090d]">
                                        {f.label}
                                        {f.required && <span aria-hidden="true">*</span>}
                                    </label>
                                    <div className={`cu-field ${err ? "has-error" : ""}`}>
                                        <input
                                            id={`cu-${f.name}`}
                                            name={f.name}
                                            type={f.type}
                                            inputMode={f.inputMode}
                                            autoComplete={f.autoComplete}
                                            placeholder={f.placeholder}
                                            value={values[f.name]}
                                            onChange={change}
                                            onBlur={blur}
                                            required={f.required}
                                            aria-invalid={!!err}
                                            aria-describedby={err ? `cu-${f.name}-err` : undefined}
                                            className="cu-input h-11 w-full rounded-xl bg-transparent px-3.5 text-[14px] text-[#07090d] outline-none"
                                        />
                                    </div>
                                    <div className={`cu-err ${err ? "show" : ""}`} aria-live="polite">
                                        <span id={`cu-${f.name}-err`} className="block pt-1.5 text-[12.5px] text-[#e5484d]">
                                            {err || "\u00A0"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                        <div className={`cu-rv ${inView ? "is-in" : ""}`} style={{ "--d": `${delay + 120 + FIELDS.length * 80}ms` }}>
                            <label htmlFor="cu-message" className="mb-1.5 block text-[12.5px] font-medium tracking-[-0.01em] text-[#07090d]">
                                Message
                            </label>
                            <div className="cu-field">
                                <textarea
                                    id="cu-message"
                                    name="message"
                                    rows={3}
                                    placeholder="Tell us the purpose"
                                    value={values.message}
                                    onChange={change}
                                    className="cu-input block min-h-[clamp(84px,7vw,110px)] w-full resize-y rounded-xl bg-transparent px-3.5 py-3 text-[14px] text-[#07090d] outline-none"
                                />
                            </div>
                        </div>

                        <div
                            className={`cu-rv ${inView ? "is-in" : ""} flex flex-wrap items-center gap-4`}
                            style={{ "--d": `${delay + 120 + (FIELDS.length + 1) * 80}ms` }}
                        >
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="cu-submit inline-flex min-w-34 items-center justify-center gap-3 rounded-full bg-[#07090d] px-7 py-3 text-[13.5px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-80"
                            >
                                {status === "sending" ? (
                                    <>
                                        <span className="cu-spinner" aria-hidden="true" />
                                        Sending
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                            <p className="text-[13px] text-[#e5484d]" role="alert">
                                {status === "error" && "Something went wrong. Please try again or email us directly."}
                            </p>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default function ContactUsPage({ onSubmit }) {
    const sectionRef = useRef(null);
    const swashRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([en]) => setInView(en.isIntersecting), { threshold: 0.05 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // gentle parallax on the big background "S"
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let raf = 0;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                if (swashRef.current) swashRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.15}px, 0)`;
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const cls = (extra = "") => `cu-rv ${inView ? "is-in" : ""} ${extra}`;
    const d = (ms) => ({ "--d": `${ms}ms` });

    const initials = CONTACT.founder
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2);

    return (
        <main className="cu-sans overflow-x-clip bg-white text-[#07090d]">
            <style>{styles}</style>

            <section
                ref={sectionRef}
                className="relative isolate min-h-svh overflow-hidden px-6 pb-[clamp(40px,6vw,96px)] pt-[clamp(96px,10vw,160px)] sm:px-10 md:px-[3.3vw]"
                aria-label="Contact us"
            >
                {/* big outlined script "S" */}
                <div ref={swashRef} aria-hidden="true" className="pointer-events-none absolute left-[-5vw] top-[-2vh] -z-10 select-none will-change-transform">
                    <div className="cu-swash-in">
                        <div
                            className="cu-swash cu-float leading-none"
                            style={{ fontSize: "clamp(320px, 46vw, 860px)", color: "transparent", WebkitTextStroke: "1.5px #ececec" }}
                        >
                            S
                        </div>
                    </div>
                </div>

                {/* heading */}
                <h1
                    className={`${inView ? "is-in" : ""} mx-auto max-w-[1750px] text-center text-[clamp(36px,5.8vw,108px)] font-medium leading-[1.08] tracking-tighter`}
                >
                    {["Got", "an", "idea?", "Let’s"].map((w, i) => (
                        <React.Fragment key={w}>
                            <span className="cu-mask">
                                <span className="cu-word pr-1" style={d(100 + i * 90)}>{w}</span>
                            </span>{" "}
                        </React.Fragment>
                    ))}
                    <span className="cu-script cu-write text-[1.15em] leading-none" style={d(520)}>
                        talk
                    </span>
                </h1>

                {/* content */}
                <div className="mx-auto mt-[clamp(32px,5vw,88px)] grid max-w-[1750px] gap-x-[clamp(32px,5vw,96px)] gap-y-[clamp(32px,5vw,56px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:grid-rows-[auto_1fr]">
                    {/* contact details */}
                    <div className="flex flex-col gap-[clamp(28px,3.4vw,56px)] md:col-start-1 md:row-start-1 md:pt-[0.5em]">
                        <div className={cls()} style={d(300)}>
                            <div className="flex items-center gap-2 text-[clamp(12px,0.9vw,15px)] font-medium">
                                <Spark className="h-[1.1em] w-[1.1em]" />
                                <span>Contact us on</span>
                            </div>
                            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="mt-3 block w-fit text-[clamp(14px,1.05vw,18px)] text-neutral-600 transition-colors hover:text-[#07090d]">
                                {CONTACT.phone}
                            </a>
                            <a href={`mailto:${CONTACT.email}`} className="mt-1 block w-fit break-all text-[clamp(18px,1.7vw,28px)] font-medium tracking-[-0.02em] transition-opacity hover:opacity-60">
                                {CONTACT.email}
                            </a>
                        </div>

                        <div className={cls()} style={d(420)}>
                            <div className="flex items-center gap-2 text-[clamp(12px,0.9vw,15px)] font-medium">
                                <Spark className="h-[1.1em] w-[1.1em]" />
                                <span>Visit us</span>
                            </div>
                            <p className="mt-3 max-w-[12em] text-[clamp(15px,1.15vw,20px)] font-medium leading-[1.25] tracking-[-0.01em]">{CONTACT.company}</p>
                            <p className="mt-2 max-w-[17em] text-[clamp(13px,0.95vw,16px)] leading-[1.35] text-neutral-400">{CONTACT.address}</p>
                        </div>
                    </div>

                    {/* form */}
                    <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:justify-self-end w-full md:max-w-[clamp(420px,40vw,680px)]">
                        <ContactForm onSubmit={onSubmit} delay={250} inView={inView} />
                    </div>

                    {/* quote */}
                    <div className={cls("flex flex-col justify-end md:col-start-1 md:row-start-2")} style={d(540)}>
                        <p className="max-w-[14em] text-[clamp(15px,1.15vw,20px)] leading-[1.3] tracking-[-0.01em]">{CONTACT.quote}</p>
                        <div className="mt-4 flex items-center gap-3 text-[clamp(13px,0.95vw,16px)]">
                            {FOUNDER_IMG ? (
                                <img src={FOUNDER_IMG} alt="" className="h-9 w-9 rounded-full object-cover" />
                            ) : (
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#07090d] text-[12px] font-medium text-white" aria-hidden="true">
                                    {initials}
                                </span>
                            )}
                            <span>
                                <span className="font-medium">{CONTACT.founder}</span>
                                <span className="text-neutral-500">, {CONTACT.role}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <FaqAccordion
                label="Clarity start Right here"
                items={[
                    { question: "What services do you offer?", answer: "StarOps delivers end-to-end design and no-code/low-code development — from product design and branding to full website and web-app builds, plus ongoing support after launch." },
                    { question: "Do you work with startups or only big brands?", answer: "We work with both. From startups building their first product to growing companies and established businesses looking to modernize or scale, we adapt our approach to fit your goals, technology needs, and stage of growth." },
                    { question: "How long does a typical project take?", answer: "Project timelines depend on the scope, complexity, and requirements. At StarOps, we start by understanding your goals and then create a clear roadmap with milestones and delivery timelines. Whether it’s a focused website or a larger digital product, we keep the process transparent from start to finish." },
                    { question: "Do you offer ongoing development and support?", answer: "Yes. Our partnership doesn’t have to end when a project goes live. StarOps provides ongoing development, maintenance, improvements, and technical support to help your product stay secure, reliable, and ready to scale as your business grows." },
                ]} />
        </main>
    );
}