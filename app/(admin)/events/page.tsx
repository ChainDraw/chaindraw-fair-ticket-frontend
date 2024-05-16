import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { columns } from '@/components/admin/events/events-list/event-list-columes';
import { DataTable } from '@/components/admin/events/events-list/data-table';
import type { Event } from '@/types';

import { ColumnDef } from '@tanstack/react-table';

async function getData(): Promise<Partial<Event>[]> {
  return [
    {
      id: '728ed52f',
      name: 'event1',
      start_time: new Date(new Date().getTime()),
      status: 0,
    },
    {
      id: '728ed52a',
      name: 'event2',
      start_time: new Date(new Date().getTime() + 20000),
      status: 1,
    },
    {
      id: '728ed52b',
      name: 'event3',
      start_time: new Date(new Date().getTime() + 40000),
      status: 0,
    },
    // ...
  ];
}

export default async function Page() {
  const demo_data = await getData();

  const res = await fetch('http://localhost:3000/api/admin/events', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const responseData = await res.json();

  const { data } = responseData;
  console.log('data', data);

  if (!data.length) {
    return (
      <div className="flex-center flex-col h-full">
        <p className="mb-4">暂无活动</p>
        <div>
          <Button>
            <Link href="/events/create">新建活动</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns as ColumnDef<Partial<Event>, unknown>[]}
          data={demo_data}
        />
      </div>
    </>
  );
}
