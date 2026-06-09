"use client";
import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════
   DATA — complete, PM/Product-focused
══════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    n: "01",
    category: "Product Development · B2B SaaS",
    title: "Journey Air",
    org: "Honeywell Aerospace · ASU TMC 593",
    kpi: "$54.75M",
    kpiLabel: "projected annual savings for a mid-size carrier",
    summary: "Led product development for a Honeywell Aerospace-sponsored airline disruption recovery platform. Designed a white-label SDK targeting U.S. Tier 1 & Tier 2 airlines with a $150M–$300M serviceable market.",
    deliverables: [
      "Conducted 2 rounds of customer discovery interviews — synthesised into a Customer Journey Map and 6 behavioural personas, which directly reshaped the solution from 'information tool' to 'uncertainty eliminator'",
      "Applied V-Model systems engineering to define functional and non-functional requirements across 4 platform modules: virtual queue, QR locking, bin tracking, and autonomous disruption engine",
      "Built a 5-year financial model (18% discount rate, 3.5% inflation) — positive NPV across all scenarios, non-discounted payback at Year 3",
      "Developed a B2B SaaS Business Model Canvas with a 4-stream revenue model: implementation fees, usage-based SaaS ($2–$5 per disrupted passenger), performance earnings, and ecosystem commissions",
      "Identified an unoccupied whitespace — no existing solution (Delta, United, Amadeus, SITA) combined full-journey coverage with autonomous execution",
    ],
    tools: ["Product Management","V-Model","Customer Discovery","Financial Modeling","B2B SaaS","BMC","Systems Engineering"],
  },
  {
    n: "02",
    category: "Project Management · $250K Budget",
    title: "Customer Portal Implementation",
    org: "Medical Products LLC",
    kpi: "210-day",
    kpiLabel: "critical path delivered on scope",
    summary: "Led end-to-end planning for a $250,000 customer portal using MS Project across a 12-month timeline. Defined WBS, risk matrices, RAM, and a full communication framework.",
    deliverables: [
      "Structured a 9-phase WBS with 48 tracked tasks and PERT-estimated durations (e.g. backend development at 31 days) — managed entirely in Microsoft Project",
      "Conducted quantitative risk assessment using Pf × Cf matrices — identified 8 risks, classified 2 as high-risk: Employee Turnover (Rf = 0.86) and Learning Curve (Rf = 0.72), each with tailored mitigation",
      "Developed time-phased $250K budget across 7 phases — largest allocation ($90K) to backend/frontend development and system integration",
      "Built a RAM mapping 9 deliverables across 7 roles (PM, BA, UI/UX, Frontend, Backend, Security, Customer Service) with zero role overlap",
      "Designed 6-type communication framework: weekly task updates, milestone meetings, crisis response protocols — using Zoom, Slack, JIRA, Google Meet, and Microsoft Teams",
      "Established 7 milestone checkpoints from January through November, monitored via MS Project and Google Sheets",
    ],
    tools: ["MS Project","WBS","Risk Matrix","RAM","PERT","JIRA","Stakeholder Mgmt","Budget Planning"],
  },
  {
    n: "03",
    category: "Startup · Go-to-Market Strategy",
    title: "FlazzMart",
    org: "ASU TEM 501 Venture Project",
    kpi: "$100M",
    kpiLabel: "projected revenue by Year 5",
    summary: "Designed a full-stack business plan for a 15-minute grocery delivery startup targeting urban U.S. markets, projecting a $3M seed round with a 5× ROI and break-even at Year 3.",
    deliverables: [
      "Conducted TAM/SAM/SOM analysis — U.S. online grocery delivery market at $68.6B by 2032; realistic $40M SOM in Phoenix metro within 3 years",
      "Competitive benchmarking against Instacart (63% market share), Amazon Fresh, and Walmart Grocery — identified differentiation opportunities in speed, local sourcing, and sustainability",
      "Developed a multi-stream revenue model: delivery fees, subscriptions, vendor commissions, in-app advertising — projecting $730 annual LTV and $3,650 over a 5-year customer lifecycle",
      "Modelled 5-year financials including revenue, expenses, net profit, and gross margins (55%→65%), forecasting break-even at Year 3 through operational efficiencies",
      "Proposed AI-driven logistics architecture integrating micro-fulfillment centers (MFCs) and electric vehicle fleets to achieve sub-15-minute delivery and reduce carbon footprint",
    ],
    tools: ["TAM/SAM/SOM","GTM Strategy","Revenue Modeling","LTV","Competitive Analysis","Financial Forecasting","BMC"],
  },
  {
    n: "04",
    category: "Strategy · Market Research",
    title: "ERP Industry Strategic Analysis",
    org: "ASU Strategic Management of Technology",
    kpi: "$64.83B",
    kpiLabel: "global ERP market size analysed",
    summary: "Delivered a 40-page strategic analysis of the global ERP market evaluating SAP, Oracle, and Workday — representing ~44% combined market share.",
    deliverables: [
      "Applied VRIO analysis across 10+ organisational resources per company — identified SAP's HANA in-memory database and 440,000-customer network as primary sources of durable differentiation",
      "Benchmarked AI and cloud adoption strategies: SAP at 15% R&D (€1B+), Oracle with multi-billion autonomous infrastructure, Workday at 17% YoY revenue growth via ML-native architecture",
      "Modelled cloud ERP market growth from $34.8B (2023) to projected $123.42B by 2030 at 18% CAGR — mapped deployment trends, enterprise size segmentation, and vertical adoption patterns",
      "Mapped corporate-level strategies including vertical integration depth, M&A activity (Oracle $10.3B PeopleSoft, Workday's Adaptive Insights), and cloud partnerships (Azure, AWS, Google Cloud)",
    ],
    tools: ["Porter's Five Forces","VRIO","RBV","Core Competence Theory","Market Sizing","Competitive Strategy"],
  },
  {
    n: "05",
    category: "Operations · AI Optimisation",
    title: "Warehouse AI Optimizer",
    org: "Enterprise Operations Analysis — Amazon Network",
    kpi: "15–18%",
    kpiLabel: "cost reduction vs Excel Solver baseline",
    summary: "Engineered an AI grid search model to identify the optimal warehouse location across 537 Amazon distribution centers — outperforming traditional solver methods by a quantified 15–18%.",
    deliverables: [
      "Built a Gen AI-powered grid search model processing latitude/longitude and shipment volume data at scale — identified southeast Missouri (37.53°N, 89.06°W) as optimal site",
      "Minimised total weighted transport cost to ~29.8M units vs Excel Solver's ~35.2M (GRG Nonlinear with Multistart) — a 15–18% improvement",
      "Designed and executed a 7-step Excel Solver workflow as a baseline comparison, arriving at Lewellen, Nebraska (41.32°N, 102.11°W)",
      "Applied prompt engineering to guide ChatGPT through data cleaning, custom distance formula (D = 69 x sqrt[(lat1-lat2)^2 + (lon1-lon2)^2]), and weighted cost minimisation",
      "Visualised the 537-node warehouse network geospatially using Python (Matplotlib) — identified the top 10 highest-cost warehouse contributors driving the central placement decision",
    ],
    tools: ["AI Optimisation","Python","Prompt Engineering","Excel Solver","Geospatial Analysis","Operations Research"],
  },
  {
    n: "06",
    category: "Disruptive Innovation · Competitive Analysis",
    title: "BYD Global Strategy",
    org: "Team Strategy Project",
    kpi: "9.5/10",
    kpiLabel: "innovation score across all evaluation dimensions",
    summary: "Analysed BYD's rise to the world's largest EV seller, surpassing Tesla in Q4 2023 — mapping competitive moats through vertical integration, IP strategy, and government subsidy structures.",
    deliverables: [
      "Documented BYD's Q4 2023 milestone: 526,409 BEV sales vs Tesla's 484,507 — identified vertical integration and IP portfolio as the primary structural advantages",
      "Evaluated a 20,000+ patent portfolio and 138+ trademarks — mapped global patent filing strategy across the US, EU, China, and South Korea with cross-licensing implications",
      "Analysed $2.1B in Chinese government subsidies (2022) as a structural cost advantage underpinning BYD's low-price, high-volume strategy",
      "Scored innovation model across multi-dimensional framework: Viability 10/10, Leadership Support 10/10, Feasibility 9/10, Financial Opportunity 9/10",
      "Identified 880% UK sales growth and dense urban EV adoption as the primary international expansion vector — recommended global urban market entry as highest-value next step",
    ],
    tools: ["Disruptive Innovation Framework","IP Strategy","SWOT","BMC","Financial Benchmarking","USPTO Patent Mapping"],
  },
  {
    n: "07",
    category: "Analytics · Econometrics",
    title: "42-Year Immigration & Economy Study",
    org: "Data-Driven Decision Making · ASU",
    kpi: "R² = 0.998",
    kpiLabel: "income prediction model accuracy",
    summary: "Conducted a 42-year longitudinal OLS regression study (1980–2021) analysing immigration's impact on U.S. GDP growth, unemployment, and personal income across 3 econometric models.",
    deliverables: [
      "Engineered a master dataset by merging 4 federal sources (DHS, BEA, FRED, Kaggle) with 42 annual observations — cleaned with IQR outlier detection and derived variables (Net Immigration, Income Growth, lagged predictors)",
      "Built a personal income prediction model achieving R² = 0.998 on training data and 16% MAPE on out-of-sample test data (2016–2021) — GDP Nominal identified as dominant predictor (p = 1.02E-47)",
      "Applied 86%/14% train-test split with time-series validation to prevent data leakage across a COVID-era test window",
      "Generated correlation matrix revealing near-perfect GDP–Personal Income collinearity (r = 0.998) and near-zero immigration–unemployment correlation (r = 0.098)",
      "Policy-facing finding: a 1M-person increase in net immigration shifts GDP growth by only 0.0025 percentage points — supporting evidence-based over politically-driven narratives",
    ],
    tools: ["OLS Regression","Python","Pandas","Excel","Time-Series Analysis","Train-Test Split","Federal Databases"],
  },
  {
    n: "08",
    category: "UX Research",
    title: "VR Usability Testing",
    org: "Water Purification Simulation · ASU TWC 544",
    kpi: "100%",
    kpiLabel: "conceptual retention despite interface friction",
    summary: "Conducted task-based think-aloud usability testing of an educational VR simulation on Meta Quest 2 (1832×1920 per-eye, 6DoF) — identified 5 critical issues and delivered 7 actionable recommendations.",
    deliverables: [
      "Designed and ran 6 structured task scenarios covering all purification stages: sedimentation, chlorination, ozonation, ultrafiltration, UV disinfection",
      "Identified 5 critical interaction issues: joystick sensitivity failure, menu navigation glitches, weapon range limitations, targeting ambiguity, and onboarding friction",
      "Confirmed 100% conceptual retention across all participants despite significant interface friction — demonstrating content effectiveness independent of UX quality",
      "Delivered 7 recommendations: haptic feedback integration, targeting-assist mechanics, text-to-speech, remappable controls, simplified menus, progress indicators, and tutorial redesign",
      "Authored a full APA usability report with participant scripts, observational coding, and hardware comparison (Meta Quest 2 vs. HTC Vive Pro) to justify platform selection",
    ],
    tools: ["Think-Aloud Protocol","Meta Quest 2","Qualitative Coding","APA Documentation","Comparative Hardware Analysis"],
  },
];

