import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FileText, Layers, Settings, LogOut, LayoutDashboard, Image, FolderOpen, Megaphone, Menu, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/admin/articles", icon: FileText, label: "Artikel" },
  { to: "/admin/portfolios", icon: Image, label: "Portfolio" },
  { to: "/admin/services", icon: Layers, label: "Layanan" },
  { to: "/admin/banners", icon: Megaphone, label: "Banner Promo" },
  { to: "/admin/media", icon: FolderOpen, label: "Media" },
  { to: "/admin/client-logos", icon: Users, label: "Logo Client" },
  { to: "/admin/site-settings", icon: Settings, label: "Site Settings" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-electric" size={32} />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-primary">
          Saat<span className="text-electric">.</span> Admin
        </Link>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-primary">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.to, item.exact)
                ? "bg-electric/10 text-electric"
                : "text-muted-foreground hover:text-primary hover:bg-muted"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        <p className="text-xs text-muted-foreground truncate mb-2 px-3">{user.email}</p>
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={() => signOut().then(() => navigate("/admin/login"))}>
          <LogOut size={16} className="mr-2" /> Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 border-r border-border bg-card flex-col shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 max-w-[80vw] h-full bg-card flex flex-col shadow-elevated z-10">
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-40 h-14 flex items-center gap-3 px-4 border-b border-border bg-card/95 backdrop-blur-sm">
          <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-primary">
            <Menu size={22} />
          </button>
          <span className="text-sm font-bold text-primary">
            Saat<span className="text-electric">.</span> Admin
          </span>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
