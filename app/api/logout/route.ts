import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/api/v1/user/logout`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data', data);

      // 删除cookie
      cookies().set('siwe-quickstart', '', {
        maxAge: 0,
        path: '/',
        domain: '.biturd.com',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      return NextResponse.json({
        success: true,
        msg: '登出成功',
      });
    } else {
      return NextResponse.json({
        success: false,
        msg: '登出失败',
      });
    }
  } catch (error) {
    console.error('登出请求失败', error);
    return NextResponse.json({
      success: false,
      msg: '登出请求失败，请稍后再试',
    });
  }
}
