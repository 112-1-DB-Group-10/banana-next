'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { messagesTable } from './db/schema';

export const getMessages = async () => {
  const messages = await db
    .select({ id: messagesTable.id, content: messagesTable.content })
    .from(messagesTable);
  console.log(messages);
  return messages;
};

export const addMessage = async (message: string) => {
  const messages = await db.select({}).from(messagesTable);
  const addedMessage = await db
    .insert(messagesTable)
    .values({ id: (messages.length + 1).toString(), content: message });
  revalidatePath('/');
  return messages;
};
