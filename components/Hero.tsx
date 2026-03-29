"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import Button from "./Button";

export default function Hero() {
  const scrollToRoster = () => {
    document.getElementById("roster")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col items-center overflow-hidden pt-6 pb-10 md:pt-10 md:pb-14 min-h-[50vh]">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 font-display text-2xl tracking-widest bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent mb-[100px]"
      >
        {SITE.name}
      </motion.div>

      {/* Animated waveform background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <svg
          viewBox="0 0 1200 200"
          className="w-full max-w-6xl"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 80 }).map((_, i) => {
            const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
            const pseudo = seed - Math.floor(seed);
            const height = 20 + Math.sin(i * 0.3) * 60 + pseudo * 40;
            return (
              <motion.rect
                key={i}
                x={i * 15}
                y={100 - height / 2}
                width={6}
                height={height}
                rx={3}
                fill="#C6A55C"
                initial={{ scaleY: 0.3 }}
                animate={{
                  scaleY: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "center" }}
              />
            );
          })}
        </svg>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto my-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-accent-from/60 text-xs tracking-[0.4em] uppercase mb-8">
            By Invitation Only
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-text-primary mb-6 leading-[1.1]">
            <span className="bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">XCLSV</span> Songs From
            <br />
            Your Favorite Artists
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            {SITE.subline}
          </p>
          <Button onClick={scrollToRoster}>Browse Artists</Button>
        </motion.div>
      </div>

      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
