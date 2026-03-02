"use client";

import { genericEnquiryUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href={genericEnquiryUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp us"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366] text-white shadow-lg hover:scale-110 hover:bg-[#1ebe5d] transition-all duration-300"
      style={{ boxShadow: "0 4px 20px rgba(37,211,102,.45)" }}
    >
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  );
}
