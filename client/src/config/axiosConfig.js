import axios from "axios";

export const userInstance = axios.create({ baseURL: "http://localhost:4000/user", withCredentials: true });
export const adminInstance = axios.create({ baseURL: "http://localhost:4000/admin", withCredentials: true });
export const authInstance = axios.create({ baseURL: "http://localhost:4000/auth", withCredentials: true });
