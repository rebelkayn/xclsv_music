"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function CollectionGrid({ tracks }: { tracks: Track[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isAudioPaused, setIsAudioPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // Track mobile scroll position for dots
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.scrollWidth / tracks.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(idx);
  }, [tracks.length]);

  const handlePlay = (track: Track) => {
    if (!track.audioFile) return;

    if (playingId === track.id) {
      if (audioRef.current?.paused) {
        audioRef.current.play();
        setIsAudioPaused(false);
      } else {
        audioRef.current?.pause();
        setIsAudioPaused(true);
      }
      return;
    }

    if (audioRef.current) audioRef.current.pause();

    const audio = new Audio(`/api/stream/${track.id}`);
    audioRef.current = audio;
    setPlayingId(track.id);
    setProgress(0);
    setDuration(0);
    setIsAudioPaused(false);

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => setProgress(audio.currentTime));
    audio.addEventListener("ended", () => {
      setPlayingId(null);
      setProgress(0);
      setIsAudioPaused(true);
    });

    audio.play();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const playingTrack = tracks.find((t) => t.id === playingId);

  return (
    <div className="relative">
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 gap-6">
        {tracks.map((track, i) => (
          <div key={track.id}>
            <CollectionCard
              track={track}
              index={i}
              isPlaying={playingId === track.id && !isAudioPaused}
              onPlay={() => handlePlay(track)}
            />
            {playingId === track.id && (
              <NowPlayingBar
                playingTrack={playingTrack}
                isAudioPaused={isAudioPaused}
                progress={progress}
                duration={duration}
                onPlayPause={() => handlePlay(track)}
                onSeek={handleSeek}
                formatTime={formatTime}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {tracks.map((track, i) => (
            <div key={track.id} className="snap-center w-[85vw] flex-shrink-0">
              <CollectionCard
                track={track}
                index={i}
                isPlaying={playingId === track.id && !isAudioPaused}
                onPlay={() => handlePlay(track)}
                mobile
              />
            </div>
          ))}
        </div>

        {/* Scroll dots */}
        {tracks.length > 1 && (
          <div className="flex justify-center gap-2 mt-2">
            {tracks.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-accent-from w-6"
                    : "bg-surface-3"
                }`}
                onClick={() => {
                  scrollRef.current?.children[i]?.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Now Playing Bar */}
      {playingTrack && (
        <div className="md:hidden px-4 -mx-4">
          <NowPlayingBar
            playingTrack={playingTrack}
            isAudioPaused={isAudioPaused}
            progress={progress}
            duration={duration}
            onPlayPause={() => handlePlay(playingTrack)}
            onSeek={handleSeek}
            formatTime={formatTime}
          />
        </div>
      )}
    </div>
  );
}

/* ── Collection Card ── */

function CollectionCard({
  track,
  index,
  isPlaying,
  onPlay,
  mobile,
}: {
  track: Track;
  index: number;
  isPlaying: boolean;
  onPlay: () => void;
  mobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={mobile ? undefined : { y: -6 }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isPlaying
          ? "shadow-[0_0_40px_rgba(198,165,92,0.2)] ring-1 ring-accent-from/30"
          : "hover:shadow-[0_0_40px_rgba(198,165,92,0.12)]"
      }`}
    >
      {/* Card inner with gold border effect */}
      <div className="relative rounded-2xl overflow-hidden border border-border group-hover:border-accent-from/30 transition-colors duration-500">
        {/* Artist Image */}
        <div className="aspect-square bg-surface-3 relative">
          {track.artistImage ? (
            <img
              src={track.artistImage}
              alt={track.artistName}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-2">
              <span className="text-5xl text-accent-from/30 font-display">
                {track.artistName.charAt(0)}
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Play button — always visible on mobile, hover on desktop */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              mobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPlay();
              }}
              className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
                isPlaying
                  ? "bg-accent-from/20 border-2 border-accent-from/60 shadow-[0_0_30px_rgba(198,165,92,0.3)]"
                  : "bg-white/10 border border-white/20 hover:bg-white/20"
              }`}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Playing indicator — animated rings */}
          {isPlaying && (
            <div className="absolute top-4 right-4">
              <div className="flex items-end gap-[3px] h-4">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] bg-accent-from rounded-full"
                    animate={{
                      height: ["4px", "16px", "8px", "14px", "4px"],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bottom content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {/* Artist + verified */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-xl text-white">
                {track.artistName}
              </h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" fill="#C6A55C" />
                <path
                  d="M8.5 12.5l2 2 5-5"
                  stroke="#0A0A0A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Song title */}
            <p className="font-display text-sm italic text-white/70 line-clamp-2 mb-3">
              &ldquo;{track.title}&rdquo;
            </p>

            {/* Date */}
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-xs">
                Delivered{" "}
                {track.deliveredAt
                  ? new Date(track.deliveredAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </span>
              <Link
                href={`/collection/${track.id}`}
                className="text-accent-from/70 text-xs hover:text-accent-from transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Details &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Gold foil accent line */}
        <div className="h-[2px] bg-gradient-to-r from-accent-from/0 via-accent-from to-accent-from/0" />
      </div>
    </motion.div>
  );
}

/* ── Now Playing Bar ── */

function NowPlayingBar({
  playingTrack,
  isAudioPaused,
  progress,
  duration,
  onPlayPause,
  onSeek,
  formatTime,
}: {
  playingTrack: Track | undefined;
  isAudioPaused: boolean;
  progress: number;
  duration: number;
  onPlayPause: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  formatTime: (s: number) => string;
}) {
  if (!playingTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="mt-4 bg-surface-1/80 backdrop-blur-md border border-border rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Play/Pause */}
          <button
            onClick={onPlayPause}
            className="w-8 h-8 rounded-full bg-text-primary flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
          >
            {isAudioPaused ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A0A0A">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A0A0A">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            )}
          </button>

          {/* Time + Progress */}
          <span className="text-text-secondary text-xs tabular-nums flex-shrink-0">
            {formatTime(progress)}
          </span>
          <div
            className="flex-1 h-1 bg-surface-3 rounded-full cursor-pointer group"
            onClick={onSeek}
          >
            <div
              className="h-full bg-gradient-to-r from-accent-from to-accent-to rounded-full relative"
              style={{
                width: duration > 0 ? `${(progress / duration) * 100}%` : "0%",
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
            </div>
          </div>
          <span className="text-text-secondary text-xs tabular-nums flex-shrink-0">
            {duration > 0 ? formatTime(duration) : "—"}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
