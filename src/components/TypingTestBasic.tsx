"use client";

import { useEffect, useRef, useState } from "react";
import { lorem } from "../helpers/paragraph";
import Image from "next/image";
import { checkWpm } from "../helpers/wpm";
import { useSession } from "next-auth/react";
import { RotateCcw } from "lucide-react";

const TypingTestBasic = () => {
    const originalText = lorem;
    const [userInput, setUserInput] = useState("");
    const [currentError, setCurrentError] = useState(false);
    const [selectedTime, setSelectedTime] = useState<number>(60);
    const [timeLeft, setTimeLeft] = useState<number>(selectedTime);
    const [timerStarted, setTimerStarted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [wpmScore, setWpmScore] = useState(0);
    const [textSize, setTextSize] = useState<number>(2);
    const sentenceRef = useRef<HTMLDivElement | null>(null);
    // NEW: A ref for the current character element
    const currentCharRef = useRef<HTMLSpanElement | null>(null);
    const { data: session } = useSession();
    const user = session?.user;

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(parseInt(event.target.value, 10));
    };

    const startTest = () => {
        setTimeLeft(selectedTime);
        setTimerStarted(true);
    };

    // Remove old scroll logic and use scrollIntoView on current character
    useEffect(() => {
        currentCharRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [userInput]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!timerStarted) {
            setTimerStarted(true);
            setTimeLeft(selectedTime);
        }
        if (isDisabled) return;

        const value = e.target.value;
        const normalizedOriginal = originalText.trim();

        if (normalizedOriginal.startsWith(value)) {
            setCurrentError(false);
        } else {
            setCurrentError(true);
        }

        setUserInput(value);
    };

    const calculateWPM = () => {
        const wordsPerMinute = checkWpm(userInput.length, 1);
        setWpmScore(wordsPerMinute);
    };

    const restartTest = () => {
        setUserInput("");
        setCurrentError(false);
        setTimeLeft(selectedTime);
        setTimerStarted(false);
        setIsDisabled(false);
        setWpmScore(0);

        if (sentenceRef.current) {
            sentenceRef.current.scrollTo({ top: 0, behavior: "instant" });
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTextSize = parseInt(event.target.value, 10);
        setTextSize(newTextSize);
    };

    useEffect(() => {
        if (!timerStarted) return;

        if (timeLeft <= 0) {
            calculateWPM();
            setIsDisabled(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timerStarted, timeLeft]);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white px-4 py-8">
            {/* Content container with conditional blur */}
            <div className={`w-full max-w-3xl transition-all duration-300 ${isDisabled ? "blur-sm" : ""}`}>
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 text-center -mt-16">
                    Test Your Typing Speed
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Practice your typing skills and improve your speed!
                </p>

                {/* Timer and Controls */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Image src="/timer.svg" alt="Timer" width={32} height={32} />
                        <select
                            value={selectedTime}
                            onChange={handleTimeChange}
                            className="px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            disabled={timerStarted}
                        >
                            <option value={60}>60s</option>
                            <option value={300}>5 Mins</option>
                        </select>
                        <div className="font-medium">
                            Time: <span className="text-red-500 font-bold">{timeLeft}s</span>
                        </div>
                    </div>

                    <div className="font-bold text-xl flex flex-row justify-between px-4">
                        <button
                            onClick={restartTest}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors mx-4"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                        WPM: <span className="text-green-600">{wpmScore}</span>
                    </div>
                </div>

                {/* Text Size Control */}
                <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-sm text-gray-500">Text Size:</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Smaller</span>
                        <input
                            type="range"
                            min={2}
                            max={5}
                            value={textSize}
                            onChange={handleSliderChange}
                            className="w-32 h-2 bg-gray-200 rounded appearance-none cursor-pointer"
                        />
                        <span className="text-sm">Larger</span>
                    </div>
                </div>

                {/* Typing Content Box */}
                <div
                    ref={sentenceRef}
                    className="bg-white border border-gray-200 rounded-lg shadow-md p-6 overflow-y-auto h-64 mb-6"
                >
                    <p className={`text-${textSize}xl h-56 leading-relaxed text-gray-700`}>
                        {/* Typed characters */}
                        <span className="text-gray-400">
                            {originalText.slice(0, userInput.length)}
                        </span>
                        {/* Current character with ref */}
                        <span
                            ref={currentCharRef}
                            className={`${currentError
                                ? "text-red-600 bg-red-100 rounded px-1"
                                : "text-blue-600 bg-blue-100 rounded px-1"
                                } font-bold underline`}
                        >
                            {originalText.charAt(userInput.length)}
                        </span>
                        {/* Remaining characters */}
                        <span>{originalText.slice(userInput.length + 1)}</span>
                    </p>
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    onPaste={handlePaste}
                    disabled={isDisabled}
                    className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none transition ${currentError
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 focus:border-blue-400"
                        }`}
                    placeholder={
                        isDisabled
                            ? "Test Over! Press Restart to try again."
                            : "Start typing here..."
                    }
                    autoFocus
                />

                {/* Helper text */}
                <p className="text-gray-500 text-sm mt-2 text-center">
                    Just start typing to begin the test!
                </p>
            </div>

            {/* WPM Results Overlay */}
            {isDisabled && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center w-80">
                        <div className="mb-2">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-medium rounded-full text-sm">
                                Test Complete
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-1">Your Speed</h2>
                        <div className="text-5xl font-bold text-blue-600 mb-4">
                            {wpmScore} <span className="text-lg text-gray-500">WPM</span>
                        </div>
                        {!user && (
                            <p className="text-gray-600 text-sm mb-4">
                                Create an account to save your results and track your progress!
                            </p>
                        )}
                        <button
                            onClick={restartTest}
                            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypingTestBasic;
