import Progress from "@/components/Progress";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await getServerSession(options)

    if (!session) {
        redirect('/signup?callbackUrl=/learn')
    }

    return (
        <div>
            <Progress />
        </div>
    )
}

export default Page;