import { InferSelectModel } from 'drizzle-orm';
import {
  applicationsTable,
  belongsToTable,
  cardsTable,
  commentsTable,
  goodAtTable,
  labelsTable,
  likesTable,
  locatedAtTable,
  locationsTable,
  messagesTable,
  topicsTable,
  usersTable,
  wantToLearnTable,
} from '@/db/schema';

export type User = InferSelectModel<typeof usersTable>;

export type Card = InferSelectModel<typeof cardsTable>;

export type Message = InferSelectModel<typeof messagesTable>;

export type Like = InferSelectModel<typeof likesTable>;

export type Comment = InferSelectModel<typeof commentsTable>;

export type Label = InferSelectModel<typeof labelsTable>;

export type BelongsTo = InferSelectModel<typeof belongsToTable>;

export type GoodAt = InferSelectModel<typeof goodAtTable>;

export type Topic = InferSelectModel<typeof topicsTable>;

export type WantToLearn = InferSelectModel<typeof wantToLearnTable>;

export type Application = InferSelectModel<typeof applicationsTable>;

export type Location = InferSelectModel<typeof locationsTable>;

export type LocatedAt = InferSelectModel<typeof locatedAtTable>;
