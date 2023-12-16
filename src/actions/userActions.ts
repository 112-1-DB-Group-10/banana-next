'use server';

import { applicationsTable, usersTable } from '../db/schema';
import { UUID } from 'crypto';
import { and, eq } from 'drizzle-orm';
import { db } from '@/db';
import { UserProfile } from './types';

//透過 id 找到使用者以及他的 institute
export const getUserById = async (userId: UUID): Promise<UserProfile> => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.user_id, userId));

    const applications = await db
      .select({ institute: applicationsTable.institute })
      .from(applicationsTable)
      .where(
        and(
          eq(applicationsTable.user_id, userId),
          eq(applicationsTable.verification, 'pass'),
        ),
      );

    if (user.length > 0) {
      return {
        ...user[0],
        institute: applications.length > 0 ? applications[0].institute : null,
      };
    } else {
      throw Error('User Not Found.');
    }
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};
