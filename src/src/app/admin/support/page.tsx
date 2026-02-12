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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  mockTickets,
  mockSoftwareIssues,
  mockVersions,
  Ticket,
  SoftwareIssue,
} from "@/lib/mock-data";
import {
  Users,
  MessageSquare,
  Clock,
  CheckCircle2,
  Bug,
  Lightbulb,
  TrendingUp,
  HelpCircle,
  Plus,
  Send,
  PackageCheck,
  AlertCircle,
} from "lucide-react";

export default function AdminSupportPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<SoftwareIssue | null>(null);
  const [ticketFilter, setTicketFilter] = useState<string>("all");
  const [issueFilter, setIssueFilter] = useState<string>("all");

  // Filter tickets
  const filteredTickets =
    ticketFilter === "all"
      ? mockTickets
      : mockTickets.filter((t) => t.status === ticketFilter);

  // Filter software issues
  const filteredIssues =
    issueFilter === "all"
      ? mockSoftwareIssues
      : mockSoftwareIssues.filter((i) => i.status === issueFilter);

  // Stats
  const openTickets = mockTickets.filter((t) => t.status === "open").length;
  const inProgressTickets = mockTickets.filter((t) => t.status === "in-progress").length;
  const resolvedToday = mockTickets.filter((t) => t.status === "resolved").length;

  const criticalIssues = mockSoftwareIssues.filter((i) => i.priority === "critical").length;
  const highIssues = mockSoftwareIssues.filter((i) => i.priority === "high").length;
  const currentVersion = mockVersions.find((v) => v.isCurrent);

  const getTicketStatusBadge = (status: string) => {
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
      case "critical":
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

  const getIssueTypeBadge = (type: string) => {
    switch (type) {
      case "bug":
        return <Badge variant="outline" className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 flex items-center gap-1 w-fit"><Bug className="w-3 h-3" />باگ</Badge>;
      case "feature":
        return <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 flex items-center gap-1 w-fit"><Lightbulb className="w-3 h-3" />ویژگی</Badge>;
      case "improvement":
        return <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 flex items-center gap-1 w-fit"><TrendingUp className="w-3 h-3" />بهبود</Badge>;
      case "question":
        return <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 flex items-center gap-1 w-fit"><HelpCircle className="w-3 h-3" />سوال</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getIssueStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">ارسال شده</Badge>;
      case "under-review":
        return <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">در حال بررسی</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">در حال انجام</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">حل شده</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800">رد شده</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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

  return (
    <div className="container max-w-7xl py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">مرکز پشتیبانی</h1>
        <p className="text-gray-600 dark:text-gray-400">مدیریت تیکت‌های دانشجویان و پشتیبانی نرم‌افزار</p>
      </div>

      <Tabs defaultValue="student-support" className="space-y-6">
        <TabsList className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <TabsTrigger value="student-support" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-slate-700">
            <Users className="w-4 h-4 ml-2" />
            پشتیبانی دانشجویان
          </TabsTrigger>
          <TabsTrigger value="software-support" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700">
            <PackageCheck className="w-4 h-4 ml-2" />
            پشتیبانی نرم‌افزار
          </TabsTrigger>
        </TabsList>

        {/* Student Support Tab */}
        <TabsContent value="student-support" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">تیکت‌های باز</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">{openTickets}</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">نیاز به بررسی</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-yellow-200 dark:border-yellow-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">در حال بررسی</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">{inProgressTickets}</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">در دست اقدام</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-green-200 dark:border-green-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">حل شده امروز</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700 dark:text-green-400">{resolvedToday}</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">بسته شده</p>
              </CardContent>
            </Card>
          </div>

          {/* Tickets Table */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">تیکت‌های دانشجویان</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">مدیریت و پاسخگویی به درخواست‌ها</CardDescription>
                </div>
                <Select value={ticketFilter} onValueChange={setTicketFilter}>
                  <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="فیلتر وضعیت" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                    <SelectItem value="all" className="text-gray-900 dark:text-white">همه</SelectItem>
                    <SelectItem value="open" className="text-gray-900 dark:text-white">باز</SelectItem>
                    <SelectItem value="in-progress" className="text-gray-900 dark:text-white">در حال بررسی</SelectItem>
                    <SelectItem value="resolved" className="text-gray-900 dark:text-white">حل شده</SelectItem>
                    <SelectItem value="closed" className="text-gray-900 dark:text-white">بسته شده</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950">
                    <TableHead className="text-right text-gray-900 dark:text-white">شناسه</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">دانشجو</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">موضوع</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">دسته</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">اولویت</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">وضعیت</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">تاریخ</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950">
                      <TableCell className="text-gray-900 dark:text-white font-mono text-sm">{ticket.id}</TableCell>
                      <TableCell className="text-gray-900 dark:text-white">{ticket.userName}</TableCell>
                      <TableCell className="text-gray-900 dark:text-white max-w-xs truncate">{ticket.subject}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{getCategoryLabel(ticket.category)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{getTicketStatusBadge(ticket.status)}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm">{ticket.createdAt}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTicket(ticket)}
                              className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-950"
                            >
                              مشاهده
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <DialogTitle className="text-gray-900 dark:text-white mb-2">{ticket.subject}</DialogTitle>
                                  <div className="flex gap-2 flex-wrap">
                                    {getTicketStatusBadge(ticket.status)}
                                    {getPriorityBadge(ticket.priority)}
                                    <Badge variant="outline" className="bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800">
                                      {getCategoryLabel(ticket.category)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </DialogHeader>
                            <div className="mt-4 space-y-4">
                              {/* Ticket Info */}
                              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
                                <div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">دانشجو</p>
                                  <p className="font-semibold text-gray-900 dark:text-white">{ticket.userName}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">تاریخ ایجاد</p>
                                  <p className="font-semibold text-gray-900 dark:text-white">{ticket.createdAt}</p>
                                </div>
                              </div>

                              {/* Original Message */}
                              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">پیام اولیه</h4>
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
                                            ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                                            : "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 mb-2">
                                          <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                              response.userRole === "admin" ? "bg-green-600" : "bg-gray-600"
                                            }`}
                                          >
                                            {response.userName.charAt(0)}
                                          </div>
                                          <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                              {response.userName}
                                              {response.userRole === "admin" && (
                                                <Badge variant="outline" className="mr-2 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                                                  پشتیبان
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

                              {/* Reply Form */}
                              {(ticket.status === "open" || ticket.status === "in-progress") && (
                                <>
                                  <Separator className="bg-gray-200 dark:bg-gray-800" />
                                  <div className="space-y-3">
                                    <Label htmlFor="admin-reply" className="text-gray-900 dark:text-white">پاسخ پشتیبان</Label>
                                    <Textarea
                                      id="admin-reply"
                                      placeholder="پاسخ خود را بنویسید..."
                                      rows={4}
                                      className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white resize-none"
                                    />
                                    <div className="flex gap-2">
                                      <Button className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                                        <Send className="w-4 h-4 ml-2" />
                                        ارسال پاسخ
                                      </Button>
                                      <Select defaultValue={ticket.status}>
                                        <SelectTrigger className="w-[200px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                                          <SelectValue placeholder="تغییر وضعیت" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                                          <SelectItem value="open" className="text-gray-900 dark:text-white">باز</SelectItem>
                                          <SelectItem value="in-progress" className="text-gray-900 dark:text-white">در حال بررسی</SelectItem>
                                          <SelectItem value="resolved" className="text-gray-900 dark:text-white">حل شده</SelectItem>
                                          <SelectItem value="closed" className="text-gray-900 dark:text-white">بسته شده</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Software Support Tab */}
        <TabsContent value="software-support" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white dark:bg-gray-900 border-red-200 dark:border-red-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">باگ‌های بحرانی</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-700 dark:text-red-400">{criticalIssues}</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">نیاز به اقدام فوری</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-orange-200 dark:border-orange-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">مشکلات مهم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-700 dark:text-orange-400">{highIssues}</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">اولویت بالا</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">نسخه فعلی</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">{currentVersion?.version}</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{currentVersion?.releaseDate}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Version Manager */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">مدیریت نسخه‌ها</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">تاریخچه نسخه‌های نرم‌افزار</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVersions.map((version) => (
                    <div
                      key={version.version}
                      className={`p-4 rounded-lg border ${
                        version.isCurrent
                          ? "bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-800"
                          : "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900 dark:text-white">{version.version}</h4>
                          {version.isCurrent && (
                            <Badge className="bg-blue-600 dark:bg-blue-700 text-white">فعلی</Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{version.releaseDate}</span>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {version.changes.map((change, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Issue to Company */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">گزارش مشکل به شرکت</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">ارسال باگ یا درخواست ویژگی جدید</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="issue-type" className="text-gray-900 dark:text-white">نوع گزارش</Label>
                    <Select>
                      <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                        <SelectItem value="bug" className="text-gray-900 dark:text-white">🐛 باگ</SelectItem>
                        <SelectItem value="feature" className="text-gray-900 dark:text-white">💡 ویژگی جدید</SelectItem>
                        <SelectItem value="improvement" className="text-gray-900 dark:text-white">📈 بهبود</SelectItem>
                        <SelectItem value="question" className="text-gray-900 dark:text-white">❓ سوال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issue-version" className="text-gray-900 dark:text-white">نسخه نرم‌افزار</Label>
                    <Select defaultValue={currentVersion?.version}>
                      <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                        {mockVersions.map((v) => (
                          <SelectItem key={v.version} value={v.version} className="text-gray-900 dark:text-white">
                            {v.version}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issue-priority" className="text-gray-900 dark:text-white">اولویت</Label>
                    <Select>
                      <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                        <SelectItem value="low" className="text-gray-900 dark:text-white">کم</SelectItem>
                        <SelectItem value="medium" className="text-gray-900 dark:text-white">متوسط</SelectItem>
                        <SelectItem value="high" className="text-gray-900 dark:text-white">مهم</SelectItem>
                        <SelectItem value="critical" className="text-gray-900 dark:text-white">بحرانی</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issue-title" className="text-gray-900 dark:text-white">عنوان</Label>
                    <Input
                      id="issue-title"
                      placeholder="عنوان مشکل یا درخواست"
                      className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issue-description" className="text-gray-900 dark:text-white">توضیحات کامل</Label>
                    <Textarea
                      id="issue-description"
                      placeholder="توضیحات دقیق مشکل یا درخواست خود را بنویسید..."
                      rows={4}
                      className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white resize-none"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                    <Plus className="w-4 h-4 ml-2" />
                    ارسال گزارش
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Software Issues Table */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">گزارش‌های ارسالی</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">پیگیری مشکلات و درخواست‌های ارسال شده به شرکت</CardDescription>
                </div>
                <Select value={issueFilter} onValueChange={setIssueFilter}>
                  <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="فیلتر وضعیت" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                    <SelectItem value="all" className="text-gray-900 dark:text-white">همه</SelectItem>
                    <SelectItem value="submitted" className="text-gray-900 dark:text-white">ارسال شده</SelectItem>
                    <SelectItem value="under-review" className="text-gray-900 dark:text-white">در حال بررسی</SelectItem>
                    <SelectItem value="in-progress" className="text-gray-900 dark:text-white">در حال انجام</SelectItem>
                    <SelectItem value="resolved" className="text-gray-900 dark:text-white">حل شده</SelectItem>
                    <SelectItem value="rejected" className="text-gray-900 dark:text-white">رد شده</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950">
                    <TableHead className="text-right text-gray-900 dark:text-white">نوع</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">عنوان</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">نسخه</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">اولویت</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">وضعیت</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">ارسال کننده</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">تاریخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.map((issue) => (
                    <TableRow key={issue.id} className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950">
                      <TableCell>{getIssueTypeBadge(issue.type)}</TableCell>
                      <TableCell className="text-gray-900 dark:text-white max-w-xs truncate">{issue.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800">
                          {issue.version}
                        </Badge>
                      </TableCell>
                      <TableCell>{getPriorityBadge(issue.priority)}</TableCell>
                      <TableCell>{getIssueStatusBadge(issue.status)}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm">{issue.submittedBy}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm">{issue.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
