"use client";

import {
  Users,
  UtensilsCrossed,
  TrendingUp,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  HeadsetIcon,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  mockDailyStats,
  mockInventory,
  formatPrice,
} from "@/lib/mock-data";

export default function AdminDashboard() {
  const todayStats = mockDailyStats[mockDailyStats.length - 1];
  const yesterdayStats = mockDailyStats[mockDailyStats.length - 2];
  const revenueChange =
    ((todayStats.totalRevenue - yesterdayStats.totalRevenue) /
      yesterdayStats.totalRevenue) *
    100;
  const ordersChange =
    ((todayStats.totalOrders - yesterdayStats.totalOrders) /
      yesterdayStats.totalOrders) *
    100;

  const lowStockItems = mockInventory.filter(
    (item) => item.quantity <= item.minQuantity
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">داشبورد مدیریت</h1>
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">
          دانشگاه صنعتی اصفهان
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          خلاصه وضعیت سامانه در یک نگاه
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">سفارشات امروز</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {todayStats.totalOrders}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              {ordersChange >= 0 ? (
                <ArrowUpRight className="w-3 h-3 text-green-500" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-red-500" />
              )}
              <span
                className={
                  ordersChange >= 0 ? "text-green-600" : "text-red-600"
                }
              >
                {Math.abs(ordersChange).toFixed(1)}%
              </span>
              <span className="text-gray-400">نسبت به دیروز</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">درآمد امروز</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatPrice(todayStats.totalRevenue)}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              {revenueChange >= 0 ? (
                <ArrowUpRight className="w-3 h-3 text-green-500" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-red-500" />
              )}
              <span
                className={
                  revenueChange >= 0 ? "text-green-600" : "text-red-600"
                }
              >
                {Math.abs(revenueChange).toFixed(1)}%
              </span>
              <span className="text-gray-400">نسبت به دیروز</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">لغو شده‌ها</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {todayStats.cancelledOrders}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              از {todayStats.totalOrders} سفارش
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">هشدار موجودی</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {lowStockItems.length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">مورد نیاز به تامین</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Meals Breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">توزیع سفارشات امروز</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              {[
                {
                  label: "صبحانه",
                  count: todayStats.breakfastOrders,
                  color: "bg-amber-500",
                },
                {
                  label: "ناهار",
                  count: todayStats.lunchOrders,
                  color: "bg-emerald-500",
                },
                {
                  label: "شام",
                  count: todayStats.dinnerOrders,
                  color: "bg-blue-500",
                },
              ].map((meal) => (
                <div key={meal.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{meal.label}</span>
                    <span className="font-medium">
                      {meal.count} سفارش (
                      {((meal.count / todayStats.totalOrders) * 100).toFixed(0)}
                      %)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${meal.color} h-2 rounded-full transition-all`}
                      style={{
                        width: `${(meal.count / todayStats.totalOrders) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                هشدار کمبود موجودی
              </CardTitle>
              <Link href="/admin/inventory">
                <Button variant="ghost" size="sm" className="text-xs">
                  مشاهده انبار
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {lowStockItems.length > 0 ? (
              lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-800"
                >
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-left">
                    <Badge variant="destructive" className="text-xs">
                      {item.quantity} {item.unit}
                    </Badge>
                    <p className="text-xs text-gray-400 mt-0.5">
                      حداقل: {item.minQuantity} {item.unit}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                مشکلی در موجودی وجود ندارد.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            href: "/admin/menu",
            label: "تنظیم منو",
            icon: UtensilsCrossed,
            color: "bg-emerald-100 text-emerald-600",
          },
          {
            href: "/admin/stats",
            label: "گزارشات",
            icon: TrendingUp,
            color: "bg-blue-100 text-blue-600",
          },
          {
            href: "/admin/inventory",
            label: "انبارداری",
            icon: Package,
            color: "bg-amber-100 text-amber-600",
          },
          {
            href: "/admin/rules",
            label: "قوانین سایت",
            icon: AlertTriangle,
            color: "bg-purple-100 text-purple-600",
          },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.color}`}
                >
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm">{link.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Software Support Section */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <HeadsetIcon className="w-5 h-5 text-blue-600" />
            پشتیبانی نرم‌افزار
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">اطلاعات تماس</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">تلفن پشتیبانی</p>
                    <p className="text-sm font-medium">۰۲۱-۸۸۷۷۶۶۵۵</p>
                    <p className="text-xs text-gray-500">داخلی ۲۰۱</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ایمیل</p>
                    <p className="text-sm font-medium">tech@smartchef.ir</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">آدرس</p>
                    <p className="text-sm">تهران، میدان ونک، برج سپهر، طبقه ۱۲</p>
                    <p className="text-xs text-gray-500">کدپستی: ۱۹۹۱۷۴۳۵۱۱</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ساعات کاری</p>
                    <p className="text-sm">شنبه تا چهارشنبه: ۹ صبح - ۶ عصر</p>
                    <p className="text-xs text-gray-500">پنج‌شنبه: ۹ صبح - ۲ بعدازظهر</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">پشتیبانی فوری</h4>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">مشکل فوری دارید؟</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  برای دریافت پشتیبانی فنی فوری با شماره زیر تماس بگیرید:
                </p>
                <a href="tel:09121234567" className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center font-medium mb-2">
                  ۰۹۱۲-۱۲۳-۴۵۶۷
                </a>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <MessageCircle className="w-4 h-4" />
                  چت آنلاین با پشتیبانی
                </Button>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-xs text-amber-800 dark:text-amber-200 mb-2">
                  <strong>نسخه نرم‌افزار:</strong> v2.1.0
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  <strong>آخرین بروزرسانی:</strong> ۱۴۰۴/۱۱/۱۵
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
