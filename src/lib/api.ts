// src/lib/api.ts

import axiosClient from "@/lib/axios";
import type { BaseResponse } from "@/types/api";

export const api = {
  get: <T>(url: string, params?: object): Promise<BaseResponse<T>> =>
    axiosClient.get(url, { params }),

  post: <T>(url: string, data?: unknown): Promise<BaseResponse<T>> =>
    axiosClient.post(url, data),

  put: <T>(url: string, data?: unknown): Promise<BaseResponse<T>> =>
    axiosClient.put(url, data),

  patch: <T>(url: string, data?: unknown): Promise<BaseResponse<T>> =>
    axiosClient.patch(url, data),

  delete: <T>(url: string): Promise<BaseResponse<T>> => axiosClient.delete(url),
};
