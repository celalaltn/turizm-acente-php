"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "tr" | "en" | "ru" | "de" | "ar" | "es";

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  translations: Translations;
  setTranslations: (translations: Translations) => void;
  activeLanguages: any[];
  settings: Record<string, string>;
}

const defaultTranslations: Record<Language, Translations> = {
  tr: {
    "nav.home": "Anasayfa",
    "nav.tours": "Turlar",
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
    "home.about.desc": "Türkiye'nin en sevilen tatil rotası Antalya'da, denizin, güneşin ve konforlu otellerin tadını Asr Holiday ile çıkarın. Travholtour Tourism Agency olarak, bölgedeki derin tecrübemizle size en kaliteli konaklama ve tur seçeneklerini sunuyoruz. İster lüks bir otel tatili, ister masmavi bir deniz turu arıyor olun; Antalya'nın her köşesinde hayalinizdeki tatili profesyonel ekibimizle planlıyoruz."
  },
  en: {
    "nav.home": "Home",
    "nav.tours": "Tours",
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
    "home.about.desc": "Enjoy the sea, sun, and comfortable hotels in Antalya, Turkey's most popular holiday destination, with Asr Holiday. As Travholtour Tourism Agency, we offer you the highest quality accommodation and tour options with our deep experience in the region. Whether you are looking for a luxury hotel holiday or a deep blue sea tour; we plan your dream holiday in every corner of Antalya with our professional team."
  },
  ru: {
    "nav.home": "Главная",
    "nav.tours": "Туры",
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
    "home.about.desc": "Наслаждайтесь морем, солнцем и комфортабельными отелями в Анталье, самом популярном месте отдыха в Турции, вместе с Asr Holiday. Как туристическое агентство Travholtour, мы предлагаем вам высококачественные варианты проживания и туров благодаря нашему глубокому опыту в этом регионе. Ищете ли вы роскошный отдых в отеле или тур по лазурному морю; мы спланируем отдых вашей мечты в каждом уголке Антальи вместе с нашей профессиональной командой."
  },
  de: {
    "nav.home": "Startseite",
    "nav.tours": "Touren",
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
    "home.about.desc": "Genießen Sie Meer, Sonne und komfortable Hotels in Antalya, dem beliebtesten Urlaubsziel der Türkei, mit Asr Holiday. Als Travholtour Tourism Agency bieten wir Ihnen mit unserer langjährigen Erfahrung in der Region hochwertigste Unterkunfts- und Touroptionen. Ob luxuriöser Hotelurlaub oder tiefblaue Meerestour; Wir planen Ihren Traumurlaub in jedem Winkel von Antalya mit unserem professionellen Team."
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.tours": "الجولات",
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
    "home.about.desc": "استمتع بالبحر والشمس والفنادق المريحة في أنطاليا، الوجهة الأكثر شعبية لقضاء العطلات في تركيا، مع Asr Holiday. بصفتنا وكالة Travholtour للسياحة، نقدم لك أعلى مستويات الجودة في خيارات الإقامة والجولات بفضل خبرتنا العميقة في المنطقة. سواء كنت تبحث عن عطلة فندقية فاخرة أو جولة بحرية في البحر الأزرق العميق؛ نحن نخطط لعطلة أحلامك في كل ركن من أركان أنطاليا مع فريقنا المحترف."
  },
  es: {
    "nav.home": "Inicio",
    "nav.tours": "Tours",
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
    "contact.success": "¡Su mensaje ha sido enviado con éxito!",
    "contact.error": "Ocurrió un error al enviar su mensaje.",
    "footer.text": "© 2026 Asr Holiday. Todos los derechos reservados.",
    "home.about.title": "Una experiencia inolvidable en Antalya, la capital de las vacaciones en Turquía",
    "home.about.desc": "Disfruta del mar, el sol y hoteles confortables en Antalya, el destino vacacional más popular de Turquía, con Asr Holiday. Como Travholtour Tourism Agency, le ofrecemos opciones de alojamiento y tours de la más alta calidad con nuestra profunda experiencia en la región. Ya sea que esté buscando unas vacaciones en un hotel de lujo o un tour por el mar azul profundo; planificamos sus vacaciones de ensueño en cada rincón de Antalya con nuestro equipo profesional."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>("tr");
  const [translations, setTranslations] = useState<Translations>(defaultTranslations.tr);
  const [activeLanguages, setActiveLanguages] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [langRes, settingsRes] = await Promise.all([
          fetch("http://localhost/turizm-acente-php/backend/api/admin/languages.php"),
          fetch("http://localhost/turizm-acente-php/backend/api/public/settings.php")
        ]);

        const langData = await langRes.json();
        const settingsData = await settingsRes.json();

        if (langData.status === "success") {
          setActiveLanguages(langData.data.filter((l: any) => l.is_active === 1));
        }
        if (settingsData.status === "success") {
          setSettings(settingsData.data);
        }
      } catch (error) {
        console.warn("Could not fetch initial data", error);
        setActiveLanguages([
          { code: 'TR', name: 'Türkçe' },
          { code: 'EN', name: 'English' },
          { code: 'RU', name: 'Русский' },
          { code: 'DE', name: 'Deutsch' },
          { code: 'AR', name: 'العربية' },
          { code: 'ES', name: 'Español' }
        ]);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as Language;
    const langToSet = savedLang && Object.keys(defaultTranslations).includes(savedLang) ? savedLang : "tr";
    setLang(langToSet);
  }, []);

  const setLang = async (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("app_lang", newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";

    try {
      const response = await fetch(`http://localhost/turizm-acente-php/backend/api/public/translations.php?lang=${newLang.toUpperCase()}`);
      const result = await response.json();
      if (result.status === "success" && result.data && Object.keys(result.data).length > 0) {
        setTranslations(result.data);
      } else {
        setTranslations(defaultTranslations[newLang]);
      }
    } catch (error) {
      setTranslations(defaultTranslations[newLang]);
    }
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, t, translations, setTranslations, activeLanguages, settings }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
