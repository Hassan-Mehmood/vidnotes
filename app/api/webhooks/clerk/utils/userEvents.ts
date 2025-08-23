import { db } from "@/db";
import { eq } from 'drizzle-orm'
import { usersTable } from "@/db/schema";
import { WH_UserCreated } from "@/types/webhooks/userCreated";
import { WH_UserDeleted } from "@/types/webhooks/userDeleted";
import { WH_UserUpdated } from "@/types/webhooks/userUpdated";

export async function handleUserCreated(payload: WH_UserCreated) {
    try {
        const data = payload.data;

        await db.insert(usersTable).values(
            {
                clerkId: data.id,
                email: data.email_addresses[0].email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                imgUrl: data.image_url,
                username: data.username || "",
            }
        )

        console.log("User created");

        return new Response("User created", {
            status: 200,
        });

    } catch (err) {
        console.error("Error: Could not create user:", err);
        return new Response("Error: Could not create user", {
            status: 400,
        });
    }
}

export async function handleUserDeleted(payload: WH_UserDeleted) {
    const data = payload.data;

    try {
        await db.delete(usersTable).where(eq(usersTable.clerkId, data.id))

        console.log("User deleted");

        return new Response("User deleted", {
            status: 200,
        });
    } catch (err) {
        console.log("Error: Could not delete user:", err);
        return new Response("Error: Could not delete user", { status: 400 });
    }
}

export async function handleUserUpdated(payload: WH_UserUpdated) {
    const data = payload.data;

    try {

        await db.update(usersTable).set(
            {
                email: data.email_addresses[0].email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                imgUrl: data.image_url,
                username: data.username || "",
            }
        ).where(eq(usersTable.clerkId, data.id));

        console.log("User updated");

        return new Response("User updated", {
            status: 200,
        });

    } catch (err) {
        console.log("Error: Could not update user:", err);
        return new Response("Error: Could not update user", { status: 400 });
    }
}