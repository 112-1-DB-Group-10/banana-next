'use server';

import {
  applicationsTable,
  belongsToTable,
  cardsTable,
  labelsTable,
  locatedAtTable,
  locationsTable,
  topicsTable,
  usersTable,
} from '../db/schema';
import { UUID } from 'crypto';
import { and, desc, eq, like, max } from 'drizzle-orm';
import { db } from '@/db';
import { UserProfile } from './types';

export type NewApplications = typeof applicationsTable.$inferInsert;
export type NewTopics = typeof topicsTable.$inferInsert;
export type NewCards = typeof cardsTable.$inferInsert;
export type NewLabels = typeof labelsTable.$inferInsert;
export type NewUsers = typeof usersTable.$inferInsert;

//新增一筆 Applications
//user_id, englishname, enroll_year, verification, institute, document_url
export const insertApplication = async (application: NewApplications) => {
  try {
    const insertApplicationResult = await db
      .insert(applicationsTable)
      .values(application);
    console.log('Application inserted successfully!');
    return insertApplicationResult;
  } catch (error) {
    console.error('Error inserting application:', error);
    throw error;
  }
};

//刪除一筆 applications
export const deleteApplication = async (application: NewApplications) => {
  try {
    const deleteApplicationResult = await db
      .delete(applicationsTable)
      .where(
        and(
          eq(applicationsTable.user_id, application.user_id),
          eq(applicationsTable.englishname, application.englishname),
          eq(applicationsTable.enroll_year, application.enroll_year),
          eq(applicationsTable.institute, application.institute),
          eq(applicationsTable.document_url, application.document_url),
        ),
      );
    console.log('delete application success');
    return deleteApplicationResult;
  } catch (error) {
    console.error('Error deleting applications!:', error);
    throw error;
  }
};
//新增一個 topic
export const insertTopic = async (topic: NewTopics) => {
  try {
    const insertTopicResult = await db.insert(topicsTable).values(topic);
    console.log('Topic inserted successfully!');
    return insertTopicResult;
  } catch (error) {
    console.error('Error inserting topic:', error);
    throw error;
  }
};

//刪除一個 topic 但在這邊要先手動新增一個 topic 叫做'其他'不然會報錯 因為我們的 db 裡面沒有'其他'
export const deleteTopic = async (topic: NewTopics) => {
  try {
    const transactionResult = await db.transaction(async (tx) => {
      await tx
        .update(belongsToTable)
        .set({ topic_name: '其他' })
        .where(eq(belongsToTable.topic_name, topic.topic_name));
      await tx
        .delete(topicsTable)
        .where(eq(topicsTable.topic_name, topic.topic_name));
    });
    console.log('Topic deleted successfully!');
    return transactionResult;
  } catch (error) {
    console.log('Error deleting topic name: ', error);
    throw error;
  }
};

//新增一個新的 lable 到你想要的 topic 下面
export const insertBelongsTo = async (
  topic_name: string,
  label_name: string,
) => {
  try {
    const transactionResult = await db.transaction(async (tx) => {
      const insertBelongsToResult = await tx
        .insert(belongsToTable)
        .values({ topic_name: topic_name, label_name: label_name });
      return insertBelongsToResult;
    });
    return transactionResult;
  } catch (error) {
    console.error('Error inserting topic:', error);
    throw error;
  }
};

//將某個 label 移到新的 topic 下面
export const updateBelongsTo = async (
  new_topic: NewTopics,
  label: NewLabels,
) => {
  try {
    const transactionResult = await db.transaction(async (tx) => {
      await tx
        .update(belongsToTable)
        .set({ topic_name: new_topic.topic_name, label_name: label.label_name })
        .where(eq(belongsToTable.label_name, label.label_name));
    });
    console.log('Changed belongs to successfully!');
    return transactionResult;
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
    const transactionResult = await db.transaction(async (tx) => {
      const updatedApplication = await tx
        .update(applicationsTable)
        .set({ verification: status })
        .where(
          and(
            eq(applicationsTable.user_id, application.user_id),
            eq(applicationsTable.englishname, application.englishname),
            eq(applicationsTable.enroll_year, application.enroll_year),
            eq(applicationsTable.institute, application.institute),
            eq(applicationsTable.document_url, application.document_url),
          ),
        );
      return updatedApplication;
    });
    console.log('Changed belongs to successfully!');
    return transactionResult;
  } catch (error) {
    console.error('Error changing belongs:', error);
    throw error;
  }
};

// 找出使用者的 institute
export const findInstitute = async (user_id: any) => {
  try {
    const userInstitute = await db
      .select({
        institute: applicationsTable.institute,
      })
      .from(applicationsTable)
      .where(
        and(
          eq(applicationsTable.user_id, user_id),
          eq(applicationsTable.verification, 'pass'),
        ),
      )
      .orderBy(applicationsTable.enroll_year);
    console.log('Find Institute successfully!');
    return userInstitute;
  } catch (error) {
    console.error('Error Find Institute:', error);
    throw error;
  }
};

