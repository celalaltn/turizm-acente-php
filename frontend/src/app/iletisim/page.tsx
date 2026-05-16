"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Clock, MessageCircle, Camera } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <Header />
      
      {/* Page Header - Pure Title */}
      <section style={{ 
        padding: '80px 0', 
        background: 'var(--secondary-dark)', 
        color: 'white', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: 0 }}>Bize Ulaşın</h1>
        </div>
      </section>

      {/* Info Cards - Restored & Stylish */}
      <section className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10, paddingBottom: '80px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px' 
        }}>
          {/* Address Card */}
          <div className="contact-card">
            <div className="icon-wrapper" style={{ color: '#E56640', background: 'rgba(229, 102, 64, 0.1)' }}><MapPin size={30} /></div>
            <h3>Adresimiz</h3>
            <p>Güzeloba Mah. Havaalanı Cad. Batu Can İş Merkezi No:67/103 Muratpaşa/Antalya</p>
          </div>

          {/* Phone Card */}
          <div className="contact-card">
            <div className="icon-wrapper" style={{ color: '#1F2154', background: 'rgba(31, 33, 84, 0.1)' }}><Phone size={30} /></div>
            <h3>Telefon</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <a href="tel:+905514350045" className="contact-link">+90 551 435 00 45</a>
              <a href="tel:+902422555464" className="contact-link" style={{ fontSize: '0.9rem', opacity: 0.7 }}>+90 (242) 255-5464</a>
            </div>
          </div>

          {/* Email Card */}
          <div className="contact-card">
            <div className="icon-wrapper" style={{ color: '#E56640', background: 'rgba(229, 102, 64, 0.1)' }}><Mail size={30} /></div>
            <h3>E-Posta</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <a href="mailto:info@asrtour.com" className="contact-link">info@asrtour.com</a>
              <a href="mailto:info@trholidays.com" className="contact-link" style={{ fontSize: '0.9rem', opacity: 0.7 }}>info@trholidays.com</a>
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="contact-card">
            <div className="icon-wrapper" style={{ color: '#1F2154', background: 'rgba(31, 33, 84, 0.1)' }}><Clock size={30} /></div>
            <h3>Çalışma Saatleri</h3>
            <p>Pazartesi - Cumartesi <br/> <strong>09:00 - 18:00</strong></p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section style={{ background: '#f8fafc', padding: '100px 0' }}>
        <div className="container">
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
              {/* Left Side: Map & Direct Actions */}
              <div>
                 <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--secondary-dark)', marginBottom: '30px' }}>Konumumuz</h2>
                 <div style={{ 
                   width: '100%', 
                   height: '400px', 
                   background: '#e2e8f0', 
                   borderRadius: '30px', 
                   overflow: 'hidden',
                   boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                   marginBottom: '40px'
                 }}>
                   <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.670275824905!2d30.7719001!3d36.8528999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39050d2c67699%3A0x633513a0595b161c!2zR8O8emVsb2JhLCBIYXZhYWxhbsSxIENkLiwgMDcwNzAgTXVyYXRwYcWfYS9BbnRhbHlh!5e0!3m2!1str!2str!4v1715872000000!5m2!1str!2str" 
                     width="100%" 
                     height="100%" 
                     style={{ border: 0 }} 
                     allowFullScreen={true} 
                     loading="lazy"
                   ></iframe>
                 </div>
              </div>

              {/* Right Side: Simplified Form */}
              <div>
                 <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--secondary-dark)', marginBottom: '30px' }}>Mesaj Gönderin</h2>
                 <div style={{ background: 'white', padding: '10px', borderRadius: '35px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <ContactForm showInfoSide={false} />
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .contact-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          text-align: center;
          border: 1px solid #f1f5f9;
          transition: 0.3s;
        }
        .contact-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary-color);
        }
        .icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justifyContent: center;
          margin: 0 auto 25px;
        }
        .contact-card h3 {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 15px;
          color: var(--secondary-dark);
        }
        .contact-card p {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.6;
        }
        .contact-link {
          color: var(--secondary-dark);
          font-weight: 700;
          transition: 0.3s;
          text-decoration: none;
        }
        .contact-link:hover {
          color: var(--primary-color);
          text-decoration: underline;
        }
        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 10px;
          padding: 20px;
          color: white;
          border-radius: 20px;
          font-weight: 700;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transition: 0.3s;
        }
        .action-btn:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
    </div>
  );
}
