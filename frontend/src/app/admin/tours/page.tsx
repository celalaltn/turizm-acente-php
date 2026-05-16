"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { Plus, Trash2, Calendar, Users, DollarSign, Image as ImageIcon, ArrowLeft, Save, Map as MapIcon } from "lucide-react";

export default function ToursAdmin() {
  const [activeTab, setActiveTab] = useState("list");
  const [tours, setTours] = useState<any[]>([]);
  const [newTour, setNewTour] = useState({ title: "", description: "", price: "", quota: "", start_date: "", end_date: "", special_conditions: "", lang_code: "TR" });
  const [images, setImages] = useState<FileList | null>(null);

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

  const handleSaveTour = async () => {
    try {
      const res = await fetchApi("/tours.php", {
        method: "POST",
        body: JSON.stringify(newTour)
      });
      
      if (res.status === "success") {
        if (images && images.length > 0) {
          const formData = new FormData();
          formData.append("tour_id", res.tour_id);
          Array.from(images).forEach(file => formData.append("images[]", file));
          
          await fetchApi("/upload_image.php", {
            method: "POST",
            body: formData
          });
        }
        
        alert("Tur başarıyla eklendi.");
        setActiveTab("list");
        loadTours();
        setNewTour({ title: "", description: "", price: "", quota: "", start_date: "", end_date: "", special_conditions: "", lang_code: "TR" });
        setImages(null);
      } else {
        alert(res.message);
      }
    } catch (e) {
      alert("Hata oluştu.");
    }
  };

  const deleteTour = async (id: number) => {
    if (confirm("Bu turu silmek istediğinize emin misiniz?")) {
      try {
        await fetchApi(`/tours.php?id=${id}`, { method: "DELETE" });
        loadTours();
      } catch (e) {
        alert("Hata oluştu.");
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>Tur Yönetimi</h1>
          <p style={{ color: '#94a3b8' }}>Sistemdeki tüm turları buradan yönetebilir ve yeni turlar ekleyebilirsiniz.</p>
        </div>
        <button 
          onClick={() => setActiveTab(activeTab === "list" ? "add" : "list")}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '15px 30px', 
            background: activeTab === "list" ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.1)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '15px', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {activeTab === "list" ? <Plus size={20} /> : <ArrowLeft size={20} />}
          {activeTab === "list" ? "Yeni Tur Ekle" : "Listeye Dön"}
        </button>
      </div>

      {activeTab === "list" ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          {tours.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: '#64748b', fontSize: '0.9rem' }}>
                    <th style={{ padding: '0 20px' }}>TUR BILGISI</th>
                    <th style={{ padding: '0 20px' }}>TARIH</th>
                    <th style={{ padding: '0 20px' }}>FIYAT & KONTENJAN</th>
                    <th style={{ padding: '0 20px', textAlign: 'right' }}>IŞLEMLER</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map(t => (
                    <tr key={t.id} style={{ background: 'rgba(255,255,255,0.02)', transition: 'all 0.3s' }}>
                      <td style={{ padding: '20px', borderRadius: '15px 0 0 15px', border: '1px solid rgba(255,255,255,0.05)', borderRight: 'none' }}>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '4px' }}>{t.title || `Tur #${t.id}`}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ID: {t.id}</div>
                      </td>
                      <td style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
                          <Calendar size={16} />
                          <span>{t.start_date} / {t.end_date}</span>
                        </div>
                      </td>
                      <td style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <span style={{ color: '#10b981', fontWeight: 'bold' }}>{t.price} ₺</span>
                          <span style={{ color: '#64748b' }}>|</span>
                          <span style={{ color: '#f59e0b' }}>{t.quota} Kişi</span>
                        </div>
                      </td>
                      <td style={{ padding: '20px', borderRadius: '0 15px 15px 0', border: '1px solid rgba(255,255,255,0.05)', borderLeft: 'none', textAlign: 'right' }}>
                        <button 
                          onClick={() => deleteTour(t.id)} 
                          style={{ padding: '10px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '100px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '30px', border: '2px dashed rgba(255,255,255,0.05)' }}>
               <MapIcon size={50} style={{ color: '#1e293b', marginBottom: '20px' }} />
               <p style={{ color: '#64748b' }}>Henüz tur eklenmemiş. Yeni bir tur ekleyerek başlayın.</p>
            </div>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Tur Başlığı (Varsayılan - TR)</label>
              <input 
                type="text" 
                value={newTour.title} 
                onChange={e => setNewTour({...newTour, title: e.target.value})} 
                placeholder="Örn: Kapadokya Balon Turu"
                style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1.1rem' }} 
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Tur Açıklaması</label>
              <textarea 
                rows={5}
                value={newTour.description} 
                onChange={e => setNewTour({...newTour, description: e.target.value})} 
                style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Fiyat (₺)</label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input 
                  type="number" 
                  value={newTour.price} 
                  onChange={e => setNewTour({...newTour, price: e.target.value})} 
                  style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} 
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Kontenjan</label>
              <div style={{ position: 'relative' }}>
                <Users size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input 
                  type="number" 
                  value={newTour.quota} 
                  onChange={e => setNewTour({...newTour, quota: e.target.value})} 
                  style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} 
                />
              </div>
            </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Başlangıç Tarihi</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#3b82f6' }} />
                <input 
                  type="date" 
                  value={newTour.start_date} 
                  onChange={e => setNewTour({...newTour, start_date: e.target.value})} 
                  style={{ 
                    width: '100%', 
                    padding: '15px 15px 15px 45px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '15px', 
                    color: 'white',
                    colorScheme: 'dark', // Modern date picker UI in most browsers
                    outline: 'none',
                    cursor: 'pointer'
                  }} 
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Bitiş Tarihi</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#10b981' }} />
                <input 
                  type="date" 
                  value={newTour.end_date} 
                  onChange={e => setNewTour({...newTour, end_date: e.target.value})} 
                  style={{ 
                    width: '100%', 
                    padding: '15px 15px 15px 45px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '15px', 
                    color: 'white',
                    colorScheme: 'dark',
                    outline: 'none',
                    cursor: 'pointer'
                  }} 
                />
              </div>
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1', marginBottom: '30px' }}>
             <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Özel Şartlar & Notlar</label>
             <textarea 
               rows={3}
               value={newTour.special_conditions} 
               onChange={e => setNewTour({...newTour, special_conditions: e.target.value})} 
               placeholder="Tur ile ilgili özel şartlar, gereksinimler..."
               style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: 'white', outline: 'none' }} 
             />
          </div>

          <div style={{ gridColumn: '1 / -1', marginBottom: '40px' }}>
             <div style={{ 
               padding: '40px', 
               border: '2px dashed rgba(59, 130, 246, 0.3)', 
               borderRadius: '24px', 
               textAlign: 'center', 
               background: 'rgba(59, 130, 246, 0.05)',
               transition: 'all 0.3s',
               cursor: 'pointer'
             }}
             onMouseOver={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
             onMouseOut={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)'}
             onClick={() => document.getElementById('imageInput')?.click()}
             >
                <ImageIcon size={48} style={{ color: '#3b82f6', marginBottom: '15px' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Fotoğrafları Yükle</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Maksimum 8 adet (JPG, PNG, WEBP). Sürükleyip bırakın veya seçin.</p>
                <input 
                  type="file" 
                  id="imageInput"
                  multiple 
                  accept="image/*" 
                  onChange={e => setImages(e.target.files)}
                  style={{ display: 'none' }}
                />
                <div style={{ display: 'inline-flex', padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', fontSize: '0.9rem' }}>
                  {images ? `${images.length} dosya seçildi` : "Dosya Seçilmedi"}
                </div>
             </div>
          </div>
          </div>

          <button 
            onClick={handleSaveTour} 
            style={{ 
              width: '100%', 
              padding: '25px', 
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '20px', 
              cursor: 'pointer', 
              fontSize: '1.2rem', 
              fontWeight: '800', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px',
              boxShadow: '0 15px 30px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.3s transform'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Save size={24} />
            YENI TURU KAYDET
          </button>
        </div>
      )}
    </div>
  );
}
