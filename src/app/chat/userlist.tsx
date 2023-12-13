import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import users from './data/users.json';

const UserList: React.FC = () => {
  return (
    <div className="w-full">
      {users.map((user, index) => (
        <div
          key={index}
          className={cn(
            'cursor-pointer border-b-2 border-gray-200 px-2 py-4',
            // selectedUserId === user.user_id && 'bg-gray-200',
          )}
        >
          <div className="w-full">
            <Image
              width={25}
              height={25}
              src={user.avatar}
              className="h-12 w-12 rounded-full object-cover"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">{user.username}</div>
            <span className="text-gray-500">TODO: Last Message</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
