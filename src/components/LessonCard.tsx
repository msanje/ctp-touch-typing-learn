import React from "react";
import { Book } from "lucide-react";
import ExerciseItem from "./ExerciseItem";

type LessonCardProps = {
    lesson: { id: number; title: string; exercises: { id: number; index: number; lessonId: number }[] };
    completedExerciseSet: Set<string>;
};

const LessonCard: React.FC<LessonCardProps> = ({ lesson, completedExerciseSet }) => {
    const completedCount = lesson.exercises.filter((exercise) =>
        completedExerciseSet.has(`${exercise.lessonId}-${exercise.index}`)
    ).length;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Book className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">{lesson.title}</h2>
                </div>
                <div className="text-sm text-gray-600">
                    {completedCount} / {lesson.exercises.length} completed
                </div>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
                <div
                    className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${(completedCount / lesson.exercises.length) * 100}%` }}
                />
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.exercises.map((exercise) => (
                    <ExerciseItem
                        key={exercise.id}
                        exercise={exercise}
                        isCompleted={completedExerciseSet.has(`${exercise.lessonId}-${exercise.index}`)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default LessonCard;


