import { Session } from "next-auth";

export const checkWpm = (typedCharacters: number, timeInMinutes: number) => {
    const wordsPerMinute = (typedCharacters / 5) / timeInMinutes;
    return Math.round(wordsPerMinute);
}


