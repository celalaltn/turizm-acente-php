"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Languages, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname.startsWith("/admin/login");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On mobile, default to closed, on desktop default to open
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token && !isLoginRoute) {
      router.push("/admin/login");
    }
    setLoading(false);
  }, [isLoginRoute, pathname, router]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Tur Yönetimi", icon: <MapIcon size={20} />, path: "/admin/tours" },
    { name: "Metin Çevirileri", icon: <Languages size={20} />, path: "/admin/translations" },
    { name: "Genel Ayarlar", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  if (loading) return null;

  if (isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#020617',
      fontFamily: "'Inter', sans-serif",
      color: 'white'
    }}>
      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 90
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: isSidebarOpen ? '280px' : (isMobile ? '0px' : '80px'),
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: isMobile && !isSidebarOpen ? 'none' : 'flex',
        flexDirection: 'column',
        position: isMobile ? 'fixed' : 'sticky',
        left: 0,
        top: 0,
        height: '100vh',
        transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        boxShadow: isMobile && isSidebarOpen ? '10px 0 30px rgba(0,0,0,0.5)' : 'none',
        zIndex: 100,
        padding: '30px 15px'
      }}>
        <div style={{ 
          marginBottom: '50px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          padding: '0 10px'
        }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ width: '45px', height: '45px', objectFit: 'contain', background: 'white', borderRadius: '10px', padding: '5px' }} 
          />
          {(isSidebarOpen || isMobile) && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1rem', fontWeight: '900', color: 'white', letterSpacing: '0.5px' }}>ASR HOLIDAY</span>
              <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: '600' }}>ADMIN PANEL</span>
            </div>
          )}
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '12px 15px', 
                  color: pathname === item.path ? 'white' : '#64748b', 
                  textDecoration: 'none',
                  borderRadius: '12px',
                  background: pathname === item.path ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                  transition: 'all 0.3s',
                  border: pathname === item.path ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid transparent',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: pathname === item.path ? '#3b82f6' : 'inherit' }}>{item.icon}</span>
                    {(isSidebarOpen || isMobile) && <span style={{ fontWeight: pathname === item.path ? '600' : '400' }}>{item.name}</span>}
                  </div>
                  {(isSidebarOpen || isMobile) && pathname === item.path && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%',
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              color: '#ef4444', 
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '12px 15px',
              borderRadius: '12px',
              transition: 'all 0.3s'
            }}
          >
            <LogOut size={20} />
            {(isSidebarOpen || isMobile) && <span style={{ fontWeight: '600' }}>Çıkış Yap</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0
      }}>
        {/* Header */}
        <header style={{ 
          height: '80px',
          padding: isMobile ? '0 20px' : '0 40px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(2, 6, 23, 0.8)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'white',
              padding: '10px',
              borderRadius: '10px'
            }}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ textAlign: 'right', display: 'none' }}>
              <div style={{ color: 'white', fontWeight: '600', fontSize: '0.9rem' }}>Admin User</div>
            </div>
            <img 
              src="/logo.png" 
              alt="Admin" 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'white',
                border: '2px solid var(--primary-color)',
                objectFit: 'contain',
                padding: '4px'
              }} 
            />
          </div>
        </header>
        
        {/* Children Container */}
        <div style={{ padding: isMobile ? '20px 15px' : '40px', flex: 1 }}>
          {children}
        </div>
      </main>
    </div>
  );
}
