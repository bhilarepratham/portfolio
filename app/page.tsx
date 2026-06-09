"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ════════════════════════════════════════════════════════════
   SCENES — the story of Pratham Bhilare
════════════════════════════════════════════════════════════ */
const SCENES = [
  {
    id: "prologue",
    chapter: "Prologue",
    title: "Born to Build",
    subtitle: "Navi Mumbai, India",
    lines: [
      "Some stories start with a spark.",
      "Mine started in Navi Mumbai — surrounded by machines, blueprints, and ambition.",
      "I knew early on: I wasn't here just to understand how things work.",
      "I was here to make things work better.",
    ],
    bg: "city",
    mood: "wave",
  },
  {
    id: "scholar",
    chapter: "Chapter I",
    title: "The Scholar",
    subtitle: "Arizona State University · GPA 3.85",
    lines: [
      "Ira A. Fulton Schools of Engineering. Arizona State University.",
      "MS Management of Technology. 3.85 GPA.",
      "Every late night in the library, every model built, every proof submitted —",
      "was one step closer to becoming someone who changes industries.",
    ],
    bg: "campus",
    mood: "study",
  },
  {
    id: "engineer",
    chapter: "Chapter II",
    title: "The Engineer",
    subtitle: "Tata Power · Trombay Thermal Station",
    lines: [
      "Trombay Thermal Power Station. Unit 5: 500 MW. Unit 8: 250 MW.",
      "I was 21 years old standing inside a boiler the size of a building.",
      "14 weeks. LOTO procedures. Permit-to-Work systems. Zero safety incidents.",
      "Theory became steel. Equations became steam. I became an engineer.",
    ],
    bg: "plant",
    mood: "work",
  },
  {
    id: "builder",
    chapter: "Chapter III",
    title: "The Builder",
    subtitle: "10 Projects · $54.75M Impact",
    lines: [
      "Journey Air — a platform that could save airlines $54.75M a year.",
      "FlazzMart — 15-minute grocery delivery modeled to $100M in 5 years.",
      "Warehouse AI — 537 distribution centers. 15% cost reduction. One algorithm.",
      "I don't wait for problems to be handed to me. I find them, frame them, solve them.",
    ],
    bg: "lab",
    mood: "code",
  },
  {
    id: "analyst",
    chapter: "Chapter IV",
    title: "The Analyst",
    subtitle: "42 Years · R² = 0.998",
    lines: [
      "The question: does immigration affect the U.S. economy?",
      "The data: 42 years. DHS. BEA. FRED. Kaggle. Four federal sources merged.",
      "The answer: R² = 0.998. GDP is the dominant predictor. p = 1.02E-47.",
      "Numbers don't have opinions. But they do have answers — if you know how to ask.",
    ],
    bg: "data",
    mood: "analyze",
  },
  {
    id: "toolkit",
    chapter: "Chapter V",
    title: "The Toolkit",
    subtitle: "Six Sigma · SolidWorks · Python · Lean",
    lines: [
      "A Six Sigma Green Belt. A SOLIDWORKS Associate certification.",
      "Python. Pandas. Tableau. MS Project. Streamlit. AnyLogic. LabVIEW.",
      "Every tool in this belt was earned in the field — not just the classroom.",
      "I build with purpose. I measure what matters. I improve what I touch.",
    ],
    bg: "workshop",
    mood: "think",
  },
  {
    id: "horizon",
    chapter: "Finale",
    title: "What Comes Next",
    subtitle: "Phoenix, AZ · Open to Summer 2026",
    lines: [
      "The story isn't finished. Not even close.",
      "I'm looking for Summer 2026 — Project Management, Product, Industrial Engineering.",
      "A team that builds things that matter. A problem worth solving.",
      "If that sounds like you — let's write the next chapter together.",
    ],
    bg: "horizon",
    mood: "wave",
  },
];

const INFO: Record<number,{title:string;rows:[string,string][]}> = {
  0:{title:"Pratham Bhilare",rows:[["Origin","Navi Mumbai, India"],["Now","Phoenix, Arizona"],["Degree","MS Management of Technology"],["University","Arizona State University — Ira A. Fulton Schools"],["GPA","3.85 / 4.0"],["Open to","Summer 2026 roles"]]},
  1:{title:"Education",rows:[["2024–26","ASU · MS Management of Technology · GPA 3.85"],["2021–24","Pillai College of Engineering · BTech Mechanical"],["2018–21","Father Agnel Technical Complex · Diploma Mechanical"],["2018","Ryan International School · Navi Mumbai · 10th Std"]]},
  2:{title:"Experience",rows:[["2025–Now","ASU · Graduate Teaching Assistant · 50+ students"],["2024","Tata Power · Mechanical Maintenance Intern · 14 wks · 0 incidents"],["2022–23","Matharu Sons · Process Optimization Trainee · Fuel tankers"],["2020","CIPET · In-Plant Training · Lathe, milling, machining"]]},
  3:{title:"Projects",rows:[["01","Journey Air · $54.75M savings · Honeywell Aerospace sponsored"],["02","Market Intelligence Dashboard · 50+ companies · 6 industries"],["03","Warehouse Optimization · 537 centers · 15–18% cost cut"],["04","ERP Analysis · $64.83B market · SAP / Oracle / Workday"],["05","FlazzMart · $5M→$100M model · $3M seed ask · 15-min delivery"],["06","BYD Strategy · #1 EV seller · 20,000+ patents analysis"],["07","Customer Portal · $250K budget · 210-day critical path"],["08","VR Usability Testing · Meta Quest 2 · 5 issues · 7 fixes"],["09","Solar PV Heat Recovery · 18.22%→20.34% · published paper"],["10","42-Year Economic Study · R²=0.998 · 4 federal sources"]]},
  4:{title:"Key Numbers",rows:[["15%","Logistics cost reduction via AI grid search vs Excel Solver"],["3.85","GPA at ASU Fulton Schools of Engineering"],["$250K","Project budget managed end-to-end with 9-phase WBS"],["20.34%","Solar PV efficiency improvement from 18.22% — published"],["$100M","Projected revenue model for FlazzMart by Year 5"],["R²=0.998","Income prediction model accuracy — GDP dominant predictor"]]},
  5:{title:"Skills & Certs",rows:[["Ops","WBS · Lean · Six Sigma · Kanban · PERT · Critical Path · Risk"],["Data","OLS Regression · Python · Pandas · Tableau · Excel · Time-Series"],["Strategy","Porter's Five Forces · VRIO · TAM/SAM/SOM · BMC · RBV"],["Tools","SolidWorks (CSWA) · Ansys · AnyLogic · LabVIEW · MS Project"],["Code","Python · Streamlit · SQLite · Plotly · Flutter · BeautifulSoup"],["Certs ✓","Six Sigma GB · CSWA · Tableau Desktop · PM Intl · Siemens PM"]]},
  6:{title:"Get in Touch",rows:[["Email","pratham.bhilare1010@gmail.com"],["Phone","+1 (480) 742-5812"],["LinkedIn","linkedin.com/in/prathambhilare"],["GitHub","github.com/bhilarepratham"],["Location","Phoenix, AZ — open to relocation"],["Seeking","PM · Product · Industrial Eng · Business Analysis — Summer 2026"]]},
};

