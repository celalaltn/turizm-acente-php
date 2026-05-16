"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(31, 33, 84, 0.6)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "600px",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          position: "relative",
          animation: "modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "25px",
            right: "25px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#f1f5f9",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e2e8f0"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
        >
          <X size={18} />
        </button>

        <h3 style={{
          fontSize: "1.8rem",
          fontWeight: "800",
          color: "var(--secondary-dark)",
          marginBottom: "20px",
          paddingRight: "40px"
        }}>
          {title}
        </h3>

        <div style={{
          fontSize: "1.05rem",
          lineHeight: "1.7",
          color: "#475569",
          maxHeight: "350px",
          overflowY: "auto",
          paddingRight: "10px"
        }}>
          <p>{content}</p>
        </div>
      </div>
      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
