"use client";

import { useEffect, useState } from "react";

const highlights = [
  {
    stat: "15%",
    title: "Logistics cost reduction",
    text: "AI-driven warehouse location optimization across 537 Amazon distribution centers outperformed Excel Solver by ~15–18% in weighted transport cost.",
  },
  {
    stat: "3.85",
    title: "GPA at ASU",
    text: "MS Management of Technology at Arizona State University's Ira A. Fulton Schools of Engineering, graduating May 2026.",
  },
  {
    stat: "$250K",
    title: "Project budget managed",
    text: "Led end-to-end planning for a $250,000 customer portal implementation with a 9-phase WBS and 210-day critical path.",
  },
  {
    stat: "20.34%",
    title: "Solar panel efficiency",
    text: "Improved PV panel efficiency from 18.22% to 20.34% through forced-air convection heat recovery — published as an engineering paper.",
  },
  {
    stat: "$100M",
    title: "Projected revenue model",
    text: "Designed operations and financial model for FlazzMart, a 15-minute grocery delivery startup projecting $100M revenue by Year 5.",
  },
  {
    stat: "42 yrs",
    title: "Econometric study",
    text: "Conducted a 42-year longitudinal OLS regression study (1980–2021) analyzing immigration's impact on GDP, unemployment, and personal income.",
  },
];

const education = [
  {
    year: "Aug 2024 — May 2026",
    school: "Ira A. Fulton Schools of Engineering, Arizona State University",
    degree: "Master of Science, Management of Technology. GPA: 3.85.",
  },
  {
    year: "2021 — 2024",
    school: "Pillai College of Engineering",
    degree: "Bachelor of Technology, Mechanical Engineering.",
  },
  {
    year: "2018 — 2021",
    school: "Father Agnel Technical Education Complex",
    degree: "Diploma of Education, Mechanical Engineering.",
  },
  {
    year: "2018",
    school: "Ryan International School, Navi Mumbai",
    degree: "10th standard foundation.",
  },
];

const experience = [
  {
    year: "May 2025 — Present",
    company: "Arizona State University · Graduate Teaching Assistant",
    desc: "Supporting graduate and undergraduate coursework in Industrial and Systems Engineering.",
    points: [
      "Evaluating assignments and providing feedback to maintain consistent grading standards across 50+ students.",
      "Coordinating Canvas workflows, communication, and confidential student data handling.",
      "Collaborating with faculty on rubrics and assessment criteria across enterprise modeling, quality management, and systems engineering.",
    ],
  },
  {
    year: "Jan 2024 — Apr 2024",
    company: "Tata Power · Mechanical Maintenance Intern",
    desc: "Supervised mechanical outage activities at Trombay Thermal Power Station (Unit 5: 500 MW & Unit 8: 250 MW) across a 14-week period.",
    points: [
      "Conducted routine inspections of boiler components — pulverisers, burners, air heaters, economizers — improving combustion efficiency.",
      "Implemented LOTO and Permit-to-Work procedures during equipment isolation, achieving zero safety incidents.",
      "Performed Job Safety Analysis (JSA) for confined space entry tasks and documented coal transportation workflows.",
    ],
  },
  {
    year: "Dec 2022 — Jan 2023",
    company: "Matharu Sons · Process Optimization Trainee",
    desc: "Participated in end-to-end fabrication of fuel tankers (500–25,000L capacity) using Mild Steel.",
    points: [
      "Operated 3-roller bending machines and performed MIG/CO₂ welding for structural joining of tanker shells and baffle plates.",
      "Performed hydrostatic pressure testing at 2,000 PSI to ensure structural integrity before dispatch.",
      "Assisted in a 5-stage surface finishing process: sandblasting → soldering → primer → basecoat → clearcoat.",
    ],
  },
  {
    year: "Jun 2020 — Jul 2020",
    company: "CIPET: Centre for Skilling & Technical Support · In-Plant Training",
    desc: "Completed foundational technical training in conventional tooling and manufacturing processes.",
    points: [
      "Studied lathe and milling operations, tool selection, and machining fundamentals.",
      "Learned safety protocols, maintenance principles, and precision measurement basics.",
    ],
  },
];

