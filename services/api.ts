// src/api.ts

import axios, { AxiosResponse } from "axios";
import { SiweMessage } from "siwe";

const axiosInstance = axios.create({
  baseURL: "https://www.biturd.com/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 获取用户个人信息
export const fetchUserInfo = async () => {
  const response = await axiosInstance.get("/user/personal_information");
  return response.data;
};
//
export const fetchLogout = async () => {
  const response = await axiosInstance.get("/user/logout");
  return response.data;
};

// 获取 nonce
export const fetchNonce = async () => {
  const response = await axiosInstance.get("/user/nonce");
  return response.data.data;
};

// 验证签名
export const fetchVerifySignature = async (message: any, signature: string) => {
  const response = await axiosInstance.post("/user/verify", {
    message: message,
    signature,
  });
  return response.data;
};
// useLottery list
