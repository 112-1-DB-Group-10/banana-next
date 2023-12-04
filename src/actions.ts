'use server';

import { FormEvent } from 'react';
import { db } from '@/db';
import { messages } from '@/db/schema';

export const newStory = async (e: FormEvent<HTMLFormElement>) => {};

export const sendMessage = async (data: {
  senderUid: string;
  recipientUid: string;
  content: string;
}) => {
  await db.insert(messages).values({ ...data, sendTime: new Date() });
};
