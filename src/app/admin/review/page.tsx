'use server';

import { Review } from '@/components/ui/review';
import { getUserSession } from '@/lib/session';
import ReviewList from './review-list';
import Search from './search';

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
        {/* <Tabs defaultValue="default"> */}
        {/* <ApplicationTabList /> */}
        {/* <TabsContent value="pass"> */}
        <ReviewList />
        {/* </TabsContent>
          <TabsContent value="fail">
            <ReviewList />
          </TabsContent>
          <TabsContent value="pending">
            <ReviewList />
          </TabsContent>
        </Tabs> */}
      </div>
    </Review>
  );
};

export default ReviewingPage;
