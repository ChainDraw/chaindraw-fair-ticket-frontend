'use client';

import { usePathname } from 'next/navigation';

const map: { [key: string]: string } = {
  '/events': '活动',
  '/settings': '主办方设置',
  '/events/create/basics': '新建活动',
  '/events/create/promotions': '新建活动',
  '/events/create/tickets': '新建活动',
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title: string = map[pathname] || '欢迎 👏';

  return (
    <header className="flex items-center h-[--admin-header-height] p-4 border-b border-b-[#ddd]">
      <div className="w-[--admin-sidebar-width] font-bold">chaindraw</div>
      <div className="flex-1 flex justify-between items-center w-full">
        <h1 className="font-bold">{title}</h1>
        <div>xxx@gmail.com</div>
      </div>
    </header>
  );
}
