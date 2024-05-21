'use client';

import useCreateEvent, { EventMode } from '@/stores/useCreateEvent';
import { usePathname } from 'next/navigation';
import { getHeaderTitle } from './pathMap';
import { useEffect } from 'react';

export default function AdminHeader() {
  const pathname = usePathname();
  const title = getHeaderTitle(pathname);

  const { mode, updateMode } = useCreateEvent();

  // 根据路由更新 mode 的映射关系
  const modeMap: { [key: string]: EventMode } = {
    '/events/create': 'create',
    '/events/:id/edit': 'edit',
    '/events/:id/review': 'review',
    '/events/:id': 'readonly',
  };

  useEffect(() => {
    const findMode = (path: string) => {
      for (const key in modeMap) {
        const regexPath = key.replace(/:[^\/]+/g, '[^/]+'); // 替换占位符为正则表达式
        const regex = new RegExp(`^${regexPath}$`);
        if (regex.test(path)) {
          return modeMap[key];
        }
      }
      return ''; // 默认模式
    };

    const currentMode = findMode(pathname);
    if (!currentMode) {
      return;
    }
    updateMode(currentMode);
  }, [pathname, updateMode]); // 当 pathname 或 updateMode 变化时，重新运行

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
