"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { MapIcon, ArrowRight, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [tours, setTours] = useState<any[]>([]);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const res = await fetchApi("/tours.php");
      if (res.status === "success") {
        setTours(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Hoşgeldiniz, Admin
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Sistemdeki turlarınızın genel durumu aşağıdadır.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginBottom: '50px' }}>
        <div style={{ 
          padding: '40px', 
          background: 'var(--primary-gradient)', 
          borderRadius: '24px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ fontSize: '1.1rem', opacity: 0.8, fontWeight: '500', marginBottom: '5px' }}>Toplam Tur Sayısı</h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{tours.length}</div>
          </div>
          <MapIcon size={120} style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.2 }} />
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Son Eklenen Turlar</h2>
          <Link href="/admin/tours" style={{ color: '#3b82f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
            Tümünü Gör <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {tours.slice(0, 5).map((tour) => (
            <div key={tour.id} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>{tour.title || `Tur #${tour.id}`}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', gap: '15px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {tour.start_date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={12} /> {tour.price} ₺</span>
                </div>
              </div>
              <Link href="/admin/tours" style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'white' }}>
                <ArrowRight size={18} />
              </Link>
            </div>
          ))}
          {tours.length === 0 && <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>Henüz tur eklenmemiş.</p>}
        </div>
      </div>
    </div>
  );
}
