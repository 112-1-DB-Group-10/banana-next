'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { User } from '@/db/types';
import users from '@/db/users.json';
import Search from './search';
import UserItem from './user-item';

const UserList: React.FC = () => {
  // const query: string = searchParms.get('q') || '';
  const filteredUsers = users.filter((user) => user.user_id !== 'xdd877');
  // .filter(
  //   (user) => user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1,
  // );
  return (
    <Card className="duration-400 h-[30rem] w-[20rem] overflow-y-scroll p-4 transition-all">
      <Search />
      <div className="w-full">
        {filteredUsers.map((user, index) => (
          <UserItem
            key={`userlist-item-${user.user_id}`}
            user={user as User}
            isLast={index === users.length - 1}
          />
        ))}
      </div>
    </Card>
  );
};

export default UserList;
