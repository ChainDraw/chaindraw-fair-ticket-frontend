import { Card, CardContent, CardHeader } from '@/components/ui/card';

import MintForm from '@/components/admin/mint/mint-form';

export default function Page() {
  return (
    <>
      <Card>
        <CardHeader className="bg-white">
          <h1 className="font-bold">NFT铸造</h1>
        </CardHeader>
        <CardContent>
          <MintForm />
        </CardContent>
      </Card>
    </>
  );
}
