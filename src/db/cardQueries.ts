"use server";

import { db } from '@/db';
import { usersTable, cardsTable, messagesTable, applicationsTable, deletesTable, likesTable, commentsTable, locationsTable, locatedAtTable, labelsTable, topicsTable, belongsToTable, goodAtTable, wantToLearnTable } from "./schema";
import { asc, desc, count, sql, eq, and, like, isNull, inArray } from 'drizzle-orm';
import { any } from 'zod';

const hotness = (likesCount: number, commentCount: number): number => {
    return likesCount + commentCount;
}

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

const getNewestCards = async (verifiedUser: boolean, cardPerPage: number, page: number) => {
    const newCards = await db
    .select()
    .from(cardsTable)
    .where(
        and(
            eq(cardsTable.deleted, false),
            eq(cardsTable.suspended, false),
            inArray(cardsTable.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
        )
    )
    .orderBy(cardsTable.created_time)
    .limit(cardPerPage)
    .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...

    console.log(newCards);
    return newCards;
};


const searchCards = async (verifiedUser: boolean, mysubstring: string, cardPerPage: number, page: number) => {
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
    )
    .orderBy(cardsTable.created_time)
    .limit(cardPerPage)
    .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...

    console.log(cards);
    return cards;
};

const getCardsByLabel = async (verifiedUser: boolean, label: string) => {
    const cardIdInLabels = db
    .select({

        label_name: goodAtTable.label_name
    }
    )
    .from(goodAtTable)
    .where(eq(goodAtTable.label_name, label))
    .as("cardIDInLabels");

    const cards = await db
    .select()
    .from(cardsTable)
    .innerJoin(cardIdInLabels, eq(cardsTable.card_id, cardIdInLabels.card_id))
    .where(
        and(
            eq(cardsTable.deleted, false),
            eq(cardsTable.suspended, false), 
            inArray(cardsTable.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
        )
    )

    console.log(cards);
    return cards;
};





export { 
    getHotCards,
    getNewestCards,
    searchCards,
    getCardsByLabel,
};


