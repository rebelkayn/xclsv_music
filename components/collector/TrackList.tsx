"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Track {
  id: string;
  title: string;
  artistName: string;
  artistImage: string | null;
  status: string;
  audioFile: string | null;
  totalPrice: number;
  createdAt: string;
  deliveredAt: string | null;
}

const statusLabel: Record<string, string> = {
  DEPOSITED: "Pending",
  IN_PROGRESS: "In Progress",
  DELIVERED: "Delivered",
  UNLOCKED: "Ready",
};

export default function TrackList({ tracks }: { tracks: Track[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const canPlay = (track: Track) =>
    (track.status === "DELIVERED" || track.status === "UNLOCKED") && track.audioFile;

  const handlePlay = (track: Track) => {
    if (!canPlay(track)) return;

    if (playingId === track.id) {
      // Toggle pause/play
      if (audioRef.current?.paused) {
        audioRef.current.play();
      } else {
        audioRef.current?.pause();
      }
      return;
    }

    // Play new track
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(track.audioFile!);
    audioRef.current = audio;
    setPlayingId(track.id);
    setProgress(0);
    setDuration(0);

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setProgress(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setPlayingId(null);
      setProgress(0);
    });

    audio.play();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, trackId: string) => {
    if (playingId !== trackId || !audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  return (
    <div className="bg-surface-1 border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[48px_1fr_minmax(80px,120px)_80px] md:grid-cols-[48px_1fr_minmax(100px,200px)_100px_80px] items-center px-4 py-3 border-b border-border text-text-secondary text-xs uppercase tracking-wider">
        <span className="text-center">#</span>
        <span>Title</span>
        <span className="hidden md:block">Status</span>
        <span className="hidden md:block text-right">Date</span>
        <span className="text-right">
          <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </span>
      </div>

      {/* Tracks */}
      {tracks.map((track, i) => {
        const isPlaying = playingId === track.id;
        const isPlayable = canPlay(track);
        const isHovered = hoveredId === track.id;
        const isPaused = isPlaying && audioRef.current?.paused;

        return (
          <div
            key={track.id}
            className={`group grid grid-cols-[48px_1fr_minmax(80px,120px)_80px] md:grid-cols-[48px_1fr_minmax(100px,200px)_100px_80px] items-center px-4 py-2 hover:bg-surface-2/60 transition-colors ${
              isPlaying ? "bg-surface-2/40" : ""
            }`}
            onMouseEnter={() => setHoveredId(track.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Number / Play button */}
            <div className="flex items-center justify-center">
              {isPlayable && (isHovered || isPlaying) ? (
                <button
                  onClick={() => handlePlay(track)}
                  className="w-8 h-8 flex items-center justify-center cursor-pointer"
                >
                  {isPlaying && !isPaused ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent-from">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-primary">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              ) : (
                <span className={`text-sm ${isPlaying ? "text-accent-from" : "text-text-secondary"}`}>
                  {i + 1}
                </span>
              )}
            </div>

            {/* Title + Artist */}
            <div className="flex items-center gap-3 min-w-0 pr-4">
              <div className="w-10 h-10 rounded bg-surface-3 border border-border overflow-hidden flex-shrink-0">
                {track.artistImage ? (
                  <img
                    src={track.artistImage}
                    alt={track.artistName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs text-accent-from font-display">
                      {track.artistName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <Link
                  href={`/collection/${track.id}`}
                  className={`block text-sm font-medium truncate hover:underline ${
                    isPlaying ? "text-accent-from" : "text-text-primary"
                  }`}
                >
                  {track.title}
                </Link>
                <p className="text-text-secondary text-xs truncate">
                  {track.artistName}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="hidden md:block">
              <StatusPill status={track.status} />
            </div>

            {/* Date */}
            <div className="hidden md:block text-right text-text-secondary text-xs">
              {new Date(track.createdAt).toLocaleDateString()}
            </div>

            {/* Duration / Price */}
            <div className="text-right text-text-secondary text-xs">
              {isPlaying && duration > 0 ? (
                formatTime(progress)
              ) : isPlayable ? (
                <span className="text-text-secondary/50">—</span>
              ) : (
                <StatusPill status={track.status} compact />
              )}
            </div>
          </div>
        );
      })}

      {/* Now Playing Bar */}
      {playingId && (() => {
        const track = tracks.find((t) => t.id === playingId);
        if (!track) return null;
        return (
          <div className="border-t border-border bg-surface-2/60 px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-surface-3 border border-border overflow-hidden flex-shrink-0">
                {track.artistImage ? (
                  <img src={track.artistImage} alt={track.artistName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs text-accent-from font-display">{track.artistName.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-shrink-0 w-32">
                <p className="text-text-primary text-sm font-medium truncate">{track.title}</p>
                <p className="text-text-secondary text-xs truncate">{track.artistName}</p>
              </div>

              {/* Playback controls */}
              <div className="flex-1 flex items-center gap-3">
                <button
                  onClick={() => handlePlay(track)}
                  className="w-8 h-8 flex items-center justify-center cursor-pointer flex-shrink-0"
                >
                  {audioRef.current?.paused ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-primary">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-primary">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  )}
                </button>

                <span className="text-text-secondary text-xs w-10 text-right flex-shrink-0">
                  {formatTime(progress)}
                </span>

                {/* Progress bar */}
                <div
                  className="flex-1 h-1 bg-surface-3 rounded-full cursor-pointer group/bar"
                  onClick={(e) => handleSeek(e, playingId)}
                >
                  <div
                    className="h-full bg-accent-from rounded-full relative"
                    style={{ width: duration > 0 ? `${(progress / duration) * 100}%` : "0%" }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-text-primary rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                  </div>
                </div>

                <span className="text-text-secondary text-xs w-10 flex-shrink-0">
                  {duration > 0 ? formatTime(duration) : "—"}
                </span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function StatusPill({ status, compact }: { status: string; compact?: boolean }) {
  const config: Record<string, { label: string; className: string }> = {
    DEPOSITED: { label: "Pending", className: "text-yellow-500" },
    IN_PROGRESS: { label: "In Progress", className: "text-blue-500" },
    DELIVERED: { label: "Delivered", className: "text-green-500" },
    UNLOCKED: { label: "Ready", className: "text-accent-from" },
  };
  const c = config[status] || { label: status, className: "text-text-secondary" };

  if (compact) {
    return <span className={`text-xs ${c.className}`}>{c.label}</span>;
  }

  return (
    <span className={`text-xs ${c.className}`}>
      {c.label}
    </span>
  );
}
