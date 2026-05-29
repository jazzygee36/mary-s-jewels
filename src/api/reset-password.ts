import { axiosInstance } from "./api-client";

interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export const confirmPassword = async (data: ResetPasswordData) => {
  const res = await axiosInstance.post("/reset-password", data);
  return res.data;
};
