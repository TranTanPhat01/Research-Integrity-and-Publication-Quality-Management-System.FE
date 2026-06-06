import { ChevronDown } from "lucide-react";

export default function UserProfile() {
  return (
    <button className="flex items-center gap-3 group">
      <div
        className="w-9 h-9 rounded-full overflow-hidden border-2 border-theme-border-main flex items-center justify-center text-white font-bold text-sm shrink-0"
        style={{ background: "linear-gradient(135deg, #8B6914, #C49A2A)" }}
      >
        N
      </div>
      <div className="text-left hidden md:block">
        <p className="text-sm font-semibold text-theme-text-secondary leading-none">Nguyen Van A</p>
        <p className="text-[11px] text-theme-text-light mt-0.5 leading-none">Researcher / Writer</p>
      </div>
      <ChevronDown size={14} className="text-theme-text-light" />
    </button>
  );
}
