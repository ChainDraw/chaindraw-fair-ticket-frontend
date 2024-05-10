'use client';

import { Input } from '@/components/ui/input';

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
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

// {
//     id: 'asdasdasd123123',
//     name: '演唱会01',
//     address: '上海市新天地',
//     date: '2023-01-01',
//     time: '12:00',
//     cover: 'https://picsum.photos/200/300',
//     description: '上海市新天地有一场演唱会。',
//     status: '已结束',
//     review_status: '已审核',
//     ticket: {
//       ticket_name: '演唱会01门票',
//       ticket_type: '普通票',
//       ticket_price: 100,
//       ticket_cover: 'https://picsum.photos/200/300',
//       ticket_max_num: 1000,
//       ticket_status: '已售罄',
//       allowSecondHandTrade: true, // 二手交易开关
//     },
//   },

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  description: z.string(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  entry_time: z.string().datetime(),
  // ticket_type: z.string(),
  // ticket_price: z.number(),
  // ticket_cover: z.string(),
  // ticket_max_num: z.number(),
  // ticket_status: z.string(),
  // allowSecondHandTrade: z.boolean(),
});

export default function BasicsForm() {
  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      description: '',
      start_time: '',
      end_time: '',
      entry_time: '',
    },
  });

  function onLogin(values: z.infer<typeof formSchema>) {
    console.log('123');
  }

  return (
    <Form {...form1}>
      <form onSubmit={form1.handleSubmit(onLogin)} className="space-y-8">
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动描述</FormLabel>
              <FormControl>
                <Input placeholder="请输入活动描述" {...field} />
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
        <FormField
          control={form1.control}
          name="start_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>开始时间</FormLabel>
              <FormControl>
                <Input placeholder="请选择开始时间" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="entry_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>入场时间</FormLabel>
              <FormControl>
                <Input placeholder="请选择入场时间" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="end_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>结束时间</FormLabel>
              <FormControl>
                <Input placeholder="请选择结束时间" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="text-center">
          <Button type="submit">登 录</Button>
        </div> */}
      </form>
    </Form>
  );
}
