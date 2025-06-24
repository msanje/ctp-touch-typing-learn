"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type AuthModalProps = {
  onClose?: () => void;
  type: "signin" | "signup";
};

export default function AuthModal({
  onClose,
  type: initialType,
}: AuthModalProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [type, setType] = useState<"signin" | "signup">(initialType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (type === "signup") {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        try {
          const data = await res.json();
          setError(data.message || "Failed to sign up.");
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Failed to sign up.");
          }
        }
        setLoading(false);
        return;
      }
    }

    const response = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (response?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/typing-test-certificate");
      router.refresh();
      onClose?.();
    }

    setLoading(false);
  };

  const handleGitHubSignIn = () => {
    signIn("github", { callbackUrl: "/typing-test-certificate" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {type === "signin"
              ? "Sign In to View Certificate"
              : "Create an Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />

          {type === "signup" && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
          >
            {loading
              ? type === "signup"
                ? "Signing Up..."
                : "Signing In..."
              : type === "signup"
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGitHubSignIn}
          disabled={loading}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white p-2 rounded font-semibold"
        >
          Sign In with GitHub
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm">
            <button
              type="button"
              onClick={() => setType(type === "signin" ? "signup" : "signin")}
              className="text-blue-600 hover:underline"
            >
              {type === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
