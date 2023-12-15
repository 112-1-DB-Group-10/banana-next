<<<<<<< HEAD
"use server";

import { db } from '@/db';
import { usersTable, cardsTable, messagesTable, applicationsTable, likesTable, commentsTable, locationsTable, locatedAtTable, labelsTable, topicsTable, belongsToTable, goodAtTable, wantToLearnTable } from "@/db/schema";
import { asc, desc, count, sql, eq, and, like, isNull, inArray, SQL } from 'drizzle-orm';
import { PgUUID, QueryBuilder } from 'drizzle-orm/pg-core';
import { any } from 'zod';
import { UUID } from 'crypto';
import {v4 as uuidv4} from 'uuid';
import { comment } from 'postcss';
=======
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
>>>>>>> frontend

await client.connect();
const db = drizzle(client, { schema });

export type NewCard = typeof cardsTable.$inferInsert;
export type NewLike = typeof likesTable.$inferInsert;
export type NewComment = typeof commentsTable.$inferInsert;

<<<<<<< HEAD

const getLabelsByTopic = async (topic: string) => {
    try {
        const labels = await db
        .select({
            label_name: belongsToTable.label_name,
        })
        .from(belongsToTable)
        .where(eq(belongsToTable.topic_name, topic));
        console.log(labels);
        return labels;
    } catch (e: any) {
        console.log(e.message);
    }
};

const getPopularCards = async (verifiedUser: boolean, locations: Array<string>, cardPerPage: number, page: number) => {
    try {
        // let cardsInLocation;
        // if (locations) {
        //     const cardIdsInLocation = db
        //     .select({
        //         card_id: locatedAtTable.card_id,
        //     })
        //     .from(locatedAtTable)
        //     .where(inArray(locatedAtTable.location_name, locations))
        //     .as("cardIdsInLocations");

        //     cardsInLocation = db
        //     .$with('cardsInLocation')
        //     .as(
        //         db.select()
        //         .from(cardsTable)
        //         .innerJoin(cardIdsInLocation, eq(cardsTable.card_id, cardIdsInLocation.card_id))
        //     );
        // } else {
        //     cardsInLocation = db
        //     .$with('cardsInLocation')
        //     .as(
        //         db.select()
        //         .from(cardsTable)
        //     );
        // }

        // Subquery for likes
        const likesSubquery = db
            .select({
                card_id: likesTable.card_id,
                likeCount: count(likesTable.user_id).as("likeCount"),
            })
            .from(likesTable)
            .groupBy(likesTable.card_id)
            .as("likesSubquery");
    
        // Subquery for comments
        const commentsSubquery = db
            .select({
                card_id: commentsTable.card_id,
                commentCount: count(commentsTable.user_id).as("commentCount"),
            })
            .from(commentsTable)
            .groupBy(commentsTable.card_id)
            .as("commentsSubquery");
    
        const cardsLikedAndCommented = await db
            .with(likesSubquery, commentsSubquery)
            .select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
                commentCount: sql<number>`coalesce(${commentsSubquery.commentCount}, 0)`,
                likeCount: sql<number>`coalesce(${likesSubquery.likeCount}, 0)`,
            })
            .from(cardsTable)
            .leftJoin(commentsSubquery, eq(commentsSubquery.card_id, cardsTable.card_id))
            .leftJoin(likesSubquery, eq(likesSubquery.card_id, cardsTable.card_id))
            .where(
                and(
                    eq(cardsTable.deleted, false),
                    eq(cardsTable.suspended, false),
                    inArray(cardsTable.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
                )
            )
            .orderBy(desc(sql<number>`coalesce(${commentsSubquery.commentCount}, 0) * 3 + coalesce(${likesSubquery.likeCount}, 0)`))
            .limit(cardPerPage)
            .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
        
        console.log(cardsLikedAndCommented);
    
    } catch (e: any) {
        console.log(e.message);
    }
    

};

