"use client";

import { useEffect, useState } from "react";
import { lorem } from "../helpers/paragraph";
import Image from "next/image";
import { wpm } from "../helpers/wpm";
import Link from "next/link";

export default function Home() {
  const originalText = lorem;
  const [userInput, setUserInput] = useState("");
  const [currentError, setCurrentError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [wpmScore, setWpmScore] = useState(0);
  const [textSize, setTextSize] = useState<number>(2)

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
  };

  const calculateWPM = () => {
    const wordsPerMinute = wpm(userInput.length, 1);
    setWpmScore(wordsPerMinute);
  };

  const restartTest = () => {
    setUserInput("");
    setCurrentError(false);
    setTimeLeft(60);
    setTimerStarted(false);
    setIsDisabled(false);
    setWpmScore(0);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textSize = parseInt(event.target.value);
    setTextSize(textSize);
  }

  useEffect(() => {
    if (!timerStarted) return;

    if (timeLeft <= 0) {
      calculateWPM();
      setIsDisabled(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStarted, timeLeft]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 px-4">
      {/* Blurred Background */}
      <div
        className={`transition-all duration-300 ${isDisabled ? "blur-sm" : ""}`}
      >
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Test Your Typing Speed
        </h1>

        <Link className="text-blue-500 text-2xl underline" href={"/learn"}>Learn</Link>
        <Link className="text-blue-500 text-2xl underline ml-4" href={"/lessons"}>Lessons</Link>

        {/* Timer */}
        <div className="flex flex-row justify-between items-center bg-yellow-300 p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-row items-center">
            <Image
              src={"/timer.svg"}
              alt="stop-watch"
              width={60}
              height={60}
              className="mr-4"
            />
            <p className="text-2xl font-semibold text-gray-800">
              Time Left: <span className="text-red-600">{timeLeft}s</span>
            </p>
          </div>
          <p className="text-4xl text-black ml-8 pr-4">WPM Score: {wpmScore}</p>
        </div>

        {/* Typing Content Box */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl border border-gray-200">
          {/* Paragraph */}
          <p className={`text-${textSize}xl h-56 overflow-hidden leading-relaxed text-gray-700`}>
            {/* Typed characters */}
            <span className="text-gray-400">
              {originalText.slice(0, userInput.length)}
            </span>

            {/* Current character */}
            <span
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

        <div className="w-full mt-4">
          <input
            type="range"
            min={2}
            max={5}
            value={textSize}
            onChange={handleSliderChange}
            className="w-full h-6 rounded-lg bg-gray-300 outline-none opacity-70 transition-opacity duration-200 hover:opacity-100 
      appearance-none cursor-pointer
      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
      [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:rounded-full
      [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:rounded-full"
            id="myRange"
          />
        </div>

        {/* Input Field */}
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
      </div>

      {/* WPM Overlay */}
      {isDisabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Your WPM: {wpmScore}
            </h2>
            <button
              onClick={restartTest}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Restart Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
