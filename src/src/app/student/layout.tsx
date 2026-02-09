"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UtensilsCrossed,
  CreditCard,
  History,
  Brain,
  LogOut,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { mockUsers, formatPrice } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const studentNav = [
  { href: "/student", label: "صفحه اصلی", icon: Home },
  { href: "/student/reserve", label: "رزرو غذا", icon: UtensilsCrossed },
  { href: "/student/ai-reserve", label: "پیشنهاد هوشمند", icon: Brain },
  { href: "/student/payment", label: "پرداخت", icon: CreditCard },
  { href: "/student/history", label: "تاریخچه", icon: History },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = mockUsers[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/student" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                اسمارت چف
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {studentNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/student" &&
                    pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "gap-2",
                        isActive
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1.5">
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">
                  {formatPrice(user.balance)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
              <Link href="/login">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden border-t border-gray-100 overflow-x-auto">
          <nav className="flex items-center gap-1 px-4 py-2">
            {studentNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/student" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-1.5 whitespace-nowrap text-xs",
                      isActive
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "text-gray-500"
                    )}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Breadcrumb / Status Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>پنل دانشجو</span>
              <span className="mx-1">/</span>
              <span className="text-gray-900 font-medium">
                {studentNav.find(
                  (n) =>
                    pathname === n.href ||
                    (n.href !== "/student" && pathname.startsWith(n.href))
                )?.label || "صفحه اصلی"}
              </span>
            </div>
            <span>شماره دانشجویی: {user.studentId}</span>
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
          <p>سامانه هوشمند رزرو غذا - اسمارت چف © ۱۴۰۴</p>
        </div>
      </footer>
    </div>
  );
}
