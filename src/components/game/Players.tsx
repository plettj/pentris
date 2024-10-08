"use client";

import { getTotalPlayers } from "@/actions/leaderboard";
import { useTheme } from "@/context/ThemeContext";
import { useQuery } from "@tanstack/react-query";

export default function Players() {
  const { theme } = useTheme();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["totalPlayers"],
    queryFn: () => getTotalPlayers(),
  });

  const noData = isPending || isFetching || error || data === undefined;

  return (
    <p style={{ color: theme.pieces.ghost }}>
      {noData ? (
        "Loading player count..."
      ) : (
        <>
          All time players: <span style={{ color: theme.outline }}>{data}</span>
        </>
      )}
    </p>
  );
}
