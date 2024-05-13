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
import { MAX_FILE_SIZE, cn, compareDates } from '@/lib/utils';
import { useEffect, useState } from 'react';
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
  const { updateStep, goBack, data } = useCreateEvent();
  const { lottery_start_date, lottery_end_date, description, cover } =
    data.step2;

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

  useEffect(() => {
    setSelectedImage(cover);
  }, []);

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lottery_start_date: lottery_start_date ?? undefined,
      lottery_end_date: lottery_end_date ?? undefined,
      description: description ?? '',
      cover: cover ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { lottery_start_date, lottery_end_date } = values;
    const isOrderCorrect = !compareDates(lottery_start_date, lottery_end_date);

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
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <DateTimePicker
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
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <DateTimePicker
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
