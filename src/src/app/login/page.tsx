"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UtensilsCrossed, Eye, EyeOff, LogIn, AlertCircle, Phone, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!studentId) {
      setError("لطفا نام کاربری خود را وارد کنید.");
      return;
    }
    if (!password) {
      setError("لطفا رمز عبور خود را وارد کنید.");
      return;
    }

    setLoading(true);

    // Simulate login delay
    await new Promise((r) => setTimeout(r, 800));

    if (studentId === "admin") {
      if (password === "admin") {
        toast.success("ورود موفق! خوش آمدید، مدیر سیستم.");
        router.push("/admin");
      } else {
        toast.error("نام کاربری یا رمز عبور اشتباه است. لطفا مجددا تلاش کنید.");
        setError("نام کاربری یا رمز عبور اشتباه است. لطفا مجددا تلاش کنید.");
      }
    } else if (studentId.length >= 5 && password.length >= 3) {
      toast.success("ورود موفق! خوش آمدید.");
      router.push("/student");
    } else {
      toast.error(
        "شماره دانشجویی یا رمز عبور اشتباه است. لطفا مجددا تلاش کنید.",
      );
      setError("شماره دانشجویی یا رمز عبور اشتباه است. لطفا مجددا تلاش کنید.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-emerald-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            اسمارت چف
          </h1>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">
            دانشگاه صنعتی اصفهان
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            سامانه هوشمند رزرو غذای دانشگاه
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center">
              ورود به سامانه
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="studentId">نام کاربری</Label>
                <Input
                  id="studentId"
                  placeholder="نام کاربری خود را وارد کنید"
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                    setError("");
                  }}
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    dir="ltr"
                    className="text-left pl-10"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {loading ? "در حال ورود..." : "ورود"}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                برای ورود به عنوان دانشجو: نام کاربری ۵ رقمی و هر رمز عبوری
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                برای ورود به عنوان مدیر: نام کاربری{" "}
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">
                  admin
                </span>{" "}
                و رمز{" "}
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">
                  admin
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support Card */}
        <Card className="mt-4 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
                  مشکلی در ورود دارید؟
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">
                  برای دریافت پشتیبانی فوری با ما تماس بگیرید:
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <a href="tel:02188776655" className="flex items-center gap-1 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100">
                    <Phone className="w-3 h-3" />
                    ۰۲۱-۸۸۷۷۶۶۵۵
                  </a>
                  <span className="text-amber-400">|</span>
                  <a href="mailto:support@smartchef.ir" className="flex items-center gap-1 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100">
                    <Mail className="w-3 h-3" />
                    support@smartchef.ir
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          سامانه هوشمند رزرو غذا - اسمارت چف © ۱۴۰۴
        </p>
      </div>
    </div>
  );
}
