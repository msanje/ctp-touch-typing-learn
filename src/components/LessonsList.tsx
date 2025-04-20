import Link from "next/link";
import { Book, CheckCircle, Circle } from "lucide-react";
import { LessonsType, ProgressData } from "@/types/GlobalTypes";

type LessonsListProps = {
  lessons: LessonsType[] | null;
  completedExercises: ProgressData | null;
};

const LessonsList: React.FC<LessonsListProps> = ({
  lessons,
  completedExercises,
}) => {
  // Create a Set for fast lookup: `${lessonId}-${exerciseIndex}`
  const completedExerciseSet = new Set<string>();

  if (completedExercises?.progress) {
    completedExercises.progress.forEach(({ lesson, exercisesCompleted }) => {
      exercisesCompleted.forEach((exerciseIndex) => {
        completedExerciseSet.add(`${lesson.id}-${exerciseIndex}`);
      });
    });
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
                  const isCompleted = completedExerciseSet.has(
                    `${exercise.lessonId}-${exercise.exerciseIndex + 1}`,
                  );

                  return (
                    <Link
                      key={exercise.id}
                      href={`/lessons/${exercise.lessonId}/${exercise.exerciseIndex + 1}`}
                      className="cursor-pointer"
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
                          className={`flex-1 font-medium ${
                            isCompleted ? "text-green-700" : "text-gray-700"
                          }`}
                        >
                          Exercise {exercise.exerciseIndex + 1}
                        </span>
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
