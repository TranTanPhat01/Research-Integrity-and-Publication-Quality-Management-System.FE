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
  Star,
  ChevronRight,
  HelpCircle as HelpIcon,
  User,
  Check,
  Clock,
  RefreshCw,
  Search,
  Info,
  Megaphone,
} from "lucide-react";

// ── types ──────────────────────────────────────────────────────────────────
interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
}

// ── data ───────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { icon: Home, label: "Home", active: true },
  { icon: FileText, label: "My Papers" },
  { icon: ClipboardList, label: "Assessments" },
  { icon: Eye, label: "Reviews" },
  { icon: CheckSquare, label: "Approvals" },
  { icon: Package, label: "Submission Packages" },
  { icon: Bell, label: "Notifications", badge: 3 },
  { icon: HelpCircle, label: "Help & Support" },
];

const STATS = [
  { value: "12", label: "My Papers", color: "#8B6914", bg: "#FDF8EE" },
  { value: "5", label: "In Review", color: "#1565C0", bg: "#EEF4FD" },
  { value: "1", label: "Awaiting Approval", color: "#E65100", bg: "#FFF3E0" },
  { value: "3", label: "Completed", color: "#2E7D32", bg: "#EDF7EE", icon: "check" },
  { value: "7", label: "Total Submitted", color: "#6A1B9A", bg: "#F5EEF8" },
];

const AI_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Integrity Audit",
    desc: "Automated plagiarism and data fabrication detection across your manuscript.",
    color: "#8B6914",
    bg: "#FDF8EE",
  },
  {
    icon: Star,
    title: "Publication Quality Assessment",
    desc: "Evaluate writing clarity, methodological rigor, and citation completeness.",
    color: "#1565C0",
    bg: "#EEF4FD",
  },
  {
    icon: GitBranch,
    title: "Research Consistency Workflow",
    desc: "Cross-check claims, figures, and conclusions for internal consistency.",
    color: "#2E7D32",
    bg: "#EDF7EE",
  },
  {
    icon: AlertTriangle,
    title: "Better Preventable Digressions",
    desc: "Flag off-topic sections and structural deviations before submission.",
    color: "#E65100",
    bg: "#FFF3E0",
  },
];

const RECENT_ASSESSMENTS = [
  {
    title: "Deep Learning for Medical Image...",
    status: "In Review",
    statusColor: "#1565C0",
    statusBg: "#EEF4FD",
    score: 82,
    date: "12 May 2025",
  },
  {
    title: "Telehealth AI in Healthcare",
    status: "Approved",
    statusColor: "#2E7D32",
    statusBg: "#EDF7EE",
    score: 91,
    date: "08 May 2025",
    note: "Approved by Reviewer",
  },
  {
    title: "Improving Federated Learning for AI Security",
    status: "Pending",
    statusColor: "#E65100",
    statusBg: "#FFF3E0",
    score: 74,
    date: "03 May 2025",
  },
];

const ANNOUNCEMENTS = [
  {
    icon: Megaphone,
    title: "New Policy Update",
    desc: "RIPQMS updated its ethical review standards for clinical study submissions. Effective 01 Jun 2025.",
    date: "28 May 2025",
    type: "policy",
  },
  {
    icon: Info,
    title: "System Announcement",
    desc: "Scheduled maintenance on 15 Jun 2025 from 02:00–04:00 UTC. Services will be temporarily unavailable.",
    date: "25 May 2025",
    type: "system",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: CloudUpload,
    title: "Upload Manuscript",
    desc: "Submit your document in PDF, DOCX, or LaTeX format.",
  },
  {
    step: "02",
    icon: Search,
    title: "System Analysis",
    desc: "AI engines run integrity, quality, and consistency checks.",
  },
  {
    step: "03",
    icon: FileText,
    title: "Get Report",
    desc: "Receive a detailed assessment report with scores and flags.",
  },
  {
    step: "04",
    icon: RefreshCw,
    title: "Review & Revise",
    desc: "Revise your manuscript based on actionable recommendations.",
  },
  {
    step: "05",
    icon: Package,
    title: "Approval & Package",
    desc: "Submit the final package for editorial approval and archiving.",
  },
];

