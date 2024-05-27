// src/api.ts

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { gql, request } from "graphql-request";

export const axiosInstance = axios.create({
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
      await request(
        BASE_API_DEV,
        gql`
          ExhibitLottery {
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
export const useLotteryList = (
  orderBy: string,
  orderDirection: string,
  skip: number
) => {
  return useQuery({
    queryKey: ["LotteryList", orderBy, orderDirection, skip],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return null;
      const data: any = await request(
        BASE_API_DEV,
        gql`
          query {
            lotteries(
              orderBy: $orderBy
              orderDirection: $orderDirection
              skip: $skip
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
      );
    },
  });
};
