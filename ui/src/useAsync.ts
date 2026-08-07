import { useEffect, useState } from "react";

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: T };

/**
 * Pass a stable function reference (e.g. `apiClient.fetchGigs`) — it is an
 * effect dependency, so an inline arrow would refetch on every render.
 */
export function useAsync<T>(fn: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fn()
      .then((data) => {
        if (!cancelled) {
          setState({ status: "ready", data });
        }
      })
      .catch((e) => {
        // Surface the cause in the console but show the visitor a plain
        // message rather than an unhandled rejection and a blank page.
        console.error(e);
        if (!cancelled) {
          setState({ status: "error" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fn]);

  return state;
}
