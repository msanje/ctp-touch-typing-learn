"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignInForm = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()

    // Handle sign in with custom credentials
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const response = await signIn('credentials', {
            redirect: false,
            username,
            password,
        })

        if (response?.error) {
            setError('Failed to sign in. Please check your credentials.')
        } else {
            // On successful sign-in, redirect to /learn
            router.push('/learn')
        }

        setLoading(false)
    }

    // Handle sign in with GitHub OAuth
    const handleGitHubSignIn = async () => {
        signIn('github', { callbackUrl: '/learn' })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
                {/* Heading */}
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h1>

                {/* Credentials Sign In Form */}
                <form onSubmit={handleSignIn} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="bg-gray-100 text-black border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-gray-100 text-black border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 px-4 rounded-md w-full"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* GitHub Sign In Button */}
                <button
                    onClick={handleGitHubSignIn}
                    disabled={loading}
                    className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md w-full mb-4 transition-all"
                >
                    Sign In with GitHub
                </button>

                {/* Google Sign In Placeholder */}
                {/* You can easily add Google sign-in later here */}
                {/* 
                <button
                    onClick={handleGoogleSignIn} // Define this handler
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-md w-full mb-4 transition-all"
                >
                    Sign In with Google
                </button> 
                */}

                {/* Sign Up Link */}
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-600">New here?</span>
                    <Link
                        href="/signup"
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-semibold transition-all"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignInForm
