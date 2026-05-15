"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants/routes";
import { useUIStore } from "@/lib/store/ui.store";
import { cn } from "@/lib/utils/cn";

export default function MobileMenu() {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-16 z-40 bg-card/95 backdrop-blur-lg md:hidden"
        >
          <nav className="flex flex-col items-center justify-center gap-2 p-6 pt-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "w-full text-center py-3 px-6 text-lg font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-primary bg-accent"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
