'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface NavProps {
  title: string;
  label?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'ghost';
}

const links: NavProps[] = [
  {
    title: 'Events',
    label: '活动',
    // icon: Calendar,
    variant: 'default',
  },
  {
    title: 'Settings',
    label: '主办方设置',
    // icon: Settings,
    variant: 'ghost',
  },
];

export function AdminNav() {
  return (
    <div className="w-[--admin-sidebar-width] p-4 border-r border-[#ddd]">
      <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: 'sm' }),
                link.variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}
            >
              {/* <link.icon className="mr-2 h-4 w-4" /> */}
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    'ml-auto',
                    link.variant === 'default' &&
                      'text-background dark:text-white'
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
