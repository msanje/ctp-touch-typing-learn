"use client";

import { useEffect, useState } from "react";
import { lorem } from "./helpers/paragraph";
import Image from "next/image";

export default function Home() {
  const originalText = lorem;
  const [userInput, setUserInput] = useState("");
  const [currentError, setCurrentError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const normalizedOriginal = originalText.trim();

    if (normalizedOriginal.startsWith(value)) {
      setCurrentError(false);
    } else {
      setCurrentError(true);
    }

    setUserInput(value);
  };

  // preventing pasting to the input
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 px-4">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Test Your Typing Speed
      </h1>

      {/* Timer */}
      <div className="flex flex-row items-center bg-yellow-300 p-4 rounded-lg shadow-md mb-6">
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

      {/* Typing Content Box */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl border border-gray-200">
        {/* Paragraph */}
        <p className="text-lg leading-relaxed text-gray-700">
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

      {/* Input Field */}
      <div className="flex flex-col items-center mt-8 w-full">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onPaste={handlePaste}
          className={`w-full max-w-2xl px-6 py-3 text-xl border-2 rounded-lg focus:outline-none transition-all duration-200 ${currentError
            ? "border-red-500 text-red-600 focus:border-red-500"
            : "border-gray-300 text-gray-800 focus:border-blue-500"
            }`}
          placeholder="Start typing..."
        />

        {/* Error Message */}
        {/* {currentError && (
          <p className="text-red-500 text-lg mt-2 animate-pulse">
            Mismatch found! Please correct your input.
          </p>
        )} */}
      </div>
    </div>
  );
}