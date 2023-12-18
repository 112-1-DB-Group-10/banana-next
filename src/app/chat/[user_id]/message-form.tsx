'use client';

import { useEffect, useRef, useState } from 'react';
import { UUID } from 'crypto';
import { sendMessage } from '@/actions/chatActions';
import { Button } from '@/components/ui/button';

const MessageForm = ({
  userId,
  partnerId,
}: {
  userId: UUID;
  partnerId: UUID;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageToSend, setMessageToSend] = useState<string>('');
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const handleSubmit = async () => {
    if (messageToSend.length === 0) return;
    setMessageToSend('');
    await sendMessage(userId, partnerId, messageToSend);
    setInputFocused(false);
  };
  useEffect(() => {
    if (!inputFocused) {
      inputRef.current?.focus();
      setInputFocused(true);
    }
  }, [inputFocused]);
  useEffect(() => {
    console.log(document.querySelector('#last-message'));
    document.querySelector('#last-message')?.scrollIntoView();
  });
  return (
    <div className="h-12">
      <form onSubmit={handleSubmit}>
        form
        <div className="flex w-full items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
            className="w-full rounded-2xl border-gray-200 border-transparent px-2 py-2 focus:outline-none"
            placeholder="我想說..."
          />
          <Button
            className="bg-white text-black shadow-none hover:bg-white"
            type="submit"
          >
            說！
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
