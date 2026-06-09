"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────

const highlights = [
  { stat: "15%",    title: "Logistics cost reduction",   text: "AI-driven warehouse optimization across 537 Amazon distribution centers outperformed Excel Solver by 15–18%." },
  { stat: "3.85",   title: "GPA at ASU",                 text: "MS Management of Technology at Arizona State University's Ira A. Fulton Schools of Engineering." },
  { stat: "$250K",  title: "Project budget managed",     text: "End-to-end planning for a customer portal implementation with a 9-phase WBS and 210-day critical path." },
  { stat: "20.34%", title: "Solar panel efficiency",     text: "Improved PV panel efficiency from 18.22% through forced-air convection heat recovery — published paper." },
  { stat: "$100M",  title: "Projected revenue model",    text: "Operations and financial model for FlazzMart, a 15-minute grocery delivery startup." },
  { stat: "42 yrs", title: "Econometric study",          text: "42-year longitudinal OLS regression (1980–2021) on immigration's impact on GDP and personal income." },
];

const education = [
  { year: "Aug 2024 — May 2026", school: "Arizona State University",           degree: "MS, Management of Technology · GPA 3.85" },
  { year: "2021 — 2024",         school: "Pillai College of Engineering",      degree: "BTech, Mechanical Engineering" },
  { year: "2018 — 2021",         school: "Father Agnel Technical Complex",     degree: "Diploma, Mechanical Engineering" },
  { year: "2018",                school: "Ryan International School",          degree: "10th Standard · Navi Mumbai" },
];

const experience = [
  {
    year: "May 2025 — Present",
    company: "Arizona State University",
    role: "Graduate Teaching Assistant",
    points: ["Grading and feedback for 50+ students in Industrial & Systems Engineering.", "Canvas workflow coordination and faculty collaboration on rubrics.", "Supporting enterprise modeling, quality management, and systems engineering courses."],
  },
  {
    year: "Jan 2024 — Apr 2024",
    company: "Tata Power",
    role: "Mechanical Maintenance Intern",
    points: ["Supervised outage activities at Trombay Thermal Power Station (500 MW + 250 MW units).", "Inspected boilers — pulverisers, burners, air heaters — improving combustion efficiency.", "Implemented LOTO and PTW procedures; achieved zero safety incidents across 14 weeks."],
  },
  {
    year: "Dec 2022 — Jan 2023",
    company: "Matharu Sons",
    role: "Process Optimization Trainee",
    points: ["End-to-end fabrication of fuel tankers (500–25,000L) in Mild Steel.", "MIG/CO₂ welding, hydrostatic pressure testing at 2,000 PSI.", "5-stage surface finishing: sandblasting → soldering → primer → basecoat → clearcoat."],
  },
];

const projects = [
  { title: "Journey Air",                        meta: "Product · B2B SaaS",          result: "$54.75M projected annual savings · Honeywell Aerospace sponsored",     tags: ["Product Management", "Systems Engineering", "Financial Modeling"] },
  { title: "Market Intelligence Dashboard",      meta: "Python · Data Engineering",   result: "50+ companies · 6 industries · real-time scraping",                    tags: ["Python", "Streamlit", "SQLite", "BeautifulSoup"] },
  { title: "Warehouse Location Optimization",    meta: "Operations · AI",             result: "15–18% cost reduction · 537 Amazon distribution centers",              tags: ["AI", "Logistics", "Python", "Operations Research"] },
  { title: "ERP Industry Strategic Analysis",    meta: "Strategy · Market Research",  result: "40-page analysis · $64.83B market · SAP, Oracle, Workday",             tags: ["VRIO", "Porter's Five Forces", "Market Research"] },
  { title: "FlazzMart Delivery Platform",        meta: "Entrepreneurship · Ops",      result: "$5M → $100M revenue model · $3M seed ask · 15-min delivery",          tags: ["Business Modeling", "Financial Forecasting", "Go-to-Market"] },
  { title: "BYD Disruptive Innovation",          meta: "Strategy · Competitive",      result: "#1 EV seller globally · 20,000+ patents · 880% UK growth",             tags: ["Disruptive Innovation", "IP Strategy", "EV Market"] },
  { title: "Customer Portal — Medical LLC",      meta: "Project Management",          result: "$250K budget · 210-day critical path · 48 tracked tasks",             tags: ["MS Project", "Risk Management", "WBS"] },
  { title: "VR Usability Testing",               meta: "UX · Research",               result: "5 critical issues · 7 recommendations · Meta Quest 2",                tags: ["UX Research", "VR", "Think-Aloud Protocol"] },
  { title: "Solar PV Heat Recovery",             meta: "Research · Engineering",      result: "18.22% → 20.34% efficiency · peer-reviewed publication",              tags: ["SolidWorks", "LabVIEW", "Thermodynamics"] },
  { title: "42-Year Economic Study",             meta: "Analytics · Econometrics",    result: "R²=0.998 · GDP dominant predictor p=1.02E-47 · 4 federal sources",    tags: ["OLS Regression", "Python", "Policy Research"] },
];

