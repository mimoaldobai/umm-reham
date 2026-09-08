using UmmReham.Domain.Entities;
using UmmReham.Infrastructure.Data;

namespace UmmReham.Infrastructure.Seed;

public static class SeedData
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (context.Categories.Any()) return; // Already seeded

        // ========================
        // ADMIN USER
        // ========================
        var admin = new AppUser
        {
            Username = "admin",
            Email = "admin@ummreham.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            FullName = "مدير النظام",
            Role = "super_admin"
        };
        context.AppUsers.Add(admin);

        // ========================
        // CATEGORIES
        // ========================
        var catAcademic = new Category
        {
            NameAr = "الخدمات الأكاديمية",
            NameEn = "Academic Services",
            Slug = "academic-services",
            DescriptionAr = "خدمات أكاديمية شاملة تشمل البحوث العلمية والتقارير ومشاريع التخرج والواجبات والتلخيص والدراسات العليا",
            IconSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M22 10v6M2 10l10-5 10 5-10 5z'/><path d='M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5'/></svg>",
            SortOrder = 1
        };

        var catDesign = new Category
        {
            NameAr = "العروض والتصميم",
            NameEn = "Presentations & Design",
            Slug = "presentations-design",
            DescriptionAr = "العروض التقديمية وتصميم المشاريع والـ Portfolio والتصاميم الأكاديمية",
            IconSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect x='2' y='3' width='20' height='14' rx='2'/><path d='M8 21h8M12 17v4'/></svg>",
            SortOrder = 2
        };

        var catTech = new Category
        {
            NameAr = "التقنية والبرمجة",
            NameEn = "Technology & Programming",
            Slug = "technology-programming",
            DescriptionAr = "البرمجة والمشاريع التقنية والذكاء الاصطناعي وتحليل البيانات",
            IconSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><polyline points='16 18 22 12 16 6'/><polyline points='8 6 2 12 8 18'/></svg>",
            SortOrder = 3
        };

        var catCareer = new Category
        {
            NameAr = "المسار المهني",
            NameEn = "Career Path",
            Slug = "career-path",
            DescriptionAr = "السيرة الذاتية وتطوير الملف المهني والخدمات المرتبطة بالتقديم والمسار المهني",
            IconSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect x='2' y='7' width='20' height='14' rx='2'/><path d='M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2'/></svg>",
            SortOrder = 4
        };

        var catEducation = new Category
        {
            NameAr = "التعليم والتطوير",
            NameEn = "Education & Development",
            Slug = "education-development",
            DescriptionAr = "التعليم وتطوير المهارات والاستشارات التعليمية",
            IconSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/><path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/></svg>",
            SortOrder = 5
        };

        context.Categories.AddRange(catAcademic, catDesign, catTech, catCareer, catEducation);
        await context.SaveChangesAsync();

        // ========================
        // SERVICES
        // ========================
        var services = new List<Service>
        {
            // Academic Services
            new() { CategoryId = catAcademic.Id, NameAr = "البحوث العلمية", NameEn = "Scientific Research", Slug = "scientific-research",
                ShortDescriptionAr = "إعداد بحوث علمية متكاملة بأعلى معايير الجودة الأكاديمية",
                FullDescriptionAr = "نقدم خدمة إعداد البحوث العلمية بمختلف التخصصات مع الالتزام بالمنهجية العلمية الصحيحة والتوثيق الأكاديمي المعتمد",
                TargetAudienceAr = "طلاب البكالوريوس والماجستير والدكتوراه",
                RequirementsAr = "موضوع البحث، التخصص، عدد الصفحات، الموعد النهائي",
                PriceType = "range", PriceMin = 200, PriceMax = 2000, PriceCurrency = "SAR",
                EstimatedDuration = "3-14 يوم", SortOrder = 1, IsFeatured = true },

            new() { CategoryId = catAcademic.Id, NameAr = "التقارير", NameEn = "Reports", Slug = "reports",
                ShortDescriptionAr = "إعداد تقارير أكاديمية ومهنية احترافية",
                PriceType = "range", PriceMin = 100, PriceMax = 800,
                EstimatedDuration = "2-7 أيام", SortOrder = 2 },

            new() { CategoryId = catAcademic.Id, NameAr = "مشاريع التخرج", NameEn = "Graduation Projects", Slug = "graduation-projects",
                ShortDescriptionAr = "إعداد مشاريع تخرج متكاملة بجميع التخصصات",
                FullDescriptionAr = "نساعدك في إعداد مشروع تخرج متميز يشمل البحث والتحليل والتصميم والتنفيذ",
                TargetAudienceAr = "طلاب السنة الأخيرة في الجامعات",
                PriceType = "quote", SortOrder = 3, IsFeatured = true },

            new() { CategoryId = catAcademic.Id, NameAr = "الواجبات", NameEn = "Assignments", Slug = "assignments",
                ShortDescriptionAr = "حل واجبات ومهام أكاديمية بدقة واحترافية",
                PriceType = "range", PriceMin = 50, PriceMax = 500,
                EstimatedDuration = "1-5 أيام", SortOrder = 4 },

            new() { CategoryId = catAcademic.Id, NameAr = "التلخيص", NameEn = "Summarization", Slug = "summarization",
                ShortDescriptionAr = "تلخيص كتب ومراجع ومحاضرات بأسلوب أكاديمي",
                PriceType = "range", PriceMin = 50, PriceMax = 300,
                EstimatedDuration = "1-3 أيام", SortOrder = 5 },

            new() { CategoryId = catAcademic.Id, NameAr = "الدراسات العليا", NameEn = "Graduate Studies", Slug = "graduate-studies",
                ShortDescriptionAr = "خدمات متخصصة لطلاب الماجستير والدكتوراه",
                PriceType = "quote", SortOrder = 6, IsFeatured = true },

            new() { CategoryId = catAcademic.Id, NameAr = "الاستشارات الأكاديمية", NameEn = "Academic Consulting", Slug = "academic-consulting",
                ShortDescriptionAr = "استشارات أكاديمية متخصصة لمساعدتك في مسيرتك التعليمية",
                PriceType = "contact", SortOrder = 7 },

            // Design Services
            new() { CategoryId = catDesign.Id, NameAr = "العروض التقديمية", NameEn = "Presentations", Slug = "presentations",
                ShortDescriptionAr = "تصميم عروض تقديمية احترافية ومؤثرة",
                PriceType = "range", PriceMin = 100, PriceMax = 600,
                EstimatedDuration = "2-5 أيام", SortOrder = 1, IsFeatured = true },

            new() { CategoryId = catDesign.Id, NameAr = "تصميم المشاريع", NameEn = "Project Design", Slug = "project-design",
                ShortDescriptionAr = "تصميم مشاريع أكاديمية بأسلوب إبداعي واحترافي",
                PriceType = "quote", SortOrder = 2 },

            new() { CategoryId = catDesign.Id, NameAr = "التصاميم الأكاديمية", NameEn = "Academic Designs", Slug = "academic-designs",
                ShortDescriptionAr = "تصاميم أكاديمية متنوعة تشمل الإنفوجرافيك والملصقات",
                PriceType = "range", PriceMin = 80, PriceMax = 400,
                EstimatedDuration = "1-4 أيام", SortOrder = 3 },

            // Tech Services
            new() { CategoryId = catTech.Id, NameAr = "البرمجة", NameEn = "Programming", Slug = "programming",
                ShortDescriptionAr = "تطوير مشاريع برمجية وتطبيقات بمختلف اللغات",
                PriceType = "quote", SortOrder = 1, IsFeatured = true },

            new() { CategoryId = catTech.Id, NameAr = "المشاريع التقنية", NameEn = "Technical Projects", Slug = "technical-projects",
                ShortDescriptionAr = "تنفيذ مشاريع تقنية متكاملة من الفكرة إلى التسليم",
                PriceType = "quote", SortOrder = 2 },

            new() { CategoryId = catTech.Id, NameAr = "الذكاء الاصطناعي", NameEn = "Artificial Intelligence", Slug = "artificial-intelligence",
                ShortDescriptionAr = "مشاريع الذكاء الاصطناعي وتعلم الآلة",
                PriceType = "quote", SortOrder = 3 },

            new() { CategoryId = catTech.Id, NameAr = "تحليل البيانات", NameEn = "Data Analysis", Slug = "data-analysis",
                ShortDescriptionAr = "تحليل بيانات إحصائي وتقني باستخدام أحدث الأدوات",
                PriceType = "range", PriceMin = 200, PriceMax = 1500,
                EstimatedDuration = "3-10 أيام", SortOrder = 4 },

            // Career Services
            new() { CategoryId = catCareer.Id, NameAr = "السيرة الذاتية", NameEn = "Resume / CV", Slug = "resume-cv",
                ShortDescriptionAr = "إعداد سيرة ذاتية احترافية تبرز مهاراتك وخبراتك",
                PriceType = "range", PriceMin = 100, PriceMax = 400,
                EstimatedDuration = "1-3 أيام", SortOrder = 1, IsFeatured = true },

            new() { CategoryId = catCareer.Id, NameAr = "تطوير الملف المهني", NameEn = "Professional Profile", Slug = "professional-profile",
                ShortDescriptionAr = "تطوير ملفك المهني على LinkedIn والمنصات المهنية",
                PriceType = "quote", SortOrder = 2 },

            // Education Services
            new() { CategoryId = catEducation.Id, NameAr = "التعليم", NameEn = "Tutoring", Slug = "tutoring",
                ShortDescriptionAr = "دعم تعليمي شامل لجميع المراحل والتخصصات",
                PriceType = "contact", SortOrder = 1 },

            new() { CategoryId = catEducation.Id, NameAr = "تطوير المهارات", NameEn = "Skills Development", Slug = "skills-development",
                ShortDescriptionAr = "تطوير مهاراتك الأكاديمية والمهنية والشخصية",
                PriceType = "contact", SortOrder = 2 },

            new() { CategoryId = catEducation.Id, NameAr = "الاستشارات التعليمية", NameEn = "Educational Consulting", Slug = "educational-consulting",
                ShortDescriptionAr = "استشارات تعليمية متخصصة لتوجيهك في مسارك الأكاديمي",
                PriceType = "contact", SortOrder = 3 },
        };

        context.Services.AddRange(services);
        await context.SaveChangesAsync();

        // ========================
        // STATISTICS
        // ========================
        context.Statistics.AddRange(
            new Statistic { LabelAr = "قصة نجاح ساعدنا فيها", LabelEn = "Success Stories", Value = "+25,000", Section = "hero", SortOrder = 1 },
            new Statistic { LabelAr = "مشروع أكاديمي منجز", LabelEn = "Academic Projects", Value = "+1,500", Section = "hero", SortOrder = 2 },
            new Statistic { LabelAr = "مدينة داخل المملكة", LabelEn = "Cities Served", Value = "+40", Section = "hero", SortOrder = 3 },
            new Statistic { LabelAr = "خدمة تعليمية وبحثية", LabelEn = "Services", Value = "+137", Section = "hero", SortOrder = 4 },
            new Statistic { LabelAr = "نسبة رضا عملائنا", LabelEn = "Satisfaction Rate", Value = "98%", Section = "trust", SortOrder = 1 }
        );

        // ========================
        // SITE SETTINGS
        // ========================
        context.SiteSettings.AddRange(
            new SiteSetting { Key = "site_name_ar", Value = "أم رهام", ValueType = "text", GroupName = "general", DescriptionAr = "اسم الموقع بالعربي" },
            new SiteSetting { Key = "site_name_en", Value = "Umm Reham", ValueType = "text", GroupName = "general", DescriptionAr = "اسم الموقع بالإنجليزي" },
            new SiteSetting { Key = "site_tagline_ar", Value = "تعليم • تطوير • استشارات", ValueType = "text", GroupName = "general", DescriptionAr = "شعار الموقع" },
            new SiteSetting { Key = "site_description_ar", Value = "منصة سعودية رائدة في الخدمات التعليمية والبحثية. نجمع بين الأصالة والمعرفة، ونحوّل أفكارك إلى إنجازات حقيقية", ValueType = "text", GroupName = "general" },
            new SiteSetting { Key = "whatsapp_number", Value = "", ValueType = "text", GroupName = "contact", DescriptionAr = "رقم الواتساب" },
            new SiteSetting { Key = "contact_email", Value = "info@ummreham.com", ValueType = "text", GroupName = "contact", DescriptionAr = "البريد الإلكتروني" },
            new SiteSetting { Key = "hero_subtitle_ar", Value = "معرفة تُصنع الفرق.. ودقة تبني الثقة.", ValueType = "text", GroupName = "hero" },
            new SiteSetting { Key = "hero_description_ar", Value = "نقدم خدمات تعليمية وبحثية متكاملة تجمع بين الأصالة، الدقة، التميز والابتكار", ValueType = "text", GroupName = "hero" }
        );

        // ========================
        // AGENT RESPONSES (سعود وفرح)
        // ========================
        context.AgentResponses.AddRange(
            // سعود - Greeting
            new AgentResponse { AgentType = "saud", Intent = "greeting", TriggerKeywords = "[\"هلا\",\"مرحبا\",\"السلام\",\"اهلا\",\"هاي\"]",
                ResponseAr = "هلا وغلا! 👋 أنا سعود، مساعدك في الخدمات والأسعار. وش تحتاج اليوم؟",
                FollowUpOptions = "[{\"label\":\"معرفة السعر\",\"value\":\"pricing\",\"icon\":\"💰\"},{\"label\":\"طلب خدمة\",\"value\":\"service_request\",\"icon\":\"📋\"},{\"label\":\"استفسار\",\"value\":\"inquiry\",\"icon\":\"💬\"}]",
                Expression = "greeting", SortOrder = 1 },

            // سعود - Pricing
            new AgentResponse { AgentType = "saud", Intent = "pricing", TriggerKeywords = "[\"سعر\",\"كم\",\"تكلفة\",\"أسعار\",\"تسعير\",\"قيمة\"]",
                ResponseAr = "أكيد! 💰 عطني تفاصيل طلبك وبحسب لك الخيارات المتاحة. وش نوع الخدمة؟",
                FollowUpOptions = "[{\"label\":\"بحث علمي\",\"value\":\"research_pricing\",\"icon\":\"📚\"},{\"label\":\"مشروع تخرج\",\"value\":\"graduation_pricing\",\"icon\":\"🎓\"},{\"label\":\"عرض تقديمي\",\"value\":\"presentation_pricing\",\"icon\":\"🎨\"},{\"label\":\"برمجة\",\"value\":\"programming_pricing\",\"icon\":\"💻\"},{\"label\":\"سيرة ذاتية\",\"value\":\"cv_pricing\",\"icon\":\"📄\"}]",
                Expression = "explaining", SortOrder = 2 },

            // سعود - Service Request
            new AgentResponse { AgentType = "saud", Intent = "service_request", TriggerKeywords = "[\"طلب\",\"أبي\",\"أحتاج\",\"أريد\",\"ابغى\"]",
                ResponseAr = "ممتاز! 📋 خلني أساعدك تجهز طلبك. وش نوع الخدمة المطلوبة؟",
                Expression = "happy", SortOrder = 3 },

            // فرح - Greeting
            new AgentResponse { AgentType = "farah", Intent = "greeting", TriggerKeywords = "[\"هلا\",\"مرحبا\",\"السلام\",\"اهلا\"]",
                ResponseAr = "أهلاً! 😊 أنا فرح، مساعدتك الأكاديمية. خلّني أساعدك تختار الخدمة المناسبة لك.",
                FollowUpOptions = "[{\"label\":\"خدمة أكاديمية\",\"value\":\"academic\",\"icon\":\"🎓\"},{\"label\":\"بحث أو تقرير\",\"value\":\"research\",\"icon\":\"📚\"},{\"label\":\"برمجة وتقنية\",\"value\":\"tech\",\"icon\":\"💻\"},{\"label\":\"تصميم أو عرض\",\"value\":\"design\",\"icon\":\"🎨\"},{\"label\":\"سيرة ذاتية\",\"value\":\"cv\",\"icon\":\"📄\"},{\"label\":\"استشارة\",\"value\":\"consultation\",\"icon\":\"🧠\"}]",
                Expression = "greeting", SortOrder = 1 },

            // فرح - Research
            new AgentResponse { AgentType = "farah", Intent = "research", TriggerKeywords = "[\"بحث\",\"بحوث\",\"ورقة\",\"دراسة\",\"تقرير\"]",
                ResponseAr = "رائع! 📚 البحوث العلمية من أقوى خدماتنا. خلّني أعرف أكثر عن بحثك. وش تخصصك؟",
                Expression = "thinking", SortOrder = 2 },

            // فرح - Graduation
            new AgentResponse { AgentType = "farah", Intent = "graduation", TriggerKeywords = "[\"تخرج\",\"مشروع تخرج\",\"سنة أخيرة\",\"graduation\"]",
                ResponseAr = "مشروع التخرج خطوة مهمة! 🎓 خلّني أساعدك تحدد المتطلبات. وش تخصصك وموضوع المشروع؟",
                Expression = "explaining", SortOrder = 3 },

            // فرح - General Help
            new AgentResponse { AgentType = "farah", Intent = "general", TriggerKeywords = "[\"مساعدة\",\"ساعدني\",\"محتاج\",\"عندي\"]",
                ResponseAr = "أكيد أقدر أساعدك! 😊 قولي وش تحتاج بالتفصيل وبوجهك للخدمة المناسبة.",
                Expression = "happy", SortOrder = 4 }
        );

        // ========================
        // MENUS
        // ========================
        var headerMenu = new Menu { Name = "القائمة الرئيسية", Location = "header" };
        context.Menus.Add(headerMenu);
        await context.SaveChangesAsync();

        context.MenuItems.AddRange(
            new MenuItem { MenuId = headerMenu.Id, TitleAr = "الرئيسية", TitleEn = "Home", Url = "/", SortOrder = 1 },
            new MenuItem { MenuId = headerMenu.Id, TitleAr = "من نحن", TitleEn = "About", Url = "/about", SortOrder = 2 },
            new MenuItem { MenuId = headerMenu.Id, TitleAr = "خدماتنا", TitleEn = "Services", Url = "/services", SortOrder = 3 },
            new MenuItem { MenuId = headerMenu.Id, TitleAr = "أعمالنا", TitleEn = "Portfolio", Url = "/portfolio", SortOrder = 4 },
            new MenuItem { MenuId = headerMenu.Id, TitleAr = "آراء العملاء", TitleEn = "Testimonials", Url = "/testimonials", SortOrder = 5 },
            new MenuItem { MenuId = headerMenu.Id, TitleAr = "المقالات العلمية", TitleEn = "Articles", Url = "/articles", SortOrder = 6 },
            new MenuItem { MenuId = headerMenu.Id, TitleAr = "تواصل معنا", TitleEn = "Contact", Url = "/contact", SortOrder = 7 }
        );

        // ========================
        // SOCIAL LINKS
        // ========================
        context.SocialLinks.AddRange(
            new SocialLink { Platform = "whatsapp", Url = "https://wa.me/", SortOrder = 1 },
            new SocialLink { Platform = "instagram", Url = "https://instagram.com/ummreham", SortOrder = 2 },
            new SocialLink { Platform = "twitter", Url = "https://twitter.com/ummreham", SortOrder = 3 }
        );

        await context.SaveChangesAsync();
    }
}
