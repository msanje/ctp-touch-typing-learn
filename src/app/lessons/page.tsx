import Lessons from "@/components/Lessons";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getServerSession(options)

    if (!session) {
        redirect('/signup?callbackUrl=/learn')
    }

    return <>
        <Lessons />
    </>;
}
