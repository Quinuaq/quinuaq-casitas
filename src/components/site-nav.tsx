import { Link } from "@tanstack/react-router";
import { WA_URL } from "@/lib/casitas";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Experiencias", hash: "experiencias" },
  { label: "Casitas & Suites", hash: "habitaciones" },
  { label: "Galería", hash: "galeria" },
  { label: "Quinua", hash: "quinua" },
  { label: "Propósito", hash: "proposito" },
  { label: "Contacto", hash: "contacto" },
];

export function SiteNav({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (variant === "solid") return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 h-20 flex items-center ${
          scrolled
            ? "glass-header shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex flex-col items-start focus:outline-none">
            <span className="font-serif text-2xl tracking-tight text-[#F4F0E8] group-hover:text-[#C5A059] transition-colors duration-300">
              VALLEY Q
            </span>
            <span className="text-[9px] uppercase tracking-[0.38em] text-[#C5A059] -mt-0.5">
              An Altipacha Estate
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.hash}
                to="/"
                hash={item.hash}
                className="text-[11px] uppercase tracking-[0.3em] text-[#9E9488] hover:text-[#C5A059] transition-colors duration-300 relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-5">
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex btn-luxury-outline py-2.5 px-6 text-[10px]"
            >
              Reservar
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 text-[#F4F0E8] hover:text-[#C5A059] transition-colors focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              <div className="w-6 flex flex-col gap-1.5 items-end">
                <span className="w-6 h-px bg-current" />
                <span className="w-4 h-px bg-current" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0B0A09]/96 backdrop-blur-2xl"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-serif text-2xl text-[#F4F0E8]">VALLEY Q</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059]">
                Quinua, Ayacucho
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-3 text-[#9E9488] hover:text-[#F4F0E8] transition-colors"
              aria-label="Cerrar menú"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 my-auto">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.hash}
                to="/"
                hash={item.hash}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl md:text-4xl text-[#F4F0E8] hover:text-[#C5A059] transition-colors"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#F4F0E8]/10 flex flex-col gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-luxury-solid w-full text-center"
            >
              Reservar por WhatsApp
            </a>
            <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.25em] text-[#9E9488]">
              <span>Altipacha Select</span>
              <span>+51 921 500 056</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0B0A09] border-t border-[#F4F0E8]/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#F4F0E8]/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl text-[#F4F0E8]">VALLEY Q</span>
              <span className="block text-[9px] uppercase tracking-[0.4em] text-[#C5A059] mt-0.5">
                An Altipacha Estate · Quinua
              </span>
            </Link>
            <p className="text-sm text-[#9E9488] font-light leading-relaxed max-w-sm">
              Refugio boutique andino a 3,500 msnm. Entre montañas, neblina y silencio, un espacio diseñado para habitar la calma.
            </p>
            <div className="pt-2">
              <span className="label-taupe text-[9px]">Oficina Central Altipacha</span>
              <p className="text-xs text-[#9E9488] mt-1">Jirón 28 de Julio N° 527, Huamanga, Ayacucho</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="label-luxury text-[10px]">Explorar</span>
            <ul className="space-y-2.5 text-xs text-[#9E9488]">
              {NAV_ITEMS.map((item) => (
                <li key={item.hash}>
                  <Link to="/" hash={item.hash} className="hover:text-[#C5A059] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Reservations */}
          <div className="md:col-span-4 space-y-4">
            <span className="label-luxury text-[10px]">Reservas & Consultas</span>
            <div className="space-y-2 text-xs text-[#9E9488]">
              <p>WhatsApp: <a href={WA_URL} target="_blank" rel="noreferrer" className="text-[#F4F0E8] hover:text-[#C5A059] transition-colors">+51 921 500 056</a></p>
              <p>Fijo: <a href="tel:+51066280891" className="text-[#F4F0E8] hover:text-[#C5A059] transition-colors">(066) 280 891</a></p>
              <p>Email: <a href="mailto:reservas@altipachahotel.com" className="text-[#F4F0E8] hover:text-[#C5A059] transition-colors">reservas@altipachahotel.com</a></p>
              <p>Ventas: <a href="mailto:ventas@altipachahotel.com" className="text-[#F4F0E8] hover:text-[#C5A059] transition-colors">ventas@altipachahotel.com</a></p>
            </div>
            <div className="pt-4">
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury-outline py-2.5 px-5 text-[9px]"
              >
                Contacto Directo
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-[#5E554C]">
          <p>© {new Date().getFullYear()} Valley Q Lodge · Altipacha Hotels. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="https://altipachahotel.com/valley-q/" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors">
              Altipacha Select
            </a>
            <a href="https://quinuaq.com" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors">
              ONG QuinuaQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
