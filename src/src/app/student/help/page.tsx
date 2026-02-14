"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  AlertTriangle,
  Search,
  UtensilsCrossed,
  CreditCard,
  Brain,
  QrCode,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// FAQ Data
const faqs = [
  {
    category: "رزرو غذا",
    icon: UtensilsCrossed,
    questions: [
      {
        q: "چگونه غذا رزرو کنم؟",
        a: "از منوی «رزرو غذا» وارد شوید، تاریخ و وعده مورد نظر را انتخاب کنید، سپس غذای دلخواه و سایز پرس را مشخص کرده و روی «ثبت رزرو» کلیک کنید. مبلغ از کیف پول شما کسر می‌شود.",
      },
      {
        q: "آیا امکان لغو رزرو وجود دارد؟",
        a: "بله، تا ۲ ساعت قبل از شروع وعده غذایی می‌توانید رزرو خود را لغو کنید. مبلغ پرداختی به کیف پول شما بازگشت داده می‌شود. بعد از این زمان امکان لغو وجود ندارد.",
      },
      {
        q: "حداکثر چند وعده در روز می‌توانم رزرو کنم؟",
        a: "هر دانشجو می‌تواند برای هر وعده (صبحانه، ناهار، شام) یک رزرو داشته باشد. یعنی حداکثر ۳ رزرو در روز امکان‌پذیر است.",
      },
      {
        q: "آیا می‌توانم برای روزهای آینده رزرو کنم؟",
        a: "بله، برنامه غذایی معمولاً تا ۷ روز آینده منتشر می‌شود و شما می‌توانید برای هر روزی که برنامه اعلام شده رزرو ثبت کنید.",
      },
      {
        q: "تفاوت سایز پرس معمولی و بزرگ چیست؟",
        a: "پرس معمولی شامل یک واحد استاندارد غذاست. پرس بزرگ حدود ۱.۵ برابر پرس معمولی است و مناسب افرادی است که نیاز به حجم بیشتر غذا دارند.",
      },
    ],
  },
  {
    category: "پرداخت و کیف پول",
    icon: CreditCard,
    questions: [
      {
        q: "چگونه کیف پول خود را شارژ کنم؟",
        a: "از بخش «پرداخت» می‌توانید با وارد کردن مبلغ دلخواه و پرداخت آنلاین از طریق درگاه بانکی، کیف پول خود را شارژ کنید. حداقل مبلغ شارژ ۵۰,۰۰۰ تومان است.",
      },
      {
        q: "آیا پرداخت امن است؟",
        a: "بله، تمامی پرداخت‌ها از طریق درگاه معتبر بانکی و با رمزنگاری SSL انجام می‌شود. اطلاعات کارت بانکی شما در سیستم ذخیره نمی‌شود.",
      },
      {
        q: "چرا مبلغ از حسابم کسر شده ولی کیف پول شارژ نشده؟",
        a: "در موارد نادر ممکن است تراکنش در مرحله بازگشت از بانک دچار مشکل شود. معمولاً مبلغ تا ۷۲ ساعت به حسابتان برگشت داده می‌شود. در غیر این صورت تیکت پشتیبانی ثبت کنید.",
      },
      {
        q: "آیا امکان انتقال موجودی به دانشجوی دیگر وجود دارد؟",
        a: "خیر، در حال حاضر امکان انتقال موجودی بین کیف‌ پول‌ها وجود ندارد. هر دانشجو باید کیف پول خود را شارژ کند.",
      },
    ],
  },
  {
    category: "پیشنهاد هوشمند",
    icon: Brain,
    questions: [
      {
        q: "پیشنهاد هوشمند چگونه کار می‌کند؟",
        a: "سیستم هوش مصنوعی اسمارت کف بر اساس سابقه سفارشات، امتیازات و نظرات شما، و همچنین ترجیحات غذایی‌تان، بهترین غذاها را برای هر وعده پیشنهاد می‌دهد.",
      },
      {
        q: "آیا می‌توانم محدودیت غذایی خود را مشخص کنم؟",
        a: "بله، در تنظیمات پروفایل می‌توانید آلرژی‌ها و محدودیت‌های غذایی خود را مشخص کنید تا سیستم در پیشنهادات لحاظ کند.",
      },
      {
        q: "دقت پیشنهادات هوشمند چقدر است؟",
        a: "هرچه بیشتر از سیستم استفاده کنید و نظرات خود را ثبت کنید، پیشنهادات دقیق‌تر می‌شود. معمولاً بعد از ۱۰ سفارش، دقت سیستم به‌طور قابل توجهی افزایش می‌یابد.",
      },
    ],
  },
  {
    category: "تحویل غذا و QR Code",
    icon: QrCode,
    questions: [
      {
        q: "کد QR چیست و چگونه استفاده کنم؟",
        a: "پس از ثبت و پرداخت رزرو، یک کد QR اختصاصی برای شما صادر می‌شود. هنگام مراجعه به سلف، این کد را به دستگاه اسکنر نشان دهید تا غذای شما تحویل داده شود.",
      },
      {
        q: "اگر کد QR کار نکرد چه کنم؟",
        a: "ابتدا مطمئن شوید نور صفحه‌نمایش کافی است. اگر مشکل ادامه داشت، کد عددی زیر QR Code را به صورت دستی به اپراتور سلف اعلام کنید. همچنین می‌توانید از بخش تاریخچه، کد QR را مجدداً مشاهده کنید.",
      },
      {
        q: "تا چه زمانی فرصت تحویل غذا دارم؟",
        a: "غذا باید در بازه زمانی وعده مربوطه تحویل گرفته شود. ناهار: ۱۱:۳۰ تا ۱۴:۰۰ و شام: ۱۸:۰۰ تا ۲۰:۳۰. پس از اتمام زمان، تحویل امکان‌پذیر نیست.",
      },
    ],
  },
  {
    category: "قوانین و مقررات",
    icon: ShieldCheck,
    questions: [
      {
        q: "آیا محدودیتی در تعداد لغو رزرو وجود دارد؟",
        a: "بله، هر دانشجو حداکثر ۵ بار در ماه اجازه لغو رزرو دارد. بعد از آن، جریمه‌ای معادل ۱۰٪ مبلغ غذا در نظر گرفته می‌شود.",
      },
      {
        q: "اگر غذا تحویل نگیرم چه می‌شود؟",
        a: "اگر رزرو کنید ولی غذا تحویل نگیرید، مبلغ بازگشت داده نمی‌شود. بیش از ۳ بار عدم تحویل در ماه ممکن است منجر به محدودیت موقت رزرو شود.",
      },
    ],
  },
];

