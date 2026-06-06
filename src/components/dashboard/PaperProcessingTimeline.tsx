"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  CircleMinus,
  Clock,
  Loader2,
} from "lucide-react";
import type {
  PaperProcessingProgressResponse,
  PaperProcessingProgressStepResponse,
} from "@/models/paper";
import { paperService } from "@/services/paperService";

type PaperProcessingTimelineProps = {
  paperId: number | null;
  uploadError?: string | null;
};

type ApiError = Error & {
  status?: number;
  code?: number;
};

function formatStage(stage: string) {
  return stage
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value?: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getStatusColor(status: string) {
  const normalized = status.toUpperCase();

  if (normalized === "COMPLETED") return "#2E7D32";
  if (normalized === "FAILED") return "#B42318";
  if (normalized === "IN_PROGRESS" || normalized === "PROCESSING") {
    return "var(--theme-accent-secondary)";
  }
  if (normalized === "SKIPPED") return "var(--theme-text-muted)";

  return "var(--theme-text-light)";
}

function isTrackerCreatingError(error: unknown) {
  const apiError = error as ApiError;

  return apiError?.status === 404 || apiError?.code === 404;
}

function StepIcon({ step }: { step: PaperProcessingProgressStepResponse }) {
  const normalized = step.status.toUpperCase();
  const color = getStatusColor(step.status);

  if (normalized === "COMPLETED") {
    return <CheckCircle2 size={17} style={{ color }} />;
  }

  if (normalized === "FAILED") {
    return <AlertTriangle size={17} style={{ color }} />;
  }

  if (step.isActive || normalized === "IN_PROGRESS" || normalized === "PROCESSING") {
    return <Loader2 size={17} className="animate-spin" style={{ color }} />;
  }

  if (normalized === "SKIPPED") {
    return <CircleMinus size={17} style={{ color }} />;
  }

  return <Circle size={17} style={{ color }} />;
}

function TimelineStep({
  step,
  isLast,
}: {
  step: PaperProcessingProgressStepResponse;
  isLast: boolean;
}) {
  const statusColor = getStatusColor(step.status);
  const updatedAt = formatDate(step.lastUpdatedAt ?? step.completedAt ?? step.startedAt);

  return (
    <div className="relative flex gap-3 pb-4 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border border-theme-border-main bg-theme-bg-card flex items-center justify-center shrink-0">
          <StepIcon step={step} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-theme-border-light mt-2" />}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-theme-text-primary leading-snug">
              {step.label || formatStage(step.stage)}
            </p>
            {step.description && (
              <p className="text-[11px] text-theme-text-light leading-relaxed mt-1">
                {step.description}
              </p>
            )}
          </div>
          <span
            className="text-[10px] font-bold uppercase shrink-0 mt-0.5"
            style={{ color: statusColor }}
          >
            {step.status.replaceAll("_", " ")}
          </span>
        </div>

        <div className="mt-2 h-1.5 rounded-full bg-theme-border-light overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.max(0, Math.min(100, step.progressPercent))}%`,
              background: statusColor,
            }}
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-theme-text-light">
          {updatedAt && (
            <span className="flex items-center gap-1">
              <Clock size={9} /> {updatedAt}
            </span>
          )}
          {step.latestEventType && <span>{step.latestEventType}</span>}
        </div>

        {step.errorMessage && (
          <p className="mt-2 text-[11px] leading-relaxed" style={{ color: "#B42318" }}>
            {step.errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PaperProcessingTimeline({
  paperId,
  uploadError,
}: PaperProcessingTimelineProps) {
  const [progress, setProgress] =
    useState<PaperProcessingProgressResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTrackerCreating, setIsTrackerCreating] = useState(false);
  const steps = progress?.steps ?? [];

  const loadProgress = useCallback(
    async (showLoading = false) => {
      if (!paperId) return;

      try {
        if (showLoading) setIsLoading(true);

        const response = await paperService.getProcessingProgress(paperId);
        if (!response.data) {
          throw new Error("Processing progress was not returned by the API.");
        }

        setProgress(response.data);
        setError(null);
        setIsTrackerCreating(false);
      } catch (loadError) {
        if (isTrackerCreatingError(loadError)) {
          setProgress(null);
          setError(null);
          setIsTrackerCreating(true);
          return;
        }

        const message =
          loadError instanceof Error
            ? loadError.message
            : "Processing progress could not be loaded.";
        setError(message);
        setIsTrackerCreating(false);
      } finally {
        if (showLoading) setIsLoading(false);
      }
    },
    [paperId],
  );

  useEffect(() => {
    setProgress(null);
    setError(null);
    setIsTrackerCreating(false);

    if (!paperId) return;

    void loadProgress(true);
  }, [paperId, loadProgress]);

  useEffect(() => {
    if (!paperId) return;
    if (!isTrackerCreating && progress?.overallStatus?.toUpperCase() !== "PROCESSING") {
      return;
    }

    const intervalId = window.setInterval(() => {
      void loadProgress();
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [paperId, progress?.overallStatus, isTrackerCreating, loadProgress]);

  return (
    <div className="bg-theme-bg-card rounded-xl border border-theme-border-main p-5">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-base font-semibold text-theme-text-primary"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Processing Progress
        </h2>
        {progress && (
          <span
            className="text-xs font-semibold"
            style={{ color: getStatusColor(progress.overallStatus) }}
          >
            {progress.progressPercent}%
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-theme-text-light py-8">
          <Loader2 size={16} className="animate-spin" />
          Loading processing timeline...
        </div>
      ) : isTrackerCreating ? (
        <div className="flex items-center gap-2 text-sm text-theme-text-light py-8">
          <Loader2 size={16} className="animate-spin" />
          Processing tracker is being created...
        </div>
      ) : error || uploadError ? (
        <div className="rounded-lg border border-theme-border-light p-3">
          <p className="text-sm font-semibold" style={{ color: "#B42318" }}>
            Progress unavailable
          </p>
          <p className="text-[11px] text-theme-text-light leading-relaxed mt-1">
            {error ?? uploadError}
          </p>
        </div>
      ) : progress ? (
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between gap-3 text-xs mb-2">
              <span className="font-semibold text-theme-text-secondary">
                {progress.currentStage
                  ? formatStage(progress.currentStage)
                  : progress.overallStatus.replaceAll("_", " ")}
              </span>
              <span style={{ color: getStatusColor(progress.currentStatus) }}>
                {progress.currentStatus.replaceAll("_", " ")}
              </span>
            </div>
            <div className="h-2 rounded-full bg-theme-border-light overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.max(0, Math.min(100, progress.progressPercent))}%`,
                  background: getStatusColor(progress.overallStatus),
                }}
              />
            </div>
            {progress.lastError && (
              <p className="mt-2 text-[11px] leading-relaxed" style={{ color: "#B42318" }}>
                {progress.lastError}
              </p>
            )}
          </div>

          {steps.length > 0 ? (
            <div>
              {steps.map((step, index) => (
                <TimelineStep
                  key={`${step.order}-${step.stage}`}
                  step={step}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-theme-text-light py-6">
              No processing steps were returned by the API.
            </p>
          )}
        </div>
      ) : paperId ? (
        <div className="flex items-center gap-2 text-sm text-theme-text-light py-8">
          <Loader2 size={16} className="animate-spin" />
          Loading processing timeline...
        </div>
      ) : (
        <p className="text-sm text-theme-text-light leading-relaxed py-6">
          Upload a manuscript to view its processing timeline.
        </p>
      )}
    </div>
  );
}
