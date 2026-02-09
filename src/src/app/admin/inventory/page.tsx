"use client";

import { useState } from "react";
import {
  Package,
  AlertTriangle,
  Search,
  Plus,
  Edit,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogDescription,
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
import { mockInventory } from "@/lib/mock-data";
import { toast } from "sonner";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const categories = [...new Set(mockInventory.map((i) => i.category))];

  const filtered = mockInventory.filter((item) => {
    const matchSearch =
      !searchQuery || item.name.includes(searchQuery);
    const matchCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const lowStockCount = mockInventory.filter(
    (i) => i.quantity <= i.minQuantity
  ).length;

  const handleAdd = () => {
    toast.success("مورد جدید با موفقیت به انبار اضافه شد.");
    setShowAddDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">مدیریت انبار</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            موجودی مواد اولیه و کالاها را مدیریت کنید.
          </p>
        </div>
        <Button
          className="bg-amber-500 hover:bg-amber-600 gap-2"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4" />
          افزودن کالا
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 pb-3 px-4 text-center">
            <Package className="w-6 h-6 text-blue-600 mx-auto" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {mockInventory.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">کل اقلام</p>
          </CardContent>
        </Card>
        <Card className={lowStockCount > 0 ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950" : ""}>
          <CardContent className="pt-4 pb-3 px-4 text-center">
            <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {lowStockCount}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">کمبود موجودی</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4 text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {mockInventory.length - lowStockCount}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">موجودی کافی</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="جستجو در انبار..."
                className="pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه دسته‌ها</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام کالا</TableHead>
              <TableHead>دسته‌بندی</TableHead>
              <TableHead>موجودی</TableHead>
              <TableHead>حداقل موجودی</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead>آخرین بروزرسانی</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => {
              const isLow = item.quantity <= item.minQuantity;
              return (
                <TableRow key={item.id} className={isLow ? "bg-amber-50 dark:bg-amber-950" : ""}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={isLow ? "text-red-600 font-bold" : ""}>
                      {item.quantity} {item.unit}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.minQuantity} {item.unit}
                  </TableCell>
                  <TableCell>
                    {isLow ? (
                      <Badge variant="destructive" className="text-xs">
                        کمبود
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-xs text-emerald-600 border-emerald-300"
                      >
                        کافی
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {item.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>افزودن کالای جدید</DialogTitle>
            <DialogDescription>
              مشخصات کالای جدید را وارد کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>نام کالا</Label>
              <Input placeholder="مثلاً: برنج" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>واحد اندازه‌گیری</Label>
                <Input placeholder="مثلاً: کیلوگرم" />
              </div>
              <div className="space-y-2">
                <Label>موجودی فعلی</Label>
                <Input type="number" placeholder="0" dir="ltr" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>حداقل موجودی</Label>
                <Input type="number" placeholder="0" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>دسته‌بندی</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              انصراف
            </Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600"
              onClick={handleAdd}
            >
              ذخیره
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
