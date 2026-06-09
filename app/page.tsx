"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════
   STORY DATA
══════════════════════════════════════════════════════════════ */
const SCENES = [
  {
    id: "origin",
    chapter: "Prologue",
    title: "A Story Begins",
    subtitle: "Navi Mumbai, India",
    dialogue: [
      "Every great story begins somewhere.",
      "Mine began in Navi Mumbai, India.",
      "A mechanical engineer with a dream.",
    ],
    bg: "city",
    mood: "wave",
    ambient: "stars",
  },
  {
    id: "asu",
    chapter: "Chapter I",
    title: "The Scholar",
    subtitle: "Arizona State University · GPA 3.85",
    dialogue: [
      "Arizona State University. Fall 2024.",
      "MS Management of Technology.",
      "GPA 3.85. Fulton Engineering. My second home.",
    ],
    bg: "campus",
    mood: "study",
    ambient: "particles",
  },
  {
    id: "tata",
    chapter: "Chapter II",
    title: "The Engineer",
    subtitle: "Tata Power · 500MW · 750 MW",
    dialogue: [
      "Trombay Thermal Power Station.",
      "500 MW boilers. Real steel. Real heat.",
      "14 weeks. Zero safety incidents.",
    ],
    bg: "plant",
    mood: "work",
    ambient: "sparks",
  },
  {
    id: "builder",
    chapter: "Chapter III",
    title: "The Builder",
    subtitle: "10 Projects · Real Impact",
    dialogue: [
      "Journey Air. FlazzMart. Warehouse AI.",
      "$54.75M in projected savings.",
      "I don't just study problems. I solve them.",
    ],
    bg: "lab",
    mood: "code",
    ambient: "code",
  },
  {
    id: "analyst",
    chapter: "Chapter IV",
    title: "The Analyst",
    subtitle: "42 Years of Data · R² = 0.998",
    dialogue: [
      "42 years. 4 federal data sources.",
      "OLS regression. R² = 0.998.",
      "Numbers never lie — if you know how to ask.",
    ],
    bg: "data",
    mood: "analyze",
    ambient: "matrix",
  },
  {
    id: "skills",
    chapter: "Chapter V",
    title: "The Toolkit",
    subtitle: "Six Sigma · SolidWorks · Python · Lean",
    dialogue: [
      "Six Sigma Green Belt. CSWA certified.",
      "SolidWorks. Tableau. Python. MS Project.",
      "Always learning. Never stopping.",
    ],
    bg: "workshop",
    mood: "think",
    ambient: "gears",
  },
  {
    id: "finale",
    chapter: "Finale",
    title: "What's Next",
    subtitle: "Open to Summer 2026 · Phoenix, AZ",
    dialogue: [
      "The next chapter is unwritten.",
      "Seeking Summer 2026 — Project Management,",
      "Product, Engineering, Business Analysis.",
    ],
    bg: "horizon",
    mood: "wave",
    ambient: "birds",
  },
];

/* ══════════════════════════════════════════════════════════════
   INFO PANEL DATA
══════════════════════════════════════════════════════════════ */
const INFO: Record<number, { title: string; rows: [string, string][] }> = {
  0: {
    title: "Pratham Bhilare",
    rows: [
      ["Origin",    "Navi Mumbai, India"],
      ["Now",       "Phoenix, Arizona"],
      ["Degree",    "MS Management of Technology"],
      ["School",    "Arizona State University"],
      ["GPA",       "3.85 / 4.0"],
      ["Seeking",   "Summer 2026 roles"],
    ],
  },
  1: {
    title: "Education",
    rows: [
      ["2024–26",  "ASU · MS Management of Technology · GPA 3.85"],
      ["2021–24",  "Pillai College · BTech Mechanical Engineering"],
      ["2018–21",  "Father Agnel · Diploma Mechanical Engineering"],
      ["2018",     "Ryan International School · 10th Standard"],
    ],
  },
  2: {
    title: "Experience",
    rows: [
      ["2025–Now", "ASU · Graduate Teaching Assistant · 50+ students"],
      ["2024",     "Tata Power · Mechanical Maintenance Intern · 14 wks"],
      ["2022–23",  "Matharu Sons · Process Optimization Trainee"],
      ["2020",     "CIPET · Industrial In-Plant Training"],
    ],
  },
  3: {
    title: "Projects",
    rows: [
      ["01", "Journey Air · $54.75M savings · Honeywell sponsored"],
      ["02", "Market Intelligence Dashboard · 50+ companies"],
      ["03", "Warehouse Optimization · 15–18% cost reduction"],
      ["04", "ERP Analysis · $64.83B market · SAP / Oracle / Workday"],
      ["05", "FlazzMart · $5M→$100M · 15-min delivery model"],
      ["06", "BYD Strategy · #1 EV seller · 20,000+ patents"],
      ["07", "Customer Portal · $250K budget · 210-day path"],
      ["08", "VR Usability Testing · 5 issues · 7 fixes"],
      ["09", "Solar PV · 18.22%→20.34% efficiency · published"],
      ["10", "42-Year Economic Study · R²=0.998 · OLS regression"],
    ],
  },
  4: {
    title: "Key Numbers",
    rows: [
      ["15%",    "Logistics cost reduction via AI optimization"],
      ["3.85",   "GPA at ASU Fulton Schools of Engineering"],
      ["$250K",  "Project budget managed end-to-end"],
      ["20.34%", "Solar panel efficiency (up from 18.22%)"],
      ["$100M",  "Projected revenue model (FlazzMart Year 5)"],
      ["42 yrs", "Longitudinal OLS regression study period"],
    ],
  },
  5: {
    title: "Skills & Certs",
    rows: [
      ["Ops",      "WBS · Lean · Six Sigma · Kanban · PERT · Risk"],
      ["Data",     "OLS Regression · Python · Pandas · Tableau · Excel"],
      ["Strategy", "Porter's Five Forces · VRIO · TAM/SAM/SOM · BMC"],
      ["Tools",    "SolidWorks · Ansys · AnyLogic · LabVIEW · MS Project"],
      ["Cert ✓",   "Six Sigma Green Belt · CSWA · Tableau · PM Intl"],
      ["Soft",     "Stakeholder Mgmt · Technical Docs · Instruction"],
    ],
  },
  6: {
    title: "Get in Touch",
    rows: [
      ["Email",    "pratham.bhilare1010@gmail.com"],
      ["Phone",    "+1 (480) 742-5812"],
      ["LinkedIn", "linkedin.com/in/prathambhilare"],
      ["GitHub",   "github.com/bhilarepratham"],
      ["Location", "Phoenix, AZ — open to relocation"],
      ["Status",   "Seeking Summer 2026 opportunities"],
    ],
  },
};

