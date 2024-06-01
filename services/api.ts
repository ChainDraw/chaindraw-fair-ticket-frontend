// src/api.ts

import { LotteryItemProps } from "@/app/client/lottery/components/LatestLottery/LatestLotteryItem";
import { CreateLottery, NFT } from "@/types";
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
  "https://api.studio.thegraph.com/query/76402/chaindraw/version/latest";
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
              url
              participants {
                id
              }
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
// 地址要小写
export const useUserCreateLottery = (userAddress: string) => {
  return useQuery({
    queryKey: ["UserCreateLottery", userAddress],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return;
      const data: any = await request(
        BASE_API_DEV,
        gql`
          query UserCreateLottery($userAddress: ID!) {
            participant(id: $userAddress) {
              createLotteries {
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
          }
        `,
        { userAddress: userAddress }
      );
      return data.participant.createLotteries as CreateLottery[];
    },
    refetchOnWindowFocus: false,
  });
};
export const useUserLottery = (userAddress: string) => {
  return useQuery({
    queryKey: ["UserLottery", userAddress],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return;
      const data: any = await request(
        BASE_API_DEV,
        gql`
          query useUserLottery($userAddress: ID!) {
            participant(id: $userAddress) {
              lotteries {
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
          }
        `,
        { userAddress: userAddress }
      );
      return data.participant.lotteries as CreateLottery[];
    },
    refetchOnWindowFocus: false,
  });
};
// NFT 相关
export const useNFTListings = (orderBy: string, orderDirection: string) => {
  return useQuery({
    queryKey: ["nftLists", orderBy, orderDirection],
    queryFn: async () => {
      const data: any = await request(
        BASE_API_DEV,
        gql`
          query NFTLists {
            nfts(
              where: {
                owner_: { id: "0xbe9137770d8546a7494a94c87c88273f04571a48" }
              }
            ) {
              price
              seller {
                id
              }
              owner {
                id
              }
              tokenId
              tokenURI
              nftMetadata {
                address
                concertName
                description
                image
                name
              }
              id
            }
          }
        `
      );
      return data.nfts;
    },
    refetchOnWindowFocus: false,
  });
};
export const useUserNfts = (userAddress: string) => {
  return useQuery({
    queryKey: ["UserNfts", userAddress],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return;
      const data: any = await request(
        BASE_API_DEV,
        gql`
          query UserNfts($userAddress: ID!) {
            participant(id: $userAddress) {
              nfts {
                id
                price
                nftMetadata {
                  address
                  concertName
                  description
                  image
                  name
                }
              }
            }
          }
        `,
        { userAddress: userAddress }
      );
      return data.participant.nfts;
    },
    refetchOnWindowFocus: false,
  });
};

export const useNftInfo = (id: string) => {
  return useQuery({
    queryKey: ["NftInfo", id],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return;
      const data: any = await request(
        BASE_API_DEV,
        gql`
          query NftInfo($id: ID!) {
            nft(id: $id) {
              price
              seller {
                id
              }
              tokenId
              tokenURI
              nftMetadata {
                address
                concertName
                description
                image
                name
              }
            }
          }
        `,
        { id: id }
      );
      return data.nft as NFT & { seller: { id: string } };
    },
    refetchOnWindowFocus: false,
  });
};
export const useNFTTokenURI = (uri: string) => {
  return useQuery({
    queryKey: ["useNFTTokenURI", uri],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return;
      const hash = queryKey[1].split("ipfs://")[1];
      const ipfsGateway = "https://gateway.pinata.cloud/ipfs/";
      const tokenURI = `${ipfsGateway}${hash}`;
      const result = await axios.get(tokenURI);
      return result;
    },
    refetchOnWindowFocus: false,
    enabled: !!uri,
  });
};
