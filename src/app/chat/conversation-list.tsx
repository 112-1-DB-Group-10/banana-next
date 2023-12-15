'use client';

import { Card } from '@/components/ui/card';
import { User } from '@/db/types';
import users from '@/db/users.json';
import UserItem from './conversation-item';
import Search from './search';

const ConversationList = ({ conversations }: { conversations: User[] }) => {
  const filteredUsers: User[] = [];
  return (
    <Card className="duration-400 h-[30rem] w-[20rem] overflow-y-scroll p-4 transition-all">
      <div className="flex items-center">
        <Search />
      </div>
      <div className="w-full">
        {filteredUsers.map((user, index) => (
          <UserItem
            key={`conversation-list-item-${user.user_id}`}
            user={user as User}
            isLast={index === users.length - 1}
          />
        ))}
      </div>
    </Card>
  );
};

export default ConversationList;
