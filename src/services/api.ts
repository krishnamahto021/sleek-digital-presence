import apiClient from "../lib/axios";
import { ContactFormData } from "../types";

/**
 * Contact form API service
 */
export const contactService = {
  /**
   * Send a contact form submission
   * @param data - Contact form data (name, email, message)
   * @returns Promise with the API response
   */
  sendContactForm: (data: ContactFormData) => {
    return apiClient.post("/contact", data);
  },
};

// Export additional API services here as needed
