import Image from "next/image";
import { Suspense } from "react";

type LeaderBoardResponse = {
  results: Array<{
    id: number,
    name: string,
    image: string,
    games_count: number,
  }>
}

async function LeaderBoardList() {
  const response = await fetch(`https://api.rawg.io/api/creators?token&key=${process.env.RAWG_API_KEY}&page_size=10`)

  const { results } = await response.json() as LeaderBoardResponse;

  return (
    <ul className="flex flex-col gap-2">
      {results.map(({ id, name, image, games_count }) => (
        <li key={id} className="flex gap-2 bg-slate-100 p-3.5 rounded-md">
          <Image
            className="rounded-md"
            src={image} 
            alt={name} 
            width={100} 
            height={100} 
          />

          <div>
            <p className="text-2xl font-bold">{name}</p>
            <p>Total games: {games_count}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function LeaderBoardListLoader() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="bg-slate-400 animate-pulse h-32 rounded-md"></div>
      ))}
    </div>
  )
}

export default function LeaderBoard() {
  return (
    <div>
      <p className="text-center font-bold text-5xl mb-2">Top creators</p>
      <Suspense fallback={<LeaderBoardListLoader />}>
        <LeaderBoardList />
      </Suspense>
    </div>
  )
}
