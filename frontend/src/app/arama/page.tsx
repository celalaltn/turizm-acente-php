"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { PUBLIC_API_BASE_URL, BACKEND_BASE_URL } from "@/lib/api";
import { Calendar } from "lucide-react";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("tr-TR");
  } catch (e) {
    return dateStr;
  }
};

export default function Search() {
  const { t, lang } = useLanguage();
  const [start, setStart] = useState<string | null>("");
  const [end, setEnd] = useState<string | null>("");
  const [tours, setTours] = useState<any[]>([]);

  useEffect(() => {
    // Basic query param extraction
    const params = new URLSearchParams(window.location.search);
    const startDate = params.get("start");
    const endDate = params.get("end");
    setStart(startDate);
    setEnd(endDate);

    const fetchResults = async () => {
      try {
        let url = `${PUBLIC_API_BASE_URL}/tours.php?lang=${lang.toUpperCase()}`;
        if (startDate && endDate) {
          url += `&start_date=${startDate}&end_date=${endDate}`;
        }
        const response = await fetch(url);
        const result = await response.json();
        if (result.status === "success") {
          setTours(result.data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchResults();
  }, [lang]);

  return (
    <div>
      <Header />
      <main className="container" style={{ padding: '60px 20px', minHeight: '60vh' }}>
        <h1 className="section-title">Arama Sonuçları</h1>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p>
            <strong>{t("search.start")}:</strong> {start || "-"} <br/>
            <strong>{t("search.end")}:</strong> {end || "-"}
          </p>
        </div>

        <div className="tours-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(var(--grid-col-min-large, 350px), 1fr))', gap: '30px' }}>
          {tours.length > 0 ? (
            tours.map((tour: any) => (
              <div 
                key={tour.id} 
                className="tour-card" 
                onClick={() => window.location.href = `/turlar/detay?id=${tour.id}`}
                style={{ 
                  background: '#fff', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
                  border: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                }}
              >
                <div 
                  className="tour-image" 
                  style={{
                    height: '250px',
                    backgroundImage: tour.images && tour.images.length > 0 
                      ? `url(${BACKEND_BASE_URL}/${tour.images[0]})` 
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#e2e8f0'
                  }}
                />
                <div className="tour-info" style={{ padding: '25px' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '10px' }}>{tour.title}</h3>
                  
                  {/* Tour Date Range */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem', marginBottom: '15px' }}>
                    <Calendar size={16} color="var(--primary-color)" />
                    <span style={{ fontWeight: '600' }}>
                      {formatDate(tour.start_date)} - {formatDate(tour.end_date)}
                    </span>
                  </div>

                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '0.95rem', 
                    marginBottom: '20px', 
                    display: '-webkit-box', 
                    WebkitLineClamp: '3', 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden', 
                    minHeight: '65px',
                    lineHeight: '1.5'
                  }}>{tour.description}</p>
                  <div style={{ paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
                    <button 
                      className="btn" 
                      onClick={() => window.location.href = `/turlar/detay?id=${tour.id}`}
                      style={{ padding: '12px 20px', fontSize: '0.9rem', width: '100%', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {t("tours.detail")}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Sonuç bulunamadı.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
