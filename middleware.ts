// D:\study\next-js-learning\src\middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const whiteList = [
    "/client",
    "/client/lottery",
    "/client/lottery/allLottery",
    "/client/lottery/allLottery/:path",
    "/404",
    "/500",
  ];
  const isWhite = whiteList.includes(pathname);
  const token = request.headers;
  console.log(token);
  if (isWhite) {
    return NextResponse.next();
  } else {
    return NextResponse.next();
    // if (!token) {
    //   return NextResponse.redirect(new URL("/client", request.url));
    // } else {
    //   return NextResponse.next();
    // }
  }
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
