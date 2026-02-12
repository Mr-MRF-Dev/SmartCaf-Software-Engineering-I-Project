"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { mockTickets, mockUsers } from "@/lib/mock-data";
import { Plus, MessageSquare, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function StudentSupportPage() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const user = mockUsers[0]; // student user
  const userTickets = mockTickets.filter((t) => t.userId === user.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">باز</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">در حال بررسی</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">حل شده</Badge>;
      case "closed":
        return <Badge variant="outline" className="bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800">بسته شده</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive" className="bg-red-600 dark:bg-red-900 text-white dark:text-red-100">فوری</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800">مهم</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">متوسط</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800">کم</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "technical":
        return "فنی";
      case "financial":
        return "مالی";
      case "reservation":
        return "رزرو";
      case "food":
        return "غذا";
      case "other":
        return "سایر";
      default:
        return category;
    }
  };

  const ticket = selectedTicket ? mockTickets.find((t) => t.id === selectedTicket) : null;

  return (
    <div className="container max-w-6xl py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">پشتیبانی و راهنمایی</h1>
          <p className="text-gray-600 dark:text-gray-400">مشکلات و سوالات خود را با ما در میان بگذارید</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
              <Plus className="w-4 h-4 ml-2" />
              تیکت جدید
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">ایجاد تیکت پشتیبانی</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                لطفاً اطلاعات درخواست خود را با دقت وارد کنید.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-900 dark:text-white">موضوع</Label>
                <Input
                  id="subject"
                  placeholder="موضوع تیکت را وارد کنید"
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-900 dark:text-white">دسته‌بندی</Label>
                <Select>
                  <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                    <SelectItem value="technical" className="text-gray-900 dark:text-white">فنی</SelectItem>
                    <SelectItem value="financial" className="text-gray-900 dark:text-white">مالی</SelectItem>
                    <SelectItem value="reservation" className="text-gray-900 dark:text-white">رزرو</SelectItem>
                    <SelectItem value="food" className="text-gray-900 dark:text-white">غذا</SelectItem>
                    <SelectItem value="other" className="text-gray-900 dark:text-white">سایر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-gray-900 dark:text-white">اولویت</Label>
                <Select>
                  <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="اولویت را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                    <SelectItem value="low" className="text-gray-900 dark:text-white">کم</SelectItem>
                    <SelectItem value="medium" className="text-gray-900 dark:text-white">متوسط</SelectItem>
                    <SelectItem value="high" className="text-gray-900 dark:text-white">مهم</SelectItem>
                    <SelectItem value="urgent" className="text-gray-900 dark:text-white">فوری</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-900 dark:text-white">توضیحات</Label>
                <Textarea
                  id="description"
                  placeholder="توضیحات کامل مشکل خود را بنویسید..."
                  rows={5}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                ارسال تیکت
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Contact */}
      <Card className="mb-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-b border-gray-200 dark:border-gray-800">
          <CardTitle className="text-gray-900 dark:text-white">ارتباط سریع</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">در صورت نیاز به پشتیبانی فوری با ما تماس بگیرید</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-2xl mb-2">📞</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">تماس تلفنی</p>
              <p className="font-semibold text-gray-900 dark:text-white">021-88776655 داخلی 201</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-2xl mb-2">✉️</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">ایمیل</p>
              <p className="font-semibold text-gray-900 dark:text-white">support@smartchef.ir</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-2xl mb-2">⏰</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">ساعات پاسخگویی</p>
              <p className="font-semibold text-gray-900 dark:text-white">۸ صبح تا ۸ شب</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">تیکت‌های من</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">لیست درخواست‌ها و تیکت‌های شما</CardDescription>
        </CardHeader>
        <CardContent>
          {userTickets.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">هنوز تیکتی ثبت نکرده‌اید</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950">
                    ایجاد اولین تیکت
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">ایجاد تیکت پشتیبانی</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      لطفاً اطلاعات درخواست خود را با دقت وارد کنید.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Same form as above */}
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="space-y-3">
              {userTickets.map((ticket) => (
                <Dialog key={ticket.id}>
                  <DialogTrigger asChild>
                    <div
                      onClick={() => setSelectedTicket(ticket.id)}
                      className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{ticket.subject}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{ticket.description}</p>
                        </div>
                        <div className="flex gap-2 mr-4">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {ticket.createdAt}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
                          {getCategoryLabel(ticket.category)}
                        </span>
                        {ticket.responses.length > 0 && (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <MessageSquare className="w-3 h-3" />
                            {ticket.responses.length} پاسخ
                          </span>
                        )}
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <DialogTitle className="text-gray-900 dark:text-white mb-2">{ticket.subject}</DialogTitle>
                          <div className="flex gap-2">
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                            <Badge variant="outline" className="bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800">
                              {getCategoryLabel(ticket.category)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      {/* Original Message */}
                      <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                            {ticket.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{ticket.userName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{ticket.createdAt}</p>
                          </div>
                        </div>
                        <Separator className="my-3 bg-gray-200 dark:bg-gray-800" />
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
                      </div>

                      {/* Responses */}
                      {ticket.responses.length > 0 && (
                        <>
                          <Separator className="bg-gray-200 dark:bg-gray-800" />
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">پاسخ‌ها</h4>
                            {ticket.responses.map((response) => (
                              <div
                                key={response.id}
                                className={`p-4 rounded-lg border ${
                                  response.userRole === "admin"
                                    ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                                    : "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                      response.userRole === "admin" ? "bg-blue-600" : "bg-gray-600"
                                    }`}
                                  >
                                    {response.userName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                      {response.userName}
                                      {response.userRole === "admin" && (
                                        <Badge variant="outline" className="mr-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                          پشتیبانی
                                        </Badge>
                                      )}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">{response.createdAt}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{response.message}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Reply Form (only for open/in-progress tickets) */}
                      {(ticket.status === "open" || ticket.status === "in-progress") && (
                        <>
                          <Separator className="bg-gray-200 dark:bg-gray-800" />
                          <div className="space-y-3">
                            <Label htmlFor="reply" className="text-gray-900 dark:text-white">پاسخ شما</Label>
                            <Textarea
                              id="reply"
                              placeholder="پاسخ خود را بنویسید..."
                              rows={3}
                              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white resize-none"
                            />
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                              ارسال پاسخ
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
