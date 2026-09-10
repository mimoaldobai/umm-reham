import { Component, OnInit, OnDestroy, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AudioService } from '../../../core/services/audio.service';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ApiService } from '../../../core/services/api.service';
import { CartService } from '../../../core/services/cart.service';
import { ClientAuthService } from '../../../core/services/client-auth.service';
import { CartDrawerComponent } from '../cart-drawer/cart-drawer.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { ClientAuthModalComponent } from '../client-auth-modal/client-auth-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CartDrawerComponent,
    ThemeSwitcherComponent,
    ClientAuthModalComponent
  ],
  template: `
    <!-- ==========================================
         1. TOP BAR (الشريط العلوي المعتمد)
         ========================================== -->
    <div class="site-topbar" dir="rtl">
      <div class="topbar-inner-container">
        
        <!-- Right: Saudi Platform Title -->
        <div class="topbar-platform-info">
          <span class="flag-icon" role="img" aria-label="علم السعودية">🇸🇦</span>
          <span class="platform-text">منصة سعودية للدعم الأكاديمي والاستشارات – نخدم جميع مناطق المملكة  منصة سعودية للدعم الأكاديمي</span>
        </div>

        <!-- Left: Live Weather, City, Time & Hijri Date -->
        <div class="topbar-meta-row">
          <span class="meta-item"><span class="meta-icon">🌙</span> صافي، C°44</span>
          <span class="meta-sep">|</span>
          <span class="meta-item"><span class="meta-icon">📍</span> الرياض</span>
          <span class="meta-sep">|</span>
          <span class="meta-item"><span class="meta-icon">🕒</span> {{ currentTime }}</span>
          <span class="meta-sep">|</span>
          <span class="meta-item date-highlight" [title]="'اليوم: ' + todayGregorian"><span class="meta-icon">📅</span> {{ currentHijriDate }}</span>
        </div>

      </div>
    </div>

    <!-- ==========================================
         2. MAIN NAVIGATION HEADER (الترويسة البيضاء الفاخرة)
         ========================================== -->
    <header class="main-site-header" [class.scrolled]="isScrolled" dir="rtl">
      <div class="header-inner-container">
        
        <!-- Right: Brand Logo (UR Monogram with Sunburst + Slogan) -->
        <div class="header-brand-section">
          <a routerLink="/" class="brand-link" (click)="onNavClick()">
            
            <!-- UR Monogram Logo with Sunburst (الشعار أولاً قبل الاسم) -->
            <div class="ur-logo-emblem" title="أم رهام — UMM REHAM">
              <svg viewBox="0 0 48 48" width="44" height="44" class="ur-svg">
                <!-- Sunburst Rays above R -->
                <g fill="#E5B94F" stroke="#E5B94F">
                  <circle cx="34" cy="7" r="1.6" />
                  <path d="M34 1.5 L34 4" stroke-width="1.8" stroke-linecap="round" />
                  <path d="M39 3.5 L37 5.5" stroke-width="1.8" stroke-linecap="round" />
                  <path d="M41 9 L38.5 8" stroke-width="1.8" stroke-linecap="round" />
                  <path d="M29 3.5 L31 5.5" stroke-width="1.8" stroke-linecap="round" />
                  <path d="M27 9 L29.5 8" stroke-width="1.8" stroke-linecap="round" />
                </g>
                <!-- U Letter -->
                <path d="M7 13 V25 C7 31.5 11.5 35 16.5 35 C21.5 35 26 31.5 26 25 V13 H20.5 V24.8 C20.5 27.5 18.8 29.5 16.5 29.5 C14.2 29.5 12.5 27.5 12.5 24.8 V13 Z" fill="#0F5132" />
                <!-- R Letter -->
                <path d="M25 13 H34.5 C38.5 13 41.5 15.8 41.5 19.5 C41.5 22.8 39.2 24.8 36.2 25.4 L41.5 35 H35.2 L30.8 26.2 H29.5 V35 H25 Z M29.5 17.5 V22 H34 C35.8 22 36.8 21.2 36.8 19.8 C36.8 18.4 35.8 17.5 34 17.5 Z" fill="#0F5132" />
              </svg>
            </div>

            <!-- Brand Text Details (الاسم والتفاصيل بعد الشعار) -->
            <div class="brand-text-col">
              <span class="brand-name">أم رهام</span>
              <span class="brand-subtext">تعليم • استشارات • تطوير • إنجاز</span>
            </div>

          </a>
        </div>

        <!-- Center: Navigation Links -->
        <nav class="header-nav-menu">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (mouseenter)="onHover()" (click)="onNavClick()">الرئيسية</a>
          <a routerLink="/about" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">من نحن</a>
          
          <!-- Dropdown for Services -->
          <div class="nav-dropdown-item" (mouseenter)="isServicesMenuOpen = true" (mouseleave)="isServicesMenuOpen = false">
            <a routerLink="/services" routerLinkActive="active" (click)="onNavClick()" class="dropdown-trigger">
              <span>خدماتنا</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </a>
            
            <div class="dropdown-panel" *ngIf="isServicesMenuOpen">
              <a routerLink="/services" [queryParams]="{category: 'all'}" (click)="isServicesMenuOpen = false; onNavClick()">
                <span class="dp-icon">✨</span> جميع الخدمات بالمتجر
              </a>
              <a routerLink="/services" [queryParams]="{category: 'schools'}" (click)="isServicesMenuOpen = false; onNavClick()">
                <span class="dp-icon">🎒</span> خدمات طلاب المدارس
              </a>
              <a routerLink="/services" [queryParams]="{category: 'university'}" (click)="isServicesMenuOpen = false; onNavClick()">
                <span class="dp-icon">🎓</span> الخدمات الجامعية
              </a>
              <a routerLink="/services" [queryParams]="{category: 'office'}" (click)="isServicesMenuOpen = false; onNavClick()">
                <span class="dp-icon">📑</span> الخدمات المكتبية
              </a>
              <a routerLink="/services" [queryParams]="{category: 'general'}" (click)="isServicesMenuOpen = false; onNavClick()">
                <span class="dp-icon">🏛️</span> الخدمات العامة
              </a>
            </div>
          </div>

          <a routerLink="/order" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">طلب خدمة</a>
          <a routerLink="/testimonials" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">آراء العملاء</a>
          <a routerLink="/articles" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">المقالات</a>
          <a routerLink="/contact" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">تواصل معنا</a>
        </nav>

        <!-- Left: Action CTA & Tools -->
        <div class="header-action-group">
          
          <!-- Green "طلب خدمة" Button -->
          <a routerLink="/order" class="btn-consultation-cta" (click)="onNavClick()">
            <span>طلب خدمة</span>
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </span>
          </a>

          <!-- Cart Trigger Icon -->
          <button type="button" class="btn-cart-icon" (click)="cartService.toggleCart()" title="سلة الخدمات والطلبات">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="cart-badge" *ngIf="cartService.totalCount() > 0">
              {{ cartService.totalCount() }}
            </span>
          </button>

          <!-- Client Profile / Login Trigger -->
          <ng-container *ngIf="!clientAuth.isAuthenticated()">
            <button type="button" class="btn-client-login-trigger" (click)="openClientTab('login')" title="تسجيل الدخول أو إنشاء حساب طالب">
              <span class="client-mini-icon">👤</span>
              <span class="btn-client-label">حسابي</span>
            </button>
          </ng-container>

          <ng-container *ngIf="clientAuth.isAuthenticated()">
            <div class="client-account-capsule-wrap" (click)="$event.stopPropagation()">
              <button type="button" class="btn-client-capsule" (click)="toggleClientMenu($event)" [title]="'حساب: ' + clientAuth.currentClient()?.fullName">
                <div class="client-avatar-circle" [style.background]="clientAuth.currentClient()?.avatarColor">
                  {{ getClientInitials(clientAuth.currentClient()?.fullName) }}
                </div>
                <div class="client-name-wrap">
                  <span class="client-name">{{ clientAuth.currentClient()?.fullName }}</span>
                  <span class="client-role">{{ clientAuth.currentClient()?.academicLevel }}</span>
                </div>
                <span class="chevron-arrow" [class.open]="isClientMenuOpen">▾</span>
              </button>

              <!-- Dropdown Menu -->
              <div class="client-dropdown-menu" *ngIf="isClientMenuOpen">
                <div class="dropdown-client-header">
                  <div class="header-avatar-circle" [style.background]="clientAuth.currentClient()?.avatarColor">
                    {{ getClientInitials(clientAuth.currentClient()?.fullName) }}
                  </div>
                  <div class="header-info-col">
                    <strong>{{ clientAuth.currentClient()?.fullName }}</strong>
                    <small>{{ clientAuth.currentClient()?.phone }}</small>
                    <span class="header-univ-badge">{{ clientAuth.currentClient()?.university }}</span>
                  </div>
                </div>

                <div class="dropdown-menu-links">
                  <button type="button" class="dropdown-link-item" (click)="openClientTab('profile')">
                    <span class="item-icon">🎓</span>
                    <span>الملف الأكاديمي وتعديل البيانات</span>
                  </button>
                  <button type="button" class="dropdown-link-item" (click)="openClientTab('orders')">
                    <span class="item-icon">📦</span>
                    <span>طلباتي وسجل الإنجاز</span>
                  </button>
                  <button type="button" class="dropdown-link-item" (click)="openCartFromMenu()">
                    <span class="item-icon">🛒</span>
                    <span>سلة الخدمات ({{ cartService.totalCount() }})</span>
                  </button>
                  <div class="dropdown-divider"></div>
                  <button type="button" class="dropdown-link-item logout-link" (click)="logoutClient()">
                    <span class="item-icon">🚪</span>
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            </div>
          </ng-container>

          <!-- Multi-Theme Palette Switcher (👑 السيادية | 🤍 العاجي | 🌙 الزمرد الليلي | 🏛️ التراثي) -->
          <app-theme-switcher></app-theme-switcher>

          <!-- Mobile Hamburger Menu Button -->
          <button type="button" class="btn-mobile-toggle" (click)="toggleMobileMenu()" aria-label="القائمة">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>

        </div>

      </div>

      <!-- Mobile Dropdown Navigation Drawer -->
      <div class="mobile-nav-drawer" [class.open]="isMobileMenuOpen">
        <!-- Mobile Client Section -->
        <div class="mobile-client-banner">
          <ng-container *ngIf="!clientAuth.isAuthenticated()">
            <button type="button" class="btn-mobile-client-login" (click)="openClientTab('login'); closeMobileMenu()">
              <span>👤 تسجيل الدخول / حساب جديد</span>
            </button>
          </ng-container>
          <ng-container *ngIf="clientAuth.isAuthenticated()">
            <div class="mobile-client-card" (click)="openClientTab('profile'); closeMobileMenu()">
              <div class="client-avatar-circle" [style.background]="clientAuth.currentClient()?.avatarColor">
                {{ getClientInitials(clientAuth.currentClient()?.fullName) }}
              </div>
              <div>
                <strong>{{ clientAuth.currentClient()?.fullName }}</strong>
                <small>{{ clientAuth.currentClient()?.academicLevel }} • {{ clientAuth.currentClient()?.university }}</small>
              </div>
            </div>
          </ng-container>
        </div>

        <nav class="mobile-nav-items">
          <a routerLink="/" (click)="closeMobileMenu()">الرئيسية</a>
          <a routerLink="/about" (click)="closeMobileMenu()">من نحن</a>
          <a routerLink="/services" (click)="closeMobileMenu()">المتجر والخدمات 🛒</a>
          <a routerLink="/order" (click)="closeMobileMenu()">طلب خدمة ومتابعة ✍️</a>
          <a routerLink="/testimonials" (click)="closeMobileMenu()">آراء العملاء ⭐</a>
          <a routerLink="/articles" (click)="closeMobileMenu()">المقالات والأدلة العلمية 📚</a>
          <a routerLink="/contact" (click)="closeMobileMenu()">تواصل معنا 📞</a>
          <a routerLink="/portfolio" (click)="closeMobileMenu()">أعمالنا السابقة 🎨</a>
          <div class="mobile-theme-box" style="padding-top: 0.75rem; border-top: 1px solid #ECECEC;">
            <app-theme-switcher></app-theme-switcher>
          </div>
        </nav>
      </div>

    </header>

    <!-- Global Cart Drawer Component -->
    <app-cart-drawer></app-cart-drawer>

    <!-- Client Account & Profile Modal Component -->
    <app-client-auth-modal></app-client-auth-modal>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1050;
      width: 100%;
    }

    /* =========================================================
       1. TOP BAR STYLES
       ========================================================= */
    .site-topbar {
      background: #FFFFFF;
      border-bottom: 1px solid #ECECEC;
      padding: 0.38rem 1.5rem;
      font-size: 0.82rem;
      color: #555555;
      font-family: var(--font-family-arabic) !important;
      position: relative;
      z-index: 1010;
    }

    .topbar-inner-container {
      max-width: 1360px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }

    .topbar-platform-info {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .flag-icon {
      font-size: 1rem;
    }

    .platform-text {
      color: #333333;
      font-weight: 500;
      letter-spacing: -0.2px;
    }

    .topbar-meta-row {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      white-space: nowrap;
      font-size: 0.8rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #555555;
      font-weight: 500;
    }

    .meta-icon {
      font-size: 0.85rem;
    }

    .meta-sep {
      color: #D1D5DB;
      font-size: 0.75rem;
    }

    .date-highlight {
      color: #222222;
      font-weight: 600;
    }

    /* =========================================================
       2. MAIN WHITE NAVIGATION HEADER
       ========================================================= */
    .main-site-header {
      background: #FFFFFF;
      border-bottom: 1px solid #EAEAEA;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
      position: relative;
      z-index: 1000;
      transition: all 0.25s ease;
      font-family: var(--font-family-arabic) !important;
    }

    .main-site-header.scrolled {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    .header-inner-container {
      max-width: 1360px;
      margin: 0 auto;
      padding: 0.65rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }

    /* Brand Section */
    .header-brand-section {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }

    .brand-text-col {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .brand-name {
      font-size: 1.35rem;
      font-weight: 800;
      color: #0F5132;
      line-height: 1.15;
      letter-spacing: -0.3px;
    }

    .brand-subtext {
      font-size: 0.68rem;
      color: #718096;
      font-weight: 500;
      margin-top: 2px;
      white-space: nowrap;
    }

    .ur-logo-emblem {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s ease;
    }

    .brand-link:hover .ur-logo-emblem {
      transform: scale(1.05);
    }

    /* Navigation Menu */
    .header-nav-menu {
      display: flex;
      align-items: center;
      gap: clamp(0.55rem, 1.15vw, 1.45rem);
      margin: 0 auto;
    }

    .header-nav-menu a {
      color: #2D3748;
      font-size: 0.92rem;
      font-weight: 600;
      text-decoration: none;
      padding: 0.4rem 0.2rem;
      position: relative;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      white-space: nowrap;
    }

    .header-nav-menu a:hover,
    .header-nav-menu a.active {
      color: #0F5132;
    }

    .header-nav-menu a.active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2.5px;
      background: #0F5132;
      border-radius: 4px;
    }

    /* Dropdown for Services */
    .nav-dropdown-item {
      position: relative;
    }

    .dropdown-trigger {
      cursor: pointer;
    }

    .dropdown-panel {
      position: absolute;
      top: 100%;
      right: 0;
      background: #FFFFFF;
      min-width: 210px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
      border: 1px solid #ECECEC;
      padding: 0.5rem 0;
      display: flex;
      flex-direction: column;
      z-index: 1050;
      animation: fadeIn 0.2s ease;
    }

    .dropdown-panel a {
      padding: 0.65rem 1.1rem;
      color: #333333;
      font-size: 0.88rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .dropdown-panel a:hover {
      background: #F4FAF7;
      color: #0F5132;
      padding-right: 1.35rem;
    }

    .dropdown-panel a::after {
      display: none !important;
    }

    .dp-icon {
      margin-left: 0.35rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Header Action Group */
    .header-action-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    /* Green Consultation Button (مطابق تماماً للصورة) */
    .btn-consultation-cta {
      background: #0F5132;
      color: #FFFFFF !important;
      padding: 0.55rem 1.15rem;
      border-radius: 7px;
      font-size: 0.9rem;
      font-weight: 700;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.45rem;
      box-shadow: 0 3px 8px rgba(15, 81, 50, 0.25);
      transition: all 0.25s ease;
    }

    .btn-consultation-cta:hover {
      background: #0A3E26;
      transform: translateY(-1px);
      box-shadow: 0 5px 14px rgba(15, 81, 50, 0.35);
    }

    .btn-cart-icon,
    .btn-theme-icon,
    .btn-admin-icon {
      background: #F7FAFC;
      border: 1px solid #E2E8F0;
      width: 38px;
      height: 38px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4A5568;
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
    }

    .btn-cart-icon:hover,
    .btn-theme-icon:hover,
    .btn-admin-icon:hover {
      background: #EDF2F7;
      color: #0F5132;
      border-color: #CBD5E0;
    }

    .cart-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #E53E3E;
      color: #FFFFFF;
      font-size: 0.7rem;
      font-weight: 800;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #FFFFFF;
    }

    /* Mobile Hamburger Button */
    .btn-mobile-toggle {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 38px;
      height: 38px;
      background: #F7FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 8px;
      cursor: pointer;
    }

    .btn-mobile-toggle .bar {
      width: 100%;
      height: 2px;
      background: #2D3748;
      border-radius: 2px;
      transition: all 0.2s ease;
    }

    /* Mobile Drawer */
    .mobile-nav-drawer {
      display: none;
      max-height: 0;
      overflow: hidden;
      background: #FFFFFF;
      border-top: 1px solid #EAEAEA;
      transition: max-height 0.35s ease;
    }

    .mobile-nav-drawer.open {
      max-height: 480px;
    }

    .mobile-nav-items {
      display: flex;
      flex-direction: column;
      padding: 1rem 1.5rem;
      gap: 0.75rem;
    }

    .mobile-nav-items a {
      color: #2D3748;
      font-size: 0.98rem;
      font-weight: 600;
      padding: 0.5rem 0;
      border-bottom: 1px solid #F0F4F2;
      text-decoration: none;
    }

    .mobile-nav-items a.admin-link {
      color: #0F5132;
      font-weight: 700;
    }

    /* Responsive Queries */
    @media (max-width: 1024px) {
      .header-nav-menu {
        display: none;
      }
      .btn-mobile-toggle {
        display: flex;
      }
      .mobile-nav-drawer {
        display: block;
      }
    }

    @media (max-width: 768px) {
      .topbar-platform-info {
        font-size: 0.74rem;
      }
      .topbar-meta-row {
        display: none;
      }
      .brand-name {
        font-size: 1.15rem;
      }
      .brand-subtext {
        font-size: 0.62rem;
      }
      .btn-consultation-cta {
        padding: 0.45rem 0.85rem;
        font-size: 0.82rem;
      }
    }

    /* Client Account Trigger & Capsule */
    .btn-client-login-trigger {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(16, 185, 129, 0.08);
      border: 1.5px solid rgba(16, 185, 129, 0.35);
      color: #0F5132;
      padding: 0.45rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s;

      &:hover {
        background: #0F5132;
        color: #FFFFFF;
        border-color: #0F5132;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(15, 81, 50, 0.25);
      }
    }

    .client-account-capsule-wrap {
      position: relative;
    }

    .btn-client-capsule {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #FFFFFF;
      border: 1.5px solid rgba(197, 168, 105, 0.45);
      padding: 0.22rem 0.65rem 0.22rem 0.35rem;
      border-radius: 9999px;
      cursor: pointer;
      font-family: inherit;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      transition: all 0.2s;

      &:hover {
        border-color: #C5A869;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(197, 168, 105, 0.25);
      }
    }

    .client-avatar-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 800;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      flex-shrink: 0;
    }

    .client-name-wrap {
      display: flex;
      flex-direction: column;
      text-align: right;
      line-height: 1.15;
    }

    .client-name {
      font-size: 0.82rem;
      font-weight: 800;
      color: #0A2F24;
      max-width: 95px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .client-role {
      font-size: 0.68rem;
      color: #059669;
      font-weight: 600;
    }

    .chevron-arrow {
      font-size: 0.75rem;
      color: #555555;
      transition: transform 0.2s;
      &.open { transform: rotate(180deg); }
    }

    .client-dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      min-width: 255px;
      background: #0B2516;
      border: 1.5px solid rgba(197, 168, 105, 0.4);
      border-radius: 16px;
      padding: 0.85rem;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
      z-index: 9999;
      animation: fadeIn 0.2s ease-out;
      backdrop-filter: blur(16px);
      direction: rtl;
    }

    .dropdown-client-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 0.5rem;
    }

    .header-avatar-circle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: 800;
      border: 1.5px solid #C5A869;
      flex-shrink: 0;
    }

    .header-info-col {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      strong { color: #FFFFFF; font-size: 0.88rem; }
      small { color: #A7F3D0; font-size: 0.75rem; }
    }

    .header-univ-badge {
      font-size: 0.68rem;
      color: #C5A869;
    }

    .dropdown-menu-links {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .dropdown-link-item {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      background: transparent;
      border: none;
      color: #E2ECE7;
      padding: 0.6rem 0.75rem;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      width: 100%;
      text-align: right;
      transition: all 0.2s;

      &:hover {
        background: rgba(16, 185, 129, 0.15);
        color: #34D399;
      }

      &.logout-link {
        color: #FCA5A5;
        &:hover { background: rgba(239, 68, 68, 0.2); }
      }
    }

    .dropdown-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 0.35rem 0;
    }

    .mobile-client-banner {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #ECECEC;
      background: rgba(16, 185, 129, 0.04);
    }

    .btn-mobile-client-login {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: #FFFFFF;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .mobile-client-card {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      strong { display: block; font-size: 0.92rem; color: #0A2F24; }
      small { display: block; font-size: 0.75rem; color: #059669; }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  audio = inject(AudioService);
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  api = inject(ApiService);
  cartService = inject(CartService);
  clientAuth = inject(ClientAuthService);
  router = inject(Router);

  isScrolled = false;
  isMobileMenuOpen = false;
  isServicesMenuOpen = false;
  isClientMenuOpen = false;

  whatsappNumber: string = '966572651058';
  currentTime: string = '';
  currentHijriDate: string = '';
  todayGregorian: string = '';
  private timeInterval: any;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.isClientMenuOpen = false;
  }

  toggleClientMenu(event?: Event): void {
    if (event) event.stopPropagation();
    this.audio.playClick();
    this.isClientMenuOpen = !this.isClientMenuOpen;
  }

  openClientTab(tab: 'login' | 'register' | 'profile' | 'orders'): void {
    this.isClientMenuOpen = false;
    this.clientAuth.openAuthModal(tab);
  }

  openCartFromMenu(): void {
    this.isClientMenuOpen = false;
    this.cartService.openCart();
  }

  logoutClient(): void {
    this.isClientMenuOpen = false;
    this.clientAuth.logout();
  }

  getClientInitials(name?: string): string {
    if (!name) return '👤';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]);
    }
    return parts[0].slice(0, 2);
  }

  ngOnInit(): void {
    this.updateLiveTime();
    // Live ticking clock updating every second (1000ms)
    this.timeInterval = setInterval(() => this.updateLiveTime(), 1000);

    this.api.getWhatsAppNumber().subscribe(num => {
      if (num) this.whatsappNumber = num;
    });
  }

  ngOnDestroy(): void {
    if (this.timeInterval) clearInterval(this.timeInterval);
  }

  updateLiveTime(): void {
    const now = new Date();

    // Live ticking time with seconds
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const minStr = minutes < 10 ? '0' + minutes : minutes;
    const secStr = seconds < 10 ? '0' + seconds : seconds;
    this.currentTime = `${displayHours}:${minStr}:${secStr} ${ampm}`;

    // Dynamic Today's Hijri and Gregorian dates
    try {
      const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const gregFormatter = new Intl.DateTimeFormat('ar-SA-u-nu-latn', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      this.currentHijriDate = hijriFormatter.format(now);
      this.todayGregorian = gregFormatter.format(now);
    } catch {
      this.currentHijriDate = now.toLocaleDateString('ar-SA');
      this.todayGregorian = now.toLocaleDateString('ar-SA');
    }
  }

  toggleTheme(): void {
    const cur = this.themeService.currentTheme();
    if (cur === 'emerald-night') {
      this.themeService.setTheme('emerald');
    } else {
      this.themeService.setTheme('emerald-night');
    }
  }

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 20;
      });
    }
  }


  onHover(): void {
    this.audio.playHover();
  }

  onNavClick(): void {
    this.audio.playClick();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.audio.playClick();
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.audio.playClick();
  }
}
