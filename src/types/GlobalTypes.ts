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
  exercisesCompleted: ExerciseProgress[];
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

export interface ExerciseProgress {
  exerciseId: number;
  accuracy: boolean;
  speed: boolean;
  lessThenTwoTypos: boolean;
}

export type CertificateData = {
  hasCertificate: boolean;
  isPaid: boolean;
  transactionStatus: string;
  certificateId: string;
  title: string;
  issuedDate: string;
  wpm: number | null;
  accuracy: number | null;
  userName: string;
};
