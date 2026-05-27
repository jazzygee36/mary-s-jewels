import { axiosInstance } from "./api-client";

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

interface VerifyAndCreatePayload {
  reference: string;
  customer: string;
  shipping: ShippingDetails;
}

export const verifyAndCreate = async (body: VerifyAndCreatePayload) => {
  const response = await axiosInstance.post("/verify-and-create", body);
  return response.data;
};
