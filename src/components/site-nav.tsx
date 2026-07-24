import { Link } from "@tanstack/react-router";
import { WA_URL } from "@/lib/casitas";

export function SiteNav({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const wrap =
    variant === "overlay"
      ? "fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40"
      : "sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-border";

  return (
    <header className={wrap}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-tight text-clay">Valley Q</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Lodge</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" hash="experiencias" className="hover:text-clay transition">Experiencias</Link>
          <Link to="/" hash="habitaciones" className="hover:text-clay transition">Casitas</Link>
          <Link to="/" hash="quinua" className="hover:text-clay transition">Quinua</Link>
          <Link to="/" hash="proposito" className="hover:text-clay transition">Propósito</Link>
          <Link to="/" hash="contacto" className="hover:text-clay transition">Contacto</Link>
        </nav>
        <a
          href={WA_URL}
          target="_blank"
          rel="noreferrer"
          className="text-xs md:text-sm px-4 py-2 bg-clay text-primary-foreground rounded-sm hover:bg-ember transition"
        >
          Reservar
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="py-10 px-6 md:px-16 bg-ink text-ivory/60 border-t border-ivory/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4 text-xs">
        <div>
          © {new Date().getFullYear()} Valley Q Lodge · Altipacha Hotels · Parte de{" "}
          <a href="https://quinuaq.com" className="text-ember hover:underline">QuinuaQ</a>
        </div>
        <div>Refugio boutique en Quinua, Ayacucho — Perú</div>
      </div>
    </footer>
  );
}
