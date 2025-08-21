export const tokenStorage = {
    getAccess: () => 
        localStorage.getItem("accessToken") ?? 
        localStorage.getItem("token") ??
        null,
    getRefresh: () => 
        localStorage.getItem("refreshToken")??
        localStorage.getItem("refresh") ??
        null,
    setTokens: (access: string, refresh?: string | null) => {
        localStorage.setItem("accessToken", access);
        if (refresh) localStorage.setItem("refreshToken", refresh);
    },
    clear: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    },
};