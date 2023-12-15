'use server';

import { Unica_One } from 'next/font/google';
import { messagesTable, usersTable } from '../db/schema';
import { time } from 'console';
import { UUID } from 'crypto';
import { and, desc, eq, max, or } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';
import { union, unionAll } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/db';
import { NewUsers } from './adminActions';

//找出與自己有聊過天的使用者
//依據他們最後一則訊息進行時間排序並且顯示最後一則訊息
export const getConversations = async (userId: any) => {
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
    .groupBy(last_time.partner_id);
  // console.log(conversations);
  return conversations;
};

//依照時間排序出跟某個使用者的所有對話
export const getChatBox = async (selfId: UUID, targetId: UUID) => {
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
          eq(messagesTable.sender_id, selfId),
          eq(messagesTable.receiver_id, targetId),
        ),
        and(
          eq(messagesTable.sender_id, targetId),
          eq(messagesTable.receiver_id, selfId),
        ),
      ),
    )
    .orderBy(messagesTable.time_stamp);
  // console.log(chatBox);
  return chatBox;
};

//新增訊息
export const insertMessages = async (selfId: UUID, targetId: UUID, contents: string, time_stamp: any) => {
  const message = await db
    .insert(messagesTable)
    .values({
      sender_id: selfId,
      receiver_id: targetId,
      contents: contents,
      time_stamp: time_stamp,
    });
    return message;
};
