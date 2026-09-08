import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApiService, ServiceItem, Category, Testimonial, PortfolioItem, PageItem, FooterLinkItem } from '../../core/services/api.service';
import { AudioService } from '../../core/services/audio.service';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService, AdminUser } from '../../core/services/auth.service';
import { ThemeSwitcherComponent } from '../../shared/components/theme-switcher/theme-switcher.component';
import { SaudFarahAgentService } from '../../core/services/saud-farah-agent.service';
import { RewardsService, CouponItem, WelcomeRewardConfig } from '../../core/services/rewards.service';


export interface AcademicOrder {
  id: string;
  orderNumber: string;
  clientName: string;
  phone: string;
  university: string;
  degree: string;
  serviceTitle: string;
  pages: number;
  price: number;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  deadline: string;
  createdAt: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ThemeSwitcherComponent],
  template: `
    <div class="dash-shell" dir="rtl">
      
      <!-- =========================================================
           1. EXECUTIVE HARMONIOUS SIDEBAR (القائمة الجانبية الفاخرة)
           ========================================================= -->
      <aside class="dash-sidebar">
        
        <!-- Brand Header -->
        <div class="sidebar-brand">
          <div class="brand-crest">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="brand-text">
            <h2>أم رهام</h2>
            <span>لوحة الإدارة والتحكم الأكاديمي</span>
          </div>
        </div>

        <!-- Executive User Capsule (Dynamic Authenticated User) -->
        <div class="user-card">
          <div class="user-avatar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span class="user-live-dot"></span>
          </div>
          <div class="user-meta">
            <div class="user-name">
              <strong>{{ authService.getCurrentUser()?.fullName || 'د. نورة الشمري' }}</strong>
              <span class="verified-pill">موثق ✓</span>
            </div>
            <small>{{ authService.getCurrentUser()?.roleNameAr || 'مدير عام النظام' }} 🇸🇦</small>
          </div>
        </div>

        <!-- Unified Seamless Nav Navigation (بدون تقسيمات) -->
        <nav class="sidebar-nav">
          <button class="nav-btn" [class.active]="activeTab === 'analytics'" (click)="setTab('analytics')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/>
                <rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>
              </svg>
            </span>
            <span class="btn-text">نظرة عامة والتحليلات</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'orders'" (click)="setTab('orders')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </span>
            <span class="btn-text">طلبات وأبحاث الباحثين</span>
            <span class="btn-badge">{{ orders.length }}</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'coupons'" (click)="setTab('coupons')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 12 20 22 4 22 4 12"/>
                <rect x="2" y="7" width="20" height="5"/>
                <line x1="12" y1="22" x2="12" y2="7"/>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
              </svg>
            </span>
            <span class="btn-text">الخصومات والمكافآت</span>
            <span class="btn-badge" style="background: #C9A96E; color: #06130D;">🎁 {{ couponsList.length }}</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'portfolio'" (click)="setTab('portfolio')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
            </span>
            <span class="btn-text">معرض الأعمال والملفات</span>
            <span class="btn-badge">{{ portfolioItems.length }}</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'pages'" (click)="setTab('pages')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </span>
            <span class="btn-text">نصوص وصفحات الموقع (CMS)</span>
            <span class="btn-badge">{{ pages.length }}</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'services'" (click)="setTab('services')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </span>
            <span class="btn-text">الخدمات والتسعير</span>
            <span class="btn-badge">{{ services.length }}</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'testimonials'" (click)="setTab('testimonials')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </span>
            <span class="btn-text">آراء وتقييمات العملاء</span>
            <span class="btn-badge">{{ testimonials.length }}</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'users'" (click)="setTab('users')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <span class="btn-text">المستخدمون والصلاحيات</span>
            <span class="btn-badge">{{ adminUsers.length }}</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'footer'" (click)="setTab('footer')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </span>
            <span class="btn-text">روابط الفوتر والتذييل</span>
            <span class="btn-badge">{{ footerLinks.length }}</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'agents'" (click)="setTab('agents')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/>
                <line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
              </svg>
            </span>
            <span class="btn-text">المساعد الذكي (سعود وفرح)</span>
          </button>

          <button class="nav-btn" [class.active]="activeTab === 'settings'" (click)="setTab('settings')">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </span>
            <span class="btn-text">قاعدة البيانات والنسخ</span>
          </button>
        </nav>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <div class="db-status-pill">
            <span class="status-live-dot"></span>
            <span>قاعدة البيانات: <strong>ummreham_dev.db</strong></span>
          </div>
          <a routerLink="/" class="site-link">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span>زيارة واجهة الموقع العامة</span>
          </a>
          <button type="button" class="btn-logout-sidebar" (click)="handleLogout()">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>تسجيل الخروج الآمن</span>
          </button>
        </div>
      </aside>

      <!-- =========================================================
           2. MAIN WORKSPACE VIEWPORT (مساحة العمل المتناغمة)
           ========================================================= -->
      <div class="dash-viewport">
        
        <!-- Header -->
        <header class="dash-topbar">
          <div class="topbar-title">
            <h2>{{ getTabHeading() }}</h2>
            <p>المنظومة الأكاديمية الذكية — إدارة العمليات والمحتوى</p>
          </div>

          <div class="topbar-actions">
            <!-- Global Theme Switcher -->
            <app-theme-switcher></app-theme-switcher>

            <!-- Riyadh Live Clock -->
            <div class="live-clock">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>الرياض:</span>
              <strong>{{ currentTime }}</strong>
            </div>

            <!-- Primary Action Button -->
            <button class="btn-action-primary" (click)="openAddOrderModal()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>تسجيل طلب جديد</span>
            </button>
          </div>
        </header>

        <!-- Toast Capsule -->
        <div *ngIf="toastMessage" class="toast-popup">
          <span>✨ {{ toastMessage }}</span>
        </div>

        <!-- Main Content -->
        <main class="dash-main-area">

          <!-- ===================================================
               TAB 1: ANALYTICS & OVERVIEW
               =================================================== -->
          <div *ngIf="activeTab === 'analytics'" class="dash-pane">
            
            <!-- KPI Cards -->
            <div class="kpi-row">
              <div class="card-kpi">
                <div class="kpi-head">
                  <span class="kpi-title">إجمالي الطلبات المنجزة</span>
                  <span class="tag-badge green">+18.4% 📈</span>
                </div>
                <div class="kpi-metric">
                  <span class="metric-num">1,540</span>
                  <span class="metric-lbl">بحث ومشروع</span>
                </div>
                <div class="kpi-meter">
                  <div class="meter-bar"><div class="meter-fill green" style="width: 88%;"></div></div>
                  <small>نسبة الإنجاز في الموعد 99.4%</small>
                </div>
              </div>

              <div class="card-kpi">
                <div class="kpi-head">
                  <span class="kpi-title">الأصالة وفحص Turnitin</span>
                  <span class="tag-badge gold">0% اقتباس 🛡️</span>
                </div>
                <div class="kpi-metric">
                  <span class="metric-num gold">100%</span>
                  <span class="metric-lbl">تدقيق كامل</span>
                </div>
                <div class="kpi-meter">
                  <div class="meter-bar"><div class="meter-fill gold" style="width: 100%;"></div></div>
                  <small>مطابقة شروط الجامعات السعودية</small>
                </div>
              </div>

              <div class="card-kpi">
                <div class="kpi-head">
                  <span class="kpi-title">معدل رضا وتقييم الباحثين</span>
                  <span class="tag-badge gold">★★★★★</span>
                </div>
                <div class="kpi-metric">
                  <span class="metric-num">4.95</span>
                  <span class="metric-lbl">من 5.0 نقاط</span>
                </div>
                <div class="kpi-meter">
                  <div class="meter-bar"><div class="meter-fill gold" style="width: 98%;"></div></div>
                  <small>بناءً على مئات التقييمات الموثقة</small>
                </div>
              </div>

              <div class="card-kpi">
                <div class="kpi-head">
                  <span class="kpi-title">تفاعلات المساعد الذكي</span>
                  <span class="tag-badge cyan">سعود وفرح 🤖</span>
                </div>
                <div class="kpi-metric">
                  <span class="metric-num cyan">3,420</span>
                  <span class="metric-lbl">محادثة وإرشاد</span>
                </div>
                <div class="kpi-meter">
                  <div class="meter-bar"><div class="meter-fill cyan" style="width: 92%;"></div></div>
                  <small>استجابة وتسعير في أقل من 5 ثوان</small>
                </div>
              </div>
            </div>

            <!-- Two Column Section -->
            <div class="two-column-section">
              
              <!-- Universities Distribution -->
              <div class="section-card">
                <div class="section-card-head">
                  <h3>🇸🇦 توزيع الباحثين حسب الجامعات السعودية</h3>
                  <small>إحصائية حية لطلبات الفصل الأكاديمي الحالي</small>
                </div>

                <div class="uni-progress-stack">
                  <div class="uni-row">
                    <div class="uni-text"><strong>جامعة الملك سعود — الرياض</strong><span>38% (585 بحثاً)</span></div>
                    <div class="uni-track"><div class="uni-fill gold" style="width: 38%;"></div></div>
                  </div>
                  <div class="uni-row">
                    <div class="uni-text"><strong>جامعة الملك عبدالعزيز — جدة</strong><span>27% (415 بحثاً)</span></div>
                    <div class="uni-track"><div class="uni-fill green" style="width: 27%;"></div></div>
                  </div>
                  <div class="uni-row">
                    <div class="uni-text"><strong>جامعة الإمام محمد بن سعود</strong><span>18% (277 بحثاً)</span></div>
                    <div class="uni-track"><div class="uni-fill emerald" style="width: 18%;"></div></div>
                  </div>
                  <div class="uni-row">
                    <div class="uni-text"><strong>جامعة أم القرى وجامعة الطائف</strong><span>17% (263 بحثاً)</span></div>
                    <div class="uni-track"><div class="uni-fill cyan" style="width: 17%;"></div></div>
                  </div>
                </div>
              </div>

              <!-- Quick Action Quad -->
              <div class="section-card">
                <div class="section-card-head">
                  <h3>⚡ غرفة التحكم والإجراءات المباشرة</h3>
                  <small>إدارة سريعة لخدمات ومحتوى المنظومة</small>
                </div>

                <div class="action-tiles-grid">
                  <button class="tile-btn" (click)="openAddPortfolioModal()">
                    <div class="tile-icon-wrap">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                    <div><strong>إضافة عمل سابق</strong><small>رفع صور وملفات PDF</small></div>
                  </button>

                  <button class="tile-btn" (click)="openAddServiceModal()">
                    <div class="tile-icon-wrap">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </div>
                    <div><strong>إضافة خدمة أكاديمية</strong><small>تحديد السعر والمدة</small></div>
                  </button>

                  <button class="tile-btn" (click)="setTab('pages')">
                    <div class="tile-icon-wrap">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                    </div>
                    <div><strong>تعديل نصوص من نحن</strong><small>الركائز والرؤية والضمانات</small></div>
                  </button>

                  <button class="tile-btn" (click)="setTab('orders')">
                    <div class="tile-icon-wrap">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div><strong>متابعة طلبات اليوم</strong><small>{{ orders.length }} طلب قيد التنفيذ</small></div>
                  </button>
                </div>
              </div>

            </div>

          </div>

          <!-- ===================================================
               TAB 2: ORDERS MANAGEMENT
               =================================================== -->
          <div *ngIf="activeTab === 'orders'" class="dash-pane">
            <div class="section-card">
              <div class="section-card-head">
                <div class="search-input-box">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" [(ngModel)]="orderSearchQuery" placeholder="ابحث برقم الطلب، اسم الباحث، الجامعة، أو الخدمة..." />
                </div>
                <button class="btn-action-primary" (click)="openAddOrderModal()">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>تسجيل طلب جديد</span>
                </button>
              </div>

              <div class="table-frame">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th class="th-nowrap">رقم الطلب</th>
                      <th>اسم الباحث</th>
                      <th>الجامعة والدرجة</th>
                      <th>عنوان الخدمة / البحث</th>
                      <th class="th-nowrap">الصفحات</th>
                      <th class="th-nowrap">المبلغ التقديري</th>
                      <th class="th-nowrap">الموعد النهائي</th>
                      <th class="th-nowrap">حالة التنفيذ</th>
                      <th class="th-nowrap">التواصل والإجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let ord of filteredOrders()">
                      <td class="cell-nowrap">
                        <span class="ord-num-plain">{{ ord.orderNumber }}</span>
                      </td>
                      <td>
                        <strong class="cell-primary-text">{{ ord.clientName }}</strong>
                        <small class="d-block cell-phone-text" dir="ltr">{{ ord.phone }}</small>
                      </td>
                      <td>
                        <span class="cell-uni-text">{{ ord.university }}</span>
                        <small class="d-block cell-degree-text">{{ ord.degree }}</small>
                      </td>
                      <td><span class="cell-service-text">{{ ord.serviceTitle }}</span></td>
                      <td class="cell-nowrap">
                        <span class="ord-pages-plain">{{ ord.pages }} صفحة</span>
                      </td>
                      <td class="cell-nowrap">
                        <strong class="text-accent-green">{{ ord.price }} ر.س</strong>
                      </td>
                      <td class="cell-nowrap">
                        <span class="ord-deadline-plain">⏰ {{ ord.deadline }}</span>
                      </td>
                      <td class="cell-nowrap">
                        <span class="status-chip" [class]="ord.status">
                          <span class="status-dot"></span>
                          {{ getStatusLabel(ord.status) }}
                        </span>
                      </td>
                      <td class="cell-nowrap">
                        <div class="table-actions">
                          <a [href]="'https://wa.me/' + ord.phone.replace('+', '').replace(' ', '')" target="_blank" class="btn-wa" title="مراسلة واتساب">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                            <span>واتساب</span>
                          </a>
                          <button class="btn-icon-action step" (click)="advanceOrderStatus(ord)" title="المرحلة التالية">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </button>
                          <button class="btn-icon-action del" (click)="deleteOrder(ord.id)" title="حذف">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ===================================================
               TAB 2.5: REWARDS & COUPONS MANAGEMENT
               =================================================== -->
          <div *ngIf="activeTab === 'coupons'" class="dash-pane">
            <!-- 1. Welcome Rewards Pack Configuration -->
            <div class="section-card">
              <div class="section-card-head">
                <div>
                  <h3>🎁 باقة الترحيب بمكافآت وخصومات الباحثين والعملاء الجدد</h3>
                  <small>الخصومات والهدايا المجانية التي تُمنح تلقائياً لكل باحث يسجل بياناته أو يطلب خدمة لأول مرة</small>
                </div>
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                  <label class="toggle-label-inline">
                    <input type="checkbox" [(ngModel)]="welcomeConfig.isEnabled" />
                    <span class="toggle-text">{{ welcomeConfig.isEnabled ? 'الباقة مفعلة حالياً ✓' : 'الباقة معطلة' }}</span>
                  </label>
                  <button class="btn-action-primary" (click)="saveWelcomeRewardsSettings()">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>حفظ باقة الترحيب 💾✓</span>
                  </button>
                </div>
              </div>

              <div class="two-column-section" style="margin-top: 1rem;">
                <div class="form-row">
                  <label>كود الخصم الترحيبي الافتراضي (الذي يظهر للعميل في النموذج):</label>
                  <input type="text" class="form-input" style="font-weight: 700; color: #DFC698; letter-spacing: 1px;" [(ngModel)]="welcomeConfig.couponCode" placeholder="مثال: REHAM15" />
                </div>
                <div class="form-row">
                  <label>نوع وقيمة الخصم الترحيبي:</label>
                  <div style="display: flex; gap: 0.8rem;">
                    <select class="form-input" style="flex: 1;" [(ngModel)]="welcomeConfig.discountType">
                      <option value="percentage">نسبة مئوية (%)</option>
                      <option value="fixed">مبلغ مقطوع (ر.س)</option>
                    </select>
                    <input type="number" class="form-input" style="flex: 1;" [(ngModel)]="welcomeConfig.discountValue" placeholder="15" />
                  </div>
                </div>
              </div>

              <div class="form-row" style="margin-top: 0.5rem;">
                <label>رسالة التهنئة والترحيب التي تظهر للباحث الجديد وتُرفق برسالة الواتساب:</label>
                <textarea class="form-textarea" rows="2" [(ngModel)]="welcomeConfig.welcomeMessage" placeholder="اكتب نص رسالة الترحيب التي تظهر للعميل في بطاقة الخصم..."></textarea>
              </div>

              <div style="margin-top: 1.2rem;">
                <label style="display: block; font-weight: 700; color: #DFC698; margin-bottom: 0.6rem; font-size: 0.95rem;">
                  ✨ الخدمات والمكافآت الأكاديمية الممنوحة مجاناً مع أول طلب (يمكنك تفعيل/تعطيل كل ميزة):
                </label>
                <div class="perks-config-grid">
                  <div class="perk-config-card" *ngFor="let perk of welcomeConfig.freePerks" [class.active]="perk.enabled">
                    <label class="perk-checkbox-label">
                      <input type="checkbox" [(ngModel)]="perk.enabled" />
                      <span class="perk-icon">{{ perk.icon }}</span>
                      <div class="perk-text-box">
                        <strong class="perk-title">{{ perk.title }}</strong>
                        <small class="perk-sub">{{ perk.subtitle }}</small>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. Coupons Studio Management -->
            <div class="section-card" style="margin-top: 1.5rem;">
              <div class="section-card-head" style="flex-wrap: wrap; gap: 1rem;">
                <div class="search-input-box" style="flex: 1; min-width: 260px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" [(ngModel)]="couponSearchQuery" placeholder="ابحث بكود الخصم أو وصف العرض..." />
                </div>
                <button class="btn-action-primary" (click)="openAddCouponModal()">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>إنشاء كود خصم جديد</span>
                </button>
              </div>

              <div class="table-frame">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th class="th-nowrap">كود الكوبون</th>
                      <th>الوصف ونطاق العرض</th>
                      <th class="th-nowrap">قيمة الخصم</th>
                      <th class="th-nowrap">مرات الاستخدام</th>
                      <th class="th-nowrap">حالة الكود</th>
                      <th class="th-nowrap text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let c of filteredCouponsList()">
                      <td class="cell-nowrap">
                        <span class="coupon-tag-badge">{{ c.code }}</span>
                      </td>
                      <td>
                        <strong class="cell-primary-text">{{ c.description }}</strong>
                        <small class="d-block cell-phone-text">أنشئ في: {{ c.createdAt }}</small>
                      </td>
                      <td class="cell-nowrap">
                        <strong class="text-accent-green" *ngIf="c.discountType === 'percentage'">{{ c.discountValue }}% خصم</strong>
                        <strong class="text-accent-green" *ngIf="c.discountType === 'fixed'">{{ c.discountValue }} ر.س خصم</strong>
                      </td>
                      <td class="cell-nowrap">
                        <span class="ord-pages-plain">{{ c.currentUsage }} / {{ c.maxUsage }}</span>
                      </td>
                      <td class="cell-nowrap">
                        <span class="status-chip" [class]="c.isActive ? 'completed' : 'pending'">
                          <span class="status-dot"></span>
                          {{ c.isActive ? 'نشط ويعمل ✓' : 'معطل مؤقتاً' }}
                        </span>
                      </td>
                      <td class="cell-nowrap">
                        <div class="table-actions">
                          <button class="btn-icon-action step" (click)="toggleCouponStatus(c)" [title]="c.isActive ? 'تعطيل الكود' : 'تفعيل الكود'">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                          </button>
                          <button class="btn-icon-action step" (click)="editCoupon(c)" title="تعديل">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button class="btn-icon-action del" (click)="deleteCoupon(c.id)" title="حذف الكوبون">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ===================================================
               TAB 3: PORTFOLIO & MEDIA STUDIO
               =================================================== -->
          <div *ngIf="activeTab === 'portfolio'" class="dash-pane">
            <div class="section-card">
              <div class="section-card-head">
                <div class="search-input-box">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" [(ngModel)]="portfolioSearchQuery" placeholder="ابحث في الأعمال السابقة بالاسم أو الجامعة..." />
                </div>
                <button class="btn-action-primary" (click)="openAddPortfolioModal()">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>إضافة عمل / ملف PDF / فيديو</span>
                </button>
              </div>

              <!-- Empty State if no items -->
              <div *ngIf="filteredPortfolioList().length === 0" class="empty-state-box">
                <div class="empty-state-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <h3>لا توجد أعمال سابقة مضافة حالياً</h3>
                <p>يمكنك البدء بإضافة أول بحث أو مشروع سابق وتوثيق ملف الـ PDF ورابط الفيديو لعرضه في الموقع.</p>
                <button class="btn-action-primary" (click)="openAddPortfolioModal()">
                  <span>+ إضافة أول عمل أكاديمي الآن</span>
                </button>
              </div>

              <!-- Data Table if items exist -->
              <div *ngIf="filteredPortfolioList().length > 0" class="table-frame">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>عنوان العمل / البحث</th>
                      <th class="th-nowrap">القسم الأكاديمي</th>
                      <th>الجامعة والتخصص</th>
                      <th class="th-nowrap">الملف المرفق</th>
                      <th class="th-nowrap">الفيديو</th>
                      <th class="th-nowrap">الحالة بالموقع</th>
                      <th class="th-nowrap">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let p of filteredPortfolioList()">
                      <td>
                        <strong class="cell-primary-text">{{ p.titleAr }}</strong>
                        <small *ngIf="p.clientName" class="d-block text-muted">👤 {{ p.clientName }} ({{ p.degree || 'ماجستير' }})</small>
                      </td>
                      <td class="cell-nowrap"><span class="cell-tag-plain">{{ p.categoryNameAr }}</span></td>
                      <td>
                        <span class="cell-uni-text">{{ p.university }}</span>
                        <small class="d-block text-muted">{{ p.specialization }}</small>
                      </td>
                      <td class="cell-nowrap">
                        <a *ngIf="p.fileUrl" [href]="p.fileUrl" target="_blank" class="media-link pdf">
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                          PDF
                        </a>
                        <span *ngIf="!p.fileUrl" class="text-muted">—</span>
                      </td>
                      <td class="cell-nowrap">
                        <a *ngIf="p.videoUrl" [href]="p.videoUrl" target="_blank" class="media-link vid">
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          فيديو
                        </a>
                        <span *ngIf="!p.videoUrl" class="text-muted">—</span>
                      </td>
                      <td class="cell-nowrap">
                        <button class="btn-toggle-switch" [class.active]="p.isActive" (click)="togglePortfolioStatus(p)">
                          {{ p.isActive ? 'ظاهر ومفعل ✓' : 'مخفي ✕' }}
                        </button>
                      </td>
                      <td class="cell-nowrap">
                        <div class="table-actions">
                          <button class="btn-icon-action edit" (click)="editPortfolioItem(p)" title="تعديل">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button class="btn-icon-action del" (click)="deletePortfolioItem(p.id)" title="حذف">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ===================================================
               TAB 4: PAGES & SITE CONTENT (CMS)
               =================================================== -->
          <div *ngIf="activeTab === 'pages'" class="dash-pane">
            <div class="section-card">
              <div class="section-card-head">
                <div>
                  <h3>🌐 محرر نصوص وصفحات الموقع (Headless CMS)</h3>
                  <small>تحكم كامل وفوري بنصوص صفحة من نحن، الركائز الأكاديمية، والضمانات</small>
                </div>
              </div>

              <div class="cms-cards-grid">
                <div *ngFor="let page of pages" class="cms-page-card">
                  <div class="cms-page-header">
                    <div class="cms-page-icon">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div class="cms-page-title-group">
                      <h4>{{ page.titleAr }}</h4>
                      <code class="cms-slug-tag">/{{ page.slug }}</code>
                    </div>
                    <button class="btn-toggle-switch" [class.active]="page.isPublished" (click)="togglePagePublished(page)">
                      {{ page.isPublished ? 'منشور ✓' : 'مخفي ✕' }}
                    </button>
                  </div>

                  <div class="cms-page-body">
                    <div class="form-row">
                      <label>عنوان الصفحة الرئيسي:</label>
                      <input type="text" class="form-input" [(ngModel)]="page.titleAr" />
                    </div>

                    <div class="form-row">
                      <label>النص والمحتوى الأكاديمي الكامل:</label>
                      <textarea class="form-textarea" rows="4" [(ngModel)]="page.contentAr"></textarea>
                    </div>
                  </div>

                  <div class="cms-page-footer">
                    <button class="btn-action-primary" (click)="savePageContent(page)">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>حفظ نصوص الصفحة في قاعدة البيانات</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===================================================
               TAB 5: SERVICES & PRICING
               =================================================== -->
          <div *ngIf="activeTab === 'services'" class="dash-pane">
            <div class="section-card">
              <div class="section-card-head">
                <div class="search-input-box">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" [(ngModel)]="serviceSearchQuery" placeholder="ابحث في الخدمات بالاسم أو القسم..." />
                </div>
                <button class="btn-action-primary" (click)="openAddServiceModal()">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>إضافة خدمة جديدة</span>
                </button>
              </div>

              <div class="table-frame">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>اسم الخدمة</th>
                      <th class="th-nowrap">القسم الأكاديمي</th>
                      <th class="th-nowrap">نوع التسعير</th>
                      <th class="th-nowrap">النطاق السعري</th>
                      <th class="th-nowrap">مدة الإنجاز</th>
                      <th class="th-nowrap">الحالة</th>
                      <th class="th-nowrap">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let s of filteredServicesList()">
                      <td><strong class="cell-primary-text">{{ s.nameAr }}</strong></td>
                      <td class="cell-nowrap"><span class="cell-tag-plain">{{ s.categoryNameAr || 'الخدمات الأكاديمية' }}</span></td>
                      <td class="cell-nowrap">{{ s.priceType === 'range' ? 'نطاق سعري' : 'تسعير مخصص' }}</td>
                      <td class="cell-nowrap" dir="ltr">
                        <strong *ngIf="s.priceType === 'range'" class="text-accent-green">{{ s.priceMin }} - {{ s.priceMax }} {{ s.priceCurrency }}</strong>
                        <span *ngIf="s.priceType !== 'range'" class="text-accent-gold">حسب المتطلبات</span>
                      </td>
                      <td class="cell-nowrap">{{ s.estimatedDuration || '3-5 أيام' }}</td>
                      <td class="cell-nowrap"><span class="status-chip completed"><span class="status-dot"></span>مفعلة ✓</span></td>
                      <td class="cell-nowrap">
                        <div class="table-actions">
                          <button class="btn-icon-action edit" (click)="editService(s)" title="تعديل">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button class="btn-icon-action del" (click)="deleteService(s.id)" title="حذف">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ===================================================
               TAB 6: TESTIMONIALS
               =================================================== -->
          <div *ngIf="activeTab === 'testimonials'" class="dash-pane">
            <div class="section-card">
              <div class="section-card-head">
                <div class="search-input-box">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" [(ngModel)]="testimonialSearchQuery" placeholder="ابحث باسم العميل أو الجامعة..." />
                </div>
                <button class="btn-action-primary" (click)="openAddReviewModal()">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>توثيق تقييم جديد</span>
                </button>
              </div>

              <div class="reviews-grid-deck">
                <div *ngFor="let t of filteredReviewsList()" class="review-brick">
                  <div class="review-brick-head">
                    <div>
                      <strong>{{ t.clientName }}</strong>
                      <small class="d-block text-muted">🇸🇦 {{ t.clientUniversity || 'جامعة سعودية' }} — {{ t.city || 'الرياض' }}</small>
                    </div>
                    <span class="stars-gold">★★★★★</span>
                  </div>
                  <p class="review-brick-body">"{{ t.contentAr }}"</p>
                  <div class="review-brick-foot">
                    <span class="text-accent-green font-bold">✓ تقييم معتمد وموثق</span>
                    <div class="table-actions">
                      <button class="btn-icon-action edit" (click)="editTestimonial(t)" title="تعديل">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="btn-icon-action del" (click)="deleteTestimonial(t.id)" title="حذف">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===================================================
               TAB 7: FOOTER LINKS
               =================================================== -->
          <div *ngIf="activeTab === 'footer'" class="dash-pane">
            <div class="section-card">
              <div class="section-card-head">
                <div>
                  <h3>🔗 إدارة روابط الفوتر والتذييل وسياسة الخصوصية</h3>
                  <small>إضافة، تعديل، إظهار، أو إخفاء أي رابط في أسفل الموقع</small>
                </div>
                <button class="btn-action-primary" (click)="openAddFooterModal()">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>إضافة رابط جديد</span>
                </button>
              </div>

              <div class="table-frame">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>عنوان الرابط</th>
                      <th class="th-nowrap">المسار / الرابط</th>
                      <th class="th-nowrap">قسم الفوتر</th>
                      <th class="th-nowrap">الحالة</th>
                      <th class="th-nowrap">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let fl of footerLinks">
                      <td><strong class="cell-primary-text">{{ fl.titleAr }}</strong></td>
                      <td class="cell-nowrap"><code class="url-code">{{ fl.url }}</code></td>
                      <td class="cell-nowrap">{{ fl.group === 'services' ? 'قائمة الخدمات' : (fl.group === 'quick' ? 'روابط سريعة' : 'الضمانات والسياسات') }}</td>
                      <td class="cell-nowrap">
                        <button class="btn-toggle-switch" [class.active]="fl.isActive" (click)="toggleFooterLinkStatus(fl)">
                          {{ fl.isActive ? 'ظاهر ومفعل ✓' : 'مخفي ✕' }}
                        </button>
                      </td>
                      <td class="cell-nowrap">
                        <div class="table-actions">
                          <button class="btn-icon-action edit" (click)="editFooterLink(fl)" title="تعديل">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button class="btn-icon-action del" (click)="deleteFooterLink(fl.id)" title="حذف">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ===================================================
               TAB 8: AI AGENTS & MASCOT STUDIO (إدارة الشخصيات والتسعير)
               =================================================== -->
          <div *ngIf="activeTab === 'agents'" class="dash-pane">
            
            <!-- Quick Presets Header Bar -->
            <div class="section-card" style="margin-bottom: 1.5rem;">
              <div class="section-card-head">
                <div>
                  <h3>⚡ التبديل السريع للشخصيات (بضغطة زر واحدة)</h3>
                  <small>اختر باقة جاهزة أو خصص الأسماء والأدوار يدوياً لتنعكس على كامل الموقع فوراً</small>
                </div>
              </div>
              <div style="display: flex; gap: 0.8rem; flex-wrap: wrap; margin-top: 1rem;">
                <button class="btn-action-primary" (click)="applyMascotPreset('saud_farah')">
                  <span>🇸🇦 باقة سعود وفرح (الأصلية)</span>
                </button>
                <button class="btn-action-outline" (click)="applyMascotPreset('abdullah_reem')">
                  <span>🎓 باقة د. عبد الله والأستاذة ريم (أكاديمية)</span>
                </button>
                <button class="btn-action-outline" (click)="applyMascotPreset('faisal_nouf')">
                  <span>💻 باقة فيصل ونوف (تقنية وبرمجة)</span>
                </button>
                <button class="btn-action-outline" (click)="applyMascotPreset('khalid_sarah')">
                  <span>📊 باقة د. خالد وسارة (إحصاء واستشارات)</span>
                </button>
              </div>
            </div>

            <div class="agents-studio-grid">
              
              <!-- Male Mascot Studio Card -->
              <div class="agent-character-card">
                <div class="agent-character-head">
                  <div class="agent-avatar-circle">
                    <img src="assets/images/saud_flying_3d.jpg" [alt]="agentMascotForm.maleName" />
                    <span class="agent-role-badge">الشخصية الأولى</span>
                  </div>
                  <div class="agent-head-meta">
                    <h3>{{ agentMascotForm.maleTitle || 'المستشار سعود' }}</h3>
                    <small>الشخصية الذكية لحساب التكاليف وتقدير مدة التسليم</small>
                  </div>
                </div>

                <div class="agent-card-body">
                  <div class="two-column-section">
                    <div class="form-row">
                      <label>اسم الشخصية (قابل للتغيير):</label>
                      <input type="text" class="form-input" [(ngModel)]="agentMascotForm.maleName" placeholder="سعود" />
                    </div>
                    <div class="form-row">
                      <label>اللقب والمسمى (Title):</label>
                      <input type="text" class="form-input" [(ngModel)]="agentMascotForm.maleTitle" placeholder="المستشار سعود" />
                    </div>
                  </div>

                  <div class="form-row">
                    <label>الدور والوظيفة في الموقع:</label>
                    <input type="text" class="form-input" [(ngModel)]="agentMascotForm.maleRole" placeholder="تسعير الأبحاث والمشاريع" />
                  </div>

                  <div class="form-row">
                    <label>رسالة الترحيب الأولى للباحث:</label>
                    <textarea class="form-textarea" rows="3" [(ngModel)]="agentMascotForm.maleGreeting"></textarea>
                  </div>
                </div>
              </div>

              <!-- Female Mascot Studio Card -->
              <div class="agent-character-card">
                <div class="agent-character-head">
                  <div class="agent-avatar-circle">
                    <img src="assets/images/farah_flying_3d.jpg" [alt]="agentMascotForm.femaleName" />
                    <span class="agent-role-badge">الشخصية الثانية</span>
                  </div>
                  <div class="agent-head-meta">
                    <h3>{{ agentMascotForm.femaleTitle || 'المرشدة فرح' }}</h3>
                    <small>المساعدة الذكية لضمان الجودة وفحص Turnitin وتقديم الخصومات</small>
                  </div>
                </div>

                <div class="agent-card-body">
                  <div class="two-column-section">
                    <div class="form-row">
                      <label>اسم الشخصية (قابل للتغيير):</label>
                      <input type="text" class="form-input" [(ngModel)]="agentMascotForm.femaleName" placeholder="فرح" />
                    </div>
                    <div class="form-row">
                      <label>اللقب والمسمى (Title):</label>
                      <input type="text" class="form-input" [(ngModel)]="agentMascotForm.femaleTitle" placeholder="المرشدة فرح" />
                    </div>
                  </div>

                  <div class="form-row">
                    <label>الدور والوظيفة في الموقع:</label>
                    <input type="text" class="form-input" [(ngModel)]="agentMascotForm.femaleRole" placeholder="التميز الأكاديمي والعروض" />
                  </div>

                  <div class="form-row">
                    <label>رسالة الترحيب الأولى للباحث:</label>
                    <textarea class="form-textarea" rows="3" [(ngModel)]="agentMascotForm.femaleGreeting"></textarea>
                  </div>
                </div>
              </div>

            </div>

            <!-- Global Mascot Pricing & Visibility Settings -->
            <div class="section-card" style="margin-top: 1.5rem;">
              <div class="section-card-head">
                <div>
                  <h3>💰 إعدادات التسعير التفاعلي والعروض المباشرة</h3>
                  <small>الأسعار التي يقتبسها المساعدان الذكيان فورياً للعميل عند الاستفسار</small>
                </div>
              </div>

              <div class="two-column-section" style="margin-top: 1rem;">
                <div class="form-row">
                  <label>السعر الأساسي المعتمد (ر.س):</label>
                  <input type="number" class="form-input" [(ngModel)]="agentMascotForm.basePrice" />
                </div>
                <div class="form-row">
                  <label>سعر الخصم الحصري للعملاء الجدد (ر.س):</label>
                  <input type="number" class="form-input" [(ngModel)]="agentMascotForm.discountPrice" />
                </div>
              </div>

              <div class="actions-row" style="margin-top: 1.5rem; justify-content: flex-start;">
                <button class="btn-action-primary" (click)="saveAllMascotSettings()">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>حفظ وتطبيق فوري على كامل الموقع 💾✓</span>
                </button>
              </div>
            </div>

          </div>

          <!-- ===================================================
               TAB 9: DATABASE & BACKUP SETTINGS
               =================================================== -->
          <div *ngIf="activeTab === 'settings'" class="dash-pane">
            <div class="section-card">
              <div class="section-card-head">
                <div>
                  <h3>💾 محرك قاعدة البيانات والنسخ الاحتياطي (SQLite 3)</h3>
                  <small>مراقبة وتصدير بيانات المنظومة بالكامل</small>
                </div>
              </div>

              <div class="settings-content-stack">
                <div class="two-column-section">
                  <div class="form-row">
                    <label>اسم المنصة الأكاديمية:</label>
                    <input type="text" class="form-input" [(ngModel)]="platformSettings.siteNameAr" />
                  </div>
                  <div class="form-row">
                    <label>رقم الواتساب المعتمد:</label>
                    <input type="text" class="form-input" [(ngModel)]="platformSettings.whatsappNumber" />
                  </div>
                </div>

                <div class="db-info-panel">
                  <h4>📦 تفاصيل محرك قاعدة البيانات:</h4>
                  <p>• ملف قاعدة البيانات: <code>backend/src/UmmReham.API/ummreham_dev.db</code> (SQLite 3)</p>
                  <p>• الجداول المحملة والمربوطة: <code>pages</code> • <code>portfolio_items</code> • <code>services</code> • <code>testimonials</code> • <code>site_settings</code> • <code>service_requests</code></p>
                  <p>• كافة التعديلات التي تقوم بها تنعكس تلقائياً على الموقع فوراً وبدون كتابة كود.</p>
                </div>

                <div class="actions-row">
                  <button class="btn-action-primary" (click)="savePlatformSettings()">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>حفظ التعديلات ✓</span>
                  </button>
                  <button class="btn-action-outline" (click)="exportBackupJson()">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span>تصدير نسخة احتياطية كاملة (JSON)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ===================================================
               TAB 10: USERS & SYSTEM ROLES MANAGEMENT
               =================================================== -->
          <div *ngIf="activeTab === 'users'" class="dash-pane">
            
            <!-- KPI Summary Cards -->
            <div class="kpi-row">
              <div class="card-kpi">
                <div class="kpi-head">
                  <span class="kpi-title">إجمالي مستخدمي الإدارة</span>
                  <span class="tag-badge gold">فريق العمل 👥</span>
                </div>
                <div class="kpi-metric">
                  <span class="metric-num gold">{{ adminUsers.length }}</span>
                  <span class="metric-lbl">مستخدم معتمد</span>
                </div>
                <div class="kpi-meter">
                  <div class="meter-bar"><div class="meter-fill gold" style="width: 100%;"></div></div>
                  <small>صلاحيات وصول محمية وموثقة</small>
                </div>
              </div>

              <div class="card-kpi">
                <div class="kpi-head">
                  <span class="kpi-title">المدراء العامين</span>
                  <span class="tag-badge green">Super Admins 🛡️</span>
                </div>
                <div class="kpi-metric">
                  <span class="metric-num green">{{ countSuperAdmins() }}</span>
                  <span class="metric-lbl">مدير رئيسي</span>
                </div>
                <div class="kpi-meter">
                  <div class="meter-bar"><div class="meter-fill green" style="width: 100%;"></div></div>
                  <small>صلاحيات إدارة قاعدة البيانات والمحتوى</small>
                </div>
              </div>

              <div class="card-kpi">
                <div class="kpi-head">
                  <span class="kpi-title">المشرفون والمستشارون</span>
                  <span class="tag-badge cyan">أكاديمي ودعم 🎓</span>
                </div>
                <div class="kpi-metric">
                  <span class="metric-num cyan">{{ adminUsers.length - countSuperAdmins() }}</span>
                  <span class="metric-lbl">مشرف متخصص</span>
                </div>
                <div class="kpi-meter">
                  <div class="meter-bar"><div class="meter-fill cyan" style="width: 90%;"></div></div>
                  <small>متابعة الطلبات وتدقيق الأبحاث</small>
                </div>
              </div>

              <div class="card-kpi">
                <div class="kpi-head">
                  <span class="kpi-title">الحسابات النشطة</span>
                  <span class="tag-badge emerald">100% فعّال ⚡</span>
                </div>
                <div class="kpi-metric">
                  <span class="metric-num emerald">{{ countActiveUsers() }}</span>
                  <span class="metric-lbl">حساب نشط</span>
                </div>
                <div class="kpi-meter">
                  <div class="meter-bar"><div class="meter-fill emerald" style="width: 100%;"></div></div>
                  <small>تسجيل دخول آمن ومراقب</small>
                </div>
              </div>
            </div>

            <!-- Users Section Card with Harmonious Search & Filter Bar -->
            <div class="section-card">
              <div class="section-card-head" style="flex-wrap: wrap; gap: 1rem;">
                <div class="search-input-box" style="flex: 1; min-width: 280px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" [(ngModel)]="userSearchQuery" placeholder="بحث بالاسم، البريد أو اسم المستخدم..." />
                </div>
                <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
                  <div class="filter-pills-row" style="display: flex; gap: 0.4rem;">
                    <button class="btn-filter-tag" [class.active]="userRoleFilter === 'all'" (click)="userRoleFilter = 'all'">الكل ({{ adminUsers.length }})</button>
                    <button class="btn-filter-tag" [class.active]="userRoleFilter === 'super_admin'" (click)="userRoleFilter = 'super_admin'">المدراء</button>
                    <button class="btn-filter-tag" [class.active]="userRoleFilter === 'academic_editor'" (click)="userRoleFilter = 'academic_editor'">المشرفين</button>
                    <button class="btn-filter-tag" [class.active]="userRoleFilter === 'consultant'" (click)="userRoleFilter = 'consultant'">المستشارين</button>
                  </div>
                  <button class="btn-action-primary" (click)="openAddUserModal()">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    <span>إضافة مستخدم جديد</span>
                  </button>
                </div>
              </div>

              <!-- Table Frame -->
              <div class="table-frame">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>المستخدم</th>
                      <th>اسم الدخول</th>
                      <th>البريد الإلكتروني</th>
                      <th>الدور والصلاحية</th>
                      <th>الهاتف</th>
                      <th>آخر تسجيل دخول</th>
                      <th>الحالة</th>
                      <th class="text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let u of filteredUsersList()">
                      <td>
                        <div class="user-row-cell" style="display: flex; align-items: center; gap: 0.75rem;">
                          <div class="user-avatar-initials">
                            {{ getUserInitials(u.fullName) }}
                          </div>
                          <div style="display: flex; flex-direction: column;">
                            <strong style="color: var(--dash-text-main, #FFFFFF); font-size: 0.85rem;">{{ u.fullName }}</strong>
                            <small style="color: var(--dash-text-muted, #94A3B8); font-size: 0.7rem;">أضيف في: {{ u.createdAt }}</small>
                          </div>
                        </div>
                      </td>
                      <td class="cell-nowrap"><code class="ord-num-pill" style="font-size: 0.76rem;">&#64;{{ u.username }}</code></td>
                      <td class="cell-nowrap" dir="ltr"><span style="color: var(--dash-text-main, #FFFFFF); font-size: 0.8rem;">{{ u.email }}</span></td>
                      <td class="cell-nowrap">
                        <span class="user-role-badge" [ngClass]="u.role">
                          {{ u.roleNameAr }}
                        </span>
                      </td>
                      <td class="cell-nowrap" dir="ltr"><span style="color: var(--dash-text-muted, #B4CDC3); font-size: 0.78rem;">{{ u.phone || '—' }}</span></td>
                      <td class="cell-nowrap"><span style="color: var(--dash-text-muted, #DFC698); font-size: 0.76rem;">{{ u.lastLogin }}</span></td>
                      <td class="cell-nowrap">
                        <span class="status-pill" [class.completed]="u.isActive" [class.pending]="!u.isActive">
                          <span class="status-dot-mini"></span>
                          <span>{{ u.isActive ? 'نشط ومفعل' : 'معطل' }}</span>
                        </span>
                      </td>
                      <td class="cell-nowrap text-center">
                        <div class="action-buttons-group" style="display: flex; gap: 0.4rem; justify-content: center;">
                          <button class="btn-micro edit" (click)="openEditUserModal(u)" title="تعديل بيانات المستخدم">
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button class="btn-micro delete" (click)="deleteUser(u.id)" title="حذف المستخدم">
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr *ngIf="filteredUsersList().length === 0">
                      <td colspan="8" style="text-align: center; padding: 2rem; color: var(--dash-text-muted, #B4CDC3);">
                        <span>لا توجد بيانات مستخدمين مطابقة للبحث</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </main>
      </div>

      <!-- =========================================================
           3. LUXURY GLASSMORPHIC MODALS (نوافذ النماذج والإضافة الفاخرة)
           ========================================================= -->

      <!-- 1. Order Modal (تسجيل طلب جديد) -->
      <div *ngIf="isOrderModalOpen" class="dash-modal-backdrop" (click)="closeOrderModal()">
        <div class="dash-modal-box" (click)="$event.stopPropagation()">
          <div class="modal-header-bar">
            <div class="modal-title-with-icon">
              <div class="modal-icon-badge">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              </div>
              <div>
                <h3>تسجيل طلب بحث / خدمة أكاديمية جديدة</h3>
                <small>إدراج طلب مباشر في جدول العمليات ومتابعة الإنجاز</small>
              </div>
            </div>
            <button class="modal-close-btn" (click)="closeOrderModal()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="modal-content-form">
            <div class="two-column-section">
              <div class="form-row">
                <label>اسم الباحث / الطالب:</label>
                <input type="text" class="form-input" [(ngModel)]="orderForm.clientName" placeholder="مثال: د. فهد الدوسري" />
              </div>
              <div class="form-row">
                <label>رقم الجوال / الواتساب:</label>
                <input type="text" class="form-input" dir="ltr" [(ngModel)]="orderForm.phone" placeholder="+966501234567" />
              </div>
            </div>

            <div class="two-column-section">
              <div class="form-row">
                <label>الجامعة السعودية:</label>
                <input type="text" class="form-input" [(ngModel)]="orderForm.university" placeholder="مثال: جامعة الملك سعود" />
              </div>
              <div class="form-row">
                <label>الدرجة العلمية:</label>
                <select class="form-input" [(ngModel)]="orderForm.degree">
                  <option value="بكالوريوس">بكالوريوس</option>
                  <option value="ماجستير">ماجستير</option>
                  <option value="دكتوراه">دكتوراه</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <label>عنوان البحث / نوع الخدمة:</label>
              <input type="text" class="form-input" [(ngModel)]="orderForm.serviceTitle" placeholder="مثال: إعداد بحث ميداني وتحليل إحصائي SPSS" />
            </div>

            <div class="two-column-section">
              <div class="form-row">
                <label>عدد الصفحات:</label>
                <input type="number" class="form-input" [(ngModel)]="orderForm.pages" />
              </div>
              <div class="form-row">
                <label>المبلغ التقديري (ر.س):</label>
                <input type="number" class="form-input" [(ngModel)]="orderForm.price" />
              </div>
            </div>

            <div class="form-row">
              <label>الموعد النهائي للتسليم:</label>
              <input type="text" class="form-input" [(ngModel)]="orderForm.deadline" placeholder="مثال: خلال 5 أيام أو 2026-09-05" />
            </div>
          </div>

          <div class="modal-footer-bar">
            <button class="btn-ghost" (click)="closeOrderModal()">إلغاء</button>
            <button class="btn-action-primary" (click)="saveOrder()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>تسجيل الطلب في قاعدة البيانات</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Portfolio Modal -->
      <div *ngIf="isPortfolioModalOpen" class="dash-modal-backdrop" (click)="closePortfolioModal()">
        <div class="dash-modal-box" (click)="$event.stopPropagation()">
          <div class="modal-header-bar">
            <div class="modal-title-with-icon">
              <div class="modal-icon-badge">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
              <div>
                <h3>{{ editingPortfolioId ? 'تعديل بيانات العمل السابق' : 'إضافة عمل سابق / ملف PDF / فيديو' }}</h3>
                <small>توثيق نماذج الأعمال السابقة وعرضها للباحثين</small>
              </div>
            </div>
            <button class="modal-close-btn" (click)="closePortfolioModal()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="modal-content-form">
            <div class="form-row">
              <label>عنوان العمل / البحث:</label>
              <input type="text" class="form-input" [(ngModel)]="portfolioForm.titleAr" placeholder="مثال: تحليل إحصائي SPSS لرسالة ماجستير" />
            </div>

            <div class="two-column-section">
              <div class="form-row">
                <label>القسم الأكاديمي:</label>
                <select class="form-input" [(ngModel)]="portfolioForm.categoryNameAr">
                  <option *ngFor="let c of categories" [value]="c.nameAr">{{ c.nameAr }}</option>
                </select>
              </div>
              <div class="form-row">
                <label>الدرجة العلمية:</label>
                <select class="form-input" [(ngModel)]="portfolioForm.degree">
                  <option value="بكالوريوس">بكالوريوس</option>
                  <option value="ماجستير">ماجستير</option>
                  <option value="دكتوراه">دكتوراه</option>
                </select>
              </div>
            </div>

            <div class="two-column-section">
              <div class="form-row">
                <label>الجامعة السعودية:</label>
                <input type="text" class="form-input" [(ngModel)]="portfolioForm.university" placeholder="مثال: جامعة الملك سعود" />
              </div>
              <div class="form-row">
                <label>التخصص:</label>
                <input type="text" class="form-input" [(ngModel)]="portfolioForm.specialization" placeholder="مثال: إدارة أعمال" />
              </div>
            </div>

            <div class="form-row">
              <label>رابط ملف الـ PDF المرفق (تحميل أو معاينة):</label>
              <input type="text" class="form-input" dir="ltr" [(ngModel)]="portfolioForm.fileUrl" placeholder="https://example.com/file.pdf" />
            </div>

            <div class="form-row">
              <label>رابط الفيديو التوضيحي (YouTube / MP4):</label>
              <input type="text" class="form-input" dir="ltr" [(ngModel)]="portfolioForm.videoUrl" placeholder="https://youtube.com/watch?v=..." />
            </div>

            <div class="form-row">
              <label>تفاصيل ووصف العمل المنجز:</label>
              <textarea class="form-textarea" rows="3" [(ngModel)]="portfolioForm.descriptionAr" placeholder="اكتب ملخصاً توضيحياً عن نطاق العمل والأصالة ومعايير الإنجاز..."></textarea>
            </div>
          </div>

          <div class="modal-footer-bar">
            <button class="btn-ghost" (click)="closePortfolioModal()">إلغاء</button>
            <button class="btn-action-primary" (click)="savePortfolioItem()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>حفظ العمل في قاعدة البيانات</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 3. Service Modal -->
      <div *ngIf="isServiceModalOpen" class="dash-modal-backdrop" (click)="closeServiceModal()">
        <div class="dash-modal-box" (click)="$event.stopPropagation()">
          <div class="modal-header-bar">
            <div class="modal-title-with-icon">
              <div class="modal-icon-badge">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <div>
                <h3>{{ editingServiceId ? 'تعديل الخدمة الأكاديمية' : 'إضافة خدمة أكاديمية جديدة' }}</h3>
                <small>تحديد اسم الخدمة، التصنيف، والنطاق السعري</small>
              </div>
            </div>
            <button class="modal-close-btn" (click)="closeServiceModal()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="modal-content-form">
            <div class="form-row">
              <label>اسم الخدمة بالعربي:</label>
              <input type="text" class="form-input" [(ngModel)]="serviceForm.nameAr" placeholder="مثال: التحليل الإحصائي ومناقشة النتائج" />
            </div>

            <div class="two-column-section">
              <div class="form-row">
                <label>السعر الأدنى (ر.س):</label>
                <input type="number" class="form-input" [(ngModel)]="serviceForm.priceMin" />
              </div>
              <div class="form-row">
                <label>السعر الأعلى (ر.س):</label>
                <input type="number" class="form-input" [(ngModel)]="serviceForm.priceMax" />
              </div>
            </div>

            <div class="form-row">
              <label>مدة التنفيذ المتوقعة:</label>
              <input type="text" class="form-input" [(ngModel)]="serviceForm.estimatedDuration" placeholder="مثال: 3-5 أيام عمل" />
            </div>
          </div>

          <div class="modal-footer-bar">
            <button class="btn-ghost" (click)="closeServiceModal()">إلغاء</button>
            <button class="btn-action-primary" (click)="saveService()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>حفظ الخدمة في قاعدة البيانات</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Testimonial Modal -->
      <div *ngIf="isReviewModalOpen" class="dash-modal-backdrop" (click)="closeReviewModal()">
        <div class="dash-modal-box" (click)="$event.stopPropagation()">
          <div class="modal-header-bar">
            <div class="modal-title-with-icon">
              <div class="modal-icon-badge">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div>
                <h3>{{ editingReviewId ? 'تعديل تقييم الباحث' : 'توثيق تقييم وشهادة تميز جديدة' }}</h3>
                <small>إضافة رأي وتقييم 5 نجوم لعرضه على الموقع</small>
              </div>
            </div>
            <button class="modal-close-btn" (click)="closeReviewModal()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="modal-content-form">
            <div class="form-row">
              <label>اسم الباحث / العميل:</label>
              <input type="text" class="form-input" [(ngModel)]="reviewForm.clientName" />
            </div>
            <div class="two-column-section">
              <div class="form-row">
                <label>الجامعة:</label>
                <input type="text" class="form-input" [(ngModel)]="reviewForm.clientUniversity" />
              </div>
              <div class="form-row">
                <label>المدينة:</label>
                <input type="text" class="form-input" [(ngModel)]="reviewForm.city" />
              </div>
            </div>
            <div class="form-row">
              <label>نص التقييم والتجربة:</label>
              <textarea class="form-textarea" rows="3" [(ngModel)]="reviewForm.contentAr"></textarea>
            </div>
          </div>
          <div class="modal-footer-bar">
            <button class="btn-action-primary" (click)="saveReview()">حفظ التقييم ✓</button>
            <button class="btn-ghost" (click)="closeReviewModal()">إلغاء</button>
          </div>
        </div>
      </div>

      <!-- Footer Modal -->
      <div *ngIf="isFooterModalOpen" class="dash-modal-backdrop" (click)="closeFooterModal()">
        <div class="dash-modal-box" (click)="$event.stopPropagation()">
          <div class="modal-header-bar">
            <h3>{{ editingFooterId ? '✏️ تعديل رابط الفوتر' : '➕ إضافة رابط فوتر جديد' }}</h3>
            <button class="modal-close-btn" (click)="closeFooterModal()">✕</button>
          </div>
          <div class="modal-content-form">
            <div class="form-row">
              <label>عنوان الرابط:</label>
              <input type="text" class="form-input" [(ngModel)]="footerForm.titleAr" />
            </div>
            <div class="form-row">
              <label>المسار / الرابط:</label>
              <input type="text" class="form-input" dir="ltr" [(ngModel)]="footerForm.url" placeholder="/services أو https://..." />
            </div>
            <div class="form-row">
              <label>قسم الفوتر:</label>
              <select class="form-input" [(ngModel)]="footerForm.group">
                <option value="services">قائمة الخدمات</option>
                <option value="quick">روابط سريعة</option>
                <option value="legal">الضمانات والسياسات</option>
              </select>
            </div>
          </div>
          <div class="modal-footer-bar">
            <button class="btn-action-primary" (click)="saveFooterLink()">حفظ الرابط ✓</button>
            <button class="btn-ghost" (click)="closeFooterModal()">إلغاء</button>
          </div>
        </div>
      </div>

      <!-- 5. User Modal (إضافة وتعديل مستخدم إداري) -->
      <div *ngIf="isUserModalOpen" class="dash-modal-backdrop" (click)="closeUserModal()">
        <div class="dash-modal-box" (click)="$event.stopPropagation()">
          <div class="modal-header-bar">
            <div class="modal-title-with-icon">
              <div class="modal-icon-badge">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <h3>{{ editingUserId ? 'تعديل بيانات وصلاحيات المستخدم' : 'إضافة مستخدم إداري جديد' }}</h3>
                <small>تحديد اسم المستخدم، البريد، الدور ونطاق الصلاحيات</small>
              </div>
            </div>
            <button class="modal-close-btn" (click)="closeUserModal()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="modal-content-form">
            <div class="two-column-section">
              <div class="form-row">
                <label>الاسم الكامل للمستخدم:</label>
                <input type="text" class="form-input" [(ngModel)]="userForm.fullName" placeholder="مثال: د. عبدالمجيد السالم" />
              </div>
              <div class="form-row">
                <label>اسم المستخدم للدخول (Username):</label>
                <input type="text" class="form-input" dir="ltr" [(ngModel)]="userForm.username" placeholder="abdulmajeed" />
              </div>
            </div>

            <div class="two-column-section">
              <div class="form-row">
                <label>البريد الإلكتروني المهني:</label>
                <input type="email" class="form-input" dir="ltr" [(ngModel)]="userForm.email" placeholder="user@ummreham.sa" />
              </div>
              <div class="form-row">
                <label>رقم الجوال / الواتساب:</label>
                <input type="text" class="form-input" dir="ltr" [(ngModel)]="userForm.phone" placeholder="+966 50 000 0000" />
              </div>
            </div>

            <div class="two-column-section">
              <div class="form-row">
                <label>الدور والصلاحية في النظام:</label>
                <select class="form-input" [(ngModel)]="userForm.role">
                  <option value="super_admin">مدير عام النظام (Super Admin) — تحكم كامل</option>
                  <option value="academic_editor">مشرف أكاديمي وتقني — إدارة الأبحاث والمحتوى</option>
                  <option value="consultant">مستشار دراسات عليا ودعم — متابعة الطلبات والعملاء</option>
                  <option value="reviewer">مدقق لغوي ومحكم — تدقيق ومراجعة Turnitin</option>
                </select>
              </div>
              <div class="form-row">
                <label>حالة الحساب:</label>
                <select class="form-input" [(ngModel)]="userForm.isActive">
                  <option [ngValue]="true">نشط ومفعل (Active) ✓</option>
                  <option [ngValue]="false">معلق وموقوف (Suspended)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="modal-footer-bar">
            <button class="btn-ghost" (click)="closeUserModal()">إلغاء</button>
            <button class="btn-action-primary" (click)="saveUser()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>{{ editingUserId ? 'حفظ التعديلات ✓' : 'إضافة المستخدم واعتماد الصلاحية' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 5. Coupon Modal -->
      <div *ngIf="isCouponModalOpen" class="dash-modal-backdrop" (click)="closeCouponModal()">
        <div class="dash-modal-box" (click)="$event.stopPropagation()">
          <div class="modal-header-bar">
            <div class="modal-title-with-icon">
              <div class="modal-icon-badge">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
              </div>
              <div>
                <h3>{{ editingCouponId ? 'تعديل كود الخصم' : 'إنشاء كود خصم ترويجي جديد' }}</h3>
                <small>ضبط رمز الكوبون ونسبة التخفيض وصلاحيات الاستخدام</small>
              </div>
            </div>
            <button class="modal-close-btn" (click)="closeCouponModal()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="modal-content-form">
            <div class="form-row">
              <label>رمز الكوبون (بالإنجليزية وبدون مسافات):</label>
              <input type="text" class="form-input" style="text-transform: uppercase; font-weight: 700; color: #DFC698;" [(ngModel)]="couponForm.code" placeholder="مثال: SUMMER25" />
            </div>

            <div class="two-column-section">
              <div class="form-row">
                <label>نوع الخصم:</label>
                <select class="form-input" [(ngModel)]="couponForm.discountType">
                  <option value="percentage">نسبة مئوية (%)</option>
                  <option value="fixed">مبلغ مقطوع (ر.س)</option>
                </select>
              </div>
              <div class="form-row">
                <label>قيمة الخصم:</label>
                <input type="number" class="form-input" [(ngModel)]="couponForm.discountValue" placeholder="15" />
              </div>
            </div>

            <div class="two-column-section">
              <div class="form-row">
                <label>الحد الأقصى لعدد مرات الاستخدام:</label>
                <input type="number" class="form-input" [(ngModel)]="couponForm.maxUsage" placeholder="100" />
              </div>
              <div class="form-row">
                <label>حالة الكوبون:</label>
                <select class="form-input" [(ngModel)]="couponForm.isActive">
                  <option [ngValue]="true">نشط وفعّال ✓</option>
                  <option [ngValue]="false">معطل مؤقتاً</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <label>وصف العرض أو المناسبة:</label>
              <input type="text" class="form-input" [(ngModel)]="couponForm.description" placeholder="مثال: خصم خاص لطلاب الماجستير في جامعة الملك سعود" />
            </div>
          </div>

          <div class="modal-footer-bar">
            <button class="btn-ghost" (click)="closeCouponModal()">إلغاء</button>
            <button class="btn-action-primary" (click)="saveCoupon()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>حفظ الكوبون في قاعدة البيانات</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    /* =========================================================
       HARMONIOUS, THEMED, CALM & COMPACT DASHBOARD (LUXURY)
       ========================================================= */
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      font-size: 13.5px;
      font-family: var(--font-family-arabic, 'Alexandria', -apple-system, sans-serif);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .dash-shell {
      display: flex;
      width: 100%;
      height: 100vh;
      background: var(--dash-body-bg, #F4F8F5);
      color: var(--dash-text-main, #0F291E);
      overflow: hidden;
      transition: background 0.3s ease, color 0.3s ease;
    }

    /* 1. SIDEBAR */
    .dash-sidebar {
      width: 265px;
      height: 100vh;
      background: var(--dash-sidebar-bg, #032E1E);
      border-left: 1.5px solid var(--dash-sidebar-border, rgba(16, 185, 129, 0.25));
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 50;
      box-shadow: -4px 0 30px rgba(0, 0, 0, 0.15);
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    .sidebar-brand {
      padding: 1.1rem 1.3rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 1px solid var(--dash-sidebar-border, rgba(255, 255, 255, 0.12));
    }

    .brand-crest {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: var(--dash-crest-bg, linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(3, 46, 30, 0.95)));
      border: 1.5px solid #10B981;
      color: #10B981;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
    }

    .brand-text h2 {
      font-size: 1.05rem;
      color: #FFFFFF !important;
      margin: 0;
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .brand-text span {
      font-size: 0.65rem;
      color: #A7F3D0;
      font-weight: 600;
    }

    /* Executive User Capsule */
    .user-card {
      margin: 0.75rem 0.85rem;
      padding: 0.65rem 0.85rem;
      background: var(--dash-user-card-bg, rgba(255, 255, 255, 0.08));
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .user-avatar {
      position: relative;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--dash-avatar-bg, #022417);
      border: 1.5px solid #10B981;
      color: #10B981;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .user-live-dot {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      border: 1.5px solid #032E1E;
      box-shadow: 0 0 6px #10B981;
    }

    .user-meta {
      flex: 1;
      min-width: 0;
    }

    .user-name {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      margin-bottom: 1px;
    }

    .user-name strong {
      font-size: 0.78rem;
      color: #FFFFFF !important;
      font-weight: 700;
    }

    .verified-pill {
      font-size: 0.58rem;
      padding: 1px 5px;
      border-radius: 8px;
      background: rgba(16, 185, 129, 0.25);
      color: #34D399;
      font-weight: 700;
    }

    .user-meta small {
      font-size: 0.65rem;
      color: #A7F3D0;
      display: block;
    }

    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 0.5rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .nav-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.85rem;
      border-radius: 8px;
      background: transparent;
      border: 1px solid transparent;
      color: var(--dash-nav-text, #D1FAE5);
      cursor: pointer;
      text-align: right;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
      position: relative;
    }

    .nav-btn:hover {
      background: var(--dash-nav-hover-bg, rgba(255, 255, 255, 0.12));
      color: #FFFFFF;
      transform: translateX(-2px);
    }

    .nav-btn.active {
      background: var(--dash-nav-active-bg, rgba(16, 185, 129, 0.25));
      border: 1px solid var(--dash-nav-active-border, #10B981);
      border-right: 3.5px solid #10B981;
      color: #FFFFFF;
      font-weight: 700;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    .nav-btn.active .btn-text {
      color: #FFFFFF !important;
      font-weight: 700;
    }

    .nav-btn.active .btn-icon {
      color: #34D399;
      transform: scale(1.08);
    }

    .btn-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--dash-icon-color, #A7F3D0);
      transition: transform 0.2s;
    }

    .btn-text { flex: 1; font-size: 0.78rem; font-weight: 600; }

    .btn-badge {
      font-size: 0.65rem;
      padding: 1px 7px;
      border-radius: 15px;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.25);
      color: #34D399;
      border: 1px solid rgba(16, 185, 129, 0.35);
    }

    .sidebar-footer {
      padding: 0.85rem 1.1rem;
      background: rgba(0, 0, 0, 0.15);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .db-status-pill {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.68rem;
      color: #A7F3D0;
    }

    .status-live-dot {
      width: 7px;
      height: 7px;
      background: #10B981;
      border-radius: 50%;
      box-shadow: 0 0 6px #10B981;
    }

    .site-link {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.7rem;
      color: #D1FAE5;
      text-decoration: none;
      transition: color 0.2s;
      font-weight: 600;
    }

    .site-link:hover { color: #34D399; }

    /* 2. VIEWPORT */
    .dash-viewport {
      flex: 1;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--dash-body-bg, #F4F8F5);
      transition: background 0.3s ease;
    }

    .dash-topbar {
      height: 64px;
      background: var(--dash-topbar-bg, #FFFFFF);
      border-bottom: 1px solid var(--dash-card-border, #E2ECE6);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.8rem;
      flex-shrink: 0;
      gap: 1.2rem;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    .topbar-title h2 { font-size: 1.05rem; color: var(--dash-text-main, #0F291E) !important; margin: 0; font-weight: 800; }
    .topbar-title p { font-size: 0.68rem; color: var(--dash-text-muted, #52796F); margin: 0; }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .live-clock {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: var(--dash-card-bg, #FFFFFF);
      border: 1px solid var(--dash-card-border, #E2ECE6);
      padding: 0.4rem 0.8rem;
      border-radius: 16px;
      font-size: 0.72rem;
      color: var(--dash-text-muted, #52796F);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    }

    .live-clock strong { color: var(--dash-text-main, #0F291E) !important; }

    .btn-action-primary {
      background: var(--dash-btn-primary-bg, linear-gradient(135deg, #059669 0%, #047857 100%));
      color: var(--dash-btn-primary-text, #FFFFFF) !important;
      border: none;
      padding: 0.5rem 1.1rem;
      border-radius: 7px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 3px 12px var(--dash-btn-primary-shadow, rgba(5, 150, 105, 0.3));
      transition: all 0.2s;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-family: inherit;
    }

    .btn-action-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 5px 18px var(--dash-btn-primary-shadow, rgba(212, 175, 55, 0.55));
    }

    .btn-action-outline {
      background: transparent;
      border: 1.5px solid var(--dash-accent-gold, #D4AF37);
      color: var(--dash-accent-gold, #E5C378);
      padding: 0.5rem 1.1rem;
      border-radius: 7px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-family: inherit;
      transition: all 0.2s;
    }

    .btn-action-outline:hover {
      background: rgba(212, 175, 55, 0.12);
      transform: translateY(-1px);
    }

    .toast-popup {
      position: fixed;
      top: 72px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--dash-toast-bg, #1B4332);
      border: 1.5px solid var(--dash-accent-gold, #D4AF37);
      color: #FFFFFF;
      padding: 0.6rem 1.4rem;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.8rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      z-index: 9999;
      animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes toastIn {
      from { transform: translate(-50%, -20px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }

    /* 3. MAIN WORKSPACE CONTENT */
    .dash-main-area {
      flex: 1;
      overflow-y: auto;
      padding: 1.4rem 1.8rem;
      display: flex;
      flex-direction: column;
    }

    .dash-pane {
      display: flex;
      flex-direction: column;
      gap: 1.3rem;
      max-width: 1550px;
      width: 100%;
      margin: 0 auto;
    }

    /* KPI Row */
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    @media (max-width: 1200px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .kpi-row { grid-template-columns: 1fr; } }

    .card-kpi {
      background: var(--dash-card-bg, #FFFFFF);
      border: 1px solid var(--dash-card-border, #E2ECE6);
      border-radius: 12px;
      padding: 1.1rem 1.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.75rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    .kpi-head { display: flex; align-items: center; justify-content: space-between; }
    .kpi-title { font-size: 0.76rem; color: var(--dash-text-muted, #475569) !important; font-weight: 700; }
    
    .tag-badge {
      font-size: 0.66rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 5px;
      white-space: nowrap;
    }

    .tag-badge.green { background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; }
    .tag-badge.emerald { background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; }
    .tag-badge.gold { background: #FEF3C7; color: #D97706; border: 1px solid #FDE68A; }
    .tag-badge.cyan { background: #E0F2FE; color: #0284C7; border: 1px solid #BAE6FD; }

    .kpi-metric { display: flex; align-items: baseline; gap: 0.45rem; }
    .metric-num { font-size: 1.55rem; font-weight: 800; color: var(--dash-text-main, #0F291E) !important; line-height: 1; letter-spacing: -0.02em; }
    .metric-num.gold { color: #D97706 !important; }
    .metric-num.emerald { color: #059669 !important; }
    .metric-num.green { color: #059669 !important; }
    .metric-num.cyan { color: #0284C7 !important; }
    .metric-lbl { font-size: 0.7rem; color: var(--dash-text-muted, #52796F); font-weight: 600; }

    .kpi-meter { display: flex; flex-direction: column; gap: 0.35rem; }
    .meter-bar { height: 5px; background: #E2ECE6; border-radius: 4px; overflow: hidden; }
    .meter-fill { height: 100%; border-radius: 4px; }
    .meter-fill.green { background: #059669; }
    .meter-fill.emerald { background: #059669; }
    .meter-fill.gold { background: #D97706; }
    .meter-fill.cyan { background: #0284C7; }
    .kpi-meter small { font-size: 0.65rem; color: var(--dash-text-muted, #52796F); }

    /* Section Card */
    .section-card {
      background: var(--dash-card-bg, #FFFFFF);
      border: 1px solid var(--dash-card-border, #E2ECE6);
      border-radius: 12px;
      padding: 1.3rem 1.5rem;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    .section-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.1rem;
      border-bottom: 1px solid var(--dash-card-border, #E2ECE6);
      padding-bottom: 0.75rem;
      gap: 0.9rem;
      flex-wrap: wrap;
    }

    .section-card-head h3 { font-size: 0.98rem; color: var(--dash-text-main, #0F291E) !important; margin: 0 0 2px 0; font-weight: 800; }
    .section-card-head small { font-size: 0.68rem; color: var(--dash-text-muted, #52796F); font-weight: 500; }

    .two-column-section {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 1.2rem;
    }

    @media (max-width: 992px) { .two-column-section { grid-template-columns: 1fr; } }

    /* Universities */
    .uni-progress-stack { display: flex; flex-direction: column; gap: 0.85rem; }
    .uni-row { display: flex; flex-direction: column; gap: 0.3rem; }
    .uni-text { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--dash-text-main, #0F291E); }
    .uni-text strong { color: var(--dash-text-main, #0F291E) !important; font-weight: 700; }
    .uni-track { height: 6px; background: #E2ECE6; border-radius: 4px; overflow: hidden; }
    .uni-fill { height: 100%; border-radius: 4px; }
    .uni-fill.gold { background: #D97706; }
    .uni-fill.green { background: #059669; }
    .uni-fill.emerald { background: #059669; }
    .uni-fill.cyan { background: #0284C7; }

    /* Action Tiles */
    .action-tiles-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .tile-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.9rem;
      border-radius: 10px;
      background: var(--dash-tile-bg, #F0FDF4);
      border: 1px solid var(--dash-card-border, #E2ECE6);
      color: var(--dash-text-main, #0F291E);
      text-align: right;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .tile-btn:hover {
      background: var(--dash-tile-hover-bg, #E1F7EC);
      border-color: #059669;
      transform: translateY(-2px);
    }

    .tile-icon-wrap {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: var(--dash-icon-wrap-bg, rgba(16, 185, 129, 0.15));
      color: #059669;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .tile-btn strong { display: block; font-size: 0.8rem; color: var(--dash-text-main, #0F291E) !important; margin-bottom: 2px; font-weight: 700; }
    .tile-btn small { font-size: 0.66rem; color: var(--dash-text-muted, #52796F); }

    /* Coupons & Perks Styling */
    .toggle-label-inline {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      cursor: pointer;
      font-size: 0.82rem;
      font-weight: 600;
      color: #DFC698;
      background: rgba(201, 169, 110, 0.12);
      border: 1px solid rgba(201, 169, 110, 0.35);
      padding: 0.4rem 0.9rem;
      border-radius: var(--radius-full);
      user-select: none;
    }
    .toggle-label-inline input { cursor: pointer; accent-color: #C9A96E; }

    .perks-config-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 0.85rem;
      margin-top: 0.5rem;
    }

    .perk-config-card {
      background: var(--dash-tile-bg, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--dash-card-border, rgba(201, 169, 110, 0.2));
      border-radius: 10px;
      padding: 0.85rem 1rem;
      transition: all 0.25s ease;
    }

    .perk-config-card.active {
      border-color: #52B788;
      background: rgba(82, 183, 136, 0.08);
      box-shadow: 0 4px 14px rgba(82, 183, 136, 0.1);
    }

    .perk-checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 0.8rem;
      cursor: pointer;
      user-select: none;
    }

    .perk-checkbox-label input { margin-top: 4px; accent-color: #52B788; }
    .perk-icon { font-size: 1.5rem; line-height: 1; }
    .perk-text-box strong { display: block; font-size: 0.85rem; color: var(--dash-text-main, #FFFFFF); margin-bottom: 2px; }
    .perk-text-box small { display: block; font-size: 0.72rem; color: var(--dash-text-muted, #94A3B8); line-height: 1.4; }

    .coupon-tag-badge {
      display: inline-block;
      background: rgba(201, 169, 110, 0.15);
      border: 1px solid rgba(201, 169, 110, 0.4);
      color: #DFC698;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      letter-spacing: 0.05em;
    }

    /* Tables & Inputs */
    .search-input-box {
      position: relative;
      flex: 1;
      max-width: 440px;
      display: flex;
      align-items: center;
    }

    .search-input-box svg {
      position: absolute;
      right: 12px;
      color: #059669;
      pointer-events: none;
    }

    .search-input-box input {
      width: 100%;
      padding: 0.65rem 2.6rem 0.65rem 0.9rem;
      background: var(--dash-input-bg, #FFFFFF);
      border: 1.5px solid var(--dash-input-border, #CBD5E1);
      border-radius: 7px;
      color: var(--dash-text-main, #0F172A) !important;
      font-size: 0.8rem;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .form-input, .form-textarea, select.form-input {
      width: 100%;
      padding: 0.65rem 0.85rem;
      background: var(--dash-input-bg, #FFFFFF);
      border: 1.5px solid var(--dash-input-border, #CBD5E1);
      border-radius: 7px;
      color: var(--dash-text-main, #0F172A) !important;
      font-size: 0.8rem;
      font-family: inherit;
      transition: all 0.2s;
      box-sizing: border-box;
    }

    select.form-input option {
      background: #FFFFFF;
      color: #0F172A;
    }

    .search-input-box input:focus, .form-input:focus, .form-textarea:focus {
      border-color: #059669;
      outline: none;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
    }

    .table-frame {
      overflow-x: auto;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #E2ECE6;
    }

    .data-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      text-align: right;
    }

    .data-table th {
      background: var(--dash-table-th-bg, #ECFDF5);
      color: #065F46 !important;
      padding: 0.8rem 0.95rem;
      font-size: 0.76rem;
      font-weight: 700;
      border-bottom: 1.5px solid #E2ECE6;
      white-space: nowrap;
    }

    .th-nowrap { white-space: nowrap; }

    .data-table td {
      padding: 0.85rem 0.95rem;
      border-bottom: 1px solid #F1F5F9;
      font-size: 0.78rem;
      color: var(--dash-text-main, #0F291E) !important;
      vertical-align: middle;
    }

    .cell-nowrap {
      white-space: nowrap;
    }

    /* Clean Cell Typography */
    .ord-num-plain {
      font-family: monospace, -apple-system, sans-serif;
      font-size: 0.82rem;
      font-weight: 700;
      color: #065F46 !important;
      direction: ltr;
      display: inline-block;
      white-space: nowrap;
      letter-spacing: 0.5px;
    }

    .cell-primary-text {
      font-size: 0.82rem;
      color: var(--dash-text-main, #0F291E) !important;
      font-weight: 700;
      display: block;
    }

    .cell-phone-text {
      font-size: 0.7rem;
      color: #059669 !important;
      font-weight: 600;
      font-family: monospace;
      margin-top: 1px;
    }

    .cell-uni-text {
      font-size: 0.76rem;
      color: var(--dash-text-main, #0F291E) !important;
      font-weight: 600;
      display: block;
    }

    .cell-degree-text {
      font-size: 0.68rem;
      color: #D97706 !important;
      font-weight: 600;
      margin-top: 1px;
    }

    .cell-service-text {
      font-size: 0.78rem;
      color: var(--dash-text-main, #0F291E) !important;
      font-weight: 600;
      line-height: 1.4;
    }

    .ord-pages-plain {
      font-size: 0.78rem;
      color: var(--dash-text-main, #0F291E) !important;
      font-weight: 600;
      white-space: nowrap;
    }

    .ord-deadline-plain {
      font-size: 0.74rem;
      color: #D97706 !important;
      font-weight: 600;
      white-space: nowrap;
    }

    .cell-tag-plain {
      font-size: 0.74rem;
      color: #059669;
      font-weight: 600;
    }

    .text-accent-green { color: #059669 !important; font-weight: 700; }
    .text-accent-gold { color: #D97706 !important; font-weight: 700; }
    .text-muted { color: var(--dash-text-muted, #52796F); }
    .d-block { display: block; }

    /* Elegant Status Chip with High Contrast */
    .status-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.7rem;
      padding: 4px 10px;
      border-radius: 16px;
      font-weight: 700;
      white-space: nowrap;
      border: 1px solid transparent;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .status-chip.pending {
      background: rgba(56, 189, 248, 0.16);
      border-color: rgba(56, 189, 248, 0.4);
      color: #38BDF8 !important;
    }
    .status-chip.pending .status-dot { background: #38BDF8; box-shadow: 0 0 6px #38BDF8; }

    .status-chip.in_progress {
      background: rgba(168, 85, 247, 0.16);
      border-color: rgba(168, 85, 247, 0.4);
      color: #D8B4FE !important;
    }
    .status-chip.in_progress .status-dot { background: #C084FC; box-shadow: 0 0 6px #C084FC; }

    .status-chip.review {
      background: rgba(245, 158, 11, 0.16);
      border-color: rgba(245, 158, 11, 0.4);
      color: #FCD34D !important;
    }
    .status-chip.review .status-dot { background: #F59E0B; box-shadow: 0 0 6px #F59E0B; }

    .status-chip.completed {
      background: rgba(16, 185, 129, 0.16);
      border-color: rgba(16, 185, 129, 0.4);
      color: #34D399 !important;
    }
    .status-chip.completed .status-dot { background: #10B981; box-shadow: 0 0 6px #10B981; }

    .table-actions { display: flex; align-items: center; gap: 0.4rem; }

    .btn-wa {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      background: rgba(16, 185, 129, 0.18);
      border: 1px solid rgba(16, 185, 129, 0.45);
      color: #10B981 !important;
      padding: 0.35rem 0.7rem;
      border-radius: 5px;
      font-size: 0.72rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .btn-wa:hover {
      background: #10B981;
      color: #050E09 !important;
      transform: translateY(-1px);
    }

    .btn-icon-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: var(--dash-btn-action-bg, rgba(212, 175, 55, 0.15));
      border: 1px solid var(--dash-card-border, rgba(212, 175, 55, 0.35));
      color: var(--dash-accent-gold, #E5C378);
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-icon-action.del {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.35);
      color: #F87171;
    }

    .btn-icon-action.del:hover { background: #EF4444; color: #FFFFFF; }
    .btn-icon-action:hover { transform: scale(1.08); }

    .btn-toggle-switch {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--dash-card-border, rgba(212, 175, 55, 0.3));
      color: var(--dash-text-muted, #B4CDC3);
      padding: 0.3rem 0.75rem;
      border-radius: 16px;
      font-size: 0.68rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-toggle-switch.active {
      background: rgba(16, 185, 129, 0.2);
      border-color: #10B981;
      color: #10B981;
    }

    .media-link {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 0.68rem;
      font-weight: 700;
      text-decoration: none;
    }

    .media-link.pdf { background: rgba(56, 189, 248, 0.2); color: #38BDF8; }
    .media-link.vid { background: rgba(239, 68, 68, 0.2); color: #F87171; }
    .url-code { font-family: monospace; color: #38BDF8; font-size: 0.76rem; }

    /* Empty State */
    .empty-state-box {
      text-align: center;
      padding: 3rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }

    .empty-state-icon {
      color: var(--dash-accent-gold, #D4AF37);
      opacity: 0.75;
      margin-bottom: 0.4rem;
    }

    .empty-state-box h3 { font-size: 1rem; color: var(--dash-text-main, #FFFFFF); margin: 0; font-weight: 700; }
    .empty-state-box p { font-size: 0.76rem; color: var(--dash-text-muted, #B4CDC3); margin: 0; max-width: 440px; }

    /* CMS Pages Grid */
    .cms-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.2rem;
    }

    .cms-page-card {
      background: var(--dash-cms-item-bg, rgba(0, 0, 0, 0.25));
      border: 1.5px solid var(--dash-card-border, rgba(212, 175, 55, 0.2));
      border-radius: 10px;
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.95rem;
    }

    .cms-page-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 1px solid var(--dash-card-border, rgba(212, 175, 55, 0.15));
      padding-bottom: 0.75rem;
    }

    .cms-page-icon {
      color: var(--dash-accent-gold, #D4AF37);
      display: flex;
      align-items: center;
    }

    .cms-page-title-group { flex: 1; }
    .cms-page-title-group h4 { margin: 0 0 2px 0; font-size: 0.88rem; color: var(--dash-text-main, #FFFFFF); font-weight: 700; }
    .cms-slug-tag { font-size: 0.66rem; color: var(--dash-accent-gold, #E5C378); }

    .cms-page-body { display: flex; flex-direction: column; gap: 0.8rem; }
    .cms-page-footer { display: flex; justify-content: flex-end; }

    /* AI Studio Characters (سعود وفرح) */
    .agents-studio-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.3rem;
    }

    @media (max-width: 992px) { .agents-studio-grid { grid-template-columns: 1fr; } }

    .agent-character-card {
      background: var(--dash-card-bg, #FFFFFF);
      border: 1px solid var(--dash-card-border, #E2ECE6);
      border-radius: 12px;
      padding: 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
    }

    .agent-character-head {
      display: flex;
      align-items: center;
      gap: 1rem;
      border-bottom: 1px solid var(--dash-card-border, #E2ECE6);
      padding-bottom: 0.95rem;
    }

    .agent-avatar-circle {
      position: relative;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border: 2px solid #059669;
      background: #ECFDF5;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(5, 150, 105, 0.2);
    }

    .agent-avatar-circle img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      display: block;
    }

    .agent-role-badge {
      position: absolute;
      bottom: -3px;
      right: -3px;
      font-size: 0.58rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 8px;
      background: #059669;
      color: #FFFFFF;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      white-space: nowrap;
    }

    .agent-head-meta { flex: 1; min-width: 0; }
    .agent-head-meta h3 { font-size: 0.92rem; color: var(--dash-text-main, #0F291E); margin: 0 0 2px 0; font-weight: 700; }
    .agent-head-meta small { font-size: 0.68rem; color: var(--dash-text-muted, #52796F); }

    .agent-card-body { display: flex; flex-direction: column; gap: 0.8rem; }
    .agent-card-footer { display: flex; justify-content: flex-end; }

    /* Reviews Deck */
    .reviews-grid-deck { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.1rem; }
    .review-brick {
      background: var(--dash-card-bg, #FFFFFF);
      border: 1px solid var(--dash-card-border, #E2ECE6);
      border-radius: 10px;
      padding: 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }

    .review-brick-head { display: flex; justify-content: space-between; }
    .stars-gold { color: #D97706; font-weight: 700; font-size: 0.95rem; }
    .review-brick-body { font-size: 0.8rem; color: var(--dash-text-main, #0F291E); margin: 0; line-height: 1.6; }
    .review-brick-foot { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--dash-card-border, #E2ECE6); padding-top: 0.75rem; font-size: 0.72rem; color: var(--dash-text-muted, #52796F); }

    /* Form Fields */
    .form-row { display: flex; flex-direction: column; gap: 0.35rem; }
    .form-row label { font-size: 0.74rem; color: #065F46; font-weight: 700; }

    .settings-content-stack { display: flex; flex-direction: column; gap: 1.1rem; }

    .db-info-panel {
      background: #F0FDF4;
      border: 1px solid #A7F3D0;
      border-radius: 9px;
      padding: 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .db-info-panel h4 { font-size: 0.85rem; color: #065F46; margin: 0; font-weight: 700; }
    .db-info-panel p { font-size: 0.74rem; color: #0F291E; margin: 0; }
    .db-info-panel code { color: #059669; font-weight: 700; font-family: monospace; background: #FFFFFF; padding: 2px 6px; border-radius: 4px; border: 1px solid #E2ECE6; }

    .actions-row { display: flex; gap: 0.9rem; margin-top: 0.4rem; flex-wrap: wrap; }

    /* =========================================================
       LUXURY GLASSMORPHIC MODALS (STRIPE/APPLE GRADE)
       ========================================================= */
    .dash-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(3, 20, 13, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 1.2rem;
      animation: backdropIn 0.25s ease-out;
    }

    @keyframes backdropIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .dash-modal-box {
      background: var(--dash-modal-bg, #FFFFFF);
      border: 1px solid var(--dash-card-border, #E2ECE6);
      border-radius: 16px;
      width: 100%;
      max-width: 560px;
      max-height: 88vh;
      overflow-y: auto;
      padding: 1.6rem 1.8rem;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25), 0 0 30px rgba(5, 150, 105, 0.08);
      animation: modalPopIn 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes modalPopIn {
      from { opacity: 0; transform: scale(0.94) translateY(12px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .modal-header-bar {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 1px solid var(--dash-card-border, #E2ECE6);
      padding-bottom: 0.85rem;
      margin-bottom: 1rem;
    }

    .modal-title-with-icon {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .modal-icon-badge {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      color: #059669;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .modal-title-with-icon h3 {
      font-size: 1rem;
      color: #0F291E !important;
      margin: 0 0 2px 0;
      font-weight: 800;
    }

    .modal-title-with-icon small {
      font-size: 0.68rem;
      color: #52796F;
    }

    .modal-close-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #F1F5F9;
      border: 1px solid #E2E8F0;
      color: #64748B;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .modal-close-btn:hover {
      background: rgba(239, 68, 68, 0.15);
      border-color: #EF4444;
      color: #EF4444;
      transform: rotate(90deg);
    }

    .modal-content-form { display: flex; flex-direction: column; gap: 0.85rem; }

    .modal-footer-bar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.8rem;
      border-top: 1px solid var(--dash-card-border, rgba(212, 175, 55, 0.2));
      padding-top: 1rem;
      margin-top: 1.2rem;
    }

    .btn-ghost {
      background: transparent;
      border: none;
      color: var(--dash-text-muted, #B4CDC3);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      padding: 0.45rem 0.85rem;
      border-radius: 6px;
      font-family: inherit;
      transition: color 0.2s;
    }

    .btn-ghost:hover { color: #FFFFFF; background: rgba(255, 255, 255, 0.05); }

    /* Filter Pills Row & Tags */
    .filter-pills-row {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .btn-filter-tag {
      padding: 0.45rem 0.85rem;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--dash-card-border, rgba(212, 175, 55, 0.2));
      color: var(--dash-text-muted, #B4CDC3);
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-filter-tag:hover {
      background: rgba(212, 175, 55, 0.15);
      border-color: var(--dash-accent-gold, #D4AF37);
      color: #FFFFFF;
    }

    .btn-filter-tag.active {
      background: var(--dash-accent-gold, #D4AF37) !important;
      border-color: var(--dash-accent-gold, #D4AF37) !important;
      color: #07150E !important;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
    }

    /* Users Table Styles & Role Badges */
    .user-row-cell {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar-initials {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--dash-accent-gold, #D4AF37), #1B4332);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 0.72rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid var(--dash-card-border, rgba(212, 175, 55, 0.3));
      flex-shrink: 0;
    }

    .user-role-badge {
      display: inline-block;
      padding: 0.22rem 0.65rem;
      border-radius: 20px;
      font-size: 0.72rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .user-role-badge.super_admin {
      background: rgba(212, 175, 55, 0.18);
      color: #FBE6B3;
      border: 1px solid rgba(212, 175, 55, 0.4);
    }

    .user-role-badge.academic_editor {
      background: rgba(16, 185, 129, 0.18);
      color: #6EE7B7;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .user-role-badge.consultant {
      background: rgba(59, 130, 246, 0.18);
      color: #93C5FD;
      border: 1px solid rgba(59, 130, 246, 0.4);
    }

    .user-role-badge.reviewer {
      background: rgba(168, 85, 247, 0.18);
      color: #D8B4FE;
      border: 1px solid rgba(168, 85, 247, 0.4);
    }

    .btn-logout-sidebar {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #FCA5A5;
      padding: 0.45rem 0.8rem;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: all 0.2s;
      font-family: inherit;
      width: 100%;
      margin-top: 0.4rem;
    }

    .btn-logout-sidebar:hover {
      background: rgba(239, 68, 68, 0.25);
      border-color: #EF4444;
      color: #FFFFFF;
    }
  `]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  api = inject(ApiService);
  audio = inject(AudioService);
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  agentService = inject(SaudFarahAgentService);
  rewardsService = inject(RewardsService);
  router = inject(Router);

  activeTab: 'analytics' | 'orders' | 'coupons' | 'portfolio' | 'pages' | 'services' | 'testimonials' | 'users' | 'footer' | 'agents' | 'settings' = 'analytics';

  welcomeConfig: WelcomeRewardConfig = {
    isEnabled: true,
    couponCode: 'REHAM15',
    discountType: 'percentage',
    discountValue: 15,
    welcomeMessage: 'أهلاً وسهلاً بك في منصة أم رهام! كباحث جديد، نهديك خصم 15% فوري مع حزمة التميز الأكاديمي الشاملة مجاناً 🎁',
    guideDownloadUrl: 'https://wa.me/966501234567?text=' + encodeURIComponent('السلام عليكم، أود استلام دليل الباحث الأكاديمي المجاني هدية التسجيل 📚'),
    freePerks: [
      { id: 'turnitin', title: 'تقرير Turnitin أصالة 0% مجاناً', subtitle: 'فحص استلال علمي دقيق معتمد دولياً (بقيمة 100 ر.س مجاناً)', icon: '📜', enabled: true },
      { id: 'apa7', title: 'تنسيق وتوثيق مراجع APA 7th مجاناً', subtitle: 'مطابقة تامة لدليل عمادة الدراسات العليا بجامعتك', icon: '🏛️', enabled: true },
      { id: 'revisions', title: 'مراجعات واستشارات مفتوحة مجاناً', subtitle: 'تعديلات مستمرة حتى موافقة المشرف الأكاديمي الجامعي', icon: '🔄', enabled: true },
      { id: 'guide', title: 'دليل الباحث للأطروحات والنشر العلمي', subtitle: 'كتاب رقمي حصري شامل لخطوات البحث الأكاديمي الرصين', icon: '🎁', enabled: true }
    ]
  };

  couponsList: CouponItem[] = [];
  couponSearchQuery = '';
  isCouponModalOpen = false;
  editingCouponId: string | null = null;
  couponForm: Partial<CouponItem> = {
    code: '',
    discountType: 'percentage',
    discountValue: 15,
    maxUsage: 100,
    currentUsage: 0,
    isActive: true,
    description: ''
  };

  agentMascotForm = {
    maleName: 'سعود',
    maleTitle: 'المستشار سعود',
    maleRole: 'تسعير الأبحاث والمشاريع',
    maleGreeting: 'ومعاك سعود يا بطل! 🌟 مستشارك لحساب تكاليف أبحاثك ومشاريعك التخرج وتقدير الأسعار وأوقات التسليم فوراً وبكل دقة.',
    femaleName: 'فرح',
    femaleTitle: 'المرشدة فرح',
    femaleRole: 'التميز الأكاديمي والعروض',
    femaleGreeting: 'أهلاً وسهلاً بك في منصة أم رهام! نورتنا 🌸 أنا فرح، مرشدتك لتنسيق أبحاثك وضمان أعلى درجات التميز وفحص Turnitin بنسبة 0% اقتباس!',
    basePrice: 200,
    discountPrice: 170,
    discountPercentage: 15,
    isMascotActive: true
  };

  services: ServiceItem[] = [];
  categories: Category[] = [];
  testimonials: Testimonial[] = [];
  portfolioItems: PortfolioItem[] = [];
  pages: PageItem[] = [];
  footerLinks: FooterLinkItem[] = [];
  adminUsers: AdminUser[] = [];

  currentTime = '';
  private timer: any;
  toastMessage = '';

  orderSearchQuery = '';
  serviceSearchQuery = '';
  testimonialSearchQuery = '';
  portfolioSearchQuery = '';
  userSearchQuery = '';
  userRoleFilter = 'all';

  // User Modal State
  isUserModalOpen = false;
  editingUserId: string | null = null;
  userForm: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    role: 'super_admin' | 'academic_editor' | 'consultant' | 'reviewer';
    isActive: boolean;
  } = {
    fullName: '',
    username: '',
    email: '',
    phone: '',
    role: 'consultant',
    isActive: true
  };

  orders: AcademicOrder[] = [
    {
      id: 'ord_1',
      orderNumber: '#OR-8921',
      clientName: 'د. فهد الدوسري',
      phone: '+966501234567',
      university: 'جامعة الملك سعود — الرياض',
      degree: 'ماجستير إدارة أعمال',
      serviceTitle: 'إعداد دراسة وبحث ميداني مع تحليل SPSS',
      pages: 35,
      price: 850,
      status: 'completed',
      deadline: 'تم التسليم',
      createdAt: '2026-08-30'
    },
    {
      id: 'ord_2',
      orderNumber: '#OR-8922',
      clientName: 'نورة القحطاني',
      phone: '+966559876543',
      university: 'جامعة الطائف',
      degree: 'بكالوريوس حاسب',
      serviceTitle: 'مشروع تخرج Full-Stack مع العرض التقديمي',
      pages: 45,
      price: 1200,
      status: 'in_progress',
      deadline: 'خلال 5 أيام',
      createdAt: '2026-08-31'
    },
    {
      id: 'ord_3',
      orderNumber: '#OR-8923',
      clientName: 'عبدالرحمن الشهري',
      phone: '+966543322110',
      university: 'جامعة الملك عبدالعزيز — جدة',
      degree: 'ماجستير تقنية معلومات',
      serviceTitle: 'فحص وتدقيق Turnitin وصياغة المقترح',
      pages: 20,
      price: 450,
      status: 'review',
      deadline: 'غداً 8:00 م',
      createdAt: '2026-08-31'
    },
    {
      id: 'ord_4',
      orderNumber: '#OR-8924',
      clientName: 'سلطان الشمري',
      phone: '+966512345678',
      university: 'جامعة الإمام محمد بن سعود',
      degree: 'دكتوراه قيادة تربوية',
      serviceTitle: 'إعداد خطة بحث Proposal وتحكيم الأدوات',
      pages: 30,
      price: 950,
      status: 'pending',
      deadline: 'خلال 7 أيام',
      createdAt: '2026-08-31'
    }
  ];

  saudWelcomeMsg = 'هلا وغلا! 🌟 أنا سعود، مساعدك الأكاديمي لحساب تكاليف الأبحاث والمشاريع وتقدير الأسعار فوراً.';
  saudKeywords = 'سعر, تكلفة, كم, خصم, أسعار, قيمة, عاجل';

  farahWelcomeMsg = 'أهلاً بك! 🌸 أنا فرح، مرشدتك الأكاديمية لاختيار التخصص وتنسيق خطط الماجستير والدراسات العليا.';
  farahKeywords = 'خطة, بحث, ماجستير, دكتوراه, تخرج, تدقيق, توثيق';

  platformSettings = {
    siteNameAr: 'أم رهام للخدمات الأكاديمية والتعليمية',
    whatsappNumber: '966501234567',
    contactEmail: 'info@ummreham.com',
    city: 'الرياض — المملكة العربية السعودية'
  };

  // 1. Order Modal Form
  isOrderModalOpen = false;
  orderForm: Partial<AcademicOrder> = {
    clientName: '',
    phone: '+966501234567',
    university: 'جامعة الملك سعود',
    degree: 'ماجستير',
    serviceTitle: '',
    pages: 20,
    price: 500,
    deadline: 'خلال 5 أيام'
  };

  // 2. Portfolio Modal Form
  isPortfolioModalOpen = false;
  editingPortfolioId: string | null = null;
  portfolioForm: Partial<PortfolioItem> = {
    titleAr: '',
    categoryNameAr: 'الخدمات الأكاديمية',
    degree: 'ماجستير',
    university: 'جامعة الملك سعود',
    specialization: 'دراسات عليا',
    fileUrl: '',
    videoUrl: '',
    descriptionAr: ''
  };

  // 3. Service Modal Form
  isServiceModalOpen = false;
  editingServiceId: string | null = null;
  serviceForm: Partial<ServiceItem> = {
    nameAr: '',
    priceMin: 200,
    priceMax: 1000,
    estimatedDuration: '3-5 أيام'
  };

  // 4. Testimonial Modal Form
  isReviewModalOpen = false;
  editingReviewId: string | null = null;
  reviewForm: Partial<Testimonial> = {
    clientName: '',
    city: 'الرياض',
    clientUniversity: 'جامعة الملك سعود',
    contentAr: ''
  };

  // 5. Footer Modal Form
  isFooterModalOpen = false;
  editingFooterId: string | null = null;
  footerForm: Partial<FooterLinkItem> = {
    titleAr: '',
    url: '/',
    group: 'quick',
    isActive: true
  };

  ngOnInit(): void {
    this.loadData();
    this.syncMascotFormFromService();
    this.updateClock();
    this.timer = setInterval(() => this.updateClock(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private updateClock(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  private loadData(): void {
    this.api.getServices().subscribe(res => this.services = res);
    this.api.getCategories().subscribe(res => this.categories = res);
    this.api.getTestimonials().subscribe(res => this.testimonials = res);
    this.api.getPortfolioItems().subscribe(res => this.portfolioItems = res);
    this.api.getPages().subscribe(res => this.pages = res);
    this.api.getFooterLinks().subscribe(res => this.footerLinks = res);
    this.authService.getUsers().subscribe(res => this.adminUsers = res);
    this.loadOrdersFromBackend();
    this.loadRewardsConfig();
  }

  setTab(tab: any): void {
    this.activeTab = tab;
    this.audio.playClick();
  }

  getTabHeading(): string {
    switch (this.activeTab) {
      case 'analytics': return 'لوحة التحليلات والعمليات الأكاديمية المباشرة';
      case 'orders': return 'إدارة أبحاث وطلبات الباحثين والطلاب';
      case 'coupons': return 'إدارة الخصومات، الكوبونات ومكافآت العملاء الجدد 🎁';
      case 'portfolio': return 'معرض الأعمال السابقة ورفع الملفات والفيديوهات';
      case 'pages': return 'محرر نصوص وصفحات الموقع (من نحن • الركائز • الضمانات)';
      case 'services': return 'استوديو الخدمات والتسعير الأكاديمي';
      case 'testimonials': return 'جدار التوثيق وشهادات التميز المعتمدة';
      case 'users': return 'إدارة المستخدمين وصلاحيات الإدارة والوصول للنظام';
      case 'footer': return 'إدارة روابط الفوتر والتذييل وسياسة السرية';
      case 'agents': return 'إدارة وضبط المساعدين الأذكياء (سعود وفرح)';
      case 'settings': return 'إعدادات قاعدة البيانات (ummreham_dev.db) والنسخ الاحتياطي';
      default: return 'لوحة التحكم الأكاديمية';
    }
  }

  // Rewards & Coupons Methods
  loadRewardsConfig(): void {
    this.welcomeConfig = { ...this.rewardsService.welcomeConfig() };
    this.couponsList = [...this.rewardsService.coupons()];
  }

  saveWelcomeRewardsSettings(): void {
    this.rewardsService.saveWelcomeConfig(this.welcomeConfig).subscribe(() => {
      this.showToast('تم حفظ باقة مكافآت وخصومات الترحيب في قاعدة البيانات بنجاح! 🎁');
      this.audio.playSuccess();
    });
  }

  openAddCouponModal(): void {
    this.editingCouponId = null;
    this.couponForm = {
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      maxUsage: 200,
      currentUsage: 0,
      isActive: true,
      description: 'كود خصم ترويجي جديد'
    };
    this.isCouponModalOpen = true;
    this.audio.playClick();
  }

  editCoupon(c: CouponItem): void {
    this.editingCouponId = c.id;
    this.couponForm = { ...c };
    this.isCouponModalOpen = true;
    this.audio.playClick();
  }

  closeCouponModal(): void {
    this.isCouponModalOpen = false;
  }

  saveCoupon(): void {
    if (!this.couponForm.code || !this.couponForm.discountValue) {
      this.showToast('يرجى ملء كود الخصم ونسبة/قيمة الخصم');
      return;
    }
    const cleanCode = this.couponForm.code.trim().toUpperCase();

    if (this.editingCouponId) {
      const idx = this.couponsList.findIndex(c => c.id === this.editingCouponId);
      if (idx !== -1) {
        this.couponsList[idx] = {
          ...this.couponsList[idx],
          ...this.couponForm,
          code: cleanCode
        } as CouponItem;
      }
    } else {
      const newCoupon: CouponItem = {
        id: 'cp_' + Date.now(),
        code: cleanCode,
        discountType: this.couponForm.discountType || 'percentage',
        discountValue: Number(this.couponForm.discountValue) || 15,
        maxUsage: Number(this.couponForm.maxUsage) || 100,
        currentUsage: 0,
        isActive: this.couponForm.isActive ?? true,
        description: this.couponForm.description || 'كود خصم مخصص',
        createdAt: new Date().toISOString().slice(0, 10)
      };
      this.couponsList.unshift(newCoupon);
    }

    this.rewardsService.saveCouponsList(this.couponsList).subscribe(() => {
      this.showToast(`تم حفظ الكوبون (${cleanCode}) في قاعدة البيانات بنجاح! ✓`);
      this.audio.playSuccess();
    });

    this.isCouponModalOpen = false;
  }

  toggleCouponStatus(c: CouponItem): void {
    c.isActive = !c.isActive;
    this.rewardsService.saveCouponsList(this.couponsList).subscribe(() => {
      this.showToast(`تم ${c.isActive ? 'تفعيل' : 'تعطيل'} الكوبون (${c.code})`);
      this.audio.playClick();
    });
  }

  deleteCoupon(id: string): void {
    this.couponsList = this.couponsList.filter(c => c.id !== id);
    this.rewardsService.saveCouponsList(this.couponsList).subscribe(() => {
      this.showToast('تم حذف الكوبون من قاعدة البيانات');
      this.audio.playClick();
    });
  }

  filteredCouponsList(): CouponItem[] {
    if (!this.couponSearchQuery) return this.couponsList;
    const q = this.couponSearchQuery.toLowerCase();
    return this.couponsList.filter(c =>
      c.code.toLowerCase().includes(q) ||
      (c.description && c.description.toLowerCase().includes(q))
    );
  }

  // User Management Methods
  getUserInitials(name: string): string {
    if (!name) return 'م';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return parts[0][0] + parts[1][0];
    return name.slice(0, 2);
  }

  countSuperAdmins(): number {
    return this.adminUsers.filter(u => u.role === 'super_admin').length;
  }

  countActiveUsers(): number {
    return this.adminUsers.filter(u => u.isActive).length;
  }

  filteredUsersList(): AdminUser[] {
    return this.adminUsers.filter(u => {
      const matchRole = this.userRoleFilter === 'all' || u.role === this.userRoleFilter;
      const q = this.userSearchQuery.toLowerCase();
      const matchSearch = !q || 
        u.fullName.toLowerCase().includes(q) || 
        u.username.toLowerCase().includes(q) || 
        u.email.toLowerCase().includes(q);
      return matchRole && matchSearch;
    });
  }

  openAddUserModal(): void {
    this.editingUserId = null;
    this.userForm = {
      fullName: '',
      username: '',
      email: '',
      phone: '',
      role: 'consultant',
      isActive: true
    };
    this.isUserModalOpen = true;
    this.audio.playClick();
  }

  openEditUserModal(u: AdminUser): void {
    this.editingUserId = u.id;
    this.userForm = {
      fullName: u.fullName,
      username: u.username,
      email: u.email,
      phone: u.phone || '',
      role: u.role,
      isActive: u.isActive
    };
    this.isUserModalOpen = true;
    this.audio.playClick();
  }

  closeUserModal(): void {
    this.isUserModalOpen = false;
  }

  saveUser(): void {
    if (!this.userForm.fullName || !this.userForm.email) {
      this.showToast('يرجى ملء الاسم الكامل والبريد الإلكتروني');
      return;
    }

    if (this.editingUserId) {
      this.authService.updateUser(this.editingUserId, this.userForm).subscribe(updated => {
        if (updated) {
          const idx = this.adminUsers.findIndex(u => u.id === this.editingUserId);
          if (idx !== -1) {
            this.adminUsers[idx] = updated;
          }
          this.showToast(`تم تحديث بيانات المستخدم (${updated.fullName}) بنجاح!`);
        }
      });
    } else {
      this.authService.addUser(this.userForm).subscribe(created => {
        this.adminUsers.unshift(created);
        this.showToast(`تمت إضافة المستخدم الجديد (${created.fullName}) بنجاح!`);
      });
    }

    this.isUserModalOpen = false;
    this.audio.playSuccess();
  }

  deleteUser(id: string): void {
    const user = this.adminUsers.find(u => u.id === id);
    if (user && user.role === 'super_admin' && this.countSuperAdmins() <= 1) {
      this.showToast('لا يمكن حذف الحساب الرئيسي للمدير العام للنظام!');
      this.audio.playHover();
      return;
    }

    if (confirm(`هل أنت متأكد من رغبتك في حذف المستخدم (${user?.fullName || ''})؟`)) {
      this.authService.deleteUser(id).subscribe(() => {
        this.adminUsers = this.adminUsers.filter(u => u.id !== id);
        this.showToast('تم حذف المستخدم بنجاح');
        this.audio.playClick();
      });
    }
  }

  handleLogout(): void {
    this.audio.playClick();
    if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج من لوحة التحكم؟')) {
      this.authService.logout();
      this.showToast('تم تسجيل الخروج بنجاح. أهلاً بك دائماً!');
      this.router.navigate(['/']);
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending': return 'استقبال وتدقيق';
      case 'in_progress': return 'قيد التنفيذ والبحث';
      case 'review': return 'فحص Turnitin والتدقيق';
      case 'completed': return 'تم الاعتماد والتسليم ✓';
      default: return status;
    }
  }

  loadOrdersFromBackend(): void {
    this.api.getServiceRequests().subscribe(res => {
      if (res && res.length > 0) {
        this.orders = res.map((r: any, idx: number) => {
          let extra: any = {};
          try {
            if (r.additionalDetails && typeof r.additionalDetails === 'string' && r.additionalDetails.startsWith('{')) {
              extra = JSON.parse(r.additionalDetails);
            }
          } catch(e) {}

          const orderNum = extra.orderNumber || ('#OR-' + (r.id ? r.id.toString().substring(0, 4).toUpperCase() : (8920 + idx)));
          const deadlineText = extra.deadlineText || (r.deadline ? new Date(r.deadline).toLocaleDateString('ar-SA') : 'خلال 5 أيام');
          const pages = r.pageCount || 20;
          const price = extra.price || (pages * 25);

          return {
            id: r.id?.toString() || ('ord_' + idx),
            orderNumber: orderNum,
            clientName: r.clientName || 'باحث أكاديمي',
            phone: r.clientPhone || '+966501234567',
            university: r.university || 'جامعة سعودية',
            degree: extra.degree || r.specialization || 'ماجستير',
            serviceTitle: extra.serviceTitle || r.description || r.serviceNameAr || 'خدمة أكاديمية',
            pages: pages,
            price: price,
            status: (r.status === 'new' ? 'pending' : (r.status === 'completed' ? 'completed' : (r.status === 'review' ? 'review' : 'in_progress'))) as any,
            deadline: deadlineText,
            createdAt: r.createdAt ? r.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10)
          };
        });
      }
    });
  }

  advanceOrderStatus(ord: AcademicOrder): void {
    if (ord.status === 'pending') ord.status = 'in_progress';
    else if (ord.status === 'in_progress') ord.status = 'review';
    else if (ord.status === 'review') ord.status = 'completed';
    else ord.status = 'pending';

    this.api.updateRequestStatus(ord.id, ord.status).subscribe();
    this.showToast(`تم تحديث حالة الطلب (${ord.orderNumber}) إلى: ${this.getStatusLabel(ord.status)}`);
    this.audio.playSuccess();
  }

  deleteOrder(id: string): void {
    this.orders = this.orders.filter(o => o.id !== id);
    this.api.deleteServiceRequest(id).subscribe();
    this.showToast('تم حذف الطلب بنجاح من قاعدة البيانات');
    this.audio.playClick();
  }

  // Order Modal Methods
  openAddOrderModal(): void {
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    this.orderForm = {
      clientName: '',
      phone: '+966501234567',
      university: 'جامعة الملك سعود',
      degree: 'ماجستير',
      serviceTitle: '',
      pages: 20,
      price: 500,
      deadline: 'خلال 5 أيام'
    };
    this.isOrderModalOpen = true;
  }

  closeOrderModal(): void {
    this.isOrderModalOpen = false;
  }

  saveOrder(): void {
    if (!this.orderForm.clientName || !this.orderForm.serviceTitle) {
      this.showToast('يرجى ملء اسم الباحث وعنوان البحث');
      return;
    }
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const orderNum = '#OR-' + nextNum;

    const reqPayload = {
      orderNumber: orderNum,
      clientName: this.orderForm.clientName,
      clientPhone: this.orderForm.phone,
      university: this.orderForm.university,
      specialization: this.orderForm.degree,
      description: this.orderForm.serviceTitle,
      pageCount: this.orderForm.pages || 20,
      price: this.orderForm.price || 500,
      deadline: this.orderForm.deadline || 'خلال 5 أيام',
      additionalDetails: JSON.stringify({
        orderNumber: orderNum,
        degree: this.orderForm.degree,
        serviceTitle: this.orderForm.serviceTitle,
        price: this.orderForm.price || 500,
        deadlineText: this.orderForm.deadline || 'خلال 5 أيام'
      })
    };

    const newOrd: AcademicOrder = {
      id: 'ord_' + Date.now(),
      orderNumber: orderNum,
      clientName: this.orderForm.clientName || 'باحث أكاديمي',
      phone: this.orderForm.phone || '+966501234567',
      university: this.orderForm.university || 'جامعة سعودية',
      degree: this.orderForm.degree || 'ماجستير',
      serviceTitle: this.orderForm.serviceTitle || 'خدمة أكاديمية',
      pages: this.orderForm.pages || 20,
      price: this.orderForm.price || 500,
      status: 'pending',
      deadline: this.orderForm.deadline || 'خلال 7 أيام',
      createdAt: new Date().toISOString().slice(0, 10)
    };
    this.orders.unshift(newOrd);

    this.api.submitServiceRequest(reqPayload).subscribe(() => {
      this.loadOrdersFromBackend();
    });

    this.isOrderModalOpen = false;
    this.showToast(`تم تسجيل الطلب الجديد (${orderNum}) وحفظه في قاعدة البيانات بنجاح!`);
    this.audio.playSuccess();
  }

  filteredOrders(): AcademicOrder[] {
    if (!this.orderSearchQuery) return this.orders;
    const q = this.orderSearchQuery.toLowerCase();
    return this.orders.filter(o => 
      o.orderNumber.toLowerCase().includes(q) ||
      o.clientName.toLowerCase().includes(q) ||
      o.university.toLowerCase().includes(q) ||
      o.serviceTitle.toLowerCase().includes(q)
    );
  }

  filteredPortfolioList(): PortfolioItem[] {
    if (!this.portfolioSearchQuery) return this.portfolioItems;
    const q = this.portfolioSearchQuery.toLowerCase();
    return this.portfolioItems.filter(p => 
      p.titleAr.toLowerCase().includes(q) ||
      (p.university && p.university.toLowerCase().includes(q)) ||
      (p.specialization && p.specialization.toLowerCase().includes(q))
    );
  }

  filteredServicesList(): ServiceItem[] {
    if (!this.serviceSearchQuery) return this.services;
    const q = this.serviceSearchQuery.toLowerCase();
    return this.services.filter(s => 
      s.nameAr.toLowerCase().includes(q) ||
      (s.categoryNameAr && s.categoryNameAr.toLowerCase().includes(q))
    );
  }

  filteredReviewsList(): Testimonial[] {
    if (!this.testimonialSearchQuery) return this.testimonials;
    const q = this.testimonialSearchQuery.toLowerCase();
    return this.testimonials.filter(t => 
      t.clientName.toLowerCase().includes(q) ||
      (t.clientUniversity && t.clientUniversity.toLowerCase().includes(q)) ||
      t.contentAr.toLowerCase().includes(q)
    );
  }

  openAddPortfolioModal(): void {
    this.editingPortfolioId = null;
    this.portfolioForm = {
      titleAr: '',
      categoryNameAr: 'الخدمات الأكاديمية',
      degree: 'ماجستير',
      university: 'جامعة الملك سعود',
      specialization: 'دراسات عليا',
      fileUrl: '',
      videoUrl: '',
      descriptionAr: ''
    };
    this.isPortfolioModalOpen = true;
  }

  editPortfolioItem(p: PortfolioItem): void {
    this.editingPortfolioId = p.id;
    this.portfolioForm = { ...p };
    this.isPortfolioModalOpen = true;
  }

  closePortfolioModal(): void {
    this.isPortfolioModalOpen = false;
  }

  savePortfolioItem(): void {
    if (!this.portfolioForm.titleAr) return;
    if (this.editingPortfolioId) {
      this.api.updatePortfolioItem(this.editingPortfolioId, this.portfolioForm).subscribe();
      const idx = this.portfolioItems.findIndex(p => p.id === this.editingPortfolioId);
      if (idx !== -1) {
        this.portfolioItems[idx] = { ...this.portfolioItems[idx], ...this.portfolioForm } as PortfolioItem;
      }
      this.showToast('تم تحديث العمل الأكاديمي بنجاح');
    } else {
      this.api.createPortfolioItem(this.portfolioForm).subscribe(res => {
        this.portfolioItems.unshift(res);
      });
      this.showToast('تمت إضافة العمل والملف المرفق بنجاح');
    }
    this.isPortfolioModalOpen = false;
    this.audio.playSuccess();
  }

  deletePortfolioItem(id: string): void {
    this.api.deletePortfolioItem(id).subscribe();
    this.portfolioItems = this.portfolioItems.filter(p => p.id !== id);
    this.showToast('تم حذف العمل بنجاح');
  }

  togglePortfolioStatus(p: PortfolioItem): void {
    p.isActive = !p.isActive;
    this.api.updatePortfolioItem(p.id, { isActive: p.isActive }).subscribe();
    this.showToast(`تم ${p.isActive ? 'تفعيل' : 'إخفاء'} العمل بنجاح`);
  }

  savePageContent(pg: PageItem): void {
    this.api.updatePage(pg.slug, pg).subscribe();
    this.showToast(`تم حفظ نصوص (${pg.titleAr}) في قاعدة البيانات بنجاح!`);
    this.audio.playSuccess();
  }

  togglePagePublished(pg: PageItem): void {
    pg.isPublished = !pg.isPublished;
    this.api.updatePage(pg.slug, { isPublished: pg.isPublished }).subscribe();
    this.showToast(`تم ${pg.isPublished ? 'نشر' : 'إخفاء'} الصفحة بنجاح`);
  }

  openAddFooterModal(): void {
    this.editingFooterId = null;
    this.footerForm = { titleAr: '', url: '/', group: 'quick', isActive: true };
    this.isFooterModalOpen = true;
  }

  editFooterLink(fl: FooterLinkItem): void {
    this.editingFooterId = fl.id;
    this.footerForm = { ...fl };
    this.isFooterModalOpen = true;
  }

  closeFooterModal(): void {
    this.isFooterModalOpen = false;
  }

  saveFooterLink(): void {
    if (!this.footerForm.titleAr) return;
    if (this.editingFooterId) {
      this.api.updateFooterLink(this.editingFooterId, this.footerForm).subscribe();
      const idx = this.footerLinks.findIndex(f => f.id === this.editingFooterId);
      if (idx !== -1) {
        this.footerLinks[idx] = { ...this.footerLinks[idx], ...this.footerForm } as FooterLinkItem;
      }
      this.showToast('تم تحديث رابط الفوتر بنجاح');
    } else {
      this.api.createFooterLink(this.footerForm).subscribe(res => {
        this.footerLinks.push(res);
      });
      this.showToast('تمت إضافة الرابط بنجاح');
    }
    this.isFooterModalOpen = false;
  }

  deleteFooterLink(id: string): void {
    this.api.deleteFooterLink(id).subscribe();
    this.footerLinks = this.footerLinks.filter(f => f.id !== id);
    this.showToast('تم حذف الرابط بنجاح');
  }

  toggleFooterLinkStatus(fl: FooterLinkItem): void {
    fl.isActive = !fl.isActive;
    this.api.updateFooterLink(fl.id, { isActive: fl.isActive }).subscribe();
    this.showToast(`تم ${fl.isActive ? 'تفعيل' : 'إخفاء'} الرابط بنجاح`);
  }

  openAddServiceModal(): void {
    this.editingServiceId = null;
    this.serviceForm = { nameAr: '', priceMin: 200, priceMax: 1000, estimatedDuration: '3-5 أيام' };
    this.isServiceModalOpen = true;
  }

  editService(s: ServiceItem): void {
    this.editingServiceId = s.id;
    this.serviceForm = { ...s };
    this.isServiceModalOpen = true;
  }

  closeServiceModal(): void {
    this.isServiceModalOpen = false;
  }

  saveService(): void {
    if (!this.serviceForm.nameAr) return;
    if (this.editingServiceId) {
      const idx = this.services.findIndex(s => s.id === this.editingServiceId);
      if (idx !== -1) {
        this.services[idx] = { ...this.services[idx], ...this.serviceForm } as ServiceItem;
      }
      this.showToast('تم تحديث الخدمة بنجاح');
    } else {
      const newS: ServiceItem = {
        id: 's_' + Date.now(),
        categoryId: '1',
        nameAr: this.serviceForm.nameAr || '',
        slug: 'service-' + Date.now(),
        priceType: 'range',
        priceMin: this.serviceForm.priceMin || 100,
        priceMax: this.serviceForm.priceMax || 500,
        priceCurrency: 'SAR',
        estimatedDuration: this.serviceForm.estimatedDuration || '3-5 أيام',
        isFeatured: false
      };
      this.services.unshift(newS);
      this.showToast('تمت إضافة الخدمة بنجاح');
    }
    this.isServiceModalOpen = false;
  }

  deleteService(id: string): void {
    this.services = this.services.filter(s => s.id !== id);
    this.showToast('تم حذف الخدمة بنجاح');
  }

  openAddReviewModal(): void {
    this.editingReviewId = null;
    this.reviewForm = { clientName: '', city: 'الرياض', clientUniversity: 'جامعة الملك سعود', contentAr: '' };
    this.isReviewModalOpen = true;
  }

  editTestimonial(t: Testimonial): void {
    this.editingReviewId = t.id;
    this.reviewForm = { ...t };
    this.isReviewModalOpen = true;
  }

  closeReviewModal(): void {
    this.isReviewModalOpen = false;
  }

  saveReview(): void {
    if (!this.reviewForm.clientName) return;
    if (this.editingReviewId) {
      const idx = this.testimonials.findIndex(t => t.id === this.editingReviewId);
      if (idx !== -1) {
        this.testimonials[idx] = { ...this.testimonials[idx], ...this.reviewForm } as Testimonial;
      }
      this.showToast('تم تحديث التقييم بنجاح');
    } else {
      const newT: Testimonial = {
        id: 't_' + Date.now(),
        clientName: this.reviewForm.clientName || '',
        clientUniversity: this.reviewForm.clientUniversity || 'جامعة سعودية',
        city: this.reviewForm.city || 'الرياض',
        contentAr: this.reviewForm.contentAr || '',
        rating: 5
      };
      this.testimonials.unshift(newT);
      this.showToast('تمت إضافة التقييم بنجاح');
    }
    this.isReviewModalOpen = false;
  }

  deleteTestimonial(id: string): void {
    this.testimonials = this.testimonials.filter(t => t.id !== id);
    this.showToast('تم حذف التقييم بنجاح');
  }

  syncMascotFormFromService(): void {
    this.agentMascotForm = {
      maleName: this.agentService.maleName(),
      maleTitle: this.agentService.maleTitle(),
      maleRole: this.agentService.maleRole(),
      maleGreeting: this.agentService.maleGreeting(),
      femaleName: this.agentService.femaleName(),
      femaleTitle: this.agentService.femaleTitle(),
      femaleRole: this.agentService.femaleRole(),
      femaleGreeting: this.agentService.femaleGreeting(),
      basePrice: this.agentService.basePrice(),
      discountPrice: this.agentService.discountPrice(),
      discountPercentage: this.agentService.discountPercentage(),
      isMascotActive: this.agentService.isMascotActive()
    };
  }

  applyMascotPreset(presetKey: 'saud_farah' | 'abdullah_reem' | 'faisal_nouf' | 'khalid_sarah'): void {
    this.agentService.applyPreset(presetKey);
    this.syncMascotFormFromService();
    this.showToast('تم تطبيق باقة الشخصيات الذكية بنجاح! ⚡');
    this.audio.playSuccess();
  }

  saveAllMascotSettings(): void {
    this.agentService.saveConfig(this.agentMascotForm);
    this.showToast('تم حفظ وتطبيق إعدادات الشخصيات والأسعار فوراً على كامل المنصة! 💾✓');
    this.audio.playSuccess();
  }

  saveSaudSettings(): void {
    this.saveAllMascotSettings();
  }

  saveFarahSettings(): void {
    this.saveAllMascotSettings();
  }

  savePlatformSettings(): void {
    this.showToast('تم حفظ إعدادات المنصة بنجاح');
    this.audio.playSuccess();
  }

  exportBackupJson(): void {
    const backupData = {
      database: 'ummreham_dev.db',
      exportedAt: new Date().toISOString(),
      orders: this.orders,
      portfolio: this.portfolioItems,
      pages: this.pages,
      services: this.services,
      testimonials: this.testimonials,
      footerLinks: this.footerLinks
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `umm_reham_full_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.showToast('تم تصدير النسخة الاحتياطية الكاملة بنجاح!');
  }

  private showToast(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = '', 3500);
  }
}
