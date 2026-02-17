// ============================================================
// Mock Data for SmartCaf - University Cafeteria Management System
// Format: JSON-based in-memory data structures
// Reason: For a prototype/mock system, JSON provides simplicity,
// fast read access, and easy front-end integration without
// the overhead of database setup. This aligns with NFR requirements
// for rapid prototyping and maintainability.
// ============================================================

export interface User {
  id: string;
  name: string;
  studentId: string;
  email: string;
  role: "student" | "admin";
  balance: number;
  avatar?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "breakfast" | "lunch" | "dinner" | "snack";
  image: string;
  calories: number;
  available: boolean;
  remainingCapacity: number;
  portionSizes: { label: string; priceMultiplier: number }[];
}

export interface MenuItem {
  id: string;
  date: string;
  meal: "breakfast" | "lunch" | "dinner";
  foods: FoodItem[];
}

export interface Reservation {
  id: string;
  userId: string;
  foodItem: FoodItem;
  date: string;
  meal: "breakfast" | "lunch" | "dinner";
  portion: string;
  status: "reserved" | "paid" | "delivered" | "cancelled";
  totalPrice: number;
  qrCode: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: "payment" | "refund" | "charge";
  description: string;
  date: string;
  status: "success" | "failed" | "pending";
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  lastUpdated: string;
  category: string;
}

export interface DailyStats {
  date: string;
  totalOrders: number;
  totalRevenue: number;
  breakfastOrders: number;
  lunchOrders: number;
  dinnerOrders: number;
  cancelledOrders: number;
}

export interface SiteRule {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

// ---- Mock Users ----
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "علی محمدی",
    studentId: "40012345",
    email: "ali@university.ac.ir",
    role: "student",
    balance: 250000,
  },
  {
    id: "u2",
    name: "مدیر سیستم",
    studentId: "admin001",
    email: "admin@university.ac.ir",
    role: "admin",
    balance: 0,
  },
];

// ---- Mock Food Items ----
export const mockFoods: FoodItem[] = [
  {
    id: "f1",
    name: "چلوکباب کوبیده",
    description: "برنج ایرانی با دو سیخ کباب کوبیده، گوجه کبابی و کره",
    price: 85000,
    category: "lunch",
    image: "🍖",
    calories: 650,
    available: true,
    remainingCapacity: 45,
    portionSizes: [
      { label: "معمولی", priceMultiplier: 1 },
      { label: "بزرگ", priceMultiplier: 1.5 },
    ],
  },
  {
    id: "f2",
    name: "قورمه‌سبزی",
    description: "خورشت قورمه‌سبزی با برنج و سالاد فصل",
    price: 65000,
    category: "lunch",
    image: "🍲",
    calories: 550,
    available: true,
    remainingCapacity: 12,
    portionSizes: [
      { label: "معمولی", priceMultiplier: 1 },
      { label: "بزرگ", priceMultiplier: 1.4 },
    ],
  },
  {
    id: "f3",
    name: "زرشک‌پلو با مرغ",
    description: "زرشک‌پلو با ران مرغ، زعفران و پسته",
    price: 75000,
    category: "lunch",
    image: "🍗",
    calories: 600,
    available: true,
    remainingCapacity: 30,
    portionSizes: [
      { label: "معمولی", priceMultiplier: 1 },
      { label: "بزرگ", priceMultiplier: 1.3 },
    ],
  },
  {
    id: "f4",
    name: "املت",
    description: "املت گوجه‌فرنگی با نان تازه و چای",
    price: 35000,
    category: "breakfast",
    image: "🍳",
    calories: 350,
    available: true,
    remainingCapacity: 60,
    portionSizes: [{ label: "معمولی", priceMultiplier: 1 }],
  },
  {
    id: "f5",
    name: "نیمرو",
    description: "نیمرو با نان بربری، کره و مربا",
    price: 30000,
    category: "breakfast",
    image: "🥚",
    calories: 300,
    available: true,
    remainingCapacity: 55,
    portionSizes: [{ label: "معمولی", priceMultiplier: 1 }],
  },
  {
    id: "f6",
    name: "جوجه‌کباب",
    description: "جوجه‌کباب با برنج زعفرانی و گوجه کبابی",
    price: 90000,
    category: "dinner",
    image: "🍢",
    calories: 580,
    available: true,
    remainingCapacity: 8,
    portionSizes: [
      { label: "معمولی", priceMultiplier: 1 },
      { label: "بزرگ", priceMultiplier: 1.4 },
    ],
  },
  {
    id: "f7",
    name: "سوپ جو",
    description: "سوپ جو با نان و لیمو",
    price: 25000,
    category: "dinner",
    image: "🍜",
    calories: 200,
    available: true,
    remainingCapacity: 25,
    portionSizes: [{ label: "معمولی", priceMultiplier: 1 }],
  },
  {
    id: "f8",
    name: "ماکارونی",
    description: "ماکارونی با سس بلونز و پنیر پیتزا",
    price: 55000,
    category: "lunch",
    image: "🍝",
    calories: 500,
    available: false,
    remainingCapacity: 0,
    portionSizes: [
      { label: "معمولی", priceMultiplier: 1 },
      { label: "بزرگ", priceMultiplier: 1.3 },
    ],
  },
];

