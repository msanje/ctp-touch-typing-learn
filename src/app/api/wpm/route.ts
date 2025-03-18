import { db } from "@/lib/index";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId, wpm, accuracy } = await req.json();

        console.log("hello from api/wpm POST: userId, wpm, accuracy:", userId, wpm, accuracy);

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 })
        }

        if (!wpm) {
            return NextResponse.json({ error: "WPM is required" }, { status: 400 })
        }

        if (!accuracy) {
            return NextResponse.json({ error: "Accuracy are required" }, { status: 400 })
        }

        const typingTestResult = await db.typingTestResult.create({
            data: {
                userId,
                wpm,
                accuracy
            }
        })

        return NextResponse.json({ message: "Typing test result saved successfully", typingTestResult });
    } catch (error) {
        console.error("Error saving typing test result: ", error);
        return NextResponse.json({ error: "Error saving typing test result" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        // Fetching typing test results for the given userId
        const typingTestResults = await db.typingTestResult.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                timestamp: 'desc'
            }
        });

        const highestWpm = await db.typingTestResult.findFirst({
            where: { userId },
            orderBy: { wpm: "desc" }
        })

        if (typingTestResults.length === 0) {
            return NextResponse.json({ message: 'No typing test results found' }, { status: 200 });
        }

        return NextResponse.json({ typingTestResults, highestWpm }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching typing test results: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

