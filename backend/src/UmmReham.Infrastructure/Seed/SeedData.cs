using UmmReham.Domain.Entities;
using UmmReham.Infrastructure.Data;

namespace UmmReham.Infrastructure.Seed;

public static class SeedData
{
    public static async Task SeedAsync(AppDbContext context)
    {
        // If already updated to the 4 official categories, do nothing
        var hasSchools = context.Categories.Any(c => c.Slug == "schools");
        var hasUniversity = context.Categories.Any(c => c.Slug == "university");
        if (hasSchools && hasUniversity && context.Services.Count() >= 35)
        {
            return;
        }

        // Clean up old categories and services if they are outdated
        if (context.Categories.Any(c => c.Slug == "academic-services" || c.Slug == "presentations-design") || !hasSchools)
        {
            context.Services.RemoveRange(context.Services);
            context.Categories.RemoveRange(context.Categories);
            await context.SaveChangesAsync();
        }

        // ========================
        // 1. ADMIN USER
        // ========================
        if (!context.AppUsers.Any())
        {
            var admin = new AppUser
            {
                Username = "admin",
                Email = "admin@ummreham.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                FullName = "مدير النظام",
                Role = "super_admin"
            };
            context.AppUsers.Add(admin);
            await context.SaveChangesAsync();
        }

        // ========================
        // 2. OFFICIAL CATEGORIES (الأقسام الأربعة الأساسية)
        // ========================
        var catSchools = new Category
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            NameAr = "خدمات طلاب المدارس",
            NameEn = "School Students Services",
            Slug = "schools",
            DescriptionAr = "حل الواجبات المدرسية، المطويات، بحوث النشاط، الخرائط الذهنية، ومشاريع المقررات",
            IconSvg = "🎒",
            SortOrder = 1,
            IsActive = true
        };

        var catUniversity = new Category
        {
            Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
            NameAr = "الخدمات الجامعية",
            NameEn = "University Services",
            Slug = "university",
            DescriptionAr = "بحوث علمية محكمة، رسائل الماجستير والدكتوراه، مشاريع التخرج، والتحليل الإحصائي",
            IconSvg = "🎓",
            SortOrder = 2,
            IsActive = true
        };

        var catOffice = new Category
        {
            Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
            NameAr = "الخدمات المكتبية",
            NameEn = "Office Services",
            Slug = "office",
            DescriptionAr = "تنسيق وطباعة الرسائل، تدقيق لغوي، فحص Turnitin، تفريغ صوتي، وترجمة معتمدة",
            IconSvg = "📑",
            SortOrder = 3,
            IsActive = true
        };

        var catGeneral = new Category
        {
            Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
            NameAr = "الخدمات العامة",
            NameEn = "General Services",
            Slug = "general",
            DescriptionAr = "التسجيل في حساب المواطن، الضمان المطور، منصة إيجار، طاقات، جدارات، العنوان الوطني، وفك الحظر",
            IconSvg = "🏛️",
            SortOrder = 4,
            IsActive = true
        };

        context.Categories.AddRange(catSchools, catUniversity, catOffice, catGeneral);
        await context.SaveChangesAsync();

