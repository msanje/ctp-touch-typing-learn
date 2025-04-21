type LessonsData = {
  [key: number]: { exercises: number };
};

const lessons: LessonsData = {
  1: { exercises: 7 },
  2: { exercises: 7 },
  3: { exercises: 7 },
  4: { exercises: 7 },
  5: { exercises: 7 },
  6: { exercises: 7 },
  7: { exercises: 7 },
};

export const getCurrentExercise = (lessonId: number, exerciseId: number) => {
  const currentLesson = lessons[lessonId];

  if (!currentLesson) return null;

  if (exerciseId > 0 && exerciseId <= currentLesson.exercises) {
    return { lessonId, exerciseId };
  }

  return null;
};

export const getNextExercise = (lessonId: number, exerciseId: number) => {
  const currentLesson = lessons[lessonId];

  if (!currentLesson) return null;

  if (exerciseId < currentLesson.exercises) {
    return { lessonId, exerciseId: exerciseId + 1 };
  } else {
    const nextLessonId = lessonId + 1;
    if (lessons[nextLessonId]) {
      return { lessonId: nextLessonId, exerciseId: 1 };
    }
    return null; // No next lesson
  }
};

export const getPrevExercise = (lessonId: number, exerciseId: number) => {
  const currentLesson = lessons[lessonId];

  if (!currentLesson) return null;

  // Prevent negative values:
  if (exerciseId > 1) {
    return { lessonId, exerciseId: exerciseId - 1 };
  } else {
    const prevLessonId = lessonId - 1;
    if (lessons[prevLessonId]) {
      return {
        lessonId: prevLessonId,
        exerciseId: lessons[prevLessonId].exercises,
      };
    }
    return null; // No previous lesson
  }
};
