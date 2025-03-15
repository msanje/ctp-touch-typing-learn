import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import Link from "next/link";

type ExerciseItemProps = {
    exercise: { id: number; index: number; lessonId: number };
    isCompleted: boolean;
};

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, isCompleted }) => {
    return (
        <Link href={`/lessons/${exercise.lessonId}/${exercise.index}`} className='cursor-pointer'>
            <li className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${isCompleted ? "bg-green-50" : "hover:bg-gray-50"}`}>
                {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                )}
                <span className={`flex-1 font-medium ${isCompleted ? "text-green-700" : "text-gray-700"}`}>
                    Exercise {exercise.index + 1}
                </span>
            </li>
        </Link>
    );
};

export default ExerciseItem;

