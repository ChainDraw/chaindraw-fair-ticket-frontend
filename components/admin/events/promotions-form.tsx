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

import { useRouter } from 'next/navigation';

const formSchema = z.object({
  description: z.string().min(1, {
    message: 'required',
  }),
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
});

export default function PromotionsForm() {
  const router = useRouter();

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      cover: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values);
    router.push('/events/create/tickets');
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
