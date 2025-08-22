import { integer, pgTable, timestamp, varchar, primaryKey } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';


export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerkId: varchar({ length: 255 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    username: varchar({ length: 255 }).notNull().unique(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    imgUrl: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()),
});

export const userRelations = relations(usersTable, ({ many }) => ({
    usersToChannels: many(usersToChannelsTable),
}));

export const channelsTable = pgTable("channels", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    channelId: varchar({ length: 255 }).notNull().unique(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()),
});

export const channelRelations = relations(channelsTable, ({ many }) => ({
    usersToChannels: many(usersToChannelsTable),
}));

export const usersToChannelsTable = pgTable("users_to_channels", {
    userId: integer().notNull().references(() => usersTable.id),
    channelId: integer().notNull().references(() => channelsTable.id),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()),
},
    (t) => [
        primaryKey({ columns: [t.userId, t.channelId] })
    ],

);

export const usersToChannelsRelations = relations(usersToChannelsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [usersToChannelsTable.userId],
        references: [usersTable.id],
    }),
    channel: one(channelsTable, {
        fields: [usersToChannelsTable.channelId],
        references: [channelsTable.id],
    }),
}));