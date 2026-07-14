"use client";

import { genericEnquiryUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function FloatingWhatsApp() {
  return (
    <a
      href={genericEnquiryUrl()}
      onClick={() => trackWhatsAppClick("floating")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp us"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-whatsapp)] text-white shadow-lg hover:scale-110 hover:bg-[var(--color-whatsapp-hover)] transition-all duration-300"
      style={{ boxShadow: "0 4px 20px color-mix(in srgb, var(--color-whatsapp) 45%, transparent)" }}
    >
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  );
}
