"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Star, ArrowRight, Search as SearchIcon } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import { PUBLIC_API_BASE_URL, BACKEND_BASE_URL } from "@/lib/api";
import TourDetailModal from "@/components/TourDetailModal";

function ToursListContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = useState(searchParams.get("start") || "");
  const [endDate, setEndDate] = useState(searchParams.get("end") || "");
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTours();
  }, [lang, searchParams]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const start = searchParams.get("start") || "";
      const end = searchParams.get("end") || "";
      const response = await fetch(`${PUBLIC_API_BASE_URL}/tours.php?lang=${lang.toUpperCase()}&start=${start}&end=${end}`);
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("tr-TR");
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Header />
      
      <PageHeader 
        title={t("nav.tours")} 
        image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop" // Antalya/Boat style image
      />

      <div className="container" style={{ padding: 'var(--section-padding, 40px 25px)' }}>
        {/* Filter Bar */}
        <div className="filter-bar" style={{ 
          background: 'white', 
          padding: 'var(--box-padding-medium, 25px)', 
          borderRadius: '24px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
          marginBottom: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'flex-end'
        }}>
          <div style={{ flex: 1, minWidth: 'var(--grid-col-min-small, 200px)' }}>
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
          <div style={{ flex: 1, minWidth: 'var(--grid-col-min-small, 200px)' }}>
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
          <button className="btn" onClick={handleFilter} style={{ padding: '12px 30px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', width: 'var(--btn-width, auto)' }}>
            <SearchIcon size={20} /> Filtrele
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px' }}>
            <div className="loader">Yükleniyor...</div>
          </div>
        ) : (
          <div className="tours-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
            {tours.length > 0 ? (
              tours.map((tour) => (
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
                         Detayları Gör
                       </button>
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
