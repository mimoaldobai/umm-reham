import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AudioService } from '../../../core/services/audio.service';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeSwitcherComponent],
  template: `
    <header class="ls-floating-header-wrapper" [class.scrolled]="isScrolled">
      <div class="container ls-nav-container">
        <div class="ls-navbar-capsule">
          
          <!-- Brand Logo Group (Golden Quill + Brand Name) -->
          <div class="ls-brand-group">
            <a routerLink="/" class="ls-brand-logo" (click)="onNavClick()">
              <div class="ls-brand-quill-box">
                <svg viewBox="0 0 32 32" width="34" height="34" fill="none" class="quill-gold-svg">
                  <path d="M26 3C26 3 24 9 19 14C14 19 8 23 4 25C7 22 10 18 12 14C14 10 18 5 26 3Z" fill="#C5A869" stroke="#E6C88A" stroke-width="1.5"/>
                  <path d="M12 14L4 28L9 24" stroke="#C5A869" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 11C18 13 21 15 23 15" stroke="#0A2F24" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="ls-brand-text">
                <span class="ls-brand-title">أم رهام</span>
                <span class="ls-brand-sub">للخدمات التعليمية والبحثية</span>
              </div>
            </a>
          </div>

          <!-- Desktop Navigation Links -->
          <nav class="ls-nav-links">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (mouseenter)="onHover()" (click)="onNavClick()">الرئيسية</a>
            <a routerLink="/contact" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">من نحن</a>
            <a routerLink="/services" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">خدماتنا ⌵</a>
            <a routerLink="/portfolio" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">أعمالنا</a>
            <a routerLink="/testimonials" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">آراء العملاء</a>
            <a routerLink="/contact" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">المقالات العلمية</a>
            <a routerLink="/contact" routerLinkActive="active" (mouseenter)="onHover()" (click)="onNavClick()">تواصل معنا</a>
          </nav>

          <!-- Header Actions -->
          <div class="ls-header-actions">
            <!-- Green WhatsApp Contact Button -->
            <a href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85" 
               target="_blank" 
               class="ls-btn-green-cta"
               (click)="onNavClick()">
              <span>تواصل معنا 💬</span>
            </a>

            <!-- Night / Dark Mode Moon Toggle -->
            <button type="button" class="ls-theme-moon-btn" (click)="toggleTheme()" [title]="themeService.currentTheme() === 'emerald-night' ? 'الوضع النهاري' : 'الوضع الليلي'">
              <span>{{ themeService.currentTheme() === 'emerald-night' ? '☀️' : '🌙' }}</span>
            </button>

            <!-- Admin Icon -->
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
          <a routerLink="/contact" (click)="closeMobileMenu()">من نحن</a>
          <a routerLink="/services" (click)="closeMobileMenu()">خدماتنا</a>
          <a routerLink="/portfolio" (click)="closeMobileMenu()">أعمالنا</a>
          <a routerLink="/testimonials" (click)="closeMobileMenu()">آراء العملاء</a>
          <a routerLink="/contact" (click)="closeMobileMenu()">المقالات العلمية</a>
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
      padding: 0.75rem 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .ls-floating-header-wrapper.scrolled {
      padding: 0.35rem 0;
    }

    .ls-nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .ls-navbar-capsule {
      background: rgba(10, 47, 36, 0.94);
      backdrop-filter: blur(20px);
      border-radius: 9999px;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(197, 168, 105, 0.2);
      border: 1.5px solid rgba(197, 168, 105, 0.35);
      padding: 0.45rem 1.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.2rem;
      transition: all 0.25s ease;
    }

    .ls-floating-header-wrapper.scrolled .ls-navbar-capsule {
      padding: 0.35rem 1.1rem;
      gap: 0.8rem;
      background: rgba(10, 47, 36, 0.98);
      box-shadow: 0 14px 40px rgba(0, 0, 0, 0.65);
      border-color: #C5A869;
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
      gap: 0.75rem;
      text-decoration: none;
    }

    .ls-brand-quill-box {
      width: 42px;
      height: 42px;
      max-width: 42px;
      max-height: 42px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      border: 1.5px solid #C5A869;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      box-shadow: 0 2px 10px rgba(197, 168, 105, 0.35);
      transition: all 0.3s ease;
      flex-shrink: 0;
      overflow: hidden;
    }

    .ls-brand-logo:hover .ls-brand-quill-box {
      transform: scale(1.08) rotate(4deg);
      border-color: #E6C88A;
      box-shadow: 0 4px 16px rgba(197, 168, 105, 0.55);
    }

    .quill-gold-svg {
      width: 32px;
      height: 32px;
      max-width: 32px;
      max-height: 32px;
      display: block;
      filter: drop-shadow(0 2px 4px rgba(197, 168, 105, 0.4));
      flex-shrink: 0;
    }

    .ls-brand-text {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .ls-brand-title {
      font-size: 1.35rem;
      font-weight: 900;
      color: #FBF9F5;
      line-height: 1.1;
      letter-spacing: -0.5px;
      font-family: 'Amiri', serif;
    }

    .ls-brand-sub {
      font-size: 0.7rem;
      color: #C5A869;
      font-weight: 700;
    }

    /* Desktop Navigation Links */
    .ls-nav-links {
      display: flex;
      align-items: center;
      gap: clamp(0.5rem, 1.2vw, 1.3rem);
      justify-content: center;
      flex: 1;
    }

    .ls-nav-links a {
      color: #E2E8E4;
      font-size: 0.92rem;
      font-weight: 700;
      padding: 0.35rem 0.4rem;
      position: relative;
      transition: color 0.2s ease;
      white-space: nowrap;
      text-decoration: none;
    }

    .ls-nav-links a:hover,
    .ls-nav-links a.active {
      color: #C5A869;
    }

    .ls-nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 15%;
      right: 15%;
      height: 2.5px;
      background: #C5A869;
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(197, 168, 105, 0.8);
    }

    /* Header Actions */
    .ls-header-actions {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      flex-shrink: 0;
    }

    .ls-btn-green-cta {
      background: linear-gradient(135deg, #25D366 0%, #1EBE5D 100%);
      border: 1px solid rgba(255,255,255,0.25);
      color: #FFFFFF;
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
      transition: all 0.25s ease;
      text-decoration: none;
      white-space: nowrap;
    }

    .ls-btn-green-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.55);
      color: #FFFFFF;
    }

    .ls-theme-moon-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(197, 168, 105, 0.3);
      color: #FBF9F5;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.05rem;
      transition: all 0.25s ease;
    }

    .ls-theme-moon-btn:hover {
      background: rgba(197, 168, 105, 0.25);
      border-color: #C5A869;
      transform: scale(1.08);
    }

    .ls-btn-admin-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(197, 168, 105, 0.25);
      color: #FBF9F5;
      cursor: pointer;
      transition: all 0.25s ease;
      font-size: 1rem;
    }

    .ls-btn-admin-icon:hover {
      background: rgba(197, 168, 105, 0.25);
      border-color: #C5A869;
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

    /* Mobile Drawer - strictly hidden on desktop */
    .mobile-drawer {
      display: none;
    }

    @media (max-width: 992px) {
      .ls-nav-links, .ls-btn-green-cta, .ls-btn-admin-icon {
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
        background: rgba(10, 47, 36, 0.98);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(197, 168, 105, 0.3);
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease;
      }
      .mobile-drawer.open {
        max-height: 480px;
      }
      .mobile-nav-links {
        display: flex;
        flex-direction: column;
        padding: 1.5rem 2rem;
        gap: 1rem;
        text-align: right;
      }
      .mobile-nav-links a {
        color: #F9F7F1;
        font-size: 1.05rem;
        font-weight: 600;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        text-decoration: none;
      }
      .mobile-theme-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #DFC698;
        padding: 0.5rem 0;
      }
    }
  `]
})
export class HeaderComponent {
  audio = inject(AudioService);
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  router = inject(Router);

  isScrolled = false;
  isMobileMenuOpen = false;

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
