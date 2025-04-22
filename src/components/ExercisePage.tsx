"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import ResultsModal from "@/components/ResultsModal";
import { fetchUserId } from "@/helpers/fetchUserId";
import Link from "next/link";
import {
  getCurrentExercise,
  getNextExercise,
  getPrevExercise,
} from "@/utils/lessonNavigator";
import { UserType } from "@/types/GlobalTypes";

export default function ExercisePage({ user }: { user: UserType }) {
  const params = useParams<{ lessonId: string; exerciseId: string }>();
  const { lessonId, exerciseId } = params;
  const router = useRouter();

  /* TODO: Set this to true is the nextexercise is the last exercise */
  const [lastExercise, setLastExercise] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [activeKey, setActiveKey] = useState("");
  const [currentError, setCurrentError] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [exerciseContent, setExerciseContent] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState(false);
  const [progressSubmitted, setProgressSubmitted] = useState<boolean>(false);

  const [correctKeyStrokes, setCorrectKeystrokes] = useState(0);
  const [incorrectKeyStrokes, setIncorrectKeystrokes] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [wpm, setWpm] = useState(0);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [speed, setSpeed] = useState<boolean>(false);
  const [accuracy, setAccuracy] = useState<boolean>(false);
  const [lessThenTwoTypos, setLessThenTwoTypos] = useState<boolean>(false);

  useEffect(() => {
    // We are using this in the Keyboard component for display the keys on the visual keyboard
    // TODO: Complete this.
    console.log("activeKey: ", activeKey);
  }, []);

  useEffect(() => {
    if (wpm >= 28) {
      setSpeed(true);
    } else {
      setSpeed(false);
    }

    if (incorrectKeyStrokes === 0 && completed) {
      setAccuracy(true);
    } else {
      setAccuracy(false);
    }

    if (incorrectKeyStrokes < 2 && completed) {
      setLessThenTwoTypos(true);
    } else {
      setLessThenTwoTypos(false);
    }
  }, [wpm, incorrectKeyStrokes, completed]);

  const currentLessonId = parseInt(lessonId);
  const currentExerciesId = parseInt(exerciseId);

  const next = getNextExercise(currentLessonId, currentExerciesId);
  const prev = getPrevExercise(currentLessonId, currentExerciesId);

  useEffect(() => {
    const currentExercise = getCurrentExercise(
      currentLessonId,
      currentExerciesId,
    );

    if (currentExercise?.lessonId == 7 && currentExercise.exerciseId == 7) {
      setLastExercise(true);
    }

    console.log("currentExercise: ", currentExercise);
  }, []);

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
    };

    getUserId();
  }, []);

  useEffect(() => {
    if (
      !completed ||
      userId === null ||
      progressSubmitted === true ||
      (speed === false && accuracy === false && lessThenTwoTypos === false)
    )
      return;

    const updateProgress = async () => {
      try {
        const response = await fetch("/api/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            email: user?.email,
            lessonId: parseInt(lessonId),
            exerciseId: parseInt(exerciseId),
            completed,
            speed,
            accuracy,
            lessThenTwoTypos,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          setProgressSubmitted(true);
        } else {
          const errorBody = await response.json();
          console.error("Failed to update progress:", errorBody);
          setIsDisabled(true);
        }
      } catch (error: unknown) {
        console.error("Error updating progress:", error);
        setIsDisabled(true);
      }
    };

    updateProgress();
  }, [completed, userId, speed, accuracy, lessThenTwoTypos, progressSubmitted]);

  const handleNext = async () => {
    if (!userId) {
      console.error("User ID is not available yet.");
      return;
    }

    if (!completed) return;

    const nextExercise = getNextExercise(
      parseInt(lessonId),
      parseInt(exerciseId),
    );

    if (nextExercise) {
      router.push(
        `/lessons/${nextExercise.lessonId}/${nextExercise.exerciseId}`,
      );
    } else {
      setIsDisabled(true);
      return;
    }
  };

  const handleTryAgain = async () => {
    console.log("Hello from handleTryAgain");

    // Reset UI state
    setUserInput("");
    setIsDisabled(false);
    setCurrentError(false);
    setActiveKey("");
    setTimerStarted(false);

    setCorrectKeystrokes(0);
    setIncorrectKeystrokes(0);
    setCompleted(false); // To reset completion
    setProgressSubmitted(false);

    // to focus on the input element when try again is triggered
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${lessonId}/${exerciseId}`,
        );
        if (res.ok) {
          const data = await res.json();
          setExerciseContent(data.content || "");
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
    if (!timerStarted) {
      setTimerStarted(true);
      setStartTime(Date.now());
    }
    if (isDisabled) return;

    const value = e.target.value;
    const normalizedOriginal = exerciseContent.trim();

    const index = value.length - 1;
    if (index >= 0) {
      if (value[index] === normalizedOriginal[index]) {
        setCorrectKeystrokes((prev) => prev + 1);
      } else {
        setIncorrectKeystrokes((prev) => prev + 1);
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
      setCompleted(true);
      setEndTime(Date.now());
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

  useEffect(() => {
    if (completed && startTime && endTime) {
      const timeTakenInSeconds = (endTime - startTime) / 1000;
      const totalCharacters = userInput.length;
      const wordsTyped = totalCharacters / 5;
      const calculatedWPM = (wordsTyped / timeTakenInSeconds) * 60;
      const finalWpm = Math.round(calculatedWPM);

      setWpm(finalWpm);
      setSpeed(finalWpm >= 28);
      setAccuracy(incorrectKeyStrokes === 0);
      setLessThenTwoTypos(incorrectKeyStrokes < 2);
    }
  }, [completed, startTime, endTime, userInput.length, incorrectKeyStrokes]);

  return loading ? (
    <div>loading.....</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-blue-100 to-gray-200">
      <div
        className={`transition-all duration-300 bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl border border-gray-300`}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center">
          Lesson {lessonId} - Exercise {exerciseId}
        </h1>

        <div className="flex justify-center">
          <div className="w-full border-2 border-gray-300 rounded-lg p-6 bg-gray-50 shadow-md">
            <p className="text-2xl md:text-3xl text-gray-700 text-center px-6 py-4 font-mono">
              <span className="text-gray-400">
                {exerciseContent.slice(0, userInput.length)}
              </span>
              <span
                className={`${
                  currentError
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
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={isDisabled}
            className={`w-full max-w-2xl px-6 py-3 text-xl border-2 rounded-lg focus:outline-none transition-all duration-200 shadow-sm ${
              currentError
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

      <div className="flex flex-row justify-between w-52">
        {prev && (
          <Link
            href={`/lessons/${prev.lessonId}/${prev.exerciseId}`}
            className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Prev
          </Link>
        )}

        {next && (
          <Link
            href={`/lessons/${next.lessonId}/${next.exerciseId}`}
            className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Next
          </Link>
        )}
      </div>

      {/* Show the "Next Exercise" button when exercise is completed */}
      {isDisabled && (
        <ResultsModal
          lastExercise={lastExercise}
          wpm={wpm}
          typos={incorrectKeyStrokes}
          correctKeyStrokes={correctKeyStrokes}
          onTryAgain={handleTryAgain}
          onNext={handleNext}
          speed={speed}
          accuracy={accuracy}
          lessThenTwoTypos={lessThenTwoTypos}
        />
      )}
      {/* TODO: Need to style this KeyboardComponent better */}
      {/* <KeyboardComponent activeKey={activeKey} /> */}
    </div>
  );
}
