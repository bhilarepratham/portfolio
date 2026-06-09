"use client";
import { useEffect, useRef, useState } from "react";

/* ─── DATA ───────────────────────────────────────────────── */
const STATS = [
  { val: "3.85",  label: "GPA at ASU",              unit: "" },
  { val: "15",    label: "Logistics cost reduction", unit: "%" },
  { val: "250",   label: "Project budget managed",   unit: "K" },
  { val: "0.998", label: "Regression R² score",      unit: "" },
  { val: "54.75", label: "Projected savings",        unit: "M" },
  { val: "42",    label: "Years of economic data",   unit: "" },
];

const PROJECTS = [
  { n:"01", title:"Journey Air",                  meta:"Product · B2B SaaS",         result:"$54.75M projected annual savings · Honeywell Aerospace sponsored" },
  { n:"02", title:"Warehouse AI Optimizer",        meta:"Operations · AI",            result:"15–18% cost reduction across 537 Amazon distribution centers" },
  { n:"03", title:"Market Intelligence Dashboard", meta:"Python · Data Engineering",  result:"Real-time data on 50+ public companies across 6 industries" },
  { n:"04", title:"ERP Industry Analysis",         meta:"Strategy · Research",        result:"40-page analysis of $64.83B market — SAP, Oracle, Workday" },
  { n:"05", title:"FlazzMart",                     meta:"Entrepreneurship · Ops",     result:"$5M → $100M revenue model · $3M seed ask · 15-min delivery" },
  { n:"06", title:"BYD Disruptive Strategy",       meta:"Competitive Analysis",       result:"Mapped #1 EV seller globally · 20,000+ patents · 880% UK growth" },
  { n:"07", title:"Customer Portal — Medical LLC", meta:"Project Management",         result:"$250K budget · 9-phase WBS · 210-day critical path" },
  { n:"08", title:"VR Usability Testing",          meta:"UX Research",                result:"5 critical issues found · 7 recommendations · Meta Quest 2" },
  { n:"09", title:"Solar PV Heat Recovery",        meta:"Research · Engineering",     result:"18.22% → 20.34% efficiency · peer-reviewed publication" },
  { n:"10", title:"42-Year Economic Study",        meta:"Analytics · Econometrics",   result:"R²=0.998 · GDP dominant predictor p=1.02E-47 · 4 federal sources" },
];

const SKILLS = [
  { area:"Project & Operations",  items:["WBS","Critical Path","Lean","Six Sigma","Kanban","PERT","Risk Analysis"] },
  { area:"Data & Analytics",      items:["OLS Regression","Python","Pandas","Tableau","Excel","Time-Series"] },
  { area:"Product & Strategy",    items:["Porter's Five Forces","VRIO","TAM/SAM/SOM","BMC","Go-to-Market"] },
  { area:"Engineering Tools",     items:["SolidWorks","Ansys","AnyLogic","LabVIEW","MS Project","NI DAQ"] },
  { area:"Software & Code",       items:["Streamlit","SQLite","Plotly","Flutter","BeautifulSoup","yFinance"] },
];

const EXPERIENCE = [
  { period:"May 2025 — Present", co:"Arizona State University",  role:"Graduate Teaching Assistant", pts:["Grading and feedback for 50+ students in Industrial & Systems Engineering","Canvas workflow management and faculty collaboration on assessment rubrics","Supporting enterprise modeling, quality management, and systems engineering courses"] },
  { period:"Jan 2024 — Apr 2024", co:"Tata Power",               role:"Mechanical Maintenance Intern", pts:["Supervised outage activities at Trombay Thermal Power Station — 500 MW + 250 MW","Inspected boilers, pulverisers, burners, air heaters — improving combustion efficiency","Implemented LOTO + PTW procedures. Zero safety incidents across 14 weeks."] },
  { period:"Dec 2022 — Jan 2023", co:"Matharu Sons",              role:"Process Optimization Trainee",  pts:["End-to-end fabrication of fuel tankers (500–25,000L) in Mild Steel","MIG/CO₂ welding, 3-roller bending, hydrostatic pressure testing at 2,000 PSI","5-stage surface finishing: sandblasting → soldering → primer → basecoat → clearcoat"] },
];

