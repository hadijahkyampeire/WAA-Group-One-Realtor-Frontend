import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./reducers/admin/customersSlice";
import propertiesReducer from "./reducers/admin/propertiesSlice";
import authReducer from "./slices/authSlices";

const store = configureStore({
  reducer: {
    customers: customersReducer,
    properties: propertiesReducer,
    auth: authReducer,
  },
});

export default store;
