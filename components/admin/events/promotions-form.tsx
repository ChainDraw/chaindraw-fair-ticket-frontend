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
import { MAX_FILE_SIZE, cn, compareDates, isPastDate } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { DateTimePicker } from '@/components/ui/time-picker/date-time-picker';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  lottery_start_date: z.date({
    required_error: '请选择抽奖开始时间',
  }),
  lottery_end_date: z.date({
    required_error: '请选择抽奖截止时间',
  }),
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
  const { updateStep, goBack, data, mode } = useCreateEvent();
  const { lottery_start_date, lottery_end_date, description, cover } =
    data.step2;

  const disabled = useMemo(() => mode === 'readonly', [mode]);

  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const inputFileRef = useRef<HTMLInputElement>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>, fn: any) => {
    const file = e.target.files?.[0];
    fn(file);
    setSelectedImage(file);
    form1.setValue('cover', file!); // 使用 setValue 更新表单的 cover 字段

    // 如果选择了文件，手动设置input元素的值
    const inputFile = inputFileRef.current!; // 获取当前的引用
    console.log('==============inputFile==============', inputFile);
    // if (inputFile) {
    //   if (file) {
    //     console.log(file.name);
    //     inputFile.value = file.name; // 当引用存在时，设置其 value 属性
    //   } else {
    //     inputFile.value = ''; // 如果没有选择文件，将 input 的值重置为空
    //   }
    // }
  };

  useEffect(() => {
    // 创建、编辑
    if (cover) {
      setSelectedImage(cover);
    } else {
      // 显示默认图片
      setSelectedImage(undefined);
    }

    // }
  }, [cover]);

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lottery_start_date: lottery_start_date ?? undefined,
      lottery_end_date: lottery_end_date ?? undefined,
      description: description ?? '',
      cover: cover ?? undefined,
    },
  });

  useEffect(() => {
    if (data.step2) {
      console.log(data.step2.cover);
      form1.setValue('lottery_start_date', data.step2.lottery_start_date);
      form1.setValue('lottery_end_date', data.step2.lottery_end_date);
      form1.setValue('description', data.step2.description);
      form1.setValue('cover', data.step2.cover);
    }
  }, [data.step2, form1]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { lottery_start_date, lottery_end_date } = values;
    const isOrderCorrect =
      compareDates(lottery_start_date, lottery_end_date) === -1;
    if (isPastDate(lottery_start_date)) {
      toast({
        title: '时间错误',
        description: '不能选择过去的时间',
        variant: 'destructive',
      });
      return;
    }
    if (!isOrderCorrect) {
      toast({
        title: '时间顺序错误',
        description: '请检查抽奖时间顺序',
        variant: 'destructive',
      });
    } else {
      updateStep(2, values);
    }
  }

  return (
    <Form {...form1}>
      <form onSubmit={form1.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full flex justify-between items-center space-x-4">
          <div className="flex-1">
            <FormField
              disabled={disabled}
              control={form1.control}
              name="lottery_start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>抽奖开始时间</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PPP HH:mm:ss')
                          ) : (
                            <span>抽奖开始时间</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        disabled={disabled}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <DateTimePicker
                          disabled={disabled}
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              disabled={disabled}
              control={form1.control}
              name="lottery_end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>抽奖截止时间</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PPP HH:mm:ss')
                          ) : (
                            <span>抽奖截止时间</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        disabled={disabled}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <DateTimePicker
                          disabled={disabled}
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          disabled={disabled}
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
          disabled={disabled}
          control={form1.control}
          name="cover"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>活动封面</FormLabel>
              <FormControl>
                <>
                  <Input
                    {...fieldProps}
                    ref={inputFileRef}
                    type="file"
                    accept="image/*"
                    // style={{ display: 'none' }}
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
      </form>
      <div className="text-center mt-6 space-x-8">
        {disabled ? (
          <>
            <Button onClick={goBack}>上一步</Button>
            <Button onClick={() => updateStep(2)}>（查看/审核）下一步</Button>
          </>
        ) : (
          <>
            <Button onClick={goBack}>上一步</Button>
            <Button type="submit">下一步</Button>
          </>
        )}
      </div>
    </Form>
  );
}
