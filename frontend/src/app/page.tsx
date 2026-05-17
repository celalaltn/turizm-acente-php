"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Calendar, Users, ArrowRight, Star } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr, enUS, ru, de, arSA, es } from "date-fns/locale";

const LOCALE_MAP: Record<string, any> = { tr, en: enUS, ru, de, ar: arSA, es };

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
];

export default function Home() {
  const { t, lang } = useLanguage();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tours, setTours] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost/turizm-acente-php/backend/api/public/tours.php?lang=${lang.toUpperCase()}`);
        const result = await response.json();
        if (result.status === "success") {
          setTours(result.data);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, [lang]);

  const handleSearch = () => {
    const startStr = startDate ? startDate.toISOString().split('T')[0] : "";
    const endStr = endDate ? endDate.toISOString().split('T')[0] : "";
    window.location.href = `/turlar?start=${startStr}&end=${endStr}`;
  };

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <Header />

      {/* Hero Slider */}
      <section className="hero-slider" style={{ position: 'relative', height: 'var(--hero-height, 85vh)', minHeight: 'var(--hero-height, 600px)', overflow: 'hidden' }}>
        {SLIDER_IMAGES.map((img, idx) => (
          <div 
            key={idx}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === idx ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: currentSlide === idx ? 1 : 0
            }}
          />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--box-padding, 20px)' }}>
          <div className="hero-content reveal reveal-up active" style={{ maxWidth: '900px', color: 'white', textAlign: 'center', width: '100%' }}>
            <h1 style={{ fontSize: 'var(--hero-title-size, 4.5rem)', fontWeight: '900', marginBottom: '20px', letterSpacing: '-2px', lineHeight: '1.1' }}>
              {t("hero.title")}
            </h1>
            <p style={{ fontSize: 'var(--hero-subtitle-size, 1.4rem)', marginBottom: '40px', opacity: 0.9, fontWeight: '400' }}>
              {t("hero.subtitle")}
            </p>
            
            <div className="search-container" style={{ 
              background: 'white', 
              padding: 'var(--search-container-padding, 12px)', 
              borderRadius: 'var(--search-container-radius, 24px)', 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              maxWidth: '850px',
              margin: '0 auto',
              width: '100%'
            }}>
              <div style={{ position: 'relative', flex: '1', minWidth: 'var(--search-input-min-width, 220px)' }}>
                <Calendar size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', zIndex: 5 }} />
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  selectsStart
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  placeholderText={t("search.start") || "Gidiş Tarihi"}
                  className="custom-datepicker"
                  locale={LOCALE_MAP[lang] || tr}
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
              <div style={{ position: 'relative', flex: '1', minWidth: 'var(--search-input-min-width, 220px)' }}>
                <Calendar size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', zIndex: 5 }} />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  minDate={startDate || undefined}
                  placeholderText={t("search.end") || "Dönüş Tarihi"}
                  className="custom-datepicker"
                  locale={LOCALE_MAP[lang] || tr}
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
              <button className="btn" onClick={handleSearch} style={{ minWidth: '160px', borderRadius: '16px', width: 'var(--search-button-width, auto)' }}>
                {t("search.button") || "Turları Ara"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="tours container" style={{ padding: 'var(--section-padding, 100px 25px)' }}>
        <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="section-title" style={{ marginBottom: '15px' }}>{t("tours.title")}</h2>
          <p style={{ color: '#64748b', fontSize: 'var(--section-subtitle-size, 1.2rem)' }}>En çok tercih edilen rüya gibi tatil rotaları.</p>
        </div>

        <div className="tours-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(var(--grid-col-min-medium, 350px), 1fr))', gap: '30px' }}>
          {tours.map((tour: any, idx: number) => (
            <div key={tour.id} className={`tour-card reveal reveal-up delay-${(idx % 3) + 1}`} style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <div 
                className="tour-image" 
                style={{
                  height: '280px',
                  backgroundImage: tour.images && tour.images.length > 0 
                    ? `url(http://localhost/turizm-acente-php/backend/${tour.images[0]})` 
                    : 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', padding: '8px 15px', borderRadius: '50px', fontWeight: '800', color: 'var(--primary-color)', fontSize: '1.1rem', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                  {tour.price} ₺
                </div>
              </div>
              <div className="tour-info" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#ff9900" color="#ff9900" />)}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px' }}>{tour.title}</h3>
                <p style={{ color: '#64748b', marginBottom: '25px', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {tour.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem' }}>
                    <Users size={16} />
                    <span>{tour.quota} Kişi</span>
                  </div>
                  <button className="btn" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                    {t("tours.detail")} <ArrowRight size={16} style={{ marginLeft: '5px' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges / Stats */}
      <section style={{ padding: 'var(--section-padding, 80px 0)', background: '#f8fafc' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '30px', textAlign: 'center' }}>
          <div className="reveal reveal-up delay-1">
            <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary-color)' }}>10k+</h4>
            <p style={{ color: '#64748b', fontWeight: '600' }}>Mutlu Müşteri</p>
          </div>
          <div className="reveal reveal-up delay-2">
            <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary-color)' }}>500+</h4>
            <p style={{ color: '#64748b', fontWeight: '600' }}>Tur Rotası</p>
          </div>
          <div className="reveal reveal-up delay-3">
            <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary-color)' }}>15</h4>
            <p style={{ color: '#64748b', fontWeight: '600' }}>Yıllık Deneyim</p>
          </div>
          <div className="reveal reveal-up delay-4">
            <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary-color)' }}>24/7</h4>
            <p style={{ color: '#64748b', fontWeight: '600' }}>Destek Hattı</p>
          </div>
        </div>
      </section>

      {/* Reviews Slider */}
      <section className="reviews container reveal reveal-up" style={{ padding: 'var(--section-padding, 100px 25px)', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="section-title">Müşterilerimiz Ne Diyor?</h2>
          <p style={{ color: '#64748b' }}>Binlerce mutlu gezginin deneyimlerine kulak verin.</p>
        </div>
        
        <ReviewsSlider />
      </section>

      <div className="reveal reveal-up">
        <ContactForm showInfoSide={false} />
      </div>

      {/* Home Short About Section (SEO) */}
      <section className="reveal reveal-up" style={{ padding: 'var(--section-padding, 100px 25px)', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: 'var(--section-title-size, 2.8rem)', 
            fontWeight: '900', 
            color: 'var(--secondary-dark)', 
            marginBottom: '30px',
            lineHeight: '1.2'
          }}>
            {t("home.about.title")}
          </h2>
          <div style={{ 
            fontSize: '1.2rem', 
            color: '#64748b', 
            lineHeight: '1.8',
            fontWeight: '400'
          }}>
            <p>{t("home.about.desc")}</p>
          </div>
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            {["Antalya", "Türkiye", "Tatil", "Otel", "Deniz", "Tur"].map((tag, i) => (
              <span key={i} className={`reveal reveal-right delay-${(i % 4) + 1}`} style={{ 
                padding: '8px 20px', 
                background: '#f1f5f9', 
                borderRadius: '50px', 
                fontSize: '0.9rem', 
                fontWeight: '700', 
                color: 'var(--secondary-dark)' 
              }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ReviewsSlider() {
  const reviews = [
    { name: "Mehmet Caner", role: "Gezgin", text: "Asr Holiday ile yaptığımız Kapadokya turu rüya gibiydi. Her şey en ince ayrıntısına kadar düşünülmüştü.", stars: 5 },
    { name: "Ayşe Yılmaz", role: "Aile Tatili", text: "Çocuklarla yaptığımız en rahat tatildi. Otel seçimleri ve transferler çok başarılıydı. Teşekkürler!", stars: 5 },
    { name: "John Smith", role: "Tourist", text: "Excellent service and very professional guides. They know all the hidden gems of Antalya. Highly recommended!", stars: 5 },
    { name: "Dmitry Volkov", role: "Traveler", text: "Лучшее агентство в Анталии! Всё четко, вовремя и очень вежливо. Обязательно вернусь снова.", stars: 5 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', overflow: 'hidden' }}>
      <div style={{ 
        display: 'flex', 
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)', 
        transform: `translateX(-${currentIndex * 100}%)` 
      }}>
        {reviews.map((rev, idx) => (
          <div key={idx} style={{ minWidth: '100%', padding: '20px' }}>
            <div className="review-card" style={{ background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', textAlign: 'center' }}>
               <div style={{ color: '#ff9900', marginBottom: '25px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                 {[...Array(rev.stars)].map((_, i) => <Star key={i} size={20} fill="#ff9900" color="#ff9900" />)}
               </div>
               <p style={{ fontSize: '1.4rem', fontStyle: 'italic', color: '#1e293b', marginBottom: '35px', lineHeight: '1.6', fontWeight: '400' }}>
                 "{rev.text}"
               </p>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {rev.name[0]}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                     <span style={{ fontWeight: '800', color: '#0f172a', display: 'block', fontSize: '1.1rem' }}>{rev.name}</span>
                     <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>{rev.role}</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
        {reviews.map((_, idx) => (
          <div 
            key={idx} 
            onClick={() => setCurrentIndex(idx)}
            style={{ 
              width: currentIndex === idx ? '30px' : '10px', 
              height: '10px', 
              borderRadius: '5px', 
              background: currentIndex === idx ? 'var(--primary-color)' : '#cbd5e1',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }} 
          />
        ))}
      </div>
    </div>
  );
}
