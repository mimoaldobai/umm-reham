import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';

export interface MediaDto {
  id: string;
  url: string;
  fileName: string;
  fileType: string;
  folder?: string;
}

export interface SiteSetting {
  key: string;
  value: string;
}

export interface OrderTrackingResult {
  id: string;
  trackingCode: string;
  clientName: string;
  serviceName?: string;
  status: string;
  discountPercent?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn?: string;
  slug: string;
  descriptionAr?: string;
  iconSvg?: string;
  coverImageUrl?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ServiceTemplate {
  id: string;
  code: string; // e.g. 'CV-01'
  nameAr: string; // e.g. 'السيرة الكلاسيكية الذهبية ATS'
  descriptionAr?: string;
  price: number; // e.g. 35
  previewImage?: string; // Preview image or svg
  isPopular?: boolean;
  tags?: string[];
}

export interface ServiceItem {
  id: string;
  categoryId?: string;
  nameAr: string;
  nameEn?: string;
  slug: string;
  shortDescriptionAr?: string;
  fullDescriptionAr?: string;
  targetAudienceAr?: string;
  requirementsAr?: string;
  priceType: 'fixed' | 'quote' | 'range' | 'contact' | string;
  priceFixed?: number;
  priceMin?: number;
  priceMax?: number;
  priceCurrency: string;
  estimatedDuration?: string;
  iconSvg?: string;
  coverImageUrl?: string;
  isFeatured: boolean;
  categoryNameAr?: string;
  templates?: ServiceTemplate[];
}

export interface Statistic {
  id: string;
  labelAr: string;
  value: string;
  iconSvg?: string;
  section: string;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle?: string;
  clientPhone?: string;
  clientEmail?: string;
  country?: string;
  city?: string;
  clientUniversity?: string;
  contentAr: string;
  rating?: number;
  serviceNameAr?: string;
  createdAt?: string;
}

export interface PortfolioItem {
  id: string;
  titleAr: string;
  titleEn?: string;
  serviceId?: string;
  serviceNameAr?: string;
  categoryId?: string;
  categoryNameAr?: string;
  descriptionAr?: string;
  clientName?: string;
  university?: string;
  specialization?: string;
  degree?: string;
  coverImageUrl?: string;
  fileUrl?: string;
  videoUrl?: string;
  galleryImages?: string[];
  tags?: string[];
  isFeatured: boolean;
  isActive: boolean;
  completedAt?: string;
}

export interface PageItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn?: string;
  contentAr: string;
  sectionsJson?: string;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface AgentMessageRequest {
  agentType: 'saud' | 'farah';
  message: string;
  sessionId?: string;
}

export interface AgentResponse {
  agentType: string;
  responseAr: string;
  expression?: string;
  followUpOptions?: { label: string; value: string; icon?: string }[];
  sessionId: string;
  detectedIntent?: string;
}

export interface FooterLinkItem {
  id: string;
  titleAr: string;
  url: string;
  group: 'services' | 'quick' | 'legal' | 'social';
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = this.resolveApiUrl();

  private resolveApiUrl(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ur_api_url');
      if (stored) return stored;
      const host = window.location.hostname;
      if (host === 'localhost' || host === '127.0.0.1') {
        return 'http://localhost:5073/api';
      }
      return 'https://umm-reham-api.onrender.com/api';
    }
    return 'http://localhost:5073/api';
  }

  // Fallback initial data in case backend is offline during local preview
  private defaultCategories: Category[] = [
    { id: 'cat-schools', nameAr: 'خدمات طلاب المدارس', slug: 'schools', descriptionAr: 'حل الواجبات المدرسية، المطويات، بحوث النشاط، الخرائط الذهنية، ومشاريع المقررات', sortOrder: 1, isActive: true },
    { id: 'cat-university', nameAr: 'الخدمات الجامعية', slug: 'university', descriptionAr: 'بحوث علمية محكمة، رسائل الماجستير والدكتوراه، مشاريع التخرج، والتحليل الإحصائي', sortOrder: 2, isActive: true },
    { id: 'cat-office', nameAr: 'الخدمات المكتبية', slug: 'office', descriptionAr: 'تنسيق وطباعة الرسائل، تدقيق لغوي، فحص Turnitin، تفريغ صوتي، وترجمة معتمدة', sortOrder: 3, isActive: true },
    { id: 'cat-general', nameAr: 'الخدمات العامة', slug: 'general', descriptionAr: 'عروض تقديمية وبوربوينت احترافي، كتابة المحتوى، سيرة ذاتية ATS، واستشارات تعليمية', sortOrder: 4, isActive: true }
  ];

