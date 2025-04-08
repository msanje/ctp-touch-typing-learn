import { NextResponse } from "next/server";
import { db } from "@/lib";

export async function GET(req: Request) {
    try {
        // TODO: get user
        const userId = "user-id";

        const certificate = await db.certificate.findUnique({
            where: { userId },
            include: { transaction: true },
        })

        if (!certificate) {
            return NextResponse.json(
                { message: "Certificate not found. ", hasCertificate: false },
                { status: 404 }
            )
        }

        return NextResponse.json({
            hasCertificate: true,
            isPaid: certificate.isPaid,
            transactionStatus: certificate.transaction?.status || "PENDING",
        })
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Something went wrong." },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userId = body.userId;

        const certificate = await db.certificate.findUnique({
            where: { userId }
        });

        if (!certificate) {
            return NextResponse.json(
                { message: "Certificate not found." },
                { status: 404 }
            );
        }

        await db.certificate.update({
            where: { userId },
            data: {
                isPaid: true,
                transaction: {
                    update: {
                        status: "SUCCESS",
                    },
                },
            },
        });

        return NextResponse.json({ message: "Payment marked as successful." });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Failed to update payment status." },
            { status: 500 }
        )
    }
}