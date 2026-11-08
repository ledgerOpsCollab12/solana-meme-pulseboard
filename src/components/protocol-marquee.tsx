import { PROTOCOLS } from "@/lib/protocol-assembly";

export function ProtocolMarquee() {
  const items = [...PROTOCOLS, ...PROTOCOLS];
  return (
    <div className="marquee" aria-label="Protocols we track">
      <div className="marquee-track">
        {items.map(([name, logo], i) => (
          <span className="marquee-item" key={i} aria-hidden={i >= PROTOCOLS.length}>
            <img src={`/protocols/${logo}.png`} alt="" width={40} height={40} /><span>{name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
