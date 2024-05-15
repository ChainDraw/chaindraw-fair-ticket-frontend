import { Button } from '@/components/ui/button';
import Link from 'next/link';

import {
  Payment,
  columns,
} from '@/components/admin/events/events-list/columes';
import { DataTable } from '@/components/admin/events/events-list/data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm1@example.com',
    },
    {
      id: '728ed52a',
      amount: 102,
      status: 'processing',
      email: 'm2@example.com',
    },
    {
      id: '728ed52b',
      amount: 200,
      status: 'success',
      email: 'm3@example.com',
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
      <div>
        {data.length &&
          data.map((item: any) => <div key={item.id}>{item.name}</div>)}
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={demo_data} />
      </div>
    </>
  );
}
