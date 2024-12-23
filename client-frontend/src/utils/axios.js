import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const axiosPrivate = axios.create({
  baseURL: "https://client-be.vercel.app",
  withCredentials: true,
});
