"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/reactbits/useReducedMotionSafe";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { genericEnquiryUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { trackWhatsAppClick } from "@/lib/analytics";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/configure", label: "Configure" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();

  // Derived-state pattern (React docs: "Adjusting state when a prop changes")
  // instead of an effect — closes the mobile menu on route change without
  // calling setState synchronously inside a useEffect body.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm"
          : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className="container flex items-center h-16 gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label={`${siteConfig.businessName} Home`}
        >
          <Image
            src="/assets/logo.jpg"
            alt={`${siteConfig.businessName} logo`}
            width={36}
            height={36}
            priority
            className="rounded-full shrink-0"
          />
          <span
            style={{
              fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--color-text)",
            }}
          >
            {siteConfig.businessName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1 ml-auto"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                  color: active ? "var(--color-accent)" : "var(--color-muted)",
                  textDecoration: "none",
                }}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="header-active-underline"
                    className="absolute left-4 right-4 bottom-0 pointer-events-none"
                    style={{ height: 2, background: "var(--color-accent)", borderRadius: 1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                )}
              </Link>
            );
          })}
          <span className="h-4 w-px bg-[var(--color-border)] mx-2" aria-hidden="true" />
          <a
            href={genericEnquiryUrl()}
            onClick={() => trackWhatsAppClick("header")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn wa-btn text-sm"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[var(--color-border)]",
          menuOpen
            ? "max-h-80 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <nav className="container flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-sm font-medium transition-colors border-b border-[var(--color-border)] last:border-0"
              style={{
                fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                color: pathname === link.href ? "var(--color-accent)" : "var(--color-muted)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={genericEnquiryUrl()}
            onClick={() => trackWhatsAppClick("header")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn wa-btn mt-3 justify-center"
          >
            WhatsApp for Quote
          </a>
        </nav>
      </div>
    </header>
  );
}
