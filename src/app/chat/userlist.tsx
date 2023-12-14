'use client';

import React, { useState } from 'react';
import { MdMinimize } from 'react-icons/md';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { UserSelect } from '@/db/types';
import users from '@/db/users.json';
import Search from './search';
import User from './user';

const UserList: React.FC = () => {
  const searchParms = useSearchParams();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const query: string = searchParms.get('q') || '';
  const filteredUsers = users.filter(
    (user) => user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1,
  );
  if (pathname.split('/').length >= 3 && collapsed) {
    return (
      <Card
        onClick={() => setCollapsed(!collapsed)}
        className="h-fit w-fit cursor-pointer p-4 transition-all duration-100 hover:scale-105"
      >
        <div>
          {users
            .filter((user) => user.user_id === pathname.split('/')[2])
            .map((user, index) => (
              <Image
                key={`user-avatar-${index}`}
                width={100}
                height={100}
                src={user.avatar}
                className="h-12 w-12 rounded-full object-cover"
                alt={`Avatar of user ${user.username}`}
              />
            ))}
        </div>
      </Card>
    );
  }
  return (
    <Card className="duration-400 h-[30rem] w-[20rem] overflow-y-scroll p-4 transition-all">
      <div className="flex items-center">
        {!collapsed && (
          <MdMinimize
            onClick={() => setCollapsed(true)}
            className="h-6 w-6 cursor-pointer"
          />
        )}
        <Search />
      </div>
      <div className="w-full">
        {filteredUsers.map((user, index) => (
          <User
            key={`userlist-item-${user.user_id}`}
            user={user as UserSelect}
            isLast={index === users.length - 1}
          />
        ))}
      </div>
    </Card>
  );
};

export default UserList;
