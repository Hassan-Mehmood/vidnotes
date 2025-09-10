import { headers } from "next/headers";
import { Webhook } from "svix";
import {
    handleUserCreated,
    handleUserDeleted,
    handleUserUpdated,
} from "@/app/api/webhooks/clerk/utils/userEvents";

export async function POST(request: Request) {
    const SIGNING_SECRET = process.env.WEBHOOK_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error("Missing SIGNING_SECRET");
    }

    const wh = new Webhook(SIGNING_SECRET);

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Missing svix headers", { status: 400 });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    try {
        wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error("Error: Could not verify webhook:", err);
        return new Response("Error: Verification error", {
            status: 400,
        });
    }

    switch (payload.type) {
        case "user.created":
            // TODO: user.deleted, user.updated
            await handleUserCreated(payload);
            break;
        case "user.deleted":
            await handleUserDeleted(payload);
            break;
        case "user.updated":
            await handleUserUpdated(payload);
        default:
            break;
    }

    return new Response("Webhook received", { status: 200 });
}

// Test GET endpoint
export const GET = () => {
    return new Response("GET method not allowed", { status: 405 });
}
