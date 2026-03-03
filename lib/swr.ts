import type { SWRConfiguration } from "swr";

/**
 * Standard fetcher for SWR — fetches URL and returns JSON.
 * Throws on non-OK responses so SWR can handle errors.
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("Failed to fetch data");
    throw error;
  }

  return res.json() as Promise<T>;
};

/**
 * Default SWR config for the freedom wall.
 *
 * - revalidateOnFocus: false — don't refetch when user switches tabs
 * - revalidateOnReconnect: false — don't refetch on network reconnect
 * - refreshInterval: 300_000 — auto-refresh every 5 minutes
 * - dedupingInterval: 60_000 — deduplicate identical requests within 60s
 * - errorRetryCount: 2 — retry failed requests up to 2 times
 */
export const wallSwrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 300_000, // 5 minutes
  dedupingInterval: 60_000, // 60 seconds
  errorRetryCount: 2,
};
