import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProperties } from "../../api/admin";

export const getProperties = createAsyncThunk(
  "properties/getProperties",
  async () => {
    return await fetchProperties();
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState: { properties: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default propertiesSlice.reducer;
