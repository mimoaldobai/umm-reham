import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';

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
  priceType: string;
  priceMin?: number;
  priceMax?: number;
  priceCurrency: string;
  estimatedDuration?: string;
  iconSvg?: string;
  coverImageUrl?: string;
  isFeatured: boolean;
  categoryNameAr?: string;
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
  private apiUrl = 'http://localhost:5073/api';

  // Fallback initial data in case backend is offline during local preview
  private defaultCategories: Category[] = [
    { id: '1', nameAr: 'الخدمات الأكاديمية', slug: 'academic-services', descriptionAr: 'بحوث علمية، تقارير، ومشاريع تخرج', sortOrder: 1, isActive: true },
    { id: '2', nameAr: 'العروض والتصميم', slug: 'presentations-design', descriptionAr: 'عروض تقديمية وتصاميم أكاديمية وبورتفوليو', sortOrder: 2, isActive: true },
    { id: '3', nameAr: 'التقنية والبرمجة', slug: 'technology-programming', descriptionAr: 'تطوير برمجيات، ذكاء اصطناعي، وتحليل بيانات', sortOrder: 3, isActive: true },
    { id: '4', nameAr: 'المسار المهني', slug: 'career-path', descriptionAr: 'سيرة ذاتية احترافية وتطوير الملف المهني', sortOrder: 4, isActive: true },
    { id: '5', nameAr: 'التعليم والتطوير', slug: 'education-development', descriptionAr: 'دعم تعليمي وتطوير مهارات واستشارات', sortOrder: 5, isActive: true }
  ];

  private defaultServices: ServiceItem[] = [
    { id: 's1', categoryId: '1', nameAr: 'البحوث العلمية', slug: 'scientific-research', shortDescriptionAr: 'إعداد بحوث علمية متكاملة ومحكمة بأعلى المعايير الأكاديمية والتوثيق المعتمد.', priceType: 'range', priceMin: 200, priceMax: 2000, priceCurrency: 'SAR', estimatedDuration: '3-14 يوم', isFeatured: true, categoryNameAr: 'الخدمات الأكاديمية' },
    { id: 's2', categoryId: '1', nameAr: 'مشاريع التخرج', slug: 'graduation-projects', shortDescriptionAr: 'مرافقة شاملة لإعداد مشروع تخرج متكامل يشمل البحث، التحليل، والتوثيق.', priceType: 'quote', priceCurrency: 'SAR', estimatedDuration: 'حسب المشروع', isFeatured: true, categoryNameAr: 'الخدمات الأكاديمية' },
    { id: 's3', categoryId: '1', nameAr: 'التقارير الأكاديمية', slug: 'reports', shortDescriptionAr: 'صياغة تقارير أكاديمية ومهنية رصينة تدعم أهدافك الدراسية بدقة عالية.', priceType: 'range', priceMin: 100, priceMax: 800, priceCurrency: 'SAR', estimatedDuration: '2-7 أيام', isFeatured: false, categoryNameAr: 'الخدمات الأكاديمية' },
    { id: 's4', categoryId: '2', nameAr: 'العروض التقديمية (PowerPoint)', slug: 'presentations', shortDescriptionAr: 'تصميم عروض سينمائية وتفاعلية احترافية تترك أثراً بصرياً قوياً.', priceType: 'range', priceMin: 100, priceMax: 600, priceCurrency: 'SAR', estimatedDuration: '2-4 أيام', isFeatured: true, categoryNameAr: 'العروض والتصميم' },
    { id: 's5', categoryId: '3', nameAr: 'البرمجة والمشاريع التقنية', slug: 'programming', shortDescriptionAr: 'تنفيذ حلول برمجية وتطبيقات ومشاريع ذكاء اصطناعي بأحدث التقنيات.', priceType: 'quote', priceCurrency: 'SAR', estimatedDuration: 'حسب المتطلبات', isFeatured: true, categoryNameAr: 'التقنية والبرمجة' },
    { id: 's6', categoryId: '4', nameAr: 'السيرة الذاتية الاحترافية (ATS)', slug: 'resume-cv', shortDescriptionAr: 'صياغة سيرة ذاتية عصرية متوافقة مع أنظمة الفرز العالمي لتسريع التوظيف.', priceType: 'range', priceMin: 100, priceMax: 350, priceCurrency: 'SAR', estimatedDuration: '24-48 ساعة', isFeatured: true, categoryNameAr: 'المسار المهني' }
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
    return this.http.get<ServiceItem[]>(url).pipe(
      catchError(() => of(this.defaultServices))
    );
  }

  getFeaturedServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}/services/featured`).pipe(
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

  // --- SERVICES CRUD ---
  createService(service: Partial<ServiceItem>): Observable<ServiceItem> {
    const item: ServiceItem = {
      id: 's-' + Date.now(),
      nameAr: service.nameAr || '',
      nameEn: service.nameEn,
      slug: service.slug || 'service-' + Date.now(),
      shortDescriptionAr: service.shortDescriptionAr,
      fullDescriptionAr: service.fullDescriptionAr,
      categoryNameAr: service.categoryNameAr || 'الخدمات الأكاديمية',
      priceType: service.priceType || 'range',
      priceMin: service.priceMin,
      priceMax: service.priceMax,
      priceCurrency: service.priceCurrency || 'SAR',
      estimatedDuration: service.estimatedDuration || '2-5 أيام',
      isFeatured: service.isFeatured ?? true
    };
    return this.http.post<ServiceItem>(`${this.apiUrl}/services`, item).pipe(
      catchError(() => {
        this.defaultServices.unshift(item);
        return of(item);
      })
    );
  }

  updateService(id: string, service: Partial<ServiceItem>): Observable<any> {
    return this.http.put(`${this.apiUrl}/services/${id}`, service).pipe(
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

  getServiceRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/service-requests`).pipe(
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

  generateWhatsAppUrl(data: { serviceName?: string; description?: string; specialization?: string; university?: string; pageCount?: number; deadline?: string; phone?: string }): string {
    const phoneNumber = data.phone || '966501234567';
    const lines = [
      'السلام عليكم ورحمة الله وبركاته 🌿',
      'أرغب في طلب خدمة من منصة *أم رهام*:',
      '',
      data.serviceName ? `📌 *الخدمة:* ${data.serviceName}` : '',
      data.specialization ? `🎓 *التخصص:* ${data.specialization}` : '',
      data.university ? `🏛️ *الجامعة:* ${data.university}` : '',
      data.pageCount ? `📄 *عدد الصفحات/الشرائح:* ${data.pageCount}` : '',
      data.deadline ? `⏰ *الموعد المطلوب:* ${data.deadline}` : '',
      data.description ? `📝 *تفاصيل إضافية:* ${data.description}` : '',
      '',
      'أرجو التكرم بالتواصل وتوضيح آلية التنفيذ والتكلفة. شكراً جزيلاً! ✨'
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${phoneNumber}?text=${message}`;
  }
}
