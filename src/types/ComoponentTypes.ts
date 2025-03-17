export type Exercise = {
    id: number;
    exerciseIndex: number;
    content: string;
    lessonId: number;
};

export type Lesson = {
    id: number;
    title: string;
    exercises: Exercise[];
};

export type LessonsState = Lesson[];

export type CompletedExerciseItem = {
    lesson: {
        id: number;
        title: string;
    };
    exercisesCompleted: number[];
};

export type ProgressData = {
    progress: CompletedExerciseItem[];
}

export type ProgressItem = {
    lesson: {
        id: number;
        title: string;
    };
    exercisesCompleted: number[];
}