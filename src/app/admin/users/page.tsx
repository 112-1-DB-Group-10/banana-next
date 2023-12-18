'use server';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { getUserSession } from '@/lib/session';
import Search from './search';
import UserList from './user-list';
import UserTabList from './user-tab-list';

const UserPage = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    userPerPage: number;
  };
}) => {
  const session = await getUserSession();
  return (
    <Card className="flex h-[40rem] w-[60rem] flex-col justify-around">
      <Search />
      <div className="overflow-y-scroll py-4">
        <Tabs defaultValue="default">
          <UserTabList />
          <TabsContent value="default">
            <UserList />
          </TabsContent>
          <TabsContent value="suspended">
            <UserList />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default UserPage;
