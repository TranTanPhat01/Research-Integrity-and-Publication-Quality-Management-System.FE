"use client";

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
  BarChart3,
} from "lucide-react";

export const NAV_ITEMS = [
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

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  activeNav,
  setActiveNav,
}: SidebarProps) {
  return (
    <aside
      className="flex flex-col shrink-0 transition-all duration-300 border-r border-theme-border-main"
      style={{
        width: collapsed ? "64px" : "208px",
        background: "var(--theme-bg-card)",
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
                : "text-theme-text-muted hover:text-theme-text-primary hover:bg-theme-bg-main"
            } ${collapsed ? "justify-center" : ""}`}
            style={
              activeNav === item.label
                ? {
                    background: "var(--theme-bg-hover)",
                    color: "var(--theme-accent-main)",
                  }
                : {}
            }
          >
            <item.icon size={17} className="shrink-0" />
            {!collapsed && (
              <span className="text-sm flex-1 truncate">{item.label}</span>
            )}
            {!collapsed && item.badge && (
              <span className="text-[10px] font-bold bg-theme-accent-secondary text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Collapse */}
      <div className="p-2 border-t border-theme-border-main">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-theme-text-muted hover:bg-theme-bg-main hover:text-theme-text-primary transition-all ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <ChevronLeft
            size={16}
            className={`shrink-0 transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
