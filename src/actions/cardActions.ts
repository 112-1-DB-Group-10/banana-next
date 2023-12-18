"use server";

import { db } from '@/db';
import { usersTable, cardsTable, messagesTable, applicationsTable, likesTable, commentsTable, locationsTable, locatedAtTable, labelsTable, topicsTable, belongsToTable, goodAtTable, wantToLearnTable } from "@/db/schema";
import { CardData, CommentData, Topic, Conversation, UserProfile } from './types';
import { asc, desc, count, sql, eq, and, like, isNull, inArray, SQL } from 'drizzle-orm';
// import { Pgstring, QueryBuilder } from 'drizzle-orm/pg-core';
import { any } from 'zod';
import { UUID } from 'crypto';
import {v4 as stringv4} from 'uuid';
import { userInfo } from 'os';
import { Card, GoodAt, WantToLearn, LocatedAt } from '@/db/types';


export type NewCard = typeof cardsTable.$inferInsert;
export type NewLike = typeof likesTable.$inferInsert;
export type NewComment = typeof commentsTable.$inferInsert;

const getLabelsByTopic = async (topic: string) => {
    try {
        const labels = await db
        .select({
            label_name: belongsToTable.label_name,
        })
        .from(belongsToTable)
        .where(eq(belongsToTable.topic_name, topic));
        // //console.log(labels);
        return labels;
    } catch (e: any) {
        //console.log(e.message);
    }
};

const getAllLabelsWithTopics = async (): Promise<Topic[]> => {
    const topics = await db
    .select()
    .from(topicsTable);
    // //console.log(topics);

    let topicWithLabels: Topic[] = [];
    for (let topic of topics) {
        const labelsOfTopic = await db
        .select()
        .from(belongsToTable)
        .where(eq(belongsToTable.topic_name, topic.topic_name));
        // //console.log(labelsOfTopic);
        let labels: string[] = [];
        labelsOfTopic.map((label) => {
            labels.push(label.label_name);
        });
        topicWithLabels.push({
            topic_name: topic.topic_name,
            labels: labels
        });
    }
    // //console.log(topicWithLabels);
    return topicWithLabels;
};

const getLocationsByCardId = async (cardId: string): Promise<string[]> => {
    // //console.log("cardId: ", cardId);
    let locations: string[] = [];
    const locationsByCardId = await db
    .select({ location_name: locatedAtTable.location_name })
    .from(locatedAtTable) 
    .where(eq(locatedAtTable.card_id, cardId));
    // //console.log(locationsByCardId);
    locationsByCardId.map((location) => {
        locations.push(location.location_name);
    });
    return locations;
};

const getInstituteByUserId = async (userId: string): Promise<string> => {
    const institutePackage = await db
    .select({ 
        institute: applicationsTable.institute
    })
    .from(applicationsTable)
    .where(eq(applicationsTable.user_id, userId));
    // //console.log(institutePackage);
    const institute = ((institutePackage.length==0) ? "" : institutePackage[0].institute);
    return institute;
};

const getWantToLearnByCardId = async (cardId: string): Promise<string[]> => {
    const wantToLearn = await db
    .select({
        label_name: wantToLearnTable.label_name,
    })
    .from(wantToLearnTable)
    .where(eq(wantToLearnTable.card_id, cardId));
    let wantToLearnArray:string[] = [];
    for (let want of wantToLearn) {
        wantToLearnArray.push(want.label_name);
    }
    return wantToLearnArray;
};

const getGoodAtByCardId = async (cardId: string): Promise<string[]> => {
    const goodAt = await db
    .select({
        label_name: goodAtTable.label_name,
    })
    .from(goodAtTable)
    .where(eq(goodAtTable.card_id, cardId));
    let goodAtArray:string[] = [];
    for (let ga of goodAt) {
        goodAtArray.push(ga.label_name);
    }
    return goodAtArray;
};

