import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

// 上传json文件到pinata
export async function POST(req: NextRequest) {
  try {
    // 1. 从 req 中拿到 json 数据
    const metajson = await req.json();
    console.log('metajson', metajson);

    // 2. 创建 FormData 对象并添加 JSON 数据
    const formData = new FormData();
    formData.append('file', Buffer.from(JSON.stringify(metajson)), {
      filename: 'data.json',
      contentType: 'application/json',
    });

    // 3. 添加 pinataMetadata
    formData.append(
      'pinataMetadata',
      JSON.stringify({
        name: metajson.name,
        keyvalues: {
          description: metajson.description,
          attributes: JSON.stringify(metajson.attributes),
        },
      })
    );

    // 4. 发送请求
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        },
      }
    );

    // 5. 返回 IPFS 哈希
    return NextResponse.json({ ipfsHash: response.data.IpfsHash });
  } catch (error: any) {
    console.error('Error uploading file to Pinata:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
