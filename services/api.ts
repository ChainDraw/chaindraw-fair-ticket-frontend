// react query function
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const axiosInstance = axios.create({
  baseURL: "https://your-api-url.com",
});
