'use server';

import { getPopularCards } from '@/actions/cardActions';
import SkillCard from '@/components/skill-card/skill-card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserSession } from '@/lib/session';
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
  // const cards: CardData[] = cardData.map((card) => ({
  //   ...card,
  //   visibility: card.visibility as 'public' | 'verified',
  //   created_time: new Date(card.created_time),
  //   updated_time: new Date(card.updated_time),
  //   num_comments: card.num_comments,
  // }));
  const session = await getUserSession();

  const cards = await getPopularCards(true, ['台北', '線上'], 10, 1);

  return (
    <div className="flex h-full w-full flex-1 items-end justify-between pl-4 pr-4">
      <div className="flex h-full w-full justify-center">
        <div>
          <Input />
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
            <div className="no-scrollbar flex h-[40rem] flex-col overflow-y-auto">
              {cards.map((card, index) => (
                <div key={`card-${index}`} className="py-2">
                  <SkillCard card={card} />
                </div>
              ))}
            </div>
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
