'use server';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { getUserSession } from '@/lib/session';
import Search from './search';
import ReviewList from './review-list';
import ApplicationTabList from './review-tab-list';
import { Review } from '@/components/ui/review';

const ReviewingPage = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    applicationPerPage: number;
  };
}) => {
  const session = await getUserSession();
  return (
    <Review className="flex h-[40rem] w-[60rem] flex-col justify-around">
      <Search />
      <div className="overflow-y-scroll py-4">
        <Tabs defaultValue="default">
          <ApplicationTabList />
          <TabsContent value="pass">
            <ReviewList />
          </TabsContent>
          <TabsContent value="fail">
            <ReviewList />
          </TabsContent>
          <TabsContent value="pending">
            <ReviewList />
          </TabsContent>
        </Tabs>
      </div>
    </Review>
  );
};

export default ReviewingPage;