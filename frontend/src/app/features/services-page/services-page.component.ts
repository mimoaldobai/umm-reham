import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService, ServiceItem, Category } from '../../core/services/api.service';
import { AudioService } from '../../core/services/audio.service';
import { ServiceModalComponent } from '../../shared/components/service-modal/service-modal.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ServiceModalComponent],
  template: `
    <div class="services-experience-wrapper bg-ivory-warm" dir="rtl">
      
      <!-- ==========================================
           PAGE HEADER & LIVE ESTIMATOR TEASER
           ========================================== -->
      <section class="services-hero-section">
        <div class="container">
          <div class="services-hero-content">
            <div class="hero-badge-row">
              <span class="badge-gold">دليل الخدمات والحلول الأكاديمية الشامل</span>
              <span class="badge-glow">معتمد لكافة الجامعات 🇸🇦</span>
            </div>
            
            <h1 class="services-hero-title">
              منظومة متكاملة لدعم <br/>
              <span class="gold-gradient-text">البحث العلمي والتفوق الأكاديمي</span>
            </h1>

            <p class="services-hero-lead">
              حلول محكمة، أبحاث أصيلة، مشاريع تخرج هندسية وبرمجية، وتحليلات إحصائية دقيقة مُعدة بإشراف نخبة من المستشارين الأكاديميين.
            </p>
          </div>
        </div>
      </section>

      <!-- ==========================================
           INTERACTIVE RESEARCH COST & TIME CALCULATOR
           ========================================== -->
      <section class="calculator-section">
        <div class="container">
          <div class="calculator-card glass-panel">
            <div class="calc-header">
              <div class="calc-title-box">
                <span class="calc-emblem">🧮</span>
                <div>
                  <h3>حاسبة التكلفة والمدة التقديرية الفورية</h3>
                  <small>حدد تفاصيل طلبك الأكاديمي واكتشف النطاق السعري التقديري فوراً</small>
                </div>
              </div>
              <span class="calc-badge">حساب ذكي وديناميكي ✓</span>
            </div>

            <div class="calc-body-grid">
              <!-- Degree Selector -->
              <div class="calc-field">
                <label>الدرجة العلمية:</label>
                <div class="pill-options">
                  <button 
                    class="calc-pill" 
                    [class.active]="calcDegree === 'bachelor'"
                    (click)="setCalcDegree('bachelor')">
                    🎓 بكالوريوس
                  </button>
                  <button 
                    class="calc-pill" 
                    [class.active]="calcDegree === 'master'"
                    (click)="setCalcDegree('master')">
                    📜 ماجستير
                  </button>
                  <button 
                    class="calc-pill" 
                    [class.active]="calcDegree === 'phd'"
                    (click)="setCalcDegree('phd')">
                    🏛️ دكتوراه
                  </button>
                </div>
              </div>

              <!-- Service Type -->
              <div class="calc-field">
                <label>نوع الخدمة المطلوبة:</label>
                <select class="calc-select" [(ngModel)]="calcServiceType" (change)="recalculate()">
                  <option value="research">إعداد بحث علمي ودراسة تطبيقية</option>
                  <option value="thesis_plan">إعداد خطة بحث (Proposal)</option>
                  <option value="spss">تحليل إحصائي متقدم SPSS</option>
                  <option value="project">مشروع تخرج برمجي أو تقني</option>
                  <option value="presentation">تصميم عرض تقديمي 4K تفاعلي</option>
                  <option value="resume">سيرة ذاتية احترافية ATS وتطوير لينكد إن</option>
                </select>
              </div>

              <!-- Page Count Slider -->
              <div class="calc-field">
                <div class="slider-label-row">
                  <label>عدد الصفحات / السلايدات التقريبي:</label>
                  <strong class="slider-val">{{ calcPages }} صفحة</strong>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="80" 
                  step="5" 
                  class="calc-range" 
                  [(ngModel)]="calcPages" 
                  (input)="recalculate()" />
              </div>

              <!-- Urgency -->
              <div class="calc-field">
                <label>المدة المطلوبة للتسليم:</label>
                <div class="pill-options">
                  <button 
                    class="calc-pill" 
                    [class.active]="calcUrgency === 'normal'"
                    (click)="setCalcUrgency('normal')">
                    📅 عادي (5-10 أيام)
                  </button>
                  <button 
                    class="calc-pill urgent" 
                    [class.active]="calcUrgency === 'urgent'"
                    (click)="setCalcUrgency('urgent')">
                    ⚡ عاجل (48-72 ساعة)
                  </button>
                </div>
              </div>
            </div>

            <!-- Calculator Result Box -->
            <div class="calc-result-ribbon">
              <div class="result-price-wrap">
                <span>التكلفة التقديرية المقترحة:</span>
                <strong class="gold-gradient-text">{{ estimatedMinPrice }} - {{ estimatedMaxPrice }} ر.س</strong>
              </div>

              <div class="result-actions">
                <a 
                  [href]="getCalculatorWhatsAppLink()" 
                  target="_blank" 
                  class="btn-saudi-gold"
                  (click)="onCalculateAction()">
                  <span>💬 طلب الخدمة بهذا السعر عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           MAIN SERVICES CATALOG
           ========================================== -->
      <section class="services-catalog-section section-padding">
        <div class="container">
          
          <!-- Category Filters Row -->
          <div class="category-filters-container">
            <div class="category-filters-row">
              <button 
                class="cat-filter-btn" 
                [class.active]="selectedCategorySlug === 'all'"
                (click)="filterCategory('all')">
                ✨ كافة الخدمات ({{ services.length }})
              </button>

              <button 
                *ngFor="let cat of categories" 
                class="cat-filter-btn"
                [class.active]="selectedCategorySlug === cat.slug"
                (click)="filterCategory(cat.slug)">
                {{ cat.nameAr }}
              </button>
            </div>
          </div>

          <!-- Services Grid -->
          <div class="services-curated-grid">
            <div 
              *ngFor="let s of filteredServices; let idx = index" 
              class="service-luxury-card glass-panel"
              (click)="openModal(s)"
              (mouseenter)="onHover()">
              
              <div class="card-glass-header">
                <div class="card-icon-emblem">
                  <span>{{ getServiceIcon(s.nameAr) }}</span>
                </div>
                <div class="card-index-tag">#0{{ idx + 1 }}</div>
              </div>

              <div class="card-body">
                <span class="service-category-badge">{{ s.categoryNameAr }}</span>
                <h3 class="service-title">{{ s.nameAr }}</h3>
                <p class="service-excerpt">{{ s.shortDescriptionAr }}</p>

                <!-- Tailored Benefits Checklist -->
                <ul class="service-feature-checklist">
                  <li *ngFor="let feat of getServiceFeatures(s.nameAr)">
                    <span class="check-icon">✓</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <div class="card-footer-action">
                <div class="price-duration-box">
                  <div class="price-val">
                    <small>السعر التقديري:</small>
                    <strong *ngIf="s.priceType === 'range'" class="gold-gradient-text">
                      {{ s.priceMin }} - {{ s.priceMax }} {{ s.priceCurrency }}
                    </strong>
                    <strong *ngIf="s.priceType === 'quote'" class="gold-gradient-text">حسب المتطلبات</strong>
                    <strong *ngIf="s.priceType === 'contact'" class="gold-gradient-text">تواصل للاستفسار</strong>
                  </div>
                  <div class="duration-val">
                    <small>مدة التنفيذ:</small>
                    <span>{{ s.estimatedDuration || '3-5 أيام' }}</span>
                  </div>
                </div>

                <button class="btn-order-service" (click)="$event.stopPropagation(); openModal(s)">
                  <span>تفاصيل وطلب</span>
                  <span class="arr">←</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ==========================================
           MODAL COMPONENT
           ========================================== -->
      <app-service-modal [service]="activeService" (closeEvent)="activeService = null"></app-service-modal>

    </div>
  `,
  styles: [`
    .services-experience-wrapper {
      min-height: 100vh;
      padding-top: 6rem;
    }

    .services-hero-section {
      padding: 3.5rem 0 2rem 0;
      text-align: center;
    }

    .services-hero-content {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero-badge-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1.2rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .badge-glow {
      background: rgba(37, 211, 102, 0.12);
      border: 1px solid rgba(37, 211, 102, 0.35);
      color: #25D366;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: var(--radius-full);
    }

    .services-hero-title {
      font-size: clamp(2.2rem, 4.5vw, 3.4rem);
      color: #0B2516;
      line-height: 1.3;
      margin-bottom: 1.2rem;
      font-weight: 900;
    }

    .services-hero-lead {
      font-size: 1.15rem;
      color: #52665C;
      line-height: 1.8;
      max-width: 760px;
      margin-bottom: 1.5rem;
    }

    /* Calculator Section */
    .calculator-section {
      margin: 1.5rem 0 3.5rem 0;
    }

    .calculator-card {
      padding: 2.5rem;
      border-radius: var(--radius-xl);
      border: 1.5px solid rgba(201, 169, 110, 0.4);
      background: #FFFFFF;
      box-shadow: 0 15px 45px rgba(27, 67, 50, 0.08);
    }

    .calc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      padding-bottom: 1.2rem;
      margin-bottom: 1.8rem;
    }

    .calc-title-box {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .calc-emblem {
      font-size: 2.2rem;
    }

    .calc-title-box h3 {
      font-size: 1.4rem;
      color: #0B2516;
      margin: 0 0 2px 0;
      font-weight: 800;
    }

    .calc-title-box small {
      font-size: 0.85rem;
      color: #52665C;
    }

    .calc-badge {
      font-size: 0.78rem;
      background: rgba(5, 150, 105, 0.12);
      color: #059669;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-weight: 800;
      border: 1px solid rgba(5, 150, 105, 0.3);
    }

    .calc-body-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.8rem;
      margin-bottom: 2rem;
    }

    .calc-field {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .calc-field label {
      font-size: 0.88rem;
      color: #1B4332;
      font-weight: 700;
    }

    .pill-options {
      display: flex;
      gap: 0.4rem;
    }

    .calc-pill {
      flex: 1;
      padding: 0.6rem 0.5rem;
      border-radius: var(--radius-md);
      background: #F8F5EE;
      border: 1px solid rgba(201, 169, 110, 0.3);
      color: #1B4332;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }

    .calc-pill.active {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      border-color: #C9A96E;
      color: #FFFFFF;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.25);
    }

    .calc-pill.urgent.active {
      background: rgba(217, 119, 6, 0.25);
      border-color: #D97706;
      color: #B45309;
    }

    .calc-select {
      width: 100%;
      padding: 0.65rem 0.9rem;
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      border-radius: var(--radius-md);
      color: #0B2516;
      font-size: 0.85rem;
      font-family: inherit;
    }

    .slider-label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .slider-val {
      color: #A48348;
      font-size: 0.95rem;
      font-family: var(--font-family-latin);
      font-weight: 800;
    }

    .calc-range {
      width: 100%;
      accent-color: #1B4332;
      cursor: pointer;
    }

    .calc-result-ribbon {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg, #1B4332 0%, #0B2516 100%);
      border: 1.5px solid #C9A96E;
      padding: 1.2rem 1.8rem;
      border-radius: var(--radius-lg);
      gap: 1.5rem;
      color: #FFFFFF;
      box-shadow: 0 10px 30px rgba(27, 67, 50, 0.25);
    }

    .result-price-wrap {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .result-price-wrap span {
      font-size: 0.85rem;
      color: #B4CDC3;
    }

    .result-price-wrap strong {
      font-size: 1.8rem;
      font-weight: 900;
      font-family: var(--font-family-latin);
      color: #DFC698;
    }

    .btn-saudi-gold {
      background: linear-gradient(135deg, #C9A96E 0%, #A48348 100%);
      color: #06130D;
      padding: 0.85rem 1.8rem;
      border-radius: var(--radius-full);
      font-weight: 800;
      font-size: 0.92rem;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(201, 169, 110, 0.4);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .btn-saudi-gold:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(201, 169, 110, 0.6);
    }

    /* Category Filters */
    .category-filters-container {
      display: flex;
      justify-content: center;
      margin-bottom: 2.5rem;
    }

    .category-filters-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      justify-content: center;
      background: #FFFFFF;
      padding: 0.5rem;
      border-radius: var(--radius-full);
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.05);
    }

    .cat-filter-btn {
      padding: 0.6rem 1.3rem;
      border-radius: var(--radius-full);
      background: transparent;
      border: none;
      color: #52665C;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .cat-filter-btn:hover {
      color: #1B4332;
      background: #F8F5EE;
    }

    .cat-filter-btn.active {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.25);
    }

    /* Curated Services Grid */
    .services-curated-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }

    .service-luxury-card {
      padding: 2.2rem;
      border-radius: var(--radius-xl);
      border: 1.5px solid rgba(201, 169, 110, 0.3);
      background: #FFFFFF;
      box-shadow: 0 10px 30px rgba(27, 67, 50, 0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-luxury-card:hover {
      transform: translateY(-8px);
      border-color: #C9A96E;
      box-shadow: 0 20px 50px rgba(27, 67, 50, 0.12), 0 0 25px rgba(201, 169, 110, 0.25);
    }

    .card-glass-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.2rem;
    }

    .card-icon-emblem {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      background: #F8F5EE;
      border: 1.5px solid #C9A96E;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
    }

    .card-index-tag {
      font-size: 0.8rem;
      color: #C9A96E;
      font-family: var(--font-family-latin);
      font-weight: 800;
      opacity: 0.7;
    }

    .service-category-badge {
      font-size: 0.72rem;
      background: rgba(201, 169, 110, 0.15);
      color: #A48348;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      font-weight: 700;
      border: 1px solid rgba(201, 169, 110, 0.3);
      display: inline-block;
      margin-bottom: 0.6rem;
    }

    .service-title {
      font-size: 1.35rem;
      color: #0B2516;
      margin-bottom: 0.6rem;
      font-weight: 800;
    }

    .service-excerpt {
      color: #52665C;
      font-size: 0.92rem;
      line-height: 1.6;
      margin-bottom: 1.2rem;
    }

    .service-feature-checklist {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .service-feature-checklist li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.82rem;
      color: #334E42;
    }

    .check-icon {
      color: #059669;
      font-weight: 900;
      font-size: 0.85rem;
    }

    .card-footer-action {
      border-top: 1px solid #F1F5F9;
      padding-top: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .price-duration-box {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .price-val small, .duration-val small {
      font-size: 0.68rem;
      color: #52665C;
      display: block;
    }

    .price-val strong {
      font-size: 1.05rem;
      font-weight: 800;
      color: #1B4332;
    }

    .duration-val span {
      font-size: 0.78rem;
      color: #64748B;
    }

    .btn-order-service {
      background: linear-gradient(135deg, #1B4332 0%, #0B2516 100%);
      border: 1px solid #C9A96E;
      color: #FFFFFF;
      padding: 0.6rem 1.1rem;
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s;
    }

    .btn-order-service:hover {
      background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
      color: #DFC698;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.25);
    }

    @media (max-width: 768px) {
      .calc-result-ribbon { flex-direction: column; text-align: center; }
      .btn-saudi-gold { width: 100%; justify-content: center; }
    }
  `]
})
export class ServicesPageComponent implements OnInit {
  private api = inject(ApiService);
  private audio = inject(AudioService);
  private route = inject(ActivatedRoute);

