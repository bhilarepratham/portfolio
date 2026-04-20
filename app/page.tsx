"use client";

import { useEffect, useState } from "react";

const tickerWords = [
  "Project management",
  "Operations management",
  "Process optimization",
  "Data analysis",
  "Lean systems",
  "Business analysis",
  "Product thinking",
  "Six Sigma",
];

const highlights = [
  {
    stat: "15%",
    title: "Cost reduction",
    text: "Used AI-driven warehouse location analysis to identify a more efficient logistics setup and reduce expected costs.",
  },
  {
    stat: "20.34%",
    title: "Solar efficiency",
    text: "Improved the performance of a solar PV heat recovery concept from 18.22% to 20.34% through engineering analysis.",
  },
  {
    stat: "$100M",
    title: "Scalable business model",
    text: "Built an operational model for a 15-minute grocery delivery platform with a revenue projection through 2029.",
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
      "Evaluating assignments and providing feedback to maintain consistent grading standards.",
      "Coordinating Canvas workflows, communication, and confidential student data handling.",
      "Collaborating with faculty on rubrics and assessment criteria to improve academic integrity.",
      "Supporting 50+ students across enterprise modeling, quality management, and systems engineering.",
    ],
  },
  {
    year: "Jan 2024 — Apr 2024",
    company: "TATA Power · Mechanical Maintenance Engineer Intern",
    desc: "Worked in power-plant operations with daily inspections, preventive maintenance, and troubleshooting support.",
    points: [
      "Performed inspections to reduce unplanned downtime risk and improve operational reliability.",
      "Documented procedures and inspection findings for better continuity and training.",
      "Supported corrective actions through data-driven troubleshooting.",
    ],
  },
  {
    year: "Dec 2022 — Jan 2023",
    company: "Matharu Sons · Process Optimization Trainee",
    desc: "Managed fabrication and process coordination on fuel dispenser truck projects.",
    points: [
      "Oversaw design and layout for three fabrication projects from planning to delivery.",
      "Improved workflows and safety measures to achieve full compliance with standards.",
      "Coordinated with cross-functional fabrication teams to meet schedule and quality requirements.",
    ],
  },
  {
    year: "Jun 2020 — Jul 2020",
    company: "CIPET: Centre for Skilling & Technical Support · Industrial In-Plant Training",
    desc: "Completed foundational technical training in conventional tooling and manufacturing processes.",
    points: [
      "Studied lathe and milling operations, tool selection, and machining fundamentals.",
      "Learned safety protocols, maintenance principles, and precision measurement basics.",
    ],
  },
];

const projects = [
  {
    title: "Strategic Market Intelligence Web Scraping Application",
    meta: "Python · Market intelligence",
    result: "Built a Python app that converts scattered public company data into strategic insight.",
    desc: "Automated scraping, cleaning, comparison, and visualization for competitive analysis and market intelligence workflows.",
    tags: ["Python", "Competitive Strategy", "Market Intelligence", "Data Analysis"],
    image: "/assets/dashboard.jpg"
  },
  {
    title: "AI-Powered Warehouse Location Optimization",
    meta: "Operations · Optimization",
    result: "Identified an approach that achieved around 15% better cost efficiency.",
    desc: "Compared AI-based modeling with manual solver approaches to create a logistics plan that scales more effectively.",
    tags: ["AI", "Logistics", "Enterprise Operations", "Process Optimization"],
    image: "/assets/analytics-table.png",
  },
  {
    title: "FlazzMart – Grocery Delivery Platform",
    meta: "Entrepreneurship · Business model",
    result: "Designed a 15-minute grocery delivery model with a detailed growth story.",
    desc: "Built market sizing and financial assumptions for a micro-fulfillment concept centered on faster delivery and lower operational friction.",
    tags: ["Business Modeling", "Market Research", "Financial Forecasting", "Project Management"],
    image: "/assets/flazzmart.png",
  },
  {
    title: "Markstrat Business Simulation Project",
    meta: "Simulation · B2B growth",
    result: "Drove simulated B2B growth to $18M in revenue with an SPI of 438.",
    desc: "Used pricing, promotion, inventory, and R&D allocation decisions to improve awareness, sales, and market position.",
    tags: ["Strategic Planning", "Market Analysis", "Data Analysis", "Process Optimization"],
    image: "/assets/markstrat.png",
  },
  {
    title: "VR Usability Testing",
    meta: "UX · Virtual reality",
    result: "Converted participant feedback into concrete usability fixes for a learning experience.",
    desc: "Observed button sensitivity, feedback clarity, and flow issues using think-aloud testing and direct user observation.",
    tags: ["UX", "Usability Testing", "Documentation", "VR"],
    image: "/assets/vr.jpg",
  },
  {
    title: "Heat Recovery from Solar Photovoltaic Panels",
    meta: "Research · Engineering",
    result: "Improved solar system efficiency from 18.22% to 20.34%.",
    desc: "Led data collection and analysis on a solar heat recovery concept and published the work as an engineering paper.",
    tags: ["Research", "Process Optimization", "Data Analysis", "Engineering"],
    image: "/assets/solar-dryer.png",
  },
  {
    title: "Meal Packing Kanban Analysis",
    meta: "Operations · Inventory planning",
    result: "Calculated a 29% safety stock requirement using Kanban analysis.",
    desc: "Applied lean planning methods to improve inventory control and operational readiness in meal packing operations.",
    tags: ["Kanban", "Lean Systems", "Inventory Planning", "Operations"],
    image: "/assets/analytics-table.png",
  },
  {
    title: "42-Year Economic Data Analysis",
    meta: "Analytics · Business insight",
    result: "Analyzed 42 years of economic data to support decision-making.",
    desc: "Worked with long-term data patterns to connect technical analysis with business and strategic interpretation.",
    tags: ["Data Analysis", "Economic Trends", "Business Analysis", "Visualization"],
    image: "/assets/image.jpg"
  },
];