// ── component ──────────────────────────────────────────────────────────────
export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className="flex h-screen bg-background overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside
        className={`flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 shrink-0 ${
          collapsed ? "w-16" : "w-56"
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center px-4 py-4 border-b border-sidebar-border overflow-hidden h-20 ${collapsed ? "justify-center" : ""}`}>
          <img 
            src="/logo.png" 
            alt="RIPQMS Logo" 
            className={`h-[60px] w-auto object-contain origin-left transition-transform ${collapsed ? "scale-[1.3] -ml-2" : "scale-[2.1] -ml-2"}`}
          />
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left group ${
                activeNav === item.label
                  ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <item.icon
                size={16}
                className={`shrink-0 ${activeNav === item.label ? "text-accent" : ""}`}
              />
              {!collapsed && (
                <span className="text-sm flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="text-[10px] font-bold bg-accent text-accent-foreground rounded-full w-4 h-4 flex items-center justify-center shrink-0">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse button */}
        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <ChevronLeft
              size={16}
              className={`shrink-0 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
            {!collapsed && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-card border-b border-border flex items-center px-6 gap-4 shrink-0">
          <div className="flex-1" />
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <HelpIcon size={14} />
            Help & Guide
          </button>
          <div className="w-px h-5 bg-border" />
          <button className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #8B6914, #C49A2A)" }}
            >
              N
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-foreground leading-none">
                Nguyen Van A
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-none">
                Reviewer · Author
              </p>
            </div>
          </button>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          {/* ── BANNER ──────────────────────────────────────── */}
          <div className="w-full overflow-hidden" style={{ maxHeight: "180px" }}>
            <img
              src="/banner.png"
              alt="Welcome Banner"
              className="w-full object-cover object-center"
              style={{ maxHeight: "180px" }}
            />
          </div>

          {/* ── BODY ────────────────────────────────────────── */}
          <div className="px-6 py-5 space-y-5">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-3 hover:shadow-sm transition-shadow"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-lg font-bold"
                    style={{ background: s.bg, color: s.color }}
                  >
                    {s.icon === "check" ? (
                      <Check size={16} style={{ color: s.color }} />
                    ) : (
                      <span
                        className="text-lg font-extrabold"
                        style={{ fontFamily: "'Playfair Display', serif", color: s.color }}
                      >
                        {s.value}
                      </span>
                    )}
                  </div>
                  <div>
                    <p
                      className="text-base font-bold leading-none"
                      style={{ color: s.color, fontFamily: "'Playfair Display', serif" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Two-column grid */}
            <div className="grid lg:grid-cols-3 gap-5">
              {/* Left: Upload + AI Features */}
              <div className="lg:col-span-2 space-y-5">
                {/* Upload Manuscript */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <h2
                    className="text-base font-semibold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Upload New Manuscript
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed max-w-lg">
                    Collect other manuscripts for comprehensive audit as research
                    integrity guidance to review and revise quality, and other aspects.
                  </p>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                    className={`border-2 border-dashed rounded-xl px-6 py-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      dragOver
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/40 hover:bg-muted/30"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                      style={{ background: "#FDF8EE" }}
                    >
                      <Upload size={18} style={{ color: "#8B6914" }} />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Drag & drop your file here
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      or click to browse from your device
                    </p>
                    <button
                      className="px-5 py-2 rounded-lg text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #8B6914, #B8890F)" }}
                    >
                      Choose File
                    </button>
                    <p className="text-[11px] text-muted-foreground mt-3">
                      Supported: PDF, DOCX, LaTeX · Max 20 MB
                    </p>
                  </div>
                </div>

                {/* AI Features */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <h2
                    className="text-base font-semibold mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    AI-Powered Checks
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {AI_FEATURES.map((f) => (
                      <div
                        key={f.title}
                        className="flex gap-3 p-3 rounded-lg border border-border hover:border-border/80 hover:shadow-sm transition-all cursor-default"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: f.bg }}
                        >
                          <f.icon size={15} style={{ color: f.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-tight">
                            {f.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                            {f.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Recent Assessments + Announcements */}
              <div className="space-y-5">
                {/* Recent Assessments */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2
                      className="text-base font-semibold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Recent Assessments
                    </h2>
                    <button className="text-xs text-accent hover:underline font-medium flex items-center gap-0.5">
                      View All <ChevronRight size={12} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {RECENT_ASSESSMENTS.map((a) => (
                      <div
                        key={a.title}
                        className="p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <p className="text-sm font-medium text-foreground leading-snug flex-1 truncate">
                            {a.title}
                          </p>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                            style={{
                              background: a.statusBg,
                              color: a.statusColor,
                            }}
                          >
                            {a.status}
                          </span>
                        </div>
                        {a.note && (
                          <p className="text-[11px] text-muted-foreground mb-1">
                            {a.note}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${a.score}%`,
                                  background:
                                    a.score >= 85
                                      ? "#2E7D32"
                                      : a.score >= 70
                                      ? "#8B6914"
                                      : "#E65100",
                                }}
                              />
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {a.score}/100
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock size={10} />
                            {a.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Announcements */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <h2
                    className="text-base font-semibold mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    System Announcements
                  </h2>
                  <div className="space-y-3">
                    {ANNOUNCEMENTS.map((a) => (
                      <div
                        key={a.title}
                        className="flex gap-3 p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors cursor-pointer"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            background: a.type === "policy" ? "#FDF8EE" : "#EEF4FD",
                          }}
                        >
                          <a.icon
                            size={13}
                            style={{
                              color: a.type === "policy" ? "#8B6914" : "#1565C0",
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-tight">
                            {a.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                            {a.desc}
                          </p>
                          <p className="text-[10px] text-muted-foreground/60 mt-1">
                            {a.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h2
                className="text-base font-semibold mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                How it works
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {HOW_IT_WORKS.map((step, i) => (
                  <div key={step.step} className="relative flex flex-col items-center text-center">
                    {i < HOW_IT_WORKS.length - 1 && (
                      <div className="hidden lg:block absolute top-5 left-[calc(50%+20px)] right-[-50%] h-px bg-border z-0" />
                    )}
                    <div
                      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center mb-3 border-2 border-accent/30"
                      style={{ background: "#FDF8EE" }}
                    >
                      <step.icon size={17} style={{ color: "#8B6914" }} />
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-widest mb-1"
                      style={{ color: "#C49A2A" }}
                    >
                      STEP {step.step}
                    </span>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {step.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
