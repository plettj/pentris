"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";

type Die = {
  id: number;
  value: number;
  held: boolean;
};

const MIN_DICE = 1;
const MAX_DICE = 10;

function randomDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function createDice(count: number): Die[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    value: randomDie(),
    held: false,
  }));
}

export function Yahtzee() {
  const [numDice, setNumDice] = React.useState(5);
  const [dice, setDice] = React.useState<Die[]>(() => createDice(5));

  const handleNumDiceChange = (value: string) => {
    const n = Number(value);
    setNumDice(n);
    setDice(createDice(n));
  };

  const rollDice = () => {
    setDice((prev) =>
      prev.map((die) => (die.held ? die : { ...die, value: randomDie() }))
    );
  };

  const resetHolds = () => {
    setDice((prev) => prev.map((die) => ({ ...die, held: false })));
  };

  const toggleHold = (id: number) => {
    setDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, held: !die.held } : die))
    );
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Number of dice</div>
              <div className="text-xs text-muted-foreground">
                Choose how many dice to roll (1–10).
              </div>
            </div>
            <Select value={String(numDice)} onValueChange={handleNumDiceChange}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  { length: MAX_DICE - MIN_DICE + 1 },
                  (_, i) => i + MIN_DICE
                ).map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {dice.map((die) => (
              <button
                key={die.id}
                type="button"
                onClick={() => toggleHold(die.id)}
                className={[
                  "flex h-14 w-14 items-center justify-center rounded-lg border text-xl font-semibold transition",
                  die.held
                    ? "border-primary bg-primary text-primary-foreground shadow"
                    : "bg-muted hover:bg-muted/80",
                ].join(" ")}
              >
                {die.value}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button onClick={rollDice} className="flex-1">
              Roll
            </Button>
            <Button variant="outline" onClick={resetHolds}>
              Unhold all
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Click a die to keep it. Rolling affects only unkept dice.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
