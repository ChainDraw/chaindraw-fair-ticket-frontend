import { SessionData, sessionOptions } from "@/lib/sessions";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { SiweErrorType, SiweMessage } from "siwe";
interface Body {
  message: {
    domain: string;
    address: string;
    statement: string;
    uri: string;
    version: string;
    chainId: number;
    nonce: string;
    issuedAt: string;
  };
  signature: string;
}

export async function POST(req: Request, res: Response) {
  const { message: clientMessage, signature }: Body = await req.json();
  const session: any = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );

  try {
    const message: any = new SiweMessage(clientMessage);
    const { data: fields } = await message.verify({
      signature,
      nonce: session.nonce,
    });

    session.siwe = fields;
    session.nonce = null;
    await session.save();
    return NextResponse.json({
      text: session.siwe.address,
      address: session.siwe.address,
    });
  } catch (error: any) {
    session.siwe = null;
    session.nonce = null;
    session.ens = null;
    switch (error) {
      case SiweErrorType.EXPIRED_MESSAGE: {
        session.save(() => NextResponse.json({ message: error.message }));
        break;
      }
      case SiweErrorType.INVALID_SIGNATURE: {
        session.save(() => NextResponse.json({ message: error.message }));
        break;
      }
      default: {
        session.save(() => NextResponse.json({ message: error.message }));
        break;
      }
    }
  }
}
