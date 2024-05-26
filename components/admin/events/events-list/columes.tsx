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

const DropdownMenuItemCancel = ({
  rowOriginal,
}: {
  rowOriginal: EventBasics;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="h-8">
          取消
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
              placeholder="请输入取消理由～"
              id="cancel-reason"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => console.log('确认', rowOriginal.concert_id)}>
            确认
          </Button>
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
          活动开始时间
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // const startTime = row.original.concert_date; // todo 等后端更新后打开
      const startTime = '2024-05-26T16:00:00.000Z';

      return startTime
        ? format(new Date(startTime), 'yyyy-MM-dd HH:mm:ss')
        : '';
    },
  },
  {
    accessorKey: 'concert_status',
    header: () => <div className="text-right">演唱会状态</div>,
    cell: ({ row }) => {
      const status = parseInt(row.getValue('concert_status'));
      // "concert_status": 0, // 0: 未开始 1：已过期 2、已取消
      if (status === 0) {
        return <div className="text-right">未开始</div>;
      } else if (status === 1) {
        return <div className="text-right text-red-500">已过期</div>;
      } else if (status === 2) {
        return <div className="text-right text-yellow-500">已取消</div>;
      }
    },
  },
  {
    accessorKey: 'review_status',
    header: () => <div className="text-right">审核状态</div>,
    cell: ({ row }) => {
      const status = parseInt(row.getValue('review_status'));
      // "review_status": 0 // 0: 未审核、 1：审核通过、2、审核失败
      if (status === 0) {
        return <div className="text-right">未审核</div>;
      } else if (status === 1) {
        return <div className="text-right text-green-500">审核通过</div>;
      } else if (status === 2) {
        return <div className="text-right text-red-500">审核异常</div>;
      }
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowOriginal = row.original;

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
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(rowOriginal.concert_id)
              }
            >
              复制活动ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItemComponent
              label="查看"
              mode="readonly"
              rowOriginal={rowOriginal}
            />
            <DropdownMenuItemComponent
              label="编辑"
              mode="edit"
              rowOriginal={rowOriginal}
            />
            <DropdownMenuItemComponent
              label="审核"
              mode="review"
              rowOriginal={rowOriginal}
            />
            <DropdownMenuItemCancel rowOriginal={rowOriginal} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
