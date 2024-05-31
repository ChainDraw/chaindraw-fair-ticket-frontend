import { useUserNfts } from "@/services/api";
import { NFT } from "@/types";
import { formatImage, formatNFTId } from "@/utils/common";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  marketAddress,
  useReadLotteryGetApproved,
  useWriteLotteryApprove,
  useWriteMarketListNft,
} from "@/contracts/generated";
type Props = {
  address: string;
};
type FormData = z.infer<typeof formSchema>;
const formSchema = z.object({
  price: z
    .string()
    .regex(/^\d+$/, { message: "Price must be a valid number" })
    .refine((val) => BigInt(val) > 0, {
      message: "Price must be greater than 0",
    }),
});
export const NFTItem = (props: NFT) => {
  const { address, tokenId } = formatNFTId(props.id);
  console.log(address);
  const image = formatImage(props.nftMetadata);
  const { writeContractAsync: list, error: listError } =
    useWriteMarketListNft();
  const { writeContractAsync: approve, isError } = useWriteLotteryApprove();
  const { data: isApprove } = useReadLotteryGetApproved({
    address: address,
    args: [BigInt(tokenId)],
  });

  const sellForm = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormData) => {
    if (isApprove && isApprove !== marketAddress) {
      await approve({
        address: address,
        args: [marketAddress, BigInt(tokenId)],
      });
    }
    await list({
      args: [address, BigInt(tokenId), BigInt(values.price)],
    });
  };

  return (
    <div className="w-full flex flex-col bg-gradient-to-br from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white rounded-2xl overflow-hidden ">
      <div className="relative h-64 overflow-hidden group">
        <span className="w-full h-full bg-black bg-opacity-25 absolute top-0 z-10"></span>
        <Image
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt="lottery"
          className="transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="py-2">
        <h1 className="text-white font-semibold text-lg px-2">
          {props.nftMetadata.concertName}
        </h1>
        <article className="px-4">
          <div className="flex justify-between">
            <span>Price</span>
            <div>
              {props.price}
              <span> Wei</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Location</span>
            <div>{props.nftMetadata.address}</div>
          </div>
        </article>
      </div>
      <Dialog>
        <DialogTrigger asChild className="bg-transparent hover:bg-transparent">
          <Button
            variant="outline"
            className="hover:text-orange-500 text-base font-bold"
          >
            Sell
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sell Your Tick</DialogTitle>
            <DialogDescription>
              Set the price for your NFT. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={sellForm.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  NFT Name
                </Label>
                <Input
                  id="name"
                  defaultValue={props.nftMetadata.concertName}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (WEI)
                </Label>
                <Input
                  id="price"
                  placeholder="xxxx WEI"
                  className="col-span-3"
                  {...sellForm.register("price")}
                />
                {sellForm.formState.errors.price && (
                  <p className="col-span-4 text-red-500">
                    {sellForm.formState.errors.price.message?.toString()}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Sell NFT</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const NFTS = ({ address }: { address: string }) => {
  const { data: items } = useUserNfts(address);
  return items?.map((item: any) => <NFTItem key={item.id} {...item} />);
};

export default NFTS;
