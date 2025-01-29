"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover"

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-10 bg-blue-500 p-5 flex justify-between items-center">
      <nav className="flex gap-4">
        <Link href={'/'} className="text-white">Home page</Link>
        <Link href={'/games'} className="text-white">Games</Link>
      </nav>

      {status === "authenticated" ? (
        <div className="flex items-center gap-2">
          {session.user?.name && (
            <Popover>
              <PopoverTrigger>
                <Image 
                  className="rounded-full" 
                  src={session.user.image ?? ''} 
                  alt={`${session?.user.name} avatar`} 
                  width={40} 
                  height={40} 
                />
              </PopoverTrigger>

              <PopoverContent className="bg-blue-100 border border-gray-400">
                <button onClick={() => signOut()} className="w-full p-1.5 bg-red-600 rounded-md">Sign out</button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Sign in</button>
      )}
    </header>
  )
}
