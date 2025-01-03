import { FC, useState } from 'react'

interface KeyboardComponentProps {
    activeKey: string;
}

const KeyboardComponent: FC<KeyboardComponentProps> = ({ activeKey }) => {

    const isKeyActive = (key: string) => activeKey.toLowerCase() === key.toLowerCase();

    return <div>
        <div>
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
                    {['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'].map(
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
                    {['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'].map(
                        (key, index) => (
                            <div
                                key={index}
                                className={`${key === 'CapsLock' || key === 'Enter' ? 'w-28' : 'w-16'
                                    } h-12 text-center flex items-center justify-center rounded ${isKeyActive(key) ? 'bg-blue-400' : 'bg-gray-400'}`}
                            >
                                {key === 'CapsLock' ? 'Caps' : key}
                            </div>
                        )
                    )}
                </div>

                {/* row 5 */}
                <div className="flex space-x-2 mb-4">
                    {/* Left Shift */}
                    <div
                        className={`w-40 h-12 text-center flex items-center justify-center rounded ${isKeyActive('ShiftLeft') ? 'bg-blue-400' : 'bg-gray-400'
                            }`}
                    >
                        Shift
                    </div>

                    {/* Other Keys */}
                    <div className="flex space-x-2">
                        {['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'].map((key, index) => (
                            <div
                                key={index}
                                className={`w-16 h-12 text-center flex items-center justify-center rounded ${isKeyActive(key) ? 'bg-blue-400' : 'bg-gray-400'
                                    }`}
                            >
                                {key}
                            </div>
                        ))}
                    </div>

                    {/* Right Shift */}
                    <div
                        className={`w-40 h-12 text-center flex items-center justify-center rounded ${isKeyActive('ShiftRight') ? 'bg-blue-400' : 'bg-gray-400'
                            }`}
                    >
                        Shift
                    </div>
                </div>

                {/* row 6 */}
                <div className="flex space-x-2">
                    {/* Left Ctrl */}
                    <div
                        className={`w-24 h-12 text-center flex items-center justify-center rounded ${isKeyActive('ControlLeft') ? 'bg-blue-400' : 'bg-gray-400'
                            }`}
                    >
                        Ctrl
                    </div>

                    {/* Left Alt */}
                    <div
                        className={`w-24 h-12 text-center flex items-center justify-center rounded ${isKeyActive('AltLeft') ? 'bg-blue-400' : 'bg-gray-400'
                            }`}
                    >
                        Alt
                    </div>

                    {/* Space */}
                    <div
                        className={`flex-grow h-12 text-center flex items-center justify-center rounded ${isKeyActive('Space') ? 'bg-blue-400' : 'bg-gray-400'
                            }`}
                    >
                        Space
                    </div>

                    {/* Right Alt */}
                    <div
                        className={`w-24 h-12 text-center flex items-center justify-center rounded ${isKeyActive('AltRight') ? 'bg-blue-400' : 'bg-gray-400'
                            }`}
                    >
                        Alt
                    </div>

                    {/* Right Ctrl */}
                    <div
                        className={`w-24 h-12 text-center flex items-center justify-center rounded ${isKeyActive('ControlRight') ? 'bg-blue-400' : 'bg-gray-400'
                            }`}
                    >
                        Ctrl
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default KeyboardComponent