// Error Codes
const errorCodes = [
  {
    code: "ERR-1001",
    title: "خطای احراز هویت",
    description: "نام کاربری یا رمز عبور اشتباه است.",
    solution: "رمز عبور خود را بررسی کنید. اگر فراموش کرده‌اید از «بازیابی رمز عبور» استفاده کنید.",
    severity: "medium",
  },
  {
    code: "ERR-1002",
    title: "حساب کاربری قفل شده",
    description: "بعد از ۵ بار ورود ناموفق متوالی، حساب شما به مدت ۳۰ دقیقه قفل می‌شود.",
    solution: "۳۰ دقیقه صبر کنید و مجدداً تلاش کنید. در صورت ادامه مشکل با پشتیبانی تماس بگیرید.",
    severity: "high",
  },
  {
    code: "ERR-2001",
    title: "موجودی ناکافی",
    description: "موجودی کیف پول شما برای ثبت این رزرو کافی نیست.",
    solution: "ابتدا کیف پول خود را از بخش «پرداخت» شارژ کنید و سپس مجدداً رزرو را ثبت نمایید.",
    severity: "medium",
  },
  {
    code: "ERR-2002",
    title: "خطای درگاه پرداخت",
    description: "اتصال به درگاه بانکی با مشکل مواجه شده است.",
    solution: "اتصال اینترنت خود را بررسی کنید. از VPN استفاده نکنید. چند دقیقه بعد مجدداً تلاش کنید.",
    severity: "high",
  },
  {
    code: "ERR-2003",
    title: "تراکنش ناموفق",
    description: "عملیات پرداخت توسط بانک تأیید نشد.",
    solution: "مبلغ در صورت کسر از حساب، تا ۷۲ ساعت بازگشت داده می‌شود. در غیر این صورت تیکت ثبت کنید.",
    severity: "high",
  },
  {
    code: "ERR-3001",
    title: "ظرفیت تکمیل",
    description: "ظرفیت رزرو برای این وعده غذایی به حداکثر رسیده است.",
    solution: "وعده یا تاریخ دیگری را انتخاب کنید. می‌توانید از «پیشنهاد هوشمند» برای یافتن جایگزین استفاده کنید.",
    severity: "medium",
  },
  {
    code: "ERR-3002",
    title: "خطای رزرو تکراری",
    description: "شما قبلاً برای این وعده و تاریخ رزرو ثبت کرده‌اید.",
    solution: "هر دانشجو فقط یک رزرو برای هر وعده مجاز است. برای تغییر، ابتدا رزرو قبلی را لغو کنید.",
    severity: "low",
  },
  {
    code: "ERR-3003",
    title: "مهلت رزرو به پایان رسیده",
    description: "زمان ثبت یا لغو رزرو برای این وعده به پایان رسیده است.",
    solution: "رزرو باید حداقل ۲ ساعت قبل از شروع وعده ثبت یا لغو شود.",
    severity: "medium",
  },
  {
    code: "ERR-3004",
    title: "محدودیت لغو ماهانه",
    description: "شما به حداکثر تعداد لغو مجاز در ماه رسیده‌اید (۵ بار).",
    solution: "لغو بیشتر مشمول جریمه ۱۰٪ مبلغ غذا خواهد بود. برای موارد استثنایی با پشتیبانی تماس بگیرید.",
    severity: "medium",
  },
  {
    code: "ERR-4001",
    title: "کد QR نامعتبر",
    description: "کد QR شما منقضی شده یا قبلاً استفاده شده است.",
    solution: "از بخش تاریخچه، وضعیت رزرو خود را بررسی کنید. در صورت مشکل با اپراتور سلف هماهنگ کنید.",
    severity: "high",
  },
  {
    code: "ERR-4002",
    title: "خارج از بازه تحویل",
    description: "زمان تحویل غذا برای این وعده به پایان رسیده است.",
    solution: "ناهار: ۱۱:۳۰–۱۴:۰۰ / شام: ۱۸:۰۰–۲۰:۳۰. لطفاً در بازه مجاز مراجعه کنید.",
    severity: "medium",
  },
  {
    code: "ERR-5001",
    title: "خطای سرور",
    description: "خطای داخلی سرور رخ داده است.",
    solution: "لطفاً چند دقیقه صبر کنید و مجدداً تلاش کنید. اگر مشکل ادامه داشت تیکت پشتیبانی ثبت کنید.",
    severity: "critical",
  },
  {
    code: "ERR-5002",
    title: "خطای اتصال به شبکه",
    description: "ارتباط با سرور برقرار نیست.",
    solution: "اتصال اینترنت خود را بررسی کنید. صفحه را رفرش کنید. از VPN استفاده نکنید.",
    severity: "critical",
  },
];

