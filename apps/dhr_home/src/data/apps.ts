// import { AppData } from "./types";
// import { createMasirIcon, createZigoIcon, createTalentClubIcon } from "./icons";

// /**
//  * App data configuration
//  * 
//  * To add a new app:
//  * 1. Add a new object to this array with all required fields
//  * 2. If the app has an icon, create an icon function in icons.tsx and import it here
//  * 3. Make sure the category matches one of the categories in categories.ts
//  * 
//  * To remove an app:
//  * 1. Simply remove its object from this array
//  */
// export const apps: AppData[] = [
//   {
//     name: "سامانه فانوس",
//     englishName: "Fanous System",
//     keywords: ["fanous", "request", "administrative", "system", "management"],
//     bgColor: "rgba(0,0,0,0.1)",
//     description: "سامانه مدیریت و پیگیری درخواست‌های اداری",
//     icon: null,
//     category: "درخواست‌های اداری",
//     url: "/apps/fanous",
//   },
//   {
//     name: "مسیر",
//     englishName: "Masir",
//     keywords: ["masir", "navigation", "guidance", "platform", "workflow"],
//     bgColor: "#ed1944",
//     description:
//       "پلتفرم مسیریابی و هدایت کارکنان برای بهبود فرآیندهای سازمانی و افزایش بهره‌وری",
//     icon: createMasirIcon(),
//     category: "پلتفرم‌ها",
//     url: "/apps/masir",
//   },
  // {
  //   name: "زیگو",
  //   englishName: "Zigo",
  //   keywords: ["zigo", "ai", "artificial intelligence", "assistant", "chatbot", "qa", "question answer"],
  //   bgColor: "#ed1944",
  //   description:
  //     "دستیار هوشمند و سامانه پرسش و پاسخ مبتنی بر هوش مصنوعی برای پاسخگویی سریع به سوالات کارکنان و بهبود ارتباطات داخلی سازمان",
  //   icon: createZigoIcon(),
  //   category: "پلتفرم‌ها",
  //   url: "/apps/zigo",
  // },
