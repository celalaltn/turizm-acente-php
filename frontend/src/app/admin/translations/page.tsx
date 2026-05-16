"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { Save, Search, Languages, ChevronDown } from "lucide-react";

const APP_KEYS = [
  "nav.home", "nav.about", "nav.contact", 
  "hero.title", "hero.subtitle", 
  "search.start", "search.end", "search.button", 
  "tours.title", "tours.detail", 
  "reviews.title", 
  "contact.title", "contact.name", "contact.email", "contact.phone", "contact.note", "contact.submit", 
  "contact.success", "contact.error", 
  "footer.text"
];

const FLAGS: Record<string, string> = {
  TR: "🇹🇷",
  EN: "🇺🇸",
  RU: "🇷🇺",
  DE: "🇩🇪",
  AR: "🇦🇪",
  ES: "🇪🇸"
};

const LANGUAGES = ["TR", "EN", "RU", "DE", "AR", "ES"];

export default function TranslationsAdmin() {
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadAllTranslations();
  }, []);

  const loadAllTranslations = async () => {
    try {
      const res = await fetchApi("/translations.php"); // Fetch all at once
      if (res.status === "success") {
        setTranslations(res.data || {});
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateValue = (lang: string, key: string, value: string) => {
    setTranslations(prev => ({
      ...prev,
      [lang]: {
        ...(prev[lang] || {}),
        [key]: value
      }
    }));
  };

  const handleSaveAll = async () => {
    try {
      // Logic to save each modified language
      const promises = LANGUAGES.map(lang => {
        return fetchApi("/translations.php", {
          method: "POST",
          body: JSON.stringify({
            lang_code: lang,
            translations: translations[lang] || {}
          })
        });
      });
      await Promise.all(promises);
      alert("Tüm dillerdeki çeviriler başarıyla kaydedildi!");
    } catch (e) {
      alert("Kayıt sırasında bir hata oluştu.");
    }
  };

  const handleSaveKey = async (key: string) => {
    try {
      const promises = LANGUAGES.map(lang => {
        return fetchApi("/translations.php", {
          method: "POST",
          body: JSON.stringify({
            lang_code: lang,
            translations: { [key]: translations[lang]?.[key] || "" }
          })
        });
      });
      await Promise.all(promises);
      alert(`"${key}" tüm dillerde kaydedildi!`);
    } catch (e) {
      alert("Kayıt sırasında hata oluştu.");
    }
  };

  const filteredKeys = APP_KEYS.filter(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>Metin Çevirileri</h1>
          <p style={{ color: '#94a3b8' }}>Tüm sistem metinlerini diller bazında manuel olarak buradan yönetebilirsiniz.</p>
        </div>
        <button 
          onClick={handleSaveAll}
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
            fontWeight: '600',
            boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)'
          }}
        >
          <Save size={20} />
          Hepsini Kaydet
        </button>
      </div>

      <div style={{ 
        position: 'relative', 
        marginBottom: '30px',
        maxWidth: '400px'
      }}>
        <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        <input 
          type="text" 
          placeholder="Anahtar ara (Örn: hero.title)..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '15px 15px 15px 50px', 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '15px', 
            color: 'white',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {filteredKeys.map(key => (
          <div key={key} style={{ 
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: '20px', 
            overflow: 'hidden' 
          }}>
            <div style={{ 
              padding: '20px 25px', 
              background: 'rgba(255,255,255,0.03)', 
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <code style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '1rem' }}>{key}</code>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Sistem Anahtarı</span>
              </div>
              <button 
                onClick={() => handleSaveKey(key)}
                style={{ 
                  padding: '8px 15px', 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  border: '1px solid rgba(59, 130, 246, 0.2)', 
                  borderRadius: '10px', 
                  color: '#3b82f6', 
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Save size={14} /> Kaydet
              </button>
            </div>
            
            <div style={{ padding: '25px' }}>
              {/* TR (Reference) */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: '#94a3b8' }}>
                  <span>{FLAGS.TR}</span> Türkçe (Referans)
                </label>
                <input 
                  type="text" 
                  value={translations.TR?.[key] || ""}
                  onChange={e => updateValue("TR", key, e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '15px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid #3b82f640', 
                    borderRadius: '12px', 
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {/* Other Languages Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {LANGUAGES.filter(l => l !== "TR").map(lang => (
                  <div key={lang}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', color: '#64748b' }}>
                      <span>{FLAGS[lang]}</span> {lang} Çevirisi
                    </label>
                    <input 
                      type="text" 
                      value={translations[lang]?.[key] || ""}
                      onChange={e => updateValue(lang, key, e.target.value)}
                      placeholder={`${lang} karşılığını girin...`}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        background: 'rgba(255,255,255,0.02)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '10px', 
                        color: 'white',
                        fontSize: '0.95rem',
                        direction: lang === 'AR' ? 'rtl' : 'ltr'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
