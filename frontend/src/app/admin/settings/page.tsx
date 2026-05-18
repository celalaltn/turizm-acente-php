"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { Save, Upload, Phone, Mail, MapPin, Globe, Image as ImageIcon } from "lucide-react";

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    contact_phone: "",
    contact_whatsapp: "",
    contact_email: "",
    contact_address: "",
    site_logo: ""
  });
  
  const [languages, setLanguages] = useState<any[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const setRes = await fetchApi("/settings.php");
      if (setRes.status === "success" && setRes.data) {
        setSettings({
          contact_phone: setRes.data.contact_phone || "",
          contact_whatsapp: setRes.data.contact_whatsapp || "",
          contact_email: setRes.data.contact_email || "",
          contact_address: setRes.data.contact_address || "",
          site_logo: setRes.data.site_logo || ""
        });
      }

      const langRes = await fetchApi("/languages.php");
      if (langRes.status === "success") {
        setLanguages(langRes.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    try {
      // If there's a new logo, we might need a separate upload or just base64 for simplicity in settings
      // But better to use the upload API pattern
      let logoPath = settings.site_logo;
      if (logoFile) {
        // Mock upload or actual implementation
        // For settings, let's assume we update the key
        alert("Logo yükleme API entegrasyonu gerekiyor.");
      }

      await fetchApi("/settings.php", {
        method: "POST",
        body: JSON.stringify(settings)
      });
      alert("Tüm ayarlar başarıyla güncellendi.");
    } catch (e) {
      alert("Hata oluştu.");
    }
  };

  const toggleLanguage = async (code: string, currentStatus: number) => {
    try {
      await fetchApi("/languages.php", {
        method: "PUT",
        body: JSON.stringify({ code, is_active: currentStatus === 1 ? 0 : 1 })
      });
      loadData();
    } catch (e) {
      alert("Hata oluştu.");
    }
  };

  return (
    <div>
      <div className="responsive-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>Genel Ayarlar</h1>
          <p style={{ color: '#94a3b8' }}>Site kimliğini ve iletişim kanallarını buradan yönetin.</p>
        </div>
        <button 
          onClick={handleSave}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '15px 30px', 
            background: 'var(--primary-gradient)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '15px', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          <Save size={20} />
          Ayarları Kaydet
        </button>
      </div>

      <div className="responsive-settings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        {/* Logo Section */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
             <ImageIcon className="text-blue-500" />
             <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Site Logosu</h3>
          </div>
          
          <div style={{ 
            width: '100%', 
            height: '180px', 
            border: '2px dashed rgba(255,255,255,0.1)', 
            borderRadius: '20px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '20px',
            background: 'rgba(255,255,255,0.01)',
            overflow: 'hidden'
          }}>
            {settings.site_logo ? (
              <img src={settings.site_logo} alt="Logo" style={{ maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' }} />
            ) : (
              <>
                <Upload size={40} style={{ color: '#64748b', marginBottom: '10px' }} />
                <span style={{ color: '#64748b' }}>Logo Seçiniz</span>
              </>
            )}
          </div>
          <input 
            type="file" 
            id="logoInput" 
            style={{ display: 'none' }} 
            onChange={e => setLogoFile(e.target.files?.[0] || null)}
          />
          <button 
            onClick={() => document.getElementById('logoInput')?.click()}
            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', cursor: 'pointer' }}
          >
            Dosya Seç
          </button>
        </div>

        {/* Contact Info */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
             <Phone className="text-green-500" />
             <h3 style={{ fontSize: '1.2rem', margin: 0 }}>İletişim Kanalları</h3>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Telefon</label>
            <input 
              type="text" 
              value={settings.contact_phone} 
              onChange={e => setSettings({...settings, contact_phone: e.target.value})}
              style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>WhatsApp</label>
            <input 
              type="text" 
              value={settings.contact_whatsapp} 
              onChange={e => setSettings({...settings, contact_whatsapp: e.target.value})}
              style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>E-Posta</label>
            <input 
              type="email" 
              value={settings.contact_email} 
              onChange={e => setSettings({...settings, contact_email: e.target.value})}
              style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} 
            />
          </div>
        </div>

        {/* Address */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '30px', gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
             <MapPin className="text-red-500" />
             <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Adres Bilgisi</h3>
          </div>
          <textarea 
            rows={5} 
            value={settings.contact_address} 
            onChange={e => setSettings({...settings, contact_address: e.target.value})}
            style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: 'white', outline: 'none' }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
            margin-bottom: 25px !important;
          }
          .responsive-header button {
            width: 100% !important;
            justify-content: center !important;
          }
          .responsive-settings-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .responsive-settings-grid > div {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
