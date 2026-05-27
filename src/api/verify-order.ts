import { axiosInstance } from "./api-client";

// Define the precise structure for the shipping object
interface ShippingDetails {
  email: string;
  address: string;
  city: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  shippingNumber: string;
  state: string;
  streetNumber: string;
}

// Update the main payload interface
interface VerifyAndCreatePayload {
  reference: string;
  customer: string;
  shipping: ShippingDetails;
}

// Use the updated interface for the request body
export const verifyAndCreate = async (body: VerifyAndCreatePayload) => {
  const response = await axiosInstance.post("/verify-and-create", body);
  return response.data;
};
