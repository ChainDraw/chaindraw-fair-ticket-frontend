import { Button } from '@/components/ui/button';
import useCreateEvent from '@/stores/useCreateEvent';
import Link from 'next/link';

export default function CreateButton() {
  const { updateMode } = useCreateEvent();
  return (
    <Button onClick={() => updateMode('create')}>
      <Link href="/events/create">新建活动</Link>
    </Button>
  );
}
