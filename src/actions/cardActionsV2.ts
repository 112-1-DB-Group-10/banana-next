"use server";

import { db } from '@/db';
import { usersTable, cardsTable, messagesTable, applicationsTable, likesTable, commentsTable, locationsTable, locatedAtTable, labelsTable, topicsTable, belongsToTable, goodAtTable, wantToLearnTable } from "@/db/schema";
import { CardData, CommentData, Topic, Conversation, UserProfile } from './types';
import { asc, desc, count, sql, eq, and, like, isNull, inArray, SQL } from 'drizzle-orm';
// import { PgUUID, QueryBuilder } from 'drizzle-orm/pg-core';
import { any } from 'zod';
import { UUID } from 'crypto';
import {v4 as uuidv4} from 'uuid';


export type NewCard = typeof cardsTable.$inferInsert;
export type NewLike = typeof likesTable.$inferInsert;
export type NewComment = typeof commentsTable.$inferInsert;



const getAllLabelsWithTopics = async () => {
    const topics = await db
    .select()
    .from(topicsTable);
    return topics;
};



export {
    getAllLabelsWithTopics,

    // /* 這個區塊裡都需要 location filter 功能，但我還沒寫好 */
    // getPopularCards,
    // getNewestCards,
    // // getCardById,
    // getCardsBySubstring,
    // getCardsByLabel, // Q1: 卡片是否回傳 label_name？ 還是前端弄就好？
    // getCardsByTopic, // Q2: 卡片是否回傳 label_name 與 topic_name？ 還是前端弄就好？
    
    // getCardsPostedByUser,
    // getCardsLikedOrCommentedByUser, // Q3: 卡片是否回傳 「按讚時間」 與 「留言時間」 ？還是前端弄就好？
    // /* 這個區塊裡都需要 location filter 功能，但我還沒寫好 */

    // likeCard, // Q4: 是否需要「取消按讚」功能，要的話要多一個函式
    // commentOnCard, // Q5: 是否需要「刪除留言」功能，要的話要多一個函式
    // deleteCard,
    // updateCard,
    // createCard,
};
