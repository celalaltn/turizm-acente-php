"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

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
        let url = `http://localhost/backend/api/public/tours.php?lang=${lang.toUpperCase()}`;
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

        <div className="tours-grid">
          {tours.length > 0 ? (
            tours.map((tour: any) => (
              <div key={tour.id} className="tour-card">
                <div 
                  className="tour-image" 
                  style={{
                    backgroundImage: tour.images && tour.images.length > 0 
                      ? `url(http://localhost/backend/${tour.images[0]})` 
                      : 'none',
                    backgroundColor: '#e0e0e0'
                  }}
                ></div>
                <div className="tour-info">
                  <h3>{tour.title}</h3>
                  <p>{tour.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{tour.price} ₺</span>
                    <button className="btn" style={{ padding: '8px 16px' }}>{t("tours.detail")}</button>
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
