"use client";
import { useEffect, useRef, useState } from "react";

/* ── DATA ─────────────────────────────────────────────────── */
const STATS = [
  { num: "3.85",   suffix: "",  label: "GPA at ASU",                  desc: "Ira A. Fulton Schools of Engineering" },
  { num: "250",    suffix: "K", label: "Project Budget Managed",       desc: "End-to-end PM with 9-phase WBS" },
  { num: "10",     suffix: "+", label: "Projects Delivered",           desc: "Spanning PM, Product, Data & Engineering" },
  { num: "15",     suffix: "%", label: "Cost Reduction Achieved",      desc: "AI-driven warehouse logistics optimization" },
  { num: "54.75",  suffix: "M", label: "Projected Value Created",      desc: "Journey Air annual airline savings" },
  { num: "0",      suffix: "",  label: "Safety Incidents",             desc: "Tata Power — 14 weeks, 750 MW operations" },
];

const PROJECTS = [
  {
    category: "Product · B2B SaaS",
    title: "Journey Air",
    company: "Honeywell Aerospace · ASU",
    impact: "$54.75M projected annual savings",
    color: "#7c3aed",
    desc: "Led product development for a Honeywell-sponsored airline disruption recovery platform. Built a white-label SDK targeting U.S. Tier 1 & Tier 2 airlines with a $150M–$300M serviceable market.",
    bullets: ["2 rounds customer discovery → 6 behavioral personas", "V-Model systems engineering across 4 modules", "5-year NPV positive across all adoption scenarios", "B2B SaaS BMC · 4-stream revenue model"],
    tools: ["Product Management","V-Model","Customer Discovery","Financial Modeling","B2B SaaS"],
  },
  {
    category: "Project Management · $250K",
    title: "Customer Portal Implementation",
    company: "Medical Products LLC",
    impact: "210-day critical path · on-scope delivery",
    color: "#0891b2",
    desc: "End-to-end planning for a $250K customer portal. Defined WBS, risk matrices, RAM, and communication frameworks across a 12-month timeline.",
    bullets: ["9-phase WBS · 48 tasks tracked in MS Project", "8 risks quantified · 2 high-risk with mitigation plans", "RAM mapping 9 deliverables across 7 roles", "6-type communication framework · Slack, JIRA, Teams"],
    tools: ["MS Project","WBS","Risk Matrix","RAM","PERT","JIRA","Stakeholder Mgmt"],
  },
  {
    category: "Startup · Go-to-Market",
    title: "FlazzMart",
    company: "ASU Venture Project",
    impact: "$5M → $100M revenue model in 5 years",
    color: "#059669",
    desc: "Designed a full-stack business plan for a 15-minute grocery delivery startup targeting Phoenix metro, projecting break-even at Year 3.",
    bullets: ["TAM $68.6B by 2032 · SOM $40M in 3 years", "Competitive benchmarking vs Instacart (63% share)", "$730 annual LTV · 5-year customer lifecycle model", "AI-driven MFCs + EV fleet logistics architecture"],
    tools: ["TAM/SAM/SOM","Revenue Modeling","GTM","LTV","Competitive Analysis"],
  },
  {
    category: "Strategy · Research",
    title: "ERP Industry Analysis",
    company: "ASU Strategic Management",
    impact: "40-page report · $64.83B market",
    color: "#d97706",
    desc: "Comprehensive strategic analysis of SAP, Oracle, and Workday covering ~44% combined market share, with actionable recommendations on AI and cloud adoption.",
    bullets: ["VRIO across 10+ resources per company", "Cloud ERP modeled $34.8B → $123.42B by 2030 (18% CAGR)", "R&D benchmarked: SAP 15%, Workday 17% YoY ML growth", "Vertical integration depth and M&A activity mapped"],
    tools: ["Porter's Five Forces","VRIO","RBV","Core Competence","Market Sizing"],
  },
  {
    category: "Operations · AI",
    title: "Warehouse AI Optimizer",
    company: "Enterprise OAP",
    impact: "15–18% cost reduction vs Excel Solver",
    color: "#db2777",
    desc: "Engineered an AI grid search model to find the optimal warehouse location across 537 Amazon distribution centers, outperforming traditional solver methods.",
    bullets: ["Minimized weighted cost to 29.8M units vs 35.2M baseline", "Prompt-engineered ChatGPT through custom distance formula", "Geospatial visualization of 537-node national network", "Head-to-head Gen AI vs GRG Nonlinear Solver benchmark"],
    tools: ["AI Optimization","Python","Prompt Engineering","Geospatial Analysis","Excel Solver"],
  },
  {
    category: "Disruptive Innovation",
    title: "BYD Global Strategy",
    company: "Team Strategy Project",
    impact: "Scored 9.5/10 across all dimensions",
    color: "#7c3aed",
    desc: "Analyzed BYD's rise to world's largest EV seller, mapping competitive moats through vertical integration, IP strategy, and government subsidy structures.",
    bullets: ["526K BEV Q4 2023 — surpassed Tesla's 484K", "20,000+ patents · 138+ trademarks evaluated", "$2.1B government subsidy structural advantage mapped", "880% UK sales growth identified as expansion signal"],
    tools: ["Disruptive Innovation","IP Strategy","SWOT","BMC","Financial Benchmarking"],
  },
];

