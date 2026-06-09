"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const CUBE_FACES = [
  { stat: "3.85",  unit: "",  label: "GPA · ASU Fulton" },
  { stat: "$250K", unit: "",  label: "Budget Managed" },
  { stat: "10",    unit: "+", label: "PM Projects" },
  { stat: "15",    unit: "%", label: "Cost Reduction" },
  { stat: "42",    unit: "",  label: "Yrs Data Analysed" },
  { stat: "0",     unit: "",  label: "Safety Incidents" },
];

const PM_PROJECTS = [
  {
    tag: "Product · B2B SaaS",
    title: "Journey Air",
    org: "Honeywell Aerospace · ASU TMC 593",
    outcome: "$54.75M projected annual savings",
    bullets: [
      "Led product development for Honeywell-sponsored airline disruption platform",
      "Built B2B SaaS Business Model Canvas targeting U.S. Tier 1 & Tier 2 airlines",
      "Conducted 2 rounds of customer discovery interviews → 6 behavioral personas",
      "Applied V-Model systems engineering across 4 platform modules",
      "5-year NPV model · $150M–$300M serviceable market",
    ],
    tools: ["V-Model","BMC","Customer Discovery","Financial Modeling","SaaS Pricing"],
  },
  {
    tag: "Project Management · $250K",
    title: "Customer Portal Implementation",
    org: "Medical Products LLC",
    outcome: "210-day critical path · on-scope delivery",
    bullets: [
      "Led end-to-end planning for a $250K portal with 9-phase WBS in MS Project",
      "Quantified 8 key risks — 2 classified high-risk (Turnover Rf=0.86, Learning Curve Rf=0.72)",
      "Built RAM mapping 9 deliverables across 7 roles with zero overlap",
      "PERT estimation across 48 tasks · 7 milestone checkpoints Jan–Nov",
      "Designed 6-type communication framework across Zoom, Slack, JIRA, Teams",
    ],
    tools: ["MS Project","WBS","Risk Matrix","RAM","PERT","JIRA","Stakeholder Mgmt"],
  },
  {
    tag: "Startup · Go-to-Market",
    title: "FlazzMart",
    org: "Academic Venture · ASU TEM 501",
    outcome: "$5M → $100M revenue model in 5 years",
    bullets: [
      "Designed full business plan for 15-min grocery delivery targeting Phoenix metro",
      "TAM/SAM/SOM: $68.6B market by 2032 · $40M SOM in 3 years",
      "Benchmarked Instacart (63% share), Amazon Fresh, Walmart Grocery",
      "Multi-stream revenue: delivery fees, subscriptions, vendor commissions, in-app ads",
      "$730 annual LTV · break-even Year 3 · 55%→65% gross margin trajectory",
    ],
    tools: ["TAM/SAM/SOM","Revenue Modeling","Competitive Analysis","GTM","LTV Modeling"],
  },
  {
    tag: "Strategy · Market Research",
    title: "ERP Industry Analysis",
    org: "ASU Strategic Management of Technology",
    outcome: "40-page strategic report on $64.83B market",
    bullets: [
      "Analyzed SAP, Oracle, Workday — representing ~44% combined market share",
      "Applied VRIO across 10+ resources per company to identify competitive advantages",
      "Modeled cloud ERP growth $34.8B → $123.42B by 2030 at 18% CAGR",
      "Benchmarked AI/cloud adoption: SAP 15% R&D, Workday 17% YoY ML-driven growth",
      "Mapped vertical integration depth and M&A activity across all three players",
    ],
    tools: ["Porter's Five Forces","VRIO","RBV","Core Competence","Market Sizing"],
  },
  {
    tag: "Disruptive Innovation",
    title: "BYD Global Strategy",
    org: "Team Strategy Project",
    outcome: "Scored 9.5/10 across viability, feasibility & financial opportunity",
    bullets: [
      "Analyzed BYD's rise to #1 EV seller — 526K BEV sales vs Tesla's 484K in Q4 2023",
      "Evaluated 20,000+ patent portfolio and $2.1B government subsidy advantage",
      "Mapped global patent filing across US, EU, China, South Korea",
      "Identified 880% UK sales growth as primary international expansion signal",
      "Recommended global urban EV expansion as highest-value strategic next step",
    ],
    tools: ["Disruptive Innovation","IP Strategy","SWOT","BMC","Financial Benchmarking"],
  },
  {
    tag: "Operations · Process",
    title: "Warehouse AI Optimizer",
    org: "Enterprise Operations Analysis",
    outcome: "15–18% cost reduction over Excel Solver baseline",
    bullets: [
      "Engineered AI grid search to find optimal warehouse across 537 Amazon centers",
      "Minimized weighted transport cost to ~29.8M units vs Solver's 35.2M",
      "Prompt-engineered ChatGPT through custom distance formula implementation",
      "Visualized national warehouse network geospatially in Python/Matplotlib",
      "Proved Gen AI outperforms GRG Nonlinear Solver for large-scale logistics",
    ],
    tools: ["AI Optimization","Python","Excel Solver","Geospatial Analysis","Prompt Engineering"],
  },
];

