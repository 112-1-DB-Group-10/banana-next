import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'default']);
export const sexEnum = pgEnum('sex', ['female', 'male']);
export const visibilityEnum = pgEnum('visibility', ['public', 'verified']);
export const verificationEnum = pgEnum('verification', [
  'pass',
  'fail',
  'pending',
]);

export const usersTable = pgTable('users', {
  user_id: text('user_id').notNull().unique().primaryKey(),
  username: text('username').notNull().unique(),
  avatar: text('avatar').notNull(),
  age: integer('age').notNull(),
  role: roleEnum('role').notNull().default('default'),
  sex: sexEnum('sex').notNull(),
  email: text('email').notNull().unique(),
  suspended: boolean('suspended').notNull().default(false),
});

export const cardsTable = pgTable('cards', {
  card_id: text('card_id').notNull().unique().primaryKey(),
  deleted: boolean('deleted').notNull().default(false),
  visibility: visibilityEnum('visibility').notNull().default('public'),
  suspended: boolean('suspended').notNull().default(false),
  contents: text('contents').notNull(),
  updated_time: timestamp('updated_time').notNull(),
  created_time: timestamp('created_time').notNull(),
  user_id: text('user_id')
    .notNull()
    .references(() => usersTable.user_id),
});

export const messagesTable = pgTable('messages', {
  sender_id: text('sender_id')
    .notNull()
    .references(() => usersTable.user_id),
  receiver_id: text('receiver_id')
    .notNull()
    .references(() => usersTable.user_id),
  time_stamp: time('time_stamp').notNull(),
  contents: text('contents').notNull(),
}, (table) => {
  return {
    pkWithCustomName: primaryKey({ name: 'message_pk', columns: [table.sender_id, table.receiver_id, table.time_stamp]}),
  };
});

export const applicationsTable = pgTable('applications', {
  user_id: text('user_id')
    .notNull()
    .references(() => usersTable.user_id),
  englishname: text('englishname').notNull(),
  document_url: text('document_url').notNull(),
  enroll_year: integer('enroll_year').notNull(),
  verification: verificationEnum('verification').notNull().default('pending'),
  institute: text('institute').notNull(),
});

export const deletesTable = pgTable(
  'deletes',
  {
    user_id: text('user_id')
      .notNull()
      .references(() => usersTable.user_id),
    card_id: text('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    time_stamp: time('time_stamp').notNull(),
  },(table) => {
    return {
      pkWithCustomName: primaryKey({ name: 'deletes_pk', columns: [table.user_id, table.card_id]}),
    };
  });

export const likesTable = pgTable(
  'likes',
  {
    user_id: text('user_id')
      .notNull()
      .references(() => usersTable.user_id),
    card_id: text('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    time_stamp: time('time_stamp').notNull(),
  },(table) => {
    return {
      pkWithCustomName: primaryKey({ name: 'likes_pk', columns: [table.user_id, table.card_id, table.time_stamp]}),
    };
  });

export const commentsTable = pgTable(
  'comments',
  {
    user_id: text('user_id')
      .notNull()
      .references(() => usersTable.user_id),
    card_id: text('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    time_stamp: time('time_stamp').notNull(),
    contents: text('contents').notNull(),
  },(table) => {
    return {
      pkWithCustomName: primaryKey({ name: 'comments_pk', columns: [table.user_id, table.card_id, table.time_stamp]}),
    };
  });

export const locationsTable = pgTable('locations', {
  location_name: text('location_name').notNull().primaryKey(),
});

export const locatedAtTable = pgTable(
  'located_at',
  {
    location_name: text('location_name')
      .notNull()
      .references(() => locationsTable.location_name),
    card_id: text('card_id')
      .notNull()
      .primaryKey()
      .references(() => cardsTable.card_id),
  },
);

export const labelsTable = pgTable(
  'labels',
  {
    label_name: text('label_name').notNull().primaryKey(),
    created_user: text('created_user')
      .notNull()
      .references(() => usersTable.user_id),
  },
);

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
  },(table) => {
    return {
      pkWithCustomName: primaryKey({ name: 'belongsto_pk', columns: [table.label_name, table.topic_name]}),
    };
  });

export const goodAtTable = pgTable(
  'good_at',
  {
    card_id: text('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    label_name: text('label_name')
      .notNull()
      .references(() => labelsTable.label_name),
  },
  (table) => {
    return {
      pkWithCustomName: primaryKey({ name: 'goodAt_pk', columns: [table.card_id, table.label_name]}),
    };
  });

export const wantToLearnTable = pgTable(
  'want_to_learn',
  {
    card_id: text('card_id')
      .notNull()
      .references(() => cardsTable.card_id),
    label_name: text('label_name')
      .notNull()
      .references(() => labelsTable.label_name),
  },
  (table) => {
    return {
      pkWithCustomName: primaryKey({ name: 'wantToLearn_pk', columns: [table.card_id, table.label_name]}),
    };
  });
