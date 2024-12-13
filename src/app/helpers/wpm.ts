export const wpm = (typedCharacters: number, timeInMinutes: number) => {
    const wordsPerMinute = (typedCharacters / 5) / timeInMinutes;
    return Math.round(wordsPerMinute);
}