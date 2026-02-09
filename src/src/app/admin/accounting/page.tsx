"use client";

import {
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Receipt,
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  mockDailyStats,
  mockTransactions,
  formatPrice,
  getTransactionTypeLabel,
} from "@/lib/mock-data";

const revenueChartConfig = {
  totalRevenue: {
    label: "درآمد (تومان)",
    color: "#10b981",
  },
} satisfies ChartConfig;

export default function AccountingPage() {
  const totalRevenue = mockDailyStats.reduce((a, b) => a + b.totalRevenue, 0);
  const totalPayments = mockTransactions
    .filter((t) => t.type === "payment" && t.status === "success")
    .reduce((a, b) => a + b.amount, 0);
  const totalRefunds = mockTransactions
    .filter((t) => t.type === "refund" && t.status === "success")
    .reduce((a, b) => a + b.amount, 0);
  const totalCharges = mockTransactions
    .filter((t) => t.type === "charge" && t.status === "success")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">حسابداری و مالی</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          گزارشات مالی و تراکنش‌های سامانه
        </p>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <p className="text-xs text-emerald-600 dark:text-emerald-400">کل درآمد هفته</p>
            </div>
            <p className="text-xl font-bold text-emerald-800 dark:text-emerald-300">
              {formatPrice(totalRevenue)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownCircle className="w-5 h-5 text-blue-600" />
              <p className="text-xs text-blue-600 dark:text-blue-400">پرداخت‌ها</p>
            </div>
            <p className="text-xl font-bold text-blue-800 dark:text-blue-300">
              {formatPrice(totalPayments)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpCircle className="w-5 h-5 text-amber-600" />
              <p className="text-xs text-amber-600 dark:text-amber-400">بازگشت وجوه</p>
            </div>
            <p className="text-xl font-bold text-amber-800 dark:text-amber-300">
              {formatPrice(totalRefunds)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-5 h-5 text-purple-600" />
              <p className="text-xs text-purple-600 dark:text-purple-400">شارژ کیف پول</p>
            </div>
            <p className="text-xl font-bold text-purple-800 dark:text-purple-300">
              {formatPrice(totalCharges)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Day */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            درآمد روزانه
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueChartConfig} className="h-56 w-full">
            <BarChart
              data={mockDailyStats.map((s) => ({
                date: s.date.slice(-5),
                totalRevenue: s.totalRevenue,
              }))}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      `${Number(value).toLocaleString("fa-IR")} تومان`
                    }
                  />
                }
              />
              <Bar dataKey="totalRevenue" fill="var(--color-totalRevenue)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="w-4 h-4 text-gray-600" />
            آخرین تراکنش‌ها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شناسه</TableHead>
                <TableHead>نوع</TableHead>
                <TableHead>توضیحات</TableHead>
                <TableHead>مبلغ</TableHead>
                <TableHead>تاریخ</TableHead>
                <TableHead>وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.type === "charge"
                          ? "default"
                          : tx.type === "refund"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {getTransactionTypeLabel(tx.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{tx.description}</TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        tx.type === "payment"
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {tx.type === "payment" ? "-" : "+"}
                      {formatPrice(tx.amount)}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {tx.date}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.status === "success"
                          ? "default"
                          : tx.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {tx.status === "success"
                        ? "موفق"
                        : tx.status === "pending"
                        ? "در انتظار"
                        : "ناموفق"}
                    </Badge>
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
