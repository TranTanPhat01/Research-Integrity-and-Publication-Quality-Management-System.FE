"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import HomeContent from "@/components/dashboard/HomeContent";
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

// ── component ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-theme-bg-main" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── TOP HEADER ─────────────────────────────────────────────── */}
      <Header collapsed={collapsed} />

      {/* ── BODY (sidebar + main) ───────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── SIDEBAR ─────────────────────────────────────────────── */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />

        {/* ── MAIN ──────────────────────────────────────────────────── */}
        {activeNav === "Home" ? (
          <HomeContent />
        ) : (
          <main className="flex-1 overflow-y-auto p-8 flex items-center justify-center bg-theme-bg-main">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-theme-text-primary">{activeNav}</h2>
              <p className="text-theme-text-muted mt-2">This section is currently under development.</p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