function getSeverityBadge(severity: string) {
  switch (severity) {
    case "low":
      return (
        <Badge variant="outline" className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700">
          کم
        </Badge>
      );
    case "medium":
      return (
        <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700">
          متوسط
        </Badge>
      );
    case "high":
      return (
        <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700">
          بالا
        </Badge>
      );
    case "critical":
      return (
        <Badge variant="destructive" className="bg-red-600 text-white">
          بحرانی
        </Badge>
      );
    default:
      return <Badge variant="outline">{severity}</Badge>;
  }
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [errorSearch, setErrorSearch] = useState("");

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Filter FAQs
  const filteredFaqs = faqs
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          !searchQuery ||
          q.q.includes(searchQuery) ||
          q.a.includes(searchQuery)
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  // Filter error codes
  const filteredErrors = errorCodes.filter(
    (e) =>
      !errorSearch ||
      e.code.toLowerCase().includes(errorSearch.toLowerCase()) ||
      e.title.includes(errorSearch) ||
      e.description.includes(errorSearch)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          راهنمای استفاده از سامانه
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          پاسخ سوالات متداول و کدهای خطای سامانه را در اینجا بیابید.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq" className="gap-2">
            <HelpCircle className="w-4 h-4" />
            سوالات متداول
          </TabsTrigger>
          <TabsTrigger value="errors" className="gap-2">
            <AlertTriangle className="w-4 h-4" />
            کدهای خطا
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-4 space-y-4" dir="rtl">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="جستجو در سوالات متداول..."
              className="pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* FAQ Categories */}
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((cat) => (
              <Card key={cat.category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <cat.icon className="w-4 h-4 text-emerald-600" />
                    {cat.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {cat.questions.map((item, idx) => {
                    const faqId = `${cat.category}-${idx}`;
                    const isOpen = openFaq === faqId;
                    return (
                      <div
                        key={idx}
                        className="border rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faqId)}
                          className={`w-full flex items-center justify-between p-3 text-right hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                            isOpen ? "bg-gray-50 dark:bg-gray-800" : ""
                          }`}
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            {item.q}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-3 pb-3 pt-1 border-t bg-emerald-50/50 dark:bg-emerald-950/30">
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-7 pr-6">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">سوالی با این عبارت یافت نشد.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Error Codes Tab */}
        <TabsContent value="errors" className="mt-4 space-y-4" dir="rtl">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="جستجو کد خطا (مثلاً ERR-2001) یا عنوان..."
              className="pr-9"
              value={errorSearch}
              onChange={(e) => setErrorSearch(e.target.value)}
              dir="ltr"
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span>سطح اهمیت:</span>
            {getSeverityBadge("low")}
            {getSeverityBadge("medium")}
            {getSeverityBadge("high")}
            {getSeverityBadge("critical")}
          </div>

          {/* Error Codes List */}
          {filteredErrors.length > 0 ? (
            <div className="space-y-3">
              {filteredErrors.map((err) => (
                <Card key={err.code} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Code Column */}
                      <div className="sm:w-36 bg-gray-50 dark:bg-gray-900 p-4 flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2 border-b sm:border-b-0 sm:border-l border-gray-200 dark:border-gray-800">
                        <code className="text-sm font-mono font-bold text-red-600 dark:text-red-400">
                          {err.code}
                        </code>
                        {getSeverityBadge(err.severity)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 space-y-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                          {err.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {err.description}
                        </p>
                        <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg p-2.5">
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5">
                            راه‌حل:
                          </span>
                          <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-6">
                            {err.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">کد خطایی با این مشخصات یافت نشد.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Still Need Help */}
      <Card className="border-emerald-200 dark:border-emerald-800 bg-gradient-to-l from-emerald-50 to-white dark:from-emerald-950 dark:to-gray-900">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  پاسخ سوال خود را پیدا نکردید؟
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  با تیم پشتیبانی ما تماس بگیرید یا یک تیکت ثبت کنید.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="tel:02188776655"
                    className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                  >
                    <Phone className="w-4 h-4" />
                    ۰۲۱-۸۸۷۷۶۶۵۵
                  </a>
                  <a
                    href="mailto:support@smartcaf.ir"
                    className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                  >
                    <Mail className="w-4 h-4" />
                    support@smartcaf.ir
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
