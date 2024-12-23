import axios from "axios";

export const api = axios.create({
  baseURL: "https://client-be.vercel.app",
});

export const axiosPrivate = axios.create({
  baseURL: "https://client-be.vercel.app",
  withCredentials: true,
});