/* ─── COUNTER HOOK ───────────────────────────────────────── */
function useCounter(target: string, active: boolean) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!active) return;
    const isFloat = target.includes(".");
    const num = parseFloat(target);
    const duration = 1800;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      setDisplay(isFloat ? current.toFixed(target.split(".")[1].length) : Math.floor(current).toString());
      if (step >= steps) { clearInterval(timer); setDisplay(target); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);
  return display;
}

/* ─── STAT CARD ──────────────────────────────────────────── */
function StatCard({ val, label, unit, active, delay }: { val:string;label:string;unit:string;active:boolean;delay:number }) {
  const count = useCounter(val, active);
  return (
    <div className="stat-card" style={{ animationDelay:`${delay}s`, animation: active ? `statIn 0.7s ${delay}s cubic-bezier(0.22,1,0.36,1) both` : "none" }}>
      <div className="stat-num">{count}<span className="stat-unit">{unit}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ─── SECTION HOOK ───────────────────────────────────────── */
function useSection(ref: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return active;
}

/* ─── MAIN ───────────────────────────────────────────────── */
export default function Home() {
  const [scrollY,   setScrollY]   = useState(0);
  const [progress,  setProgress]  = useState(0);
  const [activeNav, setActiveNav] = useState(0);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const heroRef    = useRef<HTMLElement>(null);
  const statsRef   = useRef<HTMLElement>(null);
  const expRef     = useRef<HTMLElement>(null);
  const projRef    = useRef<HTMLElement>(null);
  const skillsRef  = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const statsActive   = useSection(statsRef);
  const expActive     = useSection(expRef);
  const projActive    = useSection(projRef);
  const skillsActive  = useSection(skillsRef);
  const contactActive = useSection(contactRef);

  const sections = [heroRef, statsRef, expRef, projRef, skillsRef, contactRef];
  const navLabels = ["Home","Numbers","Experience","Projects","Skills","Contact"];

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollY(sy);
      setProgress(max > 0 ? sy / max : 0);

      sections.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActiveNav(i);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="root">

      {/* ══ SCAN LINE OVERLAY ══ */}
      <div className="scanlines" aria-hidden="true" />

      {/* ══ PROGRESS BAR ══ */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width:`${progress*100}%` }} />
      </div>

      {/* ══ SIDE NAV DOTS ══ */}
      <nav className="sidenav" aria-label="Section navigation">
        {navLabels.map((label, i) => (
          <button key={i} className={`snav-dot ${i===activeNav?"snav-active":""}`}
            onClick={() => scrollTo(sections[i])} title={label}>
            <span className="snav-tip">{label}</span>
          </button>
        ))}
      </nav>

      {/* ══ TOPBAR ══ */}
      <header className="topbar">
        <div className="tb-inner">
          <button className="tb-brand" onClick={() => scrollTo(heroRef)}>
            <div className="tb-mark">PB</div>
            <span>Pratham Bhilare</span>
          </button>

          <nav className={`tb-nav ${menuOpen?"tb-nav-open":""}`}>
            {navLabels.map((l,i) => (
              <button key={i} className={`tb-link ${i===activeNav?"tb-link-on":""}`}
                onClick={() => scrollTo(sections[i])}>{l}</button>
            ))}
          </nav>

          <button className="tb-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span className={menuOpen?"open":""}/><span className={menuOpen?"open":""}/><span className={menuOpen?"open":""}/>
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="home" className="section hero-section">

        {/* layered parallax background */}
        <div className="hero-bg">
          <div className="hero-grid" style={{ transform:`translateY(${scrollY*0.15}px)` }} aria-hidden="true">
            {Array.from({length:20}).map((_,i)=>(
              <div key={i} className="grid-line-h" style={{top:`${i*5.5}%`}} />
            ))}
            {Array.from({length:20}).map((_,i)=>(
              <div key={i} className="grid-line-v" style={{left:`${i*5.5}%`}} />
            ))}
          </div>
          <div className="hero-orb orb-1" style={{ transform:`translate(${scrollY*0.08}px, ${scrollY*0.04}px)` }} />
          <div className="hero-orb orb-2" style={{ transform:`translate(${-scrollY*0.06}px, ${scrollY*0.05}px)` }} />
          <div className="hero-orb orb-3" style={{ transform:`translate(${scrollY*0.04}px, ${-scrollY*0.03}px)` }} />
          {/* floating data particles */}
          <div className="particles" aria-hidden="true">
            {Array.from({length:24}).map((_,i)=>(
              <div key={i} className="particle" style={{
                left:`${(i*41+7)%96}%`,
                animationDelay:`${(i*0.7)%9}s`,
                animationDuration:`${10+(i*1.3)%10}s`,
                width:`${1+(i%3)}px`, height:`${1+(i%3)}px`,
              }} />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            <span>Graduate Teaching Assistant · ASU · MS Management of Technology &apos;26</span>
          </div>

          <h1 className="hero-name">
            <span className="hero-word hero-w1">Pratham</span>
            <span className="hero-word hero-w2">Bhilare</span>
          </h1>

          <div className="hero-rule" />

          <p className="hero-sub">
            Industrial engineer. Project thinker. Data-driven problem solver.
            <br />
            I turn complex systems into measurable outcomes.
          </p>

          <div className="hero-roles">
            {["Project Management","Product Management","Industrial Engineering","Business Analysis"].map((r,i)=>(
              <span key={i} className="hero-role" style={{animationDelay:`${0.8+i*0.12}s`}}>{r}</span>
            ))}
          </div>

          <div className="hero-actions">
            <button className="cta-btn cta-primary" onClick={() => scrollTo(projRef)}>View Projects</button>
            <button className="cta-btn" onClick={() => scrollTo(contactRef)}>Get in Touch</button>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — STATS
      ══════════════════════════════════════════════════════ */}
      <section ref={statsRef} id="highlights" className="section stats-section">
        <div className="section-inner">
          <div className={`section-label ${statsActive?"label-in":""}`}>By the numbers</div>
          <h2 className={`section-h2 ${statsActive?"h2-in":""}`}>
            Work that <em>moves the needle</em>
          </h2>
          <div className="stats-grid">
            {STATS.map((s,i) => (
              <StatCard key={i} {...s} active={statsActive} delay={0.1+i*0.1} />
            ))}
          </div>

          {/* animated divider */}
          <div className={`divider-line ${statsActive?"divider-in":""}`} />

          {/* education strip */}
          <div className={`edu-strip ${statsActive?"edu-in":""}`}>
            <div className="edu-item" style={{animationDelay:"0.6s"}}>
              <span className="edu-year">2024 — 2026</span>
              <span className="edu-school">Arizona State University</span>
              <span className="edu-deg">MS Management of Technology · GPA 3.85</span>
            </div>
            <div className="edu-sep" />
            <div className="edu-item" style={{animationDelay:"0.75s"}}>
              <span className="edu-year">2021 — 2024</span>
              <span className="edu-school">Pillai College of Engineering</span>
              <span className="edu-deg">BTech, Mechanical Engineering</span>
            </div>
            <div className="edu-sep" />
            <div className="edu-item" style={{animationDelay:"0.9s"}}>
              <span className="edu-year">2018 — 2021</span>
              <span className="edu-school">Father Agnel Technical Complex</span>
              <span className="edu-deg">Diploma, Mechanical Engineering</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — EXPERIENCE
      ══════════════════════════════════════════════════════ */}
      <section ref={expRef} id="experience" className="section exp-section">
        <div className="exp-bg" aria-hidden="true">
          <div className="exp-scan" />
        </div>
        <div className="section-inner">
          <div className={`section-label ${expActive?"label-in":""}`}>Where I&apos;ve worked</div>
          <h2 className={`section-h2 ${expActive?"h2-in":""}`}>
            Real environments. <em>Real impact.</em>
          </h2>
          <div className="exp-list">
            {EXPERIENCE.map((e,i) => (
              <div key={i} className={`exp-card ${expActive?"exp-card-in":""}`}
                style={{animationDelay:`${0.2+i*0.18}s`}}>
                <div className="exp-left">
                  <div className="exp-period">{e.period}</div>
                  <div className="exp-co">{e.co}</div>
                  <div className="exp-role">{e.role}</div>
                </div>
                <div className="exp-right">
                  {e.pts.map((p,j) => (
                    <div key={j} className="exp-pt">
                      <span className="exp-dash">—</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — PROJECTS
      ══════════════════════════════════════════════════════ */}
      <section ref={projRef} id="projects" className="section proj-section">
        <div className="proj-bg" aria-hidden="true">
          {Array.from({length:8}).map((_,i)=>(
            <div key={i} className="proj-beam" style={{
              left:`${i*13}%`,
              animationDelay:`${i*0.4}s`,
              animationDuration:`${4+i*0.6}s`,
            }} />
          ))}
        </div>
        <div className="section-inner">
          <div className={`section-label ${projActive?"label-in":""}`}>Selected work</div>
          <h2 className={`section-h2 ${projActive?"h2-in":""}`}>
            10 projects. <em>Real outcomes.</em>
          </h2>
          <div className="proj-grid">
            {PROJECTS.map((p,i) => (
              <div key={i} className={`proj-card ${projActive?"proj-card-in":""}`}
                style={{animationDelay:`${0.05+i*0.07}s`}}>
                <div className="proj-num">{p.n}</div>
                <div className="proj-body">
                  <div className="proj-meta">{p.meta}</div>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-result">{p.result}</div>
                </div>
                <div className="proj-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — SKILLS
      ══════════════════════════════════════════════════════ */}
      <section ref={skillsRef} id="skills" className="section skills-section">
        <div className="section-inner">
          <div className={`section-label ${skillsActive?"label-in":""}`}>Expertise</div>
          <h2 className={`section-h2 ${skillsActive?"h2-in":""}`}>
            The <em>toolkit</em>
          </h2>
          <div className="skills-grid">
            {SKILLS.map((s,i) => (
              <div key={i} className={`skill-block ${skillsActive?"skill-in":""}`}
                style={{animationDelay:`${0.1+i*0.12}s`}}>
                <div className="skill-area">{s.area}</div>
                <div className="skill-items">
                  {s.items.map((item,j) => (
                    <span key={j} className="skill-tag"
                      style={{animationDelay:`${0.2+i*0.12+j*0.05}s`,
                        animation: skillsActive ? `tagPop 0.4s ${0.2+i*0.12+j*0.05}s cubic-bezier(0.34,1.56,0.64,1) both` : "none"
                      }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* certifications */}
          <div className={`cert-row ${skillsActive?"cert-in":""}`}>
            {["Six Sigma Green Belt","SOLIDWORKS Associate (CSWA)","Advanced Tableau Desktop","Project Management: Intl","Siemens Mobility PM Simulation"].map((c,i)=>(
              <div key={i} className="cert-badge" style={{animationDelay:`${0.7+i*0.08}s`}}>
                <span className="cert-check">✓</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — CONTACT
      ══════════════════════════════════════════════════════ */}
      <section ref={contactRef} id="contact" className="section contact-section">
        <div className="contact-bg" aria-hidden="true">
          <div className="contact-orb" />
        </div>
        <div className="section-inner contact-inner">
          <div className={`section-label ${contactActive?"label-in":""}`}>Let&apos;s connect</div>
          <h2 className={`section-h2 contact-h2 ${contactActive?"h2-in":""}`}>
            Open to <em>Summer 2026</em>
          </h2>
          <p className={`contact-note ${contactActive?"note-in":""}`}>
            Seeking roles in Project Management, Product Management, Industrial Engineering,
            and Business Analysis. Phoenix, AZ — open to relocation.
          </p>

          <div className={`contact-grid ${contactActive?"contact-grid-in":""}`}>
            <a href="mailto:pratham.bhilare1010@gmail.com" className="contact-card">
              <div className="cc-icon">✉</div>
              <div className="cc-label">Email</div>
              <div className="cc-val">pratham.bhilare1010@gmail.com</div>
            </a>
            <a href="tel:+14807425812" className="contact-card">
              <div className="cc-icon">☏</div>
              <div className="cc-label">Phone</div>
              <div className="cc-val">+1 (480) 742-5812</div>
            </a>
            <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="contact-card">
              <div className="cc-icon">in</div>
              <div className="cc-label">LinkedIn</div>
              <div className="cc-val">linkedin.com/in/prathambhilare</div>
            </a>
            <a href="https://github.com/bhilarepratham" target="_blank" rel="noreferrer" className="contact-card">
              <div className="cc-icon">⌥</div>
              <div className="cc-label">GitHub</div>
              <div className="cc-val">github.com/bhilarepratham</div>
            </a>
          </div>

          <div className={`contact-ctas ${contactActive?"ctas-in":""}`}>
            <a href="mailto:pratham.bhilare1010@gmail.com" className="cta-btn cta-primary">Email Pratham</a>
            <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="cta-btn">LinkedIn Profile</a>
          </div>
        </div>

        <div className="footer-strip">
          <span>© Pratham Ankush Bhilare · Phoenix, AZ</span>
          <span>Open to Summer 2026</span>
        </div>
      </section>

    </div>
  );
}
