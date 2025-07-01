export type TypingLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export function getTypingLevel(
  wpm: number,
  accuracy: number
): TypingLevel | null {
  if (accuracy < 85) return "BEGINNER";

  if (wpm >= 100 && accuracy >= 97) return "EXPERT";
  if (wpm >= 80 && accuracy >= 92) return "ADVANCED";
  if (wpm >= 50 && accuracy >= 90) return "INTERMEDIATE";
  if (wpm >= 35 && accuracy >= 85) return "BEGINNER";

  return null;
}
