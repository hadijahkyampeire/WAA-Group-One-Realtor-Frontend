import { api } from ".";

export const fetchAllProperties = async() => await api.get("/public/properties");

export const fetchProperty = async(id) => await api.get(`/public/properties/${id}`);