const getPopularCards = async (verifiedUser: boolean, locations: Array<string>, cardPerPage: number, page: number): Promise<CardData[]> => {
    let cardsInLocation;
    if (locations.length == 0) {
        // //console.log("nothing");
        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
        );
    } else {
        // //console.log(locations);
        const cardIdsInLocation = db
        .select({
            card_id: locatedAtTable.card_id,
        })
        .from(locatedAtTable)
        .where(inArray(locatedAtTable.location_name, locations))
        .as("cardIdsInLocations");

        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
            .innerJoin(cardIdsInLocation, eq(cardsTable.card_id, cardIdsInLocation.card_id))
        );
    }

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
    
    const cards = await db
        .with(likesSubquery, commentsSubquery, cardsInLocation)
        .select({
            card_id: cardsInLocation.card_id,
            user_id: cardsInLocation.user_id,
            username: usersTable.username,
            avatar: usersTable.avatar,
            contents: cardsInLocation.contents,
            created_time: cardsInLocation.created_time,
            updated_time: cardsInLocation.updated_time,
            visibility: cardsInLocation.visibility,
            deleted: cardsInLocation.deleted,
            suspended: cardsInLocation.suspended,
            num_likes: sql<number>`coalesce(${likesSubquery.likeCount}, 0)`,
            num_comments: sql<number>`coalesce(${commentsSubquery.commentCount}, 0)`,
        })
        .from(cardsInLocation)
        .leftJoin(commentsSubquery, eq(commentsSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(likesSubquery, eq(likesSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(usersTable, eq(usersTable.user_id, cardsInLocation.user_id))
        .where(
            and(
                eq(cardsInLocation.deleted, false),
                eq(cardsInLocation.suspended, false),
                inArray(cardsInLocation.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
            )
        )
        .orderBy(desc(sql<number>`coalesce(${commentsSubquery.commentCount}, 0) * 3 + coalesce(${likesSubquery.likeCount}, 0)`))
        .limit(cardPerPage)
        .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
    
        
    let cardLocationsArray: string[][] = [];
    let cardInstituteArray: string[] = [];
    let cardWantToLearnArray: string[][] = [];
    let cardGoodAtArray: string[][] = [];
    for (let card of cards) {
        cardLocationsArray.push(await getLocationsByCardId(card.card_id));
        cardInstituteArray.push(await getInstituteByUserId(card.card_id));
        cardWantToLearnArray.push(await getWantToLearnByCardId(card.card_id));
        cardGoodAtArray.push(await getGoodAtByCardId(card.card_id));
    }

    const mergedCards = cards.map((card, index) => {
        return {
            ...card,
            avatar: card.avatar as string,
            username: card.username as string,
            locations: cardLocationsArray[index],
            institute: cardInstituteArray[index],
            want_to_learn: cardWantToLearnArray[index],
            good_at: cardGoodAtArray[index],
        }
    });

    // //console.log(mergedCards);
    return mergedCards;
}

const getNewestCards = async (verifiedUser: boolean, locations: Array<string>, cardPerPage: number, page: number ): Promise<CardData[]> => {
    let cardsInLocation;
    if (locations.length == 0) {
        // //console.log("nothing");
        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
        );
    } else {
        // //console.log(locations);
        const cardIdsInLocation = db
        .select({
            card_id: locatedAtTable.card_id,
        })
        .from(locatedAtTable)
        .where(inArray(locatedAtTable.location_name, locations))
        .as("cardIdsInLocations");

        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
            .innerJoin(cardIdsInLocation, eq(cardsTable.card_id, cardIdsInLocation.card_id))
        );
    }

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
    
    let cards = await db
        .with(likesSubquery, commentsSubquery, cardsInLocation)  
        .select({
            card_id: cardsInLocation.card_id,
            user_id: cardsInLocation.user_id,
            username: usersTable.username,
            avatar: usersTable.avatar,
            contents: cardsInLocation.contents,
            created_time: cardsInLocation.created_time,
            updated_time: cardsInLocation.updated_time,
            visibility: cardsInLocation.visibility,
            deleted: cardsInLocation.deleted,
            suspended: cardsInLocation.suspended,
            num_likes: sql<number>`coalesce(${likesSubquery.likeCount}, 0)`,
            num_comments: sql<number>`coalesce(${commentsSubquery.commentCount}, 0)`,
        })
        .from(cardsInLocation)
        .leftJoin(commentsSubquery, eq(commentsSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(likesSubquery, eq(likesSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(usersTable, eq(usersTable.user_id, cardsInLocation.user_id))
        .where(
            and(
                eq(cardsInLocation.deleted, false),
                eq(cardsInLocation.suspended, false),
                inArray(cardsInLocation.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
            )
        )
        .orderBy(desc(cardsInLocation.created_time))
        .limit(cardPerPage)
        .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
    
        let cardLocationsArray: string[][] = [];
        let cardInstituteArray: string[] = [];
        let cardWantToLearnArray: string[][] = [];
        let cardGoodAtArray: string[][] = [];
        for (let card of cards) {
            cardLocationsArray.push(await getLocationsByCardId(card.card_id));
            cardInstituteArray.push(await getInstituteByUserId(card.card_id));
            cardWantToLearnArray.push(await getWantToLearnByCardId(card.card_id));
            cardGoodAtArray.push(await getGoodAtByCardId(card.card_id));
        }
    
        const mergedCards = cards.map((card, index) => {
            return {
                ...card,
                avatar: card.avatar as string,
                username: card.username as string,
                locations: cardLocationsArray[index],
                institute: cardInstituteArray[index],
                want_to_learn: cardWantToLearnArray[index],
                good_at: cardGoodAtArray[index],
            }
        });
    
        // //console.log(mergedCards);
        return mergedCards;
};

const getCardsBySubstring = async (verifiedUser: boolean, mysubstring: string, locations: Array<string>, cardPerPage: number, page: number): Promise<CardData[]> => {
    let cardsInLocation;
    if (locations.length == 0) {
        // //console.log("nothing");
        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
        );
    } else {
        //console.log(locations);
        const cardIdsInLocation = db
        .select({
            card_id: locatedAtTable.card_id,
        })
        .from(locatedAtTable)
        .where(inArray(locatedAtTable.location_name, locations))
        .as("cardIdsInLocations");

        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
            .innerJoin(cardIdsInLocation, eq(cardsTable.card_id, cardIdsInLocation.card_id))
        );
    }

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
    
    let cards = await db
        .with(likesSubquery, commentsSubquery, cardsInLocation)
        .select({
            card_id: cardsInLocation.card_id,
            user_id: cardsInLocation.user_id,
            username: usersTable.username,
            avatar: usersTable.avatar,
            contents: cardsInLocation.contents,
            created_time: cardsInLocation.created_time,
            updated_time: cardsInLocation.updated_time,
            visibility: cardsInLocation.visibility,
            deleted: cardsInLocation.deleted,
            suspended: cardsInLocation.suspended,
            num_likes: sql<number>`coalesce(${likesSubquery.likeCount}, 0)`,
            num_comments: sql<number>`coalesce(${commentsSubquery.commentCount}, 0)`,
        })
        .from(cardsInLocation)
        .leftJoin(commentsSubquery, eq(commentsSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(likesSubquery, eq(likesSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(usersTable, eq(usersTable.user_id, cardsInLocation.user_id))
        .where(
            and(
                like(cardsInLocation.contents, `%${mysubstring}%`), 
                eq(cardsInLocation.deleted, false),
                eq(cardsInLocation.suspended, false),
                inArray(cardsInLocation.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
            )
        )
        .orderBy(desc(cardsInLocation.created_time))
        .limit(cardPerPage)
        .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
    
        
        let cardLocationsArray: string[][] = [];
        let cardInstituteArray: string[] = [];
        let cardWantToLearnArray: string[][] = [];
        let cardGoodAtArray: string[][] = [];
        for (let card of cards) {
            cardLocationsArray.push(await getLocationsByCardId(card.card_id));
            cardInstituteArray.push(await getInstituteByUserId(card.card_id));
            cardWantToLearnArray.push(await getWantToLearnByCardId(card.card_id));
            cardGoodAtArray.push(await getGoodAtByCardId(card.card_id));
        }
    
        const mergedCards = cards.map((card, index) => {
            return {
                ...card,
                avatar: card.avatar as string,
                username: card.username as string,
                locations: cardLocationsArray[index],
                institute: cardInstituteArray[index],
                want_to_learn: cardWantToLearnArray[index],
                good_at: cardGoodAtArray[index],
            }
        });
    
        //console.log(mergedCards);
        return mergedCards;
};

const getCardsByLabel = async (verifiedUser: boolean, label: string, locations: Array<string>, cardPerPage: number, page: number): Promise<CardData[]> => {
    let cardsInLocation;
    if (locations.length == 0) {
        //console.log("nothing");
        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
        );
    } else {
        //console.log(locations);
        const cardIdsInLocation = db
        .select({
            card_id: locatedAtTable.card_id,
        })
        .from(locatedAtTable)
        .where(inArray(locatedAtTable.location_name, locations))
        .as("cardIdsInLocations");

        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
            .innerJoin(cardIdsInLocation, eq(cardsTable.card_id, cardIdsInLocation.card_id))
        );
    }

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

    const cardIdsInLabel = db
        .select({
            card_id: goodAtTable.card_id,
            label_name: goodAtTable.label_name,
        })
        .from(goodAtTable)
        .where(eq(goodAtTable.label_name, label))
        .as("cardIDInLabels");
    
    let cards = await db
        .with(likesSubquery, commentsSubquery, cardsInLocation)
        .select({
            card_id: cardsInLocation.card_id,
            user_id: cardsInLocation.user_id,
            username: usersTable.username,
            avatar: usersTable.avatar,
            contents: cardsInLocation.contents,
            created_time: cardsInLocation.created_time,
            updated_time: cardsInLocation.updated_time,
            visibility: cardsInLocation.visibility,
            deleted: cardsInLocation.deleted,
            suspended: cardsInLocation.suspended,
            num_likes: sql<number>`coalesce(${likesSubquery.likeCount}, 0)`,
            num_comments: sql<number>`coalesce(${commentsSubquery.commentCount}, 0)`,
        })
        .from(cardsInLocation)
        .innerJoin(cardIdsInLabel, eq(cardIdsInLabel.card_id, cardsInLocation.card_id))
        .leftJoin(commentsSubquery, eq(commentsSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(likesSubquery, eq(likesSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(usersTable, eq(usersTable.user_id, cardsInLocation.user_id))
        .where(
            and( 
                eq(cardsInLocation.deleted, false),
                eq(cardsInLocation.suspended, false),
                inArray(cardsInLocation.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
            )
        )
        .orderBy(desc(cardsInLocation.created_time))
        .limit(cardPerPage)
        .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
    
        
        let cardLocationsArray: string[][] = [];
    let cardInstituteArray: string[] = [];
    let cardWantToLearnArray: string[][] = [];
    let cardGoodAtArray: string[][] = [];
    for (let card of cards) {
        cardLocationsArray.push(await getLocationsByCardId(card.card_id));
        cardInstituteArray.push(await getInstituteByUserId(card.card_id));
        cardWantToLearnArray.push(await getWantToLearnByCardId(card.card_id));
        cardGoodAtArray.push(await getGoodAtByCardId(card.card_id));
    }

    const mergedCards = cards.map((card, index) => {
        return {
            ...card,
            avatar: card.avatar as string,
            username: card.username as string,
            locations: cardLocationsArray[index],
            institute: cardInstituteArray[index],
            want_to_learn: cardWantToLearnArray[index],
            good_at: cardGoodAtArray[index],
        }
    });

    //console.log(mergedCards);
    return mergedCards;
};

const getCardsByTopic = async (verifiedUser: boolean, topic: string, locations: Array<string>, cardPerPage: number, page: number): Promise<CardData[]> => {
    let cardsInLocation;
    if (locations.length == 0) {
        //console.log("nothing");
        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
        );
    } else {
        //console.log(locations);
        const cardIdsInLocation = db
        .select({
            card_id: locatedAtTable.card_id,
        })
        .from(locatedAtTable)
        .where(inArray(locatedAtTable.location_name, locations))
        .as("cardIdsInLocations");

        cardsInLocation = db
        .$with('cardsInLocation')
        .as(
            db.select({
                card_id: cardsTable.card_id,
                deleted: cardsTable.deleted,
                contents: cardsTable.contents,
                created_time: cardsTable.created_time,
                user_id: cardsTable.user_id,
                updated_time: cardsTable.updated_time,
                visibility: cardsTable.visibility,
                suspended: cardsTable.suspended,
            })
            .from(cardsTable)
            .innerJoin(cardIdsInLocation, eq(cardsTable.card_id, cardIdsInLocation.card_id))
        );
    }

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
    
    let cards = await db
        .with(likesSubquery, commentsSubquery, cardsInLocation)
        .select({
            card_id: cardsInLocation.card_id,
            user_id: cardsInLocation.user_id,
            username: usersTable.username,
            avatar: usersTable.avatar,
            contents: cardsInLocation.contents,
            created_time: cardsInLocation.created_time,
            updated_time: cardsInLocation.updated_time,
            visibility: cardsInLocation.visibility,
            deleted: cardsInLocation.deleted,
            suspended: cardsInLocation.suspended,
            num_likes: sql<number>`coalesce(${likesSubquery.likeCount}, 0)`,
            num_comments: sql<number>`coalesce(${commentsSubquery.commentCount}, 0)`,
        })
        .from(cardsInLocation)
        .innerJoin(cardIdsInLabels, eq(cardIdsInLabels.card_id, cardsInLocation.card_id))
        .leftJoin(commentsSubquery, eq(commentsSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(likesSubquery, eq(likesSubquery.card_id, cardsInLocation.card_id))
        .leftJoin(usersTable, eq(usersTable.user_id, cardsInLocation.user_id))
        .where(
            and(
                eq(cardsInLocation.deleted, false),
                eq(cardsInLocation.suspended, false),
                inArray(cardsInLocation.visibility, verifiedUser ? ["public", "verified"] : ["public"]),
            )
        )
        .orderBy(desc(cardsInLocation.created_time))
        .limit(cardPerPage)
        .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
    
        
        let cardLocationsArray: string[][] = [];
        let cardInstituteArray: string[] = [];
        let cardWantToLearnArray: string[][] = [];
        let cardGoodAtArray: string[][] = [];
        for (let card of cards) {
            cardLocationsArray.push(await getLocationsByCardId(card.card_id));
            cardInstituteArray.push(await getInstituteByUserId(card.card_id));
            cardWantToLearnArray.push(await getWantToLearnByCardId(card.card_id));
            cardGoodAtArray.push(await getGoodAtByCardId(card.card_id));
        }
    
        const mergedCards = cards.map((card, index) => {
            return {
                ...card,
                user_id: card.user_id as string,
                avatar: card.avatar as string,
                username: card.username as string,
                locations: cardLocationsArray[index],
                institute: cardInstituteArray[index],
                want_to_learn: cardWantToLearnArray[index],
                good_at: cardGoodAtArray[index],
            }
        });
    
        //console.log(mergedCards);
        return mergedCards;
};

const getCardsPostedByUser = async (userId: string, cardPerPage: number, page: number): Promise<CardData[]> => {
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
    
    const cards = await db
    .select({
        card_id: cardsTable.card_id,
        user_id: cardsTable.user_id,
        username: usersTable.username,
        avatar: usersTable.avatar,
        contents: cardsTable.contents,
        created_time: cardsTable.created_time,
        updated_time: cardsTable.updated_time,
        visibility: cardsTable.visibility,
        deleted: cardsTable.deleted,
        suspended: cardsTable.suspended,
        num_likes: sql<number>`coalesce(${likesSubquery.likeCount}, 0)`,
        num_comments: sql<number>`coalesce(${commentsSubquery.commentCount}, 0)`,
    })
    .from(cardsTable)
    .leftJoin(commentsSubquery, eq(commentsSubquery.card_id, cardsTable.card_id))
    .leftJoin(likesSubquery, eq(likesSubquery.card_id, cardsTable.card_id))
    .leftJoin(usersTable, eq(usersTable.user_id, cardsTable.user_id))
    .where(eq(cardsTable.user_id, userId))
    .limit(cardPerPage)
    .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...
    let cardLocationsArray: string[][] = [];
    let cardInstituteArray: string[] = [];
    let cardWantToLearnArray: string[][] = [];
    let cardGoodAtArray: string[][] = [];
    for (let card of cards) {
        cardLocationsArray.push(await getLocationsByCardId(card.card_id));
        cardInstituteArray.push(await getInstituteByUserId(card.card_id));
        cardWantToLearnArray.push(await getWantToLearnByCardId(card.card_id));
        cardGoodAtArray.push(await getGoodAtByCardId(card.card_id));
    }

    const mergedCards = cards.map((card, index) => {
        return {
            ...card,
            avatar: card.avatar as string,
            username: card.username as string,
            locations: cardLocationsArray[index],
            institute: cardInstituteArray[index],
            want_to_learn: cardWantToLearnArray[index],
            good_at: cardGoodAtArray[index],
        }
    });

    //console.log(mergedCards);
    return mergedCards;
};



const getCardsLikedOrCommentedByUser = async (userId: string, cardPerPage: number, page: number): Promise<CardData[]> => {

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
    .select({
        card_id: cardsTable.card_id,
        author_id: cardsTable.user_id,
        username: usersTable.username,
        avatar: usersTable.avatar,
        contents: cardsTable.contents,
        created_time: cardsTable.created_time,
        updated_time: cardsTable.updated_time,
        visibility: cardsTable.visibility,
        deleted: cardsTable.deleted,
        suspended: cardsTable.suspended,
        num_likes: sql<number>`coalesce(${likesSubquery.likeCount}, 0)`,
        num_comments: sql<number>`coalesce(${commentsSubquery.commentCount}, 0)`,
        good_at: goodAtTable.label_name,
        want_to_learn: wantToLearnTable.label_name,
    })
    .from(cardsTable)
    .innerJoin(likedOrCommented, eq(likedOrCommented.card_id, cardsTable.card_id))
    .leftJoin(commentsSubquery, eq(commentsSubquery.card_id, cardsTable.card_id))
    .leftJoin(likesSubquery, eq(likesSubquery.card_id, cardsTable.card_id))
    .leftJoin(usersTable, eq(usersTable.user_id, cardsTable.user_id))
    .leftJoin(goodAtTable, eq(cardsTable.card_id, goodAtTable.card_id))
    .leftJoin(wantToLearnTable, eq(cardsTable.card_id, wantToLearnTable.card_id))
    .limit(cardPerPage)
    .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...

    let cardLocationsArray: string[][] = [];
    let cardInstituteArray: string[] = [];
    let cardWantToLearnArray: string[][] = [];
    let cardGoodAtArray: string[][] = [];
    for (let card of cards) {
        cardLocationsArray.push(await getLocationsByCardId(card.card_id));
        cardInstituteArray.push(await getInstituteByUserId(card.card_id));
        cardWantToLearnArray.push(await getWantToLearnByCardId(card.card_id));
        cardGoodAtArray.push(await getGoodAtByCardId(card.card_id));
    }

    const mergedCards = cards.map((card, index) => {
        return {
            ...card,
            user_id: card.author_id as string,
            avatar: card.avatar as string,
            username: card.username as string,
            locations: cardLocationsArray[index],
            institute: cardInstituteArray[index],
            want_to_learn: cardWantToLearnArray[index],
            good_at: cardGoodAtArray[index],
        }
    });

    //console.log(mergedCards);
    return mergedCards;
};


const getCommentsByCardId = async (cardId: string): Promise<CommentData[]> => {
        const comments = await db
        .select({
            card_id: commentsTable.card_id,
            user_id: commentsTable.user_id,
            avatar: usersTable.avatar,
            username: usersTable.username,
            time_stamp: commentsTable.time_stamp,
            contents: commentsTable.contents,
        })
        .from(commentsTable)
        .where(eq(commentsTable.card_id, cardId))
        .leftJoin(usersTable, eq(usersTable.user_id, commentsTable.user_id))
        //console.log(comments);

        const commentsWithRightType = comments.map((comment) => {
            return {
                ...comment,
                avatar: comment.avatar as string,
                username: comment.username as string,
            };
        });

        return commentsWithRightType;
};

const likeCard = async (like: NewLike) => {
    return db.insert(likesTable).values(like);
};

const unlikeCard = async (like: NewLike) => {
    await db
    .delete(likesTable)
    .where(
        and(
            eq(likesTable.card_id, like.card_id),
            eq(likesTable.user_id, like.user_id)
        )
    );
};

const commentOnCard = async (comment: NewComment) => {
    return db.insert(commentsTable).values(comment);
};


const deleteCard = async (cardId: string) => {
    //console.log("deleting card");
    await db.update(cardsTable)
    .set({ deleted: true })
    .where(eq(cardsTable.card_id, cardId));
    //console.log("card deleted");
};

const updateCard = async (cardId: string, updatedTime: Date, updatedText: string) => {
    //console.log("updating card");
    await db.update(cardsTable)
    .set({
        updated_time: updatedTime,
        contents: updatedText,
    })
    .where(eq(cardsTable.card_id, cardId));
    //console.log("card updated");
};

const createCard = async(card: Card) => {
    return db.insert(cardsTable).values(card);
};
const createWantToLearn = async(wantToLearn: WantToLearn) => {
    return db.insert(wantToLearnTable).values(wantToLearn);
};
const createGoodAt = async(goodAt: GoodAt) => {
    return db.insert(goodAtTable).values(goodAt);
};

const createLocatedAt = async(locatedAt: LocatedAt) => {
    return db.insert(locatedAtTable).values(locatedAt);
};

const handleNewCard = async (cardData: CardData) => {
    //console.log("creating card");
    const card: Card = {
        card_id: cardData.card_id,
        user_id: cardData.user_id,
        contents: cardData.contents,
        created_time: cardData.created_time,
        updated_time: cardData.updated_time,
        deleted: cardData.deleted,
        visibility: cardData.visibility,
        suspended: cardData.suspended,
    };
    await createCard(card);
    
    //console.log("creating want_to_learn");
    for (let wtl of cardData.want_to_learn) {
        await createWantToLearn({
            card_id: cardData.card_id,
            label_name: wtl,
        });
    }
    
    //console.log("creating good_at");
    for (let ga of cardData.good_at) {
        await createGoodAt({
            card_id: cardData.card_id,
            label_name: ga,
        });
    } 

    for (let loc of cardData.locations) {
        await createLocatedAt({
            location_name: loc,
            card_id: cardData.card_id
        })
    }
};



export {
    getAllLabelsWithTopics,//ok
    getLabelsByTopic,//ok
    getLocationsByCardId,//ok
    getInstituteByUserId,//ok
    getWantToLearnByCardId,//ok
    getGoodAtByCardId,//ok
    // /* 這個區塊裡都需要 location filter 功能，但我還沒寫好 */
    getPopularCards,//ok
    getNewestCards,//ok

    getCardsBySubstring,//ok
    getCardsByLabel,//ok
    getCardsByTopic,//ok
    
    getCardsPostedByUser,//ok
    getCardsLikedOrCommentedByUser,//ok

    getCommentsByCardId,//ok

    likeCard,//ok
    unlikeCard,//ok
    commentOnCard,//ok
    deleteCard,//ok
    createCard,//ok
    updateCard,//ok
    createWantToLearn,//ok
    createGoodAt,//ok
    createLocatedAt,//ok
    handleNewCard,//ok
};
