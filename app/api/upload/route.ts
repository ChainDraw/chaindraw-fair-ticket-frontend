import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    // 从前端拿到file数据，解析出文件名称
    const data = await req.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File not provided' }, { status: 400 });
    }

    const imageName = file.name || 'image.jpg';

    data.append('file', file); // 1. 追加文件

    const metadata = JSON.stringify({
      name: imageName,
      keyvalues: {
        event: '演唱会',
      },
    });
    data.append('pinataMetadata', metadata); // 2. 追加元数据

    // const options = JSON.stringify({
    //   cidVersion: 0,
    // });
    // data.append('pinataOptions', options); // 3. 追加选项

    // 4. 发送请求
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data,
      {
        // maxContentLength: Infinity,
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
