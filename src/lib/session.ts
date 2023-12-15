import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { usersTable } from '@/db/schema';

export const session = async ({ session, token }: any) => {
  if (token.email) {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, token.email as string));
    if (existingUser.length > 0) {
      session.user = existingUser[0];
    }
  } else {
    session.user = null;
  }
  return session;
};

export const getUserSession = async () => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  if (!authUserSession || !authUserSession.user) return null;
  return authUserSession?.user;
};
