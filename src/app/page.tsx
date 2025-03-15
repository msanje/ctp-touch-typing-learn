"use client";

import { useEffect, useRef, useState } from "react";
import { lorem, story } from "../helpers/paragraph";
import Image from "next/image";
import { checkWpm } from "../helpers/wpm";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
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
  const lastScrollWordsRef = useRef(0);
  const { data: session } = useSession();
  const user = session?.user;

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(parseInt(event.target.value, 10));
  }

  const startTest = () => {
    setTimeLeft(selectedTime);
    setTimerStarted(true);
  }

  const wordsPerScroll = {
    2: 20,
    3: 15,
    4: 10,
    5: 5,
  } as { [key: number]: number };

  const wordsToScroll = wordsPerScroll[textSize] || 20;

  const getScrollAmount = (size: number) => {
    switch (size) {
      case 2:
        return 40;
      case 3:
        return 50;
      case 4:
        return 60;
      case 5:
        return 80;
      default:
        return 40;
    }
  };

  useEffect(() => {
    const wordsTyped = userInput.trim().split(/\s+/).length;
    console.log("Checking Scroll - Words Typed:", wordsTyped);

    if (wordsTyped > 0 && wordsTyped % wordsToScroll === 0 && lastScrollWordsRef.current !== wordsTyped) {
      console.log("Scrolling by:", getScrollAmount(textSize));
      sentenceRef.current?.scrollBy({
        top: getScrollAmount(textSize),
        behavior: "smooth",
      });
      lastScrollWordsRef.current = wordsTyped;
    }
  }, [userInput, textSize]);

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
    const textSize = parseInt(event.target.value, 10);
    setTextSize(textSize);
  };

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
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center">
          Test your Typing speed
        </h1>

        <div className="flex flex-row justify-around my-4">
          <Link
            className="text-blue-500 text-2xl underline" href={"/learn"}>
            Learn
          </Link>
          <Link
            className="text-blue-500 text-2xl underline ml-4" href={"/lessons"}>Lessons
          </Link>
          <span
            onClick={() => restartTest()}
            className="text-blue-500 text-2xl underline ml-4 cursor-pointer">Restart
          </span>
        </div>

        {/* Timer */}
        <div className="flex flex-wrap justify-between items-center bg-yellow-300 p-5 rounded-xl shadow-lg mb-6">
          {/* Left Section: Timer & Dropdown */}
          <div className="flex items-center gap-6 flex-wrap">
            <Image
              src={"/timer.svg"}
              alt="stop-watch"
              width={50}
              height={50}
              className="ml-2"
            />
            <div className="flex items-center gap-4">
              <label className="text-lg font-medium text-gray-900">Select Time:</label>
              <select
                value={selectedTime}
                onChange={handleTimeChange}
                className="px-4 py-2 border border-gray-400 rounded-lg text-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={timerStarted}
              >
                <option value={60}>60 s</option>
                <option value={300}>5 Mins</option>
              </select>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              Time Left: <span className="text-red-600">{timeLeft}s</span>
            </p>
          </div>

          {/* Right Section: WPM Score */}
          <p className="text-4xl font-extrabold text-gray-900 pr-4">WPM: {wpmScore}</p>
        </div>

        {/* Typing Content Box */}
        <div
          ref={sentenceRef}
          className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl border border-gray-200 overflow-y-auto h-64">
          {/* Paragraph */}
          <p
            className={`text-${textSize}xl h-56 leading-relaxed text-gray-700`}>
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
            <span>
              {originalText.slice(userInput.length + 1)}
            </span>
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
      {
        isDisabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-4xl font-extrabold text-gray-800">
                Your WPM: {wpmScore}
              </h2>
              {!user && (
                <div>

                </div>
              )}
              <button
                onClick={restartTest}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Restart Test
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}
