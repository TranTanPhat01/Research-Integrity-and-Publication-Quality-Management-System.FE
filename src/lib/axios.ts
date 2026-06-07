import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7210";

console.log("API URL:", API_URL);

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Improve diagnostics for network / CORS / TLS failures
    try {
      console.error("Axios Error:", error?.toJSON ? error.toJSON() : error);
    } catch (e) {
      console.error("Axios Error (dump failed):", error);
    }

    if (!error?.response && error?.request) {
      // Network-level failure: request was sent but no response received
      console.error(
        "Axios Network Error - no response received. Request:",
        error.request,
      );
      const host = API_URL || "<unknown>";
      const msg = `Network error: could not reach ${host}. Check backend, CORS, and TLS (certificate).`;
      return Promise.reject(new Error(msg));
    }

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    const apiError = new Error(message) as Error & {
      status?: number;
      code?: number;
    };
    apiError.status = error?.response?.status;
    apiError.code = error?.response?.data?.code;

    return Promise.reject(apiError);
  },
);

export default axiosClient;