const EXPERIENCE = [
  {
    period: "May 2025 – May 2026",
    company: "Arizona State University",
    role: "Graduate Teaching Assistant",
    location: "Tempe, AZ",
    courses: "IEE 530 – Enterprise Modeling · IEE 554 – Risk Management · IEE 556 – Intro to Systems Engineering · IEE 552 – Strategic Technologic Planning · IEE 477 – System Dynamics and Thinking · IEE 571 – Quality Management",
    points: [
      "Supported coursework operations for 50+ undergraduate and graduate students across Systems Engineering, Enterprise Modeling, and Quality Management courses, improving assignment turnaround and grading consistency through structured evaluation workflows",
      "Collaborated with faculty to standardise grading rubrics and assessment processes, helping improve evaluation accuracy and maintain academic integrity across multiple courses",
      "Managed Canvas LMS workflows, student communications, and confidential academic records while consistently meeting strict academic deadlines across 6+ technical courses",
      "Strengthened stakeholder communication and workflow coordination skills by supporting cross-functional academic operations in a fast-paced university environment",
    ],
    tools: "Canvas LMS · Excel · Microsoft Office",
  },
  {
    period: "Jan 2024 – Apr 2024",
    company: "Tata Power",
    role: "Mechanical Maintenance Engineer Intern",
    location: "Chembur, Maharashtra, India",
    courses: "",
    points: [
      "Conducted preventive maintenance inspections across critical power plant equipment (boilers, pulverisers, burners, air heaters, economisers), helping improve operational reliability and reduce the risk of unplanned downtime",
      "Collaborated with maintenance teams to identify root causes of equipment failures and implement corrective actions using data-driven troubleshooting methods",
      "Documented maintenance procedures, inspection reports, and operational metrics — creating process records that supported continuous improvement initiatives and team training",
      "Implemented Lockout/Tagout (LOTO) and Permit-to-Work (PTW) procedures during all equipment isolation events, achieving zero safety incidents across the full 14-week engagement",
      "Contributed to safe plant operations (500 MW + 250 MW units) by following industrial safety protocols and identifying maintenance process improvement opportunities",
    ],
    tools: "Excel · Maintenance Documentation Systems · Preventive Maintenance Procedures",
  },
  {
    period: "Dec 2022 – Jan 2023",
    company: "Matharu Sons",
    role: "Process Optimization Trainee",
    location: "Navi Mumbai, India",
    courses: "",
    points: [
      "Managed design and fabrication coordination for 3 fuel dispenser truck projects (500–25,000L capacity), ensuring on-time delivery while meeting client specifications and quality standards",
      "Improved manufacturing workflow safety measures and process controls, contributing to 100% compliance with industry safety and operational standards",
      "Coordinated cross-functional fabrication teams to monitor project progress, resolve production issues, and maintain delivery schedules",
      "Supported process optimisation initiatives by identifying operational bottlenecks and implementing workflow improvements across fabrication activities",
      "Performed hydrostatic pressure testing at 2,000 PSI and 5-stage surface finishing (sandblasting → soldering → primer → basecoat → clearcoat)",
    ],
    tools: "Excel · SolidWorks · Process Mapping · Quality Control Methods",
  },
  {
    period: "Jun 2020 – Jul 2020",
    company: "CIPET: Centre for Skilling & Technical Support",
    role: "Industrial In-Plant Training",
    location: "Navi Mumbai, India",
    courses: "",
    points: [
      "Built foundational manufacturing and machining knowledge through hands-on training in lathe and milling operations, tooling selection, and production safety practices",
      "Learned quality control procedures, precision measurement techniques, and standard manufacturing workflows used in industrial environments",
      "Completed technical training demonstrating adaptability and self-driven learning across conventional machining concepts and manufacturing safety practices",
    ],
    tools: "Conventional Machining Concepts · Precision Measurement · Manufacturing Safety Practices",
  },
];

