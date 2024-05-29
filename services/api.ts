// src/api.ts

import { LotteryItemProps } from "@/app/client/lottery/components/LatestLottery/LatestLotteryItem";
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
  "https://api.studio.thegraph.com/query/70917/chaindraw-metadata/version/latest";
export const useExhibitLottery = (orderBy: string, orderDirection: string) => {
  return useQuery({
    queryKey: ["ExhibitLottery", orderBy, orderDirection],
    queryFn: async () =>
      await request(
        BASE_API_DEV,
        gql`
          query {
            lotteries(
              first: 3
              orderBy: "${orderBy}"
              orderDirection: "${orderDirection}"
            ) {
              id
              name
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
              nftMetadata {
      address
      concertName
      description
      image
      name
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
          query AllLotteryList($skip: Int!){
            lotteries(
              first: 10,
              orderBy: "${orderBy}"
              orderDirection: "${orderDirection}"
              skip: $skip
            ) {
              id
    name
    concertId
    ddl
    completeDraw
    price
    remainingTicketCount
    ticketCount
    ticketType
    url
    nftMetadata {
      address
      concertName
      description
      image
      name
    }
    organizer {
      id
    }
            }
          }
        `,
        { skip }
      );
      return data.lotteries;
    },
    enabled:
      skip !== undefined &&
      orderBy !== undefined &&
      orderDirection !== undefined,
    refetchOnWindowFocus: false,
  });
};
export const useSearchLottery = (
  orderBy: string,
  orderDirection: string,
  skip: number,
  searchValue?: string
) => {
  return useQuery({
    queryKey: ["searchLottery", searchValue, orderBy, orderDirection, skip],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return null;
      const data: any = await request(
        BASE_API_DEV,
        gql`
          query SearchLottery($skip: Int!){
            lotteries(
              first:10
              orderBy: "${orderBy}"
              orderDirection: "${orderDirection}"
              skip: $skip
              where: { name_contains: "${searchValue}" }
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
        `,
        { skip }
      );
      return data.lotteries;
    },

    enabled:
      skip !== undefined &&
      orderBy !== undefined &&
      orderDirection !== undefined &&
      searchValue !== undefined,
    refetchOnWindowFocus: false,
  });
};
export const useLotteryInfo = (id: string) => {
  return useQuery({
    queryKey: ["lotteryInfo", id],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return;
      const data: any = await request(
        BASE_API_DEV,
        gql`
          query LotteryInfo($id: ID!) {
            lottery(id: $id) {
              nftMetadata {
                address
                concertName
                description
                image
                name
              }
              organizer {
                id
              }
              price
              remainingTicketCount
              ticketCount
              completeDraw
              name
              ddl
            }
          }
        `,
        { id: queryKey[1] }
      );
      return data.lottery as LotteryItemProps;
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};
export const useUserCreateLottery = () => {};
export const useNFTListings = (orderBy: string, orderDirection: string) => {
  return useQuery({
    queryKey: ["nftLists", orderBy, orderDirection],
    queryFn: () => {
      const data = request(
        BASE_API_DEV,
        gql`
          query NFTLists {
            nfts(
              where: {
                owner_: { id: "0xd2bdf4f1f8f667d91809594cbbdcc7b23a160656" }
              }
            ) {
              price
              seller {
                id
              }
              lotteryAddress
              tokenId
              tokenURI
            }
          }
        `
      );
    },
  });
};
