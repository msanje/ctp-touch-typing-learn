import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { db } from "@/lib";

export async function GET() {
  try {
    const session = await getServerSession(options);
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const certificate = await db.certificate.findUnique({
      where: { userId },
      include: { transaction: true, user: true },
    });

    const latestTest = await db.typingTestResult.findFirst({
      where: { userId },
      orderBy: { timestamp: "desc" },
    });

    if (!certificate) {
      return NextResponse.json(
        { message: "Certificate not found. ", hasCertificate: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      hasCertificate: true,
      isPaid: certificate.isPaid,
      transactionStatus: certificate.transaction?.status || "PENDING",
      certificateId: certificate.id,
      title: certificate.title,
      issuedDate: certificate.issuedDate,
      userName: certificate.user.username,
      wpm: latestTest?.wpm || null,
      accuracy: latestTest?.accuracy || null,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