/* ════════════════════════════════════════════════════════════
   CHARACTER  —  large, expressive, cinematic
   viewBox 0 0 160 320  rendered at 160×320 or bigger
════════════════════════════════════════════════════════════ */
function Character({ mood, walking }: { mood: string; walking: boolean }) {
  return (
    <svg
      viewBox="0 0 160 320"
      className={`char-svg ${walking ? "char-walk" : `char-${mood}`}`}
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      {/* ── SHADOW ── */}
      <ellipse cx="80" cy="315" rx="44" ry="9" fill="rgba(0,0,0,0.55)" />

      {/* ── LEGS ── */}
      <rect x="52" y="218" width="24" height="82" rx="8" fill="#0d0d1e" className="leg-l" />
      <rect x="84" y="218" width="24" height="82" rx="8" fill="#0d0d1e" className="leg-r" />

      {/* ── SHOES ── */}
      <ellipse cx="64"  cy="302" rx="20" ry="9" fill="#1a1410" />
      <ellipse cx="96"  cy="302" rx="20" ry="9" fill="#1a1410" />
      <ellipse cx="64"  cy="300" rx="18" ry="7" fill="#C8A96E" />
      <ellipse cx="96"  cy="300" rx="18" ry="7" fill="#C8A96E" />
      {/* shoe shine */}
      <ellipse cx="60" cy="298" rx="8" ry="3" fill="white" opacity="0.12" />
      <ellipse cx="92" cy="298" rx="8" ry="3" fill="white" opacity="0.12" />

      {/* ── TROUSERS ── */}
      <rect x="50" y="200" width="60" height="26" rx="6" fill="#0f0f20" />
      {/* trouser crease */}
      <line x1="64" y1="200" x2="64" y2="226" stroke="#1a1a30" strokeWidth="1.5" opacity="0.5" />
      <line x1="96" y1="200" x2="96" y2="226" stroke="#1a1a30" strokeWidth="1.5" opacity="0.5" />

      {/* ── SUIT BODY ── */}
      <rect x="36" y="120" width="88" height="90" rx="10" fill="#111128" />
      {/* suit texture */}
      {Array.from({length:6}).map((_,i)=>(
        <line key={i} x1={38} y1={130+i*12} x2={122} y2={130+i*12}
          stroke="#1a1a35" strokeWidth="0.8" opacity="0.4" />
      ))}
      {/* lapels */}
      <polygon points="36,120 60,120 52,155" fill="#0c0c1e" />
      <polygon points="124,120 100,120 108,155" fill="#0c0c1e" />
      {/* collar */}
      <rect x="36" y="120" width="88" height="16" rx="6" fill="#181832" />
      {/* gold tie */}
      <polygon points="80,122 74,140 80,152 86,140" fill="#C8A96E" opacity="0.95" />
      <polygon points="78,150 80,162 82,150" fill="#9a7a48" />
      {/* pocket square */}
      <polygon points="42,132 52,132 50,122" fill="#C8A96E" opacity="0.55" />
      {/* shirt cuff hints */}
      <rect x="36" y="190" width="10" height="4" rx="2" fill="#e8e0cc" opacity="0.2" />
      <rect x="114" y="190" width="10" height="4" rx="2" fill="#e8e0cc" opacity="0.2" />
      {/* suit button */}
      <circle cx="80" cy="168" r="3" fill="#1e1e36" stroke="#C8A96E" strokeWidth="0.7" opacity="0.6" />

      {/* ── NECK ── */}
      <rect x="70" y="105" width="20" height="20" rx="5" fill="#c8956c" />

      {/* ── HEAD ── */}
      <circle cx="80" cy="76" r="46" fill="#c8956c" />
      {/* jaw highlight */}
      <ellipse cx="80" cy="112" rx="28" ry="10" fill="#b87c52" opacity="0.5" />

      {/* ── EARS ── */}
      <ellipse cx="34" cy="78" rx="8" ry="12" fill="#b87c52" />
      <ellipse cx="37" cy="78" rx="5" ry="8" fill="#c8956c" />
      <ellipse cx="126" cy="78" rx="8" ry="12" fill="#b87c52" />
      <ellipse cx="123" cy="78" rx="5" ry="8" fill="#c8956c" />

      {/* ── HAIR ── */}
      <ellipse cx="80" cy="36" rx="45" ry="26" fill="#120800" />
      <path d="M35 55 Q38 24 80 28 Q122 24 125 55" fill="#120800" />
      {/* hair part & highlight */}
      <path d="M60 32 Q72 26 90 30" stroke="#2e1400" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M63 30 Q74 25 88 28" stroke="#3a1800" strokeWidth="2.5" fill="none" opacity="0.6" />
      {/* sideburns */}
      <rect x="35" y="55" width="8" height="20" rx="3" fill="#120800" opacity="0.7" />
      <rect x="117" y="55" width="8" height="20" rx="3" fill="#120800" opacity="0.7" />

      {/* ── EYES ── */}
      {mood === "analyze" ? (
        <>
          {/* wide alert eyes */}
          <ellipse cx="62" cy="78" rx="11" ry="8" fill="white" />
          <circle cx="64" cy="78" r="6" fill="#0a0a1a" />
          <circle cx="64" cy="78" r="3" fill="#C8A96E" opacity="0.7" />
          <ellipse cx="98" cy="78" rx="11" ry="8" fill="white" />
          <circle cx="96" cy="78" r="6" fill="#0a0a1a" />
          <circle cx="96" cy="78" r="3" fill="#C8A96E" opacity="0.7" />
        </>
      ) : mood === "work" ? (
        <>
          {/* focused squint */}
          <ellipse cx="62" cy="78" rx="10" ry="6" fill="white" />
          <circle cx="62" cy="78" r="5" fill="#0a0a1a" />
          <ellipse cx="98" cy="78" rx="10" ry="6" fill="white" />
          <circle cx="98" cy="78" r="5" fill="#0a0a1a" />
        </>
      ) : (
        <>
          <ellipse cx="62" cy="78" rx="10" ry="10" fill="white" />
          <circle cx="62" cy="78" r="6" fill="#0a0a1a" />
          <ellipse cx="98" cy="78" rx="10" ry="10" fill="white" />
          <circle cx="98" cy="78" r="6" fill="#0a0a1a" />
        </>
      )}
      {/* pupils */}
      <circle cx="63" cy="77" r="2.5" fill="#2a1a3e" />
      <circle cx="99" cy="77" r="2.5" fill="#2a1a3e" />
      {/* eye shine */}
      <circle cx="65" cy="74" r="2.2" fill="white" opacity="0.9" />
      <circle cx="101" cy="74" r="2.2" fill="white" opacity="0.9" />
      <circle cx="60" cy="76" r="1" fill="white" opacity="0.4" />
      <circle cx="96" cy="76" r="1" fill="white" opacity="0.4" />

      {/* ── EYEBROWS ── */}
      {(mood==="work"||mood==="analyze") && (
        <>
          <path d="M51 64 Q62 58 72 62" stroke="#120800" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M88 62 Q98 58 109 64" stroke="#120800" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}
      {(mood==="wave"||mood==="code"||mood==="think"||mood==="study") && (
        <>
          <path d="M52 65 Q62 61 72 64" stroke="#120800" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M88 64 Q98 61 108 65" stroke="#120800" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* ── NOSE ── */}
      <path d="M77 82 Q80 92 83 82" stroke="#a06040" strokeWidth="1.8" fill="none" opacity="0.6" />
      <ellipse cx="75" cy="90" rx="4" ry="2.5" fill="#b87c52" opacity="0.4" />
      <ellipse cx="85" cy="90" rx="4" ry="2.5" fill="#b87c52" opacity="0.4" />

      {/* ── MOUTH ── */}
      {mood==="wave"    && <path d="M65 102 Q80 114 95 102" stroke="#7a3a1a" strokeWidth="3.5" fill="none" strokeLinecap="round" />}
      {mood==="code"    && <path d="M67 102 Q80 111 93 102" stroke="#7a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />}
      {mood==="study"   && <path d="M68 103 Q80 109 92 103" stroke="#7a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />}
      {mood==="work"    && <line x1="66" y1="104" x2="94" y2="104" stroke="#7a3a1a" strokeWidth="3" strokeLinecap="round" />}
      {mood==="analyze" && <path d="M66 106 Q80 99 94 106" stroke="#7a3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
      {mood==="think"   && <path d="M68 104 Q80 108 92 104" stroke="#7a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />}

      {/* ── ARMS ── */}
      {mood==="wave" && (
        <>
          {/* waving left arm */}
          <line x1="38" y1="145" x2="4" y2="100" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" className="arm-wave" />
          <circle cx="4" cy="100" r="9" fill="#c8956c" className="arm-wave" />
          {/* right arm down */}
          <line x1="122" y1="145" x2="142" y2="195" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="142" cy="195" r="9" fill="#c8956c" />
        </>
      )}
      {mood==="study" && (
        <>
          <line x1="38" y1="145" x2="18" y2="195" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="18" cy="195" r="9" fill="#c8956c" />
          {/* right arm raised holding book */}
          <line x1="122" y1="145" x2="138" y2="105" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="138" cy="105" r="9" fill="#c8956c" />
          {/* Book */}
          <rect x="132" y="82" width="38" height="30" rx="3" fill="#C8A96E" opacity="0.9" />
          <rect x="151" y="83" width="2" height="28" fill="#8a7040" opacity="0.6" />
          {/* book text lines */}
          {[0,1,2,3].map(r=><rect key={r} x={134} y={88+r*6} width={14} height={3} fill="#8a7040" opacity="0.4" rx="1" />)}
        </>
      )}
      {mood==="work" && (
        <>
          <line x1="38" y1="145" x2="10" y2="175" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="10" cy="175" r="9" fill="#c8956c" />
          {/* right arm out holding wrench */}
          <line x1="122" y1="145" x2="152" y2="140" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="152" cy="140" r="9" fill="#c8956c" />
          {/* Wrench */}
          <rect x="154" y="128" width="26" height="10" rx="5" fill="#888" />
          <rect x="152" y="126" width="10" height="14" rx="4" fill="#aaa" />
          <circle cx="158" cy="133" r="4" fill="none" stroke="#666" strokeWidth="1.5" />
        </>
      )}
      {mood==="code" && (
        <>
          <line x1="38" y1="145" x2="12" y2="185" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="12" cy="185" r="9" fill="#c8956c" />
          <line x1="122" y1="145" x2="148" y2="185" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="148" cy="185" r="9" fill="#c8956c" />
          {/* Laptop on lap */}
          <rect x="22" y="192" width="116" height="28" rx="5" fill="#0a1020" />
          <rect x="22" y="192" width="116" height="28" rx="5" fill="none" stroke="#C8A96E" strokeWidth="0.8" opacity="0.5" />
          <rect x="24" y="194" width="112" height="24" rx="3" fill="#060e18" />
          {/* code on screen */}
          {[0,1,2].map(r=>(
            <rect key={r} x={28} y={198+r*7} width={20+(r*28)%60} height={4}
              fill="#C8A96E" opacity={0.15+r*0.06} rx="1" />
          ))}
          <rect x="28" y="212" width="6" height="8" fill="#C8A96E" opacity="0.5" className="caret-blink" />
        </>
      )}
      {mood==="analyze" && (
        <>
          <line x1="38" y1="145" x2="14" y2="130" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="14" cy="130" r="9" fill="#c8956c" />
          <line x1="122" y1="145" x2="148" y2="130" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="148" cy="130" r="9" fill="#c8956c" />
          {/* clipboard with chart */}
          <rect x="148" y="100" width="44" height="56" rx="4" fill="#06080e" stroke="#C8A96E" strokeWidth="0.8" opacity="0.9" />
          <rect x="164" y="96" width="12" height="8" rx="2" fill="#C8A96E" opacity="0.5" />
          <polyline points="152,148 157,132 162,140 168,118 174,126 180,108 186,115"
            stroke="#C8A96E" strokeWidth="2" fill="none" />
          <line x1="151" y1="150" x2="190" y2="150" stroke="#C8A96E" strokeWidth="0.8" opacity="0.3" />
          <text x="170" y="112" textAnchor="middle" fontSize="6" fill="#C8A96E" opacity="0.8">R²=0.998</text>
        </>
      )}
      {mood==="think" && (
        <>
          <line x1="38" y1="145" x2="16" y2="190" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="16" cy="190" r="9" fill="#c8956c" />
          {/* right hand on chin */}
          <line x1="122" y1="145" x2="106" y2="120" stroke="#c8956c" strokeWidth="18" strokeLinecap="round" />
          <circle cx="106" cy="120" r="9" fill="#c8956c" />
          {/* thought bubbles */}
          <circle cx="110" cy="52" r="6" fill="rgba(200,169,110,0.2)" />
          <circle cx="120" cy="40" r="9" fill="rgba(200,169,110,0.18)" />
          <circle cx="133" cy="26" r="15" fill="rgba(200,169,110,0.15)" stroke="#C8A96E" strokeWidth="0.8" />
          <text x="133" y="31" textAnchor="middle" fontSize="14" fill="#C8A96E" opacity="0.7">?</text>
        </>
      )}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   TYPEWRITER DIALOGUE
════════════════════════════════════════════════════════════ */
function Dialogue({ lines, active, sceneKey }: { lines: string[]; active: boolean; sceneKey: number }) {
  const [li, setLi]       = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone]   = useState(false);

  useEffect(() => { setLi(0); setTyped(""); setDone(false); }, [sceneKey]);

  useEffect(() => {
    if (!active) return;
    const txt = lines[li] ?? "";
    setTyped(""); setDone(false);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(txt.slice(0, i));
      if (i >= txt.length) { clearInterval(t); setDone(true); }
    }, 22);
    return () => clearInterval(t);
  }, [li, active, lines]);

  const next = () => { if (done && li < lines.length - 1) setLi(n => n + 1); };

  return (
    <div className={`speech ${active ? "speech-in" : ""}`}
      onClick={next} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && next()}>
      {/* comic-style border */}
      <div className="speech-border" />
      <div className="speech-tail" />
      <p className="speech-text">
        {typed}<span className={`tcaret ${done ? "tcaret-blink" : ""}`}>█</span>
      </p>
      {done && li < lines.length - 1 && (
        <div className="speech-more">tap to continue ›</div>
      )}
      <div className="speech-pips">
        {lines.map((_,i) => <span key={i} className={`pip ${i <= li ? "pip-lit" : ""}`} />)}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CHAPTER TITLE CARD — fullscreen between scenes
════════════════════════════════════════════════════════════ */
function ChapterCard({ scene, show }: { scene: typeof SCENES[0]; show: boolean }) {
  return (
    <div className={`chaptercard ${show ? "cc-in" : ""}`}>
      <div className="cc-line cc-chapter">{scene.chapter}</div>
      <div className="cc-rule" />
      <div className="cc-line cc-title">{scene.title}</div>
      <div className="cc-line cc-sub">{scene.subtitle}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   BACKGROUND SCENES  —  rich, layered, dark
════════════════════════════════════════════════════════════ */

/* ── PROLOGUE: Night city of Mumbai ── */
function BgCity() {
  const buildings = [
    [0,160,105,440],[115,190,80,410],[205,140,130,460],[345,175,100,425],
    [455,150,115,450],[580,200,85,400],[675,165,120,435],[805,180,95,420],
    [910,145,125,455],[1045,190,100,410],[1155,160,60,440],
  ];
  return (
    <svg className="sbg" viewBox="0 0 1220 620" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="ng1" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor="#0c0c24" />
          <stop offset="55%" stopColor="#05051a" />
          <stop offset="100%" stopColor="#020209" />
        </radialGradient>
        <radialGradient id="mg1" cx="78%" cy="12%" r="18%">
          <stop offset="0%" stopColor="#f5edcc" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f5edcc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="streetglow" cx="50%" cy="100%" r="40%">
          <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* sky */}
      <rect width="1220" height="620" fill="url(#ng1)" />
      {/* moon glow */}
      <circle cx="950" cy="72" r="80" fill="url(#mg1)" />
      {/* moon */}
      <circle cx="950" cy="72" r="44" fill="#ede4c8" opacity="0.94" />
      <circle cx="970" cy="58" r="36" fill="#0c0c24" />
      <circle cx="938" cy="78" r="5" fill="rgba(0,0,0,0.14)" />
      <circle cx="955" cy="88" r="3" fill="rgba(0,0,0,0.1)" />
      {/* stars */}
      {Array.from({length:100}).map((_,i)=>(
        <circle key={i} cx={(i*179+31)%1220} cy={(i*103+17)%300}
          r={0.5+(i%5)*0.3} fill="white"
          opacity={0.15+(i%7)*0.08}
          className="twinkle" style={{animationDelay:`${(i*0.22)%5}s`}} />
      ))}
      {/* buildings — background layer */}
      {buildings.map(([x,y,w,h],bi)=>(
        <g key={bi}>
          <rect x={x} y={y} width={w} height={h} fill={`hsl(230,20%,${6+bi%5}%)`} />
          {/* roof details */}
          <rect x={x+w*0.2} y={y-14} width={w*0.6} height={16} fill={`hsl(230,20%,${8+bi%4}%)`} />
          <rect x={x+w*0.38} y={y-26} width={w*0.24} height={14} fill={`hsl(230,20%,${9+bi%3}%)`} />
          {/* antennas */}
          {bi%3===0 && <line x1={x+w*0.5} y1={y-26} x2={x+w*0.5} y2={y-52} stroke="#C8A96E" strokeWidth="1" opacity="0.25" />}
          {/* windows */}
          {Array.from({length:Math.floor((h-30)/34)}).map((_,row)=>
            Array.from({length:Math.floor(w/24)}).map((_,col)=>{
              const lit = (bi*11+row*7+col*3)%10 > 3;
              return <rect key={`${row}-${col}`}
                x={x+7+col*24} y={y+18+row*32} width="14" height="18"
                fill={lit?"#C8A96E":"#0c0c22"}
                opacity={lit ? 0.35+(bi+row)%4*0.1 : 0.15}
                className={lit&&(bi*3+row+col)%5===0?"flicker":""}
                style={{animationDelay:`${((bi+row*2+col)*0.35)%7}s`}} />
            })
          )}
        </g>
      ))}
      {/* reflective ground */}
      <rect x="0" y="550" width="1220" height="70" fill="#040410" />
      <rect x="0" y="548" width="1220" height="4" fill="#C8A96E" opacity="0.18" />
      <rect x="0" y="552" width="1220" height="68" fill="url(#streetglow)" />
      {/* street lights */}
      {[80,240,420,600,780,960,1120].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="490" width="4" height="62" fill="#181828" />
          <rect x={x-14} y="490" width="32" height="6" rx="3" fill="#1a1a2e" />
          <ellipse cx={x+2} cy="492" rx="24" ry="10" fill="#C8A96E" opacity="0.1" />
          <circle cx={x+2} cy="493" r="4" fill="#C8A96E" opacity="0.75" />
          {/* reflection */}
          <line x1={x+2} y1="552" x2={x+2} y2="590" stroke="#C8A96E" strokeWidth="1" opacity="0.08" />
        </g>
      ))}
      {/* fog/haze layer */}
      <rect x="0" y="420" width="1220" height="140" fill="rgba(2,2,14,0.3)" />
    </svg>
  );
}

/* ── CHAPTER I: ASU Campus at night ── */
function BgCampus() {
  return (
    <svg className="sbg" viewBox="0 0 1220 620" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="campsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060618" />
          <stop offset="100%" stopColor="#0e0e28" />
        </linearGradient>
        <radialGradient id="campglow" cx="50%" cy="60%" r="45%">
          <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1220" height="620" fill="url(#campsky)" />
      {/* stars */}
      {Array.from({length:55}).map((_,i)=>(
        <circle key={i} cx={(i*213+40)%1220} cy={(i*89)%260} r="0.7"
          fill="white" opacity="0.22" className="twinkle" style={{animationDelay:`${i*0.38}s`}} />
      ))}
      {/* distant city glow */}
      <rect x="0" y="380" width="1220" height="240" fill="url(#campglow)" />

      {/* MAIN BUILDING — detailed ASU-style */}
      <rect x="200" y="80" width="820" height="460" fill="#090916" />
      {/* giant pediment */}
      <polygon points="200,80 610,10 1020,80" fill="#0b0b1c" />
      <polygon points="220,80 610,18 1000,80" fill="#0d0d20" />
      {/* gold band at top */}
      <rect x="200" y="78" width="820" height="16" fill="#C8A96E" opacity="0.3" />
      {/* colonnade */}
      {Array.from({length:12}).map((_,i)=>(
        <g key={i}>
          <rect x={218+i*62} y={94} width={20} height={446} fill="#0c0c1e" />
          {/* column capital */}
          <rect x={213+i*62} y={90} width={30} height={8} rx="2" fill="#141428" />
          {/* column base */}
          <rect x={213+i*62} y={534} width={30} height={8} rx="2" fill="#141428" />
        </g>
      ))}
      {/* windows — 5 rows × 10 cols */}
      {Array.from({length:5}).map((_,row)=>
        Array.from({length:10}).map((_,col)=>{
          const lit = (row*3+col*7+13)%10 > 4;
          return (
            <g key={`${row}-${col}`}>
              <rect x={228+col*74} y={100+row*82} width={52} height={68} fill="#0c1030" />
              <rect x={228+col*74} y={100+row*82} width={52} height={68}
                fill="#C8A96E" opacity={lit?0.1:0.02}
                className={lit&&(row+col)%3===0?"flicker":""}
                style={{animationDelay:`${((row*col+1)*0.28)%5}s`}} />
              {/* window cross */}
              <line x1={254+col*74} y1={100+row*82} x2={254+col*74} y2={168+row*82} stroke="#151530" strokeWidth="1" opacity="0.5" />
              <line x1={228+col*74} y1={134+row*82} x2={280+col*74} y2={134+row*82} stroke="#151530" strokeWidth="1" opacity="0.5" />
            </g>
          );
        })
      )}
      {/* ASU text on pediment */}
      <text x="610" y="58" textAnchor="middle" fontSize="26" fill="#C8A96E"
        fontFamily="Georgia,serif" letterSpacing="12" opacity="0.55">ASU</text>
      <text x="610" y="74" textAnchor="middle" fontSize="9" fill="#C8A96E"
        fontFamily="sans-serif" letterSpacing="4" opacity="0.3">FULTON SCHOOLS OF ENGINEERING</text>

      {/* GROUND */}
      <rect x="0" y="542" width="1220" height="78" fill="#060610" />
      <rect x="140" y="540" width="940" height="4" fill="#C8A96E" opacity="0.14" />
      {/* walkway lights */}
      {[180,350,520,700,880,1050].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="510" width="3" height="34" fill="#141420" />
          <circle cx={x+1} cy="512" r="5" fill="#C8A96E" opacity="0.55" />
          <ellipse cx={x+1} cy="513" rx="16" ry="7" fill="#C8A96E" opacity="0.07" />
        </g>
      ))}
      {/* Trees */}
      {[60,120,1080,1150].map((x,i)=>(
        <g key={i}>
          <rect x={x+12} y="440" width="16" height="104" fill="#0c0c08" />
          <ellipse cx={x+20} cy="418" rx="38" ry="52" fill="#080e08" />
          <ellipse cx={x+20} cy="400" rx="30" ry="42" fill="#0a120a" />
          <ellipse cx={x+20} cy="385" rx="22" ry="32" fill="#0c160c" />
        </g>
      ))}
      {/* floating formulas */}
      {["∑","π","∫","Δ","λ","∇","∂","∞","α","β","σ","μ"].map((s,i)=>(
        <text key={i} x={(i*105+50)%1100} y={340-(i*22)%200}
          fontSize="14" fill="#C8A96E" opacity="0.12"
          className="floatup" style={{animationDelay:`${i*0.5}s`}}>{s}</text>
      ))}
    </svg>
  );
}

/* ── CHAPTER II: Power Plant interior ── */
function BgPlant() {
  return (
    <svg className="sbg" viewBox="0 0 1220 620" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="plantsky" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="#06060e" />
          <stop offset="100%" stopColor="#020208" />
        </radialGradient>
        <radialGradient id="boilerglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6600" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1220" height="620" fill="url(#plantsky)" />
      {/* background dark sky */}
      <rect width="1220" height="280" fill="#040408" />

      {/* cooling towers — large */}
      {[[40,40,160,500],[250,30,180,520],[820,35,170,510],[1040,45,150,495]].map(([x,y,w,h],i)=>(
        <g key={i}>
          {/* tower shape */}
          <path d={`M${x} ${y+h} C${x+w*0.12} ${y+h*0.25} ${x+w*0.28} ${y+15} ${x+w/2} ${y+25} C${x+w*0.72} ${y+15} ${x+w*0.88} ${y+h*0.25} ${x+w} ${y+h}`}
            fill={`hsl(230,18%,${5+i%3}%)`} />
          {/* inner shadow */}
          <path d={`M${x+w*0.15} ${y+h} C${x+w*0.27} ${y+h*0.4} ${x+w*0.38} ${y+35} ${x+w/2} ${y+42} C${x+w*0.62} ${y+35} ${x+w*0.73} ${y+h*0.4} ${x+w*0.85} ${y+h}`}
            fill={`hsl(230,18%,${7+i%3}%)`} />
          {/* rim light */}
          <path d={`M${x+w*0.1} ${y+h} C${x+w*0.2} ${y+h*0.3} ${x+w*0.35} ${y+20} ${x+w/2} ${y+28}`}
            fill="none" stroke="#C8A96E" strokeWidth="0.8" opacity="0.15" />
          {/* steam */}
          {[0,1,2,3].map(s=>(
            <ellipse key={s} cx={x+w/2+(s%2===0?-8:8)} cy={y-18-s*28}
              rx={22-s*3} ry={14-s*2}
              fill="white" opacity={0.04-s*0.007}
              className="steam" style={{animationDelay:`${i*0.55+s*0.28}s`}} />
          ))}
        </g>
      ))}

      {/* main plant structure */}
      <rect x="420" y="130" width="380" height="420" fill="#080810" />
      <rect x="408" y="116" width="404" height="22" fill="#C8A96E" opacity="0.22" />
      {/* pipes */}
      {[445,488,531,574,617,660,703,746,789].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="138" width="16" height="412" fill="#0c0c18" />
          <line x1={x+8} y1="138" x2={x+8} y2="550" stroke="#C8A96E" strokeWidth="0.6" opacity="0.06" />
          {i%2===0 && <rect x={x-8} y={200+i*25} width={32} height={12} rx="4" fill="#0e0e1e" />}
        </g>
      ))}
      {/* boiler glow */}
      <rect x="500" y="250" width="220" height="180" fill="url(#boilerglow)" />
      {/* control panel window */}
      <rect x="510" y="280" width="200" height="120" rx="5" fill="#060e1a" />
      <rect x="510" y="280" width="200" height="120" rx="5" fill="none" stroke="#C8A96E" strokeWidth="0.8" opacity="0.45" />
      <rect x="510" y="280" width="200" height="120" fill="#C8A96E" opacity="0.03" className="flicker" style={{animationDelay:"0.8s"}} />
      {/* gauges in window */}
      {[535,580,625,670].map((x,i)=>(
        <g key={i}>
          <circle cx={x} cy="330" r="16" fill="#04080e" stroke="#C8A96E" strokeWidth="0.6" opacity="0.5" />
          <line x1={x} y1="330"
            x2={x+12*Math.cos((i*0.8-1.2))}
            y2={330+12*Math.sin((i*0.8-1.2))}
            stroke="#C8A96E" strokeWidth="1.2" opacity="0.6" />
          <circle cx={x} cy="330" r="2" fill="#C8A96E" opacity="0.5" />
        </g>
      ))}
      {/* warning lights row */}
      {[432,464,496,528,560,592,624,656,688,720,752,784].map((x,i)=>(
        <circle key={i} cx={x} cy="132" r="5"
          fill={i%4===0?"#ff2222":i%4===1?"#ffaa00":i%4===2?"#C8A96E":"#22aa44"}
          opacity="0.8" className="warnblink" style={{animationDelay:`${i*0.28}s`}} />
      ))}
      {/* sparks floating up from base */}
      {Array.from({length:18}).map((_,i)=>(
        <circle key={i}
          cx={420+(i*42)%380}
          cy={400+(i*22)%120}
          r={1+(i%3)*0.5}
          fill={i%2===0?"#ff6600":"#ffcc00"}
          opacity="0.75" className="sparkle" style={{animationDelay:`${i*0.3}s`}} />
      ))}
      {/* ground */}
      <rect x="0" y="550" width="1220" height="70" fill="#030308" />
      <rect x="0" y="548" width="1220" height="3" fill="#C8A96E" opacity="0.1" />
    </svg>
  );
}

/* ── CHAPTER III: Tech lab / dev room ── */
function BgLab() {
  return (
    <svg className="sbg" viewBox="0 0 1220 620" preserveAspectRatio="xMidYMid slice">
      <rect width="1220" height="620" fill="#030310" />
      {/* perspective grid floor */}
      {Array.from({length:20}).map((_,i)=>(
        <line key={`h${i}`} x1="0" y1={490+i*6} x2="1220" y2={490+i*6}
          stroke="#C8A96E" strokeWidth="0.5" opacity={0.03+i*0.004} />
      ))}
      {Array.from({length:40}).map((_,i)=>(
        <line key={`v${i}`} x1={i*32} y1="488" x2={i*32} y2="620"
          stroke="#C8A96E" strokeWidth="0.4" opacity="0.04" />
      ))}
      {/* WORKSTATIONS — detailed */}
      {[40,340,720,1000].map((x,wi)=>(
        <g key={wi}>
          {/* desk */}
          <rect x={x} y="400" width="200" height="14" rx="3" fill="#0e0e22" />
          <rect x={x+15} y="414" width="8" height="80" fill="#0b0b18" />
          <rect x={x+177} y="414" width="8" height="80" fill="#0b0b18" />
          {/* monitor stand */}
          <rect x={x+94} y="388" width="14" height="22" fill="#0e0e22" />
          <rect x={x+82} y="395" width="38" height="8" rx="2" fill="#0e0e22" />
          {/* monitor */}
          <rect x={x+8} y="258" width="186" height="132" rx="5" fill="#090d16" />
          <rect x={x+8} y="258" width="186" height="132" rx="5" fill="none" stroke="#C8A96E" strokeWidth="0.7" opacity="0.4" />
          {/* screen */}
          <rect x={x+12} y="262" width="178" height="124" rx="3" fill="#05090f" />
          {/* IDE theme — code editor */}
          {/* line numbers */}
          {Array.from({length:8}).map((_,r)=>(
            <text key={r} x={x+16} y={274+r*14} fontSize="7" fill="#5a5268" fontFamily="monospace">{wi*8+r+1}</text>
          ))}
          {/* code lines */}
          {[
            {c:"#6272a4",w:30},{c:"#C8A96E",w:50},{c:"#8be9fd",w:40},
            {c:"#6272a4",w:25},{c:"#50fa7b",w:55},{c:"#C8A96E",w:35},
            {c:"#ff79c6",w:45},{c:"#6272a4",w:20},
          ].map(({c,w},r)=>(
            <rect key={r} x={x+28} y={270+r*14} width={w+(wi*7+r*11)%40} height={5}
              fill={c} opacity="0.5" rx="1" />
          ))}
          {/* blinking cursor */}
          <rect x={x+28} y="374" width="5" height="9" fill="#C8A96E" opacity="0.7" className="warnblink" />
        </g>
      ))}
      {/* floating code tokens */}
      {["const","=>","async","await","O(n²)","SELECT","API","git push",".map()",
        "if(x)","null","return","import","export","useState","useRef"].map((t,i)=>(
        <text key={i} x={(i*78+20)%1180} y={40+(i*48)%380}
          fontSize={10+(i%3)*2} fill="#C8A96E" opacity={0.08+(i%4)*0.03}
          fontFamily="monospace" className="floatup" style={{animationDelay:`${i*0.45}s`}}>{t}</text>
      ))}
      {/* connection graph */}
      {[[140,300,380,240],[480,260,720,320],[840,280,1100,240],[200,380,600,340],
        [700,360,1000,400],[350,220,800,180]].map(([x1,y1,x2,y2],i)=>(
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#C8A96E" strokeWidth="0.7" opacity="0.09"
            strokeDasharray="6 12" className="dashmove" style={{animationDelay:`${i*0.8}s`}} />
          <circle cx={x1} cy={y1} r="4" fill="#C8A96E" opacity="0.15" />
          <circle cx={x2} cy={y2} r="4" fill="#C8A96E" opacity="0.15" />
        </g>
      ))}
      <rect x="0" y="490" width="1220" height="130" fill="#030310" />
    </svg>
  );
}

/* ── CHAPTER IV: Data center / analysis room ── */
function BgData() {
  return (
    <svg className="sbg" viewBox="0 0 1220 620" preserveAspectRatio="xMidYMid slice">
      <rect width="1220" height="620" fill="#020208" />
      {/* matrix rain — 40 columns */}
      {Array.from({length:40}).map((_,i)=>(
        <text key={i} x={i*31+6} y="0" fontSize="12" fill="#C8A96E"
          fontFamily="monospace" className="matrixfall" opacity="0.2"
          style={{animationDelay:`${(i*0.26)%5}s`,animationDuration:`${2+((i*7)%5)*0.6}s`}}>
          {["0","1","Σ","∫","λ","π","∞","∂","α","β"][i%10]}
        </text>
      ))}
      {/* server racks — both sides */}
      {[20,150,280,910,1040,1150].map((x,ri)=>(
        <g key={ri}>
          <rect x={x} y="100" width="118" height="440" rx="4" fill="#070710" />
          <rect x={x} y="100" width="118" height="440" rx="4" fill="none" stroke="#C8A96E" strokeWidth="0.5" opacity="0.18" />
          {/* rack units */}
          {Array.from({length:16}).map((_,row)=>(
            <g key={row}>
              <rect x={x+5} y={108+row*26} width={108} height={20} rx="2" fill="#0b0b1c" />
              <rect x={x+5} y={108+row*26} width={108} height={20} rx="2" fill="none" stroke="#C8A96E" strokeWidth="0.3" opacity="0.15" />
              {/* drive bays */}
              {[0,1,2,3].map(b=>(
                <rect key={b} x={x+8+b*24} y={110+row*26} width={20} height={8} rx="1" fill="#0e0e20" />
              ))}
              {/* status LED */}
              <circle cx={x+105} cy={118+row*26} r="3.5"
                fill={row%5===0?"#00ee88":row%5===1?"#C8A96E":row%5===2?"#4488ff":row%5===3?"#ff4444":"#aaaaaa"}
                opacity="0.85" className="warnblink" style={{animationDelay:`${(ri*2+row)*0.15}s`}} />
            </g>
          ))}
        </g>
      ))}
      {/* center holographic analytics display */}
      <g transform="translate(610,300)">
        {/* holo platform */}
        <ellipse cx="0" cy="120" rx="160" ry="28" fill="#C8A96E" opacity="0.04" />
        <ellipse cx="0" cy="120" rx="120" ry="18" fill="#C8A96E" opacity="0.06" />
        {/* vertical beam */}
        <rect x="-1" y="-60" width="2" height="180" fill="#C8A96E" opacity="0.04" />
        {/* bar chart */}
        {[38,72,52,96,60,84,46,100,68,78].map((h,i)=>(
          <rect key={i} x={-115+i*26} y={120-h} width={20} height={h}
            fill="#C8A96E" opacity={0.07+i*0.02} className="bargrow"
            style={{animationDelay:`${i*0.09}s`}} />
        ))}
        <line x1="-120" y1="120" x2="120" y2="120" stroke="#C8A96E" strokeWidth="1" opacity="0.2" />
        {/* trend overlay */}
        <polyline points="-115,118 -88,84 -62,96 -36,56 -10,68 16,38 42,52 68,22 94,34 114,18"
          stroke="#C8A96E" strokeWidth="2" fill="none" opacity="0.4" />
        {/* labels */}
        <text x="0" y="-30" textAnchor="middle" fontSize="14" fill="#C8A96E" opacity="0.5"
          fontFamily="monospace" letterSpacing="1">R² = 0.998</text>
        <text x="0" y="-14" textAnchor="middle" fontSize="8" fill="#C8A96E" opacity="0.3"
          fontFamily="monospace">p = 1.02E-47  ·  n = 42 years</text>
        <text x="0" y="-2" textAnchor="middle" fontSize="7" fill="#C8A96E" opacity="0.2"
          fontFamily="monospace">GDP · BEA · FRED · DHS · Kaggle</text>
      </g>
      <rect x="0" y="540" width="1220" height="80" fill="#020208" />
    </svg>
  );
}

/* ── CHAPTER V: Mechanical workshop with gears ── */
function BgWorkshop() {
  return (
    <svg className="sbg" viewBox="0 0 1220 620" preserveAspectRatio="xMidYMid slice">
      <rect width="1220" height="620" fill="#030309" />
      <rect width="1220" height="550" fill="#060610" />
      {/* back wall bricks subtle */}
      {Array.from({length:8}).map((_,r)=>
        Array.from({length:18}).map((_,c)=>(
          <rect key={`${r}-${c}`}
            x={c*70+(r%2)*35} y={r*42}
            width="68" height="40"
            fill="none" stroke="#0c0c18" strokeWidth="0.8" opacity="0.4" />
        ))
      )}
      {/* shelf */}
      <rect x="0" y="92" width="1220" height="12" fill="#0e0e1e" />
      <rect x="0" y="102" width="1220" height="3" fill="#C8A96E" opacity="0.1" />

      {/* large spinning gears */}
      {[
        {cx:160,cy:260,r:80,dir:1,teeth:14,spd:8},
        {cx:380,cy:220,r:100,dir:-1,teeth:18,spd:10},
        {cx:680,cy:270,r:70,dir:1,teeth:12,spd:7},
        {cx:900,cy:240,r:90,dir:-1,teeth:16,spd:9},
        {cx:1100,cy:255,r:65,dir:1,teeth:12,spd:7.5},
      ].map(({cx,cy,r,dir,teeth,spd},i)=>(
        <g key={i} style={{transformOrigin:`${cx}px ${cy}px`,
          animation:`${dir===1?"spin":"spinrev"} ${spd}s linear infinite`}}>
          {/* outer ring */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#C8A96E" strokeWidth="3" opacity="0.16" />
          {/* teeth */}
          {Array.from({length:teeth}).map((_,t)=>(
            <rect key={t}
              x={cx+(r-6)*Math.cos(t*Math.PI*2/teeth)-5}
              y={cy+(r-6)*Math.sin(t*Math.PI*2/teeth)-14}
              width="10" height="22"
              transform={`rotate(${t*360/teeth},${cx},${cy})`}
              fill="#C8A96E" opacity="0.15" rx="2" />
          ))}
          {/* inner ring */}
          <circle cx={cx} cy={cy} r={r*0.65} fill="#040408" stroke="#C8A96E" strokeWidth="1.5" opacity="0.12" />
          {/* spokes */}
          {[0,1,2,3].map(s=>(
            <line key={s}
              x1={cx+r*0.2*Math.cos(s*Math.PI/2)} y1={cy+r*0.2*Math.sin(s*Math.PI/2)}
              x2={cx+r*0.6*Math.cos(s*Math.PI/2)} y2={cy+r*0.6*Math.sin(s*Math.PI/2)}
              stroke="#C8A96E" strokeWidth="2" opacity="0.1" />
          ))}
          {/* hub */}
          <circle cx={cx} cy={cy} r={r*0.18} fill="#0a0a14" stroke="#C8A96E" strokeWidth="1.5" opacity="0.2" />
          <circle cx={cx} cy={cy} r={r*0.07} fill="#C8A96E" opacity="0.15" />
        </g>
      ))}

      {/* workbench */}
      <rect x="60" y="400" width="1100" height="24" rx="4" fill="#0c0c1c" />
      <rect x="60" y="398" width="1100" height="4" fill="#C8A96E" opacity="0.08" />
      {/* bench legs */}
      {[80,560,1120].map((x,i)=>(
        <rect key={i} x={x} y="424" width="18" height="120" fill="#0a0a18" />
      ))}

      {/* floating skill badges */}
      {["Six Sigma GB","CSWA","Lean","PERT","Kanban","VRIO","MS Project",
        "SolidWorks","Python","Tableau","AnyLogic","LabVIEW"].map((s,i)=>(
        <g key={i} className="floatup" style={{animationDelay:`${i*0.58}s`}}>
          <rect x={(i*98+30)%1080+30} y={130+(i*55)%220}
            width={s.length*7.5+18} height="26" rx="4"
            fill="#0a0a1a" stroke="#C8A96E" strokeWidth="0.7" opacity="0.55" />
          <text x={(i*98+30)%1080+39} y={147+(i*55)%220}
            fontSize="10" fill="#C8A96E" opacity="0.65" fontFamily="sans-serif">{s}</text>
        </g>
      ))}
      <rect x="0" y="500" width="1220" height="120" fill="#03030a" />
    </svg>
  );
}

/* ── FINALE: Desert horizon sunrise, Phoenix ── */
function BgHorizon() {
  return (
    <svg className="sbg" viewBox="0 0 1220 620" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="sunrise" cx="50%" cy="98%" r="70%">
          <stop offset="0%" stopColor="#3d1e00" />
          <stop offset="30%" stopColor="#1c0a00" />
          <stop offset="65%" stopColor="#08040e" />
          <stop offset="100%" stopColor="#02020a" />
        </radialGradient>
        <radialGradient id="suncore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#C8A96E" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1220" height="620" fill="url(#sunrise)" />
      {/* faint stars */}
      {Array.from({length:60}).map((_,i)=>(
        <circle key={i} cx={(i*179+12)%1220} cy={(i*73+8)%320} r="0.65"
          fill="white" opacity="0.15" className="twinkle" style={{animationDelay:`${i*0.28}s`}} />
      ))}
      {/* sun halo layers */}
      <circle cx="610" cy="540" r="300" fill="url(#suncore)" />
      <circle cx="610" cy="540" r="120" fill="#C8A96E" opacity="0.08" />
      <circle cx="610" cy="540" r="70" fill="#C8A96E" opacity="0.12" />
      <circle cx="610" cy="540" r="40" fill="#C8A96E" opacity="0.18" />
      {/* sun rays */}
      {Array.from({length:20}).map((_,i)=>(
        <line key={i}
          x1={610+95*Math.cos(i*Math.PI/10)}
          y1={540+95*Math.sin(i*Math.PI/10)}
          x2={610+260*Math.cos(i*Math.PI/10)}
          y2={540+260*Math.sin(i*Math.PI/10)}
          stroke="#C8A96E" strokeWidth="0.8" opacity="0.06" />
      ))}
      {/* horizon line */}
      <rect x="0" y="502" width="1220" height="2" fill="#C8A96E" opacity="0.2" />
      {/* ground */}
      <rect x="0" y="504" width="1220" height="116" fill="#050308" />
      {/* desert landscape silhouette */}
      <path d="M0 504 Q100 490 200 504 Q300 515 400 502 Q500 490 610 504 Q720 515 820 502 Q920 490 1020 504 Q1100 512 1220 504 L1220 620 L0 620 Z"
        fill="#030208" />
      {/* distant city lights Phoenix */}
      {Array.from({length:24}).map((_,i)=>(
        <rect key={i} x={(i*52+30)%1160} y={488-(i%4)*8} width={2+(i%3)} height={4+(i%6)*2}
          fill="#C8A96E" opacity={0.1+(i%5)*0.05} className="flicker"
          style={{animationDelay:`${i*0.3}s`}} />
      ))}
      <text x="610" y="494" textAnchor="middle" fontSize="11" fill="#C8A96E" opacity="0.28"
        fontFamily="Georgia,serif" letterSpacing="10">PHOENIX  ·  ARIZONA</text>
      {/* birds */}
      {[[160,200,0.9],[280,175,1],[450,210,0.85],[640,195,1],[820,215,0.9],[990,188,1],[1100,205,0.85]].map(([x,y,s],i)=>(
        <path key={i}
          d={`M${x} ${y} q${8*+s}-${7*+s} ${16*+s} 0 q${8*+s} ${7*+s} ${16*+s} 0`}
          stroke="#C8A96E" strokeWidth={1.2*+s} fill="none" opacity="0.28"
          className="floatup" style={{animationDelay:`${i*1.1}s`}} />
      ))}
      {/* foreground desert plants */}
      {[[50,500],[1150,500],[200,508],[1020,506]].map(([x,y],i)=>(
        <g key={i}>
          <rect x={x} y={y} width="4" height="50" fill="#120e08" />
          <ellipse cx={x+2} cy={y} rx="12" ry="20" fill="#0e0a06" />
          {/* arms */}
          <rect x={x-14} y={y+10} width="14" height="3" rx="1" fill="#120e08" />
          <ellipse cx={x-14} cy={y+8} rx="5" ry="8" fill="#0e0a06" />
          <rect x={x+4} y={y+18} width="14" height="3" rx="1" fill="#120e08" />
          <ellipse cx={x+18} cy={y+16} rx="5" ry="8" fill="#0e0a06" />
        </g>
      ))}
    </svg>
  );
}

const BGMAP: Record<string, React.FC> = {
  city: BgCity, campus: BgCampus, plant: BgPlant,
  lab: BgLab, data: BgData, workshop: BgWorkshop, horizon: BgHorizon,
};

/* ════════════════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════════════════ */
export default function Home() {
  const [idx,          setIdx]        = useState(0);
  const [phase,        setPhase]      = useState<"scene"|"titlecard">("scene");
  const [sceneVis,     setSceneVis]   = useState(false);
  const [dialogOn,     setDialogOn]   = useState(false);
  const [charX,        setCharX]      = useState(28);
  const [charWalk,     setCharWalk]   = useState(false);
  const [menuOpen,     setMenuOpen]   = useState(false);
  const [infoOpen,     setInfoOpen]   = useState(false);
  const busy   = useRef(false);
  const lastW  = useRef(0);
  const touchX = useRef(0);
  const scene  = SCENES[idx];
  const Bg     = BGMAP[scene.bg];

  /* ── NAVIGATE ── */
  const go = useCallback((next: number) => {
    if (busy.current || next === idx || next < 0 || next >= SCENES.length) return;
    busy.current = true;
    const right = next > idx;

    // 1. char walks out + fade dialogue
    setCharWalk(true);
    setCharX(right ? 120 : -25);
    setDialogOn(false);
    setSceneVis(false);
    setInfoOpen(false);

    // 2. hard cut to title card
    setTimeout(() => {
      setIdx(next);
      setCharX(right ? -18 : 120);
      setPhase("titlecard");
    }, 600);

    // 3. title card shown, then reveal scene
    setTimeout(() => {
      setPhase("scene");
      setSceneVis(true);
    }, 1800);

    // 4. char walks in
    setTimeout(() => {
      setCharX(28);
      setTimeout(() => {
        setCharWalk(false);
        setTimeout(() => { setDialogOn(true); busy.current = false; }, 500);
      }, 700);
    }, 2000);
  }, [idx]);

  /* ── BOOT ── */
  useEffect(() => {
    setPhase("titlecard");
    setTimeout(() => { setPhase("scene"); setSceneVis(true); }, 1600);
    setTimeout(() => { setDialogOn(true); }, 2400);
  }, []);

  /* ── INPUT ── */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key==="ArrowRight"||e.key==="ArrowDown") go(idx+1);
      if (e.key==="ArrowLeft" ||e.key==="ArrowUp")   go(idx-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [idx, go]);

  useEffect(() => {
    const h = (e: WheelEvent) => {
      const n = Date.now();
      if (n - lastW.current < 1100) return;
      lastW.current = n;
      if (e.deltaY > 30) go(idx+1);
      else if (e.deltaY < -30) go(idx-1);
    };
    window.addEventListener("wheel", h, { passive: true });
    return () => window.removeEventListener("wheel", h);
  }, [idx, go]);

  useEffect(() => {
    const ts = (e: TouchEvent) => { touchX.current = e.touches[0].clientX; };
    const te = (e: TouchEvent) => {
      const d = touchX.current - e.changedTouches[0].clientX;
      if (Math.abs(d) < 60) return;
      if (d > 0) go(idx+1); else go(idx-1);
    };
    window.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchend",   te, { passive: true });
    return () => { window.removeEventListener("touchstart", ts); window.removeEventListener("touchend", te); };
  }, [idx, go]);

  const info = INFO[idx];

  return (
    <div className="film">

      {/* ══ BACKGROUND ══ */}
      <div className="bglayer"><Bg /></div>

      {/* ══ VIGNETTE ══ */}
      <div className="vignette" />

      {/* ══ CHAPTER TITLE CARD ══ */}
      <ChapterCard scene={scene} show={phase === "titlecard"} />

      {/* ══ LETTERBOX BARS ══ */}
      <div className="lb lb-top" /><div className="lb lb-bot" />

      {/* ══ INFO DRAWER ══ */}
      <aside className={`drawer ${infoOpen ? "drawer-open" : ""}`}>
        <button className="drawer-close" onClick={() => setInfoOpen(false)}>✕</button>
        {info && (
          <>
            <h3 className="drawer-title">{info.title}</h3>
            {info.rows.map(([k,v],i) => (
              <div className="drow" key={i}>
                <span className="dkey">{k}</span>
                <span className="dval">
                  {k==="Email"    ? <a href={`mailto:${v}`}>{v}</a>
                 : k==="Phone"    ? <a href="tel:+14807425812">{v}</a>
                 : k==="LinkedIn" ? <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer">{v}</a>
                 : k==="GitHub"   ? <a href="https://github.com/bhilarepratham" target="_blank" rel="noreferrer">{v}</a>
                 : v}
                </span>
              </div>
            ))}
          </>
        )}
      </aside>

      {/* ══ SCENE MENU ══ */}
      <div className={`smenu ${menuOpen ? "smenu-open" : ""}`}>
        <button className="smenu-x" onClick={() => setMenuOpen(false)}>✕</button>
        <nav>
          {SCENES.map((s,i) => (
            <button key={s.id} className={`smitem ${i===idx?"smitem-on":""}`}
              onClick={() => { go(i); setMenuOpen(false); }}>
              <span className="smchap">{s.chapter}</span>
              <span className="smtitle">{s.title}</span>
              <span className="smsub">{s.subtitle}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ══ TOP HUD ══ */}
      <header className={`hud-top ${sceneVis ? "hud-in" : ""}`}>
        <button className="brand" onClick={() => go(0)}>
          <div className="brand-mark">PB</div>
          <span>Pratham Bhilare</span>
        </button>
        <div className="hud-chapter">
          <span className="hud-ch">{scene.chapter}</span>
          <span className="hud-ctitle">{scene.title}</span>
        </div>
        <div className="hud-actions">
          <button className="hbtn" onClick={() => setInfoOpen(v => !v)} title="Scene details">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="7" y1="6" x2="7" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="7" cy="4" r="0.8" fill="currentColor"/>
            </svg>
          </button>
          <button className="hbtn hbtn-menu" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </header>

      {/* ══ STAGE ══ */}
      <div className={`stage ${sceneVis ? "stage-in" : ""}`}>
        <div className="groundline" />
        {/* foreground dust particles */}
        <div className="stage-particles" aria-hidden="true">
          {Array.from({length:16}).map((_,i)=>(
            <div key={i} className="dust" style={{
              left:`${(i*67+11)%95}%`,
              animationDelay:`${(i*0.7)%7}s`,
              animationDuration:`${8+(i*1.3)%8}s`,
              width:`${1+(i%3)}px`, height:`${1+(i%3)}px`,
              opacity: 0.06+(i%5)*0.03,
            }} />
          ))}
        </div>
        <div className="charwrap" style={{ left: `${charX}%` }}>
          <Dialogue lines={scene.lines} active={dialogOn} sceneKey={idx} />
          <Character mood={scene.mood} walking={charWalk} />
        </div>
      </div>

      {/* ══ BOTTOM HUD ══ */}
      <div className={`hud-bot ${sceneVis ? "hud-in" : ""}`}>
        <button className="navbtn" onClick={() => go(idx-1)} disabled={idx===0}>‹</button>
        <div className="dots">
          {SCENES.map((s,i) => (
            <button key={s.id} className={`dot ${i===idx?"dot-on":""}`}
              onClick={() => go(i)} title={s.title} />
          ))}
        </div>
        <button className="navbtn" onClick={() => go(idx+1)} disabled={idx===SCENES.length-1}>›</button>
      </div>

      {/* ══ FILM PROGRESS ══ */}
      <div className="filmstrip">
        <div className="filmfill" style={{ width:`${(idx/(SCENES.length-1))*100}%` }} />
      </div>

      {/* ══ HINT (first scene) ══ */}
      {idx===0 && sceneVis && (
        <div className="hint">
          <span>Scroll · Arrow keys · Swipe to navigate</span>
          <span className="hint-arr">→</span>
        </div>
      )}

    </div>
  );
}
