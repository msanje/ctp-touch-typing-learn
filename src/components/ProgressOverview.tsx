// components/ProgressOverview.tsx
import React from "react";

type ProgressOverviewProps = {
    totalExercises: number;
    completedExercises: number;
    totalLessons: number;
};

const ProgressOverview: React.FC<ProgressOverviewProps> = ({
    totalExercises,
    completedExercises,
    totalLessons,
}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="grid grid-cols-3 gap-6 text-center">
                <StatBox label="Total Exercises" value={totalExercises} color="text-blue-600" />
                <StatBox label="Completed" value={completedExercises} color="text-green-600" />
                <StatBox label="Lessons" value={totalLessons} color="text-purple-600" />
            </div>
        </div>
    );
};

const StatBox = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
    </div>
);

export default ProgressOverview;

