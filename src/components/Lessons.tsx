"use client";

import { useEffect, useState } from "react";
import ProgressOverview from "@/components/ProgressOverview";
import LessonsList from "@/components/LessonsList";
import { fetchUserId } from "@/helpers/fetchUserId";
import { LessonsType, ProgressData } from "@/types/GlobalTypes";

const Lessons = () => {
  const [lessons, setLessons] = useState<LessonsType[] | null>(null);
  const [completedExercises, setCompletedExercises] =
    useState<ProgressData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await fetchUserId();
        setUserId(id);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    if (!userId) return; // Ensure we have userId before fetching progress

    const fetchLessons = async () => {
      try {
        const response = await fetch("/api/lessons");
        if (!response.ok) throw new Error("Failed to fetch lessons");
        setLessons(await response.json());
      } catch (error) {
        setError((error as Error).message);
      }
    };

    const fetchCompletedExercises = async () => {
      try {
        const response = await fetch(`/api/progress?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch progress");
        setCompletedExercises(await response.json());
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchLessons();
    fetchCompletedExercises();
  }, [userId]);

  if (loading)
    return (
      <>
        <div role="status" aria-live="polite" className="py-10 text-center text-slate-400">Loading…</div>;
      </>
    );
  if (error)
    return <div className="text-center text-red-500 py-6">{error}</div>;

  const totalExercises =
    lessons && lessons.length > 0
      ? lessons?.reduce(
        (acc, { exercises }) => acc + (exercises?.length || 0),
        0,
      )
      : 0;

  return (
    <div className="mx-auto py-6 px-64 bg-gradient-to-b bg-blue-200">
      <ProgressOverview
        totalExercises={totalExercises}
        completedExercises={completedExercises}
        totalLessons={lessons ? lessons.length : 0}
      />
      <LessonsList
        userId={userId}
        lessons={lessons}
        completedExercises={completedExercises}
      />
    </div>
  );
};

export default Lessons;