// ---- Mock Menu Schedule ----
export const mockMenuSchedule: MenuItem[] = [
  {
    id: "m1",
    date: "1404/11/21",
    meal: "breakfast",
    foods: [mockFoods[3], mockFoods[4]],
  },
  {
    id: "m2",
    date: "1404/11/21",
    meal: "lunch",
    foods: [mockFoods[0], mockFoods[1], mockFoods[2]],
  },
  {
    id: "m3",
    date: "1404/11/21",
    meal: "dinner",
    foods: [mockFoods[5], mockFoods[6]],
  },
  {
    id: "m4",
    date: "1404/11/22",
    meal: "breakfast",
    foods: [mockFoods[3], mockFoods[4]],
  },
  {
    id: "m5",
    date: "1404/11/22",
    meal: "lunch",
    foods: [mockFoods[1], mockFoods[7], mockFoods[2]],
  },
  {
    id: "m6",
    date: "1404/11/22",
    meal: "dinner",
    foods: [mockFoods[5], mockFoods[6]],
  },
  {
    id: "m7",
    date: "1404/11/23",
    meal: "lunch",
    foods: [mockFoods[0], mockFoods[2], mockFoods[7]],
  },
];

// ---- Mock Reservations ----
export const mockReservations: Reservation[] = [
  {
    id: "r1",
    userId: "u1",
    foodItem: mockFoods[0],
    date: "1404/11/20",
    meal: "lunch",
    portion: "معمولی",
    status: "delivered",
    totalPrice: 85000,
    qrCode: "QR-001-ABCD",
    createdAt: "1404/11/19",
  },
  {
    id: "r2",
    userId: "u1",
    foodItem: mockFoods[1],
    date: "1404/11/19",
    meal: "lunch",
    portion: "معمولی",
    status: "delivered",
    totalPrice: 65000,
    qrCode: "QR-002-EFGH",
    createdAt: "1404/11/18",
  },
  {
    id: "r3",
    userId: "u1",
    foodItem: mockFoods[5],
    date: "1404/11/21",
    meal: "dinner",
    portion: "بزرگ",
    status: "paid",
    totalPrice: 126000,
    qrCode: "QR-003-IJKL",
    createdAt: "1404/11/20",
  },
  {
    id: "r4",
    userId: "u1",
    foodItem: mockFoods[3],
    date: "1404/11/18",
    meal: "breakfast",
    portion: "معمولی",
    status: "cancelled",
    totalPrice: 35000,
    qrCode: "QR-004-MNOP",
    createdAt: "1404/11/17",
  },
  {
    id: "r5",
    userId: "u1",
    foodItem: mockFoods[2],
    date: "1404/11/21",
    meal: "lunch",
    portion: "معمولی",
    status: "reserved",
    totalPrice: 75000,
    qrCode: "QR-005-QRST",
    createdAt: "1404/11/20",
  },
];

