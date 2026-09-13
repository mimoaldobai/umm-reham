import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientAuthService, ClientUser, ClientOrderSummary } from '../../../core/services/client-auth.service';
import { AudioService } from '../../../core/services/audio.service';
import { CartService } from '../../../core/services/cart.service';
import { COUNTRIES_DATA, CountryCodeItem } from '../../../core/data/countries.data';

@Component({
  selector: 'app-client-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="client-modal-backdrop" *ngIf="auth.isAuthModalOpen()" (click)="onBackdropClick($event)">
      <div class="client-modal-card glass-panel" (click)="$event.stopPropagation()" dir="rtl">
        
        <!-- Modal Top Bar -->
        <div class="modal-top-bar">
          <div class="brand-crest">
            <span class="crest-icon">🎓</span>
            <span class="crest-tag">بوابة حساب العميل والطالب 🇸🇦</span>
          </div>
          <button type="button" class="btn-close-modal" (click)="auth.closeAuthModal()" title="إغلاق">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Tab Navigation -->
        <div class="modal-tabs-header">
          <ng-container *ngIf="!auth.isAuthenticated()">
            <button 
              type="button" 
              class="tab-btn" 
              [class.active]="auth.modalTab() === 'login'" 
              (click)="setTab('login')">
              🔐 تسجيل الدخول
            </button>
            <button 
              type="button" 
              class="tab-btn" 
              [class.active]="auth.modalTab() === 'register'" 
              (click)="setTab('register')">
              ✍️ حساب جديد
            </button>
          </ng-container>

          <ng-container *ngIf="auth.isAuthenticated()">
            <button 
              type="button" 
              class="tab-btn" 
              [class.active]="auth.modalTab() === 'profile'" 
              (click)="setTab('profile')">
              👤 ملفي الأكاديمي
            </button>
            <button 
              type="button" 
              class="tab-btn" 
              [class.active]="auth.modalTab() === 'orders'" 
              (click)="setTab('orders')">
              📦 طلباتي ({{ myOrders.length }})
            </button>
          </ng-container>
        </div>

        <!-- Alert Notification -->
        <div *ngIf="feedbackMessage" class="feedback-banner" [class.error]="isError" [class.success]="!isError">
          <span>{{ isError ? '⚠️' : '✓' }}</span>
          <span>{{ feedbackMessage }}</span>
        </div>

        <!-- TAB 1: LOGIN -->
        <div *ngIf="auth.modalTab() === 'login' && !auth.isAuthenticated()" class="tab-content">
          <div class="tab-intro">
            <h3>تسجيل الدخول إلى حسابك</h3>
            <p>أدخل رقم الجوال أو البريد الإلكتروني للوصول إلى طلباتك وسلتك وبياناتك المحفوظة</p>
          </div>

          <form (ngSubmit)="handleLogin()" class="auth-form">
            <div class="form-group">
              <label class="field-label">رقم الجوال أو البريد الإلكتروني:</label>
              <div class="input-wrap">
                <span class="field-icon">📱</span>
                <input 
                  type="text" 
                  [(ngModel)]="loginIdentifier" 
                  name="loginIdentifier" 
                  placeholder="05XXXXXXXX أو البريد الإلكتروني" 
                  required 
                  class="client-input" />
              </div>
            </div>

            <div class="form-group">
              <label class="field-label">كلمة المرور (اختياري / افتراضي 123456):</label>
              <div class="input-wrap">
                <span class="field-icon">🔒</span>
                <input 
                  [type]="showPassword ? 'text' : 'password'" 
                  [(ngModel)]="loginPassword" 
                  name="loginPassword" 
                  placeholder="••••••••" 
                  class="client-input" />
                <button type="button" class="btn-eye" (click)="showPassword = !showPassword">
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>

            <button type="submit" class="btn-primary-auth" [disabled]="!loginIdentifier">
              <span>تسجيل الدخول الآن</span>
              <span>←</span>
            </button>
          </form>

          <!-- Quick Test Accounts -->
          <div class="demo-accounts-box">
            <span class="demo-title">حسابات تجريبية سريعة بنقرة واحدة:</span>
            <div class="demo-buttons-row">
              <button type="button" class="btn-demo-chip" (click)="quickLogin('0551234567')">
                <span>🎓 سارة العتيبي (ماجستير)</span>
              </button>
              <button type="button" class="btn-demo-chip" (click)="quickLogin('0509876543')">
                <span>💻 م. عبدالله القحطاني (دكتوراه)</span>
              </button>
            </div>
          </div>

          <div class="switch-mode-text">
            <span>ليس لديك حساب؟</span>
            <a href="javascript:void(0)" (click)="setTab('register')">أنشئ حسابك الأكاديمي خلال ثوانٍ</a>
          </div>
        </div>

        <!-- TAB 2: REGISTER -->
        <div *ngIf="auth.modalTab() === 'register' && !auth.isAuthenticated()" class="tab-content">
          <div class="tab-intro">
            <h3>إنشاء حساب أكاديمي جديد</h3>
            <p>سجّل بياناتك لتحصل على متابعة فورية لطلباتك وحفظ مستمر لسلتك واستشاراتك</p>
          </div>

          <form (ngSubmit)="handleRegister()" class="auth-form grid-form">
            <div class="form-group full-col">
              <label class="field-label">الاسم الكامل: <span class="req">*</span></label>
              <div class="input-wrap">
                <span class="field-icon">👤</span>
                <input 
                  type="text" 
                  [(ngModel)]="regForm.fullName" 
                  name="regFullName" 
                  placeholder="مثال: ناصر محمد القحطاني" 
                  required 
                  class="client-input" />
              </div>
            </div>

            <div class="form-group full-col">
              <label class="field-label">رقم الجوال والواتساب للتواصل: <span class="req">*</span></label>
              <div class="modal-phone-group">
                <select [(ngModel)]="regCountry" name="regCountry" class="client-input modal-country-select">
                  <option *ngFor="let c of countries" [ngValue]="c">
                    {{ c.nameAr }} ({{ c.dialCode }})
                  </option>
                </select>
                <div class="modal-dial-badge">{{ regCountry.dialCode }}</div>
                <input 
                  type="tel" 
                  [(ngModel)]="regSubscriberPhone" 
                  name="regSubscriberPhone" 
                  [placeholder]="regCountry.placeholder" 
                  required 
                  class="client-input ltr-input flex-1" />
              </div>
            </div>

            <div class="form-group">
              <label class="field-label">المرحلة الأكاديمية: <span class="req">*</span></label>
              <div class="input-wrap">
                <span class="field-icon">🎓</span>
                <select [(ngModel)]="regForm.academicLevel" name="regDegree" class="client-input client-select">
                  <option value="بكالوريوس">بكالوريوس (جامعي)</option>
                  <option value="ماجستير">ماجستير (دراسات عليا)</option>
                  <option value="دكتوراه">دكتوراه (أبحاث وأطروحات)</option>
                  <option value="طالب مدرسي">طالب مدرسي</option>
                  <option value="باحث حر">باحث وأكاديمي حر</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="field-label">الجامعة / الكلية:</label>
              <div class="input-wrap">
                <span class="field-icon">🏛️</span>
                <input 
                  type="text" 
                  [(ngModel)]="regForm.university" 
                  name="regUniv" 
                  placeholder="مثال: جامعة الملك سعود" 
                  class="client-input" />
              </div>
            </div>

            <div class="form-group full-col">
              <label class="field-label">التخصص العلمي:</label>
              <div class="input-wrap">
                <span class="field-icon">📚</span>
                <input 
                  type="text" 
                  [(ngModel)]="regForm.specialization" 
                  name="regSpec" 
                  placeholder="مثال: إدارة الأعمال، علوم الحاسب، قانون..." 
                  class="client-input" />
              </div>
            </div>

            <button type="submit" class="btn-primary-auth full-col" [disabled]="!regForm.fullName || !regSubscriberPhone">
              <span>تأكيد وإنشاء الحساب الأكاديمي 🎓</span>
            </button>
          </form>

          <div class="switch-mode-text">
            <span>لديك حساب بالفعل؟</span>
            <a href="javascript:void(0)" (click)="setTab('login')">سجّل الدخول من هنا</a>
          </div>
        </div>

        <!-- TAB 3: PROFILE (AUTHENTICATED) -->
        <div *ngIf="auth.modalTab() === 'profile' && auth.isAuthenticated()" class="tab-content">
          <!-- Profile Badge Hero -->
          <div class="profile-hero-card">
            <div class="hero-avatar-large" [style.background]="auth.currentClient()?.avatarColor">
              {{ getInitials(auth.currentClient()?.fullName) }}
            </div>
            <div class="hero-client-meta">
              <h4>{{ auth.currentClient()?.fullName }}</h4>
              <span class="hero-tag-badge">{{ auth.currentClient()?.academicLevel }} • {{ auth.currentClient()?.university }}</span>
              <span class="hero-joined-date">عضو مسجل منذ: {{ auth.currentClient()?.createdAt }}</span>
            </div>
          </div>

          <form (ngSubmit)="handleUpdateProfile()" class="auth-form grid-form">
            <div class="form-group full-col">
              <label class="field-label">الاسم الكامل:</label>
              <input type="text" [(ngModel)]="profileEdit.fullName" name="editName" class="client-input flex-1" />
            </div>

            <div class="form-group full-col">
              <label class="field-label">الدولة ورقم الجوال للتواصل:</label>
              <div class="modal-phone-group">
                <select [(ngModel)]="profileCountry" name="profileCountry" class="client-input modal-country-select">
                  <option *ngFor="let c of countries" [ngValue]="c">
                    {{ c.nameAr }} ({{ c.dialCode }})
                  </option>
                </select>
                <div class="modal-dial-badge">{{ profileCountry.dialCode }}</div>
                <input 
                  type="tel" 
                  [(ngModel)]="profileSubscriberPhone" 
                  name="editSubscriberPhone" 
                  [placeholder]="profileCountry.placeholder" 
                  class="client-input ltr-input flex-1" />
              </div>
            </div>

            <div class="form-group full-col">
              <label class="field-label">البريد الإلكتروني:</label>
              <input type="email" [(ngModel)]="profileEdit.email" name="editEmail" class="client-input flex-1 ltr-input" placeholder="example@domain.com" />
            </div>

            <div class="form-group">
              <label class="field-label">الجامعة / الكلية:</label>
              <input type="text" [(ngModel)]="profileEdit.university" name="editUniv" class="client-input flex-1" />
            </div>

            <div class="form-group">
              <label class="field-label">الدرجة العلمية:</label>
              <select [(ngModel)]="profileEdit.academicLevel" name="editDegree" class="client-input client-select flex-1">
                <option value="طالب مدرسي">طالب مدرسي</option>
                <option value="بكالوريوس">بكالوريوس</option>
                <option value="ماجستير">ماجستير</option>
                <option value="دكتوراه">دكتوراه</option>
                <option value="باحث حر">باحث حر</option>
              </select>
            </div>

            <div class="form-group full-col">
              <label class="field-label">التخصص العلمي:</label>
              <input type="text" [(ngModel)]="profileEdit.specialization" name="editSpec" class="client-input flex-1" />
            </div>

            <div class="profile-actions-row full-col">
              <button type="submit" class="btn-save-profile">
                <span>حفظ التعديلات في ملفي ✓</span>
              </button>
              <button type="button" class="btn-logout" (click)="handleLogout()">
                <span>تسجيل الخروج 🚪</span>
              </button>
            </div>
          </form>
        </div>

        <!-- TAB 4: MY ORDERS (AUTHENTICATED) -->
        <div *ngIf="auth.modalTab() === 'orders' && auth.isAuthenticated()" class="tab-content">
          <div class="tab-intro">
            <h3>طلباتي وسجل الإنجاز</h3>
            <p>متابعة مباشرة لحالة أبحاثك ومشاريعك الأكاديمية مع منصة أم رهام</p>
          </div>

          <div class="orders-list-box" *ngIf="myOrders.length > 0">
            <div class="order-item-card" *ngFor="let ord of myOrders">
              <div class="order-top-row">
                <span class="order-code-badge">{{ ord.orderCode }}</span>
                <span class="order-status-pill" [class]="ord.status">
                  {{ getStatusText(ord.status) }}
                </span>
              </div>
              <h4 class="order-service-name">{{ ord.serviceName }}</h4>
              <div class="order-footer-row">
                <span class="order-date">📅 {{ ord.date }}</span>
                <span class="order-price">💰 {{ ord.price }} ر.س</span>
                <a [routerLink]="['/order']" [queryParams]="{tab: 'track', code: ord.orderCode}" (click)="auth.closeAuthModal()" class="btn-track-mini">
                  تتبع الإنجاز 🔍
                </a>
              </div>
            </div>
          </div>

          <div *ngIf="myOrders.length === 0" class="empty-orders-view">
            <span class="empty-icon">📭</span>
            <h4>لا توجد طلبات مسجلة حالياً</h4>
            <p>يمكنك طلب خدمتك الأولى الآن والاستفادة من خصم 15% المعتمد!</p>
            <a routerLink="/order" (click)="auth.closeAuthModal()" class="btn-new-order">
              تقديم طلب خدمة جديد الآن ✍️
            </a>
          </div>

        </div>

      </div>
    </div>
  `,
  styles: [`
    .client-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(3, 13, 8, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      padding: 1rem;
      animation: fadeIn 0.25s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .client-modal-card {
      width: 100%;
      max-width: 540px;
      background: var(--dash-card-bg, #0B2516);
      border: 1.5px solid var(--theme-footer-border, rgba(197, 168, 105, 0.4));
      border-radius: 24px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 0, 0, 0.2);
      padding: 2rem;
      color: var(--theme-heading, #FFFFFF);
      position: relative;
      max-height: 90vh;
      overflow-y: auto;
      animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: var(--font-family-arabic, 'Cairo', sans-serif);
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    @keyframes zoomIn {
      from { transform: scale(0.95) translateY(15px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }

    .modal-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .brand-crest {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .crest-icon {
      font-size: 1.4rem;
    }

    .crest-tag {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--theme-accent, #C5A869);
      background: var(--theme-badge-bg, rgba(197, 168, 105, 0.12));
      border: 1px solid var(--theme-badge-border, rgba(197, 168, 105, 0.3));
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
    }

    .btn-close-modal {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--theme-text-muted, #A7F3D0);
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba(239, 68, 68, 0.2);
        color: #FCA5A5;
        border-color: rgba(239, 68, 68, 0.4);
      }
    }

    /* Tabs Header */
    .modal-tabs-header {
      display: flex;
      gap: 0.5rem;
      background: var(--dash-sidebar-bg, rgba(4, 20, 14, 0.8));
      padding: 0.35rem;
      border-radius: 14px;
      margin-bottom: 1.5rem;
      border: 1px solid var(--theme-footer-border, rgba(197, 168, 105, 0.2));
    }

    .tab-btn {
      flex: 1;
      background: transparent;
      border: none;
      color: var(--theme-text-muted, #A7F3D0);
      padding: 0.65rem 0.5rem;
      font-size: 0.9rem;
      font-weight: 700;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;

      &.active {
        background: var(--theme-cta-bg, linear-gradient(135deg, #059669 0%, #047857 100%));
        color: var(--theme-cta-text, #FFFFFF);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
      }

      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.06);
        color: #FFFFFF;
      }
    }

    .feedback-banner {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.25rem;

      &.error {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.4);
        color: #FCA5A5;
      }

      &.success {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.4);
        color: #6EE7B7;
      }
    }

    .tab-intro {
      margin-bottom: 1.25rem;
      h3 {
        margin: 0 0 0.35rem;
        font-size: 1.25rem;
        font-weight: 800;
        color: #FFFFFF;
      }
      p {
        margin: 0;
        font-size: 0.82rem;
        color: #A7F3D0;
      }
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;

      &.grid-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        @media (max-width: 500px) {
          grid-template-columns: 1fr;
        }

        .full-col {
          grid-column: 1 / -1;
        }
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .field-label {
      font-size: 0.82rem;
      font-weight: 700;
      color: #E2ECE7;
      .req { color: #EF4444; }
    }

    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .field-icon {
      position: absolute;
      right: 0.85rem;
      font-size: 0.95rem;
      pointer-events: none;
    }

    .client-input {
      width: 100%;
      background: var(--dash-input-bg, rgba(4, 20, 14, 0.85));
      border: 1.5px solid var(--dash-input-border, rgba(197, 168, 105, 0.3));
      color: var(--theme-heading, #FFFFFF);
      padding: 0.75rem 2.6rem 0.75rem 0.85rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-family: inherit;
      box-sizing: border-box;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: var(--theme-accent, #C5A869);
        box-shadow: 0 0 0 3px rgba(var(--theme-accent-rgb, 197, 168, 105), 0.2);
        background: var(--dash-input-bg, rgba(4, 20, 14, 0.95));
      }

      &::placeholder {
        color: var(--theme-text-muted, rgba(255, 255, 255, 0.3));
      }
    }

    .modal-phone-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
    }

    .modal-country-select {
      flex: 0 0 155px;
      padding: 0.75rem 0.6rem !important;
      cursor: pointer;
      font-size: 0.82rem;
      background: var(--dash-input-bg, rgba(4, 20, 14, 0.95));
      color: var(--theme-heading, #FFFFFF);
      border: 1.5px solid var(--dash-input-border, rgba(197, 168, 105, 0.3));
    }

    .modal-dial-badge {
      background: var(--theme-badge-bg, rgba(197, 168, 105, 0.18));
      border: 1.5px solid var(--theme-badge-border, rgba(197, 168, 105, 0.4));
      color: var(--theme-accent, #C5A869);
      padding: 0.75rem 0.85rem;
      border-radius: 12px;
      font-weight: 800;
      font-size: 0.88rem;
      direction: ltr;
      white-space: nowrap;
    }

    .ltr-input {
      direction: ltr;
      text-align: right;
    }

    .flex-1 {
      flex: 1;
      padding: 0.75rem 0.85rem !important;
    }

    .client-select {
      appearance: none;
      cursor: pointer;
    }

    .btn-eye {
      position: absolute;
      left: 0.75rem;
      background: none;
      border: none;
      color: var(--theme-accent, #A7F3D0);
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-primary-auth {
      background: var(--theme-cta-bg, linear-gradient(135deg, #059669 0%, #047857 100%));
      color: var(--theme-cta-text, #FFFFFF);
      border: 1.5px solid var(--theme-footer-border, rgba(197, 168, 105, 0.4));
      padding: 0.85rem 1.5rem;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: inherit;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
      transition: all 0.2s;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        filter: brightness(1.1);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.45);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .demo-accounts-box {
      margin-top: 1.25rem;
      padding: 0.85rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px dashed var(--theme-footer-border, rgba(197, 168, 105, 0.3));
      border-radius: 12px;
    }

    .demo-title {
      display: block;
      font-size: 0.75rem;
      color: var(--theme-accent, #C5A869);
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .demo-buttons-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .btn-demo-chip {
      background: var(--theme-badge-bg, rgba(16, 185, 129, 0.15));
      border: 1px solid var(--theme-badge-border, rgba(16, 185, 129, 0.35));
      color: var(--theme-heading, #D1FAE5);
      padding: 0.35rem 0.75rem;
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s;

      &:hover {
        background: var(--theme-accent, #10B981);
        color: var(--theme-cta-text, #FFFFFF);
        border-color: var(--theme-accent, #10B981);
        transform: translateY(-1px);
      }
    }

    .switch-mode-text {
      text-align: center;
      margin-top: 1.25rem;
      font-size: 0.82rem;
      color: var(--theme-text-muted, #A7F3D0);

      a {
        color: var(--theme-accent, #C5A869);
        font-weight: 700;
        margin-right: 0.35rem;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    /* Profile Card */
    .profile-hero-card {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      background: rgba(4, 20, 14, 0.8);
      border: 1px solid rgba(197, 168, 105, 0.3);
      padding: 1.25rem;
      border-radius: 16px;
      margin-bottom: 1.5rem;
    }

    .hero-avatar-large {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      font-weight: 900;
      color: #FFFFFF;
      border: 2px solid #C5A869;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      flex-shrink: 0;
    }

    .hero-client-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      h4 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 800;
        color: #FFFFFF;
      }
    }

    .hero-tag-badge {
      font-size: 0.8rem;
      color: #6EE7B7;
      font-weight: 600;
    }

    .hero-joined-date {
      font-size: 0.72rem;
      color: #A7F3D0;
      opacity: 0.8;
    }

    .profile-actions-row {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }

    .btn-save-profile {
      flex: 2;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      border: 1px solid rgba(197, 168, 105, 0.4);
      color: #FFFFFF;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
    }

    .btn-logout {
      flex: 1;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #FCA5A5;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;

      &:hover {
        background: rgba(239, 68, 68, 0.3);
      }
    }

    /* Orders Tab */
    .orders-list-box {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .order-item-card {
      background: rgba(4, 20, 14, 0.8);
      border: 1px solid rgba(197, 168, 105, 0.25);
      border-radius: 14px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .order-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .order-code-badge {
      font-size: 0.8rem;
      font-weight: 800;
      color: #C5A869;
      background: rgba(197, 168, 105, 0.12);
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }

    .order-status-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;

      &.in_progress {
        background: rgba(245, 158, 11, 0.15);
        color: #FBBF24;
        border: 1px solid rgba(245, 158, 11, 0.35);
      }

      &.completed {
        background: rgba(16, 185, 129, 0.15);
        color: #34D399;
        border: 1px solid rgba(16, 185, 129, 0.35);
      }

      &.pending {
        background: rgba(59, 130, 246, 0.15);
        color: #60A5FA;
        border: 1px solid rgba(59, 130, 246, 0.35);
      }
    }

    .order-service-name {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
      color: #FFFFFF;
    }

    .order-footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 0.5rem;
      font-size: 0.8rem;
      color: #CBDAD3;
    }

    .btn-track-mini {
      color: #C5A869;
      font-weight: 700;
      text-decoration: none;
      background: rgba(197, 168, 105, 0.15);
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      font-size: 0.78rem;

      &:hover {
        background: rgba(197, 168, 105, 0.3);
      }
    }

    .empty-orders-view {
      text-align: center;
      padding: 2.5rem 1rem;
      .empty-icon { font-size: 2.5rem; display: block; margin-bottom: 0.75rem; }
      h4 { margin: 0 0 0.5rem; font-size: 1.1rem; color: #FFFFFF; }
      p { margin: 0 0 1.5rem; font-size: 0.85rem; color: #A7F3D0; }
    }

    .btn-new-order {
      display: inline-flex;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: #FFFFFF;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
    }
  `]
})
export class ClientAuthModalComponent {
  auth = inject(ClientAuthService);
  audio = inject(AudioService);
  cart = inject(CartService);

  loginIdentifier = '';
  loginPassword = '';
  showPassword = false;

  countries: CountryCodeItem[] = COUNTRIES_DATA;
  regCountry: CountryCodeItem = COUNTRIES_DATA[0];
  regSubscriberPhone: string = '';

  profileCountry: CountryCodeItem = COUNTRIES_DATA[0];
  profileSubscriberPhone: string = '';

  regForm = {
    fullName: '',
    phone: '',
    email: '',
    university: '',
    academicLevel: 'بكالوريوس' as any,
    specialization: '',
    password: ''
  };

  profileEdit: Partial<ClientUser> = {};
  myOrders: ClientOrderSummary[] = [];
  feedbackMessage = '';
  isError = false;

  ngOnInit(): void {
    this.refreshData();
  }

  setTab(tab: 'login' | 'register' | 'profile' | 'orders'): void {
    this.audio.playClick();
    this.auth.modalTab.set(tab);
    this.feedbackMessage = '';
    this.refreshData();
  }

  refreshData(): void {
    const client = this.auth.currentClient();
    if (client) {
      this.profileEdit = { ...client };
      this.myOrders = this.auth.getClientOrders();

      // Find matching country
      const matched = this.countries.find(c => c.dialCode === client.countryCode) ||
        this.countries.find(c => client.phone.startsWith(c.dialCode) || client.phone.startsWith(c.dialCode.replace('+', '00')));
      
      if (matched) {
        this.profileCountry = matched;
        let sub = client.phone;
        if (sub.startsWith(matched.dialCode)) sub = sub.slice(matched.dialCode.length);
        else if (sub.startsWith(matched.dialCode.replace('+', '00'))) sub = sub.slice(matched.dialCode.length + 1);
        this.profileSubscriberPhone = sub.replace(/^0+/, '');
      } else {
        this.profileCountry = this.countries[0];
        const digits = (client.phone || '').replace(/[^\d]/g, '');
        if (digits.startsWith('966')) {
          this.profileSubscriberPhone = digits.slice(3);
        } else if (digits.startsWith('0')) {
          this.profileSubscriberPhone = digits.slice(1);
        } else {
          this.profileSubscriberPhone = digits;
        }
      }
    }
  }

  handleLogin(): void {
    if (!this.loginIdentifier) return;
    const res = this.auth.login(this.loginIdentifier, this.loginPassword);
    this.feedbackMessage = res.message;
    this.isError = !res.success;
    if (res.success) {
      this.refreshData();
    }
  }

  quickLogin(phone: string): void {
    this.loginIdentifier = phone;
    this.handleLogin();
  }

  handleRegister(): void {
    const cleanSub = this.regSubscriberPhone.replace(/[^\d]/g, '');
    if (!this.regForm.fullName.trim() || !cleanSub) {
      this.feedbackMessage = 'الاسم ورقم الجوال مطلوبان لإتمام التسجيل';
      this.isError = true;
      return;
    }
    const fullPhone = this.regCountry.dialCode + cleanSub;
    const res = this.auth.register({
      ...this.regForm,
      phone: fullPhone
    });
    this.feedbackMessage = res.message;
    this.isError = !res.success;
    if (res.success) {
      this.refreshData();
    }
  }

  handleUpdateProfile(): void {
    const cleanSub = this.profileSubscriberPhone.replace(/[^\d]/g, '');
    const fullPhone = cleanSub ? (this.profileCountry.dialCode + cleanSub) : (this.profileEdit.phone || '');
    this.profileEdit.phone = fullPhone;
    this.profileEdit.countryCode = this.profileCountry.dialCode;

    const res = this.auth.updateProfile(this.profileEdit);
    this.feedbackMessage = res.message;
    this.isError = !res.success;
  }

  handleLogout(): void {
    this.auth.logout();
    this.feedbackMessage = 'تم تسجيل الخروج بنجاح. أهلاً بك دائماً!';
    this.isError = false;
  }

  onBackdropClick(event: MouseEvent): void {
    this.auth.closeAuthModal();
  }

  getInitials(name?: string): string {
    if (!name) return '👤';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'in_progress': return 'قيد التنفيذ والبحث ⏳';
      case 'completed': return 'تم الاعتماد والتسليم ✓';
      case 'review': return 'فحص Turnitin والتدقيق';
      default: return 'استقبال وتدقيق 📋';
    }
  }
}
