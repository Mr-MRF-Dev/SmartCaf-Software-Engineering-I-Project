"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UtensilsCrossed, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
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

    if (studentId === "admin" && password === "admin") {
      toast.success("ورود موفق! خوش آمدید، مدیر سیستم.");
      router.push("/admin");
    } else if (studentId.length >= 5 && password.length >= 3) {
      toast.success("ورود موفق! خوش آمدید.");
      router.push("/student");
    } else {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">اسمارت چف</h1>
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
                برای ورود به عنوان مدیر: نام کاربری <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">admin</span> و رمز <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">admin</span>
              </p>
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
