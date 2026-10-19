const PROTOCOLS: [string, string][] = [
  ["pump.fun", "pump.fun"], ["PumpSwap", "pump.fun"], ["Raydium", "raydium.io"], ["Raydium LaunchLab", "raydium.io"],
  ["FluxBeam", "fluxbeam.xyz"], ["HeavenDEX", "heaven.xyz"], ["Meteora DLMM", "meteora.ag"], ["Meteora DYN2", "meteora.ag"],
  ["Meteora DYN", "meteora.ag"], ["Meteora DBC", "meteora.ag"], ["Moonit", "moon.it"], ["Orca", "orca.so"],
];

export function ProtocolMarquee() {
  const items = [...PROTOCOLS, ...PROTOCOLS];
  return (
    <div className="marquee" aria-label="Protocols we track">
      <div className="marquee-track">
        {items.map(([name, logo], i) => (
          <span className="marquee-item" key={i} aria-hidden={i >= PROTOCOLS.length}>
            <img src={`/protocols/${logo}.png`} alt="" loading="lazy" width={28} height={28} />{name}
          </span>
        ))}
      </div>
    </div>
  );
}
