'use client'
import Image from "next/image"
import Link from "next/link"
import { GamesListResponse } from "../types"
import { useCallback, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import GamesListLoader from "./GamesListLoader"

type Props = {
  initialList: GamesListResponse['results']
  fetchNextPage: (page: number) => Promise<GamesListResponse>
}

export default function GamesList({ initialList, fetchNextPage } : Props) {
  const [games, setGames] = useState(initialList);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = useCallback(async () => {
    try {
      const response = await fetchNextPage(page + 1);

      setGames(currentGames => [...currentGames,...response.results]);
      setHasMore(!!response.next);
      setPage(page + 1);
    } catch {
      console.error("Failed to fetch next page of games");
    }
  }, [fetchNextPage, page])

  return (
    <InfiniteScroll 
      next={handleLoadMore} 
      hasMore={hasMore} 
      loader={<GamesListLoader />} 
      dataLength={games.length}
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {games.map(({ id, name, background_image, released }) => (
          <li key={id} className="flex justify-center">
            <Link href={`/games/${id}`} className="flex flex-col w-fit gap-3 h-full items-center p-2 bg-slate-100 rounded-md">
              <Image 
                className="rounded-md h-52" 
                src={background_image} 
                alt={`${name} cover`} 
                width={400} 
                height={200}
              />

              <div className="flex flex-col gap-2 items-center justify-end">
                <p className="text-2xl font-bold text-center">{name}</p>

                <p>Release date: {released}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}
