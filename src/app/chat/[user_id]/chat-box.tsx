'use server';

import { MdClose } from 'react-icons/md';
import Link from 'next/link';
import { UUID } from 'crypto';
import { getChatBox } from '@/actions/chatActions';
import { getUserById } from '@/actions/userActions';
import { getUserSession } from '@/lib/session';
import { cn } from '@/lib/utils';
import MessageForm from './message-form';

const ChatBox = async ({ partnerId }: { partnerId: UUID }) => {
  const session = await getUserSession();
  const chattingUser = await getUserById(partnerId);
  console.log(chattingUser);
  const chat = await getChatBox(session.user_id, partnerId);
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between border-b-2 p-1 pb-2">
        <p>{chattingUser.username}</p>
        <Link href="/chat">
          <MdClose className="h-6 w-6" />
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-scroll">
        {chat.map((message, index) => (
          <div
            key={`message-${index}`}
            className={cn(
              'max-w-xs rounded-lg px-4 py-2',
              message.sender_id === session.user_id
                ? 'ml-auto bg-blue-100' // For user's messages
                : 'mr-auto bg-gray-100', // For partner's messages
            )}
            id={index === chat.length - 1 ? 'last-message' : undefined}
          >
            {message.contents}
          </div>
        ))}
      </div>
      <MessageForm userId={session.user_id} partnerId={partnerId} />
    </>
  );
};

export default ChatBox;