// ---- Mock Transactions ----
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    userId: "u1",
    amount: 85000,
    type: "payment",
    description: "پرداخت رزرو چلوکباب کوبیده",
    date: "1404/11/19",
    status: "success",
  },
  {
    id: "t2",
    userId: "u1",
    amount: 65000,
    type: "payment",
    description: "پرداخت رزرو قورمه‌سبزی",
    date: "1404/11/18",
    status: "success",
  },
  {
    id: "t3",
    userId: "u1",
    amount: 500000,
    type: "charge",
    description: "شارژ کیف پول",
    date: "1404/11/17",
    status: "success",
  },
  {
    id: "t4",
    userId: "u1",
    amount: 35000,
    type: "refund",
    description: "بازگشت وجه - لغو رزرو صبحانه",
    date: "1404/11/17",
    status: "success",
  },
  {
    id: "t5",
    userId: "u1",
    amount: 126000,
    type: "payment",
    description: "پرداخت رزرو جوجه‌کباب (بزرگ)",
    date: "1404/11/20",
    status: "success",
  },
  {
    id: "t6",
    userId: "u1",
    amount: 75000,
    type: "payment",
    description: "پرداخت رزرو زرشک‌پلو با مرغ",
    date: "1404/11/20",
    status: "pending",
  },
];

// ---- Mock Inventory ----
export const mockInventory: InventoryItem[] = [
  { id: "inv1", name: "برنج", unit: "کیلوگرم", quantity: 500, minQuantity: 100, lastUpdated: "1404/11/20", category: "غلات" },
  { id: "inv2", name: "گوشت چرخ‌کرده", unit: "کیلوگرم", quantity: 80, minQuantity: 50, lastUpdated: "1404/11/20", category: "پروتئین" },
  { id: "inv3", name: "مرغ", unit: "کیلوگرم", quantity: 120, minQuantity: 60, lastUpdated: "1404/11/20", category: "پروتئین" },
  { id: "inv4", name: "روغن", unit: "لیتر", quantity: 45, minQuantity: 20, lastUpdated: "1404/11/19", category: "روغن و چربی" },
  { id: "inv5", name: "پیاز", unit: "کیلوگرم", quantity: 200, minQuantity: 50, lastUpdated: "1404/11/20", category: "سبزیجات" },
  { id: "inv6", name: "گوجه‌فرنگی", unit: "کیلوگرم", quantity: 150, minQuantity: 40, lastUpdated: "1404/11/20", category: "سبزیجات" },
  { id: "inv7", name: "تخم‌مرغ", unit: "عدد", quantity: 300, minQuantity: 100, lastUpdated: "1404/11/19", category: "پروتئین" },
  { id: "inv8", name: "ماکارونی", unit: "بسته", quantity: 15, minQuantity: 30, lastUpdated: "1404/11/18", category: "غلات" },
  { id: "inv9", name: "نان بربری", unit: "عدد", quantity: 50, minQuantity: 20, lastUpdated: "1404/11/20", category: "نان" },
  { id: "inv10", name: "کره", unit: "بسته", quantity: 25, minQuantity: 10, lastUpdated: "1404/11/19", category: "لبنیات" },
];