const SKILLS = [
  { area: "Delivery & Planning",  tags: ["WBS","Critical Path","Gantt","PERT","MS Project","JIRA","Milestone Tracking","Risk Matrix"] },
  { area: "Product & Strategy",   tags: ["Roadmapping","BMC","TAM/SAM/SOM","Go-to-Market","OKRs","User Stories","Porter's Five Forces","VRIO"] },
  { area: "Data & Analytics",     tags: ["OLS Regression","Python","Pandas","Tableau","Excel","Time-Series","KPI Dashboards"] },
  { area: "Frameworks",           tags: ["Agile","Lean","Six Sigma GB","V-Model","Kanban","Scrum","Stakeholder Mapping"] },
  { area: "Tools & Platforms",    tags: ["MS Project","JIRA","Tableau","Python","Streamlit","Slack","Figma (basic)","SQLite"] },
];

const EXP = [
  { y:"May 2025 – Now",   co:"Arizona State University",  role:"Graduate Teaching Assistant",     note:"ISE courses · 50+ students" },
  { y:"Jan–Apr 2024",     co:"Tata Power",                role:"Mechanical Maintenance Intern",    note:"500 MW + 250 MW · 0 incidents" },
  { y:"Dec 2022–Jan 2023",co:"Matharu Sons",              role:"Process Optimization Trainee",     note:"Fuel tankers · 2000 PSI hydrostatic testing" },
];

const EDU = [
  { y:"2024–2026", school:"Arizona State University",           deg:"MS Management of Technology · GPA 3.85" },
  { y:"2021–2024", school:"Pillai College of Engineering",      deg:"BTech Mechanical Engineering" },
  { y:"2018–2021", school:"Father Agnel Technical Complex",     deg:"Diploma Mechanical Engineering" },
];

/* ── COUNTER ──────────────────────────────────────────────── */
function Counter({ target, active }: { target: string; active: boolean }) {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!active) return;
    const n = parseFloat(target);
    const dec = target.includes(".") ? target.split(".")[1].length : 0;
    let step = 0; const steps = 55;
    const t = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - step / steps, 3);
      setVal(dec ? (n * ease).toFixed(dec) : String(Math.floor(n * ease)));
      if (step >= steps) { clearInterval(t); setVal(target); }
    }, 1800 / steps);
    return () => clearInterval(t);
  }, [active, target]);
  return <>{val}</>;
}

/* ── REVEAL HOOK ──────────────────────────────────────────── */
function useReveal(ref: React.RefObject<HTMLElement | null>, t = 0.18) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: t });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, t]);
  return on;
}

