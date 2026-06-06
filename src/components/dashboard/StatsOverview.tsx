import { FileText, Eye, CheckSquare, ClipboardList, ArrowRight } from "lucide-react";

const STATS = [
  { value: 12, label: "My Papers", icon: FileText },
  { value: 5, label: "In Review", icon: Eye },
  { value: 3, label: "Awaiting Approval", icon: CheckSquare },
  { value: 7, label: "Completed", icon: ClipboardList },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((s) => (
        <div key={s.label} className="bg-theme-bg-card rounded-xl border border-theme-border-main px-5 py-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--theme-bg-hover)" }}>
              <s.icon size={16} style={{ color: "var(--theme-accent-main)" }} />
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--theme-text-primary)" }}>
              {s.value}
            </span>
          </div>
          <p className="text-xs text-theme-text-light font-medium mb-2">{s.label}</p>
          <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--theme-accent-main)" }}>
            View all <ArrowRight size={11} />
          </button>
        </div>
      ))}
    </div>
  );
}
