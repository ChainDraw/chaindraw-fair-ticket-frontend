import dayjs from "dayjs";
import numbro from "numbro";
import BigNumber from "bignumber.js";
import duration from "dayjs/plugin/duration";
import { Address, formatEther, parseEther } from "viem";
import axios from "axios";
dayjs.extend(duration);
export const formatAddress = (address?: Address) => {
  return address
    ? address.replace(address.slice(5, address.length - 3), "...")
    : "--";
};
export const toWei = (value: number | string) => {
  return parseEther(value.toString());
};
export const toEther = (value: bigint) => {
  return formatEther(value);
};
export const toTokenDecimals = (value: string | number, decimals: number) => {
  return new BigNumber(value).div(new BigNumber(10).pow(decimals));
};
// "123456.123456" --》123.4561k
export const formatTokenNumber = (value: string) => {
  return numbro(value).format({
    average: true,
    trimMantissa: true,
    mantissa: 4,
    roundingFunction(num: number) {
      return Math.floor(num);
    },
  });
};
// ticketLottery   winner -> ticketCount  百分比
export const getDiscountPercent = (oldValue: number, value: number) => {
  const result = (oldValue / value) * 100;
  return result.toString();
};
export const getCountdown = (targetTime: number) => {
  try {
    const now = dayjs();
    const target =
      String(targetTime).length === 10
        ? dayjs(targetTime * 1000)
        : dayjs(targetTime);
    const diffInMs = target.diff(now);

    if (diffInMs <= 0) return null; // 如果时间已经过去，返回 null
    const diff = dayjs.duration(diffInMs);
    const days = diff.days();
    const hours = diff.hours() < 10 ? `0${diff.hours()}` : diff.hours();
    const minutes = diff.minutes() < 10 ? `0${diff.minutes()}` : diff.minutes();
    const seconds = diff.seconds() < 10 ? `0${diff.seconds()}` : diff.seconds();
    return [days, hours, minutes, seconds];
  } catch (error) {
    console.log(error);
  }
};
export const formatImage = (nftMetadata: any) => {
  if (!nftMetadata) {
    return "https://gateway.pinata.cloud/ipfs/Qmeuer3mRpnrhE3yA84UHzthPEFs3ovT53TqaMPhqmfkHz";
  }
  const image =
    "https://gateway.pinata.cloud/ipfs/" +
    nftMetadata?.image?.split("ipfs://")[1];
  return image as string;
};
export const formatNFTId = (id: string) => {
  const [address, tokenId] = id?.split("-");
  return { address, tokenId } as { address: Address; tokenId: string };
};
export const formatTokenURI = async (data: string) => {
  if (!data) return;
  console.log(data);
  const hash = data.split("ipfs://")[1];
  try {
    // 替换 ipfs:// 前缀为实际的 IPFS 网关 URL
    const ipfsGateway = "https://gateway.pinata.cloud/ipfs/";
    const tokenURI = `${ipfsGateway}${hash}`;

    // 从 IPFS 获取数据
    const response = await axios.get(tokenURI);
    const data = response.data;

    // 确保数据包含必要的属性
    if (!data.name || !data.description || !data.image || !data.attributes) {
      throw new Error("Invalid tokenURI data format");
    }
    const image =
      "https://gateway.pinata.cloud/ipfs/" + data.image.split("ipfs://")[1];
    // 返回解析后的数据对象
    return {
      name: data.name,
      description: data.description,
      image: image,
      attributes: data.attributes,
    };
  } catch (error) {
    console.error("Error fetching tokenURI data:", error);
    throw error;
  }
};