/* ══════════════════════════════════════════════════════════════
   CHARACTER SVG
══════════════════════════════════════════════════════════════ */
function Character({ mood, walking }: { mood: string; walking: boolean }) {
  return (
    <svg viewBox="0 0 90 160" width="90" height="160" className={`char ${walking ? "walking" : ""}`} style={{ overflow: "visible" }}>
      {/* Drop shadow */}
      <ellipse cx="45" cy="157" rx="22" ry="5" fill="rgba(0,0,0,0.5)" />

      {/* Legs */}
      <rect x="28" y="112" width="13" height="38" rx="4" fill="#0e0e20" className="leg-l" />
      <rect x="49" y="112" width="13" height="38" rx="4" fill="#0e0e20" className="leg-r" />

      {/* Shoes */}
      <ellipse cx="34" cy="151" rx="11" ry="5" fill="#C8A96E" />
      <ellipse cx="55" cy="151" rx="11" ry="5" fill="#C8A96E" />

      {/* Body — suit */}
      <rect x="22" y="65" width="46" height="52" rx="5" fill="#111128" />
      {/* Suit collar stripe */}
      <rect x="22" y="65" width="46" height="10" rx="3" fill="#1a1a38" />
      {/* Gold tie */}
      <polygon points="45,68 42,80 45,85 48,80" fill="#C8A96E" opacity="0.9" />
      {/* Lapels */}
      <polygon points="22,65 36,65 33,82" fill="#0e0e20" />
      <polygon points="68,65 54,65 57,82" fill="#0e0e20" />
      {/* Pocket square */}
      <polygon points="26,73 32,73 30,68" fill="#C8A96E" opacity="0.5" />

      {/* Neck */}
      <rect x="39" y="55" width="12" height="14" rx="3" fill="#c8956c" />

      {/* Head */}
      <circle cx="45" cy="38" r="26" fill="#c8956c" />

      {/* Hair */}
      <ellipse cx="45" cy="16" rx="25" ry="14" fill="#120800" />
      <path d="M20 26 Q22 10 45 12 Q68 10 70 26" fill="#120800" />
      {/* Hair highlight */}
      <path d="M30 16 Q40 12 55 15" stroke="#2a1200" strokeWidth="3" fill="none" />

      {/* Ears */}
      <ellipse cx="19" cy="40" rx="5" ry="7" fill="#b87c52" />
      <ellipse cx="71" cy="40" rx="5" ry="7" fill="#b87c52" />

      {/* Eyes */}
      {mood === "analyze" ? (
        <>
          <ellipse cx="35" cy="39" rx="6" ry="4" fill="white" />
          <circle cx="36" cy="39" r="3" fill="#0a0a1a" />
          <ellipse cx="55" cy="39" rx="6" ry="4" fill="white" />
          <circle cx="54" cy="39" r="3" fill="#0a0a1a" />
          {/* Focused pupils */}
          <circle cx="36" cy="39" r="1.5" fill="#C8A96E" opacity="0.6" />
          <circle cx="54" cy="39" r="1.5" fill="#C8A96E" opacity="0.6" />
        </>
      ) : (
        <>
          <ellipse cx="35" cy="39" rx="5" ry="5" fill="white" />
          <circle cx="35" cy="39" r="3" fill="#0a0a1a" />
          <ellipse cx="55" cy="39" rx="5" ry="5" fill="white" />
          <circle cx="55" cy="39" r="3" fill="#0a0a1a" />
        </>
      )}
      {/* Eye shine */}
      <circle cx="36" cy="37" r="1.2" fill="white" opacity="0.85" />
      <circle cx="56" cy="37" r="1.2" fill="white" opacity="0.85" />

      {/* Eyebrows */}
      {mood === "work"    && <><path d="M29 31 Q35 28 40 31" stroke="#120800" strokeWidth="2.5" fill="none" strokeLinecap="round" /><path d="M49 31 Q55 28 61 31" stroke="#120800" strokeWidth="2.5" fill="none" strokeLinecap="round" /></>}
      {mood === "analyze" && <><path d="M29 30 Q35 27 41 30" stroke="#120800" strokeWidth="2.5" fill="none" strokeLinecap="round" /><path d="M49 30 Q55 27 61 30" stroke="#120800" strokeWidth="2.5" fill="none" strokeLinecap="round" /></>}
      {mood === "study"   && <><path d="M30 32 Q35 30 40 32" stroke="#120800" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M50 32 Q55 30 60 32" stroke="#120800" strokeWidth="2" fill="none" strokeLinecap="round" /></>}
      {(mood === "wave" || mood === "code" || mood === "think") && <><path d="M30 33 Q35 31 40 33" stroke="#120800" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M50 33 Q55 31 60 33" stroke="#120800" strokeWidth="2" fill="none" strokeLinecap="round" /></>}

      {/* Mouth expressions */}
      {mood === "wave"    && <path d="M36 52 Q45 59 54 52" stroke="#7a3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
      {mood === "study"   && <path d="M38 52 Q45 56 52 52" stroke="#7a3a1a" strokeWidth="2" fill="none" strokeLinecap="round" />}
      {mood === "work"    && <line x1="37" y1="53" x2="53" y2="53" stroke="#7a3a1a" strokeWidth="2" strokeLinecap="round" />}
      {mood === "code"    && <path d="M37 52 Q45 57 53 52" stroke="#7a3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
      {mood === "analyze" && <path d="M37 54 Q45 49 53 54" stroke="#7a3a1a" strokeWidth="2" fill="none" strokeLinecap="round" />}
      {mood === "think"   && <path d="M38 53 Q45 56 52 53" stroke="#7a3a1a" strokeWidth="2" fill="none" strokeLinecap="round" />}

      {/* Arms */}
      {mood === "wave" ? (
        <>
          <line x1="22" y1="78" x2="2" y2="52" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" className="arm-wave" />
          <line x1="68" y1="78" x2="80" y2="100" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
        </>
      ) : mood === "study" ? (
        <>
          <line x1="22" y1="78" x2="8" y2="102" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          <line x1="68" y1="78" x2="78" y2="72" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          {/* Book */}
          <rect x="73" y="60" width="22" height="18" rx="2" fill="#C8A96E" opacity="0.85" />
          <line x1="84" y1="61" x2="84" y2="77" stroke="#8a7040" strokeWidth="1.2" />
          <line x1="76" y1="65" x2="82" y2="65" stroke="#8a7040" strokeWidth="0.8" opacity="0.6" />
          <line x1="76" y1="69" x2="82" y2="69" stroke="#8a7040" strokeWidth="0.8" opacity="0.6" />
        </>
      ) : mood === "work" ? (
        <>
          <line x1="22" y1="78" x2="4" y2="94" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          <line x1="68" y1="78" x2="84" y2="74" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          {/* Wrench */}
          <rect x="80" y="66" width="14" height="6" rx="3" fill="#888" />
          <rect x="78" y="65" width="5" height="8" rx="2" fill="#aaa" />
        </>
      ) : mood === "code" ? (
        <>
          <line x1="22" y1="78" x2="5" y2="90" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          <line x1="68" y1="78" x2="82" y2="90" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          {/* Laptop */}
          <rect x="7" y="95" width="26" height="18" rx="2" fill="#0a1020" stroke="#C8A96E" strokeWidth="0.8" opacity="0.8" />
          <rect x="9" y="97" width="22" height="14" rx="1" fill="#0d1428" />
          {[0,1,2].map(r=><rect key={r} x={11} y={99+r*4} width={8+(r*4)%10} height="2" fill="#C8A96E" opacity="0.3" rx="1" />)}
        </>
      ) : mood === "analyze" ? (
        <>
          <line x1="22" y1="78" x2="8" y2="74" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          <line x1="68" y1="78" x2="82" y2="72" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          {/* Clipboard with chart */}
          <rect x="78" y="58" width="22" height="28" rx="2" fill="#080c14" stroke="#C8A96E" strokeWidth="0.8" opacity="0.9" />
          <polyline points="81,82 84,74 88,78 92,68 96,72" stroke="#C8A96E" strokeWidth="1.5" fill="none" />
          <line x1="80" y1="84" x2="98" y2="84" stroke="#C8A96E" strokeWidth="0.6" opacity="0.4" />
          <text x="88" y="64" textAnchor="middle" fontSize="5" fill="#C8A96E" opacity="0.7">0.998</text>
        </>
      ) : (
        <>
          <line x1="22" y1="78" x2="8" y2="98" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          <line x1="68" y1="78" x2="80" y2="94" stroke="#c8956c" strokeWidth="9" strokeLinecap="round" />
          {/* Thought bubble */}
          <circle cx="62" cy="28" r="3.5" fill="rgba(200,169,110,0.25)" />
          <circle cx="70" cy="19" r="5.5" fill="rgba(200,169,110,0.22)" />
          <circle cx="80" cy="10" r="9" fill="rgba(200,169,110,0.18)" stroke="#C8A96E" strokeWidth="0.5" />
          <text x="80" y="14" textAnchor="middle" fontSize="9" fill="#C8A96E">?</text>
        </>
      )}

      {/* Collar / shirt cuff highlights */}
      <line x1="38" y1="65" x2="52" y2="65" stroke="#C8A96E" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   TYPEWRITER DIALOGUE BUBBLE
══════════════════════════════════════════════════════════════ */
function DialogueBubble({ lines, active, sceneKey }: { lines: string[]; active: boolean; sceneKey: number }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [typed,   setTyped]   = useState("");
  const [done,    setDone]    = useState(false);

  useEffect(() => { setLineIdx(0); setTyped(""); setDone(false); }, [sceneKey]);

  useEffect(() => {
    if (!active) return;
    const line = lines[lineIdx] ?? "";
    setTyped(""); setDone(false);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) { clearInterval(t); setDone(true); }
    }, 30);
    return () => clearInterval(t);
  }, [lineIdx, active, lines]);

  const advance = () => { if (done && lineIdx < lines.length - 1) setLineIdx(n => n + 1); };

  return (
    <div className={`bubble ${active ? "bubble-in" : ""}`}
      onClick={advance} role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && advance()}>
      <div className="bubble-notch" />
      <p className="bubble-text">
        {typed}
        <span className={`caret ${done ? "caret-blink" : ""}`}>▋</span>
      </p>
      {done && lineIdx < lines.length - 1 && <div className="bubble-next">▶</div>}
      <div className="bubble-pips">
        {lines.map((_, i) => <span key={i} className={`pip ${i <= lineIdx ? "pip-on" : ""}`} />)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SVG BACKGROUNDS
══════════════════════════════════════════════════════════════ */
function CityBg() {
  const wins = [
    [0,180,110,420],[120,210,90,390],[220,150,130,450],[365,195,95,405],
    [475,165,120,435],[610,225,80,375],[705,175,115,425],[835,200,100,400],
    [950,160,125,440],[1090,215,95,385],
  ];
  return (
    <svg className="sbg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="nightsky" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#0a0a1f" />
          <stop offset="60%" stopColor="#04040e" />
          <stop offset="100%" stopColor="#02020a" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8e0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#fff8e0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#nightsky)" />
      {/* Stars */}
      {Array.from({length:80}).map((_,i)=>(
        <circle key={i} cx={(i*173+47)%1200} cy={(i*97+13)%280} r={0.6+(i%4)*0.3}
          fill="white" opacity={0.2+(i%6)*0.1} className="twinkle" style={{animationDelay:`${(i*0.25)%5}s`}} />
      ))}
      {/* Moon */}
      <circle cx="880" cy="75" r="55" fill="url(#moonGlow)" />
      <circle cx="880" cy="75" r="40" fill="#f0e8d0" opacity="0.92" />
      <circle cx="898" cy="62" r="33" fill="#0a0a1f" />
      {/* Moon craters */}
      <circle cx="870" cy="72" r="4" fill="rgba(0,0,0,0.12)" />
      <circle cx="882" cy="84" r="2.5" fill="rgba(0,0,0,0.1)" />
      {/* Buildings */}
      {wins.map(([x,y,w,h],bi)=>(
        <g key={bi}>
          <rect x={x} y={y} width={w} height={h} fill={`hsl(230,22%,${7+bi%5}%)`} />
          {/* Rooftop detail */}
          <rect x={x+w*0.3} y={y-12} width={w*0.4} height={14} fill={`hsl(230,22%,${9+bi%4}%)`} />
          {/* Windows */}
          {Array.from({length:Math.floor((h-20)/32)}).map((_,row)=>
            Array.from({length:Math.floor(w/22)}).map((_,col)=>{
              const lit = (bi*7+row*3+col*5)%10 > 3;
              return <rect key={`${row}-${col}`}
                x={x+6+col*22} y={y+14+row*30} width="12" height="16"
                fill={lit?"#C8A96E":"#0d0d22"}
                opacity={lit?(0.4+((bi+row+col)%5)*0.1):0.18}
                className={lit&&(bi+row+col)%4===0?"flicker":""} style={{animationDelay:`${((bi+row*col)*0.4)%6}s`}} />
            })
          )}
        </g>
      ))}
      {/* Street */}
      <rect x="0" y="540" width="1200" height="60" fill="#070710" />
      <rect x="0" y="538" width="1200" height="3" fill="#C8A96E" opacity="0.2" />
      {/* Street lights */}
      {[100,280,460,640,820,1000].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="480" width="3" height="60" fill="#1a1a30" />
          <ellipse cx={x+1} cy="482" rx="18" ry="8" fill="#C8A96E" opacity="0.06" />
          <circle cx={x+1} cy="482" r="3" fill="#C8A96E" opacity="0.7" />
        </g>
      ))}
      {/* Reflection in street */}
      <rect x="0" y="541" width="1200" height="20" fill="url(#nightsky)" opacity="0.5" />
    </svg>
  );
}

function CampusBg() {
  return (
    <svg className="sbg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="campusSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060618" />
          <stop offset="100%" stopColor="#0c0c22" />
        </linearGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#campusSky)" />
      {Array.from({length:40}).map((_,i)=>(
        <circle key={i} cx={(i*211+30)%1200} cy={(i*83)%220} r="0.8"
          fill="white" opacity="0.25" className="twinkle" style={{animationDelay:`${i*0.4}s`}} />
      ))}
      {/* Main ASU building */}
      <rect x="280" y="100" width="640" height="420" fill="#0a0a1a" />
      {/* Pediment */}
      <polygon points="280,100 600,40 920,100" fill="#0c0c1e" />
      <polygon points="300,100 600,46 900,100" fill="#0e0e22" />
      {/* Gold header band */}
      <rect x="280" y="100" width="640" height="14" fill="#C8A96E" opacity="0.35" />
      {/* Columns */}
      {[310,380,450,520,590,660,730,800,870].map((x,i)=>(
        <g key={i}>
          <rect x={x} y={114} width={18} height={406} fill="#0f0f22" />
          <rect x={x} y={114} width={18} height={406} fill="#C8A96E" opacity="0.03" />
          <ellipse cx={x+9} cy={114} rx={11} ry={5} fill="#141430" />
        </g>
      ))}
      {/* Windows */}
      {[0,1,2,3,4].map(row=>
        [0,1,2,3,4,5,6,7].map(col=>(
          <g key={`${row}-${col}`}>
            <rect x={300+col*78} y={130+row*76} width={48} height={62} fill="#0d1030" />
            <rect x={300+col*78} y={130+row*76} width={48} height={62}
              fill="#C8A96E" opacity={(row+col)%3===0?0.12:0.03}
              className={(row+col)%4===0?"flicker":""} style={{animationDelay:`${(row*col*0.3)%5}s`}} />
            <line x1={324+col*78} y1={130+row*76} x2={324+col*78} y2={192+row*76} stroke="#1a1a3a" strokeWidth="1" opacity="0.4" />
          </g>
        ))
      )}
      {/* ASU lettering */}
      <text x="600" y="80" textAnchor="middle" fontSize="22" fill="#C8A96E" opacity="0.6"
        fontFamily="Georgia,serif" letterSpacing="8">A S U</text>
      {/* Ground */}
      <rect x="0" y="520" width="1200" height="80" fill="#060610" />
      <rect x="220" y="518" width="760" height="4" fill="#C8A96E" opacity="0.15" />
      {/* Trees */}
      {[80,160,990,1090].map((x,i)=>(
        <g key={i}>
          <rect x={x+10} y="430" width="16" height="90" fill="#0e0e08" />
          <ellipse cx={x+18} cy="410" rx="35" ry="48" fill="#0a140a" />
          <ellipse cx={x+18} cy="395" rx="28" ry="38" fill="#0c180c" />
        </g>
      ))}
      {/* Math/science particles */}
      {["∑","π","∫","Δ","λ","∇","∂","∞","α","β"].map((s,i)=>(
        <text key={i} x={(i*130+40)%1100} y={360-(i*28)%180} fontSize="13"
          fill="#C8A96E" opacity="0.15" className="floatup" style={{animationDelay:`${i*0.55}s`}}>{s}</text>
      ))}
    </svg>
  );
}

function PlantBg() {
  return (
    <svg className="sbg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
      <rect width="1200" height="600" fill="#020208" />
      <rect width="1200" height="320" fill="#050510" />
      {/* Cooling towers */}
      {[[80,60,140,420],[300,50,155,440],[850,55,148,435],[1040,65,130,415]].map(([x,y,w,h],i)=>(
        <g key={i}>
          <path d={`M${x} ${y+h} C${x+w*0.15} ${y+h*0.3} ${x+w*0.3} ${y+20} ${x+w/2} ${y+30} C${x+w*0.7} ${y+20} ${x+w*0.85} ${y+h*0.3} ${x+w} ${y+h}`}
            fill="#0a0a18" />
          <path d={`M${x+w*0.15} ${y+h} C${x+w*0.28} ${y+h*0.5} ${x+w*0.38} ${y+35} ${x+w/2} ${y+42} C${x+w*0.62} ${y+35} ${x+w*0.72} ${y+h*0.5} ${x+w*0.85} ${y+h}`}
            fill="#0e0e22" />
          {/* Steam plumes */}
          {[0,1,2].map(s=>(
            <ellipse key={s} cx={x+w/2} cy={y-20-s*25} rx={20-s*3} ry={12-s*2}
              fill="white" opacity={0.03-s*0.005} className="steam" style={{animationDelay:`${i*0.6+s*0.3}s`}} />
          ))}
        </g>
      ))}
      {/* Main building */}
      <rect x="470" y="160" width="260" height="380" fill="#080814" />
      <rect x="460" y="148" width="280" height="18" fill="#C8A96E" opacity="0.25" />
      {/* Pipes */}
      {[500,540,580,620,660,700].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="178" width="14" height="342" fill="#0c0c1e" />
          <line x1={x+7} y1="178" x2={x+7} y2="520" stroke="#C8A96E" strokeWidth="0.5" opacity="0.08" />
        </g>
      ))}
      {/* Control room window */}
      <rect x="550" y="260" width="100" height="70" fill="#0a1428" opacity="0.9" />
      <rect x="550" y="260" width="100" height="70" fill="none" stroke="#C8A96E" strokeWidth="0.8" opacity="0.5" />
      <rect x="550" y="260" width="100" height="70" fill="#C8A96E" opacity="0.04" className="flicker" style={{animationDelay:"0.5s"}} />
      {/* Warning lights */}
      {[490,525,560,595,630,665,700].map((x,i)=>(
        <circle key={i} cx={x} cy="168" r="4"
          fill={i%3===0?"#ff3333":i%3===1?"#C8A96E":"#33ff88"} opacity="0.75"
          className="warnblink" style={{animationDelay:`${i*0.35}s`}} />
      ))}
      {/* Sparks */}
      {Array.from({length:12}).map((_,i)=>(
        <circle key={i} cx={480+(i*70)%280} cy={280+(i*30)%120} r="1.5"
          fill="#ffaa00" opacity="0.7" className="sparkle" style={{animationDelay:`${i*0.4}s`}} />
      ))}
      {/* Ground */}
      <rect x="0" y="508" width="1200" height="92" fill="#03030a" />
      <rect x="0" y="506" width="1200" height="3" fill="#C8A96E" opacity="0.12" />
    </svg>
  );
}

function LabBg() {
  return (
    <svg className="sbg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
      <rect width="1200" height="600" fill="#030310" />
      {/* Perspective grid floor */}
      {Array.from({length:16}).map((_,i)=>(
        <line key={`h${i}`} x1="0" y1={480+i*8} x2="1200" y2={480+i*8}
          stroke="#C8A96E" strokeWidth="0.4" opacity={0.04+i*0.003} />
      ))}
      {Array.from({length:32}).map((_,i)=>(
        <line key={`v${i}`} x1={i*40} y1="480" x2={i*40} y2="600"
          stroke="#C8A96E" strokeWidth="0.4" opacity="0.04" />
      ))}
      {/* Workstations */}
      {[60,360,720,1000].map((x,wi)=>(
        <g key={wi}>
          <rect x={x} y="390" width="190" height="14" rx="3" fill="#0e0e22" />
          <rect x={x+5} y="380" width="90" height="40" rx="3" fill="#111" />
          {/* Monitor */}
          <rect x={x+8} y="260" width="176" height="122" rx="4" fill="#0a1020" />
          <rect x={x+8} y="260" width="176" height="122" rx="4" fill="none" stroke="#C8A96E" strokeWidth="0.6" opacity="0.4" />
          {/* Screen content */}
          <rect x={x+12} y="264" width="168" height="114" rx="2" fill="#060e18" />
          {[0,1,2,3,4,5,6].map(row=>(
            <rect key={row} x={x+16} y={270+row*15} width={20+(row*37)%110} height="5"
              fill="#C8A96E" opacity={0.08+row*0.03} rx="1" />
          ))}
          {/* Cursor blink */}
          <rect x={x+16} y="375" width="6" height="8" fill="#C8A96E" opacity="0.5" className="warnblink" />
          {/* Monitor stand */}
          <rect x={x+88} y="382" width="12" height="20" fill="#0e0e22" />
        </g>
      ))}
      {/* Floating code tokens */}
      {["if()","===","=>","{...}","async","await","O(n)","API","SQL","[]","()=>","null"].map((t,i)=>(
        <text key={i} x={(i*110+20)%1150} y={60+(i*58)%360} fontSize="11"
          fill="#C8A96E" opacity="0.14" fontFamily="monospace"
          className="floatup" style={{animationDelay:`${i*0.5}s`}}>{t}</text>
      ))}
      {/* Node connection lines */}
      {[[150,320,400,260],[500,280,800,340],[200,400,650,360],[750,300,1050,280]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#C8A96E" strokeWidth="0.6" opacity="0.1"
          strokeDasharray="5 10" className="dashmove" style={{animationDelay:`${i}s`}} />
      ))}
      {/* Node dots */}
      {[[150,320],[400,260],[500,280],[800,340],[200,400],[650,360],[750,300],[1050,280]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3" fill="#C8A96E" opacity="0.2" />
      ))}
      <rect x="0" y="488" width="1200" height="112" fill="#030310" />
    </svg>
  );
}

