"use client";

import React from "react";
import { MessageCircle, Camera } from "lucide-react";

export default function FloatingActions() {
  const wpNumber = "905514350045";
  const instaUrl = "https://www.instagram.com/asrholiday.turizm?igsh=MWs0eXRnajUwa3VubQ%3D%3D";

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '30px', 
      right: '30px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '15px', 
      zIndex: 9999 
    }}>
      {/* Instagram Button */}
      <a 
        href={instaUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 10px 25px rgba(220, 39, 67, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
      >
        <Camera size={30} />
      </a>

      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${wpNumber}`} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          width: '60px',
          height: '60px',
          background: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
      >
        <MessageCircle size={35} fill="white" />
      </a>
    </div>
  );
}
