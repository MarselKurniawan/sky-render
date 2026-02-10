import { useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FileText, Briefcase, Layers, Settings, Search, LogOut, LayoutDashboard, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/admin/articles", icon: FileText, label: "Artikel" },
  { to: "/admin/portfolios", icon: Image, label: "Portfolio" },
  { to: "/admin/services", icon: Layers, label: "Layanan" },
  { to: "/admin/site-settings", icon: Settings, label: "Site Settings" },
  { to: "/admin/seo", icon: Search, label: "SEO" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

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

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <Link to="/" className="text-lg font-bold text-primary">
            Saat<span className="text-electric">.</span> Admin
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
