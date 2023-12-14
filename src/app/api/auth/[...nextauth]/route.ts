import { NextAuthOptions, Profile } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { v4 as uuid } from 'uuid';
import { client } from '@/db';
import { usersTable } from '@/db/schema';
import * as schema from '@/db/schema';
import { session } from '@/lib/session';

await client.connect();
const db = drizzle(client, { schema });

interface OAuthProfile extends Profile {
  picture?: string;
}

const addNewUserWithProfile = async (profile: OAuthProfile) => {
  const newUser = await db
    .insert(usersTable)
    .values({
      email: profile.email as string,
      user_id: uuid(),
      username: profile.name as string,
      sex: 'unknown',
      age: 0,
      avatar: profile.picture as string,
    })
    .returning();
  return newUser[0];
};

const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (profile) {
        const existingUser = await db
          .select({ username: usersTable.username })
          .from(usersTable)
          .where(eq(usersTable.email, profile.email as string));

        if (existingUser.length > 0) {
          console.log(
            `User '${existingUser[0].username}' logged in with Google.`,
          );
        } else {
          const newUser = await addNewUserWithProfile(profile);
          console.log(`Added new user '${newUser.username}' with Google.`);
        }
      } else {
        console.log('no profile');
        return false;
      }
      return true;
    },
    session,
    async jwt({ token, user, account, profile }) {
      if (profile) {
        const existingUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, profile.email as string));
        if (existingUser) {
          console.log(
            `User '${existingUser[0].username}' logged in with Google.`,
          );
        } else {
          const newUser = await addNewUserWithProfile(profile);
          console.log(`Added new user '${newUser.username}' with Google.`);
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
