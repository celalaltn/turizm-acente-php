import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Camera, Globe, Share2, ShieldCheck, FileText, Cookie } from "lucide-react";
import LegalModal from "./LegalModal";

export default function Footer() {
  const { t } = useLanguage();
  const [modalData, setModalData] = useState<{ open: boolean; title: string; content: string }>({
    open: false,
    title: "",
    content: ""
  });

  const openModal = (key: 'kvkk' | 'cookies') => {
    setModalData({
      open: true,
      title: t(`legal.${key}.title`),
      content: t(`legal.${key}.text`)
    });
  };

  return (
    <footer style={{ background: 'var(--secondary-dark)', color: 'white', paddingTop: '80px', paddingBottom: '30px' }}>
      <LegalModal 
        isOpen={modalData.open} 
        onClose={() => setModalData({ ...modalData, open: false })} 
        title={modalData.title} 
        content={modalData.content} 
      />
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', marginBottom: '60px' }}>
          
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
              <img src="/logo.png" alt="Logo" style={{ height: '60px', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '25px', fontSize: '0.95rem' }}>
              Hayalinizdeki tatili gerçeğe dönüştürmek için profesyonel çözümler sunuyoruz. Travholtour Tourism Agency güvencesiyle dünyayı keşfedin.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="https://www.instagram.com/asrholiday.turizm?igsh=MWs0eXRnajUwa3VubQ%3D%3D" target="_blank" className="social-icon">
                <Camera size={20} />
              </a>
              <a href="#" className="social-icon"><Globe size={20} /></a>
              <a href="#" className="social-icon"><Share2 size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '25px', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '5px' }}>
              Kurumsal
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: 0 }}>
              <li><Link href="/hakkimizda" style={{ color: 'rgba(255,255,255,0.7)', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'white'}>Hakkımızda</Link></li>
              <li><Link href="/turlar" style={{ color: 'rgba(255,255,255,0.7)' }}>Turlarımız</Link></li>
              <li><Link href="/iletisim" style={{ color: 'rgba(255,255,255,0.7)' }}>İletişim</Link></li>
              <li><span onClick={() => openModal('kvkk')} style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}><ShieldCheck size={16} /> KVKK</span></li>
              <li><span onClick={() => openModal('kvkk')} style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}><FileText size={16} /> Gizlilik Sözleşmesi</span></li>
              <li><span onClick={() => openModal('cookies')} style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}><Cookie size={16} /> Çerez Politikası</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '25px', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '5px' }}>
              İletişim
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <MapPin size={24} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                  Güzeloba Mah. Havaalanı Cad. Batu Can İş Merkezi No:67/103 Muratpaşa/Antalya
                </span>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Phone size={20} style={{ color: 'var(--primary-color)' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a href="tel:+905514350045" style={{ color: 'white', fontSize: '0.95rem' }}>+90 551 435 00 45</a>
                  <a href="tel:+902422555464" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>+90 (242) 255-5464</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Mail size={20} style={{ color: 'var(--primary-color)' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a href="mailto:info@asrtour.com" style={{ color: 'white', fontSize: '0.95rem' }}>info@asrtour.com</a>
                  <a href="mailto:info@trholidays.com" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>info@trholidays.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            &copy; 2026 Asr Holiday Tourism. Tüm Hakları Saklıdır.
          </p>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            Powered by <span style={{ color: 'white', fontWeight: '700' }}>817 Creative Agency</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-icon {
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.08);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: white;
          text-decoration: none;
        }
        .social-icon:hover {
          background: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(229, 102, 64, 0.2);
        }
      `}</style>
    </footer>
  );
}
