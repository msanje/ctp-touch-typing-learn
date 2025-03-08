"use client";

import { Redo, Settings, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TypingTest = () => {
    // TODO: Fetch sentence from backend
    const textContainerRef = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState<boolean>(true);
    const [timer, setTimer] = useState(60);
    const [input, setInput] = useState("");
    const [wpm, setWpm] = useState<number | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [sentence, setSentence] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad repellendus dignissimos et distinctio dolorum totam esse magni est molestias, nemo magnam odit quisquam, iure quasi illo corporis eum molestiae aspernatur. Qui tempora eius in laborum asperiores culpa odio optio laboriosam esse neque nobis quasi suscipit architecto saepe corporis voluptatum fuga enim est sunt, alias ratione.Eos repellendus illo quos minus! Incidunt doloribus architecto labore rerum adipisci, quae sit, nesciunt fugit aut fuga, saepe repellat molestiae quasi temporibus.Est delectus sit molestias, animi quo quos doloremque porro aliquam laborum omnis rerum Unde et porro accusantium nobis praesentium, asperiores ullam sequi ipsum quod adipisci consequuntur, impedit vero! Ullam cumque quis libero ipsam corrupti debitis error quas, id voluptatibus dignissimos delectus iure enim. Necessitatibus porro repellat, fugiat at quia culpa perspiciatis deserunt temporibus ullam vitae vero soluta fuga natus veritatis, quas dicta tenetur ipsa reiciendis quae eveniet, rerum explicabo corporis.Error, esse quisquam!");

    // Starting the timer when test begins
    useEffect(() => {
        if (started && timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
    }, [started, timer])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (textContainerRef.current && !textContainerRef.current.contains(event.target as Node)) {
                setStarted(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    return (
        <div className="flex flex-col justify-center items-center mt-12">
            <h1 className="text-6xl">Typing Certification Test</h1>
            <h3 className="m-4 font-semibold text-gray-400">Take a 1 min test and clarify your typing speed with English for Beginners.</h3>
            <div className="flex flex-col justify-center items-center">
                <div className="relative w-3/4 h-80 bg-slate-400 rounded-md p-4 font-sans overflow-auto text-3xl shadow-md shadow-gray-600/50">
                    <div
                        ref={textContainerRef}
                        className={`transition-all duration-300 p-2 leading-normal tracking-widest text-black text-4xl ${started ? "blur-sm" : "blur-none"}`}>
                        {sentence}
                    </div>

                    {/* Button Overlay */}
                    {started && (
                        <button
                            onClick={() => setStarted(!started)}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white 
                            px-4 py-2 rounded-md text-lg  border border-black bg-gray-700 hover:bg-gray-600 font-bold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-duration-200"
                        >
                            Click Here to Start
                        </button>
                    )}
                </div>
                <div className="flex flex-row justify-center items-center mt-4 w-1/2 h-12 bg-slate-400 rounded-md
                shadow-md shadow-gray-600/50">
                    <div className="mx-4 flex items-center"><Redo className="mr-4" />{timer}</div>
                    <div className="mx-4"><Settings /></div>
                </div>
            </div>
        </div>
    )
}

export default TypingTest;