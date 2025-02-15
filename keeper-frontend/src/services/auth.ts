import axios from "axios";

const host = process.env.HOST || "localhost";
const URL = `http://${host}:9000/api/v1`; // Your backend URL

export const signup = (name: string, email: string, password: string) =>
  axios.post(`${URL}/auth/signup`, {name, email, password });

export const login = (email: string, password: string) =>
  axios.post(`${URL}/auth/login`, { email, password });
