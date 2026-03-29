"use client";

import { motion } from "framer-motion";

interface WaveformVisualizerProps {
  isPlaying: boolean;
  progress: number;
  barCount?: number;
}

export default function WaveformVisualizer({
  isPlaying,
  progress,
  barCount = 60,
}: WaveformVisualizerProps) {
  // Generate deterministic bar heights
  const bars = Array.from({ length: barCount }, (_, i) => {
    const seed = Math.sin(i * 1.5) * 0.5 + 0.5;
    const secondary = Math.cos(i * 0.8) * 0.3 + 0.3;
    return 0.15 + seed * 0.6 + secondary * 0.25;
  });

  const progressIndex = Math.floor(progress * barCount);

  return (
    <div className="flex items-center gap-[2px] h-16 w-full">
      {bars.map((height, i) => {
        const isPast = i <= progressIndex;
        return (
          <motion.div
            key={i}
            className={`flex-1 rounded-full transition-colors duration-150 ${
              isPast
                ? "bg-gradient-to-t from-accent-from to-accent-to"
                : "bg-surface-3"
            }`}
            style={{ height: `${height * 100}%` }}
            animate={
              isPlaying && isPast
                ? {
                    scaleY: [1, 1.2, 0.8, 1],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.02,
            }}
          />
        );
      })}
    </div>
  );
}
