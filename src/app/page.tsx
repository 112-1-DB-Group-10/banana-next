'use server';

import { getMessages } from '@/actions';
import MessageForm from './MessageForm';

export default async function HomePage() {
  const messages = await getMessages();
  return (
    <div>
      <div>
        {messages.map((messages, index) => (
          <div key={index}>{messages.content}</div>
        ))}
      </div>
      {/* <MessageForm /> */}
    </div>
  );
}
