import Link from 'next/link';
import { Book, CheckCircle, Circle } from 'lucide-react';
import { Lesson } from '@/types/ComoponentTypes';

type LessonsListProps = {
    lessons: Lesson[];
    completedExerciseSet: Set<string>;
};

const LessonsList: React.FC<LessonsListProps> = ({ lessons, completedExerciseSet = new Set() }) => {
    return (
        <div className="space-y-6">
            {lessons.map(({ id, title, exercises }) => {
                const completedCount = exercises.filter((exercise: any) =>
                    completedExerciseSet.has(`${exercise.lessonId}-${exercise.id}`)
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
                                style={{ width: `${(completedCount / exercises.length) * 100}%` }}
                            />
                        </div>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {exercises.map((exercise) => {
                                const isCompleted = completedExerciseSet.has(
                                    `${exercise.lessonId}-${exercise.id}`
                                );

                                return (
                                    <Link
                                        key={exercise.id}
                                        href={`/lessons/${exercise.lessonId}/${exercise.id}`}
                                        className='cursor-pointer'
                                    >
                                        <li
                                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${isCompleted ? "bg-green-50" : "hover:bg-gray-50"}`}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-gray-300" />
                                            )}
                                            <span
                                                className={`flex-1 font-medium ${isCompleted
                                                    ? "text-green-700"
                                                    : "text-gray-700"}`}
                                            >
                                                Exercise {exercise.id}
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
    );
};

export default LessonsList;