const EDUCATION = [
  {
    period: "Aug 2024 – May 2026",
    institution: "Arizona State University — Ira A. Fulton Schools of Engineering",
    degree: "Master of Science, Management of Technology",
    detail: "GPA 3.83 · Focus: Operations, Project Management, Product Strategy, Data Analytics",
  },
  {
    period: "2021 – 2024",
    institution: "Pillai College of Engineering",
    degree: "Bachelor of Technology, Mechanical Engineering",
    detail: "Navi Mumbai, India",
  },
  {
    period: "2018 – 2021",
    institution: "Father Agnel Technical Education Complex",
    degree: "Diploma of Education, Mechanical Engineering",
    detail: "Navi Mumbai, India",
  },
  {
    period: "2018",
    institution: "Ryan International School",
    degree: "10th Standard",
    detail: "Navi Mumbai, India",
  },
];

const NUMBERS = [
  { val: "3.85",   label: "GPA at ASU",               detail: "Ira A. Fulton Schools of Engineering" },
  { val: "$250K",  label: "Project Budget Managed",    detail: "End-to-end from WBS to delivery" },
  { val: "10+",    label: "Projects Delivered",        detail: "PM · Product · Data · Engineering" },
  { val: "15–18%", label: "Cost Reduction Achieved",   detail: "AI vs baseline logistics optimisation" },
  { val: "$54.75M",label: "Value Created",             detail: "Projected annual airline savings" },
  { val: "0",      label: "Safety Incidents",          detail: "14 weeks · 750 MW at Tata Power" },
];

