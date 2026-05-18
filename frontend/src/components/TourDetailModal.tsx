"use client";

import React, { useEffect, useState } from "react";
import { X, Calendar, Users, Star, ShieldCheck, Heart, Share2, Info } from "lucide-react";
import { BACKEND_BASE_URL } from "@/lib/api";

interface TourDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: any;
}

export default function TourDetailModal({ isOpen, onClose, tour }: TourDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveImageIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !tour) return null;

  // Compile image list
  const images = tour.images && tour.images.length > 0 
    ? tour.images.map((img: string) => `${BACKEND_BASE_URL}/${img}`)
    : ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop"];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  const handleWhatsAppBooking = () => {
    const whatsappNumber = "905384976107";
    const startStr = formatDate(tour.start_date);
    const text = `Merhaba, Asr Holiday! "${tour.title}" (${startStr}) turu hakkında bilgi almak ve rezervasyon yaptırmak istiyorum. Yardımcı olabilir misiniz?`;
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(31, 33, 84, 0.7)",
        backdropFilter: "blur(8px)",
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
          maxWidth: "1000px",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          animation: "tourModalFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "white",
            border: "none",
            cursor: "pointer",
            color: "var(--secondary-dark)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 100,
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <X size={20} />
        </button>

        {/* Scrollable Container */}
        <div style={{ overflowY: "auto", display: "flex", flexDirection: "column" }}>
          
          {/* Main Layout Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", width: "100%" }}>
            
            {/* Left Column: Image Gallery */}
            <div style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <div 
                style={{
                  width: "100%",
                  height: "350px",
                  borderRadius: "24px",
                  backgroundImage: `url(${images[activeImageIndex]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  transition: "background-image 0.3s ease"
                }}
              />
              
              {/* Thumbnail Selector */}
              {images.length > 1 && (
                <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "5px" }}>
                  {images.map((img: string, idx: number) => (
                    <div 
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: "80px",
                        height: "60px",
                        borderRadius: "12px",
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        cursor: "pointer",
                        border: activeImageIndex === idx ? "3px solid var(--primary-color)" : "3px solid transparent",
                        opacity: activeImageIndex === idx ? 1 : 0.6,
                        transition: "all 0.2s"
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Tour Details */}
            <div style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                {/* Rating & Badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#ff9900" color="#ff9900" />)}
                  </div>
                  <span style={{ 
                    padding: "6px 14px", 
                    background: "rgba(229,102,64,0.1)", 
                    color: "var(--primary-color)", 
                    borderRadius: "50px", 
                    fontSize: "0.85rem", 
                    fontWeight: "700" 
                  }}>
                    Popüler Tur
                  </span>
                </div>

                <h2 style={{ 
                  fontSize: "2.2rem", 
                  fontWeight: "900", 
                  color: "var(--secondary-dark)", 
                  marginBottom: "20px", 
                  lineHeight: "1.2" 
                }}>
                  {tour.title}
                </h2>

                {/* Info Pills Grid */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1fr 1fr", 
                  gap: "15px", 
                  marginBottom: "25px" 
                }}>
                  <div style={{ 
                    padding: "15px", 
                    background: "#f8fafc", 
                    borderRadius: "16px", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px" 
                  }}>
                    <Calendar size={22} color="var(--primary-color)" />
                    <div>
                      <span style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>Tarih Aralığı</span>
                      <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--secondary-dark)" }}>
                        {formatDate(tour.start_date)} - {formatDate(tour.end_date)}
                      </span>
                    </div>
                  </div>

                  <div style={{ 
                    padding: "15px", 
                    background: "#f8fafc", 
                    borderRadius: "16px", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px" 
                  }}>
                    <Users size={22} color="var(--primary-color)" />
                    <div>
                      <span style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>Maks. Katılımcı</span>
                      <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--secondary-dark)" }}>{tour.quota} Kişi</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <h4 style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--secondary-dark)", marginBottom: "8px" }}>Tur Açıklaması</h4>
                <p style={{ 
                  color: "#475569", 
                  fontSize: "1rem", 
                  lineHeight: "1.6", 
                  marginBottom: "25px" 
                }}>
                  {tour.description}
                </p>

                {/* Special Conditions */}
                {tour.special_conditions && (
                  <div style={{ 
                    padding: "20px", 
                    background: "rgba(31, 33, 84, 0.03)", 
                    borderRadius: "20px", 
                    borderLeft: "4px solid var(--primary-color)",
                    marginBottom: "30px"
                  }}>
                    <h5 style={{ 
                      fontSize: "0.95rem", 
                      fontWeight: "800", 
                      color: "var(--secondary-dark)", 
                      marginBottom: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}>
                      <Info size={16} color="var(--primary-color)" /> Önemli Bilgiler
                    </h5>
                    <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: "1.5" }}>
                      {tour.special_conditions}
                    </p>
                  </div>
                )}
              </div>

              {/* Price & Action Section */}
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                borderTop: "1px solid #f1f5f9", 
                paddingTop: "25px",
                marginTop: "10px",
                gap: "20px",
                flexWrap: "wrap"
              }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Tur Fiyatı</span>
                  <span style={{ fontSize: "2.2rem", fontWeight: "900", color: "var(--primary-color)" }}>
                    {parseFloat(tour.price) > 0 ? `${parseFloat(tour.price).toLocaleString('tr-TR')} ₺` : "Fiyat Sorun"}
                  </span>
                </div>

                <button 
                  onClick={handleWhatsAppBooking}
                  className="btn"
                  style={{ 
                    padding: "16px 32px", 
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: "0 10px 20px rgba(229,102,64,0.2)"
                  }}
                >
                  <ShieldCheck size={20} /> Rezervasyon Yap
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
      <style jsx global>{`
        @keyframes tourModalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(15px);
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
