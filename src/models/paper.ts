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
export interface UploadPaperRequest {
  /** The uploaded PDF file */
  file: File;

  /** Optional title, max length 500 (matches backend) */
  title?: string;
}

export default UploadPaperRequest;
