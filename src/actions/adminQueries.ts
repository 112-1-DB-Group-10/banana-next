'use server';

import { applicationsTable, belongsToTable, cardsTable, labelsTable, topicsTable } from '../db/schema';
import { eq, gt, lt, gte, ne, or, sql, max, desc, and } from 'drizzle-orm';
import { db } from '@/db';
import { UUID } from 'crypto';
import exp from 'constants';

//新增一筆 Applications
//user_id, englishname, enroll_year, verification, institute, document_url
export type NewApplications = typeof applicationsTable.$inferInsert;
export type NewTopics = typeof topicsTable.$inferInsert;
export type NewCards = typeof cardsTable.$inferInsert;
export type NewLabels = typeof labelsTable.$inferInsert;

export const insertApplication = async (application: NewApplications) => {
  try {
    await db.insert(applicationsTable).values(application);
    console.log('Application inserted successfully!');
  } catch (error) {
    console.error('Error inserting application:', error);
    throw error;
  }
};
//新增一個 topic
export const insertTopic = async (topic: NewTopics) => {
    try {
      await db.insert(topicsTable).values(topic);
      console.log('Topic inserted successfully!');
    } catch (error) {
      console.error('Error inserting topic:', error);
      throw error;
    }
  };

//刪除一個 topic
export const deleteTopic = async (topic: NewTopics ) => {
    try {
        db.update(belongsToTable)
        .set({ topic_name: '其他' })
        .where(eq(belongsToTable.topic_name, topic.topic_name));
        await db.delete(topicsTable).where(eq(topicsTable.topic_name, topic.topic_name));
        console.log('Topic deleted successfully!');
    } catch (error){
        console.log('Error deleting topic name: ', error);
        throw error;
    }
};

export const insertBelongsTo = async (topic: NewTopics, label_name: any) => {
    try {
      await db.insert(belongsToTable).values({ topic_name: topic.topic_name, label_name: label_name });
      console.log('Topic inserted successfully!');
    } catch (error) {
      console.error('Error inserting topic:', error);
      throw error;
    }
  };

export const changeBelongsTo = async (new_topic: NewTopics, label_name: any) => {
    try {
        await db.update(belongsToTable)
        .set({topic_name: new_topic.topic_name, label_name: label_name })
        .where(eq(labelsTable.label_name, label_name));
      console.log('Changed belongs to successfully!');
    } catch (error) {
      console.error('Error changing belongs:', error);
      throw error;
    }
  };