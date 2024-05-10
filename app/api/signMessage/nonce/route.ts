import { SessionData, sessionOptions } from "@/lib/sessions";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SiweMessage, generateNonce } from "siwe";
export async function GET(req: NextRequest, res: NextResponse) {
  const session: any = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );
  session.nonce = generateNonce();
  await session.save();
  req.cookies.set("nonce", generateNonce());
  // res.setHeader("Content-Type", "text/plain");
  return NextResponse.json({
    data: {
      nonce: session.nonce,
    },
  });
}
