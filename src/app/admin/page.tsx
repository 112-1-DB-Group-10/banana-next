
import { useState } from 'react';
import Avatar from '@/components/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTimeSinceByDate } from '@/lib/utils';
import ReviewCard from './reviewCard';

const reviewing = () => {
  const [selectedUserData, setSelectedUserData] = useState(null);

  const userData = [
    {
      imageUrl: 'https://github.com/shadcn.png',
      username: 'username',
      gender: '男',
      institute: '五專',
      email: 'abcdefg2222@gmail.com',
    },
    {
      imageUrl: 'https://github.com/example.png',
      username: 'username2',
      gender: '女',
      institute: '學店',
      email: 'example@example.com',
    },
  ];

  const handleCardClick = (index) => {
    setSelectedUserData(userData[index]);
  };

  return (
    <div className="flex">
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">待審核</TabsTrigger>
          <TabsTrigger value="pass">已通過</TabsTrigger>
          <TabsTrigger value="fail">未通過</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          {userData.map((userData, index) => (
            <div key={index} onClick={() => handleCardClick(index)}>
              <ReviewCard
                imageUrl={userData.imageUrl}
                username={userData.username}
                gender={userData.gender}
                institute={userData.institute}
                email={userData.email}
              />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="pass">
          {userData.map((userData, index) => (
            <div key={index} onClick={() => handleCardClick(index)}>
              <ReviewCard
                imageUrl={userData.imageUrl}
                username={userData.username}
                gender={userData.gender}
                institute={userData.institute}
                email={userData.email}
              />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="fail">
          {userData.map((userData, index) => (
            <div key={index} onClick={() => handleCardClick(index)}>
              <ReviewCard
                imageUrl={userData.imageUrl}
                username={userData.username}
                gender={userData.gender}
                institute={userData.institute}
                email={userData.email}
              />
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <div style={{ flex: '1', marginLeft: '20px' }}>
        {/* Right side with expanded user details */}
        {selectedUserData && (
          <Card className="space-around h-fit w-[40rem] flex-col">
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center gap-5">
                <Avatar image={selectedUserData.imageUrl} />
                <CardTitle className="">
                  <div>{selectedUserData.username}</div>
                  <CardDescription>
                    {selectedUserData.institute}
                  </CardDescription>
                  <div className="text-xs font-light">2023-12-25</div>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form>
                {/* Details to display */}
                {/* Modify this section as needed */}
                <div className="grid w-full items-center gap-4">
                  <div className="flex h-5 items-center space-x-4">
                    <div className="font-bold">Application Content</div>
                  </div>
                  {/* Add more details here */}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex">
              <Button variant="outline" className="mx-2">
                Yes
              </Button>
              <Button variant="destructive" className="mx-4">
                Reject
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default reviewing;

{
  /* 
    點下左邊那團展開的樣子
    <Card className="space-around h-fit w-[40rem] flex-col">
    <CardHeader className="flex-row items-center justify-between">
    <div className="flex items-center gap-5">
        <Avatar image={"https://github.com/shadcn.png"}/>
        <CardTitle className="">
        <div>username</div>
        <CardDescription>institute</CardDescription>
        <div className="text-xs font-light">
            2023-12-25
        </div>
        </CardTitle>
    </div>
    </CardHeader>
    <CardContent>
    <form>
        <div className="grid w-full items-center gap-4">
        <div className="flex h-5 items-center space-x-4">
            <div className="font-bold">地點</div>
            <Separator orientation="vertical" />
            <Badge variant="outline">台北</Badge>
        </div>

        <div className="flex h-5 items-center space-x-4">
            <div className="font-bold">想學的技能</div>
            <Separator orientation="vertical" />
            <Badge variant="outline">跟你媽做愛</Badge>
        </div>

        <div className="flex h-5 items-center space-x-4">
            <div className="font-bold">擅長的技能</div>
            <Separator orientation="vertical" />
            <Badge variant="outline">抽插你爸</Badge>
        </div>

        <div className="flex flex-col space-y-1.5 font-bold">
            其他想說的話
        </div>
        <div>幹你娘機掰</div>
        </div>
    </form>
    </CardContent>
    <CardFooter className="flex">
    <Button variant="outline" className="mx-2">
        讚 69
    </Button>
    <Button variant="outline" className="mx-2">
        私訊
    </Button>
    </CardFooter>
</Card> */
}
