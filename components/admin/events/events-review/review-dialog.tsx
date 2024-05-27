import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ReviewDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">审核</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>审核活动信息</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
        </div>
        <DialogFooter>
          <Button onClick={() => console.log('通过')}>通过</Button>
          <Button onClick={() => console.log('驳回')}>驳回</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
