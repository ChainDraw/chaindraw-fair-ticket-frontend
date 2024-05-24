import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  const { id } = params;
  if (id) {
  } else {
    // 获取所有活动
    return NextResponse.json({
      ok: true,
      msg: '获取成功',
      data: {
        id,
      },
    });
  }
}
