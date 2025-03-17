"use client";

import { useEffect, useState } from "react";
import ProgressOverview from "@/components/ProgressOverview";
import LessonsList from "@/components/LessonsList";
import { LessonsState, ProgressData } from "@/types/ComoponentTypes";
import { fetchUserId } from "@/helpers/fetchUserId";

const Lessons = () => {
    const [lessons, setLessons] = useState<LessonsState>([]);
    const [completedExercises, setCompletedExercises] = useState<ProgressData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const id = await fetchUserId();
                setUserId(id);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        getUserId();
    }, []);

    useEffect(() => {
        if (!userId) return; // Ensure we have userId before fetching progress

        const fetchLessons = async () => {
            try {
                const response = await fetch("/api/lessons");
                if (!response.ok) throw new Error("Failed to fetch lessons");
                setLessons(await response.json());
            } catch (error) {
                setError((error as Error).message);
            }
        };

        const fetchCompletedExercises = async () => {
            try {
                const response = await fetch(`/api/progress?userId=${userId}`);
                if (!response.ok) throw new Error("Failed to fetch progress");
                setCompletedExercises(await response.json());
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchLessons();
        fetchCompletedExercises();
    }, [userId]);

    if (loading) return <div className="text-center text-gray-700 py-6">Loading...</div>;
    if (error) return <div className="text-center text-red-500 py-6">{error}</div>;

    const totalExercises = lessons.reduce((acc, { exercises }) => acc + (exercises?.length || 0), 0);
    const completedExerciseSet = new Set(
        completedExercises?.exercises?.map(({ lessonId, index }) => `${lessonId}-${index}`) || []
    );

    return (
        <div className="mx-auto py-6 px-64 bg-gradient-to-b bg-blue-200">
            <ProgressOverview
                totalExercises={totalExercises}
                completedExercises={completedExercises?.exercises?.length || 0}
                totalLessons={lessons.length}
            />
            <LessonsList lessons={lessons} completedExerciseSet={completedExerciseSet} />
        </div>
    );
};

export default Lessons;
