import { axiosInstance } from "./api-client";

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export const confirmPassword = async (body: ResetPasswordPayload) => {
  const response = await axiosInstance.post("/reset-password", body);
  return response.data;
};
