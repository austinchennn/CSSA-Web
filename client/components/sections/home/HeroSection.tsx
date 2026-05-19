"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-24 pb-8 sm:pt-32 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          <span className="text-primary">UTM</span>CSSA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto sm:text-xl"
        >
          多伦多大学密西沙加校区中国学生学者联合会
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/join"
            className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200"
          >
            加入我们
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-border px-8 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
          >
            了解更多
          </Link>
        </motion.div>
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
    </section>
  );
}
