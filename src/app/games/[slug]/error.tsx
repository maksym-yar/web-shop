'use client'

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-5xl font-bold text-center">Something went wrong!</h1>
      <button className="p-5 rounded-md bg-blue-700 text-white font-bold text-2xl" onClick={() => reset()}>Try again</button>
    </div>
  )
}
