'use client';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { useState } from 'react';
import BasicsForm from '@/components/admin/events/basics-form';

export default function Page() {
  const [progress, setProgress] = useState(33);

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
          <BasicsForm />
        </CardContent>
      </Card>
    </>
  );
}
