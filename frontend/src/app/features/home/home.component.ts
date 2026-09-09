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
      <section class="cinematic-hero-section">
        <!-- Panoramic Background Image with Atmospheric Lighting -->
        <div class="hero-panoramic-backdrop">
          <img src="assets/images/saudi_panoramic_hero.jpg" alt="المملكة العربية السعودية" class="hero-bg-img" />
          <div class="hero-atmospheric-gradient"></div>
          <div class="hero-vignette-overlay"></div>
        </div>

        <div class="container hero-content-container">
          
          <!-- Unified Centered Hero Monument: Image and Details in the Center (مطابق تماماً لصورة المستخدم) -->
          <div class="hero-unified-center-monument">
            
            <!-- 1. Circular Profile Emblem with Overlapping Graduation Badge -->
            <div class="unified-avatar-wrapper">
              <div class="unified-avatar-circle">
                <img src="assets/images/profile.png" alt="أم رهام" class="unified-avatar-photo" />
              </div>
              <!-- Graduation Cap Badge on Bottom Left -->
              <div class="avatar-academic-badge" title="مستشار تعليمي معتمد">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="#DFC698" class="grad-cap-icon">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                </svg>
              </div>
            </div>

            <!-- 2. The Text Details Directly Below and Centered -->
            <div class="unified-hero-details">
              
              <!-- Name: ام رهام -->
              <h1 class="unified-brand-name">ام رهام</h1>

              <!-- Role: تعليم، مستشار تعليمي (نفس الصورة) -->
              <div class="unified-brand-role">تعليم، مستشار تعليمي</div>

              <!-- Slogan with Gold Glow -->
              <h2 class="cinematic-hero-slogan">
                معرفة تصنع الفرق، <span class="gold-slogan-accent">ودقة تبني الثقة.</span>
              </h2>

              <!-- Subtext Description -->
              <p class="cinematic-hero-subtext">
                منصة سعودية رائدة في الخدمات التعليمية والبحثية، نجمع بين الأصالة والمعرفة لنحول أفكارك إلى إنجازات حقيقية معتمدة بأعلى المعايير الأكاديمية.
              </p>

              <!-- Primary CTA WhatsApp Button & Fast Response -->
              <div class="hero-cta-group">
                <a 
                  href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85" 
                  target="_blank" 
                  class="btn-cinematic-whatsapp" 
                  (click)="onClick()">
                  <span>ابدأ طلبك عبر واتساب</span>
                  <span class="wa-icon-glow">💬</span>
                </a>
                <div class="response-speed-indicator">
                  <span class="bolt-icon">⚡</span>
                  <span>استجابة خلال دقائق</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================
           SCENE 03: عوالم أم رهام (REALMS OF UMM REHAM + DYNAMIC CITY & AUDIO CARDS)
           ========================================== -->
      <section class="realms-section-cinematic" id="realms-ecosystem">
        <div class="container">
          
          <!-- Section Top Bar -->
          <div class="realms-top-bar">
            <h2 class="realms-main-title">عوالم أم رهام</h2>
            <a href="#services-ecosystem" class="realms-explore-link">
              <span>استكشف جميع العوالم</span>
              <span class="explore-arrow">←</span>
            </a>
          </div>

          <!-- 7 Realms Carousel Slider -->
          <div class="realms-carousel-wrapper">
            <button type="button" class="carousel-nav-btn prev-btn" (click)="scrollRealms('prev')" title="السابق">
              <span>‹</span>
            </button>

            <div class="realms-cards-track" #realmsTrack>
              <div 
                class="realm-card-item" 
                *ngFor="let realm of realmsList"
                [class.active]="selectedRealmId === realm.id"
                (click)="onSelectRealm(realm)">
                <div class="realm-card-image-wrap">
                  <img [src]="realm.image" [alt]="realm.title" class="realm-card-img" />
                  <div class="realm-image-gradient"></div>
                  <div class="realm-card-number">{{ realm.number }}</div>
                </div>
                <div class="realm-card-info">
                  <h3 class="realm-card-title">{{ realm.title }}</h3>
                  <span class="realm-card-count">{{ realm.count }}</span>
                </div>
              </div>
            </div>

            <button type="button" class="carousel-nav-btn next-btn" (click)="scrollRealms('next')" title="التالي">
              <span>›</span>
            </button>
          </div>

          <!-- Dynamic 3-Card Ecosystem Grid -->
          <div class="dynamic-triad-grid">
            
            <!-- Card 1: Map & City Selector (أين تبدأ قصتك؟) -->
            <div class="triad-card map-selector-card">
              <div class="triad-card-head">
                <h3 class="triad-title">أين تبدأ قصتك؟</h3>
                <p class="triad-subtitle">اختر مدينتك واكتشف قصص عملائنا</p>
              </div>

              <div class="mini-holographic-map-box">
                <img src="assets/images/saudi_hologram_map.jpg" alt="خريطة السعودية" class="mini-map-img" />
                <!-- Glowing Interactive City Pins -->
                <button 
                  type="button" 
                  *ngFor="let city of citiesList"
                  class="map-city-pin" 
                  [class.active]="selectedCityId === city.id"
                  [style.top]="city.mapTop"
                  [style.right]="city.mapRight"
                  (click)="selectCity(city.id)"
                  [title]="city.name">
                  <span class="pin-pulse"></span>
                  <span class="pin-dot"></span>
                </button>
              </div>

              <div class="triad-city-picker-row">
                <select class="city-select-dropdown" [ngModel]="selectedCityId" (ngModelChange)="selectCity($event)">
                  <option *ngFor="let city of citiesList" [value]="city.id">{{ city.name }} ({{ city.region }})</option>
                </select>
                <button type="button" class="btn-triad-action" (click)="openCityDetails()">
                  <span>استكشف الآن</span>
                  <span class="action-arrow">←</span>
                </button>
              </div>
            </div>

            <!-- Card 2: Dynamic City Spotlight (الطائف / المدينة المختارة) -->
            <div class="triad-card city-spotlight-card">
              <div class="city-bg-image-wrap">
                <img [src]="activeCityData.image" [alt]="activeCityData.name" class="city-spotlight-img" />
                <div class="city-bg-gradient-overlay"></div>
              </div>
              <div class="city-spotlight-content">
                <div class="city-header-pill">
                  <h3 class="city-name-big">{{ activeCityData.name }}</h3>
                  <span class="city-region-tag">{{ activeCityData.region }}</span>
                </div>
                <div class="city-counter-box">
                  <span class="city-projects-num">{{ activeCityData.projectsCount }}</span>
                  <span class="city-projects-label">قصص نجاح حقيقية من مدينتك</span>
                </div>
                <button type="button" class="btn-view-city-stories" (click)="scrollToService(activeCityData.name)">
                  <span>مشاهدة القصص</span>
                  <span class="stories-arrow">←</span>
                </button>
              </div>
            </div>

            <!-- Card 3: Real Client Testimonial with Audio Player -->
            <div class="triad-card client-audio-testimonial-card">
              <div class="triad-card-head">
                <div class="head-tag-live">
                  <span class="live-pulse-dot"></span>
                  <span class="tag-text">قصة عميل حقيقي</span>
                </div>
              </div>

              <div class="client-profile-row">
                <div class="client-avatar-frame">
                  <img [src]="currentTestimonialData.avatar" [alt]="currentTestimonialData.clientName" class="client-avatar-img" />
                </div>
                <div class="client-meta-info">
                  <h4 class="client-city-role">{{ currentTestimonialData.location }} • {{ currentTestimonialData.role }}</h4>
                  <span class="client-service-tag">{{ currentTestimonialData.service }}</span>
                </div>
              </div>

              <blockquote class="client-quote-text">
                "{{ currentTestimonialData.quote }}"
              </blockquote>

              <!-- Interactive Audio Equalizer & Wave Player -->
              <div class="audio-player-widget">
                <button type="button" class="btn-audio-toggle" [class.playing]="isAudioPlaying" (click)="toggleAudioPlayer()">
                  <span class="audio-btn-icon">{{ isAudioPlaying ? '⏸' : '▶' }}</span>
                </button>

                <div class="audio-waveform-bar" [class.animating]="isAudioPlaying">
                  <span *ngFor="let bar of audioWaveBars; let i = index" class="wave-bar" [style.height.px]="getWaveHeight(i)"></span>
                </div>

                <span class="audio-time-display">{{ formatAudioTime(audioCurrentTime) }} / {{ formatAudioTime(audioDuration) }}</span>
              </div>

              <div class="transcript-link-row">
                <button type="button" class="link-read-transcript" (click)="openTranscriptModal()">اقرأ النص الكامل</button>
              </div>
            </div>

          </div>

      <!-- ==========================================
           SCENE: SMART PLATFORM APP SHOWCASE (تطبيق المنصة الذكي 3D التفاعلي)
           ========================================== -->
      <section class="smart-app-showcase-section" id="smart-app">
        <div class="smart-app-ambient-glow"></div>
        <div class="container">
          
          <!-- Section Header -->
          <div class="smart-app-header-block">
            <div class="app-tag-pill">
              <span>📱</span>
              <span>التحول الرقمي وتجربة الهاتف الذكي 3D</span>
            </div>
            <h2 class="app-section-title">
              تطبيق منصة أم رهام الذكي <span class="gold-gradient-text">3D التفاعلي</span>
            </h2>
            <p class="app-section-sub">
              واجهة تفاعلية ذكية تضع كافة الحلول الأكاديمية والبحثية بين يديك — تصفح الخدمات، اطلب فورياً، وتابع تقدم إنجازك بكل سلاسة وأمان
            </p>
          </div>

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

              <!-- Launch Smart App Button -->
              <div class="app-action-launch-box">
                <button type="button" class="btn-launch-smart-app" (click)="openPhoneModal()">
                  <span class="launch-icon">🚀</span>
                  <span>افتح تطبيق المنصة الذكي 3D الآن</span>
                  <span class="launch-arrow">←</span>
                </button>
                <span class="launch-hint-txt">💡 اضغط على الزر للدخول الفوري وتجربة الهاتف التفاعلي ثلاثي الأبعاد</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================
           SCENE 05: ACTIVE THEORY SPATIAL SIMULATOR & QUICK INTENT
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
           SCENE 06: HOW IT WORKS (THE 6-STEP WORKFLOW JOURNEY)
           ========================================== -->
      <section class="workflow-section section-padding bg-ivory-warm" id="workflow">
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
              <h4>1. نستقبل فكرتك</h4>
              <p>تواصل معنا وزودنا بمتطلبات طلبك أو فكرتك الأكاديمية والبحثية.</p>
            </div>

            <div class="timeline-step glass-panel">
              <div class="t-icon">👥</div>
              <div class="t-num">02</div>
              <h4>2. نفهم احتياجك</h4>
              <p>نقوم بدراسة المتطلبات الجامعية ووضع الخطة الزمنية والفنية للعمل.</p>
            </div>

            <div class="timeline-step glass-panel">
              <div class="t-icon">🎓</div>
              <div class="t-num">03</div>
              <h4>3. نختار المختص</h4>
              <p>توجيه طلبك إلى مستشار متخصص وحامل مؤهل علمي رفيع في مجالك.</p>
            </div>

            <div class="timeline-step glass-panel">
              <div class="t-icon">✍️</div>
              <div class="t-num">04</div>
              <h4>4. يبدأ العمل</h4>
              <p>تنفيذ العمل بأعلى معايير الدقة والتوثيق العلمي المعتمد بنظام APA.</p>
            </div>

            <div class="timeline-step glass-panel">
              <div class="t-icon">📋</div>
              <div class="t-num">05</div>
              <h4>5. مراجعة وتدقيق</h4>
              <p>فحص لغوي ونسبة اقتباس Turnitin 0% وتأكد من مطابقة شروط جامعتك.</p>
            </div>

            <div class="timeline-step glass-panel highlighted">
              <div class="t-icon">🎁</div>
              <div class="t-num">06</div>
              <h4>6. تسليم يليق بك</h4>
              <p>استلام العمل في الموعد المحدد مع دعم وتعديلات مجانية مستمرة.</p>
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
      <!-- Floating Welcome Coupon Capsule (Top Right) -->
      <div class="floating-welcome-gift-capsule" (click)="openDiscountModal()" title="اضغط للحصول على الخصم">
        <span class="gift-icon-bounce">🎁</span>
        <div class="gift-texts">
          <strong>خصم خاص</strong>
          <small>للمتواجدين الجدد</small>
        </div>
      </div>


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
              class="btn-video-wa">
              تواصل عبر واتساب فوراً 💬
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
              (click)="closeDiscountModal()">
              استخدم الكوبون في واتساب 💬
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

    </div>
  `,
  styles: [`
    .home-page-wrapper {
      position: relative;
    }

    /* ==========================================
       SCENE 01: CINEMATIC SOVEREIGN HERO (PANORAMIC)
       ========================================== */
    .cinematic-hero-section {
      min-height: 88vh;
      position: relative;
      display: flex;
      align-items: center;
      padding-top: 6.5rem;
      padding-bottom: 4rem;
      overflow: hidden;
    }

    .hero-panoramic-backdrop {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    }

    .hero-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      transform: scale(1.03);
      filter: saturate(1.15) brightness(0.85);
      animation: panoramicDrift 30s ease-in-out infinite alternate;
    }

    @keyframes panoramicDrift {
      0% { transform: scale(1.03) translate(0, 0); }
      100% { transform: scale(1.08) translate(-10px, -6px); }
    }

    .hero-atmospheric-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, 
        rgba(10, 47, 36, 0.45) 0%, 
        rgba(10, 47, 36, 0.72) 45%, 
        rgba(7, 26, 20, 0.95) 100%);
    }

    .hero-vignette-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 60% 40%, transparent 40%, rgba(0, 0, 0, 0.65) 100%);
    }

    .hero-content-container {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: calc(100vh - 6.5rem);
      width: 100%;
    }

    /* Unified Centered Hero Monument: Image and Details in Center (مطابق تماماً لصورة المستخدم) */
    .hero-unified-center-monument {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: auto;
      padding: 1.5rem 0 2rem 0;
      max-width: 820px;
      width: 100%;
      z-index: 2;
    }

    /* 1. Circular Avatar with Graduation Badge (Exactly matching user screenshot) */
    .unified-avatar-wrapper {
      position: relative;
      width: 210px;
      height: 210px;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .unified-avatar-circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #DFC698;
      box-shadow: 0 16px 45px rgba(0,0,0,0.7), 0 0 35px rgba(197, 168, 105, 0.4);
      background: #FFFFFF;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .unified-avatar-wrapper:hover .unified-avatar-circle {
      transform: scale(1.035);
      box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 45px rgba(197, 168, 105, 0.55);
    }

    .unified-avatar-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      display: block;
    }

    .avatar-academic-badge {
      position: absolute;
      bottom: 5px;
      left: 5px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #0A2F24;
      border: 2.5px solid #DFC698;
      box-shadow: 0 6px 18px rgba(0,0,0,0.65);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
      transition: transform 0.25s ease;
    }

    .unified-avatar-wrapper:hover .avatar-academic-badge {
      transform: scale(1.12);
    }

    .grad-cap-icon {
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
    }

    /* 2. Unified Hero Details */
    .unified-hero-details {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100%;
    }

    .unified-brand-name {
      font-family: 'Amiri', 'Playfair Display', serif;
      font-size: clamp(2.8rem, 5.2vw, 4.4rem);
      font-weight: 900;
      color: #FFFFFF;
      text-shadow: 0 4px 20px rgba(0,0,0,0.85), 0 0 35px rgba(197, 168, 105, 0.45);
      margin: 0 0 0.35rem 0;
      line-height: 1.15;
    }

    .unified-brand-role {
      font-size: clamp(1.15rem, 2vw, 1.45rem);
      font-weight: 700;
      color: #DFC698;
      margin-bottom: 0.9rem;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.65);
    }

    .cinematic-hero-slogan {
      font-size: clamp(1.3rem, 2.4vw, 1.95rem);
      font-weight: 700;
      color: #F4EEDD;
      margin: 0 0 1rem 0;
      line-height: 1.4;
      text-shadow: 0 2px 10px rgba(0,0,0,0.7);
    }

    .gold-slogan-accent {
      color: #DFC698;
      background: linear-gradient(135deg, #FFF0CF 0%, #DFC698 50%, #C5A869 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    .cinematic-hero-subtext {
      font-size: clamp(0.95rem, 1.2vw, 1.12rem);
      color: rgba(244, 238, 221, 0.92);
      line-height: 1.8;
      max-width: 660px;
      margin: 0 auto 1.8rem auto;
      text-align: center;
      text-shadow: 0 2px 8px rgba(0,0,0,0.8);
    }

    .hero-cta-group {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 1.25rem;
      flex-wrap: wrap;
      margin: 0 auto;
    }

    .btn-cinematic-whatsapp {
      background: linear-gradient(135deg, #25D366 0%, #1EBE5D 100%);
      color: #FFFFFF;
      padding: 0.9rem 2.2rem;
      border-radius: 9999px;
      font-weight: 800;
      font-size: 1.1rem;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4), 0 0 20px rgba(37, 211, 102, 0.25);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
      border: 1px solid rgba(255,255,255,0.25);
    }

    .btn-cinematic-whatsapp:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 16px 36px rgba(37, 211, 102, 0.55), 0 0 30px rgba(37, 211, 102, 0.4);
    }

    .wa-icon-glow {
      font-size: 1.35rem;
      filter: drop-shadow(0 0 6px rgba(255,255,255,0.7));
    }

    .response-speed-indicator {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: #DFC698;
      font-size: 0.9rem;
      font-weight: 700;
      text-shadow: 0 1px 6px rgba(0,0,0,0.7);
    }

    .bolt-icon {
      color: #FFE066;
      animation: boltPulse 1.8s infinite;
    }

    @keyframes boltPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.25); opacity: 0.75; }
    }

    /* ==========================================
       SCENE 02: عوالم أم رهام (REALMS & ECOSYSTEM)
       ========================================== */
    .realms-section-cinematic {
      padding: 4rem 0 5rem;
      background: #071A14;
      position: relative;
    }

    .realms-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.8rem;
    }

    .realms-main-title {
      font-family: 'Amiri', serif;
      font-size: clamp(2rem, 3.5vw, 2.5rem);
      font-weight: 800;
      color: #FFFFFF;
      margin: 0;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    .realms-explore-link {
      color: #DFC698;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.45rem;
      transition: color 0.2s;
    }

    .realms-explore-link:hover {
      color: #FFF0CF;
    }

    .realms-carousel-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 3.5rem;
    }

    .carousel-nav-btn {
      position: absolute;
      z-index: 10;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(13, 59, 46, 0.9);
      backdrop-filter: blur(10px);
      border: 1.5px solid rgba(197, 168, 105, 0.5);
      color: #DFC698;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 6px 18px rgba(0,0,0,0.4);
    }

    .carousel-nav-btn.prev-btn { left: -16px; }
    .carousel-nav-btn.next-btn { right: -16px; }

    .carousel-nav-btn:hover {
      background: #C5A869;
      color: #0A2F24;
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
      flex: 0 0 215px;
      background: rgba(13, 59, 46, 0.65);
      backdrop-filter: blur(12px);
      border: 1.5px solid rgba(197, 168, 105, 0.28);
      border-radius: 1.25rem;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    }

    .realm-card-item:hover, .realm-card-item.active {
      border-color: #DFC698;
      transform: translateY(-6px) scale(1.03);
      box-shadow: 0 16px 36px rgba(0,0,0,0.5), 0 0 20px rgba(197, 168, 105, 0.3);
      background: rgba(20, 70, 55, 0.85);
    }

    .realm-card-image-wrap {
      position: relative;
      height: 160px;
      overflow: hidden;
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
      background: linear-gradient(180deg, transparent 35%, rgba(7, 26, 20, 0.95) 100%);
    }

    .realm-card-number {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(10, 47, 36, 0.85);
      border: 1px solid #DFC698;
      color: #DFC698;
      font-weight: 800;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(8px);
    }

    .realm-card-info {
      padding: 1rem;
      text-align: right;
    }

    .realm-card-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0 0 0.3rem 0;
    }

    .realm-card-count {
      font-size: 0.82rem;
      color: #DFC698;
      font-weight: 600;
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
      padding: 5.5rem 0;
      background: linear-gradient(180deg, #071D16 0%, #0A2F24 50%, #071A14 100%);
      overflow: hidden;
      border-top: 1px solid rgba(197, 168, 105, 0.2);
      border-bottom: 1px solid rgba(197, 168, 105, 0.2);
    }

    .smart-app-ambient-glow {
      position: absolute;
      top: 30%;
      left: 15%;
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, rgba(197, 168, 105, 0.15) 0%, rgba(37, 211, 102, 0.08) 40%, transparent 70%);
      filter: blur(80px);
      pointer-events: none;
    }

    .smart-app-header-block {
      text-align: center;
      max-width: 820px;
      margin: 0 auto 3.5rem auto;
    }

    .app-tag-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(197, 168, 105, 0.14);
      border: 1px solid rgba(197, 168, 105, 0.4);
      border-radius: 9999px;
      padding: 0.38rem 1.15rem;
      color: #DFC698;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.1rem;
      backdrop-filter: blur(8px);
    }

    .app-section-title {
      font-family: 'Amiri', serif;
      font-size: clamp(2.1rem, 4vw, 3.2rem);
      font-weight: 900;
      color: #FFFFFF;
      margin-bottom: 1rem;
      line-height: 1.25;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }

    .app-section-sub {
      color: rgba(244, 238, 221, 0.88);
      font-size: 1.08rem;
      line-height: 1.8;
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
      border: 1.5px solid rgba(197, 168, 105, 0.45);
      background: rgba(10, 47, 36, 0.65);
      backdrop-filter: blur(14px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.65), 0 0 35px rgba(197, 168, 105, 0.25);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .phone-showcase-visual-card:hover {
      transform: translateY(-6px) scale(1.015);
      border-color: #DFC698;
      box-shadow: 0 25px 60px rgba(0,0,0,0.75), 0 0 45px rgba(197, 168, 105, 0.4);
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
      background: rgba(10, 47, 36, 0.94);
      border: 1px solid #DFC698;
      border-radius: 9999px;
      padding: 0.48rem 1.35rem;
      color: #FFF0CF;
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.55);
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
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(197, 168, 105, 0.25);
      border-radius: 16px;
      padding: 1.1rem 1.35rem;
      transition: all 0.3s ease;
    }

    .app-feat-item:hover {
      background: rgba(197, 168, 105, 0.08);
      border-color: rgba(197, 168, 105, 0.55);
      transform: translateX(-6px);
    }

    .feat-icon-box {
      font-size: 1.5rem;
      background: rgba(197, 168, 105, 0.15);
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid rgba(197, 168, 105, 0.3);
    }

    .feat-text-box h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1.05rem;
      font-weight: 800;
      color: #DFC698;
    }

    .feat-text-box p {
      margin: 0;
      font-size: 0.88rem;
      color: rgba(244, 238, 221, 0.85);
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
      background: rgba(10, 47, 36, 0.85);
      border: 1px solid rgba(197, 168, 105, 0.3);
      border-radius: 1.25rem;
      padding: 1rem 1.8rem;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .guarantee-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #F4EEDD;
      font-size: 0.86rem;
      font-weight: 600;
    }

    .guarantee-icon {
      font-size: 1.15rem;
    }

    .vision-item {
      flex-direction: column;
      align-items: flex-end;
      border-right: 1px solid rgba(197, 168, 105, 0.3);
      padding-right: 1rem;
    }

    .vision-logo-text {
      font-weight: 900;
      color: #DFC698;
      font-size: 0.95rem;
      letter-spacing: 1px;
    }

    .vision-sub {
      font-size: 0.7rem;
      color: rgba(244, 238, 221, 0.6);
    }

    /* ==========================================
       FLOATING ELEMENTS (OPTIMIZED & HARMONIZED)
       ========================================== */
    .floating-welcome-gift-capsule {
      position: fixed;
      bottom: 84px;
      right: 20px;
      z-index: 995;
      background: linear-gradient(135deg, rgba(13, 59, 46, 0.96) 0%, rgba(10, 47, 36, 0.96) 100%);
      border: 1.2px solid #DFC698;
      border-radius: 9999px;
      padding: 0.42rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.55rem;
      cursor: pointer;
      box-shadow: 0 8px 22px rgba(0,0,0,0.45), 0 0 15px rgba(197, 168, 105, 0.25);
      backdrop-filter: blur(14px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .floating-welcome-gift-capsule:hover {
      transform: scale(1.04) translateY(-2px);
      border-color: #FFE8B6;
      box-shadow: 0 12px 28px rgba(0,0,0,0.55), 0 0 20px rgba(197, 168, 105, 0.4);
    }

    .gift-icon-bounce {
      font-size: 1.2rem;
      animation: bounceGift 2s infinite ease-in-out;
    }

    @keyframes bounceGift {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    .gift-texts {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .gift-texts strong {
      color: #DFC698;
      font-size: 0.8rem;
      font-weight: 800;
      line-height: 1.2;
    }

    .gift-texts small {
      color: #FFFFFF;
      font-size: 0.68rem;
      line-height: 1.2;
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

  // "عوالم أم رهام" Realms State
  selectedRealmId = '01';
  realmsList = [
    { id: '01', number: '01', title: 'البحث والدراسات', count: '18 خدمة معتمدة', image: 'assets/images/saudi_researcher_testimonial.jpg', keyword: 'أبحاث' },
    { id: '02', number: '02', title: 'التعليم والأكاديميا', count: '14 مساراً علمياً', image: 'assets/images/reham_avatar.jpg', keyword: 'ماجستير' },
    { id: '03', number: '03', title: 'التقنية والبرمجة', count: '22 نظاماً وتقنية', image: 'assets/images/saud_3d.jpg', keyword: 'برمج' },
    { id: '04', number: '04', title: 'التصميم والعروض', count: '16 مساراً سينمائياً', image: 'assets/images/farah_3d.jpg', keyword: 'تصميم' },
    { id: '05', number: '05', title: 'العروض والتقارير', count: '12 تخصصاً تحليلياً', image: 'assets/images/saudi_hologram_map.jpg', keyword: 'عرض' },
    { id: '06', number: '06', title: 'المسار المهني و ATS', count: '8 خدمات وظيفية', image: 'assets/images/reham_profile_luxury.jpg', keyword: 'سيرة' },
    { id: '07', number: '07', title: 'المشاريع والتخرج', count: '25 مجالاً بحثياً', image: 'assets/images/saudi_panoramic_hero.jpg', keyword: 'تخرج' }
  ];

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
    const text = 'السلام عليكم ورحمة الله، أرغب بالاستفسار وطلب خدمة عبر تطبيق منصة أم رهام الذكي.';
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
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

  // "عوالم أم رهام" Realms Slider Methods
  scrollRealms(direction: 'prev' | 'next'): void {
    this.audio.playClick();
    if (this.realmsTrack && this.realmsTrack.nativeElement) {
      const el = this.realmsTrack.nativeElement;
      const scrollAmount = 260;
      el.scrollBy({ left: direction === 'next' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }

  onSelectRealm(realm: any): void {
    this.selectedRealmId = realm.id;
    this.audio.playClick();
    this.scrollToService(realm.keyword);
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