const skills = [
  { title: "Project & Operations",  text: "WBS · Critical Path · Risk Matrices · Kanban · Lean · Six Sigma · PERT" },
  { title: "Data & Analytics",      text: "OLS Regression · Time-Series · Excel · Tableau · Python · Pandas" },
  { title: "Product & Strategy",    text: "BMC · Porter's Five Forces · VRIO · TAM/SAM/SOM · Go-to-Market" },
  { title: "Engineering Tools",     text: "SolidWorks · Ansys · AnyLogic · LabVIEW · Systems Modeling" },
  { title: "Software & Platforms",  text: "MS Project · Streamlit · SQLite · Plotly · Flutter · VS Code" },
  { title: "Communication",         text: "Technical Documentation · Stakeholder Management · Academic Instruction" },
];

const certifications = [
  { name: "Six Sigma: Green Belt",                          body: "Professional Certification" },
  { name: "Project Management: International Projects",     body: "Professional Certification" },
  { name: "SOLIDWORKS Associate (CSWA)",                    body: "Dassault Systèmes" },
  { name: "Advanced Tableau Desktop",                       body: "Data Visualization" },
  { name: "Siemens Mobility – Commercial PM Simulation",    body: "Forage / Siemens" },
];

// ─── SECTIONS CONFIG ─────────────────────────────────────────

const SECTIONS = [
  { id: "intro",           label: "Intro",           roman: "" },
  { id: "highlights",      label: "Highlights",      roman: "I" },
  { id: "education",       label: "Education",       roman: "II" },
  { id: "experience",      label: "Experience",      roman: "III" },
  { id: "projects",        label: "Projects",        roman: "IV" },
  { id: "skills",          label: "Skills",          roman: "V" },
  { id: "certifications",  label: "Certifications",  roman: "VI" },
  { id: "contact",         label: "Contact",         roman: "VII" },
  { id: "reel",            label: "The Reel",        roman: "∞" },
];

// ─── COMPONENT ───────────────────────────────────────────────

