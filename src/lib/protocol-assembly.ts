export const PROTOCOLS: [string, string][] = [
  ["pump.fun", "pump.fun"], ["PumpSwap", "pump.fun"], ["Raydium", "raydium.io"], ["Raydium LaunchLab", "raydium.io"],
  ["FluxBeam", "fluxbeam.xyz"], ["HeavenDEX", "heaven.xyz"], ["Meteora DLMM", "meteora.ag"], ["Meteora DYN2", "meteora.ag"],
  ["Meteora DYN", "meteora.ag"], ["Meteora DBC", "meteora.ag"], ["Moonit", "moon.it"], ["Orca", "orca.so"],
];

export function getProtocolAssembly(top: number, viewport: number, reducedMotion = false) {
  if (reducedMotion) return 1;
  const progress = Math.min(1, Math.max(0, (viewport * .95 - top) / Math.max(1, viewport * .35)));
  return progress * progress * (3 - 2 * progress);
}