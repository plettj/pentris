import Game from "@/components/game/Game";

export default async function Pentris() {
  return (
    <main className="size-full flex flex-col items-center bg-black text-white">
      <h1>Welcome to Pentris!</h1>
      <p>Tetris, but with the pentominoes.</p>
      <Game />
    </main>
  );
}
