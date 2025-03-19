import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOwners,
  activateUser,
  deactivateUser,
  verifyUser
} from "../../api/admin";

export const getOwners = createAsyncThunk(
  "owners/getOwners",
  async () => {
    return await fetchOwners();
  }
);

export const toggleUserStatus = createAsyncThunk(
  "owners/toggleUserStatus",
  async ({ id, active }) => {
    if (active) {
      await deactivateUser(id);
    } else {
      await activateUser(id);
    }
    return { id, active: !active };
  }
);

export const verifyOwner = createAsyncThunk(
  "owners/verifyOwner",
  async ({ id, verified }) => {
    if (!verified) {
      verifyUser(id);
    } 
    return { id, active: !verified };
  }
);

const ownersSlice = createSlice({
  name: "owners",
  initialState: { owners: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOwners.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOwners.fulfilled, (state, action) => {
        state.loading = false;
        state.owners = action.payload;
      })
      .addCase(getOwners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const user = state.owners.find((u) => u.id === action.payload.id);
        if (user) user.active = action.payload.active;
      })
      .addCase(verifyOwner.fulfilled, (state, action) => {
        const user = state.owners.find((u) => u.id === action.payload.id);
        if (user) user.verified = action.payload.verified;
      });
  },
});

export default ownersSlice.reducer;
