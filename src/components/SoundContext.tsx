"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface SoundContextType {
  playWrongKeySound: () => void;
  playRightKeySound: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const wrongKeySound = useRef<HTMLAudioElement | null>(null);
  const rightKeySound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    wrongKeySound.current = new Audio("/sounds/error.mp3");
    rightKeySound.current = new Audio("/sounds/correct.mp3");
  }, [])

  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const playWrongKeySound = () => {
    if (isSoundEnabled) {
      wrongKeySound.current!.currentTime = 0;
      wrongKeySound.current!.volume = 0.7;
      wrongKeySound.current!
        .play()
        .catch((error) =>
          console.error("Error playing incorrect sound: ", error)
        );
    }
  };

  const playRightKeySound = () => {
    if (isSoundEnabled) {
      rightKeySound.current!.currentTime = 0;
      rightKeySound.current!.volume = 0.5;
      rightKeySound.current!
        .play()
        .catch((error) => console.error("Error playing correct sound:", error));
    }
  };

  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev);
  };

  return (
    <SoundContext.Provider
      value={{
        playWrongKeySound,
        playRightKeySound,
        isSoundEnabled,
        toggleSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
