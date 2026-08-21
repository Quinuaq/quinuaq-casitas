import { Link } from "@tanstack/react-router";
import { WA_URL } from "@/lib/casitas";
import { useEffect, useState } from "react";

const RESTAURANT_URL = import.meta.env.VITE_RESTAURANT_URL ?? (import.meta.env.DEV ? "http://localhost:3000" : "https://www.quinuaq.com");

const NAV_ITEMS = [
  { label: "Casitas", to: "/casitas" },
  { label: "Experiencias", to: "/", hash: "experiencias" },
  { label: "Galería", to: "/", hash: "galeria" },
  { label: "Quinua", to: "/", hash: "quinua" },
];

function Brand({ light }: { light: boolean }) {
  return (
    <Link to="/" className="property-brand property-brand-on-dark" aria-label="QuinuaQ Casitas, inicio">
      <img src="/logo-quinuaq.png" alt="QuinuaQ" />
      <small>CASITAS</small>
    </Link>
  );
}

export function SiteNav({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (variant === "solid") return;
    const handleScroll = () => setScrolled(window.scrollY > 56);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const light = scrolled;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 h-[74px] transition-all duration-500 ${light ? "casitas-header-light" : "casitas-header-overlay"}`}>
        <div className="h-full max-w-[1440px] mx-auto px-5 md:px-10 flex items-center justify-between gap-8">
          <Brand light={light} />

          <nav className="hidden xl:flex items-center gap-7" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to as any}
                hash={item.hash}
                className="casitas-nav-link text-[#FBF8F1]"
              >
                {item.label}
              </Link>
            ))}
            <a className="property-switch property-switch-dark" href={RESTAURANT_URL}>
              Restaurante <span>↗</span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a href={WA_URL} target="_blank" rel="noreferrer" className="casitas-book casitas-book-light">
              Reservar <span>↗</span>
            </a>
            <button onClick={() => setMenuOpen(true)} className="xl:hidden casitas-menu-button text-[#FBF8F1]" aria-label="Abrir menú">
              <i /><i /><i />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Dark Luxury) */}
      <div className={`fixed inset-0 z-[60] bg-[#08140E] transition-all duration-500 xl:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="h-full p-6 md:p-10 flex flex-col justify-between text-[#FBF8F1]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <Brand light={false} />
            <button onClick={() => setMenuOpen(false)} className="w-11 h-11 border border-white/20 text-3xl font-light text-[#FBF8F1] flex items-center justify-center rounded" aria-label="Cerrar menú">×</button>
          </div>

          <nav className="my-auto flex flex-col space-y-1" aria-label="Navegación móvil">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.label}
                to={item.to as any}
                hash={item.hash}
                onClick={() => setMenuOpen(false)}
                className="grid grid-cols-[40px_1fr_auto] items-center py-4 border-b border-white/10 font-serif text-3xl text-[#FBF8F1] hover:text-[#E2B94E] transition-colors"
              >
                <small className="font-sans text-[11px] text-[#E2B94E]">0{index + 1}</small>
                <span>{item.label}</span>
                <span className="text-base text-[#E2B94E]">↗</span>
              </Link>
            ))}
            <a href={RESTAURANT_URL} className="grid grid-cols-[40px_1fr_auto] items-center py-4 border-b border-white/10 font-serif text-3xl text-[#FBF8F1] hover:text-[#E2B94E] transition-colors">
              <small className="font-sans text-[11px] text-[#E2B94E]">05</small>
              <span>Restaurante</span>
              <span className="text-base text-[#E2B94E]">↗</span>
            </a>
          </nav>

          <div className="space-y-3 pt-4">
            <a href={WA_URL} target="_blank" rel="noreferrer" className="casitas-book casitas-book-light w-full justify-center gap-4">
              Reservar por WhatsApp <span>↗</span>
            </a>
            <p className="text-[11px] uppercase tracking-[.18em] text-[#687B70] text-center">Quinua · Ayacucho · 3,500 msnm</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#050C08] text-[#FBF8F1] pt-20 pb-10 border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <Brand light={false} />
            <p className="max-w-sm text-sm text-[#A2B3A8] leading-relaxed">
              Casitas privadas frente al valle de Quinua. Un refugio boutique de alta montaña para dormir cerca del silencio y despertar sin prisa.
            </p>
          </div>
          <div className="md:col-span-3">
            <small className="footer-label">Explora</small>
            <nav className="mt-5 flex flex-col gap-3 text-sm text-[#A2B3A8]">
              {NAV_ITEMS.map((item) => (
                <Link key={item.label} to={item.to as any} hash={item.hash} className="hover:text-[#E2B94E] transition-colors">
                  {item.label}
                </Link>
              ))}
              <a href={RESTAURANT_URL} className="hover:text-[#E2B94E] transition-colors">Restaurante QuinuaQ ↗</a>
              <Link to="/admin" className="hover:text-[#E2B94E] transition-colors text-xs text-[#687B70] pt-2">Panel de Gestión (Admin) ↗</Link>
            </nav>
          </div>
          <div className="md:col-span-4">
            <small className="footer-label">Reservas & Contacto</small>
            <div className="mt-5 space-y-3 text-sm text-[#A2B3A8]">
              <a className="block hover:text-[#E2B94E] font-medium text-[#FBF8F1] transition-colors" href={WA_URL} target="_blank" rel="noreferrer">
                WhatsApp: +51 946 393 256
              </a>
              <a className="block hover:text-[#E2B94E] transition-colors" href="mailto:reservas@quinuaq.com">reservas@quinuaq.com</a>
              <p>Quinua, Ayacucho · Perú</p>
            </div>
          </div>
        </div>
        <div className="pt-7 flex flex-col sm:flex-row justify-between gap-3 text-[11px] uppercase tracking-[.16em] text-[#687B70]">
          <p>© {new Date().getFullYear()} QuinuaQ Casitas · Todos los derechos reservados</p>
          <p>Campo · Cocina · Hospitalidad Andina</p>
        </div>
      </div>
    </footer>
  );
}
