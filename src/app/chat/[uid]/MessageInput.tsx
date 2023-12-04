'use client';

import { FormEvent } from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { sendMessage } from '@/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MessageInput = () => {
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const content = formData.get('content') as string;
        console.log();
        sendMessage({
          senderUid: 'dawdawd',
          recipientUid: 'dawdawd',
          content,
        });
      }}
      className="m-3 flex space-x-2"
    >
      <Input
        id="content"
        name="content"
        type="text"
        placeholder="Type a message"
      />
      <Button type="submit" size="icon" className="shrink-0">
        <PaperPlaneIcon className="-translate-y-[0.1rem] translate-x-[0.1rem] -rotate-45" />
      </Button>
    </form>
  );
};

export default MessageInput;