function DataBg() {
  return (
    <svg className="sbg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
      <rect width="1200" height="600" fill="#020208" />
      {/* Matrix rain columns */}
      {Array.from({length:32}).map((_,i)=>(
        <text key={i} x={i*38+8} y="0" fontSize="13" fill="#C8A96E" fontFamily="monospace"
          className="matrixfall" opacity="0.18"
          style={{animationDelay:`${(i*0.28)%4}s`,animationDuration:`${2.5+(i%5)*0.8}s`}}>
          {["0","1","Σ","∫","λ","π","∞"][i%7]}
        </text>
      ))}
      {/* Server racks */}
      {[40,175,310,860,995,1130].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="130" width="110" height="380" rx="3" fill="#080812" />
          <rect x={x} y="130" width="110" height="380" rx="3" fill="none" stroke="#C8A96E" strokeWidth="0.4" opacity="0.2" />
          {Array.from({length:14}).map((_,row)=>(
            <g key={row}>
              <rect x={x+5} y={138+row*26} width="100" height="18" rx="2" fill="#0c0c1e" />
              <circle cx={x+97} cy={147+row*26} r="3.5"
                fill={row%4===0?"#00ee88":row%4===1?"#C8A96E":row%4===2?"#4488ff":"#ff4444"}
                opacity="0.8" className="warnblink" style={{animationDelay:`${(i+row)*0.18}s`}} />
              <rect x={x+8} y={141+row*26} width={30+(i+row)%40} height="4" fill="#C8A96E" opacity="0.07" rx="1" />
            </g>
          ))}
        </g>
      ))}
      {/* Central holographic display */}
      <g transform="translate(600,310)">
        <ellipse cx="0" cy="100" rx="140" ry="22" fill="#C8A96E" opacity="0.04" />
        <ellipse cx="0" cy="100" rx="100" ry="14" fill="#C8A96E" opacity="0.06" />
        {/* Bars */}
        {[35,65,48,88,55,78,42,92,60,70].map((h,i)=>(
          <rect key={i} x={-105+i*24} y={100-h} width="18" height={h}
            fill="#C8A96E" opacity={0.08+i*0.025} className="bargrow" style={{animationDelay:`${i*0.08}s`}} />
        ))}
        <line x1="-110" y1="100" x2="110" y2="100" stroke="#C8A96E" strokeWidth="1" opacity="0.25" />
        {/* R² label */}
        <text x="0" y="-20" textAnchor="middle" fontSize="12" fill="#C8A96E" opacity="0.5"
          fontFamily="monospace">R² = 0.998</text>
        <text x="0" y="-6" textAnchor="middle" fontSize="8" fill="#C8A96E" opacity="0.3"
          fontFamily="monospace">p = 1.02E-47</text>
        {/* Trend line */}
        <polyline points="-105,98 -80,72 -55,80 -30,50 -5,62 20,35 45,48 70,22 95,30"
          stroke="#C8A96E" strokeWidth="1.5" fill="none" opacity="0.35" />
      </g>
      <rect x="0" y="510" width="1200" height="90" fill="#020208" />
    </svg>
  );
}