const projects = [
  {
    title: "Journey Air – Autonomous Airline Disruption Recovery",
    meta: "Product Development · B2B SaaS",
    result: "Honeywell Aerospace-sponsored platform targeting $4M–$10M annual revenue for a mid-size carrier.",
    desc: "Designed a white-label SDK using Google Flutter to automate flight rebooking, baggage rerouting, and lounge provisioning via a single-tap mobile interface. Built a 5-year financial model showing positive NPV and $54.75M in projected annual savings from a 2-minute boarding time reduction.",
    tags: ["Product Management", "Systems Engineering", "Financial Modeling", "B2B SaaS"],
    image: "/assets/Dashboard.jpg",
  },
  {
    title: "Strategic Market Intelligence Dashboard",
    meta: "Python · Data Engineering",
    result: "Scraped and aggregated real-time strategic data for 50+ publicly traded companies across 6 industries.",
    desc: "Built a Streamlit financial intelligence app with an SQLite relational database, dual data sourcing via Yahoo Finance API + BeautifulSoup web scraping, and interactive Plotly visualizations — all with a modular 5-file architecture and built-in rate limiting.",
    tags: ["Python", "Streamlit", "SQLite", "Market Intelligence", "Data Analysis"],
    image: "/assets/Dashboard.jpg",
  },
  {
    title: "AI-Powered Warehouse Location Optimization",
    meta: "Operations · Optimization",
    result: "Identified ~15–18% better cost efficiency over traditional solver approaches across 537 warehouses.",
    desc: "Benchmarked Gen AI grid search vs. Excel Solver (GRG Nonlinear) to minimize weighted transport cost across the Amazon distribution network. Identified southeast Missouri as the optimal placement node, validated via Python/Matplotlib geospatial visualization.",
    tags: ["AI", "Logistics", "Python", "Operations Research", "Process Optimization"],
    image: "/assets/analytics-table.png",
  },
  {
    title: "ERP Industry Strategic Analysis",
    meta: "Strategy · Market Research",
    result: "Delivered a 40-page analysis of a $64.83B market covering SAP, Oracle, and Workday.",
    desc: "Applied Porter's Five Forces, VRIO Framework, and Core Competence Theory across 10+ resources per company. Analyzed cloud ERP growth from $34.8B (2023) to a projected $123.42B by 2030 at 18% CAGR, with actionable recommendations on AI and cloud adoption strategy.",
    tags: ["Strategic Analysis", "VRIO", "Porter's Five Forces", "Market Research"],
    image: "/assets/analytics-table.png",
  },
  {
    title: "FlazzMart – 15-Minute Grocery Delivery Platform",
    meta: "Entrepreneurship · Business Model",
    result: "Modeled a path from $5M Year 1 revenue to $100M by Year 5 on a $3M seed ask.",
    desc: "Designed full-stack business plan including TAM/SAM/SOM sizing ($68.6B market by 2032), competitive benchmarking against Instacart (63% share), a $730 annual LTV model, and an AI-driven logistics architecture with MFCs and EV fleets for sub-15-minute delivery.",
    tags: ["Business Modeling", "Market Research", "Financial Forecasting", "Go-to-Market"],
    image: "/assets/flazzmart.png",
  },
  {
    title: "BYD Disruptive Innovation Strategy",
    meta: "Strategy · Competitive Analysis",
    result: "Analyzed BYD's rise to #1 EV seller globally, surpassing Tesla in Q4 2023.",
    desc: "Evaluated BYD's vertical integration, 20,000+ patent portfolio, $2.1B in Chinese government subsidies, and 880% UK sales growth. Scored innovation model across viability, feasibility, and financial opportunity dimensions; recommended global expansion as the highest-value next step.",
    tags: ["Disruptive Innovation", "Competitive Analysis", "IP Strategy", "EV Market"],
    image: "/assets/markstrat.png",
  },
  {
    title: "Customer Portal Implementation – Medical Products LLC",
    meta: "Project Management · Operations",
    result: "Led end-to-end planning for a $250,000 portal across a 12-month, 210-day critical path.",
    desc: "Built a 9-phase WBS in Microsoft Project with PERT estimation across 48 tasks. Identified 8 key risks (2 high-risk: Employee Turnover Rf=0.86, Learning Curve Rf=0.72) and designed a RAM mapping 9 deliverables across 7 roles with zero overlap.",
    tags: ["MS Project", "Risk Management", "WBS", "Stakeholder Management"],
    image: "/assets/markstrat.png",
  },
  {
    title: "VR Usability Testing – Water Purification Simulation",
    meta: "UX · Usability Research",
    result: "Identified 5 critical interaction issues; delivered 7 actionable UX recommendations.",
    desc: "Conducted task-based think-aloud usability testing on Meta Quest 2 (6DoF) across 6 structured scenarios. Evaluated all purification stages, confirmed 100% conceptual retention despite interface friction, and authored a full APA usability report with hardware comparison (Quest 2 vs. HTC Vive Pro).",
    tags: ["UX Research", "VR", "Usability Testing", "Think-Aloud Protocol"],
    image: "/assets/vr.jpg",
  },
  {
    title: "Heat Recovery from Solar Photovoltaic Panels",
    meta: "Research · Engineering",
    result: "Improved solar efficiency from 18.22% to 20.34% — published as a peer-reviewed paper.",
    desc: "Designed and fabricated a forced-air convection dryer powered by PV waste heat, reducing panel operating temperature by 3.82°C. Instrumented with 6 K-type thermocouples, a pyranometer, and NI DAQ hardware. Managed end-to-end execution including SolidWorks modelling within ₹7,020 budget.",
    tags: ["Research", "SolidWorks", "LabVIEW", "Data Analysis", "Thermodynamics"],
    image: "/assets/solar-dryer.png",
  },
  {
    title: "42-Year Immigration & U.S. Economy Study",
    meta: "Analytics · Econometrics",
    result: "R² = 0.998 income prediction model; identified GDP as dominant predictor (p = 1.02E-47).",
    desc: "Built a master dataset from 4 federal sources (DHS, BEA, FRED, Kaggle) with 42 observations. Applied OLS regression with train/test split and IQR outlier detection. Found immigration statistically insignificant (p > 0.05) across GDP, unemployment, and personal income outcomes.",
    tags: ["Python", "OLS Regression", "Excel", "Statistical Analysis", "Policy Research"],
    image: "/assets/image.png",
  },
];