  services: ServiceItem[] = [];
  categories: Category[] = [];
  selectedCategorySlug = 'all';
  activeService: ServiceItem | null = null;

  // Calculator State
  calcDegree: 'bachelor' | 'master' | 'phd' = 'master';
  calcServiceType = 'research';
  calcPages = 20;
  calcUrgency: 'normal' | 'urgent' = 'normal';
  estimatedMinPrice = 450;
  estimatedMaxPrice = 850;

  ngOnInit(): void {
    this.api.getCategories().subscribe(cats => this.categories = cats);
    this.api.getServices().subscribe(srvs => this.services = srvs);

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategorySlug = params['category'];
      }
    });

    this.recalculate();
  }

  get filteredServices(): ServiceItem[] {
    if (this.selectedCategorySlug === 'all') {
      return this.services;
    }
    const cat = this.categories.find(c => c.slug === this.selectedCategorySlug);
    if (!cat) return this.services;
    return this.services.filter(s => s.categoryId === cat.id || s.categoryNameAr === cat.nameAr);
  }

  filterCategory(slug: string): void {
    this.selectedCategorySlug = slug;
    this.audio.playClick();
  }

  openModal(service: ServiceItem): void {
    this.activeService = service;
    this.audio.playClick();
  }

  onHover(): void {
    this.audio.playHover();
  }

  setCalcDegree(degree: 'bachelor' | 'master' | 'phd'): void {
    this.calcDegree = degree;
    this.recalculate();
    this.audio.playClick();
  }

  setCalcUrgency(urgency: 'normal' | 'urgent'): void {
    this.calcUrgency = urgency;
    this.recalculate();
    this.audio.playClick();
  }

  recalculate(): void {
    let baseRate = 25; // per page
    if (this.calcDegree === 'bachelor') baseRate = 20;
    if (this.calcDegree === 'master') baseRate = 35;
    if (this.calcDegree === 'phd') baseRate = 50;

    let typeMultiplier = 1.0;
    if (this.calcServiceType === 'spss') typeMultiplier = 1.2;
    if (this.calcServiceType === 'project') typeMultiplier = 1.4;
    if (this.calcServiceType === 'presentation') typeMultiplier = 0.8;
    if (this.calcServiceType === 'resume') typeMultiplier = 0.6;

    let urgencyFactor = this.calcUrgency === 'urgent' ? 1.35 : 1.0;

    const calculated = Math.round(this.calcPages * baseRate * typeMultiplier * urgencyFactor);
    this.estimatedMinPrice = Math.max(150, Math.round(calculated * 0.85));
    this.estimatedMaxPrice = Math.round(calculated * 1.15);
  }

  getCalculatorWhatsAppLink(): string {
    const degreeName = this.calcDegree === 'bachelor' ? 'بكالوريوس' : (this.calcDegree === 'master' ? 'ماجستير' : 'دكتوراه');
    const urgencyName = this.calcUrgency === 'urgent' ? 'عاجل (48-72 ساعة)' : 'عادي';
    const text = encodeURIComponent(
      `السلام عليكم أم رهام 🌟\nأرغب بالاستفسار عن خدمة بحسب الحاسبة:\n- الدرجة: ${degreeName}\n- الخدمة: ${this.calcServiceType}\n- عدد الصفحات: ${this.calcPages}\n- الموعد: ${urgencyName}\n- التكلفة التقديرية: ${this.estimatedMinPrice} - ${this.estimatedMaxPrice} ر.س`
    );
    return `https://wa.me/?text=${text}`;
  }

  onCalculateAction(): void {
    this.audio.playSuccess();
  }

  getServiceIcon(title: string): string {
    if (title.includes('علمية') || title.includes('أبحاث') || title.includes('بحث')) return '📚';
    if (title.includes('تخرج') || title.includes('مشاريع')) return '🎓';
    if (title.includes('برمجة') || title.includes('تقنية') || title.includes('مواقع')) return '💻';
    if (title.includes('عروض') || title.includes('تقديمية') || title.includes('بوربوينت')) return '🎨';
    if (title.includes('سيرة') || title.includes('ذاتية') || title.includes('لينكد')) return '📄';
    if (title.includes('إحصائي') || title.includes('SPSS') || title.includes('تحليل')) return '📊';
    if (title.includes('تدقيق') || title.includes('لغوي') || title.includes('Turnitin')) return '🛡️';
    return '✨';
  }

  getServiceFeatures(title: string): string[] {
    if (title.includes('علمية') || title.includes('بحث')) {
      return ['توثيق معتمد APA 7th & Harvard', 'تقرير فحص Turnitin بنسبة اقتباس 0%', 'تعديلات وملاحظات مجانية حتى الاعتماد'];
    }
    if (title.includes('تخرج') || title.includes('مشاريع')) {
      return ['توثيق برمجي ومخططات UML كاملة', 'جلسة تدريب وشرح للكود قبل المناقشة', 'سورس كود نظيف وقابل للتشغيل الفوري'];
    }
    if (title.includes('عروض') || title.includes('تقديمية')) {
      return ['سلايدات سينمائية عالية الدقة 4K', 'أنيميشن احترافي وانفوجرافيك مخصص', 'دعم الصيغ التفاعلية PowerPoint & PDF'];
    }
    if (title.includes('سيرة') || title.includes('ذاتية')) {
      return ['صياغة متوافقة 100% مع أنظمة ATS', 'إبراز الكلمات المفتاحية لمجالك المهني', 'تنسيق حديث بصيغ Word و PDF'];
    }
    if (title.includes('إحصائي') || title.includes('SPSS')) {
      return ['تحليل الفرضيات ومعاملات الثبات', 'جداول ورسوم بيانية جاهزة للمناقشة', 'تفسير دقيق للنتائج الإحصائية'];
    }
    return ['إشراف ومتابعة مع مستشار أكاديمي', 'سرية تامة وأمان لكافة البيانات', 'دعم ومتابعة مستمرة'];
  }
}
