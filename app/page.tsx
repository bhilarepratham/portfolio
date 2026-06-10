"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const PROJECTS = [
  { n:"01", category:"Product Development · B2B SaaS", title:"Journey Air", org:"Honeywell Aerospace · ASU TMC 593", kpi:"$54.75M", kpiLabel:"projected annual savings", summary:"Led product development for a Honeywell Aerospace-sponsored airline disruption recovery platform targeting U.S. Tier 1 & Tier 2 airlines with a $150M–$300M serviceable market.", deliverables:["Conducted 2 rounds of customer discovery interviews — synthesised into a Customer Journey Map and 6 behavioural personas, which directly reshaped the solution from 'information tool' to 'uncertainty eliminator'","Applied V-Model systems engineering across 4 platform modules: virtual queue, QR locking, bin tracking, and autonomous disruption engine","Built a 5-year financial model (18% discount rate, 3.5% inflation) — positive NPV across all scenarios, non-discounted payback at Year 3","Developed a B2B SaaS BMC with a 4-stream revenue model: implementation fees, usage-based SaaS ($2–$5 per disrupted passenger), performance earnings, and ecosystem commissions","Identified unoccupied whitespace — no existing solution combined full-journey coverage with autonomous execution"], tools:["Product Management","V-Model","Customer Discovery","Financial Modeling","B2B SaaS","BMC","Systems Engineering"] },
  { n:"02", category:"Project Management · $250K Budget", title:"Customer Portal Implementation", org:"Medical Products LLC", kpi:"210-day", kpiLabel:"critical path delivered on scope", summary:"Led end-to-end planning for a $250,000 customer portal using MS Project across a 12-month timeline with a 9-phase WBS and full risk framework.", deliverables:["Structured a 9-phase WBS with 48 tracked tasks and PERT-estimated durations — managed entirely in Microsoft Project","Quantitative risk assessment using Pf × Cf matrices — 8 risks identified, 2 classified high-risk: Employee Turnover (Rf=0.86) and Learning Curve (Rf=0.72)","Developed time-phased $250K budget across 7 phases — largest allocation ($90K) to backend/frontend and integration","RAM mapping 9 deliverables across 7 roles (PM, BA, UI/UX, Frontend, Backend, Security, Customer Service) with zero overlap","Designed 6-type communication framework using Zoom, Slack, JIRA, Google Meet, and Microsoft Teams"], tools:["MS Project","WBS","Risk Matrix","RAM","PERT","JIRA","Stakeholder Mgmt","Budget Planning"] },
  { n:"03", category:"Startup · Go-to-Market", title:"FlazzMart", org:"ASU TEM 501 Venture Project", kpi:"$100M", kpiLabel:"projected revenue by Year 5", summary:"Full-stack business plan for a 15-minute grocery delivery startup targeting Phoenix metro, projecting $3M seed with 5× ROI and break-even at Year 3.", deliverables:["TAM/SAM/SOM: U.S. online grocery delivery market at $68.6B by 2032; $40M SOM in Phoenix metro within 3 years","Competitive benchmarking vs Instacart (63% share), Amazon Fresh, Walmart Grocery — identified speed and sustainability as key differentiators","Multi-stream revenue model: delivery fees, subscriptions, vendor commissions, in-app ads — $730 annual LTV per customer","5-year financials with gross margins 55%→65%, break-even Year 3 through operational efficiencies","Proposed AI-driven MFC + EV fleet logistics architecture for sub-15-minute delivery"], tools:["TAM/SAM/SOM","GTM Strategy","Revenue Modeling","LTV","Competitive Analysis","Financial Forecasting","BMC"] },
  { n:"04", category:"Strategy · Market Research", title:"ERP Industry Analysis", org:"ASU Strategic Management of Technology", kpi:"$64.83B", kpiLabel:"market analysed", summary:"40-page strategic analysis of the global ERP market evaluating SAP, Oracle, and Workday (~44% combined market share).", deliverables:["VRIO analysis across 10+ resources per company — SAP's HANA and 440K-customer network identified as primary durable advantages","Benchmarked AI/cloud adoption: SAP 15% R&D (€1B+), Oracle autonomous infrastructure, Workday 17% YoY ML-driven growth","Modelled cloud ERP growth from $34.8B (2023) to $123.42B by 2030 at 18% CAGR","Mapped M&A activity (Oracle $10.3B PeopleSoft, Workday's Adaptive Insights) and cloud partnerships (Azure, AWS, Google Cloud)"], tools:["Porter's Five Forces","VRIO","RBV","Core Competence Theory","Market Sizing","Competitive Strategy"] },
  { n:"05", category:"Operations · AI Optimisation", title:"Warehouse AI Optimizer", org:"Enterprise Operations — Amazon Network", kpi:"15–18%", kpiLabel:"cost reduction vs baseline", summary:"AI grid search model identifying optimal warehouse location across 537 Amazon distribution centers — outperforming Excel Solver by 15–18%.", deliverables:["Gen AI grid search identified southeast Missouri (37.53°N, 89.06°W) as optimal site, minimising weighted transport cost to ~29.8M units vs Solver's ~35.2M","Designed 7-step Excel Solver workflow (GRG Nonlinear) as baseline: Lewellen, Nebraska at 35.2M units","Applied prompt engineering for data cleaning, custom distance formula, and weighted cost minimisation","Visualised 537-node warehouse network geospatially (Python/Matplotlib) — top 10 cost contributors identified"], tools:["AI Optimisation","Python","Prompt Engineering","Excel Solver","Geospatial Analysis","Operations Research"] },
  { n:"06", category:"Disruptive Innovation", title:"BYD Global Strategy", org:"Team Strategy Project", kpi:"9.5/10", kpiLabel:"innovation score", summary:"Analysed BYD's rise to #1 global EV seller — 526,409 BEV sales vs Tesla's 484,507 in Q4 2023.", deliverables:["Evaluated 20,000+ patent portfolio and 138+ trademarks — mapped global filing strategy across US, EU, China, South Korea","Analysed $2.1B Chinese government subsidies (2022) as structural cost advantage","Innovation scores: Viability 10/10, Leadership 10/10, Feasibility 9/10, Financial Opportunity 9/10","Identified 880% UK sales growth as primary international expansion signal — recommended global urban market entry"], tools:["Disruptive Innovation Framework","IP Strategy","SWOT","BMC","Financial Benchmarking","USPTO Patent Mapping"] },
  { n:"07", category:"Analytics · Econometrics", title:"42-Year Immigration & Economy Study", org:"Data-Driven Decision Making · ASU", kpi:"R²=0.998", kpiLabel:"income prediction model accuracy", summary:"42-year longitudinal OLS regression study (1980–2021) analysing immigration's impact on U.S. GDP growth, unemployment, and personal income.", deliverables:["Merged 4 federal sources (DHS, BEA, FRED, Kaggle) — 42 annual observations, IQR outlier detection, derived variables","Income prediction model: R²=0.998 training, 16% MAPE on 2016–2021 test window — GDP Nominal dominant predictor (p=1.02E-47)","86%/14% train-test split with time-series validation to prevent COVID-era data leakage","Finding: 1M-person net immigration increase shifts GDP growth by only 0.0025 percentage points"], tools:["OLS Regression","Python","Pandas","Excel","Time-Series Analysis","Federal Databases"] },
  { n:"08", category:"UX Research", title:"VR Usability Testing", org:"Water Purification Simulation · ASU TWC 544", kpi:"100%", kpiLabel:"conceptual retention despite friction", summary:"Task-based think-aloud usability testing of educational VR simulation on Meta Quest 2 (6DoF) — 5 critical issues identified, 7 recommendations delivered.", deliverables:["6 structured task scenarios covering all purification stages: sedimentation, chlorination, ozonation, ultrafiltration, UV disinfection","5 critical issues: joystick sensitivity failure, menu navigation glitches, targeting ambiguity, range limitations, onboarding friction","100% conceptual retention across all participants despite significant interface friction","7 recommendations: haptic feedback, targeting assist, text-to-speech, remappable controls, simplified menus, progress indicators, tutorial redesign","Full APA usability report with hardware comparison: Meta Quest 2 vs HTC Vive Pro"], tools:["Think-Aloud Protocol","Meta Quest 2","Qualitative Coding","APA Documentation"] },
];