const SKILLS = [
  {
    area: "Delivery & Planning",
    tags: ["Work Breakdown Structure","Critical Path Method","PERT Estimation","Gantt Charts","Milestone Tracking","Risk Matrix","Stakeholder Mapping","MS Project","JIRA"],
  },
  {
    area: "Product & Strategy",
    tags: ["Product Roadmapping","Business Model Canvas","TAM / SAM / SOM","Go-to-Market","User Stories","OKRs","Porter's Five Forces","VRIO Framework","Competitive Analysis"],
  },
  {
    area: "Operations & Quality",
    tags: ["Operations Management","Quality Management","Process Optimization","Lean Manufacturing","Six Sigma (Green Belt)","DMAIC","Bottleneck Analysis","Kanban"],
  },
  {
    area: "Data & Analytics",
    tags: ["OLS Regression","Time-Series Forecasting","Python (Pandas · NumPy)","Tableau","Excel Modeling","KPI Dashboards","A/B Testing Principles","Data Cleaning"],
  },
  {
    area: "Tools & Platforms",
    tags: ["MS Project","JIRA","Tableau","AnyLogic","SolidWorks","Python","Streamlit","Canvas LMS","Flutter","LabVIEW","VS Code","SQLite"],
  },
];

const CERTS = [
  { name: "Six Sigma: Green Belt",                        issuer: "Professional Certification",      year: "2024" },
  { name: "SOLIDWORKS Associate (CSWA)",                  issuer: "Dassault Systèmes",               year: "2023" },
  { name: "Advanced Tableau Desktop",                     issuer: "Data Visualization Certification", year: "2024" },
  { name: "Project Management: International Projects",   issuer: "Professional Certification",      year: "2024" },
  { name: "Siemens Mobility — Commercial PM Simulation",  issuer: "Forage / Siemens",                year: "2024" },
];

