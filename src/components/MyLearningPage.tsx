"use client";
import { useEffect, useState } from "react";
import ProgressOverview from "../components/ProgressOverview";
import LessonCard from "../components/LessonCard";
import { ProgressData } from "@/types/GlobalTypes";

type Lesson = {
    id: number;
    title: string;
    exercises: { id: number; index: number; lessonId: number }[];
};

const MyLearningPage = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [completedExercises, setCompletedExercises] = useState<ProgressData | null>(null);

    useEffect(() => {
        const fetchLessons = async () => {
            const response = await fetch("/api/lessons");
            setLessons(await response.json());
        };
        fetchLessons();
    }, []);

    useEffect(() => {
        const fetchCompletedExercises = async () => {
            const response = await fetch("/api/progress");
            setCompletedExercises(await response.json());
        };
        fetchCompletedExercises();
    }, []);

    const completedExerciseSet = new Set<string>();

    if (completedExercises) {
        completedExercises.progress.forEach((lessonProgress) => {
            lessonProgress.exercisesCompleted.forEach((exerciseId) => {
                completedExerciseSet.add(`${lessonProgress.lesson.id}-${exerciseId}`)
            })
        })
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Learning Journey</h1>
            <ProgressOverview
                totalExercises={lessons.reduce((acc, lesson) => acc + lesson.exercises.length, 0)}
                completedExercises={completedExercises}
                totalLessons={lessons.length}
            />
            <div className="space-y-6">
                {lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} completedExerciseSet={completedExerciseSet} />
                ))}
            </div>
        </div>
    );
};

export default MyLearningPage;