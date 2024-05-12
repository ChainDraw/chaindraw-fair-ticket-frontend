'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, { message: '请输入活动名称' }),
  address: z.string().min(1, { message: '请输入活动地点' }),
  start_time: z.string().min(1),
  end_time: z.string().min(1),
  entry_time: z.string().min(1),
});

export default function BasicsForm() {
  const router = useRouter();

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      start_time: '',
      end_time: '',
      entry_time: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values);
    router.push('/events/create/promotions');
  }

  return (
    <Form {...form1}>
      <form onSubmit={form1.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form1.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入活动名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动地点</FormLabel>
              <FormControl>
                <Input placeholder="请输入活动地点" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-between items-center space-x-4">
          <div className="flex-1">
            <FormField
              control={form1.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>开始时间</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入开始时间" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form1.control}
              name="entry_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>入场时间</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入入场时间" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form1.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>结束时间</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入结束时间" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="text-center">
          <Button type="submit">下一步</Button>
        </div>
      </form>
    </Form>
  );
}
