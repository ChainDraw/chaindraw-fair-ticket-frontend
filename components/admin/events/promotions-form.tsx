'use client';

import {
  Form,
  FormControl,
  FormDescription,
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
  description: z.string(),
  // cover: z
  //   .instanceof(File)
  //   .refine((file) => file, 'File is required.')
  //   .refine((file) => !file || (!!file && file.size <= 5 * 1024 * 1024), {
  //     message: 'The cover picture must be a maximum of 5MB.',
  //   })
  //   .refine((file) => !file || (!!file && file.type?.startsWith('image')), {
  //     message: 'Only images are allowed to be sent.',
  //   }),
  cover: z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024, {
    message: 'Your resume must be less than 7MB.',
  }),
  // ticket_name: z.string(),
  // ticket_type: z.string(),
  // ticket_price: z.number(),
  // ticket_cover: z.string(),
  // ticket_max_num: z.number(),
  // ticket_status: z.string(),
  // allowSecondHandTrade: z.boolean(),
});

export default function PromotionsForm() {
  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      cover: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values);
  }

  return (
    <Form {...form1}>
      <form onSubmit={form1.handleSubmit(onSubmit)} className="space-y-8">
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
          name="cover"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>活动封面</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="application/pdf"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center">
          <Button type="submit">下一步</Button>
        </div>
      </form>
    </Form>
  );
}
