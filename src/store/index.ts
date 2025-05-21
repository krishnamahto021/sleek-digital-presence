import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    // Add other reducers here as needed
  },
  devTools: import.meta.env.DEV, // Enable Redux DevTools only in development
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
