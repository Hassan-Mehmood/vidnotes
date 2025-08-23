'use server';

import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { channelsTable, usersTable, usersToChannelsTable } from '@/db/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import { ChannelItem } from '@/types/youtube';


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

    } catch (err) {
        console.log('Error: Could not subscribe to channel:', err);
        return;
    }
}