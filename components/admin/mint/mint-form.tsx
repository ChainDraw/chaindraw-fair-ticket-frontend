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
const formSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  session: z.string().min(1),
  seat: z.string().min(1),
  date: z.string().min(1),
});
export default function MintForm() {
  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      session: '',
      seat: '',
      date: '',
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
        <FormField
          control={form1.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>价格</FormLabel>
              <FormControl>
                <Input placeholder="请输入价格" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form1.control}
          name="session"
          render={({ field }) => (
            <FormItem>
              <FormLabel>场次</FormLabel>
              <FormControl>
                <Input placeholder="请输入场次" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="seat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>座位</FormLabel>
              <FormControl>
                <Input placeholder="请输入座位" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>日期</FormLabel>
              <FormControl>
                <Input placeholder="请输入日期" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center">
          <Button type="submit">铸造</Button>
        </div>
      </form>
    </Form>
  );
}