const skills = [
  {
    title: "Operations",
    text: "Operations Management, Quality Management, Process Optimization, Kanban, Lean thinking.",
  },
  {
    title: "Analytics",
    text: "Excel, Tableau, data analysis, strategic modeling, performance measurement.",
  },
  {
    title: "Engineering Tools",
    text: "SolidWorks, Ansys, AnyLogic, systems modeling, manufacturing fundamentals.",
  },
  {
    title: "Product / PM",
    text: "Project coordination, cross-functional collaboration, documentation, stakeholder communication.",
  },
];

const certifications = [
  "Project Management: International Projects",
  "Six Sigma: Green Belt",
  "SOLIDWORKS Associate",
  "Siemens Mobility - Commercial Project Manager Job Simulation",
  "Advanced Tableau Desktop",
];

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
            Menu
          </button>

          <nav className={`nav ${navOpen ? "open" : ""}`} id="siteNav">
            <a href="#home" onClick={() => setNavOpen(false)}>Home</a>
            <a href="#highlights" onClick={() => setNavOpen(false)}>Highlights</a>
            <a href="#education" onClick={() => setNavOpen(false)}>Education</a>
            <a href="#experience" onClick={() => setNavOpen(false)}>Experience</a>
            <a href="#research" onClick={() => setNavOpen(false)}>Research</a>
            <a href="#skills" onClick={() => setNavOpen(false)}>Skills</a>
            <a href="#projects" onClick={() => setNavOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
          </nav>
        </div>
      </header>

      <main id="home" className="wrap">
        <section className="hero fade-in">
          <div className="hero-panel reveal">
            <div className="hero-grid">
              <div>
                <div className="eyebrow">
                  Graduate Teaching Assistant @ ASU · MS Management of Technology ’26
                </div>
                <h1>Pratham Bhilare</h1>
                <p className="subhead">
                  Industrial engineer and project-minded problem solver focused on
                  process optimization, product thinking, and business analysis.
                  I turn technical work into measurable outcomes through modeling,
                  data analysis, and structured execution.
                </p>
                <div className="hero-actions">
                  <a className="btn primary" href="#projects">
                    View selected work
                  </a>
                  <a className="btn" href="#experience">
                    See experience
                  </a>
                </div>
                <div className="hero-note">
                  MS Management of Technology at Arizona State University with a
                  3.85 GPA, a Bachelor’s in Mechanical Engineering, and hands-on
                  experience in process improvement, fabrication coordination,
                  supply-chain thinking, and academic instruction. Open to Summer
                  2026 roles in Project Management, Product Management, Industrial
                  Engineering, Manufacturing Engineering, and Business Analysis.
                </div>
              </div>

              <div className="portrait-shell">
                <div className="portrait-card reveal">
                  <div className="portrait">
                    <img src="/assets/portrait.jpg" alt="Portrait of Pratham Bhilare" />
                  </div>
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
                  ].map((word, index) => (
                    <span key={`${dupIndex}-${index}-${word}`}>{word}</span>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="highlights" className="fade-in">
          <div className="eyebrow-number">01 — Highlights</div>
          <div className="section-title">
            <div>
              <h2>Highlights</h2>
            </div>
          </div>

          <div className="highlights-grid">
            {highlights.map((item) => (
              <div className="highlight-card panel reveal" key={item.title}>
                <div className="highlight-stat">{item.stat}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="fade-in">
          <div className="eyebrow-number">02 — Education</div>
          <div className="section-title">
            <div>
              <h2>Education</h2>
            </div>
          </div>

          <div className="edu-list">
            {education.map((item) => (
              <article className="edu-card panel reveal" key={item.school}>
                <div className="year">{item.year}</div>
                <h3>{item.school}</h3>
                <p>{item.degree}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="fade-in">
          <div className="eyebrow-number">03 — Experience</div>
          <div className="section-title">
            <div>
              <h2>Experience</h2>
            </div>
          </div>

          <div className="exp-list">
            {experience.map((job) => (
              <article className="exp-card panel reveal" key={job.company + job.year}>
                <div className="year">{job.year}</div>
                <h3>{job.company}</h3>
                <p>{job.desc}</p>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="fade-in">
          <div className="eyebrow-number">04 — Research</div>
          <div className="section-title">
            <div>
              <h2>Research and publications</h2>
            </div>
          </div>

          <div className="research-list">
            <article className="research-card panel reveal">
              <div className="year">Publication</div>
              <h3>Heat Recovery from Solar Photovoltaic Panels</h3>
              <p>
                Research focused on improving solar panel efficiency through
                thermal recovery design and analysis. The profile notes a
                performance improvement from 18.22% to 20.34%.
              </p>
            </article>

            <article className="research-card panel reveal">
              <div className="year">Academic / applied work</div>
              <h3>Operational model for 15-minute grocery delivery</h3>
              <p>
                Designed a business and operations model with forecasted growth
                to $100M revenue by 2029, combining logistics, planning, and
                market assumptions.
              </p>
            </article>
          </div>
        </section>

        <section id="skills" className="fade-in">
          <div className="eyebrow-number">05 — Skills</div>
          <div className="section-title">
            <div>
              <h2>Skills</h2>
            </div>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card panel reveal" key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="fade-in">
          <div className="eyebrow-number">06 — Projects</div>
          <div className="section-title">
            <div>
              <h2>Projects</h2>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card panel reveal" key={project.title}>
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
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="fade-in">
          <div className="eyebrow-number">07 — Certifications</div>
          <div className="section-title">
            <div>
              <h2>Certifications and tools</h2>
            </div>
          </div>

          <div className="mini-grid">
            {certifications.map((cert) => (
              <article className="mini-card panel reveal" key={cert}>
                <div className="year">Certification</div>
                <h3>{cert}</h3>
                <p>Professional credential listed in the profile.</p>
              </article>
            ))}
          </div>

          <div className="eyebrow-number" style={{ marginTop: 28 }}>
            08 — Contact
          </div>

          <div className="panel contact-card reveal">
            <div>
              <p>
                Currently seeking roles for Summer 2026 in Project Management,
                Product Management, Industrial Engineering, Manufacturing
                Engineering, and Business Analysis. Open to relocation and
                collaboration across technical and operations-focused teams.
              </p>

              <div className="hero-actions" style={{ marginTop: 0 }}>
                <a className="btn primary" href="mailto:pratham.bhilare1010@gmail.com">
                  Email Pratham
                </a>
                <a className="btn" href="#home">
                  Back to top
                </a>
              </div>
            </div>

            <div className="contact-box">
              <strong>Contact details</strong>
              <div className="contact-links">
                <a href="tel:+14807425812">+1 (480) 742-5812</a>
                <a href="mailto:pratham.bhilare1010@gmail.com">
                  pratham.bhilare1010@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/prathambhilare"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn profile
                </a>
                <a
                  href="https://github.com/bhilarepratham"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  GitHub profile
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="footer">@Pratham Ankush Bhilare</div>
      </main>
    </>
  );
}
