import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-5xl font-bold text-center">Could not find game:(</h1>
      <Link className="p-5 rounded-md bg-blue-700 text-white font-bold text-2xl" href="/games">Go to all games page</Link>
    </div>
  )
}
