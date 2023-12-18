'use server';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import Search from './search';
import UserList from './user-list';
import UserTabList from './user-tab-list';

export default async function UserPage({
  searchParams,
}: {
  searchParams: {
    page: number;
    userPerPage: number;
  };
}) {
  // const cards: CardData[] = );
  return (
    <div className="border-blueGray-200 mt-5 flex flex-col items-center border-t px-2 py-5">
      <Search />
      <Tabs defaultValue="default" className="w-[60rem] px-4 py-4">
        <UserTabList />
        <TabsContent value="default">
          <UserList
            page={searchParams.page || 0}
            userPerPage={searchParams.userPerPage || 10}
          />
        </TabsContent>
        <TabsContent value="suspended">
          <div>test2</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
