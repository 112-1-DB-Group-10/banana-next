import Link from 'next/link';
import Avatar from '@/components/avatar';
import { cn } from '@/lib/utils';

const ConversationItem = ({
  partner_id,
  avatar,
  username,
  contents,
  isLast,
}: {
  partner_id: string;
  avatar: string;
  username: string;
  contents: string;
  isLast: boolean;
}) => {
  return (
    <Link href={`/chat/${partner_id}`}>
      <div
        className={cn(
          'flex w-full cursor-pointer items-center gap-4 border-gray-200 px-2 py-4',
          !isLast && 'border-b-2',
        )}
      >
        <Avatar image={avatar} />
        <div className="... w-full overflow-hidden">
          <div className=" text-lg font-semibold">{username}</div>
          <p className="truncate text-gray-500">{contents}</p>
        </div>
      </div>
    </Link>
  );
};

export default ConversationItem;
