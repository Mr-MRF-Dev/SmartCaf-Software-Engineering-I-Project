"use client";

import { useState } from "react";
import {
  UtensilsCrossed,
  ShoppingCart,
  Check,
  ChevronLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function ReservePage() {
  const [selectedDate, setSelectedDate] = useState("1404/11/21");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedPortion, setSelectedPortion] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const dates = ["1404/11/21", "1404/11/22", "1404/11/23"];
  const dateLabels: Record<string, string> = {
    "1404/11/21": "چهارشنبه ۲۱ بهمن",
    "1404/11/22": "پنج‌شنبه ۲۲ بهمن",
    "1404/11/23": "جمعه ۲۳ بهمن",
  };

  const menus = mockMenuSchedule.filter((m) => m.date === selectedDate);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">رزرو غذا</h1>
        <p className="text-sm text-gray-500 mt-1">
          روز مورد نظر را انتخاب کنید و غذای خود را رزرو نمایید.
        </p>
      </div>

      {/* Date Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dates.map((date) => (
          <Button
            key={date}
            variant={selectedDate === date ? "default" : "outline"}
            className={
              selectedDate === date
                ? "bg-emerald-600 hover:bg-emerald-700"
                : ""
            }
            onClick={() => setSelectedDate(date)}
          >
            {dateLabels[date]}
          </Button>
        ))}
      </div>

      {/* Meal Sections */}
      {menus.length > 0 ? (
        <Tabs defaultValue={menus[0]?.meal} className="space-y-4">
          <TabsList>
            {menus.map((menu) => (
              <TabsTrigger key={menu.id} value={menu.meal}>
                {getMealLabel(menu.meal)}
              </TabsTrigger>
            ))}
          </TabsList>

          {menus.map((menu) => (
            <TabsContent key={menu.id} value={menu.meal}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                            <h3 className="font-semibold text-gray-900">
                              {food.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {food.calories} کالری
                            </p>
                          </div>
                        </div>
                        {!food.available && (
                          <Badge variant="destructive" className="text-xs">
                            ناموجود
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
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
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <UtensilsCrossed className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              برنامه غذایی برای این روز هنوز اعلام نشده است.
            </p>
          </CardContent>
        </Card>
      )}

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
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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
                <p className="text-sm font-medium text-gray-700">
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

              <div className="p-3 bg-emerald-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">مبلغ قابل پرداخت</p>
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
