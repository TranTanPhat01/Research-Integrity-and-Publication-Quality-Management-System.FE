import { Info, Megaphone, ArrowRight } from "lucide-react";

const ANNOUNCEMENTS = [
  { icon: Info, title: "New Integrity Policy Updated", desc: "COPE guidelines 2023 has been added to the system.", date: "May 15, 2024" },
  { icon: Megaphone, title: "Maintenance Notice", desc: "System will be under maintenance on May 20, 2024 from 01:00 to 03:00 AM (UTC+7).", date: "May 10, 2024" },
];

export default function SystemAnnouncements() {
  return (
    <div className="bg-theme-bg-card rounded-xl border border-theme-border-main p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-theme-text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
          System Announcements
        </h2>
        <button className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--theme-accent-main)" }}>
          View all <ArrowRight size={11} />
        </button>
      </div>
      <div className="space-y-3">
        {ANNOUNCEMENTS.map((a) => (
          <div key={a.title} className="flex gap-3 p-3 rounded-lg border border-theme-border-light hover:bg-theme-bg-hover transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--theme-bg-hover)" }}>
              <a.icon size={14} style={{ color: "var(--theme-accent-main)" }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-theme-text-primary leading-tight">{a.title}</p>
              <p className="text-[11px] text-theme-text-light mt-0.5 leading-relaxed">{a.desc}</p>
              <p className="text-[10px] text-theme-text-light/60 mt-1">{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
