# 🇸🇦 منصة أم رهام للخدمات الأكاديمية والبحثية
### Umm Reham Academic & Educational Platform

منصة رقمية سعودية متكاملة لتقديم الخدمات والاستشارات الأكاديمية والبحثية، وإعداد رسائل الماجستير والدكتوراه، ومشاريع التخرج والتحليل الإحصائي، مبنية بأحدث معايير الويب الفاخرة والتصميم المتجاوب.

---

## 🛠️ البنية التقنية (Tech Stack)

### 1. واجهة المستخدم (Frontend)
- **Framework**: Angular 19+ (Standalone Components, Signals, Reactive Forms).
- **Styling**: SCSS بتصميم فاخر مستوحى من الهوية الوطنية السعودية وموقع `learnspace.sa`.
- **Themes**: نظام ألوان رباعي متفاعل (`Emerald & Gold`, `White & Green`, `Emerald Night Dark Mode`, `Forest & Bronze`).
- **Interactive Map**: Leaflet.js تفاعلي مع تغطية شاملة لكافة جامعات ومناطق المملكة.
- **AI Dual Agents**: مساعدان أذكياء تفاعليان (سعود وفرح).

### 2. الواجهة الخلفية وقاعدة البيانات (Backend & Database)
- **Framework**: ASP.NET Core Web API (.NET 9).
- **ORM**: Entity Framework Core.
- **Database**: SQLite Database (`ummreham_dev.db`).
- **Architecture**: Clean Architecture (Domain, Application, Infrastructure, API).
- **Admin Dashboard**: لوحة تحكم وإدارة محتوى شاملة (Headless CMS, Services, Orders, Portfolio, Reviews, Settings).

---

## 🚀 تشغيل المشروع محلياً (Run Locally)

### تشغيل الواجهة الخلفية (Backend)
```bash
cd backend
dotnet restore
dotnet run --project src/UmmReham.API
```
السيرفر سيعمل على: `http://localhost:5073`

### تشغيل الواجهة الأمامية (Frontend)
```bash
cd frontend
npm install
npm start
```
الموقع سيعمل على: `http://localhost:4200`
لوحة التحكم الإدارية: `http://localhost:4200/admin`
