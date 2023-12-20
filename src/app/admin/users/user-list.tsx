'use client';

import { getUsersbySubstring } from '@/actions/adminActions';
import { UserProfile } from '@/actions/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserItem from './user-item';
import UserSkeleton from './user-skeleton';

const UserList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const loadMore = async () => {
    let newUsers = await getUsersbySubstring(
      false,
      query,
      20,
      Number(searchParams.get('page') || '1'),
    );
    const params = new URLSearchParams(searchParams);
    params.set('page', `${Number(searchParams.get('page') || '1') + 1}`);
    router.push(`${pathname}?${params.toString()}`);
    console.log(newUsers);
    console.log(searchParams.get('q'));
    setUsers([...users, ...newUsers]);
  };

  useEffect(() => {
    if (searchParams.get('q')) {
      setQuery(searchParams.get('q') as string);
      (async () => {
        await loadMore();
        let newUsers = await getUsersbySubstring(
          false,
          query,
          20,
          Number(searchParams.get('page') || '1'),
        );
        setUsers(newUsers);
      })();
    }
  }, [searchParams]);

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
