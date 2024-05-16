// const formSchema = z.object({
//   name: z.string().min(1, { message: '请输入活动名称' }),
//   address: z.string().min(1, { message: '请输入活动地点' }),
//   start_time: z.date({
//     required_error: '请选择活动开始时间',
//   }),
//   end_time: z.date({
//     required_error: '请选择活动结束时间',
//   }),
//   entry_time: z.date({
//     required_error: '请选择活动入场时间',
//   }),
// });

// const formSchema = z.object({
//   lottery_start_date: z.date({
//     required_error: '请选择抽奖开始时间',
//   }),
//   lottery_end_date: z.date({
//     required_error: '请选择抽奖截止时间',
//   }),
//   description: z.string().min(1, {
//     message: '请输入活动描述',
//   }),
//   cover: z
//     .instanceof(File, {
//       message: '请选择一张图片',
//     })
//     .refine((file) => file.size < MAX_FILE_SIZE, {
//       message: '图片大小不能超过 5MB',
//     }),
// });

// const ticketSchema = z.object({
//   max_per_wallet: z.coerce.number().min(1, {
//     message: '请输入单个钱包最大购买数量',
//   }),
//   ticket_max_num: z.coerce.number().min(1, {
//     message: '请输入门票最大可购买数量',
//   }),
//   ticket_price: z.coerce.number().min(1, {
//     message: '请输入门票价格',
//   }),
//   ticket_name: z.string().min(1, {
//     message: '请输入门票名称',
//   }),
//   ticket_description: z.string().min(1, {
//     message: '请输入门票描述',
//   }),
//   ticket_cover: z
//     .instanceof(File, {
//       message: '请选择一张图片',
//     })
//     .refine((file) => file.size < MAX_FILE_SIZE, {
//       message: '图片大小不能超过 5MB',
//     }),
//   allow_transfer: z.boolean().optional(),
// });

export interface Event {
  id: string;
  name: string;
  address: string;
  start_time: Date;
  end_time: Date;
  entry_time: Date;
  cover: string;
  description: string;
  status: number;
  tickets: Ticket[];
  promotions: Promotion[];
  lottery_start_date: Date;
  lottery_end_date: Date;
  lottery_winner: string;
}

export interface Ticket {
  id: string;
  name: string;
  description: string;
  price: number;
  max_per_wallet: number;
  ticket_max_num: number;
  cover: string;
  allow_transfer: boolean;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  cover: string;
}
