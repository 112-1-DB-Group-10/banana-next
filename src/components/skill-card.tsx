'use client';

import { useState } from 'react';
import { CardData } from '@/actions/types';
import { getTimeSinceByDate } from '@/lib/utils';
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
import { ThumbsUp, MessageCircle, MessagesSquare } from 'lucide-react';

const SkillCard = ({ cardData }: { cardData: CardData }) => {
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
            <div className="text-xs font-light">
              {getTimeSinceByDate(cardData.created_time)}
            </div>
          </CardTitle>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">編輯卡片</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>編輯卡片</DialogTitle>
              <DialogDescription>在此修改卡片資訊</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  地點
                </Label>
                <Input
                  id="name"
                  value={cardData.locations}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  想學的技能
                </Label>
                <Input
                  id="username"
                  value={cardData.want_to_learn}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  擅長的技能
                </Label>
                <Input
                  id="username"
                  value={cardData.good_at}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  其他想說的話
                </Label>
                <Input
                  id="username"
                  value={cardData.contents}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">儲存變更</Button>
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
              <Badge variant="outline">{cardData.locations}</Badge>
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
            <div>{cardData.contents}</div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex">
        <Button variant="outline" className="mx-2">
          <ThumbsUp /> {cardData.likes}
        </Button>
        <Button variant="outline" className="mx-2" onClick={toggleComments}>
          <MessageCircle />
        </Button>
        <Button variant="outline" className="mx-2">
          <MessagesSquare />
        </Button>
      </CardFooter>
      <CardContent>
        {showComments && (
          <div>
            {cardData.comments.map((comment, index) => (
              <div
                key={index}
                className="my-2 flex items-start justify-between space-x-2"
              >
                <div className="flex flex-row">
                  <Avatar image={comment.avatar} />
                  <div className="mx-2 flex flex-col">
                    <div className="font-bold">{comment.username}</div>
                    <div>{comment.contents}</div>
                  </div>
                </div>

                <div className="text-xs font-light">
                  {getTimeSinceByDate(comment.time_stamp)}
                </div>
              </div>
            ))}
            <div className="my-4 flex items-center space-x-2">
              <Input
                className="flex-grow"
                placeholder="留言......"
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

export default SkillCard;
