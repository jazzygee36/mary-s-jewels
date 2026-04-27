import { axiosInstance } from "./api-client";


interface UserProps {
  email: string;
  password: string;
}

export const UserLogin = async (body: UserProps) => {
  const response = await axiosInstance.post("/login", body);
  return response.data;
};