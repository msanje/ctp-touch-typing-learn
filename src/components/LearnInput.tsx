"use client"

import { useState, useEffect } from 'react';
import KeyboardComponent from './KeyboardComponent';

export default function LearnInput({ lessonId }: { lessonId: number }) {
    const [activeKey, setActiveKey] = useState('');
    const [timerStarted, setTimerStarted] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [currentError, setCurrentError] = useState(false);
    const [userInput, setUserInput] = useState<string>("");
    const [exerciseIndex, setExerciseIndex] = useState<number>(0);
    const [exercises, setExercises] = useState<string[]>([]);
    const [lessonTitle, setLessonTitle] = useState<string>("");

    useEffect(() => {
        // fetch exercises from the backend
        const fetchExercises = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${lessonId}`);
            const lessonData = await res.json();
            setExercises(lessonData.exercises.map((exercise: { content: string }) => exercise.content));
            setLessonTitle(lessonData.title);
        };

        fetchExercises();
    }, [lessonId]);


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

        // check if the exercis is completed
        if (value === normalizedOriginal) {
            setTimeout(() => handleNextExercise(), 500);
        }

        setActiveKey(value.slice(-1)); // Set the last character as active key
    };

    const handleNextExercise = () => {
        if (exerciseIndex < exercises.length - 1) {
            setExerciseIndex(exerciseIndex + 1);
            setUserInput("");
            setCurrentError(false);
            setTimerStarted(false);
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
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

