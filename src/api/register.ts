import { axiosInstance } from "./api-client";


interface UserProps {
  email: string;
  password: string;
}

export const Register = async (body: UserProps) => {
  const response = await axiosInstance.post("/register", body);
  return response.data;
};