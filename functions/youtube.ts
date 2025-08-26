'use server';

import { db } from '@/db';
import { and, eq } from 'drizzle-orm';
import { channelsTable, usersTable, usersToChannelsTable } from '@/db/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import { ChannelItem } from '@/types/youtube';
import { revalidatePath } from 'next/cache';


export async function subscribe(channel: ChannelItem) {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error('User not signed in');
        }

        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.clerkId, userId));

        if (!user) {
            throw new Error('User not found');
        }


        let dbChannelRecord;
        dbChannelRecord = await db
            .select()
            .from(channelsTable)
            .where(eq(channelsTable.channelId, channel.id));

        if (dbChannelRecord.length === 0) {
            dbChannelRecord = await db.insert(channelsTable)
                .values(
                    {
                        channelId: channel.id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                )
                .returning({ id: channelsTable.id });
        }

        await db.insert(usersToChannelsTable).values(
            {
                userId: user[0].id,
                channelId: dbChannelRecord[0].id,
            }
        );

        revalidatePath('/');

    } catch (err) {
        console.log('Error: Could not subscribe to channel:', err);
        throw err;
    }
}

export async function unsubscribe(channel: ChannelItem) {
    try {
        const { userId } = await auth();

        console.log("Unsubscribing from channel:", channel.id);

        if (!userId) {
            throw new Error('User not signed in');
        }

        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.clerkId, userId));

        if (!user) {
            throw new Error('User not found');
        }

        // First get the internal channel ID from the database
        const dbChannel = await db
            .select()
            .from(channelsTable)
            .where(eq(channelsTable.channelId, channel.id));

        if (dbChannel.length === 0) {
            throw new Error('Channel not found in database');
        }

        await db.delete(usersToChannelsTable)
            .where(and(eq(usersToChannelsTable.channelId, dbChannel[0].id), eq(usersToChannelsTable.userId, user[0].id)));

        revalidatePath('/');
    } catch (err) {
        console.log('Error: Could not unsubscribe from channel:', err);
        throw err;
    }
}
