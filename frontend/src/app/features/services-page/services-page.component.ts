import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService, ServiceItem, Category, ServiceTemplate } from '../../core/services/api.service';
import { AudioService } from '../../core/services/audio.service';
import { CartService } from '../../core/services/cart.service';
import { ServiceModalComponent } from '../../shared/components/service-modal/service-modal.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ServiceModalComponent],
  template: `
    <div class="services-experience-wrapper bg-ivory-warm" dir="rtl">
      
      <!-- ==========================================
           STORE & SERVICES HERO HEADER
           ========================================== -->
      <section class="store-hero-header">
        <div class="container">
          <div class="store-hero-content">
            <span class="store-pill-tag">🏛️ المتجر الأكاديمي والخدمي المعتمد</span>
            <h1 class="store-main-title">
              متجر خدمات 
              <span class="gold-gradient-text">أم رهام</span>
            </h1>
            <p class="store-sub-desc">
              تصفح كافة الخدمات والأنظمة والنماذج المتاحة. اختر النموذج المناسب لك، حدد الكمية، واطلب فورياً مع ضمان 
              <strong class="guarantee-highlight">الدفع بعد الإنجاز 🛡️</strong>
            </p>

            <!-- Live Search Bar -->
            <div class="store-search-box">
              <span class="search-icon">🔍</span>
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                placeholder="ابحث عن خدمة (سيرة ذاتية، بوربوينت، حساب المواطن، عقد إيجار، إكسل...)" 
                class="search-input"
                (input)="onSearchChange()" />
              <button *ngIf="searchQuery" class="clear-search-btn" (click)="clearSearch()">✕</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           MAIN SERVICES CATALOG
           ========================================== -->
      <section class="services-catalog-section">
        <div class="container">
          
          <!-- Category Filters Row (5 Clear Tabs) -->
          <div class="category-filters-container">
            <div class="category-filters-row">
              
              <!-- 1. الجميع -->
              <button 
                class="cat-filter-btn" 
                [class.active]="selectedCategorySlug === 'all'"
                (click)="filterCategory('all')">
                <span>✨ الجميع</span>
                <span class="badge-count">({{ services.length }})</span>
              </button>

              <!-- Dynamic Categories -->
              <button 
                *ngFor="let cat of categories"
                class="cat-filter-btn"
                [class.active]="selectedCategorySlug === cat.slug"
                (click)="filterCategory(cat.slug)">
                <span>{{ getCategoryIcon(cat.slug) }} {{ cat.nameAr }}</span>
                <span class="badge-count">({{ countByCategory(cat.slug) }})</span>
              </button>

            </div>
          </div>

          <!-- Services Results Count & Filter Notice -->
          <div class="catalog-info-bar">
            <span class="results-count">
              عرض <strong>{{ filteredServices.length }}</strong> خدمة متاحة
            </span>

            <!-- View Mode Switcher: Carousel vs Grid -->
            <div class="view-mode-toggle">
              <button 
                type="button" 
                class="btn-toggle-mode" 
                [class.active]="viewMode === 'slider'" 
                (click)="setViewMode('slider')" 
                title="عرض شريطي أفقي">
                <span>↔ سلايدر</span>
              </button>
              <button 
                type="button" 
                class="btn-toggle-mode" 
                [class.active]="viewMode === 'grid'" 
                (click)="setViewMode('grid')" 
                title="عرض شبكي رأسي مناسب للهاتف">
                <span>⊞ شبكة</span>
              </button>
            </div>

            <span class="payment-note-badge">
              🛡️ جميع الخدمات: الدفع بعد الإنجاز والاستلام
            </span>
          </div>

          <!-- Services Showcase Slider & Grid Wrapper -->
          <div class="services-showcase-wrapper" [class.grid-active]="viewMode === 'grid'">

            <!-- Right Arrow (السابق - يمين) - only in slider mode -->
            <button 
              *ngIf="viewMode === 'slider'"
              type="button" 
              class="svc-carousel-arrow arrow-right" 
              (click)="scrollServicesCarousel('prev')" 
              title="الخدمة السابقة (يمين)" 
              aria-label="الخدمة السابقة">
              <span>›</span>
            </button>

            <!-- Left Arrow (التالي - يسار) - only in slider mode -->
            <button 
              *ngIf="viewMode === 'slider'"
              type="button" 
              class="svc-carousel-arrow arrow-left" 
              (click)="scrollServicesCarousel('next')" 
              title="الخدمة التالية (يسار)" 
              aria-label="الخدمة التالية">
              <span>‹</span>
            </button>

            <!-- Horizontal Track or Grid Layout -->
            <div [ngClass]="viewMode === 'slider' ? 'services-horizontal-track' : 'services-grid-layout'" 
                 #servicesTrack 
                 (scroll)="viewMode === 'slider' ? onServicesTrackScroll() : null">
              <div 
                *ngFor="let s of filteredServices; let idx = index" 
                class="service-luxury-card"
                [class.prominent-card]="idx === activeCardIndex"
                (mouseenter)="activeCardIndex = idx"
                (click)="activeCardIndex = idx">
              
              <!-- Card Header -->
              <div class="card-header-row">
                <div class="card-icon-emblem">
                  <span>{{ s.iconSvg || getServiceIcon(s.nameAr) }}</span>
                </div>
                <div class="card-badges-group">
                  <span class="service-category-badge">{{ s.categoryNameAr }}</span>
                  <button 
                    type="button"
                    class="btn-favorite-heart" 
                    [class.favorited]="cart.isFavorite(s.id)"
                    (click)="cart.toggleFavorite(s.id)"
                    [title]="cart.isFavorite(s.id) ? 'إزالة من المفضلة' : 'إضافة للمفضلة'">
                    {{ cart.isFavorite(s.id) ? '❤️' : '🤍' }}
                  </button>
                </div>
              </div>

              <!-- Card Body -->
              <div class="card-body">
                <h3 class="service-title" (click)="openModal(s)">{{ s.nameAr }}</h3>
                <p class="service-excerpt">{{ s.shortDescriptionAr }}</p>

                <!-- ==========================================
                     MULTI-TEMPLATE SELECTOR (If templates exist)
                     ========================================== -->
                <div class="templates-section-wrapper" *ngIf="s.templates && s.templates.length > 0">
                  <div class="templates-header-row">
                    <span class="tpl-head-lbl">🎨 نماذج وتصاميم الخدمة (اختر نموذجك):</span>
                    <span class="tpl-count-tag">{{ s.templates.length }} نماذج</span>
                  </div>

                  <!-- Template Selector Pills -->
                  <div class="template-pills-row">
                    <button 
                      *ngFor="let tpl of s.templates"
                      type="button"
                      class="tpl-pill-btn"
                      [class.active]="isTemplateSelected(s.id, tpl)"
                      (click)="selectTemplate(s.id, tpl)">
                      <span class="pill-code">{{ tpl.code }}</span>
                      <span class="pill-name">{{ tpl.nameAr }}</span>
                      <span class="pill-price">{{ tpl.price }} ر.س</span>
                      <span class="pill-pop-tag" *ngIf="tpl.isPopular">الأكثر طلباً ⭐</span>
                    </button>
                  </div>

                  <!-- Active Template Preview Callout -->
                  <div class="active-template-callout" *ngIf="getSelectedTemplate(s)">
                    <div class="callout-top">
                      <span class="callout-code">النموذج المختار: {{ getSelectedTemplate(s)!.code }}</span>
                      <span class="callout-price">{{ getSelectedTemplate(s)!.price }} ر.س</span>
                    </div>
                    <p class="callout-desc" *ngIf="getSelectedTemplate(s)!.descriptionAr">
                      {{ getSelectedTemplate(s)!.descriptionAr }}
                    </p>
                  </div>
                </div>

                <!-- Features Checklist for General or Non-Template Services -->
                <ul class="service-feature-checklist" *ngIf="!s.templates || s.templates.length === 0">
                  <li *ngFor="let feat of getServiceFeatures(s.nameAr)">
                    <span class="check-icon">✓</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <!-- Card Footer Action & Pricing -->
              <div class="card-footer-action">
                
                <!-- Price Box -->
                <div class="price-box">
                  <small>السعر:</small>
                  
                  <!-- If has template selected -->
                  <strong *ngIf="s.templates && s.templates.length > 0 && getSelectedTemplate(s)" class="gold-gradient-text price-main">
                    {{ getSelectedTemplate(s)!.price }} ر.س
                  </strong>

                  <!-- If fixed price -->
                  <strong *ngIf="(!s.templates || s.templates.length === 0) && (s.priceFixed || s.priceType === 'fixed')" class="gold-gradient-text price-main">
                    {{ s.priceFixed || s.priceMin }} ر.س
                  </strong>

                  <!-- If quote based -->
                  <div *ngIf="s.priceType === 'quote'" class="quote-notice-tag">
                    <span>السعر يحدد حسب الطلب</span>
                  </div>

                  <!-- If range -->
                  <strong *ngIf="s.priceType === 'range' && !s.priceFixed" class="gold-gradient-text price-main">
                    {{ s.priceMin }} - {{ s.priceMax }} ر.س
                  </strong>
                </div>

                <!-- Quantity Stepper (+ and -) -->
                <div class="card-qty-stepper">
                  <button type="button" class="btn-step" (click)="updateCardQty(s.id, -1)" title="تقليل الكمية">−</button>
                  <span class="step-val">{{ getCardQty(s.id) }}</span>
                  <button type="button" class="btn-step" (click)="updateCardQty(s.id, 1)" title="زيادة الكمية">+</button>
                </div>

              </div>

              <!-- Buttons Actions Row -->
              <div class="card-buttons-row">
                
                <!-- If Quote Based: Request Quote Button -->
                <button 
                  *ngIf="s.priceType === 'quote'"
                  type="button" 
                  class="btn-request-quote"
                  (click)="orderQuoteViaWhatsApp(s)">
                  <span>« اطلب تسعيرة »</span>
                  <span class="btn-arr">💬</span>
                </button>

                <!-- If Fixed or Has Templates: Add To Cart Button -->
                <button 
                  *ngIf="s.priceType !== 'quote'"
                  type="button" 
                  class="btn-add-cart"
                  (click)="addCardToCart(s)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <span>إضافة للسلة</span>
                </button>

                <!-- Bouncing Direct WhatsApp Button -->
                <button 
                  type="button"
                  class="btn-card-whatsapp"
                  [class.bounce-active]="isBouncing(s.id)"
                  (click)="orderDirectViaWhatsApp(s)"
                  title="طلب فوري عبر واتساب (الدفع بعد الإنجاز)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  <span>واتساب</span>
                </button>

                <!-- Details link -->
                <button type="button" class="btn-card-details" (click)="openModal(s)" title="تفاصيل وضمانات">
                  <span>تفاصيل</span>
                </button>

              </div>

            </div>
            </div>

            <!-- Bottom Counter & Dots Indicator (Only in Slider Mode) -->
            <div class="services-slider-nav-footer" *ngIf="viewMode === 'slider' && filteredServices.length > 1">
              <div class="mob-slider-controls">
                <button type="button" class="btn-mob-svc-nav" (click)="scrollServicesCarousel('prev')" aria-label="السابق">‹ السابق</button>
                <span class="svc-counter-pill">
                  الخدمة <strong>{{ activeCardIndex + 1 }}</strong> من <strong>{{ filteredServices.length }}</strong>
                </span>
                <button type="button" class="btn-mob-svc-nav" (click)="scrollServicesCarousel('next')" aria-label="التالي">التالي ›</button>
              </div>
              <div class="svc-dots-bar">
                <button 
                  *ngFor="let s of filteredServices; let idx = index"
                  type="button"
                  class="svc-dot" 
                  [class.active]="idx === activeCardIndex"
                  (click)="scrollToCardIndex(idx)"
                  [title]="s.nameAr">
                </button>
              </div>
            </div>

          </div>

          <!-- Empty search result fallback -->
          <div class="empty-search-fallback" *ngIf="filteredServices.length === 0">
            <span class="fallback-icon">🔍</span>
            <h3>لم يتم العثور على خدمات مطابقة للبحث</h3>
            <p>جرب البحث بكلمات أخرى أو اختر أحد التصنيفات أعلاه.</p>
            <button class="btn-reset-filters" (click)="clearFilters()">عرض جميع الخدمات</button>
          </div>

        </div>
      </section>

      <!-- ==========================================
           MODAL COMPONENT
           ========================================== -->
      <app-service-modal [service]="activeService" (closeEvent)="activeService = null"></app-service-modal>

      <!-- Floating Cart / Order Trigger -->
      <aside class="floating-mobile-whatsapp" *ngIf="cart.totalCount() > 0" (click)="cart.openCart()" title="استعراض سلة الطلبات">
        <div class="mobile-float-inner">
          <div class="float-icon-combo" style="position: relative; display: flex; align-items: center; gap: 4px; color: #DFC698;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1.5"></circle>
              <circle cx="20" cy="21" r="1.5"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="float-badge">{{ cart.totalCount() }}</span>
          </div>
          <span class="float-txt">سلتك ({{ cart.totalPrice() }} ر.س) • الدفع بعد الإنجاز 🛡️</span>
          <span class="float-cta">متابعة السلة ←</span>
        </div>
      </aside>

    </div>
  `,
  styles: [`
    .services-experience-wrapper {
      min-height: 100vh;
      padding-top: 1.5rem;
      font-family: var(--font-family-arabic) !important;
    }

    /* Hero Header */
    .store-hero-header {
      background: linear-gradient(180deg, rgba(10, 47, 36, 0.08) 0%, rgba(245, 241, 232, 0.4) 100%);
      padding: 2.5rem 0 1.8rem;
      border-bottom: 1.5px solid rgba(197, 168, 105, 0.25);
    }

    .store-hero-content {
      text-align: center;
      max-width: 820px;
      margin: 0 auto;
    }

    .store-pill-tag {
      display: inline-block;
      padding: 0.35rem 1rem;
      background: rgba(197, 168, 105, 0.2);
      border: 1px solid rgba(197, 168, 105, 0.4);
      color: #8C6D2D;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .store-main-title {
      font-size: 2.2rem;
      font-weight: 900;
      color: #0A2F24;
      margin-bottom: 0.8rem;
      line-height: 1.3;
    }

    .store-sub-desc {
      color: #485A53;
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .guarantee-highlight {
      color: #059669;
      font-weight: 800;
    }

    /* Live Search Box */
    .store-search-box {
      position: relative;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      right: 1.2rem;
      font-size: 1.1rem;
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 0.95rem 3.2rem 0.95rem 2.8rem;
      border-radius: var(--radius-full);
      border: 2px solid rgba(197, 168, 105, 0.5);
      background: #FFFFFF;
      font-family: var(--font-family-arabic);
      font-size: 0.95rem;
      color: #0F281C;
      box-shadow: 0 6px 25px rgba(10, 47, 36, 0.08);
      outline: none;
      transition: all 0.25s ease;
    }

    .search-input:focus {
      border-color: #0A2F24;
      box-shadow: 0 8px 30px rgba(10, 47, 36, 0.15);
    }

    .clear-search-btn {
      position: absolute;
      left: 1.2rem;
      background: #E2E8F0;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Section Catalog */
    .services-catalog-section {
      padding: 2rem 0 5rem;
    }

    /* Category Filters */
    .category-filters-container {
      display: flex;
      justify-content: center;
      margin-bottom: 1.8rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .category-filters-row {
      display: inline-flex;
      flex-wrap: nowrap;
      gap: 0.55rem;
      background: #FFFFFF;
      padding: 0.45rem;
      border-radius: var(--radius-full);
      border: 1.5px solid rgba(197, 168, 105, 0.35);
      box-shadow: 0 6px 20px rgba(10, 47, 36, 0.06);
    }

    .cat-filter-btn {
      padding: 0.65rem 1.3rem;
      border-radius: var(--radius-full);
      background: transparent;
      border: none;
      color: #485A53;
      font-family: var(--font-family-arabic);
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 0.45rem;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover:not(.active) {
        color: var(--theme-heading, #0A2F24);
        background: #FAF7F2;
        transform: translateY(-2px);
      }

      &.active {
        background: var(--theme-cta-bg, linear-gradient(135deg, #0A2F24 0%, #051A14 100%));
        color: var(--theme-cta-text, #FFFFFF);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(-1px);
      }
    }

    .badge-count {
      font-size: 0.75rem;
      opacity: 0.9;
      font-weight: 800;
    }

    /* Catalog Info Bar */
    .catalog-info-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.8rem;
      padding: 0.75rem 1.25rem;
      background: rgba(255, 255, 255, 0.85);
      border-radius: var(--radius-md);
      border: 1px solid rgba(197, 168, 105, 0.25);
      box-shadow: 0 4px 15px rgba(10, 47, 36, 0.03);
    }

    .results-count {
      font-size: 0.88rem;
      color: #485A53;
    }

    .payment-note-badge {
      font-size: 0.82rem;
      color: #065F46;
      background: #ECFDF5;
      padding: 0.3rem 0.85rem;
      border-radius: var(--radius-full);
      font-weight: 700;
      border: 1px solid #A7F3D0;
    }

    /* View Mode Switcher (Slider vs Grid) */
    .view-mode-toggle {
      display: inline-flex;
      background: #F1F5F9;
      padding: 3px;
      border-radius: var(--radius-full);
      border: 1px solid rgba(0, 0, 0, 0.08);

      .btn-toggle-mode {
        border: none;
        background: transparent;
        color: #64748B;
        font-weight: 700;
        font-size: 0.82rem;
        padding: 0.35rem 0.95rem;
        border-radius: var(--radius-full);
        cursor: pointer;
        transition: all 0.2s ease;

        &.active {
          background: #0A2F24;
          color: #E5B94F;
          box-shadow: 0 2px 8px rgba(10, 47, 36, 0.15);
        }
      }
    }

    /* Grid Layout for clean vertical scrolling */
    .services-grid-layout {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
      margin: 1.25rem 0 3rem;
      width: 100%;
      box-sizing: border-box;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }

      .service-luxury-card {
        flex: none !important;
        width: 100% !important;
        max-width: 100% !important;
      }
    }

    /* Mobile Slider Controls below the cards */
    .mob-slider-controls {
      display: none;
      align-items: center;
      gap: 1rem;

      @media (max-width: 768px) {
        display: flex;
      }

      .btn-mob-svc-nav {
        background: #FFFFFF;
        border: 1.5px solid rgba(197, 168, 105, 0.4);
        color: #0A2F24;
        padding: 0.4rem 0.9rem;
        border-radius: var(--radius-full);
        font-size: 0.82rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      }
    }

    @media (max-width: 768px) {
      .svc-carousel-arrow {
        display: none !important;
      }
      .services-showcase-wrapper {
        padding: 0 !important;
      }
      .services-horizontal-track {
        padding: 1rem 0.75rem 1.5rem !important;
        gap: 1rem !important;
      }
      .services-horizontal-track .service-luxury-card {
        flex: 0 0 calc(100vw - 3.5rem) !important;
        max-width: 360px !important;
        margin: 0 auto;
      }
    }

    /* Services Showcase Horizontal Carousel (يمين ويسار بدون تداخل) */
    .services-showcase-wrapper {
      position: relative;
      width: 100%;
      margin: 1rem 0 2.5rem;
      padding: 0 44px;
      box-sizing: border-box;

      @media (max-width: 768px) {
        padding: 0;
      }
    }

    .services-horizontal-track {
      display: flex;
      gap: 1.5rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      padding: 1.25rem 0.25rem 1.75rem;
      width: 100%;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .services-horizontal-track .service-luxury-card {
      flex: 0 0 380px;
      max-width: 100%;
      scroll-snap-align: center;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      box-sizing: border-box;
      border-radius: 20px;

      @media (max-width: 768px) {
        flex: 0 0 85vw;
          max-width: 85vw;
      }
    }

    /* Prominent Card Effect (وتكون الي تظهر تكون بارزه) */
    .services-horizontal-track .service-luxury-card.prominent-card {
      border: 2px solid var(--theme-accent, #C5A869) !important;
      box-shadow: 0 20px 48px rgba(10, 47, 36, 0.18), 0 0 24px rgba(197, 168, 105, 0.28) !important;
      transform: scale(1.02);
      background: #FFFFFF;

      &::before {
        opacity: 1 !important;
        height: 4.5px !important;
      }

      .card-icon-emblem {
        transform: scale(1.1);
        border-color: var(--theme-accent, #C5A869);
        box-shadow: 0 4px 15px rgba(197, 168, 105, 0.35);
      }
    }

    /* Showcase Arrows (أسهم خارجية نظيفة تماماً تطابق صورة أفضل الجامعات) */
    .svc-carousel-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 30;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #FFFFFF;
      color: var(--theme-primary, #0A2F24);
      border: 1.5px solid rgba(0, 0, 0, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.5rem;
      line-height: 1;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      &:hover {
        transform: translateY(-50%) scale(1.1);
        background: var(--theme-primary, #0A2F24);
        color: var(--theme-accent, #E5B94F);
        border-color: var(--theme-accent, #E5B94F);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }

      &.arrow-right {
        right: 0px;
      }

      &.arrow-left {
        left: 0px;
      }

      @media (max-width: 768px) {
        width: 32px;
        height: 32px;
        font-size: 1.25rem;
        &.arrow-right { right: 0px; }
        &.arrow-left { left: 0px; }
      }
    }

    /* Slider Footer & Dots */
    .services-slider-nav-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.65rem;
      margin-top: 0.5rem;
    }

    .svc-counter-pill {
      font-size: 0.84rem;
      font-weight: 700;
      color: #0A2F24;
      background: rgba(197, 168, 105, 0.15);
      padding: 0.25rem 0.9rem;
      border-radius: 9999px;
      border: 1px solid rgba(197, 168, 105, 0.35);
    }

    .svc-dots-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      max-width: 90vw;
      overflow-x: auto;
      padding: 4px;
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    }

    .svc-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #CBD5E1;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: all 0.25s;

      &.active {
        width: 24px;
        border-radius: 9999px;
        background: var(--theme-accent, #0F5132);
        box-shadow: 0 0 8px rgba(15, 81, 50, 0.4);
      }
    }

    /* Curated Services Grid */
    .services-curated-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.85rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.35rem;
      }
    }

    /* Luxury Card */
    .service-luxury-card {
      padding: 1.8rem;
      border-radius: 20px;
      border: 1.5px solid var(--theme-card-border, rgba(197, 168, 105, 0.3));
      background: #FFFFFF;
      box-shadow: 0 8px 30px rgba(10, 47, 36, 0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

      /* Top Glowing Accent Line on Hover */
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3.5px;
        background: var(--theme-cta-bg, linear-gradient(135deg, #C5A869 0%, #0F5132 100%));
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: translateY(-6px);
        border-color: var(--theme-accent, #C5A869);
        box-shadow: 0 20px 45px rgba(10, 47, 36, 0.12), 0 0 15px rgba(197, 168, 105, 0.12);

        &::before {
          opacity: 1;
        }

        .card-icon-emblem {
          transform: scale(1.1) rotate(4deg);
          border-color: var(--theme-accent, #C5A869);
        }
      }
    }

    .card-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .card-icon-emblem {
      width: 50px;
      height: 50px;
      border-radius: 14px;
      background: linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%);
      border: 1.5px solid rgba(197, 168, 105, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.65rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    }

    .card-badges-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .service-category-badge {
      font-size: 0.75rem;
      background: rgba(197, 168, 105, 0.18);
      color: #8C6D2D;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      font-weight: 700;
      border: 1px solid rgba(197, 168, 105, 0.35);
    }

    .btn-favorite-heart {
      background: transparent;
      border: 1px solid #E2E8F0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
      transition: all 0.2s;
    }

    .btn-favorite-heart:hover, .btn-favorite-heart.favorited {
      border-color: #EF4444;
      background: #FEF2F2;
    }

    .service-title {
      font-size: 1.25rem;
      color: #0A2F24;
      font-weight: 800;
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: color 0.2s;
    }

    .service-title:hover {
      color: #C5A869;
    }

    .service-excerpt {
      color: #485A53;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    /* Multi-Template Section */
    .templates-section-wrapper {
      background: #FAF7F2;
      border: 1.5px solid #EBE4D5;
      border-radius: var(--radius-md);
      padding: 0.9rem;
      margin-bottom: 1.2rem;
    }

    .templates-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.6rem;
    }

    .tpl-head-lbl {
      font-size: 0.8rem;
      font-weight: 800;
      color: #0A2F24;
    }

    .tpl-count-tag {
      font-size: 0.7rem;
      background: #E5DFC8;
      color: #5C4A1E;
      padding: 1px 7px;
      border-radius: var(--radius-full);
      font-weight: 700;
    }

    .template-pills-row {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      max-height: 170px;
      overflow-y: auto;
      padding-left: 3px;
    }

    .tpl-pill-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      padding: 0.45rem 0.75rem;
      background: #FFFFFF;
      border: 1.5px solid #E2D9C8;
      border-radius: 8px;
      font-family: var(--font-family-arabic);
      font-size: 0.8rem;
      text-align: right;
      cursor: pointer;
      transition: all 0.2s;
    }

    .tpl-pill-btn:hover {
      border-color: #C5A869;
      background: #FFFDF9;
    }

    .tpl-pill-btn.active {
      background: var(--theme-cta-bg, linear-gradient(135deg, #0A2F24 0%, #0D3B2E 100%));
      color: var(--theme-cta-text, #FFFFFF);
      border-color: var(--theme-accent, #C5A869);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    }

    .tpl-pill-btn.active .pill-code {
      background: var(--theme-badge-bg, rgba(255, 255, 255, 0.2));
      color: var(--theme-cta-text, #FFFFFF);
      border-color: transparent;
    }

    .tpl-pill-btn.active .pill-name {
      color: var(--theme-cta-text, #FFFFFF);
    }

    .tpl-pill-btn.active .pill-price {
      color: var(--theme-cta-text, #FFFFFF);
      font-weight: 800;
    }

    .pill-code {
      background: #FAF7F2;
      border: 1px solid #D5CCBC;
      color: #0A2F24;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 800;
      white-space: nowrap;
    }

    .pill-name {
      flex: 1;
      font-weight: 700;
      color: #2D3748;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pill-price {
      font-weight: 800;
      color: #0A2F24;
      white-space: nowrap;
    }

    .pill-pop-tag {
      background: #FEF3C7;
      color: #92400E;
      font-size: 0.65rem;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: var(--radius-full);
      white-space: nowrap;
    }

    .active-template-callout {
      margin-top: 0.6rem;
      padding: 0.5rem 0.75rem;
      background: #FFFFFF;
      border-radius: 6px;
      border-right: 3px solid #C5A869;
    }

    .callout-top {
      display: flex;
      justify-content: space-between;
      font-size: 0.78rem;
      font-weight: 700;
      color: #0A2F24;
    }

    .callout-desc {
      font-size: 0.74rem;
      color: #64748B;
      margin: 0.2rem 0 0;
      line-height: 1.4;
    }

    /* Features Checklist */
    .service-feature-checklist {
      list-style: none;
      padding: 0;
      margin: 0 0 1.2rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .service-feature-checklist li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.84rem;
      color: #2D3748;
    }

    .check-icon {
      color: #059669;
      font-weight: 900;
      font-size: 0.85rem;
    }

    /* Card Footer Action */
    .card-footer-action {
      border-top: 1.5px solid #F1ECE1;
      padding: 0.9rem 0 0.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .price-box small {
      display: block;
      font-size: 0.7rem;
      color: #64748B;
    }

    .price-main {
      font-size: 1.2rem;
      font-weight: 900;
      color: var(--theme-accent, #C5A869);
    }

    .quote-notice-tag {
      background: rgba(197, 168, 105, 0.18);
      color: #8C6D2D;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.78rem;
      font-weight: 700;
      border: 1px solid rgba(197, 168, 105, 0.4);
    }

    /* Quantity Stepper */
    .card-qty-stepper {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      background: #FAF7F2;
      border: 1.5px solid #D5CCBC;
      border-radius: var(--radius-full);
      padding: 2px 6px;
    }

    .btn-step {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: #FFFFFF;
      color: #0A2F24;
      font-size: 1rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-step:hover {
      background: #0A2F24;
      color: #FFFFFF;
    }

    .step-val {
      min-width: 24px;
      text-align: center;
      font-weight: 800;
      font-size: 0.95rem;
      color: #0A2F24;
    }

    /* Buttons Row */
    .card-buttons-row {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      margin-top: 0.6rem;
    }

    .btn-request-quote {
      flex: 1.6;
      padding: 0.72rem 1rem;
      border-radius: 12px;
      background: var(--theme-cta-bg, linear-gradient(135deg, #0A2F24 0%, #051A14 100%));
      color: var(--theme-cta-text, #FFFFFF);
      border: none;
      font-family: var(--font-family-arabic);
      font-size: 0.86rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-request-quote:hover {
      filter: brightness(1.1);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }

    .btn-add-cart {
      flex: 1.6;
      padding: 0.72rem 1rem;
      border-radius: 12px;
      background: var(--theme-primary, #0A2F24);
      color: var(--theme-accent, #E5B94F);
      border: 1.5px solid var(--theme-accent, #E5B94F);
      font-family: var(--font-family-arabic);
      font-size: 0.86rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-add-cart:hover {
      filter: brightness(1.1);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }

    .btn-card-whatsapp {
      flex: 1;
      padding: 0.72rem 0.85rem;
      border-radius: 12px;
      background: #25D366;
      color: #FFFFFF;
      border: none;
      font-family: var(--font-family-arabic);
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      box-shadow: 0 3px 12px rgba(37, 211, 102, 0.3);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-card-whatsapp:hover {
      background: #128C7E;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45);
    }

    /* Bouncing WhatsApp Effect */
    .btn-card-whatsapp.bounce-active {
      animation: whatsappLeap 0.7s cubic-bezier(0.28, 0.84, 0.42, 1) 3;
    }

    @keyframes whatsappLeap {
      0%, 100% { transform: translateY(0) scale(1); }
      30% { transform: translateY(-8px) scale(1.1); box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6); }
      50% { transform: translateY(2px) scale(0.95); }
      70% { transform: translateY(-4px) scale(1.05); }
    }

    .btn-card-details {
      padding: 0.72rem 0.9rem;
      border-radius: 12px;
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
      color: #475569;
      font-family: var(--font-family-arabic);
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-card-details:hover {
      background: #FFFFFF;
      border-color: var(--theme-accent, #C5A869);
      color: var(--theme-heading, #0A2F24);
      transform: translateY(-2px);
    }

    /* Empty fallback */
    .empty-search-fallback {
      text-align: center;
      padding: 4rem 1.5rem;
      background: #FFFFFF;
      border-radius: var(--radius-lg);
      border: 1.5px dashed #D5CCBC;
      margin-top: 2rem;
    }

    .fallback-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 0.8rem;
    }

    .btn-reset-filters {
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-full);
      background: var(--theme-cta-bg, #0A2F24);
      color: var(--theme-cta-text, #FFFFFF);
      border: none;
      font-family: var(--font-family-arabic);
      font-weight: 700;
      cursor: pointer;
    }

    /* Floating Mobile Cart Bar */
    .floating-mobile-whatsapp {
      position: fixed;
      bottom: 1.2rem;
      left: 1rem;
      right: 1rem;
      z-index: 990;
      background: var(--theme-footer-bg, linear-gradient(135deg, #0A2F24 0%, #051A14 100%));
      color: #FFFFFF;
      border: 2px solid var(--theme-footer-border, #C5A869);
      border-radius: var(--radius-full);
      padding: 0.85rem 1.3rem;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
      cursor: pointer;
      animation: slideUp 0.3s ease;
    }

    .mobile-float-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6rem;
    }

    .float-badge {
      background: #EF4444;
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 800;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .float-txt {
      font-size: 0.88rem;
      font-weight: 700;
      color: #F8F5EE;
    }

    .float-cta {
      font-size: 0.85rem;
      font-weight: 800;
      color: #DFC698;
    }

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    /* Responsive for Mobile & iPhone */
    @media (max-width: 768px) {
      .store-main-title {
        font-size: 1.65rem;
      }
      .services-curated-grid {
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }
      .service-luxury-card {
        padding: 1.3rem;
      }
      .category-filters-container {
        justify-content: flex-start;
      }
      .cat-filter-btn {
        padding: 0.5rem 0.9rem;
        font-size: 0.8rem;
      }
      .card-buttons-row {
        flex-wrap: wrap;
      }
      .btn-add-cart, .btn-request-quote {
        flex: 2;
      }
      .btn-card-whatsapp {
        flex: 1.5;
      }
    }
  `]
})
export class ServicesPageComponent implements OnInit {
  private api = inject(ApiService);
  private audio = inject(AudioService);
  private route = inject(ActivatedRoute);
  cart = inject(CartService);

