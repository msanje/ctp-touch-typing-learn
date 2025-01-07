import { options } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"
import LearnInput from "@/components/LearnInput";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${slug}`);
    const lesson = await res.json();
    const session = await getServerSession(options)

    if (!session) {
        redirect('/signup?callbackUrl=/learn')
    }

    if (!res.ok) {
        return <div className="text-center text-red-500">Lesson not found</div>;
    }

    return <div>
        <section className="flex flex-col gap-6">
            <Navbar user={session?.user} pagetype={"Server"} />
        </section>
        <LearnInput lessonId={lesson.id} />
    </div>
}