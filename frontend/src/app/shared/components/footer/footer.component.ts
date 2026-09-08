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
              دار سعودية رائدة في تقديم الحلول والخدمات التعليمية والبحثية والتقنية. نجمع بين أصالة الهوية ودقة الإنجاز لنصنع مستقبلك الأكاديمي والمهني.
            </p>
            <div class="social-links">
              <a href="https://wa.me/" target="_blank" class="social-btn" (mouseenter)="onHover()" (click)="onClick()" title="واتساب">💬</a>
              <a href="https://instagram.com/" target="_blank" class="social-btn" (mouseenter)="onHover()" (click)="onClick()" title="إنستجرام">📸</a>
              <a href="https://twitter.com/" target="_blank" class="social-btn" (mouseenter)="onHover()" (click)="onClick()" title="منصة X">𝕏</a>
              <a href="https://linkedin.com/" target="_blank" class="social-btn" (mouseenter)="onHover()" (click)="onClick()" title="لينكد إن">💼</a>
            </div>
          </div>

          <!-- Quick Navigation Links -->
          <div class="footer-nav-col">
            <h4>الخدمات الرئيسية</h4>
            <ul>
              <li><a routerLink="/services" [queryParams]="{cat: 'academic-services'}" (click)="onClick()">البحوث العلمية والدراسات</a></li>
              <li><a routerLink="/services" [queryParams]="{cat: 'academic-services'}" (click)="onClick()">مشاريع التخرج المتكاملة</a></li>
              <li><a routerLink="/services" [queryParams]="{cat: 'presentations-design'}" (click)="onClick()">العروض التقديمية والتصميم</a></li>
              <li><a routerLink="/services" [queryParams]="{cat: 'technology-programming'}" (click)="onClick()">المشاريع التقنية والبرمجة</a></li>
              <li><a routerLink="/services" [queryParams]="{cat: 'career-path'}" (click)="onClick()">السيرة الذاتية وتطوير الملف المهني</a></li>
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
            <a routerLink="/privacy" (click)="onClick()">سياسة الخصوصية</a>
            <span>•</span>
            <a routerLink="/terms" (click)="onClick()">الشروط والأحكام</a>
            <span>•</span>
            <a routerLink="/admin" class="gold-gradient-text" (click)="onClick()">بوابة إدارة النظام</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .luxury-footer {
      background: linear-gradient(180deg, #0B2516 0%, #06180E 100%);
      color: #F9F7F1;
      border-top: 1.5px solid rgba(201, 169, 110, 0.35);
      position: relative;
    }

    .trust-pillars-bar {
      background: rgba(17, 42, 31, 0.75);
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      padding: 1.6rem 0;
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
      color: #FFFFFF;
    }

    .pillar-info span {
      font-size: 0.78rem;
      color: #A3B8B0;
    }

    .vision-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(201, 169, 110, 0.1);
      border: 1px solid rgba(201, 169, 110, 0.4);
      padding: 0.4rem 1rem;
      border-radius: var(--radius-sm);
    }

    .vision-title {
      font-size: 0.72rem;
      color: #DFC698;
      font-weight: 600;
    }

    .vision-year {
      font-size: 1.25rem;
      font-weight: 800;
      color: #FFFFFF;
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
      background: linear-gradient(135deg, #FBE6B3 0%, #C9A96E 50%, #96753C 100%);
      box-shadow: 0 4px 15px rgba(201, 169, 110, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
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
      color: #FFFFFF;
      margin: 0;
    }

    .logo-text span {
      font-size: 0.8rem;
      color: #C9A96E;
    }

    .brand-desc {
      color: #A3B8B0;
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
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(201, 169, 110, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #DFC698;
      font-size: 1.1rem;
      transition: all 0.3s;
    }

    .social-btn:hover {
      background: #C9A96E;
      color: #0B1C15;
      transform: translateY(-3px);
    }

    .footer-nav-col h4 {
      font-size: 1.15rem;
      color: #FFFFFF;
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
      background: #C9A96E;
    }

    .footer-nav-col ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-nav-col a {
      color: #A3B8B0;
      font-size: 0.92rem;
      transition: color 0.2s, padding-right 0.2s;
    }

    .footer-nav-col a:hover {
      color: #C9A96E;
      padding-right: 6px;
    }

    .working-hours-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(201, 169, 110, 0.2);
      border-radius: var(--radius-md);
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }

    .hours-row {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      font-size: 0.88rem;
    }

    .hours-row span {
      color: #A3B8B0;
      font-size: 0.8rem;
    }

    .hours-row strong {
      color: #FFFFFF;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 2rem;
      padding-bottom: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #94A89E;
      font-size: 0.88rem;
    }

    .bottom-links {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .bottom-links a {
      color: #A3B8B0;
    }

    .bottom-links a:hover {
      color: #C9A96E;
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
