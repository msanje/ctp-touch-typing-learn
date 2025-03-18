type TypingTestResult = {
    id: number;
    userId: string;
    wpm: number;
    accuracy: number;
    timestamp: string;
};

type TypingTestResponse = {
    typingTestResults: TypingTestResult[];
    highestWpm: TypingTestResult;
};