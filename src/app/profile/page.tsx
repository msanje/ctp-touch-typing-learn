"use client"

import { useEffect, useState } from 'react'
import { CheckCircle, Circle, Trophy, Book } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type ProgressData = {
    progress: ({
        lesson: {
            id: number;
            title: string;
        };
    } & {
        id: number;
        userId: number;
        lessonId: number;
        exerciseIndex: number;
        completed: boolean;
    })[];
    exercises: {
        id: number;
        lessonId: number;
        index: number;
        content: string;
    }[];
};

type Exercise = {
    id: number;
    index: number;
    content: string;
    lessonId: number;
};

type Lesson = {
    id: number;
    title: string;
    exercises: Exercise[];
};

type LessonsState = Lesson[];

const Page = ({ }) => {
    const [lessons, setLessons] = useState<LessonsState>([]);
    const [completedExercises, setCompletedExercises] = useState<ProgressData | null>(null);
    const { data: session } = useSession();
    const [userId, setUserId] = useState<string | undefined>();

    useEffect(() => {
        const fetchLessons = async () => {
            const response = await fetch('/api/lessons');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const text = await response.text();

            if (!text) {
                throw new Error("Empty response body");
            }

            const data: LessonsState = await response.json();

            setLessons(data);
        };

        if (session?.user?.name) {
            setUserId(session.user.id);
        }

        const fetchCompletedExercises = async () => {
            const response = await fetch(`/api/progress?userId=${userId}`);
            const data: ProgressData = await response.json();

            setCompletedExercises(data);
        }

        fetchLessons();
        fetchCompletedExercises();
    }, [userId]);

    const completedExerciseSet = new Set(
        completedExercises?.exercises.map(
            (exercise) => `${exercise.lessonId}-${exercise.index}`
        )
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Learning Journey</h1>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-700">Level 4</span>
                </div>
            </div>

            <div className='bg-red-700 w-full text-white'>
                {session?.user!.id}
            </div>

            {/* Progress Overview */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {lessons.reduce((acc, lesson) => acc + lesson.exercises.length, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Exercises</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {completedExercises?.progress.length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{lessons.length}</div>
                        <div className="text-sm text-gray-600">Lessons</div>
                    </div>
                </div>
            </div>

            {/* Lessons List */}
            {lessons.length > 0 ? (
                <div className="space-y-6">
                    {lessons.map(({ id, title, exercises }) => {
                        // const completedCount = completedExercises?.progress.filter(
                        //     (prog) => prog.lessonId === id
                        // ).length || 0;
                        const completedCount = exercises.filter((exercise) =>
                            completedExerciseSet.has(`${exercise.lessonId}-${exercise.index}`)
                        ).length;

                        return (
                            <div key={id} className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <Book className="w-6 h-6 text-blue-600" />
                                        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {completedCount} / {exercises.length} completed
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
                                    <div
                                        className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${(completedCount / exercises.length) * 100}%`,
                                        }}
                                    />
                                </div>

                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {exercises.map((exercise) => {
                                        const isCompleted = completedExerciseSet.has(
                                            `${exercise.lessonId}-${exercise.index}`
                                        );

                                        return (
                                            <Link
                                                key={exercise.id}
                                                href={`/learn/${exercise.lessonId}/exercise/${exercise.index}`}
                                                className='cursor-pointer'
                                            >
                                                <li
                                                    key={exercise.id}
                                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${isCompleted ? "bg-green-50" : "hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-gray-300" />
                                                    )}
                                                    <span
                                                        className={`flex-1 font-medium ${isCompleted
                                                            ? "text-green-700"
                                                            : "text-gray-700"
                                                            }`}
                                                    >
                                                        Exercise {exercise.index + 1}
                                                    </span>
                                                </li>
                                            </Link>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <div className="animate-pulse text-gray-600">Loading lessons...</div>
                </div>
            )}
        </div>
    );
};

export default Page;