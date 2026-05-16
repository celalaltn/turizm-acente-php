"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Target, Award, Users, Map, Heart } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{ 
        height: '400px', 
        backgroundImage: 'linear-gradient(rgba(31, 33, 84, 0.7), rgba(31, 33, 84, 0.7)), url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '15px' }}>{t("nav.about")}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
            Dünyayı keşfetme tutkunuzu profesyonel tecrübemizle birleştiriyoruz.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container" style={{ padding: '100px 25px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--primary-color)', fontWeight: '800', letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>
              Hikayemiz
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--secondary-dark)', marginBottom: '25px', lineHeight: '1.2' }}>
              ASR Holiday & Travholtour <br/> <span style={{ color: 'var(--primary-color)' }}>Turizm Acentası</span>
            </h2>
            <div style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.8' }}>
              <p>
                Antalya merkezli Travholtour Turizm Agency (Organization A-14794), seyahat tutkunlarına unutulmaz deneyimler yaşatmak amacıyla kurulmuştur. Yılların verdiği tecrübe ve bölgeye olan hakimiyetimizle, her bir misafirimizin tatil hayallerini gerçeğe dönüştürüyoruz.
              </p>
              <br/>
              <p>
                Sadece bir turizm acentası değil, aynı zamanda seyahat rehberiniziz. Kapadokya'nın büyülü atmosferinden Antalya'nın masmavi sularına kadar her noktada sizinle birlikteyiz.
              </p>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
             <img 
               src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop" 
               alt="About Us" 
               style={{ width: '100%', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
             />
             <div style={{ 
               position: 'absolute', 
               bottom: '-30px', 
               right: '-30px', 
               background: 'var(--primary-gradient)', 
               padding: '30px', 
               borderRadius: '24px', 
               color: 'white',
               boxShadow: '0 10px 30px rgba(229, 102, 64, 0.3)',
               textAlign: 'center',
               display: 'none' // Hidden on smaller screens via responsive logic normally
             }}>
               <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>15+</div>
               <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Yıllık Deneyim</div>
             </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ background: '#f8fafc', padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title">Temel Değerlerimiz</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Müşterilerimize sunduğumuz hizmetin kalitesini bu ilkeler üzerine inşa ediyoruz.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <ValueCard 
              icon={<ShieldCheck size={32} />} 
              title="Güvenilirlik" 
              desc="Tüm süreçlerimizde şeffaflık ve dürüstlükle hareket eder, misafirlerimizin güvenini her şeyin üzerinde tutarız."
            />
            <ValueCard 
              icon={<Target size={32} />} 
              title="Kalite Odaklılık" 
              desc="Konaklamadan transfere kadar her ayrıntıda en yüksek standartları hedefliyoruz."
            />
            <ValueCard 
              icon={<Award size={32} />} 
              title="Uzmanlık" 
              desc="Bölgeye hakim, profesyonel rehberlerimiz ve ekibimizle size gerçek bir keşif deneyimi sunuyoruz."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container" style={{ padding: '100px 25px', textAlign: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px' }}>
           <StatItem icon={<Users />} count="10k+" label="Mutlu Misafir" />
           <StatItem icon={<Map />} count="500+" label="Tur Rotası" />
           <StatItem icon={<Heart />} count="100%" label="Müşteri Memnuniyeti" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div style={{ 
      background: 'white', 
      padding: '40px', 
      borderRadius: '30px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)', 
      border: '1px solid #f1f5f9',
      transition: '0.3s'
    }}
    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>{icon}</div>
      <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '15px', color: 'var(--secondary-dark)' }}>{title}</h3>
      <p style={{ color: '#64748b', lineHeight: '1.6' }}>{desc}</p>
    </div>
  );
}

function StatItem({ icon, count, label }: { icon: React.ReactNode, count: string, label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
      <div style={{ color: 'var(--primary-color)' }}>
        {React.cloneElement(icon as React.ReactElement, { size: 40 })}
      </div>
      <div>
        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--secondary-dark)' }}>{count}</div>
        <div style={{ color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>{label}</div>
      </div>
    </div>
  );
}
