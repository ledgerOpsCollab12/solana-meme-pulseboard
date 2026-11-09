import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isRecordedVideoEnding, shouldPlayRecordedVideo } from "@/lib/recorded-video-playback";

type Recording = { mp4: string; webm: string; poster: string; endingStart: number };

export function NarratedWalletVideo({ recording }: { recording: Recording }) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const element = host.current;
    const player = video.current;
    if (!element || !player) return;
    // Metadata may already have loaded while the server-rendered video hydrated.
    if (player.readyState >= 1) {
      setDuration(player.duration);
      if (player.videoHeight > 0) element.style.setProperty("--recording-aspect", String(player.videoWidth / player.videoHeight));
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const refresh = () => {
      const parent = element.closest(".integrated-interface");
      const ready = parent?.getAttribute("data-presentation-ready") === "true";
      if (shouldPlayRecordedVideo({ ready, visible, hidden: document.hidden, reducedMotion: media.matches, userPaused: manualPause.current, ended: player.ended })) {
        void player.play().catch(() => setPaused(true));
      } else player.pause();
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      refresh();
    }, { threshold: 0.25 });
    observer.observe(element);
    const mutation = new MutationObserver(refresh);
    const parent = element.closest(".integrated-interface");
    if (parent) mutation.observe(parent, { attributes: true, attributeFilter: ["data-presentation-ready"] });
    document.addEventListener("visibilitychange", refresh);
    media.addEventListener("change", refresh);
    refresh();
    return () => {
      observer.disconnect(); mutation.disconnect();
      document.removeEventListener("visibilitychange", refresh);
      media.removeEventListener("change", refresh);
      player.pause();
      element.closest(".holo-sticky")?.querySelector(".persistent-live-dock")?.removeAttribute("data-tour-complete");
    };
  }, []);

  const updateTime = () => {
    const player = video.current;
    if (!player) return;
    setTime(player.currentTime);
    host.current?.closest(".holo-sticky")?.querySelector(".persistent-live-dock")?.setAttribute("data-tour-complete", String(isRecordedVideoEnding(player.currentTime, recording.endingStart)));
  };
  const togglePlay = () => {
    const player = video.current;
    if (!player) return;
    if (player.paused) { manualPause.current = false; void player.play().catch(() => setPaused(true)); }
    else { manualPause.current = true; player.pause(); }
  };
  const restart = () => {
    const player = video.current;
    if (!player) return;
    player.currentTime = 0; manualPause.current = false; updateTime();
    void player.play().catch(() => setPaused(true));
  };
  const toggleMute = () => {
    const player = video.current;
    if (!player) return;
    player.muted = !player.muted; setMuted(player.muted);
  };
  return <div ref={host} className="narrated-wallet-video">
    <video ref={video} className="narrated-wallet-recording" muted playsInline preload="metadata" poster={recording.poster}
      aria-label="WhaleWatch narrated wallet analysis recording" onTimeUpdate={updateTime}
      onLoadedMetadata={() => {
        const player = video.current;
        if (!player) return;
        setDuration(player.duration);
        if (player.videoHeight > 0) host.current?.style.setProperty("--recording-aspect", String(player.videoWidth / player.videoHeight));
      }} onPlay={() => setPaused(false)}
      onPause={() => setPaused(true)} onVolumeChange={() => setMuted(video.current?.muted ?? true)} onEnded={updateTime}>
      <source src={recording.webm} type="video/webm" />
      <source src={recording.mp4} type="video/mp4" />
    </video>
    <div className="narrated-video-controls" aria-label="Recording controls">
      <Button variant="ghost" size="icon" title={paused ? "Play recording" : "Pause recording"} aria-label={paused ? "Play recording" : "Pause recording"} onClick={togglePlay}>{paused ? <Play /> : <Pause />}</Button>
      <Button variant="ghost" size="icon" title="Restart recording" aria-label="Restart recording" onClick={restart}><RotateCcw /></Button>
      <input type="range" aria-label="Recording position" min={0} max={duration || 1} step={0.1} value={time} onChange={event => {
        if (video.current) { video.current.currentTime = Number(event.target.value); updateTime(); }
      }} />
      <Button variant="ghost" size="icon" title={muted ? "Listen to narration" : "Mute narration"} aria-label={muted ? "Listen to narration" : "Mute narration"} onClick={toggleMute}>{muted ? <VolumeX /> : <Volume2 />}</Button>
      <Button variant="ghost" size="icon" title="Fullscreen recording" aria-label="Fullscreen recording" onClick={() => { void host.current?.requestFullscreen().catch(() => undefined); }}><Maximize /></Button>
    </div>
  </div>;
}