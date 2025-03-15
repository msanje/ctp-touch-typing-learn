'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignOutPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSignOut = async () => {
        setLoading(true)
        try {
            await signOut({ redirect: false })
            router.push('/')
        } catch (error) {
            console.error('Sign out error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Sign Out</h1>
                <p className="text-gray-600 mb-6 text-center">
                    Are you sure you want to sign out?
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleSignOut()}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Signing out...' : 'Sign Out'}
                    </button>
                </div>
            </div>
        </div >
    )
}