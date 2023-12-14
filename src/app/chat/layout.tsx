'use server';

import UserList from './userlist';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-around gap-8">
      <UserList />
      {children}
    </div>
  );
}
