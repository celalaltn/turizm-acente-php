"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, Menu, X } from "lucide-react";

const FLAGS: Record<string, string> = {
  tr: "tr",
  en: "us",
  ru: "ru",
  de: "de",
  ar: "ae",
  es: "es"
};

const getFlagUrl = (code: string) => `https://flagcdn.com/w40/${FLAGS[code] || code}.png`;

export default function Header() {
  const { t, lang, setLang, activeLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header" style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: '15px 0' }}>
      <div className="container header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/logo.png" 
                alt="Asr Holiday Logo" 
                style={{ height: 'var(--logo-height, 45px)', width: 'auto', objectFit: 'contain' }} 
              />
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <ul className="nav-links" style={{ display: 'flex', gap: '2.5rem', fontWeight: '600', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><Link href="/" style={{ color: 'var(--secondary-dark)' }}>{t("nav.home")}</Link></li>
            <li><Link href="/turlar" style={{ color: 'var(--secondary-dark)' }}>{t("nav.tours")}</Link></li>
            <li><Link href="/hakkimizda" style={{ color: 'var(--secondary-dark)' }}>{t("nav.about")}</Link></li>
            <li><Link href="/iletisim" style={{ color: 'var(--secondary-dark)' }}>{t("nav.contact")}</Link></li>
          </ul>
        </nav>
        
        {/* Right side controls: Language selector and Mobile Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Flag Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lang-dropdown-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'var(--transition)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
              }}
            >
              <img 
                src={getFlagUrl(lang)} 
                alt={lang} 
                style={{ width: '20px', height: '15px', objectFit: 'cover', borderRadius: '2px' }} 
              />
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--secondary-dark)', textTransform: 'uppercase' }}>{lang}</span>
              <ChevronDown size={12} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s', color: '#64748b' }} />
            </button>

            {isOpen && (
              <div className="lang-dropdown-menu" style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                background: 'white',
                borderRadius: '18px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                border: '1px solid #f1f5f9',
                minWidth: '160px',
                padding: '6px',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                animation: 'dropdownFadeIn 0.2s ease-out'
              }}>
                {activeLanguages.map(l => {
                  const code = l.code.toLowerCase();
                  return (
                    <button 
                      key={code}
                      onClick={() => {
                        setLang(code as any);
                        setIsOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 12px',
                        background: lang === code ? 'rgba(229, 102, 64, 0.08)' : 'transparent',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.9rem',
                        color: lang === code ? 'var(--primary-color)' : 'var(--text-color)',
                        fontWeight: lang === code ? '700' : '500',
                        transition: '0.2s',
                        width: '100%'
                      }}
                      className="lang-item"
                    >
                      <img 
                        src={getFlagUrl(code)} 
                        alt={l.name} 
                        style={{ width: '20px', height: '15px', objectFit: 'cover', borderRadius: '2px' }} 
                      />
                      <span>{l.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--secondary-dark)',
              padding: '8px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10002
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Immersive Full Screen Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-nav-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #1F2154 0%, #0f172a 100%)',
            zIndex: 10001,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
            animation: 'dropdownFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {/* Branded Header Inside Overlay */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '25px',
              right: '25px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 'calc(100% - 50px)'
            }}>
              <img 
                src="/logo.png" 
                alt="Asr Holiday Logo" 
                style={{ height: 'var(--logo-height, 35px)', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} 
              />
              {/* Spacer so Close Icon lines up cleanly */}
              <div style={{ width: '40px' }} />
            </div>

            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '25px',
              textAlign: 'center',
              width: '100%',
              maxWidth: '300px'
            }}>
              <li>
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    display: 'block', 
                    padding: '16px 20px', 
                    borderRadius: '16px', 
                    background: 'rgba(255,255,255,0.05)', 
                    fontWeight: '800', 
                    color: 'white',
                    fontSize: '1.4rem',
                    letterSpacing: '1px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s'
                  }}
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/turlar" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    display: 'block', 
                    padding: '16px 20px', 
                    borderRadius: '16px', 
                    background: 'rgba(255,255,255,0.05)', 
                    fontWeight: '800', 
                    color: 'white',
                    fontSize: '1.4rem',
                    letterSpacing: '1px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s'
                  }}
                >
                  {t("nav.tours")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/hakkimizda" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    display: 'block', 
                    padding: '16px 20px', 
                    borderRadius: '16px', 
                    background: 'rgba(255,255,255,0.05)', 
                    fontWeight: '800', 
                    color: 'white',
                    fontSize: '1.4rem',
                    letterSpacing: '1px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s'
                  }}
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/iletisim" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    display: 'block', 
                    padding: '16px 20px', 
                    borderRadius: '16px', 
                    background: 'rgba(255,255,255,0.05)', 
                    fontWeight: '800', 
                    color: 'white',
                    fontSize: '1.4rem',
                    letterSpacing: '1px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s'
                  }}
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
        )}

      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
