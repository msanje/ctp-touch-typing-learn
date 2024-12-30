import React from "react";

const KeyboardStyled = () => {
    const keys = [
        // Each row of keys
        ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "←"],
        ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
        ["Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
        ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
        ["Space"],
    ];

    const getKeyColor = (key: string) => {
        // Return color based on the key group
        const redKeys = ["3", "4", "5", "e", "r", "d", "f", "c", "v"];
        const greenKeys = ["2", "6", "7", "y", "u", "h", "j", "n", "m"];
        const yellowKeys = ["8", "9", "0", "i", "o", "k", "l", ";"];
        const blueKeys = ["`", "1", "q", "w", "a", "s", "z", "x"];
        const purpleKeys = ["-", "=", "[", "]", "\\", ",", ".", "/", "'"];

        if (redKeys.includes(key)) return "bg-red-300";
        if (greenKeys.includes(key)) return "bg-green-300";
        if (yellowKeys.includes(key)) return "bg-yellow-300";
        if (blueKeys.includes(key)) return "bg-blue-300";
        if (purpleKeys.includes(key)) return "bg-purple-300";
        return "bg-gray-200"; // Default color for special keys
    };

    return (
        <div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg max-w-2xl mx-auto">
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-2">
                    {row.map((key, keyIndex) => (
                        <div
                            key={keyIndex}
                            className={`text-center text-sm font-semibold text-gray-700 ${getKeyColor(
                                key
                            )} p-2 rounded-md min-w-[40px] min-h-[40px] flex items-center justify-center`}
                            style={{
                                flex: key === "Space" ? "1" : "none", // Makes the space bar larger
                            }}
                        >
                            {key}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default KeyboardStyled;
