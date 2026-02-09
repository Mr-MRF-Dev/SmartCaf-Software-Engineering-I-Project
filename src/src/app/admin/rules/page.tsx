"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Pencil,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { mockSiteRules, SiteRule } from "@/lib/mock-data";
import { toast } from "sonner";

export default function RulesPage() {
  const [rules, setRules] = useState<SiteRule[]>(mockSiteRules);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleToggle = (id: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
    toast.success("وضعیت قانون تغییر کرد.");
  };

  const handleAdd = () => {
    if (!newTitle || !newDescription) {
      toast.error("لطفا عنوان و توضیحات قانون را وارد کنید.");
      return;
    }
    const newRule: SiteRule = {
      id: `rule${rules.length + 1}`,
      title: newTitle,
      description: newDescription,
      isActive: true,
      createdAt: "1404/11/21",
    };
    setRules((prev) => [...prev, newRule]);
    toast.success("قانون جدید با موفقیت اضافه شد.");
    setShowAddDialog(false);
    setNewTitle("");
    setNewDescription("");
  };

  const activeRules = rules.filter((r) => r.isActive);
  const inactiveRules = rules.filter((r) => !r.isActive);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            قوانین و محدودیت‌ها
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            قوانین و محدودیت‌های سامانه را مدیریت کنید.
          </p>
        </div>
        <Button
          className="bg-amber-500 hover:bg-amber-600 gap-2"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4" />
          افزودن قانون
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-4 pb-3 px-4 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <div>
              <p className="text-2xl font-bold text-emerald-800">
                {activeRules.length}
              </p>
              <p className="text-xs text-emerald-600">قانون فعال</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4 flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-2xl font-bold text-gray-600">
                {inactiveRules.length}
              </p>
              <p className="text-xs text-gray-500">قانون غیرفعال</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {rules.map((rule) => (
          <Card
            key={rule.id}
            className={`transition-all ${
              !rule.isActive ? "opacity-60 bg-gray-50" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {rule.title}
                    </h3>
                    <Badge
                      variant={rule.isActive ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {rule.isActive ? "فعال" : "غیرفعال"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    تاریخ ایجاد: {rule.createdAt}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`${
                      rule.isActive
                        ? "text-emerald-600 hover:text-red-600"
                        : "text-gray-400 hover:text-emerald-600"
                    }`}
                    onClick={() => handleToggle(rule.id)}
                  >
                    {rule.isActive ? (
                      <ToggleRight className="w-5 h-5" />
                    ) : (
                      <ToggleLeft className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Rule Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>افزودن قانون جدید</DialogTitle>
            <DialogDescription>
              عنوان و جزئیات قانون یا محدودیت جدید را وارد کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>عنوان قانون</Label>
              <Input
                placeholder="مثلاً: محدودیت زمان رزرو"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>توضیحات</Label>
              <Textarea
                placeholder="جزئیات قانون را شرح دهید..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              انصراف
            </Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600 gap-1"
              onClick={handleAdd}
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
