import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signInAdmin } from "@/lib/auth";
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Acceso Administrativo — QuinuaQ Casitas" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInAdmin(email.trim(), password);
      navigate({ to: "/admin" as any });
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Credenciales incorrectas. Verifica tu correo y contraseña.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex flex-col justify-center items-center p-6 text-[#1B1917] font-sans">
      <div className="w-full max-w-md bg-white border border-[#1B1917]/10 p-8 md:p-10 shadow-xl space-y-8">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#10271C] text-[#9C7A3C] flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-3xl text-[#1B1917] font-light">QuinuaQ Casitas</h1>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9C7A3C] font-medium block mt-1">
              Acceso a Administración
            </span>
          </div>
          <p className="text-xs text-[#6B635A] max-w-xs mx-auto">
            Ingresa con tu cuenta autorizada para gestionar reservas, bloqueos y canales.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-[#9C7A3C]" />
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              placeholder="administracion@quinuaq.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3.5 py-2.5 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>

          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#9C7A3C]" />
              Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3.5 py-2.5 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#10271C] hover:bg-[#9C7A3C] text-white text-xs uppercase tracking-wider transition-colors duration-300 font-medium flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <span>{loading ? "Verificando..." : "Ingresar al Panel"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#1B1917]/10 text-center text-[11px] text-[#999084]">
          <p>© {new Date().getFullYear()} QuinuaQ Hospitality OS</p>
        </div>
      </div>
    </div>
  );
}
