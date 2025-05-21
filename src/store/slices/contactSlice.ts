import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../lib/axios";
import { ContactFormData } from "../../types";

// Define the interface for our slice state
interface ContactState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  successMessage: string | null;
}

// Define the initial state
const initialState: ContactState = {
  status: "idle",
  error: null,
  successMessage: null,
};

// Create an async thunk for sending contact form data
export const sendContactForm = createAsyncThunk(
  "contact/sendContactForm",
  async (formData: ContactFormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/contact", formData);
      return response.data;
    } catch (error: any) {
      // Handle validation errors
      if (error.response?.data?.errors) {
        return rejectWithValue(
          error.response.data.errors.map((err: any) => err.msg).join(", ")
        );
      }
      // Handle other errors
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to send message"
      );
    }
  }
);

// Create the contact slice
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(
        sendContactForm.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.status = "succeeded";
          state.successMessage =
            action.payload.message || "Message sent successfully";
          state.error = null;
        }
      )
      .addCase(sendContactForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to send message";
        state.successMessage = null;
      });
  },
});

// Export actions
export const { resetContactStatus } = contactSlice.actions;

// Export reducer
export default contactSlice.reducer;
