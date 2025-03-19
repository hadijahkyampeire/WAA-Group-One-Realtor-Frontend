import { api } from ".";

export const login = async(data) => await api.post("/auth/login", data)