function WorkshopBg() {
  return (
    <svg className="sbg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
      <rect width="1200" height="600" fill="#030308" />
      <rect width="1200" height="520" fill="#060610" />
      {/* Shelf */}
      <rect x="0" y="90" width="1200" height="10" fill="#0e0e1e" />
      {/* Rotating gears */}
      {[[180,270,50,1],[420,240,65,−1],[720,280,42,1],[980,255,58,−1],[1100,240,36,1]].map(([cx,cy,r,dir],i)=>(
        <g key={i} style={{transformOrigin:`${cx}px ${cy}px`,animation:`${dir===1?"spin":"spinrev"} ${5+i*1.2}s linear infinite`}}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#C8A96E" strokeWidth="2.5" opacity="0.18" />
          {Array.from({length:10}).map((_,t)=>(
            <rect key={t}
              x={cx+(r-5)*Math.cos(t*Math.PI/5)-4}
              y={cy+(r-5)*Math.sin(t*Math.PI/5)-10}
              width="7" height="18"
              transform={`rotate(${t*36},${cx},${cy})`}
              fill="#C8A96E" opacity="0.18" rx="1.5" />
          ))}
          <circle cx={cx} cy={cy} r={r*0.32} fill="#0a0a14" stroke="#C8A96E" strokeWidth="1.2" opacity="0.25" />
          <circle cx={cx} cy={cy} r={r*0.12} fill="#C8A96E" opacity="0.2" />
        </g>
      ))}
      {/* Workbench */}
      <rect x="80" y="390" width="1040" height="22" rx="3" fill="#0d0d1e" />
      <rect x="80" y="390" width="1040" height="3" fill="#C8A96E" opacity="0.1" />
      {/* Floating skill badges */}
      {["Six Sigma","SolidWorks","Lean","PERT","Kanban","VRIO","CSWA","MS Project"].map((s,i)=>(
        <g key={i} className="floatup" style={{animationDelay:`${i*0.65}s`}}>
          <rect x={(i*148)%1000+30} y={130+(i*55)%200} width={s.length*7+18} height="24" rx="4"
            fill="#0c0c1e" stroke="#C8A96E" strokeWidth="0.6" opacity="0.55" />
          <text x={(i*148)%1000+39} y={146+(i*55)%200} fontSize="10"
            fill="#C8A96E" opacity="0.65" fontFamily="sans-serif">{s}</text>
        </g>
      ))}
      <rect x="0" y="494" width="1200" height="106" fill="#03030a" />
    </svg>
  );
}

