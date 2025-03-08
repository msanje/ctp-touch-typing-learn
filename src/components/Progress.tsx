"use client";

import { useEffect, useState } from "react";

const Progress = () => {
    const [progress, setProgress] = useState<{ lessonId: number, exerciseIndex: number, completed: boolean }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch("/api/userid");
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                if (!data.userId) throw new Error("User ID not found");
                setUserId(data.userId);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchUserId();
    }, [])

    useEffect(() => {
        if (!userId) return;

        const fetchProgress = async () => {
            try {
                const response = await fetch(`/api/progress?userId=${userId}`);
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                setProgress(data.progress || []);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchProgress();
    }, [userId]);

    if (loading) return <p>Loading progress...</p>;
    if (error) return <p>Error: {error}</p>;
    if (progress.length === 0) return <p>No progress found.</p>;

    return (
        <div>
            <h2>Your Progress</h2>
            <ul>
                {progress.map((p, index) => (
                    <li key={index}>
                        Lesson {p.lessonId} - Exercise {p.exerciseIndex} -
                        {p.completed ? " Completed" : " In progress"}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Progress;