const skills = [
  {
    title: "Project & Operations Management",
    text: "WBS, critical path, risk matrices, Kanban, Lean, Six Sigma, PERT estimation, process optimization.",
  },
  {
    title: "Data & Analytics",
    text: "OLS regression, time-series forecasting, Excel modeling, Tableau, Python (Pandas, NumPy, Matplotlib).",
  },
  {
    title: "Product & Strategy",
    text: "Business Model Canvas, Porter's Five Forces, VRIO, TAM/SAM/SOM, competitive benchmarking, go-to-market.",
  },
  {
    title: "Engineering Tools",
    text: "SolidWorks, Ansys, AnyLogic, LabVIEW, systems modeling, manufacturing fundamentals.",
  },
  {
    title: "Software & Platforms",
    text: "Microsoft Project, Streamlit, SQLite, yFinance, BeautifulSoup, Plotly, Google Flutter, VS Code.",
  },
  {
    title: "Soft Skills",
    text: "Cross-functional collaboration, technical documentation, stakeholder communication, academic instruction.",
  },
];

const certifications = [
  {
    name: "Six Sigma: Green Belt",
    body: "Professional Certification",
    desc: "Quality management and process improvement methodology.",
  },
  {
    name: "Project Management: International Projects",
    body: "Professional Certification",
    desc: "Global project coordination, compliance, and cross-cultural execution.",
  },
  {
    name: "SOLIDWORKS Associate (CSWA)",
    body: "Dassault Systèmes",
    desc: "Certified proficiency in 3D CAD design and modeling.",
  },
  {
    name: "Advanced Tableau Desktop",
    body: "Data Visualization",
    desc: "Advanced dashboard design and visual analytics workflows.",
  },
  {
    name: "Siemens Mobility – Commercial PM Job Simulation",
    body: "Forage / Siemens",
    desc: "Commercial project management in a mobility industry context.",
  },
];

