import { Component, OnInit, inject, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService, ServiceItem, Category, Statistic, Testimonial } from '../../core/services/api.service';
import { AudioService } from '../../core/services/audio.service';
import { ThemeService } from '../../core/services/theme.service';
import { SaudFarahAgentService } from '../../core/services/saud-farah-agent.service';
import { RewardsService } from '../../core/services/rewards.service';
import { ServiceModalComponent } from '../../shared/components/service-modal/service-modal.component';
import { AddReviewModalComponent } from '../../shared/components/add-review-modal/add-review-modal.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, 
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
      <!-- ==========================================
           SCENE 01: CINEMATIC SOVEREIGN HERO (PANORAMIC SAUDI LANDSCAPE)
           ========================================== -->
      <!-- ==========================================
           SCENE 01: HERO SECTION - ROUNDED BANNER (مطابق تماماً لصورة المستخدم)
           ========================================== -->
      <section class="hero-showcase-section">
        <div class="hero-banner-container">
          <div class="hero-rounded-banner">
            
            <!-- Campus Background Image with Dark Emerald Overlay -->
            <div class="hero-campus-backdrop">
              <img src="assets/images/saudi_campus_hero.jpg" alt="جامعة سعودية ومراكز بحثية" class="hero-campus-img" />
              <div class="hero-campus-overlay"></div>
            </div>

            <div class="hero-banner-content">
              
              <!-- 1. Circular Avatar with Golden Yellow Ring and Overlapping UR Badge -->
              <div class="hero-avatar-monument">
                <div class="hero-avatar-ring">
                  <img src="assets/images/profile.png" alt="أم رهام" class="hero-avatar-img" />
                </div>
                <!-- Overlapping Bottom UR Badge -->
                <div class="hero-avatar-ur-badge">
                  <svg viewBox="0 0 48 48" width="22" height="22">
                    <g fill="#E5B94F" stroke="#E5B94F">
                      <circle cx="34" cy="7" r="1.6" />
                      <path d="M34 1.5 L34 4" stroke-width="1.8" stroke-linecap="round" />
                      <path d="M39 3.5 L37 5.5" stroke-width="1.8" stroke-linecap="round" />
                    </g>
                    <path d="M7 13 V25 C7 31.5 11.5 35 16.5 35 C21.5 35 26 31.5 26 25 V13 H20.5 V24.8 C20.5 27.5 18.8 29.5 16.5 29.5 C14.2 29.5 12.5 27.5 12.5 24.8 V13 Z" fill="var(--theme-accent, #0F5132)" />
                    <path d="M25 13 H34.5 C38.5 13 41.5 15.8 41.5 19.5 C41.5 22.8 39.2 24.8 36.2 25.4 L41.5 35 H35.2 L30.8 26.2 H29.5 V35 H25 Z M29.5 17.5 V22 H34 C35.8 22 36.8 21.2 36.8 19.8 C36.8 18.4 35.8 17.5 34 17.5 Z" fill="var(--theme-accent, #0F5132)" />
                  </svg>
                </div>
              </div>

              <!-- 2. Main Title (أم رهام — شريكك في التميّز الأكاديمي) -->
              <h1 class="hero-main-heading">
                أم رهام — شريكك في التميّز الأكاديمي
              </h1>

              <!-- 3. Subtitle Description -->
              <p class="hero-main-subtext">
                دعم أكاديمي شامل، واستشارات بحثية على يد مستشارين متخصصين، وتطوير للمهارات، ومتابعة حتى الإنجاز — في جميع مناطق المملكة.
              </p>

              <!-- 4. Two Buttons (احجز استشارة & تعرّف على خدماتنا) -->
              <div class="hero-buttons-row">
                <a routerLink="/contact" [queryParams]="{type: 'consultation'}" class="btn-hero-white">
                  احجز استشارة
                </a>
                <a routerLink="/services" class="btn-hero-translucent">
                  تعرّف على خدماتنا
                </a>
              </div>

              <!-- 5. 4 Pillars / Feature Cards (المسارات الأربعة: تعليم، استشارات، تطوير، إنجاز) -->
              <div class="hero-four-pillars">
                
                <!-- Pillar 1: تعليم -->
                <div class="pillar-card" (mouseenter)="onHover()">
                  <div class="pillar-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                  </div>
                  <span class="pillar-label">تعليم</span>
                </div>

                <!-- Pillar 2: استشارات -->
                <div class="pillar-card" (mouseenter)="onHover()">
                  <div class="pillar-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <span class="pillar-label">استشارات</span>
                </div>

                <!-- Pillar 3: تطوير -->
                <div class="pillar-card" (mouseenter)="onHover()">
                  <div class="pillar-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="9" y1="18" x2="15" y2="18"/>
                      <line x1="10" y1="22" x2="14" y2="22"/>
                      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
                    </svg>
                  </div>
                  <span class="pillar-label">تطوير</span>
                </div>

                <!-- Pillar 4: إنجاز -->
                <div class="pillar-card" (mouseenter)="onHover()">
                  <div class="pillar-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                  </div>
                  <span class="pillar-label">إنجاز</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- ==========================================
           SCENE 03: عوالم وخدمات أم رهام (ALL REAL SERVICES CAROUSEL - AUTO-MOVING)
           ========================================== -->
      <section class="realms-section-cinematic" id="realms-ecosystem">
        <div class="container">
          
          <!-- Section Top Bar -->
          <div class="realms-top-bar">
            <div>
              <span class="realms-sub-tag">🏛️ متجر الخدمات والمسارات المعتمدة • الدفع بعد الإنجاز 🛡️</span>
              <h2 class="realms-main-title">عوالم وخدمات أم رهام</h2>
            </div>
            <a routerLink="/services" class="realms-explore-link">
              <span>استكشف كافة الخدمات بالمتجر ({{ services.length }})</span>
              <span class="explore-arrow">←</span>
            </a>
          </div>

          <!-- Services Carousel Slider (Auto-Moving & Real Services) -->
          <div class="realms-carousel-wrapper"
               (mouseenter)="pauseRealmsAutoScroll()"
               (mouseleave)="resumeRealmsAutoScroll()"
               (touchstart)="pauseRealmsAutoScroll()"
               (touchend)="resumeRealmsAutoScroll()">
            
            <button type="button" class="carousel-nav-btn prev-btn" (click)="scrollRealms('prev')" title="السابق">
              <span>‹</span>
            </button>

            <div class="realms-cards-track" #realmsTrack>
              <div 
                class="realm-card-item" 
                *ngFor="let s of services; let idx = index"
                [class.active]="selectedService?.id === s.id"
                (click)="openServiceModal(s)"
                (mouseenter)="onHover()">
                
                <div class="realm-card-image-wrap">
                  <img [src]="getServiceCardImage(s, idx)" [alt]="s.nameAr" class="realm-card-img" />
                  <div class="realm-image-gradient"></div>
                  <div class="realm-card-number">#{{ idx < 9 ? '0' + (idx + 1) : (idx + 1) }}</div>
                  <div class="realm-card-icon-tag">{{ getServiceIcon(s) }}</div>
                </div>

                <div class="realm-card-info">
                  <span class="realm-card-category">{{ s.categoryNameAr }}</span>
                  <h3 class="realm-card-title">{{ s.nameAr }}</h3>
                  
                  <div class="realm-card-bottom-meta">
                    <div class="realm-price-col">
                      <strong *ngIf="s.priceFixed" class="realm-price-val">{{ s.priceFixed }} ر.س</strong>
                      <strong *ngIf="s.templates && s.templates.length > 0 && !s.priceFixed" class="realm-price-val">
                        تبدأ من {{ s.templates[0].price }} ر.س
                      </strong>
                      <span *ngIf="s.priceType === 'quote'" class="realm-quote-val">طلب تسعيرة</span>
                      <strong *ngIf="s.priceType === 'range' && !s.priceFixed" class="realm-price-val">
                        {{ s.priceMin }} - {{ s.priceMax }} ر.س
                      </strong>
                    </div>

                    <span class="realm-templates-count" *ngIf="s.templates && s.templates.length > 0">
                      {{ s.templates.length }} نماذج 🎨
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <button type="button" class="carousel-nav-btn next-btn" (click)="scrollRealms('next')" title="التالي">
              <span>›</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ==========================================
           SCENE: SMART PLATFORM APP SHOWCASE (تطبيق المنصة الذكي 3D التفاعلي)
           ========================================== -->
      <section class="smart-app-showcase-section" id="smart-app">
        <div class="smart-app-ambient-glow"></div>
        <div class="container">
          <!-- Showcase Grid: Interactive Image Mockup + Features & Launch Action -->
          <div class="smart-app-showcase-grid">
            
            <!-- Side A: 3D Smartphone Image Mockup (معروضة بالموقع) -->
            <div class="phone-showcase-visual-card" (click)="openPhoneModal()" title="انقر لتجربة التطبيق التفاعلي 3D">
              <img src="assets/images/smart_app_showcase.jpg" alt="تطبيق منصة أم رهام الذكي ثلاثي الأبعاد" class="showcase-mockup-img" />
              <div class="showcase-interactive-hint">
                <span>🔍 انقر لتجربة شاشة الهاتف التفاعلية الحية</span>
              </div>
            </div>

            <!-- Side B: Key Platform Capabilities & Launch Button (وادخل على التطبيق من الضغط على الزر) -->
            <div class="smart-app-features-column">
              
              <div class="app-feature-pills-list">
                <div class="app-feat-item">
                  <div class="feat-icon-box">⚡</div>
                  <div class="feat-text-box">
                    <h4>طلب واستشارة أكاديمية فورية</h4>
                    <p>اختر تخصصك الأكاديمي وحدد نوع دراستك أو مشروعك وتواصل مع المشرف المباشر فوراً.</p>
                  </div>
                </div>

                <div class="app-feat-item">
                  <div class="feat-icon-box">📊</div>
                  <div class="feat-text-box">
                    <h4>حاسبة تسعير ذكية وشفافة</h4>
                    <p>تقدير دقيق للتكلفة وفترات التسليم وفق المعايير الإرشادية لجامعتك السعودية.</p>
                  </div>
                </div>

                <div class="app-feat-item">
                  <div class="feat-icon-box">🛡️</div>
                  <div class="feat-text-box">
                    <h4>سرية وخصوصية أكاديمية مطلقة</h4>
                    <p>أمان وتشفير كامل لكافة الأبحاث والبيانات والملفات دون مشاركة مع أي طرف ثالث.</p>
                  </div>
                </div>

                <div class="app-feat-item">
                  <div class="feat-icon-box">🇸🇦</div>
                  <div class="feat-text-box">
                    <h4>شراكة وطنية مع كافة الجامعات</h4>
                    <p>خبرة معمقة في لوائح وشروط الدراسات العليا في جامعة الملك سعود، أم القرى، وغيرها.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================
           SCENE 05: ACTIVE THEORY SPATIAL SIMULATOR & QUICK INTENT
           ========================================== -->
      <section class="quick-intent-section section-padding bg-ivory-warm" id="quick-intent">
        <div class="container">
          <div class="intent-banner glass-card-luxury-emerald tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)">
            <div class="intent-header">
              <div class="intent-tag-pill">
                <span class="pulse-dot"></span>
                <span>المحاكي الأكاديمي والخدمي الفوري</span>
              </div>
              <h3 class="intent-title">وش تحتاج اليوم؟ <span class="gold-gradient-text">احسب وقدّر طلبك فوراً</span></h3>
              <p class="intent-subtitle">اختر القسم والمسار المناسب لك أو حدد عدد الصفحات والخيارات لحساب التكلفة والمدة والتواصل المباشر</p>
            </div>

            <!-- Mode Switcher -->
            <div class="simulator-mode-switch">
              <button class="mode-btn" [class.active]="simulatorTab === 'quick'" (click)="setSimulatorTab('quick')">
                <span>⚡ مسارات الأقسام والخدمات</span>
              </button>
              <button class="mode-btn" [class.active]="simulatorTab === 'calc'" (click)="setSimulatorTab('calc')">
                <span>🎛️ حاسبة التسعير والصفحات التفاعلية (Active Simulator)</span>
              </button>
            </div>

            <!-- Mode 1: Quick Intent Grid (الأقسام الأربعة الرسمية) -->
            <div *ngIf="simulatorTab === 'quick'" class="intent-options-grid">
              <!-- 1. الخدمات الجامعية -->
              <button class="intent-card tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="openQuickCategory('university')">
                <div class="intent-icon">🎓</div>
                <div class="intent-text">
                  <strong>الخدمات الجامعية</strong>
                  <small>بحوث محكمة، مشاريع تخرج، عروض</small>
                </div>
              </button>

              <!-- 2. خدمات طلاب المدارس -->
              <button class="intent-card tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="openQuickCategory('schools')">
                <div class="intent-icon">🎒</div>
                <div class="intent-text">
                  <strong>خدمات طلاب المدارس</strong>
                  <small>حل واجبات، مطويات، مقررات</small>
                </div>
              </button>

              <!-- 3. الخدمات المكتبية -->
              <button class="intent-card tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="openQuickCategory('office')">
                <div class="intent-icon">📑</div>
                <div class="intent-text">
                  <strong>الخدمات المكتبية</strong>
                  <small>تنسيق الرسائل، تدقيق لغوي، فحص</small>
                </div>
              </button>

              <!-- 4. الخدمات العامة -->
              <button class="intent-card tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="openQuickCategory('general')">
                <div class="intent-icon">🏛️</div>
                <div class="intent-text">
                  <strong>الخدمات العامة</strong>
                  <small>حساب المواطن، الضمان، عقد إيجار</small>
                </div>
              </button>

              <!-- 5. حاسبة التكلفة المخصصة -->
              <button class="intent-card cta-intent tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)" (click)="setSimulatorTab('calc')">
                <div class="intent-icon">🎛️</div>
                <div class="intent-text">
                  <strong>حاسبة التكلفة المخصصة</strong>
                  <small>حدد صفحاتك وجامعتك فوراً</small>
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
                      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
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
           SCENE 06: HOW IT WORKS (THE 6-STEP WORKFLOW JOURNEY)
           ========================================== -->
      <section class="workflow-section section-padding bg-deep-saudi" id="workflow">
        <div class="container">
          <div class="section-badge-center">
            <span class="badge-gold">
              <span>✨</span>
              <span>رحلة طلب سهلة ومضمونة</span>
            </span>
            <h2 class="section-title">مسار الرحلة الأكاديمية: <span class="gold-gradient-text">كيف نعمل معك؟</span></h2>
            <p class="section-desc">خطوات سلسة وواضحة وموثوقة من لحظة استقبال فكرتك حتى استلام عمل أكاديمي متقن يليق بك.</p>
          </div>

          <div class="steps-timeline-grid">
            <div class="timeline-step glass-card-step" (mouseenter)="onHover()">
              <div class="step-num-pill">01</div>
              <div class="t-icon-box"><span class="t-icon">💭</span></div>
              <h4>1. نستقبل فكرتك</h4>
              <p>تواصل معنا وزودنا بمتطلبات طلبك أو فكرتك الأكاديمية والبحثية.</p>
            </div>

            <div class="timeline-step glass-card-step" (mouseenter)="onHover()">
              <div class="step-num-pill">02</div>
              <div class="t-icon-box"><span class="t-icon">👥</span></div>
              <h4>2. نفهم احتياجك</h4>
              <p>نقوم بدراسة المتطلبات الجامعية ووضع الخطة الزمنية والفنية للعمل.</p>
            </div>

            <div class="timeline-step glass-card-step" (mouseenter)="onHover()">
              <div class="step-num-pill">03</div>
              <div class="t-icon-box"><span class="t-icon">🎓</span></div>
              <h4>3. نختار المختص</h4>
              <p>توجيه طلبك إلى مستشار متخصص وحامل مؤهل علمي رفيع في مجالك.</p>
            </div>

            <div class="timeline-step glass-card-step" (mouseenter)="onHover()">
              <div class="step-num-pill">04</div>
              <div class="t-icon-box"><span class="t-icon">✍️</span></div>
              <h4>4. يبدأ العمل</h4>
              <p>تنفيذ العمل بأعلى معايير الدقة والتوثيق العلمي المعتمد بنظام&nbsp;APA.</p>
            </div>

            <div class="timeline-step glass-card-step" (mouseenter)="onHover()">
              <div class="step-num-pill">05</div>
              <div class="t-icon-box"><span class="t-icon">📋</span></div>
              <h4>5. مراجعة وتدقيق</h4>
              <p>فحص لغوي ونسبة اقتباس Turnitin 0% والتأكد من مطابقة شروط جامعتك.</p>
            </div>

            <div class="timeline-step glass-card-step highlighted" (mouseenter)="onHover()">
              <div class="step-num-pill gold-pill">06</div>
              <div class="t-icon-box gold-icon-box"><span class="t-icon gold-glow">🎁</span></div>
              <h4 class="gold-gradient-text">6. تسليم يليق بك</h4>
              <p>استلام العمل في الموعد المحدد مع دعم وتعديلات مجانية ومستمرة.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           SCENE 07: SOVEREIGN GUARANTEES & SAUDI VISION 2030
           ========================================== -->
      <section class="guarantees-vision-section section-padding bg-deep-saudi">
        <div class="container">
          <div class="section-badge-center">
            <span class="badge-gold">موثوقية وطنية معتمدة</span>
            <h2 class="section-title">ضماناتنا <span class="gold-gradient-text">السيادية</span></h2>
            <p class="section-desc">نلتزم بأعلى معايير الأمانة الأكاديمية والموثوقية الوطنية في كل مشروع بحثي.</p>
          </div>

          <div class="realms-guarantees-bar glass-card-luxury">
            <div class="guarantee-item">
              <span class="guarantee-icon">🛡️</span>
              <span class="guarantee-text">سرية تامة وأمان للمعلومات</span>
            </div>
            <div class="guarantee-item">
              <span class="guarantee-icon">👥</span>
              <span class="guarantee-text">فريق أكاديمي متخصص</span>
            </div>
            <div class="guarantee-item">
              <span class="guarantee-icon">🏅</span>
              <span class="guarantee-text">جودة ودقة في كل خطوة</span>
            </div>
            <div class="guarantee-item">
              <span class="guarantee-icon">⏱️</span>
              <span class="guarantee-text">التزام صارم بالمواعيد</span>
            </div>
            <div class="guarantee-item">
              <span class="guarantee-icon">🎧</span>
              <span class="guarantee-text">دعم وتعديلات بعد التسليم</span>
            </div>
            <div class="guarantee-item vision-item">
              <span class="vision-logo-text">رؤية VISION 2030</span>
              <span class="vision-sub">المملكة العربية السعودية</span>
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

      <!-- ==========================================
           FLOATING 3D PHONE TRIGGER & WELCOME CAPSULE (IMAGE 2)
           ========================================== -->


      <!-- 3D Smartphone Device Modal (Image 2 Device Showcase) -->
      <div class="phone-modal-backdrop" *ngIf="isPhoneModalOpen" (click)="closePhoneModal()">
        <div class="phone-modal-container" (click)="$event.stopPropagation()">
          <button type="button" class="btn-close-phone" (click)="closePhoneModal()">✕</button>
          
          <!-- Realistic Gold-Beveled Smartphone Device Frame -->
          <div class="iphone-hardware-frame">
            <div class="iphone-screen">
              <!-- iOS Status Bar -->
              <div class="ios-status-bar">
                <span class="time-txt">9:41</span>
                <div class="dynamic-island-notch"></div>
                <div class="ios-icons">
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>

              <!-- Phone App Inner Screen -->
              <div class="phone-app-inner">
                <div class="phone-app-header">
                  <button type="button" class="phone-menu-icon">☰</button>
                  <div class="phone-app-brand">
                    <span class="app-title">منصة إبداع • أم رهام</span>
                    <small class="app-sub">خليك... تستفيد</small>
                  </div>
                  <div class="phone-avatar-mini">👑</div>
                </div>

                <!-- Phone Hero Card with Saudi Skyline Backdrop -->
                <div class="phone-hero-banner">
                  <img src="assets/images/saudi_panoramic_hero.jpg" alt="سعودية" class="phone-hero-bg" />
                  <div class="phone-hero-content">
                    <h4>أهلاً بك في عالم الفرص</h4>
                    <p>اختر تخصصك واستكشف خدماتنا</p>
                  </div>
                </div>

                <!-- Specialization Dropdown & CTA -->
                <div class="phone-specialization-box">
                  <select class="phone-select" [(ngModel)]="phoneSpecialization">
                    <option value="all">قم بالتخصص ⌵</option>
                    <option value="grad">رسائل ماجستير ودكتوراه</option>
                    <option value="cs">برمجة وتقنية وذكاء اصطناعي</option>
                    <option value="bus">إدارة أعمال ومشاريع</option>
                    <option value="spss">تحليل إحصائي SPSS</option>
                  </select>
                  <button type="button" class="btn-phone-start" (click)="startPhoneOrder()">ابدأ الآن</button>
                </div>

                <!-- 4 Live App Statistics -->
                <div class="phone-stats-grid">
                  <div class="stat-cell">
                    <span class="s-icon">🏛️</span>
                    <strong>+40</strong>
                    <small>مدينة سعودية</small>
                  </div>
                  <div class="stat-cell">
                    <span class="s-icon">🤝</span>
                    <strong>98%</strong>
                    <small>رضا العملاء</small>
                  </div>
                  <div class="stat-cell">
                    <span class="s-icon">💼</span>
                    <strong>+1,500</strong>
                    <small>مشروع منجز</small>
                  </div>
                  <div class="stat-cell">
                    <span class="s-icon">👥</span>
                    <strong>+25,000</strong>
                    <small>عميل</small>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 60-Second Video Showcase Modal (Image 1 Hero Link) -->
      <div class="video-modal-backdrop" *ngIf="isVideoModalOpen" (click)="closeVideoModal()">
        <div class="video-modal-container glass-card-dark" (click)="$event.stopPropagation()">
          <button type="button" class="btn-close-video" (click)="closeVideoModal()">✕</button>
          <div class="video-player-header">
            <h3>منصة أم رهام في 60 ثانية 🇸🇦👑</h3>
            <p>جولة تعريفية بالخدمات الأكاديمية والبحثية والتقنية المعتمدة</p>
          </div>
          
          <div class="video-screen-simulation">
            <img src="assets/images/saudi_panoramic_hero.jpg" alt="فيديو أم رهام" class="video-poster-img" />
            <div class="video-play-overlay">
              <div class="video-pulse-glow"></div>
              <a 
                href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%B4%D8%A7%D9%87%D8%AF%D8%AA%20%D8%B9%D8%B1%D8%B6%20%D8%A7%D9%84%D9%85%D9%86%D8%B5%D8%A9%20%D9%88%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A8%D8%AF%D8%A1%20%D8%B7%D9%84%D8%A8%D9%8A" 
                target="_blank" 
                class="btn-big-play-glow">
                ▶
              </a>
            </div>
            <div class="video-timer-track">
              <span class="video-time">0:00 / 1:00</span>
              <div class="video-progress-bar"><div class="video-fill-anim"></div></div>
            </div>
          </div>

          <div class="video-footer-cta">
            <span>جاهز لبدء بحثك أو مشروعك؟</span>
            <a 
              href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85" 
              target="_blank" 
              class="btn-video-wa"
              style="display: inline-flex; align-items: center; gap: 0.5rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>تواصل عبر واتساب فوراً</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Welcome Coupon Gift Modal -->
      <div class="coupon-modal-backdrop" *ngIf="isDiscountModalOpen" (click)="closeDiscountModal()">
        <div class="coupon-modal-card" (click)="$event.stopPropagation()">
          <button type="button" class="btn-close-coupon" (click)="closeDiscountModal()">✕</button>
          <div class="coupon-gift-icon">🎁</div>
          <h3 class="coupon-title">هدية ترحيبية خاصة بالمتواجدين الجدد!</h3>
          <p class="coupon-desc">احصل على خصم 15% فوري على كافة خدمات الأبحاث والدراسات العليا ومشاريع التخرج.</p>
          
          <div class="coupon-code-box" (click)="copyCouponCode()">
            <span class="code-txt">SAUDI2026</span>
            <button type="button" class="btn-copy-code">{{ couponCopied ? 'تم النسخ! ✓' : 'نسخ الكوبون 📋' }}</button>
          </div>
          
          <div class="coupon-actions">
            <a 
              href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%AD%D8%B5%D9%84%D8%AA%20%D8%B9%D9%84%D9%89%20%D9%83%D9%88%D8%A8%D9%88%D9%86%20%D8%AE%D8%B5%D9%85%20SAUDI2026%20%D9%88%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%D9%87%20%D8%B9%D9%84%D9%89%20%D8%B7%D9%84%D8%A8%D9%8A" 
              target="_blank" 
              class="btn-use-coupon-wa" 
              (click)="closeDiscountModal()"
              style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>استخدم الكوبون في واتساب</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Testimonial Transcript Modal -->
      <div class="transcript-modal-backdrop" *ngIf="isTranscriptOpen" (click)="closeTranscriptModal()">
        <div class="transcript-modal-card" (click)="$event.stopPropagation()">
          <button type="button" class="btn-close-transcript" (click)="closeTranscriptModal()">✕</button>
          <div class="transcript-head">
            <img [src]="currentTestimonialData.avatar" alt="عميل" class="transcript-avatar" />
            <div>
              <h4>{{ currentTestimonialData.clientName }}</h4>
              <p>{{ currentTestimonialData.location }} • {{ currentTestimonialData.role }}</p>
            </div>
          </div>
          <div class="transcript-body">
            <h5>النص الكامل للتسجيل الصوتي والشهادة المعتمدة:</h5>
            <p class="transcript-full-text">
              "السلام عليكم ورحمة الله، أود أن أشارككم تجربتي الحقيقية مع منصة أم رهام. تواصلت معهم في مرحلة حرجة من إعداد رسالة الماجستير والتحليل الإحصائي، وكنت بحاجة لضبط فرضيات البحث وتوثيق دقيق بنظام APA وفحص turnitin. تم التجاوب معي بسرعة استثنائية، وتم إسناد طلبي لمشرف أكاديمي متخصص فاهم لكل تفاصيل دليلي الجامعي. المراجعة كانت دقيقة جداً، وتسلمت العمل قبل الموعد المحدد، وخرجت بفضل الله بتقدير ممتاز مع مرتبة الشرف. شكراً من القلب لفريق أم رهام على هذا الاحتراف والصدق والأمانة العلمية."
            </p>
          </div>
          <button type="button" class="btn-close-card" (click)="closeTranscriptModal()">إغلاق</button>
        </div>
      </div>

      <!-- Service Details & Templates Modal -->
      <app-service-modal [service]="selectedService" (closeEvent)="selectedService = null"></app-service-modal>

    </div>
  `,
  styles: [`
    .home-page-wrapper {
      position: relative;
    }

    /* ==========================================
       SCENE 01: HERO SHOWCASE SECTION - ROUNDED BANNER (مطابق للمستخدم)
       ========================================== */
    .hero-showcase-section {
      padding: 1.25rem 0 2rem;
      background: #FFFFFF;
      font-family: var(--font-family-arabic) !important;
    }

    .hero-banner-container {
      max-width: 1360px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .hero-rounded-banner {
      position: relative;
      border-radius: 26px;
      overflow: hidden;
      min-height: 520px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 16px 45px rgba(10, 47, 36, 0.18);
    }

    .hero-campus-backdrop {
      position: absolute;
      inset: 0;
      z-index: 1;
      overflow: hidden;
    }

    .hero-campus-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 35%;
      transform: scale(1.02);
    }

    .hero-campus-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, 
        rgba(10, 47, 36, 0.82) 0%, 
        rgba(8, 38, 29, 0.88) 55%, 
        rgba(6, 28, 21, 0.94) 100%);
    }

    .hero-banner-content {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 860px;
      padding: 3.2rem 1.5rem 2.8rem;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* 1. Circular Avatar with Golden Ring & UR badge */
    .hero-avatar-monument {
      position: relative;
      width: 132px;
      height: 132px;
      margin: 0 auto 1.4rem auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-avatar-ring {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      border: 4.5px solid #E5B94F;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
      background: #FFFFFF;
      transition: transform 0.3s ease;
    }

    .hero-avatar-ring:hover {
      transform: scale(1.04);
    }

    .hero-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      display: block;
    }

    .hero-avatar-ur-badge {
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }

    /* 2. Main Title */
    .hero-main-heading {
      font-size: clamp(1.85rem, 3.8vw, 2.75rem);
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.25;
      margin: 0 0 0.85rem 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
      letter-spacing: -0.3px;
    }

    /* 3. Subtitle */
    .hero-main-subtext {
      font-size: clamp(0.95rem, 1.3vw, 1.08rem);
      color: rgba(255, 255, 255, 0.92);
      line-height: 1.75;
      max-width: 680px;
      margin: 0 auto 1.6rem auto;
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
    }

    /* 4. Action Buttons */
    .hero-buttons-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      flex-wrap: wrap;
      margin-bottom: 2.2rem;
    }

    .btn-hero-white {
      background: #FFFFFF;
      color: #0A2F24 !important;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 0.65rem 1.8rem;
      border-radius: 6px;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.2s ease;
    }

    .btn-hero-white:hover {
      background: #F3F4F6;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
    }

    .btn-hero-translucent {
      background: rgba(10, 47, 36, 0.55);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: #FFFFFF !important;
      font-weight: 600;
      font-size: 0.95rem;
      padding: 0.65rem 1.8rem;
      border-radius: 6px;
      text-decoration: none;
      backdrop-filter: blur(8px);
      transition: all 0.2s ease;
    }

    .btn-hero-translucent:hover {
      background: rgba(10, 47, 36, 0.8);
      border-color: #FFFFFF;
      transform: translateY(-2px);
    }

    /* 5. 4 Feature Cards / Pillars (المسارات الأربعة) */
    .hero-four-pillars {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.1rem;
      flex-wrap: wrap;
      width: 100%;
      max-width: 620px;
      margin: 0 auto;
    }

    .pillar-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1.2px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 0.9rem 1.3rem;
      min-width: 95px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.45rem;
      transition: all 0.25s ease;
      cursor: pointer;
    }

    .pillar-card:hover {
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.45);
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    }

    .pillar-icon-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #FFFFFF;
      color: var(--theme-accent, #0F5132);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
      transition: transform 0.25s ease, color 0.3s ease;
    }

    .pillar-card:hover .pillar-icon-circle {
      transform: scale(1.08);
    }

    .pillar-label {
      color: #FFFFFF;
      font-size: 0.96rem;
      font-weight: 700;
      letter-spacing: -0.2px;
    }

    @media (max-width: 768px) {
      .hero-rounded-banner {
        border-radius: 18px;
        min-height: auto;
      }
      .hero-banner-content {
        padding: 2.2rem 1rem 2rem;
      }
      .hero-avatar-monument {
        width: 105px;
        height: 105px;
      }
      .hero-main-heading {
        font-size: 1.55rem;
      }
      .hero-main-subtext {
        font-size: 0.88rem;
      }
      .hero-four-pillars {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
      }
      .pillar-card {
        min-width: unset;
        padding: 0.75rem 0.9rem;
      }
    }

    /* ==========================================
       SCENE 02: عوالم وخدمات أم رهام (REALMS & ALL SERVICES AUTO-CAROUSEL)
       ========================================== */
    .realms-section-cinematic {
      padding: 3.5rem 0 4.5rem;
      background: #FAF8F5;
      position: relative;
    }

    .realms-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 1.8rem;
    }

    .realms-sub-tag {
      font-size: 0.8rem;
      color: #0F5132;
      background: rgba(15, 81, 50, 0.08);
      border: 1px solid rgba(15, 81, 50, 0.2);
      padding: 2px 10px;
      border-radius: var(--radius-full);
      display: inline-block;
      margin-bottom: 0.4rem;
      font-weight: 700;
    }

    .realms-main-title {
      font-family: var(--font-family-arabic);
      font-size: clamp(2rem, 3.5vw, 2.5rem);
      font-weight: 800;
      color: #0A2F24;
      margin: 0;
    }

    .realms-explore-link {
      color: #0F5132;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.45rem;
      transition: color 0.2s;
    }

    .realms-explore-link:hover {
      color: #0A2F24;
      text-decoration: underline;
    }

    .realms-carousel-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
    }

    .carousel-nav-btn {
      position: absolute;
      z-index: 10;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1.5px solid rgba(15, 81, 50, 0.25);
      color: #0A2F24;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 4px 14px rgba(10, 47, 36, 0.1);
    }

    .carousel-nav-btn.prev-btn { left: -16px; }
    .carousel-nav-btn.next-btn { right: -16px; }

    .carousel-nav-btn:hover {
      background: #0F5132;
      color: #FFFFFF;
      border-color: #0F5132;
      transform: scale(1.1);
    }

    .realms-cards-track {
      display: flex;
      gap: 1.25rem;
      overflow-x: auto;
      scrollbar-width: none;
      scroll-behavior: smooth;
      padding: 0.75rem 0.25rem;
      width: 100%;
    }

    .realms-cards-track::-webkit-scrollbar {
      display: none;
    }

    .realm-card-item {
      flex: 0 0 240px;
      background: #FFFFFF;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      border-radius: 1.25rem;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 24px rgba(10, 47, 36, 0.06);
    }

    .realm-card-item:hover, .realm-card-item.active {
      border-color: #0F5132;
      transform: translateY(-6px);
      box-shadow: 0 16px 36px rgba(10, 47, 36, 0.12);
      background: #FFFFFF;
    }

    .realm-card-image-wrap {
      position: relative;
      height: 155px;
      overflow: hidden;
      background: #F1EFE9;
    }

    .realm-card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .realm-card-item:hover .realm-card-img {
      transform: scale(1.08);
    }

    .realm-image-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 60%, rgba(10, 47, 36, 0.25) 100%);
    }

    .realm-card-number {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.95);
      border: 1.5px solid #0F5132;
      color: #0F5132;
      font-weight: 800;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      backdrop-filter: blur(8px);
    }

    .realm-card-icon-tag {
      position: absolute;
      bottom: 0.6rem;
      right: 0.85rem;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1.5px solid #E5B94F;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      z-index: 2;
    }

    .realm-card-info {
      padding: 0.9rem 1rem 1rem;
      text-align: right;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      flex: 1;
      justify-content: space-between;
    }

    .realm-card-category {
      font-size: 0.72rem;
      color: #0F5132;
      font-weight: 700;
      background: rgba(15, 81, 50, 0.08);
      border: 1px solid rgba(15, 81, 50, 0.15);
      padding: 1px 7px;
      border-radius: var(--radius-full);
      display: inline-block;
      align-self: flex-start;
    }

    .realm-card-title {
      font-size: 0.98rem;
      font-weight: 800;
      color: #121816;
      margin: 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .realm-card-bottom-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.5rem;
      padding-top: 0.45rem;
      border-top: 1px solid #ECEAE4;
    }

    .realm-price-val {
      font-size: 0.92rem;
      font-weight: 800;
      color: #0F5132;
    }

    .realm-quote-val {
      font-size: 0.78rem;
      font-weight: 700;
      color: #0F5132;
      background: rgba(15, 81, 50, 0.08);
      border: 1px solid rgba(15, 81, 50, 0.18);
      padding: 2px 7px;
      border-radius: 4px;
    }

    .realm-templates-count {
      font-size: 0.7rem;
      background: rgba(197, 168, 105, 0.15);
      border: 1px solid rgba(197, 168, 105, 0.3);
      color: #9B7E3E;
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* ==========================================
       DYNAMIC TRIAD GRID (3 CARDS)
       ========================================== */
    .dynamic-triad-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 3.5rem;
    }

    @media (max-width: 992px) {
      .dynamic-triad-grid {
        grid-template-columns: 1fr;
      }
      .intent-values-bar {
        grid-template-columns: 1fr;
      }
      .strip-vertical-divider {
        display: none;
      }
    }

    .triad-card {
      background: rgba(13, 59, 46, 0.65);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(197, 168, 105, 0.3);
      border-radius: 1.5rem;
      padding: 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 420px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.4);
      transition: transform 0.3s ease, border-color 0.3s ease;
      position: relative;
      overflow: hidden;
      text-align: right;
    }

    .triad-card:hover {
      border-color: rgba(197, 168, 105, 0.65);
      transform: translateY(-4px);
    }

    /* Triad Card 1: Interactive Map */
    .map-selector-card .triad-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0 0 0.3rem;
    }

    .map-selector-card .triad-subtitle {
      font-size: 0.88rem;
      color: rgba(244, 238, 221, 0.75);
      margin: 0 0 1rem;
    }

    .mini-holographic-map-box {
      position: relative;
      border-radius: 1rem;
      overflow: hidden;
      height: 220px;
      background: #05140F;
      border: 1px solid rgba(197, 168, 105, 0.2);
    }

    .mini-map-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
    }

    .map-city-pin {
      position: absolute;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      transform: translate(50%, -50%);
      z-index: 5;
    }

    .pin-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #C5A869;
      display: block;
      border: 2px solid #FFFFFF;
      box-shadow: 0 0 10px #C5A869;
      transition: all 0.25s ease;
    }

    .pin-pulse {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 2px solid #DFC698;
      animation: pinPulse 2s infinite;
      opacity: 0;
    }

    @keyframes pinPulse {
      0% { transform: scale(0.8); opacity: 0.8; }
      100% { transform: scale(2.2); opacity: 0; }
    }

    .map-city-pin.active .pin-dot {
      background: #25D366;
      box-shadow: 0 0 14px #25D366;
      transform: scale(1.3);
    }

    .triad-city-picker-row {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.25rem;
    }

    .city-select-dropdown {
      flex: 1;
      background: rgba(10, 47, 36, 0.85);
      border: 1px solid rgba(197, 168, 105, 0.4);
      border-radius: 0.75rem;
      color: #F4EEDD;
      padding: 0.65rem 0.9rem;
      font-size: 0.9rem;
      font-weight: 600;
      outline: none;
    }

    .btn-triad-action {
      background: linear-gradient(135deg, #C5A869 0%, #A88944 100%);
      color: #0A2F24;
      border: none;
      border-radius: 0.75rem;
      padding: 0.65rem 1.1rem;
      font-weight: 800;
      font-size: 0.88rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-triad-action:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(197, 168, 105, 0.4);
    }

    /* Triad Card 2: City Spotlight */
    .city-spotlight-card {
      padding: 0;
    }

    .city-bg-image-wrap {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .city-spotlight-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .city-bg-gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(10, 47, 36, 0.2) 0%, rgba(7, 26, 20, 0.94) 75%);
    }

    .city-spotlight-content {
      position: relative;
      z-index: 2;
      height: 100%;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 1rem;
    }

    .city-header-pill {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
    }

    .city-name-big {
      font-family: 'Amiri', serif;
      font-size: 2.2rem;
      font-weight: 900;
      color: #FFFFFF;
      margin: 0;
    }

    .city-region-tag {
      color: #DFC698;
      font-size: 0.9rem;
      font-weight: 700;
    }

    .city-counter-box {
      background: rgba(10, 47, 36, 0.75);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(197, 168, 105, 0.35);
      border-radius: 0.75rem;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
    }

    .city-projects-num {
      font-family: 'Amiri', serif;
      font-size: 1.8rem;
      font-weight: 900;
      color: #DFC698;
    }

    .city-projects-label {
      color: #FFFFFF;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .btn-view-city-stories {
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(10px);
      border: 1px solid #DFC698;
      color: #FFFFFF;
      border-radius: 9999px;
      padding: 0.75rem 1.4rem;
      font-weight: 700;
      font-size: 0.92rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.25s;
    }

    .btn-view-city-stories:hover {
      background: #C5A869;
      color: #0A2F24;
    }

    /* Triad Card 3: Customer Testimonial & Audio Waveform */
    .head-tag-live {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(37, 211, 102, 0.15);
      border: 1px solid rgba(37, 211, 102, 0.4);
      border-radius: 9999px;
      padding: 0.35rem 0.85rem;
      color: #25D366;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .live-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #25D366;
      animation: pinPulse 1.6s infinite;
    }

    .client-profile-row {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      margin-top: 0.85rem;
    }

    .client-avatar-frame {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #C5A869;
      flex-shrink: 0;
    }

    .client-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .client-meta-info h4 {
      color: #FFFFFF;
      font-size: 0.95rem;
      font-weight: 700;
      margin: 0 0 0.2rem;
    }

    .client-service-tag {
      color: #DFC698;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .client-quote-text {
      font-size: 0.92rem;
      line-height: 1.7;
      color: rgba(244, 238, 221, 0.92);
      font-style: italic;
      margin: 0.85rem 0;
      text-align: right;
    }

    .audio-player-widget {
      background: rgba(10, 47, 36, 0.85);
      border: 1px solid rgba(197, 168, 105, 0.35);
      border-radius: 1rem;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .btn-audio-toggle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #C5A869;
      color: #0A2F24;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.2s;
    }

    .btn-audio-toggle:hover {
      transform: scale(1.1);
      background: #DFC698;
    }

    .btn-audio-toggle.playing {
      background: #25D366;
      color: #FFFFFF;
    }

    .audio-waveform-bar {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 3px;
      height: 32px;
    }

    .wave-bar {
      flex: 1;
      width: 3px;
      background: #DFC698;
      border-radius: 3px;
      transition: height 0.2s ease;
      min-height: 4px;
    }

    .audio-waveform-bar.animating .wave-bar {
      background: #25D366;
    }

    .audio-time-display {
      font-family: monospace;
      font-size: 0.82rem;
      color: #DFC698;
      font-weight: 700;
    }

    .transcript-link-row {
      margin-top: 0.6rem;
      text-align: left;
    }

    .link-read-transcript {
      background: none;
      border: none;
      color: #DFC698;
      font-size: 0.82rem;
      text-decoration: underline;
      cursor: pointer;
    }

    /* ==========================================
       SMART PLATFORM APP SHOWCASE SECTION
       ========================================== */
    .smart-app-showcase-section {
      position: relative;
      padding: 4.5rem 0;
      background: #FFFFFF;
      overflow: hidden;
      border-top: 1px solid #ECEAE4;
      border-bottom: 1px solid #ECEAE4;
    }

    .smart-app-ambient-glow {
      position: absolute;
      top: 20%;
      left: 10%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(15, 81, 50, 0.05) 0%, rgba(229, 185, 79, 0.06) 40%, transparent 70%);
      filter: blur(80px);
      pointer-events: none;
    }

    .smart-app-header-block {
      text-align: center;
      max-width: 820px;
      margin: 0 auto 3rem auto;
    }

    .app-tag-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(15, 81, 50, 0.08);
      border: 1px solid rgba(15, 81, 50, 0.2);
      border-radius: 9999px;
      padding: 0.38rem 1.15rem;
      color: #0F5132;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .app-section-title {
      font-family: var(--font-family-arabic);
      font-size: clamp(2rem, 3.8vw, 2.9rem);
      font-weight: 900;
      color: #0A2F24;
      margin-bottom: 0.8rem;
      line-height: 1.25;
    }

    .app-section-sub {
      color: #485A53;
      font-size: 1.05rem;
      line-height: 1.75;
      margin: 0;
    }

    .smart-app-showcase-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      align-items: center;
      gap: 3.5rem;
    }

    @media (max-width: 992px) {
      .smart-app-showcase-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    .phone-showcase-visual-card {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      border: 1.5px solid rgba(15, 81, 50, 0.15);
      background: #FAF8F5;
      box-shadow: 0 16px 45px rgba(10, 47, 36, 0.12);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .phone-showcase-visual-card:hover {
      transform: translateY(-6px);
      border-color: #0F5132;
      box-shadow: 0 22px 55px rgba(10, 47, 36, 0.18);
    }

    .showcase-mockup-img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.6s ease;
    }

    .phone-showcase-visual-card:hover .showcase-mockup-img {
      transform: scale(1.03);
    }

    .showcase-interactive-hint {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #0A2F24;
      border: 1.5px solid #DFC698;
      border-radius: 9999px;
      padding: 0.48rem 1.35rem;
      color: #FFFFFF;
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
      backdrop-filter: blur(10px);
      pointer-events: none;
      white-space: nowrap;
    }

    .smart-app-features-column {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      text-align: right;
    }

    .app-feature-pills-list {
      display: flex;
      flex-direction: column;
      gap: 0.95rem;
    }

    .app-feat-item {
      display: flex;
      align-items: flex-start;
      gap: 1.1rem;
      background: #FAF8F5;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      border-radius: 16px;
      padding: 1.1rem 1.35rem;
      box-shadow: 0 4px 16px rgba(10, 47, 36, 0.04);
      transition: all 0.3s ease;
    }

    .app-feat-item:hover {
      background: #FFFFFF;
      border-color: #0F5132;
      transform: translateX(-6px);
      box-shadow: 0 8px 24px rgba(15, 81, 50, 0.1);
    }

    .feat-icon-box {
      font-size: 1.35rem;
      background: #FFFFFF;
      color: #0F5132;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1.5px solid rgba(15, 81, 50, 0.2);
      box-shadow: 0 2px 8px rgba(10, 47, 36, 0.06);
    }

    .feat-text-box h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1.05rem;
      font-weight: 800;
      color: #0A2F24;
    }

    .feat-text-box p {
      margin: 0;
      font-size: 0.88rem;
      color: #485A53;
      line-height: 1.6;
    }

    .app-action-launch-box {
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .btn-launch-smart-app {
      background: linear-gradient(135deg, #C5A869 0%, #DFC698 50%, #B39250 100%);
      color: #0A2F24;
      border: none;
      border-radius: 9999px;
      padding: 1rem 2.2rem;
      font-size: 1.15rem;
      font-weight: 900;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(197, 168, 105, 0.4), 0 0 20px rgba(197, 168, 105, 0.25);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-launch-smart-app:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 40px rgba(197, 168, 105, 0.6), 0 0 30px rgba(223, 198, 152, 0.5);
      background: linear-gradient(135deg, #DFC698 0%, #FFF0CF 50%, #C5A869 100%);
    }

    .launch-hint-txt {
      font-size: 0.82rem;
      color: rgba(244, 238, 221, 0.75);
      text-align: right;
    }

    /* ==========================================
       WORKFLOW STRIP & GUARANTEES
       ========================================== */
    .realms-workflow-strip {
      background: rgba(13, 59, 46, 0.7);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(197, 168, 105, 0.3);
      border-radius: 1.5rem;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    @media (max-width: 992px) {
      .realms-workflow-strip {
        flex-direction: column;
        align-items: stretch;
      }
      .workflow-steps-nodes {
        flex-wrap: wrap;
        gap: 1rem;
      }
    }

    .btn-ready-cta {
      background: linear-gradient(135deg, #25D366 0%, #1EBE5D 100%);
      color: #FFFFFF;
      border-radius: 1.25rem;
      padding: 0.85rem 1.6rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      font-weight: 800;
      font-size: 1rem;
      box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
      transition: transform 0.2s;
      flex-shrink: 0;
    }

    .btn-ready-cta:hover {
      transform: scale(1.03);
    }

    .btn-ready-cta .cta-sub {
      font-size: 0.75rem;
      opacity: 0.9;
      font-weight: 500;
    }

    .workflow-steps-nodes {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex: 1;
      justify-content: space-around;
    }

    .wf-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      text-align: center;
    }

    .wf-circle {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(10, 47, 36, 0.9);
      border: 1.5px solid #C5A869;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }

    .wf-label {
      color: #F4EEDD;
      font-size: 0.78rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .wf-connector {
      flex: 1;
      height: 2px;
      background: linear-gradient(90deg, #C5A869, rgba(197, 168, 105, 0.2));
      min-width: 15px;
    }

    .realms-guarantees-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #FFFFFF;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      border-radius: 1.25rem;
      padding: 1rem 1.8rem;
      gap: 1rem;
      flex-wrap: wrap;
      box-shadow: 0 8px 24px rgba(10, 47, 36, 0.05);
    }

    .guarantee-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #0A2F24;
      font-size: 0.86rem;
      font-weight: 700;
    }

    .guarantee-icon {
      font-size: 1.15rem;
    }

    .vision-item {
      flex-direction: column;
      align-items: flex-end;
      border-right: 1px solid rgba(15, 81, 50, 0.15);
      padding-right: 1rem;
    }

    .vision-logo-text {
      font-weight: 900;
      color: #0F5132;
      font-size: 0.95rem;
      letter-spacing: 1px;
    }

    .vision-sub {
      font-size: 0.7rem;
      color: #485A53;
    }



    /* ==========================================
       MODALS: SMARTPHONE 3D, VIDEO, COUPON, TRANSCRIPT
       ========================================== */
    .phone-modal-backdrop, .video-modal-backdrop, .coupon-modal-backdrop, .transcript-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.82);
      backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: modalFadeIn 0.25s ease-out;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .phone-modal-container {
      position: relative;
      perspective: 1200px;
    }

    .btn-close-phone, .btn-close-video, .btn-close-coupon, .btn-close-transcript {
      position: absolute;
      top: -15px;
      right: -15px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #0A2F24;
      border: 1.5px solid #DFC698;
      color: #DFC698;
      font-size: 1.1rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      transition: transform 0.2s;
    }

    .btn-close-phone:hover, .btn-close-video:hover, .btn-close-coupon:hover, .btn-close-transcript:hover {
      transform: scale(1.1);
      background: #C5A869;
      color: #0A2F24;
    }

    /* 3D Hardware Smartphone Frame */
    .iphone-hardware-frame {
      width: 350px;
      height: 690px;
      background: #1C1F1E;
      border: 4px solid #C5A869;
      border-radius: 46px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.85), 0 0 45px rgba(197, 168, 105, 0.35), inset 0 0 10px rgba(0,0,0,0.9);
      padding: 12px;
      position: relative;
      overflow: hidden;
    }

    .iphone-screen {
      width: 100%;
      height: 100%;
      background: #071A14;
      border-radius: 36px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .ios-status-bar {
      height: 38px;
      padding: 0 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #F4EEDD;
      font-size: 0.78rem;
      font-weight: 700;
      z-index: 10;
      position: relative;
    }

    .dynamic-island-notch {
      width: 90px;
      height: 22px;
      background: #000000;
      border-radius: 9999px;
      margin-top: 2px;
    }

    .phone-app-inner {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      scrollbar-width: none;
    }

    .phone-app-inner::-webkit-scrollbar {
      display: none;
    }

    .phone-app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(197, 168, 105, 0.2);
    }

    .phone-menu-icon {
      background: none;
      border: none;
      color: #DFC698;
      font-size: 1.2rem;
      cursor: pointer;
    }

    .phone-app-brand {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .app-title {
      font-weight: 800;
      color: #FFFFFF;
      font-size: 0.88rem;
    }

    .app-sub {
      color: #DFC698;
      font-size: 0.68rem;
    }

    .phone-avatar-mini {
      font-size: 1.2rem;
    }

    .phone-hero-banner {
      position: relative;
      height: 160px;
      overflow: hidden;
      border-radius: 1rem;
      margin: 0.75rem;
    }

    .phone-hero-bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .phone-hero-content {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 20%, rgba(10, 47, 36, 0.95) 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0.85rem;
      text-align: right;
    }

    .phone-hero-content h4 {
      color: #FFFFFF;
      font-weight: 800;
      font-size: 1rem;
      margin: 0;
    }

    .phone-hero-content p {
      color: #DFC698;
      font-size: 0.75rem;
      margin: 0.2rem 0 0;
    }

    .phone-specialization-box {
      padding: 0.5rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .phone-select {
      width: 100%;
      background: rgba(10, 47, 36, 0.9);
      border: 1px solid rgba(197, 168, 105, 0.4);
      border-radius: 0.75rem;
      color: #F4EEDD;
      padding: 0.6rem 0.8rem;
      font-size: 0.85rem;
      outline: none;
    }

    .btn-phone-start {
      width: 100%;
      background: linear-gradient(135deg, #25D366 0%, #1EBE5D 100%);
      color: #FFFFFF;
      border: none;
      border-radius: 0.75rem;
      padding: 0.65rem;
      font-weight: 800;
      font-size: 0.9rem;
      cursor: pointer;
    }

    .phone-stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem 1.5rem;
    }

    .stat-cell {
      background: rgba(13, 59, 46, 0.6);
      border: 1px solid rgba(197, 168, 105, 0.25);
      border-radius: 0.75rem;
      padding: 0.55rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .stat-cell strong {
      color: #DFC698;
      font-size: 1.15rem;
      font-family: 'Amiri', serif;
      margin: 0.15rem 0 0;
    }

    .stat-cell small {
      color: #FFFFFF;
      font-size: 0.72rem;
    }

    /* Video Showcase Modal */
    .video-modal-container {
      width: 92%;
      max-width: 680px;
      background: #071A14;
      border: 1.5px solid #C5A869;
      border-radius: 1.5rem;
      padding: 1.75rem;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.85), 0 0 35px rgba(197, 168, 105, 0.35);
      text-align: right;
    }

    .video-player-header h3 {
      color: #FFFFFF;
      font-size: 1.3rem;
      font-weight: 800;
      margin: 0 0 0.3rem;
    }

    .video-player-header p {
      color: #DFC698;
      font-size: 0.88rem;
      margin: 0;
    }

    .video-screen-simulation {
      position: relative;
      height: 320px;
      border-radius: 1rem;
      overflow: hidden;
      margin: 1.25rem 0;
      background: #000;
    }

    .video-poster-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.75;
    }

    .video-play-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-big-play-glow {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #25D366;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      text-decoration: none;
      box-shadow: 0 0 30px #25D366;
      transition: transform 0.25s;
    }

    .btn-big-play-glow:hover {
      transform: scale(1.15);
    }

    .video-timer-track {
      position: absolute;
      bottom: 0.75rem;
      left: 1rem;
      right: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .video-time {
      color: #FFFFFF;
      font-family: monospace;
      font-size: 0.82rem;
    }

    .video-progress-bar {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.25);
      border-radius: 9999px;
      overflow: hidden;
    }

    .video-fill-anim {
      width: 45%;
      height: 100%;
      background: #DFC698;
      animation: videoProgress 12s linear infinite;
    }

    @keyframes videoProgress {
      0% { width: 0%; }
      100% { width: 100%; }
    }

    .video-footer-cta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .btn-video-wa {
      background: #25D366;
      color: #FFFFFF;
      padding: 0.65rem 1.4rem;
      border-radius: 9999px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.9rem;
    }

    /* Coupon Modal */
    .coupon-modal-card {
      width: 90%;
      max-width: 440px;
      background: #0A2F24;
      border: 1.5px solid #DFC698;
      border-radius: 1.5rem;
      padding: 2rem;
      position: relative;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.85), 0 0 30px rgba(197, 168, 105, 0.35);
    }

    .coupon-gift-icon {
      font-size: 3.5rem;
      animation: bounceGift 1.8s infinite;
      margin-bottom: 0.5rem;
    }

    .coupon-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 0.5rem;
    }

    .coupon-desc {
      color: rgba(244, 238, 221, 0.85);
      font-size: 0.92rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .coupon-code-box {
      background: rgba(13, 59, 46, 0.9);
      border: 2px dashed #DFC698;
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      margin-bottom: 1.5rem;
    }

    .code-txt {
      font-family: monospace;
      font-size: 1.5rem;
      font-weight: 900;
      color: #DFC698;
      letter-spacing: 2px;
    }

    .btn-copy-code {
      background: #C5A869;
      color: #0A2F24;
      border: none;
      border-radius: 0.5rem;
      padding: 0.4rem 0.8rem;
      font-weight: 800;
      font-size: 0.85rem;
      cursor: pointer;
    }

    .btn-use-coupon-wa {
      background: #25D366;
      color: #FFFFFF;
      padding: 0.85rem 1.5rem;
      border-radius: 9999px;
      text-decoration: none;
      font-weight: 800;
      font-size: 1rem;
      display: inline-block;
      width: 100%;
      box-shadow: 0 8px 20px rgba(37, 211, 102, 0.35);
    }

    /* Transcript Modal */
    .transcript-modal-card {
      width: 90%;
      max-width: 580px;
      background: #0A2F24;
      border: 1.5px solid #DFC698;
      border-radius: 1.5rem;
      padding: 2rem;
      position: relative;
      text-align: right;
      box-shadow: 0 20px 60px rgba(0,0,0,0.85);
    }

    .transcript-head {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid rgba(197, 168, 105, 0.3);
      padding-bottom: 1rem;
    }

    .transcript-avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 2px solid #C5A869;
      object-fit: cover;
    }

    .transcript-head h4 {
      color: #FFFFFF;
      margin: 0 0 0.25rem;
      font-size: 1.1rem;
    }

    .transcript-head p {
      color: #DFC698;
      margin: 0;
      font-size: 0.85rem;
    }

    .transcript-body h5 {
      color: #DFC698;
      font-size: 0.95rem;
      margin: 0 0 0.5rem;
    }

    .transcript-full-text {
      font-size: 0.95rem;
      line-height: 1.9;
      color: rgba(244, 238, 221, 0.92);
      margin: 1rem 0;
    }

    .btn-close-card {
      background: #C5A869;
      color: #0A2F24;
      border: none;
      border-radius: 0.75rem;
      padding: 0.65rem 1.8rem;
      font-weight: 800;
      cursor: pointer;
    }

    /* ==========================================
       HERO CINEMATIC SECTION (ORIGINAL FALLBACK)
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
      box-shadow: 0 16px 45px rgba(10, 47, 36, 0.08);
      border: 1.5px solid rgba(15, 81, 50, 0.14);
    }

    .intent-header {
      text-align: center;
      margin-bottom: 1.8rem;
    }

    .intent-tag-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: rgba(15, 81, 50, 0.08);
      border: 1px solid rgba(15, 81, 50, 0.25);
      color: #0F5132;
      padding: 0.35rem 1rem;
      border-radius: 20px;
      font-size: 0.78rem;
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
      font-size: 1.9rem;
      color: #0A2F24;
      margin-bottom: 0.4rem;
      font-weight: 800;
    }

    .intent-subtitle {
      color: #485A53;
      font-size: 0.95rem;
    }

    .simulator-mode-switch {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .mode-btn {
      padding: 0.7rem 1.5rem;
      border-radius: 30px;
      font-size: 0.88rem;
      font-weight: 700;
      border: 1.5px solid rgba(15, 81, 50, 0.15);
      background: #FAF8F5;
      color: #0A2F24;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: inherit;
    }

    .mode-btn:hover {
      background: #FFFFFF;
      border-color: #0F5132;
      transform: translateY(-2px);
    }

    .mode-btn.active {
      background: #0F5132;
      color: #FFFFFF;
      border-color: #0F5132;
      font-weight: 800;
      box-shadow: 0 4px 14px rgba(15, 81, 50, 0.25);
    }

    .intent-options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 1.1rem;
    }

    .intent-card {
      background: #FAF8F5;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      border-radius: 20px;
      padding: 1.4rem 1.1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.65rem;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(10, 47, 36, 0.04);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .intent-card:hover {
      transform: translateY(-5px);
      border-color: #0F5132;
      background: #FFFFFF;
      box-shadow: 0 10px 24px rgba(15, 81, 50, 0.12);
    }

    .intent-icon {
      font-size: 2.2rem;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.1));
    }

    .intent-text strong {
      display: block;
      color: #0A2F24;
      font-size: 1rem;
      margin-bottom: 3px;
      font-weight: 800;
    }

    .intent-text small {
      color: #485A53;
      font-size: 0.78rem;
      line-height: 1.35;
    }

    .intent-card.cta-intent {
      background: #0A2F24;
      border-color: #E5B94F;
      box-shadow: 0 6px 20px rgba(10, 47, 36, 0.2);
    }

    .intent-card.cta-intent .intent-text strong {
      color: #E5B94F;
    }

    .intent-card.cta-intent .intent-text small {
      color: #FFFFFF;
    }

    /* Active Theory Interactive Simulator Box (Luxury Emerald & Champagne Gold) */
    .interactive-calc-box {
      background: #FAF8F5;
      border: 1.5px solid rgba(15, 81, 50, 0.14);
      border-radius: 20px;
      padding: 2.2rem 2.4rem;
      color: #121816;
      box-shadow: 0 8px 24px rgba(10, 47, 36, 0.04);
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
      font-size: 0.9rem;
      color: #0A2F24;
      font-weight: 800;
    }

    .calc-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .calc-pill {
      background: #FFFFFF;
      border: 1.5px solid rgba(15, 81, 50, 0.18);
      color: #0A2F24;
      padding: 0.55rem 1.1rem;
      border-radius: 20px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: inherit;
    }

    .calc-pill:hover {
      background: #F4F2EC;
      border-color: #0F5132;
      transform: translateY(-2px);
    }

    .calc-pill.selected {
      background: #0F5132;
      color: #FFFFFF;
      border-color: #0F5132;
      font-weight: 800;
      box-shadow: 0 4px 14px rgba(15, 81, 50, 0.25);
    }

    .calc-pill.urgent.selected {
      background: #D97706;
      color: #FFFFFF;
      border-color: #B45309;
    }

    .slider-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .slider-val-badge {
      background: rgba(15, 81, 50, 0.08);
      border: 1.5px solid #0F5132;
      color: #0F5132;
      padding: 4px 14px;
      border-radius: 12px;
      font-size: 0.92rem;
      font-weight: 800;
      box-shadow: 0 0 12px rgba(223, 198, 152, 0.2);
    }

    .range-slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .active-range-input {
      -webkit-appearance: none;
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background: #E2E8F0;
      border: 1px solid #CBD5E1;
      outline: none;
      transition: background 0.2s;
    }

    .active-range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #0F5132;
      border: 2px solid #FFFFFF;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(15, 81, 50, 0.4);
      transition: transform 0.15s;
    }

    .active-range-input::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }

    .range-milestones {
      display: flex;
      justify-content: space-between;
      font-size: 0.76rem;
      color: #64748B;
      font-weight: 600;
    }

    /* Result Output Capsule (Clean White Card with Gold Border) */
    .calc-result-capsule {
      background: #FFFFFF;
      border: 1.5px solid #DFC698;
      border-radius: 18px;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
      box-shadow: 0 8px 30px rgba(10, 47, 36, 0.06);
      color: #121816;
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
      gap: 3px;
    }

    .result-metric small {
      font-size: 0.78rem;
      color: #485A53;
      font-weight: 700;
    }

    .price-big {
      font-size: 1.6rem;
      font-family: var(--font-family-latin);
      color: #0F5132;
      font-weight: 900;
    }

    .price-big .curr {
      font-size: 0.95rem;
      font-family: var(--font-family-arabic);
      color: #0A2F24;
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
      background: #FFFFFF;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      border-radius: 22px;
      padding: 1.6rem 1.8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(10, 47, 36, 0.05);
    }

    .learnspace-course-card:hover {
      transform: translateY(-6px);
      border-color: #0F5132;
      box-shadow: 0 16px 36px rgba(10, 47, 36, 0.12);
    }

    .course-card-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #F1EFE9;
      margin-bottom: 1.2rem;
    }

    .uni-affiliation-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.76rem;
      color: #0F5132;
      font-weight: 700;
      background: rgba(15, 81, 50, 0.06);
      padding: 3px 10px;
      border-radius: 9999px;
      border: 1px solid rgba(15, 81, 50, 0.14);
    }

    .course-code-pill {
      font-size: 0.75rem;
      font-weight: 800;
      color: #FFFFFF;
      background: #0F5132;
      padding: 3px 10px;
      border-radius: 9999px;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(15, 81, 50, 0.2);
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
      background: rgba(15, 81, 50, 0.08);
      border: 1.5px solid rgba(15, 81, 50, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      box-shadow: 0 2px 8px rgba(10, 47, 36, 0.06);
    }

    .course-degree-pills {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .degree-pill {
      font-size: 0.74rem;
      color: #0F5132;
      font-weight: 700;
      background: rgba(15, 81, 50, 0.08);
      padding: 3px 10px;
      border-radius: 9999px;
      border: 1px solid rgba(15, 81, 50, 0.18);
    }

    .badge-featured-gold {
      font-size: 0.72rem;
      color: #0A2F24;
      font-weight: 800;
      background: linear-gradient(135deg, #FBE6B3 0%, #D4AF37 100%);
      padding: 3px 9px;
      border-radius: 9999px;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
    }

    .course-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: #121816;
      line-height: 1.35;
      margin: 0;
      transition: color 0.3s;
    }

    .learnspace-course-card:hover .course-title {
      color: #0F5132;
    }

    .course-brief {
      font-size: 0.88rem;
      color: #485A53;
      line-height: 1.6;
      margin: 0;
    }

    .course-instructor-pill {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #FAF8F5;
      padding: 0.55rem 0.9rem;
      border-radius: 12px;
      border: 1px solid rgba(15, 81, 50, 0.1);
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
      color: #0A2F24;
      font-weight: 700;
    }

    .inst-info small {
      font-size: 0.72rem;
      color: #0F5132;
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
      color: #485A53;
      background: #FAF8F5;
      padding: 0.4rem 0.75rem;
      border-radius: 8px;
      border: 1px solid rgba(15, 81, 50, 0.1);
    }

    .spec-icon {
      font-size: 0.85rem;
    }

    .course-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border-top: 1px solid #ECEAE4;
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
      color: #64748B;
      font-weight: 600;
    }

    .price-num {
      font-size: 1.15rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: #0F5132;
    }

    .strike-price {
      font-size: 0.78rem;
      color: #94A3B8;
      text-decoration: line-through;
    }

    .curr {
      font-size: 0.75rem;
      color: #0A2F24;
    }

    .course-action-btns {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-course-details {
      background: #FAF8F5;
      border: 1px solid rgba(15, 81, 50, 0.15);
      color: #0A2F24;
      padding: 0.5rem 0.9rem;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 700;
      transition: all 0.25s;
    }

    .btn-course-details:hover {
      background: #FFFFFF;
      border-color: #0F5132;
      color: #0F5132;
    }

    .btn-course-enroll {
      background: #0F5132;
      border: 1px solid #0F5132;
      color: #FFFFFF;
      padding: 0.5rem 1.1rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 800;
      box-shadow: 0 4px 14px rgba(15, 81, 50, 0.25);
      transition: all 0.25s;
    }

    .btn-course-enroll:hover {
      transform: translateY(-2px);
      background: #0A3E26;
      border-color: #0A3E26;
      box-shadow: 0 6px 18px rgba(15, 81, 50, 0.35);
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
       WORKFLOW SECTION (مسار الرحلة الأكاديمية الفاخر)
       ========================================== */
    .workflow-section {
      background: #FAF8F5;
      position: relative;
    }

    .steps-timeline-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 1.2rem;
      position: relative;
      z-index: 2;
    }

    @media (max-width: 1200px) {
      .steps-timeline-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
    }

    @media (max-width: 640px) {
      .steps-timeline-grid {
        grid-template-columns: 1fr;
        gap: 1.3rem;
      }
    }

    .timeline-step {
      padding: 2.2rem 1.1rem 1.8rem;
      text-align: center;
      position: relative;
      background: #FFFFFF;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      border-radius: 22px;
      box-shadow: 0 10px 28px rgba(10, 47, 36, 0.05);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .timeline-step:hover {
      transform: translateY(-8px);
      border-color: #C5A869;
      background: #FFFFFF;
      box-shadow: 0 20px 42px rgba(10, 47, 36, 0.1), 0 0 20px rgba(197, 168, 105, 0.15);
    }

    /* Subtle Flow Indicator between steps (RTL: flows right to left) */
    @media (min-width: 1201px) {
      .timeline-step:not(:last-child)::after {
        content: '←';
        position: absolute;
        left: -16px;
        top: 36%;
        transform: translateY(-50%);
        font-size: 1rem;
        font-weight: 900;
        color: #C5A869;
        background: #FFFFFF;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1.5px solid rgba(197, 168, 105, 0.4);
        box-shadow: 0 4px 10px rgba(10, 47, 36, 0.06);
        z-index: 5;
      }
    }

    .timeline-step.highlighted {
      border: 1.5px solid #C5A869;
      background: #FFFFFF;
      box-shadow: 0 12px 34px rgba(197, 168, 105, 0.14);
    }

    .step-num-pill {
      background: linear-gradient(135deg, #0A2F24 0%, #1A6B54 100%);
      border: 1px solid rgba(15, 81, 50, 0.3);
      color: #FFFFFF;
      font-size: 0.82rem;
      font-weight: 800;
      font-family: var(--font-family-latin);
      padding: 3px 14px;
      border-radius: 9999px;
      margin-bottom: 1.1rem;
      box-shadow: 0 3px 10px rgba(10, 47, 36, 0.18);
      letter-spacing: 0.05em;
    }

    .step-num-pill.gold-pill {
      background: linear-gradient(135deg, #DFC698 0%, #C5A869 100%);
      color: #0A2F24;
      border-color: #FFE8B6;
      box-shadow: 0 3px 12px rgba(197, 168, 105, 0.4);
    }

    .t-icon-box {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      background: #FAF8F5;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.9rem;
      margin-bottom: 1.1rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(10, 47, 36, 0.04);
    }

    .timeline-step:hover .t-icon-box {
      transform: scale(1.1) rotate(6deg);
      border-color: #C5A869;
      background: #FFFFFF;
      box-shadow: 0 8px 20px rgba(197, 168, 105, 0.25);
    }

    .t-icon-box.gold-icon-box {
      border-color: #C5A869;
      background: rgba(197, 168, 105, 0.1);
    }

    .t-icon {
      line-height: 1;
      filter: drop-shadow(0 2px 5px rgba(0,0,0,0.08));
    }

    .t-icon.gold-glow {
      filter: drop-shadow(0 0 10px rgba(223, 198, 152, 0.5));
    }

    .timeline-step h4 {
      color: #0A2F24;
      font-size: 1.12rem;
      font-weight: 800;
      margin-bottom: 0.65rem;
    }

    .timeline-step p {
      color: #485A53;
      font-size: 0.86rem;
      line-height: 1.65;
      margin: 0;
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
  themeService = inject(ThemeService);
  agentService = inject(SaudFarahAgentService);
  rewardsService = inject(RewardsService);

  @ViewChild('heroCanvas', { static: false }) heroCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('realmsTrack', { static: false }) realmsTrack!: ElementRef<HTMLDivElement>;

  services: ServiceItem[] = [];
  categories: Category[] = [];
  stats: Statistic[] = [];
  testimonials: Testimonial[] = [];
  selectedService: ServiceItem | null = null;
  isAddReviewModalOpen = false;
  isReviewPlaying = false;

  // 60-Second Video Modal State
  isVideoModalOpen = false;

  // Floating 3D Phone Modal State
  isPhoneModalOpen = false;
  phoneSpecialization = 'all';

  // Floating Welcome Coupon Modal State
  isDiscountModalOpen = false;
  couponCopied = false;

  // Accessibility & Comfort Toolbar State
  isReducedMotion = false;

  // "وش تحتاج اليوم؟" Needs Chip State
  selectedNeedId = 'research';
  needsList = [
    { id: 'research', name: 'بحث', icon: '📖', keyword: 'أبحاث' },
    { id: 'uni', name: 'جامعة', icon: '🎓', keyword: 'ماجستير' },
    { id: 'project', name: 'مشروع', icon: '💼', keyword: 'تخرج' },
    { id: 'design', name: 'تصميم', icon: '🎨', keyword: 'تصميم' },
    { id: 'programming', name: 'برمجة', icon: '💻', keyword: 'برمج' },
    { id: 'cv', name: 'سيرة ذاتية', icon: '👤', keyword: 'سيرة' },
    { id: 'other', name: 'شيء آخر', icon: '✨', keyword: 'استشارة' }
  ];

  // Auto-Moving Carousel for Real Services State
  realmsAutoScrollTimer: any = null;
  isRealmsAutoScrollPaused = false;

  // Dynamic Cities State
  selectedCityId = 'taif';
  citiesList = [
    { id: 'taif', name: 'الطائف', region: 'مكة المكرمة', projectsCount: '+1,500', image: 'assets/images/taif_city_spotlight.jpg', mapTop: '60%', mapRight: '32%' },
    { id: 'riyadh', name: 'الرياض', region: 'العاصمة', projectsCount: '+9,200', image: 'assets/images/saudi_panoramic_hero.jpg', mapTop: '48%', mapRight: '56%' },
    { id: 'jeddah', name: 'جدة', region: 'عروس البحر الأحمر', projectsCount: '+4,800', image: 'assets/images/taif_city_spotlight.jpg', mapTop: '58%', mapRight: '22%' },
    { id: 'dammam', name: 'الدمام والخبر', region: 'المنطقة الشرقية', projectsCount: '+3,400', image: 'assets/images/saudi_panoramic_hero.jpg', mapTop: '44%', mapRight: '76%' },
    { id: 'makkah', name: 'مكة المكرمة', region: 'العاصمة المقدسة', projectsCount: '+2,900', image: 'assets/images/taif_city_spotlight.jpg', mapTop: '62%', mapRight: '26%' },
    { id: 'madinah', name: 'المدينة المنورة', region: 'طيبة الطيبة', projectsCount: '+2,100', image: 'assets/images/saudi_panoramic_hero.jpg', mapTop: '42%', mapRight: '28%' },
    { id: 'abha', name: 'أبها وعسير', region: 'المنطقة الجنوبية', projectsCount: '+1,200', image: 'assets/images/taif_city_spotlight.jpg', mapTop: '76%', mapRight: '36%' },
    { id: 'qassim', name: 'القصيم وبريدة', region: 'منطقة القصيم', projectsCount: '+1,100', image: 'assets/images/saudi_panoramic_hero.jpg', mapTop: '38%', mapRight: '46%' },
    { id: 'tabuk', name: 'تبوك ونيوم', region: 'المنطقة الشمالية', projectsCount: '+950', image: 'assets/images/saudi_panoramic_hero.jpg', mapTop: '26%', mapRight: '20%' }
  ];

  // Real Customer Audio Testimonial State
  currentTestimonialData = {
    clientName: 'أ. فهد العصيمي',
    location: 'الطائف',
    role: 'باحث أكاديمي',
    service: 'إعداد رسالة ماجستير وتحليل إحصائي SPSS',
    quote: 'تعامل راقٍ ودقة في المراجعة، وساعدوني أخرج ببحث احترافي فوق توقعاتي وتمت إجازته بامتياز مع مرتبة الشرف.',
    avatar: 'assets/images/saudi_researcher_testimonial.jpg'
  };

  isAudioPlaying = false;
  audioCurrentTime = 0;
  audioDuration = 45;
  audioTimerInterval: any = null;
  audioWaveBars = Array.from({ length: 26 }, (_, i) => i);
  isTranscriptOpen = false;

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
    this.startRealmsAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.realmsAutoScrollTimer) {
      clearInterval(this.realmsAutoScrollTimer);
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
    const name = (s.nameAr || '').toLowerCase();
    const slug = (s.slug || '').toLowerCase();
    if (name.includes('بحث') || name.includes('رسالة') || slug.includes('research')) return '📚';
    if (name.includes('عرض') || name.includes('بوربوينت') || slug.includes('presentation')) return '📽️';
    if (name.includes('ميداني') || slug.includes('field')) return '📋';
    if (name.includes('تدريب') || slug.includes('internship')) return '💼';
    if (name.includes('صيفي') || slug.includes('summer')) return '☀️';
    if (name.includes('تخرج') || slug.includes('graduation')) return '🎯';
    if (name.includes('واجب صغير') || slug.includes('small-assignment')) return '✍️';
    if (name.includes('مشروع اكسل') || slug.includes('excel-project')) return '📊';
    if (name.includes('واجب اكسل') || slug.includes('excel-assignment')) return '🧮';
    if (name.includes('سيرة') || name.includes('ats') || slug.includes('cv')) return '👔';
    if (name.includes('بورتفوليو') || slug.includes('portfolio')) return '🎨';
    if (name.includes('مواقع') || slug.includes('web')) return '💻';
    if (name.includes('إحصائ') || name.includes('spss')) return '📈';
    if (name.includes('تدقيق') || name.includes('لغوي')) return '🖋️';
    if (name.includes('ترجم')) return '🌐';
    if (name.includes('turnitin')) return '🛡️';
    if (name.includes('مواطن') || name.includes('ضمان') || name.includes('إيجار')) return '🏛️';
    return '🎓';
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
    const lines = [
      'السلام عليكم ورحمة الله وبركاته 🌸',
      '*استفسار وحجز خدمة — منصة أم رهام الأكاديمية*',
      '━━━━━━━━━━━━━━━━━━━━',
      `📌 *الخدمة:* ${s.nameAr}`,
      '━━━━━━━━━━━━━━━━━━━━',
      '✨ *أرجو تزويدي بتفاصيل الخدمة وتأكيد الحجز، شكراً لكم 🌸*'
    ];
    return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
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

  // 60-Second Video Modal Methods
  openVideoModal(): void {
    this.audio.playClick();
    this.isVideoModalOpen = true;
  }

  closeVideoModal(): void {
    this.audio.playClick();
    this.isVideoModalOpen = false;
  }

  // Floating 3D Phone Modal Methods
  openPhoneModal(): void {
    this.audio.playClick();
    this.isPhoneModalOpen = true;
  }

  closePhoneModal(): void {
    this.audio.playClick();
    this.isPhoneModalOpen = false;
  }

  startPhoneOrder(): void {
    this.closePhoneModal();
    const lines = [
      'السلام عليكم ورحمة الله وبركاته 🌸',
      '*طلب خدمة عبر تطبيق منصة أم رهام الذكي*',
      '━━━━━━━━━━━━━━━━━━━━',
      '🛡️ *الضمان:* الدفع بعد الإنجاز والاستلام المعتمد 100%',
      '✨ *أرجو تزويدي بالخيارات والبدء بالطلب، شكراً لكم 🌸*'
    ];
    window.open(`https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  }

  // Floating Welcome Coupon Modal Methods
  openDiscountModal(): void {
    this.audio.playSuccess();
    this.isDiscountModalOpen = true;
  }

  closeDiscountModal(): void {
    this.audio.playClick();
    this.isDiscountModalOpen = false;
  }

  copyCouponCode(): void {
    this.couponCopied = true;
    this.audio.playSuccess();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('SAUDI2026');
    }
    setTimeout(() => this.couponCopied = false, 3000);
  }

  // Accessibility & Comfort Methods
  toggleReducedMotion(): void {
    this.isReducedMotion = !this.isReducedMotion;
    this.audio.playClick();
    if (typeof document !== 'undefined') {
      if (this.isReducedMotion) {
        document.body.classList.add('reduced-motion-mode');
      } else {
        document.body.classList.remove('reduced-motion-mode');
      }
    }
  }

  setDarkTheme(): void {
    this.themeService.setTheme('emerald-night');
    this.audio.playClick();
  }

  setEmeraldTheme(): void {
    this.themeService.setTheme('emerald');
    this.audio.playClick();
  }

  // "وش تحتاج اليوم؟" Needs Chip Methods
  selectNeed(need: any): void {
    this.selectedNeedId = need.id;
    this.audio.playClick();
    this.scrollToService(need.keyword);
  }

  openNeedDetails(): void {
    this.audio.playClick();
    const need = this.needsList.find(n => n.id === this.selectedNeedId) || this.needsList[0];
    const text = `السلام عليكم ورحمة الله، أرغب بمعرفة تفاصيل مسار (${need.name}) عبر منصة أم رهام.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  // "عوالم وخدمات أم رهام" Auto-Moving Carousel Methods
  startRealmsAutoScroll(): void {
    if (typeof window === 'undefined') return;
    if (this.realmsAutoScrollTimer) clearInterval(this.realmsAutoScrollTimer);
    this.realmsAutoScrollTimer = setInterval(() => {
      if (this.isRealmsAutoScrollPaused) return;
      if (this.realmsTrack && this.realmsTrack.nativeElement) {
        const el = this.realmsTrack.nativeElement;
        const maxScroll = el.scrollWidth - el.clientWidth;
        const currentScroll = Math.abs(el.scrollLeft);
        if (currentScroll >= maxScroll - 30) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: -250, behavior: 'smooth' });
        }
      }
    }, 2400);
  }

  pauseRealmsAutoScroll(): void {
    this.isRealmsAutoScrollPaused = true;
  }

  resumeRealmsAutoScroll(): void {
    this.isRealmsAutoScrollPaused = false;
  }

  scrollRealms(direction: 'prev' | 'next'): void {
    this.audio.playClick();
    if (this.realmsTrack && this.realmsTrack.nativeElement) {
      const el = this.realmsTrack.nativeElement;
      const scrollAmount = 260;
      el.scrollBy({ left: direction === 'next' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }

  getServiceCardImage(s: ServiceItem, idx: number): string {
    const name = (s.nameAr || '').toLowerCase();
    const slug = (s.slug || '').toLowerCase();

    // 1. بحث جامعي / رسائل عليا
    if (name.includes('بحث') || name.includes('رسال') || slug.includes('research')) {
      return 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format&fit=crop';
    }
    // 2. عروض تقديمية وبوربوينت
    if (name.includes('عرض') || name.includes('بوربوينت') || slug.includes('presentation')) {
      return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&auto=format&fit=crop';
    }
    // 3. تقارير ميدانية
    if (name.includes('ميداني') || slug.includes('field')) {
      return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&auto=format&fit=crop';
    }
    // 4. تقرير تدريب تعاوني / مهني
    if (name.includes('تدريب') || slug.includes('internship')) {
      return 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop';
    }
    // 5. تقرير تدريب صيفي
    if (name.includes('صيفي') || slug.includes('summer')) {
      return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format&fit=crop';
    }
    // 6. مشاريع التخرج
    if (name.includes('تخرج') || slug.includes('graduation')) {
      return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop';
    }
    // 7. واجبات وتكاليف سريعة
    if (name.includes('واجب صغير') || slug.includes('small-assignment')) {
      return 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop';
    }
    // 8. إكسل (واجبات ومشاريع ونماذج مالية)
    if (name.includes('اكسل') || name.includes('excel') || slug.includes('excel')) {
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop';
    }
    // 9. سيرة ذاتية ATS احترافية
    if (name.includes('سيرة') || name.includes('ats') || slug.includes('cv')) {
      return 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80&auto=format&fit=crop';
    }
    // 10. بورتفوليو وملف أعمال
    if (name.includes('بورتفوليو') || slug.includes('portfolio')) {
      return 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80&auto=format&fit=crop';
    }
    // 11. مواقع وبرمجة
    if (name.includes('مواقع') || slug.includes('web')) {
      return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop';
    }
    // 12. خدمات عامة وتوثيق حكومي
    if (name.includes('مواطن') || name.includes('ضمان') || name.includes('إيجار')) {
      return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop';
    }

    const curatedAcademicImages = [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop'
    ];
    return curatedAcademicImages[idx % curatedAcademicImages.length];
  }

  // Dynamic Cities Getter & Methods
  get activeCityData() {
    return this.citiesList.find(c => c.id === this.selectedCityId) || this.citiesList[0];
  }

  selectCity(cityId: string): void {
    this.selectedCityId = cityId;
    this.audio.playClick();
  }

  openCityDetails(): void {
    this.audio.playClick();
    const c = this.activeCityData;
    const text = `السلام عليكم ورحمة الله، أنا من مدينة (${c.name}) وأرغب ببدء مشروعي وبحثي مع منصة أم رهام.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  // Customer Testimonial Audio Player Methods
  toggleAudioPlayer(): void {
    this.isAudioPlaying = !this.isAudioPlaying;
    this.audio.playClick();

    if (this.isAudioPlaying) {
      if (this.audioTimerInterval) clearInterval(this.audioTimerInterval);
      this.audioTimerInterval = setInterval(() => {
        this.audioCurrentTime++;
        if (this.audioCurrentTime >= this.audioDuration) {
          this.audioCurrentTime = 0;
          this.isAudioPlaying = false;
          clearInterval(this.audioTimerInterval);
        }
      }, 1000);
    } else {
      if (this.audioTimerInterval) {
        clearInterval(this.audioTimerInterval);
      }
    }
  }

  getWaveHeight(idx: number): number {
    if (!this.isAudioPlaying) {
      return 6 + ((idx * 5) % 18);
    }
    const seed = (idx * 7 + this.audioCurrentTime * 3) % 24;
    return 6 + seed;
  }

  formatAudioTime(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  openTranscriptModal(): void {
    this.audio.playClick();
    this.isTranscriptOpen = true;
  }

  closeTranscriptModal(): void {
    this.audio.playClick();
    this.isTranscriptOpen = false;
  }
}
