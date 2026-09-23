import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { WA_URL } from "@/lib/casitas";

import { RESTAURANT_URL } from "@/lib/public-site";

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={`qq-brand${light ? " qq-brand-light" : ""}`}
      aria-label="QuinuaQ Casitas, inicio"
    >
      <span className="qq-brand-image">
        <img src="/logo-quinuaq.png" alt="" />
      </span>
      <span className="qq-brand-name">
        Casitas<span>Quinua · Ayacucho</span>
      </span>
    </Link>
  );
}

export function SiteNav({ variant: _variant }: { variant?: "overlay" | "solid" }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const menuElement = dialog.current;
    const triggerElement = trigger.current;
    document.body.style.overflow = "hidden";
    menuElement?.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      menuElement?.close();
      triggerElement?.focus();
    };
  }, [open]);
  const links = (
    <>
      <Link
        to="/casitas"
        className={pathname.startsWith("/casitas") ? "is-active" : ""}
        aria-current={pathname.startsWith("/casitas") ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        Las casitas
      </Link>
    </>
  );
  return (
    <>
      <a className="qq-skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="qq-header">
        <div className="qq-header-inner">
          <Brand />
          <nav className="qq-nav" aria-label="Navegación principal">
            {links}
          </nav>
          <div className="qq-header-actions">
            <a className="qq-property-switch" href={RESTAURANT_URL}>
              Restaurante <span aria-hidden="true">↗</span>
            </a>
            <Link to="/casitas" className="qq-button qq-header-book">
              Reservar <span aria-hidden="true">↗</span>
            </Link>
            <button
              ref={trigger}
              className="qq-menu-trigger"
              type="button"
              aria-label="Abrir menú"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {open && (
        <dialog
          ref={dialog}
          className="qq-menu"
          aria-label="Menú de Casitas QuinuaQ"
          onCancel={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === dialog.current) setOpen(false);
          }}
        >
          <div className="qq-menu-top">
            <Brand />
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú">
              ×
            </button>
          </div>
          <nav aria-label="Navegación móvil">
            {links}
            <a href={RESTAURANT_URL}>
              Restaurante <span aria-hidden="true">↗</span>
            </a>
          </nav>
          <Link to="/casitas" className="qq-button" onClick={() => setOpen(false)}>
            Elegir una casita <span aria-hidden="true">↗</span>
          </Link>
          <p>
            Campo, cocina y hospitalidad.
            <br />
            Quinua, Ayacucho.
          </p>
        </dialog>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="qq-footer">
      <div className="qq-wrap qq-footer-grid">
        <div>
          <Brand light />
          <p>
            Una estancia en el campo.
            <br />
            Una forma de acercarte a Ayacucho.
          </p>
        </div>
        <nav aria-label="Navegación del pie de página">
          <span className="qq-eyebrow">Descubre</span>
          <Link to="/casitas">Las casitas</Link>
          <a href={RESTAURANT_URL}>Restaurante QuinuaQ ↗</a>
        </nav>
        <div>
          <span className="qq-eyebrow">Hablemos de tu visita</span>
          <a href={WA_URL} target="_blank" rel="noreferrer">
            +51 946 393 256 ↗
          </a>
          <a href="mailto:reservas@quinuaq.com">reservas@quinuaq.com</a>
          <p>Quinua, Ayacucho · Perú</p>
        </div>
      </div>
      <div className="qq-wrap qq-footer-bottom">
        <p>© {new Date().getFullYear()} QuinuaQ Casitas</p>
        <p>Un proyecto formativo en alianza con Mama Alice</p>
        <Link to="/admin">Acceso al equipo</Link>
      </div>
    </footer>
  );
}
