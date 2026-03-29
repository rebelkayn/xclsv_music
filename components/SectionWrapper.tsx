"use client";

import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  title,
  subtitle,
  id,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`px-6 ${className.includes('pt-') ? '' : 'pt-24'} ${className.includes('pb-') ? '' : 'pb-24'} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
