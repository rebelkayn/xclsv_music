"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import WaveformVisualizer from "./WaveformVisualizer";

interface AudioPlayerProps {
  mode: "preview" | "full";
  orderId: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ mode, orderId }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalDuration = mode === "preview" ? 30 : 210; // 30s preview, 3:30 full
  const currentTime = progress * totalDuration;

  const togglePlay = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Simulate playback progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(interval);
            setIsPlaying(false);
            return mode === "preview" ? 1 : 0;
          }
          return prev + 1 / totalDuration;
        });
      }, 1000);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, mode, totalDuration]);

  const handleWaveformClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (mode === "preview") return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setProgress(x / rect.width);
    },
    [mode]
  );

  return (
    <div className="bg-surface-1 border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-text-secondary text-xs tracking-widest uppercase">
          {mode === "preview" ? "30-Second Preview" : "Full Track"}
        </span>
        {mode === "preview" && (
          <span className="text-accent-from/60 text-xs">&middot; Pay balance to unlock full song</span>
        )}
      </div>

      <div
        className={mode === "full" ? "cursor-pointer" : ""}
        onClick={handleWaveformClick}
        onContextMenu={(e) => e.preventDefault()}
      >
        <WaveformVisualizer isPlaying={isPlaying} progress={progress} />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-from to-accent-to flex items-center justify-center cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                className="w-5 h-5 text-bg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-bg ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>
          <div className="text-text-secondary text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </div>
        </div>

        {mode === "preview" && progress >= 1 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-accent-from text-sm"
          >
            Preview ended &middot; Unlock full track below
          </motion.div>
        )}
      </div>
    </div>
  );
}
