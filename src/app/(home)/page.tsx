import Game from "@/game/ui/Game";

export default async function Home() {
  return (
    <main>
      <h1>Welcome to Pentris!</h1>
      <p>Tetris, but with the pentominoes.</p>
      <Game />
    </main>
  );
}
