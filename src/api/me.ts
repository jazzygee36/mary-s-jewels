import { axiosInstance } from "./api-client";

export const getUser = async () => {
  const token = sessionStorage.getItem("token");

  const response = await axiosInstance.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
