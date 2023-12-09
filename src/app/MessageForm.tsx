'use client';

import { FormEvent, useState } from 'react';
import { addMessage } from '@/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MessageForm() {
  const [message, setMessage] = useState<string>('');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.currentTarget);
    addMessage(formData.get('message') as string);
    setMessage('');
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          name="message"
          value={message}
          onChange={(e) => {
            console.log(e);
            setMessage(e.target.value);
          }}
        ></Input>
        <Button>Add</Button>
      </form>
    </div>
  );
}
