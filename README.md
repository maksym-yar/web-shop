## Setup local dev
```bash
npm install
```

```bash
npm run dev
```
## Decisions during development
- Make all RAWG API calls on server side, because we use api key for that purposes and i don't want to show this key on client side.
- Create loading, error, not-found pages to enchance UX
- Made infinite scroll on games page for better UX
- Use shadcn/ui for some out of box solutions for Popup and Dialog components
- Try not to overcomplicate diamonds purchase flow, but make it look good with modal usage
- There is no way to make leaderboard from creators RAWG API, so i just display first 10, that returns from endpoint

## Future optimisations
I would pay more time for image size optimization to improve lighthouse metrics, but for MVP it not worth it
