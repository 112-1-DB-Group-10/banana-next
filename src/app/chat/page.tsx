'use client';

import { useState } from 'react';
import messages from './data/messages.json';
import users from './data/users.json';
import ChatMessages from './messages';

const Chat = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 假 user 資料

  let loggedInUserId = 'abc123';
  let selectedUserAvatar = 'https://source.unsplash.com/_7LbC5J-jw4/600x600';
  if (selectedUserId) {
    const selectedUser = users.find((user) => user.user_id === selectedUserId);
    if (selectedUser) {
      selectedUserAvatar = selectedUser.avatar;
    }
  }

  let selectedUserName = '';

  if (selectedUserId) {
    const selectedUser = users.find((user) => user.user_id === selectedUserId);
    if (selectedUser) {
      selectedUserName = selectedUser.username;
    }
  }

  return (
    <div className="mx-auto w-full rounded-lg px-1 shadow-lg">
      {/* Chatting */}
      <div className="flex flex-row justify-between bg-white">
        {/* chat list */}
        <div className="flex flex-col overflow-y-auto border-r-2">
          {/* search compt */}
          <div className="border-b-2 px-2 py-4">
            <input
              type="text"
              placeholder="search chatting"
              className="w-full rounded-2xl border-2 border-gray-200 px-2 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* end search compt */}
        </div>
        {/* end chat list */}
        {/* message */}
        <ChatMessages
          messages={messages}
          loggedInUserId={loggedInUserId}
          selectedUserId={selectedUserId}
          selectedUserAvatar={selectedUserAvatar}
        />
        {/* end message */}
      </div>
    </div>
  );
};

export default Chat;
