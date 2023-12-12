"use client";
import React, { useState, useEffect } from 'react';
import UserList from './userlist';
import ChatMessages from './messages';

const Chat = () => {

    // 假 user 資料
    const users = [
        {
            name: 'Morris Chen',
            message: '我睡過頭了',
            imageURL: 'https://source.unsplash.com/_7LbC5J-jw4/600x600',
        },
        {
            name: '張禾家',
            message: '是 Messenger 壞掉還是顧寬政壞掉了',
            imageURL: 'https://source.unsplash.com/otT2199XwI8/600x600',
        },
        {
            name: '賴旻',
            message: '高遠球 90 percent',
            imageURL:'https://source.unsplash.com/L2cxSuKWbpo/600x600',
        },
    ];


    return (
        <div className="mx-auto shadow-lg rounded-lg">
          {/* Chatting */}
          <div className="flex flex-row justify-between bg-white">
            {/* chat list */}
            <div className="flex flex-col border-r-2 overflow-y-auto">
              {/* search compt */}
              <div className="border-b-2 py-4 px-2">
                <input
                  type="text"
                  placeholder="search chatting"
                  className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
              </div>
              {/* end search compt */}
              <div className="flex flex-col py-4 px-2 justify-center items-center border-b-2">
                <UserList users={users} />
              </div>
            </div>
            {/* end chat list */}
            {/* message */}
            <ChatMessages />
            {/* end message */}
          </div>
        </div>
    );
    
};

export default Chat;
