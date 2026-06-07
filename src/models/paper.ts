export interface PaperVersionResponse {
  paperId: number;
  paperVersionId: number;
  title: string;
  versionNumber: number;
  originalFileName: string;
  pdfS3Key: string;
  markdownS3Key?: string | null;
  conversionStatus: string;
  convertedAt?: string | null;
  conversionError?: string | null;
}

export interface PaperProcessingProgressEventResponse {
  eventType: string;
  eventId: string;
  status: string;
  payload?: unknown | null;
  errorMessage?: string | null;
  createdAt: string;
}

export interface PaperProcessingProgressStepResponse {
  order: number;
  stage: string;
  label: string;
  description: string;
  status: string;
  progressPercent: number;
  isActive: boolean;
  isCritical: boolean;
  latestEventType?: string | null;
  latestEventId?: string | null;
  payload?: unknown | null;
  warnings: unknown[];
  errorMessage?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  lastUpdatedAt?: string | null;
  duration?: unknown | null;
  eventHistory: PaperProcessingProgressEventResponse[];
}

export interface PaperProcessingProgressResponse {
  paperId: number;
  paperVersionId: number;
  correlationId: string;
  overallStatus: string;
  currentStage: string;
  currentStatus: string;
  progressPercent: number;
  lastError?: string | null;
  startedAt?: string | null;
  lastUpdatedAt?: string | null;
  completedAt?: string | null;
  steps: PaperProcessingProgressStepResponse[];
}

export interface UploadPaperRequest {
  /** The uploaded PDF file */
  file: File;

  /** Optional title, max length 500 (matches backend) */
  title?: string;
}

export default UploadPaperRequest;
