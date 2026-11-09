const KEY = "whalewatch:chunk-recovery";
const RETRY_WINDOW_MS = 60_000;

export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : typeof error === "string" ? error : "";
  return /error loading dynamically imported module|failed to fetch dynamically imported module|importing a module script failed|loading chunk .* failed|chunkloaderror/i.test(message);
}

export function recoverChunkLoad(error: unknown, storage: Pick<Storage, "getItem" | "setItem">, path: string, reload: () => void, now = Date.now()): boolean {
  if (!isChunkLoadError(error)) return false;
  try {
    const previous = JSON.parse(storage.getItem(KEY) ?? "null") as { path?: string; at?: number } | null;
    if (previous?.path === path && typeof previous.at === "number" && now - previous.at < RETRY_WINDOW_MS) return false;
    storage.setItem(KEY, JSON.stringify({ path, at: now }));
  } catch {
    // Without a persistent retry guard, keep the visible manual recovery instead.
    return false;
  }
  reload();
  return true;
}