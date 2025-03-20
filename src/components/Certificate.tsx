import React from "react";

type CertificateProps = {
    userName: string;
    completionDate: string;
    blurred?: boolean;
};

const Certificate: React.FC<CertificateProps> = ({ userName, completionDate, blurred = false }) => {
    return (
        <div className={`border-4 border-gray-700 rounded-xl p-10 text-center bg-white shadow-2xl w-full max-w-3xl mx-auto transition-all ${blurred ? 'blur-sm opacity-60 pointer-events-none' : ''}`}>
            <h2 className="text-3xl font-bold mb-6">Certificate of Completion</h2>
            <p className="text-lg mb-4">This certifies that</p>
            <h3 className="text-2xl font-semibold mb-4">{userName}</h3>
            <p className="text-lg mb-4">
                has successfully completed the Touch Typing Course
            </p>
            <p className="text-gray-600 mt-6">Date: {completionDate}</p>
        </div>
    );
};

export default Certificate;
