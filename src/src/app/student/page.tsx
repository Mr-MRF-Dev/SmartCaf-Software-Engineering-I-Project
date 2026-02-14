"use client";

import { useState } from "react";
import {
  UtensilsCrossed,
  CreditCard,
  History,
  Brain,
  TrendingUp,
  Bell,
  CalendarDays,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Star,
  Send,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
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
    (r) => r.status === "reserved" || r.status === "paid",
  );
  const todayMenu = mockMenuSchedule.filter((m) => m.date === "1404/11/21");

  // Rating & Comment state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mockComments, setMockComments] = useState([
    {
      id: 1,
      user: "علی محمدی",
      avatar: "عم",
      rating: 5,
      comment: "غذای امروز عالی بود! جوجه‌کباب خیلی خوشمزه بود.",
      date: "۱۴۰۴/۱۱/۲۱",
      likes: 12,
      meal: "ناهار",
    },
    {
      id: 2,
      user: "زهرا احمدی",
      avatar: "زا",
      rating: 4,
      comment: "کیفیت برنج خوب بود ولی خورشت کمی شور بود. در کل راضی هستم.",
      date: "۱۴۰۴/۱۱/۲۱",
      likes: 8,
      meal: "ناهار",
    },
    {
      id: 3,
      user: "محمد رضایی",
      avatar: "مر",
      rating: 3,
      comment: "غذا معمولی بود. انتظار تنوع بیشتری در منو دارم.",
      date: "۱۴۰۴/۱۱/۲۰",
      likes: 5,
      meal: "شام",
    },
    {
      id: 4,
      user: "فاطمه کریمی",
      avatar: "فک",
      rating: 5,
      comment: "سلف خیلی تمیز بود و برخورد پرسنل عالی بود. دست‌پخت خوبی داشت.",
      date: "۱۴۰۴/۱۱/۲۰",
      likes: 15,
      meal: "ناهار",
    },
  ]);

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast.error("لطفا امتیاز خود را انتخاب کنید.");
      return;
    }
    if (!comment.trim()) {
      toast.error("لطفا نظر خود را بنویسید.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    const newComment = {
      id: mockComments.length + 1,
      user: user.name,
      avatar: user.name.slice(0, 2),
      rating,
      comment: comment.trim(),
      date: "۱۴۰۴/۱۱/۲۱",
      likes: 0,
      meal: "ناهار",
    };
    setMockComments([newComment, ...mockComments]);
    setRating(0);
    setComment("");
    setSubmitting(false);
    toast.success("نظر شما با موفقیت ثبت شد. ممنون از بازخورد شما!");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            سلام، {user.name}! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
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
        <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  موجودی کیف پول
                </p>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
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
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  رزروهای فعال
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
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
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  کل سفارشات
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
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
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  اعلان‌ها
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  ۲ جدید
                </p>
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
                <div key={menu.id} className="border rounded-lg p-3 space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {getMealLabel(menu.meal)}
                  </Badge>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {menu.foods.map((food) => (
                      <div
                        key={food.id}
                        className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 rounded-md px-2 py-1 text-sm"
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
                      <p className="text-sm font-medium">{res.foodItem.name}</p>
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
      <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-l from-purple-50 to-white dark:from-purple-950 dark:to-gray-900">
        <CardContent className="py-5 px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                پیشنهاد هوشمند غذا
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                بر اساس سلیقه و سابقه سفارشاتتان، بهترین غذا را پیشنهاد می‌دهیم.
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
          <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              برنامه غذایی فردا ۱۴۰۴/۱۱/۲۲ اعلام شد. همین الان رزرو کنید.
            </p>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-950">
            <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              سفارش جوجه‌کباب شما برای شام امشب آماده تحویل است. کد QR خود را
              همراه داشته باشید.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support Section */}
      <Card className="border-red-200 dark:border-red-800 bg-gradient-to-l from-red-50 to-white dark:from-red-950 dark:to-gray-900">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900 flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  پشتیبانی فوری
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  مشکلی دارید؟ تیم پشتیبانی ما ۲۴ ساعته آماده کمک به شماست.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="tel:02188776655"
                    className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <Phone className="w-4 h-4" />
                    ۰۲۱-۸۸۷۷۶۶۵۵
                  </a>
                  <a
                    href="mailto:support@smartchef.ir"
                    className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <Mail className="w-4 h-4" />
                    support@smartchef.ir
                  </a>
                </div>
              </div>
            </div>
            <Link href="/student/support">
              <Button className="bg-red-600 hover:bg-red-700 gap-2 shrink-0">
                <MessageCircle className="w-4 h-4" />
                ایجاد تیکت
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Rating & Comment Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            امتیازدهی و نظرات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Submit Review Form */}
          <div className="border rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              نظر خود را درباره غذای امروز بنویسید
            </h4>

            {/* Star Rating */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">امتیاز شما:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {rating === 1 && "ضعیف"}
                  {rating === 2 && "متوسط"}
                  {rating === 3 && "خوب"}
                  {rating === 4 && "خیلی خوب"}
                  {rating === 5 && "عالی"}
                </span>
              )}
            </div>

            {/* Comment Input */}
            <Textarea
              placeholder="نظر خود را اینجا بنویسید..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[80px] resize-none"
            />

            <Button
              onClick={handleSubmitReview}
              disabled={submitting}
              className="bg-emerald-600 hover:bg-emerald-700 gap-2"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {submitting ? "در حال ارسال..." : "ثبت نظر"}
            </Button>
          </div>

          {/* Average Rating */}
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">
                {(mockComments.reduce((sum, c) => sum + c.rating, 0) / mockComments.length).toFixed(1)}
              </p>
              <div className="flex items-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(mockComments.reduce((sum, c) => sum + c.rating, 0) / mockComments.length)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">{mockComments.length} نظر</p>
            </div>
            <div className="flex-1 space-y-1 mr-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = mockComments.filter((c) => c.rating === star).length;
                const percentage = (count / mockComments.length) * 100;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-gray-500">{star}</span>
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-6 text-gray-400 text-left">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {mockComments.map((c) => (
              <div key={c.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                        {c.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{c.user}</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= c.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <Badge variant="outline" className="text-xs">{c.meal}</Badge>
                    <p className="text-xs text-gray-400 mt-1">{c.date}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 pr-10">{c.comment}</p>
                <div className="flex items-center gap-1 pr-10">
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {c.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
