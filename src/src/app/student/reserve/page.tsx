"use client";

import { useState } from "react";
import {
  UtensilsCrossed,
  ShoppingCart,
  Check,
  ChevronLeft,
  CalendarDays,
  Coffee,
  Sun,
  Moon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  mockMenuSchedule,
  formatPrice,
  getMealLabel,
  FoodItem,
} from "@/lib/mock-data";
import { toast } from "sonner";

// Map Jalali date strings to JS Date objects for calendar (mock mapping)
const jalaliToGregorian: Record<string, Date> = {
  "1404/11/21": new Date(2026, 1, 10), // 21 Bahman 1404
  "1404/11/22": new Date(2026, 1, 11),
  "1404/11/23": new Date(2026, 1, 12),
};
const gregorianToJalali: Record<string, string> = {
  "2026-2-10": "1404/11/21",
  "2026-2-11": "1404/11/22",
  "2026-2-12": "1404/11/23",
};

const dateLabels: Record<string, string> = {
  "1404/11/21": "چهارشنبه ۲۱ بهمن",
  "1404/11/22": "پنج‌شنبه ۲۲ بهمن",
  "1404/11/23": "جمعه ۲۳ بهمن",
};

const mealOptions = [
  { value: "all", label: "همه وعده‌ها", icon: UtensilsCrossed },
  { value: "breakfast", label: "صبحانه", icon: Coffee },
  { value: "lunch", label: "ناهار", icon: Sun },
  { value: "dinner", label: "شام", icon: Moon },
];

const availableDates = ["1404/11/21", "1404/11/22", "1404/11/23"];

