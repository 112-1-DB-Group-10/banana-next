'use server';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const adminPage = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="w-100 h-100 px-10 py-10">
        <Button asChild className="h-[10rem] w-[20rem] text-3xl">
          <Link href="/admin/review">審核用戶認證</Link>
        </Button>
      </div>
      <div className="px-10 py-10">
        <Button asChild className="h-[10rem] w-[20rem] text-3xl">
          <Link href="/admin/users">管理用戶</Link>
        </Button>
      </div>
      <div className="px-10 py-10">
        <Button asChild className="h-[10rem] w-[20rem] text-3xl">
          <Link href="/admin/manage">管理主題標籤</Link>
        </Button>
      </div>
    </div>
  );
};

export default adminPage;
