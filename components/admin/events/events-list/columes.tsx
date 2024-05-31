'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import type { EventBasics } from '@/types';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import useCreateEvent, { EventMode } from '@/stores/useCreateEvent';

import { useAccount, useWriteContract } from 'wagmi';
import { abi } from '@/contracts/abis/LotteryEscrowFactory';
import { toast } from '@/components/ui/use-toast';
import { handleError } from '@/utils/errors';
import { useState } from 'react';

const DropdownMenuItemComponent = ({
  label,
  mode,
  rowOriginal,
}: {
  label: string;
  mode: EventMode;
  rowOriginal: EventBasics;
}) => {
  const router = useRouter();
  const { updateMode, reset } = useCreateEvent();

  const handleClick = () => {
    reset();
    updateMode(mode);

    const map: Partial<Record<EventMode, string>> = {
      edit: `/events/${rowOriginal.concert_id}/edit`,
      review: `/events/${rowOriginal.concert_id}/review`,
      readonly: `/events/${rowOriginal.concert_id}`,
    };

    router.push(map[mode]!);
  };

  return <DropdownMenuItem onClick={handleClick}>{label}</DropdownMenuItem>;
};

// 取消
const DropdownMenuItemCancel = ({
  rowOriginal,
}: {
  rowOriginal: EventBasics;
}) => {
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);

  const onCancel = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/concert/cancel`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            concert_id: rowOriginal.concert_id,
            cancel_reason: reason,
          }),
        }
      );

      if (!res.ok) {
        if (res.status === 500) {
          console.log('Server error: 500');
          throw new Error('Server error: 500');
        } else {
          throw new Error(`Unexpected status code: ${res.status}`);
        }
      }

      const data = await res.json();
      setOpen(false);
      console.log('data', data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="h-8">
          取 消
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>取消活动</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cancel-reason" className="text-right">
              取消理由
            </Label>
            <Textarea
              value={reason}
              placeholder="请输入取消理由～"
              id="cancel-reason"
              className="col-span-3"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onCancel()}>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// 发布
const DropdownMenuItemPublish = ({ rowOriginal }: { rowOriginal: any }) => {
  const [open, setOpen] = useState(false);
  // const router = useRouter();
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();

  // 发布成功后调用
  const onSuccess = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/concert/publish`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            concert_id: rowOriginal.concert_id,
          }),
        }
      );

      if (!res.ok) {
        if (res.status === 500) {
          console.log('Server error: 500');
          throw new Error('Server error: 500');
        } else {
          throw new Error(`Unexpected status code: ${res.status}`);
        }
      }
      toast({
        description: '发布成功',
      });
    } catch (error) {
      handleError(error);
    }
  };

  const onPublish = async () => {
    if (!window.ethereum) {
      toast({
        description: '请先安装钱包',
        variant: 'destructive',
      });
      return;
    }

    if (!address) {
      toast({
        description: '请先连接钱包',
        variant: 'destructive',
      });
      return;
    }

    const {
      concert_id,
      concert_name,
      ticket_types,
      concert_end_date,
      lottery_end_date,
    } = rowOriginal;

    ticket_types.forEach((ticket: any) => {
      const { ticket_type, type_name, price, ticket_img, num } = ticket;
      const ddl = new Date(lottery_end_date).getTime();
      const concertEndDate = new Date(concert_end_date).getTime();

      // 写入合约
      writeContractAsync({
        abi,
        address: '0x7C9621B1B60A2dFb22Bd427cA429066015Ed0EFF', // 地址
        functionName: 'createEscrow',
        args: [
          address!,
          concert_id,
          ticket_type,
          type_name,
          concert_name,
          price,
          'ipfs://' + ticket_img,
          num,
          ddl as unknown as bigint,
          concertEndDate as unknown as bigint,
        ],
      })
        .then((res) => {
          setOpen(false);
          if (res) {
            onSuccess();
          }
        })
        .catch((err) => {
          setOpen(false);
          toast({
            title: '发布失败',
            description: err.message,
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-8">发 布</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>确认要发布活动吗？</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onPublish()}>确 认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const columns: ColumnDef<EventBasics>[] = [
  {
    accessorKey: 'concert_name',
    header: '活动名称',
  },
  {
    accessorKey: 'concert_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          活动入场时间
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startTime = row.original.concert_date;

      return startTime
        ? format(new Date(startTime), 'yyyy-MM-dd HH:mm:ss')
        : '';
    },
  },
  {
    accessorKey: 'concert_end_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          活动结束时间
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const endTime = row.original.concert_end_date;
      return endTime ? format(new Date(endTime), 'yyyy-MM-dd HH:mm:ss') : '';
    },
  },
  {
    accessorKey: 'lottery_end_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          抽取截止时间
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const endTime = row.original.concert_end_date;
      return endTime ? format(new Date(endTime), 'yyyy-MM-dd HH:mm:ss') : '';
    },
  },
  {
    accessorKey: 'concert_status',
    header: () => <div className="text-center">演唱会状态</div>,
    cell: ({ row }) => {
      const status = parseInt(row.getValue('concert_status'));
      // "concert_status": 0, // 0: 未开始 1：已过期 2、已取消 3、抽取中
      if (status === 0) {
        return <div className="text-center">未开始</div>;
      } else if (status === 1) {
        return <div className="text-center text-red-500">已过期</div>;
      } else if (status === 2) {
        return <div className="text-center text-yellow-500">已取消</div>;
      } else if (status === 3) {
        return <div className="text-center text-blue-500">抽取中</div>;
      }
    },
  },
  {
    accessorKey: 'review_status',
    header: () => <div className="text-center">审核状态</div>,
    cell: ({ row }) => {
      const status = parseInt(row.getValue('review_status'));
      // "review_status": 0 // 0: 未审核、 1：审核通过、2、审核失败
      if (status === 0) {
        return <div className="text-center">未审核</div>;
      } else if (status === 1) {
        return <div className="text-center text-green-500">审核通过</div>;
      } else if (status === 2) {
        return <div className="text-center text-red-500">审核异常</div>;
      }
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowOriginal = row.original;
      console.log('rowOriginal', rowOriginal);

      const review_status = parseInt(row.getValue('review_status'));
      const concert_status = parseInt(row.getValue('concert_status'));

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(rowOriginal.concert_id)
              }
            >
              复制活动ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItemComponent
              label="查看"
              mode="readonly"
              rowOriginal={rowOriginal}
            />
            {/* <DropdownMenuItemComponent
              label="编辑"
              mode="edit"
              rowOriginal={rowOriginal}
            /> */}
            {review_status === 0 && concert_status === 0 && (
              <DropdownMenuItemComponent
                label="审核"
                mode="review"
                rowOriginal={rowOriginal}
              />
            )}
            {review_status === 1 && concert_status !== 3 && (
              <DropdownMenuItemPublish rowOriginal={rowOriginal} />
            )}
            {concert_status === 0 && (
              <DropdownMenuItemCancel rowOriginal={rowOriginal} />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
