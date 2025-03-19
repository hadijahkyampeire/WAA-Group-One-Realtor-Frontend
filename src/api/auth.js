import { api } from ".";

export const login = async(data) => await api.post("/auth/login", data)
export const register = async (userData) => await api.post("/auth/register", userData);
