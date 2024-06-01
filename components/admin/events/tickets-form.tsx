import React, { useEffect, useMemo, useState } from 'react';
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
import { handleError } from '@/utils/errors';
import { useRouter } from 'next/navigation';

// 定义一个门票对象的模式
const ticketSchema = z.object({
  max_quantity_per_wallet: z.coerce.number().min(1, {
    message: '请输入单个钱包最大购买数量',
  }),
  num: z.coerce.number().min(1, {
    message: '请输入门票最大可购买数量',
  }),
  price: z.coerce.number().min(1, {
    message: '请输入门票价格',
  }),
  type_name: z.string().min(1, {
    message: '请输入门票名称',
  }),
  ticket_img_preview: z
    .instanceof(File, {
      message: '请选择一张图片',
    })
    .refine((file) => file.size < MAX_FILE_SIZE, {
      message: '图片大小不能超过 5MB',
    }),
  ticket_img: z.string().min(1, {
    message: '门票未上传',
  }),
  trade: z.boolean().optional(),
});

// 更新模式以处理门票的数组
const formSchema = z.object({
  tickets: z.array(ticketSchema),
});

export default function TicketsForm() {
  const { submitData, goBack, data, updateFinalStep, mode, reset } =
    useCreateEvent();
  // console.log('data.step3', data.step3);
  // const {
  //   max_quantity_per_wallet,
  //   type_name,
  //   num,
  //   price,
  //   trade,
  //   ticket_img_preview,
  // } = data.step3[0] || {
  //   max_quantity_per_wallet: 0,
  //   type_name: '',
  //   num: 0,
  //   price: 0,
  //   trade: false,
  //   ticket_img_preview: undefined,
  // };

  const disabled = useMemo(
    () => mode === 'readonly' || mode === 'review',
    [mode]
  );

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [ipfsHashes, setIpfsHashes] = useState<{
    [key: string]: string;
  }>({});
  const [hasUploadedMap, setHasUploadedMap] = useState<{
    [key: string]: boolean;
  }>({});
  const [uploadingMap, setUploadingMap] = useState<{ [key: string]: boolean }>(
    {}
  );

  const router = useRouter();

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
        return newImages;
      });
    }
  };

  // 上传到IPFS
  const uploadToIPFS = async (e: any, image: File, field: any) => {
    e.preventDefault();

    const { id } = field;

    if (!image) {
      toast({
        title: '请选择一张图片',
        description: '请选择一张图片',
        variant: 'destructive',
      });
      setHasUploadedMap((prev) => ({
        ...prev,
        [id]: false,
      }));
      setUploadingMap((prev) => ({
        ...prev,
        [id]: false,
      }));

      return;
    }

    setUploadingMap((prev) => ({
      ...prev,
      [id]: true,
    }));

    const formData = new FormData();

    formData.append('file', image as File);

    try {
      const response = await fetch('/api/uploadFile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setIpfsHashes((prev) => ({
        ...prev,
        [id]: data.ipfsHash,
      }));

      setHasUploadedMap((prev) => ({
        ...prev,
        [id]: true,
      }));
      setUploadingMap((prev) => ({
        ...prev,
        [id]: false,
      }));
    } catch (error) {
      handleError(error);
      setHasUploadedMap((prev) => ({
        ...prev,
        [id]: false,
      }));
      setUploadingMap((prev) => ({
        ...prev,
        [id]: false,
      }));
      return;
    }
  };

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tickets: [
        {
          max_quantity_per_wallet: 0,
          num: 0,
          price: 0,
          type_name: '',
          ticket_img_preview: undefined,
          trade: false,
          ticket_img: undefined,
        },
      ],
    },
  });

  // 使用 react-hook-form 的 useFieldArray 来管理动态字段数组
  const { fields, append, remove } = useFieldArray({
    control: form1.control,
    name: 'tickets',
  });

  useEffect(() => {
    if (data.step3.length) {
      const sortedStep3 = [...data.step3].sort(
        (a, b) => a.create_at - b.create_at
      );

      form1.reset({
        tickets: sortedStep3.map((ticket) => ({
          max_quantity_per_wallet: ticket.max_quantity_per_wallet,
          type_name: ticket.type_name,
          num: ticket.num,
          price: ticket.price,
          trade: ticket.trade,
          ticket_img: ticket.ticket_img,
        })),
      });
    }
  }, []);

  useEffect(() => {
    const hashes: { [key: string]: any } = {};
    const uploadedMap: { [key: string]: any } = {};
    fields.forEach((item) => {
      if (item.ticket_img) {
        hashes[item.id] = item.ticket_img;
        uploadedMap[item.id] = true;
      }
    });
    setIpfsHashes(hashes);
    setHasUploadedMap(uploadedMap);
  }, [fields]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // 遍历图片上传情况
    console.log('hasUploadedMap', hasUploadedMap);
    console.log('ipfsHashes', ipfsHashes);
    console.log('selectedImages', selectedImages);
    if (!selectedImages.length) {
      toast({
        title: '请上传图片',
        description: '请上传图片',
        variant: 'destructive',
      });
      return;
    }
    if (selectedImages.length) {
      if (!Object.values(hasUploadedMap).length) {
        toast({
          title: '请上传图片',
          description: '请上传图片',
          variant: 'destructive',
        });
      }
      if (!Object.values(hasUploadedMap).every((value) => value === true)) {
        toast({
          title: 'Please upload all images',
          description: 'Please upload all images',
          variant: 'destructive',
        });
      }
    }

    const tickets = values.tickets.map((ticket, index) => {
      const id = fields[index].id; // 获取临时 id
      const ipfsHash = ipfsHashes[id]; // 拿到 ipfshash 字符串

      return {
        ...ticket,
        ticket_img: ipfsHash,
      };
    });
    console.log('tickets', tickets);

    updateFinalStep(tickets);

    const response = await submitData();
    toast({
      title: '信息已提交',
    });
    reset();
    router.push('/events');
  }

  const handleRemove = (e: any, index: number, id: string) => {
    e.preventDefault();
    remove(index);
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setHasUploadedMap((prevMap) => {
      const newMap = { ...prevMap };
      delete newMap[id];
      return newMap;
    });
    setIpfsHashes((prev) => {
      const newHashes = { ...prev };
      delete newHashes[id];
      return newHashes;
    });
  };

  return (
    <Form {...form1}>
      <form onSubmit={form1.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <Collapsible defaultOpen key={field.id} className="border-2 p-4">
            <div className="flex justify-between items-center">
              <CollapsibleTrigger className="w-full text-left">
                {form1.getValues(`tickets.${index}.type_name`) ||
                  '新增门票 ' + (index + 1)}
              </CollapsibleTrigger>
              <Button
                disabled={disabled}
                type="button"
                onClick={(e) => handleRemove(e, index, field.id)}
              >
                删除
              </Button>
            </div>
            <CollapsibleContent>
              <FormField
                disabled={disabled}
                control={form1.control}
                {...form1.register(`tickets.${index}.type_name`)}
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
                {...form1.register(`tickets.${index}.price`)}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>门票价格</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入门票价格"
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
                {...form1.register(`tickets.${index}.max_quantity_per_wallet`)}
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
                {...form1.register(`tickets.${index}.num`)}
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
                {...form1.register(`tickets.${index}.ticket_img_preview`)}
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>门票封面</FormLabel>
                    <FormControl>
                      <>
                        <div className="flex-center space-x-8">
                          <label
                            className="bg-black text-white p-2 cursor-pointer rounded "
                            htmlFor={`upload-btn-${index}`}
                          >
                            {selectedImages[index] ? '已选图片' : '选择图片'}
                          </label>
                          <Input
                            id={`upload-btn-${index}`}
                            className="hidden"
                            {...fieldProps}
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                              onImageChange(event, onChange, index)
                            }
                          />
                          {uploadingMap[field.id] ? (
                            <Button disabled>上传中...</Button>
                          ) : (
                            <Button
                              onClick={(e) => uploadToIPFS(e, value, field)}
                              disabled={hasUploadedMap[field.id] || disabled}
                            >
                              {hasUploadedMap[field.id] ? '已上传' : '上 传'}
                            </Button>
                          )}
                        </div>
                        {ipfsHashes[field.id] && (
                          <div className="text-center">
                            <p>
                              Image uploaded to IPFS with hash:{' '}
                              {ipfsHashes[field.id]}
                            </p>
                            <div className="flex-center h-[auto]">
                              <Image
                                width={280}
                                height={0}
                                className="w-1/2 max-w-[280px] h-auto"
                                src={`https://gateway.pinata.cloud/ipfs/${ipfsHashes[field.id]}`}
                                alt="Image from IPFS"
                              />
                            </div>
                            <p className="text-center">
                              {selectedImages[index] &&
                                selectedImages[index].name}
                            </p>
                            <a
                              href={`https://gateway.pinata.cloud/ipfs/${ipfsHashes[field.id]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              查看图片
                            </a>
                          </div>
                        )}
                        {/* {selectedImages[index] && (
                          <div className="flex-center h-[auto]">
                            <Image
                              width="0"
                              height="0"
                              className="w-1/2 max-w-[280px] h-auto"
                              src={URL.createObjectURL(selectedImages[index])}
                              alt="Selected"
                            />
                          </div>
                        )} */}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={disabled}
                control={form1.control}
                {...form1.register(`tickets.${index}.trade`)}
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
        {!disabled && (
          <div className="text-center mt-6 space-x-8">
            <Button onClick={goBack}>上一步</Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                append({
                  max_quantity_per_wallet: 0,
                  num: 0,
                  price: 0,
                  type_name: '',
                  ticket_img_preview: undefined!,
                  ticket_img: undefined!,
                  trade: false,
                });
              }}
            >
              添加新票
            </Button>
            <Button onClick={() => onSubmit(form1.getValues())}>
              提交信息
            </Button>
          </div>
        )}
      </form>
      <div className="text-center mt-6 space-x-8">
        {disabled && (
          <>
            <Button onClick={goBack}>上一步</Button>
            {mode === 'review' && (
              <ReviewDialog concert_id={data.step1.concert_id} />
            )}
          </>
        )}
      </div>
    </Form>
  );
}
