'use server';

import { getMessages } from '@/actions';
import MessageForm from './MessageForm';

export default async function HomePage() {
  const messages = await getMessages();
  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
        AAAA
      </div>
      <MessageForm />
    </div>
  );
}
