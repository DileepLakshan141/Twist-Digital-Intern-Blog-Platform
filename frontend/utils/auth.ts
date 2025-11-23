export const storeToken = (token: string) => {
  localStorage.setItem("blog_access_token", token);
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("blog_access_token");
  }
  return null;
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("blog_access_token");
  }
};
