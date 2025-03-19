import { api } from "./index";

export const fetchCustomers = async () => {
  const response = await api.get("/admin/customers");
  return response.data;
};

export const activateUser = async (id) => {
  await api.post(`/admin/users/${id}/activate`);
};

export const deactivateUser = async (id) => {
  await api.post(`/admin/users/${id}/deactivate`);
};

export const fetchProperties = async () => {
  const response = await api.get("/public/properties");
  return response.data;
};
