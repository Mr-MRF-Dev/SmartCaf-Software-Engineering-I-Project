"use client";

import {
  UtensilsCrossed,
  CreditCard,
  History,
  Brain,
  TrendingUp,
  Bell,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  mockUsers,
  mockReservations,
  mockMenuSchedule,
  mockFoods,
  formatPrice,
  getStatusLabel,
  getStatusBadgeVariant,
  getMealLabel,
} from "@/lib/mock-data";

export default function StudentDashboard() {
  const user = mockUsers[0];
  const activeReservations = mockReservations.filter(
    (r) => r.status === "reserved" || r.status === "paid"
  );
  const todayMenu = mockMenuSchedule.filter((m) => m.date === "1404/11/21");

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            سلام، {user.name}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            به سامانه رزرو غذای دانشگاه خوش آمدید.
          </p>
        </div>
        <Link href="/student/reserve">
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <UtensilsCrossed className="w-4 h-4" />
            رزرو غذا
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-emerald-600">موجودی کیف پول</p>
                <p className="text-sm font-bold text-emerald-800">
                  {formatPrice(user.balance)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">رزروهای فعال</p>
                <p className="text-sm font-bold text-gray-900">
                  {activeReservations.length} عدد
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">کل سفارشات</p>
                <p className="text-sm font-bold text-gray-900">
                  {mockReservations.length} عدد
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">اعلان‌ها</p>
                <p className="text-sm font-bold text-gray-900">۲ جدید</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Menu */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
              برنامه غذایی امروز
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayMenu.length > 0 ? (
              todayMenu.map((menu) => (
                <div
                  key={menu.id}
                  className="border rounded-lg p-3 space-y-2"
                >
                  <Badge variant="outline" className="text-xs">
                    {getMealLabel(menu.meal)}
                  </Badge>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {menu.foods.map((food) => (
                      <div
                        key={food.id}
                        className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1 text-sm"
                      >
                        <span>{food.image}</span>
                        <span>{food.name}</span>
                        <span className="text-xs text-gray-400">
                          {formatPrice(food.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">
                برنامه غذایی امروز هنوز اعلام نشده است.
              </p>
            )}
            <Link href="/student/reserve">
              <Button
                variant="outline"
                className="w-full mt-2 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
              >
                مشاهده و رزرو
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Active Reservations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" />
              رزروهای فعال
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeReservations.length > 0 ? (
              activeReservations.map((res) => (
                <div
                  key={res.id}
                  className="border rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{res.foodItem.image}</span>
                    <div>
                      <p className="text-sm font-medium">
                        {res.foodItem.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {res.date} - {getMealLabel(res.meal)}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <Badge variant={getStatusBadgeVariant(res.status)}>
                      {getStatusLabel(res.status)}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatPrice(res.totalPrice)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">
                رزرو فعالی ندارید.
              </p>
            )}
            <Link href="/student/history">
              <Button
                variant="outline"
                className="w-full mt-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                مشاهده تاریخچه کامل
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestion Teaser */}
      <Card className="border-purple-200 bg-gradient-to-l from-purple-50 to-white">
        <CardContent className="py-5 px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                پیشنهاد هوشمند غذا
              </h3>
              <p className="text-sm text-gray-500">
                بر اساس سلیقه و سابقه سفارشاتتان، بهترین غذا را پیشنهاد
                می‌دهیم.
              </p>
            </div>
          </div>
          <Link href="/student/ai-reserve">
            <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
              <Brain className="w-4 h-4" />
              مشاهده پیشنهادات
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            اعلان‌های اخیر
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50">
            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <p className="text-sm text-gray-700">
              برنامه غذایی فردا ۱۴۰۴/۱۱/۲۲ اعلام شد. همین الان رزرو کنید.
            </p>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-amber-50">
            <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <p className="text-sm text-gray-700">
              سفارش جوجه‌کباب شما برای شام امشب آماده تحویل است. کد QR خود را
              همراه داشته باشید.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
