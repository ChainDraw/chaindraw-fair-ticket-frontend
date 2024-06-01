import dayjs from "dayjs";
import numbro from "numbro";
import BigNumber from "bignumber.js";
import duration from "dayjs/plugin/duration";
import { Address, formatEther, parseEther } from "viem";
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
  const image =
    "https://gateway.pinata.cloud/ipfs/" +
    // "Qmeuer3mRpnrhE3yA84UHzthPEFs3ovT53TqaMPhqmfkHz";
    nftMetadata?.image?.split("ipfs://")[1];
  return image as string;
};
export const formatNFTId = (id: string) => {
  const [address, tokenId] = id?.split("-");
  return { address, tokenId } as { address: Address; tokenId: string };
};
