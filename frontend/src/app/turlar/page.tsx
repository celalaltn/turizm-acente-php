"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Star, ArrowRight, Search as SearchIcon } from "lucide-react";

import PageHeader from "@/components/PageHeader";

function ToursListContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = useState(searchParams.get("start") || "");
  const [endDate, setEndDate] = useState(searchParams.get("end") || "");
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, [lang, searchParams]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const start = searchParams.get("start") || "";
      const end = searchParams.get("end") || "";
      const response = await fetch(`http://localhost/turizm-acente-php/backend/api/public/tours.php?lang=${lang.toUpperCase()}&start=${start}&end=${end}`);
      const result = await response.json();
      if (result.status === "success") {
        setTours(result.data);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);
    window.history.pushState({}, "", `/turlar?${params.toString()}`);
    fetchTours();
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Header />
      
      <PageHeader 
        title={t("nav.tours")} 
        image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop" // Antalya/Boat style image
      />

      <div className="container" style={{ padding: '40px 25px' }}>
        {/* Filter Bar */}
        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '24px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
          marginBottom: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'flex-end'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#64748b', fontSize: '0.9rem' }}>Başlangıç Tarihi</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)}
                style={{ width: '100%', padding: '12px 15px 12px 45px', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none' }} 
              />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#64748b', fontSize: '0.9rem' }}>Bitiş Tarihi</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)}
                style={{ width: '100%', padding: '12px 15px 12px 45px', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none' }} 
              />
            </div>
          </div>
          <button className="btn" onClick={handleFilter} style={{ padding: '12px 30px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SearchIcon size={20} /> Filtrele
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px' }}>
            <div className="loader">Yükleniyor...</div>
          </div>
        ) : (
          <div className="tours-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {tours.length > 0 ? (
              tours.map((tour) => (
                <div key={tour.id} className="tour-card" style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                  <div 
                    className="tour-image" 
                    style={{
                      height: '250px',
                      backgroundImage: tour.images && tour.images.length > 0 
                        ? `url(http://localhost/turizm-acente-php/backend/${tour.images[0]})` 
                        : 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div style={{ padding: '25px' }}>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#ff9900" color="#ff9900" />)}
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '10px' }}>{tour.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px', height: '60px', overflow: 'hidden' }}>{tour.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
                       <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-color)' }}>{tour.price} ₺</span>
                       <button className="btn" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Detayları Gör</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px', background: 'white', borderRadius: '24px' }}>
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Seçtiğiniz kriterlere uygun tur bulunamadı.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <ToursListContent />
    </Suspense>
  );
}