const SKILLS_PM = [
  { cat:"Delivery & Planning",   items:["WBS","Critical Path","Gantt","PERT","Milestone Tracking","MS Project","JIRA"] },
  { cat:"Product Strategy",      items:["Roadmapping","BMC","TAM/SAM/SOM","Go-to-Market","User Stories","OKRs","Prioritization"] },
  { cat:"Stakeholder & Risk",    items:["RAM","Risk Matrix","Communication Plans","Change Management","Stakeholder Mapping"] },
  { cat:"Analytics & Data",      items:["OLS Regression","Excel Modeling","Tableau","Python","KPI Dashboards","A/B Thinking"] },
  { cat:"Frameworks",            items:["Agile","Lean","Six Sigma GB","VRIO","Porter's Five Forces","V-Model","Kanban"] },
  { cat:"Tools & Platforms",     items:["MS Project","JIRA","Streamlit","Slack","Tableau","Python","Figma (basic)"] },
];

const CERTS = [
  "Six Sigma: Green Belt",
  "SOLIDWORKS Associate (CSWA)",
  "Advanced Tableau Desktop",
  "Project Management: International Projects",
  "Siemens Mobility — Commercial PM Simulation",
];

/* ══════════════════════════════════════════════════════════
   3-D CUBE HERO
══════════════════════════════════════════════════════════ */
function Cube3D() {
  const [rotX, setRotX] = useState(-18);
  const [rotY, setRotY] = useState(225);
  const dragging  = useRef(false);
  const lastPos   = useRef({ x: 0, y: 0 });
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const velY      = useRef(0.35);

  const startAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setRotY(r => r + velY.current);
    }, 16);
  }, []);

  useEffect(() => {
    startAuto();
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [startAuto]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    if (autoTimer.current) clearInterval(autoTimer.current);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    velY.current = dx * 0.4;
    setRotY(r => r + dx * 0.55);
    setRotX(r => Math.max(-35, Math.min(35, r - dy * 0.4)));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => {
    dragging.current = false;
    startAuto();
  };

  const faces = [
    { rot: "rotateY(0deg)   translateZ(140px)" },
    { rot: "rotateY(90deg)  translateZ(140px)" },
    { rot: "rotateY(180deg) translateZ(140px)" },
    { rot: "rotateY(-90deg) translateZ(140px)" },
    { rot: "rotateX(90deg)  translateZ(140px)" },
    { rot: "rotateX(-90deg) translateZ(140px)" },
  ];

  return (
    <div className="cube-scene"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ cursor: dragging.current ? "grabbing" : "grab" }}>
      <div className="cube-wrap"
        style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}>
        {faces.map((f, i) => (
          <div key={i} className={`cube-face face-${i}`}
            style={{ transform: f.rot }}>
            <div className="face-inner">
              <div className="face-stat">{CUBE_FACES[i].stat}<span className="face-unit">{CUBE_FACES[i].unit}</span></div>
              <div className="face-label">{CUBE_FACES[i].label}</div>
            </div>
            <div className="face-grid" aria-hidden="true">
              {Array.from({length:9}).map((_,j) => <div key={j} className="face-cell" />)}
            </div>
          </div>
        ))}
      </div>
      <div className="cube-shadow" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   INTERSECTION HOOK
