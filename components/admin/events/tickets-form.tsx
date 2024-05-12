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
import { Switch } from '@/components/ui/switch';
import useCreateEvent from '@/stores/useCreateEvent';
import { MAX_FILE_SIZE } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';

const formSchema = z.object({
  max_per_wallet: z.coerce.number().min(1, {
    message: '请输入单个钱包最大购买数量',
  }),
  ticket_max_num: z.coerce.number().min(1, {
    message: '请输入门票最大可购买数量',
  }),
  ticket_price: z.coerce.number().min(1, {
    message: '请输入门票价格',
  }),
  ticket_name: z.string().min(1, {
    message: '请输入门票名称',
  }),
  ticket_description: z.string().min(1, {
    message: '请输入门票描述',
  }),
  ticket_cover: z
    .instanceof(File, {
      message: '请选择一张图片',
    })
    .refine((file) => file.size < MAX_FILE_SIZE, {
      message: '图片大小不能超过 5MB',
    }),
  allow_transfer: z.boolean(),
});

export default function TicketsForm() {
  const { updateStep, submitData } = useCreateEvent();

  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>, fn: any) => {
    fn(e.target.files?.[0]);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(undefined);
    }
  };

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      max_per_wallet: 0,
      ticket_max_num: 0,
      ticket_price: 0,
      ticket_name: '',
      ticket_description: '',
      ticket_cover: undefined,
      allow_transfer: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values);
    updateStep(3, values);
    submitData();
  }

  return (
    <Form {...form1}>
      <form onSubmit={form1.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form1.control}
          name="ticket_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>门票名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入门票名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="max_per_wallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>单个钱包最大购买数量</FormLabel>
              <FormControl>
                <Input placeholder="请输入单个钱包最大购买数量" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="ticket_max_num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>门票最大可购买数量</FormLabel>
              <FormControl>
                <Input placeholder="请输入门票最大可购买数量" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="ticket_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>门票描述</FormLabel>
              <FormControl>
                <Input placeholder="请输入门票描述" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="ticket_cover"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>门票封面</FormLabel>
              <FormControl>
                <>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*"
                    onChange={(event) => onImageChange(event, onChange)}
                  />
                  {selectedImage && (
                    <div className="flex-center h-[200px]">
                      <Image
                        width={300}
                        height={300}
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                      />
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="allow_transfer"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>是否运行二手交易</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="text-center">
          <Button type="submit">发布</Button>
        </div>
      </form>
    </Form>
  );
}
