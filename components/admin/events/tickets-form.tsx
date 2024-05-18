import React, { useMemo, useState } from 'react';
import Image from 'next/image';

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
import { Switch } from '@/components/ui/switch';
import useCreateEvent from '@/stores/useCreateEvent';
import { MAX_FILE_SIZE } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import ReviewDialog from './events-review/review-dialog';

// 定义一个门票对象的模式
const ticketSchema = z.object({
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
  allow_transfer: z.boolean().optional(),
});

// 更新模式以处理门票的数组
const formSchema = z.object({
  tickets: z.array(ticketSchema),
});

export default function TicketsForm() {
  const { submitData, goBack, data, updateFinalStep, mode } = useCreateEvent();
  const {
    max_per_wallet,
    ticket_max_num,
    ticket_price,
    ticket_name,
    ticket_description,
    ticket_cover,
    allow_transfer,
  } = data.step3;

  const disabled = useMemo(() => mode === 'readonly', [mode]);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const onImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fn: any,
    index: number
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      fn(file);
      setSelectedImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file;
        console.log('newImages', newImages);
        return newImages;
      });
    }
  };

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tickets: [
        {
          max_per_wallet: max_per_wallet ?? 0,
          ticket_max_num: ticket_max_num ?? 0,
          ticket_price: ticket_price ?? 0,
          ticket_name: ticket_name ?? '',
          ticket_description: ticket_description ?? '',
          ticket_cover: ticket_cover ?? undefined,
          allow_transfer: allow_transfer ?? false,
        },
      ],
    },
  });

  // 使用 react-hook-form 的 useFieldArray 来管理动态字段数组
  const { fields, append, remove } = useFieldArray({
    control: form1.control,
    name: 'tickets',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    updateFinalStep(values);
    const response = await submitData();
    console.log(await response);
    toast({
      title: '提交成功',
    });
  }

  const handleRemove = (index: number) => {
    remove(index);
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Form {...form1}>
      <form onSubmit={form1.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <Collapsible key={field.id} className="border-2 p-4">
            <div className="flex justify-between items-center">
              <CollapsibleTrigger className="w-full text-left">
                {form1.getValues(`tickets.${index}.ticket_name`) ||
                  '新增门票 ' + (index + 1)}
              </CollapsibleTrigger>
              <Button type="button" onClick={() => handleRemove(index)}>
                删除
              </Button>
            </div>
            <CollapsibleContent>
              <FormField
                disabled={disabled}
                control={form1.control}
                {...form1.register(`tickets.${index}.ticket_name`)}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>门票名称</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入门票名称"
                        {...field}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={disabled}
                control={form1.control}
                {...form1.register(`tickets.${index}.max_per_wallet`)}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>单个钱包最大购买数量</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入单个钱包最大购买数量"
                        {...field}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={disabled}
                control={form1.control}
                {...form1.register(`tickets.${index}.ticket_max_num`)}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>门票最大可购买数量</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入门票最大可购买数量"
                        {...field}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={disabled}
                control={form1.control}
                {...form1.register(`tickets.${index}.ticket_description`)}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>门票描述</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入门票描述"
                        {...field}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={disabled}
                control={form1.control}
                {...form1.register(`tickets.${index}.ticket_cover`)}
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>门票封面</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          {...fieldProps}
                          // ref={field.ref}
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            onImageChange(event, onChange, index)
                          }
                        />
                        {selectedImages[index] && (
                          <div className="flex-center h-[auto]">
                            <Image
                              width="0"
                              height="0"
                              className="w-1/2 max-w-[280px] h-auto"
                              src={URL.createObjectURL(selectedImages[index])}
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
              <FormField
                disabled={disabled}
                control={form1.control}
                {...form1.register(`tickets.${index}.allow_transfer`)}
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-0.5">
                      <FormLabel>是否运行二手交易</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={disabled}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </form>
      <div className="text-center mt-6 space-x-8">
        {disabled ? (
          <>
            <Button onClick={goBack}>上一步</Button>
            {mode === 'review' && <ReviewDialog />}
          </>
        ) : (
          <>
            <Button onClick={goBack}>上一步</Button>
            <Button
              onClick={() =>
                append({
                  max_per_wallet: 0,
                  ticket_max_num: 0,
                  ticket_price: 0,
                  ticket_name: '',
                  ticket_description: '',
                  ticket_cover: undefined!,
                  allow_transfer: false,
                })
              }
            >
              添加新票
            </Button>
            <Button onClick={() => onSubmit(form1.getValues())}>
              提交信息
            </Button>
          </>
        )}
      </div>
    </Form>
  );
}
