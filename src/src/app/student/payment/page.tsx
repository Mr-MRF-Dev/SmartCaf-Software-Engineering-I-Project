"use client";

import { useState } from "react";
import {
  CreditCard,
  Wallet,
  ArrowUpCircle,
  CheckCircle2,
  AlertCircle,
  Receipt,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  mockUsers,
  mockReservations,
  mockTransactions,
  formatPrice,
  getStatusLabel,
  getTransactionTypeLabel,
} from "@/lib/mock-data";
import { toast } from "sonner";

export default function PaymentPage() {
  const user = mockUsers[0];
  const [showCharge, setShowCharge] = useState(false);
  const [chargeAmount, setChargeAmount] = useState("");
  const [showPayConfirm, setShowPayConfirm] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null);

  const pendingReservations = mockReservations.filter(
    (r) => r.status === "reserved"
  );

  const quickChargeAmounts = [50000, 100000, 200000, 500000];

  const handleCharge = () => {
    const amount = parseInt(chargeAmount);
    if (!amount || amount < 10000) {
      toast.error("حداقل مبلغ شارژ ۱۰,۰۰۰ تومان است.");
      return;
    }
    toast.success(`شارژ ${formatPrice(amount)} با موفقیت انجام شد.`);
    setShowCharge(false);
    setChargeAmount("");
  };

  const handlePay = () => {
    toast.success("پرداخت با موفقیت انجام شد. کد QR برای شما ارسال شد.");
    setShowPayConfirm(false);
    setSelectedReservation(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">پرداخت و کیف پول</h1>
        <p className="text-sm text-gray-500 mt-1">
          موجودی خود را مدیریت کنید و رزروهای خود را پرداخت نمایید.
        </p>
      </div>

      {/* Wallet Card */}
      <Card className="bg-gradient-to-l from-emerald-600 to-emerald-700 text-white border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <Wallet className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm text-emerald-100">موجودی کیف پول</p>
                <p className="text-3xl font-bold mt-1">
                  {formatPrice(user.balance)}
                </p>
              </div>
            </div>
            <Button
              className="bg-white text-emerald-700 hover:bg-emerald-50 gap-2"
              onClick={() => setShowCharge(true)}
            >
              <ArrowUpCircle className="w-4 h-4" />
              شارژ کیف پول
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending Payments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Receipt className="w-4 h-4 text-amber-600" />
              رزروهای در انتظار پرداخت
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingReservations.length > 0 ? (
              pendingReservations.map((res) => (
                <div
                  key={res.id}
                  className="border rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{res.foodItem.image}</span>
                    <div>
                      <p className="text-sm font-medium">
                        {res.foodItem.name}
                      </p>
                      <p className="text-xs text-gray-500">{res.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-700">
                      {formatPrice(res.totalPrice)}
                    </span>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => {
                        setSelectedReservation(res.id);
                        setShowPayConfirm(true);
                      }}
                    >
                      پرداخت
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-10 h-10 text-emerald-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  همه رزروهای شما پرداخت شده است.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              تراکنش‌های اخیر
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockTransactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === "charge"
                        ? "bg-green-100"
                        : tx.type === "refund"
                        ? "bg-amber-100"
                        : "bg-red-100"
                    }`}
                  >
                    {tx.type === "charge" ? (
                      <ArrowUpCircle className="w-4 h-4 text-green-600" />
                    ) : tx.type === "refund" ? (
                      <ArrowUpCircle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <CreditCard className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm">{tx.description}</p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    tx.type === "payment"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {tx.type === "payment" ? "-" : "+"}
                  {formatPrice(tx.amount)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charge Dialog */}
      <Dialog open={showCharge} onOpenChange={setShowCharge}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>شارژ کیف پول</DialogTitle>
            <DialogDescription>
              مبلغ مورد نظر خود را وارد کنید یا از مبالغ پیشنهادی استفاده نمایید.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {quickChargeAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={chargeAmount === String(amount) ? "default" : "outline"}
                  className={
                    chargeAmount === String(amount)
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : ""
                  }
                  onClick={() => setChargeAmount(String(amount))}
                >
                  {formatPrice(amount)}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <Label>مبلغ دلخواه (تومان)</Label>
              <Input
                type="number"
                placeholder="مثلاً ۱۵۰۰۰۰"
                value={chargeAmount}
                onChange={(e) => setChargeAmount(e.target.value)}
                dir="ltr"
                className="text-left"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowCharge(false)}>
              انصراف
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleCharge}
            >
              پرداخت و شارژ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pay Confirm Dialog */}
      <Dialog open={showPayConfirm} onOpenChange={setShowPayConfirm}>
        <DialogContent className="sm:max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle>تایید پرداخت</DialogTitle>
            <DialogDescription>
              آیا از پرداخت این رزرو اطمینان دارید؟ مبلغ از کیف پول شما کسر
              خواهد شد.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowPayConfirm(false)}
            >
              انصراف
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handlePay}
            >
              تایید پرداخت
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
