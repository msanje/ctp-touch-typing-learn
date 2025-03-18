export type Lesson = {
    id: number;
    title: string;
    exercises: Exercise[]
    Progress: Progress[]
}

export type Exercise = {
    id: number;
    exerciseIndex: number;
    content: string;
    lessonId: number;
    lesson: Lesson;
    Progress: Progress[]
}

export type User = {
    id: string;
    username: string;
    email: string;
    password: Progress[];
    TypingTestResult: TypingTestResult[];
}

export type Progress = {
    id: number;

    userId: string;
    lessonId: number;
    exerciseId: number;
    completed: boolean;
    speed: boolean | null;
    accuracy: boolean | null;
    lessThanTwoTypos: boolean | null;
    timestamp: string;
    user: User;
    lesson: Lesson;
    exercise: Exercise;
};

export type TypingTestResult = {
    id: number;
    userId: string;
    wpm: number;
    accuracy: number;
    timestamp: string;
    user: User;
};

export type ProgressResponse = {
    progress: {
        lesson: {
            id: number;
            title: string;
        };
        exercisesCompleted: number[];
    }[];
};



// API Response specific types
// TODO: Complete this

export type LessonsResponse = Lesson[];

export type TypingTestResultsResponse = TypingTestResult[];