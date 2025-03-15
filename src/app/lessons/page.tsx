"use client";

import { useEffect, useState } from "react";
import ProgressOverview from "@/components/ProgressOverview";
import LessonsList from "../../components/LessonsList";
import { LessonsState, ProgressData } from "@/types/ComoponentTypes";
import { fetchUserId } from "@/helpers/fetchUserId";

const Page = () => {
    const [lessons, setLessons] = useState<LessonsState>([]);
    const [completedExercises, setCompletedExercises] = useState<ProgressData | null>(null);
    const [userId, setUserId] = useState<String | null>(null);
    const [error, setError] = useState<String | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const id = await fetchUserId();
                setUserId(id);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            } finally {
                setError("");
                setLoading(false);
            }
        }
    }, [])

    useEffect(() => {
        const fetchLessons = async () => {
            const response = await fetch("/api/lessons");
            const data: LessonsState = await response.json();
            setLessons(data);
        };

        const fetchCompletedExercises = async () => {
            const response = await fetch(`/api/progress?userId=${userId}`);
            const data: ProgressData = await response.json();
            setCompletedExercises(data);
        };

        fetchLessons();
        fetchCompletedExercises();
    }, [userId]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <ProgressOverview
                totalExercises={lessons.reduce((acc, lesson) => acc + lesson.exercises.length, 0)}
                completedExercises={completedExercises?.progress?.length || 0}
                totalLessons={lessons.length}
            />
            <LessonsList lessons={lessons} completedExerciseSet={new Set(
                completedExercises?.exercises?.map((exercise) => `${exercise.lessonId}-${exercise.index}`) || []
            )} />
        </div>
    );
};

export default Page;
