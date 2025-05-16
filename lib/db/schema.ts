import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { Children } from "react";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  size: integer("size").notNull(),
  type: text("type").notNull(), // folder

  // storage information
  fileUrl: text("file_url"), // url to acces file
  thumbnailUrl: text(),

  // Ownership
  userId: text("user_id").notNull(),
  parentId: uuid("parent_id"), // Parent Folder ( Null for root Items )

  //file or folder flags
  isFolder: boolean("is_folder").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(),
  isTrash: boolean("is_starred").default(false).notNull(),

  // Time Stamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 *  Each folder/file can have one parent folder ( null for root )
 *  Each folder will have childrens (folders or files)
 */
export const filesRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),
  children: many(files),
}));

/**
 * Type Definations
 */

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
