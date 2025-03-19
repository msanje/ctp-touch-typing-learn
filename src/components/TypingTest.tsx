"use client";

import { lorem } from "@/helpers/paragraph";
import { checkWpm } from "@/helpers/wpm";
import { TypingTestResponse } from "@/types/GlobalTypes";
import { Redo, Settings, BarChart, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";

const TypingTest = () => {
    const [started, setStarted] = useState<boolean>(false);
    const [timer, setTimer] = useState(60);
    const [input, setInput] = useState("");
    const [wpm, setWpm] = useState<number | null>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [currentError, setCurrentError] = useState<boolean>(false);
    const [finalWpm, setFinalWpm] = useState<number>(0);
    const sentence = lorem;
    const sentenceRef = useRef<HTMLDivElement | null>(null);
    // ref for the current character element
    const currentCharRef = useRef<HTMLSpanElement | null>(null);
    const [correctKeyStrokes, setCorrectKeystrokes] = useState(0);
    const [incorrectKeyStrokes, setIncorrectKeystrokes] = useState(0);
    const [typingTestResults, setTypingTestResults] = useState<TypingTestResponse | null>(null);
    const [error, setError] = useState<string>("");
    const { data: session } = useSession();
    const user = session?.user;

    console.log("typingTestResults: ", typingTestResults);

    console.log("wpm, accuracy: ", wpm, accuracy);
    console.log("finalWpm: ", finalWpm);

    // TODO: Use this error somewhere
    console.log("error: ", error);
    console.log("currentError: ", currentError);

    // Starting the timer when test begins
    useEffect(() => {
        if (started) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current!);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timer === 0) {
            clearInterval(intervalRef.current!);
            setTimer(60);
        }

        return () => clearInterval(intervalRef.current!);
    }, [started]);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (started && inputRef.current) {
            inputRef.current.focus();
        }
    }, [started]);

    const restartTest = () => {
        setInput("");
        setCurrentError(false);
        setTimer(60);
        setStarted(false);
        setWpm(null);

        if (sentenceRef.current) {
            sentenceRef.current.scrollTo({ top: 0, behavior: "auto" })
        }
    };

    // Handle click outside to stop the test
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sentenceRef.current && !sentenceRef.current.contains(event.target as Node) && event.target !== document.querySelector("input")) {
                setStarted(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        currentCharRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [input]);

    useEffect(() => {
        if (!user?.id) return;

        const fetchWpm = async () => {
            try {
                const response = await fetch(`/api/wpm?userId=${user.id}`);
                if (!response.ok) throw new Error("Failed to fetch WPM results.");
                setTypingTestResults(await response.json());
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchWpm();
    }, [user?.id])

    const saveWpmScore = async (wordsPerMinute: number, accuracy: number) => {
        try {
            const userId = user?.id;

            const response = await fetch("/api/wpm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    wpm: wordsPerMinute,
                    accuracy: accuracy,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Typing test result saved successfully: ", result);
            } else {
                const errorData = await response.json();
                console.error("Error saving typing test result: ", errorData.error);
            }
        } catch (error) {
            console.error("Error making request: ", error);
        }
    };

    useEffect(() => {
        const wordsPerMinute = checkWpm(input.length, 1);
        setWpm(wordsPerMinute);

        const totalKeystrokes = correctKeyStrokes + incorrectKeyStrokes;
        const calculateAccuracy = totalKeystrokes > 0 ? Math.round((correctKeyStrokes / totalKeystrokes) * 100) : 0;
        setAccuracy(calculateAccuracy);
    }, [input, correctKeyStrokes, incorrectKeyStrokes])

    // triggering recalculation of wpm when the timer ends
    useEffect(() => {
        if (timer === 0) {
            const wordsPerMinute = checkWpm(input.length, 1);
            setFinalWpm(wordsPerMinute);

            const totalKeystrokes = correctKeyStrokes + incorrectKeyStrokes;
            const calculateAccuracy = totalKeystrokes > 0 ? Math.round((correctKeyStrokes / totalKeystrokes) * 100) : 0;
            setAccuracy(calculateAccuracy);

            // console.log("before: ", finalWpm, accuracy);
            // saveWpmScore(finalWpm, accuracy);
            // console.log("after: ", finalWpm, accuracy);

            console.log("before version two: ", finalWpm, accuracy);
            saveWpmScore(wordsPerMinute, calculateAccuracy);
            console.log("after version two: ", finalWpm, accuracy);
        }
    }, [timer]);

    const charStates = useMemo(() => {
        const cleanedSentence = sentence.trim().replace(/\s+/g, " ");

        return cleanedSentence.split("").map((char, index) => {
            const isTyped = index < input.length;
            const isCorrect = isTyped && input[index] === char;

            return { char, isCorrect, isTyped };
        });
    }, [input, sentence]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const normalizedOriginal = sentence.trim();

        const newCharIndex = value.length - 1;
        if (newCharIndex >= 0) {
            if (value[newCharIndex] === normalizedOriginal[newCharIndex]) {
                setCorrectKeystrokes(prev => prev + 1);
            } else {
                setIncorrectKeystrokes(prev => prev + 1);
            }
        }

        if (normalizedOriginal.startsWith(value)) {
            setCurrentError(false);
        } else {
            setCurrentError(true);
        }

        setInput(value);
    }

    const handleStart = () => {
        setStarted(true);
        setInput("");
        setWpm(null);
        setAccuracy(0);
    }

    return (

        <div className="flex flex-col justify-center items-center pt-6 max-w-5xl mx-auto px-4 bg-gradient-to-b from-blue-200 to-white">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-3 text-center -mt-4 tracking-tight leading-tight drop-shadow-md ">
                Typing Certification Test
            </h1>
            <h3 className="mb-2 text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto text-center">
                Take a <span className="font-semibold text-gray-600">1-minute test</span> to certify your typing speed.
            </h3>
            <h4 className="text-lg mb-2 font-semibold text-purple-600 text-center">
                English for Beginners
            </h4>

            {/* Stats Bar */}
            <div className="flex justify-between items-center w-full bg-gray-50 rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center space-x-2">
                    <Clock className="text-blue-500" size={20} />
                    <div className="text-2xl font-mono font-bold">{timer}s</div>
                </div>
                <div className="flex space-x-8">
                    <div className="flex flex-col items-center">
                        <div className="text-gray-500 text-sm uppercase tracking-wider">Speed</div>
                        <div className="text-2xl font-bold">{wpm || 0} <span className="text-sm text-gray-500">WPM</span></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-gray-500 text-sm uppercase tracking-wider">Accuracy</div>
                        <div className="text-2xl font-bold">{accuracy || 0}<span className="text-sm text-gray-500">%</span></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-gray-500 text-sm uppercase tracking-wider">HIGHEST WPM</div>
                        <div className="text-2xl font-bold">{typingTestResults?.highestWpm?.wpm || 0}<span className="text-sm text-gray-500 ml-1">WPM</span></div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={restartTest} className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 transition-colors">
                        <Redo size={18} />
                        <span>Restart</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <Settings size={18} />
                        <span>Settings</span>
                    </button>
                </div>
            </div>

            {/* Text Display Area */}
            <div className="relative w-full h-64 bg-white rounded-lg border border-gray-200 shadow-lg overflow-auto mb-4">
                <div ref={sentenceRef} className={`p-6 leading-relaxed text-3xl transition-all duration-300 ${!started ? "blur-sm select-none" : "blur-none"}`}>
                    {charStates.map(({ char, isCorrect, isTyped }, index) => {
                        const isCurrent = index === input.length;
                        return (
                            <span key={index} ref={isCurrent ? currentCharRef : null} className={isTyped ? (isCorrect ? "text-gray-400" : "text-red-500 bg-red-100") : "text-gray-800"}>
                                {char}
                            </span>
                        );
                    })}
                </div>

                {/* Start Button Overlay */}
                {!started && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10">
                        <button
                            onClick={handleStart}
                            className="fixed bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transform transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                            Start Typing Test
                        </button>
                    </div>
                )}
            </div>

            {/* Input Field */}
            <input ref={inputRef} type="text" className="w-full p-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-4" value={input} onChange={handleInput} disabled={!started || timer === 0} placeholder={started ? "Type here..." : "Click 'Start' to begin the test"} autoComplete="off" autoFocus />

            {/* Test Completion Overlay */}
            {timer === 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                            <BarChart size={32} />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Test Complete!</h2>
                        <div className="flex justify-center space-x-8 my-6">
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Your Speed</span>
                                <span className="text-4xl font-bold">{finalWpm ?? wpm}</span>
                                <span className="text-gray-500 text-sm">WPM</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Accuracy</span>
                                <span className="text-4xl font-bold">
                                    {accuracy}
                                </span>
                                <span className="text-gray-500 text-sm">%</span>
                            </div>
                        </div>
                        <button
                            onClick={restartTest} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full transition-colors">
                            Take Another Test
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypingTest;