'use client';

import Avatar from '../avatar';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { CardData } from '@/actions/types';
import { getTimeSinceByDate } from '@/lib/utils';

const SkillCard = ({ card }: { card: CardData }) => {
  return (
    <Card className="space-around h-fit w-[40rem] flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-5">
          <Avatar userId={card.user_id} image={card.avatar} />
          <CardTitle className="">
            <div>{card.username}</div>
            <CardDescription>{card.institute}</CardDescription>
            <div className="text-xs font-light">
              {getTimeSinceByDate(card.created_time)}
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex h-5 items-center space-x-4">
              <div className="font-bold">地點</div>
              <Badge variant="outline">{card.locations}</Badge>
            </div>

            <div className="flex h-5 items-center space-x-4">
              <div className="font-bold">想學的技能</div>
              <Badge variant="outline">{card.want_to_learn}</Badge>
            </div>

            <div className="flex h-5 items-center space-x-4">
              <div className="font-bold">擅長的技能</div>
              <Badge variant="outline">{card.good_at}</Badge>
            </div>

            <div className="flex flex-col space-y-1.5 font-bold">
              其他想說的話
            </div>
            <div>{card.contents}</div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
