import React from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type CompletePageProps = {
  isCompleted: boolean;
};

export const CompletePage: React.FC<CompletePageProps> = ({ isCompleted }) => {
  // const userId = fetchUserId();
  const session = useSession();
  const userId = session.data?.user.id;

  if (!isCompleted) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-2xl font-semibold">
          You haven&apos;t completed all exercises yet!
        </h2>
      </div>
    );
  }

  const buyCertificate = async () => {
    try {
      const res = await fetch("/api/certificate/buy", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to purchase");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error buying certificate. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Congratulations! 🎉
      </h1>
      <p className="text-lg md:text-xl mb-8 text-gray-700">
        You&apos;ve successfully completed all exercises in the curriculum.
      </p>
      <div className="border rounded-xl p-6 shadow-lg bg-gray-50 mb-6">
        <p className="text-gray-800 text-lg mb-4">
          Want to showcase your achievement? Get your official certificate for
          just <span className="font-bold">₹199</span>.
        </p>
        <Button
          onClick={() => buyCertificate()}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg transition-colors"
        >
          Buy Certificate
        </Button>
      </div>
    </div>
  );
};
