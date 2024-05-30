'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useWriteContract } from 'wagmi';
import { abi } from '@/contracts/abis/market';
import { abi as lotteryAbi } from '@/contracts/abis/lottery';

const DrawerDemo = ({ collection }) => {
  console.log('collection', collection);
  const lotteryContractConfig = {
    address: collection.lotteryAddress,
    abi: lotteryAbi,
  };
  const marketContractConfig = {
    address: '0xD2BDf4F1F8f667d91809594cbbdCc7b23a160656',
    abi,
  };

  const {
    writeContract: approve,
    isPending: approveIsPending,
    isSuccess: approveIsSuccess,
    error: approveError,
  } = useWriteContract();
  console.log('approveIsSuccess', approveIsSuccess);
  console.log('approveError', approveError);
  const {
    writeContract: listNFT,
    isPending: listIsPending,
    error: listError,
  } = useWriteContract();
  console.log('listError', listError);

  const approveBtnClick = async () => {
    try {
      const res = await approve({
        ...lotteryContractConfig,
        functionName: 'approve',
        args: [marketContractConfig.address, collection.tokenId],
      });
    } catch (e) {
      console.log('e', e);
    }
  };
  const listNFTHandle = () => {
    listNFT({
      ...marketContractConfig,
      functionName: 'listNFT',
      args: [collection.lotteryAddress, collection.tokenId, collection.price],
    });
  };
  React.useEffect(() => {
    if (approveIsSuccess) {
      listNFTHandle();
    }
  }, [approveIsSuccess]);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-36  bg-sky-500 hover:bg-sky-600 ">SELL</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Price</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {collection.price}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  wei
                </div>
              </div>
            </div>
            <div className="mt-3 h-[120px]"></div>
          </div>
          <DrawerFooter>
            <Button onClick={() => approveBtnClick()}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDemo;
