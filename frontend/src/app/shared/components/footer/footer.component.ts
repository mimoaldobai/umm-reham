import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="luxury-footer">
      <!-- Trust Pillars Banner -->
      <div class="trust-pillars-bar">
        <div class="container">
          <div class="pillars-grid">
            <div class="pillar-item">
              <span class="pillar-icon">🛡️</span>
              <div class="pillar-info">
                <strong>موثوق ومعتمد</strong>
                <span>سرية تامة وأمان للمعلومات</span>
              </div>
            </div>
            <div class="pillar-item">
              <span class="pillar-icon">🏆</span>
              <div class="pillar-info">
                <strong>جودة وتميز</strong>
                <span>أعلى معايير الدقة الأكاديمية</span>
              </div>
            </div>
            <div class="pillar-item">
              <span class="pillar-icon">👥</span>
              <div class="pillar-info">
                <strong>دعم أكاديمي متكامل</strong>
                <span>فريق من نخبة المستشارين</span>
              </div>
            </div>
            <div class="pillar-item">
              <span class="pillar-icon">🌐</span>
              <div class="pillar-info">
                <strong>تغطية لكافة مناطق المملكة</strong>
                <span>خدمة فورية أينما كنت</span>
              </div>
            </div>
            <div class="pillar-item vision-pillar">
              <div class="vision-badge">
                <span class="vision-title">رؤية السعودية</span>
                <span class="vision-year">2030</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Footer Content -->
      <div class="container footer-main-content">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="footer-brand-col">
            <div class="footer-logo">
              <div class="footer-brand-avatar-box">
                <img src="assets/images/reham_profile_luxury.jpg" alt="أم رهام" class="footer-avatar-img" />
              </div>
              <div class="logo-text">
                <h3>أم رهام</h3>
                <span>تعليم • تطوير • استشارات</span>
              </div>
            </div>
            <p class="brand-desc">
              منصة سعودية رائدة في تقديم الحلول والخدمات التعليمية والبحثية والتقنية. نجمع بين أصالة الهوية ودقة الإنجاز لنصنع مستقبلك الأكاديمي والمهني.
            </p>
            <div class="social-links">
              <a href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85" target="_blank" class="social-btn wa-social" (mouseenter)="onHover()" (click)="onClick()" title="واتساب" aria-label="واتساب">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
              </a>
              <a href="https://instagram.com/" target="_blank" class="social-btn" (mouseenter)="onHover()" (click)="onClick()" title="إنستجرام" aria-label="إنستجرام">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://twitter.com/" target="_blank" class="social-btn" (mouseenter)="onHover()" (click)="onClick()" title="منصة X" aria-label="منصة X">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/" target="_blank" class="social-btn" (mouseenter)="onHover()" (click)="onClick()" title="لينكد إن" aria-label="لينكد إن">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Navigation Links -->
          <div class="footer-nav-col">
            <h4>روابط المنصة</h4>
            <ul>
              <li><a routerLink="/" (click)="onClick()">الرئيسية</a></li>
              <li><a routerLink="/about" (click)="onClick()">من نحن</a></li>
              <li><a routerLink="/services" (click)="onClick()">المتجر والخدمات</a></li>
              <li><a routerLink="/order" (click)="onClick()">طلب خدمة ومتابعة الإنجاز</a></li>
              <li><a routerLink="/testimonials" (click)="onClick()">آراء العملاء</a></li>
              <li><a routerLink="/articles" (click)="onClick()">المقالات والأدلة</a></li>
              <li><a routerLink="/contact" (click)="onClick()">تواصل معنا</a></li>
            </ul>
          </div>

          <!-- Working Hours & Direct Contact -->
          <div class="footer-nav-col">
            <h4>ساعات العمل والخدمة</h4>
            <div class="working-hours-card">
              <div class="hours-row">
                <span>🗓️ الأيام المتاحة:</span>
                <strong>السبت — الجمعة (طوال الأسبوع)</strong>
              </div>
              <div class="hours-row">
                <span>⏰ ساعات العمل:</span>
                <strong>خدمة مستمرة على مدار الساعة</strong>
              </div>
              <div class="hours-row">
                <span>⚡ سرعة الاستجابة:</span>
                <strong class="gold-gradient-text">استجابة فورية خلال دقائق</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright & Compliance -->
        <div class="footer-bottom">
          <p>© 2024 - 2026 جميع الحقوق محفوظة لمنصة <strong>أم رهام للخدمات التعليمية والبحثية</strong> 🇸🇦</p>
          <div class="bottom-links">
            <a routerLink="/about" (click)="onClick()">سياسة الخصوصية والسرية</a>
            <span>•</span>
            <a routerLink="/about" (click)="onClick()">الشروط والأحكام الأكاديمية</a>
            <span>•</span>
            <a routerLink="/contact" (click)="onClick()">مركز المساعدة والاستفسارات</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .luxury-footer {
      background: var(--theme-footer-bg, linear-gradient(180deg, #0B2516 0%, #06180E 100%));
      color: var(--theme-footer-text, #F9F7F1);
      border-top: 1.5px solid var(--theme-footer-border, rgba(201, 169, 110, 0.35));
      position: relative;
      transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease;
    }

    .trust-pillars-bar {
      background: var(--theme-footer-pillars-bg, rgba(17, 42, 31, 0.75));
      border-bottom: 1px solid var(--theme-footer-border, rgba(201, 169, 110, 0.2));
      padding: 1.6rem 0;
      transition: background 0.4s ease, border-color 0.4s ease;
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      align-items: center;
    }

    .pillar-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .pillar-icon {
      font-size: 1.8rem;
    }

    .pillar-info {
      display: flex;
      flex-direction: column;
    }

    .pillar-info strong {
      font-size: 0.95rem;
      color: var(--theme-footer-heading, #FFFFFF);
      transition: color 0.3s ease;
    }

    .pillar-info span {
      font-size: 0.78rem;
      color: var(--theme-footer-text, #A3B8B0);
      transition: color 0.3s ease;
    }

    .vision-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--theme-footer-card-bg, rgba(201, 169, 110, 0.1));
      border: 1px solid var(--theme-footer-border, rgba(201, 169, 110, 0.4));
      padding: 0.4rem 1rem;
      border-radius: var(--radius-sm);
      transition: all 0.3s ease;
    }

    .vision-title {
      font-size: 0.72rem;
      color: var(--theme-footer-accent, #DFC698);
      font-weight: 600;
    }

    .vision-year {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--theme-footer-heading, #FFFFFF);
      font-family: var(--font-family-latin);
    }

    .footer-main-content {
      padding: 4rem 1.5rem 2rem 1.5rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 3.5rem;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .footer-brand-avatar-box {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      padding: 2px;
      background: linear-gradient(135deg, var(--theme-footer-accent, #DFC698) 0%, var(--theme-accent, #C9A96E) 50%, var(--theme-primary, #0A2F24) 100%);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.4s ease;
    }

    .footer-avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      border: 1.5px solid #FFFFFF;
      transform: scale(1.05);
    }

    .logo-text h3 {
      font-size: 1.5rem;
      color: var(--theme-footer-heading, #FFFFFF);
      margin: 0;
    }

    .logo-text span {
      font-size: 0.8rem;
      color: var(--theme-footer-accent, #C9A96E);
    }

    .brand-desc {
      color: var(--theme-footer-text, #A3B8B0);
      font-size: 0.95rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      max-width: 380px;
    }

    .social-links {
      display: flex;
      gap: 0.8rem;
    }

    .social-btn {
      width: 40px;
      height: 40px;
      background: var(--theme-footer-card-bg, rgba(255, 255, 255, 0.06));
      border: 1px solid var(--theme-footer-border, rgba(201, 169, 110, 0.3));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--theme-footer-accent, #DFC698);
      font-size: 1.1rem;
      transition: all 0.3s;
    }

    .social-btn svg {
      width: 18px;
      height: 18px;
      display: block;
    }

    .social-btn:hover {
      background: var(--theme-footer-accent, #C9A96E);
      color: #0B1C15;
      transform: translateY(-3px);
    }

    .social-btn.wa-social:hover {
      background: #25D366;
      border-color: #25D366;
      color: #FFFFFF;
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    }

    .footer-nav-col h4 {
      font-size: 1.15rem;
      color: var(--theme-footer-heading, #FFFFFF);
      margin-bottom: 1.2rem;
      position: relative;
      padding-bottom: 0.5rem;
    }

    .footer-nav-col h4::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 35px;
      height: 2px;
      background: var(--theme-footer-accent, #C9A96E);
      transition: background 0.3s ease;
    }

    .footer-nav-col ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-nav-col a {
      color: var(--theme-footer-text, #A3B8B0);
      font-size: 0.92rem;
      transition: color 0.2s, padding-right 0.2s;
    }

    .footer-nav-col a:hover {
      color: var(--theme-footer-accent, #C9A96E);
      padding-right: 6px;
    }

    .working-hours-card {
      background: var(--theme-footer-card-bg, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--theme-footer-border, rgba(201, 169, 110, 0.2));
      border-radius: var(--radius-md);
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      transition: all 0.3s ease;
    }

    .hours-row {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      font-size: 0.88rem;
    }

    .hours-row span {
      color: var(--theme-footer-text, #A3B8B0);
      font-size: 0.8rem;
    }

    .hours-row strong {
      color: var(--theme-footer-heading, #FFFFFF);
    }

    .footer-bottom {
      border-top: 1px solid var(--theme-footer-border, rgba(255, 255, 255, 0.08));
      padding-top: 2rem;
      padding-bottom: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--theme-footer-text, #94A89E);
      font-size: 0.88rem;
      transition: border-color 0.3s ease, color 0.3s ease;
    }

    .bottom-links {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .bottom-links a {
      color: var(--theme-footer-text, #A3B8B0);
      transition: color 0.2s ease;
    }

    .bottom-links a:hover {
      color: var(--theme-footer-accent, #C9A96E);
    }

    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  audio = inject(AudioService);

  onHover(): void {
    this.audio.playHover();
  }

  onClick(): void {
    this.audio.playClick();
  }
}
