"use client";

import { useEffect, useState } from "react";
import {
  User,
  Keyboard,
  Target,
  BarChart3,
  Bell,
  CreditCard,
  Cog,
  Eye,
  EyeOff,
  Pencil,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useSound } from "./SoundContext";

type UserCredentials = {
  id: string;
  username: string;
  email: string;
  password: string;
};

type LearningGoal = {
  id: string;
  userId: string;
  dailyMinutes: number;
  targetWPM: number;
  accuracy: number;
  createdAt: string;
  updatedAt: string;
};

const Settings = () => {
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [userCredentials, setUserCredentials] =
    useState<UserCredentials | null>(null);
  const { data: session } = useSession();
  const user = session?.user;
  // TODO: Verify whehter we need this
  // const [disabled, setDisabled] = useState<boolean>(false);
  const [learningGoals, setLearningGoals] = useState<LearningGoal | null>(null);
  const { isSoundEnabled, toggleSound } = useSound();

  useEffect(() => {
    console.log("learning Goals from useEffect: ", learningGoals);

    console.log("---Start---");
    // TODO: use user somewhere
    console.log("user: ", user);
    console.log(learningGoals?.dailyMinutes);
    console.log(learningGoals?.targetWPM);
    console.log(learningGoals?.accuracy);
    console.log("---Stop---");
  }, [learningGoals]);

  useEffect(() => {
    const fetchLearningGoals = async () => {
      const result = await fetch("/api/learninggoals");
      const data = await result.json();

      setLearningGoals(data.learningGoals);

      console.log("Learning Goals: ", data);
    };

    fetchLearningGoals();
  }, []);

  // TODO: For Debugging
  // useEffect(() => {
  //   console.log(isEditingUsername, isEditingEmail, isEditingPassword);
  // }, [isEditingUsername, isEditingEmail, isEditingPassword]);

  const settingsSchema = z.object({
    username: z.string().min(8, "Username must be at least 8 characters long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const learingGoalsSchema = z.object({
    // dailyPracticeTime: This should increase by 5,
    dailyPracticeTime: z
      .number()
      .min(15)
      .refine((val) => val % 5 === 0, {
        message: "Must be in steps of 5",
      }),

    // targetWpm: This should also only increase by 5,
    targetWpm: z
      .number()
      .min(35)
      .refine((val) => val % 5 === 0, {
        message: "Must be in steps of 5",
      }),

    // targetAccuracy: This also needs to increase by 5,
    targetAccuracy: z
      .number()
      .min(60)
      .refine((val) => val % 5 === 0, {
        message: "Must be in steps of 5",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsSchema),
  });

  const {
    register: registerGoals,
    handleSubmit: handleGoalsSubmit,
    formState: { errors: goalsErrors, isSubmitting: isSubmittingGoals },
  } = useForm({
    resolver: zodResolver(learingGoalsSchema),
  });

  // - [ ] Form handling: react-hook-form
  // - [ ] Validation: zod
  // - [ ] API call: fetch with a centralized util
  // - [ ] UI feedback: loading, disabled, error messages

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUserCredentials(data);
    };

    fetchUser();
  }, []);

  const onSubmitGoals = async (data: z.infer<typeof learingGoalsSchema>) => {
    try {
      setLoading(true);
      const response = await fetch("/api/learninggoals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { message } = await response.json();
        alert(message || "Failed to update");
        return;
      }

      alert("Learning Goals Added successfully");
      router.push("/signin");
    } catch (error) {
      console.log("Error updating learning goals: ", error);
      alert("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof settingsSchema>) => {
    try {
      setLoading(true);
      const response = await fetch("/api/updateuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { message } = await response.json();
        alert(message || "Failed to update");
        return;
      }

      alert("Update successful");
      router.push("/signin");
    } catch (error) {
      console.log("Error updating user info: ", error);
      alert("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <h1>{loading}</h1>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Cog className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your typing experience</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* User Profile */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  User Profile
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>

                  <div className="relative">
                    <input
                      {...register("username")}
                      type="text"
                      // placeholder="Enter your username"
                      placeholder={
                        userCredentials?.username || "Enter your username"
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      // disabled={!!userCredentials?.username}
                      disabled={!isEditingUsername}
                    />

                    <button
                      type="button"
                      onClick={() => setIsEditingUsername(!isEditingUsername)}
                    >
                      <Pencil
                        size={"15"}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                          isEditingUsername
                            ? "text-blue-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      />
                    </button>
                  </div>
                  {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder={userCredentials?.email || "Enter your email"}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      // disabled={!!userCredentials?.email}
                      disabled={!isEditingEmail}
                    />

                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(!isEditingEmail)}
                    >
                      <Pencil
                        size={"15"}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                          isEditingEmail
                            ? "text-blue-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      />
                    </button>
                  </div>
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Change Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        userCredentials?.password
                          ? "************"
                          : "Enter your password"
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      // disabled={!!userCredentials?.password}
                      disabled={!isEditingPassword}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsEditingPassword(!isEditingPassword)}
                    >
                      <Pencil
                        size={"15"}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                          isEditingPassword
                            ? "text-blue-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-3 mt-4">
                  <button
                    type="submit"
                    className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold `}
                    // disabled={isSubmitting}
                    disabled={isSubmittingGoals}
                  >
                    {isSubmittingGoals ? "Updating..." : "Update Credentials"}
                  </button>

                  {/* TODO: Verify whether you need to or not */}
                  {/* <button className="w-full py-2 px-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors font-semibold">
                    Delete Account
                  </button> */}
                </div>
              </div>
            </section>
          </form>

          {/* Typing Preferences */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Keyboard className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Typing Preferences
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>High Contrast</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Family
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option>Monospace</option>
                  <option>Serif</option>
                  <option>Sans Serif</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size (px)
                </label>
                <input
                  placeholder="16"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keyboard Layout
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option>QWERTY</option>
                  <option>DVORAK</option>
                  <option>COLEMAK</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isSoundEnabled}
                    onChange={toggleSound}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Enable Key Sounds
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Show Virtual Keyboard
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* Learning Goals */}
          <form onSubmit={handleGoalsSubmit(onSubmitGoals)}>
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Learning Goals
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Daily Practice Time (minutes)
                  </label>
                  <input
                    type="number"
                    step={5}
                    min={15}
                    {...registerGoals("dailyPracticeTime", {
                      valueAsNumber: true,
                    })}
                    placeholder={learningGoals?.dailyMinutes.toString() || "15"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />

                  {goalsErrors.dailyPracticeTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {goalsErrors.dailyPracticeTime.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target WPM
                  </label>
                  <input
                    type="number"
                    step={5}
                    min={35}
                    {...registerGoals("targetWpm", {
                      valueAsNumber: true,
                    })}
                    placeholder={learningGoals?.targetWPM.toString() || "15"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {goalsErrors.targetWpm && (
                    <p className="text-red-500 text-sm mt-1">
                      {goalsErrors.targetWpm.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Accuracy (%)
                  </label>
                  <input
                    type="number"
                    step={5}
                    min={60}
                    {...registerGoals("targetAccuracy", {
                      valueAsNumber: true,
                    })}
                    placeholder={learningGoals?.accuracy.toString() || "15"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {goalsErrors.targetAccuracy && (
                    <p className="text-red-500 text-sm mt-1">
                      {goalsErrors.targetAccuracy.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full gap-3 mt-4">
                <button
                  type="submit"
                  className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold `}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Learning Goals"}
                </button>

                {/* TODO: Verify whether you need to or not */}
                {/* <button className="w-full py-2 px-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors font-semibold">
                    Delete Account
                  </button> */}
              </div>
            </section>
          </form>

          {/* Progress Settings */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Progress Settings
              </h2>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                Reset Progress
              </button>
              {/* TODO: This should come in handy for tracking specific key               performance of users */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Export Progress (CSV)
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Enable Daily Reminders
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Weekly Performance Email
                </span>
              </label>
            </div>
          </section>

          {/* Billing & Subscriptions */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Billing & Subscriptions
              </h2>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Manage Subscription
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                View Payment History
              </button>
            </div>
          </section>
        </div>

        {/* Advanced Options - Full Width */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <Cog className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Advanced Options
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Customize Exercise Difficulty
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Enable Multilingual Typing
              </span>
            </label>
          </div>
        </section>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
