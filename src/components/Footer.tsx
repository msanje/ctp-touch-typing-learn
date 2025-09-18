"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center text-sm text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Keystream. All rights reserverd.
        </p>
        <Link className="hover:text-gray-900" href={"/privacy-policy"}>
          {" "}
          Privacy Policy
        </Link>

        <Link className="hover:text-gray-900" href={"/refund-policy"}>
          Refund Policy
        </Link>

        <Link className="hover:text-gray-900" href={"/terms"}>
          Terms and Conditions
        </Link>
      </div>
    </footer>
  );
};
