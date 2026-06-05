import Link from "next/link";
import {
  Shield,
  FileCheck,
  Award,
  BookOpen,
  Building2,
  Users,
  CheckCircle,
  ClipboardCheck,
  GitBranch,
  History,
} from "lucide-react";
import AcademicBookHero from "../components/AcademicBookHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCFA] relative overflow-hidden">
      {/* ════════════════════════════════════════════════
          BACKGROUND WATERMARKS
          ════════════════════════════════════════════════ */}

      {/* MANUSCRIPT / RESEARCH / PUBLICATION text watermark — 2% */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-manuscript" />

      {/* University architecture sketch — 3% */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-architecture" />

      {/* ════════════════════════════════════════════════
          HEADER — 96px, institutional identity
          ════════════════════════════════════════════════ */}
      <header className="relative z-20 border-b border-[#E5DDD0] bg-[#FDFCFA]/95 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-[96px] flex items-center justify-between gap-4">
          {/* LEFT: Logo Block */}
          <div className="flex items-center flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="RIPQMS Logo" 
              className="h-[80px] sm:h-[110px] w-auto object-contain scale-[1.4] origin-left" 
            />
          </div>

          {/* CENTER: Navigation — updated labels */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-12">
            {[
              { label: "Integrity", href: "#integrity" },
              { label: "Quality", href: "#quality" },
              { label: "Governance", href: "#workflow" },
              { label: "Resources", href: "#resources" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "17px",
                  fontWeight: 500,
                  color: "#4A4036",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT: Sign In Button */}
          <Link
            href="/login"
            className="flex items-center justify-center rounded-[10px] transition-all duration-200 hover:bg-[#3d2518] hover:shadow-lg"
            style={{
              width: "140px",
              height: "52px",
              background: "#2C1810",
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* ════════════════════════════════════════════════
          HERO SECTION — 24px below navbar
          ════════════════════════════════════════════════ */}
      <section className="relative z-10 pb-16">
        <div
          className="max-w-[1280px] mx-auto px-6"
          style={{ paddingTop: "24px" }}
        >
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* LEFT: Text Column */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="mb-5"></div>

              {/* Headline — 64px, line-height 1.05, max 700px */}
              <h1
                className="mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-[64px]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 500,
                  lineHeight: 1.05,
                  maxWidth: "700px",
                  color: "#2C1810",
                }}
              >
                Research Integrity &{" "}
                <span className="bg-gradient-to-r from-[#8B6F47] to-[#C4A57B] bg-clip-text text-transparent">
                  Publication Quality
                </span>{" "}
                Management System
              </h1>

              {/* Description — 22px, #5A5148 */}
              <p
                className="mb-6 text-base sm:text-lg md:text-xl lg:text-[22px]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  maxWidth: "560px",
                  color: "#5A5148",
                }}
              >
                Review research integrity, improve publication quality, and
                prepare manuscripts for journal or conference submission.
              </p>

              {/* CTA Buttons — 20px gap */}
              <div className="flex" style={{ gap: "20px" }}>
                <Link
                  href="/login"
                  className="flex items-center justify-center h-[52px] px-8 rounded-xl transition-all duration-200 hover:shadow-lg hover:bg-[#3d2518]"
                  style={{
                    background: "#2C1810",
                    color: "#ffffff",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Sign In
                </Link>
                <button
                  className="h-[52px] px-8 rounded-xl transition-all duration-300 hover:bg-[#8B6F47] hover:text-white hover:border-transparent"
                  style={{
                    background: "transparent",
                    color: "#8B6F47",
                    border: "2px solid #8B6F47",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Explore Audit Workflow
                </button>
              </div>

              {/* Product Value Badges */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "Integrity Audit",
                  "Publication Quality Review",
                  "COPE Compliance Check",
                  "Submission Readiness Assessment",
                ].map((badge) => (
                  <span key={badge} className="value-badge">
                    <span className="check">✓</span>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: Illustration Column */}
            <div className="col-span-12 lg:col-span-6 flex items-center justify-center relative">
              <AcademicBookHero />
            </div>
          </div>
        </div>
      </section>



      {/* ════════════════════════════════════════════════
          FEATURE CARDS — reduced height, larger titles
          ════════════════════════════════════════════════ */}
      <section id="integrity" className="relative z-10 py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Integrity Audit */}
            <div className="bg-white rounded-2xl p-7 border border-[#E5DDD0] hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#FDF8F3] rounded-xl flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-[#8B6F47]" />
              </div>
              <h3
                className="mb-3 text-[#2C1810]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "30px",
                  fontWeight: 600,
                }}
              >
                Integrity Audit
              </h3>
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  color: "#5A5148",
                }}
              >
                Comprehensive analysis of research methodology, data collection,
                and ethical compliance standards.
              </p>
            </div>

            {/* Publication Quality Assessment */}
            <div
              id="quality"
              className="bg-white rounded-2xl p-7 border border-[#E5DDD0] hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-[#FDF8F3] rounded-xl flex items-center justify-center mb-5">
                <FileCheck className="w-6 h-6 text-[#8B6F47]" />
              </div>
              <h3
                className="mb-3 text-[#2C1810]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "30px",
                  fontWeight: 600,
                }}
              >
                Publication Quality Assessment
              </h3>
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  color: "#5A5148",
                }}
              >
                Evaluate manuscript structure, citation accuracy, and submission
                readiness for peer review.
              </p>
            </div>

            {/* Research Governance Workflow */}
            <div className="bg-white rounded-2xl p-7 border border-[#E5DDD0] hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#FDF8F3] rounded-xl flex items-center justify-center mb-5">
                <BookOpen className="w-6 h-6 text-[#8B6F47]" />
              </div>
              <h3
                className="mb-3 text-[#2C1810]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "30px",
                  fontWeight: 600,
                }}
              >
                Research Governance Workflow
              </h3>
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  color: "#5A5148",
                }}
              >
                Streamline institutional review processes with automated checks
                and compliance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          HOW IT WORKS
          ════════════════════════════════════════════════ */}
      <section id="workflow" className="relative z-10 pb-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-semibold mb-4 text-[#2C1810]"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              How It Works
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "Inter, sans-serif", color: "#5A5148" }}
            >
              A comprehensive system designed for academic excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: "01",
                title: "AI-Driven Methodology Review",
                desc: "Advanced algorithms analyze research design, sample size adequacy, and statistical approaches.",
              },
              {
                num: "02",
                title: "Citation & Reference Verification",
                desc: "Automated cross-checking against academic databases ensures citation accuracy and completeness.",
              },
              {
                num: "03",
                title: "Integrity & Ethics Screening",
                desc: "Detect potential integrity issues including plagiarism, data manipulation, and ethical violations.",
              },
              {
                num: "04",
                title: "Journal Submission Assessment",
                desc: "Evaluate manuscript readiness based on target journal requirements and formatting guidelines.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-6">
                <div
                  className="flex-shrink-0 w-12 h-12 bg-[#8B6F47] rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {item.num}
                </div>
                <div>
                  <h4
                    className="text-lg font-semibold mb-2 text-[#2C1810]"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="leading-relaxed"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "#5A5148",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TRUSTED BY
          ════════════════════════════════════════════════ */}
      <section id="resources" className="relative z-10 py-16 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p
            className="mb-8 uppercase"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "2px",
              color: "#6B5744",
            }}
          >
            Trusted By Leading Institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            <Building2 className="w-24 h-12 text-[#2C1810]" />
            <Users className="w-24 h-12 text-[#2C1810]" />
            <Award className="w-24 h-12 text-[#2C1810]" />
            <BookOpen className="w-24 h-12 text-[#2C1810]" />
          </div>
        </div>
      </section>
    </div>
  );
}
