export type GamesListResponse = {
  count: number,
  next: string | null,
  results: Array<{
    id: number,
    name: string,
    released: string,
    background_image: string,
  }>
}
