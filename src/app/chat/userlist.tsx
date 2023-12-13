'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { UserSelect } from '@/db/types';
import users from '@/db/users.json';
import User from './user';

const UserList: React.FC = () => {
  const searchParms = useSearchParams();
  const query: string = searchParms.get('q') || '';
  const filteredUser = users.filter(
    (user) => user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1,
  );
  return (
    <div className="w-full">
      {filteredUser.map((user, index) => (
        <User
          key={`userlist-item-${user.user_id}`}
          user={user as UserSelect}
          isLast={index === users.length - 1}
        />
      ))}
    </div>
  );
};

export default UserList;
