'use client';

import React, { useState, useEffect } from 'react';
import ChatMessages from './messages';
import UserList from './userlist';

const Chat = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 假 user 資料
  const usersData = [
    {
      id: 'def456',
      name: 'Morris Chen',
      message: '我睡過頭了',
      imageURL: 'https://source.unsplash.com/_7LbC5J-jw4/600x600',
      lastMessage: '',
    },
    {
      id: 'ghi789',
      name: '張禾家',
      message: '是 Messenger 壞掉還是顧寬政壞掉了',
      imageURL: 'https://source.unsplash.com/otT2199XwI8/600x600',
      lastMessage: '',
    },
    {
      id: 'ggg999',
      name: '賴旻',
      message: '高遠球 90 percent',
      imageURL: 'https://source.unsplash.com/L2cxSuKWbpo/600x600',
      lastMessage: '',
    },
  ];

  const messageData = [
    {
      sender_id: 'abc123',
      receiver_id: 'def456',
      time_stamp: '2023-12-13:12:00:00:',
      contents: '哈囉哈囉哈囉哈囉',
    },
    {
      sender_id: 'def456',
      receiver_id: 'abc123',
      time_stamp: '2023-12-13:12:05:10:',
      contents: '你好你好',
    },
    {
      sender_id: 'ghi789',
      receiver_id: 'abc123',
      time_stamp: '2023-12-12 18:13:20',
      contents:
        '現代人戀愛流程：認識了一個人➔跟他一直聊天➔喜歡上他➔交往➔他跟你分手了卻跟你當朋友又一直讓你覺得有機會➔你依舊卡慘死➔因為想挽回他一直情勒或自我感動導致他受不了你封鎖你➔自暴自棄➔由愛生恨➔祝他家裡失火',
    },
    {
      sender_id: 'abc123',
      receiver_id: 'ghi789',
      time_stamp: '2023-12-12 18:20:15',
      contents: '一堆屁話笑死',
    },
    {
      sender_id: 'ggg999',
      receiver_id: 'abc123',
      time_stamp: '2023-12-10 21:40:10',
      contents:
        '你聽過三隻小豬的故事嗎，大野狼去第一間房子的時候說：「欸朱大哥你怎麼還活著？」',
    },
    {
      sender_id: 'abc123',
      receiver_id: 'ggg999',
      time_stamp: '2023-12-10 21:40:10',
      contents: '要去看大偉盧曼3嗎',
    },
  ];

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  usersData.forEach((user) => {
    const lastMessage = messageData
      .filter(
        (message) =>
          message.sender_id === user.id || message.receiver_id === user.id,
      )
      .pop();
    if (lastMessage) {
      user.lastMessage = lastMessage.contents;
    }
  });

  let loggedInUserId = 'abc123';
  let selectedUserAvatar = 'https://source.unsplash.com/_7LbC5J-jw4/600x600';
  if (selectedUserId) {
    const selectedUser = usersData.find((user) => user.id === selectedUserId);
    if (selectedUser) {
      selectedUserAvatar = selectedUser.imageURL;
    }
  }

  let selectedUserName = '';

  if (selectedUserId) {
    const selectedUser = usersData.find((user) => user.id === selectedUserId);
    if (selectedUser) {
      selectedUserName = selectedUser.name; 
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
          <div className="flex flex-col items-center justify-center border-b-2">
            <UserList
              users={filteredUsers}
              selectedUserId={selectedUserId}
              onSelectUser={(userId: string) => setSelectedUserId(userId)}
            />
          </div>
        </div>
        {/* end chat list */}
        {/* message */}
        <ChatMessages
          messages={messageData}
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