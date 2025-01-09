export type Exercise = {
    id: number; // Auto-incremented ID
    index: number; // Index of the exercise (position/order within the lesson)
    content: string; // Main content of the exercise
    lessonId: number; // Foreign key referencing the Lesson
    lesson: Lesson; // Related Lesson object
};

export type Lesson = {
    id: number; // Auto-incremented ID
    title: string; // Unique title of the lesson
    exercises: Exercise[]; // Array of exercises in the lesson
};
