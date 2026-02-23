"use client"

import React from "react"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
const Navbar = () => {
  const { data: session } = useSession()
 
  const user = session?.user
  const pathname = usePathname()

  return (
    <nav className="w-full border-b border-black/10 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-semibold text-black tracking-tight"
        >
          Anonymous
        </Link>

        {/* Right Section */}
        {session?.user ? (
          <div className="flex items-center gap-6">
            <span className="text-sm text-black font-medium">
              {user?.username ?? "User"}
            </span>

            <button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              className="px-4 py-2 text-sm bg-black text-white rounded-lg 
                         hover:bg-black/80 transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link
              href="/sign-in"
              className="text-sm text-black hover:underline"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="px-4 py-2 text-sm bg-black text-white rounded-lg 
                         hover:bg-black/80 transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar