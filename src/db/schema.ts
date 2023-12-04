import type { AdapterAccount } from '@auth/core/adapters';
import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

// Follows Table
export const followsTable = pgTable(
  'follows',
  {
    followerUid: text('follower_uid')
      .notNull()
      .references(() => users.id, {}),
    followingUid: text('following_uid')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => ({
    followerIndex: index('follower_index').on(table.followerUid),
    followingIndex: index('following_index').on(table.followingUid),
  }),
);

// Likes Table
export const likes = pgTable(
  'likes',
  {
    senderUid: text('sender_uid')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    storySid: serial('story_sid')
      .notNull()
      .references(() => stories.sid, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => ({
    senderUidIndex: index('like_sender_uid_index').on(table.senderUid),
    storySidIndex: index('like_story_sid_index').on(table.storySid),
  }),
);

// Messages Table
export const messages = pgTable(
  'messages',
  {
    mid: serial('mid').primaryKey().unique(),
    content: varchar('content'),
    sendTime: timestamp('send_time'),
    senderUid: text('sender_uid')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    recipientUid: text('recipient_uid')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => ({
    senderUidIndex: index('sender_index').on(table.senderUid),
    recipientUidIndex: index('recipient_uid_index').on(table.recipientUid),
  }),
);

// Stories Table
export const stories = pgTable(
  'stories',
  {
    sid: serial('sid').primaryKey().unique(),
    content: varchar('text'),
    image: varchar('img'),
    expirationTime: timestamp('expiration_time'),
    authorUid: text('author_uid')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => ({
    authorUidIndex: index('author_uid_index').on(table.authorUid),
  }),
);
