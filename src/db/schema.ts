import { pgTable, text } from 'drizzle-orm/pg-core';

export const messagesTable = pgTable('messages', {
  id: text('id').notNull().primaryKey(),
  content: text('content'),
});