//   {
//     name: "تلنت‌کلاب",
//     englishName: "Talent Club",
//     keywords: ["talent", "club", "recruitment", "skills", "development", "talent management"],
//     bgColor: "#875bf7",
//     description: "پلتفرم استعدادیابی و توسعه مهارت",
//     icon: createTalentClubIcon(),
//     category: "پلتفرم‌ها",
//     url: "/apps/talentclub",
//   },
//   {
//     name: "کدوس‌کلاب",
//     englishName: "Kudos Club",
//     keywords: ["kudos", "club", "developers", "programmers", "community", "code", "coding"],
//     bgColor: "rgba(0,0,0,0.1)",
//     description: "انجمن توسعه‌دهندگان و برنامه‌نویسان",
//     icon: null,
//     category: "ارتباطات داخلی",
//     url: "/apps/codeusclub",
//   },
//   {
//     name: "پورتال کارکنان",
//     englishName: "Employee Portal",
//     keywords: ["portal", "employee", "staff", "profile", "attendance", "announcement"],
//     bgColor: "#2563eb",
//     description:
//       "دسترسی به اطلاعات و خدمات کارکنان شامل پروفایل، حضور و غیاب، و اطلاعیه‌های سازمانی",
//     icon: null,
//     category: "مستندات",
//     url: "/apps/portal",
//   },
//   {
//     name: "سیستم مالی",
//     englishName: "Financial System",
//     keywords: ["financial", "accounting", "finance", "money", "account"],
//     bgColor: "#059669",
//     description: "مدیریت امور مالی و حسابداری",
//     icon: null,
//     category: "مستندات",
//     url: "/apps/financial",
//   },
//   {
//     name: "منابع انسانی",
//     englishName: "Human Resources",
//     keywords: ["hr", "human resources", "personnel", "staff management"],
//     bgColor: "#dc2626",
//     description: "سامانه مدیریت منابع انسانی",
//     icon: null,
//     category: "مستندات",
//     url: "/apps/hr",
//   },
//   {
//     name: "درخواست مرخصی",
//     englishName: "Leave Request",
//     keywords: ["leave", "vacation", "holiday", "time off", "request"],
//     bgColor: "#7c3aed",
//     description: "ثبت و پیگیری درخواست‌های مرخصی",
//     icon: null,
//     category: "درخواست‌های اداری",
//     url: "/apps/leave",
//   },
//   {
//     name: "آموزش آنلاین",
//     englishName: "Online Training",
//     keywords: ["training", "education", "course", "learning", "online"],
//     bgColor: "#ea580c",
//     description: "پلتفرم دوره‌های آموزشی کارکنان",
//     icon: null,
//     category: "مستندات",
//     url: "/apps/training",
//   },
//   {
//     name: "گزارش‌گیری",
//     englishName: "Reporting",
//     keywords: ["report", "reporting", "analytics", "data", "statistics"],
//     bgColor: "#0891b2",
//     description: "سیستم تهیه و مشاهده گزارش‌ها",
//     icon: null,
//     category: "ابزارها",
//     url: "/apps/reporting",
//   },
//   {
//     name: "پشتیبانی فنی",
//     englishName: "Technical Support",
//     keywords: ["support", "technical", "help", "assistance", "it support"],
//     bgColor: "#be123c",
//     description: "ارتباط با واحد پشتیبانی فنی",
//     icon: null,
//     category: "ابزارها",
//     url: "/apps/support",
//   },
//   {
//     name: "سیستم تیکتینگ",
//     englishName: "Ticketing System",
//     keywords: ["ticket", "ticketing", "issue", "problem", "support ticket"],
//     bgColor: "#16a34a",
//     description:
//       "ثبت و پیگیری درخواست‌های پشتیبانی و رفع مشکلات فنی",
//     icon: null,
//     category: "ابزارها",
//     url: "/apps/ticketing",
//   },
//   {
//     name: "مدیریت پروژه",
//     englishName: "Project Management",
//     keywords: ["project", "management", "task", "team", "collaboration"],
//     bgColor: "#ca8a04",
//     description:
//       "ابزار مدیریت پروژه‌ها و وظایف تیمی برای هماهنگی بهتر و افزایش کارایی",
//     icon: null,
//     category: "ابزارها",
//     url: "/apps/projects",
//   },
//   {
//     name: "داشبورد تحلیلی",
//     englishName: "Analytics Dashboard",
//     keywords: ["dashboard", "analytics", "data", "statistics", "metrics", "kpi"],
//     bgColor: "#6366f1",
//     description: "داشبورد جامع برای تحلیل و گزارش‌گیری از داده‌های سازمانی",
//     icon: null,
//     category: "ابزارها",
//     url: "/apps/dashboard",
//   },
//   {
//     name: "تقویم سازمانی",
//     englishName: "Organizational Calendar",
//     keywords: ["calendar", "event", "schedule", "meeting", "appointment"],
//     bgColor: "#10b981",
//     description: "تقویم رویدادها و مناسبت‌های سازمانی",
//     icon: null,
//     category: "ابزارها",
//     url: "/apps/calendar",
//   },
//   {
//     name: "سیستم حقوق و دستمزد",
//     englishName: "Payroll System",
//     keywords: ["payroll", "salary", "wage", "payment", "compensation"],
//     bgColor: "#f59e0b",
//     description: "مدیریت حقوق، دستمزد و مزایای کارکنان",
//     icon: null,
//     category: "مستندات",
//     url: "/apps/payroll",
//   },
//   {
//     name: "ارزیابی عملکرد",
//     englishName: "Performance Evaluation",
//     keywords: ["performance", "evaluation", "review", "assessment", "appraisal"],
//     bgColor: "#8b5cf6",
//     description: "سیستم ارزیابی و سنجش عملکرد کارکنان",
//     icon: null,
//     category: "مستندات",
//     url: "/apps/performance",
//   },
//   {
//     name: "مدیریت دارایی",
//     englishName: "Asset Management",
//     keywords: ["asset", "management", "inventory", "equipment", "property"],
//     bgColor: "#06b6d4",
//     description: "ثبت و مدیریت دارایی‌های سازمانی",
//     icon: null,
//     category: "مستندات",
//     url: "/apps/assets",
//   },
//   {
//     name: "سیستم حضور و غیاب",
//     englishName: "Attendance System",
//     keywords: ["attendance", "check in", "check out", "time tracking", "clock"],
//     bgColor: "#ef4444",
//     description: "ثبت و مدیریت حضور و غیاب کارکنان",
//     icon: null,
//     category: "درخواست‌های اداری",
//     url: "/apps/attendance",
//   },
//   {
//     name: "درخواست مرخصی استعلاجی",
//     englishName: "Sick Leave Request",
//     keywords: ["sick leave", "medical leave", "illness", "health"],
//     bgColor: "#14b8a6",
//     description: "ثبت و پیگیری درخواست‌های مرخصی استعلاجی",
//     icon: null,
//     category: "درخواست‌های اداری",
//     url: "/apps/sick-leave",
//   },
//   {
//     name: "درخواست ماموریت",
//     englishName: "Business Trip Request",
//     keywords: ["mission", "business trip", "travel", "assignment"],
//     bgColor: "#f97316",
//     description: "ثبت و تایید درخواست‌های ماموریت کاری",
//     icon: null,
//     category: "درخواست‌های اداری",
//     url: "/apps/mission",
//   },
//   {
//     name: "سیستم تایم شیت",
//     englishName: "Timesheet System",
//     keywords: ["timesheet", "time tracking", "hours", "work log", "time entry"],
//     bgColor: "#3b82f6",
//     description: "ثبت و مدیریت زمان‌بندی کارها و پروژه‌ها",
//     icon: null,
//     category: "ابزارها",
//     url: "/apps/timesheet",
//   },
//   {
//     name: "مدیریت مخاطبین",
//     englishName: "Contact Management",
//     keywords: ["contact", "address book", "directory", "people"],
//     bgColor: "#a855f7",
//     description: "سیستم مدیریت و نگهداری اطلاعات مخاطبین سازمانی",
//     icon: null,
//     category: "ارتباطات داخلی",
//     url: "/apps/contacts",
//   },
//   {
//     name: "انجمن کارکنان",
//     englishName: "Employee Community",
//     keywords: ["community", "forum", "social", "employee network"],
//     bgColor: "#ec4899",
//     description: "پلتفرم تعامل و ارتباط بین کارکنان سازمان",
//     icon: null,
//     category: "ارتباطات داخلی",
//     url: "/apps/community",
//   },
//   {
//     name: "سیستم نظرسنجی",
//     englishName: "Survey System",
//     keywords: ["survey", "poll", "questionnaire", "feedback", "vote"],
//     bgColor: "#84cc16",
//     description: "ایجاد و مدیریت نظرسنجی‌های سازمانی",
//     icon: null,
//     category: "ابزارها",
//     url: "/apps/survey",
//   },
//   {
//     name: "کتابخانه دیجیتال",
//     englishName: "Digital Library",
//     keywords: ["library", "document", "resource", "knowledge base", "documentation"],
//     bgColor: "#0ea5e9",
//     description: "دسترسی به منابع و مستندات سازمانی",
//     icon: null,
//     category: "مستندات",
//     url: "/apps/library",
//   },
//   {
//     name: "سیستم مدیریت دانش",
//     englishName: "Knowledge Management System",
//     keywords: ["knowledge", "km", "knowledge base", "wiki", "documentation"],
//     bgColor: "#64748b",
//     description: "ذخیره و مدیریت دانش سازمانی",
//     icon: null,
//     category: "مستندات",
//     url: "/apps/knowledge",
//   },
//   {
//     name: "پورتال مشتریان",
//     englishName: "Customer Portal",
//     keywords: ["customer", "portal", "client", "service"],
//     bgColor: "#d97706",
//     description: "دسترسی مشتریان به خدمات و اطلاعات",
//     icon: null,
//     category: "پلتفرم‌ها",
//     url: "/apps/customer-portal",
//   },
//   {
//     name: "سیستم CRM",
//     englishName: "CRM System",
//     keywords: ["crm", "customer relationship", "sales", "client management"],
//     bgColor: "#be185d",
//     description: "مدیریت ارتباط با مشتریان و فروش",
//     icon: null,
//     category: "پلتفرم‌ها",
//     url: "/apps/crm",
//   },
//   {
//     name: "پلتفرم همکاری",
//     englishName: "Collaboration Platform",
//     keywords: ["collaboration", "teamwork", "cooperation", "team"],
//     bgColor: "#059669",
//     description: "ابزارهای همکاری و کار تیمی",
//     icon: null,
//     category: "پلتفرم‌ها",
//     url: "/apps/collaboration",
//   },
// ];


// ---------------------------------------------------------------------
// import { AppData } from "./types";
// import { fetchAppsFromStrapi } from "./api";

// export let apps: AppData[] = [];

// /**
//  * Load apps from Strapi
//  */
// export async function loadApps() {
//   apps = await fetchAppsFromStrapi();
// }


// ---------------
import { AppData } from "./types";
import { fetchAppsFromStrapi } from "./api";

export let apps: AppData[] = [];

export async function loadApps() {
  apps = await fetchAppsFromStrapi();
}