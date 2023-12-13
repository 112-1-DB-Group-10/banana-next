'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Messages {
  sender_id: string;
  receiver_id: string;
  time_stamp: string;
  contents: string;
}

interface ChatMessagesProps {
  messages: Messages[];
  loggedInUserId: string;
  selectedUserId: string | null;
  selectedUserAvatar: string | null;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  loggedInUserId,
  selectedUserId,
  selectedUserAvatar,
}) => {
  const userMessages = selectedUserId
    ? messages.filter(
        (message) =>
          message.sender_id === selectedUserId ||
          message.receiver_id === selectedUserId,
      )
    : [];
  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div className="mt-5 flex flex-col">
        {userMessages.map((message, index) => (
          <div
            className={cn(
              'mb-4 flex',
              message.sender_id === loggedInUserId
                ? 'justify-end'
                : 'justify-start',
            )}
            key={index}
          >
            {message.sender_id !== loggedInUserId && (
              <img
                src={selectedUserAvatar || 'default-avatar-url'}
                className="h-8 w-8 rounded-full object-cover"
                alt=""
              />
            )}
            <div
              className={cn(
                'px-4 py-3 text-white',
                message.sender_id === loggedInUserId ? 'ml-2' : 'ml-0',
                message.sender_id === loggedInUserId
                  ? 'bg-blue-400'
                  : 'bg-gray-400',
                message.sender_id === loggedInUserId
                  ? 'rounded-bl-3xl'
                  : 'rounded-br-3xl',
                message.sender_id === loggedInUserId
                  ? 'rounded-tl-3xl'
                  : 'rounded-tr-3xl',
              )}
            >
              {message.contents}
            </div>
            {message.sender_id === loggedInUserId && (
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="h-8 w-8 rounded-full object-cover"
                alt=""
              />
            )}
          </div>
        ))}
      </div>

      {/* Input for new message */}
      <div className="py-5">
        <input
          className="w-full rounded-xl bg-gray-200 px-3 py-5"
          type="text"
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
};

export default ChatMessages;