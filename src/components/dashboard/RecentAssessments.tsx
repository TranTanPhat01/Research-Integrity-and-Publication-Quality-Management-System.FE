import { ArrowRight, Clock } from "lucide-react";

const RECENT_ASSESSMENTS = [
  { title: "Deep Learning for Medical Image...", status: "In Review", statusColor: "var(--theme-accent-secondary)", score: 72, scoreColor: "var(--theme-accent-secondary)", date: "Updated 2 hours ago" },
  { title: "Explainable AI in Healthcare", status: "Approved by Reviewer", statusColor: "#2E7D32", score: 85, scoreColor: "#2E7D32", date: "Updated 1 day ago" },
  { title: "Federated Learning for IoT Security", status: "Awaiting Lab Approval", statusColor: "#1565C0", score: 68, scoreColor: "#1565C0", date: "Updated 2 days ago" },
];

function CircleScore({ score, color }: { score: number; color: string }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      <svg width="48" height="48" className="absolute inset-0 -rotate-90">
        <circle cx="24" cy="24" r={r} fill="none" stroke="var(--theme-border-main)" strokeWidth="4" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="text-xs font-bold relative z-10" style={{ color }}>{score}</span>
    </div>
  );
}

export default function RecentAssessments() {
  return (
    <div className="bg-theme-bg-card rounded-xl border border-theme-border-main p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-theme-text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
          Recent Assessments
        </h2>
        <button className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--theme-accent-main)" }}>
          View all <ArrowRight size={11} />
        </button>
      </div>
      <div className="space-y-3">
        {RECENT_ASSESSMENTS.map((a) => (
          <div key={a.title} className="flex items-center gap-3 p-3 rounded-lg border border-theme-border-light hover:bg-theme-bg-hover transition-colors cursor-pointer">
            <CircleScore score={a.score} color={a.scoreColor} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-theme-text-primary leading-snug truncate">{a.title}</p>
              <p className="text-[11px] mt-0.5 font-medium" style={{ color: a.statusColor }}>● {a.status}</p>
              <p className="text-[10px] text-theme-text-light mt-0.5 flex items-center gap-1">
                <Clock size={9} /> {a.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
