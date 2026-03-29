"use client";

import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-accent-from to-accent-to text-bg font-semibold hover:shadow-[0_0_24px_rgba(198,165,92,0.3)]",
  secondary:
    "border border-accent-from/40 text-accent-from hover:bg-accent-from/10",
  ghost: "text-text-secondary hover:text-text-primary",
};

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`px-8 py-3 rounded-lg text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
        variantStyles[variant]
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
}
