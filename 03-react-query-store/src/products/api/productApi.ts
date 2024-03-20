import Axios from "axios";

const API_URL = import.meta.env.VITE_PRODUCT_API;
console.log("🚀 --------- import.meta.env.VITE_PRODUCT_API", import.meta.env.VITE_PRODUCT_API);

export const productApi = Axios.create({
  baseURL: API_URL,
  headers: {},
});
