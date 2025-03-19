import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCustomers,
  activateUser,
  deactivateUser,
} from "../../api/admin";

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async () => {
    return await fetchCustomers();
  }
);

export const toggleUserStatus = createAsyncThunk(
  "customers/toggleUserStatus",
  async ({ id, active }) => {
    if (active) {
      await deactivateUser(id);
    } else {
      await activateUser(id);
    }
    return { id, active: !active };
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: { customers: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const user = state.customers.find((u) => u.id === action.payload.id);
        if (user) user.active = action.payload.active;
      });
  },
});

export default customersSlice.reducer;
