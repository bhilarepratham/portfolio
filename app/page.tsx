"use client";
import { useEffect, useRef, useState } from "react";

/* ── DATA ──────────────────────────────────────────────── */
const PROJECTS = [
  {
    n: "01",
    title: "Journey Air",
    sub: "Product · B2B SaaS · Honeywell Aerospace",
    kpi: "$54.75M",
    kpiLabel: "projected annual savings",
    desc: "Led product development for a Honeywell-sponsored airline disruption recovery platform. Designed a white-label SDK using Flutter, built a 5-year financial model, conducted two rounds of customer discovery, and synthesized findings into 6 behavioral personas that reshaped the solution architecture.",
    tags: ["Product Management","V-Model","Customer Discovery","Financial Modeling","B2B SaaS"],
  },
  {
    n: "02",
    title: "Customer Portal",
    sub: "Project Management · Medical Products LLC",
    kpi: "$250K",
    kpiLabel: "end-to-end budget managed",
    desc: "Planned and tracked a $250,000 portal implementation using MS Project — 9-phase WBS, 48 tasks, 210-day critical path. Quantified 8 risks, built a RAM mapping 9 deliverables across 7 roles, and designed a full communication framework across Zoom, Slack, JIRA, and Teams.",
    tags: ["MS Project","WBS","Risk Matrix","RAM","PERT","Stakeholder Mgmt"],
  },
  {
    n: "03",
    title: "FlazzMart",
    sub: "Startup Strategy · ASU Venture",
    kpi: "$100M",
    kpiLabel: "revenue model by Year 5",
    desc: "Designed a full-stack business plan for a 15-minute grocery delivery startup. Sized the market at $68.6B TAM by 2032, modeled $730 annual customer LTV, benchmarked against Instacart's 63% market share, and projected break-even at Year 3 through a multi-stream revenue model.",
    tags: ["TAM/SAM/SOM","GTM","Revenue Modeling","LTV","Competitive Analysis"],
  },
  {
    n: "04",
    title: "ERP Market Analysis",
    sub: "Strategy · ASU Strategic Management",
    kpi: "$64.83B",
    kpiLabel: "market analysed",
    desc: "Delivered a 40-page strategic analysis of the global ERP market. Applied VRIO across 10+ resources per company for SAP, Oracle, and Workday. Modelled cloud ERP growth from $34.8B to $123.42B by 2030 at 18% CAGR with actionable recommendations on AI and cloud adoption.",
    tags: ["VRIO","Porter's Five Forces","RBV","Market Sizing","Competitive Strategy"],
  },
  {
    n: "05",
    title: "Warehouse AI Optimizer",
    sub: "Operations · AI · Amazon Network",
    kpi: "18%",
    kpiLabel: "cost reduction vs baseline",
    desc: "Engineered an AI grid search model to identify the optimal warehouse location across 537 Amazon distribution centers. Minimized weighted transport cost to 29.8M units versus Excel Solver's 35.2M — a quantified 15–18% improvement. Validated results geospatially in Python.",
    tags: ["AI Optimization","Python","Prompt Engineering","Geospatial Analysis","Operations Research"],
  },
  {
    n: "06",
    title: "BYD Global Strategy",
    sub: "Disruptive Innovation · Competitive Analysis",
    kpi: "9.5/10",
    kpiLabel: "innovation score",
    desc: "Analysed BYD's rise to #1 global EV seller — 526K BEV sales vs Tesla's 484K in Q4 2023. Evaluated a 20,000+ patent portfolio, $2.1B government subsidy structure, and identified 880% UK sales growth as the primary international expansion signal.",
    tags: ["Disruptive Innovation","IP Strategy","SWOT","BMC","Financial Benchmarking"],
  },
];

const NUMBERS = [
  { val:"3.85",  label:"GPA", context:"Ira A. Fulton Schools of Engineering" },
  { val:"10+",   label:"Projects", context:"Across PM, Product, Data & Engineering" },
  { val:"$250K", label:"Budget Managed", context:"End-to-end project delivery" },
  { val:"42",    label:"Years of Data", context:"Longitudinal econometric analysis" },
];

