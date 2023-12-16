'use server';

import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

//透過 id 找到使用者以及他的 institute
export const getUserById = async (user_id: any) => {
  try {
    const t = await db
      .select({
        username: usersTable.username,
        sex: usersTable.sex,
        age: usersTable.age,
        email: usersTable.email,
        role: usersTable.role,
        suspended: usersTable.suspended,
        avatar: usersTable.avatar,
      })
      .from(usersTable)
      .where(eq(usersTable.user_id, user_id));
    if (t.length > 0) {
      return t[0];
    } else {
      throw Error('User Not Found.');
    }
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};
