import * as jwtDecode from "jwt-decode";

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return jwtDecode.default(token); // decode JWT
};

export const logout = () => {
  localStorage.removeItem("token");
};
