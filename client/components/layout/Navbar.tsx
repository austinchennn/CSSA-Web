"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants/routes";
import { useUIStore } from "@/lib/store/ui.store";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils/cn";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-card/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
    
            >
              <Image
                src="/logo.png"
                alt="UTMCSSA Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
              UTMCSSA
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "text-primary bg-accent"
                        : "text-foreground hover:text-primary hover:bg-accent/50"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md text-foreground hover:bg-accent transition-colors"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <MobileMenu />

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16" />
    </>
  );
}
