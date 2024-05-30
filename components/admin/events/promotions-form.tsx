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
import { handleError } from '@/utils/errors';

const formSchema = z.object({
  // lottery_start_date: z.date({
  //   required_error: '请选择抽奖开始时间',
  // }),
  lottery_end_date: z.date({
    required_error: '请选择抽奖截止时间',
  }),
  concert_img_preview: z
    .instanceof(File, {
      message: '请选择一张图片',
    })
    .refine((file) => file.size < MAX_FILE_SIZE, {
      message: '图片大小不能超过 5MB',
    }),
});

export default function PromotionsForm() {
  const { updateStep, goBack, data, mode } = useCreateEvent();

  const {
    // lottery_start_date,
    lottery_end_date,
    concert_img_preview,
    concert_img,
  } = data.step2;
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );
  const [ipfsHash, setIpfsHash] = useState('');
  const [hasUploaded, setHasUploaded] = useState(false);

  const [uploading, setUploading] = useState(false);

  const disabled = useMemo(
    () => mode === 'readonly' || mode === 'review',
    [mode]
  );

  // 图片变化时
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>, fn: any) => {
    const file = e.target.files?.[0];
    if (!file) {
      setIpfsHash('');
      setHasUploaded(false);
      setUploading(false);
      setSelectedImage(undefined);
    }

    setIpfsHash('');
    setHasUploaded(false);
    fn(file);
    setSelectedImage(file);
    form1.setValue('concert_img_preview', file!); // 使用 setValue 更新表单的 concert_img_preview 字段
  };

  // 上传到IPFS
  const uploadToIPFS = async (e: any) => {
    e.preventDefault();
    if (!selectedImage) {
      toast({
        title: '请选择一张图片',
        description: '请选择一张图片',
        variant: 'destructive',
      });
      setHasUploaded(false);
      setUploading(false);
      return;
    }

    setUploading(true);
    const formData = new FormData();

    formData.append('file', selectedImage as File);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setIpfsHash(data.ipfsHash);

      setHasUploaded(true);
      setUploading(false);
    } catch (error) {
      handleError(error);
      setHasUploaded(false);
      setUploading(false);
      return;
    }
  };

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // lottery_start_date: lottery_start_date ?? undefined,
      lottery_end_date: lottery_end_date ?? undefined,
      concert_img_preview: concert_img_preview ?? undefined,
    },
  });

  // 图片回显
  useEffect(() => {
    // 创建、编辑
    if (concert_img_preview) {
      setSelectedImage(concert_img_preview);
    } else {
      // 显示默认图片
      setSelectedImage(undefined);
    }
  }, [concert_img_preview]);

  // 演唱会
  useEffect(() => {
    if (concert_img) {
      setIpfsHash(concert_img);
      setHasUploaded(true);
    } else {
      setIpfsHash('');
      setHasUploaded(false);
    }
  }, [concert_img]);

  // 表单数据回显
  useEffect(() => {
    if (data.step2) {
      // form1.setValue('lottery_start_date', data.step2.lottery_start_date);
      form1.setValue('lottery_end_date', data.step2.lottery_end_date);
      form1.setValue('concert_img_preview', data.step2.concert_img_preview);
    }
  }, [data.step2, form1]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const { lottery_start_date, lottery_end_date } = values;
    const { lottery_end_date } = values;
    // const isOrderCorrect =
    //   compareDates(lottery_start_date, lottery_end_date) === -1;
    // if (isPastDate(lottery_start_date)) {
    if (isPastDate(lottery_end_date)) {
      toast({
        title: '时间错误',
        description: '不能选择过去的时间',
        variant: 'destructive',
      });
      return;
    }
    // if (!isOrderCorrect) {
    //   toast({
    //     title: '时间顺序错误',
    //     description: '请检查抽奖时间顺序',
    //     variant: 'destructive',
    //   });
    //   return;
    // }

    if (hasUploaded) {
      updateStep(2, { ...values, concert_img: ipfsHash });
    } else {
      toast({
        title: '图片未上传',
        description: '请先上传至IPFS',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form1}>
      <form onSubmit={form1.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full flex justify-between items-center space-x-4">
          {/* <div className="flex-1">
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
          </div> */}
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
          name="concert_img_preview"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>活动封面</FormLabel>
              <FormControl>
                <>
                  <div className="flex-center space-x-8">
                    <label
                      className="bg-black text-white p-2 cursor-pointer rounded "
                      htmlFor="upload-btn"
                    >
                      选择图片
                    </label>
                    <Input
                      id="upload-btn"
                      className="hidden"
                      {...fieldProps}
                      type="file"
                      accept="image/*"
                      onChange={(event) => onImageChange(event, onChange)}
                    />
                    {uploading ? (
                      <Button disabled>上传中...</Button>
                    ) : (
                      <Button
                        onClick={(e) => uploadToIPFS(e)}
                        disabled={hasUploaded}
                      >
                        {hasUploaded ? '已上传' : '上 传'}
                      </Button>
                    )}
                  </div>
                  {ipfsHash && (
                    <div className="text-center">
                      <p>Image uploaded to IPFS with hash: {ipfsHash}</p>
                      <a
                        href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        查看图片
                      </a>
                    </div>
                  )}
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
        {!disabled && (
          <div className="text-center mt-6 space-x-8">
            <Button onClick={goBack}>上一步</Button>
            <Button type="submit">下一步</Button>
          </div>
        )}
      </form>
      <div className="text-center mt-6 space-x-8">
        {disabled && (
          <>
            <Button onClick={goBack}>上一步</Button>
            <Button onClick={() => updateStep(2)}>（查看/审核）下一步</Button>
          </>
        )}
      </div>
    </Form>
  );
}
