'use client';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import BasicsForm from '@/components/admin/events/basics-form';
import PromotionsForm from '@/components/admin/events/promotions-form';
import TicketsForm from '@/components/admin/events/tickets-form';
import useCreateEvent from '@/stores/useCreateEvent';

export default function Page() {
  const { progress, getCurrentFormName } = useCreateEvent();

  return (
    <>
      <Card>
        <CardHeader className="sticky top-0 bg-white">
          <Progress value={progress} />
          <div className="mt-4 flex justify-between items-center">
            <div>当前进度：{getCurrentFormName()}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div>{progress === 33 && <BasicsForm />}</div>
          <div>{progress === 66 && <PromotionsForm />}</div>
          <div>{progress === 100 && <TicketsForm />}</div>
        </CardContent>
      </Card>
    </>
  );
}
