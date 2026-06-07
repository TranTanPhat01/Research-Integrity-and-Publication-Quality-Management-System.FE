"use client";

import { useEffect, useState } from "react";
import StatsOverview from "./StatsOverview";
import UploadManuscript from "./UploadManuscript";
import HowItWorks from "./HowItWorks";
import PaperProcessingTimeline from "./PaperProcessingTimeline";
import SystemAnnouncements from "./SystemAnnouncements";

export default function HomeContent() {
  const [latestPaperId, setLatestPaperId] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const storedPaperId = window.localStorage.getItem("latestPaperId");
    if (!storedPaperId) return;

    const parsedPaperId = Number(storedPaperId);
    if (Number.isFinite(parsedPaperId) && parsedPaperId > 0) {
      setLatestPaperId(parsedPaperId);
    }
  }, []);

  const handleUploadSuccess = (paperId: number) => {
    setLatestPaperId(paperId);
    setUploadError(null);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("latestPaperId", String(paperId));
    }
  };

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
            <UploadManuscript
              onUploadStart={() => {
                setUploadError(null);
              }}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={setUploadError}
            />
            <HowItWorks />
          </div>

          <div className="space-y-5">
            <PaperProcessingTimeline
              paperId={latestPaperId}
              uploadError={uploadError}
            />
            <SystemAnnouncements />
          </div>
        </div>
      </div>
    </main>
  );
}
