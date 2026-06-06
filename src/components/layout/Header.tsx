import { Search, HelpCircle, Bell } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import UserProfile from "./UserProfile";

interface HeaderProps {
  collapsed: boolean;
}

export default function Header({ collapsed }: HeaderProps) {
  return (
    <header className="h-20 bg-theme-bg-card border-b border-theme-border-main flex items-center px-6 gap-4 shrink-0 z-30 py-0">
      {/* Logo */}
      <div
        className="flex items-center gap-3 shrink-0"
        style={{ width: collapsed ? "64px" : "208px", transition: "width 0.3s" }}
      >
        <img src="/logo.png" alt="RIPQMS Logo" className="h-full w-auto object-contain" />
      </div>

      {/* Search Bar */}
      <div className="flex-1 px-8">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-light" size={16} />
          <input
            type="text"
            placeholder="Search papers, assessments, users..."
            className="w-full pl-9 pr-4 py-2 bg-theme-bg-main border border-theme-border-main rounded-lg text-sm text-theme-text-primary placeholder-theme-text-light focus:outline-none focus:border-theme-accent-secondary focus:ring-1 focus:ring-theme-accent-secondary transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-2 text-sm text-theme-text-muted hover:text-theme-text-secondary transition-colors">
          <HelpCircle size={16} />
          Help & Guide
        </button>

        <ThemeToggle />

        <button className="relative">
          <Bell size={20} className="text-theme-text-muted" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-theme-accent-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        <div className="w-px h-6 bg-theme-border-main" />

        <UserProfile />
      </div>
    </header>
  );
}