//新增地點
export const insertLocation = async (location_name: any) => {
  try {
    const insertedLocation = await db
      .insert(locationsTable)
      .values({ location_name: location_name });
    console.log('Insert Location successfully!');
    return insertedLocation;
  } catch (error) {
    console.error('Error Inserting Location:', error);
    throw error;
  }
};

//刪除地點
export const deleteLocation = async (location_name: any) => {
  try {
    const deletedLocation = await db
      .delete(locationsTable)
      .where(eq(locationsTable.location_name, location_name));
    console.log('Delete Location successfully!');
    return deletedLocation;
  } catch (error) {
    console.error('Error deleting Location:', error);
    throw error;
  }
};

//更新地點名稱
export const updateLocation = async (
  location_name: any,
  new_location_name: any,
) => {
  try {
    const transactionResult = await db.transaction(async (tx) => {
      const updatedLocation = await tx
        .update(locationsTable)
        .set({ location_name: new_location_name })
        .where(eq(locationsTable.location_name, location_name));
      return updatedLocation;
    });
    console.log('Update Location successfully!');
    return transactionResult;
  } catch (error) {
    console.error('Error updating Location:', error);
    throw error;
  }
};

//新增 located_at 資料
export const insertLocatedAt = async (location_name: any, card_id: any) => {
  try {
    const insertedLocation = await db
      .insert(locatedAtTable)
      .values({ location_name: location_name, card_id: card_id });
    console.log('Insert Located at successfully!');
    return insertedLocation;
  } catch (error) {
    console.error('Error inserting located at:', error);
    throw error;
  }
};

//更新 located_at 資料
export const updateLocatedAt = async (new_location_name: any, card_id: any) => {
  try {
    const transactionResult = await db.transaction(async (tx) => {
      const updatedLocatedAt = await tx
        .update(locatedAtTable)
        .set({ location_name: new_location_name })
        .where(eq(locatedAtTable.card_id, card_id));
      return updatedLocatedAt;
    });
    console.log('Insert Located at successfully!');
    return transactionResult;
  } catch (error) {
    console.error('Error inserting located at:', error);
    throw error;
  }
};

//新增某個 label 資料之後要記得在新增 belongs to
export const insertLabel = async (new_label: NewLabels) => {
  try {
    await db.insert(labelsTable).values({
      label_name: new_label.label_name,
      created_user: new_label.created_user,
    });
    await db
      .insert(belongsToTable)
      .values({ label_name: new_label.label_name, topic_name: '其他' });
    console.log('Insert label success!');
  } catch (error) {
    console.error('Error inserting label!:', error);
    throw error;
  }
};

//刪除某個 label
export const deleteLabel = async (target_label: string) => {
  try {
    await db
      .delete(belongsToTable)
      .where(eq(belongsToTable.label_name, target_label));
    await db
      .delete(labelsTable)
      .where(eq(labelsTable.label_name, target_label));
  } catch (error) {
    console.error('Error deleting label:', error);
    throw error;
  }
};

//查找所有 pass/pending/fail 的 application 紀錄
export const queryApplications = async (target_status: any) => {
  try {
    const targetUser = await db
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
    return targetUser;
  } catch (error) {
    console.error('Error finding application that match the status:', error);
    throw error;
  }
};

//新增使用者
export const insertUser = async (new_user: NewUsers) => {
  const users = await db.insert(usersTable).values(new_user);
  return users;
};

//停權某使用者
export const suspendUser = async (user_id: UUID) => {
  const transactionResult = await db.transaction(async (tx) => {
    const suspendedUser = tx
      .update(usersTable)
      .set({ suspended: true })
      .where(eq(usersTable.user_id, user_id));
    return suspendedUser;
  });
  return transactionResult;
};

//更改用戶資料
export const updateUser = async (updateUser: NewUsers) => {
  const transactionResult = await db.transaction(async (tx) => {
    const updatedUser = tx
      .update(usersTable)
      .set({
        username: updateUser.username,
        sex: updateUser.sex,
        age: updateUser.age,
        role: updateUser.role,
        avatar: updateUser.avatar,
      })
      .where(eq(usersTable.user_id, updateUser.user_id));
    return updatedUser;
  });
  return transactionResult;
};

