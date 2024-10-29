import GameCard from "@/components/general/GameCard";
import { gameCardList } from "./content";

export default async function Home() {
  return (
    <main className="flex flex-col gap-2 py-12 px-4 md:px-8 items-center">
      <h1>PLETT.FUN</h1>
      <p className="text-center">
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
      <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-[65ch]">
        {gameCardList.map((gameData) => (
          <GameCard key={gameData.title} {...gameData} />
        ))}
      </div>
      <a
        href="https://old.plett.dev/games"
        className="no-underline text-blue-900 hover:to-blue-700 text-center"
      >
        Old game site
      </a>
    </main>
  );
}
