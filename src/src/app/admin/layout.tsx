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
  Headset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const adminNav = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/menu", label: "برنامه غذایی", icon: UtensilsCrossed },
  { href: "/admin/stats", label: "آمار و گزارشات", icon: BarChart3 },
  { href: "/admin/inventory", label: "انبارداری", icon: Package },
  { href: "/admin/accounting", label: "حسابداری", icon: Calculator },
  { href: "/admin/rules", label: "قوانین و محدودیت‌ها", icon: ShieldCheck },
  { href: "/admin/support", label: "پشتیبانی", icon: Headset },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = mockUsers[1]; // admin

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800 dark:text-white">
                پنل مدیریت اسمارت چف
              </span>
            </Link>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-slate-100 text-slate-600 text-sm">
                  م
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm text-slate-500">
                {user.name}
              </span>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="border-t border-gray-100 dark:border-gray-800 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1 py-1.5">
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
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-gray-200"
                          : "text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800"
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
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Settings className="w-3 h-3 ml-1" />
            <span>پنل مدیریت</span>
            <span className="mx-1">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">
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
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-xs text-gray-400">
          <p>پنل مدیریت سامانه اسمارت چف © ۱۴۰۴</p>
        </div>
      </footer>
    </div>
  );
}
