import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./slices/customersSlice";
import propertiesReducer from "./slices/propertiesSlice";
import authReducer from "./slices/authSlices";
import ownersReducer from "./slices/ownersSlice"

const store = configureStore({
  reducer: {
    customers: customersReducer,
    properties: propertiesReducer,
    auth: authReducer,
    owners: ownersReducer
  },
});

export default store;
