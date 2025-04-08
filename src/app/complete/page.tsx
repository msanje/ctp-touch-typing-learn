import Certificate from "@/components/Certificate";
import CompletePage from "@/components/Complete";

export default async function page() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/progress/completion`, {
        cache: "no-store",
    })

    console.log("res: ", res);

    if (!res.ok) {
        return <div className="mt-12">
            <CompletePage isCompleted={false} />;
        </div>
    }

    const data = await res.json();

    console.log("data.isCompleted: ", data.isCompleted);

    return (
        <div className="mt-12">
            {/* <CompletePage isCompleted={false} /> */}
            {/* TODO: Fetch attributes from backend */}
            <Certificate userName="M Sanjay Achar" completionDate="March 20, 2025" blurred={true} />
            <CompletePage isCompleted={data.isCompleted} />
        </div>
    )
}