        // ========================
        // 3. ALL OFFICIAL SERVICES (الـ 40 خدمة المعتمدة)
        // ========================
        var services = new List<Service>
        {
            // ----------------------------------------------------
            // أ. الخدمات الجامعية / الطلابية الأساسية (12 خدمة)
            // ----------------------------------------------------
            new() {
                CategoryId = catUniversity.Id, NameAr = "بحث", NameEn = "Academic Research", Slug = "academic-research",
                ShortDescriptionAr = "كتابة وإعداد البحوث العلمية والجامعية المحكمة وفق اشتراطات جامعتك وأدلة التوثيق الرسمية (APA 7th & Harvard).",
                PriceType = "quote", PriceCurrency = "SAR", EstimatedDuration = "2-5 أيام", SortOrder = 1, IsFeatured = true
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "عرض تقديمي", NameEn = "Presentation", Slug = "presentation",
                ShortDescriptionAr = "تصميم عروض تقديمية تفاعلية واحترافية وبوربوينت سينمائي للمناقشات الأكاديمية والندوات والمشاريع.",
                PriceType = "fixed", PriceMin = 45, PriceMax = 90, PriceCurrency = "SAR", EstimatedDuration = "24-48 ساعة", SortOrder = 2, IsFeatured = true,
                AvailableOptions = "[{\"id\":\"tpl-ppt-1\",\"code\":\"PPT-01\",\"nameAr\":\"عرض أكاديمي كلاسيكي هادئ\",\"price\":45,\"isPopular\":false},{\"id\":\"tpl-ppt-2\",\"code\":\"PPT-02\",\"nameAr\":\"عرض سينمائي تفاعلي متقدم\",\"price\":75,\"isPopular\":true},{\"id\":\"tpl-ppt-3\",\"code\":\"PPT-03\",\"nameAr\":\"عرض إنفوجرافيك للمؤتمرات\",\"price\":90,\"isPopular\":false},{\"id\":\"tpl-ppt-4\",\"code\":\"PPT-04\",\"nameAr\":\"عرض مشاريع التخرج والأعمال\",\"price\":65,\"isPopular\":false}]"
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "تقرير ميداني", NameEn = "Field Report", Slug = "field-report",
                ShortDescriptionAr = "صياغة التقارير الميدانية والتطبيقية وتوثيق الزيارات والملاحظات وفق الهيكلة الأكاديمية المعتمدة.",
                PriceType = "quote", PriceCurrency = "SAR", EstimatedDuration = "2-4 أيام", SortOrder = 3, IsFeatured = false
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "تقرير تدريب", NameEn = "Internship Report", Slug = "internship-report",
                ShortDescriptionAr = "إعداد تقارير التدريب التعاوني والامتياز المهني شاملة المهام المنجزة، التحديات، والتوصيات لجهات التدريب.",
                PriceType = "quote", PriceCurrency = "SAR", EstimatedDuration = "3-5 أيام", SortOrder = 4, IsFeatured = true
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "تقرير صيفي", NameEn = "Summer Training Report", Slug = "summer-training-report",
                ShortDescriptionAr = "كتابة تقارير التدريب الصيفي للطلاب وفق اشتراطات الكليات والمعاهد مع الجداول والملاحق الرسمية.",
                PriceType = "quote", PriceCurrency = "SAR", EstimatedDuration = "2-4 أيام", SortOrder = 5, IsFeatured = false
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "مشروع تخرج", NameEn = "Graduation Project", Slug = "graduation-project",
                ShortDescriptionAr = "إعداد ومتابعة مشاريع التخرج المتكاملة (كتابة التقرير الشامل، التحليل المنهجي، وبناء الحل التقني أو الإداري).",
                PriceType = "quote", PriceCurrency = "SAR", EstimatedDuration = "حسب خطة المشروع", SortOrder = 6, IsFeatured = true
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "واجب صغير", NameEn = "Small Assignment", Slug = "small-assignment",
                ShortDescriptionAr = "حل التكاليف الجامعية السريعة والأسئلة المقالية والأنشطة الأسبوعية بدقة وسرعة تسليم.",
                PriceType = "fixed", PriceMin = 25, PriceMax = 25, PriceCurrency = "SAR", EstimatedDuration = "خلال 12-24 ساعة", SortOrder = 7, IsFeatured = true
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "واجب اكسل", NameEn = "Excel Assignment", Slug = "excel-assignment",
                ShortDescriptionAr = "حل تمارين الإكسل والمعادلات والدوال المحاسبية والإحصائية وتنسيق الجداول بشكل احترافي.",
                PriceType = "fixed", PriceMin = 35, PriceMax = 35, PriceCurrency = "SAR", EstimatedDuration = "نفس اليوم", SortOrder = 8, IsFeatured = false
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "مشروع اكسل", NameEn = "Excel Project", Slug = "excel-project",
                ShortDescriptionAr = "بناء مشاريع إكسل متقدمة، لوحات تحكم تفاعلية (Dashboards)، ونماذج تحليل مالي وإداري ذكية.",
                PriceType = "fixed", PriceMin = 120, PriceMax = 120, PriceCurrency = "SAR", EstimatedDuration = "24-48 ساعة", SortOrder = 9, IsFeatured = true
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "سيرة ذاتية", NameEn = "Professional CV ATS", Slug = "professional-cv-ats",
                ShortDescriptionAr = "صياغة وتصميم السيرة الذاتية بنظام ATS المتوافق مع الشركات وجهات التوظيف، متوفرة بعدة نماذج وتصاميم راقية.",
                PriceType = "fixed", PriceMin = 35, PriceMax = 70, PriceCurrency = "SAR", EstimatedDuration = "24 ساعة", SortOrder = 10, IsFeatured = true,
                AvailableOptions = "[{\"id\":\"tpl-cv-1\",\"code\":\"CV-01\",\"nameAr\":\"السيرة الكلاسيكية الذهبية ATS\",\"price\":35,\"isPopular\":false},{\"id\":\"tpl-cv-2\",\"code\":\"CV-02\",\"nameAr\":\"السيرة الحديثة الإنفوجرافيك التنفيذية\",\"price\":55,\"isPopular\":true},{\"id\":\"tpl-cv-3\",\"code\":\"CV-03\",\"nameAr\":\"السيرة الأكاديمية والطبية المفصلة\",\"price\":70,\"isPopular\":false},{\"id\":\"tpl-cv-4\",\"code\":\"CV-04\",\"nameAr\":\"السيرة التقنية وهندسة البرمجيات\",\"price\":60,\"isPopular\":false}]"
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "بروتوفوليو", NameEn = "Portfolio Design", Slug = "portfolio-design",
                ShortDescriptionAr = "تصميم ملف الأعمال التعريفي (Portfolio) لاستعراض إنجازاتك ومشاريعك السابقة بجاذبية بصرية ملفتة.",
                PriceType = "fixed", PriceMin = 85, PriceMax = 180, PriceCurrency = "SAR", EstimatedDuration = "2-4 أيام", SortOrder = 11, IsFeatured = true,
                AvailableOptions = "[{\"id\":\"tpl-port-1\",\"code\":\"PORT-01\",\"nameAr\":\"ملف أعمال تفاعلي رقمي PDF\",\"price\":85,\"isPopular\":false},{\"id\":\"tpl-port-2\",\"code\":\"PORT-02\",\"nameAr\":\"بورتفوليو استعراضي تنفيذي مميز\",\"price\":140,\"isPopular\":true},{\"id\":\"tpl-port-3\",\"code\":\"PORT-03\",\"nameAr\":\"بورتفوليو هندسي ومعماري شامل\",\"price\":180,\"isPopular\":false}]"
            },
            new() {
                CategoryId = catUniversity.Id, NameAr = "مواقع", NameEn = "Web Development", Slug = "web-development",
                ShortDescriptionAr = "تصميم وبرمجة مواقع ويب تعريفية وشخصية وسريعة متوافقة بالكامل مع كافة الشاشات والجوالات.",
                PriceType = "fixed", PriceMin = 350, PriceMax = 950, PriceCurrency = "SAR", EstimatedDuration = "3-7 أيام", SortOrder = 12, IsFeatured = true,
                AvailableOptions = "[{\"id\":\"tpl-web-1\",\"code\":\"WEB-01\",\"nameAr\":\"موقع تعريفي صفحة واحدة (Landing Page)\",\"price\":350,\"isPopular\":false},{\"id\":\"tpl-web-2\",\"code\":\"WEB-02\",\"nameAr\":\"موقع بورتفوليو ويب شخصي تفاعلي\",\"price\":550,\"isPopular\":true},{\"id\":\"tpl-web-3\",\"code\":\"WEB-03\",\"nameAr\":\"موقع متكامل متعدد الصفحات والخدمات\",\"price\":950,\"isPopular\":false}]"
            },

            // ----------------------------------------------------
            // ب. الخدمات العامة (الـ 20 خدمة الرسمية بالأسعار المحددة)
            // ----------------------------------------------------
            new() { CategoryId = catGeneral.Id, NameAr = "التسجيل في حساب المواطن", Slug = "citizen-account-register",
                ShortDescriptionAr = "تسجيل دقيق في برنامج حساب المواطن مع إرفاق المستندات ومطابقة شروط الاستحقاق.",
                PriceType = "fixed", PriceMin = 25, PriceMax = 25, PriceCurrency = "SAR", EstimatedDuration = "خلال ساعات", SortOrder = 1, IsFeatured = true },

            new() { CategoryId = catGeneral.Id, NameAr = "رفع اعتراض في حساب المواطن أو تحديث البيانات", Slug = "citizen-account-appeal",
                ShortDescriptionAr = "صياغة ورفع الاعتراضات الرسمية وتحديث البيانات البنكية والتابعين لتفادي إسقاط الدعم.",
                PriceType = "fixed", PriceMin = 15, PriceMax = 15, PriceCurrency = "SAR", EstimatedDuration = "نفس اليوم", SortOrder = 2 },

            new() { CategoryId = catGeneral.Id, NameAr = "تسجيل حساب المواطن للعوائل", Slug = "citizen-account-families",
                ShortDescriptionAr = "تسجيل رب الأسرة وإضافة جميع التابعين بدقة والتأكد من تطابق الوثائق لضمان صدور الأهلية.",
                PriceType = "fixed", PriceMin = 70, PriceMax = 70, PriceCurrency = "SAR", EstimatedDuration = "نفس اليوم", SortOrder = 3, IsFeatured = true },

            new() { CategoryId = catGeneral.Id, NameAr = "التسجيل في طاقات وإكمال الملف 100%", Slug = "taqat-register",
                ShortDescriptionAr = "إنشاء وتحديث الحساب في منصة طاقات وإكمال الملف التعريفي بنسبة 100% للتأهل للبرامج الوظيفية.",
                PriceType = "fixed", PriceMin = 20, PriceMax = 20, PriceCurrency = "SAR", EstimatedDuration = "خلال ساعات", SortOrder = 4 },

            new() { CategoryId = catGeneral.Id, NameAr = "التسجيل في الضمان المطور بالتقرير الطبي", Slug = "daman-medical-report",
                ShortDescriptionAr = "تسجيل مستفيدي الضمان الاجتماعي المطور ورفع ومطابقة التقارير الطبية الرسمية مع اللجان.",
                PriceType = "fixed", PriceMin = 50, PriceMax = 50, PriceCurrency = "SAR", EstimatedDuration = "نفس اليوم", SortOrder = 5, IsFeatured = true },

            new() { CategoryId = catGeneral.Id, NameAr = "إضافة العقد الجديد في الضمان المطور", Slug = "daman-add-contract",
                ShortDescriptionAr = "ربط عقد الإيجار الجديد المسجل في منصة إيجار بحساب المستفيد في الضمان المطور فورياً.",
                PriceType = "fixed", PriceMin = 15, PriceMax = 15, PriceCurrency = "SAR", EstimatedDuration = "نفس اليوم", SortOrder = 6 },

            new() { CategoryId = catGeneral.Id, NameAr = "استخراج مشهد ضماني", Slug = "daman-certificate",
                ShortDescriptionAr = "استخراج مشهد إثبات مستفيد من الضمان الاجتماعي لتقديمه للجهات الحكومية والخاصة.",
                PriceType = "fixed", PriceMin = 10, PriceMax = 10, PriceCurrency = "SAR", EstimatedDuration = "فوري خلال دقائق", SortOrder = 7 },

            new() { CategoryId = catGeneral.Id, NameAr = "عقد إيجار مع التسجيل في الضمان المطور", Slug = "lease-contract-daman",
                ShortDescriptionAr = "توثيق عقد إيجار إلكتروني معتمد عبر إيجار مع التقديم الكامل والتسجيل في الضمان المطور.",
                PriceType = "fixed", PriceMin = 335, PriceMax = 335, PriceCurrency = "SAR", EstimatedDuration = "24 ساعة", SortOrder = 8, IsFeatured = true },

            new() { CategoryId = catGeneral.Id, NameAr = "عقد إيجار مع التسجيل في حساب المواطن", Slug = "lease-contract-citizen",
                ShortDescriptionAr = "توثيق عقد إيجار شبكة إيجار وربطه مباشرة بحساب المواطن لتأكيد استقلالية السكن.",
                PriceType = "fixed", PriceMin = 330, PriceMax = 330, PriceCurrency = "SAR", EstimatedDuration = "24 ساعة", SortOrder = 9, IsFeatured = true },

            new() { CategoryId = catGeneral.Id, NameAr = "تجديد عقد الإيجار مع التحديث", Slug = "lease-renewal-update",
                ShortDescriptionAr = "تجديد العقد الإلكتروني عبر شبكة إيجار وتحديث بياناته في كافة المنصات الداعمة.",
                PriceType = "fixed", PriceMin = 330, PriceMax = 330, PriceCurrency = "SAR", EstimatedDuration = "24 ساعة", SortOrder = 10 },

            new() { CategoryId = catGeneral.Id, NameAr = "عقد إيجار إلكتروني مع العنوان الوطني", Slug = "lease-contract-national-address",
                ShortDescriptionAr = "إصدار عقد إيجار موثق مع إنشاء وتطابق العنوان الوطني الرسمي عبر سبل.",
                PriceType = "fixed", PriceMin = 310, PriceMax = 310, PriceCurrency = "SAR", EstimatedDuration = "24 ساعة", SortOrder = 11 },

            new() { CategoryId = catGeneral.Id, NameAr = "إلغاء التجديد التلقائي للعقود", Slug = "cancel-auto-renewal",
                ShortDescriptionAr = "إيقاف وإلغاء التجديد التلقائي للعقود الإلكترونية قبل استحقاق الرسوم عبر منصة إيجار.",
                PriceType = "fixed", PriceMin = 10, PriceMax = 10, PriceCurrency = "SAR", EstimatedDuration = "فوري خلال دقائق", SortOrder = 12 },

            new() { CategoryId = catGeneral.Id, NameAr = "جدارات وإكمال الملف إلى 100%", Slug = "jadarat-profile",
                ShortDescriptionAr = "تسجيل وتوثيق المؤهلات والخبرات في المنصة الوطنية الموحدة للتوظيف (جدارات) واكتمال 100%.",
                PriceType = "fixed", PriceMin = 35, PriceMax = 35, PriceCurrency = "SAR", EstimatedDuration = "خلال ساعات", SortOrder = 13, IsFeatured = true },

            new() { CategoryId = catGeneral.Id, NameAr = "تحديث الضمان الاجتماعي للمسجلين بعقد إيجار", Slug = "daman-update-lease",
                ShortDescriptionAr = "تحديث وقبول العقد الجديد ومطابقة العنوان في منصة الضمان لتجنب تعليق الدفعات.",
                PriceType = "fixed", PriceMin = 20, PriceMax = 20, PriceCurrency = "SAR", EstimatedDuration = "نفس اليوم", SortOrder = 14 },

            new() { CategoryId = catGeneral.Id, NameAr = "التسجيل في التأهيل الشامل", Slug = "taheel-shamel",
                ShortDescriptionAr = "التقديم في إعانة التأهيل الشامل لذوي الإعاقة ورفع المستندات والتقارير الطبية المعتمدة.",
                PriceType = "fixed", PriceMin = 30, PriceMax = 30, PriceCurrency = "SAR", EstimatedDuration = "نفس اليوم", SortOrder = 15 },

            new() { CategoryId = catGeneral.Id, NameAr = "التسجيل في ساند", Slug = "saned-register",
                ShortDescriptionAr = "التقديم على تعويض التعطل عن العمل (ساند) عبر التأمينات الاجتماعية والتحقق من الأهلية.",
                PriceType = "fixed", PriceMin = 30, PriceMax = 30, PriceCurrency = "SAR", EstimatedDuration = "فوري ونفس اليوم", SortOrder = 16 },

            new() { CategoryId = catGeneral.Id, NameAr = "التسجيل في تمهير", Slug = "tamheer-register",
                ShortDescriptionAr = "التقديم في برنامج التدريب على رأس العمل (تمهير) لخريجي الدبلوم والبكالوريوس.",
                PriceType = "fixed", PriceMin = 40, PriceMax = 40, PriceCurrency = "SAR", EstimatedDuration = "نفس اليوم", SortOrder = 17 },

            new() { CategoryId = catGeneral.Id, NameAr = "إضافة تابع في الضمان الاجتماعي المطور", Slug = "daman-add-dependent",
                ShortDescriptionAr = "إضافة تابع جديد في ملف الضمان المطور مع رفع وثائق إثبات الصلة والسكن.",
                PriceType = "fixed", PriceMin = 20, PriceMax = 20, PriceCurrency = "SAR", EstimatedDuration = "نفس اليوم", SortOrder = 18 },

            new() { CategoryId = catGeneral.Id, NameAr = "عنوان وطني مطابق 100% عبر سبل", Slug = "national-address-spl",
                ShortDescriptionAr = "تسجيل وتحديث وتثبيت العنوان الوطني الرسمي عبر البريد السعودي (سبل) مطابق 100%.",
                PriceType = "fixed", PriceMin = 15, PriceMax = 15, PriceCurrency = "SAR", EstimatedDuration = "فوري خلال دقائق", SortOrder = 19 },

            new() { CategoryId = catGeneral.Id, NameAr = "فك حظر فوري بدون تسجيل", Slug = "unblock-instant",
                ShortDescriptionAr = "معالجة وفك الحظر في الأنظمة والمنصات وتصحيح سبب الإيقاف بشكل فوري.",
                PriceType = "fixed", PriceMin = 75, PriceMax = 75, PriceCurrency = "SAR", EstimatedDuration = "فوري", SortOrder = 20, IsFeatured = true },

            // ----------------------------------------------------
            // ج. خدمات طلاب المدارس (4 خدمات)
            // ----------------------------------------------------
            new() {
                CategoryId = catSchools.Id, NameAr = "حل الواجبات والمهام المدرسية", Slug = "school-homework",
                ShortDescriptionAr = "حلول نموذجية وشاملة لكافة الواجبات والأنشطة المدرسية لجميع المراحل الدراسية بدقة وتوضيح خطوات الحل.",
                PriceType = "fixed", PriceMin = 20, PriceMax = 20, PriceCurrency = "SAR", EstimatedDuration = "خلال ساعات", SortOrder = 1, IsFeatured = true
            },
            new() {
                CategoryId = catSchools.Id, NameAr = "المطويات والبحوث المدرسية والخرائط المفاهيمية", Slug = "school-brochures",
                ShortDescriptionAr = "تصميم مطويات إبداعية ملونة، بحوث أنشطة صفية مدعمة بالصور، ورسوم بيانية وخرائط ذهنية تسهل الفهم.",
                PriceType = "fixed", PriceMin = 30, PriceMax = 30, PriceCurrency = "SAR", EstimatedDuration = "24 ساعة", SortOrder = 2, IsFeatured = true
            },
            new() {
                CategoryId = catSchools.Id, NameAr = "عروض بوربوينت مدرسية تفاعلية", Slug = "school-presentations",
                ShortDescriptionAr = "تصميم عروض تقديمية مدرسية شيقة ومتحركة تجذب انتباه المعلمين والطلاب مع مؤثرات صوتية وبصرية ملهمة.",
                PriceType = "fixed", PriceMin = 35, PriceMax = 35, PriceCurrency = "SAR", EstimatedDuration = "24 ساعة", SortOrder = 3, IsFeatured = false
            },
            new() {
                CategoryId = catSchools.Id, NameAr = "مشاريع مسارات الثانوية والتقارير الميدانية", Slug = "high-school-pathways",
                ShortDescriptionAr = "إعداد مشاريع التخرج لمسارات الثانوية العامة (عام، حاسب، صحة، إدارة أعمال) وفق معايير وزارة التعليم.",
                PriceType = "quote", PriceCurrency = "SAR", EstimatedDuration = "2-4 أيام", SortOrder = 4, IsFeatured = true
            },

            // ----------------------------------------------------
            // د. الخدمات المكتبية (4 خدمات)
            // ----------------------------------------------------
            new() {
                CategoryId = catOffice.Id, NameAr = "تنسيق الرسائل العلمية والكتب وفق أدلة الجامعات", Slug = "thesis-formatting",
                ShortDescriptionAr = "ضبط الهوامش، الفهارس الآلية، ترقيم الصفحات، مراجعة الجداول والأشكال وتوحيد الخطوط وفق دليل الجامعة المعتمد.",
                PriceType = "fixed", PriceMin = 100, PriceMax = 100, PriceCurrency = "SAR", EstimatedDuration = "24-48 ساعة", SortOrder = 1, IsFeatured = true
            },
            new() {
                CategoryId = catOffice.Id, NameAr = "التدقيق اللغوي وفحص الاقتباس (Turnitin)", Slug = "proofreading-plagiarism",
                ShortDescriptionAr = "مراجعة نحوية وإملائية دقيقة وإصلاح أسلوب الصياغة، مع فحص نسبة الانتحال الأدبي عبر تيرنتين الرسمي 0%.",
                PriceType = "fixed", PriceMin = 50, PriceMax = 50, PriceCurrency = "SAR", EstimatedDuration = "24 ساعة", SortOrder = 2, IsFeatured = true
            },
            new() {
                CategoryId = catOffice.Id, NameAr = "التفريغ الصوتي وتحويل الملفات بدقة 100%", Slug = "transcription-conversion",
                ShortDescriptionAr = "تفريغ المحاضرات والمقابلات الصوتية وتنسيق النصوص، وتحويل مستندات PDF الممسوحة ضوئياً إلى ملفات Word منسقة.",
                PriceType = "fixed", PriceMin = 30, PriceMax = 30, PriceCurrency = "SAR", EstimatedDuration = "24 ساعة", SortOrder = 3, IsFeatured = false
            },
            new() {
                CategoryId = catOffice.Id, NameAr = "الترجمة الأكاديمية والمهنية المعتمدة", Slug = "academic-translation",
                ShortDescriptionAr = "ترجمة بشرية متخصصة ومصقولة للملخصات والبحوث والوثائق من وإلى الإنجليزية مع الحفاظ على المصطلحات العلمية.",
                PriceType = "fixed", PriceMin = 45, PriceMax = 45, PriceCurrency = "SAR", EstimatedDuration = "2-4 أيام", SortOrder = 4, IsFeatured = false
            }
        };

