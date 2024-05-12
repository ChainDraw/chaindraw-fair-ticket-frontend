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
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE, cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(1, {
    message: '请输入一个有效的门票名称',
  }),
  // support
  email: z.string().email({
    message: '请输入一个有效的邮箱地址',
  }),
  phone: z.string().min(1, {
    message: '请输入一个有效的联系电话',
  }),
  // default cover
  cover: z
    .instanceof(File, {
      message: '请选择一张图片',
    })
    // .refine(
    //   (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type),
    //   '只支持 .jpg, .jpeg, .png and .webp 格式的图片'
    // )
    .refine((file) => file.size < MAX_FILE_SIZE, {
      message: '图片大小不能超过 5MB',
    }),
  // social links
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: '请输入一个有效的链接' }),
      })
    )
    .optional(),
});

export default function SettingsForm() {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(undefined);
    }
  };

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      cover: undefined,
      urls: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
    },
  });

  const { fields } = useFieldArray({
    name: 'urls',
    control: form1.control,
  });

  const placeholders = ['Website', 'X', 'Facebook', 'Telegram'];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values);
  }

  return (
    <Form {...form1}>
      <form onSubmit={form1.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form1.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>主办方名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入主办方名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-between items-center space-x-4">
          <div className="flex-1">
            <FormField
              control={form1.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱地址</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入邮箱地址" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form1.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>联系电话</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入联系电话" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form1.control}
          name="cover"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>门票封面</FormLabel>
              <FormControl>
                <>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*"
                    onChange={(event) => onImageChange(event)}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form1.control}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={placeholders[index]} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="text-center">
          <Button type="submit">保存</Button>
        </div>
      </form>
    </Form>
  );
}
