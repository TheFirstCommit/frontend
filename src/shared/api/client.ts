import axios, { AxiosError } from 'axios'
import { tokenStorage } from "./token";

const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://api.deardream.r-e.kr/'; //백엔드ip로
const REFRESH_URL = "/public/token";

declare module "axios" {
  interface AxiosRequestConfig {
    __isRetry?: boolean;
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  withCredentials: true,
})

export const apiClientPublic = axios.create({
  baseURL: 'https://api.deardream.r-e.kr/',
  withCredentials: false,
})

// refresh토큰 로직
apiClient.interceptors.request.use((config) => {
  const at = tokenStorage.getAccess();
  if (at) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${at}`;
  }
  return config;
});

// ===== Refresh 토큰 로직 =====


let isRefreshing = false;
let waitQueue: Array<(token: string | null) => void> = [];

function enqueue(cb: (token: string | null) => void) { waitQueue.push(cb); }
function flushQueue(token: string | null) { waitQueue.forEach((cb) => cb(token)); waitQueue = []; }

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config;
    const status = error.response?.status;

    if (!original || original.__isRetry) return Promise.reject(error);

    if (status === 401) {
      const refreshToken = tokenStorage.getRefresh();
      if (!refreshToken) {
        tokenStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          enqueue((newToken) => {
            if (!newToken) return reject(error);
            original.headers = original.headers ?? {};
            (original.headers as any).Authorization = `Bearer ${newToken}`;
            original.__isRetry = true;
            resolve(apiClient(original));
          });
        });
      }

      isRefreshing = true;
      original.__isRetry = true;

      try {
        // ✅ 헤더로 Bearer refreshToken 전달, 바디는 null
        const resp = await apiClientPublic.post(REFRESH_URL, null, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const newAccess =
          (resp.data as any)?.data?.accessToken ?? (resp.data as any)?.accessToken;
        if (!newAccess) throw new Error('No access token in refresh response');

        // ✅ refreshToken 재발급 없음 → 기존 값 유지
        tokenStorage.setTokens(newAccess);

        flushQueue(newAccess);
        isRefreshing = false;

        original.headers = original.headers ?? {};
        (original.headers as any).Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      } catch (refreshErr) {
        flushQueue(null);
        isRefreshing = false;
        tokenStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);