const getNewestCards = async (verifiedUser: boolean, locations: Array<string>, cardPerPage: number, page: number) => {
    

    const newCards = await db
=======
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
>>>>>>> frontend
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

<<<<<<< HEAD

const getCardsBySubstring = async (verifiedUser: boolean, mysubstring: string, locations: Array<string>, cardPerPage: number, page: number) => {


    const cards = await db
    .select()
    .from(cardsTable)
    .where(
        and(
            like(cardsTable.contents, `%${mysubstring}%`), 
            eq(cardsTable.deleted, false),
            eq(cardsTable.suspended, false),
            inArray(cardsTable.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
        )
=======
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
>>>>>>> frontend
    )
    .orderBy(cardsTable.created_time)
    .limit(cardPerPage)
    .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...

  console.log(cards);
  return cards;
};

<<<<<<< HEAD
const getCardsByLabel = async (verifiedUser: boolean, label: string, locations: Array<string>, cardPerPage: number, page: number) => {

    const cardIdsInLabel = db
    .select({
        card_id: goodAtTable.card_id,
        label_name: goodAtTable.label_name,
    })
=======
const getCardsByLabel = async (verifiedUser: boolean, label: string) => {
  const cardIdsInLabel = db
    .select()
>>>>>>> frontend
    .from(goodAtTable)
    .where(eq(goodAtTable.label_name, label))
    .as('cardIDInLabels');

<<<<<<< HEAD

    const cards = await db
    .select({
        card_id: cardsTable.card_id,
        deleted: cardsTable.deleted,
        contents: cardsTable.contents,
        created_time: cardsTable.created_time,
        user_id: cardsTable.user_id,
        updated_time: cardsTable.updated_time,
        visibility: cardsTable.visibility,
        suspended: cardsTable.suspended,
        labal_name: cardIdsInLabel.label_name
    })
=======
  const cards = await db
    .select()
>>>>>>> frontend
    .from(cardsTable)
    .innerJoin(cardIdsInLabel, eq(cardIdsInLabel.card_id, cardsTable.card_id))
    // .innerJoin(cardIdsInLocation, eq(cardIdsInLocation.card_id, cardsTable.card_id))
    .where(
<<<<<<< HEAD
        and(
            eq(cardsTable.deleted, false),
            eq(cardsTable.suspended, false), 
            inArray(cardsTable.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
        )
    )
    .limit(cardPerPage)
    .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
=======
      and(
        eq(cardsTable.deleted, false),
        eq(cardsTable.suspended, false),
        inArray(
          cardsTable.visibility,
          verifiedUser ? ['public', 'verified'] : ['public'],
        ),
      ),
    );
>>>>>>> frontend

  console.log(cards);
  return cards;
};

<<<<<<< HEAD

const getCardsByTopic = async (verifiedUser: boolean, topic: string, locations: Array<string>, cardPerPage: number, page: number) => {
    try {
        const labelsInTopic = db
        .select({
            topic_name: belongsToTable.topic_name,
            label_name: belongsToTable.label_name,
        })
        .from(belongsToTable)
        .where(eq(belongsToTable.topic_name, topic))
        .as("labelsInTopic");

        const cardIdsInLabels = db
        .select({
            card_id: goodAtTable.card_id,
            label_name: goodAtTable.label_name,
        })
        .from(goodAtTable)
        .innerJoin(labelsInTopic, eq(goodAtTable.label_name, labelsInTopic.label_name))
        .as("cardIDInLabels");
    
        // const cardIdsInLocation = db
        // .select({
        //     card_id: locatedAtTable.card_id,
        //     location_name: locatedAtTable.location_name,
        // })
        // .from(locatedAtTable)
        // .where(inArray(locatedAtTable.location_name, locations))
        // .as("cardIdsInLocations");
    
        const cards = await db
        .select({
            card_id: cardsTable.card_id,
            deleted: cardsTable.deleted,
            contents: cardsTable.contents,
            created_time: cardsTable.created_time,
            user_id: cardsTable.user_id,
            updated_time: cardsTable.updated_time,
            visibility: cardsTable.visibility,
            suspended: cardsTable.suspended,
            // topic_name: belongsToTable.topic_name,
            label_name: cardIdsInLabels.label_name,
        })
        .from(cardsTable)
        .innerJoin(cardIdsInLabels, eq(cardIdsInLabels.card_id, cardsTable.card_id))
        // .innerJoin(cardIdsInLocation, eq(cardIdsInLocation.card_id, cardsTable.card_id))
        .where(
            and(
                eq(cardsTable.deleted, false),
                eq(cardsTable.suspended, false), 
                inArray(cardsTable.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
            )
        )
        .limit(cardPerPage)
        .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
=======
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
>>>>>>> frontend

        console.log(cards);
        return cards;
    } catch (error) {
        console.log(error);
    }
};

<<<<<<< HEAD




const getCardsPostedByUser = async (userId: UUID, cardPerPage: number, page: number) => {
    try {
        const cards = await db
        .select()
        .from(cardsTable)
        .where(eq(cardsTable.user_id, userId))
        .limit(cardPerPage)
        .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
        
        console.log(cards);
        return cards;
    } catch (e) {
        console.log(e);
    }
}

const getCardsLikedOrCommentedByUser = async (userId: UUID, cardPerPage: number, page: number) => {
    try {
        const liked = db
        .select()
        .from(likesTable)
        .where(eq(likesTable.user_id, userId))
        .as("liked");

        const likedOrCommented = db
        .select({
            card_id: commentsTable.card_id
        })
        .from(commentsTable)
        .where(eq(commentsTable.user_id, userId))
        .fullJoin(liked, eq(liked.card_id, commentsTable.card_id))
        .as("likedOrCommented");

        const cards = await db
        .select()
        .from(cardsTable)
        .innerJoin(likedOrCommented, eq(likedOrCommented.card_id, cardsTable.card_id))
        .limit(cardPerPage)
        .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...

        console.log(cards);
        console.log(cards.length);
        console.log("getCardsLikedOrCommentedByUser");
        return cards;
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}
=======
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
>>>>>>> frontend

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

const getCardById = async (cardId: UUID) => {
    try {
        const card = await db
        .select()
        .from(cardsTable)
        .where(eq(cardsTable.card_id, cardId));

        console.log(card);
        return card;
    } catch (e: any) {
        console.log(e.message);
    }
};



export {
<<<<<<< HEAD
    getLabelsByTopic,

    getPopularCards,
    getNewestCards,

    getCardById,
    getCardsBySubstring,
    getCardsByLabel,
    getCardsByTopic,
    getCardsPostedByUser,
    getCardsLikedOrCommentedByUser,

    likeCard,
    commentOnCard,
    deleteCard,
    updateCard,
};

=======
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
>>>>>>> frontend
