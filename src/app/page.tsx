"use client";

import { useState } from "react";
import { lorem } from "./helpers/paragraph";

export default function Home() {
  const originalText = lorem;
  const [userInput, setUserInput] = useState("");
  const [currentError, setCurrentError] = useState(false);

  const nextChar = originalText.charAt(userInput.length);
  const nextCharToDisplay = nextChar === " " ? "Space" : nextChar;

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1
        className="text-4xl font-bold mb-4 -mt-20 text-gray-800">
        Test Your Typing Speed
      </h1>
      <div className="bg-white shadow-md rounded-lg p-8 w-full mx-20">
        <p
          className="text-xl mb-6 text-gray-700 w-full">{originalText}
        </p>

        <div className="flex flex-col items-center">
          <p className="text-lg font-medium mb-2 text-gray-800">
            Next Character:
          </p>
          <span
            className={`text-4xl mb-8 ${currentError ? "text-red-500" : "text-blue-500"
              }`}
          >
            {nextCharToDisplay || "L"}
          </span>

          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onPaste={handlePaste}
            className={`w-full px-4 py-3 text-2xl border-2 rounded-md focus:outline-none ${currentError
              ? "border-red-500 text-red-500 focus:border-red-500"
              : "border-gray-300 text-black text-2xl focus:border-blue-500"
              }`}
            placeholder="Start typing..."
          />

          {currentError && (
            <p className="text-red-500 text-lg mt-4">Mismatch found!</p>
          )}
        </div>
      </div>
    </div>
  );
}