const RESEARCH = [
  {
    type: "Peer-Reviewed Publication",
    title: "Heat Recovery from Solar Photovoltaic Panels",
    venue: "Undergraduate Engineering Research",
    abstract: "Designed and fabricated a solar PV heat recovery system integrating a forced-air convection dryer. Improved panel efficiency from 18.22% to 20.34% through DC fan-driven air circulation, reducing operating temperature by 3.82°C. Built a compact agricultural dryer (50×50×28 cm) that dried 110g of fenugreek from 84% to 16.19% moisture content in 6 hours while preserving colour. Instrumented with 6 K-type thermocouples, a pyranometer, and NI DAQ hardware with LabVIEW data acquisition. Project executed end-to-end including SolidWorks modelling within a ₹7,020 budget.",
    tags: ["Solar Energy","Thermodynamics","SolidWorks","LabVIEW","NI DAQ","Forced Convection"],
  },
  {
    type: "Comparative Literature Review",
    title: "ASEM vs. INCOSE: Bridging the Competency Gap",
    venue: "Systems Engineering · ASU",
    abstract: "Conducted a comparative literature review of ASEM and INCOSE across 4 peer-reviewed sources, analysing competency frameworks, certification pathways, and global standardisation contributions. Mapped 4 core competency domains across EMBoK and SECF, benchmarked 5 certification levels (AEM, PEM vs. ASEP, CSEP, ESEP), and identified 3 strategic collaboration opportunities — joint academic programming, cross-certification pathways, and hybrid professional development — to address workforce gaps in socio-technical systems engineering.",
    tags: ["Systems Engineering","INCOSE","ASEM","EMBoK","SECF","Competency Frameworks"],
  },
];

