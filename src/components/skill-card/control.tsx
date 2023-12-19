'use client';

import { Button } from '../ui/button';
import { CardFooter } from '../ui/card';
import { MessageCircle, MessagesSquare, ThumbsUp } from 'lucide-react';

const Control = ({
  numLikes,
  numComments,
}: {
  numLikes: number;
  numComments: number;
}) => {
  return (
    <CardFooter className="flex">
      <Button variant="outline" className="mx-2">
        <ThumbsUp /> {numLikes}
      </Button>
      <Button variant="outline" className="mx-2">
        <MessageCircle /> {numComments}
      </Button>
      <Button variant="outline" className="mx-2">
        <MessagesSquare />
      </Button>
    </CardFooter>
  );
};

export default Control;
