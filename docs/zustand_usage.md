# zustand 示例

## useDemoStore

```ts
// @/stores/useDemoStore
import { create } from 'zustand';

interface DemoStore {
  count: number;
  inc: () => void;
}

const useDemoStore = create<DemoStore>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default useDemoStore;
```

## 使用

```tsx
'use client';

import useDemoStore from '@/stores/useDemoStore';

export default function Page() {
  const { count, inc } = useDemoStore();

  return (
    <div>
      {count}
      <button onClick={() => inc()}>inc</button>
    </div>
  );
}
```
