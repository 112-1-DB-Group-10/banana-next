'use server';

import { UUID } from 'crypto';
import { getUserById } from '@/actions/userActions';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileCards from './profile-cards';
import ProfileInfo from './profile-info';
import { Button } from '@/components/ui/button';

const Profile = async ({
  params,
}: {
  params: {
    user_id: UUID;
  };
}) => {
  // const session = await getUserSession();
  const user_data = await getUserById(params.user_id);

  return (
    <Tabs defaultValue="cards">
      <Card className="bg-blueGray-50 h-fit w-[45rem] pt-8">
        <ProfileInfo user={user_data} />
        <div className="border-blueGray-200 mt-5 flex items-center justify-center overflow-scroll border-t pt-4 no-scrollbar">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards">發過的卡片</TabsTrigger>
            <TabsTrigger value="interactions">互動過的卡片</TabsTrigger>
          </TabsList>
        </div>
      </Card>
      <div className="flex w-full items-center justify-center overflow-scroll no-scrollbar">
        <TabsContent value="cards">
          <ProfileCards posted={true} />
        </TabsContent>
        <TabsContent value="interactions">
          <ProfileCards posted={false} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Profile;