// ---- Mock Daily Stats ----
export const mockDailyStats: DailyStats[] = [
  { date: "1404/11/15", totalOrders: 320, totalRevenue: 22400000, breakfastOrders: 80, lunchOrders: 160, dinnerOrders: 80, cancelledOrders: 12 },
  { date: "1404/11/16", totalOrders: 290, totalRevenue: 20300000, breakfastOrders: 70, lunchOrders: 150, dinnerOrders: 70, cancelledOrders: 8 },
  { date: "1404/11/17", totalOrders: 350, totalRevenue: 24500000, breakfastOrders: 90, lunchOrders: 170, dinnerOrders: 90, cancelledOrders: 15 },
  { date: "1404/11/18", totalOrders: 310, totalRevenue: 21700000, breakfastOrders: 75, lunchOrders: 155, dinnerOrders: 80, cancelledOrders: 10 },
  { date: "1404/11/19", totalOrders: 340, totalRevenue: 23800000, breakfastOrders: 85, lunchOrders: 165, dinnerOrders: 90, cancelledOrders: 11 },
  { date: "1404/11/20", totalOrders: 360, totalRevenue: 25200000, breakfastOrders: 95, lunchOrders: 175, dinnerOrders: 90, cancelledOrders: 9 },
  { date: "1404/11/21", totalOrders: 280, totalRevenue: 19600000, breakfastOrders: 65, lunchOrders: 145, dinnerOrders: 70, cancelledOrders: 7 },
];

// ---- Mock Site Rules ----
export const mockSiteRules: SiteRule[] = [
  {
    id: "rule1",
    title: "محدودیت زمان رزرو",
    description: "رزرو غذا تا ساعت ۲۲ شب قبل باید انجام شود.",
    isActive: true,
    createdAt: "1404/10/01",
  },
  {
    id: "rule2",
    title: "حداکثر رزرو روزانه",
    description: "هر دانشجو حداکثر ۳ وعده در روز می‌تواند رزرو کند.",
    isActive: true,
    createdAt: "1404/10/01",
  },
  {
    id: "rule3",
    title: "جریمه عدم دریافت",
    description: "در صورت عدم دریافت غذای رزرو شده، ۵۰٪ مبلغ به عنوان جریمه کسر می‌شود.",
    isActive: true,
    createdAt: "1404/10/01",
  },
  {
    id: "rule4",
    title: "مهلت لغو رزرو",
    description: "لغو رزرو تا ۴ ساعت قبل از وعده غذایی امکان‌پذیر است.",
    isActive: true,
    createdAt: "1404/10/05",
  },
  {
    id: "rule5",
    title: "محدودیت شارژ کیف پول",
    description: "حداکثر شارژ کیف پول ۲,۰۰۰,۰۰۰ تومان است.",
    isActive: false,
    createdAt: "1404/10/10",
  },
];

// ---- AI Recommendation Mock ----
export interface AIRecommendation {
  foodItem: FoodItem;
  reason: string;
  matchScore: number;
}

export const mockAIRecommendations: AIRecommendation[] = [
  {
    foodItem: mockFoods[2],
    reason: "بر اساس سابقه سفارشات شما، زرشک‌پلو با مرغ مورد علاقه شماست.",
    matchScore: 95,
  },
  {
    foodItem: mockFoods[0],
    reason: "چلوکباب کوبیده پرطرفدارترین غذای این هفته بوده است.",
    matchScore: 88,
  },
  {
    foodItem: mockFoods[6],
    reason: "با توجه به هوای سرد، سوپ جو پیشنهاد مناسبی برای شام است.",
    matchScore: 82,
  },
];

// ---- Ticket Support Mock ----
export interface TicketResponse {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  userRole: "student" | "admin";
  message: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  description: string;
  category: "technical" | "financial" | "reservation" | "food" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
}

