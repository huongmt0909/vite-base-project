const storageKey = {
  accessToken: "access_token",
};

export const storage = {
  getHeaders: () => {
    return localStorage.getItem("headers");
  },
  setHeaders: (headers: any) => {
    localStorage.setItem("headers", JSON.stringify(headers));
  },
  removeHeaders: () => {
    localStorage.removeItem("headers");
  },
  getToken: () => {
    return localStorage.getItem(storageKey.accessToken);
  },
  setToken: (token: string) => {
    localStorage.setItem(storageKey.accessToken, token);
  },
  removeToken: () => {
    localStorage.removeItem(storageKey.accessToken);
  },
};
