'use client';

import * as React from 'react';
import Image from 'next/image';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '@/db/types';
// import users from '@/db/users.json';
import { isURL } from '@/lib/utils';
import cards_from_json from '@/actions/cards.json';
import user from '@/actions/user.json';
import SkillCard from '@/components/skill-card';
import { CardData, UserProfile } from '@/actions/types';

const ProfileClient = ({user}: {user: UserProfile}) => {
  // const userId = 'xdd877';
  // const user = users.filter((user) => user.user_id === userId).pop() as User;
  // const user = {
  //   "username": "Ruby Ku",
  //   "sex": "male",
  //   "age": 20,
  //   "email": "ruby0322@ntu.im",
  //   "role": "admin",
  //   "suspended": false,
  //   "user_id": "xdd877",
  //   "avatar": "",
  //   "institute": "國立台灣大學"
  // }

  const cards: CardData[] = cards_from_json.map((card) => ({
    ...card,
    created_time: new Date(card.created_time),
    updated_time: new Date(card.updated_time),
    comments: card.comments.map((comment) => ({
      ...comment,
      time_stamp: new Date(comment.time_stamp),
    })),
  }));

  return (
    <Card className="bg-blueGray-50 w-[45rem] pt-8">
      <div className='flex justify-between px-4'>
        <div className='flex'>
          <div className="relative p-4">
               <Image
                 src={
                   isURL(user.avatar)
                     ? user.avatar
                     : `data:image/png;base64,${user.avatar}`
                 }
                 alt="User Avatar"
                 width={70}
                 height={70}
               />
            </div>
          <div className='flex flex-col p-4'>
            <div className='flex'>
              <div className='pr-2 text-lg font-bold'>{user.username}</div>
              <Separator orientation="vertical" />
              <div className='px-2'>{user.sex == 'female' ? '女' : '男'}</div>
              <Separator orientation="vertical" />
              <div className='px-2'>{user.age} 歲</div>
              <Separator orientation="vertical" />
              <div className='pl-2'>{user.institute == null ? '' : user.institute}</div>
            </div>
            <div className='py-2'>{user.email}</div>
          </div>
        </div>
        <div className='p-4'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">修改個人資料</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>修改個人資料</DialogTitle>
                <DialogDescription>
                  在此修改個人資料
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    使用者名稱
                  </Label>
                  <Input
                    id="name"
                    value={user.username}
                    className="col-span-3"
                  />
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div> */}
              </div>
              <DialogFooter>
                <Button type="submit">儲存變更</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border-blueGray-200 mt-5 border-t px-2 py-5 flex items-center justify-center">
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
                <div className="no-scrollbar flex max-h-[300px] flex-col overflow-y-auto px-4">
                  {cards.length > 0 ?
                  cards.map((card, index) => (
                    <div key={`card-${index}`} className="py-2">
                      <SkillCard cardData={card}></SkillCard>
                    </div>
                  )) : <div className='p-2'>還沒有發布過的卡片</div>}
                </div>
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
                <div className="no-scrollbar flex max-h-[300px] flex-col overflow-y-auto px-4">
                  {cards.length > 0 ?
                  cards.map((card, index) => (
                    <div key={`card-${index}`} className="py-2">
                      <SkillCard cardData={card}></SkillCard>
                    </div>
                  )) : <div className='p-2'>還沒有互動過的卡片</div>}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

    </Card>
    // <Card className="bg-blueGray-50 w-[50rem] pt-8">
    //     <div className="flex flex-wrap justify-center">
    //       <div className="flex w-full justify-center px-4">
    //         <div className="relative">
    //           <Image
    //             src={
    //               isURL(user.avatar)
    //                 ? user.avatar
    //                 : `data:image/png;base64,${user.avatar}`
    //             }
    //             alt="User Avatar"
    //             width={100}
    //             height={100}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="mt-4 text-center">
    //       <h3 className="text-blueGray-700 mb-2 text-xl font-semibold leading-normal">
    //         {user.username}
    //       </h3>
          // <Dialog>
          //   <DialogTrigger asChild>
          //     <Button variant="outline">Edit Profile</Button>
          //   </DialogTrigger>
          //   <DialogContent className="sm:max-w-[425px]">
          //     <DialogHeader>
          //       <DialogTitle>Edit profile</DialogTitle>
          //       <DialogDescription>
          //         Make changes to your profile here.
          //       </DialogDescription>
          //     </DialogHeader>
          //     <div className="grid gap-4 py-4">
          //       <div className="grid grid-cols-4 items-center gap-4">
          //         <Label htmlFor="name" className="text-right">
          //           Name
          //         </Label>
          //         <Input
          //           id="name"
          //           value="Pedro Duarte"
          //           className="col-span-3"
          //         />
          //       </div>
          //       <div className="grid grid-cols-4 items-center gap-4">
          //         <Label htmlFor="username" className="text-right">
          //           Username
          //         </Label>
          //         <Input
          //           id="username"
          //           value="@peduarte"
          //           className="col-span-3"
          //         />
          //       </div>
          //     </div>
          //     <DialogFooter>
          //       <Button type="submit">Save changes</Button>
          //     </DialogFooter>
          //   </DialogContent>
          // </Dialog>
    //       <div className="text-blueGray-400 mb-2 mt-2 text-sm font-bold uppercase leading-normal">
    //         <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>
    //         {user.institute}
    //       </div>
    //       <div className="text-blueGray-600 mb-2 mt-2">
    //         <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
    //         {user.email}
    //       </div>
    //       <div className="text-blueGray-600 mb-2 mt-2">
    //         <i className="fas fa-university text-blueGray-400 mr-2 text-lg"></i>
    //         {user.sex}
    //       </div>
    //     </div>
        // <div className="border-blueGray-200 mt-5 border-t px-2 py-5 flex items-center justify-center">
        //   <Tabs defaultValue="cards" className="w-[600px]">
        //     <TabsList className="grid w-full grid-cols-2">
        //       <TabsTrigger value="cards">發過的卡片</TabsTrigger>
        //       <TabsTrigger value="interactions">互動過的卡片</TabsTrigger>
        //     </TabsList>
        //     <TabsContent value="cards">
        //       <Card>
        //         <CardHeader>
        //           <CardTitle>發過的卡片</CardTitle>
        //           {/* <CardDescription>
        //             把卡片縮圖插在這裡
        //           </CardDescription> */}
        //         </CardHeader>
        //         {/* <CardContent className="space-y-2">
        //           假裝我們有卡片縮圖
        //         </CardContent>
        //         <CardFooter>
        //           <Button>展開卡片內容</Button>
        //         </CardFooter> */}
        //         <div className="no-scrollbar flex max-h-[150px] flex-col overflow-y-auto">
        //           {cards.map((card, index) => (
        //             <div key={`card-${index}`} className="py-2">
        //               <SkillCard cardData={card}></SkillCard>
        //             </div>
        //           ))}
        //         </div>
        //       </Card>
        //     </TabsContent>
        //     <TabsContent value="interactions">
        //       <Card>
        //         <CardHeader>
        //           <CardTitle>曾經互動過的卡片</CardTitle>
        //           <CardDescription>
        //             把卡片縮圖插在這裡
        //           </CardDescription>
        //         </CardHeader>
        //         <CardContent className="space-y-2">
        //           繼續假裝我們有卡片縮圖
        //         </CardContent>
        //         <CardFooter>
        //           <Button>展開卡片內容</Button>
        //         </CardFooter>
        //       </Card>
        //     </TabsContent>
        //   </Tabs>
        // </div>
    // </Card>
  );
};

export default ProfileClient;
