import Game from "@/game/ui/Game";

export default async function Pentris() {
  return (
    <main className="size-full bg-black text-white">
      <h1>Welcome to Pentris!</h1>
      <p>Tetris, but with the pentominoes.</p>
      <Game />
    </main>
  );
}
