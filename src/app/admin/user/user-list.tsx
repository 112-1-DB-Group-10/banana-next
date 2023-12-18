'use server';

import usersData from '@/actions/users.json';
import { Card } from '@/components/ui/card';
import UserItem from './user-item';

const UserList = async ({
  page,
  userPerPage,
}: {
  page: number;
  userPerPage: number;
}) => {
  // const users_data = [];
  //   const users = await getDefaultUsers(page, userPerPage);
  const users = usersData;
  return (
    <Card className="flex flex-col gap-1 p-4">
      {users.map((user, index) => (
        <UserItem key={`user-item-${index}`} user={user} />
      ))}
    </Card>
  );
};

export default UserList;
