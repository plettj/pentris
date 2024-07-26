import { Button } from "@/components/ui/button";
import { PENTRIS_HREF, SPLIT_SECOND_HREF } from "@/lib/constants";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col gap-2 my-auto items-center">
      <h1>PLETT.FUN</h1>
      <p>A tiny website by Josiah.</p>
      <h2>Games</h2>
      <Button asChild className="w-64 my-2">
        <Link href={PENTRIS_HREF}>Pentris</Link>
      </Button>
      <Button asChild className="w-64 my-2">
        <Link href={SPLIT_SECOND_HREF}>Split Second</Link>
      </Button>
    </main>
  );
}
