import { api } from ".";

export const fetchAllProperties = async(params = {}) => await api.get("/public/properties", { params });

export const fetchProperty = async(id) => await api.get(`/public/properties/${id}`);

export const addProperty = async (property) => await api.post("properties", property);

export const fetchOwnerProperties = async() => await api.get("/properties");

export const updateProperty = async (offerId, offer) => await api.put(`/properties/${offerId}`, offer);

export const fetchSingleProperty = async(id) => await api.get(`/properties/${id}`);

export const deleteProperty = async(id) => await api.delete(`/properties/${id}`);

export const updatePropertyStatus = async (propertyId, status) => await api.put(`/properties/${propertyId}/status`, { propertyStatus: status });

export const getPropertyOffers = async (propertyId) => await api.get(`/properties/${propertyId}/offers`);  // Fetch offers for a specific property