import { Component, OnInit, inject, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService, ServiceItem, Category, Statistic, Testimonial } from '../../core/services/api.service';
import { AudioService } from '../../core/services/audio.service';
import { SaudFarahAgentService } from '../../core/services/saud-farah-agent.service';
import { RewardsService } from '../../core/services/rewards.service';
import { SaudiMapCanvasComponent } from '../../shared/components/saudi-map-canvas/saudi-map-canvas.component';
import { SaudFarahAgentComponent } from '../../shared/components/saud-farah-agent/saud-farah-agent.component';
import { ServiceModalComponent } from '../../shared/components/service-modal/service-modal.component';
import { AddReviewModalComponent } from '../../shared/components/add-review-modal/add-review-modal.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, 
    SaudiMapCanvasComponent, 
    SaudFarahAgentComponent, 
    ServiceModalComponent,
    AddReviewModalComponent
  ],
  template: `
    <div class="home-page-wrapper active-theory-spotlight" (mousemove)="onGlobalMouseMove($event)">
      <!-- ==========================================
           SCENE 01 & 02: HERO & SAUDI IDENTITY REVEAL
           ========================================== -->
      <!-- ==========================================
           SCENE 01: HERO SECTION (PLATFORM CONTENT + LUXURY SAUDI GREEN & GOLD)
           ========================================== -->
      <section class="ls-hero-section bg-ivory-warm">
        <div class="container ls-hero-container">
          
          <!-- Top National Accreditation Badge -->
          <div class="ls-hero-top-badge">
            <span class="badge-sa">SA</span>
            <span>المملكة العربية السعودية • خدمات أكاديمية وبحثية معتمدة</span>
          </div>

          <!-- Platform Brand Title & Slogan -->
          <h1 class="ls-hero-title">
            معرفة تصنع الفرق،<br>
            <span class="hero-accent-gold">ودقة تبني الثقة.</span>
          </h1>

          <!-- Platform Subtext -->
          <p class="ls-hero-subtext">
            منصة سعودية رائدة في الخدمات التعليمية والبحثية، نجمع بين الأصالة والمعرفة لنحول أفكارك إلى إنجازات أكاديمية ومهنية حقيقية تفخر بها.
          </p>

          <!-- Hero Dual Action Buttons (Platform Brand CTAs) -->
          <div class="ls-hero-action-btns">
            <a 
              href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85" 
              target="_blank" 
              class="ls-btn-green-primary" 
              (click)="onClick()">
              <span class="btn-arrow-icon">💬</span>
              <span>ابدأ طلبك المعتمد عبر واتساب</span>
            </a>

            <a href="#quick-intent" class="ls-btn-gold-secondary" (click)="onClick()">
              <span class="btn-arrow-icon">⬇</span>
              <span>استكشف المحاكي الذكي</span>
            </a>
          </div>

        </div>
      </section>

      <!-- ==========================================
           SCENE 02: CORE ACADEMIC PILLARS (أبرز مجالاتنا وخدماتنا الأكاديمية)
           ========================================== -->
      <section class="ls-universities-section" id="academic-fields-section">
        <div class="container">
          
          <div class="ls-section-head">
            <h2 class="ls-section-title">أبرز مجالاتنا وخدماتنا الأكاديمية</h2>
            <div class="ls-title-swoosh"></div>
            <p class="ls-section-subtitle">
              نقدم خدمات استشارية وبحثية شاملة لطلاب الدراسات العليا والباحثين تواكب أعلى معايير الجودة والاعتماد
            </p>
          </div>

          <!-- 4 Core Service Cards Matrix (Royal Green & Champagne Gold) -->
          <div class="ls-universities-grid">
            
            <!-- Card 1: Master & PhD Research (Featured Selected Royal Saudi Green Card) -->
            <div class="ls-uni-card active-green" (click)="scrollToService('أبحاث')">
              <div class="uni-crest-circle">
                <span class="uni-crest-icon">🎓</span>
              </div>
              <h3 class="uni-name">رسائل الماجستير والدكتوراه</h3>
              <p class="field-card-desc">إعداد متكامل مع خطة البحث، وتوثيق APA ومراجع حديثة، ومرافقة حتى المناقشة النهائية.</p>
              <span class="uni-count-sub">استكشف الخدمة والضمانات ›</span>
            </div>

            <!-- Card 2: Statistical Analysis SPSS -->
            <div class="ls-uni-card" (click)="scrollToService('إحصائ')">
              <div class="uni-crest-circle">
                <span class="uni-crest-icon">📊</span>
              </div>
              <h3 class="uni-name">التحليل الإحصائي (SPSS & AMOS)</h3>
              <p class="field-card-desc">اختبار الفرضيات، تحليل عاملي، وتفسير ومناقشة الجداول والنتائج بدقة أكاديمية 100%.</p>
              <span class="uni-count-sub">استكشف التحليل الإحصائي ›</span>
            </div>

            <!-- Card 3: Graduation Projects -->
            <div class="ls-uni-card" (click)="scrollToService('تخرج')">
              <div class="uni-crest-circle">
                <span class="uni-crest-icon">💻</span>
              </div>
              <h3 class="uni-name">مشاريع التخرج والأنظمة البرمجية</h3>
              <p class="field-card-desc">بناء وتطوير الأنظمة، كود نظيف معتمد، إعداد التقرير والعرض التقديمي وتجهيز المناقشة.</p>
              <span class="uni-count-sub">استكشف مشاريع التخرج ›</span>
            </div>

            <!-- Card 4: Proofreading & Turnitin -->
            <div class="ls-uni-card" (click)="scrollToService('تدقيق')">
              <div class="uni-crest-circle">
                <span class="uni-crest-icon">🛡️</span>
              </div>
              <h3 class="uni-name">التدقيق اللغوي وفحص Turnitin</h3>
              <p class="field-card-desc">سلامة لغوية وبلاغية تامة، تدقيق مراجع، وفحص نسبة الاقتباس وضمان أصالة 0% استلال.</p>
              <span class="uni-count-sub">استكشف خدمات التدقيق ›</span>
            </div>

          </div>

          <!-- All Services Pill Button -->
          <div class="ls-uni-bottom-btn">
            <a href="#services-ecosystem" class="ls-btn-green-pill" (click)="onClick()">
              <span>استكشف كافة الخدمات والأسعار</span>
              <span class="btn-arrow-icon">›</span>
            </a>
          </div>

        </div>
      </section>

      <!-- ==========================================
           SCENE 03: ACTIVE THEORY SPATIAL SIMULATOR & QUICK INTENT
           ========================================== -->
      <section class="quick-intent-section section-padding bg-ivory-surface" id="quick-intent">
        <div class="container">
          <div class="intent-banner glass-card-light tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)">
            <div class="intent-header">
              <div class="intent-tag-pill">
                <span class="pulse-dot"></span>
                <span>المحاكي الأكاديمي الذكي الفوري</span>
              </div>
              <h3 class="intent-title">وش تحتاج اليوم؟ <span class="green-gradient-text">احسب وقدّر طلبك فوراً</span></h3>
              <p class="intent-subtitle">اختر مسارك الأكاديمي أو حرك المؤشرات لحساب التكلفة والمدة والتواصل المباشر مع مستشارك المعتمد</p>
            </div>

            <!-- Mode Switcher -->
            <div class="simulator-mode-switch">
              <button class="mode-btn" [class.active]="simulatorTab === 'quick'" (click)="setSimulatorTab('quick')">
                <span>⚡ مسارات الخدمات السريعة</span>
              </button>
              <button class="mode-btn" [class.active]="simulatorTab === 'calc'" (click)="setSimulatorTab('calc')">
                <span>🎛️ حاسبة التسعير والصفحات التفاعلية (Active Simulator)</span>
              </button>
            </div>

            <!-- Mode 1: Quick Intent Grid -->
            <div *ngIf="simulatorTab === 'quick'" class="intent-options-grid">
              <button class="intent-card tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="openQuickCategory('academic-services')">
                <div class="intent-icon">📖</div>
                <div class="intent-text">
                  <strong>بحث علمي</strong>
                  <small>بحوث محكمة وتقارير</small>
                </div>
              </button>

              <button class="intent-card tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="openQuickCategory('academic-services')">
                <div class="intent-icon">🎓</div>
                <div class="intent-text">
                  <strong>مشروع تخرج</strong>
                  <small>مشاريع دراسات عليا وبكالوريوس</small>
                </div>
              </button>

              <button class="intent-card tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="openQuickCategory('technology-programming')">
                <div class="intent-icon">💻</div>
                <div class="intent-text">
                  <strong>برمجة وتقنية</strong>
                  <small>تطبيقات، AI وتحليل بيانات</small>
                </div>
              </button>

              <button class="intent-card tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="openQuickCategory('presentations-design')">
                <div class="intent-icon">🎨</div>
                <div class="intent-text">
                  <strong>تصميم وعرض</strong>
                  <small>PowerPoint وعروض سينمائية</small>
                </div>
              </button>

              <button class="intent-card tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="openQuickCategory('career-path')">
                <div class="intent-icon">📄</div>
                <div class="intent-text">
                  <strong>سيرة ذاتية ATS</strong>
                  <small>تطوير الملف المهني</small>
                </div>
              </button>

              <button class="intent-card cta-intent tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="setSimulatorTab('calc')">
                <div class="intent-icon">🎛️</div>
                <div class="intent-text">
                  <strong>حاسبة التكلفة المخصصة</strong>
                  <small>حدد صفحاتك وجامعتك</small>
                </div>
              </button>
            </div>

            <!-- Mode 2: Interactive Active Simulator -->
            <div *ngIf="simulatorTab === 'calc'" class="interactive-calc-box">
              <div class="calc-controls-grid">
                <!-- Degree Selection -->
                <div class="calc-control-group">
                  <label class="calc-label">1. الدرجة العلمية:</label>
                  <div class="calc-pills-row">
                    <button class="calc-pill" [class.selected]="simDegree === 'bachelor'" (click)="setSimDegree('bachelor')">بكالوريوس</button>
                    <button class="calc-pill" [class.selected]="simDegree === 'master'" (click)="setSimDegree('master')">ماجستير 🎓</button>
                    <button class="calc-pill" [class.selected]="simDegree === 'phd'" (click)="setSimDegree('phd')">دكتوراه 🏛️</button>
                    <button class="calc-pill" [class.selected]="simDegree === 'promotion'" (click)="setSimDegree('promotion')">أبحاث ترقية</button>
                  </div>
                </div>

                <!-- Service Type -->
                <div class="calc-control-group">
                  <label class="calc-label">2. نوع الخدمة والبحث:</label>
                  <div class="calc-pills-row">
                    <button class="calc-pill" [class.selected]="simService === 'research'" (click)="setSimService('research')">إعداد بحث متكامل</button>
                    <button class="calc-pill" [class.selected]="simService === 'proposal'" (click)="setSimService('proposal')">خطة بحث Proposal</button>
                    <button class="calc-pill" [class.selected]="simService === 'graduation'" (click)="setSimService('graduation')">مشروع تخرج وتطبيق</button>
                    <button class="calc-pill" [class.selected]="simService === 'spss'" (click)="setSimService('spss')">تحليل إحصائي SPSS</button>
                    <button class="calc-pill" [class.selected]="simService === 'turnitin'" (click)="setSimService('turnitin')">فحص Turnitin وصياغة</button>
                  </div>
                </div>

                <!-- Pages Slider -->
                <div class="calc-control-group full-width">
                  <div class="slider-header-row">
                    <label class="calc-label">3. عدد الصفحات المتوقعة:</label>
                    <strong class="slider-val-badge">{{ simPages }} صفحة</strong>
                  </div>
                  <div class="range-slider-wrapper">
                    <input type="range" min="5" max="150" step="5" [(ngModel)]="simPages" (input)="onSliderChange()" class="active-range-input" />
                    <div class="range-milestones">
                      <span>5 ص</span>
                      <span>25 ص</span>
                      <span>50 ص</span>
                      <span>80 ص</span>
                      <span>100 ص</span>
                      <span>150 ص</span>
                    </div>
                  </div>
                </div>

                <!-- Urgency Option -->
                <div class="calc-control-group">
                  <label class="calc-label">4. سرعة الإنجاز المطلوبة:</label>
                  <div class="calc-pills-row">
                    <button class="calc-pill" [class.selected]="simUrgency === 'normal'" (click)="setSimUrgency('normal')">عادي (5-7 أيام)</button>
                    <button class="calc-pill urgent" [class.selected]="simUrgency === 'urgent'" (click)="setSimUrgency('urgent')">⚡ فائق السرعة (48-72 ساعة)</button>
                  </div>
                </div>
              </div>

              <!-- Simulator Dynamic Result Output Capsule -->
              <div class="calc-result-capsule">
                <div class="result-details">
                  <div class="result-metric">
                    <small>التكلفة التقديرية الذكية:</small>
                    <div style="display: flex; align-items: baseline; gap: 0.6rem;" *ngIf="rewardsService.welcomeConfig().isEnabled">
                      <strong class="gold-gradient-text price-big">{{ getDiscountedSimPrice() }} <span class="curr">ر.س</span></strong>
                      <del style="color: #94A3B8; font-size: 0.95rem; font-weight: 600;">{{ calculateSimPrice() }} ر.س</del>
                    </div>
                    <strong class="gold-gradient-text price-big" *ngIf="!rewardsService.welcomeConfig().isEnabled">{{ calculateSimPrice() }} <span class="curr">ر.س</span></strong>
                  </div>
                  <div class="result-metric">
                    <small>المدة المتوقعة للتسليم:</small>
                    <strong class="text-white">{{ calculateSimDuration() }}</strong>
                  </div>
                  <div class="result-metric">
                    <small>الضمانات وهدية الباحث الجديد:</small>
                    <span class="check-pill" *ngIf="rewardsService.welcomeConfig().isEnabled" style="border-color: rgba(201, 169, 110, 0.4); color: #DFC698;">
                      🎁 خصم {{ rewardsService.welcomeConfig().discountValue }}% بكود ({{ rewardsService.welcomeConfig().couponCode }}) + Turnitin مجاني
                    </span>
                    <span class="check-pill" *ngIf="!rewardsService.welcomeConfig().isEnabled">✓ فحص Turnitin مجاني + تعديلات مستمرة</span>
                  </div>
                </div>

                <div class="result-action">
                  <button class="btn-saudi-primary btn-calc-order" (click)="orderFromSimulator()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                    <span>تأكيد الطلب وحجز المستشار عبر واتساب</span>
                    <span>←</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           SCENE 04 & 05: عوالم أم رهام (SERVICES ECOSYSTEM)
           ========================================== -->
      <section class="ecosystem-section section-padding bg-deep-saudi" id="services-ecosystem">
        <div class="container">
          <div class="section-badge-center">
            <span class="badge-gold">منظومة الخدمات المتكاملة</span>
            <h2 class="section-title">عوالم <span class="gold-gradient-text">أم رهام</span></h2>
            <p class="section-desc">منظومة أكاديمية وبحثية شاملة تغطي كافة مراحل دراستك ومسيرتك المهنية.</p>
          </div>

          <!-- Visual Ecosystem Sequence Flow (Luxury Interactive Golden Conduit) -->
          <div class="ecosystem-flow-roadmap">
            <div class="roadmap-conduit-line">
              <div class="conduit-pulse-beam"></div>
            </div>
            
            <div class="roadmap-nodes-container">
              <div class="roadmap-node" (mouseenter)="onHover()">
                <div class="node-badge-wrapper">
                  <div class="node-glow-ring"></div>
                  <div class="node-icon-box">💡</div>
                  <span class="node-step-tag">01</span>
                </div>
                <div class="node-content">
                  <strong class="node-title">فكرة</strong>
                  <span class="node-sub">بلورة وتخطيط</span>
                </div>
              </div>

              <div class="roadmap-connector">
                <span class="connector-arrow">«</span>
              </div>

              <div class="roadmap-node" (mouseenter)="onHover()">
                <div class="node-badge-wrapper">
                  <div class="node-glow-ring"></div>
                  <div class="node-icon-box">📝</div>
                  <span class="node-step-tag">02</span>
                </div>
                <div class="node-content">
                  <strong class="node-title">بحث</strong>
                  <span class="node-sub">جمع وتحليل</span>
                </div>
              </div>

              <div class="roadmap-connector">
                <span class="connector-arrow">«</span>
              </div>

              <div class="roadmap-node" (mouseenter)="onHover()">
                <div class="node-badge-wrapper">
                  <div class="node-glow-ring"></div>
                  <div class="node-icon-box">⚙️</div>
                  <span class="node-step-tag">03</span>
                </div>
                <div class="node-content">
                  <strong class="node-title">تطوير</strong>
                  <span class="node-sub">صياغة وتنفيذ</span>
                </div>
              </div>

              <div class="roadmap-connector">
                <span class="connector-arrow">«</span>
              </div>

              <div class="roadmap-node" (mouseenter)="onHover()">
                <div class="node-badge-wrapper">
                  <div class="node-glow-ring"></div>
                  <div class="node-icon-box">🔍</div>
                  <span class="node-step-tag">04</span>
                </div>
                <div class="node-content">
                  <strong class="node-title">تدقيق</strong>
                  <span class="node-sub">مراجعة وفحص</span>
                </div>
              </div>

              <div class="roadmap-connector">
                <span class="connector-arrow">«</span>
              </div>

              <div class="roadmap-node highlighted" (mouseenter)="onHover()">
                <div class="node-badge-wrapper">
                  <div class="node-glow-ring gold-pulse"></div>
                  <div class="node-icon-box gold-box">🏆</div>
                  <span class="node-step-tag gold-tag">05</span>
                </div>
                <div class="node-content">
                  <strong class="node-title gold-gradient-text">إنجاز ونجاح</strong>
                  <span class="node-sub">تسليم واعتماد</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Category Filter Ribbon -->
          <div class="services-filter-ribbon">
            <button 
              class="services-filter-btn" 
              [class.active]="selectedCategory === 'all'"
              (click)="setCategory('all')">
              <span>✨ كافة المواد والأبحاث ({{ services.length }})</span>
            </button>
            <button 
              *ngFor="let cat of categories" 
              class="services-filter-btn"
              [class.active]="selectedCategory === cat.nameAr"
              (click)="setCategory(cat.nameAr)">
              <span>{{ cat.nameAr }}</span>
            </button>
          </div>

          <!-- LearnSpace-Style Academic Subject / Course Cards Grid -->
          <div class="services-cards-grid">
            <div 
              *ngFor="let s of filteredServicesList(); let idx = index" 
              class="learnspace-course-card glass-panel"
              (click)="openServiceModal(s)"
              (mouseenter)="onHover()">
              
              <!-- Card Top Visual Banner -->
              <div class="course-card-top-bar">
                <div class="uni-affiliation-tag">
                  <span class="uni-flag">🇸🇦</span>
                  <span>{{ getCourseUniTag(s, idx) }}</span>
                </div>
                <span class="course-code-pill">{{ getCourseCode(s, idx) }}</span>
              </div>

              <!-- Main Course Content -->
              <div class="course-card-body">
                <div class="course-head-row">
                  <div class="course-icon-badge">
                    <span>{{ getServiceIcon(s) }}</span>
                  </div>
                  <div class="course-degree-pills">
                    <span class="degree-pill">{{ getCourseDegree(s, idx) }}</span>
                    <span *ngIf="s.isFeatured" class="badge-featured-gold">★ الأكثر تسجيلاً</span>
                  </div>
                </div>

                <h3 class="course-title">{{ s.nameAr }}</h3>
                <p class="course-brief">{{ s.shortDescriptionAr }}</p>

                <!-- Course Professor / Specialist Mentor Pill -->
                <div class="course-instructor-pill">
                  <span class="inst-avatar">{{ idx % 2 === 0 ? '👨‍🏫' : '👩‍🏫' }}</span>
                  <div class="inst-info">
                    <strong>{{ idx % 2 === 0 ? 'د. نورة الشمري' : 'م. فهد القحطاني' }}</strong>
                    <small>إشراف أكاديمي وبحثي معتمد</small>
                  </div>
                  <span class="inst-check">✓</span>
                </div>

                <!-- Academic Guarantees Checklist -->
                <div class="course-specs-matrix">
                  <div class="spec-bullet">
                    <span class="spec-icon">🛡️</span>
                    <span>فحص Turnitin بنسبة 0% اقتباس معتمد</span>
                  </div>
                  <div class="spec-bullet">
                    <span class="spec-icon">⚡</span>
                    <span>تسليم وإنجاز فوري خلال {{ s.estimatedDuration || '48-72 ساعة' }}</span>
                  </div>
                  <div class="spec-bullet">
                    <span class="spec-icon">🔄</span>
                    <span>تعديلات ومناقشة تفاعلية مستمرة مجاناً</span>
                  </div>
                </div>
              </div>

              <!-- Course Footer & CTA -->
              <div class="course-card-footer">
                <div class="course-pricing-col">
                  <span class="price-caption">رسوم الدعم والإنجاز:</span>
                  <div class="price-value-wrap">
                    <strong *ngIf="s.priceType === 'range'" class="price-num">
                      <span class="strike-price">{{ (s.priceMin || 200) + 50 }}</span>
                      <span class="gold-gradient-text">{{ s.priceMin }} - {{ s.priceMax }}</span> 
                      <small class="curr">ر.س</small>
                    </strong>
                    <strong *ngIf="s.priceType === 'quote'" class="price-num quote gold-gradient-text">تسعير مخصص</strong>
                    <strong *ngIf="s.priceType === 'contact'" class="price-num contact gold-gradient-text">استفسار فوري</strong>
                  </div>
                </div>

                <div class="course-action-btns">
                  <button class="btn-course-details" title="عرض التفاصيل الكاملة">
                    <span>التفاصيل 📖</span>
                  </button>
                  <a [href]="getCourseWhatsAppLink(s)" target="_blank" class="btn-course-enroll" (click)="$event.stopPropagation(); onClick()">
                    <span>طلب فوري 💬</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           SCENE 06: SAUDI DIGITAL NETWORK & MAP
           ========================================== -->
      <section class="saudi-network-section section-padding bg-ivory-warm">
        <div class="container">
          <!-- Top Row: Info Column & 3D Hologram Map -->
          <div class="network-grid">
            <!-- Left Info Column -->
            <div class="network-info-col">
              <div class="badge-national-row">
                <span class="badge-green">🇸🇦 شبكة التغطية الوطنية المتكاملة</span>
                <span class="badge-cities-count">+40 مدينة ومحافظة</span>
              </div>
              <h2 class="network-heading">نخدم جميع مناطق <span class="green-gradient-text">المملكة العربية السعودية</span></h2>
              <p class="network-desc">
                أينما كنت في أرجاء وطننا الغالي، من الرياض وجدة إلى الطائف، مكة، الدمام، أبها، وتبوك، نصل إليك بأسرع وقت وأعلى دقة أكاديمية ومعايير عالمية.
              </p>

              <!-- National Network Quick Highlights -->
              <div class="network-features-bullets">
                <div class="bullet-item">
                  <span class="bullet-icon">⚡</span>
                  <div>
                    <strong>استجابة وتنفيذ فوري</strong>
                    <small>ربط مباشر مع باحثك الأكاديمي خلال دقائق معدودة</small>
                  </div>
                </div>
                <div class="bullet-item">
                  <span class="bullet-icon">🏛️</span>
                  <div>
                    <strong>تغطية لكافة الجامعات السعودية</strong>
                    <small>مطابقة معايير عمادات الدراسات العليا والبحث العلمي</small>
                  </div>
                </div>
                <div class="bullet-item">
                  <span class="bullet-icon">🛡️</span>
                  <div>
                    <strong>فحص أصالة وضمان 0% استلال</strong>
                    <small>تقرير Turnitin رسمي مع توثيق APA 7th وسرية تامة</small>
                  </div>
                </div>
              </div>

              <!-- Direct City Consultation Pill Card -->
              <div class="network-city-quote-card">
                <div class="ncqc-text">
                  <strong>هل تبحث عن خدمة في مدينتك أو جامعتك؟</strong>
                  <small>مستشارونا متاحون للتواصل الفوري وتقديم خطة عمل مخصصة لجامعتك.</small>
                </div>
                <a 
                  href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AE%D8%AF%D9%85%D8%A9%20%D8%A3%D9%83%D8%A7%D8%AF%D9%8A%D9%85%D9%8A%D8%A9%20%D9%81%D9%8A%20%D9%85%D8%AF%D9%8A%D9%86%D8%AA%D9%8A" 
                  target="_blank" 
                  class="ls-btn-green-pill" 
                  (click)="onClick()">
                  <span>اطلب الآن في منطقتك</span>
                  <span class="btn-arrow-icon">💬</span>
                </a>
              </div>
            </div>

            <!-- Right Interactive Real Leaflet Map -->
            <div class="network-map-col">
              <app-saudi-map-canvas></app-saudi-map-canvas>
            </div>
          </div>

          <!-- Bottom Row: LearnSpace-Grade Dynamic Verified Client Stories & Testimonials -->
          <div class="client-story-wrapper-bottom">
            
            <!-- Metrics Summary Ribbon -->
            <div class="testimonials-metrics-ribbon">
              <div class="metric-ribbon-item">
                <span class="rib-num gold-gradient-text">4.98 ★</span>
                <span class="rib-label">متوسط تقييم الباحثين والطلاب</span>
              </div>
              <div class="metric-ribbon-item">
                <span class="rib-num green-gradient-text">+25,000</span>
                <span class="rib-label">طالب وباحث تم خدمتهم بنجاح</span>
              </div>
              <div class="metric-ribbon-item">
                <span class="rib-num gold-gradient-text">0%</span>
                <span class="rib-label">نسبة الاقتباس في فحص Turnitin</span>
              </div>
              <div class="metric-ribbon-item">
                <span class="rib-num green-gradient-text">99.9%</span>
                <span class="rib-label">الالتزام بمواعيد التسليم الدقيقة</span>
              </div>
            </div>

            <div class="reviews-section-header">
              <div class="reviews-title-block">
                <span class="badge-green">آراء وتجارب موثقة</span>
                <h3 class="reviews-heading">ماذا يقول باحثو وطلاب <span class="green-gradient-text">الجامعات السعودية</span> عنا؟</h3>
              </div>
              <button class="btn-saudi-primary btn-add-review" (click)="openAddReviewModal()">
                <span>✍️ شاركنا رأيك وتجربتك الأكاديمية</span>
              </button>
            </div>

            <!-- Dynamic Animated Interactive Review Cards Deck -->
            <div class="testimonials-dynamic-grid">
              <div *ngFor="let t of testimonials; let idx = index" class="learnspace-review-card glass-card-light" (mouseenter)="onHover()">
                
                <div class="review-top-meta">
                  <div class="client-avatar-luxury">
                    <div class="avatar-ring"></div>
                    <span class="avatar-icon">{{ idx % 2 === 0 ? '👨‍🎓' : '👩‍🎓' }}</span>
                    <span class="avatar-verified-check">✓</span>
                  </div>
                  
                  <div class="client-details">
                    <div class="client-name-row">
                      <strong>{{ t.clientName }}</strong>
                      <span class="verified-tag">✓ موثق واتساب</span>
                    </div>
                    <small class="client-sub">{{ t.clientTitle || t.clientUniversity || 'جامعة الملك سعود' }}</small>
                  </div>

                  <div class="rating-stars-gold">
                    <span *ngFor="let star of [1,2,3,4,5]">{{ star <= (t.rating || 5) ? '★' : '☆' }}</span>
                  </div>
                </div>

                <div class="review-achievement-badge">
                  <span class="achieve-icon">🏆</span>
                  <span>{{ getReviewAchievement(t, idx) }}</span>
                </div>
                
                <p class="story-quote">"{{ t.contentAr }}"</p>

                <div class="review-card-foot">
                  <span *ngIf="t.city" class="city-pill">📍 {{ t.city }}</span>
                  <button class="btn-voice-quote" (click)="toggleAudioReview()" title="استمع للتقييم الصوتي">
                    <span>🎙️ استمع للتقييم</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           SCENE 07: SAUD & FARAH SMART AGENTS
           ========================================== -->
      <app-saud-farah-agent></app-saud-farah-agent>

      <!-- ==========================================
           SCENE 08: HOW IT WORKS (WORKFLOW)
           ========================================== -->
      <section class="workflow-section section-padding bg-ivory-warm">
        <div class="container">
          <div class="section-badge-center">
            <span class="badge-gold">رحلة طلب سهلة ومضمونة</span>
            <h2 class="section-title">كيف نعمل <span class="green-gradient-text">معك؟</span></h2>
            <p class="section-desc">خطوات سلسة وواضحة من لحظة استقبال فكرتك حتى استلام عمل أكاديمي متقن يليق بك.</p>
          </div>

          <div class="steps-timeline-grid">
            <div class="timeline-step glass-panel">
              <div class="t-icon">💭</div>
              <div class="t-num">01</div>
              <h4>نستقبل فكرتك</h4>
              <p>تواصل معنا وزودنا بمتطلبات طلبك أو فكرتك الأكاديمية.</p>
            </div>

            <div class="timeline-step glass-panel">
              <div class="t-icon">👥</div>
              <div class="t-num">02</div>
              <h4>نفهم احتياجك</h4>
              <p>نقوم بدراسة المتطلبات ووضع الخطة الزمنية والفنية للعمل.</p>
            </div>

            <div class="timeline-step glass-panel">
              <div class="t-icon">🎓</div>
              <div class="t-num">03</div>
              <h4>نختار المختص</h4>
              <p>توجيه طلبك إلى مستشار متخصص وحامل مؤهل علمي في مجالك.</p>
            </div>

            <div class="timeline-step glass-panel">
              <div class="t-icon">✍️</div>
              <div class="t-num">04</div>
              <h4>يبدأ العمل</h4>
              <p>تنفيذ العمل بأعلى معايير الدقة والتوثيق العلمي المعتمد.</p>
            </div>

            <div class="timeline-step glass-panel">
              <div class="t-icon">📋</div>
              <div class="t-num">05</div>
              <h4>مراجعة وتدقيق</h4>
              <p>فحص لغوي ونسبة اقتباس وتأكد من مطابقة شروط جامعتك.</p>
            </div>

            <div class="timeline-step glass-panel highlighted">
              <div class="t-icon">🎁</div>
              <div class="t-num">06</div>
              <h4>تسليم يليق بك</h4>
              <p>استلام العمل في الموعد المحدد مع دعم وتعديلات مجانية.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           FINAL CTA BANNER
           ========================================== -->
      <section class="final-cta-section section-padding bg-ivory-surface">
        <div class="container">
          <div class="cta-luxury-box">
            <div class="cta-text-content">
              <span class="cta-badge">جاهز تبدأ قصة نجاحك؟</span>
              <h2>تواصل مع <span class="green-gradient-text">أم رهام</span> الآن</h2>
              <p>فريقنا الأكاديمي جاهز للرد على استفسارك ومساعدتك في إنجاز بحوثك ومشاريعك بأعلى درجات التميز.</p>
            </div>
            <div class="cta-actions">
              <a 
                href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85" 
                target="_blank" 
                class="btn-saudi-primary btn-large"
                (mouseenter)="onHover()"
                (click)="onClick()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                <span>تواصل عبر واتساب الآن</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Active Service Detail Modal -->
      <app-service-modal 
        [service]="selectedService" 
        (closeEvent)="selectedService = null">
      </app-service-modal>

      <!-- Add Review Submission Modal -->
      <app-add-review-modal 
        *ngIf="isAddReviewModalOpen" 
        (closeEvent)="isAddReviewModalOpen = false" 
        (reviewAdded)="onReviewAdded($event)">
      </app-add-review-modal>
    </div>
  `,
  styles: [`
    .home-page-wrapper {
      position: relative;
    }

    /* ==========================================
       HERO CINEMATIC SECTION
       ========================================== */
    .hero-cinematic-section {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      padding-top: 7rem;
      padding-bottom: 5rem;
      overflow: hidden;
    }

    .hero-background-layers {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .hero-bg-photo {
      position: absolute;
      inset: -20px;
      background-size: cover;
      background-position: center 20%;
      filter: saturate(1.2) brightness(0.7);
      opacity: 0.45;
      transform: scale(1.05);
      animation: heroPan 25s ease-in-out infinite alternate;
    }

    @keyframes heroPan {
      0% { transform: scale(1.02) translate(0, 0); }
      100% { transform: scale(1.08) translate(-10px, -8px); }
    }

    .hero-bg-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 30%, rgba(27, 67, 50, 0.4) 0%, rgba(11, 28, 21, 0.85) 60%, rgba(6, 19, 13, 0.98) 100%);
    }

    .hero-mascots-teaser {
      margin-top: 1.8rem;
      background: rgba(21, 48, 36, 0.8);
      border: 1.5px solid rgba(201, 169, 110, 0.45);
      backdrop-filter: blur(14px);
      padding: 0.6rem 1.4rem;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(201, 169, 110, 0.2);
      transition: var(--transition-bounce);
    }

    .hero-mascots-teaser:hover {
      transform: translateY(-3px) scale(1.03);
      border-color: #DFC698;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 30px rgba(201, 169, 110, 0.4);
      background: rgba(27, 67, 50, 0.95);
    }

    .mascots-avatar-stack {
      display: flex;
      align-items: center;
    }

    .teaser-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #C9A96E;
      box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }

    .teaser-avatar.farah {
      margin-right: -14px;
      border-color: #52B788;
    }

    .teaser-text {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .teaser-text strong {
      color: #F8F6F0;
      font-size: 0.92rem;
    }

    .teaser-text small {
      color: #DFC698;
      font-size: 0.76rem;
    }

    .teaser-arrow {
      color: #C9A96E;
      font-size: 1.2rem;
      font-weight: 800;
      transition: transform 0.2s;
    }

    .hero-mascots-teaser:hover .teaser-arrow {
      transform: translateX(-4px);
    }

    .ambient-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.25;
    }

    .ambient-glow.top-right {
      width: 500px;
      height: 500px;
      background: #C9A96E;
      top: -100px;
      right: -100px;
    }

    .ambient-glow.center-glow {
      width: 650px;
      height: 650px;
      background: #2D6A4F;
      top: 30%;
      left: 20%;
    }

    .ambient-glow.bottom-left {
      width: 400px;
      height: 400px;
      background: #1B4332;
      bottom: -50px;
      left: -50px;
    }

    .skyline-silhouette {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 180px;
      background: linear-gradient(to top, rgba(6, 19, 13, 0.95), transparent);
    }

    .hero-container {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    /* National Accreditation Pill Badge */
    .hero-national-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 1.3rem;
      background: rgba(21, 48, 36, 0.75);
      border: 1.5px solid rgba(212, 175, 55, 0.45);
      border-radius: var(--radius-full);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35), 0 0 20px rgba(212, 175, 55, 0.2);
      backdrop-filter: blur(14px);
      margin-bottom: 1.8rem;
    }

    .flag-icon-wrap {
      width: 32px;
      height: 20px;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    }

    .flag-svg-mini {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-national-pill span {
      font-size: 0.88rem;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.01em;
    }

    /* Harmonious 3D AI Duo Lounge (منصة زجاجية تفاعلية موحدة) */
    .mascot-interactive-lounge {
      margin-top: 3rem;
      width: 100%;
      max-width: 960px;
      background: linear-gradient(135deg, rgba(27, 67, 50, 0.5) 0%, rgba(11, 28, 21, 0.75) 100%);
      border: 1.5px solid rgba(212, 175, 55, 0.4);
      border-radius: 28px;
      padding: 1.8rem 2.2rem;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 175, 55, 0.15);
      backdrop-filter: blur(20px);
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 2rem;
      direction: rtl;
      position: relative;
      overflow: hidden;
    }

    .mascot-interactive-lounge::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 60%);
      pointer-events: none;
    }

    .lounge-actor {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
      cursor: pointer;
      user-select: none;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .lounge-actor:hover {
      transform: translateY(-6px) scale(1.05);
    }

    .actor-portal {
      position: relative;
      width: 95px;
      height: 95px;
      border-radius: 50%;
      border: 3px solid #D4AF37;
      background: linear-gradient(135deg, #1B4332 0%, #0B1C15 100%);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 25px rgba(212, 175, 55, 0.4);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .farah-actor .actor-portal {
      border-color: #F472B6;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 25px rgba(244, 114, 182, 0.4);
    }

    .actor-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: actorBreathe 3.5s ease-in-out infinite alternate;
    }

    @keyframes actorBreathe {
      0% { transform: scale(1) translateY(0); }
      100% { transform: scale(1.06) translateY(-2px); }
    }

    .actor-wave-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 28px;
      height: 28px;
      background: rgba(11, 28, 21, 0.9);
      border: 1.5px solid #D4AF37;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
      animation: waveHandContinuous 1.8s infinite ease-in-out;
    }

    .actor-info {
      display: flex;
      flex-direction: column;
      text-align: center;
      white-space: nowrap;
    }

    .actor-info strong {
      font-size: 0.88rem;
      color: #FFFFFF;
    }

    .actor-info small {
      font-size: 0.72rem;
      color: #DFC698;
    }

    .lounge-center-hub {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.8rem;
    }

    .lounge-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.95rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      font-weight: 700;
      color: #E2EAE6;
    }

    .live-dot-green {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 10px #10B981;
      animation: liveDotPulse 1.5s infinite;
    }

    @keyframes liveDotPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.6; }
    }

    .lounge-quote {
      font-size: 0.92rem;
      line-height: 1.6;
      color: #F3F4F6;
      margin: 0;
      max-width: 520px;
    }

    .lounge-quote strong {
      color: #D4AF37;
    }

    .lounge-actions {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-top: 0.3rem;
    }

    .btn-lounge-action {
      padding: 0.55rem 1.2rem;
      border-radius: var(--radius-full);
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s ease;
      font-family: inherit;
    }

    .btn-lounge-action.btn-chat {
      background: linear-gradient(135deg, #D4AF37 0%, #B89628 100%);
      color: #07150E;
      border: none;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    }

    .btn-lounge-action.btn-chat:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.6);
    }

    .btn-lounge-action.btn-cinematic {
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
      border: 1px solid rgba(212, 175, 55, 0.4);
    }

    .btn-lounge-action.btn-cinematic:hover {
      background: rgba(255, 255, 255, 0.16);
      border-color: #D4AF37;
      transform: translateY(-2px);
    }

    /* Trust Metrics Grid (4 Balanced Cards) */
    .hero-trust-metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
      width: 100%;
      max-width: 960px;
      margin-top: 2.2rem;
    }

    .trust-metric-tile {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      padding: 1rem 1.2rem;
      border-radius: 18px;
      background: rgba(21, 48, 36, 0.6);
      border: 1px solid rgba(212, 175, 55, 0.25);
      transition: transform 0.3s ease, border-color 0.3s ease;
      direction: rtl;
    }

    .trust-metric-tile:hover {
      transform: translateY(-4px);
      border-color: #D4AF37;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }

    .tile-icon {
      font-size: 1.6rem;
      flex-shrink: 0;
    }

    .tile-content {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .tile-content strong {
      font-size: 1.3rem;
      font-family: var(--font-family-latin);
      line-height: 1.2;
    }

    .tile-content span {
      font-size: 0.74rem;
      color: #C1D6CD;
      line-height: 1.35;
      margin-top: 2px;
    }

    @media (max-width: 900px) {
      .mascot-interactive-lounge {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 1.5rem;
      }
      .hero-trust-metrics-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 600px) {
      .hero-trust-metrics-grid {
        grid-template-columns: 1fr;
      }
      .lounge-actions {
        flex-direction: column;
        width: 100%;
      }
      .btn-lounge-action {
        width: 100%;
      }
    }

    /* ==========================================
       LEARNSPACE HERO SECTION STYLES (Light & Radiant)
       ========================================== */
    .ls-hero-section {
      padding: 7.5rem 0 3.5rem 0;
      background: radial-gradient(ellipse at 50% 20%, #E8F3FE 0%, #F5F9FD 55%, #FFFFFF 100%);
      position: relative;
      overflow: hidden;
      text-align: center;
    }

    .ls-hero-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .ls-hero-top-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      background: #FFFFFF;
      border: 1px solid rgba(226, 232, 240, 0.95);
      padding: 0.35rem 1.15rem 0.35rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.88rem;
      font-weight: 700;
      color: #0A2F24;
      box-shadow: 0 4px 18px rgba(10, 47, 36, 0.05);
      margin-bottom: 2rem;
      direction: rtl;
    }

    .badge-sa {
      background: linear-gradient(135deg, #0A2F24 0%, #154737 100%);
      color: #FBF9F5;
      padding: 0.18rem 0.62rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 6px rgba(10, 47, 36, 0.25);
    }

    .ls-hero-title {
      font-size: clamp(2.4rem, 5.2vw, 4.2rem);
      font-weight: 900;
      color: #0A2F24;
      line-height: 1.25;
      margin-bottom: 1.2rem;
      letter-spacing: -1px;
    }

    .hero-accent-gold {
      color: #C5A869;
      background: linear-gradient(135deg, #C5A869 0%, #9E7D3B 50%, #C5A869 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      font-weight: 950;
      text-shadow: 0 2px 10px rgba(197, 168, 105, 0.2);
    }

    .ls-hero-subtext {
      font-size: clamp(1rem, 1.8vw, 1.2rem);
      color: #3D5A50;
      line-height: 1.85;
      max-width: 780px;
      margin-bottom: 2.2rem;
    }

    /* Hero Dual Action Buttons (Platform Brand CTAs) */
    .ls-hero-action-btns {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.2rem;
      margin-bottom: 2.8rem;
      flex-wrap: wrap;
    }

    .ls-btn-green-primary {
      background: linear-gradient(135deg, #0A2F24 0%, #124032 100%);
      color: #FFFFFF;
      border: 1px solid rgba(197, 168, 105, 0.4);
      padding: 0.85rem 2.2rem;
      border-radius: 9999px;
      font-size: 1.05rem;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      box-shadow: 0 6px 22px rgba(10, 47, 36, 0.28);
      transition: all 0.25s ease;
      cursor: pointer;
      text-decoration: none;
    }

    .ls-btn-green-primary:hover {
      transform: translateY(-2px);
      background: linear-gradient(135deg, #154737 0%, #0A2F24 100%);
      box-shadow: 0 10px 30px rgba(10, 47, 36, 0.38);
      color: #FBF9F5;
    }

    .ls-btn-gold-secondary {
      background: #FFFFFF;
      color: #0A2F24;
      border: 1.5px solid #C5A869;
      padding: 0.85rem 2.2rem;
      border-radius: 9999px;
      font-size: 1.05rem;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      box-shadow: 0 4px 15px rgba(197, 168, 105, 0.15);
      transition: all 0.25s ease;
      cursor: pointer;
      text-decoration: none;
    }

    .ls-btn-gold-secondary:hover {
      background: #FAF7F2;
      border-color: #B8964C;
      box-shadow: 0 8px 25px rgba(197, 168, 105, 0.25);
      transform: translateY(-2px);
    }

    .btn-arrow-icon {
      font-size: 1.2rem;
      font-weight: 900;
      line-height: 1;
    }

    /* Light Saud & Farah Lounge */
    .mascot-interactive-lounge-light {
      display: grid;
      grid-template-columns: 140px 1fr 140px;
      align-items: center;
      gap: 1.5rem;
      background: rgba(255, 255, 255, 0.95);
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      border-radius: 24px;
      padding: 1.4rem 1.8rem;
      box-shadow: 0 12px 35px rgba(27, 67, 50, 0.06);
      width: 100%;
      max-width: 860px;
    }

    .lounge-center-hub-light {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
    }

    .lounge-quote-light {
      font-size: 0.88rem;
      color: #52665C;
      margin: 0;
      line-height: 1.6;
    }

    .lounge-quote-light strong {
      color: #1B4332;
    }

    .btn-lounge-action-light {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      border: 1px solid #C9A96E;
      padding: 0.48rem 1.3rem;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.25s;
    }

    .btn-lounge-action-light:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(201, 169, 110, 0.4);
      color: #DFC698;
    }

    @media (max-width: 768px) {
      .mascot-interactive-lounge-light {
        grid-template-columns: 1fr;
        gap: 1.2rem;
      }
    }

    /* ==========================================
       SCENE 02: BEST UNIVERSITIES SECTION (Saudi Green & Gold)
       ========================================== */
    .ls-universities-section {
      padding: 5rem 0;
      background: #FFFFFF;
      text-align: center;
    }

    .ls-section-head {
      margin-bottom: 3.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ls-section-title {
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      font-weight: 900;
      color: #0B2516;
      margin: 0;
      position: relative;
    }

    .ls-title-swoosh {
      width: 120px;
      height: 4px;
      background: linear-gradient(90deg, #C9A96E, #1B4332);
      border-radius: 2px;
      margin: 0.5rem auto 1rem auto;
    }

    .ls-section-subtitle {
      font-size: 1.05rem;
      color: #52665C;
      max-width: 650px;
      margin: 0 auto;
    }

    .ls-universities-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.8rem;
      margin-bottom: 2.8rem;
    }

    @media (max-width: 1024px) {
      .ls-universities-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .ls-universities-grid {
        grid-template-columns: 1fr;
      }
    }

    .ls-uni-card {
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.3);
      border-radius: 22px;
      padding: 2.2rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(27, 67, 50, 0.05);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .ls-uni-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 40px rgba(27, 67, 50, 0.12);
      border-color: #C9A96E;
    }

    /* Featured Selected Green Card */
    .ls-uni-card.active-green {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      border-color: #C9A96E;
      box-shadow: 0 15px 40px rgba(27, 67, 50, 0.3);
    }

    .ls-uni-card.active-green .uni-name {
      color: #FFFFFF;
    }

    .ls-uni-card.active-green .uni-count-sub {
      color: #DFC698;
    }

    .uni-crest-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #F8F5EE;
      border: 2px solid rgba(201, 169, 110, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.4rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }

    .ls-uni-card:hover .uni-crest-circle {
      transform: scale(1.1);
    }

    .uni-crest-icon {
      font-size: 2.2rem;
    }

    .uni-name {
      font-size: 1.25rem;
      font-weight: 800;
      color: #1B4332;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }

    .field-card-desc {
      font-size: 0.88rem;
      color: #52665C;
      line-height: 1.55;
      margin-bottom: 1.1rem;
      max-width: 260px;
    }

    .ls-uni-card.active-green .field-card-desc {
      color: #E2ECE6;
    }

    .uni-count-sub {
      font-size: 0.88rem;
      color: #A48348;
      font-weight: 700;
    }

    .ls-uni-bottom-btn {
      display: flex;
      justify-content: center;
    }

    .ls-btn-green-pill {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      border: 1.5px solid #C9A96E;
      padding: 0.75rem 2.2rem;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      box-shadow: 0 6px 20px rgba(27, 67, 50, 0.25);
      transition: all 0.25s ease;
    }

    .ls-btn-green-pill:hover {
      background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(201, 169, 110, 0.4);
      color: #DFC698;
    }

    .hero-subtext {
      color: #B8CCC4;
      font-size: 1.15rem;
      line-height: 1.8;
      max-width: 720px;
      margin-bottom: 2.2rem;
    }

    .hero-ctas {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 1.5rem;
    }

    .instant-response-pill {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(201, 169, 110, 0.2);
      padding: 0.35rem 1.1rem;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      color: #DFC698;
    }

    /* ==========================================
       HERO ACTIVE THEORY PARTICLE CANVAS
       ========================================== */
    .hero-particle-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      opacity: 0.85;
    }

    /* ==========================================
       QUICK INTENT & ACTIVE SIMULATOR SECTION
       ========================================== */
    .intent-banner {
      padding: 2.5rem;
      border-radius: var(--radius-xl);
      position: relative;
      background: #FFFFFF;
      box-shadow: 0 20px 50px rgba(11, 28, 21, 0.08);
      border: 1.5px solid rgba(212, 175, 55, 0.35);
    }

    .intent-header {
      text-align: center;
      margin-bottom: 1.8rem;
    }

    .intent-tag-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #0F5132;
      padding: 0.3rem 0.9rem;
      border-radius: 20px;
      font-size: 0.76rem;
      font-weight: 700;
      margin-bottom: 0.6rem;
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
      animation: dotPulse 1.8s infinite;
    }

    @keyframes dotPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.5; }
    }

    .intent-title {
      font-size: 1.75rem;
      color: #112A1F;
      margin-bottom: 0.3rem;
      font-weight: 800;
    }

    .intent-subtitle {
      color: #5C6E66;
      font-size: 0.92rem;
    }

    .simulator-mode-switch {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      margin-bottom: 1.8rem;
      flex-wrap: wrap;
    }

    .mode-btn {
      padding: 0.65rem 1.4rem;
      border-radius: 30px;
      font-size: 0.85rem;
      font-weight: 700;
      border: 1.5px solid rgba(212, 175, 55, 0.3);
      background: rgba(11, 28, 21, 0.04);
      color: #1B4332;
      cursor: pointer;
      transition: all 0.25s;
      font-family: inherit;
    }

    .mode-btn:hover {
      background: rgba(212, 175, 55, 0.12);
      border-color: #D4AF37;
    }

    .mode-btn.active {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      border-color: #D4AF37;
      box-shadow: 0 6px 20px rgba(27, 67, 50, 0.25);
    }

    .intent-options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 1rem;
    }

    .intent-card {
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.25);
      border-radius: var(--radius-md);
      padding: 1.2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.6rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .intent-card:hover {
      transform: translateY(-5px);
      border-color: #C9A96E;
      box-shadow: 0 10px 25px rgba(27, 67, 50, 0.1);
    }

    .intent-icon {
      font-size: 2rem;
    }

    .intent-text strong {
      display: block;
      color: #1B4332;
      font-size: 0.96rem;
      margin-bottom: 2px;
      font-weight: 700;
    }

    .intent-text small {
      color: #7A8C84;
      font-size: 0.75rem;
      line-height: 1.3;
    }

    .intent-card.cta-intent {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      border-color: #C9A96E;
    }

    .intent-card.cta-intent .intent-text strong {
      color: #DFC698;
    }

    .intent-card.cta-intent .intent-text small {
      color: #FFFFFF;
    }

    /* Active Theory Interactive Simulator Box (Luxury Light Royal Green & Gold) */
    .interactive-calc-box {
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.4);
      border-radius: 20px;
      padding: 2.2rem 2.4rem;
      color: #0B2516;
      box-shadow: 0 15px 45px rgba(27, 67, 50, 0.08);
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
    }

    .calc-controls-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 900px) { 
      .calc-controls-grid { grid-template-columns: 1fr; gap: 1.2rem; }
      .interactive-calc-box { padding: 1.5rem; }
    }

    .calc-control-group {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .calc-control-group.full-width {
      grid-column: 1 / -1;
    }

    .calc-label {
      font-size: 0.88rem;
      color: #1B4332;
      font-weight: 800;
    }

    .calc-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .calc-pill {
      background: #F8F5EE;
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      color: #1B4332;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: inherit;
    }

    .calc-pill:hover {
      background: #EFE8DA;
      border-color: #C9A96E;
      transform: translateY(-2px);
    }

    .calc-pill.selected {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      border-color: #C9A96E;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.25);
    }

    .calc-pill.urgent.selected {
      background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
      color: #FFFFFF;
      border-color: #F59E0B;
    }

    .slider-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .slider-val-badge {
      background: rgba(201, 169, 110, 0.15);
      border: 1.5px solid #C9A96E;
      color: #8C6F32;
      padding: 3px 12px;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 800;
    }

    .range-slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .active-range-input {
      -webkit-appearance: none;
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background: #EAE2D2;
      outline: none;
      transition: background 0.2s;
    }

    .active-range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #1B4332;
      border: 2.5px solid #C9A96E;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(27, 67, 50, 0.4);
      transition: transform 0.15s;
    }

    .active-range-input::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }

    .range-milestones {
      display: flex;
      justify-content: space-between;
      font-size: 0.72rem;
      color: #64748B;
      font-weight: 600;
    }

    /* Result Output Capsule (Royal Green Gradient with Champagne Gold) */
    .calc-result-capsule {
      background: linear-gradient(135deg, #1B4332 0%, #0B2516 100%);
      border: 1.5px solid #C9A96E;
      border-radius: 16px;
      padding: 1.4rem 1.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
      box-shadow: 0 10px 30px rgba(27, 67, 50, 0.25);
      color: #FFFFFF;
    }

    .result-details {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .result-metric {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .result-metric small {
      font-size: 0.75rem;
      color: #B4CDC3;
      font-weight: 600;
    }

    .price-big {
      font-size: 1.6rem;
      font-family: var(--font-family-latin);
      color: #DFC698;
      font-weight: 900;
    }

    .price-big .curr {
      font-size: 0.95rem;
      font-family: var(--font-family-arabic);
      color: #FFFFFF;
      font-weight: 700;
    }

    .btn-calc-cta {
      background: linear-gradient(135deg, #C9A96E 0%, #A48348 100%);
      color: #06130D;
      padding: 0.75rem 1.6rem;
      border-radius: 9999px;
      font-size: 0.88rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(201, 169, 110, 0.4);
      transition: all 0.25s;
    }

    .btn-calc-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(201, 169, 110, 0.6);
      color: #000000;
    }

    .curr {
      font-size: 0.8rem;
      color: #FFFFFF;
    }

    .text-white {
      color: #FFFFFF;
      font-size: 0.95rem;
      font-weight: 700;
    }

    .check-pill {
      font-size: 0.72rem;
      color: #34D399;
      font-weight: 600;
    }

    .btn-calc-order {
      padding: 0.65rem 1.4rem;
      font-size: 0.86rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* ==========================================
       ECOSYSTEM ROADMAP & SEQUENCE CONDUIT
       ========================================== */
    .ecosystem-flow-roadmap {
      position: relative;
      margin: 2rem 0 4rem 0;
      padding: 1rem 0;
    }

    .roadmap-nodes-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      position: relative;
      z-index: 2;
    }

    .roadmap-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.8rem;
      cursor: pointer;
      flex: 1;
      transition: var(--transition-bounce);
    }

    .roadmap-node:hover {
      transform: translateY(-8px);
    }

    .node-badge-wrapper {
      position: relative;
      width: 76px;
      height: 76px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .node-glow-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px dashed rgba(201, 169, 110, 0.35);
      background: radial-gradient(circle, rgba(27, 67, 50, 0.6) 0%, rgba(6, 19, 13, 0.9) 100%);
      transition: all 0.4s;
    }

    .roadmap-node:hover .node-glow-ring {
      border-color: #DFC698;
      border-style: solid;
      box-shadow: 0 0 25px rgba(201, 169, 110, 0.5);
      transform: rotate(45deg);
    }

    .node-glow-ring.gold-pulse {
      border: 2px solid #C9A96E;
      box-shadow: 0 0 25px rgba(201, 169, 110, 0.4);
      animation: pulseGlow 2.5s infinite;
    }

    .node-icon-box {
      font-size: 1.8rem;
      position: relative;
      z-index: 2;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .roadmap-node:hover .node-icon-box {
      transform: scale(1.25);
    }

    .node-step-tag {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #1B4332;
      color: #DFC698;
      font-size: 0.72rem;
      font-weight: 800;
      font-family: var(--font-family-latin);
      padding: 2px 7px;
      border-radius: var(--radius-full);
      border: 1px solid #C9A96E;
      z-index: 3;
    }

    .node-step-tag.gold-tag {
      background: linear-gradient(135deg, #C9A96E, #DFC698);
      color: #06130D;
    }

    .node-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.15rem;
    }

    .node-title {
      font-size: 1.15rem;
      color: #FFFFFF;
      font-weight: 700;
    }

    .node-sub {
      font-size: 0.78rem;
      color: #A3B8B0;
    }

    .roadmap-connector {
      color: rgba(201, 169, 110, 0.5);
      font-size: 1.6rem;
      font-weight: 800;
      animation: connectorPulse 2s infinite ease-in-out;
    }

    @keyframes connectorPulse {
      0%, 100% { opacity: 0.4; transform: translateX(0); }
      50% { opacity: 1; transform: translateX(-4px); }
    }

    /* ==========================================
       CATEGORY FILTER RIBBON & SERVICE CARDS
       ========================================== */
    .services-filter-ribbon {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
    }

    .services-filter-btn {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(201, 169, 110, 0.2);
      color: #A3B8B0;
      padding: 0.6rem 1.2rem;
      border-radius: var(--radius-full);
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .services-filter-btn:hover {
      background: rgba(201, 169, 110, 0.12);
      border-color: rgba(201, 169, 110, 0.4);
      color: #FFFFFF;
      transform: translateY(-1px);
    }

    .services-filter-btn.active {
      background: linear-gradient(135deg, #C9A96E 0%, #A48348 100%);
      color: #06130D;
      border-color: #DFC698;
      box-shadow: 0 4px 15px rgba(201, 169, 110, 0.3);
      transform: translateY(-2px);
    }

    .services-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 2rem;
    }

    /* LearnSpace Course Card */
    .learnspace-course-card {
      background: linear-gradient(180deg, rgba(8, 30, 20, 0.95) 0%, rgba(3, 16, 10, 0.98) 100%);
      border: 1.5px solid rgba(69, 216, 208, 0.22);
      border-radius: 22px;
      padding: 1.6rem 1.8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 15px rgba(69, 216, 208, 0.05);
    }

    .learnspace-course-card:hover {
      transform: translateY(-8px);
      border-color: #45D8D0;
      box-shadow: 0 25px 55px rgba(0, 0, 0, 0.7), 0 0 30px rgba(69, 216, 208, 0.3);
    }

    .course-card-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(69, 216, 208, 0.15);
      margin-bottom: 1.2rem;
    }

    .uni-affiliation-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.76rem;
      color: #CADCD4;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.04);
      padding: 3px 10px;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .course-code-pill {
      font-size: 0.75rem;
      font-weight: 800;
      color: #03140C;
      background: linear-gradient(135deg, #45D8D0 0%, #34D399 100%);
      padding: 3px 10px;
      border-radius: 9999px;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(69, 216, 208, 0.4);
    }

    .course-card-body {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      flex: 1;
    }

    .course-head-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .course-icon-badge {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: linear-gradient(135deg, rgba(69, 216, 208, 0.2), rgba(5, 150, 105, 0.3));
      border: 1.5px solid #45D8D0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      box-shadow: 0 4px 15px rgba(69, 216, 208, 0.25);
    }

    .course-degree-pills {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .degree-pill {
      font-size: 0.74rem;
      color: #A3F3EE;
      font-weight: 700;
      background: rgba(69, 216, 208, 0.12);
      padding: 3px 10px;
      border-radius: 9999px;
      border: 1px solid rgba(69, 216, 208, 0.3);
    }

    .badge-featured-gold {
      font-size: 0.72rem;
      color: #03140C;
      font-weight: 800;
      background: linear-gradient(135deg, #FBE6B3 0%, #D4AF37 100%);
      padding: 3px 9px;
      border-radius: 9999px;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
    }

    .course-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.35;
      margin: 0;
      transition: color 0.3s;
    }

    .learnspace-course-card:hover .course-title {
      color: #45D8D0;
    }

    .course-brief {
      font-size: 0.88rem;
      color: #A3B8B0;
      line-height: 1.6;
      margin: 0;
    }

    .course-instructor-pill {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(255, 255, 255, 0.03);
      padding: 0.55rem 0.9rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .inst-avatar {
      font-size: 1.3rem;
    }

    .inst-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .inst-info strong {
      font-size: 0.84rem;
      color: #FFFFFF;
      font-weight: 700;
    }

    .inst-info small {
      font-size: 0.72rem;
      color: #45D8D0;
    }

    .inst-check {
      color: #10B981;
      font-weight: 900;
      font-size: 0.85rem;
    }

    .course-specs-matrix {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .spec-bullet {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: #D1E5DC;
      background: rgba(69, 216, 208, 0.04);
      padding: 0.4rem 0.75rem;
      border-radius: 8px;
      border: 1px solid rgba(69, 216, 208, 0.12);
    }

    .spec-icon {
      font-size: 0.85rem;
    }

    .course-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border-top: 1px solid rgba(69, 216, 208, 0.15);
      padding-top: 1.2rem;
      margin-top: 1.2rem;
    }

    .course-pricing-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .price-caption {
      font-size: 0.7rem;
      color: #839E93;
      font-weight: 600;
    }

    .price-num {
      font-size: 1.15rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .strike-price {
      font-size: 0.78rem;
      color: #64748B;
      text-decoration: line-through;
    }

    .curr {
      font-size: 0.75rem;
      color: #45D8D0;
    }

    .course-action-btns {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-course-details {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #CADCD4;
      padding: 0.5rem 0.9rem;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 700;
      transition: all 0.25s;
    }

    .btn-course-details:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
    }

    .btn-course-enroll {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      border: 1px solid #45D8D0;
      color: #FFFFFF;
      padding: 0.5rem 1.1rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 800;
      box-shadow: 0 4px 15px rgba(5, 150, 105, 0.4);
      transition: all 0.25s;
    }

    .btn-course-enroll:hover {
      transform: translateY(-2px);
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
      box-shadow: 0 6px 20px rgba(69, 216, 208, 0.5);
    }

    /* ==========================================
       SAUDI NETWORK & LUXURY TESTIMONIAL
       ========================================== */
    .saudi-network-section {
      padding: 5.5rem 0 4rem 0;
      scroll-margin-top: 100px;
      position: relative;
    }

    .network-grid {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 3rem;
      align-items: center;
    }

    .badge-national-row {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .badge-green {
      background: rgba(5, 150, 105, 0.12);
      color: #059669;
      border: 1px solid rgba(5, 150, 105, 0.3);
      padding: 0.35rem 1.1rem;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 700;
    }

    .badge-cities-count {
      background: rgba(212, 175, 55, 0.15);
      color: #8C6F32;
      border: 1.5px solid rgba(201, 169, 110, 0.4);
      padding: 0.35rem 0.9rem;
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      font-weight: 800;
    }

    .network-heading {
      font-size: clamp(2rem, 3.5vw, 2.7rem);
      color: #03140C;
      margin-bottom: 1rem;
      line-height: 1.3;
      font-weight: 900;
    }

    .network-desc {
      color: #334155;
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 1.8rem;
    }

    .network-features-bullets {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: #FFFFFF;
      padding: 1.2rem 1.5rem;
      border-radius: var(--radius-lg);
      border: 1px solid rgba(5, 150, 105, 0.2);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
    }

    .bullet-item {
      display: flex;
      align-items: flex-start;
      gap: 0.8rem;
    }

    .bullet-icon {
      font-size: 1.3rem;
      background: rgba(5, 150, 105, 0.12);
      padding: 6px;
      border-radius: var(--radius-sm);
      line-height: 1;
    }

    .bullet-item strong {
      display: block;
      color: #03140C;
      font-size: 0.95rem;
      margin-bottom: 2px;
    }

    .bullet-item small {
      color: #64748B;
      font-size: 0.82rem;
    }

    .network-city-quote-card {
      margin-top: 1.5rem;
      padding: 1.3rem 1.6rem;
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      border-radius: var(--radius-lg);
      box-shadow: 0 10px 30px rgba(27, 67, 50, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.2rem;
      flex-wrap: wrap;
    }

    .ncqc-text {
      flex: 1;
      min-width: 200px;
    }

    .ncqc-text strong {
      display: block;
      color: #0B2516;
      font-size: 0.98rem;
      font-weight: 800;
      margin-bottom: 3px;
    }

    .ncqc-text small {
      color: #52665C;
      font-size: 0.84rem;
      line-height: 1.5;
    }

    .network-city-quote-card .ls-btn-green-pill {
      white-space: nowrap;
      flex-shrink: 0;
      padding: 0.75rem 1.6rem;
      font-size: 0.88rem;
      font-weight: 800;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      border: 1.5px solid #C9A96E;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.25);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.25s;
    }

    .network-city-quote-card .ls-btn-green-pill:hover {
      background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
      color: #DFC698;
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(201, 169, 110, 0.4);
    }

    /* Bottom Dynamic Reviews Container */
    .client-story-wrapper-bottom {
      margin-top: 4rem;
      display: flex;
      flex-direction: column;
      gap: 2.2rem;
    }

    /* Testimonials Metrics Ribbon */
    .testimonials-metrics-ribbon {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.2rem;
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      border: 1.5px solid rgba(201, 169, 110, 0.4);
      padding: 1.6rem 2rem;
      border-radius: 20px;
      box-shadow: 0 15px 35px rgba(27, 67, 50, 0.2);
    }

    .metric-ribbon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.3rem;
    }

    .rib-num {
      font-size: 1.8rem;
      font-weight: 900;
      font-family: var(--font-family-latin);
    }

    .rib-label {
      font-size: 0.78rem;
      color: #CADCD4;
      font-weight: 600;
    }

    .reviews-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
      border-bottom: 1.5px solid rgba(201, 169, 110, 0.25);
      padding-bottom: 1.5rem;
    }

    .reviews-title-block {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .reviews-heading {
      font-size: 1.85rem;
      color: #0B2516;
      margin: 0;
      font-weight: 800;
    }

    .btn-add-review {
      padding: 0.85rem 1.8rem;
      font-size: 0.95rem;
      font-weight: 700;
      box-shadow: 0 8px 25px rgba(27, 67, 50, 0.25);
      border-radius: var(--radius-full);
      cursor: pointer;
    }

    .testimonials-dynamic-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 2rem;
    }

    /* LearnSpace Review Card */
    .learnspace-review-card {
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.3);
      border-radius: 22px;
      padding: 1.8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.2rem;
      box-shadow: 0 10px 30px rgba(27, 67, 50, 0.06), 0 0 15px rgba(201, 169, 110, 0.08);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .learnspace-review-card:hover {
      transform: translateY(-6px);
      border-color: #C9A96E;
      box-shadow: 0 20px 45px rgba(27, 67, 50, 0.12), 0 0 25px rgba(201, 169, 110, 0.25);
    }

    .review-top-meta {
      display: flex;
      align-items: center;
      gap: 0.9rem;
    }

    .client-avatar-luxury {
      width: 52px;
      height: 52px;
      background: linear-gradient(135deg, #1B4332 0%, #0B2516 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      position: relative;
      border: 2px solid #C9A96E;
      box-shadow: 0 4px 15px rgba(201, 169, 110, 0.3);
    }

    .avatar-verified-check {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 18px;
      height: 18px;
      background: #10B981;
      color: #FFFFFF;
      border-radius: 50%;
      font-size: 0.65rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #FFFFFF;
    }

    .client-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .client-name-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .client-name-row strong {
      color: #03140C;
      font-size: 1.05rem;
      font-weight: 800;
    }

    .verified-tag {
      font-size: 0.68rem;
      background: rgba(16, 185, 129, 0.12);
      color: #059669;
      padding: 1px 7px;
      border-radius: var(--radius-full);
      font-weight: 700;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .client-sub {
      color: #64748B;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .rating-stars-gold {
      color: #D4AF37;
      font-size: 1rem;
      letter-spacing: 2px;
    }

    .review-achievement-badge {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      background: rgba(212, 175, 55, 0.1);
      border: 1px solid rgba(212, 175, 55, 0.3);
      padding: 0.4rem 0.8rem;
      border-radius: 10px;
      font-size: 0.78rem;
      color: #A48348;
      font-weight: 700;
    }

    .achieve-icon {
      font-size: 0.9rem;
    }

    .story-quote {
      color: #1E293B;
      font-size: 0.95rem;
      line-height: 1.75;
      font-weight: 500;
      margin: 0;
      flex: 1;
    }

    .review-card-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      border-top: 1px solid #F1F5F9;
      padding-top: 0.9rem;
    }

    .city-pill {
      font-size: 0.74rem;
      color: #059669;
      background: rgba(5, 150, 105, 0.1);
      padding: 2px 9px;
      border-radius: 9999px;
      font-weight: 700;
    }

    .btn-voice-quote {
      background: rgba(201, 169, 110, 0.15);
      border: 1px solid rgba(201, 169, 110, 0.45);
      color: #1B4332;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.25s;
    }

    .btn-voice-quote:hover {
      background: #1B4332;
      color: #FFFFFF;
      border-color: #C9A96E;
    }

    .play-btn-luxury {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #1B4332;
      color: #DFC698;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(27, 67, 50, 0.3);
      transition: transform 0.2s;
    }

    .audio-waveform-player-luxury:hover .play-btn-luxury {
      transform: scale(1.1);
      background: #C9A96E;
      color: #06130D;
    }

    .waveform-info-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .waveform-title {
      font-size: 0.75rem;
      color: #6B7C75;
      font-weight: 600;
    }

    .waveform-bars {
      display: flex;
      align-items: center;
      gap: 3.5px;
      height: 20px;
    }

    .waveform-bars .bar {
      width: 3.5px;
      background: #1B4332;
      border-radius: 2px;
      transition: height 0.2s;
    }

    .audio-waveform-player-luxury.playing .waveform-bars .bar {
      background: #2D6A4F;
      animation: barDance 0.8s infinite alternate ease-in-out;
    }

    .audio-waveform-player-luxury.playing .waveform-bars .bar:nth-child(2n) { animation-delay: 0.15s; }
    .audio-waveform-player-luxury.playing .waveform-bars .bar:nth-child(3n) { animation-delay: 0.3s; }
    .audio-waveform-player-luxury.playing .waveform-bars .bar:nth-child(4n) { animation-delay: 0.45s; }

    @keyframes barDance {
      0% { transform: scaleY(0.4); }
      100% { transform: scaleY(1.3); }
    }

    .audio-duration {
      font-size: 0.82rem;
      font-family: var(--font-family-latin);
      color: #1B4332;
      font-weight: 700;
    }

    @media (max-width: 900px) {
      .ecosystem-flow-roadmap .roadmap-nodes-container {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
      }
      .roadmap-connector {
        display: none;
      }
      .network-grid {
        grid-template-columns: 1fr;
      }
      .testimonials-dynamic-grid {
        grid-template-columns: 1fr;
      }
      .reviews-section-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    /* ==========================================
       WORKFLOW SECTION
       ========================================== */
    .steps-timeline-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.2rem;
    }

    .timeline-step {
      padding: 1.8rem 1.2rem;
      text-align: center;
      position: relative;
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      border-radius: 20px;
      box-shadow: 0 8px 25px rgba(27, 67, 50, 0.05);
      transition: all 0.3s ease;
    }

    .timeline-step:hover {
      transform: translateY(-5px);
      box-shadow: 0 14px 35px rgba(27, 67, 50, 0.12);
      border-color: #C9A96E;
    }

    .timeline-step.highlighted {
      border-color: #C9A96E;
      background: linear-gradient(135deg, #FFFFFF 0%, #F8F5EE 100%);
      box-shadow: 0 10px 30px rgba(201, 169, 110, 0.2);
    }

    .t-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .t-num {
      font-size: 0.85rem;
      color: #C9A96E;
      font-family: var(--font-family-latin);
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    .timeline-step h4 {
      color: #1B4332;
      font-size: 1.1rem;
      font-weight: 800;
      margin-bottom: 0.4rem;
    }

    .timeline-step p {
      color: #52665C;
      font-size: 0.84rem;
      line-height: 1.55;
    }

    /* ==========================================
       FINAL CTA SECTION
       ========================================== */
    .cta-luxury-box {
      background: linear-gradient(135deg, #1B4332 0%, #0B1C15 100%);
      border: 1.5px solid #C9A96E;
      border-radius: var(--radius-xl);
      padding: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      box-shadow: 0 20px 50px rgba(11, 28, 21, 0.3);
    }

    .cta-badge {
      font-size: 0.85rem;
      color: #DFC698;
      font-weight: 600;
      display: block;
      margin-bottom: 0.6rem;
    }

    .cta-text-content h2 {
      font-size: 2.2rem;
      color: #FFFFFF;
      margin-bottom: 0.8rem;
    }

    .cta-text-content p {
      color: #B8CCC4;
      font-size: 1.05rem;
      max-width: 600px;
    }

    .btn-large {
      padding: 1.1rem 2.5rem;
      font-size: 1.15rem;
    }

    @media (max-width: 992px) {
      .hero-top-row {
        flex-direction: column;
        align-items: flex-start;
      }
      .network-grid {
        grid-template-columns: 1fr;
      }
      .cta-luxury-box {
        flex-direction: column;
        text-align: center;
        padding: 2.5rem 1.5rem;
      }
      .hero-ctas {
        flex-direction: column;
        width: 100%;
      }
      .btn-saudi-primary, .btn-outline-gold {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  api = inject(ApiService);
  audio = inject(AudioService);
  agentService = inject(SaudFarahAgentService);
  rewardsService = inject(RewardsService);

  @ViewChild('heroCanvas', { static: false }) heroCanvasRef!: ElementRef<HTMLCanvasElement>;

  services: ServiceItem[] = [];
  categories: Category[] = [];
  stats: Statistic[] = [];
  testimonials: Testimonial[] = [];
  selectedService: ServiceItem | null = null;
  isAddReviewModalOpen = false;
  isReviewPlaying = false;

  // Active Theory Simulator State
  simulatorTab: 'quick' | 'calc' = 'quick';
  simDegree: 'bachelor' | 'master' | 'phd' | 'promotion' = 'master';
  simService: 'research' | 'proposal' | 'graduation' | 'spss' | 'turnitin' = 'research';
  simPages: number = 30;
  simUrgency: 'normal' | 'urgent' = 'normal';

  private animFrameId: number | null = null;
  private particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.initHeroParticles();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  private loadData(): void {
    this.api.getServices().subscribe(res => this.services = res);
    this.api.getCategories().subscribe(res => this.categories = res);
    this.api.getStatistics().subscribe(res => this.stats = res);
    this.api.getTestimonials().subscribe(res => this.testimonials = res);
  }

  // Active Theory Particle Cosmos Engine
  private initHeroParticles(): void {
    if (typeof window === 'undefined' || !this.heroCanvasRef) return;
    const canvas = this.heroCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate ~45 floating stars
    this.particles = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particle connections
      for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = canvas.width;
        if (p1.x > canvas.width) p1.x = 0;
        if (p1.y < 0) p1.y = canvas.height;
        if (p1.y > canvas.height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - dist / 110) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      this.animFrameId = requestAnimationFrame(render);
    };

    render();
  }

  // Active Theory Global Dynamic Spotlight
  onGlobalMouseMove(event: MouseEvent): void {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  }

  // Magnetic 3D Perspective Card Tilt
  onCardTilt(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    target.style.setProperty('--card-mouse-x', `${(x / rect.width) * 100}%`);
    target.style.setProperty('--card-mouse-y', `${(y / rect.height) * 100}%`);
    target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;
  }

  onCardTiltReset(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  // Simulator Controls
  setSimulatorTab(tab: 'quick' | 'calc'): void {
    this.simulatorTab = tab;
    this.audio.playClick();
  }

  setSimDegree(deg: any): void {
    this.simDegree = deg;
    this.audio.playHover();
  }

  setSimService(svc: any): void {
    this.simService = svc;
    this.audio.playHover();
  }

  setSimUrgency(urg: any): void {
    this.simUrgency = urg;
    this.audio.playHover();
  }

  onSliderChange(): void {
    this.audio.playHover();
  }

  calculateSimPrice(): number {
    let base = 25 * this.simPages;
    if (this.simDegree === 'master') base *= 1.15;
    if (this.simDegree === 'phd') base *= 1.35;
    if (this.simDegree === 'promotion') base *= 1.45;

    if (this.simService === 'proposal') base = Math.max(350, base * 0.7);
    if (this.simService === 'spss') base = 450 + (this.simPages * 10);
    if (this.simService === 'turnitin') base = 150 + (this.simPages * 5);
    if (this.simService === 'graduation') base = Math.max(600, base * 1.1);

    if (this.simUrgency === 'urgent') base *= 1.25;

    return Math.round(base);
  }

  getDiscountedSimPrice(): number {
    const base = this.calculateSimPrice();
    const res = this.rewardsService.calculateDiscount(base);
    return res.discountedPrice;
  }

  calculateSimDuration(): string {
    if (this.simUrgency === 'urgent') return '48 إلى 72 ساعة فقط ⚡';
    if (this.simPages <= 20) return '3 إلى 4 أيام عمل';
    if (this.simPages <= 50) return '5 إلى 7 أيام عمل';
    return '10 إلى 14 يوم عمل';
  }

  orderFromSimulator(): void {
    this.audio.playSuccess();
    const degreeMap: any = {
      bachelor: 'بكالوريوس',
      master: 'ماجستير',
      phd: 'دكتوراه',
      promotion: 'أبحاث ترقية'
    };
    const serviceMap: any = {
      research: 'إعداد بحث متكامل',
      proposal: 'خطة بحث Proposal',
      graduation: 'مشروع تخرج وتقنية',
      spss: 'تحليل إحصائي SPSS',
      turnitin: 'فحص وصياغة Turnitin'
    };
    const price = this.calculateSimPrice();
    const duration = this.calculateSimDuration();
    const deg = degreeMap[this.simDegree] || 'ماجستير';
    const svc = serviceMap[this.simService] || 'إعداد بحث متكامل';

    this.selectedService = {
      id: 'sim_' + Date.now(),
      slug: 'sim-request',
      nameAr: `${svc} (${deg})`,
      shortDescriptionAr: `طلب استشارة وبحث أكاديمي بمقدار ${this.simPages} صفحة لدرجة ${deg}.`,
      fullDescriptionAr: `طلب تم حسابه عبر المحاكي الأكاديمي الذكي: خدمة ${svc} لدرجة ${deg}، بعدد صفحات تقديري ${this.simPages} صفحة، ومدة إنجاز ${duration}.`,
      priceType: 'fixed',
      priceMin: price,
      priceMax: price,
      priceCurrency: 'ر.س',
      estimatedDuration: duration,
      categoryNameAr: 'المحاكي الذكي',
      targetAudienceAr: `طلبة وباحثي ${deg} في كافة الجامعات السعودية`,
      requirementsAr: 'تزويدنا بمحاور وتوجيهات مشرفك الأكاديمي، والدليل الإرشادي لجامعتك.',
      isFeatured: false
    };
  }

  onHover(): void {
    this.audio.playHover();
  }

  onClick(): void {
    this.audio.playClick();
  }

  openServiceModal(service: ServiceItem): void {
    this.selectedService = service;
    this.audio.playClick();
  }

  openAddReviewModal(): void {
    this.isAddReviewModalOpen = true;
    this.audio.playClick();
  }

  onReviewAdded(newReview: Testimonial): void {
    this.testimonials.unshift(newReview);
    this.audio.playNotification();
  }

  openQuickCategory(slug: string): void {
    this.audio.playClick();
    const found = this.services.find(s => s.categoryNameAr?.includes('أكاديمي') || s.slug.includes(slug));
    if (found) {
      this.selectedService = found;
    }
  }

  scrollToAgents(): void {
    this.audio.playClick();
    const el = document.getElementById('smart-agents');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  toggleAudioReview(): void {
    this.isReviewPlaying = !this.isReviewPlaying;
    if (this.isReviewPlaying) {
      this.audio.playNotification();
    } else {
      this.audio.playClick();
    }
  }

  selectedCategory = 'all';

  setCategory(cat: string): void {
    this.selectedCategory = cat;
    this.audio.playClick();
  }

  filteredServicesList(): ServiceItem[] {
    if (this.selectedCategory === 'all') return this.services;
    return this.services.filter(s => s.categoryNameAr === this.selectedCategory);
  }

  getServiceIcon(s: ServiceItem): string {
    const name = s.nameAr || '';
    const cat = s.categoryNameAr || '';
    if (name.includes('بحث') || name.includes('رسالة') || name.includes('دراسة')) return '📖';
    if (name.includes('تخرج') || name.includes('ماجستير') || name.includes('دكتوراه')) return '🎓';
    if (name.includes('تقرير') || name.includes('تقارير')) return '📑';
    if (name.includes('عرض') || name.includes('بوربوينت') || name.includes('PowerPoint')) return '🎨';
    if (name.includes('برمج') || name.includes('تطبيق') || name.includes('موقع') || name.includes('تقن')) return '💻';
    if (name.includes('سيرة') || name.includes('ATS') || name.includes('لينكد') || name.includes('مهني')) return '📄';
    if (name.includes('إحصائ') || name.includes('SPSS') || name.includes('تحليل')) return '📊';
    if (name.includes('ترجم') || name.includes('تدقيق') || name.includes('لغوي')) return '✍️';
    if (name.includes('استشار') || name.includes('تعليم') || name.includes('تطوير')) return '💡';
    if (cat.includes('تصميم')) return '🎨';
    if (cat.includes('برمج')) return '💻';
    if (cat.includes('مهني')) return '💼';
    return '✨';
  }

  getServiceFeatures(s: ServiceItem): string[] {
    const name = s.nameAr || '';
    const cat = s.categoryNameAr || '';

    if (name.includes('بحث') || name.includes('رسالة')) {
      return [
        'توثيق معتمد APA / Harvard / IEEE',
        'فحص نسبة الاقتباس وفلترة Turnitin',
        'مراجعة وتدقيق لغوي شامل مع مراجع حديثة'
      ];
    }
    if (name.includes('تخرج')) {
      return [
        'مرافقة وإشراف حتى المناقشة النهائية',
        'إعداد التقرير والعرض التقديمي (PPT)',
        'تحضير كامل لأسئلة لجنة التحكيم الأكاديمية'
      ];
    }
    if (name.includes('تقرير') || name.includes('تقارير')) {
      return [
        'صياغة أكاديمية رصينة وتحليل عميق',
        'رسوم وجداول بيانية وإحصائية مدعمة',
        'تسليم سريع ودقيق خلال 48-72 ساعة'
      ];
    }
    if (name.includes('عرض') || name.includes('بوربوينت') || cat.includes('تصميم')) {
      return [
        'تصميم سينمائي 4K وتفاعلي جذاب',
        'إنفوجرافيك وهيكلة بصرية للأفكار',
        'تسليم مع ملفات مفتوحة المصدر للتحرير'
      ];
    }
    if (name.includes('برمج') || name.includes('تقن') || cat.includes('برمج')) {
      return [
        'كود نظيف (Clean Code) وهيكلية معمارية',
        'دعم Full-Stack و AI وتحليل بيانات',
        'فيديو توضيحي لتشغيل واختبار المشروع'
      ];
    }
    if (name.includes('سيرة') || name.includes('ATS') || cat.includes('مهني')) {
      return [
        'صياغة متوافقة 100% مع أنظمة الفرز ATS',
        'نسخ ثنائية (عربي + إنجليزي) جاهزة للتقديم',
        'تطوير وتنسيق حساب LinkedIn الاحترافي'
      ];
    }
    if (name.includes('إحصائ') || name.includes('SPSS')) {
      return [
        'اختبار الفرضيات والتحليل العاملي المتقدم',
        'تفسير دقيق للجداول ومناقشة النتائج',
        'مخرجات معتمدة للرسائل والأبحاث العلمية'
      ];
    }
    if (name.includes('تدقيق') || name.includes('ترجم')) {
      return [
        'ترجمة بشرية أكاديمية دقيقة وخالية من الآلي',
        'تصحيح القواعد وتطوير التراكيب اللغوية',
        'شهادة تدقيق ومطابقة للجهات والجامعات'
      ];
    }

    return [
      'معايير أكاديمية سعودية معتمدة',
      'التزام تام بجدول ومواعيد التسليم',
      'تعديلات مجانية ومتابعة مستمرة'
    ];
  }

  getCourseUniTag(s: ServiceItem, idx: number): string {
    const unis = [
      'جامعة الملك سعود • دراسات عليا',
      'جامعة الملك عبدالعزيز • كلية الحاسب',
      'جامعة الإمام محمد بن سعود • إدارة الأعمال',
      'جامعة أم القرى • كلية التربية والعلوم',
      'جامعة الأميرة نورة • التخصصات الصحية',
      'جامعة الملك فيصل • الدراسات التطبيقية',
      'جامعة طيبة • البحث العلمي',
      'جامعة القصيم • كلية الهندسة'
    ];
    return unis[idx % unis.length];
  }

  getCourseCode(s: ServiceItem, idx: number): string {
    const codes = ['RES-801', 'SPSS-702', 'THESIS-900', 'CS-499', 'ENG-304', 'BUS-620', 'STAT-550', 'MED-710'];
    return codes[idx % codes.length];
  }

  getCourseDegree(s: ServiceItem, idx: number): string {
    const name = s.nameAr || '';
    if (name.includes('دكتوراه')) return '🎓 دكتوراه';
    if (name.includes('ماجستير') || name.includes('رسال')) return '🎓 ماجستير';
    if (name.includes('تخرج')) return '🎓 بكالوريوس وتخرج';
    return '🎓 ماجستير وبكالوريوس';
  }

  getCourseWhatsAppLink(s: ServiceItem): string {
    const text = `السلام عليكم ورحمة الله، أرغب بالاستفسار والتسجيل في خدمة/مادة: *${s.nameAr}* عبر منصة أم رهام والحصول على الخصم المتاح.`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }

  heroServiceType = '';
  heroDegree = '';

  filterFromHero(): void {
    this.audio.playSuccess();
    const el = document.getElementById('services-ecosystem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToService(keyword: string): void {
    this.audio.playClick();
    const found = this.services.find(s => s.nameAr?.includes(keyword) || s.categoryNameAr?.includes(keyword));
    if (found) {
      this.selectedService = found;
    }
    const el = document.getElementById('services-ecosystem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  getReviewAchievement(t: Testimonial, idx: number): string {
    const achievements = [
      'قبول البحث والرسالة بتقدير ممتاز مع مرتبة الشرف 🏆',
      'فحص أصالة Turnitin 0% معتمد لدى الجامعة 🛡️',
      'تسليم في وقت قياسي (أقل من 48 ساعة) ⚡',
      'اعتماد خطة البحث (Proposal) من الجلسة الأولى 🌟',
      'تحليل إحصائي SPSS شامل وتفسير متقن للفرضيات 📊'
    ];
    return achievements[idx % achievements.length];
  }
}
