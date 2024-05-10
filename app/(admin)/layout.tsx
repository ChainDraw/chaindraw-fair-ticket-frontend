import AdminHeader from '@/components/admin/header/admin-header';
import { AdminNav } from '@/components/admin/header/admin-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChainDraw｜Admin',
  description:
    'ChainDraw 是一个去中心化的演唱会门票抽选系统，旨在提供一个公平、透明的门票分配平台。',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminHeader />
      <div className="flex h-[--admin-main-height]">
        <AdminNav />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
