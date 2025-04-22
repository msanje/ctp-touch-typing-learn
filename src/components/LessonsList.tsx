import Link from "next/link";
import Image from "next/image";
import { Book, CheckCircle, Circle } from "lucide-react";
import {
  ExerciseProgress,
  LessonsType,
  ProgressData,
} from "@/types/GlobalTypes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type LessonsListProps = {
  userId: string | null;
  lessons: LessonsType[] | null;
  completedExercises: ProgressData | null;
};

const LessonsList: React.FC<LessonsListProps> = ({
  userId,
  lessons,
  completedExercises,
}) => {
  // Create a Set for fast lookup: `${lessonId}-${exerciseIndex}`
  const completedExerciseSet = new Set<string>();
  const [completedExercisesWithProgress, setCompletedExercisesWithProgress] =
    useState<ProgressData | null>(null);

  const completedMetricsMap = new Map<
    string,
    {
      accuracy: boolean;
      speed: boolean;
      lessThenTwoTypos: boolean;
    }
  >();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/progress?userId=${userId}&detailed=true`);
        const data = await res.json();
        setCompletedExercisesWithProgress(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch progress data");
        }
      }
    };

    if (userId) {
      fetchProgress();
    }
  }, [userId]);

  if (completedExercises?.progress) {
    completedExercises.progress.forEach(({ lesson, exercisesCompleted }) => {
      exercisesCompleted.forEach((exerciseIndex) => {
        completedExerciseSet.add(`${lesson.id}-${exerciseIndex}`);
      });
    });
  }

  if (completedExercisesWithProgress?.progress) {
    completedExercisesWithProgress.progress.forEach(
      ({ lesson, exercisesCompleted }) => {
        exercisesCompleted.forEach((exercise: ExerciseProgress) => {
          const key = `${lesson.id}-${exercise.exerciseId}`;
          completedExerciseSet.add(key);
          completedMetricsMap.set(key, {
            accuracy: exercise.accuracy,
            speed: exercise.speed,
            lessThenTwoTypos: exercise.lessThenTwoTypos,
          });
        });
      },
    );
  }

  return (
    <div className="space-y-6">
      {lessons && lessons.length > 0 ? (
        lessons.map(({ id, title, exercises }) => {
          const completedCount = exercises.filter((exercise) =>
            completedExerciseSet.has(
              `${exercise.lessonId}-${exercise.exerciseIndex + 1}`,
            ),
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
                  const key = `${exercise.lessonId}-${exercise.exerciseIndex + 1}`;
                  const isCompleted = completedExerciseSet.has(key);
                  const metrics = completedMetricsMap.get(key);

                  return (
                    <Link
                      key={exercise.id}
                      href={`/lessons/${exercise.lessonId}/${exercise.exerciseIndex + 1}`}
                      className="cursor-pointer"
                    >
                      <li
                        className={`flex flex-col p-3 rounded-lg transition-colors cursor-pointer ${
                          isCompleted ? "bg-green-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                          <span
                            className={`font-medium ${
                              isCompleted ? "text-green-700" : "text-gray-700"
                            }`}
                          >
                            Exercise {exercise.exerciseIndex + 1}
                          </span>
                        </div>

                        {isCompleted && metrics && (
                          <div className="flex justify-start space-x-4 mt-3 ml-8">
                            <div className="flex flex-col items-center">
                              <Image
                                src={
                                  metrics.lessThenTwoTypos
                                    ? "/star_gold.svg"
                                    : "/star_gray.svg"
                                }
                                alt="Typos less than 2"
                                width={24}
                                height={24}
                              />
                              <p className="text-[10px] text-gray-600 mt-1">
                                Typos &lt; 2
                              </p>
                            </div>
                            <div className="flex flex-col items-center">
                              <Image
                                src={
                                  metrics.accuracy
                                    ? "/bullseye_gold.svg"
                                    : "/bullseye_gray.svg"
                                }
                                alt="No typos"
                                width={24}
                                height={24}
                              />
                              <p className="text-[10px] text-gray-600 mt-1">
                                Perfect
                              </p>
                            </div>
                            <div className="flex flex-col items-center">
                              <Image
                                src={
                                  metrics.speed
                                    ? "/thunder_gold.svg"
                                    : "/thunder_gray.svg"
                                }
                                alt="Speed > 28"
                                width={24}
                                height={24}
                              />
                              <p className="text-[10px] text-gray-600 mt-1">
                                Speed
                              </p>
                            </div>
                          </div>
                        )}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 py-10">
          No lessons available.
        </div>
      )}
    </div>
  );
};

export default LessonsList;
