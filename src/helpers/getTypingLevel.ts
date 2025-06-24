export type TypingLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export function getTypingLevel(
  wpm: number,
  accuracy: number
): TypingLevel | null {
  if (wpm >= 90 && accuracy >= 97) return "EXPERT";
  if (wpm >= 60 && accuracy >= 95) return "ADVANCED";
  if (wpm >= 50 && accuracy >= 90) return "INTERMEDIATE";
  if (wpm >= 30 && accuracy >= 85) return "BEGINNER";
  return null;
}
