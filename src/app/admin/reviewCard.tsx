'use client';
import React from 'react';
import Avatar from '@/components/avatar';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ReviewCardProps {
  imageUrl: string;
  username: string;
  gender: string;
  institute: string;
  email: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  imageUrl,
  username,
  gender,
  institute,
  email,
}: ReviewCardProps) => {
  return (
    <Card className="bg-blueGray-50 w-[45rem] pt-4">
      <div className="flex justify-between px-4">
        <div className="flex">
          <div className="relative p-4">
            <Avatar image={imageUrl} />
          </div>
          <div className="flex flex-col p-4">
            <div className="flex">
              <div className="pr-2 text-lg font-bold">{username}</div>
              <Separator orientation="vertical" />
              <div className="px-2">{gender}</div>
              <Separator orientation="vertical" />
              <div className="px-2">{institute}</div>
            </div>
            <div className="py-2">{email}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
