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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { checkTimeOrder, cn, isPastDate } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { DateTimePicker } from '../../ui/time-picker/date-time-picker';

import { useToast } from '@/components/ui/use-toast';
import useCreateEvent from '@/stores/useCreateEvent';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(1, { message: '请输入活动名称' }),
  address: z.string().min(1, { message: '请输入活动地点' }),
  start_time: z.date({
    required_error: '请选择活动开始时间',
  }),
  end_time: z.date({
    required_error: '请选择活动结束时间',
  }),
  entry_time: z.date({
    required_error: '请选择活动入场时间',
  }),
});

export default function BasicsForm() {
  const { updateStep, data } = useCreateEvent();
  const { name, address, start_time, end_time, entry_time } = data.step1;

  console.log('data', data);

  const { toast } = useToast();

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name ?? '',
      address: address ?? '',
      start_time: start_time ?? undefined,
      entry_time: entry_time ?? undefined,
      end_time: end_time ?? undefined,
    },
  });

  useEffect(() => {
    if (data.step1) {
      form1.setValue('name', data.step1.name);
      form1.setValue('address', data.step1.address);
      form1.setValue('start_time', data.step1.start_time);
      form1.setValue('entry_time', data.step1.entry_time);
      form1.setValue('end_time', data.step1.end_time);
    }
  }, [data.step1, form1]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { start_time, entry_time, end_time } = values;
    if (isPastDate(start_time)) {
      toast({
        title: '时间错误',
        description: '不能选择过去的时间',
        variant: 'destructive',
      });
      return;
    }
    const isOrderCorrect = checkTimeOrder(start_time, entry_time, end_time);
    if (!isOrderCorrect) {
      toast({
        title: '时间顺序错误',
        description: '请检查活动时间顺序',
        variant: 'destructive',
      });
    } else {
      updateStep(1, values);
    }
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
              name="entry_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>入场时间</FormLabel>
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
                            <span>入场时间</span>
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
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>开始时间</FormLabel>
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
                            <span>开始时间</span>
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
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>结束时间</FormLabel>
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
                            <span>结束时间</span>
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

        <div className="text-center">
          <Button type="submit">下一步</Button>
        </div>
      </form>
    </Form>
  );
}
