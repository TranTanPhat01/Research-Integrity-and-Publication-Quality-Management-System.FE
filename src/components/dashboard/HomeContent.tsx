import StatsOverview from "./StatsOverview";
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
