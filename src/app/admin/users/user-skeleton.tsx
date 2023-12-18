import { Skeleton } from '@/components/ui/skeleton';

const UserSkeleton = () => {
  return (
    <div className="flex h-[4.5rem] w-full flex-row items-center justify-between">
      <Skeleton className="flex w-full flex-row items-center justify-between" />
      <div className="flex">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default UserSkeleton;
