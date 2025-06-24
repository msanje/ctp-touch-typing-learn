import Image from "next/image";
import React, { useEffect, useRef } from "react";

type ResultsModalProps = {
  lastExercise: boolean;
  wpm: number;
  typos: number;
  onTryAgain: () => void;
  onNext: () => void;
  speed: boolean;
  accuracy: boolean;
  lessThenTwoTypos: boolean;
  correctKeyStrokes: number;
};

export default function ResultsModal({
  lastExercise,
  wpm,
  typos,
  onTryAgain,
  onNext,
  speed,
  accuracy,
  lessThenTwoTypos,
  correctKeyStrokes,
}: ResultsModalProps) {
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const accuracyInPercentage = Math.round(
    (correctKeyStrokes / (correctKeyStrokes + typos)) * 100
  );

  useEffect(() => {
    if ((speed || accuracy || lessThenTwoTypos) && nextButtonRef.current) {
      nextButtonRef.current?.focus();
    }
  }, [speed, accuracy, lessThenTwoTypos]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md text-center border-2 border-gray-200">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-800">
          Exercise Finished!
        </h2>
        <p className="text-xl text-gray-600 mt-2">
          {wpm} wpm, {typos} typos
        </p>

        {/* Additional Stats */}
        <div className="mt-4">
          <p className="text-lg text-green-600 font-semibold">
            Correct Keystrokes: {correctKeyStrokes}
          </p>
          <p className="text-lg text-green-600 font-semibold">
            Accuracy: {accuracyInPercentage}
          </p>
        </div>

        {/* Achievements */}
        <div className="flex justify-center space-x-6 mt-6">
          <div className="flex flex-col items-center">
            <Image
              src={`${lessThenTwoTypos ? "/star_gold.svg" : "/star_gray.svg"}`}
              alt="star"
              width={100}
              height={100}
            />
            <p className="text-green-500 text-sm font-semibold">
              less than 2 typos
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={`${accuracy ? "/bullseye_gold.svg" : "/bullseye_gray.svg"}`}
              alt="smile"
              width={100}
              height={100}
            />
            <p className="text-orange-500 text-sm font-semibold">
              exercise without typos
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={`${speed ? "/thunder_gold.svg" : "/thunder_gray.svg"}`}
              alt="bolt"
              width={100}
              height={100}
            />
            <p className="text-purple-500 text-sm font-semibold">
              speed more than 28 WPM
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onTryAgain}
            className="px-6 py-2 text-lg font-semibold text-blue-600 bg-blue-100 rounded-lg border-2 border-blue-200 border-transparent transition-all hover:border-blue-600 hover:bg-blue-200 hover:text-blue-800"
          >
            Try Again
          </button>

          {speed || accuracy || lessThenTwoTypos ? (
            <>
              {lastExercise ? (
                <a
                  // href="/complete"
                  href="/certificate"
                  className="px-6 py-2 text-lg font-semibold text-white bg-green-500 border-2 border-green-600 rounded-lg hover:bg-green-600 transition-all shadow-md"
                >
                  Certification
                </a>
              ) : (
                <button
                  ref={nextButtonRef}
                  onClick={onNext}
                  className="px-6 py-2 text-lg font-semibold text-white bg-yellow-400 border-2 border-yellow-500 rounded-lg hover:bg-yellow-500 transition-all shadow-md"
                >
                  Next
                </button>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
