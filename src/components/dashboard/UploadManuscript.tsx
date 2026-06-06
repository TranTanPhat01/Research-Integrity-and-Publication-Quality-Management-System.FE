"use client";
import { useState, useRef, useCallback } from "react";
import { CloudUpload, Upload, ShieldCheck, BookOpen, Users, Target, Loader2 } from "lucide-react";
import { paperService } from "@/services/paperService";
import type { PaperProcessingProgressResponse } from "@/models/paper";
import ProcessingProgress from "./ProcessingProgress";

const AI_FEATURES = [
  { icon: ShieldCheck, title: "Integrity Audit", desc: "Check COPE, ethics, COI, citation, transparency and more." },
  { icon: BookOpen, title: "Publication Quality Assessment", desc: "Evaluate structure, methodology, writing, references, and readiness." },
  { icon: Users, title: "Research Governance Workflow", desc: "Internal review, approval, audit trail and final submission package." },
  { icon: Target, title: "Reduce Preventable Rejections", desc: "Identify issues early and improve your chance of success." },
];

const POLL_INTERVAL_MS = 2000;
const DONE_STATUSES = ["Completed", "Failed", "CompletedWithWarnings"];

export default function UploadManuscript() {
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<PaperProcessingProgressResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const startPolling = useCallback((paperId: number) => {
    stopPolling();
    pollRef.current = setInterval(async () => {
      try {
        const res = await paperService.getProcessingProgress(paperId);
        const data = res.data;
        setProgress(data);
        if (DONE_STATUSES.includes(data.overallStatus)) {
          stopPolling();
        }
      } catch {
        // silently ignore poll errors
      }
    }, POLL_INTERVAL_MS);
  }, [stopPolling]);

  const handleUpload = async (file: File) => {
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) {
      setError("File size exceeds 100MB limit.");
      return;
    }

    try {
      setError(null);
      setProgress(null);
      setIsUploading(true);

      const res = await paperService.upload({
        file,
        title: file.name.replace(/\.[^/.]+$/, ""),
      });

      const paperId = res.data?.paperId;
      if (paperId) {
        startPolling(paperId);
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Upload failed. Please try again.";
      setError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="space-y-4">
      {/* Upload card */}
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
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-xl px-6 py-8 flex flex-col items-center justify-center text-center transition-all ${
              dragOver ? "border-theme-accent-secondary bg-theme-bg-hover" : "border-theme-border-secondary hover:border-theme-accent-secondary hover:bg-theme-bg-hover/50"
            }`}
          >
            <Upload size={28} className="mb-3" style={{ color: "var(--theme-accent-upload)" }} />
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Drag & drop your file here</p>
            <p className="text-xs text-theme-text-light mb-4">or</p>

            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={onFileChange}
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              disabled={isUploading}
            />

            <button
              className="px-6 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
              style={{ background: "var(--theme-text-primary)" }}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading && <Loader2 size={14} className="animate-spin" />}
              {isUploading ? "Uploading..." : "Choose File"}
            </button>
            <p className="text-[11px] text-theme-text-light mt-3">Supports PDF, DOCX  |  Max size: 100MB</p>
          </div>

          {/* AI Features */}
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

        {/* Error */}
        {error && (
          <div className="mt-3 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* Processing Progress */}
      {progress && <ProcessingProgress progress={progress} />}
    </div>
  );
}
