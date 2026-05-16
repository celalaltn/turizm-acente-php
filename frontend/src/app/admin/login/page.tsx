"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetchApi("/login.php", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      if (res.status === "success") {
        localStorage.setItem("admin_token", res.token);
        router.push("/admin");
      } else {
        setError(res.message || "Giriş başarısız.");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#020617',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>

      <div style={{ 
        width: '100%', 
        maxWidth: '450px', 
        padding: '20px', 
        position: 'relative', 
        zIndex: 10 
      }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.02)', 
          backdropFilter: 'blur(20px)', 
          border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '30px', 
          padding: '50px 40px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              background: 'white', 
              borderRadius: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              padding: '10px'
            }}>
              <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '5px', color: 'white' }}>ASR HOLIDAY</h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', letterSpacing: '1px' }}>TRAVHOLTOUR TOURISM AGENCY</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>E-Posta Adresi</label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@asrholiday.com"
                  style={{ 
                    width: '100%', 
                    padding: '15px 15px 15px 50px', 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '15px', 
                    color: 'white',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }} 
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>Şifre</label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ 
                    width: '100%', 
                    padding: '15px 15px 15px 50px', 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '15px', 
                    color: 'white',
                    outline: 'none'
                  }} 
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {error && (
              <div style={{ 
                padding: '12px', 
                background: 'rgba(239,68,68,0.1)', 
                border: '1px solid rgba(239,68,68,0.2)', 
                borderRadius: '12px', 
                color: '#ef4444', 
                fontSize: '0.9rem', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '16px', 
                background: 'var(--primary-gradient)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '15px', 
                fontWeight: '700', 
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 10px 20px rgba(37,99,235,0.2)',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Giriş Yapılıyor..." : (
                <>Giriş Yap <ArrowRight size={20} /></>
              )}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ color: '#475569', fontSize: '0.85rem' }}>
            &copy; 2026 Asr Holiday Tourism. Tüm Hakları Saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
