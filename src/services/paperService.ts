import { api } from "@/lib/api";
import type { BaseResponse } from "@/types/api";
import type { PaperVersionResponse, UploadPaperRequest } from "@/models/paper";
import { ApiEndpoints } from "@/constants/api-endpoints";

export const paperService = {
  upload: (request: UploadPaperRequest) => {
    const form = new FormData();
    form.append("file", request.file, request.file.name);
    if (request.title) form.append("title", request.title);

    return api.postForm<PaperVersionResponse>(
      ApiEndpoints.Papers.Upload,
      form,
    ) as Promise<BaseResponse<PaperVersionResponse>>;
  },
};

export default paperService;
