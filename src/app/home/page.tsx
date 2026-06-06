"use client";

import { useState } from "react";
import "./dashboard.css";
import {
  Home,
  FileText,
  ClipboardList,
  Eye,
  CheckSquare,
  Package,
  Bell,
  HelpCircle,
  ChevronLeft,
  Upload,
  CloudUpload,
  ShieldCheck,
  BookOpen,
  GitBranch,
  AlertTriangle,
  ChevronRight,
  Clock,
  RefreshCw,
  Search,
  Info,
  Megaphone,
  BarChart3,
  ArrowRight,
  Target,
  Users,
  Brain,
  FileCheck,
  ChevronDown,
} from "lucide-react";

// ── data ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: FileText, label: "My Papers" },
  { icon: ClipboardList, label: "Assessments" },
  { icon: Eye, label: "Reviews" },
  { icon: CheckSquare, label: "Approvals" },
  { icon: BarChart3, label: "Reports" },
  { icon: Package, label: "Submission Packages" },
  { icon: Bell, label: "Notifications", badge: 2 },
  { icon: HelpCircle, label: "Help & Support" },
];

const STATS = [
  { value: 12, label: "My Papers", icon: FileText },
  { value: 5, label: "In Review", icon: Eye },
  { value: 3, label: "Awaiting Approval", icon: CheckSquare },
  { value: 7, label: "Completed", icon: ClipboardList },
];

const AI_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Integrity Audit",
    desc: "Check COPE, ethics, COI, citation, transparency and more.",
  },
  {
    icon: BookOpen,
    title: "Publication Quality Assessment",
    desc: "Evaluate structure, methodology, writing, references, and readiness.",
  },
  {
    icon: Users,
    title: "Research Governance Workflow",
    desc: "Internal review, approval, audit trail and final submission package.",
  },
  {
    icon: Target,
    title: "Reduce Preventable Rejections",
    desc: "Identify issues early and improve your chance of success.",
  },
];

const RECENT_ASSESSMENTS = [
  {
    title: "Deep Learning for Medical Image...",
    status: "In Review",
    statusColor: "#C49A2A",
    score: 72,
    scoreColor: "#C49A2A",
    date: "Updated 2 hours ago",
  },
  {
    title: "Explainable AI in Healthcare",
    status: "Approved by Reviewer",
    statusColor: "#2E7D32",
    score: 85,
    scoreColor: "#2E7D32",
    date: "Updated 1 day ago",
  },
  {
    title: "Federated Learning for IoT Security",
    status: "Awaiting Lab Approval",
    statusColor: "#1565C0",
    score: 68,
    scoreColor: "#1565C0",
    date: "Updated 2 days ago",
  },
];

const ANNOUNCEMENTS = [
  {
    icon: Info,
    title: "New Integrity Policy Updated",
    desc: "COPE guidelines 2023 has been added to the system.",
    date: "May 15, 2024",
  },
  {
    icon: Megaphone,
    title: "Maintenance Notice",
    desc: "System will be under maintenance on May 20, 2024 from 01:00 to 03:00 AM (UTC+7).",
    date: "May 10, 2024",
  },
];

const HOW_IT_WORKS = [
  { icon: CloudUpload, title: "Upload Manuscript", desc: "Upload your file in PDF or DOCX format." },
  { icon: Brain, title: "System Analysis", desc: "AI and rules engine analyze integrity and quality." },
  { icon: FileCheck, title: "Get Report", desc: "Receive integrity report, quality score and risk level." },
  { icon: RefreshCw, title: "Review & Revise", desc: "Address findings and improve your manuscript." },
  { icon: Package, title: "Approval & Package", desc: "Get approved and generate submission package." },
];

function CircleScore({ score, color }: { score: number; color: string }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      <svg width="48" height="48" className="absolute inset-0 -rotate-90">
        <circle cx="24" cy="24" r={r} fill="none" stroke="#E5DDD0" strokeWidth="4" />
        <circle
          cx="24" cy="24" r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xs font-bold relative z-10" style={{ color }}>{score}</span>
    </div>
  );
}

