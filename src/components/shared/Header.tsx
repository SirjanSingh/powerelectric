"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { genericEnquiryUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  // trap focus / close on outside click
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
          ? "bg-white/90 backdrop-blur-md border-b border-[#e7eaf0] shadow-sm"
          : "bg-white/70 backdrop-blur-sm",
      )}
    >
      <div className="container flex items-center h-16 gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-[#111318] shrink-0"
          aria-label="PowerElectric Home"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2f6bff] text-white">
            <Zap size={16} strokeWidth={2.5} />
          </span>
          <span>{siteConfig.businessName}</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1 ml-auto"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-[#2f6bff] bg-[#dde8ff]"
                  : "text-[#4b5563] hover:text-[#111318] hover:bg-[#f8f9fc]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={genericEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn wa-btn ml-3 text-sm"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto p-2 rounded-lg hover:bg-[#f8f9fc] transition"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[#e7eaf0]",
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
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-[#2f6bff] bg-[#dde8ff]"
                  : "text-[#4b5563] hover:bg-[#f8f9fc]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={genericEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn wa-btn mt-2 justify-center"
          >
            WhatsApp for Quote
          </a>
        </nav>
      </div>
    </header>
  );
}
