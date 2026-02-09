"use client";

import { useState } from "react";
import {
  History,
  Search,
  Filter,
  QrCode,
  XCircle,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  mockReservations,
  formatPrice,
  getStatusLabel,
  getStatusBadgeVariant,
  getMealLabel,
  Reservation,
} from "@/lib/mock-data";
import { toast } from "sonner";

export default function HistoryPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filtered = mockReservations.filter((r) => {
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchSearch =
      !searchQuery ||
      r.foodItem.name.includes(searchQuery) ||
      r.date.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  const handleCancel = (id: string) => {
    toast.success("رزرو با موفقیت لغو شد. وجه به کیف پول شما بازگشت.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">تاریخچه سفارشات</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          لیست همه رزروها و سفارشات شما در یک نگاه.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="جستجو در سفارشات..."
                className="pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue placeholder="فیلتر وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="reserved">رزرو شده</SelectItem>
                <SelectItem value="paid">پرداخت شده</SelectItem>
                <SelectItem value="delivered">تحویل شده</SelectItem>
                <SelectItem value="cancelled">لغو شده</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>{filtered.length} سفارش یافت شد</span>
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>غذا</TableHead>
              <TableHead>تاریخ</TableHead>
              <TableHead>وعده</TableHead>
              <TableHead>پرس</TableHead>
              <TableHead>مبلغ</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((res) => (
              <TableRow key={res.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{res.foodItem.image}</span>
                    <span className="font-medium">{res.foodItem.name}</span>
                  </div>
                </TableCell>
                <TableCell>{res.date}</TableCell>
                <TableCell>{getMealLabel(res.meal)}</TableCell>
                <TableCell>{res.portion}</TableCell>
                <TableCell className="font-medium">
                  {formatPrice(res.totalPrice)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(res.status)}>
                    {getStatusLabel(res.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedRes(res);
                        setShowDetail(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {(res.status === "reserved" || res.status === "paid") && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleCancel(res.id)}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((res) => (
          <Card key={res.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{res.foodItem.image}</span>
                  <div>
                    <p className="font-medium text-sm">
                      {res.foodItem.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {res.date} - {getMealLabel(res.meal)} - {res.portion}
                    </p>
                  </div>
                </div>
                <Badge variant={getStatusBadgeVariant(res.status)} className="text-xs">
                  {getStatusLabel(res.status)}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="font-bold text-sm">
                  {formatPrice(res.totalPrice)}
                </span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedRes(res);
                      setShowDetail(true);
                    }}
                  >
                    <Eye className="w-3.5 h-3.5 ml-1" />
                    جزئیات
                  </Button>
                  {(res.status === "reserved" || res.status === "paid") && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 border-red-200"
                      onClick={() => handleCancel(res.id)}
                    >
                      لغو
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">سفارشی با این مشخصات یافت نشد.</p>
          </CardContent>
        </Card>
      )}

      {/* Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>جزئیات سفارش</DialogTitle>
          </DialogHeader>
          {selectedRes && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-3xl">{selectedRes.foodItem.image}</span>
                <div>
                  <p className="font-semibold">{selectedRes.foodItem.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedRes.foodItem.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-500 dark:text-gray-400">تاریخ</p>
                  <p className="font-medium">{selectedRes.date}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-500 dark:text-gray-400">وعده</p>
                  <p className="font-medium">{getMealLabel(selectedRes.meal)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-500 dark:text-gray-400">پرس</p>
                  <p className="font-medium">{selectedRes.portion}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-500 dark:text-gray-400">مبلغ</p>
                  <p className="font-medium">
                    {formatPrice(selectedRes.totalPrice)}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                <Badge variant={getStatusBadgeVariant(selectedRes.status)} className="mb-2">
                  {getStatusLabel(selectedRes.status)}
                </Badge>
                {(selectedRes.status === "paid" ||
                  selectedRes.status === "reserved") && (
                  <div className="mt-2">
                    <QrCode className="w-16 h-16 text-gray-600 mx-auto" />
                    <p className="text-xs text-gray-500 mt-1">
                      کد: {selectedRes.qrCode}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetail(false)}>
              بستن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
