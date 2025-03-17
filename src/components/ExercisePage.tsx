"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'
import KeyboardComponent from "@/components/KeyboardComponent";
import ResultsModal from "@/components/ResultsModal";
import { fetchUserId } from "@/helpers/fetchUserId";
import { User } from "@/types/User";
import Link from "next/link";
import { Button } from "./ui/button";

export default function ExercisePage({ user }: { user: User }) {
    const params = useParams<{ lessonId: string; exerciseId: string }>()
    const { lessonId, exerciseId } = params;
    const router = useRouter();

    console.log("lessonId: ", lessonId, "exerciseId: ", exerciseId);

    const [activeKey, setActiveKey] = useState("");
    const [userInput, setUserInput] = useState<string>("");
    const [currentError, setCurrentError] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [exerciseContent, setExerciseContent] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [wpm, setwpm] = useState<number>(0);
    const [typos, setTypos] = useState<number>(0);
    const [userId, setUserId] = useState<String | null>(null);
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const id = await fetchUserId();
                setUserId(id);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            } finally {
                setError("");
                setLoading(false);
            }
        }

        getUserId();
    }, [])

    const handleNext = async () => {
        if (!userId) {
            console.error("User ID is not available yet.");
            return;
        }

        const nextexerciseId = parseInt(exerciseId) + 1;
        router.push(`/lessons/${lessonId}/${nextexerciseId}`);

        try {
            const response = await fetch('/api/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    email: user?.email,
                    lessonId: parseInt(lessonId),
                    exerciseId: parseInt(exerciseId),
                    completed: false,
                }),
            });

            if (response.ok) {
                console.log("Progress updated successfully.");
            } else {
                console.error("Failed to update progress.");
                setIsDisabled(true);
            }
        } catch (error) {
            console.error('Error updating progress:', error);
            setIsDisabled(true);
        }
    };

    const handleTryAgain = async () => {

        // Reset UI state
        setUserInput("");
        setIsDisabled(false);
        setCurrentError(false);
        setActiveKey("");
        setTimerStarted(false);
    };

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${lessonId}/${exerciseId}`);
                if (res.ok) {
                    const data = await res.json();
                    setExerciseContent(data.content || "")
                    setUserInput("");
                    setIsDisabled(false);
                }
            } catch (error) {
                console.error("Error fetching exercise: ", error);
            }
        };

        fetchExercise();
    }, [lessonId, exerciseId]);

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

        if (value === exerciseContent) {
            setIsDisabled(true);
            setCompleted(true); // ✅ Mark as completed
        }

        setActiveKey(value.slice(-1));
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
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-blue-100 to-gray-200">
            <div className={`transition-all duration-300 bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl border border-gray-300`}>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center">
                    Lesson {lessonId} - Exercise {exerciseId}
                </h1>

                <div className="flex justify-center">
                    <div className="w-full border-2 border-gray-300 rounded-lg p-6 bg-gray-50 shadow-md">
                        <p className="text-2xl md:text-3xl text-gray-700 text-center px-6 py-4 font-mono">
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
                        className={`w-full max-w-2xl px-6 py-3 text-xl border-2 rounded-lg focus:outline-none transition-all duration-200 shadow-sm ${currentError
                            ? "border-red-500 text-red-600 focus:border-red-500 bg-red-50"
                            : "border-gray-300 text-gray-800 focus:border-blue-500 bg-white"
                            }`}
                        placeholder={
                            isDisabled
                                ? "Exercise Completed! Click 'Next Exercise' to continue."
                                : "Start typing..."
                        }
                        autoFocus
                    />
                </div>
            </div>

            <Link href={`/lessons/${lessonId}/${parseInt(exerciseId) + 1}`} className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
                Next
            </Link>

            {/* Show the "Next Exercise" button when exercise is completed */}
            {isDisabled && (
                <ResultsModal wpm={wpm} typos={typos} onTryAgain={handleTryAgain} onNext={handleNext} />
            )}
            {/* TODO: Need to style this KeyboardComponent better */}
            {/* <KeyboardComponent activeKey={activeKey} /> */}
        </div>
    );
}