'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Calendar, Settings } from 'lucide-react';

// 左侧导航栏
const links = [
  {
    title: 'Events',
    label: '活动',
    icon: Calendar,
    href: '/events',
  },
  {
    title: 'Settings',
    label: '主办方设置',
    icon: Settings,
    href: '/settings',
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="w-[--admin-sidebar-width] p-4 border-r border-[#ddd]">
      <div className="flex flex-col gap-4 py-2">
        <nav className="grid gap-1 px-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({
                  variant: link.href === pathname ? 'default' : 'ghost',
                  size: 'sm',
                }),
                link.href === pathname &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span className={cn('ml-auto')}>{link.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
