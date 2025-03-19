import { api } from ".";

export const fetchAllProperties = async(params = {}) => await api.get("/public/properties", { params });

export const fetchProperty = async(id) => await api.get(`/public/properties/${id}`);

export const addProperty = async (property) => await api.post("properties", property);

export const fetchOwnerProperties = async() => await api.get("/properties");