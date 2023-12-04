'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { followings } from '@/data/fake';
import { getNextStory } from '@/lib/utils';

export default function StoryNav() {
  const router = useRouter();
  const params = useParams() as { uid: string; sid: string };
  const pathname = usePathname();

  if (pathname.includes('/new')) return null;

  return (
    <div className="flex justify-between text-white">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon className="h-5 w-5 shrink-0" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          const nextStory = getNextStory(followings, params);
          router.push(nextStory);
        }}
      >
        <ChevronRightIcon className="h-5 w-5 shrink-0" />
      </Button>
    </div>
  );
}
