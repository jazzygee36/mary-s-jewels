import axios from "axios";

export const getAllProducts = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/get-all-products`,
  );
  return response.data;
};
