import Link from "next/link";
import {
  Shield,
  FileCheck,
  Award,
  BookOpen,
  CheckCircle2,
  Building2,
  Users
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCFA] relative overflow-hidden">

      {/* ════════════════════════════════════════════════
          BACKGROUND WATERMARKS
          ════════════════════════════════════════════════ */}

      {/* Manuscript text watermark — opacity 2% */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-manuscript" />

      {/* Architectural university sketch — opacity 3% */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-architecture" />

      {/* ════════════════════════════════════════════════
          HEADER  —  96px tall, institutional identity
          ════════════════════════════════════════════════ */}
      <header className="relative z-20 border-b border-[#E5DDD0] bg-[#FDFCFA]/95 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-8 h-[96px] flex items-center justify-between">

          {/* ── LEFT: Logo Block (340px) ── */}
          <div className="flex items-center gap-4" style={{ width: '340px' }}>
            {/* Academic Seal — 48×48 */}
            <div
              className="flex-shrink-0 w-[48px] h-[48px] rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #8B6F47 0%, #C4A57B 100%)' }}
            >
              <span
                className="text-white text-xl"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }}
              >
                R
              </span>
            </div>

            {/* Vertical divider */}
            <div className="h-[44px] w-px bg-[#DDD5C8] flex-shrink-0" />

            {/* Brand name + subtitle */}
            <div className="flex flex-col justify-center min-w-0">
              <span
                className="leading-none"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '34px',
                  fontWeight: 700,
                  color: '#1E1A17',
                  letterSpacing: '-0.01em'
                }}
              >
                RIPQMS
              </span>
              <span
                className="mt-[2px] leading-[1.3]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase' as const,
                  color: '#8A7A68',
                  whiteSpace: 'nowrap'
                }}
              >
                RESEARCH INTEGRITY & PUBLICATION
                <br />
                QUALITY MANAGEMENT SYSTEM
              </span>
            </div>
          </div>

          {/* ── CENTER: Navigation ── */}
          <nav className="flex items-center" style={{ gap: '48px' }}>
            {['Features', 'Workflow', 'About', 'Resources'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '17px',
                  fontWeight: 500,
                  color: '#4A4036',
                  textDecoration: 'none'
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* ── RIGHT: Sign In Button ── */}
          <Link
            href="/login"
            className="flex items-center justify-center rounded-[10px] transition-all duration-200 hover:bg-[#222] hover:shadow-lg"
            style={{
              width: '140px',
              height: '52px',
              background: '#111111',
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* ════════════════════════════════════════════════
          HERO SECTION  —  32px below navbar
          ════════════════════════════════════════════════ */}
      <section className="relative z-10 pb-24">
        <div className="max-w-[1280px] mx-auto px-6" style={{ paddingTop: '32px' }}>
          <div className="grid grid-cols-12 gap-12 items-center">

            {/* ── Left Column: Text ── */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">

              {/* Eyebrow label */}
              <div className="mb-6">
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '3px',
                    textTransform: 'uppercase' as const,
                    color: '#8B6F47'
                  }}
                >
                  Research Management Platform
                </span>
              </div>

              {/* Main Headline — 68px, 3 lines, line-height 1.0 */}
              <h1
                className="mb-6"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '68px',
                  fontWeight: 500,
                  lineHeight: 1.0,
                  maxWidth: '600px',
                  color: '#2C1810'
                }}
              >
                Research Integrity &{" "}
                <span className="bg-gradient-to-r from-[#8B6F47] to-[#C4A57B] bg-clip-text text-transparent">
                  Publication Quality
                </span>{" "}
                Management System
              </h1>

              {/* Description — 22px, line-height 1.8 */}
              <p
                className="mb-6"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  lineHeight: 1.8,
                  maxWidth: '560px',
                  color: '#6B5744'
                }}
              >
                Audit research integrity, publication quality, and submission readiness before journal or conference publication.
              </p>

              {/* Buttons — 20px gap */}
              <div className="flex" style={{ gap: '20px' }}>
                <Link
                  href="/login"
                  className="flex items-center justify-center h-[52px] px-8 rounded-xl transition-all duration-200 hover:shadow-lg"
                  style={{
                    background: '#2C1810',
                    color: '#ffffff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Sign In
                </Link>
                <button
                  className="h-[52px] px-8 rounded-xl transition-all duration-300 hover:bg-[#8B6F47] hover:text-white hover:border-transparent"
                  style={{
                    background: 'transparent',
                    color: '#8B6F47',
                    border: '2px solid #8B6F47',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Explore Platform
                </button>
              </div>
            </div>

            {/* ── Right Column: Illustration ── */}
            <div className="col-span-12 lg:col-span-6 flex items-center justify-center relative">
              <div className="relative w-full max-w-[560px]">
                <div className="bg-[#F8F4EE] rounded-[24px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/image.png"
                    alt="Research Integrity Book"
                    className="w-full h-auto transform scale-110"
                  />
                </div>

                {/* Floating: Academic Integrity Seal */}
                <div className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '0s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#C4A57B] rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#2C1810]">Academic</div>
                      <div className="text-xs text-[#6B5744]">Integrity Seal</div>
                    </div>
                  </div>
                </div>

                {/* Floating: COPE Badge */}
                <div className="absolute top-1/4 -left-12 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex flex-col items-center gap-2">
                    <Award className="w-8 h-8 text-[#8B6F47]" />
                    <div className="text-xs font-semibold text-[#2C1810]">COPE</div>
                    <div className="text-xs text-[#6B5744]">Compliant</div>
                  </div>
                </div>

                {/* Floating: Quality Score */}
                <div className="absolute bottom-1/4 -right-12 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-[#8B6F47]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      98
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#2C1810]">Quality</div>
                      <div className="text-xs text-[#6B5744]">Score</div>
                    </div>
                  </div>
                </div>

                {/* Floating: Citations Verified */}
                <div className="absolute -bottom-8 left-1/4 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-semibold text-[#2C1810]">Citations Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURE CARDS
          ════════════════════════════════════════════════ */}
      <section id="features" className="relative z-10 pb-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Integrity Audit */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5DDD0] hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#FDF8F3] rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-[#8B6F47]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2C1810]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Integrity Audit
              </h3>
              <p className="text-[#6B5744] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Comprehensive analysis of research methodology, data collection, and ethical compliance standards.
              </p>
            </div>

            {/* Publication Quality Assessment */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5DDD0] hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#FDF8F3] rounded-xl flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6 text-[#8B6F47]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2C1810]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Publication Quality Assessment
              </h3>
              <p className="text-[#6B5744] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Evaluate manuscript structure, citation accuracy, and submission readiness for peer review.
              </p>
            </div>

            {/* Research Governance Workflow */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5DDD0] hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#FDF8F3] rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-[#8B6F47]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2C1810]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Research Governance Workflow
              </h3>
              <p className="text-[#6B5744] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Streamline institutional review processes with automated checks and compliance tracking.
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
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              How It Works
            </h2>
            <p className="text-lg text-[#6B5744] max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              A comprehensive system designed for academic excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { num: '01', title: 'AI-Driven Methodology Review', desc: 'Advanced algorithms analyze research design, sample size adequacy, and statistical approaches.' },
              { num: '02', title: 'Citation & Reference Verification', desc: 'Automated cross-checking against academic databases ensures citation accuracy and completeness.' },
              { num: '03', title: 'Integrity & Ethics Screening', desc: 'Detect potential integrity issues including plagiarism, data manipulation, and ethical violations.' },
              { num: '04', title: 'Journal Submission Assessment', desc: 'Evaluate manuscript readiness based on target journal requirements and formatting guidelines.' },
            ].map((item) => (
              <div key={item.num} className="flex gap-6">
                <div
                  className="flex-shrink-0 w-12 h-12 bg-[#8B6F47] rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {item.num}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[#2C1810]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {item.title}
                  </h4>
                  <p className="text-[#6B5744] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
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
      <section className="relative z-10 py-16 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p
            className="mb-8 uppercase"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '2px',
              color: '#6B5744'
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
