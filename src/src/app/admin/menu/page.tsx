"use client";

import { useState } from "react";
import {
  UtensilsCrossed,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Save,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockMenuSchedule,
  mockFoods,
  formatPrice,
  getMealLabel,
  FoodItem,
} from "@/lib/mock-data";
import { toast } from "sonner";

export default function MenuManagementPage() {
  const [selectedDate, setSelectedDate] = useState("1404/11/21");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addMeal, setAddMeal] = useState<string>("lunch");
  const [addFood, setAddFood] = useState<string>("");

  const dates = ["1404/11/21", "1404/11/22", "1404/11/23"];
  const dateLabels: Record<string, string> = {
    "1404/11/21": "چهارشنبه ۲۱ بهمن",
    "1404/11/22": "پنج‌شنبه ۲۲ بهمن",
    "1404/11/23": "جمعه ۲۳ بهمن",
  };

  const menus = mockMenuSchedule.filter((m) => m.date === selectedDate);

  const handleRemoveFood = (menuId: string, foodId: string) => {
    toast.success("غذا از برنامه غذایی حذف شد.");
  };

  const handleAddFood = () => {
    if (!addFood) {
      toast.error("لطفا یک غذا انتخاب کنید.");
      return;
    }
    toast.success("غذا به برنامه غذایی اضافه شد.");
    setShowAddDialog(false);
    setAddFood("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            تعیین برنامه غذایی
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            برنامه غذایی هر روز را مدیریت کنید.
          </p>
        </div>
        <Button
          className="bg-amber-500 hover:bg-amber-600 gap-2"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4" />
          افزودن غذا
        </Button>
      </div>

      {/* Date Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dates.map((date) => (
          <Button
            key={date}
            variant={selectedDate === date ? "default" : "outline"}
            className={
              selectedDate === date
                ? "bg-slate-800 hover:bg-slate-900"
                : ""
            }
            onClick={() => setSelectedDate(date)}
          >
            <CalendarDays className="w-4 h-4 ml-1" />
            {dateLabels[date]}
          </Button>
        ))}
      </div>

      {/* Menu for selected date */}
      {menus.length > 0 ? (
        <div className="space-y-4">
          {menus.map((menu) => (
            <Card key={menu.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge variant="outline">{getMealLabel(menu.meal)}</Badge>
                    {menu.foods.length} غذا
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {menu.foods.map((food) => (
                    <div
                      key={food.id}
                      className="border rounded-lg p-3 flex items-start justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{food.image}</span>
                        <div>
                          <p className="font-medium text-sm">{food.name}</p>
                          <p className="text-xs text-gray-500">
                            {formatPrice(food.price)} | {food.calories} کالری
                          </p>
                          <Badge
                            variant={food.available ? "default" : "destructive"}
                            className="text-xs mt-1"
                          >
                            {food.available ? "فعال" : "غیرفعال"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-7 h-7 text-gray-400 hover:text-blue-600"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-7 h-7 text-gray-400 hover:text-red-600"
                          onClick={() =>
                            handleRemoveFood(menu.id, food.id)
                          }
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <UtensilsCrossed className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              برنامه غذایی برای این روز تنظیم نشده است.
            </p>
            <Button
              className="mt-3 bg-amber-500 hover:bg-amber-600"
              onClick={() => setShowAddDialog(true)}
            >
              افزودن غذا
            </Button>
          </CardContent>
        </Card>
      )}

      {/* All Foods List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">لیست کل غذاها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {mockFoods.map((food) => (
              <div
                key={food.id}
                className={`border rounded-lg p-3 text-center space-y-1 ${
                  !food.available ? "opacity-60 bg-gray-50" : ""
                }`}
              >
                <div className="text-2xl">{food.image}</div>
                <p className="font-medium text-sm">{food.name}</p>
                <p className="text-xs text-gray-500">
                  {formatPrice(food.price)}
                </p>
                <Badge
                  variant={food.available ? "outline" : "destructive"}
                  className="text-xs"
                >
                  {food.available ? "موجود" : "ناموجود"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Food Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>افزودن غذا به برنامه</DialogTitle>
            <DialogDescription>
              غذا و وعده مورد نظر را انتخاب کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>تاریخ</Label>
              <Input value={dateLabels[selectedDate]} disabled />
            </div>
            <div className="space-y-2">
              <Label>وعده</Label>
              <Select value={addMeal} onValueChange={setAddMeal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">صبحانه</SelectItem>
                  <SelectItem value="lunch">ناهار</SelectItem>
                  <SelectItem value="dinner">شام</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>غذا</Label>
              <Select value={addFood} onValueChange={setAddFood}>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب غذا" />
                </SelectTrigger>
                <SelectContent>
                  {mockFoods
                    .filter((f) => f.available)
                    .map((food) => (
                      <SelectItem key={food.id} value={food.id}>
                        {food.image} {food.name} - {formatPrice(food.price)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              انصراف
            </Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600 gap-1"
              onClick={handleAddFood}
            >
              <Save className="w-4 h-4" />
              ذخیره
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