/* ── INTERSECTION REVEAL HOOK ─────────────────────────── */
function useReveal(ref: React.RefObject<HTMLElement | null>, threshold = 0.12) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return on;
}

/* ── APP ──────────────────────────────────────────────── */
export default function Home() {
  const [scrollY,  setScrollY]  = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeS,  setActiveS]  = useState(0);
  const [navBlur,  setNavBlur]  = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProj, setOpenProj] = useState<number|null>(null);
  const [openExp,  setOpenExp]  = useState<number|null>(null);

  const secHero    = useRef<HTMLElement>(null);
  const secAbout   = useRef<HTMLElement>(null);
  const secNumbers = useRef<HTMLElement>(null);
  const secProj    = useRef<HTMLElement>(null);
  const secSkills  = useRef<HTMLElement>(null);
  const secResearch= useRef<HTMLElement>(null);
  const secContact = useRef<HTMLElement>(null);
  const allRefs    = [secHero, secAbout, secNumbers, secProj, secSkills, secResearch, secContact];
  const NAV = ["Home","About","Numbers","Projects","Skills","Research","Contact"];

  const aboutOn    = useReveal(secAbout);
  const numbersOn  = useReveal(secNumbers);
  const projOn     = useReveal(secProj);
  const skillsOn   = useReveal(secSkills);
  const researchOn = useReveal(secResearch);
  const contactOn  = useReveal(secContact);

  useEffect(() => {
    const fn = () => {
      const sy  = window.scrollY;
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

  const go = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site">

      {/* ── PROGRESS BAR ── */}
      <div className="prog-bar"><div className="prog-fill" style={{ width:`${progress*100}%` }} /></div>

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
            <a href="mailto:pratham.bhilare1010@gmail.com" className="nav-hire">Hire me</a>
            <button className="nav-burger" onClick={() => setMenuOpen(v=>!v)} aria-label="Menu">
              <span className={menuOpen?"x":""}/>
              <span className={menuOpen?"x":""}/>
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section ref={secHero} className="hero">
        <div className="hero-photo-layer"
          style={{ transform:`translateY(${scrollY*0.08}px)` }}>
          <img src="/assets/portrait.jpeg" alt="Pratham Bhilare" className="hero-img" />
          <div className="hero-fade" />
        </div>

        <div className="hero-body">
          <p className="hero-label">MS Management of Technology · ASU | Operations & Project Management Professional | Process Optimization</p>
          <h1 className="hero-name">Pratham<br/>Bhilare.</h1>
          <p className="hero-titles">Project Manager&nbsp;·&nbsp;Product Manager&nbsp;·&nbsp;Operations Analyst</p>
          <p className="hero-bio">
            I build roadmaps that ship, strategies that convert, and data models that answer.
            <br/>Phoenix, AZ — open to Summer 2026 and relocation.
          </p>
          <div className="hero-actions">
            <button className="btn-solid" onClick={() => go(secProj)}>View Projects</button>
            <a href="/assets/pratham_Bhilare_Resume.pdf" target="_blank" rel="noreferrer" className="btn-solid btn-resume">Download Resume ↓</a>
            <button className="btn-link" onClick={() => go(secContact)}>Get in touch ›</button>
          </div>
          <p className="hero-avail"><span className="avail-dot"/>Open to Summer 2026 roles</p>
        </div>

        <div className="hero-scroll-cue">
          <div className="scroll-bar"/>
          <span>Scroll</span>
        </div>
      </section>

      {/* ════════════════════════════════
          ABOUT
      ════════════════════════════════ */}
      <section ref={secAbout} className="section">
        <div className={`s-wrap ${aboutOn?"in":""}`}>

          <div className="s-chip">About</div>
          <h2 className="s-h2">Engineering roots.<br/>Management edge.</h2>

          <div className="about-bio">
            <p>I&apos;ve always been interested in one question: why do some systems perform better than others? That curiosity led me into manufacturing, operations, and project execution — where I saw how small process gaps could create major inefficiencies in cost, quality, and delivery.</p>
            <p>Instead of just identifying problems, I focus on improving them. I helped improve solar panel efficiency from 18.22% to 20.34% through a redesigned heat recovery system. I used operational analysis to identify warehouse optimisation opportunities projected to reduce costs by 15%. I&apos;ve also led projects in rapid delivery operations, cross-functional product development, and large-scale data analysis — the focus is always the same: improve performance with practical, measurable solutions.</p>
            <p>My experience spans manufacturing operations, process optimisation, systems thinking, and project coordination across both academic and industry environments. What drives me is bridging technical thinking with business impact — using data, process improvement, and collaboration to help teams work more efficiently and make better decisions.</p>
          </div>

          {/* ── Experience ── */}
          <h3 className="sub-head">Experience</h3>
          <div className="exp-list">
            {EXPERIENCE.map((e,i) => (
              <div key={i} className={`exp-card ${openExp===i?"exp-open":""}`}
                style={{ transitionDelay:`${i*0.09}s` }}>
                <button className="exp-trigger" onClick={() => setOpenExp(openExp===i?null:i)}>
                  <div className="exp-trigger-left">
                    <span className="exp-period">{e.period}</span>
                    <span className="exp-co">{e.company}</span>
                    <span className="exp-role">{e.role} · {e.location}</span>
                  </div>
                  <span className={`exp-chevron ${openExp===i?"open":""}`}>+</span>
                </button>
                {openExp===i && (
                  <div className="exp-expand">
                    {e.courses && (
                      <div className="exp-courses">
                        <span className="exp-courses-label">Courses supported</span>
                        <span className="exp-courses-val">{e.courses}</span>
                      </div>
                    )}
                    <ul className="exp-bullets">
                      {e.points.map((pt,j) => <li key={j}>{pt}</li>)}
                    </ul>
                    {e.tools && (
                      <div className="exp-tools-row">
                        <span className="exp-tools-label">Tools</span>
                        <span className="exp-tools-val">{e.tools}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Education ── */}
          <h3 className="sub-head" style={{marginTop:56}}>Education</h3>
          <div className="edu-table">
            {EDUCATION.map((e,i) => (
              <div key={i} className="edu-row" style={{ transitionDelay:`${0.3+i*0.08}s` }}>
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

      {/* ════════════════════════════════
          NUMBERS
      ════════════════════════════════ */}
      <section ref={secNumbers} className="section numbers-section">
        <div className={`s-wrap ${numbersOn?"in":""}`}>
          <div className="s-chip">By the Numbers</div>
          <h2 className="s-h2">Work that moves<br/>the needle.</h2>
          <div className="numbers-grid">
            {NUMBERS.map((n,i) => (
              <div key={i} className={`num-card ${numbersOn?"in":""}`}
                style={{ transitionDelay:`${i*0.1}s` }}>
                <div className="num-val">{n.val}</div>
                <div className="num-label">{n.label}</div>
                <div className="num-detail">{n.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROJECTS
      ════════════════════════════════ */}
      <section ref={secProj} className="section">
        <div className={`s-wrap ${projOn?"in":""}`}>
          <div className="s-chip">Selected Work</div>
          <h2 className="s-h2">8 projects.<br/>Real outcomes.</h2>
          <p className="s-sub">Tap any project to expand full scope, deliverables, and tools used.</p>

          <div className="proj-list">
            {PROJECTS.map((p,i) => (
              <div key={i}
                className={`proj-row ${projOn?"in":""} ${openProj===i?"proj-row-open":""}`}
                style={{ transitionDelay:`${i*0.06}s` }}>

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
                    {/* KPI callout */}
                    <div className="pb-kpi-block">
                      <span className="pb-kpi-num">{p.kpi}</span>
                      <span className="pb-kpi-desc">{p.kpiLabel}</span>
                    </div>

                    {/* Organisation */}
                    <p className="pb-org">{p.org}</p>

                    {/* Summary */}
                    <p className="pb-summary">{p.summary}</p>

                    {/* Deliverables */}
                    <div className="pb-section-label">Key Deliverables</div>
                    <ul className="pb-bullets">
                      {p.deliverables.map((d,j) => <li key={j}>{d}</li>)}
                    </ul>

                    {/* Tools */}
                    <div className="pb-section-label">Tools & Frameworks</div>
                    <div className="pb-tools">
                      {p.tools.map((t,j) => <span key={j} className="pb-tool">{t}</span>)}
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
      <section ref={secSkills} className="section numbers-section">
        <div className={`s-wrap ${skillsOn?"in":""}`}>
          <div className="s-chip">PM Toolkit</div>
          <h2 className="s-h2">Built for delivery.<br/>Proven in the field.</h2>

          <div className="skills-grid">
            {SKILLS.map((s,i) => (
              <div key={i} className={`skill-card ${skillsOn?"in":""}`}
                style={{ transitionDelay:`${i*0.1}s` }}>
                <div className="skill-area">{s.area}</div>
                <div className="skill-tags">
                  {s.tags.map((t,j) => (
                    <span key={j} className={`skill-tag ${skillsOn?"tag-in":""}`}
                      style={{ transitionDelay:`${0.15+i*0.08+j*0.03}s` }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <h3 className="sub-head" style={{marginTop:64}}>Certifications</h3>
          <div className="cert-table">
            {CERTS.map((c,i) => (
              <div key={i} className={`cert-row ${skillsOn?"in":""}`}
                style={{ transitionDelay:`${0.5+i*0.07}s` }}>
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

      {/* ════════════════════════════════
          RESEARCH
      ════════════════════════════════ */}
      <section ref={secResearch} className="section">
        <div className={`s-wrap ${researchOn?"in":""}`}>
          <div className="s-chip">Research & Publications</div>
          <h2 className="s-h2">Academic work.<br/>Real application.</h2>

          <div className="research-list">
            {RESEARCH.map((r,i) => (
              <div key={i} className={`research-card ${researchOn?"in":""}`}
                style={{ transitionDelay:`${i*0.14}s` }}>
                <div className="rc-type">{r.type}</div>
                <div className="rc-venue">{r.venue}</div>
                <h3 className="rc-title">{r.title}</h3>
                <p className="rc-abstract">{r.abstract}</p>
                <div className="rc-tags">
                  {r.tags.map((t,j) => <span key={j} className="rc-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CONTACT
      ════════════════════════════════ */}
      <section ref={secContact} className="section contact-section">
        <div className={`s-wrap ${contactOn?"in":""}`}>
          <div className="s-chip">Let&apos;s Talk</div>
          <h2 className="contact-h2">Open to<br/>Summer 2026.</h2>
          <p className="contact-note">
            Seeking Project Manager, Product Manager, Industrial Engineering,
            and Business Analysis roles. Ready to own a roadmap, drive delivery,
            and build something worth shipping. Open to relocation from Phoenix, AZ.
          </p>

          <div className="contact-info">
            <div className="contact-block">
              <div className="cb-label">Email</div>
              <a href="mailto:pratham.bhilare1010@gmail.com" className="cb-val cb-link">
                pratham.bhilare1010@gmail.com
              </a>
            </div>
            <div className="contact-block">
              <div className="cb-label">Phone</div>
              <a href="tel:+14807425812" className="cb-val">+1 (480) 742-5812</a>
            </div>
            <div className="contact-block">
              <div className="cb-label">LinkedIn</div>
              <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="cb-val cb-link">
                linkedin.com/in/prathambhilare ↗
              </a>
            </div>
            <div className="contact-block">
              <div className="cb-label">GitHub</div>
              <a href="https://github.com/bhilarepratham" target="_blank" rel="noreferrer" className="cb-val cb-link">
                github.com/bhilarepratham ↗
              </a>
            </div>
          </div>

          <div className="contact-actions">
            <a href="mailto:pratham.bhilare1010@gmail.com" className="btn-solid">Email Pratham</a>
            <a href="/assets/pratham_Bhilare_Resume.pdf" target="_blank" rel="noreferrer" className="btn-solid btn-resume">Download Resume ↓</a>
            <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer" className="btn-link">LinkedIn Profile ›</a>
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