const research = [
  {
    type: "Peer-reviewed publication",
    title: "Heat Recovery from Solar Photovoltaic Panels",
    desc: "Experimental study on improving PV efficiency through forced-air convection heat recovery. Panel efficiency improved from 18.22% to 20.34% through DC fan-driven air circulation. Designed and fabricated a compact agricultural dryer powered by PV waste heat.",
    tags: ["Solar Energy", "Thermodynamics", "SolidWorks", "LabVIEW", "NI DAQ"],
  },
  {
    type: "Academic / applied work",
    title: "ASEM vs. INCOSE Competency Framework Analysis",
    desc: "Comparative literature review of two major engineering professional societies across 4 peer-reviewed sources. Mapped 4 core competency domains across EMBoK and SECF, benchmarked 5 certification levels, and identified 3 strategic collaboration opportunities to address workforce gaps in socio-technical systems engineering.",
    tags: ["Systems Engineering", "INCOSE", "ASEM", "Competency Frameworks"],
  },
];

function SceneMarker({ num, label }: { num: string; label: string }) {
  return (
    <div className="scene-marker">
      <span className="scene-marker-text">
        <span className="scene-num">{num}</span>
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("main section, #home");
    const links = document.querySelectorAll(".nav a");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || "home";
            links.forEach((link) =>
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`
              )
            );
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => io.observe(section));

    const fades = document.querySelectorAll(".fade-in, .reveal");
    const fadeIO = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    fades.forEach((el) => fadeIO.observe(el));

    return () => {
      io.disconnect();
      fadeIO.disconnect();
    };
  }, []);

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="brand" href="#home" aria-label="Pratham Bhilare home">
            <div className="brand-mark">PB</div>
            <div className="brand-copy">
              <strong>Pratham Bhilare</strong>
              <span>Operations · Product · Analytics</span>
            </div>
          </a>

          <button
            className="nav-toggle"
            onClick={() => setNavOpen((v) => !v)}
            aria-expanded={navOpen}
            aria-controls="siteNav"
          >
            {navOpen ? "Close" : "Menu"}
          </button>

          <nav className={`nav ${navOpen ? "open" : ""}`} id="siteNav">
            <a href="#home" onClick={() => setNavOpen(false)}>Home</a>
            <a href="#highlights" onClick={() => setNavOpen(false)}>Highlights</a>
            <a href="#experience" onClick={() => setNavOpen(false)}>Experience</a>
            <a href="#projects" onClick={() => setNavOpen(false)}>Projects</a>
            <a href="#research" onClick={() => setNavOpen(false)}>Research</a>
            <a href="#skills" onClick={() => setNavOpen(false)}>Skills</a>
            <a href="#certifications" onClick={() => setNavOpen(false)}>Certifications</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
          </nav>
        </div>
      </header>

      <main id="home" className="wrap">

        {/* HERO */}
        <section className="hero fade-in">
          <div className="hero-eyebrow">
            Graduate Teaching Assistant @ ASU &nbsp;·&nbsp; MS Management of Technology &apos;26
          </div>

          <div className="hero-grid">
            <div className="hero-left">
              <h1>Pratham<br /><em>Bhilare</em></h1>
              <div className="hero-rule" />
              <p className="subhead">
                Industrial engineer and project-minded problem solver focused on
                process optimization, product thinking, and business analysis.
                Turning technical work into measurable outcomes through modeling,
                data analysis, and structured execution.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#projects">View selected work</a>
                <a className="btn" href="#experience">Experience</a>
                <a className="btn" href="mailto:pratham.bhilare1010@gmail.com">Get in touch</a>
              </div>
              <p className="hero-note">
                MS Management of Technology at Arizona State University (GPA 3.85),
                Bachelor&apos;s in Mechanical Engineering, and hands-on experience across
                power plant operations, fabrication, supply-chain optimization, and
                academic instruction. Open to Summer 2026 roles in Project Management,
                Product Management, Industrial Engineering, and Business Analysis.
              </p>
            </div>

            <div className="portrait-shell reveal">
              <div className="portrait-card">
                <div className="portrait-bar-top" />
                <div className="portrait">
                  <img src="/assets/portrait.jpg" alt="Portrait of Pratham Bhilare" />
                </div>
                <div className="portrait-bar-bottom" />
              </div>
            </div>
          </div>

          <div className="hero-strip" aria-hidden="true">
            <div className="hero-strip-track">
              {Array.from({ length: 2 }).flatMap((_, dupIndex) =>
                [
                  "Project management",
                  "Operations management",
                  "Process optimization",
                  "Data analysis",
                  "Lean systems",
                  "Business analysis",
                  "Product thinking",
                  "Six Sigma",
                  "Systems engineering",
                  "Financial modeling",
                ].map((word, index) => (
                  <span key={`${dupIndex}-${index}`}>{word}</span>
                ))
              )}
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section id="highlights" className="fade-in">
          <SceneMarker num="I" label="Highlights" />
          <h2>By the <em>numbers</em></h2>
          <div className="highlights-grid">
            {highlights.map((item) => (
              <div className="highlight-card reveal" key={item.title}>
                <div className="highlight-stat">{item.stat}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="fade-in">
          <SceneMarker num="II" label="Education" />
          <h2><em>Academic</em> background</h2>
          <div className="edu-list">
            {education.map((item) => (
              <article className="edu-card reveal" key={item.school}>
                <span className="year">{item.year}</span>
                <h3>{item.school}</h3>
                <p>{item.degree}</p>
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="fade-in">
          <SceneMarker num="III" label="Experience" />
          <h2>Where I&apos;ve <em>worked</em></h2>
          <div className="exp-list">
            {experience.map((job) => (
              <article className="exp-card reveal" key={job.company + job.year}>
                <span className="year">{job.year}</span>
                <div className="exp-right">
                  <h3>{job.company}</h3>
                  <p>{job.desc}</p>
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="fade-in">
          <SceneMarker num="IV" label="Projects" />
          <h2>Selected <em>work</em></h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <div className="project-media">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-body">
                  <div className="project-meta">{project.meta}</div>
                  <h3>{project.title}</h3>
                  <p className="project-result">{project.result}</p>
                  <p>{project.desc}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="fade-in">
          <SceneMarker num="V" label="Research & Publications" />
          <h2>Research &amp; <em>publications</em></h2>
          <div className="research-list">
            {research.map((item) => (
              <article className="research-card reveal" key={item.title}>
                <span className="year">{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="tag-row" style={{ marginTop: 16 }}>
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="fade-in">
          <SceneMarker num="VI" label="Skills" />
          <h2>Areas of <em>expertise</em></h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card reveal" key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="fade-in">
          <SceneMarker num="VII" label="Certifications" />
          <h2><em>Credentials</em> &amp; certifications</h2>
          <div className="cert-grid">
            {certifications.map((cert) => (
              <article className="cert-card reveal" key={cert.name}>
                <div className="cert-badge">&#10003;</div>
                <div className="cert-body">
                  <span className="year">{cert.body}</span>
                  <h3>{cert.name}</h3>
                  <p>{cert.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="fade-in">
          <SceneMarker num="VIII" label="Contact" />
          <h2>Get in <em>touch</em></h2>
          <div className="contact-card reveal">
            <div className="contact-left">
              <p>
                Currently seeking roles for Summer 2026 in Project Management,
                Product Management, Industrial Engineering, Manufacturing Engineering,
                and Business Analysis. Open to relocation and collaboration across
                technical and operations-focused teams.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="mailto:pratham.bhilare1010@gmail.com">Email Pratham</a>
                <a className="btn" href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                <a className="btn" href="#home">Back to top</a>
              </div>
            </div>
            <div className="contact-right">
              <strong>Contact details</strong>
              <div className="contact-links">
                <a href="tel:+14807425812">+1 (480) 742-5812</a>
                <a href="mailto:pratham.bhilare1010@gmail.com">pratham.bhilare1010@gmail.com</a>
                <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer noopener">linkedin.com/in/prathambhilare</a>
                <a href="https://github.com/bhilarepratham" target="_blank" rel="noreferrer noopener">github.com/bhilarepratham</a>
              </div>
            </div>
          </div>
        </section>

        <div className="footer">
          <span className="footer-text">&#169; Pratham Ankush Bhilare &nbsp;&middot;&nbsp; Phoenix, AZ &nbsp;&middot;&nbsp; Open to Summer 2026 roles</span>
        </div>
      </main>
    </>
  );
}
