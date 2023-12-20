'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ReviewSkeleton = ({ loadMore }: { loadMore: () => Promise<void> }) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      (async () => {
        await loadMore();
      })();
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="flex h-[4.5rem] w-full flex-row items-center justify-between"
    >
      <div className="flex flex-row items-center">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[10rem] font-bold" />
        <Skeleton className="h-4  " />
        <Skeleton className="h-4 w-[3rem] " />
        <Skeleton className="h-4 w-[14rem] overflow-hidden truncate " />
        <Skeleton className="h-4 w-[10rem]  " />
        <Skeleton className="h-4 w-[8rem]" />
      </div>
      <Skeleton className="flex w-full flex-row items-center justify-between" />
      <div className="flex">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default ReviewSkeleton;
