"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import KeyboardComponent from './KeyboardComponent';

export default function Keyboard({ }) {
    const [activeKey, setActiveKey] = useState('');
    const [timerStarted, setTimerStarted] = useState<boolean>();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const originalText = "The quick brown fox jumps over the lazy dog";
    const [currentError, setCurrentError] = useState(false);
    const [userInput, setUserInput] = useState<string>("");
    const [exercise, setExercise] = useState<number>(0);
    const [lesson, setLesson] = useState<number>(0);
    const [textSize, setTextSize] = useState<number>(2);

    useEffect(() => {
        // test data
        setLesson(1);
        setExercise(1);
        setTextSize(3);
    }, [])

    const textClass = `text-${textSize}xl text-gray-700 text-center px-6 py-2`;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!timerStarted) setTimerStarted(true);
        if (isDisabled) return;

        const value = e.target.value;
        const normalizedOriginal = originalText.trim();

        if (normalizedOriginal.startsWith(value)) {
            setCurrentError(false);
        } else {
            setCurrentError(true);
        }

        setUserInput(value);
        setActiveKey(value.slice(-1)); // Set the last character as active key
    };

    const restartTest = () => {
        setUserInput("");
        setCurrentError(false);
        setTimerStarted(false);
        setIsDisabled(false);
        setActiveKey('');
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
                    Exercise: {exercise} Lesson: {lesson}
                </h1>

                {/* <Link className="text-blue-500 text-2xl underline" href={"/"}>
                    Home
                </Link> */}

                <div className="flex justify-center">
                    <div className="w-full border-2 border-gray-300 rounded-lg p-4">
                        <p
                            className={`text-${textClass}xl text-gray-700 text-center px-6 py-2`}
                        >
                            <span className="text-gray-400">
                                {originalText.slice(0, userInput.length)}
                            </span>

                            <span
                                className={`${currentError
                                    ? "text-red-600 bg-red-100 rounded px-1"
                                    : "text-blue-600 bg-blue-100 rounded px-1"
                                    } font-bold underline`}
                            >
                                {originalText.charAt(userInput.length)}
                            </span>

                            <span>{originalText.slice(userInput.length + 1)}</span>
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

