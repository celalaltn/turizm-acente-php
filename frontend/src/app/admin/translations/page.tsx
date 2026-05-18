"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { Save, Search } from "lucide-react";

const APP_KEYS = [
  "nav.home", "nav.about", "nav.contact", 
  "hero.title", "hero.subtitle", 
  "search.start", "search.end", "search.button", 
  "tours.title", "tours.detail", 
  "reviews.title", 
  "contact.title", "contact.name", "contact.email", "contact.phone", "contact.note", "contact.submit", 
  "contact.success", "contact.error", 
  "footer.text",
  "home.about.title", "home.about.desc",
  "legal.kvkk.title", "legal.kvkk.text",
  "legal.cookies.title", "legal.cookies.text",
  "cookies.banner.text", "cookies.banner.accept"
];

const FLAGS: Record<string, string> = {
  TR: "🇹🇷",
  EN: "🇺🇸",
  RU: "🇷🇺",
  DE: "🇩🇪",
  AR: "🇦🇪",
  ES: "🇪🇸"
};

const LANGUAGES = ["TR", "EN", "RU", "DE", "AR", "ES"];

const DEFAULT_TRANSLATIONS: Record<string, Record<string, string>> = {
  TR: {
    "nav.home": "Anasayfa",
    "nav.about": "Hakkımızda",
    "nav.contact": "İletişim",
    "hero.title": "Hayalinizdeki Tatile Çıkın",
    "hero.subtitle": "En uygun fiyatlarla en güzel turları keşfedin",
    "search.start": "Başlangıç Tarihi",
    "search.end": "Bitiş Tarihi",
    "search.button": "Tur Ara",
    "tours.title": "Popüler Turlarımız",
    "tours.detail": "Detaylı İncele",
    "reviews.title": "Müşteri Yorumları",
    "contact.title": "Bize Ulaşın",
    "contact.name": "Ad Soyad",
    "contact.email": "E-Posta",
    "contact.phone": "Telefon",
    "contact.note": "Not",
    "contact.submit": "Gönder",
    "contact.success": "Mesajınız başarıyla gönderildi!",
    "contact.error": "Mesaj gönderilirken bir hata oluştu.",
    "footer.text": "© 2026 Asr Holiday. Tüm hakları saklıdır.",
    "home.about.title": "Türkiye'nin Tatil Başkenti Antalya'da Unutulmaz Bir Deneyim",
    "home.about.desc": "Türkiye'nin en sevilen tatil rotası Antalya'da, denizin, güneşin ve konforlu otellerin tadını Asr Holiday ile çıkarın. Travholtour Tourism Agency olarak, bölgedeki derin tecrübemizle size en kaliteli konaklama ve tur seçeneklerini sunuyoruz. İster lüks bir otel tatili, ister masmavi bir deniz turu arıyor olun; Antalya'nın her köşesinde hayalinizdeki tatili profesyonel ekibimizle planlıyoruz.",
    "legal.kvkk.title": "KVKK Aydınlatma Metni",
    "legal.kvkk.text": "Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca Asr Holiday tarafından veri sorumlusu sıfatıyla işlenmektedir. Verileriniz, sizlere daha iyi hizmet sunabilmek ve yasal yükümlülüklerimizi yerine getirmek amacıyla kullanılır.",
    "legal.cookies.title": "Çerez Politikası",
    "legal.cookies.text": "Sitemizde sizlere daha iyi bir deneyim sunabilmek adına çerezler kullanılmaktadır. Çerezler, web sitemizi ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır.",
    "cookies.banner.text": "Size daha iyi bir deneyim sunabilmek için çerezleri kullanıyoruz.",
    "cookies.banner.accept": "Kabul Et"
  },
  EN: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "hero.title": "Go on Your Dream Vacation",
    "hero.subtitle": "Discover the most beautiful tours with the best prices",
    "search.start": "Start Date",
    "search.end": "End Date",
    "search.button": "Search Tours",
    "tours.title": "Our Popular Tours",
    "tours.detail": "View Details",
    "reviews.title": "Customer Reviews",
    "contact.title": "Contact Us",
    "contact.name": "Full Name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.note": "Note",
    "contact.submit": "Send",
    "contact.success": "Your message has been sent successfully!",
    "contact.error": "An error occurred while sending your message.",
    "footer.text": "© 2026 Asr Holiday. All rights reserved.",
    "home.about.title": "An Unforgettable Experience in Antalya, Turkey's Holiday Capital",
    "home.about.desc": "Enjoy the sea, sun, and comfortable hotels in Antalya, Turkey's most popular holiday destination, with Asr Holiday. As Travholtour Tourism Agency, we offer you the highest quality accommodation and tour options with our deep experience in the region. Whether you are looking for a luxury hotel holiday or a deep blue sea tour; we plan your dream holiday in every corner of Antalya with our professional team.",
    "legal.kvkk.title": "KVKK Clarification Text",
    "legal.kvkk.text": "Your personal data is processed by Asr Holiday as the data controller in accordance with the Law on the Protection of Personal Data No. 6698 (KVKK). Your data is used to provide you with better service and to fulfill our legal obligations.",
    "legal.cookies.title": "Cookie Policy",
    "legal.cookies.text": "Cookies are used on our site to provide you with a better experience. Cookies are small text files that are saved on your device when you visit our website.",
    "cookies.banner.text": "We use cookies to provide you with a better experience.",
    "cookies.banner.accept": "Accept"
  },
  RU: {
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "hero.title": "Отправьтесь в отпуск своей мечты",
    "hero.subtitle": "Откройте для себя самые красивые туры по лучшим ценам",
    "search.start": "Дата начала",
    "search.end": "Дата окончания",
    "search.button": "Найти туры",
    "tours.title": "Наши популярные туры",
    "tours.detail": "Подробнее",
    "reviews.title": "Отзывы клиентов",
    "contact.title": "Свяжитесь с нами",
    "contact.name": "Полное имя",
    "contact.email": "Эл. почта",
    "contact.phone": "Телефон",
    "contact.note": "Заметка",
    "contact.submit": "Отправить",
    "contact.success": "Ваше сообщение успешно отправлено!",
    "contact.error": "При отправке сообщения произошла ошибка.",
    "footer.text": "© 2026 Asr Holiday. Все права защищены.",
    "home.about.title": "Незабываемые впечатления в Анталье, туристической столице Турции",
    "home.about.desc": "Наслаждайтесь морем, солнцем и комфортабельными отелями в Анталье, самом популярном месте отдыха в Турции, вместе с Asr Holiday. Как туристическое агентство Travholtour, мы предлагаем вам высококачественные варианты проживания и туров благодаря нашему глубокому опыту в этом регионе. Ищете ли вы роскошный отдых в отеле или тур по лазурному морю; мы спланируем отдых вашей мечты в каждом уголке Антальи вместе с нашей профессиональной командой.",
    "legal.kvkk.title": "Политика конфиденциальности (KVKK)",
    "legal.kvkk.text": "Ваши персональные данные обрабатываются Asr Holiday в качестве контроллера данных в соответствии с Законом о защите персональных данных № 6698 (KVKK).",
    "legal.cookies.title": "Политика использования файлов cookie",
    "legal.cookies.text": "Файлы cookie используются на нашем сайте, чтобы предоставить вам лучший опыт.",
    "cookies.banner.text": "Мы используем файлы cookie, чтобы предоставить вам лучший опыт.",
    "cookies.banner.accept": "Принять"
  },
  DE: {
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.contact": "Kontakt",
    "hero.title": "Machen Sie Ihren Traumurlaub",
    "hero.subtitle": "Entdecken Sie die schönsten Touren zu den besten Preisen",
    "search.start": "Startdatum",
    "search.end": "Enddatum",
    "search.button": "Touren Suchen",
    "tours.title": "Unsere beliebten Touren",
    "tours.detail": "Details anzeigen",
    "reviews.title": "Kundenbewertungen",
    "contact.title": "Kontaktiere uns",
    "contact.name": "Vollständiger Name",
    "contact.email": "E-Mail",
    "contact.phone": "Telefon",
    "contact.note": "Notiz",
    "contact.submit": "Senden",
    "contact.success": "Ihre Nachricht wurde erfolgreich gesendet!",
    "contact.error": "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten.",
    "footer.text": "© 2026 Asr Holiday. Alle Rechte vorbehalten.",
    "home.about.title": "Ein unvergessliches Erlebnis in Antalya, der Urlaubshauptstadt der Türkei",
    "home.about.desc": "Genießen Sie Meer, Sonne und komfortable Hotels in Antalya, dem beliebtesten Urlaubsziel der Türkei, mit Asr Holiday. Als Travholtour Tourism Agency bieten wir Ihnen mit unserer langjährigen Erfahrung in der Region hochwertigste Unterkunfts- und Touroptionen. Ob luxuriöser Hotelurlaub oder tiefblaue Meerestour; Wir planen Ihren Traumurlaub in jedem Winkel von Antalya mit unserem professionellen Team.",
    "legal.kvkk.title": "KVKK-Klarstellungstext",
    "legal.kvkk.text": "Ihre personenbezogenen Daten werden von Asr Holiday als Verantwortlichem gemäß dem Gesetz zum Schutz personenbezogener Daten Nr. 6698 (KVKK) verarbeitet.",
    "legal.cookies.title": "Cookie-Richtlinie",
    "legal.cookies.text": "Cookies werden auf unserer Website verwendet, um Ihnen ein besseres Erlebnis zu bieten.",
    "cookies.banner.text": "Wir verwenden Cookies, um Ihnen ein besseres Erlebnis zu bieten.",
    "cookies.banner.accept": "Akzeptieren"
  },
  AR: {
    "nav.home": "الرئيسية",
    "nav.about": "معلومات عنا",
    "nav.contact": "اتصل بنا",
    "hero.title": "اذهب في إجازة أحلامك",
    "hero.subtitle": "اكتشف أجمل الجولات بأفضل الأسعار",
    "search.start": "تاريخ البدء",
    "search.end": "تاريخ الانتهاء",
    "search.button": "ابحث عن الجولات",
    "tours.title": "جولاتنا الشعبية",
    "tours.detail": "عرض التفاصيل",
    "reviews.title": "آراء العملاء",
    "contact.title": "اتصل بنا",
    "contact.name": "الاسم الكامل",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "هاتف",
    "contact.note": "ملاحظة",
    "contact.submit": "إرسال",
    "contact.success": "تم إرسال رسالتك بنجاح!",
    "contact.error": "حدث خطأ أثناء إرسال رسالتك.",
    "footer.text": "© 2026 Asr Holiday. كل الحقوق محفوظة.",
    "home.about.title": "تجربة لا تنسى في أنطاليا، عاصمة العطلات في تركيا",
    "home.about.desc": "استمتع بالبحر والشمس والفنادق المريحة في أنطاليا، الوجهة الأكثر شعبية لقضاء العطلات في تركيا، مع Asr Holiday. بصفتنا وكالة Travholtour للسياحة، نقدم لك أعلى مستويات الجودة في خيارات الإقامة والجولات بفضل خبرتنا العميقة في المنطقة. سواء كنت تبحث عن عطلة فندقية فاخرة أو جولة بحرية في البحر الأزرق العميق؛ نحن نخطط لعطلة أحلامك في كل ركن من أركان أنطاليا مع فريقنا المحترف.",
    "legal.kvkk.title": "نص توضيح KVKK",
    "legal.kvkk.text": "يتم معالجة بياناتك الشخصية بواسطة Asr Holiday بصفتها مراقب البيانات وفقًا لقانون حماية البيانات الشخصية رقم 6698 (KVKK).",
    "legal.cookies.title": "سياسة ملفات الارتباط",
    "legal.cookies.text": "تُستخدم ملفات تعريف الارتباط على موقعنا لنقدم لك تجربة أفضل.",
    "cookies.banner.text": "نحن نستخدم ملفات تعريف الارتباط لنقدم لك تجربة أفضل.",
    "cookies.banner.accept": "قبول"
  },
  ES: {
    "nav.home": "Inicio",
    "nav.about": "Sobre nosotros",
    "nav.contact": "Contacto",
    "hero.title": "Vaya a sus vacaciones de ensueño",
    "hero.subtitle": "Descubra los tours más hermosos a los mejores precios",
    "search.start": "Fecha de inicio",
    "search.end": "Fecha de finalización",
    "search.button": "Buscar Tours",
    "tours.title": "Nuestros Tours Populares",
    "tours.detail": "Ver detalles",
    "reviews.title": "Reseñas de clientes",
    "contact.title": "Contáctenos",
    "contact.name": "Nombre completo",
    "contact.email": "Correo electrónico",
    "contact.phone": "Teléfono",
    "contact.note": "Nota",
    "contact.submit": "Enviar",
    "contact.success": "¡Su message ha sido enviado con éxito!",
    "contact.error": "Ocurrió un error al enviar su mensaje.",
    "footer.text": "© 2026 Asr Holiday. Todos los derechos reservados.",
    "home.about.title": "Una experiencia inolvidable en Antalya, la capital de las vacaciones en Turquía",
    "home.about.desc": "Disfruta del mar, el sol y hoteles confortables en Antalya, el destino vacacional más popular de Turquía, con Asr Holiday. Como Travholtour Tourism Agency, le ofrecemos opciones de alojamiento y tours de la más alta calidad con nuestra profunda experiencia en la región. Ya sea que esté buscando unas vacaciones en un hotel de lujo o un tour por el mar azul profundo; planificamos sus vacaciones de ensueño en cada rincón de Antalya con nuestro equipo profesional.",
    "legal.kvkk.title": "Texto de Aclaración de KVKK",
    "legal.kvkk.text": "Sus datos personales son procesados por Asr Holiday como responsable del tratamiento de conformidad con la Ley de Protección de Datos Personales N° 6698 (KVKK).",
    "legal.cookies.title": "Política de Cookies",
    "legal.cookies.text": "Las cookies se utilizan en nuestro sitio para brindarle una mejor experiencia.",
    "cookies.banner.text": "Utilizamos cookies para brindarle una mejor experiencia.",
    "cookies.banner.accept": "Aceptar"
  }
};

