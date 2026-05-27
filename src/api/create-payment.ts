import { axiosInstance } from "./api-client";

interface PaymentProps {
  amount: string;
  currency: string;
  orderId: string;
  email: string;
}

export const createPayment = async (body: PaymentProps) => {
  const response = await axiosInstance.post("/create-payment", body);
  return response.data;
};
