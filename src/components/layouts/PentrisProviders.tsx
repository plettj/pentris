"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function PentrisProviders({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000, // Set above 0 to avoid immediate refetching on the client.
          },
        },
        // This sets the default error response when a `useQuery` fails.
        // https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose#:~:text=The%20best%20way%20to%20address%20this%20problem%20is%20to%20use%20the%20global%20cache%2Dlevel%20callbacks%20when%20setting%20up%20your%20QueryClient%3A
        queryCache: new QueryCache({
          onError: (error) => {
            throw new Error(`Something went wrong: ${error.message}`);
          },
        }),
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
