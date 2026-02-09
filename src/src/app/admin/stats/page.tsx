"use client";

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockDailyStats, formatPrice } from "@/lib/mock-data";

export default function StatsPage() {
  const totalOrders = mockDailyStats.reduce((a, b) => a + b.totalOrders, 0);
  const totalRevenue = mockDailyStats.reduce((a, b) => a + b.totalRevenue, 0);
  const totalCancelled = mockDailyStats.reduce(
    (a, b) => a + b.cancelledOrders,
    0
  );
  const avgOrders = Math.round(totalOrders / mockDailyStats.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">آمار و گزارشات</h1>
        <p className="text-sm text-gray-500 mt-1">
          نمای کلی از عملکرد سامانه در هفته اخیر
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-xs text-blue-600">کل سفارشات</p>
            <p className="text-2xl font-bold text-blue-800 mt-1">
              {totalOrders.toLocaleString("fa-IR")}
            </p>
            <p className="text-xs text-blue-500 mt-1">در ۷ روز اخیر</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-xs text-emerald-600">کل درآمد</p>
            <p className="text-xl font-bold text-emerald-800 mt-1">
              {formatPrice(totalRevenue)}
            </p>
            <p className="text-xs text-emerald-500 mt-1">در ۷ روز اخیر</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-xs text-amber-600">میانگین سفارش روزانه</p>
            <p className="text-2xl font-bold text-amber-800 mt-1">
              {avgOrders.toLocaleString("fa-IR")}
            </p>
            <p className="text-xs text-amber-500 mt-1">سفارش در روز</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-xs text-red-600">لغو شده‌ها</p>
            <p className="text-2xl font-bold text-red-800 mt-1">
              {totalCancelled.toLocaleString("fa-IR")}
            </p>
            <p className="text-xs text-red-500 mt-1">
              {((totalCancelled / totalOrders) * 100).toFixed(1)}% از کل
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Simulation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            نمودار سفارشات ۷ روز اخیر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-48 px-4">
            {mockDailyStats.map((stat, idx) => {
              const maxOrders = Math.max(...mockDailyStats.map((s) => s.totalOrders));
              const height = (stat.totalOrders / maxOrders) * 100;
              const isMax = stat.totalOrders === maxOrders;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-500 font-medium">
                    {stat.totalOrders}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      isMax ? "bg-emerald-500" : "bg-blue-400"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-400">
                    {stat.date.slice(-2)}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            جزئیات روزانه
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>تاریخ</TableHead>
                <TableHead>صبحانه</TableHead>
                <TableHead>ناهار</TableHead>
                <TableHead>شام</TableHead>
                <TableHead>کل سفارشات</TableHead>
                <TableHead>لغو شده</TableHead>
                <TableHead>درآمد</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDailyStats.map((stat) => (
                <TableRow key={stat.date}>
                  <TableCell className="font-medium">{stat.date}</TableCell>
                  <TableCell>{stat.breakfastOrders}</TableCell>
                  <TableCell>{stat.lunchOrders}</TableCell>
                  <TableCell>{stat.dinnerOrders}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{stat.totalOrders}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="text-xs">
                      {stat.cancelledOrders}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-emerald-700">
                    {formatPrice(stat.totalRevenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
