import Link from "next/link";
import {
  UtensilsCrossed,
  Brain,
  ShieldCheck,
  CreditCard,
  BarChart3,
  QrCode,
  ArrowLeft,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-emerald-50 via-white to-emerald-50">
      {/* Hero */}
      <header className="max-w-5xl mx-auto px-4 pt-12 pb-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-6">
          <UtensilsCrossed className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">اسمارت‌کف</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          سامانه هوشمند مدیریت و رزرو غذای دانشگاهی. رزرو آسان، پرداخت سریع،
          پیشنهاد هوشمند غذا با هوش مصنوعی.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            ورود به سامانه
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link
            href="/student"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            پنل دانشجو
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            پنل مدیریت
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          امکانات سامانه
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: UtensilsCrossed,
              title: "رزرو آنلاین غذا",
              desc: "رزرو سریع غذا با انتخاب وعده و اندازه پرس",
              color: "bg-emerald-100 text-emerald-600",
            },
            {
              icon: Brain,
              title: "پیشنهاد هوشمند",
              desc: "پیشنهاد غذا بر اساس سلیقه و سابقه سفارشات",
              color: "bg-purple-100 text-purple-600",
            },
            {
              icon: CreditCard,
              title: "پرداخت آنلاین",
              desc: "شارژ کیف پول و پرداخت امن و سریع",
              color: "bg-blue-100 text-blue-600",
            },
            {
              icon: QrCode,
              title: "تحویل با QR Code",
              desc: "دریافت کد QR برای تحویل آسان غذا در سلف",
              color: "bg-amber-100 text-amber-600",
            },
            {
              icon: BarChart3,
              title: "آمار و گزارشات",
              desc: "داشبورد مدیریتی با نمودارهای جامع",
              color: "bg-indigo-100 text-indigo-600",
            },
            {
              icon: ShieldCheck,
              title: "مدیریت قوانین",
              desc: "تعیین محدودیت‌ها و قوانین رزرو توسط مدیر",
              color: "bg-red-100 text-red-600",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Info */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-slate-900 text-white rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">معماری سیستم</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-emerald-400 mb-2">
                فرمت مدیریت داده‌ها
              </h3>
              <p className="text-slate-300 leading-relaxed">
                از فرمت JSON برای مدیریت داده‌ها در سمت کلاینت استفاده شده است.
                این فرمت به دلیل سازگاری بالا با JavaScript/TypeScript، سرعت
                بالای پردازش، ساختار سلسله‌مراتبی و نیازمندی‌های غیرعملکردی
                مانند قابلیت نگهداری و توسعه‌پذیری انتخاب شده است.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-400 mb-2">
                معماری نرم‌افزار
              </h3>
              <p className="text-slate-300 leading-relaxed">
                از معماری سه‌لایه (Three-Tier Architecture) استفاده شده: لایه
                نمایش (Presentation Layer/Next.js)، لایه منطق کسب‌وکار (Business
                Logic Layer) و لایه داده (Data Layer). این معماری به دلیل
                جداسازی مسئولیت‌ها، مقیاس‌پذیری و آزمون‌پذیری بالا انتخاب شده
                است.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <p className="text-center text-xs text-gray-400">
          سامانه هوشمند رزرو غذا - اسمارت‌کف © ۱۴۰۴ | پروژه مهندسی نرم‌افزار
        </p>
      </footer>
    </div>
  );
}
