"use client"

import { useState, useEffect } from 'react';

export default function Keyboard() {
    const [activeKey, setActiveKey] = useState('');

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.key).length > 1) {
                setActiveKey(event.code)
            } else {
                setActiveKey(event.key)
            }

            console.log("activeKey: " + activeKey)
        }


        const handleKeyUp = () => {
            setActiveKey('');
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        };
    }, [])

    const isKeyActive = (key: string) => activeKey.toLowerCase() === key.toLowerCase();

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-[1000px] h-auto bg-gray-300 p-6 rounded-lg shadow-lg">
                {/* row 1 */}
                <div className="flex space-x-2 mb-4">
                    <div
                        className={
                            `w-20 h-12 mr-2 text-center flex items-center justify-center rounded ${isKeyActive('Escape') ? 'bg-blue-400' : 'bg-gray-400'}`
                        }>
                        ESC
                    </div>
                    {['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((key, index) => (
                        <div
                            key={index}
                            className={
                                `w-16 h-12 text-center flex items-center justify-center rounded
                ${isKeyActive(key) ? 'bg-blue-400' : 'bg-gray-400'}`
                            }
                        >
                            {key}
                        </div>
                    ))}
                </div>

                {/* row 2 */}
                <div className="flex space-x-2 mb-4">
                    {['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'].map(
                        (key, index) => (
                            <div
                                key={index}
                                className={`${key === 'Backspace' ? 'w-40' : 'w-16'
                                    } h-12 text-center flex items-center justify-center rounded ${isKeyActive(key) ? 'bg-blue-400' : 'bg-gray-400'}`}
                            >
                                {key}
                            </div>
                        )
                    )}
                </div>

                {/* row 3 */}
                <div className="flex space-x-2 mb-4">
                    {['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map(
                        (key, index) => (
                            <div
                                key={index}
                                className={`${key === 'Tab' ? 'w-24' : 'w-16'
                                    } h-12 text-center flex items-center justify-center rounded ${isKeyActive(key) ? 'bg-blue-400' : 'bg-gray-400'}`}
                            >
                                {key}
                            </div>
                        )
                    )}
                </div>

                {/* row 4 */}
                <div className="flex space-x-2 mb-4">
                    {['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'].map(
                        (key, index) => (
                            <div
                                key={index}
                                className={`${key === 'Caps' || key === 'Enter' ? 'w-28' : 'w-16'
                                    } h-12 text-center flex items-center justify-center rounded ${isKeyActive(key) ? 'bg-blue-400' : 'bg-gray-400'}`}
                            >
                                {key}
                            </div>
                        )
                    )}
                </div>

                {/* row 5 */}
                <div className="flex space-x-2 mb-4">
                    {['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'].map(
                        (key, index) => (
                            <div
                                key={index}
                                className={`${key === 'Shift' ? 'w-40' : 'w-16'
                                    } h-12 text-center flex items-center justify-center rounded ${isKeyActive(key) ? 'bg-blue-400' : 'bg-gray-400'}`}
                            >
                                {key}
                            </div>
                        )
                    )}
                </div>

                {/* row 6 */}
                <div className="flex space-x-2">
                    {['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl'].map((key, index) => (
                        <div
                            key={index}
                            className={`${key === 'Space' ? 'flex-grow h-12' : 'w-24 h-12'
                                } text-center flex items-center justify-center rounded ${isKeyActive(key) ? 'bg-blue-400' : 'bg-gray-400'}`}
                        >
                            {key}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
