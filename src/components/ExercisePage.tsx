"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'
import ResultsModal from "@/components/ResultsModal";
import { fetchUserId } from "@/helpers/fetchUserId";
import Link from "next/link";
import { getNextExercise, getPrevExercise } from "@/utils/lessonNavigator";
import { UserType } from "@/types/GlobalTypes";

export default function ExercisePage({ user }: { user: UserType }) {
    const params = useParams<{ lessonId: string; exerciseId: string }>()
    const { lessonId, exerciseId } = params;
    const router = useRouter();

    console.log("user: ", user);

    const [activeKey, setActiveKey] = useState("");
    const [currentError, setCurrentError] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [exerciseContent, setExerciseContent] = useState<string>("");
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);
    const [completed, setCompleted] = useState(false);
    const [correctKeyStrokes, setCorrectKeystrokes] = useState(0);
    const [incorrectKeyStrokes, setIncorrectKeystrokes] = useState(0);
    const [userInput, setUserInput] = useState("");
    // TODO: Verify whether we need this
    // const [timeElapsed, setTimeElapsed] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [expectedTimeInSeconds, setExpectedTimeInSeconds] = useState<number>(0);

    const [speed, setSpeed] = useState<boolean>(false);
    const [accuracy, setAccuracy] = useState<boolean>(false);
    const [lessThenTwoTypos, setLessThenTwoTypos] = useState<boolean>(false);

    useEffect(() => {
        // TODO: Use all these in the component
        setWpm(28);
        console.log("activeKey: ", activeKey);
        console.log("error: ", error);
        console.log("correctKeyStrokes: ", correctKeyStrokes)
        console.log("expectedTimeInSeconds: ", expectedTimeInSeconds);
    }, [])

    useEffect(() => {
        if (exerciseContent) {
            const length = exerciseContent.length;
            const baseTime = 10;
            const additionalTimePerChar = 0.5;

            const calculatedTime = baseTime + (length * additionalTimePerChar);

            setExpectedTimeInSeconds(calculatedTime);
        } else {
            setExpectedTimeInSeconds(0);
        }
    }, [exerciseContent])

    // TODO: Verify whether we need this
    // useEffect(() => {
    //     if (timeElapsed > 0) {
    //         const minutes = timeElapsed / 60;
    //         const wordsTyped = correctKeyStrokes / 5;
    //         const currentWPM = Math.round(wordsTyped / minutes);
    //         setWpm(currentWPM);
    //     }
    // }, [timeElapsed, correctKeyStrokes]);

    useEffect(() => {
        if (wpm >= 28) {
            setSpeed(true);
        } else {
            setSpeed(false);
        }

        if (incorrectKeyStrokes === 0 && completed) {
            setAccuracy(true)
        } else {
            setAccuracy(false);
        }

        if (incorrectKeyStrokes < 2 && completed) {
            setLessThenTwoTypos(true);
        } else {
            setLessThenTwoTypos(false);
        }

    }, [wpm, incorrectKeyStrokes, completed])

    const currentLessonId = parseInt(lessonId);
    const currentExerciesId = parseInt(exerciseId);

    const next = getNextExercise(currentLessonId, currentExerciesId);
    const prev = getPrevExercise(currentLessonId, currentExerciesId);

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

        // TODO: Verify this works as intented: if exercise not completed progress doesn't get updated.
        if (!completed) return;

        const nextExercise = getNextExercise(parseInt(lessonId), parseInt(exerciseId));

        if (nextExercise) {
            router.push(`/lessons/${nextExercise.lessonId}/${nextExercise.exerciseId}`);
        } else {
            setIsDisabled(true);
            return;
        }

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
                    speed,
                    accuracy,
                    lessThenTwoTypos
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

        setCorrectKeystrokes(0);
        setIncorrectKeystrokes(0);
        setCompleted(false); // To reset completion
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

    // TODO: Verify whether we need this
    // useEffect(() => {
    //     if (completed && timeElapsed > 0) {
    //         const calculatedWPM = Math.round((userInput.split(' ').length / timeElapsed) * 60);
    //         setWpm(calculatedWPM);

    //         // Set speed based on calculated WPM
    //         setSpeed(calculatedWPM > 28);
    //     }
    // }, [completed, timeElapsed, userInput]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!timerStarted) setTimerStarted(true);
        if (isDisabled) return;

        const value = e.target.value;
        const normalizedOriginal = exerciseContent.trim();

        const index = value.length - 1;
        if (index >= 0) {
            if (value[index] === normalizedOriginal[index]) {
                setCorrectKeystrokes(prev => prev + 1);
            } else {
                setIncorrectKeystrokes(prev => prev + 1);
            }
        }

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


    return (loading ? (
        <div>
            loading.....
        </div >) : (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-blue-100 to-gray-200">
            <div className={`transition-all duration-300 bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl border border-gray-300`} >
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
            </div >

            <div className="flex flex-row justify-between w-52">
                {
                    prev && (
                        <Link href={`/lessons/${prev.lessonId}/${prev.exerciseId}`} className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
                            Prev
                        </Link>
                    )
                }

                {
                    next && (
                        <Link href={`/lessons/${next.lessonId}/${next.exerciseId}`} className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
                            Next
                        </Link>
                    )
                }
            </div>

            {/* Show the "Next Exercise" button when exercise is completed */}
            {
                isDisabled && (
                    <ResultsModal wpm={wpm} typos={incorrectKeyStrokes} onTryAgain={handleTryAgain} onNext={handleNext} speed={speed} accuracy={accuracy} lessThenTwoTypos={lessThenTwoTypos} />
                )
            }
            {/* TODO: Need to style this KeyboardComponent better */}
            {/* <KeyboardComponent activeKey={activeKey} /> */}
        </div >
    )
    );
}