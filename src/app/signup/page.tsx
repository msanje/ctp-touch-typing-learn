"use client"

// components/SignUpForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/api/auth/signin?callbackUrl=/learn'

    const handleSignUp = async () => {
        try {
            // Client-side validation
            if (password !== confirmPassword) {
                alert('Password do not match');
                return;
            }

            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                // Handle successful sign-up
                alert('User signed up successfully');
                router.push(callbackUrl);
            } else {
                // Handle sign-up error
                alert('Failed to sign up');
            }
        } catch (error) {
            alert(`Error during sign-up ${error}`);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirmPassword"
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
