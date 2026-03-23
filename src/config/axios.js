import axios from "axios";

const base_url =
  import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:5500";
const access_token = sessionStorage.getItem("access_token") || "";
const api_key = sessionStorage.getItem("api_key") || "user1";

const instance = axios.create({
  baseURL: base_url,
  headers: {
    Authorization: access_token,
    "X-API-KEY": api_key,
  },
  timeout: 1000,
});

export default instance;
