'use client';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { useState } from 'react';
import PromotionsForm from '@/components/admin/events/promotions-form';
import TicketsForm from '@/components/admin/events/tickets-form';

export default function Page() {
  const [progress, setProgress] = useState(100);

  const map: { [key: number]: string } = {
    33: '基本信息',
    66: '促销信息',
    100: '门票信息',
  };

  return (
    <>
      <Card>
        <CardHeader className="sticky top-0 bg-white">
          <Progress value={progress} />
          <div className="mt-4 flex justify-between items-center">
            <div>当前进度：{map[progress]}</div>
          </div>
        </CardHeader>
        <CardContent>
          <TicketsForm />
        </CardContent>
      </Card>
    </>
  );
}
