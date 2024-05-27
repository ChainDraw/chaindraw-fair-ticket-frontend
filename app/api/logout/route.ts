import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE() {
  // 设置过期时间为0来删除cookie
  cookies().set('siwe-quickstart', '', { maxAge: 0 });

  return NextResponse.json({
    success: true,
    msg: '登出成功',
  });
}
