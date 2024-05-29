import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 这些路径需要登录认证
const protectedRoutes = ["/events"];

export function middleware(request: NextRequest) {
  const cookieStore = cookies();

  // 判断是够为“被保护路径”
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const token = cookieStore.get("siwe-quickstart")?.value;

  const url = request.nextUrl.clone();
  url.pathname = "/client";

  if (isProtectedRoute) {
    // 检查 token（从cookie中获取token）
    console.log(cookieStore.getAll());
    const token = cookieStore.get("siwe-quickstart")?.value;

    console.log(
      "============================token============================",
      token
    );

    // 没有 token 时 返回首页
    if (!token) {
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
