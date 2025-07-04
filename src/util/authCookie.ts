import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name:string, value:string | object, options?:any) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name:string) => {
  return cookies.get(name);
};

export const removeCookie = (name:string) => {
  return cookies.remove(name);
};

export const isLogin = () => {
  return !!cookies.get("resume-atk");
};