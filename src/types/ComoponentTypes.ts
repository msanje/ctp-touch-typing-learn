export type Exercise = {
    id: number;
    index: number;
    content: string;
    lessonId: number;
};

export type Lesson = {
    id: number;
    title: string;
    exercises: Exercise[];
};

export type LessonsState = Lesson[];

export type ProgressData = {
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
