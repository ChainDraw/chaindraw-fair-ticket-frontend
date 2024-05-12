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
import useCreateEvent from '@/stores/useCreateEvent';
import { MAX_FILE_SIZE } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';

const formSchema = z.object({
  description: z.string().min(1, {
    message: '请输入活动描述',
  }),
  cover: z
    .instanceof(File, {
      message: '请选择一张图片',
    })
    .refine((file) => file.size < MAX_FILE_SIZE, {
      message: '图片大小不能超过 5MB',
    }),
});

export default function PromotionsForm() {
  const { updateStep, goBack, data } = useCreateEvent();
  const { description, cover } = data.step2;

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
      description: description ?? '',
      cover: cover ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values);
    updateStep(2, values);
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
                <>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*"
                    onChange={(event) => onImageChange(event, onChange)}
                  />
                  {selectedImage && (
                    <div className="flex-center h-[auto]">
                      <Image
                        width="0"
                        height="0"
                        className="w-1/2 max-w-[280px] h-auto"
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
        <div className="text-center space-x-8">
          <Button onClick={goBack}>上一步</Button>
          <Button type="submit">下一步</Button>
        </div>
      </form>
    </Form>
  );
}
