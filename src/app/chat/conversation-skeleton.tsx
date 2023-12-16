import { Skeleton } from '@/components/ui/skeleton';

const ConversationSkeleton = () => {
  return (
    <div className="flex w-full items-center space-x-4 px-2 py-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
};

export default ConversationSkeleton;
