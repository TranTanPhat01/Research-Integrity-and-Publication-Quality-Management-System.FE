import { CloudUpload, Brain, FileCheck, RefreshCw, Package } from "lucide-react";

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
