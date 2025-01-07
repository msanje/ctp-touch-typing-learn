"use client"

import { useState, useEffect } from 'react';
import KeyboardComponent from './KeyboardComponent';

export default function LearnInput({ user }: { user: any }) {
    const [activeKey, setActiveKey] = useState('');
    const [timerStarted, setTimerStarted] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [currentError, setCurrentError] = useState(false);
    const [userInput, setUserInput] = useState<string>("");
    const [exerciseIndex, setExerciseIndex] = useState<number>(0);
    const [exercises, setExercises] = useState<string[]>([]);
    const [lessonTitle, setLessonTitle] = useState<string>("");
    const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
    const [userId, setUserId] = useState<number>(0);

    interface Lesson {
        title: string;
        exercises: { content: string }[];
    }

    const [lessonsData, setLessonsData] = useState<Lesson[]>([]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons`);
                if (res.ok) {
                    const data = await res.json();
                    setLessonsData(data);
                }
            } catch (error) {
                console.error("Error fetching lessons: ", error);
            }
        };

        fetchLessons();
    }, [])

    useEffect(() => {
        // fetch exercises from the backend
        const fetchExercises = async () => {
            if (lessonsData.length > 0) {
                const currentLesson = lessonsData[currentLessonIndex];
                setExercises(
                    currentLesson.exercises.map(
                        (exercise: { content: string }) => exercise.content
                    )
                );
                setLessonTitle(currentLesson.title);
            }
        };

        fetchExercises();
    }, [currentLessonIndex, lessonsData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!timerStarted) setTimerStarted(true);
        if (isDisabled) return;

        const value = e.target.value;
        const normalizedOriginal = exercises[exerciseIndex]?.trim();

        if (normalizedOriginal.startsWith(value)) {
            setCurrentError(false);
        } else {
            setCurrentError(true);
        }

        setUserInput(value);

        // check if the exercise is completed
        if (value === normalizedOriginal) {
            // Do not automatically move to the next exercise
        }

        setActiveKey(value.slice(-1)); // Set the last character as active key
    };

    const handleNextExercise = async () => {
        if (exerciseIndex < exercises.length - 1) {
            setExerciseIndex(exerciseIndex + 1);
            setUserInput("");
            setCurrentError(false);
            setTimerStarted(false);
            setIsDisabled(false);
        } else {
            if (currentLessonIndex < lessonsData.length - 1) {
                setCurrentLessonIndex(currentLessonIndex + 1);
                setExerciseIndex(0);
                setUserInput("");
                setCurrentError(false);
                setTimerStarted(false);
                setIsDisabled(false);
            } else {
                setIsDisabled(true);
            }
        }

        try {
            // Update user progress via API route
            const response = await fetch('/api/progress', { // Adjust the path if your API route is different
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    email: user.email,
                    lessonId: lessonsData[currentLessonIndex].id,
                    exerciseIndex: exerciseIndex + 1,
                    completed: exerciseIndex + 1 === exercises.length - 1,
                }),
            });

            if (response.ok) {
                // Progress updated successfully
                if (exerciseIndex < exercises.length - 1) {
                    setExerciseIndex(exerciseIndex + 1);
                    setUserInput("");
                    setCurrentError(false);
                    setTimerStarted(false);
                    setIsDisabled(false);
                } else {
                    if (currentLessonIndex < lessonsData.length - 1) {
                        setCurrentLessonIndex(currentLessonIndex + 1);
                        setExerciseIndex(0);
                        setUserInput("");
                        setCurrentError(false);
                        setTimerStarted(false);
                        setIsDisabled(false);
                    } else {
                        setIsDisabled(true);
                    }
                }
            } else {
                console.error('Failed to update progress:', response.status);
                // Handle error, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error updating progress:', error);
            // Handle error, e.g., show an error message to the user
        }
    }

    const restartTest = () => {
        setUserInput("");
        setCurrentError(false);
        setTimerStarted(false);
        setIsDisabled(false);
        setActiveKey('');
        setExerciseIndex(0);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setActiveKey(e.key);
        };

        const handleKeyUp = () => {
            setActiveKey('');
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 px-4">
            <div
                className={`transition-all duration-300 ${isDisabled ? "blur-sm" : ""}`}
            >
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                    {lessonTitle} - Exercise {exerciseIndex + 1}/{exercises.length}
                </h1>

                {/* <Link className="text-blue-500 text-2xl underline" href={"/"}>
                    Home
                </Link> */}

                <div className="flex justify-center">
                    <div className="w-full border-2 border-gray-300 rounded-lg p-4">
                        <p
                            className={`text-3xl text-gray-700 text-center px-6 py-2`}
                        >
                            <span className="text-gray-400">
                                {exercises[exerciseIndex]?.slice(0, userInput.length)}
                            </span>

                            <span
                                className={`${currentError
                                    ? "text-red-600 bg-red-100 rounded px-1"
                                    : "text-blue-600 bg-blue-100 rounded px-1"
                                    } font-bold underline`}
                            >
                                {exercises[exerciseIndex]?.charAt(userInput.length)}
                            </span>

                            <span>{exercises[exerciseIndex]?.slice(userInput.length + 1)}</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-8 w-full">
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        onPaste={handlePaste}
                        disabled={isDisabled}
                        className={`w-full max-w-2xl px-6 py-3 text-xl border-2 rounded-lg focus:outline-none transition-all duration-200 ${currentError
                            ? "border-red-500 text-red-600 focus:border-red-500"
                            : "border-gray-300 text-gray-800 focus:border-blue-500"
                            }`}
                        placeholder={
                            isDisabled
                                ? "Test Over! Press Restart to try again."
                                : "Start typing..."
                        }
                    />
                </div>

                {userInput === exercises[exerciseIndex] && ( // Conditionally render the button
                    <button
                        className="px-6 py-3 text-xl border-2 rounded-lg focus:outline-none transition-all duration-200 bg-green-500 hover:bg-green-600 text-white mt-4"
                        onClick={handleNextExercise}
                    >
                        Next Exercise
                    </button>
                )}

                <div className="flex flex-col items-center mt-8 w-full">
                    <button
                        className="px-6 py-3 text-xl border-2 rounded-lg focus:outline-none transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white mb-4"
                        onClick={restartTest}
                    >
                        Restart
                    </button>
                </div>
            </div>

            <KeyboardComponent activeKey={activeKey} />
        </div>
    );
}