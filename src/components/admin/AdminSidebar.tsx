import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarDays,
  Receipt,
  Radio,
  ExternalLink,
  LogOut,
  ShieldCheck,
  DoorOpen
} from "lucide-react";
import { signOutAdmin } from "@/lib/auth";

interface AdminSidebarProps {
  userEmail?: string;
  onSignOut?: () => void;
}

export function AdminSidebar({ userEmail, onSignOut }: AdminSidebarProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems = [
    { label: "Resumen Hoy", to: "/admin", icon: LayoutDashboard },
    { label: "Recepción (Walk-ins)", to: "/admin/recepcion", icon: DoorOpen },
    { label: "Calendario & Bloqueos", to: "/admin/calendario", icon: CalendarDays },
    { label: "Reservas & Pagos", to: "/admin/reservas", icon: Receipt },
    { label: "Canales iCal (Airbnb/Booking)", to: "/admin/canales", icon: Radio },
  ];

  const handleLogout = async () => {
    await signOutAdmin();
    if (onSignOut) onSignOut();
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-64 bg-[#10271C] text-[#FBF8F1] flex flex-col justify-between border-r border-white/10 shrink-0 select-none min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#9C7A3C]/20 border border-[#9C7A3C]/40 flex items-center justify-center text-[#9C7A3C]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg tracking-wide text-white">QuinuaQ Casitas</h2>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#9C7A3C] block font-sans">
                Panel de Gestión
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5" aria-label="Navegación del Administrador">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === "/admin"
                ? currentPath === "/admin" || currentPath === "/admin/"
                : currentPath.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to as any}
                className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-sans tracking-wide transition-all ${
                  isActive
                    ? "bg-[#9C7A3C] text-white font-medium shadow-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            Ver Web Pública
          </span>
          <span className="text-[10px] text-[#9C7A3C]">↗</span>
        </a>

        {userEmail && (
          <div className="px-3 py-1">
            <span className="block text-[9px] uppercase tracking-wider text-white/40">Conectado como</span>
            <p className="text-xs text-white/80 truncate font-mono">{userEmail}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-400 hover:bg-red-500/10 rounded transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