function HorizonBg() {
  return (
    <svg className="sbg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="goldsun" cx="50%" cy="95%" r="65%">
          <stop offset="0%" stopColor="#3d2200" />
          <stop offset="35%" stopColor="#1e0e00" />
          <stop offset="100%" stopColor="#030308" />
        </radialGradient>
        <radialGradient id="sunhalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#goldsun)" />
      {Array.from({length:50}).map((_,i)=>(
        <circle key={i} cx={(i*173)%1200} cy={(i*67)%300} r="0.7"
          fill="white" opacity="0.18" className="twinkle" style={{animationDelay:`${i*0.3}s`}} />
      ))}
      {/* Rising sun disk */}
      <circle cx="600" cy="530" r="200" fill="url(#sunhalo)" />
      <circle cx="600" cy="530" r="90" fill="#C8A96E" opacity="0.1" />
      <circle cx="600" cy="530" r="55" fill="#C8A96E" opacity="0.14" />
      {/* Sun rays */}
      {Array.from({length:16}).map((_,i)=>(
        <line key={i}
          x1={600+92*Math.cos(i*Math.PI/8)} y1={530+92*Math.sin(i*Math.PI/8)}
          x2={600+200*Math.cos(i*Math.PI/8)} y2={530+200*Math.sin(i*Math.PI/8)}
          stroke="#C8A96E" strokeWidth="0.8" opacity="0.08" />
      ))}
      {/* Horizon line */}
      <rect x="0" y="500" width="1200" height="2" fill="#C8A96E" opacity="0.22" />
      <rect x="0" y="502" width="1200" height="98" fill="#04030a" />
      {/* Phoenix text */}
      <text x="600" y="490" textAnchor="middle" fontSize="11" fill="#C8A96E" opacity="0.3"
        fontFamily="Georgia,serif" letterSpacing="8">PHOENIX  ·  ARIZONA</text>
      {/* Birds */}
      {[[180,200],[320,175],[500,215],[750,195],[920,210],[1060,182]].map(([x,y],i)=>(
        <path key={i} d={`M${x} ${y} q7-7 14 0 q7 7 14 0`}
          stroke="#C8A96E" strokeWidth="1.3" fill="none" opacity="0.3"
          className="floatup" style={{animationDelay:`${i*1.1}s`}} />
      ))}
    </svg>
  );
}

