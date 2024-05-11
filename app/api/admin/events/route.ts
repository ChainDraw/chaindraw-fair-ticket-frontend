import { NextRequest, NextResponse } from 'next/server';

const events = [
  {
    id: 'asdasdasd123123',
    name: '演唱会01',
    address: '上海市新天地',
    date: '2023-01-01',
    time: '12:00',
    cover: 'https://picsum.photos/200/300',
    description: '上海市新天地有一场演唱会。',
    status: '已结束',
    review_status: '已审核',
    ticket: {
      ticket_name: '演唱会01门票',
      ticket_type: '普通票',
      ticket_price: 100,
      ticket_cover: 'https://picsum.photos/200/300',
      ticket_max_num: 1000,
      ticket_status: '已售罄',
      allowSecondHandTrade: true, // 二手交易开关
    },
  },
  {
    id: 'hjkhkjh435345',
    name: '音乐节02',
    address: '北京市朝阳公园',
    date: '2023-05-11',
    time: '18:00',
    cover: 'https://picsum.photos/200/300?random=1',
    description: '北京市朝阳公园即将举办一场盛大的音乐节。',
    status: '待进行',
    review_status: '审核中',
    ticket: {
      ticket_name: '音乐节02入场券',
      ticket_type: 'VIP票',
      ticket_price: 500,
      ticket_cover: 'https://picsum.photos/200/300?random=2',
      ticket_max_num: 500,
      ticket_status: '预售中',
      allowSecondHandTrade: false, // 二手交易开关
    },
  },
  {
    id: 'fdsfwef232qsad',
    name: '剧场秀03',
    address: '广州市大剧院',
    date: '2023-08-23',
    time: '20:00',
    cover: 'https://picsum.photos/200/300?random=3',
    description: '广州市大剧院将上演一场精彩的剧场秀。',
    status: '销售中',
    review_status: '已审核',
    ticket: {
      ticket_name: '剧场秀03门票',
      ticket_type: '优惠票',
      ticket_price: 80,
      ticket_cover: 'https://picsum.photos/200/300?random=4',
      ticket_max_num: 800,
      ticket_status: '销售中',
      allowSecondHandTrade: true, // 二手交易开关
    },
  },
];

// 获取所有活动
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  if (id) {
  } else {
    // 获取所有活动
    return NextResponse.json({
      ok: true,
      msg: '获取成功',
      data: [],
    });
  }
}
// 新建活动
export async function POST(request: NextRequest) {
  // /api/v1/concert/commit
  return NextResponse.json({
    code: 200,
    message: '新建活动成功',
    data: {
      concert_id: '123456',
    },
  });
}
