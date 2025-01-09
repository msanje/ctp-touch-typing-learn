"use client"

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Exercise, Lesson } from "@/types/Lesson";


const AdminLessonForm: FC<{ lesson?: Lesson }> = ({ lesson }) => {
    const [title, setTitle] = useState<string>(lesson?.title || '');
    const [exercises, setExercises] = useState<string[]>(lesson?.exercises.map((ex: Exercise) => ex.content) || ['']); // Extract exercises content if updating
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { title, exercises };

        const response = await fetch(lesson ? `/api/lessons` : `/api/lessons/`, {
            method: lesson ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            router.push("/admin");
        } else {
            console.error("Failed to submit lesson data");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">
                {lesson ? "Update Lesson" : "Create New Lesson"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Lesson Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-white text-black border border-gray-300 p-2 rounded-md w-full"
                />
                <textarea
                    placeholder="Exercises (comma-separated)"
                    value={exercises.join(', ')}
                    onChange={(e) => setExercises(e.target.value.split(',').map(ex => ex.trim()))}
                    required
                    className="bg-white text-black border border-gray-300 p-2 rounded-md w-full h-32"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {lesson ? "Update Lesson" : "Create Lesson"}
                </button>
            </form>
        </div>
    );
};

export default AdminLessonForm;