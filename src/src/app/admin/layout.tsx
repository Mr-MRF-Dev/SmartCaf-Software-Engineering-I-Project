"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  BarChart3,
  Package,
  Calculator,
  ShieldCheck,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/menu", label: "برنامه غذایی", icon: UtensilsCrossed },
  { href: "/admin/stats", label: "آمار و گزارشات", icon: BarChart3 },
  { href: "/admin/inventory", label: "انبارداری", icon: Package },
  { href: "/admin/accounting", label: "حسابداری", icon: Calculator },
  { href: "/admin/rules", label: "قوانین و محدودیت‌ها", icon: ShieldCheck },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = mockUsers[1]; // admin

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                پنل مدیریت اسمارت‌کف
              </span>
            </Link>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-amber-100 text-amber-700 text-sm">
                  م
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm text-slate-300">
                {user.name}
              </span>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-red-400 hover:bg-slate-800"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="border-t border-slate-700 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1 py-2">
              {adminNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "gap-1.5 whitespace-nowrap text-sm",
                        isActive
                          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 hover:text-amber-300"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center text-xs text-gray-500">
            <Settings className="w-3 h-3 ml-1" />
            <span>پنل مدیریت</span>
            <span className="mx-1">/</span>
            <span className="text-gray-900 font-medium">
              {adminNav.find(
                (n) =>
                  pathname === n.href ||
                  (n.href !== "/admin" && pathname.startsWith(n.href))
              )?.label || "داشبورد"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-xs text-gray-400">
          <p>پنل مدیریت سامانه اسمارت‌کف © ۱۴۰۴</p>
        </div>
      </footer>
    </div>
  );
}
