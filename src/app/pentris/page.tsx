import Game from "@/components/game/Game";
import Score from "@/components/game/Score";

export default async function Pentris() {
  return (
    <main className="size-full flex justify-center items-center bg-black text-white">
      <Game />
    </main>
  );
}