// ── component ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8F4EE]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── TOP HEADER ─────────────────────────────────────────────── */}
      <header className="h-20 bg-white border-b border-[#E5DDD0] flex items-center px-6 gap-4 shrink-0 z-30 py-0">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0" style={{ width: collapsed ? "64px" : "208px", transition: "width 0.3s" }}>
          <img src="/logo.png" alt="RIPQMS Logo" className="h-full w-auto object-contain" />
        </div>

        {/* Search Bar */}
        <div className="flex-1 px-8">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7355]" size={16} />
            <input
              type="text"
              placeholder="Search papers, assessments, users..."
              className="w-full pl-9 pr-4 py-2 bg-[#F8F4EE] border border-[#E5DDD0] rounded-lg text-sm text-[#1B2B4B] placeholder-[#8B7355] focus:outline-none focus:border-[#C49A2A] focus:ring-1 focus:ring-[#C49A2A] transition-all"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-sm text-[#5A5148] hover:text-[#2C1810] transition-colors">
            <HelpCircle size={16} />
            Help & Guide
          </button>

          <button className="relative">
            <Bell size={20} className="text-[#5A5148]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C49A2A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
          </button>

          <div className="w-px h-6 bg-[#E5DDD0]" />

          <button className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#E5DDD0] flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ background: "linear-gradient(135deg, #8B6914, #C49A2A)" }}
            >
              N
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-[#2C1810] leading-none">Nguyen Van A</p>
              <p className="text-[11px] text-[#8B7355] mt-0.5 leading-none">Researcher / Writer</p>
            </div>
            <ChevronDown size={14} className="text-[#8B7355]" />
          </button>
        </div>
      </header>

      {/* ── BODY (sidebar + main) ───────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── SIDEBAR ─────────────────────────────────────────────── */}
        <aside
          className="flex flex-col shrink-0 transition-all duration-300 border-r border-[#E5DDD0]"
          style={{
            width: collapsed ? "64px" : "208px",
            background: "#FFFFFF",
          }}
        >
          <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                  activeNav === item.label
                    ? "font-semibold"
                    : "text-[#5A5148] hover:text-[#1B2B4B] hover:bg-[#F8F4EE]"
                } ${collapsed ? "justify-center" : ""}`}
                style={
                  activeNav === item.label
                    ? { background: "#FDF8EE", color: "#8B6914" }
                    : {}
                }
              >
                <item.icon size={17} className="shrink-0" />
                {!collapsed && (
                  <span className="text-sm flex-1 truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="text-[10px] font-bold bg-[#C49A2A] text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Collapse */}
          <div className="p-2 border-t border-[#E5DDD0]">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#5A5148] hover:bg-[#F8F4EE] hover:text-[#1B2B4B] transition-all ${collapsed ? "justify-center" : ""}`}
            >
              <ChevronLeft
                size={16}
                className={`shrink-0 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              />
              {!collapsed && <span className="text-sm">Collapse</span>}
            </button>
          </div>
        </aside>

        {/* ── MAIN ──────────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">

          {/* ── BANNER SECTION ──────────────────────────────────────── */}
          <div
            className="relative overflow-hidden"
            style={{ height: "180px" }}
          >
            <img
              src="/banner.png"
              alt="Banner"
              className="w-full h-full object-cover"
              style={{ display: "block" }}
            />
          </div>

          {/* ── BODY ───────────────────────────────────────────────── */}
          <div className="px-6 py-5 space-y-5">

            {/* Stats row — 4 cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-xl border border-[#E5DDD0] px-5 py-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#FDF8EE" }}>
                      <s.icon size={16} style={{ color: "#8B6914" }} />
                    </div>
                    <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#1B2B4B" }}>
                      {s.value}
                    </span>
                  </div>
                  <p className="text-xs text-[#8B7355] font-medium mb-2">{s.label}</p>
                  <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#8B6914" }}>
                    View all <ArrowRight size={11} />
                  </button>
                </div>
              ))}
            </div>

            {/* Two-column grid */}
            <div className="grid lg:grid-cols-3 gap-5">

              {/* Left: Upload + How it works */}
              <div className="lg:col-span-2 space-y-5">

                {/* Upload Manuscript */}
                <div className="bg-white rounded-xl border border-[#E5DDD0] p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#FDF8EE" }}>
                      <CloudUpload size={18} style={{ color: "#8B6914" }} />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-[#1B2B4B]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Upload New Manuscript
                      </h2>
                      <p className="text-xs text-[#8B7355] leading-relaxed mt-0.5 max-w-md">
                        Upload your manuscript to run a comprehensive audit on research integrity, publication quality, and submission readiness.
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Drop zone */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                      className={`border-2 border-dashed rounded-xl px-6 py-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                        dragOver ? "border-[#C49A2A] bg-[#FDF8EE]" : "border-[#D8C7B3] hover:border-[#C49A2A] hover:bg-[#FDF8EE]/50"
                      }`}
                    >
                      <Upload size={28} className="mb-3" style={{ color: "#B8860B" }} />
                      <p className="text-sm font-medium text-[#2C1810] mb-1">Drag & drop your file here</p>
                      <p className="text-xs text-[#8B7355] mb-4">or</p>
                      <button
                        className="px-6 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "#1B2B4B" }}
                      >
                        Choose File
                      </button>
                      <p className="text-[11px] text-[#8B7355] mt-3">Supports PDF, DOCX  |  Max size: 100MB</p>
                    </div>

                    {/* AI Features */}
                    <div className="space-y-3">
                      {AI_FEATURES.map((f) => (
                        <div key={f.title} className="flex gap-3 items-start">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#FDF8EE" }}>
                            <f.icon size={14} style={{ color: "#8B6914" }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#1B2B4B] leading-tight">{f.title}</p>
                            <p className="text-[11px] text-[#8B7355] mt-0.5 leading-relaxed">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* How it works */}
                <div className="bg-white rounded-xl border border-[#E5DDD0] p-5">
                  <h2 className="text-base font-semibold text-[#1B2B4B] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                    How it works
                  </h2>
                  <div className="grid grid-cols-5 gap-2">
                    {HOW_IT_WORKS.map((step, i) => (
                      <div key={step.title} className="flex flex-col items-center text-center relative">
                        {i < HOW_IT_WORKS.length - 1 && (
                          <div className="absolute top-4 left-[calc(50%+18px)] right-[-50%] hidden lg:flex items-center gap-1 z-0">
                            {[0,1,2].map(d => <div key={d} className="w-1.5 h-1.5 rounded-full bg-[#D8C7B3]" />)}
                          </div>
                        )}
                        <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 border-[#D8C7B3]" style={{ background: "#FDF8EE" }}>
                          <step.icon size={14} style={{ color: "#8B6914" }} />
                        </div>
                        <p className="text-[11px] font-semibold text-[#1B2B4B] mb-1 leading-tight">{step.title}</p>
                        <p className="text-[10px] text-[#8B7355] leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right: Recent Assessments + Announcements */}
              <div className="space-y-5">

                {/* Recent Assessments */}
                <div className="bg-white rounded-xl border border-[#E5DDD0] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-[#1B2B4B]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Recent Assessments
                    </h2>
                    <button className="text-xs font-semibold flex items-center gap-1" style={{ color: "#8B6914" }}>
                      View all <ArrowRight size={11} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {RECENT_ASSESSMENTS.map((a) => (
                      <div key={a.title} className="flex items-center gap-3 p-3 rounded-lg border border-[#F0E8DD] hover:bg-[#FDF8EE] transition-colors cursor-pointer">
                        <CircleScore score={a.score} color={a.scoreColor} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1B2B4B] leading-snug truncate">{a.title}</p>
                          <p className="text-[11px] mt-0.5 font-medium" style={{ color: a.statusColor }}>● {a.status}</p>
                          <p className="text-[10px] text-[#8B7355] mt-0.5 flex items-center gap-1">
                            <Clock size={9} /> {a.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Announcements */}
                <div className="bg-white rounded-xl border border-[#E5DDD0] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-[#1B2B4B]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      System Announcements
                    </h2>
                    <button className="text-xs font-semibold flex items-center gap-1" style={{ color: "#8B6914" }}>
                      View all <ArrowRight size={11} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {ANNOUNCEMENTS.map((a) => (
                      <div key={a.title} className="flex gap-3 p-3 rounded-lg border border-[#F0E8DD] hover:bg-[#FDF8EE] transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#FDF8EE" }}>
                          <a.icon size={14} style={{ color: "#8B6914" }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1B2B4B] leading-tight">{a.title}</p>
                          <p className="text-[11px] text-[#8B7355] mt-0.5 leading-relaxed">{a.desc}</p>
                          <p className="text-[10px] text-[#8B7355]/60 mt-1">{a.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
