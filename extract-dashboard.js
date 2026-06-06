const fs = require('fs');
const path = require('path');

const dir = 'src/components/dashboard';

const files = {
  'StatsOverview.tsx': `import { FileText, Eye, CheckSquare, ClipboardList, ArrowRight } from "lucide-react";

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
`,
  'UploadManuscript.tsx': `"use client";
import { useState } from "react";
import { CloudUpload, Upload, ShieldCheck, BookOpen, Users, Target } from "lucide-react";

const AI_FEATURES = [
  { icon: ShieldCheck, title: "Integrity Audit", desc: "Check COPE, ethics, COI, citation, transparency and more." },
  { icon: BookOpen, title: "Publication Quality Assessment", desc: "Evaluate structure, methodology, writing, references, and readiness." },
  { icon: Users, title: "Research Governance Workflow", desc: "Internal review, approval, audit trail and final submission package." },
  { icon: Target, title: "Reduce Preventable Rejections", desc: "Identify issues early and improve your chance of success." },
];

export default function UploadManuscript() {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="bg-theme-bg-card rounded-xl border border-theme-border-main p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--theme-bg-hover)" }}>
          <CloudUpload size={18} style={{ color: "var(--theme-accent-main)" }} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-theme-text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
            Upload New Manuscript
          </h2>
          <p className="text-xs text-theme-text-light leading-relaxed mt-0.5 max-w-md">
            Upload your manuscript to run a comprehensive audit on research integrity, publication quality, and submission readiness.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
          className={\`border-2 border-dashed rounded-xl px-6 py-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer \${
            dragOver ? "border-theme-accent-secondary bg-theme-bg-hover" : "border-theme-border-secondary hover:border-theme-accent-secondary hover:bg-theme-bg-hover/50"
          }\`}
        >
          <Upload size={28} className="mb-3" style={{ color: "var(--theme-accent-upload)" }} />
          <p className="text-sm font-medium text-theme-text-secondary mb-1">Drag & drop your file here</p>
          <p className="text-xs text-theme-text-light mb-4">or</p>
          <button className="px-6 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "var(--theme-text-primary)" }}>
            Choose File
          </button>
          <p className="text-[11px] text-theme-text-light mt-3">Supports PDF, DOCX  |  Max size: 100MB</p>
        </div>

        <div className="space-y-3">
          {AI_FEATURES.map((f) => (
            <div key={f.title} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--theme-bg-hover)" }}>
                <f.icon size={14} style={{ color: "var(--theme-accent-main)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-theme-text-primary leading-tight">{f.title}</p>
                <p className="text-[11px] text-theme-text-light mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`,
  'HowItWorks.tsx': `import { CloudUpload, Brain, FileCheck, RefreshCw, Package } from "lucide-react";

const HOW_IT_WORKS = [
  { icon: CloudUpload, title: "Upload Manuscript", desc: "Upload your file in PDF or DOCX format." },
  { icon: Brain, title: "System Analysis", desc: "AI and rules engine analyze integrity and quality." },
  { icon: FileCheck, title: "Get Report", desc: "Receive integrity report, quality score and risk level." },
  { icon: RefreshCw, title: "Review & Revise", desc: "Address findings and improve your manuscript." },
  { icon: Package, title: "Approval & Package", desc: "Get approved and generate submission package." },
];

export default function HowItWorks() {
  return (
    <div className="bg-theme-bg-card rounded-xl border border-theme-border-main p-5">
      <h2 className="text-base font-semibold text-theme-text-primary mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
        How it works
      </h2>
      <div className="grid grid-cols-5 gap-2">
        {HOW_IT_WORKS.map((step, i) => (
          <div key={step.title} className="flex flex-col items-center text-center relative">
            {i < HOW_IT_WORKS.length - 1 && (
              <div className="absolute top-4 left-[calc(50%+18px)] right-[-50%] hidden lg:flex items-center gap-1 z-0">
                {[0, 1, 2].map((d) => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full bg-theme-border-secondary" />
                ))}
              </div>
            )}
            <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 border-theme-border-secondary" style={{ background: "var(--theme-bg-hover)" }}>
              <step.icon size={14} style={{ color: "var(--theme-accent-main)" }} />
            </div>
            <p className="text-[11px] font-semibold text-theme-text-primary mb-1 leading-tight">{step.title}</p>
            <p className="text-[10px] text-theme-text-light leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
  'RecentAssessments.tsx': `import { ArrowRight, Clock } from "lucide-react";

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
`,
  'SystemAnnouncements.tsx': `import { Info, Megaphone, ArrowRight } from "lucide-react";

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
`,
  'HomeContent.tsx': `import StatsOverview from "./StatsOverview";
import UploadManuscript from "./UploadManuscript";
import HowItWorks from "./HowItWorks";
import RecentAssessments from "./RecentAssessments";
import SystemAnnouncements from "./SystemAnnouncements";

export default function HomeContent() {
  return (
    <main className="flex-1 overflow-y-auto">
      {/* ── BANNER SECTION ──────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        <img src="/banner.png" alt="Banner" className="w-full h-full object-cover" style={{ display: "block" }} />
      </div>

      {/* ── BODY ───────────────────────────────────────────────── */}
      <div className="px-6 py-5 space-y-5">
        <StatsOverview />

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <UploadManuscript />
            <HowItWorks />
          </div>

          <div className="space-y-5">
            <RecentAssessments />
            <SystemAnnouncements />
          </div>
        </div>
      </div>
    </main>
  );
}
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, filename), content);
}
