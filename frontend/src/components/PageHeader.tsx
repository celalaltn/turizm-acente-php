"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  image?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function PageHeader({ 
  title, 
  image = "https://images.unsplash.com/photo-1519451241324-20b4ec2c4558?q=80&w=2000&auto=format&fit=crop",
  breadcrumb = []
}: PageHeaderProps) {
  return (
    <section 
      style={{ 
        position: 'relative', 
        padding: 'var(--section-padding-large, 120px 0 80px)', 
        backgroundImage: `linear-gradient(rgba(31, 33, 84, 0.7), rgba(31, 33, 84, 0.8)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <div className="container">
        <h1 style={{ fontSize: 'var(--hero-title-size, 3.5rem)', fontWeight: '900', marginBottom: '20px', letterSpacing: '-1px' }}>
          {title}
        </h1>
        
        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: '600' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Anasayfa</Link>
          <ChevronRight size={16} style={{ opacity: 0.5 }} />
          {breadcrumb.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.href ? (
                <Link href={item.href} style={{ color: 'rgba(255,255,255,0.7)', transition: '0.3s' }}>{item.label}</Link>
              ) : (
                <span style={{ color: 'var(--primary-color)' }}>{item.label}</span>
              )}
              {idx < breadcrumb.length - 1 && <ChevronRight size={16} style={{ opacity: 0.5 }} />}
            </React.Fragment>
          ))}
          {breadcrumb.length === 0 && <span style={{ color: 'var(--primary-color)' }}>{title}</span>}
        </nav>
      </div>
    </section>
  );
}