  services: ServiceItem[] = [];
  categories: Category[] = [];
  selectedCategorySlug = 'all';
  searchQuery = '';
  activeService: ServiceItem | null = null;
  @ViewChild('servicesTrack') servicesTrackRef?: ElementRef<HTMLDivElement>;
  activeCardIndex = 0;
  viewMode: 'slider' | 'grid' = 'slider';
  whatsappNumber: string = '966572651058';

  setViewMode(mode: 'slider' | 'grid'): void {
    this.viewMode = mode;
    this.audio.playClick();
  }

  scrollServicesCarousel(dir: 'next' | 'prev'): void {
    this.audio.playClick();
    if (!this.servicesTrackRef) return;
    const el = this.servicesTrackRef.nativeElement;
    const cardEl = el.querySelector('.service-luxury-card') as HTMLElement;
    const scrollStep = cardEl ? (cardEl.offsetWidth + 24) : 380;

    if (dir === 'next') {
      el.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      if (this.activeCardIndex < this.filteredServices.length - 1) {
        this.activeCardIndex++;
      }
    } else {
      el.scrollBy({ left: scrollStep, behavior: 'smooth' });
      if (this.activeCardIndex > 0) {
        this.activeCardIndex--;
      }
    }
  }

  scrollToCardIndex(idx: number): void {
    this.audio.playClick();
    this.activeCardIndex = idx;
    if (!this.servicesTrackRef) return;
    const el = this.servicesTrackRef.nativeElement;
    const cards = el.querySelectorAll('.service-luxury-card');
    if (cards[idx]) {
      (cards[idx] as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  onServicesTrackScroll(): void {
    if (!this.servicesTrackRef) return;
    const el = this.servicesTrackRef.nativeElement;
    const cards = el.querySelectorAll('.service-luxury-card');
    const center = el.getBoundingClientRect().left + el.clientWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;
    cards.forEach((c, i) => {
      const rect = c.getBoundingClientRect();
      const diff = Math.abs(rect.left + rect.width / 2 - center);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });
    this.activeCardIndex = closestIdx;
  }

  // Track user-selected template per service
  selectedTemplates: { [serviceId: string]: ServiceTemplate } = {};

  // Track quantity per service
  selectedQuantities: { [serviceId: string]: number } = {};

  // Track bouncing WhatsApp state per service
  bouncingServices: { [serviceId: string]: boolean } = {};

  ngOnInit(): void {
    this.api.getWhatsAppNumber().subscribe(num => {
      if (num) this.whatsappNumber = num.replace(/[^0-9]/g, '');
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    this.api.getCategories().subscribe(cats => this.categories = cats);
    this.api.getServices().subscribe(srvs => {
      this.services = srvs;
      // Initialize default templates for services with templates
      srvs.forEach(s => {
        if (s.templates && s.templates.length > 0) {
          const popular = s.templates.find(t => t.isPopular) || s.templates[0];
          this.selectedTemplates[s.id] = popular;
        }
        this.selectedQuantities[s.id] = 1;
      });
    });

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategorySlug = params['category'];
      }
    });
  }

  get filteredServices(): ServiceItem[] {
    let list = this.services;

    // Filter by Category
    if (this.selectedCategorySlug !== 'all') {
      const cat = this.categories.find(c => c.slug === this.selectedCategorySlug);
      if (cat) {
        list = list.filter(s => s.categoryId === cat.id || s.categoryNameAr === cat.nameAr);
      }
    }

    // Filter by Search
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(s => 
        s.nameAr.toLowerCase().includes(q) ||
        (s.shortDescriptionAr && s.shortDescriptionAr.toLowerCase().includes(q)) ||
        (s.templates && s.templates.some(t => t.nameAr.toLowerCase().includes(q) || t.code.toLowerCase().includes(q)))
      );
    }

    return list;
  }

  countByCategory(slug: string): number {
    const cat = this.categories.find(c => c.slug === slug);
    if (!cat) return 0;
    return this.services.filter(s => s.categoryId === cat.id || s.categoryNameAr === cat.nameAr).length;
  }

  filterCategory(slug: string): void {
    this.selectedCategorySlug = slug;
    this.activeCardIndex = 0;
    this.audio.playClick();
    if (this.servicesTrackRef) {
      this.servicesTrackRef.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }

  onSearchChange(): void {
    // Reactive typing
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.audio.playClick();
  }

  clearFilters(): void {
    this.selectedCategorySlug = 'all';
    this.searchQuery = '';
    this.audio.playClick();
  }

  openModal(service: ServiceItem): void {
    this.activeService = service;
    this.audio.playClick();
  }

  onHover(): void {
    this.audio.playHover();
  }

  // --- TEMPLATE SELECTION ---

  isTemplateSelected(serviceId: string, template: ServiceTemplate): boolean {
    return this.selectedTemplates[serviceId]?.id === template.id;
  }

  selectTemplate(serviceId: string, template: ServiceTemplate): void {
    this.selectedTemplates[serviceId] = template;
    this.audio.playClick();
    this.triggerServiceBounce(serviceId);
  }

  getSelectedTemplate(service: ServiceItem): ServiceTemplate | undefined {
    return this.selectedTemplates[service.id];
  }

  // --- QUANTITY STEPPER ---

  getCardQty(serviceId: string): number {
    return this.selectedQuantities[serviceId] || 1;
  }

  updateCardQty(serviceId: string, delta: number): void {
    const current = this.selectedQuantities[serviceId] || 1;
    const next = Math.max(1, current + delta);
    this.selectedQuantities[serviceId] = next;
    this.audio.playClick();
    this.triggerServiceBounce(serviceId);
  }

  // --- CART & WHATSAPP ACTIONS ---

  addCardToCart(service: ServiceItem): void {
    const tpl = this.selectedTemplates[service.id];
    const qty = this.selectedQuantities[service.id] || 1;
    this.cart.addToCart(service, tpl, qty);
    this.triggerServiceBounce(service.id);
  }

  triggerServiceBounce(serviceId: string): void {
    this.bouncingServices[serviceId] = true;
    setTimeout(() => {
      this.bouncingServices[serviceId] = false;
    }, 2200);
  }

  isBouncing(serviceId: string): boolean {
    return !!this.bouncingServices[serviceId];
  }

  orderDirectViaWhatsApp(service: ServiceItem): void {
    this.audio.playSuccess();
    const tpl = this.selectedTemplates[service.id];
    const qty = this.selectedQuantities[service.id] || 1;
    const url = this.cart.generateSingleServiceWhatsAppUrl(service, tpl, qty);
    window.open(url, '_blank');
  }

  orderQuoteViaWhatsApp(service: ServiceItem): void {
    this.audio.playClick();
    const phone = (this.whatsappNumber || '966572651058').replace(/[^0-9]/g, '');
    const lines = [
      'السلام عليكم ورحمة الله وبركاته 🌸',
      '*طلب تسعيرة خدمة — منصة أم رهام الأكاديمية*',
      '━━━━━━━━━━━━━━━━━━━━',
      `📌 *الخدمة المطلوبة:* ${service.nameAr}`,
      `🏷️ *التصنيف:* ${service.categoryNameAr || 'خدمات أكاديمية'}`,
      '━━━━━━━━━━━━━━━━━━━━',
      '🛡️ *الضمان الذهبي:* الدفع بعد الإنجاز والاستلام المعتمد 100%',
      '✨ *أرجو تزويدي بالخيارات المتاحة وعرض السعر، شكراً لكم 🌸*'
    ];
    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  }

  // --- ICON & FEATURE HELPERS ---

  getCategoryIcon(slug: string): string {
    if (slug === 'schools') return '🎒';
    if (slug === 'university') return '🎓';
    if (slug === 'office') return '📑';
    if (slug === 'general') return '🏛️';
    return '📁';
  }

  getServiceIcon(title: string): string {
    const t = (title || '').toLowerCase();
    if (t.includes('بحث') || t.includes('رسالة') || t.includes('أطروحة')) return '📚';
    if (t.includes('عرض') || t.includes('بوربوينت') || t.includes('presentation')) return '📽️';
    if (t.includes('ميداني')) return '📋';
    if (t.includes('تدريب تعاوني')) return '💼';
    if (t.includes('تدريب صيفي')) return '🏢';
    if (t.includes('تدريب')) return '💼';
    if (t.includes('تخرج') || t.includes('مشروع تخرج')) return '🎯';
    if (t.includes('واجب صغير') || t.includes('تكليف')) return '✍️';
    if (t.includes('مشروع اكسل')) return '📊';
    if (t.includes('واجب اكسل') || t.includes('اكسل')) return '🧮';
    if (t.includes('سيرة') || t.includes('ats')) return '👔';
    if (t.includes('بورتفوليو') || t.includes('أعمال')) return '🎨';
    if (t.includes('مواقع') || t.includes('برمجة')) return '💻';
    if (t.includes('إحصائ') || t.includes('spss')) return '📈';
    if (t.includes('تدقيق') || t.includes('turnitin')) return '🖋️';
    if (t.includes('تفريغ')) return '🎙️';
    if (t.includes('ترجم')) return '🌐';
    if (t.includes('تنسيق')) return '📖';
    if (t.includes('مطويات')) return '📐';
    if (t.includes('واجبات')) return '🎒';
    if (t.includes('مسارات')) return '🧭';
    if (t.includes('حظر')) return '🔓';
    if (t.includes('عنوان وطني')) return '📍';
    if (t.includes('تمهير')) return '🚀';
    if (t.includes('جدارات')) return '🧑‍💼';
    if (t.includes('ريف')) return '🌾';
    if (t.includes('وثيقة') || t.includes('عمل حر')) return '🎖️';
    if (t.includes('تمويل')) return '💳';
    if (t.includes('عقد إيجار')) return '🔑';
    if (t.includes('شكوى مالية')) return '💰';
    if (t.includes('تظلم')) return '📜';
    if (t.includes('طبي')) return '🏥';
    if (t.includes('ضمان')) return '🛡️';
    if (t.includes('عوائل')) return '👨‍👩‍👧‍👦';
    if (t.includes('اعتراض')) return '⚖️';
    if (t.includes('طاقات')) return '⚡';
    if (t.includes('حساب المواطن')) return '🇸🇦';
    return '🎓';
  }

  getServiceFeatures(title: string): string[] {
    if (title.includes('حساب المواطن')) {
      return ['مطابقة شروط الاستحقاق 100%', 'رفع المستندات الرسمية المعتمدة', 'متابعة صدور الأهلية'];
    }
    if (title.includes('عقد إيجار') || title.includes('إيجار')) {
      return ['توثيق فوري عبر منصة إيجار', 'ربط فوري بالضمان وحساب المواطن', 'عقد رسمي معتمد لدى كافة الجهات'];
    }
    if (title.includes('ضمان')) {
      return ['دراسة حالة الأهلية بدقة', 'إرفاق وتوثيق التقارير الرسمية', 'ضمان قبول الطلب وتفادي الإسقاط'];
    }
    if (title.includes('بحث')) {
      return ['توثيق معتمد APA 7th & Harvard', 'تقرير فحص Turnitin بنسبة 0%', 'تعديلات وملاحظات مجانية حتى الاعتماد'];
    }
    if (title.includes('تخرج')) {
      return ['توثيق برمجي ومخططات UML كاملة', 'جلسة تدريب وشرح للكود قبل المناقشة', 'سورس كود نظيف وقابل للتشغيل الفوري'];
    }
    if (title.includes('اكسل')) {
      return ['معادلات ودوال حسابية دقيقة', 'تنسيق وجداول ديناميكية احترافية', 'رسوم بيانية وتحليل بياني ذكي'];
    }
    return ['إشراف ومتابعة مع مستشار أكاديمي', 'سرية تامة وأمان لكافة البيانات', 'الدفع بعد الإنجاز والاستلام'];
  }
}