export const mockTickets: Ticket[] = [
  {
    id: "ticket1",
    userId: "student1",
    userName: "علی احمدی",
    subject: "مشکل در پرداخت آنلاین",
    description: "سلام، در هنگام پرداخت آنلاین برای شارژ کیف پول با خطا مواجه می‌شوم. لطفاً پیگیری کنید.",
    category: "financial",
    priority: "high",
    status: "in-progress",
    createdAt: "1404/11/15 10:30",
    updatedAt: "1404/11/15 14:20",
    responses: [
      {
        id: "res1",
        ticketId: "ticket1",
        userId: "admin1",
        userName: "پشتیبانی",
        userRole: "admin",
        message: "سلام، تیکت شما در دست بررسی است. لطفاً کد رهگیری تراکنش را ارسال کنید.",
        createdAt: "1404/11/15 11:00",
      },
      {
        id: "res2",
        ticketId: "ticket1",
        userId: "student1",
        userName: "علی احمدی",
        userRole: "student",
        message: "کد رهگیری: 123456789",
        createdAt: "1404/11/15 14:20",
      },
    ],
  },
  {
    id: "ticket2",
    userId: "student2",
    userName: "زهرا رضایی",
    subject: "رزرو غذا لغو نمی‌شود",
    description: "رزرو شام امروز را انجام دادم ولی نمی‌توانم آن را لغو کنم.",
    category: "reservation",
    priority: "medium",
    status: "resolved",
    createdAt: "1404/11/14 16:00",
    updatedAt: "1404/11/14 18:00",
    responses: [
      {
        id: "res3",
        ticketId: "ticket2",
        userId: "admin1",
        userName: "پشتیبانی",
        userRole: "admin",
        message: "سلام، مهلت لغو رزرو ۴ ساعت قبل از وعده غذایی می‌باشد. متاسفانه زمان لغو رزرو شما گذشته است.",
        createdAt: "1404/11/14 17:00",
      },
      {
        id: "res4",
        ticketId: "ticket2",
        userId: "student2",
        userName: "زهرا رضایی",
        userRole: "student",
        message: "متوجه شدم، ممنون.",
        createdAt: "1404/11/14 18:00",
      },
    ],
  },
  {
    id: "ticket3",
    userId: "student3",
    userName: "محمد حسینی",
    subject: "پیشنهاد هوش مصنوعی کار نمی‌کند",
    description: "در صفحه پیشنهاد هوشمند هیچ غذایی نمایش داده نمی‌شود.",
    category: "technical",
    priority: "low",
    status: "open",
    createdAt: "1404/11/16 09:00",
    updatedAt: "1404/11/16 09:00",
    responses: [],
  },
  {
    id: "ticket4",
    userId: "student1",
    userName: "علی احمدی",
    subject: "کیفیت غذای دیروز",
    description: "سلام، کیفیت زرشک‌پلو دیروز مناسب نبود. لطفاً پیگیری شود.",
    category: "food",
    priority: "medium",
    status: "closed",
    createdAt: "1404/11/13 20:00",
    updatedAt: "1404/11/14 10:00",
    responses: [
      {
        id: "res5",
        ticketId: "ticket4",
        userId: "admin1",
        userName: "پشتیبانی",
        userRole: "admin",
        message: "با سلام، موضوع به واحد آشپزخانه منتقل شد. از شما پوزش می‌خواهیم.",
        createdAt: "1404/11/14 10:00",
      },
    ],
  },
  {
    id: "ticket5",
    userId: "student4",
    userName: "فاطمه کریمی",
    subject: "درخواست غذای گیاهخواری",
    description: "آیا امکان اضافه کردن گزینه‌های غذایی گیاهخواری وجود دارد؟",
    category: "other",
    priority: "low",
    status: "in-progress",
    createdAt: "1404/11/12 14:00",
    updatedAt: "1404/11/15 16:00",
    responses: [
      {
        id: "res6",
        ticketId: "ticket5",
        userId: "admin1",
        userName: "پشتیبانی",
        userRole: "admin",
        message: "با سلام، درخواست شما به مدیریت سلف ارجاع داده شد. پس از بررسی به شما اطلاع داده خواهد شد.",
        createdAt: "1404/11/15 16:00",
      },
    ],
  },
];

// ---- Software Support Mock ----
export interface SoftwareVersion {
  version: string;
  releaseDate: string;
  changes: string[];
  isCurrent: boolean;
}

export interface SoftwareIssue {
  id: string;
  type: "bug" | "feature" | "improvement" | "question";
  version: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "submitted" | "under-review" | "in-progress" | "resolved" | "rejected";
  submittedBy: string;
  createdAt: string;
  updatedAt: string;
}

