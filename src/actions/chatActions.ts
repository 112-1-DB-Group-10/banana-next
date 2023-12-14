'use server';

import { messagesTable } from '../db/schema';
import { eq, gt, lt, gte, ne, or, sql, max, desc, and } from 'drizzle-orm';
import { db } from '@/db';
import { UUID } from 'crypto';
import { time } from 'console';

//找出與自己有聊過天的使用者
//依據他們最後一則訊息進行時間排序並且顯示最後一則訊息
export const getConversations = async (userId: UUID) => {
    const getSender = db
  .select({
    sender_id: messagesTable.sender_id,
    receiver_id: messagesTable.receiver_id,
    contents: max(messagesTable.contents),
    time_stamp: max(messagesTable.time_stamp),
  })
  .from(messagesTable)
  .where(
    eq(messagesTable.receiver_id, userId),
  )
  .groupBy(messagesTable.sender_id, messagesTable.receiver_id)
  .orderBy(desc(max(messagesTable.time_stamp)))
  .as('getSender');

const getReceiver = db
  .select({
    sender_id: messagesTable.sender_id,
    receiver_id: messagesTable.receiver_id,
    contents: max(messagesTable.contents),
    time_stamp: max(messagesTable.time_stamp),
  })
  .from(messagesTable)
  .where(
    eq(messagesTable.sender_id, userId),
  )
  .groupBy(messagesTable.sender_id, messagesTable.receiver_id)
  .orderBy(desc(max(messagesTable.time_stamp)))
  .as('getReceiver');

const conversations = await db
  .select({
    sender_id: messagesTable.sender_id,
    receiver_id: messagesTable.receiver_id,
    contents: max(messagesTable.contents),
    time_stamp: max(messagesTable.time_stamp),
  })
  .from(messagesTable)
  .groupBy(messagesTable.receiver_id, messagesTable.sender_id)
  .innerJoin(getSender, eq(getSender.sender_id, messagesTable.sender_id))
  .innerJoin(getReceiver, eq(getReceiver.sender_id, messagesTable.receiver_id))
  .orderBy(desc(max(messagesTable.time_stamp)));
    //console.log(conversations);

    return conversations;
}
  

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
            )
        )
    )
    .orderBy(messagesTable.time_stamp)
    //console.log(chatBox);
    return chatBox;
}

// 聊天增加紀錄
export const insertMessages = async (
  sender_id: UUID, 
  receiver_id: UUID, 
  contents: string, 
  time_stamp: any
) => {
  try {
    const messages = await db
  .insert(messagesTable)
  .values({
    sender_id: sender_id,
    receiver_id: receiver_id,
    contents: contents,
    time_stamp: time_stamp
  });
    console.log('messages insert successfully!');
    return messages;
  } catch (error) {
    console.error('Error inserting messages:', error);
    throw error;
  }
};

