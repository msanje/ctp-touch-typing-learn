export interface LessonsType {
    id: number;
    title: string;
    exercises: Exercise[];
}

export interface Exercise {
    id: number;
    exerciseIndex: number;
    content: string;
    lessonId: number;
}

export interface ProgressData {
    progress: Progress[];
}

export interface Progress {
    lesson: Lesson;
    exercisesCompleted: number[];
}

export interface Lesson {
    id: number;
    title: string;
}

export interface UserType {
    id?: string | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
}

export interface TypingTestResponse {
    typingTestResults: HighestWpm[];
    highestWpm: HighestWpm;
}

export interface HighestWpm {
    id: number;
    userId: string;
    wpm: number;
    accuracy: number;
    timestamp: Date;
}
