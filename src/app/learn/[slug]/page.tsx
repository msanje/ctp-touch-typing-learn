import KeyboardStyled from "@/components/KeyboardStyled"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    return <div>
        <h1 className="text-center text-3xl">Lesson: {slug}</h1>
        <KeyboardStyled />
    </div>
}