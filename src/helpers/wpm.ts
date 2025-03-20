export const checkWpm = (typedCharacters: number, timeInMinutes: number) => {
    const wordsPerMinute = (typedCharacters / 5) / timeInMinutes;
    return Math.round(wordsPerMinute);
}


export const calculateWPM = (charCount: number, timeInSeconds: number) => {
    if (timeInSeconds === 0) return 0;

    const words = charCount / 5;
    const minutes = timeInSeconds / 60;
    const wpm = words / minutes;

    return Math.round(wpm);
}