        context.Services.AddRange(services);
        await context.SaveChangesAsync();

        // ========================
        // 4. STATISTICS
        // ========================
        if (!context.Statistics.Any())
        {
            context.Statistics.AddRange(
                new Statistic { LabelAr = "قصة نجاح ساعدنا فيها", LabelEn = "Success Stories", Value = "+25,000", Section = "hero", SortOrder = 1 },
                new Statistic { LabelAr = "مشروع أكاديمي منجز", LabelEn = "Academic Projects", Value = "+1,500", Section = "hero", SortOrder = 2 },
                new Statistic { LabelAr = "مدينة داخل المملكة", LabelEn = "Cities Served", Value = "+40", Section = "hero", SortOrder = 3 },
                new Statistic { LabelAr = "خدمة تعليمية وبحثية", LabelEn = "Services", Value = "+137", Section = "hero", SortOrder = 4 },
                new Statistic { LabelAr = "نسبة رضا عملائنا", LabelEn = "Satisfaction Rate", Value = "98%", Section = "trust", SortOrder = 1 }
            );
            await context.SaveChangesAsync();
        }

        // ========================
        // 5. SITE SETTINGS
        // ========================
        if (!context.SiteSettings.Any())
        {
            context.SiteSettings.AddRange(
                new SiteSetting { Key = "site_name_ar", Value = "أم رهام", ValueType = "text", GroupName = "general", DescriptionAr = "اسم الموقع بالعربي" },
                new SiteSetting { Key = "site_name_en", Value = "Umm Reham", ValueType = "text", GroupName = "general", DescriptionAr = "اسم الموقع بالإنجليزي" },
                new SiteSetting { Key = "site_tagline_ar", Value = "تعليم • تطوير • استشارات", ValueType = "text", GroupName = "general", DescriptionAr = "شعار الموقع" },
                new SiteSetting { Key = "site_description_ar", Value = "منصة سعودية رائدة في الخدمات التعليمية والبحثية. نجمع بين الأصالة والمعرفة، ونحوّل أفكارك إلى إنجازات حقيقية", ValueType = "text", GroupName = "general" },
                new SiteSetting { Key = "whatsapp_number", Value = "966572651058", ValueType = "text", GroupName = "contact", DescriptionAr = "رقم الواتساب" },
                new SiteSetting { Key = "contact_email", Value = "info@ummreham.com", ValueType = "text", GroupName = "contact", DescriptionAr = "البريد الإلكتروني" },
                new SiteSetting { Key = "hero_subtitle_ar", Value = "معرفة تُصنع الفرق.. ودقة تبني الثقة.", ValueType = "text", GroupName = "hero" },
                new SiteSetting { Key = "hero_description_ar", Value = "نقدم خدمات تعليمية وبحثية متكاملة تجمع بين الأصالة، الدقة، التميز والابتكار", ValueType = "text", GroupName = "hero" }
            );
            await context.SaveChangesAsync();
        }
    }
}
