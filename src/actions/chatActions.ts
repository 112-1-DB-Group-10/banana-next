'use server';

import { messagesTable, usersTable } from '../db/schema';
import { UUID } from 'crypto';
import { and, eq, max, or } from 'drizzle-orm';
import { union } from 'drizzle-orm/pg-core';
import { db } from '@/db';
import { Message } from '@/db/types';
import { Conversation } from './types';

export const getConversations = async (
  userId: UUID,
): Promise<Conversation[]> => {
  // 找出與自己有聊過天的使用者
  // 依據他們最後一則訊息進行時間排序並且顯示最後一則訊息
  const getSender = db
    .select({
      partner_id: messagesTable.sender_id,
      last_time_stamp: max(messagesTable.time_stamp).as('last_time_stamp'),
    })
    .from(messagesTable)
    .where(eq(messagesTable.receiver_id, userId))
    .groupBy(messagesTable.sender_id);

  const getReceiver = db
    .select({
      partner_id: messagesTable.receiver_id,
      last_time_stamp: max(messagesTable.time_stamp).as('last_time_stamp'),
    })
    .from(messagesTable)
    .where(eq(messagesTable.sender_id, userId))
    .groupBy(messagesTable.receiver_id);

  const unionResult = union(getSender, getReceiver).as('unionResult');
  const last_time = db
    .select({
      partner_id: unionResult.partner_id,
      last_time_stamp: max(unionResult.last_time_stamp).as('last_time_stamp'),
    })
    .from(unionResult)
    .groupBy(unionResult.partner_id)
    .as('last_time');
  const conversations = await db
    .select({
      partner_id: last_time.partner_id,
      last_time_stamp: max(last_time.last_time_stamp),
      contents: max(messagesTable.contents),
      avatar: usersTable.avatar,
      username: usersTable.username,
    })
    .from(last_time)
    .innerJoin(
      messagesTable,
      and(
        or(
          eq(messagesTable.receiver_id, last_time.partner_id),
          eq(messagesTable.sender_id, last_time.partner_id),
        ),
        eq(messagesTable.time_stamp, last_time.last_time_stamp),
      ),
    )
    .where(
      and(
        or(
          eq(messagesTable.receiver_id, last_time.partner_id),
          eq(messagesTable.sender_id, last_time.partner_id),
        ),
        eq(messagesTable.time_stamp, last_time.last_time_stamp),
      ),
    )
    .innerJoin(usersTable, eq(usersTable.user_id, last_time.partner_id))
    .groupBy(last_time.partner_id, usersTable.avatar, usersTable.username);
  // console.log(conversations);
  return conversations.map((conversation) => ({
    ...conversation,
    last_time_stamp: new Date(conversation.last_time_stamp as string),
    contents: conversation.contents as string,
  }));
};

export const getChatBox = async (
  userId: UUID,
  partnerId: UUID,
): Promise<Message[]> => {
  // 依照時間排序出跟某個使用者的所有對話
  const chatBox = await db
    .select({
      sender_id: messagesTable.sender_id,
      receiver_id: messagesTable.receiver_id,
      contents: messagesTable.contents,
      time_stamp: messagesTable.time_stamp,
    })
    .from(messagesTable)
    .where(
      or(
        and(
          eq(messagesTable.sender_id, userId),
          eq(messagesTable.receiver_id, partnerId),
        ),
        and(
          eq(messagesTable.sender_id, partnerId),
          eq(messagesTable.receiver_id, userId),
        ),
      ),
    )
    .orderBy(messagesTable.time_stamp);
  return chatBox;
};

export const sendMessages = async (
  userId: UUID,
  partnerId: UUID,
  contents: string,
) => {
  // 新增訊息
  const message = await db
    .insert(messagesTable)
    .values({
      sender_id: userId,
      receiver_id: partnerId,
      contents: contents,
      time_stamp: new Date(),
    })
    .returning();
  return message;
};