/* ── APP ──────────────────────────────────────────────────── */
export default function Home() {
  const [scrollY,  setScrollY]  = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeS,  setActiveS]  = useState(0);
  const [navOpen,  setNavOpen]  = useState(false);
  const [openProj, setOpenProj] = useState<number | null>(null);

  const sectionRefs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
  ];
  const NAV = ["Home","About","Stats","Projects","Skills","Contact"];

  const statsOn   = useReveal(sectionRefs[2]);
  const projOn    = useReveal(sectionRefs[3]);
  const skillsOn  = useReveal(sectionRefs[4]);
  const contactOn = useReveal(sectionRefs[5]);

  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      sectionRefs.forEach((r, i) => {
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
    setNavOpen(false);
  };

  return (
    <div className="app">

      {/* ── MESH BACKGROUND ── */}
      <div className="mesh" aria-hidden="true">
        <div className="mesh-orb m1" style={{ transform:`translate(${scrollY*0.04}px,${scrollY*0.02}px)` }} />
        <div className="mesh-orb m2" style={{ transform:`translate(${-scrollY*0.03}px,${scrollY*0.03}px)` }} />
        <div className="mesh-orb m3" style={{ transform:`translate(${scrollY*0.02}px,${-scrollY*0.02}px)` }} />
        <div className="mesh-noise" />
      </div>

      {/* ── PROGRESS ── */}
      <div className="prog"><div className="prog-fill" style={{ width:`${progress*100}%` }} /></div>

      {/* ── NAV ── */}
      <header className="nav">
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => go(sectionRefs[0])}>
            <span className="logo-sq">PB</span>
            <div>
              <strong>Pratham Bhilare</strong>
              <span>PM · Product · Operations</span>
            </div>
          </button>

          <nav className={`nav-links ${navOpen ? "open" : ""}`}>
            {NAV.map((n, i) => (
              <button key={i} className={`nav-link ${activeS === i ? "active" : ""}`}
                onClick={() => go(sectionRefs[i])}>{n}</button>
            ))}
            <a href="mailto:pratham.bhilare1010@gmail.com" className="nav-hire">Hire Me →</a>
          </nav>

          <button className="nav-burger" onClick={() => setNavOpen(v => !v)}>
            <span className={navOpen ? "r1" : ""} />
            <span className={navOpen ? "r2" : ""} />
            <span className={navOpen ? "r3" : ""} />
          </button>
        </div>
      </header>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section ref={sectionRefs[0]} className="hero">
        <div className="hero-inner">

          {/* Photo */}
          <div className="hero-photo-wrap">
            <div className="photo-ring" />
            <div className="photo-ring photo-ring-2" />
            <div className="photo-frame">
              <img src="/assets/portrait.jpg" alt="Pratham Bhilare" className="photo-img" />
              <div className="photo-overlay" />
            </div>
            {/* floating badge */}
            <div className="photo-badge">
              <span className="badge-dot" />
              <span>Open to Summer 2026</span>
            </div>
          </div>

          {/* Text */}
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span className="eyebrow-pill">MS Management of Technology · ASU · GPA 3.85</span>
            </div>
            <h1 className="hero-name">
              Pratham<br /><span className="name-accent">Bhilare</span>
            </h1>
            <div className="hero-titles">
              <span>Project Manager</span>
              <span className="title-sep">·</span>
              <span>Product Manager</span>
              <span className="title-sep">·</span>
              <span>Operations Analyst</span>
            </div>
            <p className="hero-bio">
              Industrial engineer with a management-of-technology graduate degree.
              I build project plans that ship, product strategies that convert,
              and data models that answer the right questions.
              Based in Phoenix, AZ — open to relocation.
            </p>
            <div className="hero-actions">
              <button className="btn-glow" onClick={() => go(sectionRefs[3])}>View Projects</button>
              <button className="btn-glass" onClick={() => go(sectionRefs[5])}>Get in Touch</button>
              <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="btn-glass">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          ABOUT
      ════════════════════════════════ */}
      <section ref={sectionRefs[1]} className="section about-section">
        <div className="s-inner">
          <div className="s-label">Background</div>
          <h2 className="s-h2">Engineering roots.<br /><em>Management edge.</em></h2>

          <div className="about-grid">
            {/* Experience timeline */}
            <div className="glass-panel">
              <div className="panel-title">Experience</div>
              {EXP.map((e, i) => (
                <div key={i} className="tl-row">
                  <div className="tl-dot-col">
                    <div className="tl-dot" />
                    {i < EXP.length - 1 && <div className="tl-line" />}
                  </div>
                  <div className="tl-content">
                    <div className="tl-year">{e.y}</div>
                    <div className="tl-co">{e.co}</div>
                    <div className="tl-role">{e.role}</div>
                    <div className="tl-note">{e.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="glass-panel">
              <div className="panel-title">Education</div>
              {EDU.map((e, i) => (
                <div key={i} className="edu-row">
                  <div className="edu-year">{e.y}</div>
                  <div>
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-deg">{e.deg}</div>
                  </div>
                </div>
              ))}
              <div className="panel-title" style={{ marginTop: 28 }}>Certifications</div>
              {["Six Sigma: Green Belt","SOLIDWORKS Associate (CSWA)","Advanced Tableau Desktop","PM: International Projects","Siemens Mobility PM Simulation"].map((c,i) => (
                <div key={i} className="cert-row">
                  <span className="cert-check">✓</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          STATS
      ════════════════════════════════ */}
      <section ref={sectionRefs[2]} className="section stats-section">
        <div className="s-inner">
          <div className="s-label">By the Numbers</div>
          <h2 className="s-h2">Work that <em>moves the needle.</em></h2>
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className={`stat-card glass-card ${statsOn ? "stat-in" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="stat-num">
                  <Counter target={s.num} active={statsOn} />{s.suffix}
                </div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROJECTS
      ════════════════════════════════ */}
      <section ref={sectionRefs[3]} className="section proj-section">
        <div className="s-inner">
          <div className="s-label">Selected Work</div>
          <h2 className="s-h2">6 projects. <em>Real outcomes.</em></h2>
          <p className="s-sub">Click any project to see full scope, deliverables, and tools.</p>

          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <div key={i}
                className={`proj-card glass-card ${projOn ? "proj-in" : ""} ${openProj === i ? "proj-open" : ""}`}
                style={{ animationDelay: `${i * 0.09}s`, "--accent": p.color } as React.CSSProperties}
                onClick={() => setOpenProj(openProj === i ? null : i)}>

                <div className="pc-top">
                  <div className="pc-accent-bar" />
                  <div className="pc-meta">
                    <span className="pc-category">{p.category}</span>
                    <span className="pc-company">{p.company}</span>
                  </div>
                  <h3 className="pc-title">{p.title}</h3>
                  <div className="pc-impact">{p.impact}</div>
                  <div className={`pc-chevron ${openProj === i ? "up" : ""}`}>›</div>
                </div>

                {openProj === i && (
                  <div className="pc-body">
                    <p className="pc-desc">{p.desc}</p>
                    <ul className="pc-bullets">
                      {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                    <div className="pc-tools">
                      {p.tools.map((t, j) => <span key={j} className="pc-tool">{t}</span>)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          SKILLS
      ════════════════════════════════ */}
      <section ref={sectionRefs[4]} className="section skills-section">
        <div className="s-inner">
          <div className="s-label">PM Toolkit</div>
          <h2 className="s-h2">Built for delivery. <em>Proven in the field.</em></h2>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <div key={i} className={`skill-card glass-card ${skillsOn ? "skill-in" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="skill-area">{s.area}</div>
                <div className="skill-tags">
                  {s.tags.map((t, j) => (
                    <span key={j} className={`sk-tag ${skillsOn ? "tag-in" : ""}`}
                      style={{ transitionDelay: `${0.2 + i * 0.1 + j * 0.04}s` }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CONTACT
      ════════════════════════════════ */}
      <section ref={sectionRefs[5]} className="section contact-section">
        <div className="contact-glow" />
        <div className="s-inner contact-inner">
          <div className="s-label">Let&apos;s Talk</div>
          <h2 className="s-h2 contact-h2">Open to <em>Summer 2026.</em></h2>
          <p className="contact-note">
            Seeking Project Manager, Product Manager, Industrial Engineering,
            and Business Analysis roles. Ready to own a roadmap,
            drive delivery, and build something worth shipping.
          </p>

          <div className={`contact-grid ${contactOn ? "cgrid-in" : ""}`}>
            {[
              { icon:"✉", label:"Email",    val:"pratham.bhilare1010@gmail.com", href:"mailto:pratham.bhilare1010@gmail.com" },
              { icon:"☏", label:"Phone",    val:"+1 (480) 742-5812",              href:"tel:+14807425812" },
              { icon:"in", label:"LinkedIn", val:"linkedin.com/in/prathambhilare",href:"https://www.linkedin.com/in/prathambhilare" },
              { icon:"⌥", label:"GitHub",   val:"github.com/bhilarepratham",      href:"https://github.com/bhilarepratham" },
            ].map((c, i) => (
              <a key={i} href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="contact-card glass-card"
                style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="cc-icon">{c.icon}</div>
                <div className="cc-label">{c.label}</div>
                <div className="cc-val">{c.val}</div>
              </a>
            ))}
          </div>

          <div className="contact-btns">
            <a href="mailto:pratham.bhilare1010@gmail.com" className="btn-glow">Email Pratham</a>
            <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="btn-glass">LinkedIn Profile</a>
          </div>
        </div>

        <footer className="footer">
          <span>© Pratham Ankush Bhilare · Phoenix, AZ</span>
          <span>Open to Summer 2026 · PM · Product · Operations</span>
        </footer>
      </section>

    </div>
  );
}
