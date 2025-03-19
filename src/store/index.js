import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./reducers/admin/customersSlice";
import propertiesReducer from "./reducers/admin/propertiesSlice";

const store = configureStore({
  reducer: {
    customers: customersReducer,
    properties: propertiesReducer,
  },
});

export default store;
