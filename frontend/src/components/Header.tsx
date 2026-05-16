"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/logo.png" 
                alt="Asr Holiday Logo" 
                style={{ height: '55px', width: 'auto', objectFit: 'contain' }} 
              />
            </div>
          </Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link href="/">{t("nav.home")}</Link></li>
            <li><Link href="/turlar">{t("nav.tours")}</Link></li>
            <li><Link href="/hakkimizda">{t("nav.about")}</Link></li>
            <li><Link href="/iletisim">{t("nav.contact")}</Link></li>
          </ul>
        </nav>
        
        {/* Flag Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lang-dropdown-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'var(--transition)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
            }}
          >
            <img 
              src={getFlagUrl(lang)} 
              alt={lang} 
              style={{ width: '24px', height: '18px', objectFit: 'cover', borderRadius: '3px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} 
            />
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--secondary-dark)', textTransform: 'uppercase' }}>{lang}</span>
            <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s', color: '#64748b' }} />
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
              minWidth: '180px',
              padding: '8px',
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
                      gap: '12px',
                      padding: '10px 14px',
                      background: lang === code ? 'rgba(229, 102, 64, 0.08)' : 'transparent',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.95rem',
                      color: lang === code ? 'var(--primary-color)' : 'var(--text-color)',
                      fontWeight: lang === code ? '700' : '500',
                      transition: '0.2s'
                    }}
                    className="lang-item"
                  >
                    <img 
                      src={getFlagUrl(code)} 
                      alt={l.name} 
                      style={{ width: '24px', height: '18px', objectFit: 'cover', borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} 
                    />
                    <span>{l.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
