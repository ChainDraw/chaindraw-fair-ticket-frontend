// src/api.ts

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { gql, request } from "graphql-request";

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
// Graphql
const BASE_API_DEV =
  "https://api.studio.thegraph.com/query/70917/chaindraw/version/latest";
export const useExhibitLottery = (orderBy: string, orderDirection: string) => {
  return useQuery({
    queryKey: ["ExhibitLottery", orderBy, orderDirection],
    queryFn: async () =>
      request(
        BASE_API_DEV,
        gql`
          query {
            lotteries(
              first: 3
              orderBy: $orderBy
              orderDirection: $orderDirection
            ) {
              id
              name
              createAtTimestamp
              createAtBlockNumber
              ddl
              concertId
              completeDraw
              price
              remainingTicketCount
              ticketCount
              ticketType
              url
              organizer {
                id
              }
            }
          }
        `
      ),
    refetchOnWindowFocus: false,
  });
};
export const useLotteryAll = () => {
  return useQuery({
    queryKey: [""],
    queryFn: () => {},
  });
};