export default function TranslationsAdmin() {
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadAllTranslations();
  }, []);

  const loadAllTranslations = async () => {
    try {
      const res = await fetchApi("/translations.php"); // Fetch all at once
      if (res.status === "success") {
        const dbData = res.data || {};
        const merged: Record<string, Record<string, string>> = {};
        
        LANGUAGES.forEach(lang => {
          merged[lang] = {
            ...(DEFAULT_TRANSLATIONS[lang] || {}),
            ...(dbData[lang] || {})
          };
        });
        
        setTranslations(merged);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateValue = (lang: string, key: string, value: string) => {
    setTranslations(prev => ({
      ...prev,
      [lang]: {
        ...(prev[lang] || {}),
        [key]: value
      }
    }));
  };

  const handleSaveAll = async () => {
    try {
      const promises = LANGUAGES.map(lang => {
        return fetchApi("/translations.php", {
          method: "POST",
          body: JSON.stringify({
            lang_code: lang,
            translations: translations[lang] || {}
          })
        });
      });
      await Promise.all(promises);
      alert("Tüm dillerdeki çeviriler başarıyla kaydedildi!");
    } catch (e) {
      alert("Kayıt sırasında bir hata oluştu.");
    }
  };

  const handleSaveKey = async (key: string) => {
    try {
      const promises = LANGUAGES.map(lang => {
        return fetchApi("/translations.php", {
          method: "POST",
          body: JSON.stringify({
            lang_code: lang,
            translations: { [key]: translations[lang]?.[key] || "" }
          })
        });
      });
      await Promise.all(promises);
      alert(`"${key}" tüm dillerde kaydedildi!`);
    } catch (e) {
      alert("Kayıt sırasında hata oluştu.");
    }
  };

  const filteredKeys = APP_KEYS.filter(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="responsive-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>Metin Çevirileri</h1>
          <p style={{ color: '#94a3b8' }}>Tüm sistem metinlerini diller bazında manuel olarak buradan yönetebilirsiniz.</p>
        </div>
        <button 
          onClick={handleSaveAll}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '15px 30px', 
            background: 'var(--primary-gradient)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '15px', 
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)'
          }}
        >
          <Save size={20} />
          Hepsini Kaydet
        </button>
      </div>

      <div style={{ 
        position: 'relative', 
        marginBottom: '30px',
        maxWidth: '400px'
      }}>
        <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        <input 
          type="text" 
          placeholder="Anahtar ara (Örn: hero.title)..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '15px 15px 15px 50px', 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '15px', 
            color: 'white',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {filteredKeys.map(key => {
          const isLongText = key.endsWith(".desc") || key.endsWith(".text") || key.includes(".desc") || key.includes(".text");
          return (
            <div key={key} style={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: '20px', 
              overflow: 'hidden' 
            }}>
              <div style={{ 
                padding: '20px 25px', 
                background: 'rgba(255,255,255,0.03)', 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <code style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '1rem' }}>{key}</code>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Sistem Anahtarı</span>
                </div>
                <button 
                  onClick={() => handleSaveKey(key)}
                  style={{ 
                    padding: '8px 15px', 
                    background: 'rgba(59, 130, 246, 0.1)', 
                    border: '1px solid rgba(59, 130, 246, 0.2)', 
                    borderRadius: '10px', 
                    color: '#3b82f6', 
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Save size={14} /> Kaydet
                </button>
              </div>
              
              <div style={{ padding: '25px' }}>
                {/* TR (Reference) */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: '#94a3b8' }}>
                    <span>{FLAGS.TR}</span> Türkçe (Referans)
                  </label>
                  {isLongText ? (
                    <textarea 
                      value={translations.TR?.[key] || ""}
                      onChange={e => updateValue("TR", key, e.target.value)}
                      rows={5}
                      style={{ 
                        width: '100%', 
                        padding: '15px', 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid #3b82f640', 
                        borderRadius: '12px', 
                        color: 'white',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        lineHeight: '1.5',
                        resize: 'vertical'
                      }}
                    />
                  ) : (
                    <input 
                      type="text" 
                      value={translations.TR?.[key] || ""}
                      onChange={e => updateValue("TR", key, e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '15px', 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid #3b82f640', 
                        borderRadius: '12px', 
                        color: 'white',
                        fontSize: '1rem'
                      }}
                    />
                  )}
                </div>

                {/* Other Languages Grid */}
                <div className="responsive-translations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  {LANGUAGES.filter(l => l !== "TR").map(lang => (
                    <div key={lang}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', color: '#64748b' }}>
                        <span>{FLAGS[lang]}</span> {lang} Çevirisi
                      </label>
                      {isLongText ? (
                        <textarea 
                          value={translations[lang]?.[key] || ""}
                          onChange={e => updateValue(lang, key, e.target.value)}
                          placeholder={`${lang} karşılığını girin...`}
                          rows={4}
                          style={{ 
                            width: '100%', 
                            padding: '12px', 
                            background: 'rgba(255,255,255,0.02)', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            borderRadius: '10px', 
                            color: 'white',
                            fontSize: '0.95rem',
                            fontFamily: 'inherit',
                            lineHeight: '1.5',
                            direction: lang === 'AR' ? 'rtl' : 'ltr',
                            resize: 'vertical'
                          }}
                        />
                      ) : (
                        <input 
                          type="text" 
                          value={translations[lang]?.[key] || ""}
                          onChange={e => updateValue(lang, key, e.target.value)}
                          placeholder={`${lang} karşılığını girin...`}
                          style={{ 
                            width: '100%', 
                            padding: '12px', 
                            background: 'rgba(255,255,255,0.02)', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            borderRadius: '10px', 
                            color: 'white',
                            fontSize: '0.95rem',
                            direction: lang === 'AR' ? 'rtl' : 'ltr'
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
            margin-bottom: 25px !important;
          }
          .responsive-header button {
            width: 100% !important;
            justify-content: center !important;
          }
          .responsive-translations-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          /* Adjust row header padding */
          div[style*="padding: '20px 25px'"] {
            padding: 15px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          div[style*="padding: '25px'"] {
            padding: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
