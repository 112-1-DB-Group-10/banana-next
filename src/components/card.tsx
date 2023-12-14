'use client';

import Avatar from './avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { timestamp } from 'drizzle-orm/mysql-core';

import React, { useState } from 'react';

// const cardData = {
//   card_id: 'aaa',
//   user_id: 'bbb',
//   avatar: 'https://github.com/shadcn.png',
//   username: 'Min Min',
//   institute: '國立台灣大學',
//   timestamp: '10分鐘前',
//   location: '線上',
//   want_to_learn: '寫前端',
//   good_at: 'FLOLAC',
//   contnets: '我不會寫前端嗚嗚嗚嗚嗚',
//   likes: 10
// }

const commentData = [
{
  card_id: 'aaa',
  user_id: 'bbb',
  avatar: 'https://github.com/shadcn.png',
  username: 'Min Min',
  timestamp: '1分鐘前',
  contents: '幫自己推'
},
{
  card_id: 'aaa',
  user_id: 'ccc',
  avatar: 'https://github.com/shadcn.png',
  username: 'Wen',
  timestamp: '1分鐘前',
  contents: '我是賴玟'
}]

const Cardstemp = ({cardData}: {cardData: any}) => {

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = () => {
    console.log('User entered comment:', newComment);
    // 將留言新增至資料庫
    setNewComment('');
  };

  return (
    <Card className="space-around h-fit w-[40rem] flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-5">
          <Avatar image={cardData.avatar} />
          <CardTitle className="">
            <div>{cardData.username}</div>
            <CardDescription>{cardData.institute}</CardDescription>
            <div className="text-xs font-light">{cardData.timestamp}</div>
          </CardTitle>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex h-5 items-center space-x-4">
              <div className="font-bold">地點</div>
              <Separator orientation="vertical" />
              <Badge variant="outline">{cardData.location}</Badge>
            </div>

            <div className="flex h-5 items-center space-x-4">
              <div className="font-bold">想學的技能</div>
              <Separator orientation="vertical" />
              <Badge variant="outline">{cardData.want_to_learn}</Badge>
            </div>

            <div className="flex h-5 items-center space-x-4">
              <div className="font-bold">擅長的技能</div>
              <Separator orientation="vertical" />
              <Badge variant="outline">{cardData.good_at}</Badge>
            </div>

            <div className="flex flex-col space-y-1.5 font-bold">
              其他想說的話
            </div>
            <div>{cardData.contnets}</div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex">
        <Button variant="outline" className="mx-2">
          讚 {cardData.likes}
        </Button>
        <Button variant="outline" className="mx-2" onClick={toggleComments}>
          留言
        </Button>
        <Button variant="outline" className="mx-2">
          私訊
        </Button>
      </CardFooter>
      <CardContent>
      {showComments && (
  <div>
    {commentData.map((comment, index) => (
      <div key={index} className="flex items-start space-x-2 justify-between my-2">
        <div className='flex flex-row'>
        <Avatar image={comment.avatar}/>
        <div className="flex flex-col mx-2">
          <div className="font-bold">{comment.username}</div>
          <div>{comment.contents}</div>
        </div>
        </div>

        <div className="text-xs font-light">{comment.timestamp}</div>
      </div>
    ))}
    <div className="flex items-center space-x-2 my-4">
      <Input
        className='flex-grow'
        placeholder='留言......'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button variant="outline" onClick={handleCommentSubmit}>
        發送留言
      </Button>
    </div>
  </div>
)}
      </CardContent>
      
    </Card>
  );
};

export default Cardstemp;
