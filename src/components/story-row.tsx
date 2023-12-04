import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { followings, type Following } from '@/data/fake';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';

export default async function StoryRow() {
  const session = await auth();
  return (
    <div className="no-scrollbar flex w-full shrink-0 snap-x snap-mandatory scroll-pl-4 items-center justify-start space-x-3 overflow-x-auto p-4">
      <Link href="/story/new" className="relative">
        <Avatar className="h-14 w-14 snap-start">
          <AvatarImage
            src={(session && session.user && session.user.image) || ''}
            alt="Chung-Yang Ric Huang"
          />
          <AvatarFallback />
        </Avatar>
        <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-white"></div>
        <div className="absolute bottom-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0084ff]">
          <PlusIcon className="h-3 w-3 text-white" />
        </div>
      </Link>
      {followings.map((following, index) => (
        <StoryItem key={index} following={following} />
      ))}
    </div>
  );
}

function StoryItem({ following }: { following: Following }) {
  const isActive = following.stories.length > 0;
  return (
    <Link
      href={isActive ? `/story/${following.id}/${following.stories[0].id}` : ``}
    >
      <Avatar
        is="button"
        className={cn(
          'h-14 w-14 cursor-pointer snap-start bg-[linear-gradient(45deg,_#fcb045,_#fd1d1d,_#833ab4)] transition-transform duration-100 active:scale-95',
          isActive && 'h-[68px] w-[68px] p-[3px]',
        )}
      >
        <AvatarImage
          src={following.img}
          alt={following.name}
          className={cn(
            'rounded-full',
            isActive && 'border-[3px] border-[#ffffff]',
          )}
        />
        <AvatarFallback
          className={cn(isActive && 'border-[3px] border-[#ffffff]')}
        />
      </Avatar>
    </Link>
  );
}
