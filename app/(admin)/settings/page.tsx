'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import SettingsForm from '@/components/admin/settings/settings-form';

export default function Page() {
  return (
    <>
      <Card>
        <CardHeader className="bg-white">
          <h1 className="font-bold">活动主办方详情</h1>
        </CardHeader>
        <CardContent>
          <SettingsForm />
        </CardContent>
      </Card>
    </>
  );
}
