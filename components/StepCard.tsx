"use client";

import { motion } from "framer-motion";
import type { Step } from "@/types";

interface StepCardProps {
  step: Step;
  index: number;
}

export default function StepCard({ step, index }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-surface-2 border border-border flex items-center justify-center text-accent-from mb-6">
        {index === 0 ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14c-6 0-8 3-8 5v1h16v-1c0-2-2-5-8-5z" />
          </svg>
        ) : index === 1 ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6z" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
          </svg>
        )}
      </div>
      <div className="text-text-secondary text-xs tracking-widest uppercase mb-3">
        Step {index + 1}
      </div>
      <h3 className="font-display text-xl text-text-primary mb-3">
        {step.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
        {step.description}
      </p>
    </motion.div>
  );
}
