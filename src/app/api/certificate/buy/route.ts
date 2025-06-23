import { NextResponse } from "next/server";
import { db } from "@/lib";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body.userId;

    const certificate = await db.certificate.findUnique({
      where: { userId: userId },
      include: { transaction: true },
    });

    if (!certificate) {
      return NextResponse.json(
        { message: "Certificate not found." },
        { status: 404 }
      );
    }

    if (certificate.transaction) {
      // Update existing transaction
      await db.transaction.update({
        where: { certificateId: certificate.id },
        data: { status: "SUCCESS" },
      });
    } else {
      // Create new transaction
      await db.transaction.create({
        data: {
          amount: 199, // simulated amount
          status: "SUCCESS",
          certificate: {
            connect: { id: certificate.id },
          },
        },
      });
    }

    await db.certificate.update({
      where: { userId },
      data: {
        isPaid: true,
      },
    });

    return NextResponse.json({ message: "Payment marked as successful." });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update payment status." },
      { status: 500 }
    );
  }
}
