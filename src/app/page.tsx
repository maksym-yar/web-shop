import LeaderBoard from "./components/LeaderBoard";
import PurchaseDiamonds from "./components/PurchaseDiamonds";

export default function Home() {
  return (
    <div className="flex flex-col gap-3">
      <PurchaseDiamonds />

      <LeaderBoard />
    </div>
  );
}
