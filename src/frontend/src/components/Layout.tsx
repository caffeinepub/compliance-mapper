import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  FolderOpen,
  GitCompare,
  LayoutDashboard,
  Menu,
  Shield,
  Wand2,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    ocid: "nav.dashboard.link",
  },
  {
    href: "/crosswalk",
    label: "Standards Crosswalk",
    icon: GitCompare,
    ocid: "nav.crosswalk.link",
  },
  {
    href: "/assessment",
    label: "Gap Assessment",
    icon: ClipboardList,
    ocid: "nav.assessment.link",
  },
  {
    href: "/wizard",
    label: "Implementation Wizard",
    icon: Wand2,
    ocid: "nav.wizard.link",
  },
  {
    href: "/evidence",
    label: "Evidence Manager",
    icon: FolderOpen,
    ocid: "nav.evidence.link",
  },
  {
    href: "/reports",
    label: "Reports",
    icon: BarChart3,
    ocid: "nav.reports.link",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-sidebar-border",
          collapsed && "justify-center px-2",
        )}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center shadow-glow-sm">
          <Shield className="w-4 h-4 text-primary" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-display font-bold text-sm text-foreground tracking-wide">
              Compliance<span className="text-gradient-blue">Mapper</span>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
              IEC 62443 Platform
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              data-ocid={item.ocid}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-150 group relative",
                active
                  ? "bg-primary/15 text-primary shadow-glow-sm border border-primary/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
              )}
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  active
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {!collapsed && (
                <span className="font-medium truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: collapse button */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "hidden lg:flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors",
            collapsed && "justify-center",
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
          {!collapsed && <span>Collapse</span>}
        </button>
        {!collapsed && (
          <div className="mt-3 pt-3 border-t border-sidebar-border">
            <div className="text-[10px] text-muted-foreground font-mono text-center">
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col flex-shrink-0 bg-sidebar border-r border-sidebar-border transition-all duration-200",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-4 lg:px-6 h-14 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
            <div className="hidden lg:flex items-center gap-2">
              <Badge
                variant="outline"
                className="font-mono text-[10px] text-primary border-primary/30 bg-primary/5 px-2 py-0.5"
              >
                ENTERPRISE
              </Badge>
              <span className="text-xs text-muted-foreground">v2.4.1</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full" />
            </button>
            <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <CircleUserRound className="w-4 h-4 text-primary" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-medium text-foreground">
                  Dr. P. Saxena
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  Admin
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