const BGMAP: Record<string, React.FC> = {
  city: CityBg, campus: CampusBg, plant: PlantBg,
  lab: LabBg, data: DataBg, workshop: WorkshopBg, horizon: HorizonBg,
};

/* ══════════════════════════════════════════════════════════════
   TITLE CARD
══════════════════════════════════════════════════════════════ */
function TitleCard({ scene, vis }: { scene: typeof SCENES[0]; vis: boolean }) {
  return (
    <div className={`titlecard ${vis ? "tc-in" : ""}`}>
      <span className="tc-chapter">{scene.chapter}</span>
      <span className="tc-sep">·</span>
      <span className="tc-title">{scene.title}</span>
      <span className="tc-sub">{scene.subtitle}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [idx,        setIdx]        = useState(0);
  const [cutting,    setCutting]    = useState(false);
  const [titleVis,   setTitleVis]   = useState(false);
  const [dialogOn,   setDialogOn]   = useState(false);
  const [charX,      setCharX]      = useState(28);
  const [charWalk,   setCharWalk]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [infoOpen,   setInfoOpen]   = useState(false);
  const busy    = useRef(false);
  const lastW   = useRef(0);
  const touchX  = useRef(0);
  const scene   = SCENES[idx];
  const Bg      = BGMAP[scene.bg];

  const go = useCallback((next: number) => {
    if (busy.current || next === idx || next < 0 || next >= SCENES.length) return;
    busy.current = true;
    const right = next > idx;

    setCharWalk(true);
    setCharX(right ? 115 : -20);
    setDialogOn(false);
    setTitleVis(false);
    setInfoOpen(false);

    setTimeout(() => setCutting(true), 480);

    setTimeout(() => {
      setIdx(next);
      setCharX(right ? -15 : 115);
      setCutting(false);
      setTimeout(() => {
        setCharX(28);
        setTimeout(() => {
          setCharWalk(false);
          setTitleVis(true);
          setTimeout(() => { setDialogOn(true); busy.current = false; }, 700);
        }, 750);
      }, 80);
    }, 680);
  }, [idx]);

  useEffect(() => {
    setTimeout(() => setTitleVis(true), 300);
    setTimeout(() => setDialogOn(true), 1000);
  }, []);

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
      if (n - lastW.current < 950) return;
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
      if (Math.abs(d) < 55) return;
      if (d > 0) go(idx+1); else go(idx-1);
    };
    window.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchend",   te, { passive: true });
    return () => { window.removeEventListener("touchstart", ts); window.removeEventListener("touchend", te); };
  }, [idx, go]);

  const info = INFO[idx];

  return (
    <div className="film">

      {/* ── FILM CUT ── */}
      <div className={`filmcut ${cutting ? "cutting" : ""}`}>
        <div className="fc-top" /><div className="fc-bot" />
      </div>

      {/* ── BG ── */}
      <div className="bglayer"><Bg /></div>

      {/* ── VIGNETTE ── */}
      <div className="vignette" />

      {/* ── LETTERBOX ── */}
      <div className="lb lb-top" /><div className="lb lb-bot" />

      {/* ── INFO DRAWER ── */}
      <aside className={`drawer ${infoOpen ? "drawer-open" : ""}`}>
        <button className="drawer-close" onClick={() => setInfoOpen(false)}>✕</button>
        {info && (
          <>
            <h3 className="drawer-title">{info.title}</h3>
            {info.rows.map(([k,v],i) => (
              <div className="drow" key={i}>
                <span className="dkey">{k}</span>
                <span className="dval">
                  {k==="Email"  ? <a href={`mailto:${v}`}>{v}</a>
                 : k==="Phone"  ? <a href={`tel:+14807425812`}>{v}</a>
                 : k==="LinkedIn" ? <a href="https://www.linkedin.com/in/prathambhilare" target="_blank" rel="noreferrer">{v}</a>
                 : k==="GitHub"   ? <a href="https://github.com/bhilarepratham" target="_blank" rel="noreferrer">{v}</a>
                 : v}
                </span>
              </div>
            ))}
          </>
        )}
      </aside>

      {/* ── SCENE MENU ── */}
      <div className={`smenu ${menuOpen ? "smenu-open" : ""}`}>
        <button className="smenu-x" onClick={() => setMenuOpen(false)}>✕</button>
        <nav>
          {SCENES.map((s, i) => (
            <button key={s.id} className={`smitem ${i===idx?"smitem-on":""}`}
              onClick={() => { go(i); setMenuOpen(false); }}>
              <span className="smchap">{s.chapter}</span>
              <span className="smtitle">{s.title}</span>
              <span className="smsub">{s.subtitle}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ── TOP HUD ── */}
      <header className="hud-top">
        <button className="brand" onClick={() => go(0)}>
          <div className="brand-mark">PB</div>
          <span>Pratham Bhilare</span>
        </button>

        <TitleCard scene={scene} vis={titleVis} />

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

      {/* ── STAGE ── */}
      <div className="stage">
        <div className="groundline" />
        <div className="charwrap" style={{ left: `${charX}%` }}>
          <DialogueBubble lines={scene.dialogue} active={dialogOn} sceneKey={idx} />
          <Character mood={scene.mood} walking={charWalk} />
        </div>
      </div>

      {/* ── BOTTOM HUD ── */}
      <div className="hud-bot">
        <button className="arrow" onClick={() => go(idx-1)} disabled={idx===0}>‹</button>
        <div className="dots">
          {SCENES.map((s,i)=>(
            <button key={s.id} className={`dot ${i===idx?"dot-on":""}`} onClick={() => go(i)} title={s.title} />
          ))}
        </div>
        <button className="arrow" onClick={() => go(idx+1)} disabled={idx===SCENES.length-1}>›</button>
      </div>

      {/* ── FILM STRIP PROGRESS ── */}
      <div className="filmstrip">
        <div className="filmfill" style={{ width:`${(idx/(SCENES.length-1))*100}%` }} />
      </div>

      {/* ── FIRST SCENE HINT ── */}
      {idx === 0 && (
        <div className="hint">
          <span>Scroll · Arrow keys · Swipe to navigate</span>
          <span className="hint-arrow">→</span>
        </div>
      )}

    </div>
  );
}
