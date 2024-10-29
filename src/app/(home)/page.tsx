import GameCard from "@/components/general/GameCard";
import { gameCardList } from "./content";

export default async function Home() {
  return (
    <main className="flex flex-col gap-2 py-12 items-center">
      <h1>PLETT.FUN</h1>
      <p>
        A tiny website by{" "}
        <a
          className="no-underline text-blue-900 hover:to-blue-700"
          href="https://plett.dev/"
        >
          Josiah
        </a>
        .
      </p>
      <hr className="h-2" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full max-w-[65ch]">
        {gameCardList.map((gameData) => (
          <GameCard key={gameData.title} {...gameData} />
        ))}
      </div>
      <a
        href="https://old.plett.dev/games"
        className="mt-6 no-underline text-blue-900 hover:to-blue-700"
      >
        Old game site
      </a>
    </main>
  );
}
