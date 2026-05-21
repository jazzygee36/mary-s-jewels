import axios from "axios";

export const getMyOrders = async (userId: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/order-by-user/${userId}`,
  );
  return response.data;
};