const EXPERIENCE = [
  { period:"May 2025 – May 2026", company:"Arizona State University", role:"Graduate Teaching Assistant", location:"Tempe, AZ", courses:"IEE 530 – Enterprise Modeling · IEE 554 – Risk Management · IEE 556 – Intro to Systems Engineering · IEE 552 – Strategic Technologic Planning · IEE 477 – System Dynamics and Thinking · IEE 571 – Quality Management", points:["Supported coursework operations for 50+ undergraduate and graduate students across Systems Engineering, Enterprise Modeling, and Quality Management courses","Collaborated with faculty to standardise grading rubrics and assessment processes, maintaining academic integrity across multiple courses","Managed Canvas LMS workflows, student communications, and confidential academic records across 6+ technical courses","Strengthened stakeholder communication and workflow coordination in a fast-paced university environment"], tools:"Canvas LMS · Excel · Microsoft Office" },
  { period:"Jan 2024 – Apr 2024", company:"Tata Power", role:"Mechanical Maintenance Engineer Intern", location:"Chembur, Maharashtra, India", courses:"", points:["Conducted preventive maintenance inspections across critical power plant equipment (boilers, pulverisers, burners, air heaters, economisers) at 500 MW + 250 MW units","Collaborated with maintenance teams to identify root causes of equipment failures and implement corrective actions using data-driven methods","Documented maintenance procedures, inspection reports, and operational metrics supporting continuous improvement and team training","Implemented LOTO and Permit-to-Work procedures during all equipment isolation — zero safety incidents across 14 weeks"], tools:"Excel · Maintenance Documentation Systems · Preventive Maintenance Procedures" },
  { period:"Dec 2022 – Jan 2023", company:"Matharu Sons", role:"Process Optimization Trainee", location:"Navi Mumbai, India", courses:"", points:["Managed design and fabrication coordination for 3 fuel dispenser truck projects (500–25,000L), ensuring on-time delivery meeting client specs","Improved manufacturing workflow safety measures and process controls — 100% compliance with industry safety standards","Coordinated cross-functional fabrication teams to monitor progress, resolve production issues, and maintain delivery schedules","Performed hydrostatic pressure testing at 2,000 PSI and 5-stage surface finishing (sandblasting → soldering → primer → basecoat → clearcoat)"], tools:"Excel · SolidWorks · Process Mapping · Quality Control Methods" },
  { period:"Jun 2020 – Jul 2020", company:"CIPET: Centre for Skilling & Technical Support", role:"Industrial In-Plant Training", location:"Navi Mumbai, India", courses:"", points:["Built foundational manufacturing and machining knowledge through hands-on training in lathe and milling operations, tooling selection, and production safety","Learned quality control procedures, precision measurement techniques, and standard manufacturing workflows","Demonstrated adaptability and self-driven learning through technical training during the COVID-19 period"], tools:"Conventional Machining · Precision Measurement · Manufacturing Safety" },
];

