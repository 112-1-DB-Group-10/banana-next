'use server';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserSession } from '@/lib/session';
import CardList from './card-list';
import PleaseLogin from './please-login';
import Sidebar from './sidebar';

export default async function MainPage({
  searchParams: { topic, label, location },
}: {
  searchParams: {
    topic: string;
    label: string;
    location: string;
  };
}) {
  const session = await getUserSession();
  if (!session) return <PleaseLogin />
  return (
    <div className="flex h-full w-full flex-1 items-end justify-between overflow-hidden pl-4 pr-4">
      <div className="flex h-full w-full justify-center overflow-hidden">
        <div>
          {/* <Input /> */}
          <Sidebar />
        </div>
        <Tabs defaultValue="popular" className="w-[42rem] px-4">
          <TabsList>
            <TabsTrigger value="popular" className="h-[35px] w-[20rem]">
              熱門
            </TabsTrigger>
            <TabsTrigger value="recent" className="h-[35px] w-[20rem]">
              最新
            </TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <div className="flex flex-grow p-1">
              <div className="mx-6 text-xl font-bold">
                {topic ? topic : '熱門'}
              </div>
              <div className="mx-6 text-xl">{label && label}</div>
            </div>
            <CardList isVerified={session.institute !== null} />
          </TabsContent>
          <TabsContent value="recent">
            <div className="flex flex-grow p-1">
              <div className="mx-6 text-xl font-bold">
                {topic ? `${topic}` : '最新'}
              </div>
              <div className="mx-6 text-xl">{label && label}</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
