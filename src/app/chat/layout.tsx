'use server';

import { getConversations } from '@/actions/chatActions';
import { getUserSession } from '@/lib/session';
import UserList from './user-list';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  const conversations = await getConversations(session.user_id);
  console.log(conversations);
  return (
    <div className="flex items-center justify-around gap-8">
      <UserList />
      {children}
    </div>
  );
}
