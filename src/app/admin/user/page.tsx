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
    <Card className="flex h-[40rem] w-fit flex-col justify-around  p-4">
      <Search />
      <div className="overflow-y-scroll py-4">
        <Tabs defaultValue="default">
          <UserTabList />
          <TabsContent value="default">
            <UserList
              page={searchParams.page || 1}
              userPerPage={searchParams.userPerPage || 10}
            />
          </TabsContent>
          <TabsContent value="suspended">
            <div>test2</div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default UserPage;
