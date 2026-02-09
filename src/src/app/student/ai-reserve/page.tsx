"use client";

import { Brain, Sparkles, ShoppingCart, Check, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  mockAIRecommendations,
  formatPrice,
  mockFoods,
} from "@/lib/mock-data";
import { toast } from "sonner";

export default function AIReservePage() {
  const handleReserve = (foodName: string) => {
    toast.success(`رزرو ${foodName} با موفقیت ثبت شد.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            پیشنهاد هوشمند غذا
          </h1>
          <p className="text-sm text-gray-500">
            بر اساس سابقه سفارشات و سلیقه شما، بهترین غذاها را پیشنهاد
            می‌دهیم.
          </p>
        </div>
      </div>

      {/* AI Analysis Card */}
      <Card className="border-purple-200 bg-gradient-to-l from-purple-50 to-white">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <strong>تحلیل هوش مصنوعی:</strong> با بررسی ۵ سفارش اخیر شما،
                متوجه شدیم که بیشتر به غذاهای با گوشت و مرغ علاقه‌مندید. همچنین
                معمولاً وعده ناهار را رزرو می‌کنید.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-300"
                >
                  🍖 علاقه به پروتئین
                </Badge>
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-300"
                >
                  🕐 وعده ناهار
                </Badge>
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-300"
                >
                  📊 پرس معمولی
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900">
          پیشنهادات ویژه برای شما
        </h2>
        {mockAIRecommendations.map((rec, idx) => (
          <Card
            key={idx}
            className={`transition-all hover:shadow-md ${
              idx === 0 ? "border-purple-300 ring-1 ring-purple-200" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="text-4xl">{rec.foodItem.image}</div>
                    {idx === 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {rec.foodItem.name}
                      </h3>
                      {idx === 0 && (
                        <Badge className="bg-purple-100 text-purple-700 text-xs">
                          بهترین انتخاب
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{rec.reason}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm font-bold text-emerald-600">
                        {formatPrice(rec.foodItem.price)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {rec.foodItem.calories} کالری
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {rec.matchScore}%
                    </div>
                    <div className="text-xs text-gray-400">تطابق</div>
                  </div>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 gap-1"
                    onClick={() => handleReserve(rec.foodItem.name)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    رزرو
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular This Week */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900">
          محبوب‌ترین غذاهای این هفته
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {mockFoods
            .filter((f) => f.available)
            .slice(0, 4)
            .map((food, idx) => (
              <Card key={food.id} className="hover:shadow-sm transition-all">
                <CardContent className="p-3 text-center space-y-2">
                  <div className="text-3xl">{food.image}</div>
                  <p className="font-medium text-sm">{food.name}</p>
                  <p className="text-sm font-bold text-emerald-600">
                    {formatPrice(food.price)}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    #{idx + 1} محبوب
                  </Badge>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
