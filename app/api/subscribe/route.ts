import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { channelsTable, usersTable, usersToChannelsTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { channelId, channelTitle, action } = await request.json();

        if (!channelId || !channelTitle || !action) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // First, ensure the user exists in our database
        let user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.clerkId, userId))
            .limit(1);

        if (user.length === 0) {
            // Create user if doesn't exist
            await db.insert(usersTable).values({
                clerkId: userId,
                email: 'temp@example.com', // We'll update this later when we have the email
                username: `user_${userId.slice(0, 8)}`,
                firstName: 'User',
                lastName: 'Name',
                imgUrl: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            user = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.clerkId, userId))
                .limit(1);
        }

        const dbUserId = user[0].id;

        if (action === 'subscribe') {
            // Check if channel exists, if not create it
            let channel = await db
                .select()
                .from(channelsTable)
                .where(eq(channelsTable.channelId, channelId))
                .limit(1);

            if (channel.length === 0) {
                await db.insert(channelsTable).values({
                    channelId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                channel = await db
                    .select()
                    .from(channelsTable)
                    .where(eq(channelsTable.channelId, channelId))
                    .limit(1);
            }

            const dbChannelId = channel[0].id;

            // Check if subscription already exists
            const existingSubscription = await db
                .select()
                .from(usersToChannelsTable)
                .where(
                    and(
                        eq(usersToChannelsTable.userId, dbUserId),
                        eq(usersToChannelsTable.channelId, dbChannelId)
                    )
                )
                .limit(1);

            if (existingSubscription.length === 0) {
                // Create subscription
                await db.insert(usersToChannelsTable).values({
                    userId: dbUserId,
                    channelId: dbChannelId,
                    createdAt: new Date(),
                });
            }

            return NextResponse.json({ success: true, action: 'subscribed' });
        } else if (action === 'unsubscribe') {
            // Find the channel
            const channel = await db
                .select()
                .from(channelsTable)
                .where(eq(channelsTable.channelId, channelId))
                .limit(1);

            if (channel.length > 0) {
                const dbChannelId = channel[0].id;

                // Remove subscription
                await db
                    .delete(usersToChannelsTable)
                    .where(
                        and(
                            eq(usersToChannelsTable.userId, dbUserId),
                            eq(usersToChannelsTable.channelId, dbChannelId)
                        )
                    );
            }

            return NextResponse.json({ success: true, action: 'unsubscribed' });
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error handling subscription:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
