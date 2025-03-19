import { api } from ".";

export const fetchCustomerOffers = async () => await api.get("/api/v1/offers");

export const makeOffer = async (propertyId, offer) => await api.post(`/properties/${propertyId}/offers`, offer);

export const updateOffer = async (offerId, offer) => await api.put(`/api/v1/offers/${offerId}`, offer);
