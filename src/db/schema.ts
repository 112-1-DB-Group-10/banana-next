import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
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
  usera_id: text('usera_id')
    .notNull()
    .references(() => usersTable.user_id),
  userb_id: text('userb_id')
    .notNull()
    .references(() => usersTable.user_id),
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

// export const deletesTable = pgTable(
//   'deletes',
//   {
//     user_id: text('user_id')
//       .notNull()
//       .references(() => usersTable.user_id),
//     card_id: text('card_id')
//       .notNull()
//       .references(() => cardsTable.card_id),
//     time_stamp: time('time_stamp').notNull(),
//   },
//   {
//     triggers: {
//       user_id: 'CASCADE',
//       card_id: 'CASCADE',
//     },
//   },
// );

// export const likesTable = pgTable(
//   'likes',
//   {
//     user_id: text('user_id')
//       .notNull()
//       .references(() => usersTable.user_id),
//     card_id: text('card_id')
//       .notNull()
//       .references(() => cardsTable.card_id),
//     time_stamp: time('time_stamp').notNull(),
//   },
//   {
//     triggers: {
//       user_id: 'CASCADE',
//       card_id: 'CASCADE',
//     },
//   },
// );

// export const commentsTable = pgTable(
//   'comments',
//   {
//     user_id: text('user_id')
//       .notNull()
//       .references(() => usersTable.user_id),
//     card_id: text('card_id')
//       .notNull()
//       .references(() => cardsTable.card_id),
//     time_stamp: time('time_stamp').notNull(),
//     contents: text('contents').notNull(),
//   },
//   {
//     triggers: {
//       user_id: 'CASCADE',
//       card_id: 'CASCADE',
//     },
//   },
// );

// export const locationsTable = pgTable('locations', {
//   location_name: text('location_name').notNull().primaryKey(),
// });

// export const locatedAtTable = pgTable(
//   'located_at',
//   {
//     location_name: text('location_name')
//       .notNull()
//       .references(() => locationsTable.location_name),
//     card_id: text('card_id')
//       .notNull()
//       .references(() => cardsTable.card_id),
//   },
//   {
//     triggers: {
//       location_name: 'CASCADE',
//       card_id: 'CASCADE',
//     },
//   },
// );

// export const labelsTable = pgTable(
//   'labels',
//   {
//     label_name: text('label_name').notNull().primaryKey(),
//     created_user: text('created_user')
//       .notNull()
//       .references(() => usersTable.user_id),
//   },
//   {
//     triggers: {
//       created_user: 'CASCADE',
//     },
//   },
// );

// export const topicsTable = pgTable('topics', {
//   topic_name: text('topic_name').notNull().primaryKey(),
// });

// export const belongsToTable = pgTable(
//   'belongs_to',
//   {
//     label_name: text('label_name')
//       .notNull()
//       .references(() => labelsTable.label_name),
//     topic_name: text('topic_name')
//       .notNull()
//       .references(() => topicsTable.topic_name),
//   },
//   {
//     triggers: {
//       label_name: 'CASCADE',

//       topic_name: 'CASCADE',
//     },
//   },
// );

// export const goodAtTable = pgTable(
//   'good_at',
//   {
//     card_id: text('card_id')
//       .notNull()
//       .references(() => cardsTable.card_id),
//     label_name: text('label_name')
//       .notNull()
//       .references(() => labelsTable.label_name),
//   },
//   {
//     triggers: {
//       card_id: 'CASCADE',
//       label_name: 'CASCADE',
//     },
//   },
// );

// export const wantToLearnTable = pgTable(
//   'want_to_learn',
//   {
//     card_id: text('card_id')
//       .notNull()
//       .references(() => cardsTable.card_id),
//     label_name: text('label_name')
//       .notNull()
//       .references(() => labelsTable.label_name),
//   },
//   {
//     triggers: {
//       card_id: 'CASCADE',
//       label_name: 'CASCADE',
//     },
//   },
// );
