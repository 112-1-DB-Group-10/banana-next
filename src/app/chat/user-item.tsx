import Link from 'next/link';
import Avatar from '@/components/avatar';
import messages from '@/db/messages.json';
import { User } from '@/db/types';
import { cn } from '@/lib/utils';

const UserItem = ({ user, isLast }: { user: User; isLast: boolean }) => {
  const userId: string = 'abc123';
  const chat = messages.filter(
    (message) =>
      (message.receiver_id === userId && message.sender_id === user.user_id) ||
      (message.sender_id === userId && message.receiver_id === user.user_id),
  );
  const lastMessage = chat
    .sort((message) => new Date(message.time_stamp).getTime())
    .pop();
  return (
    <Link href={`/chat/${user.user_id}`}>
      <div
        className={cn(
          'flex w-full cursor-pointer items-center gap-4 border-gray-200 px-2 py-4',
          !isLast && 'border-b-2',
        )}
      >
        <Avatar image={user.avatar} />
        <div className="... w-full overflow-hidden">
          <div className=" text-lg font-semibold">{user.username}</div>
          <p className="truncate text-gray-500">
            {lastMessage &&
              `${lastMessage.sender_id === userId ? '你' : '他'}：${
                lastMessage.contents
              }`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserItem;
