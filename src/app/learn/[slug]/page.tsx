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

    // return <div className="p-4">
    //     {/* <h1 className="text-center text-3xl">Lesson: {slug}</h1> */}
    //     <h1 className="text-white text-center text-3xl font-bold">{lesson.title}</h1>
    //     <p className="text-center text-gray-600">{lesson.desciption || "No description provided."}</p>

    //     <div className="text-black mt-8">
    //         <h2 className="text-black text-2xl font-bold">Exercises</h2>
    //         <ul className="text-black list-decimal list-inside mt-4">
    //             {lesson.exercises.map((exercise: { index: number; content: string }) => (
    //                 <li key={exercise.index} className="text-black p-2 bg-gray-100 rounded mb-2">
    //                     {exercise.content}
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    //     <KeyboardStyled />
    // </div>
}