  private defaultServices: ServiceItem[] = [
    // ==========================================
    // 1. الخدمات الجامعية / الطلابية الأساسية (12 خدمة)
    // ==========================================
    {
      id: 's-uni-1',
      categoryId: 'cat-university',
      nameAr: 'بحث',
      slug: 'academic-research',
      shortDescriptionAr: 'كتابة وإعداد البحوث العلمية والجامعية المحكمة وفق اشتراطات جامعتك وأدلة التوثيق الرسمية (APA 7th & Harvard).',
      priceType: 'quote',
      priceCurrency: 'SAR',
      estimatedDuration: '3-10 أيام',
      isFeatured: true,
      categoryNameAr: 'الخدمات الجامعية'
    },
    {
      id: 's-uni-2',
      categoryId: 'cat-university',
      nameAr: 'عرض تقديمي',
      slug: 'presentation-slides',
      shortDescriptionAr: 'تصميم عروض بوربوينت احترافية وسينمائية للمناقشات الجامعية والمؤتمرات مع مؤثرات وانفوجرافيك عالي الدقة.',
      priceType: 'fixed',
      priceFixed: 45,
      priceCurrency: 'SAR',
      estimatedDuration: '24-48 ساعة',
      isFeatured: true,
      categoryNameAr: 'الخدمات الجامعية',
      templates: [
        { id: 'tpl-ppt-1', code: 'PPT-01', nameAr: 'عرض أكاديمي كلاسيكي هادئ', price: 45, isPopular: false, descriptionAr: 'تصميم رسمي أنيق للمناقشات الجامعية والندوات الأكاديمية' },
        { id: 'tpl-ppt-2', code: 'PPT-02', nameAr: 'عرض سينمائي تفاعلي متقدم', price: 75, isPopular: true, descriptionAr: 'حركات انتقالية ذكية، مؤثرات بصرية وتصاميم ثلاثية الأبعاد' },
        { id: 'tpl-ppt-3', code: 'PPT-03', nameAr: 'عرض إنفوجرافيك للمؤتمرات', price: 90, isPopular: false, descriptionAr: 'تحويل البيانات المعقدة إلى رسوم بيانية وأيقونات إبداعية' },
        { id: 'tpl-ppt-4', code: 'PPT-04', nameAr: 'عرض مشاريع التخرج والأعمال', price: 65, isPopular: false, descriptionAr: 'قوالب متخصصة للعرض النهائي أمام لجان التحكيم' }
      ]
    },
    {
      id: 's-uni-3',
      categoryId: 'cat-university',
      nameAr: 'تقرير ميداني',
      slug: 'field-report',
      shortDescriptionAr: 'صياغة التقارير الميدانية والتطبيقية وتوثيق الزيارات والملاحظات وفق الهيكلة الأكاديمية المعتمدة.',
      priceType: 'quote',
      priceCurrency: 'SAR',
      estimatedDuration: '2-4 أيام',
      isFeatured: false,
      categoryNameAr: 'الخدمات الجامعية'
    },
    {
      id: 's-uni-4',
      categoryId: 'cat-university',
      nameAr: 'تقرير تدريب',
      slug: 'internship-report',
      shortDescriptionAr: 'إعداد تقارير التدريب التعاوني والامتياز المهني شاملة المهام المنجزة، التحديات، والتوصيات لجهات التدريب.',
      priceType: 'quote',
      priceCurrency: 'SAR',
      estimatedDuration: '3-5 أيام',
      isFeatured: true,
      categoryNameAr: 'الخدمات الجامعية'
    },
    {
      id: 's-uni-5',
      categoryId: 'cat-university',
      nameAr: 'تقرير صيفي',
      slug: 'summer-training-report',
      shortDescriptionAr: 'كتابة تقارير التدريب الصيفي للطلاب وفق اشتراطات الكليات والمعاهد مع الجداول والملاحق الرسمية.',
      priceType: 'quote',
      priceCurrency: 'SAR',
      estimatedDuration: '2-4 أيام',
      isFeatured: false,
      categoryNameAr: 'الخدمات الجامعية'
    },
    {
      id: 's-uni-6',
      categoryId: 'cat-university',
      nameAr: 'مشروع تخرج',
      slug: 'graduation-project',
      shortDescriptionAr: 'إعداد ومتابعة مشاريع التخرج المتكاملة (كتابة التقرير الشامل، التحليل المنهجي، وبناء الحل التقني أو الإداري).',
      priceType: 'quote',
      priceCurrency: 'SAR',
      estimatedDuration: 'حسب خطة المشروع',
      isFeatured: true,
      categoryNameAr: 'الخدمات الجامعية'
    },
    {
      id: 's-uni-7',
      categoryId: 'cat-university',
      nameAr: 'واجب صغير',
      slug: 'small-assignment',
      shortDescriptionAr: 'حل التكاليف الجامعية السريعة والأسئلة المقالية والأنشطة الأسبوعية بدقة وسرعة تسليم.',
      priceType: 'fixed',
      priceFixed: 25,
      priceCurrency: 'SAR',
      estimatedDuration: 'خلال 12-24 ساعة',
      isFeatured: true,
      categoryNameAr: 'الخدمات الجامعية'
    },
    {
      id: 's-uni-8',
      categoryId: 'cat-university',
      nameAr: 'واجب اكسل',
      slug: 'excel-assignment',
      shortDescriptionAr: 'حل تمارين الإكسل والمعادلات والدوال المحاسبية والإحصائية وتنسيق الجداول بشكل احترافي.',
      priceType: 'fixed',
      priceFixed: 35,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم',
      isFeatured: false,
      categoryNameAr: 'الخدمات الجامعية'
    },
    {
      id: 's-uni-9',
      categoryId: 'cat-university',
      nameAr: 'مشروع اكسل',
      slug: 'excel-project',
      shortDescriptionAr: 'بناء مشاريع إكسل متقدمة، لوحات تحكم تفاعلية (Dashboards)، ونماذج تحليل مالي وإداري ذكية.',
      priceType: 'fixed',
      priceFixed: 120,
      priceCurrency: 'SAR',
      estimatedDuration: '24-48 ساعة',
      isFeatured: true,
      categoryNameAr: 'الخدمات الجامعية'
    },
    {
      id: 's-uni-10',
      categoryId: 'cat-university',
      nameAr: 'سيرة ذاتية',
      slug: 'professional-cv-ats',
      shortDescriptionAr: 'صياغة وتصميم السيرة الذاتية بنظام ATS المتوافق مع الشركات وجهات التوظيف، متوفرة بعدة نماذج وتصاميم راقية.',
      priceType: 'fixed',
      priceFixed: 35,
      priceCurrency: 'SAR',
      estimatedDuration: '24 ساعة',
      isFeatured: true,
      categoryNameAr: 'الخدمات الجامعية',
      templates: [
        { id: 'tpl-cv-1', code: 'CV-01', nameAr: 'السيرة الكلاسيكية الذهبية ATS', price: 35, isPopular: false, descriptionAr: 'تنسيق قياسي معتمد ومقروء 100% لأنظمة الفرز الآلي للشركات والمؤسسات' },
        { id: 'tpl-cv-2', code: 'CV-02', nameAr: 'السيرة الحديثة الإنفوجرافيك التنفيذية', price: 55, isPopular: true, descriptionAr: 'تصميم عصري جذاب يبرز المهارات والإنجازات القيادية والمشاريع' },
        { id: 'tpl-cv-3', code: 'CV-03', nameAr: 'السيرة الأكاديمية والطبية المفصلة', price: 70, isPopular: false, descriptionAr: 'مخصصة للأطباء والمهندسين وأعضاء هيئة التدريس ونشر الأبحاث' },
        { id: 'tpl-cv-4', code: 'CV-04', nameAr: 'السيرة التقنية وهندسة البرمجيات', price: 60, isPopular: false, descriptionAr: 'هيكلة مركزة على المهارات التقنية، سوابق المشاريع ومستودعات الأكواد' }
      ]
    },
    {
      id: 's-uni-11',
      categoryId: 'cat-university',
      nameAr: 'بورتفوليو',
      slug: 'portfolio-design',
      shortDescriptionAr: 'تصميم ملف الأعمال التعريفي (Portfolio) لاستعراض إنجازاتك ومشاريعك السابقة بجاذبية بصرية ملفتة.',
      priceType: 'fixed',
      priceFixed: 85,
      priceCurrency: 'SAR',
      estimatedDuration: '2-4 أيام',
      isFeatured: true,
      categoryNameAr: 'الخدمات الجامعية',
      templates: [
        { id: 'tpl-port-1', code: 'PORT-01', nameAr: 'ملف أعمال تفاعلي رقمي PDF', price: 85, isPopular: false, descriptionAr: 'كتيب إلكتروني قابل للتصفح مع روابط تفاعلية ومعاينة أعمال' },
        { id: 'tpl-port-2', code: 'PORT-02', nameAr: 'بورتفوليو استعراضي تنفيذي مميز', price: 140, isPopular: true, descriptionAr: 'تصميم فاخر للمصممين والمبرمجين ورواد الأعمال مع معرض حي' },
        { id: 'tpl-port-3', code: 'PORT-03', nameAr: 'بورتفوليو هندسي ومعماري شامل', price: 180, isPopular: false, descriptionAr: 'مخصص للمشاريع الهندسية والمخططات ونماذج ثلاثية الأبعاد' }
      ]
    },
    {
      id: 's-uni-12',
      categoryId: 'cat-university',
      nameAr: 'مواقع',
      slug: 'web-development',
      shortDescriptionAr: 'تصميم وبرمجة مواقع ويب تعريفية وشخصية وسريعة متوافقة بالكامل مع كافة الشاشات والجوالات.',
      priceType: 'fixed',
      priceFixed: 350,
      priceCurrency: 'SAR',
      estimatedDuration: '3-7 أيام',
      isFeatured: true,
      categoryNameAr: 'الخدمات الجامعية',
      templates: [
        { id: 'tpl-web-1', code: 'WEB-01', nameAr: 'موقع تعريفي صفحة واحدة (Landing Page)', price: 350, isPopular: false, descriptionAr: 'تصميم سريع متجاوب 100% مع الجوال مع روابط تواصل ونماذج حجز' },
        { id: 'tpl-web-2', code: 'WEB-02', nameAr: 'موقع بورتفوليو ويب شخصي تفاعلي', price: 550, isPopular: true, descriptionAr: 'موقع ديناميكي يعرض سيرتك وأعمالك مع دومين خاص وتأثيرات عصرية' },
        { id: 'tpl-web-3', code: 'WEB-03', nameAr: 'موقع متكامل متعدد الصفحات والخدمات', price: 950, isPopular: false, descriptionAr: 'منصة احترافية كاملة تشمل عدة أقسام مع لوحة إدارة محتوى' }
      ]
    },

    // ==========================================
    // 2. الخدمات العامة (الـ 20 خدمة المحددة بالأسعار الرسمية)
    // ==========================================
    {
      id: 's-gen-1',
      categoryId: 'cat-general',
      nameAr: 'التسجيل في حساب المواطن',
      slug: 'citizen-account-register',
      shortDescriptionAr: 'تسجيل دقيق في برنامج حساب المواطن مع إرفاق المستندات ومطابقة شروط الاستحقاق.',
      priceType: 'fixed',
      priceFixed: 25,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم (خلال ساعات)',
      isFeatured: true,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-2',
      categoryId: 'cat-general',
      nameAr: 'رفع اعتراض في حساب المواطن أو تحديث البيانات',
      slug: 'citizen-account-appeal',
      shortDescriptionAr: 'صياغة ورفع الاعتراضات الرسمية وتحديث البيانات البنكية والتابعين لتفادي إسقاط الدعم.',
      priceType: 'fixed',
      priceFixed: 15,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-3',
      categoryId: 'cat-general',
      nameAr: 'تسجيل حساب المواطن للعوائل',
      slug: 'citizen-account-families',
      shortDescriptionAr: 'تسجيل رب الأسرة وإضافة جميع التابعين بدقة والتأكد من تطابق الوثائق لضمان صدور الأهلية.',
      priceType: 'fixed',
      priceFixed: 70,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم',
      isFeatured: true,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-4',
      categoryId: 'cat-general',
      nameAr: 'التسجيل في طاقات وإكمال الملف 100%',
      slug: 'taqat-register',
      shortDescriptionAr: 'إنشاء وتحديث الحساب في منصة طاقات وإكمال الملف التعريفي بنسبة 100% للتأهل للبرامج الوظيفية.',
      priceType: 'fixed',
      priceFixed: 20,
      priceCurrency: 'SAR',
      estimatedDuration: 'خلال ساعات',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-5',
      categoryId: 'cat-general',
      nameAr: 'التسجيل في الضمان المطور بالتقرير الطبي',
      slug: 'daman-medical-report',
      shortDescriptionAr: 'تسجيل مستفيدي الضمان الاجتماعي المطور ورفع ومطابقة التقارير الطبية الرسمية مع اللجان.',
      priceType: 'fixed',
      priceFixed: 50,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم',
      isFeatured: true,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-6',
      categoryId: 'cat-general',
      nameAr: 'إضافة العقد الجديد في الضمان المطور',
      slug: 'daman-add-contract',
      shortDescriptionAr: 'ربط عقد الإيجار الجديد المسجل في منصة إيجار بحساب المستفيد في الضمان المطور فورياً.',
      priceType: 'fixed',
      priceFixed: 15,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-7',
      categoryId: 'cat-general',
      nameAr: 'استخراج مشهد ضماني',
      slug: 'daman-certificate',
      shortDescriptionAr: 'استخراج مشهد إثبات مستفيد من الضمان الاجتماعي لتقديمه للجهات الحكومية والخاصة.',
      priceType: 'fixed',
      priceFixed: 10,
      priceCurrency: 'SAR',
      estimatedDuration: 'فوري خلال دقائق',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-8',
      categoryId: 'cat-general',
      nameAr: 'عقد إيجار مع التسجيل في الضمان المطور',
      slug: 'lease-contract-daman',
      shortDescriptionAr: 'توثيق عقد إيجار إلكتروني معتمد عبر إيجار مع التقديم الكامل والتسجيل في الضمان المطور.',
      priceType: 'fixed',
      priceFixed: 335,
      priceCurrency: 'SAR',
      estimatedDuration: '24 ساعة',
      isFeatured: true,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-9',
      categoryId: 'cat-general',
      nameAr: 'عقد إيجار مع التسجيل في حساب المواطن',
      slug: 'lease-contract-citizen',
      shortDescriptionAr: 'توثيق عقد إيجار شبكة إيجار وربطه مباشرة بحساب المواطن لتأكيد استقلالية السكن.',
      priceType: 'fixed',
      priceFixed: 330,
      priceCurrency: 'SAR',
      estimatedDuration: '24 ساعة',
      isFeatured: true,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-10',
      categoryId: 'cat-general',
      nameAr: 'تجديد عقد الإيجار مع التحديث',
      slug: 'lease-renewal-update',
      shortDescriptionAr: 'تجديد العقد الإلكتروني عبر شبكة إيجار وتحديث بياناته في كافة المنصات الداعمة.',
      priceType: 'fixed',
      priceFixed: 330,
      priceCurrency: 'SAR',
      estimatedDuration: '24 ساعة',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-11',
      categoryId: 'cat-general',
      nameAr: 'عقد إيجار إلكتروني مع العنوان الوطني',
      slug: 'lease-contract-national-address',
      shortDescriptionAr: 'إصدار عقد إيجار موثق مع إنشاء وتطابق العنوان الوطني الرسمي عبر سبل.',
      priceType: 'fixed',
      priceFixed: 310,
      priceCurrency: 'SAR',
      estimatedDuration: '24 ساعة',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-12',
      categoryId: 'cat-general',
      nameAr: 'إلغاء التجديد التلقائي للعقود',
      slug: 'cancel-auto-renewal',
      shortDescriptionAr: 'إيقاف وإلغاء التجديد التلقائي للعقود الإلكترونية قبل استحقاق الرسوم عبر منصة إيجار.',
      priceType: 'fixed',
      priceFixed: 10,
      priceCurrency: 'SAR',
      estimatedDuration: 'فوري خلال دقائق',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-13',
      categoryId: 'cat-general',
      nameAr: 'جدارات وإكمال الملف إلى 100%',
      slug: 'jadarat-profile',
      shortDescriptionAr: 'تسجيل وتوثيق المؤهلات والخبرات في المنصة الوطنية الموحدة للتوظيف (جدارات) واكتمال 100%.',
      priceType: 'fixed',
      priceFixed: 35,
      priceCurrency: 'SAR',
      estimatedDuration: 'خلال ساعات',
      isFeatured: true,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-14',
      categoryId: 'cat-general',
      nameAr: 'تحديث الضمان الاجتماعي للمسجلين بعقد إيجار',
      slug: 'daman-update-lease',
      shortDescriptionAr: 'تحديث وقبول العقد الجديد ومطابقة العنوان في منصة الضمان لتجنب تعليق الدفعات.',
      priceType: 'fixed',
      priceFixed: 20,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-15',
      categoryId: 'cat-general',
      nameAr: 'التسجيل في التأهيل الشامل',
      slug: 'taheel-shamel',
      shortDescriptionAr: 'التقديم في إعانة التأهيل الشامل لذوي الإعاقة ورفع المستندات والتقارير الطبية المعتمدة.',
      priceType: 'fixed',
      priceFixed: 30,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-16',
      categoryId: 'cat-general',
      nameAr: 'التسجيل في ساند',
      slug: 'saned-register',
      shortDescriptionAr: 'التقديم على تعويض التعطل عن العمل (ساند) عبر التأمينات الاجتماعية والتحقق من الأهلية.',
      priceType: 'fixed',
      priceFixed: 30,
      priceCurrency: 'SAR',
      estimatedDuration: 'فوري ونفس اليوم',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-17',
      categoryId: 'cat-general',
      nameAr: 'التسجيل في تمهير',
      slug: 'tamheer-register',
      shortDescriptionAr: 'التقديم في برنامج التدريب على رأس العمل (تمهير) لخريجي الدبلوم والبكالوريوس.',
      priceType: 'fixed',
      priceFixed: 40,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-18',
      categoryId: 'cat-general',
      nameAr: 'إضافة تابع في الضمان الاجتماعي المطور',
      slug: 'daman-add-dependent',
      shortDescriptionAr: 'إضافة تابع جديد في ملف الضمان المطور مع رفع وثائق إثبات الصلة والسكن.',
      priceType: 'fixed',
      priceFixed: 20,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-19',
      categoryId: 'cat-general',
      nameAr: 'عنوان وطني مطابق 100% عبر سبل',
      slug: 'national-address-spl',
      shortDescriptionAr: 'تسجيل وتحديث وتثبيت العنوان الوطني الرسمي عبر البريد السعودي (سبل) مطابق 100%.',
      priceType: 'fixed',
      priceFixed: 15,
      priceCurrency: 'SAR',
      estimatedDuration: 'فوري خلال دقائق',
      isFeatured: false,
      categoryNameAr: 'الخدمات العامة'
    },
    {
      id: 's-gen-20',
      categoryId: 'cat-general',
      nameAr: 'فك حظر فوري بدون تسجيل',
      slug: 'unblock-instant',
      shortDescriptionAr: 'معالجة وفك الحظر في الأنظمة والمنصات وتصحيح سبب الإيقاف بشكل فوري.',
      priceType: 'fixed',
      priceFixed: 75,
      priceCurrency: 'SAR',
      estimatedDuration: 'فوري',
      isFeatured: true,
      categoryNameAr: 'الخدمات العامة'
    },

    // ==========================================
    // 3. خدمات طلاب المدارس
    // ==========================================
    {
      id: 's-sch-1',
      categoryId: 'cat-schools',
      nameAr: 'حل الواجبات والمهام المدرسية',
      slug: 'school-homework',
      shortDescriptionAr: 'حلول نموذجية وشاملة لكافة الواجبات والأنشطة المدرسية لجميع المراحل الدراسية بدقة وتوضيح خطوات الحل.',
      priceType: 'fixed',
      priceFixed: 20,
      priceCurrency: 'SAR',
      estimatedDuration: 'نفس اليوم (خلال ساعات)',
      isFeatured: true,
      categoryNameAr: 'خدمات طلاب المدارس'
    },
    {
      id: 's-sch-2',
      categoryId: 'cat-schools',
      nameAr: 'المطويات والبحوث المدرسية والخرائط المفاهيمية',
      slug: 'school-brochures',
      shortDescriptionAr: 'تصميم مطويات إبداعية ملونة، بحوث أنشطة صفية مدعمة بالصور، ورسوم بيانية وخرائط ذهنية تسهل الفهم.',
      priceType: 'fixed',
      priceFixed: 30,
      priceCurrency: 'SAR',
      estimatedDuration: '24 ساعة',
      isFeatured: true,
      categoryNameAr: 'خدمات طلاب المدارس'
    },
    {
      id: 's-sch-3',
      categoryId: 'cat-schools',
      nameAr: 'عروض بوربوينت مدرسية تفاعلية',
      slug: 'school-presentations',
      shortDescriptionAr: 'تصميم عروض تقديمية مدرسية شيقة ومتحركة تجذب انتباه المعلمين والطلاب مع مؤثرات صوتية وبصرية ملهمة.',
      priceType: 'fixed',
      priceFixed: 35,
      priceCurrency: 'SAR',
      estimatedDuration: '24 ساعة',
      isFeatured: false,
      categoryNameAr: 'خدمات طلاب المدارس'
    },
    {
      id: 's-sch-4',
      categoryId: 'cat-schools',
      nameAr: 'مشاريع مسارات الثانوية والتقارير الميدانية',
      slug: 'high-school-pathways',
      shortDescriptionAr: 'إعداد مشاريع التخرج لمسارات الثانوية العامة (عام، حاسب، صحة، إدارة أعمال) وفق معايير وزارة التعليم.',
      priceType: 'quote',
      priceCurrency: 'SAR',
      estimatedDuration: '2-4 أيام',
      isFeatured: true,
      categoryNameAr: 'خدمات طلاب المدارس'
    },

    // ==========================================
    // 4. الخدمات المكتبية
    // ==========================================
    {
      id: 's-off-1',
      categoryId: 'cat-office',
      nameAr: 'تنسيق الرسائل العلمية والكتب وفق أدلة الجامعات',
      slug: 'thesis-formatting',
      shortDescriptionAr: 'ضبط الهوامش، الفهارس الآلية، ترقيم الصفحات، مراجعة الجداول والأشكال وتوحيد الخطوط وفق دليل الجامعة المعتمد.',
      priceType: 'fixed',
      priceFixed: 100,
      priceCurrency: 'SAR',
      estimatedDuration: '24-48 ساعة',
      isFeatured: true,
      categoryNameAr: 'الخدمات المكتبية'
    },
    {
      id: 's-off-2',
      categoryId: 'cat-office',
      nameAr: 'التدقيق اللغوي وفحص الاقتباس (Turnitin)',
      slug: 'proofreading-plagiarism',
      shortDescriptionAr: 'مراجعة نحوية وإملائية دقيقة وإصلاح أسلوب الصياغة، مع فحص نسبة الانتحال الأدبي عبر تيرنتين الرسمي 0%.',
      priceType: 'fixed',
      priceFixed: 50,
      priceCurrency: 'SAR',
      estimatedDuration: '24 ساعة',
      isFeatured: true,
      categoryNameAr: 'الخدمات المكتبية'
    },
    {
      id: 's-off-3',
      categoryId: 'cat-office',
      nameAr: 'التفريغ الصوتي وتحويل الملفات بدقة 100%',
      slug: 'transcription-conversion',
      shortDescriptionAr: 'تفريغ المحاضرات والمقابلات الصوتية وتنسيق النصوص، وتحويل مستندات PDF الممسوحة ضوئياً إلى ملفات Word منسقة.',
      priceType: 'fixed',
      priceFixed: 40,
      priceCurrency: 'SAR',
      estimatedDuration: '24 ساعة',
      isFeatured: false,
      categoryNameAr: 'الخدمات المكتبية'
    },
    {
      id: 's-off-4',
      categoryId: 'cat-office',
      nameAr: 'الترجمة الأكاديمية والمهنية المعتمدة',
      slug: 'academic-translation',
      shortDescriptionAr: 'ترجمة بشرية متخصصة ومصقولة للملخصات والبحوث والوثائق من وإلى الإنجليزية مع الحفاظ على المصطلحات العلمية.',
      priceType: 'quote',
      priceCurrency: 'SAR',
      estimatedDuration: '2-4 أيام',
      isFeatured: false,
      categoryNameAr: 'الخدمات المكتبية'
    }
  ];