export default function Home() {
  const [current, setCurrent]       = useState(0);
  const [transitioning, setTrans]   = useState(false);
  const [transDir, setTransDir]     = useState<"up"|"down">("down");
  const [visible, setVisible]       = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [reelReady, setReelReady]   = useState(false);
  const touchStartY                 = useRef(0);
  const lastWheelTime               = useRef(0);
  const transitRef                  = useRef(false);

  const goTo = useCallback((idx: number) => {
    if (transitRef.current || idx === current) return;
    const dir = idx > current ? "down" : "up";
    setTransDir(dir);
    setTrans(true);
    transitRef.current = true;
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setTrans(false);
      transitRef.current = false;
      setTimeout(() => setVisible(true), 60);
    }, 650);
  }, [current]);

  // Initial entrance
  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  // Trigger reel animation when entering reel section
  useEffect(() => {
    if (current === SECTIONS.length - 1) {
      setReelReady(false);
      setTimeout(() => setReelReady(true), 400);
    }
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goTo(Math.min(current + 1, SECTIONS.length - 1));
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  goTo(Math.max(current - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  // Wheel navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 900) return;
      lastWheelTime.current = now;
      if (e.deltaY > 30)       goTo(Math.min(current + 1, SECTIONS.length - 1));
      else if (e.deltaY < -30) goTo(Math.max(current - 1, 0));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, goTo]);

  // Touch navigation
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) goTo(Math.min(current + 1, SECTIONS.length - 1));
      else           goTo(Math.max(current - 1, 0));
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [current, goTo]);

  const sec = SECTIONS[current];

  return (
    <div className="cinema-root">

      {/* ── FILM TRANSITION OVERLAY ── */}
      <div className={`film-cut ${transitioning ? "cutting" : ""} dir-${transDir}`} />

      {/* ── AMBIENT PARTICLES ── */}
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className="particle" style={{
            left: `${(i * 37 + 11) % 100}%`,
            animationDelay: `${(i * 0.7) % 8}s`,
            animationDuration: `${12 + (i * 1.3) % 10}s`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            opacity: 0.12 + (i % 5) * 0.04,
          }} />
        ))}
      </div>

      {/* ── SIDE NAVIGATION DOTS ── */}
      <nav className="side-nav" aria-label="Section navigation">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            className={`side-dot ${i === current ? "active" : ""}`}
            onClick={() => { goTo(i); setMenuOpen(false); }}
            aria-label={s.label}
            title={s.label}
          >
            <span className="side-dot-label">{s.label}</span>
          </button>
        ))}
      </nav>

      {/* ── TOP BAR ── */}
      <header className="c-topbar">
        <a className="c-brand" onClick={() => goTo(0)}>
          <div className="c-brand-mark">PB</div>
          <span>Pratham Bhilare</span>
        </a>

        {sec.roman && (
          <div className="c-chapter">
            <span className="c-roman">{sec.roman}</span>
            <span className="c-chapter-label">{sec.label}</span>
          </div>
        )}

        <button className="c-menu-btn" onClick={() => setMenuOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </header>

      {/* ── FULLSCREEN MENU ── */}
      <div className={`fullscreen-menu ${menuOpen ? "open" : ""}`}>
        <button className="menu-close" onClick={() => setMenuOpen(false)}>✕</button>
        <nav className="menu-nav">
          {SECTIONS.map((s, i) => (
            <button key={s.id} className={`menu-item ${i === current ? "active" : ""}`}
              onClick={() => { goTo(i); setMenuOpen(false); }}>
              {s.roman && <span className="menu-roman">{s.roman}</span>}
              <span className="menu-label">{s.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(current / (SECTIONS.length - 1)) * 100}%` }} />
      </div>

      {/* ─────────────────────────────────────────────────────
          SECTIONS
      ───────────────────────────────────────────────────── */}
      <main className={`c-stage ${visible ? "in" : "out"} dir-${transDir}`}>

        {/* ── INTRO ── */}
        {current === 0 && (
          <section className="scene scene-intro">
            <div className="intro-grid">
              <div className="intro-text">
                <p className="intro-eyebrow">Graduate Teaching Assistant · ASU · MS Management of Technology &apos;26</p>
                <h1 className="intro-name">
                  <span className="line-reveal">Pratham</span>
                  <em className="line-reveal delay-1">Bhilare</em>
                </h1>
                <div className="intro-rule" />
                <p className="intro-sub line-reveal delay-2">
                  Industrial engineer and project-minded problem solver focused on
                  process optimization, product thinking, and business analysis.
                </p>
                <div className="intro-actions line-reveal delay-3">
                  <button className="c-btn primary" onClick={() => goTo(1)}>Begin the story</button>
                  <button className="c-btn" onClick={() => goTo(SECTIONS.length - 1)}>Skip to reel</button>
                </div>
              </div>
              <div className="intro-portrait line-reveal delay-2">
                <div className="portrait-frame">
                  <div className="portrait-bar-top" />
                  <img src="/assets/portrait.jpg" alt="Pratham Bhilare" />
                  <div className="portrait-bar-bottom" />
                  <div className="portrait-caption">Pratham Ankush Bhilare · Phoenix, AZ</div>
                </div>
              </div>
            </div>
            <div className="intro-scroll-hint line-reveal delay-4">
              <span>Scroll or use arrow keys to navigate</span>
              <div className="scroll-arrow">↓</div>
            </div>
            <div className="intro-ticker">
              <div className="ticker-track">
                {Array.from({length:3}).flatMap((_,d) =>
                  ["Project Management","Operations","Process Optimization","Data Analysis","Lean Systems","Business Analysis","Product Thinking","Six Sigma","Systems Engineering","Financial Modeling"]
                  .map((w,i) => <span key={`${d}-${i}`}>{w}</span>)
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── HIGHLIGHTS ── */}
        {current === 1 && (
          <section className="scene scene-content">
            <div className="scene-header">
              <div className="scene-eyebrow">Chapter I</div>
              <h2>By the <em>numbers</em></h2>
            </div>
            <div className="highlights-grid">
              {highlights.map((h, i) => (
                <div className="h-card" key={h.title} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="h-stat">{h.stat}</div>
                  <div className="h-title">{h.title}</div>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── EDUCATION ── */}
        {current === 2 && (
          <section className="scene scene-content">
            <div className="scene-header">
              <div className="scene-eyebrow">Chapter II</div>
              <h2><em>Academic</em> background</h2>
            </div>
            <div className="edu-list">
              {education.map((e, i) => (
                <div className="edu-row" key={e.school} style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="edu-year">{e.year}</div>
                  <div className="edu-body">
                    <h3>{e.school}</h3>
                    <p>{e.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── EXPERIENCE ── */}
        {current === 3 && (
          <section className="scene scene-content">
            <div className="scene-header">
              <div className="scene-eyebrow">Chapter III</div>
              <h2>Where I&apos;ve <em>worked</em></h2>
            </div>
            <div className="exp-list">
              {experience.map((e, i) => (
                <div className="exp-row" key={e.company} style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="exp-left">
                    <div className="exp-year">{e.year}</div>
                    <div className="exp-company">{e.company}</div>
                    <div className="exp-role">{e.role}</div>
                  </div>
                  <ul className="exp-points">
                    {e.points.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── PROJECTS ── */}
        {current === 4 && (
          <section className="scene scene-content scene-projects">
            <div className="scene-header">
              <div className="scene-eyebrow">Chapter IV</div>
              <h2>Selected <em>work</em></h2>
            </div>
            <div className="proj-grid">
              {projects.map((p, i) => (
                <div className="proj-card" key={p.title} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="proj-num">0{i + 1}</div>
                  <div className="proj-body">
                    <div className="proj-meta">{p.meta}</div>
                    <h3>{p.title}</h3>
                    <p className="proj-result">{p.result}</p>
                    <div className="proj-tags">
                      {p.tags.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SKILLS ── */}
        {current === 5 && (
          <section className="scene scene-content">
            <div className="scene-header">
              <div className="scene-eyebrow">Chapter V</div>
              <h2>Areas of <em>expertise</em></h2>
            </div>
            <div className="skills-grid">
              {skills.map((s, i) => (
                <div className="skill-card" key={s.title} style={{ animationDelay: `${i * 0.1}s` }}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CERTIFICATIONS ── */}
        {current === 6 && (
          <section className="scene scene-content">
            <div className="scene-header">
              <div className="scene-eyebrow">Chapter VI</div>
              <h2><em>Credentials</em> &amp; certifications</h2>
            </div>
            <div className="cert-list">
              {certifications.map((c, i) => (
                <div className="cert-row" key={c.name} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="cert-check">✓</div>
                  <div>
                    <div className="cert-body-text">{c.body}</div>
                    <h3>{c.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CONTACT ── */}
        {current === 7 && (
          <section className="scene scene-content scene-contact">
            <div className="scene-header">
              <div className="scene-eyebrow">Chapter VII</div>
              <h2>Get in <em>touch</em></h2>
            </div>
            <div className="contact-body">
              <p className="contact-note">
                Seeking Summer 2026 roles in Project Management, Product Management,
                Industrial Engineering, and Business Analysis. Open to relocation.
              </p>
              <div className="contact-links-grid">
                <a href="mailto:pratham.bhilare1010@gmail.com" className="contact-link-card">
                  <span className="cl-label">Email</span>
                  <span className="cl-value">pratham.bhilare1010@gmail.com</span>
                </a>
                <a href="tel:+14807425812" className="contact-link-card">
                  <span className="cl-label">Phone</span>
                  <span className="cl-value">+1 (480) 742-5812</span>
                </a>
                <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="contact-link-card">
                  <span className="cl-label">LinkedIn</span>
                  <span className="cl-value">linkedin.com/in/prathambhilare</span>
                </a>
                <a href="https://github.com/bhilarepratham" target="_blank" rel="noreferrer" className="contact-link-card">
                  <span className="cl-label">GitHub</span>
                  <span className="cl-value">github.com/bhilarepratham</span>
                </a>
              </div>
              <div className="contact-actions">
                <a href="mailto:pratham.bhilare1010@gmail.com" className="c-btn primary">Email Pratham</a>
                <button className="c-btn" onClick={() => goTo(SECTIONS.length - 1)}>Watch the reel →</button>
              </div>
            </div>
          </section>
        )}

        {/* ── THE REEL ── */}
        {current === 8 && (
          <section className="scene scene-reel">
            <div className="reel-header">
              <div className="scene-eyebrow">∞</div>
              <h2>The <em>Reel</em></h2>
              <p>Everything, at once.</p>
            </div>
            <div className={`reel-body ${reelReady ? "ready" : ""}`}>

              <div className="reel-col">
                <div className="reel-section-title">Highlights</div>
                {highlights.map((h, i) => (
                  <div className="reel-item" key={h.title} style={{ animationDelay: `${i * 0.06}s` }}>
                    <span className="reel-stat">{h.stat}</span>
                    <span className="reel-text">{h.title}</span>
                  </div>
                ))}
              </div>

              <div className="reel-col">
                <div className="reel-section-title">Education</div>
                {education.map((e, i) => (
                  <div className="reel-item" key={e.school} style={{ animationDelay: `${0.4 + i * 0.06}s` }}>
                    <span className="reel-stat">{e.year.split("—")[0].trim()}</span>
                    <span className="reel-text">{e.school}</span>
                  </div>
                ))}
                <div className="reel-section-title" style={{ marginTop: 24 }}>Certifications</div>
                {certifications.map((c, i) => (
                  <div className="reel-item" key={c.name} style={{ animationDelay: `${0.7 + i * 0.06}s` }}>
                    <span className="reel-check">✓</span>
                    <span className="reel-text">{c.name}</span>
                  </div>
                ))}
              </div>

              <div className="reel-col">
                <div className="reel-section-title">Projects</div>
                {projects.map((p, i) => (
                  <div className="reel-item" key={p.title} style={{ animationDelay: `${0.3 + i * 0.06}s` }}>
                    <span className="reel-num">0{i+1}</span>
                    <span className="reel-text">{p.title}</span>
                  </div>
                ))}
              </div>

              <div className="reel-col">
                <div className="reel-section-title">Experience</div>
                {experience.map((e, i) => (
                  <div className="reel-item" key={e.company} style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                    <span className="reel-stat">{e.year.split("—")[0].trim()}</span>
                    <span className="reel-text">{e.company} · {e.role}</span>
                  </div>
                ))}
                <div className="reel-section-title" style={{ marginTop: 24 }}>Skills</div>
                {skills.map((s, i) => (
                  <div className="reel-item" key={s.title} style={{ animationDelay: `${0.8 + i * 0.06}s` }}>
                    <span className="reel-check">—</span>
                    <span className="reel-text">{s.title}</span>
                  </div>
                ))}
              </div>

            </div>

            <div className="reel-footer">
              <div className="reel-name">Pratham Ankush Bhilare</div>
              <div className="reel-contact">
                <a href="mailto:pratham.bhilare1010@gmail.com">pratham.bhilare1010@gmail.com</a>
                <span>·</span>
                <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer">LinkedIn</a>
                <span>·</span>
                <span>Phoenix, AZ · Open to Summer 2026</span>
              </div>
              <button className="c-btn" style={{ marginTop: 20 }} onClick={() => goTo(0)}>↑ Back to start</button>
            </div>
          </section>
        )}

      </main>

      {/* ── BOTTOM NAV ARROWS ── */}
      <div className="bottom-nav">
        <button className="arrow-btn" onClick={() => goTo(Math.max(current - 1, 0))} disabled={current === 0} aria-label="Previous">↑</button>
        <span className="bottom-counter">{current + 1} / {SECTIONS.length}</span>
        <button className="arrow-btn" onClick={() => goTo(Math.min(current + 1, SECTIONS.length - 1))} disabled={current === SECTIONS.length - 1} aria-label="Next">↓</button>
      </div>

    </div>
  );
}
