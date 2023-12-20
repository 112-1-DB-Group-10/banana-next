import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'default']);
export const sexEnum = pgEnum('sex', ['female', 'male', 'unknown']);
export const visibilityEnum = pgEnum('visibility', ['public', 'verified']);
export const verificationEnum = pgEnum('verification', [
  'pass',
  'fail',
  'pending',
]);

export const usersTable = pgTable('users', {
  username: text('username').notNull(),
  sex: sexEnum('sex').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
  role: roleEnum('role').notNull().default('default'),
  suspended: boolean('suspended').notNull().default(false),
  user_id: uuid('user_id').notNull().primaryKey(),
  avatar: text('avatar').notNull(),
});

export const cardsTable = pgTable('cards', {
  card_id: uuid('card_id').notNull().primaryKey(),
  deleted: boolean('deleted').notNull().default(false),
  contents: text('contents').notNull(),
  created_time: timestamp('created_time').notNull(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => usersTable.user_id),
  updated_time: timestamp('updated_time').notNull(),
  visibility: visibilityEnum('visibility').notNull().default('public'),
  suspended: boolean('suspended').notNull().default(false),
});

export const messagesTable = pgTable(
  'messages',
  {
    sender_id: uuid('sender_id')
      .notNull()
      .references(() => usersTable.user_id),
    receiver_id: uuid('receiver_id')
      .notNull()
      .references(() => usersTable.user_id),
    time_stamp: timestamp('time_stamp').notNull().defaultNow(),
    contents: text('contents').notNull(),
  },
  (table) => {
    return {
      pkWithCustomName: primaryKey({
        name: 'message_pk',
        columns: [table.sender_id, table.receiver_id, table.time_stamp],
      }),
    };
  },
);

export const applicationsTable = pgTable('applications', {
  user_id: uuid('user_id')
    .notNull()
    .references(() => usersTable.user_id),
  englishname: text('englishname').notNull(),
  enroll_year: integer('enroll_year').notNull(),
  verification: verificationEnum('verification').notNull().default('pending'),
  institute: text('institute').notNull(),
  document_url: text('document_url').notNull(),
  time_stamp: timestamp('time_stamp').defaultNow(),
});

export const likesTable = pgTable(
  'likes',
  {
    user_id: uuid('user_id')
      .notNull()
      .references(() => usersTable.user_id),
    card_id: uuid('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    time_stamp: timestamp('time_stamp').notNull().defaultNow(),
  },
  (table) => {
    return {
      likes_pk: primaryKey({
        name: 'likes_pk',
        columns: [table.user_id, table.card_id],
      }),
    };
  },
);

export const commentsTable = pgTable(
  'comments',
  {
    user_id: uuid('user_id')
      .notNull()
      .references(() => usersTable.user_id),
    card_id: uuid('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    time_stamp: timestamp('time_stamp').notNull().defaultNow(),
    contents: text('contents').notNull(),
  },
  (table) => {
    return {
      comments_pk: primaryKey({
        name: 'comments_pk',
        columns: [table.user_id, table.card_id, table.time_stamp],
      }),
    };
  },
);

export const locationsTable = pgTable('locations', {
  location_name: text('location_name').notNull().primaryKey(),
});

export const locatedAtTable = pgTable(
  'located_at',
  {
    card_id: uuid('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    location_name: text('location_name')
      .notNull()
      .references(() => locationsTable.location_name),
  },
  (table) => {
    return {
      located_at_pk: primaryKey({
        name: 'located_at_pk',
        columns: [table.location_name, table.card_id],
      }),
    };
  },
);

export const labelsTable = pgTable('labels', {
  label_name: text('label_name').notNull().primaryKey(),
  created_user: uuid('created_user')
    .notNull()
    .references(() => usersTable.user_id),
});

export const topicsTable = pgTable('topics', {
  topic_name: text('topic_name').notNull().primaryKey(),
});

export const belongsToTable = pgTable(
  'belongs_to',
  {
    label_name: text('label_name')
      .notNull()
      .references(() => labelsTable.label_name),
    topic_name: text('topic_name')
      .notNull()
      .references(() => topicsTable.topic_name),
  },
  (table) => {
    return {
      belongs_to_pk: primaryKey({
        name: 'belongs_to_pk',
        columns: [table.label_name, table.topic_name],
      }),
    };
  },
);

export const goodAtTable = pgTable(
  'good_at',
  {
    card_id: uuid('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    label_name: text('label_name')
      .notNull()
      .references(() => labelsTable.label_name),
  },
  (table) => {
    return {
      goodAt_pk: primaryKey({
        name: 'good_at_pk',
        columns: [table.card_id, table.label_name],
      }),
    };
  },
);

export const wantToLearnTable = pgTable(
  'want_to_learn',
  {
    card_id: uuid('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    label_name: text('label_name')
      .notNull()
      .references(() => labelsTable.label_name),
  },
  (table) => {
    return {
      want_to_learn_pk: primaryKey({
        name: 'want_to_learn_pk',
        columns: [table.card_id, table.label_name],
      }),
    };
  },
);