const EDUCATION = [
  { period:"Aug 2024 – May 2026", institution:"Arizona State University — Ira A. Fulton Schools of Engineering", degree:"Master of Science, Management of Technology", detail:"GPA 3.85 · Operations · Project Management · Product Strategy · Data Analytics" },
  { period:"2021 – 2024", institution:"Pillai College of Engineering", degree:"Bachelor of Technology, Mechanical Engineering", detail:"Navi Mumbai, India" },
  { period:"2018 – 2021", institution:"Father Agnel Technical Education Complex", degree:"Diploma of Education, Mechanical Engineering", detail:"Navi Mumbai, India" },
  { period:"2018", institution:"Ryan International School", degree:"10th Standard", detail:"Navi Mumbai, India" },
];

const SKILLS = [
  { area:"Delivery & Planning", tags:["Work Breakdown Structure","Critical Path Method","PERT Estimation","Gantt Charts","Milestone Tracking","Risk Matrix","Stakeholder Mapping","MS Project","JIRA"] },
  { area:"Product & Strategy", tags:["Product Roadmapping","Business Model Canvas","TAM / SAM / SOM","Go-to-Market","User Stories","OKRs","Porter's Five Forces","VRIO Framework","Competitive Analysis"] },
  { area:"Operations & Quality", tags:["Operations Management","Quality Management","Process Optimization","Lean Manufacturing","Six Sigma (Green Belt)","DMAIC","Bottleneck Analysis","Kanban","AnyLogic"] },
  { area:"Data & Analytics", tags:["OLS Regression","Time-Series Forecasting","Python · Pandas · NumPy","Tableau","Excel Modeling","KPI Dashboards","Data Cleaning & EDA"] },
  { area:"Tools & Platforms", tags:["MS Project","JIRA","Tableau","AnyLogic","SolidWorks","Python","Streamlit","Canvas LMS","Flutter","LabVIEW","VS Code","SQLite"] },
];

