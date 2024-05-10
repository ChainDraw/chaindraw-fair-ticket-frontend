import { SessionData, sessionOptions } from "@/lib/sessions";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session: any = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );
  if (!session.siwe) {
    NextResponse.json({ message: "You have to first sign_in" });
    return;
  }
  session.destroy(() => {
    NextResponse.json({});
  });
}
