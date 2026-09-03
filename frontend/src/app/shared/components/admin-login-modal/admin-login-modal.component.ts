import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-admin-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-modal-overlay" (click)="onOverlayClick($event)">
      <div class="login-modal-card glass-panel" (click)="$event.stopPropagation()">
        <!-- Close Button -->
        <button type="button" class="btn-close-modal" (click)="closeModal()" title="إغلاق">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Header Crest & Title -->
        <div class="modal-header-section">
          <div class="security-crest-ring">
            <div class="crest-icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <span class="security-badge">منطقة إدارية مقيدة ومحمية 🇸🇦</span>
          <h2 class="modal-title">تسجيل الدخول <span class="gold-gradient-text">للوحة التحكم</span></h2>
          <p class="modal-subtitle">يرجى إدخال بيانات الاعتماد الإدارية المصرح لها للوصول للنظام</p>
        </div>

        <!-- Error Alert -->
        <div *ngIf="errorMessage" class="error-banner">
          <span class="err-icon">⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Login Form -->
        <form (ngSubmit)="handleLogin()" class="login-form">
          <!-- Identifier Input -->
          <div class="form-group">
            <label class="input-label">اسم المستخدم أو البريد الإلكتروني:</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input 
                type="text" 
                [(ngModel)]="identifier" 
                name="identifier" 
                placeholder="admin أو admin@ummreham.sa" 
                required 
                autocomplete="username"
                class="form-input" />
            </div>
          </div>

          <!-- Password Input -->
          <div class="form-group">
            <div class="label-row">
              <label class="input-label">كلمة المرور:</label>
              <span class="forgot-hint">مشفرة بأعلى معايير الأمان</span>
            </div>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input 
                [type]="showPassword ? 'text' : 'password'" 
                [(ngModel)]="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                autocomplete="current-password"
                class="form-input" />
              <button 
                type="button" 
                class="btn-toggle-pass" 
                (click)="showPassword = !showPassword"
                [title]="showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'">
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn-saudi-primary btn-submit-login" 
            [disabled]="isLoading || !identifier || !password">
            <span *ngIf="!isLoading">دخول آمن للوحة التحكم ←</span>
            <span *ngIf="isLoading" class="loading-spinner"></span>
            <span *ngIf="isLoading">جاري التحقق من الصلاحيات...</span>
          </button>
        </form>

        <!-- Quick Demo Credentials Fill Pill -->
        <div class="quick-credentials-box">
          <span class="box-label">بيانات الدخول الافتراضية للمعاينة السريعة:</span>
          <button type="button" class="btn-quick-fill" (click)="fillAdminCredentials()">
            <span class="fill-icon">⚡</span>
            <span>استخدام بيانات المدير العام (admin / admin123)</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(4, 15, 10, 0.82);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.25s ease-out;
    }

    .login-modal-card {
      width: 100%;
      max-width: 460px;
      background: linear-gradient(145deg, #0d251a 0%, #06150e 100%);
      border: 1.5px solid rgba(212, 175, 55, 0.4);
      border-radius: 24px;
      padding: 2.5rem 2.2rem;
      position: relative;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7), 0 0 40px rgba(212, 175, 55, 0.15);
      color: #FFFFFF;
      animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-close-modal {
      position: absolute;
      top: 1.2rem;
      left: 1.2rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #A3B8B0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-close-modal:hover {
      background: rgba(239, 68, 68, 0.25);
      color: #EF4444;
      border-color: #EF4444;
    }

    .modal-header-section {
      text-align: center;
      margin-bottom: 1.8rem;
    }

    .security-crest-ring {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(16, 185, 129, 0.1));
      border: 1.5px solid #D4AF37;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      box-shadow: 0 0 25px rgba(212, 175, 55, 0.3);
    }

    .crest-icon-box {
      color: #FBE6B3;
    }

    .security-badge {
      display: inline-block;
      background: rgba(212, 175, 55, 0.12);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #E5C378;
      font-size: 0.74rem;
      font-weight: 700;
      padding: 0.25rem 0.8rem;
      border-radius: 20px;
      margin-bottom: 0.5rem;
    }

    .modal-title {
      font-size: 1.45rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 0.3rem;
    }

    .modal-subtitle {
      font-size: 0.84rem;
      color: #9EBAAF;
      line-height: 1.4;
    }

    .error-banner {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #FCA5A5;
      padding: 0.65rem 1rem;
      border-radius: 12px;
      font-size: 0.82rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.2rem;
      animation: shake 0.4s ease;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      text-align: right;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .input-label {
      font-size: 0.82rem;
      color: #D1E5DC;
      font-weight: 600;
    }

    .forgot-hint {
      font-size: 0.72rem;
      color: #6EE7B7;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      right: 1rem;
      font-size: 1rem;
      pointer-events: none;
      color: #9EBAAF;
    }

    .form-input {
      width: 100%;
      background: rgba(6, 19, 13, 0.8);
      border: 1.5px solid rgba(212, 175, 55, 0.28);
      border-radius: 12px;
      padding: 0.75rem 2.8rem 0.75rem 1rem;
      color: #FFFFFF;
      font-size: 0.9rem;
      font-family: inherit;
      outline: none;
      transition: all 0.2s;
    }

    .form-input:focus {
      border-color: #D4AF37;
      background: rgba(11, 28, 21, 0.95);
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.25);
    }

    .form-input::placeholder {
      color: #556B61;
      font-size: 0.82rem;
    }

    .btn-toggle-pass {
      position: absolute;
      left: 0.8rem;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      padding: 0.2rem;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .btn-toggle-pass:hover {
      opacity: 1;
    }

    .btn-submit-login {
      width: 100%;
      padding: 0.85rem;
      font-size: 0.95rem;
      font-weight: 700;
      border-radius: 12px;
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .loading-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #FFFFFF;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .quick-credentials-box {
      margin-top: 1.6rem;
      padding-top: 1.2rem;
      border-top: 1px dashed rgba(212, 175, 55, 0.25);
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .box-label {
      font-size: 0.74rem;
      color: #8CA399;
    }

    .btn-quick-fill {
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.35);
      color: #FBE6B3;
      padding: 0.5rem 0.9rem;
      border-radius: 10px;
      font-size: 0.76rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-quick-fill:hover {
      background: rgba(212, 175, 55, 0.2);
      border-color: #D4AF37;
      color: #FFFFFF;
      transform: translateY(-1px);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleUp {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class AdminLoginModalComponent {
  authService = inject(AuthService);
  audio = inject(AudioService);
  router = inject(Router);

  identifier = '';
  password = '';
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  closeModal(): void {
    this.audio.playClick();
    this.authService.closeLoginModal();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  fillAdminCredentials(): void {
    this.audio.playHover();
    this.identifier = 'admin@ummreham.sa';
    this.password = 'admin123';
    this.errorMessage = '';
  }

  handleLogin(): void {
    if (!this.identifier || !this.password) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.audio.playClick();

    this.authService.login(this.identifier, this.password).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.audio.playSuccess();
        this.router.navigate(['/admin']);
      } else {
        this.errorMessage = res.message || 'بيانات الدخول غير صحيحة';
        this.audio.playHover();
      }
    });
  }
}
