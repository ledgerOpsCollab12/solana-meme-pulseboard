import heroWebm from "@/assets/hero-wallet-annotated-v4.webm.asset.json";
import heroMp4 from "@/assets/hero-wallet-annotated-v4.mp4.asset.json";

export function HeroWalletVideo() {
  return (
    <video
      className="block aspect-[320/181] w-full min-w-0 object-contain"
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="auto"
      aria-label="WhaleWatch wallet classification and quality data video"
    >
      <source src={heroWebm.url} type="video/webm" />
      <source src={heroMp4.url} type="video/mp4" />
    </video>
  );
}