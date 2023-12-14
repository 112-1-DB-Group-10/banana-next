'use server';

import { MdClose } from 'react-icons/md';
import Link from 'next/link';
import messages from '@/db/messages.json';
import users from '@/db/users.json';
import { cn } from '@/lib/utils';
import MessageForm from './messageform';

const ChatBox = async ({ params }: { params: { user_id: string } }) => {
  const userId: string = 'abc123';
  const chat = messages.filter(
    (message) =>
      (message.receiver_id === userId &&
        message.sender_id === params.user_id) ||
      (message.sender_id === userId && message.receiver_id === params.user_id),
  );
  const chattingUser = users.filter(
    (user) => user.user_id === params.user_id,
  )[0];
  return (
    <div className="flex h-full w-full flex-col">
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
              message.sender_id === userId
                ? 'ml-auto bg-blue-100' // For user's messages
                : 'mr-auto bg-gray-100', // For other user's messages
            )}
          >
            {message.contents}
          </div>
        ))}
      </div>
      <MessageForm />
    </div>
  );
};

export default ChatBox;
