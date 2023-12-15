import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { client } from '@/db';
import * as schema from '@/db/schema';
import { usersTable } from '@/db/schema';

await client.connect();
const db = drizzle(client, { schema });

export const session = async ({ session, token }: any) => {
  // console.log(token);
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
