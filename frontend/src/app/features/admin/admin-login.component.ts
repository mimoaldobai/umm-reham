import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="admin-login-wrapper" dir="rtl">
      <!-- Ambient Lighting Orbs -->
      <div class="glow-orb orb-top"></div>
      <div class="glow-orb orb-bottom"></div>

      <div class="login-container">
        <div class="login-glass-card">
          
          <!-- Top Security Crest & Monogram -->
          <div class="login-header">
            <div class="ur-emblem-badge" title="أم رهام — UMM REHAM">
              <svg viewBox="0 0 48 48" width="56" height="56" class="ur-svg">
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

            <div class="security-tag">
              <span class="lock-dot"></span>
              منطقة إدارية مخصصة ومحمية 🇸🇦
            </div>

            <h1 class="portal-title">بوابة الإدارة الأكاديمية</h1>
            <p class="portal-desc">يرجى تسجيل الدخول بحساب المشرف المصرح للوصول إلى لوحة التحكم والبيانات</p>
          </div>

          <!-- Error Alert Banner -->
          <div *ngIf="errorMessage" class="error-banner">
            <span class="err-icon">⚠️</span>
            <span class="err-text">{{ errorMessage }}</span>
          </div>

          <!-- Login Form -->
          <form (ngSubmit)="onSubmit()" class="login-form">
            <!-- Username/Email Field -->
            <div class="form-group">
              <label for="identifier" class="input-label">اسم المستخدم أو البريد الإلكتروني</label>
              <div class="input-field-wrap">
                <span class="field-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input 
                  id="identifier"
                  type="text" 
                  [(ngModel)]="identifier" 
                  name="identifier" 
                  placeholder="admin" 
                  required 
                  autocomplete="username"
                  class="login-input" />
              </div>
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <div class="label-split">
                <label for="password" class="input-label">كلمة المرور الإدارية</label>
                <span class="security-chip">مشفرة بأمان</span>
              </div>
              <div class="input-field-wrap">
                <span class="field-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input 
                  id="password"
                  [type]="showPassword ? 'text' : 'password'" 
                  [(ngModel)]="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  autocomplete="current-password"
                  class="login-input" />
                <button 
                  type="button" 
                  class="btn-toggle-pw" 
                  (click)="showPassword = !showPassword" 
                  [title]="showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'">
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="btn-login-submit" 
              [disabled]="isLoading || !identifier || !password">
              <span *ngIf="!isLoading" class="btn-content">
                <span>دخول لوحة التحكم</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
              <span *ngIf="isLoading" class="btn-loading">
                <span class="spinner"></span>
                <span>جاري التحقق والمصادقة...</span>
              </span>
            </button>
          </form>

          <!-- Footer Back link -->
          <div class="login-footer">
            <a routerLink="/" class="back-home-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>العودة إلى الموقع العام</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-login-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 10%, #0F382A 0%, #06180E 60%, #030D08 100%);
      position: relative;
      overflow: hidden;
      padding: 2rem 1rem;
      font-family: var(--font-family-arabic, 'Cairo', sans-serif);
      color: #FFFFFF;
    }

    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      pointer-events: none;
      opacity: 0.25;
    }

    .orb-top {
      width: 450px;
      height: 450px;
      top: -150px;
      right: 15%;
      background: #C5A869;
    }

    .orb-bottom {
      width: 500px;
      height: 500px;
      bottom: -200px;
      left: 10%;
      background: #10B981;
    }

    .login-container {
      width: 100%;
      max-width: 460px;
      position: relative;
      z-index: 10;
    }

    .login-glass-card {
      background: rgba(10, 35, 25, 0.85);
      border: 1.5px solid rgba(197, 168, 105, 0.35);
      border-radius: 24px;
      padding: 2.75rem 2.25rem;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(16, 185, 129, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      animation: cardAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes cardAppear {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .ur-emblem-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 82px;
      height: 82px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(197, 168, 105, 0.4);
      border: 3px solid #C5A869;
      margin-bottom: 1.25rem;
    }

    .security-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #6EE7B7;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 0.3rem 0.85rem;
      border-radius: 9999px;
      margin-bottom: 0.85rem;
    }

    .lock-dot {
      width: 7px;
      height: 7px;
      background: #10B981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10B981;
    }

    .portal-title {
      font-size: 1.45rem;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0 0 0.5rem;
      letter-spacing: -0.3px;
    }

    .portal-desc {
      font-size: 0.85rem;
      color: #A7F3D0;
      margin: 0;
      line-height: 1.5;
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(239, 68, 68, 0.15);
      border: 1.5px solid rgba(239, 68, 68, 0.45);
      color: #FCA5A5;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      animation: shake 0.35s ease;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    .err-icon {
      font-size: 1.1rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.35rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      text-align: right;
    }

    .input-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: #F3EBD8;
    }

    .label-split {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .security-chip {
      font-size: 0.72rem;
      color: #A7F3D0;
      opacity: 0.8;
    }

    .input-field-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .field-icon {
      position: absolute;
      right: 1rem;
      color: #6EE7B7;
      pointer-events: none;
      display: flex;
      align-items: center;
    }

    .login-input {
      width: 100%;
      background: rgba(4, 20, 14, 0.7);
      border: 1.5px solid rgba(197, 168, 105, 0.3);
      color: #FFFFFF;
      padding: 0.85rem 2.85rem 0.85rem 1rem;
      border-radius: 14px;
      font-size: 0.95rem;
      font-family: inherit;
      transition: all 0.25s ease;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #C5A869;
        box-shadow: 0 0 0 3px rgba(197, 168, 105, 0.2);
        background: rgba(4, 20, 14, 0.95);
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
    }

    .btn-toggle-pw {
      position: absolute;
      left: 0.75rem;
      background: none;
      border: none;
      color: #A7F3D0;
      cursor: pointer;
      font-size: 1.1rem;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.15);
      }
    }

    .btn-login-submit {
      margin-top: 0.5rem;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: #FFFFFF;
      border: 1.5px solid rgba(197, 168, 105, 0.4);
      padding: 0.95rem 1.5rem;
      border-radius: 14px;
      font-size: 1rem;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(5, 150, 105, 0.4);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 14px 30px rgba(5, 150, 105, 0.55);
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .btn-content {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .btn-loading {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2.5px solid rgba(255, 255, 255, 0.3);
      border-top-color: #FFFFFF;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .login-footer {
      margin-top: 2rem;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.25rem;
    }

    .back-home-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #A7F3D0;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;

      &:hover {
        color: #C5A869;
        transform: translateX(-3px);
      }
    }
  `]
})
export class AdminLoginComponent implements OnInit {
  private authService = inject(AuthService);
  private audio = inject(AudioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  identifier = '';
  password = '';
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/admin';

  ngOnInit(): void {
    // If already authenticated, redirect straight to admin dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin']);
      return;
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  onSubmit(): void {
    if (!this.identifier || !this.password) {
      this.errorMessage = 'يرجى إدخال اسم المستخدم وكلمة المرور';
      return;
    }

    this.audio.playClick();
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.identifier, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.audio.playSuccess();
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.audio.playError();
          this.errorMessage = res.message || 'بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.audio.playError();
        this.errorMessage = 'تعذر الاتصال بخادم المصادقة، يرجى المحاولة مرة أخرى.';
      }
    });
  }
}
