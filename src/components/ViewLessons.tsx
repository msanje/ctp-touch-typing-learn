"use client"

import { useEffect, useState } from "react";
import { CheckCircle, Circle, Trophy, Book } from "lucide-react";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "./ui/alert-dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { fetchUserId } from "@/helpers/fetchUserId";
import { ProgressData, ProgressItem } from "@/types/ComoponentTypes";

type Exercise = {
    id: number;
    exerciseIndex: number;
    lessonId: number;
    title: string;
    exercise: Exercise[];
}

type Lesson = {
    id: number;
    title: string;
    exercises: Exercise[]
}

type LessonsState = Lesson[];

const ViewLessons = () => {
    const [lessons, setLessons] = useState<LessonsState>([]);
    const [completedExercises, setCompletedExercises] = useState<ProgressData | null>(null);
    const [userId, setUserId] = useState<String | null>(null); // current logged in user
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<ProgressItem[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const id = await fetchUserId();
                setUserId(id);

                const lessonsResponse = await fetch('/api/lessons');
                const lessonsData: LessonsState = await lessonsResponse.json();
                setLessons(lessonsData);

                const progressResponse = await fetch(`/api/progress?userId=${id}`);
                const progressData: ProgressData = await progressResponse.json();
                setCompletedExercises(progressData);

            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const completedExerciseSet = new Set(
        completedExercises?.progress.flatMap((progressItem) =>
            progressItem.exercisesCompleted.map(
                (exerciseIndex) => `${progressItem.lesson.id}-${exerciseIndex - 1}`
            )
        )
    );

    console.log("completedExercisesSet: ", completedExerciseSet)

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Learning Journey</h1>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-700">Level 4</span>
                </div>
            </div>

            {/* AlertDialog for Lessons */}
            <AlertDialog>
                <AlertDialogTrigger className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm">
                    View Lessons
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Lessons</AlertDialogTitle>
                        <AlertDialogDescription>
                            Here are the lessons and exercises you can work on.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {/* Lessons List */}
                    {lessons.length > 0 ? (
                        <Accordion type="single" collapsible>
                            {lessons.map(({ id, title, exercises }) => {
                                const completedCount = exercises.filter((exercise) =>
                                    completedExerciseSet.has(`${exercise.lessonId}-${exercise.exerciseIndex}`)
                                ).length;

                                return (
                                    <AccordionItem key={id} value={id.toString()}>
                                        <AccordionTrigger>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <Book className="w-6 h-6 text-blue-600" />
                                                    <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {completedCount} / {exercises.length} completed
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                                                {exercises.map((exercise) => {

                                                    const isCompleted = completedExerciseSet.has(
                                                        `${exercise.lessonId}-${exercise.exerciseIndex}`
                                                    );

                                                    return (
                                                        <Link
                                                            key={exercise.id}
                                                            href={`/lessons/${exercise.lessonId}/${exercise.id}`}
                                                            className="cursor-pointer"
                                                        >
                                                            <li
                                                                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${isCompleted ? "bg-green-50" : "hover:bg-gray-50"
                                                                    }`}
                                                            >
                                                                {isCompleted ? (
                                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                                ) : (
                                                                    <Circle className="w-5 h-5 text-gray-300" />
                                                                )}
                                                                <span
                                                                    className={`flex-1 font-medium ${isCompleted ? "text-green-700" : "text-gray-700"
                                                                        }`}
                                                                >
                                                                    Exercise {(exercise.exerciseIndex) + 1}
                                                                </span>
                                                            </li>
                                                        </Link>
                                                    );
                                                })}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                            <div className="animate-pulse text-gray-600">Loading lessons...</div>
                        </div>
                    )}
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ViewLessons;