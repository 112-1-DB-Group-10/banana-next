'use server';

import { Card } from '@/components/ui/card';
import Search from './search';
import UserList from './userlist';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-around gap-8">
      <Card className="h-[30rem] w-[20rem] overflow-y-scroll p-4">
        <Search />
        <UserList />
      </Card>
      {children}
    </div>
  );
}
