'use server';

import { getDefaultUsers } from '@/actions/adminActions';
import UserItem from './user-item';
import UserSkeleton from './user-skeleton';

const UserList = async ({
  page,
  userPerPage,
}: {
  page: number;
  userPerPage: number;
}) => {
  // const users_data = [];
  const users = await getDefaultUsers(page, userPerPage);
  return (
    <div className="flex w-full flex-col gap-1 p-4">
      {users.map((user, index) => {
        return <UserItem key={`user-item-${index}`} user={user} />;
      })}
      <UserSkeleton />
    </div>
  );
};

export default UserList;
