'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const formSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  session: z.string().min(1),
  quantity: z.number().min(1),
  date: z.date(),
});
export default function MintForm() {
  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 1,
      session: '',
      quantity: 1,
      date: null,
    },
  });

  const priceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value)
    if (isNaN(price)) {
      return
    }
    form1.setValue('price', price)
  };
  const quantityOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseFloat(e.target.value)
    if (isNaN(quantity)) {
      return
    }
    form1.setValue('quantity', quantity)
  }

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
                <Input
                  placeholder="请输入价格"
                  {...field}
                  onChange={priceOnChange}
                />
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
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>数量</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入数量"
                  {...field}
                  onChange={quantityOnChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form1.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center">
          <Button type="reset" className="mx-5" onClick={() => form1.reset()}>
            重置
          </Button>
          <Button type="submit" className="mx-5">
            铸造
          </Button>
        </div>
      </form>
    </Form>
  );
}
