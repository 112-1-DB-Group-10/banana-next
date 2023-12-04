import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { followings } from '@/data/fake';
import { cn } from '@/lib/utils';

const ChatRooms = () => {
  return (
    <div className="no-scrollbar flex h-full flex-col overflow-auto border-t py-2">
      {followings.map((following, index) => (
        <Link
          key={index}
          href={`/chat/${following.id}`}
          className="flex items-center space-x-4 px-4 py-1 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={following.img} alt={following.name} />
            <AvatarFallback />
          </Avatar>
          <div className="my-auto w-full text-left">
            <span className="float-right text-right text-xs text-muted-foreground">
              {following.time}
            </span>
            <p className="text-sm font-semibold">{following.name}</p>
            <p className={cn('line-clamp-2 text-sm text-muted-foreground')}>
              {following.lastMessage || 'No messages yet'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatRooms;