const CERTS = [
  { name:"Six Sigma: Green Belt",                       issuer:"Professional Certification",       year:"2024" },
  { name:"SOLIDWORKS Associate (CSWA)",                 issuer:"Dassault Systèmes",                year:"2023" },
  { name:"Advanced Tableau Desktop",                    issuer:"Data Visualization Certification",  year:"2024" },
  { name:"Project Management: International Projects",  issuer:"Professional Certification",       year:"2024" },
  { name:"Siemens Mobility — Commercial PM Simulation", issuer:"Forage / Siemens",                 year:"2024" },
];

const RESEARCH = [
  { type:"Peer-Reviewed Publication", venue:"Undergraduate Engineering Research", title:"Heat Recovery from Solar Photovoltaic Panels", abstract:"Designed and fabricated a solar PV heat recovery system with forced-air convection dryer — improved panel efficiency from 18.22% to 20.34%, reducing operating temperature by 3.82°C. Dried 110g of fenugreek from 84% to 16.19% moisture in 6 hours. Instrumented with 6 K-type thermocouples, pyranometer, and NI DAQ hardware with LabVIEW. Full project executed including SolidWorks modelling within a ₹7,020 budget.", tags:["Solar Energy","Thermodynamics","SolidWorks","LabVIEW","NI DAQ","Forced Convection"] },
  { type:"Comparative Literature Review", venue:"Systems Engineering · ASU", title:"ASEM vs. INCOSE: Bridging the Competency Gap", abstract:"Comparative review of ASEM and INCOSE across 4 peer-reviewed sources analysing competency frameworks, certification pathways, and standardisation. Mapped 4 competency domains across EMBoK and SECF, benchmarked 5 certification levels (AEM, PEM vs. ASEP, CSEP, ESEP), and identified 3 strategic collaboration opportunities to address workforce gaps in socio-technical systems engineering.", tags:["Systems Engineering","INCOSE","ASEM","EMBoK","SECF","Competency Frameworks"] },
];

/* ══════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════ */
function useReveal(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [ref, threshold]);
  return on;
}

/* Word-by-word text that fades white as it enters viewport */
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when element top is at bottom of viewport, 1 when element bottom is at 30% from top
      const start = vh * 0.9;
      const end   = vh * 0.3;
      const pos   = rect.top;
      const r     = Math.min(1, Math.max(0, (start - pos) / (start - end)));
      setRatio(r);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={{ display:"inline" }}>
      {words.map((w, i) => {
        const threshold = i / words.length;
        const lit = ratio > threshold;
        return (
          <span key={i} style={{
            color: lit ? "#f5f5f7" : "#3a3a3c",
            transition: "color 0.4s cubic-bezier(0.4,0,0.2,1)",
            marginRight: "0.28em",
            display: "inline-block",
          }}>{w}</span>
        );
      })}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════ */
