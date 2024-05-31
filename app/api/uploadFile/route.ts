import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// 上传图片文件到pinata
export async function POST(req: NextRequest) {
  try {
    // 从前端拿到file数据，解析出文件名称
    const data = await req.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File not provided' }, { status: 400 });
    }

    data.append('file', file); // 1. 追加文件

    // 4. 发送请求
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data,
      {
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        },
      }
    );

    return NextResponse.json({ ipfsHash: response.data.IpfsHash });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
