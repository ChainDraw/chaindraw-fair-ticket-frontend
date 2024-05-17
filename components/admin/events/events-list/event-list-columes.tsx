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
  const { updateMode } = useCreateEvent();

  const handleClick = () => {
    updateMode(mode);
    router.push(`/events/${rowOriginal.id}`);
  };

  return <DropdownMenuItem onClick={handleClick}>{label}</DropdownMenuItem>;
};

export const columns: ColumnDef<EventBasics>[] = [
  {
    accessorKey: 'name',
    header: '活动名称',
  },
  {
    accessorKey: 'start_time',
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
      const startTime = row.original.start_time;
      return startTime
        ? format(new Date(startTime), 'yyyy-MM-dd HH:mm:ss')
        : '';
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-right">状态</div>,
    cell: ({ row }) => {
      const status = parseInt(row.getValue('status'));
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
              onClick={() => navigator.clipboard.writeText(rowOriginal.id)}
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
              mode="approve"
              rowOriginal={rowOriginal}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
