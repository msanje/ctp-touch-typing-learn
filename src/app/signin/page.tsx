"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignInForm = ({ }) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Make the API call to sign in with credentials
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

    const handleGitHubSignIn = async () => {
        // Use NextAuth to sign in via GitHub
        signIn('github', { callbackUrl: '/learn' })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4 text-black">Sign In</h1>
            <form onSubmit={handleSignIn} className="space-y-4">
                <input
                    type="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-white text-black border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white text-black border border-gray-300 p-2 rounded-md w-full"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            {/* Add Google Signin */}
            {/* Sign in with GitHub */}
            {/* <button
                onClick={handleGitHubSignIn}
                disabled={loading}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-md w-full"
            >
                Sign In with GitHub
            </button> */}
        </div>
    )
}

export default SignInForm

