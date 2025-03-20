import Certificate from "@/components/Certificate";
import CompletePage from "@/components/Complete";

export default function page() {
    // TODO; Logic to fetch whether the user has completed all the exercises.

    return (
        <div className="mt-12">
            {/* <CompletePage isCompleted={false} /> */}
            {/* TODO: Fetch attributes from backend */}
            <Certificate userName="M Sanjay Achar" completionDate="March 20, 2025" blurred={true} />
            <CompletePage isCompleted={true} />
        </div>
    )
}