  private defaultStats: Statistic[] = [
    { id: '1', labelAr: 'قصة بدأها عملاؤنا معنا', value: '+25,000', section: 'hero', sortOrder: 1 },
    { id: '2', labelAr: 'مشروع أكاديمي منجز', value: '+1,500', section: 'hero', sortOrder: 2 },
    { id: '3', labelAr: 'مدينة داخل المملكة', value: '+40', section: 'hero', sortOrder: 3 },
    { id: '4', labelAr: 'خدمة تعليمية وبحثية', value: '+137', section: 'hero', sortOrder: 4 },
    { id: '5', labelAr: 'نسبة رضا عملائنا', value: '98%', section: 'trust', sortOrder: 5 }
  ];

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`).pipe(
      catchError(() => of(this.defaultCategories))
    );
  }

  getServices(categoryId?: string): Observable<ServiceItem[]> {
    const url = categoryId ? `${this.apiUrl}/services?categoryId=${categoryId}` : `${this.apiUrl}/services`;
    return this.http.get<any[]>(url).pipe(
      map(items => items.map(item => {
        let tpls: ServiceTemplate[] | undefined = undefined;
        if (item.availableOptions && typeof item.availableOptions === 'string' && item.availableOptions.startsWith('[')) {
          try {
            tpls = JSON.parse(item.availableOptions);
          } catch (e) {}
        }
        return {
          ...item,
          priceFixed: item.priceFixed || (item.priceType === 'fixed' ? (item.priceMin || item.priceMax) : undefined),
          templates: tpls || item.templates
        } as ServiceItem;
      })),
      catchError(() => of(this.defaultServices))
    );
  }

  getFeaturedServices(): Observable<ServiceItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services/featured`).pipe(
      map(items => items.map(item => {
        let tpls: ServiceTemplate[] | undefined = undefined;
        if (item.availableOptions && typeof item.availableOptions === 'string' && item.availableOptions.startsWith('[')) {
          try {
            tpls = JSON.parse(item.availableOptions);
          } catch (e) {}
        }
        return {
          ...item,
          priceFixed: item.priceFixed || (item.priceType === 'fixed' ? (item.priceMin || item.priceMax) : undefined),
          templates: tpls || item.templates
        } as ServiceItem;
      })),
      catchError(() => of(this.defaultServices.filter(s => s.isFeatured)))
    );
  }

  getStatistics(): Observable<Statistic[]> {
    return this.http.get<Statistic[]>(`${this.apiUrl}/statistics`).pipe(
      catchError(() => of(this.defaultStats))
    );
  }

  sendAgentMessage(req: AgentMessageRequest): Observable<AgentResponse> {
    return this.http.post<AgentResponse>(`${this.apiUrl}/agent/message`, req).pipe(
      catchError(() => {
        if (req.agentType === 'saud') {
          return of({
            agentType: 'saud',
            responseAr: `أهلاً بك يا بطل! 🌟 أنا سعود، بساعدك في تفاصيل طلبك وتقدير الأسعار. وش نوع الخدمة اللي تناسبك؟`,
            expression: 'happy',
            sessionId: req.sessionId || 'local-session',
            followUpOptions: [
              { label: '📚 بحوث وتقارير', value: 'research', icon: '📚' },
              { label: '🎓 مشاريع تخرج', value: 'graduation', icon: '🎓' },
              { label: '💻 برمجة وتقنية', value: 'tech', icon: '💻' },
              { label: '💰 استفسار عن الأسعار', value: 'pricing', icon: '💰' }
            ]
          });
        } else {
          return of({
            agentType: 'farah',
            responseAr: `أهلاً وسهلاً بك! 🌸 أنا فرح، مرشدتك الأكاديمية الذكية. يسعدني توجيهك واقتراح أفضل الحلول لاحتياجك الأكاديمي والمهني.`,
            expression: 'greeting',
            sessionId: req.sessionId || 'local-session',
            followUpOptions: [
              { label: '✨ مساعدة في اختيار التخصص والخدمة', value: 'consultation', icon: '✨' },
              { label: '📖 مراجعة وتدقيق لغوي', value: 'review', icon: '📖' },
              { label: '🎨 تصميم عرض أكاديمي', value: 'presentation', icon: '🎨' },
              { label: '📄 كتابة سيرة ذاتية', value: 'cv', icon: '📄' }
            ]
          });
        }
      })
    );
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`).pipe(
      catchError(() => of(this.defaultTestimonials))
    );
  }

  submitReview(payload: { clientName: string; clientPhone?: string; clientEmail?: string; country?: string; city?: string; clientUniversity?: string; contentAr: string; rating: number }): Observable<Testimonial> {
    return this.http.post<Testimonial>(`${this.apiUrl}/testimonials/submit`, payload).pipe(
      catchError(() => {
        const localItem: Testimonial = {
          id: 'local-' + Date.now(),
          clientName: payload.clientName,
          clientPhone: payload.clientPhone,
          clientEmail: payload.clientEmail,
          country: payload.country || 'السعودية',
          city: payload.city || 'الرياض',
          clientUniversity: payload.clientUniversity || 'عميل موثق',
          contentAr: payload.contentAr,
          rating: payload.rating,
          createdAt: new Date().toISOString()
        };
        this.defaultTestimonials.unshift(localItem);
        return of(localItem);
      })
    );
  }

  defaultTestimonials: Testimonial[] = [
    {
      id: 't-1',
      clientName: 'أحمد العتيبي',
      clientTitle: 'ماجستير إدارة أعمال (امتياز مع مرتبة الشرف)',
      clientUniversity: 'جامعة الطائف',
      country: 'السعودية',
      city: 'الطائف',
      contentAr: 'بفضل الله ثم بفضل أم رهام حصلت على دعم احترافي وتوثيق علمي دقيق في إعداد رسالتي، والتزامهم بالمواعيد وجودة البحث كانت فوق توقعاتي. أنصح كل باحث وطالب دراسات عليا بالتعامل معهم.',
      rating: 5,
      createdAt: '2026-08-15'
    },
    {
      id: 't-2',
      clientName: 'سارة القحطاني',
      clientTitle: 'طالبة دكتوراه مناهج وطرق تدريس',
      clientUniversity: 'جامعة الملك سعود',
      country: 'السعودية',
      city: 'الرياض',
      contentAr: 'تجربة أكثر من رائعة في التدقيق اللغوي والتحليل الإحصائي SPSS، دقة متناهية وسرية تامة واحترافية لا مثيل لها.',
      rating: 5,
      createdAt: '2026-08-20'
    },
    {
      id: 't-3',
      clientName: 'فيصل الغامدي',
      clientTitle: 'بكالوريوس هندسة برمجيات',
      clientUniversity: 'جامعة الملك عبدالعزيز',
      country: 'السعودية',
      city: 'جدة',
      contentAr: 'ساعدوني في إنجاز وتوثيق مشروع التخرج والبرزنتيشن النهائي بتصميم خيالي أبهر لجنة التحكيم. شكراً أم رهام وفريق العمل المبدع!',
      rating: 5,
      createdAt: '2026-08-25'
    }
  ];

  // --- CATEGORIES CRUD ---
  createCategory(category: Partial<Category>): Observable<Category> {
    const slug = category.slug || ('cat-' + Date.now());
    const newCat: Category = {
      id: 'cat-' + Date.now(),
      nameAr: category.nameAr || 'قسم جديد',
      nameEn: category.nameEn || '',
      slug: slug,
      descriptionAr: category.descriptionAr || '',
      iconSvg: category.iconSvg || '📁',
      coverImageUrl: category.coverImageUrl || '',
      sortOrder: category.sortOrder || (this.defaultCategories.length + 1),
      isActive: category.isActive ?? true
    };
    return this.http.post<Category>(`${this.apiUrl}/categories`, newCat).pipe(
      catchError(() => {
        this.defaultCategories.push(newCat);
        return of(newCat);
      })
    );
  }

  updateCategory(id: string, category: Partial<Category>): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}`, category).pipe(
      catchError(() => {
        const idx = this.defaultCategories.findIndex(c => c.id === id || c.slug === id);
        if (idx !== -1) {
          this.defaultCategories[idx] = { ...this.defaultCategories[idx], ...category } as Category;
        }
        return of({ success: true });
      })
    );
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`).pipe(
      catchError(() => {
        this.defaultCategories = this.defaultCategories.filter(c => c.id !== id && c.slug !== id);
        return of({ success: true });
      })
    );
  }

  // --- SERVICES CRUD ---
  createService(service: Partial<ServiceItem>): Observable<ServiceItem> {
    let catId = service.categoryId;
    if (catId === 'cat-schools') catId = '11111111-1111-1111-1111-111111111111';
    else if (catId === 'cat-university') catId = '22222222-2222-2222-2222-222222222222';
    else if (catId === 'cat-office') catId = '33333333-3333-3333-3333-333333333333';
    else if (catId === 'cat-general') catId = '44444444-4444-4444-4444-444444444444';

    const item: any = {
      categoryId: catId,
      nameAr: service.nameAr || '',
      nameEn: service.nameEn || '',
      slug: service.slug || ('service-' + Date.now()),
      shortDescriptionAr: service.shortDescriptionAr || '',
      fullDescriptionAr: service.fullDescriptionAr || '',
      categoryNameAr: service.categoryNameAr || 'الخدمات العامة',
      priceType: service.priceType || 'fixed',
      priceMin: service.priceFixed || service.priceMin || 0,
      priceMax: service.priceMax || service.priceFixed || service.priceMin || 0,
      priceCurrency: service.priceCurrency || 'SAR',
      estimatedDuration: service.estimatedDuration || 'نفس اليوم',
      isFeatured: service.isFeatured ?? true,
      availableOptions: service.templates ? JSON.stringify(service.templates) : '[]'
    };
    return this.http.post<ServiceItem>(`${this.apiUrl}/services`, item).pipe(
      catchError(() => {
        const localItem = { ...item, id: 's-' + Date.now(), templates: service.templates || [] };
        this.defaultServices.unshift(localItem);
        return of(localItem);
      })
    );
  }

  updateService(id: string, service: Partial<ServiceItem>): Observable<any> {
    let catId = service.categoryId;
    if (catId === 'cat-schools') catId = '11111111-1111-1111-1111-111111111111';
    else if (catId === 'cat-university') catId = '22222222-2222-2222-2222-222222222222';
    else if (catId === 'cat-office') catId = '33333333-3333-3333-3333-333333333333';
    else if (catId === 'cat-general') catId = '44444444-4444-4444-4444-444444444444';

    const payload: any = {
      ...service,
      categoryId: catId,
      priceMin: service.priceFixed || service.priceMin,
      priceMax: service.priceMax || service.priceFixed || service.priceMin,
      availableOptions: service.templates ? JSON.stringify(service.templates) : '[]'
    };
    return this.http.put(`${this.apiUrl}/services/${id}`, payload).pipe(
      catchError(() => {
        const idx = this.defaultServices.findIndex(s => s.id === id);
        if (idx !== -1) {
          this.defaultServices[idx] = { ...this.defaultServices[idx], ...service } as ServiceItem;
        }
        return of({ success: true });
      })
    );
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/services/${id}`).pipe(
      catchError(() => {
        this.defaultServices = this.defaultServices.filter(s => s.id !== id);
        return of({ success: true });
      })
    );
  }

  // --- TESTIMONIALS CRUD ---
  deleteTestimonial(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/testimonials/${id}`).pipe(
      catchError(() => {
        this.defaultTestimonials = this.defaultTestimonials.filter(t => t.id !== id);
        return of({ success: true });
      })
    );
  }

  updateTestimonial(id: string, item: Partial<Testimonial>): Observable<any> {
    return this.http.put(`${this.apiUrl}/testimonials/${id}`, item).pipe(
      catchError(() => {
        const idx = this.defaultTestimonials.findIndex(t => t.id === id);
        if (idx !== -1) {
          this.defaultTestimonials[idx] = { ...this.defaultTestimonials[idx], ...item } as Testimonial;
        }
        return of({ success: true });
      })
    );
  }

  // --- SERVICE REQUESTS CRUD ---
  defaultServiceRequests: any[] = [
    {
      id: 'req-1',
      clientName: 'سلطان الشمري',
      clientPhone: '0501234567',
      clientEmail: 'sultan@example.com',
      serviceName: 'إعداد بحث علمي ودراسة حالة',
      university: 'جامعة الملك سعود — الرياض',
      specialization: 'إدارة أعمال ودراسات عليا',
      pageCount: 25,
      deadline: 'خلال 7 أيام',
      description: 'أرغب في خطة بحث محكمة وتوثيق مراجع APA ومراجعة لغوية دقيقة.',
      status: 'جديد',
      createdAt: '2026-08-31T10:30:00'
    },
    {
      id: 'req-2',
      clientName: 'نورة القحطاني',
      clientPhone: '0559876543',
      clientEmail: 'noura@example.com',
      serviceName: 'مشروع تخرج حاسب وتقنية (Full Stack)',
      university: 'جامعة الطائف',
      specialization: 'هندسة برمجيات وذكاء اصطناعي',
      pageCount: 40,
      deadline: 'خلال 14 يوم',
      description: 'تصميم وبناء نظام إدارة عيادات طبية مع التقرير والعرض التقديمي النهائي.',
      status: 'قيد التنفيذ',
      createdAt: '2026-08-30T16:15:00'
    },
    {
      id: 'req-3',
      clientName: 'عبدالرحمن الدوسري',
      clientPhone: '0543322110',
      clientEmail: 'abdulrahman@example.com',
      serviceName: 'سيرة ذاتية احترافية ATS وتطوير لينكد إن',
      university: 'جامعة الملك عبدالعزيز',
      specialization: 'إدارة مشاريع هندسية',
      pageCount: 2,
      deadline: 'خلال 24 ساعة',
      description: 'صياغة سيرة ذاتية بالعربي والإنجليزي للتقديم على وظائف قيادية في الرياض.',
      status: 'مكتمل',
      createdAt: '2026-08-29T11:00:00'
    }
  ];

  getServiceRequests(status?: string): Observable<any[]> {
    const url = status ? `${this.apiUrl}/service-requests?status=${status}` : `${this.apiUrl}/service-requests`;
    return this.http.get<any[]>(url).pipe(
      catchError(() => of(this.defaultServiceRequests))
    );
  }

  createManualRequest(req: any): Observable<any> {
    const item = {
      id: 'req-' + Date.now(),
      ...req,
      createdAt: new Date().toISOString()
    };
    return this.http.post(`${this.apiUrl}/service-requests`, item).pipe(
      catchError(() => {
        this.defaultServiceRequests.unshift(item);
        return of(item);
      })
    );
  }

  updateRequestStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/service-requests/${id}/status`, { status }).pipe(
      catchError(() => {
        const found = this.defaultServiceRequests.find(r => r.id === id);
        if (found) found.status = status;
        return of({ success: true });
      })
    );
  }

  deleteServiceRequest(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/service-requests/${id}`).pipe(
      catchError(() => {
        this.defaultServiceRequests = this.defaultServiceRequests.filter(r => r.id !== id);
        return of({ success: true });
      })
    );
  }

  // --- PORTFOLIO CRUD ---
  private defaultPortfolioItems: PortfolioItem[] = [
    {
      id: 'p1',
      titleAr: 'تحليل إحصائي متقدم SPSS ورسالة ماجستير في القيادة التربوية',
      categoryNameAr: 'الخدمات الأكاديمية',
      descriptionAr: 'دراسة ميدانية متكاملة شملت استبانة على 400 عينة مع استخراج معاملات الصدق والثبات والجداول الإحصائية بنسبة أصالة 100%.',
      clientName: 'د. فهد الدوسري',
      university: 'جامعة الملك سعود — الرياض',
      specialization: 'إدارة تربوية',
      degree: 'ماجستير',
      coverImageUrl: 'saudi_3d_holographic_map_1788172309147.jpg',
      fileUrl: 'https://example.com/sample_thesis.pdf',
      videoUrl: '',
      tags: ['SPSS', 'تحليل كمي', 'توثيق APA 7', 'أصالة 100%'],
      isFeatured: true,
      isActive: true,
      completedAt: '2026-08-20'
    },
    {
      id: 'p2',
      titleAr: 'منظومة ذكاء اصطناعي وتطبيق ويب متكامل لمشروع تخرج',
      categoryNameAr: 'التقنية والبرمجة',
      descriptionAr: 'بناء تطبيق وتدريب خوارزميات تعلم آلة مع توثيق الأكواد والتقرير النهائي ومخططات UML والعرض التقديمي.',
      clientName: 'نورة القحطاني',
      university: 'جامعة الطائف',
      specialization: 'علوم الحاسب والذكاء الاصطناعي',
      degree: 'بكالوريوس',
      coverImageUrl: 'saud_mascot_3d_1788171282266.jpg',
      fileUrl: '',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      tags: ['Angular', 'Python AI', 'REST API', 'توثيق كامل'],
      isFeatured: true,
      isActive: true,
      completedAt: '2026-08-28'
    },
    {
      id: 'p3',
      titleAr: 'عرض تقديمي سينمائي وتفاعلي لمناقشة رسالة الدكتوراه',
      categoryNameAr: 'العروض والتصميم',
      descriptionAr: 'تصميم شرائح Presentation بصرية احترافية مع إنفوجرافيك متحرك ومخططات بيانية لدفاع أطروحة دكتوراه.',
      clientName: 'سلطان الشمري',
      university: 'جامعة الإمام محمد بن سعود',
      specialization: 'مناهج وطرق تدريس',
      degree: 'دكتوراه',
      coverImageUrl: 'farah_mascot_3d_1788171300241.jpg',
      fileUrl: 'https://example.com/defense_slides.pdf',
      videoUrl: '',
      tags: ['PowerPoint سينمائي', 'إنفوجرافيك', 'دفاع أطروحة'],
      isFeatured: true,
      isActive: true,
      completedAt: '2026-08-29'
    }
  ];

  getPortfolioItems(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(`${this.apiUrl}/portfolio`).pipe(
      catchError(() => of(this.defaultPortfolioItems))
    );
  }

  createPortfolioItem(item: Partial<PortfolioItem>): Observable<PortfolioItem> {
    const newItem: PortfolioItem = {
      id: 'p-' + Date.now(),
      titleAr: item.titleAr || 'عمل أكاديمي جديد',
      categoryNameAr: item.categoryNameAr || 'الخدمات الأكاديمية',
      descriptionAr: item.descriptionAr || '',
      clientName: item.clientName || 'باحث معتمد',
      university: item.university || 'جامعة الملك سعود',
      specialization: item.specialization || 'دراسات عليا',
      degree: item.degree || 'ماجستير',
      coverImageUrl: item.coverImageUrl || '',
      fileUrl: item.fileUrl || '',
      videoUrl: item.videoUrl || '',
      tags: item.tags || ['بحث علمي', 'توثيق معتمد'],
      isFeatured: item.isFeatured ?? true,
      isActive: item.isActive ?? true,
      completedAt: item.completedAt || new Date().toISOString().slice(0, 10)
    };
    return this.http.post<PortfolioItem>(`${this.apiUrl}/portfolio`, newItem).pipe(
      catchError(() => {
        this.defaultPortfolioItems.unshift(newItem);
        return of(newItem);
      })
    );
  }

  updatePortfolioItem(id: string, item: Partial<PortfolioItem>): Observable<any> {
    return this.http.put(`${this.apiUrl}/portfolio/${id}`, item).pipe(
      catchError(() => {
        const idx = this.defaultPortfolioItems.findIndex(p => p.id === id);
        if (idx !== -1) {
          this.defaultPortfolioItems[idx] = { ...this.defaultPortfolioItems[idx], ...item } as PortfolioItem;
        }
        return of({ success: true });
      })
    );
  }

  deletePortfolioItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/portfolio/${id}`).pipe(
      catchError(() => {
        this.defaultPortfolioItems = this.defaultPortfolioItems.filter(p => p.id !== id);
        return of({ success: true });
      })
    );
  }

  // --- PAGES & CMS TEXT CONTENT CRUD ---
  private defaultPages: PageItem[] = [
    {
      id: 'page_about',
      slug: 'about',
      titleAr: 'من نحن — ريادة وتميز أكاديمي وطني',
      contentAr: 'أم رهام هي المنظومة الأكاديمية والتعليمية الرائدة في المملكة العربية السعودية، تأسست لتقديم الدعم الشامل والمحكم للباحثين وطلاب الدراسات العليا، مع التزام تام بالسرية ومعايير النشر والأصالة 100%.',
      isPublished: true,
      seoTitle: 'عن أم رهام | المنظومة الأكاديمية الذكية',
      seoDescription: 'تعرف على قصة أم رهام وركائزنا الأكاديمية ورؤيتنا في خدمة الباحثين في الجامعات السعودية.'
    },
    {
      id: 'page_pillars',
      slug: 'pillars',
      titleAr: 'الركائز الأكاديمية الأربعة للتميز',
      contentAr: '1. دقة التوثيق وفق APA 7 و Harvard.\n2. سرية تامة واتفاقيات عدم إفصاح NDA.\n3. التزام دقيق بالمواعيد والجداول الزمنية.\n4. دعم وتعديلات مستمرة حتى نيل الاعتماد.',
      isPublished: true,
      seoTitle: 'ركائز العمل والضمانات الأكاديمية',
      seoDescription: 'الضمانات الأكاديمية ونسبة الأصالة 100% والسرية التامة مع أم رهام.'
    },
    {
      id: 'page_contact',
      slug: 'contact',
      titleAr: 'تواصل مع القيادة الأكاديمية (VIP Concierge)',
      contentAr: 'فريق مستشارينا الأكاديميين متاح على مدار الساعة لتلقي استفساراتكم وتقديم عروض الأسعار والخطط الزمنية فوراً.',
      isPublished: true,
      seoTitle: 'اتصل بنا | خدمة العملاء والباحثين',
      seoDescription: 'تواصل مع فريق أم رهام عبر الواتساب أو الهاتف للحصول على استشارة فورية.'
    }
  ];

  getPages(): Observable<PageItem[]> {
    return this.http.get<PageItem[]>(`${this.apiUrl}/pages`).pipe(
      catchError(() => of(this.defaultPages))
    );
  }

  updatePage(slug: string, page: Partial<PageItem>): Observable<any> {
    return this.http.put(`${this.apiUrl}/pages/${slug}`, page).pipe(
      catchError(() => {
        const idx = this.defaultPages.findIndex(p => p.slug === slug);
        if (idx !== -1) {
          this.defaultPages[idx] = { ...this.defaultPages[idx], ...page } as PageItem;
        }
        return of({ success: true });
      })
    );
  }

  // --- FOOTER & QUICK LINKS CRUD ---
  private defaultFooterLinks: FooterLinkItem[] = [
    { id: 'f1', titleAr: 'البحوث العلمية والماجستير', url: '/services', group: 'services', isActive: true },
    { id: 'f2', titleAr: 'مشاريع التخرج والتقنية', url: '/services', group: 'services', isActive: true },
    { id: 'f3', titleAr: 'التحليل الإحصائي SPSS', url: '/services', group: 'services', isActive: true },
    { id: 'f4', titleAr: 'معرض الأعمال السابقة المعتمدة', url: '/portfolio', group: 'quick', isActive: true },
    { id: 'f5', titleAr: 'آراء وشهادات الباحثين', url: '/testimonials', group: 'quick', isActive: true },
    { id: 'f6', titleAr: 'حاسبة التكلفة والأسعار الفورية', url: '/services', group: 'quick', isActive: true },
    { id: 'f7', titleAr: 'سياسة الخصوصية وسرية الأبحاث NDA', url: '/about', group: 'legal', isActive: true },
    { id: 'f8', titleAr: 'ضمان فحص الأصالة 0% اقتباس', url: '/about', group: 'legal', isActive: true }
  ];

  getFooterLinks(): Observable<FooterLinkItem[]> {
    return of(this.defaultFooterLinks);
  }

  updateFooterLink(id: string, link: Partial<FooterLinkItem>): Observable<any> {
    const idx = this.defaultFooterLinks.findIndex(f => f.id === id);
    if (idx !== -1) {
      this.defaultFooterLinks[idx] = { ...this.defaultFooterLinks[idx], ...link } as FooterLinkItem;
    }
    return of({ success: true });
  }

  createFooterLink(link: Partial<FooterLinkItem>): Observable<FooterLinkItem> {
    const newItem: FooterLinkItem = {
      id: 'f-' + Date.now(),
      titleAr: link.titleAr || 'رابط جديد',
      url: link.url || '/',
      group: link.group || 'quick',
      isActive: link.isActive ?? true
    };
    this.defaultFooterLinks.push(newItem);
    return of(newItem);
  }

  deleteFooterLink(id: string): Observable<any> {
    this.defaultFooterLinks = this.defaultFooterLinks.filter(f => f.id !== id);
    return of({ success: true });
  }

  submitServiceRequest(payload: any): Observable<any> {
    const isIsoDate = payload.deadline && !isNaN(Date.parse(payload.deadline)) && payload.deadline.toString().includes('-');
    const apiPayload = {
      serviceId: payload.serviceId || null,
      clientName: payload.clientName || 'عميل موثق',
      clientPhone: payload.clientPhone || '',
      clientEmail: payload.clientEmail || null,
      description: payload.description || payload.serviceName || 'طلب خدمة أكاديمية',
      specialization: payload.specialization || null,
      university: payload.university || null,
      deadline: isIsoDate ? new Date(payload.deadline).toISOString() : null,
      pageCount: payload.pageCount ? Number(payload.pageCount) : null,
      additionalDetails: typeof payload.additionalDetails === 'string' 
        ? payload.additionalDetails 
        : JSON.stringify({
            orderNumber: payload.orderNumber,
            serviceTitle: payload.serviceName || payload.serviceTitle,
            degree: payload.degree,
            price: payload.price,
            deadlineText: payload.deadline
          })
    };

    const localItem = {
      id: 'req-' + Date.now(),
      ...payload,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    this.defaultServiceRequests.unshift(localItem);

    return this.http.post<any>(`${this.apiUrl}/service-requests`, apiPayload).pipe(
      catchError(err => {
        console.warn('Backend request fallback to local:', err);
        return of({ success: true, id: localItem.id, ...localItem });
      })
    );
  }


  // --- MEDIA UPLOAD ---
  uploadMedia(file: File, folder: string = 'general'): Observable<MediaDto> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return this.http.post<MediaDto>(`${this.apiUrl}/media/upload`, formData).pipe(
      catchError(() => {
        // Fallback: return a local object URL for preview only
        const localUrl = URL.createObjectURL(file);
        return of({ id: 'local-' + Date.now(), url: localUrl, fileName: file.name, fileType: file.type, folder });
      })
    );
  }

  // --- ORDER TRACKING ---
  trackServiceRequest(code: string, phone?: string): Observable<OrderTrackingResult | null> {
    const params: any = { code };
    if (phone) params.phone = phone;
    return this.http.get<OrderTrackingResult>(`${this.apiUrl}/service-requests/track`, { params }).pipe(
      catchError(() => {
        // fallback: search locally
        const found = this.defaultServiceRequests.find(
          r => r.trackingCode === code || (phone && r.clientPhone === phone)
        );
        if (found) {
          return of({
            id: found.id,
            trackingCode: found.trackingCode || code,
            clientName: found.clientName,
            serviceName: found.serviceName,
            status: found.status || 'جديد',
            discountPercent: found.discountPercent,
            createdAt: found.createdAt,
            updatedAt: found.updatedAt
          } as OrderTrackingResult);
        }
        return of(null);
      })
    );
  }

  // --- SITE SETTINGS (logo, profile_photo, header_bg, discount, whatsapp) ---
  private defaultSettings: SiteSetting[] = [
    { key: 'whatsapp_number', value: '966572651058' },
    { key: 'order_discount_percent', value: '15' },
    { key: 'site_logo', value: '' },
    { key: 'profile_photo', value: '' },
    { key: 'header_bg_image', value: '' }
  ];

  getPublicSettings(): Observable<SiteSetting[]> {
    return this.http.get<SiteSetting[]>(`${this.apiUrl}/settings`).pipe(
      catchError(() => of(this.defaultSettings))
    );
  }

  getSetting(key: string): Observable<string> {
    return this.getPublicSettings().pipe(
      map(settings => {
        const found = settings.find(s => s.key === key);
        return found ? found.value : '';
      })
    );
  }

  saveSetting(key: string, value: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings/${key}`, { value }).pipe(
      catchError(() => {
        const idx = this.defaultSettings.findIndex(s => s.key === key);
        if (idx !== -1) this.defaultSettings[idx].value = value;
        else this.defaultSettings.push({ key, value });
        return of({ success: true });
      })
    );
  }

  getDiscountPercent(): Observable<number> {
    return this.getSetting('order_discount_percent').pipe(
      map(val => val ? Number(val) : 15)
    );
  }

  getWhatsAppNumber(): Observable<string> {
    return this.getSetting('whatsapp_number').pipe(
      map(val => val || '966572651058')
    );
  }

  generateTrackingCode(): string {
    const num = Math.floor(10000 + Math.random() * 90000);
    return `UR-${num}`;
  }

  generateWhatsAppUrl(dto: {
    serviceName?: string;
    description?: string;
    specialization?: string;
    university?: string;
    pageCount?: number;
    deadline?: string;
    clientName?: string;
    phone?: string;
    trackingCode?: string;
    discount?: number;
    totalPrice?: number;
    attachments?: Array<{ fileName: string; fileSize?: string; fileUrl?: string }>;
  }): string {
    const lines: string[] = [
      'السلام عليكم ورحمة الله وبركاته 🌸',
      '*طلب خدمة جديد — منصة أم رهام الأكاديمية*',
      '━━━━━━━━━━━━━━━━━━━━',
      ''
    ];

    if (dto.trackingCode) {
      lines.push(`📋 *كود المتابعة:* \`${dto.trackingCode}\``);
      lines.push('━━━━━━━━━━━━━━━━━━━━');
    }

    if (dto.clientName) {
      lines.push(`👤 *اسم العميل:* ${dto.clientName}`);
    }
    if (dto.phone) {
      lines.push(`📱 *رقم الجوال:* ${dto.phone}`);
    }
    if (dto.university) {
      lines.push(`🏛️ *الجامعة / الجهة:* ${dto.university}`);
    }
    if (dto.specialization) {
      lines.push(`📚 *التخصص الأكاديمي:* ${dto.specialization}`);
    }
    if (dto.serviceName) {
      lines.push(`📌 *الخدمة المطلوبة:* ${dto.serviceName}`);
    }
    if (dto.pageCount) {
      lines.push(`📄 *عدد الصفحات / الوحدات:* ${dto.pageCount}`);
    }
    if (dto.deadline) {
      lines.push(`⏰ *الموعد المطلوب:* ${dto.deadline}`);
    }
    if (dto.discount && dto.discount > 0) {
      lines.push(`🎁 *نسبة الخصم المعتمدة:* ${dto.discount}%`);
    }
    if (dto.totalPrice !== undefined && dto.totalPrice !== null) {
      lines.push(`💰 *التكلفة المقدرة:* ${dto.totalPrice} ر.س`);
    }

    if (dto.description && dto.description.trim()) {
      lines.push('');
      lines.push('📝 *تفاصيل ومتطلبات الطلب:*');
      lines.push(`${dto.description.trim()}`);
    }

    if (dto.attachments && dto.attachments.length > 0) {
      const fileNames = dto.attachments.map(a => a.fileName).join('، ');
      lines.push('');
      lines.push(`📎 *المرفقات المرفوعة (${dto.attachments.length}):* ${fileNames}`);
    }

    lines.push('');
    lines.push('━━━━━━━━━━━━━━━━━━━━');
    lines.push('🛡️ *الضمان الذهبي:* الدفع بعد الإنجاز والاستلام المعتمد 100%');
    lines.push('✨ *أرجو مراجعة الطلب والبدء بالتنفيذ، شكراً لكم 🌸*');

    const defaultPhone = '966572651058';
    const stored = this.defaultSettings.find(s => s.key === 'whatsapp_number')?.value || defaultPhone;
    const cleanPhone = stored.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  }
}
