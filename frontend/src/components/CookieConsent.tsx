"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay slightly for premium feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      style={{
        position: "fixed",
        bottom: "25px",
        left: "25px",
        right: "25px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        padding: "20px 25px",
        boxShadow: "0 20px 50px rgba(31, 33, 84, 0.15)",
        border: "1px solid #f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        zIndex: 9999,
        flexWrap: "wrap",
        animation: "slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1, minWidth: "250px" }}>
        <div style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          backgroundColor: "rgba(229, 102, 64, 0.1)",
          color: "var(--primary-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          <Cookie size={22} />
        </div>
        <p style={{
          fontSize: "0.95rem",
          color: "#475569",
          lineHeight: "1.5",
          margin: 0,
          fontWeight: "500"
        }}>
          {t("cookies.banner.text") || "Size daha iyi bir deneyim sunabilmek için çerezleri kullanıyoruz."}
        </p>
      </div>

      <button 
        onClick={handleAccept}
        className="btn"
        style={{
          padding: "10px 25px",
          borderRadius: "12px",
          fontSize: "0.9rem",
          fontWeight: "700"
        }}
      >
        {t("cookies.banner.accept") || "Kabul Et"}
      </button>

      <style jsx global>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
