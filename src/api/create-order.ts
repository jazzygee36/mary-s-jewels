import { axiosInstance } from "./api-client";

export interface CreateOrderDto {
  customer: string;

  items: {
    product: string;
    quantity: number;
  }[];

  firstName: string;
  lastName: string;
  phoneNumber: string;

  streetNumber: string;
  address: string;
  city: string;
  state: string;

  amount: number;
}

export const createOrder = async (body: CreateOrderDto) => {
  const response = await axiosInstance.post("/create-order", body);
  return response.data;
};
