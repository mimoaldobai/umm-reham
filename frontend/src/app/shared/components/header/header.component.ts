import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AudioService } from '../../../core/services/audio.service';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeSwitcherComponent],
  template: `
    <header class="ls-floating-header-wrapper" [class.scrolled]="isScrolled">
      <div class="container ls-nav-container">
        <div class="ls-navbar-capsule">
          
          <!-- Brand Logo Group -->
          <div class="ls-brand-group">
            <a routerLink="/" class="ls-brand-logo" (click)="onNavClick()">
              <div class="ls-brand-avatar-box">
                <img src="assets/images/reham_profile_luxury.jpg" alt="أم رهام" class="ls-brand-avatar-img" />
                <span class="ls-avatar-verified-badge" title="علامة أكاديمية معتمدة">✓</span>
              </div>
              <div class="ls-brand-text">
                <span class="ls-brand-title">أم رهام</span>
                <span class="ls-brand-sub">تعليم • تطوير • استشارات</span>
              </div>
            </a>
          </div>

          <!-- Desktop Navigation Links (منصة أم رهام للخدمات الأكاديمية) -->
          <nav class="ls-nav-links">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (mouseenter)="onHover()" (click)="onNavClick()">الرئيسية</a>
            <a routerLink="/services" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">خدماتنا الأكاديمية</a>
            <a href="#quick-intent" (mouseenter)="onHover()" (click)="onNavClick()">المحاكي الذكي</a>
            <a routerLink="/portfolio" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">نماذج من أعمالنا</a>
            <a routerLink="/testimonials" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">آراء الباحثين</a>
            <a routerLink="/contact" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">تواصل معنا</a>
          </nav>

          <!-- Header Actions (Search & Login Button) -->
          <div class="ls-header-actions">
            <!-- Global Theme Switcher Trigger -->
            <app-theme-switcher></app-theme-switcher>

            <!-- Search Trigger Icon -->
            <a href="#hero-search-bar" class="ls-search-icon-btn" title="البحث السريع عن خدمة">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </a>

            <!-- Royal Green CTA / Login Button -->
            <a href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85" 
               target="_blank" 
               class="ls-btn-green-cta"
               (click)="audio.playClick()">
              <span>اطلب بحثك الآن 💬</span>
            </a>

            <button type="button" class="ls-btn-admin-icon" (click)="openAdminPortal()" title="لوحة التحكم">
              <span>⚙️</span>
            </button>

            <!-- Mobile Hamburger Toggle -->
            <button type="button" class="mobile-menu-btn" (click)="toggleMobileMenu()">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Navigation -->
      <div class="mobile-drawer" [class.open]="isMobileMenuOpen">
        <nav class="mobile-nav-links">
          <a routerLink="/" (click)="closeMobileMenu()">الرئيسية</a>
          <a href="#universities-section" (click)="closeMobileMenu()">الجامعات</a>
          <a routerLink="/services" (click)="closeMobileMenu()">الخدمات الأكاديمية</a>
          <a routerLink="/portfolio" (click)="closeMobileMenu()">أعمالنا وأبحاثنا</a>
          <a routerLink="/testimonials" (click)="closeMobileMenu()">آراء الباحثين</a>
          <a routerLink="/contact" (click)="closeMobileMenu()">تواصل معنا</a>
          <div class="mobile-theme-row">
            <span>طابع الألوان:</span>
            <app-theme-switcher></app-theme-switcher>
          </div>
          <a href="javascript:void(0)" (click)="openAdminPortal(); closeMobileMenu()">لوحة التحكم (الإدارة)</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .ls-floating-header-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 0.9rem 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .ls-floating-header-wrapper.scrolled {
      padding: 0.28rem 0;
    }

    .ls-nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .ls-navbar-capsule {
      background: #FFFFFF;
      border-radius: 9999px;
      box-shadow: 0 10px 30px rgba(27, 67, 50, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      padding: 0.55rem 1.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.2rem;
      transition: all 0.25s ease;
    }

    .ls-floating-header-wrapper.scrolled .ls-navbar-capsule {
      padding: 0.3rem 1.1rem;
      gap: 0.8rem;
      box-shadow: 0 10px 30px rgba(27, 67, 50, 0.12);
      border-color: #C9A96E;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(16px);
    }

    .ls-floating-header-wrapper.scrolled .ls-logo-icon {
      width: 30px;
      height: 30px;
      border-radius: 8px;
    }

    .ls-floating-header-wrapper.scrolled .ls-logo-svg {
      width: 16px;
      height: 16px;
    }

    .ls-floating-header-wrapper.scrolled .ls-brand-title {
      font-size: 1.08rem;
    }

    .ls-floating-header-wrapper.scrolled .ls-brand-sub {
      display: none;
    }

    .ls-floating-header-wrapper.scrolled .ls-nav-links {
      gap: clamp(0.4rem, 1vw, 0.9rem);
    }

    .ls-floating-header-wrapper.scrolled .ls-nav-links a {
      font-size: 0.82rem;
      padding: 0.2rem 0.1rem;
    }

    .ls-floating-header-wrapper.scrolled .ls-btn-green-cta {
      padding: 0.4rem 0.95rem;
      font-size: 0.82rem;
    }

    .ls-floating-header-wrapper.scrolled .ls-search-icon-btn,
    .ls-floating-header-wrapper.scrolled .ls-btn-admin-icon {
      width: 32px;
      height: 32px;
    }

    /* Brand Logo Group */
    .ls-brand-group {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      flex-shrink: 0;
    }

    .ls-brand-logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
    }

    .ls-brand-avatar-box {
      position: relative;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      padding: 2px;
      background: linear-gradient(135deg, #FBE6B3 0%, #C9A96E 50%, #96753C 100%);
      box-shadow: 0 4px 15px rgba(201, 169, 110, 0.4), 0 0 0 1px rgba(27, 67, 50, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      flex-shrink: 0;
      overflow: visible;
    }

    .ls-brand-logo:hover .ls-brand-avatar-box {
      transform: scale(1.08) rotate(3deg);
      box-shadow: 0 6px 20px rgba(201, 169, 110, 0.6);
    }

    .ls-brand-avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      border: 1.5px solid #FFFFFF;
      transform: scale(1.05);
    }

    .ls-avatar-verified-badge {
      position: absolute;
      bottom: -1px;
      left: -1px;
      width: 16px;
      height: 16px;
      background: #059669;
      color: #FFFFFF;
      border-radius: 50%;
      font-size: 10px;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid #FFFFFF;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    }

    .ls-brand-text {
      display: flex;
      flex-direction: column;
    }

    .ls-brand-title {
      font-size: 1.35rem;
      font-weight: 900;
      color: #1B4332;
      line-height: 1.1;
      letter-spacing: -0.5px;
    }

    .ls-brand-sub {
      font-size: 0.68rem;
      color: #A48348;
      font-weight: 700;
    }

    /* Green Pill Button (الجامعات) */
    .ls-btn-green-pill {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      border: 1px solid #C9A96E;
      color: #F8F5EE;
      padding: 0.45rem 1.1rem;
      border-radius: 9999px;
      font-size: 0.84rem;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.25);
      transition: all 0.25s ease;
      white-space: nowrap;
    }

    .ls-btn-green-pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(201, 169, 110, 0.4);
      color: #DFC698;
    }

    /* Nav Links */
    .ls-nav-links {
      display: flex;
      align-items: center;
      gap: clamp(0.6rem, 1.4vw, 1.4rem);
      justify-content: center;
      flex: 1;
    }

    .ls-nav-links a {
      color: #2D4A3E;
      font-size: 0.9rem;
      font-weight: 700;
      padding: 0.35rem 0.2rem;
      position: relative;
      transition: color 0.2s ease;
      white-space: nowrap;
    }

    .ls-nav-links a:hover,
    .ls-nav-links a.active {
      color: #C9A96E;
    }

    /* Header Actions */
    .ls-header-actions {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex-shrink: 0;
    }

    .ls-search-icon-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1B4332;
      transition: all 0.2s ease;
    }

    .ls-search-icon-btn:hover {
      color: #C9A96E;
      background: #F4EFE6;
    }

    /* Royal Green CTA Button */
    .ls-btn-green-cta {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      border: 1px solid #C9A96E;
      padding: 0.55rem 1.4rem;
      border-radius: 9999px;
      font-size: 0.88rem;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.25);
      transition: all 0.25s ease;
      white-space: nowrap;
      cursor: pointer;
    }

    .ls-btn-green-cta:hover {
      transform: translateY(-2px);
      background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
      box-shadow: 0 6px 20px rgba(201, 169, 110, 0.35);
      color: #DFC698;
    }

    .ls-btn-admin-icon {
      background: #F4EFE6;
      border: 1px solid rgba(201, 169, 110, 0.4);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .ls-btn-admin-icon:hover {
      background: #E8DEC8;
      transform: rotate(45deg);
    }

    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
    }

    .mobile-menu-btn .bar {
      width: 24px;
      height: 2px;
      background: #F9F7F1;
      border-radius: 2px;
      transition: 0.3s;
    }

    /* Mobile Drawer */
    .mobile-drawer {
      display: none;
    }

    @media (max-width: 992px) {
      .nav-links, .action-btn.audio-btn, .admin-link {
        display: none;
      }
      .mobile-menu-btn {
        display: flex;
      }
      .mobile-drawer {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(11, 28, 21, 0.98);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(201, 169, 110, 0.3);
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease;
      }
      .mobile-drawer.open {
        max-height: 400px;
      }
      .mobile-nav-links {
        display: flex;
        flex-direction: column;
        padding: 1.5rem 2rem;
        gap: 1rem;
      }
      .mobile-nav-links a {
        color: #F9F7F1;
        font-size: 1.1rem;
        font-weight: 500;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }
    }
  `]
})
export class HeaderComponent {
  audio = inject(AudioService);
  authService = inject(AuthService);
  router = inject(Router);

  isScrolled = false;
  isMobileMenuOpen = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 30;
      });
    }
  }

  openAdminPortal(): void {
    this.audio.playClick();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin']);
    } else {
      this.authService.openLoginModal();
    }
  }

  toggleSound(): void {
    this.audio.toggleSound();
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

