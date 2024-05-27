'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { columns } from '@/components/admin/events/events-list/columes';
import { DataTable } from '@/components/admin/events/events-list/data-table';
import type { EventBasics } from '@/types';

import { ColumnDef } from '@tanstack/react-table';
import CreateButton from '@/components/admin/events/create-button';
import { useEffect, useState } from 'react';
import { handleError } from '@/utils/errors';

// async function getData(): Promise<Partial<EventBasics>[]> {
//   return [
//     {
//       id: '728ed52f',
//       name: 'event1',
//       start_time: new Date(new Date().getTime()),
//       status: 0,
//     },
//     {
//       id: '728ed52a',
//       name: 'event2',
//       start_time: new Date(new Date().getTime() + 20000),
//       status: 1,
//     },
//     {
//       id: '728ed52b',
//       name: 'event3',
//       start_time: new Date(new Date().getTime() + 40000),
//       status: 0,
//     },
//     // ...
//   ];
// }

export default function Page() {
  // const data = await getData();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      try {
        const res = await fetch(
          `https://www.biturd.com/api/v1/concert/concert_list?page_size=999`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
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
        setData(data.result);
      } catch (error) {
        handleError(error);
      }
    })();
  }, []);

  if (!data?.length) {
    return (
      <div className="flex-center flex-col h-full">
        <p className="mb-4">暂无活动</p>
        <div>
          <CreateButton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto pt-4">
        <Button>
          <Link href="/events/create">新建活动</Link>
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns as ColumnDef<Partial<EventBasics>, unknown>[]}
          data={data}
        />
      </div>
    </>
  );
}
