import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
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

export type UserSelect = InferSelectModel<typeof usersTable>;
export type UserInsert = InferInsertModel<typeof usersTable>;

export type CardSelect = InferSelectModel<typeof cardsTable>;
export type CardInsert = InferInsertModel<typeof cardsTable>;

export type MessageSelect = InferSelectModel<typeof messagesTable>;
export type MessageInsert = InferInsertModel<typeof messagesTable>;

export type LikeSelect = InferSelectModel<typeof likesTable>;
export type LikeInsert = InferInsertModel<typeof likesTable>;

export type CommentSelect = InferSelectModel<typeof commentsTable>;
export type CommentInsert = InferInsertModel<typeof commentsTable>;

export type LabelSelect = InferSelectModel<typeof labelsTable>;
export type LabelInsert = InferInsertModel<typeof labelsTable>;

export type BelongsToSelect = InferSelectModel<typeof belongsToTable>;
export type BelongsToInsert = InferInsertModel<typeof belongsToTable>;

export type GoodAtSelect = InferSelectModel<typeof goodAtTable>;
export type GoodAtInsert = InferInsertModel<typeof goodAtTable>;

export type TopicSelect = InferSelectModel<typeof topicsTable>;
export type TopicInsert = InferInsertModel<typeof topicsTable>;

export type WantToLearnSelect = InferSelectModel<typeof wantToLearnTable>;
export type WantToLearnInsert = InferInsertModel<typeof wantToLearnTable>;

export type ApplicationSelect = InferSelectModel<typeof applicationsTable>;
export type ApplicationInsert = InferInsertModel<typeof applicationsTable>;

export type LocationSelect = InferSelectModel<typeof locationsTable>;
export type LocationInsert = InferInsertModel<typeof locationsTable>;

export type LocatedAtSelect = InferSelectModel<typeof locatedAtTable>;
export type LocatedAtInsert = InferInsertModel<typeof locatedAtTable>;
