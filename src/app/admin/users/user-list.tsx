'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getDefaultUsers } from '@/actions/adminActions';
import { UserProfile } from '@/actions/types';
import UserItem from './user-item';
import UserSkeleton from './user-skeleton';

const UserList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const router = useRouter();
  const loadMore = async () => {
    const newUsers = await getDefaultUsers(
      Number(searchParams.get('page')) || 1,
      20,
    );
    router.push(
      `${pathname}?page=${(Number(searchParams.get('page')) || 1) + 1}`,
    );
    setUsers([...users, ...newUsers]);
  };

  // useEffect(() => {
  //   (async () => {
  //     const newUsers = await getDefaultUsers(page, 15);
  //     console.log(newUsers);
  //     setUsers([...users, ...newUsers]);
  //     console.log(newUsers);
  //   })();
  // }, [page]);

  return (
    <div className="flex w-full flex-col gap-1 p-6">
      {users.map((user, index) => {
        return <UserItem key={`user-item-${index}`} user={user} />;
      })}
      <UserSkeleton loadMore={loadMore} />
    </div>
  );
};

export default UserList;
