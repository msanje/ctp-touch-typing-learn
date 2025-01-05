"use client"

import { FC, useEffect, useState } from "react";
import { Lesson } from "@prisma/client";
import Link from "next/link";

const AdminDashboard: FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);

    const getLessons = async () => {
        const response = await fetch("/api/lessons");
        const lessons = await response.json();
        setLessons(lessons);
    };

    useEffect(() => {
        getLessons();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mb-4">
                Welcome to the admin dashboard, where you can create and manage lessons
                for learning touch typing.
            </p>

            <Link href="/admin/lessons">
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create a new lesson
                </div>
            </Link>

            <Link href={'/admin/lessons'}>View Lessons</Link>
        </div>
    );
};

export default AdminDashboard;

