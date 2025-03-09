"use client";

import { checkWpm } from "@/helpers/wpm";
import { Redo, Settings, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TypingTest = () => {
    // TODO: Fetch sentence from backend
    const textContainerRef = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState<boolean>(false);
    const [timer, setTimer] = useState(60);
    const [input, setInput] = useState("");
    const [wpm, setWpm] = useState<number | null>(0);
    const [accuracy, setAccuracy] = useState<number | null>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [currentError, setCurrentError] = useState<boolean>(false);
    const [finalWpm, setFinalWpm] = useState<number | null>(null);
    const [sentence, setSentence] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad repellendus dignissimos et distinctio dolorum totam esse magni est molestias, nemo magnam odit quisquam, iure quasi illo corporis eum molestiae aspernatur. Qui tempora eius in laborum asperiores culpa odio optio laboriosam esse neque nobis quasi suscipit architecto saepe corporis voluptatum fuga enim est sunt, alias ratione.Eos repellendus illo quos minus! Incidunt doloribus architecto labore rerum adipisci, quae sit, nesciunt fugit aut fuga, saepe repellat molestiae quasi temporibus.Est delectus sit molestias, animi quo quos doloremque porro aliquam laborum omnis rerum Unde et porro accusantium nobis praesentium, asperiores ullam sequi ipsum quod adipisci consequuntur, impedit vero! Ullam cumque quis libero ipsam corrupti debitis error quas, id voluptatibus dignissimos delectus iure enim. Necessitatibus porro repellat, fugiat at quia culpa perspiciatis deserunt temporibus ullam vitae vero soluta fuga natus veritatis, quas dicta tenetur ipsa reiciendis quae eveniet, rerum explicabo corporis.Error, esse quisquam!");

    console.log("Final WPM set to:", finalWpm);

    // Starting the timer when test begins
    useEffect(() => {
        if (started) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current!);
                        calculateWPM();
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
    }, [started])

    const restartTest = () => {
        setInput("");
        setCurrentError(false);
        setTimer(60);
        setStarted(false);
        setWpm(null);
    };

    // Handle click outside to stop the test
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (textContainerRef.current && !textContainerRef.current.contains(event.target as Node) && event.target !== document.querySelector("input")) {
                setStarted(false);
                calculateWPM();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // trigger recalculation of wpm when input updates
    useEffect(() => {
        if (started) {
            calculateWPM();
        }
    }, [input])

    // triggering recalculation of wpm when the timer ends
    useEffect(() => {
        if (timer === 0) {
            const wordsPerMinute = checkWpm(input.length, 1);
            setFinalWpm(wordsPerMinute)
        }
    }, [timer])

    const calculateWPM = () => {
        const wordsPerMinute = checkWpm(input.length, 1);
        console.log("calculateWPM called, Timer:", timer);
        console.log("WPM calculated:", wordsPerMinute);

        if (timer === 0) {
            setFinalWpm(wordsPerMinute);
        } else {
            setWpm(wordsPerMinute);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center mt-12">
            <h1 className="text-6xl">Typing Certification Test</h1>
            <h3 className="m-4 font-semibold text-gray-400">Take a 1 min test and clarify your typing speed with English for Beginners.</h3>
            <div className="flex flex-row justify-center w-full text-2xl font-semibold text-gray-700">
                <p className="mx-40 tracking-wide">WPM: {wpm}</p>
                <p className="mx-40 tracking-wide">Accuracy: {accuracy}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="relative w-3/4 h-80 bg-slate-400 rounded-md p-4 font-sans overflow-auto text-3xl shadow-md shadow-gray-600/50">
                    <div
                        ref={textContainerRef}
                        className={`transition-all duration-300 p-2 leading-normal tracking-widest text-black text-4xl ${!started ? "blur-sm" : "blur-none"}`}>
                        {sentence}
                    </div>

                    {/* Button Overlay */}
                    {!started && (
                        <button
                            onClick={() => {
                                setStarted(true);
                                setInput("");
                                setWpm(null);
                                setAccuracy(null);
                            }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white 
                            px-4 py-2 rounded-md text-lg  border border-black bg-gray-700 hover:bg-gray-600 font-bold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-duration-200"
                        >
                            Click Here to Start
                        </button>
                    )}
                </div>
                <input
                    type="text"
                    className="mt-4 w-3/4 p-2 border rounded-md text-xl"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={!started || timer === 0}
                    placeholder="Start typing here..."
                />
                <div className="flex flex-row justify-center items-center mt-4 w-1/2 h-12 bg-slate-400 rounded-md
                shadow-md shadow-gray-600/50">
                    <div className="mx-4 flex items-center">
                        <span
                            className="cursor-pointer"
                            onClick={() => setTimer(60)}>
                            <Redo className="mr-4" />
                        </span>
                        {timer}
                    </div>
                    <div className="mx-4"><Settings /></div>
                </div>
                {timer === 0 && (
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-6xl font-bold">
                        <p>Test Over!</p>
                        <p className="mt-4">WPM: {finalWpm ?? wpm}</p>
                        <button
                            onClick={restartTest}
                            className="border-2 border-white rounded-md p-2 mt-4"
                        >Retake Test
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TypingTest;