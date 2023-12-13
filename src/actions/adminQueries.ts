'use server';

import {
  applicationsTable,
  belongsToTable,
  cardsTable,
  labelsTable,
  topicsTable,
} from '../db/schema';
import exp from 'constants';
import { UUID } from 'crypto';
import { eq, gt, lt, gte, ne, or, sql, max, desc, and } from 'drizzle-orm';
import { db } from '@/db';

//新增一筆 Applications
//user_id, englishname, enroll_year, verification, institute, document_url
export type NewApplications = typeof applicationsTable.$inferInsert;
export type NewTopics = typeof topicsTable.$inferInsert;
export type NewCards = typeof cardsTable.$inferInsert;
export type NewLabels = typeof labelsTable.$inferInsert;

export const insertApplication = async (application: NewApplications) => {
  try {
    const t = await db.insert(applicationsTable).values(application);
    console.log('Application inserted successfully!');
    return t;
  } catch (error) {
    console.error('Error inserting application:', error);
    throw error;
  }
};
//新增一個 topic
export const insertTopic = async (topic: NewTopics) => {
  try {
    const t = await db.insert(topicsTable).values(topic);
    console.log('Topic inserted successfully!');
    return t;
  } catch (error) {
    console.error('Error inserting topic:', error);
    throw error;
  }
};

//刪除一個 topic
export const deleteTopic = async (topic: NewTopics) => {
  try {
    const t = await db.update(belongsToTable)
      .set({ topic_name: '其他' })
      .where(eq(belongsToTable.topic_name, topic.topic_name));
    await db
      .delete(topicsTable)
      .where(eq(topicsTable.topic_name, topic.topic_name));
    console.log('Topic deleted successfully!');
    return t;
  } catch (error) {
    console.log('Error deleting topic name: ', error);
    throw error;
  }
};

export const insertBelongsTo = async (topic: NewTopics, label_name: any) => {
  try {
    const t = await db
      .insert(belongsToTable)
      .values({ topic_name: topic.topic_name, label_name: label_name });
    console.log('Topic inserted successfully!');
    return t;
  } catch (error) {
    console.error('Error inserting topic:', error);
    throw error;
  }
};

export const changeBelongsTo = async (
  new_topic: NewTopics,
  label_name: any,
) => {
  try {
    const t = await db
      .update(belongsToTable)
      .set({ topic_name: new_topic.topic_name, label_name: label_name })
      .where(eq(labelsTable.label_name, label_name));
    console.log('Changed belongs to successfully!');
    return t;
  } catch (error) {
    console.error('Error changing belongs:', error);
    throw error;
  }
};
