import { axiosInstance } from "./api-client";

interface UserProps {
  email: string;
}

export const forgetPassword = async (body: UserProps) => {
  const response = await axiosInstance.post("/forgot-password", body);
  return response.data;
};
