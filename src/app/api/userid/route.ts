import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options"; // Ensure this is the correct path

export async function GET() {
    const session = await getServerSession(options);

    if (!session) {
        return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const userId = session.user?.id;

    return new Response(JSON.stringify({ userId }), { status: 200 });
}
