'use server';

import {
  applicationsTable,
  belongsToTable,
  cardsTable,
  labelsTable,
  locatedAtTable,
  locationsTable,
  topicsTable,
} from '../db/schema';
import exp from 'constants';
import { UUID } from 'crypto';
import { eq, gt, lt, gte, ne, or, sql, max, desc, and } from 'drizzle-orm';
import { db } from '@/db';

export type NewApplications = typeof applicationsTable.$inferInsert;
export type NewTopics = typeof topicsTable.$inferInsert;
export type NewCards = typeof cardsTable.$inferInsert;
export type NewLabels = typeof labelsTable.$inferInsert;

//新增一筆 Applications
//user_id, englishname, enroll_year, verification, institute, document_url
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

//新增一個新的 lable 到你想要的 topic 下面
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

//將某個 label 移到新的 topic 下面
export const updateBelongsTo = async (
  new_topic: NewTopics,
  label_name: any,
) => {
  try {
    const a = await db
      .delete(belongsToTable)
      .where(eq(label_name, belongsToTable.label_name));
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

//更改某個 application 的狀態
export const updateApplication = async (
  application: NewApplications,
  status: any,
) => {
  try {
    const t = await db
      .update(applicationsTable)
      .set({ verification: status})
      .where(
        and(
          eq(applicationsTable.user_id, application.user_id),
          eq(applicationsTable.englishname, application.englishname),
          eq(applicationsTable.enroll_year, application.enroll_year),
          eq(applicationsTable.institute, application.institute),
          eq(applicationsTable.document_url, application.document_url),
        )
      );
    console.log('Changed belongs to successfully!');
    return t;
  } catch (error) {
    console.error('Error changing belongs:', error);
    throw error;
  }
};

// 找出使用者的 institute
export const findInstitute = async (
  user_id: any
) => {
  try {
    const t = await db
    .select({
      institute: applicationsTable.institute,
    })
    .from(applicationsTable)
    .where(
      and(
        eq(applicationsTable.user_id, user_id),
        eq(applicationsTable.verification, "pass"),
      )
    )
    .orderBy(applicationsTable.enroll_year);
    console.log('Find Institute successfully!');
    return t;
  } catch (error) {
    console.error('Error Find Institute:', error);
    throw error;
  }
};

//新增地點
export const insertLocation = async (
  location_name: any
) => {
  try {
    const t = await db
    .insert(locationsTable)
    .values({location_name: location_name});
    console.log('Insert Location successfully!');
    return t;
  } catch (error) {
    console.error('Error Inserting Location:', error);
    throw error;
  }
};

//刪除地點
export const deleteLocation = async (
  location_name: any
) => {
  try {
    const t = await db
    .delete(locationsTable)
    .where(eq(locationsTable.location_name, location_name));
    console.log('Delete Location successfully!');
    return t;
  } catch (error) {
    console.error('Error deleting Location:', error);
    throw error;
  }
};

//更新地點名稱
export const updateLocation = async (
  location_name: any,
  new_location_name: any
) => {
  try {
    const t = await db
    .update(locationsTable)
    .set({location_name: new_location_name})
    .where(eq(locationsTable.location_name, location_name));
    console.log('Update Location successfully!');
    return t;
  } catch (error) {
    console.error('Error updating Location:', error);
    throw error;
  }
};

//新增 located_at 資料
export const insertLocatedAt = async (
  location_name: any,
  card_id: any
) => {
  try {
    const t = await db
    .insert(locatedAtTable)
    .values({location_name: location_name, card_id: card_id});
    console.log('Insert Located at successfully!');
    return t;
  } catch (error) {
    console.error('Error inserting located at:', error);
    throw error;
  }
};

//更新 located_at 資料
export const updateLocatedAt = async (
  new_location_name: any,
  card_id: any
) => {
  try {
    const a = await db
    .update(locatedAtTable)
    .set({location_name: new_location_name})
    .where(eq(locatedAtTable.card_id, card_id));
    console.log('Insert Located at successfully!');
    return a;
  } catch (error) {
    console.error('Error inserting located at:', error);
    throw error;
  }
};

//新增某個 label 資料之後要記得在新增 belongs to
export const insertLabel = async (
  new_label: any,
  new_user: UUID,
) => {
  try {
    const a = await db
    .insert(labelsTable)
    .values({label_name: new_label, created_user: new_user});
    console.log('Insert label success!');
    return a;
  }catch(error){
    console.error('Error inserting label!:', error);
    throw error;
  }
};

//刪除某個 label
export const deleteLabel = async (
  target_label: any,
) =>{
  try {
    const a = await db
    .delete(labelsTable)
    .where(eq(labelsTable.label_name, target_label));
    console.log('Deleting label success!');
    return a;
  }catch(error){
    console.error('Error deleting label:', error);
    throw error;
  }
};

//查找所有 pass/pending/fail 的 application 紀錄
export const queryApplications = async (
  target_status: any,
) => {
  try {
    const a = await db
    .select({
      user_id: applicationsTable.user_id,
      enroll_year: applicationsTable.enroll_year,
      institute: applicationsTable.institute,
      userEnglishName: applicationsTable.englishname,
      documnet_url: applicationsTable.document_url,
    })
    .from(applicationsTable)
    .where(eq(applicationsTable.verification, target_status));
    console.log('find applications success!');
    return a;
  }catch(error){
    console.error('Error finding application that match the status:', error);
    throw error;
  }
};



