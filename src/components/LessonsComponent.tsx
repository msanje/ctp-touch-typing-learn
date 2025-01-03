import { useState } from "react";
import { lessons } from "@/helpers/lessons";

const LessonsComponent = () => {
    const [currentLesson, setCurrentLesson] = useState(0);

    return (
        <div className="max-w-4xl mx-auto bg-gray-100 p-4 rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">
                {lessons[currentLesson].title}
            </h1>
            <div className="space-y-4">
                {lessons[currentLesson].exercises.map((exercise, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white rounded shadow border"
                    >
                        {exercise}
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-6">
                <button
                    disabled={currentLesson === 0}
                    onClick={() => setCurrentLesson((prev) => prev - 1)}
                    className={`px-4 py-2 rounded ${currentLesson === 0 ? "bg-gray-300" : "bg-blue-500 text-white"
                        }`}
                >
                    Previous
                </button>
                <button
                    disabled={currentLesson === lessons.length - 1}
                    onClick={() => setCurrentLesson((prev) => prev + 1)}
                    className={`px-4 py-2 rounded ${currentLesson === lessons.length - 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LessonsComponent;
