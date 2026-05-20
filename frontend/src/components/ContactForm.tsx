"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import { PUBLIC_API_BASE_URL } from "@/lib/api";

export default function ContactForm({ showInfoSide = true }: { showInfoSide?: boolean }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    note: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch(`${PUBLIC_API_BASE_URL}/contact.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.status === "success") {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", note: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" style={{ padding: showInfoSide ? 'var(--section-padding, 100px 25px)' : '0', background: showInfoSide ? 'var(--background-color)' : 'transparent' }}>
      <div className="container" style={{ maxWidth: showInfoSide ? '1100px' : '600px', padding: 0 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: showInfoSide ? 'repeat(auto-fit, minmax(var(--grid-col-min-large, 400px), 1fr))' : '1fr', 
          gap: 'var(--box-padding, 60px)',
          alignItems: 'center',
          background: 'white',
          padding: showInfoSide ? 'var(--box-padding, 60px)' : 'var(--box-padding-medium, 40px)',
          borderRadius: '40px',
          boxShadow: showInfoSide ? '0 30px 60px rgba(0,0,0,0.05)' : 'none',
          border: showInfoSide ? '1px solid #f1f5f9' : 'none'
        }}>
          {/* Info Side */}
          {showInfoSide && (
            <div>
              <span style={{ color: 'var(--primary-color)', fontWeight: '800', letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>
                İletişime Geçin
              </span>
              <h2 style={{ fontSize: 'var(--section-title-size, 3rem)', fontWeight: '900', color: 'var(--secondary-dark)', marginBottom: '25px', lineHeight: '1.1' }}>
                Sorularınız mı var? <br/> <span style={{ color: 'var(--primary-color)' }}>Biz Buradayız.</span>
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
                Hayalinizdeki tatili planlamak için bize mesaj bırakın. Uzman danışmanlarımız en kısa sürede size dönüş yapacaktır.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(229, 102, 64, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                      <Mail size={24} />
                  </div>
                  <div>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>E-Posta</span>
                      <span style={{ fontWeight: '700', color: 'var(--secondary-dark)' }}>info@asrtour.com</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(229, 102, 64, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                      <Phone size={24} />
                  </div>
                  <div>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>Telefon</span>
                      <span style={{ fontWeight: '700', color: 'var(--secondary-dark)' }}>+90 551 435 00 45</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Side */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
              <input 
                type="text" 
                placeholder={t("contact.name")} 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '15px 15px 15px 45px', border: '1px solid #e2e8f0', borderRadius: '15px', outline: 'none', background: '#f8fafc', transition: '0.3s' }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
              <input 
                type="email" 
                placeholder={t("contact.email")} 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', padding: '15px 15px 15px 45px', border: '1px solid #e2e8f0', borderRadius: '15px', outline: 'none', background: '#f8fafc' }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Phone size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
              <input 
                type="text" 
                placeholder={t("contact.phone")} 
                required 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                style={{ width: '100%', padding: '15px 15px 15px 45px', border: '1px solid #e2e8f0', borderRadius: '15px', outline: 'none', background: '#f8fafc' }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <MessageSquare size={18} style={{ position: 'absolute', left: '15px', top: '20px', color: '#cbd5e1' }} />
              <textarea 
                placeholder={t("contact.note")} 
                rows={4} 
                required 
                value={formData.note}
                onChange={e => setFormData({...formData, note: e.target.value})}
                style={{ width: '100%', padding: '15px 15px 15px 45px', border: '1px solid #e2e8f0', borderRadius: '15px', outline: 'none', background: '#f8fafc', resize: 'none' }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              />
            </div>
            <button 
              type="submit" 
              className="btn" 
              disabled={status === "loading"}
              style={{ 
                padding: '18px', 
                borderRadius: '16px', 
                fontSize: '1.1rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px',
                width: '100%',
                opacity: status === "loading" ? 0.7 : 1,
                cursor: status === "loading" ? 'not-allowed' : 'pointer'
              }}
            >
              {status === "loading" ? (
                "Gönderiliyor..."
              ) : (
                <>
                  <Send size={20} /> 
                  {t("contact.submit") || "Mesaj Gönder"}
                </>
              )}
            </button>

            {status === "success" && <p style={{ color: '#10b981', textAlign: 'center', fontWeight: '600' }}>{t("contact.success")}</p>}
            {status === "error" && <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: '600' }}>{t("contact.error")}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