// 回傳停權的用戶
export const getSuspendedUsers = async (
  page: number,
  userPerPage: number,
): Promise<UserProfile[]> => {
  const userInstitute = db
    .select({
      user_id: applicationsTable.user_id,
      institute: applicationsTable.institute,
    })
    .from(applicationsTable)
    .where(eq(applicationsTable.verification, 'pass'))
    .groupBy(applicationsTable.user_id, applicationsTable.institute)
    .orderBy(desc(max(applicationsTable.time_stamp)))
    .as('userInstitute');

  const suspendedUserInstitute = await db
    .select({
      avatar: usersTable.avatar,
      username: usersTable.username,
      institute: userInstitute.institute,
      sex: usersTable.sex,
      age: usersTable.age,
      email: usersTable.email,
      role: usersTable.role,
      suspended: usersTable.suspended,
      user_id: usersTable.user_id,
    })
    .from(userInstitute)
    .innerJoin(usersTable, eq(userInstitute.user_id, usersTable.user_id))
    .where(
      and(
        eq(userInstitute.user_id, usersTable.user_id),
        eq(usersTable.suspended, true),
      ),
    )
    .limit(userPerPage)
    .offset(userPerPage * (page - 1));
  // return suspendedUserInstitute;
  const mergeUsers = suspendedUserInstitute.map((user, index) => {
    return {
      ...user,
      avatar: user.avatar as string,
      username: user.username as string,
      institute: user.institute as string,
      sex: user.sex as string,
      age: user.age as number,
      email: user.email as string,
      role: user.role as string,
      suspended: user.suspended as boolean,
      user_id: user.user_id as string,
    };
  });
  return mergeUsers;
};

// 回傳一般的用戶
export const getDefaultUsers = async (
  page: number,
  userPerPage: number,
): Promise<UserProfile[]> => {
  const userInstitute = db
    .select({
      user_id: applicationsTable.user_id,
      institute: applicationsTable.institute,
    })
    .from(applicationsTable)
    .where(eq(applicationsTable.verification, 'pass'))
    .groupBy(applicationsTable.user_id, applicationsTable.institute)
    .orderBy(desc(max(applicationsTable.time_stamp)))
    .as('userInstitute');

  const defaultUserInstitute = await db
    .select({
      avatar: usersTable.avatar,
      username: usersTable.username,
      institute: userInstitute.institute,
      sex: usersTable.sex,
      age: usersTable.age,
      email: usersTable.email,
      role: usersTable.role,
      suspended: usersTable.suspended,
      user_id: usersTable.user_id,
    })
    .from(userInstitute)
    .innerJoin(usersTable, eq(userInstitute.user_id, usersTable.user_id))
    .where(
      and(
        eq(userInstitute.user_id, usersTable.user_id),
        eq(usersTable.suspended, false),
      ),
    )
    .limit(userPerPage)
    .offset(userPerPage * (page - 1));
  // return suspendedUserInstitute;
  const mergeUsers = defaultUserInstitute.map((user, index) => {
    return {
      ...user,
      avatar: user.avatar as string,
      username: user.username as string,
      institute: user.institute as string,
      sex: user.sex as string,
      age: user.age as number,
      email: user.email as string,
      role: user.role as string,
      suspended: user.suspended as boolean,
      user_id: user.user_id as string,
    };
  });
  return mergeUsers;
};

export const getUsersbySubstring = async (
  suspendedUser: boolean,
  mysubstring: string,
  cardPerPage: number,
  page: number,
): Promise<UserProfile[]> => {
  // Subquery for institute
  const instituteForUsers = db
    .select({
      user_id: applicationsTable.user_id,
      institute: applicationsTable.institute,
    })
    .from(applicationsTable)
    .where(eq(applicationsTable.verification, 'pass'))
    .groupBy(applicationsTable.user_id, applicationsTable.institute)
    .orderBy(desc(max(applicationsTable.time_stamp)))
    .as('instituteForUsers');

  let users = await db
    .with(instituteForUsers)
    .select({
      username: usersTable.username,
      sex: usersTable.sex,
      age: usersTable.age,
      email: usersTable.email,
      role: usersTable.role,
      suspended: usersTable.suspended,
      user_id: usersTable.user_id,
      avatar: usersTable.avatar,
      institute: instituteForUsers.institute,
    })
    .from(usersTable)
    .innerJoin(
      instituteForUsers,
      eq(usersTable.user_id, instituteForUsers.user_id),
    )
    .where(
      and(
        like(usersTable.username, `%${mysubstring}%`),
        eq(usersTable.suspended, suspendedUser),
      ),
    )
    .limit(cardPerPage)
    .offset(cardPerPage * (page - 1)); // indexing: page 1, page 2, page 3, ...

  const mergedUsers = users.map((user, index) => {
    return {
      ...user,
      avatar: user.avatar as string,
      username: user.username as string,
      sex: user.sex as 'female' | 'male' | 'unknown',
      age: user.age as number,
      email: user.email as string,
      role: user.role as 'admin' | 'default',
      suspended: user.suspended as boolean,
      user_id: user.user_id as string,
      institute: user.institute,
    };
  });

  //console.log(mergedCards);
  return mergedUsers;
};