export const mockVersions: SoftwareVersion[] = [
  {
    version: "v2.1.0",
    releaseDate: "1404/11/10",
    isCurrent: true,
    changes: [
      "اضافه شدن سیستم پیشنهاد هوشمند غذا",
      "بهبود رابط کاربری پنل ادمین",
      "رفع باگ در سیستم پرداخت آنلاین",
      "اضافه شدن قابلیت تم تاریک",
    ],
  },
  {
    version: "v2.0.5",
    releaseDate: "1404/10/25",
    isCurrent: false,
    changes: [
      "بهینه‌سازی سرعت بارگذاری صفحات",
      "رفع مشکل نمایش جداول در موبایل",
      "اضافه شدن فیلتر پیشرفته در صفحه تاریخچه",
    ],
  },
  {
    version: "v2.0.0",
    releaseDate: "1404/10/01",
    isCurrent: false,
    changes: [
      "طراحی مجدد کامل رابط کاربری",
      "اضافه شدن پنل مدیریت موجودی انبار",
      "سیستم جدید گزارش‌گیری",
      "پشتیبانی از زبان فارسی و چیدمان راست به چپ",
    ],
  },
];

export const mockSoftwareIssues: SoftwareIssue[] = [
  {
    id: "issue1",
    type: "bug",
    version: "v2.1.0",
    title: "خطا در محاسبه موجودی انبار",
    description: "در صفحه موجودی انبار، تعداد برخی اقلام به درستی نمایش داده نمی‌شود.",
    priority: "high",
    status: "in-progress",
    submittedBy: "مدیر سلف دانشگاه تهران",
    createdAt: "1404/11/14 10:00",
    updatedAt: "1404/11/15 14:00",
  },
  {
    id: "issue2",
    type: "feature",
    version: "v2.1.0",
    title: "درخواست افزودن گزارش هفتگی",
    description: "امکان دریافت گزارش آماری هفتگی از فروش و رزروها به صورت خودکار.",
    priority: "medium",
    status: "under-review",
    submittedBy: "مدیر سلف دانشگاه شریف",
    createdAt: "1404/11/12 16:00",
    updatedAt: "1404/11/13 09:00",
  },
  {
    id: "issue3",
    type: "bug",
    version: "v2.0.5",
    title: "مشکل در صادر کردن فایل اکسل",
    description: "در صفحه حسابداری، فایل اکسل صادر شده خالی است.",
    priority: "critical",
    status: "resolved",
    submittedBy: "مدیر سلف دانشگاه صنعتی امیرکبیر",
    createdAt: "1404/11/08 11:00",
    updatedAt: "1404/11/10 15:00",
  },
  {
    id: "issue4",
    type: "improvement",
    version: "v2.1.0",
    title: "بهبود سیستم جستجو",
    description: "اضافه کردن قابلیت جستجوی پیشرفته در لیست دانشجویان.",
    priority: "low",
    status: "submitted",
    submittedBy: "مدیر سلف دانشگاه علم و صنعت",
    createdAt: "1404/11/16 08:30",
    updatedAt: "1404/11/16 08:30",
  },
];

// Helper functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export function getStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "delivered":
      return "default";
    case "paid":
      return "secondary";
    case "reserved":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "reserved":
      return "رزرو شده";
    case "paid":
      return "پرداخت شده";
    case "delivered":
      return "تحویل داده شده";
    case "cancelled":
      return "لغو شده";
    default:
      return status;
  }
}

export function getMealLabel(meal: string): string {
  switch (meal) {
    case "breakfast":
      return "صبحانه";
    case "lunch":
      return "ناهار";
    case "dinner":
      return "شام";
    default:
      return meal;
  }
}

export function getTransactionTypeLabel(type: string): string {
  switch (type) {
    case "payment":
      return "پرداخت";
    case "refund":
      return "بازگشت وجه";
    case "charge":
      return "شارژ";
    default:
      return type;
  }
}
