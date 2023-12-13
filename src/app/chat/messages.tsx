'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface Messages {
  sender_id: string,
  receiver_id: string,
  time_stamp: string,
  contents: string,
}

interface ChatMessagesProps {
  messages: Messages[],
  loggedInUserId: string,
  selectedUserId: string | null,
  selectedUserAvatar: string | null;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, loggedInUserId, selectedUserId, selectedUserAvatar }) => {
  const userMessages = selectedUserId
    ? messages.filter(message => (message.sender_id === selectedUserId || message.receiver_id === selectedUserId))
    : [];
  return (
    <div className="w-full px-5 flex flex-col justify-between">
      <div className="flex flex-col mt-5">
        {userMessages.map((message, index) => (
          <div className={
            cn(
              'flex mb-4',
              message.sender_id === loggedInUserId ? 'justify-end' : 'justify-start'
            )
          }
            key={index}>
            {message.sender_id !== loggedInUserId && (
              <img
                src={selectedUserAvatar || "default-avatar-url"}
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            )}
            <div className={  
              cn(
                'py-3 px-4 text-white', 
                message.sender_id === loggedInUserId ? 'ml-2' : 'ml-0',
                message.sender_id === loggedInUserId ? 'bg-blue-400' : 'bg-gray-400',
                message.sender_id === loggedInUserId ? 'rounded-bl-3xl' : 'rounded-br-3xl',
                message.sender_id === loggedInUserId ? 'rounded-tl-3xl' : 'rounded-tr-3xl',
              )
            }>
              {message.contents}
            </div>
            {message.sender_id === loggedInUserId && (
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            )}
          </div>
        ))}
      </div>

      {/* Input for new message */}
      <div className="py-5">
        <input
          className="w-full bg-gray-200 py-5 px-3 rounded-xl"
          type="text"
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
};

export default ChatMessages;
