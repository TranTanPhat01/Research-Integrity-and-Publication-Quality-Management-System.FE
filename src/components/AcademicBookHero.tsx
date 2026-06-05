"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

// Academic pages details (20 pages total)
const PAGES = [
  {
    num: 1,
    title: "Research Integrity",
    items: ["Ethics Screening", "Transparency Audit", "Accountability Rules", "COPE Compliance"],
    desc: "Verify core scientific research parameters"
  },
  {
    num: 2,
    title: "Publication Quality",
    items: ["Structure Check", "Methodology Review", "Writing Standard", "References Verification"],
    desc: "Assess manuscript layout and citations"
  },
  {
    num: 3,
    title: "COPE Compliance",
    items: ["Ethics Guidelines Align", "Authorship Verification", "Plagiarism Initial Scan", "Conflict Declaration"],
    desc: "Ensure adherence to COPE standards"
  },
  {
    num: 4,
    title: "Metadata Validation",
    items: ["DOI Registry Verification", "Authorship Registry ID", "Institutional Affiliations", "Funding Declarations"],
    desc: "Cross-reference registry and grant information"
  },
  {
    num: 5,
    title: "Crossref Verification",
    items: ["Metadata Consistency", "Citation Check Loop", "Funder Registry Match", "Repository Archiving"],
    desc: "Validate DOI link infrastructure"
  },
  {
    num: 6,
    title: "OpenAlex Analysis",
    items: ["Open Access Classification", "Citing Source Analytics", "Semantic Indexing Check", "Metadata Completeness"],
    desc: "Analyze global bibliographic records"
  },
  {
    num: 7,
    title: "Reference Quality",
    items: ["Citation Network Scan", "Self-Citation Check", "Retracted Paper Alert", "Preprint Verification"],
    desc: "Determine citation credibility scores"
  },
  {
    num: 8,
    title: "Peer Review",
    items: ["Reviewer Match Index", "Anonymity Integrity Check", "Revision Delta Tracking", "Reviewer Report Logs"],
    desc: "Monitor quality of review process"
  },
  {
    num: 9,
    title: "Research Governance",
    items: ["Institutional Clearances", "Ethics Committee Signoff", "Data Deposit Check", "Protocol Registration"],
    desc: "Preserve institutional governance trails"
  },
  {
    num: 10,
    title: "Version Control",
    items: ["Manuscript Hash Registry", "Revision History Logs", "Author Contribution Diff", "Pre-Submission Archive"],
    desc: "Track full evolution of the manuscript"
  },
  {
    num: 11,
    title: "Audit Trail",
    items: ["Timestamp Validation", "Change Log Preservation", "Reviewer Decisions Log", "Access History Trail"],
    desc: "Audit all pre-publication touches"
  },
  {
    num: 12,
    title: "Publication Readiness",
    items: ["Journal Styling Check", "Word Limit Compliance", "Figure Quality Audit", "Supplementary Data Check"],
    desc: "Evaluate final layout format"
  },
  {
    num: 13,
    title: "Research Ethics",
    items: ["Consent Protocol Verification", "Vulnerable Group Safeguards", "Animal Study Approval", "Dual-Use Research Scan"],
    desc: "Analyze ethical dimensions of study"
  },
  {
    num: 14,
    title: "Conflict of Interest",
    items: ["Financial Disclosure Scan", "Personal Relationship Check", "Employment Ties Disclosed", "Patent Filings Scan"],
    desc: "Expose potential biases"
  },
  {
    num: 15,
    title: "Citation Integrity",
    items: ["Coercive Citation Detection", "Citation Cartel Checks", "Excessive Self-Citation", "Out of Scope Citation Scan"],
    desc: "Verify citation distribution health"
  },
  {
    num: 16,
    title: "Plagiarism Detection",
    items: ["Text Similarity Analysis", "Paraphrase Detection Scan", "Code Plagiarism Check", "Self-Plagiarism Review"],
    desc: "Ensure original content throughout"
  },
  {
    num: 17,
    title: "Journal Matching",
    items: ["Aims & Scope Alignment", "Indexing Verification", "Impact Metric Analysis", "Processing Fee Estimation"],
    desc: "Find optimal matching journals"
  },
  {
    num: 18,
    title: "Submission Checklist",
    items: ["Cover Letter Generation", "Author Details Sheet", "Declarations Page", "Conflict Forms Bundled"],
    desc: "Collate final submission inputs"
  },
  {
    num: 19,
    title: "Publication Package",
    items: ["Final PDF Compilation", "Source File Archive", "Metadata XML Output", "ORCID Authorization"],
    desc: "Package assets for publisher upload"
  },
  {
    num: 20,
    title: "Final Audit Report",
    items: ["Integrity Certification", "Quality Index Rating", "Review Summary Signoff", "System Timestamp Seal"],
    desc: "Generate comprehensive audit report"
  }
];

