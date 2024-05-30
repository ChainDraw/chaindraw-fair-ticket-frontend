import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function ReviewDialog({ concert_id }: { concert_id: string }) {
  const router = useRouter();

  const handleReview = async (isPass: boolean) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/concert/review`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          concert_id,
          pass: isPass,
        }),
      }
    );
    if (!res.ok) {
      if (res.status === 500) {
        console.log('Server error: 500');
        throw new Error('Server error: 500');
      } else {
        throw new Error(`Unexpected status code: ${res.status}`);
      }
    }

    const data = await res.json();
    if (data.code === 200) {
      toast({
        description: data.msg,
      });
      router.push('/events');
    } else {
      toast({
        description: data.msg,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">审核</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>审核活动信息</DialogTitle>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="review" className="text-right">
              评审建议
            </Label>
            <Textarea
              placeholder="请输入通过/驳回的理由～"
              id="review"
              className="col-span-3"
            />
          </div>
        </div> */}
        <DialogFooter>
          <Button onClick={() => handleReview(true)}>通 过</Button>
          <Button variant={'destructive'} onClick={() => handleReview(false)}>
            驳 回
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
