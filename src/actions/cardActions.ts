'use server';

import {
  cardsTable,
  commentsTable,
  goodAtTable,
  likesTable,
} from '../db/schema';
import { UUID } from 'crypto';
import { and, eq, inArray, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { client } from '@/db';
import * as schema from '@/db/schema';

await client.connect();
const db = drizzle(client, { schema });

export type NewCard = typeof cardsTable.$inferInsert;
export type NewLike = typeof likesTable.$inferInsert;
export type NewComment = typeof commentsTable.$inferInsert;
// type NewDelete = typeof deletesTable.$inferInsert;

const hotness = (likesCount: number, commentCount: number): number => {
  return likesCount + commentCount;
};

const getHotCards = async () => {
  // const likes = db.select({
  //     card_id: likesTable.card_id,
  //     likesCount: count(),
  // })
  // .from(likesTable)
  // .groupBy(likesTable.card_id)
  // .as("likes");
  // // const sq = db.select().from(users).where(eq(users.id, 42)).as('sq');
  // const result = await db.select({
  //     card_id: commentsTable.card_id,
  //     commentsCount: count(),
  //     likesCount: likes.likesCount
  // }).from(commentsTable)
  // .groupBy(commentsTable.card_id)
  // .fullJoin(likes, eq(commentsTable.card_id, likes.card_id));
  // // .orderBy(desc(sql<number>`hotness(likesCount, commentCount)`));
  // console.log(result);
  // console.log("hahah");
  // return result;
};

const getNewestCards = async (
  verifiedUser: boolean,
  cardPerPage: number,
  page: number,
) => {
  const newCards = await db
    .select()
    .from(cardsTable)
    .where(
      and(
        eq(cardsTable.deleted, false),
        eq(cardsTable.suspended, false),
        inArray(
          cardsTable.visibility,
          verifiedUser ? ['public', 'verified'] : ['public'],
        ),
      ),
    )
    .orderBy(cardsTable.created_time)
    .limit(cardPerPage)
    .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...

  console.log(newCards);
  return newCards;
};

const searchCards = async (
  verifiedUser: boolean,
  mysubstring: string,
  cardPerPage: number,
  page: number,
) => {
  const cards = await db
    .select()
    .from(cardsTable)
    .where(
      and(
        like(cardsTable.contents, `%${mysubstring}%`),
        eq(cardsTable.deleted, false),
        eq(cardsTable.suspended, false),
        inArray(
          cardsTable.visibility,
          verifiedUser ? ['public', 'verified'] : ['public'],
        ),
      ),
    )
    .orderBy(cardsTable.created_time)
    .limit(cardPerPage)
    .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...

  console.log(cards);
  return cards;
};

const getCardsByLabel = async (verifiedUser: boolean, label: string) => {
  const cardIdsInLabel = db
    .select()
    .from(goodAtTable)
    .where(eq(goodAtTable.label_name, label))
    .as('cardIDInLabels');

  const cards = await db
    .select()
    .from(cardsTable)
    .innerJoin(cardIdsInLabel, eq(cardsTable.card_id, cardIdsInLabel.card_id))
    .where(
      and(
        eq(cardsTable.deleted, false),
        eq(cardsTable.suspended, false),
        inArray(
          cardsTable.visibility,
          verifiedUser ? ['public', 'verified'] : ['public'],
        ),
      ),
    );

  console.log(cards);
  return cards;
};

const getCardsByTopic = async (verifiedUser: boolean, topic: string) => {
  // try {
  // const labelsInTopic = db
  // .select()
  // .from(belongsToTable)
  // .where(eq(belongsToTable.topic_name, topic))
  // .as("labelsInTopic");
  //     const cardIdsInLabels = db
  //     .select()
  //     .from(goodAtTable)
  //     .innerJoin(labelsInTopic, eq(goodAtTable.label_name, labelsInTopic.label_name))
  //     .as("cardIdsInLabels");
  //     const cards = await db
  //     .select()
  //     .from(cardsTable)
  //     .innerJoin(cardIdsInLabels, eq(cardsTable.card_id, cardIdsInLabels.card_id))
  //     .where(
  //         and(
  //             eq(cardsTable.deleted, false),
  //             eq(cardsTable.suspended, false),
  //             inArray(cardsTable.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
  //         )
  //     )
  //     console.log(cards);
  //     return cards;
  // } catch (error: any) {
  //     console.error('Error executing query:', error.message);
  //     throw error;
  // }
};

// type Filter = {
//     topic ? : string;
//     label ? : string;
//     location ? : string;
// };

// const getCardsByLocation = async (verifiedUser: boolean, filter: Filter) => {

//     const cards = {};

//     if (filter.topic) {

//     }
//     if (filter.label) {

//     }
//     if (filter.location) {

//     }

//     try {

//         // const

//         const cards = await db
//         .select()
//         .from(cardsTable)
//         .innerJoin(cardIdsInLabels, eq(cardsTable.card_id, cardIdsInLabels.card_id))
//         .where(
//             and(
//                 eq(cardsTable.deleted, false),
//                 eq(cardsTable.suspended, false),
//                 inArray(cardsTable.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
//             )
//         )
//         console.log(cards);
//         return cards;
//     } catch (e) {
//         console.log(e);
//     }

// };

const getCardsPostedByUser = async (userId: UUID) => {
  try {
    const cards = await db
      .select()
      .from(cardsTable)
      .where(eq(cardsTable.user_id, userId));

    console.log(cards);
    return cards;
  } catch (e) {
    console.log(e);
  }
};

const getCardsLikedOrCommentedByUser = async (userId: UUID) => {
  try {
    const liked = db
      .select()
      .from(likesTable)
      .where(eq(likesTable.user_id, userId))
      .as('liked');

    const likedOrCommented = db
      .select({
        card_id: commentsTable.card_id,
      })
      .from(commentsTable)
      .where(eq(commentsTable.user_id, userId))
      .fullJoin(liked, eq(liked.card_id, commentsTable.card_id))
      .as('likedOrCommented');

    const cards = await db
      .select()
      .from(cardsTable)
      .innerJoin(
        likedOrCommented,
        eq(likedOrCommented.card_id, cardsTable.card_id),
      );

    console.log(cards);
    console.log(cards.length);
    console.log('getCardsLikedOrCommentedByUser');
    return cards;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

const likeCard = async (like: NewLike) => {
  return db.insert(likesTable).values(like);
};

const commentOnCard = async (comment: NewComment) => {
  return db.insert(commentsTable).values(comment);
};

const deleteCard = async (cardId: UUID) => {
  try {
    console.log('deleting card');
    await db
      .update(cardsTable)
      .set({ deleted: true })
      .where(eq(cardsTable.card_id, cardId));
    console.log('card deleted');
  } catch (error: any) {
    console.log(error.message);
  }
};

const updateCard = async (
  cardId: UUID,
  updatedTime: Date,
  updatedText: string,
) => {
  try {
    console.log('updating card');
    await db
      .update(cardsTable)
      .set({
        updated_time: updatedTime,
        contents: updatedText,
      })
      .where(eq(cardsTable.card_id, cardId));
    console.log('card updated');
  } catch (error: any) {
    console.log(error.message);
  }
};

export {
  commentOnCard,
  deleteCard,
  getCardsByLabel,
  getCardsByTopic,
  getCardsLikedOrCommentedByUser,
  getCardsPostedByUser,
  getHotCards,
  getNewestCards,
  likeCard,
  searchCards,
  updateCard,
};
