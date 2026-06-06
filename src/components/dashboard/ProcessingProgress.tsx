import type { PaperProcessingProgressResponse } from "@/services/paperService";
import { CheckCircle, XCircle, Loader2, Clock, Circle } from "lucide-react";

interface ProcessingProgressProps {
  progress: PaperProcessingProgressResponse;
}

function StatusIcon({ status, isActive }: { status: string; isActive: boolean }) {
  if (status === "Completed") {
    return <CheckCircle size={20} className="text-green-600" />;
  }
  if (status === "Failed") {
    return <XCircle size={20} className="text-red-500" />;
  }
  if (isActive || status === "Processing") {
    return <Loader2 size={20} className="animate-spin" style={{ color: "var(--theme-accent-secondary)" }} />;
  }
  return <Circle size={20} className="text-theme-text-light opacity-50" />;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    Completed: { label: "COMPLETED", color: "#2E7D32" },
    Failed: { label: "FAILED", color: "#C62828" },
    Processing: { label: "PROCESSING", color: "var(--theme-accent-secondary)" },
    Pending: { label: "PENDING", color: "var(--theme-text-light)" },
  };
  const cfg = map[status] ?? { label: status.toUpperCase(), color: "var(--theme-text-light)" };
  return (
    <span className="text-xs font-bold" style={{ color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

export default function ProcessingProgress({ progress }: ProcessingProgressProps) {
  const overallPercent = Math.round(progress.progressPercent);

  return (
    <div className="bg-theme-bg-card rounded-xl border border-theme-border-main p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-theme-text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
          Processing Progress
        </h3>
        <span className="text-sm font-bold" style={{ color: "var(--theme-accent-secondary)" }}>
          {overallPercent}%
        </span>
      </div>

      {/* Overall progress bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-theme-text-light mb-1">
          <span>Upload</span>
          <span className="font-semibold" style={{ color: "var(--theme-accent-secondary)" }}>
            {progress.overallStatus?.toUpperCase()}
          </span>
        </div>
        <div className="h-2 rounded-full bg-theme-border-main overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${overallPercent}%`,
              background: "var(--theme-accent-secondary)",
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {progress.steps.map((step, idx) => {
          const isLast = idx === progress.steps.length - 1;
          const latestEvent = step.eventHistory?.[step.eventHistory.length - 1];
          const timeLabel = step.startedAt
            ? new Date(step.startedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : null;

          return (
            <div key={step.stage} className="flex gap-3">
              {/* Icon + line */}
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 mt-0.5">
                  <StatusIcon status={step.status} isActive={step.isActive} />
                </div>
                {!isLast && <div className="w-px flex-1 mt-1.5 bg-theme-border-main" />}
              </div>

              {/* Content */}
              <div className={`flex-1 pb-3 ${isLast ? "" : ""}`}>
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-semibold text-theme-text-primary leading-tight">{step.label}</p>
                  <StatusBadge status={step.status} />
                </div>
                <p className="text-[11px] text-theme-text-light leading-relaxed mb-2">{step.description}</p>

                {/* Step progress bar */}
                <div className="h-1.5 rounded-full bg-theme-border-main overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${step.progressPercent}%`,
                      background:
                        step.status === "Completed"
                          ? "#2E7D32"
                          : step.status === "Failed"
                          ? "#C62828"
                          : "var(--theme-accent-secondary)",
                    }}
                  />
                </div>

                {/* Timestamp + event */}
                {timeLabel && (
                  <p className="text-[10px] text-theme-text-light flex items-center gap-1 flex-wrap">
                    <Clock size={9} />
                    <span>{timeLabel}</span>
                    {latestEvent && (
                      <span className="text-theme-text-muted">{latestEvent.eventType}</span>
                    )}
                  </p>
                )}

                {/* Error */}
                {step.errorMessage && (
                  <p className="text-[11px] text-red-500 mt-1">{step.errorMessage}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