export default function ReservePage() {
  const [selectedDate, setSelectedDate] = useState("1404/11/21");
  const [selectedMeal, setSelectedMeal] = useState("all");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedPortion, setSelectedPortion] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(
    jalaliToGregorian["1404/11/21"]
  );

  // Available dates for the calendar (only dates with menus)
  const calendarAvailable = availableDates.map((d) => jalaliToGregorian[d]);

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) return;
    setCalendarDate(date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const jalali = gregorianToJalali[key];
    if (jalali) {
      setSelectedDate(jalali);
    }
  };

  // Filter menus by date and meal
  const menus = mockMenuSchedule.filter(
    (m) =>
      m.date === selectedDate &&
      (selectedMeal === "all" || m.meal === selectedMeal)
  );

  const handleReserve = (food: FoodItem) => {
    setSelectedFood(food);
    setSelectedPortion(0);
    setShowConfirm(true);
  };

  const confirmReserve = () => {
    if (selectedFood) {
      const portion = selectedFood.portionSizes[selectedPortion];
      const totalPrice = Math.round(
        selectedFood.price * portion.priceMultiplier
      );
      toast.success(
        `رزرو ${selectedFood.name} (${portion.label}) با موفقیت انجام شد. مبلغ: ${formatPrice(totalPrice)}`
      );
      setShowConfirm(false);
      setSelectedFood(null);
    }
  };

  // Check if a calendar date is available
  const isDateAvailable = (date: Date) => {
    return calendarAvailable.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          رزرو غذا
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          روز و وعده مورد نظر را انتخاب کنید و غذای خود را رزرو نمایید.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Main Content */}
        <div className="space-y-5">
          {/* Filters Row: Date buttons + Meal dropdown */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Date Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
              {availableDates.map((date) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? "default" : "outline"}
                  className={
                    selectedDate === date
                      ? "bg-emerald-600 hover:bg-emerald-700 shrink-0"
                      : "shrink-0"
                  }
                  onClick={() => {
                    setSelectedDate(date);
                    setCalendarDate(jalaliToGregorian[date]);
                  }}
                >
                  {dateLabels[date]}
                </Button>
              ))}
            </div>

            {/* Meal Dropdown */}
            <Select value={selectedMeal} onValueChange={setSelectedMeal}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="انتخاب وعده" />
              </SelectTrigger>
              <SelectContent>
                {mealOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <span className="flex items-center gap-2">
                      <opt.icon className="w-4 h-4" />
                      {opt.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected info badge */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge
              variant="outline"
              className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 gap-1"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              {dateLabels[selectedDate]}
            </Badge>
            {selectedMeal !== "all" && (
              <Badge
                variant="outline"
                className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
              >
                {getMealLabel(selectedMeal)}
              </Badge>
            )}
            <span className="text-gray-400">
              {menus.reduce((sum, m) => sum + m.foods.length, 0)} غذا موجود
            </span>
          </div>

          {/* Meal Sections */}
          {menus.length > 0 ? (
            <div className="space-y-6">
              {menus.map((menu) => (
                <div key={menu.id} className="space-y-3">
                  {/* Meal Header */}
                  <div className="flex items-center gap-2">
                    {menu.meal === "breakfast" && (
                      <Coffee className="w-4 h-4 text-amber-500" />
                    )}
                    {menu.meal === "lunch" && (
                      <Sun className="w-4 h-4 text-orange-500" />
                    )}
                    {menu.meal === "dinner" && (
                      <Moon className="w-4 h-4 text-indigo-500" />
                    )}
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {getMealLabel(menu.meal)}
                    </h2>
                    <Badge variant="secondary" className="text-xs">
                      {menu.foods.length} غذا
                    </Badge>
                  </div>

                  {/* Food Cards */}
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {menu.foods.map((food) => (
                      <Card
                        key={food.id}
                        className={`transition-all hover:shadow-md ${
                          !food.available ? "opacity-60" : "cursor-pointer"
                        }`}
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-3xl">{food.image}</span>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {food.name}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {food.calories} کالری
                                </p>
                              </div>
                            </div>
                            {!food.available && (
                              <Badge
                                variant="destructive"
                                className="text-xs"
                              >
                                ناموجود
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {food.description}
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="font-bold text-emerald-700">
                              {formatPrice(food.price)}
                            </span>
                            <Button
                              size="sm"
                              disabled={!food.available}
                              className="bg-emerald-600 hover:bg-emerald-700 gap-1"
                              onClick={() => handleReserve(food)}
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              رزرو
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <UtensilsCrossed className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  {selectedMeal !== "all"
                    ? `برنامه ${getMealLabel(selectedMeal)} برای این روز موجود نیست.`
                    : "برنامه غذایی برای این روز هنوز اعلام نشده است."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar: Calendar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-emerald-600" />
                تقویم رزرو
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <Calendar
                mode="single"
                selected={calendarDate}
                onSelect={handleCalendarSelect}
                modifiers={{
                  available: calendarAvailable,
                }}
                modifiersClassNames={{
                  available:
                    "!bg-emerald-100 dark:!bg-emerald-900 !text-emerald-800 dark:!text-emerald-200 font-bold",
                }}
                disabled={(date) => !isDateAvailable(date)}
                className="rounded-md"
              />
              <div className="mt-3 px-2 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-3 h-3 rounded bg-emerald-100 dark:bg-emerald-900 border border-emerald-300" />
                  روزهای دارای برنامه غذایی
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-3 h-3 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300" />
                  بدون برنامه
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Meal Summary for selected date */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                وعده‌های {dateLabels[selectedDate]?.split(" ").slice(1).join(" ")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockMenuSchedule
                .filter((m) => m.date === selectedDate)
                .map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => setSelectedMeal(menu.meal)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                      selectedMeal === menu.meal
                        ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {menu.meal === "breakfast" && (
                        <Coffee className="w-4 h-4" />
                      )}
                      {menu.meal === "lunch" && <Sun className="w-4 h-4" />}
                      {menu.meal === "dinner" && <Moon className="w-4 h-4" />}
                      {getMealLabel(menu.meal)}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {menu.foods.length}
                    </Badge>
                  </button>
                ))}
              {mockMenuSchedule.filter((m) => m.date === selectedDate)
                .length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">
                  بدون برنامه
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>تایید رزرو غذا</DialogTitle>
            <DialogDescription>
              لطفا اندازه پرس را انتخاب و رزرو خود را تایید کنید.
            </DialogDescription>
          </DialogHeader>
          {selectedFood && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-3xl">{selectedFood.image}</span>
                <div>
                  <p className="font-semibold">{selectedFood.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedDate} - {getMealLabel(menus.find(m => m.foods.includes(selectedFood))?.meal || "")}
                  </p>
                </div>
              </div>

              {/* Portion Selection */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  اندازه پرس:
                </p>
                <div className="flex gap-2">
                  {selectedFood.portionSizes.map((portion, idx) => (
                    <Button
                      key={idx}
                      variant={selectedPortion === idx ? "default" : "outline"}
                      className={
                        selectedPortion === idx
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : ""
                      }
                      onClick={() => setSelectedPortion(idx)}
                    >
                      {portion.label} -{" "}
                      {formatPrice(
                        Math.round(
                          selectedFood.price * portion.priceMultiplier
                        )
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">مبلغ قابل پرداخت</p>
                <p className="text-xl font-bold text-emerald-700">
                  {formatPrice(
                    Math.round(
                      selectedFood.price *
                        selectedFood.portionSizes[selectedPortion]
                          .priceMultiplier
                    )
                  )}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              انصراف
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 gap-1"
              onClick={confirmReserve}
            >
              <Check className="w-4 h-4" />
              تایید و رزرو
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