const SKILLS_LIST = [
  ["WBS & Critical Path","Risk Matrices","Stakeholder Mapping","PERT Estimation","MS Project","JIRA"],
  ["Product Roadmapping","BMC","TAM/SAM/SOM","Go-to-Market","OKRs","Porter's Five Forces","VRIO"],
  ["Python","Pandas","Tableau","OLS Regression","Excel Modeling","Time-Series Forecasting"],
  ["Agile","Lean","Six Sigma GB","V-Model","Kanban","Six Sigma: Green Belt","CSWA"],
];

/* ── INTERSECTION HOOK ─────────────────────────────────── */
function useReveal(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return on;
}

/* ── APP ───────────────────────────────────────────────── */
export default function Home() {
  const [scrollY,  setScrollY]  = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeS,  setActiveS]  = useState(0);
  const [navBlur,  setNavBlur]  = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProj, setOpenProj] = useState<number|null>(null);

  const refs = [
    useRef<HTMLElement>(null), // hero
    useRef<HTMLElement>(null), // about
    useRef<HTMLElement>(null), // numbers
    useRef<HTMLElement>(null), // projects
    useRef<HTMLElement>(null), // skills
    useRef<HTMLElement>(null), // contact
  ];
  const NAV = ["Home","About","Work","Projects","Skills","Contact"];

  const aboutOn   = useReveal(refs[1]);
  const numbersOn = useReveal(refs[2]);
  const projOn    = useReveal(refs[3]);
  const skillsOn  = useReveal(refs[4]);
  const contactOn = useReveal(refs[5]);

  useEffect(() => {
    const fn = () => {
      const sy  = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollY(sy);
      setNavBlur(sy > 20);
      setProgress(max > 0 ? sy / max : 0);
      refs.forEach((r, i) => {
        const el = r.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0) setActiveS(i);
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site">

      {/* ── PROGRESS ── */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* ── NAV ── */}
      <header className={`nav ${navBlur ? "nav-blur" : ""}`}>
        <div className="nav-inner">
          <button className="nav-wordmark" onClick={() => go(refs[0])}>
            Pratham Bhilare
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            {NAV.map((n, i) => (
              <button key={i}
                className={`nav-item ${activeS === i ? "active" : ""}`}
                onClick={() => go(refs[i])}>{n}</button>
            ))}
          </nav>

          <div className="nav-right">
            <a href="mailto:pratham.bhilare1010@gmail.com" className="nav-cta">
              Hire me
            </a>
            <button className="hamburger" onClick={() => setMenuOpen(v => !v)}>
              <span className={menuOpen ? "open" : ""} />
              <span className={menuOpen ? "open" : ""} />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════ */}
      <section ref={refs[0]} className="section hero-section">

        {/* Parallax photo */}
        <div className="hero-photo-wrap"
          style={{ transform: `translateY(${scrollY * 0.22}px)` }}>
          <img src="/assets/portrait.jpg" alt="Pratham Bhilare"
            className="hero-photo" />
          <div className="hero-photo-fade" />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">
            MS Management of Technology · ASU · GPA 3.85
          </p>
          <h1 className="hero-name">
            Pratham<br />Bhilare.
          </h1>
          <p className="hero-role">
            Project Manager&nbsp;&nbsp;·&nbsp;&nbsp;Product Manager&nbsp;&nbsp;·&nbsp;&nbsp;Operations Analyst
          </p>
          <p className="hero-tagline">
            I build roadmaps that ship,<br />
            strategies that convert,<br />
            and models that answer.
          </p>
          <div className="hero-ctas">
            <button className="cta-primary" onClick={() => go(refs[3])}>
              View Projects
            </button>
            <button className="cta-text" onClick={() => go(refs[5])}>
              Get in touch&nbsp;›
            </button>
          </div>
          <p className="hero-availability">
            <span className="avail-dot" />
            Open to Summer 2026 · Phoenix, AZ
          </p>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════
          SECTION 2 — ABOUT
      ══════════════════════════════ */}
      <section ref={refs[1]} className="section about-section">
        <div className={`about-inner ${aboutOn ? "reveal" : ""}`}>
          <div className="about-label">About</div>
          <h2 className="about-headline">
            Engineering mind.<br />Management instinct.
          </h2>
          <div className="about-body">
            <p>
              I&apos;m a mechanical engineer turned management-of-technology graduate —
              which means I understand how systems are built <em>and</em> how to
              deliver them on time, on scope, and on strategy.
            </p>
            <p>
              At Tata Power I stood inside 500 MW boilers managing maintenance outages.
              At ASU I shipped 10 cross-functional projects — from a
              Honeywell-sponsored airline product platform to AI-driven logistics
              optimization across 537 distribution centers.
            </p>
            <p>
              I think in roadmaps. I speak in data. I measure everything.
            </p>
          </div>

          {/* Experience rows */}
          <div className="exp-rows">
            {[
              { y:"2025–Now",   co:"Arizona State University",  role:"Graduate Teaching Assistant",    note:"ISE · 50+ students" },
              { y:"Jan–Apr 24", co:"Tata Power",                role:"Mechanical Maintenance Intern",   note:"500 MW + 250 MW · 0 incidents" },
              { y:"Dec 22–23",  co:"Matharu Sons",              role:"Process Optimization Trainee",    note:"Fuel tankers · 2000 PSI" },
            ].map((e, i) => (
              <div key={i} className="exp-row"
                style={{ transitionDelay: `${0.15 + i * 0.1}s` }}>
                <span className="exp-year">{e.y}</span>
                <span className="exp-co">{e.co}</span>
                <span className="exp-role">{e.role}</span>
                <span className="exp-note">{e.note}</span>
              </div>
            ))}
          </div>

          <div className="edu-rows">
            <div className="edu-header">Education</div>
            {[
              { y:"2024–26", s:"Arizona State University",       d:"MS Management of Technology · GPA 3.85" },
              { y:"2021–24", s:"Pillai College of Engineering",  d:"BTech Mechanical Engineering" },
              { y:"2018–21", s:"Father Agnel Technical Complex", d:"Diploma Mechanical Engineering" },
            ].map((e, i) => (
              <div key={i} className="edu-row"
                style={{ transitionDelay: `${0.3 + i * 0.08}s` }}>
                <span className="edu-year">{e.y}</span>
                <span className="edu-school">{e.s}</span>
                <span className="edu-deg">{e.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SECTION 3 — NUMBERS
      ══════════════════════════════ */}
      <section ref={refs[2]} className="section numbers-section">
        <div className="numbers-label">By the numbers</div>
        <div className="numbers-grid">
          {NUMBERS.map((n, i) => (
            <div key={i}
              className={`number-item ${numbersOn ? "num-in" : ""}`}
              style={{ transitionDelay: `${i * 0.14}s` }}>
              <div className="num-val">{n.val}</div>
              <div className="num-label">{n.label}</div>
              <div className="num-ctx">{n.context}</div>
            </div>
          ))}
        </div>
        <div className={`numbers-footnote ${numbersOn ? "fn-in" : ""}`}>
          Across 10+ projects · Phoenix, AZ
        </div>
      </section>

      {/* ══════════════════════════════
          SECTION 4 — PROJECTS
      ══════════════════════════════ */}
      <section ref={refs[3]} className="section projects-section">
        <div className="projects-header">
          <div className="s-overline">Selected Work</div>
          <h2 className={`projects-h2 ${projOn ? "reveal" : ""}`}>
            Projects that<br />delivered.
          </h2>
          <p className={`projects-sub ${projOn ? "reveal" : ""}`}>
            Click any project to expand scope, deliverables, and tools.
          </p>
        </div>

        <div className="projects-list">
          {PROJECTS.map((p, i) => (
            <div key={i}
              className={`project-row ${projOn ? "prow-in" : ""} ${openProj === i ? "prow-open" : ""}`}
              style={{ transitionDelay: `${i * 0.07}s` }}>

              <button className="prow-trigger"
                onClick={() => setOpenProj(openProj === i ? null : i)}>
                <span className="prow-n">{p.n}</span>
                <span className="prow-title">{p.title}</span>
                <span className="prow-sub">{p.sub}</span>
                <span className="prow-kpi">{p.kpi}</span>
                <span className={`prow-icon ${openProj === i ? "rotated" : ""}`}>+</span>
              </button>

              {openProj === i && (
                <div className="prow-body">
                  <div className="pb-kpi-row">
                    <span className="pb-kpi-val">{p.kpi}</span>
                    <span className="pb-kpi-label">{p.kpiLabel}</span>
                  </div>
                  <p className="pb-desc">{p.desc}</p>
                  <div className="pb-tags">
                    {p.tags.map((t, j) => <span key={j} className="pb-tag">{t}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          SECTION 5 — SKILLS
      ══════════════════════════════ */}
      <section ref={refs[4]} className="section skills-section">
        <div className="skills-inner">
          <div className="s-overline">PM Toolkit</div>
          <h2 className={`skills-h2 ${skillsOn ? "reveal" : ""}`}>
            Built for delivery.
          </h2>

          <div className="skills-areas">
            {[
              "Delivery & Planning",
              "Product & Strategy",
              "Data & Analytics",
              "Frameworks & Certs",
            ].map((area, ai) => (
              <div key={ai}
                className={`skill-area ${skillsOn ? "sa-in" : ""}`}
                style={{ transitionDelay: `${0.1 + ai * 0.12}s` }}>
                <div className="sa-title">{area}</div>
                <div className="sa-tags">
                  {SKILLS_LIST[ai].map((s, si) => (
                    <span key={si}
                      className={`sa-tag ${skillsOn ? "tag-in" : ""}`}
                      style={{ transitionDelay: `${0.2 + ai * 0.1 + si * 0.04}s` }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certs strip */}
          <div className={`certs-strip ${skillsOn ? "reveal" : ""}`}
            style={{ transitionDelay: "0.5s" }}>
            {["Six Sigma: Green Belt","SOLIDWORKS Associate (CSWA)","Advanced Tableau Desktop","PM: International Projects","Siemens Mobility PM Simulation"].map((c,i) => (
              <span key={i} className="cert-chip">✓&nbsp;&nbsp;{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SECTION 6 — CONTACT
      ══════════════════════════════ */}
      <section ref={refs[5]} className="section contact-section">
        <div className={`contact-inner ${contactOn ? "reveal" : ""}`}>
          <div className="s-overline">Let&apos;s Talk</div>
          <h2 className="contact-h2">
            Open to<br />Summer 2026.
          </h2>
          <p className="contact-sub">
            Seeking Project Manager, Product Manager, Industrial Engineering,
            and Business Analysis roles. Ready to own a roadmap.
          </p>

          <div className="contact-links">
            <a href="mailto:pratham.bhilare1010@gmail.com" className="contact-link primary-link">
              pratham.bhilare1010@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="contact-link">
              linkedin.com/in/prathambhilare&nbsp;↗
            </a>
            <a href="https://github.com/bhilarepratham" target="_blank" rel="noreferrer" className="contact-link">
              github.com/bhilarepratham&nbsp;↗
            </a>
            <a href="tel:+14807425812" className="contact-link">
              +1 (480) 742-5812
            </a>
          </div>

          <div className="contact-ctas">
            <a href="mailto:pratham.bhilare1010@gmail.com" className="cta-primary">
              Email Pratham
            </a>
            <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="cta-text">
              LinkedIn Profile&nbsp;›
            </a>
          </div>
        </div>

        <footer className="footer">
          <span>© Pratham Ankush Bhilare</span>
          <span>Phoenix, AZ · Open to Summer 2026</span>
        </footer>
      </section>

    </div>
  );
}
