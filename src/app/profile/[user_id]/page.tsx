'use server';

import { getUserById } from '@/actions/userActions';
import { getUserSession, session } from '@/lib/session';
import ProfileClient from './profileClient';
import { UUID } from 'crypto';
import ProfileInfo from './profile-info';
import ProfileCards from './profile-cards';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = async ({
  params,
}: {
  params: {
    user_id: UUID;
  };
}) => {
  // const session = await getUserSession();
  const user_data = await getUserById(params.user_id);
  // const cards = await getCardsPostedByUser(user.user_id, 10000, 1);
  // const user_data = await getUserById('561aaede-e6d5-4893-acd6-698cb26e3f18')
  // console.log(session.user_id)
  // console.log('user data:', user_data)

  return (
    // <div>test</div>
    <div>
      <Card className="bg-blueGray-50 w-[45rem] pt-8">
      <ProfileInfo user={user_data}/>
      {/* <ProfileClient user={user_data} /> */}
      <div className="border-blueGray-200 mt-5 flex items-center justify-center border-t px-2 py-5">
        <Tabs defaultValue="cards" className="w-[42rem]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards">發過的卡片</TabsTrigger>
            <TabsTrigger value="interactions">互動過的卡片</TabsTrigger>
          </TabsList>
          <TabsContent value="cards">
            <Card>
              <CardHeader>
                <CardTitle>發過的卡片</CardTitle>
                {/* <CardDescription>
                    把卡片縮圖插在這裡
                  </CardDescription> */}
              </CardHeader>
              {/* <CardContent className="space-y-2">
                  假裝我們有卡片縮圖
                </CardContent>
                <CardFooter>
                  <Button>展開卡片內容</Button>
                </CardFooter> */}
                {/* <div>aaa</div> */}
                <ProfileCards user_id={params.user_id} posted={true}/>
              {/* <div className="no-scrollbar flex max-h-[300px] flex-col overflow-y-auto px-4">
                {cards.length > 0 ? (
                  cards.map((card, index) => (
                    <div key={`card-${index}`} className="py-2">
                      <SkillCard cardData={card}></SkillCard>
                    </div>
                  ))
                ) : (
                  <div className="p-2">還沒有發布過的卡片</div>
                )}
              </div> */}
            </Card>
          </TabsContent>
          <TabsContent value="interactions">
            <Card>
              <CardHeader>
                <CardTitle>曾經互動過的卡片</CardTitle>
                {/* <CardDescription>
                    把卡片縮圖插在這裡
                  </CardDescription> */}
              </CardHeader>
              {/* <CardContent className="space-y-2">
                  繼續假裝我們有卡片縮圖
                </CardContent>
                <CardFooter>
                  <Button>展開卡片內容</Button>
                </CardFooter> */}
                <ProfileCards user_id={params.user_id} posted={false}/>
              {/* <div className="no-scrollbar flex max-h-[300px] flex-col overflow-y-auto px-4">
                {cards.length > 0 ? (
                  cards.map((card, index) => (
                    <div key={`card-${index}`} className="py-2">
                      <SkillCard cardData={card}></SkillCard>
                    </div>
                  ))
                ) : (
                  <div className="p-2">還沒有互動過的卡片</div>
                )}
              </div> */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </Card>
    </div>
  );
};

export default Profile