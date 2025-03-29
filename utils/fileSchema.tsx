import { serial, text, pgTable, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const FileStorage = pgTable('fileStorage', {
    id: serial('id').primaryKey(),
    fileName: varchar('fileName').notNull(),
    fileType: varchar('fileType').notNull(),
    fileSize: integer('fileSize').notNull(),
    fileContent: text('fileContent').notNull(),
    category: varchar('category'),
    createdBy: varchar('createdBy').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    lastModified: timestamp('lastModified').defaultNow().notNull()
});