export default function Home() {
  const [scrollY,  setScrollY]  = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeS,  setActiveS]  = useState(0);
  const [navBlur,  setNavBlur]  = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProj, setOpenProj] = useState<number|null>(null);
  const [openExp,  setOpenExp]  = useState<number|null>(null);

  const secHero     = useRef<HTMLElement>(null);
  const secAbout    = useRef<HTMLElement>(null);
  const secProj     = useRef<HTMLElement>(null);
  const secSkills   = useRef<HTMLElement>(null);
  const secResearch = useRef<HTMLElement>(null);
  const secContact  = useRef<HTMLElement>(null);
  const allRefs     = [secHero, secAbout, secProj, secSkills, secResearch, secContact];
  const NAV = ["Home","About","Projects","Skills","Research","Contact"];

  const aboutOn    = useReveal(secAbout);
  const projOn     = useReveal(secProj);
  const skillsOn   = useReveal(secSkills);
  const researchOn = useReveal(secResearch);
  const contactOn  = useReveal(secContact);

  useEffect(() => {
    const fn = () => {
      const sy = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollY(sy);
      setNavBlur(sy > 20);
      setProgress(max > 0 ? sy / max : 0);
      allRefs.forEach((r, i) => {
        const el = r.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= 0) setActiveS(i);
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <div className="site">

      {/* ── PROGRESS ── */}
      <div className="prog-bar"><div className="prog-fill" style={{ width:`${progress*100}%` }}/></div>

      {/* ── NAV ── */}
      <header className={`nav ${navBlur?"nav-blur":""}`}>
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => go(secHero)}>Pratham Bhilare</button>
          <nav className={`nav-links ${menuOpen?"open":""}`}>
            {NAV.map((n,i) => (
              <button key={i} className={`nav-link ${activeS===i?"active":""}`}
                onClick={() => go(allRefs[i])}>{n}</button>
            ))}
          </nav>
          <div className="nav-right">
            <a href="/assets/pratham_Bhilare_Resume.pdf" target="_blank" rel="noreferrer" className="nav-resume">Resume</a>
            <a href="mailto:pratham.bhilare1010@gmail.com" className="nav-hire">Hire me</a>
            <button className="nav-burger" onClick={() => setMenuOpen(v=>!v)} aria-label="Menu">
              <span className={menuOpen?"x":""}/><span className={menuOpen?"x":""}/>
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          HERO — sticky photo with text over it
      ════════════════════════════════════════════════════ */}
      <section ref={secHero} className="hero">
        {/* Parallax photo */}
        <div className="hero-photo-layer" style={{ transform:`translateY(${scrollY*0.08}px)` }}>
          <img src="/assets/portrait.jpeg" alt="Pratham Bhilare" className="hero-img"/>
          <div className="hero-fade"/>
        </div>

        {/* Hero copy */}
        <div className="hero-body">
          <p className="hero-label">MS Management of Technology · ASU | Operations & Project Management</p>
          <h1 className="hero-name">Pratham<br/>Bhilare.</h1>
          <p className="hero-titles">Project Manager&nbsp;·&nbsp;Product Manager&nbsp;·&nbsp;Operations Analyst</p>
          <p className="hero-tagline">
            I build roadmaps that ship,<br/>
            strategies that convert,<br/>
            and models that answer.
          </p>
          <div className="hero-actions">
            <button className="btn-solid" onClick={() => go(secProj)}>View Projects</button>
            <a href="/assets/pratham_Bhilare_Resume.pdf" target="_blank" rel="noreferrer" className="btn-outline">Download Resume</a>
            <button className="btn-text" onClick={() => go(secContact)}>Get in touch ›</button>
          </div>
          <p className="hero-avail"><span className="avail-dot"/>Open to Summer 2026 · Phoenix, AZ</p>
        </div>

        <div className="hero-scroll-cue">
          <div className="scroll-bar"/><span>Scroll</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ABOUT — word-by-word text reveal (Apple style)
      ════════════════════════════════════════════════════ */}
      <section ref={secAbout} className="section about-section">
        <div className={`s-wrap ${aboutOn?"in":""}`}>

          {/* Large word-reveal statement — the Apple signature */}
          <div className="about-statement">
            <p className="reveal-text">
              <WordReveal text="I've always been interested in one question: why do some systems perform better than others?" />
            </p>
            <p className="reveal-text" style={{ marginTop:"1.2em" }}>
              <WordReveal text="That curiosity led me into manufacturing, operations, and project execution — where small process gaps create major inefficiencies in cost, quality, and delivery. Instead of just identifying problems, I focus on improving them." />
            </p>
            <p className="reveal-text" style={{ marginTop:"1.2em" }}>
              <WordReveal text="My experience spans process optimisation, systems thinking, product development, and cross-functional project coordination across both academic and industry environments." />
            </p>
          </div>

          {/* Experience */}
          <h3 className="sub-head">Experience</h3>
          <div className="exp-list">
            {EXPERIENCE.map((e,i) => (
              <div key={i} className={`exp-card ${openExp===i?"exp-open":""}`} style={{ transitionDelay:`${i*0.07}s` }}>
                <button className="exp-trigger" onClick={() => setOpenExp(openExp===i?null:i)}>
                  <div className="exp-tl">
                    <span className="exp-period">{e.period}</span>
                    <span className="exp-co">{e.company}</span>
                    <span className="exp-role">{e.role} · {e.location}</span>
                  </div>
                  <span className={`exp-chev ${openExp===i?"open":""}`}>+</span>
                </button>
                {openExp===i && (
                  <div className="exp-expand">
                    {e.courses && <div className="exp-meta-row"><span className="exp-meta-k">Courses</span><span className="exp-meta-v">{e.courses}</span></div>}
                    <ul className="exp-bullets">{e.points.map((pt,j) => <li key={j}>{pt}</li>)}</ul>
                    <div className="exp-meta-row"><span className="exp-meta-k">Tools</span><span className="exp-meta-v">{e.tools}</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <h3 className="sub-head" style={{ marginTop:64 }}>Education</h3>
          <div className="edu-table">
            {EDUCATION.map((e,i) => (
              <div key={i} className="edu-row" style={{ transitionDelay:`${0.3+i*0.07}s` }}>
                <span className="edu-period">{e.period}</span>
                <div className="edu-body">
                  <span className="edu-inst">{e.institution}</span>
                  <span className="edu-deg">{e.degree}</span>
                  <span className="edu-detail">{e.detail}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PROJECTS — staggered slide-up (Apple product grid)
      ════════════════════════════════════════════════════ */}
      <section ref={secProj} className="section proj-section">
        <div className={`s-wrap ${projOn?"in":""}`}>
          <div className="s-chip">Selected Work</div>
          <h2 className="s-h2">8 projects.<br/><span className="h2-dim">Real outcomes.</span></h2>
          <p className="s-sub">Tap any project to expand full scope, deliverables, and tools.</p>

          <div className="proj-list">
            {PROJECTS.map((p,i) => (
              <div key={i} className={`proj-row ${projOn?"prow-in":""} ${openProj===i?"prow-open":""}`}
                style={{ transitionDelay:`${i*0.055}s` }}>
                <button className="proj-trigger" onClick={() => setOpenProj(openProj===i?null:i)}>
                  <span className="pt-n">{p.n}</span>
                  <div className="pt-mid">
                    <span className="pt-title">{p.title}</span>
                    <span className="pt-cat">{p.category}</span>
                  </div>
                  <span className="pt-kpi">{p.kpi}</span>
                  <span className={`pt-icon ${openProj===i?"open":""}`}>+</span>
                </button>
                {openProj===i && (
                  <div className="proj-body">
                    <div className="pb-kpi-block">
                      <span className="pb-kpi-num">{p.kpi}</span>
                      <span className="pb-kpi-desc">{p.kpiLabel}</span>
                    </div>
                    <p className="pb-org">{p.org}</p>
                    <p className="pb-summary">{p.summary}</p>
                    <div className="pb-label">Key Deliverables</div>
                    <ul className="pb-bullets">{p.deliverables.map((d,j) => <li key={j}>{d}</li>)}</ul>
                    <div className="pb-label">Tools & Frameworks</div>
                    <div className="pb-tools">{p.tools.map((t,j) => <span key={j} className="pb-tool">{t}</span>)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SKILLS — scale-in grid (Apple spec table style)
      ════════════════════════════════════════════════════ */}
      <section ref={secSkills} className="section skills-section">
        <div className={`s-wrap ${skillsOn?"in":""}`}>
          <div className="s-chip">PM Toolkit</div>
          <h2 className="s-h2">Built for delivery.<br/><span className="h2-dim">Proven in the field.</span></h2>

          <div className="skills-grid">
            {SKILLS.map((s,i) => (
              <div key={i} className={`skill-card ${skillsOn?"sk-in":""}`} style={{ transitionDelay:`${i*0.08}s` }}>
                <div className="skill-area">{s.area}</div>
                <div className="skill-tags">
                  {s.tags.map((t,j) => (
                    <span key={j} className={`skill-tag ${skillsOn?"tag-in":""}`}
                      style={{ transitionDelay:`${0.1+i*0.07+j*0.025}s` }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-head" style={{ marginTop:64 }}>Certifications</h3>
          <div className="cert-table">
            {CERTS.map((c,i) => (
              <div key={i} className={`cert-row ${skillsOn?"cert-in":""}`} style={{ transitionDelay:`${0.4+i*0.07}s` }}>
                <span className="cert-check">✓</span>
                <div className="cert-body">
                  <span className="cert-name">{c.name}</span>
                  <span className="cert-issuer">{c.issuer} · {c.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          RESEARCH
      ════════════════════════════════════════════════════ */}
      <section ref={secResearch} className="section">
        <div className={`s-wrap ${researchOn?"in":""}`}>
          <div className="s-chip">Research & Publications</div>
          <h2 className="s-h2">Academic work.<br/><span className="h2-dim">Real application.</span></h2>
          <div className="research-list">
            {RESEARCH.map((r,i) => (
              <div key={i} className={`research-card ${researchOn?"rc-in":""}`} style={{ transitionDelay:`${i*0.14}s` }}>
                <div className="rc-type">{r.type}</div>
                <div className="rc-venue">{r.venue}</div>
                <h3 className="rc-title">{r.title}</h3>
                <p className="rc-abstract">{r.abstract}</p>
                <div className="rc-tags">{r.tags.map((t,j) => <span key={j} className="rc-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════════════════ */}
      <section ref={secContact} className="section contact-section">
        <div className={`s-wrap contact-wrap ${contactOn?"in":""}`}>
          <div className="s-chip">Let&apos;s Talk</div>
          <h2 className="contact-h2">Open to<br/>Summer 2026.</h2>
          <p className="contact-note">
            Seeking Project Manager, Product Manager, Industrial Engineering, and Business Analysis roles.
            Ready to own a roadmap, drive delivery, and build something worth shipping.
            Open to relocation from Phoenix, AZ.
          </p>
          <div className="contact-grid">
            {[
              { label:"Email",    val:"pratham.bhilare1010@gmail.com", href:"mailto:pratham.bhilare1010@gmail.com", link:true },
              { label:"Phone",    val:"+1 (480) 742-5812",              href:"tel:+14807425812",                    link:false },
              { label:"LinkedIn", val:"linkedin.com/in/prathambhilare", href:"https://www.linkedin.com/in/prathambhilare", link:true },
              { label:"GitHub",   val:"github.com/bhilarepratham",      href:"https://github.com/bhilarepratham",   link:true },
            ].map((c,i) => (
              <a key={i} href={c.href} target={c.href.startsWith("http")?"_blank":undefined}
                rel="noreferrer" className="contact-block">
                <div className="cb-label">{c.label}</div>
                <div className={`cb-val ${c.link?"cb-link":""}`}>{c.val}</div>
              </a>
            ))}
          </div>
          <div className="contact-actions">
            <a href="mailto:pratham.bhilare1010@gmail.com" className="btn-solid">Email Pratham</a>
            <a href="/assets/pratham_Bhilare_Resume.pdf" target="_blank" rel="noreferrer" className="btn-outline">Download Resume</a>
            <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="btn-text">LinkedIn ›</a>
          </div>
        </div>
        <footer className="footer">
          <span>© Pratham Ankush Bhilare · Phoenix, AZ</span>
          <span>MS Management of Technology · ASU · Open to Summer 2026</span>
        </footer>
      </section>

    </div>
  );
}
