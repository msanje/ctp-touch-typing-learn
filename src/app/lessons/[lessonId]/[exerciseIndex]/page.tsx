"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import KeyboardComponent from "@/components/KeyboardComponent";

export default function ExercisePage({ params }: { params: { lessonId: string, exerciseIndex: string } }) {
    const { lessonId, exerciseIndex } = params;

    const [activeKey, setActiveKey] = useState("");
    const [userInput, setUserInput] = useState<string>("");
    const [currentError, setCurrentError] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [exerciseContent, setExerciseContent] = useState<string>("");
    const [lessonTitle, setLessonTitle] = useState<string>("");

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${lessonId}`);
                if (res.ok) {
                    const data = await res.json();
                    setLessonTitle(data.title);
                    setExerciseContent(data.exercises[parseInt(exerciseIndex)]?.content || "");
                }
            } catch (error) {
                console.error("Error fetching exercise: ", error);
            }
        };

        fetchExercise();
    }, [lessonId, exerciseIndex]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!timerStarted) setTimerStarted(true);
        if (isDisabled) return;

        const value = e.target.value;

        if (exerciseContent.startsWith(value)) {
            setCurrentError(false);
        } else {
            setCurrentError(true);
        }

        setUserInput(value);

        // Check if the exercise is completed
        if (value === exerciseContent) {
            setIsDisabled(true);
        }

        setActiveKey(value.slice(-1)); // Set the last character as active key
    };

    const handleKeyDown = (e: KeyboardEvent) => setActiveKey(e.key);
    const handleKeyUp = () => setActiveKey("");

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 px-4">
            <div className={`transition-all duration-300 ${isDisabled ? "blur-sm" : ""}`}>
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                    {lessonTitle} - Exercise {parseInt(exerciseIndex) + 1}
                </h1>

                <div className="flex justify-center">
                    <div className="w-full border-2 border-gray-300 rounded-lg p-4">
                        <p className="text-3xl text-gray-700 text-center px-6 py-2">
                            <span className="text-gray-400">{exerciseContent.slice(0, userInput.length)}</span>
                            <span
                                className={`${currentError
                                    ? "text-red-600 bg-red-100 rounded px-1"
                                    : "text-blue-600 bg-blue-100 rounded px-1"
                                    } font-bold underline`}
                            >
                                {exerciseContent.charAt(userInput.length)}
                            </span>
                            <span>{exerciseContent.slice(userInput.length + 1)}</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-8 w-full">
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                        className={`w-full max-w-2xl px-6 py-3 text-xl border-2 rounded-lg focus:outline-none transition-all duration-200 ${currentError
                            ? "border-red-500 text-red-600 focus:border-red-500"
                            : "border-gray-300 text-gray-800 focus:border-blue-500"
                            }`}
                        placeholder={
                            isDisabled
                                ? "Exercise Completed! Navigate to the next one."
                                : "Start typing..."
                        }
                    />
                </div>
            </div>

            <KeyboardComponent activeKey={activeKey} />
        </div>
    );
}