// Ensure SAFE_PAGES is always an even number of pages.
const WATERMARK_PAGE = {
  num: PAGES.length + 1,
  title: "Academic Watermark",
  items: [],
  desc: "Research integrity review archive",
};

const SAFE_PAGES = PAGES.length % 2 === 0 ? PAGES : [...PAGES, WATERMARK_PAGE];
const totalSpreads = SAFE_PAGES.length / 2;
const lastSpreadIndex = totalSpreads - 1;

export default function AcademicBookHero() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Book Page Spread State
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const leftIndex = spreadIndex * 2;
  const rightIndex = spreadIndex * 2 + 1;

  // Compute what the NEXT spread will look like (for back faces)
  const nextSpreadForward = Math.min(spreadIndex + 1, lastSpreadIndex);
  const nextSpreadBackward = Math.max(spreadIndex - 1, 0);
  // Forward flip: right page flips → back shows next-spread LEFT page
  // Backward flip: left page flips → back shows prev-spread RIGHT page
  const backFacePageIndex =
    direction === "forward"
      ? nextSpreadForward * 2       // next left page
      : nextSpreadBackward * 2 + 1; // prev right page

  // Floating particles definitions
  const particles = [
    { text: '“', x: -60, y: -80, size: 28 },
    { text: '”', x: 280, y: -70, size: 28 },
    { text: '📄', x: -100, y: 100, size: 20 },
    { text: 'doi:10.1002', x: 320, y: 140, size: 11 },
    { text: '[Ref]', x: 240, y: -110, size: 12 },
    { text: '✎', x: -140, y: 30, size: 18 },
    { text: '¶', x: 300, y: -20, size: 18 },
    { text: '§', x: 80, y: 200, size: 18 },
  ];

  // Dynamic animation speeds depending on hover
  const flipDuration = shouldReduceMotion ? 0 : 2.5;
  const pauseDuration = shouldReduceMotion ? 100 : 10000;

  useEffect(() => {
    if (shouldReduceMotion || isHovered || isFlipping || flippingIndex !== null) return;

    let timer: NodeJS.Timeout;

    timer = setTimeout(() => {
      setFlippingIndex(direction === "forward" ? rightIndex : leftIndex);

      // Allow overlay to mount at 0deg, then trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsFlipping(true);
        });
      });
    }, pauseDuration);

    return () => clearTimeout(timer);
  }, [isFlipping, flippingIndex, pauseDuration, shouldReduceMotion, isHovered, direction, rightIndex, leftIndex]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Ensure we only process the transform transition on the main flipping page element
    if (e.propertyName === "transform" && e.target === e.currentTarget) {
      if (isFlipping) {
        if (direction === "forward") {
          if (spreadIndex < lastSpreadIndex) {
            setSpreadIndex(spreadIndex + 1);
            setDirection("forward");
          } else {
            setDirection("backward");
          }
        } else {
          if (spreadIndex > 0) {
            setSpreadIndex(spreadIndex - 1);
            setDirection("backward");
          } else {
            setDirection("forward");
          }
        }
        
        setFlippingIndex(null);
        setIsFlipping(false);
      }
    }
  };

  // Stack depths count (total physical sheets calculation)
  const currentSheetIndex = spreadIndex;
  const leftStackCount = currentSheetIndex;
  const rightStackCount = totalSpreads - currentSheetIndex - 1;

  // Helper to render academic list content
  const renderPageContent = (page: typeof SAFE_PAGES[0] | undefined) => {
    if (!page) return null;
    
    // If it's the blank pad page
    if (page.title === "Academic Watermark" || page.num > PAGES.length) {
      return (
        <div className="h-full w-full flex items-center justify-center relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-manuscript opacity-[0.15] pointer-events-none" />
          <div className="z-10 text-[#B68A5A]/30 italic text-sm font-serif">
            {page.desc}
          </div>
        </div>
      );
    }
    
    return (
      <div className="h-full flex flex-col justify-start select-none">
        <div className="text-[10px] uppercase tracking-wider text-[#8B6F47] font-semibold mb-1">
          Review Manuscript • Page {page.num}
        </div>
        <h3 
          className="text-[19px] font-bold text-[#2C1810] border-b border-[#E5DDD0]/80 pb-1.5 mb-3.5 tracking-wide leading-tight"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {page.title}
        </h3>
        <ul className="flex flex-col gap-2.5">
          {page.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-1.5 text-[12.5px] font-semibold text-[#4A4036] leading-tight">
              <span className="text-[#B68A5A] font-bold select-none">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto text-[10px] text-[#8C8070]/80 italic border-t border-[#E5DDD0]/40 pt-1.5 font-serif text-right leading-normal">
          {page.desc}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center w-full max-w-[580px] h-[280px] sm:h-[460px] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── ACADEMIC PARTICLES ── */}
      {!shouldReduceMotion && particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-[#8B6F47] pointer-events-none font-serif font-medium"
          style={{
            left: `${260 + p.x}px`,
            top: `${180 + p.y}px`,
            fontSize: `${p.size}px`,
            opacity: 0.05,
          }}
          animate={{
            y: [0, -12, 0],
            x: [0, 6, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 5 + (i % 3) * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.text}
        </motion.div>
      ))}

      {/* ── BOOK STAGE CONTAINER ── */}
      <motion.div
        className="book-stage relative w-[520px] h-[360px]"
        animate={shouldReduceMotion ? {} : {
          y: isHovered ? -8 : 0
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        
        {/* ── BREATHE SHADOW EFFECT ── */}
        <div className="book-shadow absolute -bottom-8 left-1/2 w-[85%] h-8 bg-black blur-2xl rounded-full pointer-events-none z-0" />

        {/* ── BOOK CARD 3D CONTAINER ── */}
        <motion.div
          className="book w-full h-full"
          initial={shouldReduceMotion ? { rotateY: 0 } : { rotateY: -85, rotateX: 5 }}
          animate={{ rotateY: 0, rotateX: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ════════════════════════════════════════════════
              BOOK COVER (BACK & LEFT COVER SPINE)
              ════════════════════════════════════════════════ */}
          {/* Left Cover Leather Background */}
          <div 
            className="absolute left-0 top-0 w-[260px] h-[360px] bg-[#4A3124] rounded-l-[12px] shadow-[inset_-3px_0_8px_rgba(0,0,0,0.5)] border-r border-[#302017]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Gold trim inset */}
            <div className="absolute inset-[8px] rounded-l-[8px] border border-[#B68A5A]/50 pointer-events-none" />
          </div>

          {/* Right Cover Leather Background */}
          <div 
            className="absolute left-[260px] top-0 w-[260px] h-[360px] bg-[#4A3124] rounded-r-[12px] shadow-[inset_3px_0_8px_rgba(0,0,0,0.5)] border-l border-[#302017]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Gold trim inset */}
            <div className="absolute inset-[8px] rounded-r-[8px] border border-[#B68A5A]/50 pointer-events-none" />
          </div>

          {/* ════════════════════════════════════════════════
              PAGE STACK BORDERS (3D DEPTH SHADOWS)
              ════════════════════════════════════════════════ */}
          {/* Left Stack Depth */}
          {Array.from({ length: Math.min(6, leftStackCount) }).map((_, i) => (
            <div 
              key={`left-stack-${i}`} 
              className="absolute bg-[#E9DDCC] rounded-l-md border-l border-[#D8C7B3] shadow-sm pointer-events-none"
              style={{
                top: `${10 + i * 0.5}px`,
                left: `${15 - i * 1}px`,
                width: `${245 + i * 1}px`,
                height: `${340 - i * 1}px`,
                transform: `translateZ(${-i * 2}px)`,
                opacity: 0.85
              }}
            />
          ))}

          {/* Right Stack Depth */}
          {Array.from({ length: Math.min(6, rightStackCount) }).map((_, i) => (
            <div 
              key={`right-stack-${i}`} 
              className="absolute bg-[#E9DDCC] rounded-r-md border-r border-[#D8C7B3] shadow-sm pointer-events-none"
              style={{
                top: `${10 + i * 0.5}px`,
                left: `260px`,
                width: `${245 + i * 1}px`,
                height: `${340 - i * 1}px`,
                transform: `translateZ(${-i * 2}px)`,
                opacity: 0.85
              }}
            />
          ))}

          {/* ════════════════════════════════════════════════
              STATIC LEFT PAGE
              ════════════════════════════════════════════════ */}
          <div 
            className="absolute top-[10px] left-[15px] w-[245px] h-[340px] bg-[#F8F4EE] rounded-l-md p-6 z-10"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 8%)",
              boxShadow: "inset -1px 0 3px rgba(0,0,0,0.1), 1px 0 2px rgba(255,255,255,0.8)"
            }}
          >
            {renderPageContent(SAFE_PAGES[leftIndex])}
          </div>

          {/* ════════════════════════════════════════════════
              STATIC RIGHT PAGE
              ════════════════════════════════════════════════ */}
          <div 
            className="next-page absolute top-[10px] left-[260px] w-[245px] h-[340px] bg-[#F8F4EE] rounded-r-md p-6 z-10"
            style={{
              backgroundImage: "linear-gradient(to left, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 8%)",
              boxShadow: "inset 1px 0 3px rgba(0,0,0,0.1)"
            }}
          >
            {renderPageContent(SAFE_PAGES[rightIndex])}
          </div>

          {/* ════════════════════════════════════════════════
              FLIPPING PAGE OVERLAY (DYNAMIC 3D TRANSITION ELEMENT)
              ════════════════════════════════════════════════ */}
          {flippingIndex !== null && (
            <div 
              key={`leaf-turn-${flippingIndex}-${direction}`}
              className={`flipping-page ${direction === "forward" ? "flip-right" : "flip-left"} ${isFlipping ? "is-flipping" : ""}`}
              onTransitionEnd={handleTransitionEnd}
              style={{ "--flip-duration": `${flipDuration}s` } as React.CSSProperties}
            >
              <div className="page-bend">
                {/* FRONT SIDE — current page being turned */}
                <div className={`page-front ${direction === "forward" ? "page-front-right" : "page-front-left"}`}>
                  {renderPageContent(SAFE_PAGES[flippingIndex])}
                </div>

                {/* BACK SIDE — next spread page revealed after turn */}
                <div className={`page-back ${direction === "forward" ? "page-back-left" : "page-back-right"}`}>
                  <div className="page-back-content">
                    {renderPageContent(SAFE_PAGES[backFacePageIndex])}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════
              BOOKMARK RIBBON (BRONZE)
              ════════════════════════════════════════════════ */}
          <div className="absolute left-[254px] top-[10px] w-[12px] h-[352px] pointer-events-none z-30" style={{ transformStyle: "preserve-3d" }}>
            <svg width="12" height="364" viewBox="0 0 12 364" fill="none" className="drop-shadow-sm">
              <path
                d="M6 0 C 6 80, 2 160, 6 240 C 9 290, 8 320, 6 364 L 0 354 L 6 348 L 12 354 L 6 364 Z"
                fill="#B68A5A"
              />
            </svg>
          </div>

          {/* ════════════════════════════════════════════════
              INTEGRITY SEAL (ROTATING SVG SEAL)
              ════════════════════════════════════════════════ */}
          <motion.svg
            width="60"
            height="60"
            viewBox="0 0 100 100"
            className="absolute bottom-5 right-5 z-30 drop-shadow-md pointer-events-none"
            animate={shouldReduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Outer gold ring */}
            <circle cx="50" cy="50" r="46" fill="#B68A5A" stroke="#8B6F47" strokeWidth="2" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#FAF6EE" strokeWidth="1.2" strokeDasharray="4 2" />
            
            {/* Circular Text */}
            <defs>
              <path id="sealTextPath" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
            </defs>
            <text fill="#FAF6EE" fontSize="7.8" fontWeight="bold" letterSpacing="1.2">
              <textPath href="#sealTextPath" startOffset="0%">
                • RIPQMS • RESEARCH INTEGRITY • QUALITY •
              </textPath>
            </text>
            
            {/* Inner Shield Logo */}
            <circle cx="50" cy="50" r="21" fill="#8B6F47" stroke="#FAF6EE" strokeWidth="1" />
            <path
              d="M 50 36 L 41 40 L 41 48 C 41 54 46 58 50 60 C 54 58 59 54 59 48 L 59 40 Z"
              fill="none"
              stroke="#FAF6EE"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 46 44 L 54 44 M 46 48 L 54 48 M 50 40 L 50 52"
              stroke="#FAF6EE"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
