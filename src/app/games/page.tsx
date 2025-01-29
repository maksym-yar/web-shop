import { GamesListResponse } from "./types";
import GamesList from "./components/GamesList";

export default async function GamesPage() {
  const response = await fetch(`https://api.rawg.io/api/games?token&key=${process.env.RAWG_API_KEY}`)

  const games = await response.json() as GamesListResponse;

  const fetchNextPage = async (page: number) => {
    'use server'
    const response = await fetch(`https://api.rawg.io/api/games?token&key=${process.env.RAWG_API_KEY}&page=${page}`)

    return await response.json() as GamesListResponse;
  }

  return <GamesList initialList={games.results} fetchNextPage={fetchNextPage} />
}
