import { Link } from "@tanstack/react-router";
import { WA_URL } from "@/lib/casitas";
import { useEffect, useState } from "react";

const RESTAURANT_URL = import.meta.env.VITE_RESTAURANT_URL ?? (import.meta.env.DEV ? "http://localhost:3000" : "https://www.quinuaq.com");

const NAV_ITEMS = [
  { label: "Experiencias", hash: "experiencias" },
  { label: "Casitas", hash: "habitaciones" },
  { label: "Galería", hash: "galeria" },
  { label: "Quinua", hash: "quinua" },
];

function Brand({ light }: { light: boolean }) {
  return (
    <Link to="/" className={`property-brand ${light ? "property-brand-on-light" : "property-brand-on-dark"}`} aria-label="QuinuaQ Casitas, inicio">
      <img src="/logo-quinuaq.png" alt="" />
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
              <Link key={item.hash} to="/" hash={item.hash} className={`casitas-nav-link ${light ? "text-[#17251C]" : "text-[#FBF8F1]"}`}>
                {item.label}
              </Link>
            ))}
            <a className={`property-switch ${light ? "property-switch-light" : "property-switch-dark"}`} href={RESTAURANT_URL}>
              Restaurante <span>↗</span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a href={WA_URL} target="_blank" rel="noreferrer" className={`casitas-book ${light ? "casitas-book-light" : "casitas-book-dark"}`}>
              Reservar <span>↗</span>
            </a>
            <button onClick={() => setMenuOpen(true)} className={`xl:hidden casitas-menu-button ${light ? "text-[#17251C]" : "text-[#FBF8F1]"}`} aria-label="Abrir menú">
              <i /><i /><i />
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] bg-[#F4EFE4] transition-all duration-500 xl:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="h-full p-6 md:p-10 flex flex-col">
          <div className="flex items-center justify-between">
            <Brand light />
            <button onClick={() => setMenuOpen(false)} className="w-11 h-11 border border-[#17251C]/20 text-3xl font-light text-[#17251C]" aria-label="Cerrar menú">×</button>
          </div>

          <nav className="my-auto flex flex-col" aria-label="Navegación móvil">
            {NAV_ITEMS.map((item, index) => (
              <Link key={item.hash} to="/" hash={item.hash} onClick={() => setMenuOpen(false)} className="grid grid-cols-[40px_1fr_auto] items-center py-4 border-b border-[#17251C]/15 font-serif text-3xl text-[#17251C]">
                <small className="font-sans text-[11px] text-[#BB5A3E]">0{index + 1}</small>{item.label}<span className="text-base">↗</span>
              </Link>
            ))}
            <a href={RESTAURANT_URL} className="grid grid-cols-[40px_1fr_auto] items-center py-4 border-b border-[#17251C]/15 font-serif text-3xl text-[#204B35]">
              <small className="font-sans text-[11px] text-[#BB5A3E]">05</small>Restaurante<span className="text-base">↗</span>
            </a>
          </nav>

          <a href={WA_URL} target="_blank" rel="noreferrer" className="casitas-book casitas-book-light w-full">Reservar una casita <span>↗</span></a>
          <p className="mt-5 text-[11px] uppercase tracking-[.18em] text-[#667169]">Quinua · Ayacucho · Perú</p>
        </div>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#10271C] text-[#FBF8F1] pt-20 pb-10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/15">
          <div className="md:col-span-5">
            <Brand light={false} />
            <p className="mt-6 max-w-sm text-sm text-white/65 leading-relaxed">Casitas privadas frente al valle. Un refugio de campo para dormir cerca del paisaje y despertar sin prisa.</p>
          </div>
          <div className="md:col-span-3">
            <small className="footer-label">Explora</small>
            <nav className="mt-5 flex flex-col gap-3 text-sm text-white/75">
              {NAV_ITEMS.map((item) => <Link key={item.hash} to="/" hash={item.hash} className="hover:text-[#E2B94E]">{item.label}</Link>)}
              <a href={RESTAURANT_URL} className="hover:text-[#E2B94E]">Restaurante ↗</a>
            </nav>
          </div>
          <div className="md:col-span-4">
            <small className="footer-label">Reservas</small>
            <div className="mt-5 space-y-3 text-sm text-white/75">
              <a className="block hover:text-[#E2B94E]" href={WA_URL} target="_blank" rel="noreferrer">+51 930 678 951</a>
              <a className="block hover:text-[#E2B94E]" href="mailto:reservas@quinuaq.com">reservas@quinuaq.com</a>
              <p>Quinua, Ayacucho · Perú</p>
            </div>
          </div>
        </div>
        <div className="pt-7 flex flex-col sm:flex-row justify-between gap-3 text-[11px] uppercase tracking-[.16em] text-white/45">
          <p>© {new Date().getFullYear()} QuinuaQ Casitas</p><p>Campo · cocina · hospitalidad</p>
        </div>
      </div>
    </footer>
  );
}
