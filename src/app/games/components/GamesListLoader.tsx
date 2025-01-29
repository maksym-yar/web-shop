export default function GamesListLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} className="bg-slate-400 animate-pulse h-[300px] rounded-md"></div>
      ))}
    </div>
  )
}
