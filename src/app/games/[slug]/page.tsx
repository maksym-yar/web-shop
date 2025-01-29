import Image from "next/image";
import { notFound } from "next/navigation";

type Game = {
  name: string,
  description: string,
  released: string,
  background_image: string,
  website: string,
  rating: number,
  rating_top: number,
  achievements_count: number,
  platforms: Array<{
    platform: {
      name: string,
    },
    released_at: string,
    requirements: {
      minimum: string,
      recommended: string,
    }
  }>,
}

type NotFound = {
  detail: string,
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;

  const response = await fetch(`https://api.rawg.io/api/games/${slug}?token&key=${process.env.RAWG_API_KEY}`);

  const game = await response.json() as Game | NotFound;

  if ('detail' in game) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <Image className="rounded-md mt-4" src={game.background_image} alt={`${game.name} cover`} width={500} height={500} />

      <h1 className="text-4xl font-bold mt-4 text-center">{game.name}</h1>

      <p className="mt-3 text-xl">Rating: {game.rating} (Top {game.rating_top} leaderboard)</p>

      <p className="mt-3">Release date: {game.released}</p>

      <p className="mt-5 font-bold">Available on:</p>

      <ul className="flex mt-1 gap-2 flex-wrap">
        {game.platforms.map((platform) => (
          <li className="bg-blue-50 rounded-full p-2" key={platform.platform.name}>{platform.platform.name}</li>
        ))}
      </ul>

      <div className="mt-5 text-pretty" dangerouslySetInnerHTML={{ __html: game.description }} />
    </div>
  )
}
