export const selectCustomers = (state) => state.customers.customers;
export const selectCustomersLoading = (state) => state.customers.loading;
export const selectCustomersError = (state) => state.customers.error;

export const selectOwners = (state) => state.owners.owners;
export const selectOwnersLoading = (state) => state.owners.loading;
export const selectOwnersError = (state) => state.owners.error;