══════════════════════════════════════════════════════════ */
function useVisible(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return vis;
}

/* ══════════════════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════════════════ */
function ProjectCard({ p, i, active }: { p: typeof PM_PROJECTS[0]; i: number; active: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`pcard ${active ? "pcard-in" : ""}`}
      style={{ animationDelay: `${i * 0.08}s` }}>
      <div className="pcard-header" onClick={() => setOpen(v => !v)}>
        <div className="pcard-left">
          <span className="pcard-tag">{p.tag}</span>
          <h3 className="pcard-title">{p.title}</h3>
          <span className="pcard-org">{p.org}</span>
        </div>
        <div className="pcard-right">
          <span className="pcard-outcome">{p.outcome}</span>
          <span className={`pcard-chevron ${open ? "open" : ""}`}>›</span>
        </div>
      </div>
      {open && (
        <div className="pcard-body">
          <ul className="pcard-bullets">
            {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
          <div className="pcard-tools">
            {p.tools.map((t, j) => <span key={j} className="ptool">{t}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════ */
export default function Home() {
  const [scrollY,  setScrollY]  = useState(0);
  const [progress, setProgress] = useState(0);
  const [navOpen,  setNavOpen]  = useState(false);
  const [activeS,  setActiveS]  = useState(0);

  const heroRef    = useRef<HTMLElement>(null);
  const aboutRef   = useRef<HTMLElement>(null);
  const projRef    = useRef<HTMLElement>(null);
  const skillsRef  = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const sections   = [heroRef, aboutRef, projRef, skillsRef, contactRef];
  const navItems   = ["Home", "About", "Projects", "Skills", "Contact"];

  const aboutVis   = useVisible(aboutRef);
  const projVis    = useVisible(projRef);
  const skillsVis  = useVisible(skillsRef);
  const contactVis = useVisible(contactRef);

  useEffect(() => {
    const onScroll = () => {
      const sy  = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollY(sy);
      setProgress(max > 0 ? sy / max : 0);
      sections.forEach((ref, i) => {
        const el = ref.current; if (!el) return;
        const r  = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.5 && r.bottom >= window.innerHeight * 0.5) setActiveS(i);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div className="app">

      {/* ── PROGRESS ── */}
      <div className="prog-bar"><div className="prog-fill" style={{ width:`${progress*100}%` }} /></div>

      {/* ── TOPBAR ── */}
      <header className="topbar">
        <div className="tb-wrap">
          <button className="tb-logo" onClick={() => scrollTo(heroRef)}>
            <div className="tb-mark">PB</div>
            <div className="tb-txt">
              <strong>Pratham Bhilare</strong>
              <span>PM · Product · Operations</span>
            </div>
          </button>

          <nav className={`tb-nav ${navOpen ? "open" : ""}`}>
            {navItems.map((n, i) => (
              <button key={i} className={`tb-link ${i === activeS ? "on" : ""}`}
                onClick={() => scrollTo(sections[i])}>{n}</button>
            ))}
            <a href="mailto:pratham.bhilare1010@gmail.com" className="tb-cta">Hire Me</a>
          </nav>

          <button className="tb-burger" onClick={() => setNavOpen(v => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="hero">
        {/* ambient grid */}
        <div className="hero-grid" aria-hidden="true"
          style={{ transform: `translateY(${scrollY * 0.12}px)` }}>
          {Array.from({length: 16}).map((_,i) => (
            <div key={`h${i}`} className="hg-line hg-h" style={{ top: `${i * 6.5}%` }} />
          ))}
          {Array.from({length: 16}).map((_,i) => (
            <div key={`v${i}`} className="hg-line hg-v" style={{ left: `${i * 6.5}%` }} />
          ))}
        </div>

        {/* glow orbs */}
        <div className="orb orb-a" style={{ transform:`translate(${scrollY*0.05}px,${scrollY*0.03}px)` }} />
        <div className="orb orb-b" style={{ transform:`translate(${-scrollY*0.04}px,${scrollY*0.04}px)` }} />

        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Available for Summer 2026 · Phoenix, AZ
            </div>
            <h1 className="hero-h1">
              <span className="h1-line">Project &amp;</span>
              <span className="h1-line h1-accent">Product</span>
              <span className="h1-line">Manager.</span>
            </h1>
            <p className="hero-sub">
              MS Management of Technology · ASU · GPA 3.85<br />
              I build roadmaps, manage delivery, and ship outcomes.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => scrollTo(projRef)}>View Projects</button>
              <button className="btn-ghost"   onClick={() => scrollTo(skillsRef)}>PM Toolkit</button>
              <a href="mailto:pratham.bhilare1010@gmail.com" className="btn-ghost">Contact</a>
            </div>
            <div className="hero-tags">
              {["Product Roadmaps","Stakeholder Management","Risk Analysis","Data-Driven Decisions","Agile · Lean · Six Sigma"].map((t,i) => (
                <span key={i} className="hero-tag" style={{ animationDelay:`${0.9+i*0.1}s` }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="hero-right">
            <Cube3D />
            <p className="cube-hint">Drag to rotate</p>
          </div>
        </div>

        <div className="scroll-cue">
          <div className="scroll-mouse"><div className="scroll-dot" /></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT / EXPERIENCE
      ══════════════════════════════════════ */}
      <section ref={aboutRef} className="section about-section">
        <div className="s-wrap">
          <div className={`s-eyebrow ${aboutVis ? "vis" : ""}`}>Background</div>
          <h2 className={`s-h2 ${aboutVis ? "vis" : ""}`}>
            Engineering roots.<br /><em>Management edge.</em>
          </h2>

          <div className="about-grid">
            {/* Left: bio */}
            <div className={`about-bio ${aboutVis ? "vis" : ""}`}>
              <p>I&apos;m a mechanical engineer turned management-of-technology graduate — which means I understand how systems are built <em>and</em> how to deliver them on time, on budget, and on strategy.</p>
              <p>At Tata Power, I managed maintenance outages on 750 MW of generation capacity. At ASU, I&apos;ve shipped 10 cross-functional projects — from a Honeywell-sponsored airline product to AI-driven logistics optimization.</p>
              <p>I think in roadmaps, speak in data, and measure everything.</p>
              <div className="about-meta">
                <div className="meta-item"><span className="meta-k">Status</span><span className="meta-v">Open to Summer 2026 roles</span></div>
                <div className="meta-item"><span className="meta-k">Location</span><span className="meta-v">Phoenix, AZ — open to relocation</span></div>
                <div className="meta-item"><span className="meta-k">Degree</span><span className="meta-v">MS Management of Technology · ASU</span></div>
                <div className="meta-item"><span className="meta-k">GPA</span><span className="meta-v">3.85 / 4.0</span></div>
              </div>
            </div>

            {/* Right: experience timeline */}
            <div className="exp-timeline">
              {[
                { period:"2025–Now",  co:"Arizona State University", role:"Graduate Teaching Assistant", note:"50+ students · ISE courses" },
                { period:"Jan–Apr 24",co:"Tata Power",               role:"Mechanical Maintenance Intern", note:"500 MW + 250 MW · 0 incidents" },
                { period:"Dec 22–Jan 23",co:"Matharu Sons",          role:"Process Optimization Trainee", note:"Fuel tankers · 2000 PSI testing" },
                { period:"2021–2024", co:"Pillai College of Engg",   role:"BTech Mechanical Engineering", note:"Graduated" },
              ].map((e, i) => (
                <div key={i} className={`tl-item ${aboutVis ? "vis" : ""}`}
                  style={{ transitionDelay:`${0.2+i*0.14}s` }}>
                  <div className="tl-line">
                    <div className="tl-dot" />
                    {i < 3 && <div className="tl-connector" />}
                  </div>
                  <div className="tl-body">
                    <div className="tl-period">{e.period}</div>
                    <div className="tl-co">{e.co}</div>
                    <div className="tl-role">{e.role}</div>
                    <div className="tl-note">{e.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════ */}
      <section ref={projRef} className="section proj-section">
        <div className="s-wrap">
          <div className={`s-eyebrow ${projVis ? "vis" : ""}`}>Selected Work</div>
          <h2 className={`s-h2 ${projVis ? "vis" : ""}`}>
            6 projects.<br /><em>Real outcomes.</em>
          </h2>
          <p className={`s-sub ${projVis ? "vis" : ""}`}>
            Click any project to expand full scope, deliverables, and tools used.
          </p>
          <div className="proj-list">
            {PM_PROJECTS.map((p, i) => (
              <ProjectCard key={i} p={p} i={i} active={projVis} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SKILLS
      ══════════════════════════════════════ */}
      <section ref={skillsRef} className="section skills-section">
        <div className="s-wrap">
          <div className={`s-eyebrow ${skillsVis ? "vis" : ""}`}>PM Toolkit</div>
          <h2 className={`s-h2 ${skillsVis ? "vis" : ""}`}>
            Built for delivery.<br /><em>Proven in the field.</em>
          </h2>
          <div className="skills-grid">
            {SKILLS_PM.map((s, i) => (
              <div key={i} className={`sk-card ${skillsVis ? "vis" : ""}`}
                style={{ transitionDelay:`${0.1+i*0.1}s` }}>
                <div className="sk-cat">{s.cat}</div>
                <div className="sk-tags">
                  {s.items.map((item, j) => (
                    <span key={j} className={`sk-tag ${skillsVis ? "tag-vis" : ""}`}
                      style={{ transitionDelay:`${0.2+i*0.1+j*0.04}s` }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`cert-section ${skillsVis ? "vis" : ""}`}>
            <div className="cert-label">Certifications</div>
            <div className="cert-list">
              {CERTS.map((c, i) => (
                <div key={i} className={`cert-item ${skillsVis ? "vis" : ""}`}
                  style={{ transitionDelay:`${0.6+i*0.08}s` }}>
                  <span className="cert-icon">✓</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section ref={contactRef} className="section contact-section">
        <div className="contact-orb" />
        <div className="s-wrap contact-wrap">
          <div className={`s-eyebrow ${contactVis ? "vis" : ""}`}>Let&apos;s Talk</div>
          <h2 className={`s-h2 contact-h2 ${contactVis ? "vis" : ""}`}>
            Open to <em>Summer 2026.</em>
          </h2>
          <p className={`contact-note ${contactVis ? "vis" : ""}`}>
            Seeking Product Manager, Project Manager, Industrial Engineering,
            and Business Analysis roles. Ready to own a roadmap, drive delivery,
            and build something worth shipping.
          </p>
          <div className={`contact-cards ${contactVis ? "vis" : ""}`}>
            {[
              { icon:"✉", label:"Email",    val:"pratham.bhilare1010@gmail.com", href:"mailto:pratham.bhilare1010@gmail.com" },
              { icon:"☏", label:"Phone",    val:"+1 (480) 742-5812",              href:"tel:+14807425812" },
              { icon:"in", label:"LinkedIn", val:"linkedin.com/in/prathambhilare",href:"https://www.linkedin.com/in/prathambhilare" },
              { icon:"⌥", label:"GitHub",   val:"github.com/bhilarepratham",      href:"https://github.com/bhilarepratham" },
            ].map((c, i) => (
              <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer" className="cc-card"
                style={{ transitionDelay:`${0.3+i*0.08}s` }}>
                <div className="cc-icon">{c.icon}</div>
                <div className="cc-label">{c.label}</div>
                <div className="cc-val">{c.val}</div>
              </a>
            ))}
          </div>
          <div className={`contact-actions ${contactVis ? "vis" : ""}`}>
            <a href="mailto:pratham.bhilare1010@gmail.com" className="btn-primary">Email Pratham</a>
            <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
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
