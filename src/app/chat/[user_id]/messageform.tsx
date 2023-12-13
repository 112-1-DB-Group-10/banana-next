'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const MessageForm = () => {
  const [messageToSend, setMessageToSend] = useState<string>('');
  const handleSubmit = async () => {
    setMessageToSend('');
    // send message
  };
  return (
    <div className=" h-12">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full items-center gap-2">
          <input
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
