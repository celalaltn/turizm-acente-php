"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Users, Star, ArrowLeft, ShieldCheck, ChevronLeft, ChevronRight, Info, MessageCircle, TrendingUp, Sparkles, Clock } from "lucide-react";
import { PUBLIC_API_BASE_URL, BACKEND_BASE_URL } from "@/lib/api";

function TourDetailContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tourId = searchParams.get("id");
  
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fetch tour detail
  useEffect(() => {
    if (!tourId) {
      router.push("/turlar");
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${PUBLIC_API_BASE_URL}/tours.php?lang=${lang}&id=${tourId}`);
        const json = await res.json();
        if (json.status === "success" && json.data) {
          setTour(json.data);
        } else {
          router.push("/turlar");
        }
      } catch (e) {
        console.error(e);
        router.push("/turlar");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [tourId, lang, router]);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#020617", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ width: "50px", height: "50px", border: "5px solid rgba(255,255,255,0.1)", borderTop: "5px solid var(--primary-color)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
          <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!tour) return null;

  const images = tour.images && tour.images.length > 0 
    ? tour.images.map((img: string) => `${BACKEND_BASE_URL}/${img}`)
    : ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop"];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("tr-TR");
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
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        /* Responsive Grid & Layout */
        .detail-container {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .detail-title {
          font-size: 2.8rem;
          font-weight: 900;
          color: var(--secondary-dark);
          line-height: 1.2;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .detail-left-column {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .detail-slider {
          width: 100%;
          height: 480px;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          background-color: #e2e8f0;
        }
        .detail-sidebar {
          position: sticky;
          top: 120px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .info-pills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        
        /* Pulse Animation for Urgency */
        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
          display: inline-block;
          position: relative;
        }
        .pulse-dot::after {
          content: '';
          width: 100%;
          height: 100%;
          background-color: #ef4444;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 0;
          animation: pulse 1.5s infinite ease-in-out;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }

        /* Mobile Optimization */
        @media (max-width: 991px) {
          .detail-container {
            padding: 20px 15px;
          }
          .detail-title {
            font-size: 1.8rem;
          }
          .detail-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          .detail-slider {
            height: 300px;
            border-radius: 20px;
          }
          .detail-sidebar {
            position: static;
          }
          .info-pills-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>

      <Header />
      
      {/* Detail Page Container */}
      <main className="detail-container">
        
        {/* Back Button */}
        <button 
          onClick={() => router.push("/turlar")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            color: "#64748b",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: "pointer",
            marginBottom: "25px",
            transition: "color 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.color = "var(--primary-color)"}
          onMouseOut={(e) => e.currentTarget.style.color = "#64748b"}
        >
          <ArrowLeft size={20} /> Turlara Geri Dön
        </button>

        {/* Title Block */}
        <div style={{ marginBottom: "30px" }}>
          <h1 className="detail-title">{tour.title}</h1>
          <div style={{ display: "flex", gap: "2px" }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#ff9900" color="#ff9900" />)}
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="detail-grid">
          
          {/* Left Column: Slider and Description */}
          <div className="detail-left-column">
            
            {/* Dynamic Sliding Image Carousel */}
            <div className="detail-slider">
              {/* Slides Container */}
              <div 
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${images[activeImageIndex]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "background-image 0.5s ease-in-out"
                }}
              />

              {/* Slider Chevrons */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      zIndex: 10,
                      color: "var(--secondary-dark)",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "white"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)"}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button 
                    onClick={handleNextImage}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      zIndex: 10,
                      color: "var(--secondary-dark)",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "white"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)"}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Slider Dots Indicators */}
              {images.length > 1 && (
                <div 
                  style={{
                    position: "absolute",
                    bottom: "25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                    zIndex: 10,
                    background: "rgba(0,0,0,0.3)",
                    padding: "8px 15px",
                    borderRadius: "50px",
                    backdropFilter: "blur(5px)"
                  }}
                >
                  {images.map((_: any, idx: number) => (
                    <div 
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: activeImageIndex === idx ? "var(--primary-color)" : "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Tour Info Pills */}
            <div className="info-pills-grid">
              <div style={{ padding: "20px", background: "white", borderRadius: "20px", display: "flex", alignItems: "center", gap: "15px", border: "1px solid #f1f5f9", boxShadow: "0 4px 10px rgba(0,0,0,0.01)" }}>
                <Calendar size={26} color="var(--primary-color)" />
                <div>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "#64748b", fontWeight: "600" }}>Tarih Aralığı</span>
                  <span style={{ fontSize: "1rem", fontWeight: "700", color: "var(--secondary-dark)" }}>
                    {formatDate(tour.start_date)} - {formatDate(tour.end_date)}
                  </span>
                </div>
              </div>

              {tour.quota && parseInt(tour.quota) > 0 ? (
                <div style={{ padding: "20px", background: "white", borderRadius: "20px", display: "flex", alignItems: "center", gap: "15px", border: "1px solid #f1f5f9", boxShadow: "0 4px 10px rgba(0,0,0,0.01)" }}>
                  <Users size={26} color="var(--primary-color)" />
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "#64748b", fontWeight: "600" }}>Kontenjan</span>
                    <span style={{ fontSize: "1rem", fontWeight: "700", color: "var(--secondary-dark)" }}>{tour.quota} Kişi</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Description */}
            <div style={{ background: "white", padding: "40px", borderRadius: "28px", border: "1px solid #f1f5f9", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--secondary-dark)", marginBottom: "20px" }}>Tur Açıklaması</h3>
              <p style={{ color: "#475569", fontSize: "1.1rem", lineHeight: "1.8", whiteSpace: "pre-line" }}>
                {tour.description}
              </p>
            </div>

            {/* Special Conditions */}
            {tour.special_conditions && (
              <div style={{ 
                padding: "30px", 
                background: "rgba(31, 33, 84, 0.03)", 
                borderRadius: "24px", 
                borderLeft: "5px solid var(--primary-color)"
              }}>
                <h4 style={{ 
                  fontSize: "1.1rem", 
                  fontWeight: "800", 
                  color: "var(--secondary-dark)", 
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <Info size={18} color="var(--primary-color)" /> Önemli Bilgiler & Özel Koşullar
                </h4>
                <p style={{ fontSize: "1rem", color: "#64748b", lineHeight: "1.6" }}>
                  {tour.special_conditions}
                </p>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Booking Action Card */}
          <div className="detail-sidebar">
            
            <div 
              style={{
                background: "white",
                borderRadius: "28px",
                padding: "35px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Premium Top Line Accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "var(--primary-gradient)" }} />



              {tour.price && parseFloat(tour.price) > 0 ? (
                <>
                  <span style={{ display: "block", fontSize: "0.85rem", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Kişi Başı</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "25px" }}>
                    <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "var(--secondary-dark)", margin: 0 }}>
                      {parseFloat(tour.price).toLocaleString('tr-TR')} ₺
                    </h2>
                    <span style={{ fontSize: "0.95rem", color: "#64748b", fontWeight: "600" }}>'den başlayan fiyatlar</span>
                  </div>
                </>
              ) : (
                <div style={{ marginBottom: "25px" }}>
                  <span style={{ display: "block", fontSize: "0.85rem", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Fiyat Bilgisi</span>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--secondary-dark)", margin: 0 }}>
                    Fiyat Alın
                  </h3>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <button 
                  onClick={handleWhatsAppBooking}
                  className="btn"
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    fontSize: "0.95rem",
                    fontWeight: "800",
                    boxShadow: "0 10px 20px rgba(229,102,64,0.25)",
                    transition: "transform 0.2s",
                    whiteSpace: "nowrap"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <MessageCircle size={20} /> Rezervasyon Talebi Gönder
                </button>

                {/* Sales Benefit Callouts */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "0.9rem" }}>
                    <ShieldCheck size={18} color="#10b981" />
                    <span style={{ fontWeight: "600" }}>Hızlı Onay & Güvenli İletişim</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "0.9rem" }}>
                    <Clock size={18} color="var(--primary-color)" />
                    <span style={{ fontWeight: "600" }}>Şimdi Ayırtın, Sonra Planlayın</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "0.9rem" }}>
                    <Sparkles size={18} color="#f59e0b" />
                    <span style={{ fontWeight: "600" }}>Kişiselleştirilebilir Tur Detayları</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps Guide - High Conversion Factor */}
            <div style={{ 
              background: "white", 
              borderRadius: "28px", 
              padding: "30px", 
              border: "1px solid #f1f5f9",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
            }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: "800", color: "var(--secondary-dark)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <TrendingUp size={18} color="var(--primary-color)" /> Rezervasyon Süreci Nasıl İşler?
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", gap: "15px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(229,102,64,0.1)", color: "var(--primary-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800", flexShrink: 0 }}>1</div>
                  <div>
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "0.9rem", fontWeight: "700", color: "var(--secondary-dark)" }}>Talebinizi İletin</h5>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", lineHeight: "1.4" }}>WhatsApp butonuna tıklayarak tur tarihinizi ve tercihlerinizi bize yazın.</p>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: "15px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(229,102,64,0.1)", color: "var(--primary-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800", flexShrink: 0 }}>2</div>
                  <div>
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "0.9rem", fontWeight: "700", color: "var(--secondary-dark)" }}>Uzman Desteği Alın</h5>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", lineHeight: "1.4" }}>Müşteri temsilcimiz size hemen dönerek tüm sorularınızı yanıtlasın.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "15px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(229,102,64,0.1)", color: "var(--primary-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800", flexShrink: 0 }}>3</div>
                  <div>
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "0.9rem", fontWeight: "700", color: "var(--secondary-dark)" }}>Yerinizi Ayırtın</h5>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", lineHeight: "1.4" }}>Bilgileriniz onaylandıktan sonra rezervasyonunuz tamamlanmış olur.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Book with us badge */}
            <div style={{ background: "rgba(37,99,235,0.03)", border: "1px dashed rgba(37,99,235,0.2)", borderRadius: "24px", padding: "25px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: "800", color: "var(--secondary-dark)" }}>Neden ASR Holiday?</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem", color: "#475569" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--primary-color)", fontWeight: "900" }}>✓</span> En İyi Fiyat Garantisi</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--primary-color)", fontWeight: "900" }}>✓</span> Deneyimli Yerel Rehberler</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--primary-color)", fontWeight: "900" }}>✓</span> 7/24 Kesintisiz Destek</li>
              </ul>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function TourDetailPage() {
  return (
    <Suspense fallback={
      <div style={{ backgroundColor: "#020617", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ width: "50px", height: "50px", border: "5px solid rgba(255,255,255,0.1)", borderTop: "5px solid var(--primary-color)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
          <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>Yükleniyor...</p>
        </div>
      </div>
    }>
      <TourDetailContent />
    </Suspense>
  );
}
