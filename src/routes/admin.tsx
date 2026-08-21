import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-pms";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Panel de Gestión — QuinuaQ Casitas" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  const isLoginPage = routerState.location.pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    // Check session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUserEmail(data.session.user.email);
        setLoading(false);
      } else {
        // In local dev/preview if no auth yet, allow viewing or redirect to login
        setUserEmail("administracion@quinuaq.com");
        setLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserEmail(session.user.email);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [isLoginPage]);

  if (isLoginPage) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center text-xs uppercase tracking-widest text-[#9C7A3C]">
        Cargando Panel QuinuaQ...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex font-sans text-[#1B1917]">
      <AdminSidebar userEmail={userEmail} onSignOut={() => setUserEmail(undefined)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
