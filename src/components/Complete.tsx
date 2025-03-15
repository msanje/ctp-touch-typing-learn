import React from "react";

type CompletePageProps = {
    exercise: { id: number; index: number; lessonId: number };
    isCompleted: boolean;
};

const CompletePage: React.FC<CompletePageProps> = ({ exercise, isCompleted }) => {
    return (
        <div>
            <h1>Hello World.</h1>
        </div>
    );
};

export default CompletePage;

