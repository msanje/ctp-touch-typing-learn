"use client";

import { useState } from "react";
import {
  User,
  Trophy,
  Target,
  Calendar,
  Clock,
  Zap,
  Award,
  TrendingUp,
  Edit2,
  Camera,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("TypeMaster_2024");
  const [email, setEmail] = useState("john.doe@email.com");

  // Mock data - in real app this would come from props/API
  const profileData = {
    joinDate: "January 15, 2024",
    totalPracticeTime: "127 hours",
    currentStreak: 12,
    longestStreak: 28,
    currentWPM: 68,
    bestWPM: 82,
    averageAccuracy: 94.5,
    bestAccuracy: 98.2,
    totalWords: "1,56,420",
    lessonsCompleted: 47,
    rank: 156,
    totalUsers: 12543,
  };

  const achievements = [
    {
      id: 1,
      name: "Speed Demon",
      description: "Reached 60 WPM",
      icon: "⚡",
      earned: true,
    },
    {
      id: 2,
      name: "Accuracy Master",
      description: "95% accuracy for 10 sessions",
      icon: "🎯",
      earned: true,
    },
    {
      id: 3,
      name: "Consistent Learner",
      description: "7-day practice streak",
      icon: "🔥",
      earned: true,
    },
    {
      id: 4,
      name: "Marathon Typist",
      description: "100 hours of practice",
      icon: "🏃",
      earned: true,
    },
    {
      id: 5,
      name: "Lightning Fast",
      description: "Reach 80 WPM",
      icon: "⚡",
      earned: false,
    },
    {
      id: 6,
      name: "Perfect Score",
      description: "100% accuracy in a session",
      icon: "💯",
      earned: false,
    },
  ];

  const recentSessions = [
    { date: "June 24, 2025", wpm: 68, accuracy: 96, duration: "15 min" },
    { date: "June 23, 2025", wpm: 65, accuracy: 94, duration: "20 min" },
    { date: "June 22, 2025", wpm: 71, accuracy: 92, duration: "25 min" },
    { date: "June 21, 2025", wpm: 66, accuracy: 95, duration: "18 min" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">
                    {username}
                  </h1>
                )}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>

              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
                />
              ) : (
                <p className="text-gray-600 mb-2">{email}</p>
              )}

              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {profileData.joinDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {profileData.totalPracticeTime} practiced
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {profileData.currentWPM}
                  </div>
                  <div className="text-xs text-gray-500">Current WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {profileData.averageAccuracy}%
                  </div>
                  <div className="text-xs text-gray-500">Avg Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {profileData.currentStreak}
                  </div>
                  <div className="text-xs text-gray-500">Day Streak</div>
                </div>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-xl text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <div className="text-lg font-bold">#{profileData.rank}</div>
              <div className="text-xs opacity-90">
                of {profileData.totalUsers.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Statistics
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Best WPM</span>
                <span className="font-semibold text-blue-600">
                  {profileData.bestWPM}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Best Accuracy</span>
                <span className="font-semibold text-green-600">
                  {profileData.bestAccuracy}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Longest Streak</span>
                <span className="font-semibold text-orange-600">
                  {profileData.longestStreak} days
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Words</span>
                <span className="font-semibold text-purple-600">
                  {profileData.totalWords.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Lessons Completed</span>
                <span className="font-semibold text-indigo-600">
                  {profileData.lessonsCompleted}
                </span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Award className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Achievements
              </h2>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div
                        className={`font-semibold ${
                          achievement.earned
                            ? "text-green-800"
                            : "text-gray-600"
                        }`}
                      >
                        {achievement.name}
                      </div>
                      <div
                        className={`text-sm ${
                          achievement.earned
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Sessions
              </h2>
            </div>
            <div className="space-y-3">
              {recentSessions.map((session, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">
                      {session.date}
                    </span>
                    <span className="text-sm text-gray-500">
                      {session.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-600">{session.wpm} WPM</span>
                    <span className="text-green-600">
                      {session.accuracy}% accuracy
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View All Sessions
            </button>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Progress Over Time
          </h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Progress chart would go here</p>
              <p className="text-sm">
                (Integration with charting library needed)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
