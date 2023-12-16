'use server';

import { applicationsTable, usersTable } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { db } from '@/db';
import { CardData, UserProfile } from './types';
import { findInstitute } from './adminActions';
import { findSourceMap } from 'module';

//透過 id 找到使用者以及他的 institute
export const getUserById = async (user_id: any) => {
  try {
    const user = await db
      .select({
        username: usersTable.username,
        sex: usersTable.sex,
        age: usersTable.age,
        email: usersTable.email,
        role: usersTable.role,
        suspended: usersTable.suspended,
        avatar: usersTable.avatar,
        institute: applicationsTable.institute,
      })
      .from(usersTable)
      .innerJoin(applicationsTable, eq(usersTable.user_id, applicationsTable.user_id))
      .where(
        and(
        and(
          eq(applicationsTable.user_id, user_id),
          eq(applicationsTable.verification, 'pass'),
        ),
        eq(usersTable.user_id, user_id)
        )
        );
    if (user.length > 0) {
      return user[0];
    } else {
      throw Error('User Not Found.');
    }
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};