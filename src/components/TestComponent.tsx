"use client";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    "Typing Test",
    "Learn",
    "Progress",
    "Lessons",
    "Certificate",
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 h-24 bg-white border-b border-gray-200 shadow-sm relative">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <Image
          src={"/keystream_logo.svg"}
          width={80}
          height={80}
          alt="logo"
          className="md:w-[100px] md:h-[100px]"
        />
        <Link href="/">
          <span className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent tracking-widest drop-shadow-sm">
            KEYSTREAM
          </span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      {session?.user && (
        <div className="hidden xl:flex items-center space-x-10">
          {navigationItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
              className="relative px-4 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </Link>
          ))}
        </div>
      )}

      {/* Desktop User Profile Section */}
      <div className="flex items-center space-x-4">
        {session ? (
          <UserDropdown user={session.user} />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm md:text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors">
              Hey! Log in
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 shadow-md border rounded-lg">
              <DropdownMenuItem>
                <Link
                  href="/signup"
                  className="block w-full px-4 md:px-6 py-2 text-white bg-blue-600 hover:bg-blue-500 font-bold text-center rounded-md transition-all duration-200"
                >
                  Sign Up
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/signin"
                  className="block w-full px-4 md:px-6 py-2 text-white bg-gray-800 hover:bg-gray-700 font-bold text-center rounded-md transition-all duration-200"
                >
                  Sign In
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="xl:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 z-50 relative"
          aria-label="Toggle mobile menu"
          type="button"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-24 right-0 w-80 bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out xl:hidden ${
          isMobileMenuOpen ? "translate-x-0 z-50" : "translate-x-full -z-10"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {/* Mobile Navigation Links */}
          {session?.user && (
            <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Navigation
              </h3>
              {navigationItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="block text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 py-3 px-2 rounded-md cursor-pointer"
                  onClick={toggleMobileMenu}
                >
                  {item}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile User Profile Section */}
          <div className="flex flex-col space-y-4">
            {session ? (
              <div className="flex flex-col space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Account</h3>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">
                      {session.user.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                {/* Add any additional user menu items here if needed */}
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Get Started
                </h3>
                <Link
                  href="/signup"
                  className="block w-full px-6 py-3 text-white bg-blue-600 hover:bg-blue-500 font-bold text-center rounded-md transition-all duration-200 cursor-pointer"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  className="block w-full px-6 py-3 text-white bg-gray-800 hover:bg-gray-700 font-bold text-center rounded-md transition-all duration-200 cursor-pointer"
                  onClick={toggleMobileMenu}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
