import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Testimonial } from '../../../core/services/api.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-add-review-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close()" dir="rtl">
      <div class="modal-card glass-panel" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="modal-header">
          <div class="header-icon-box">✍️</div>
          <div class="header-titles">
            <h3>شاركنا رأيك وتجربتك الأكاديمية</h3>
            <p>رأيك وسام فخر لنا ويساعد زملاءك الباحثين والطلاب</p>
          </div>
          <button class="btn-close" (click)="close()" title="إغلاق">✕</button>
        </div>

        <!-- Success Screen with Instant Reward Voucher -->
        <div *ngIf="isSubmitted" class="success-screen">
          <div class="success-icon-box">🎉</div>
          <h3>شكراً لك على تقييمك القيّم!</h3>
          <p>تم حفظ رأيك بنجاح في قاعدة البيانات وسيظهر مباشرة لكافة زوار المنصة.</p>

          <!-- Reward Voucher Box -->
          <div class="reward-voucher-box">
            <div class="voucher-head">
              <span class="gift-icon">🎁</span>
              <strong>مكافأتك الأكاديمية الحصرية</strong>
            </div>
            <div class="voucher-code-row">
              <span class="code-badge">REHAM15</span>
              <span class="voucher-discount">خصم 15% على أي طلب أو بحث قادم</span>
            </div>
            <small class="voucher-note">
              ✉️ تم إرسال تفاصيل الكوبون والمكافأة إلى بريدك الإلكتروني: <strong>{{ clientEmail || 'المسجل لدينا' }}</strong>
            </small>
          </div>

          <button class="btn-saudi-primary" (click)="close()">تم وإغلاق</button>
        </div>

        <!-- Form Body -->
        <form *ngIf="!isSubmitted" (ngSubmit)="onSubmit()" class="review-form">
          
          <!-- Reward Alert Ribbon -->
          <div class="reward-ribbon">
            <span class="ribbon-icon">🎁</span>
            <div class="ribbon-text">
              <strong>مكافأة فورية:</strong>
              <span>احصل على كود خصم 15% ومكافأة ترحيبية تصلك فوراً على بريدك الإلكتروني بعد تسجيل تقييمك!</span>
            </div>
          </div>

          <!-- Rating Stars -->
          <div class="form-group rating-group">
            <label>تقييمك لتجربتك الأكاديمية معنا <span class="req">*</span></label>
            <div class="stars-picker">
              <span 
                *ngFor="let star of [1,2,3,4,5]" 
                class="star-item"
                [class.filled]="star <= rating"
                (click)="setRating(star)"
                (mouseenter)="audio.playHover()">
                ★
              </span>
            </div>
            <span class="rating-label-hint">{{ getRatingText() }}</span>
          </div>

          <!-- 1. Full Name -->
          <div class="form-group">
            <label>الاسم الكريم <span class="req">*</span></label>
            <input 
              type="text" 
              class="form-control"
              [(ngModel)]="clientName" 
              name="clientName" 
              placeholder="مثال: د. فهد الدوسري، أو أ. سارة القحطاني" 
              required />
          </div>

          <!-- 2. Phone with Country Code Dropdown -->
          <div class="form-group">
            <label>رقم الجوال / الواتساب</label>
            <div class="phone-input-group" dir="ltr">
              <select class="country-code-select" [(ngModel)]="phoneCode" name="phoneCode">
                <option value="+966">🇸🇦 +966 (السعودية)</option>
                <option value="+971">🇦🇪 +971 (الإمارات)</option>
                <option value="+965">🇰🇼 +965 (الكويت)</option>
                <option value="+974">🇶🇦 +974 (قطر)</option>
                <option value="+973">🇧🇭 +973 (البحرين)</option>
                <option value="+968">🇴🇲 +968 (عمان)</option>
                <option value="+20">🇪🇬 +20 (مصر)</option>
                <option value="+962">🇯🇴 +962 (الأردن)</option>
                <option value="+">🌐 + رمز آخر</option>
              </select>
              <input 
                type="tel" 
                class="form-control phone-field"
                [(ngModel)]="clientPhone" 
                name="clientPhone" 
                placeholder="501234567" />
            </div>
            <small class="field-hint">للتواصل وتأكيد تفاصيل التقييم أو إرسال الاستشارات الأكاديمية</small>
          </div>

          <!-- 3. Email for Rewards -->
          <div class="form-group">
            <label>البريد الإلكتروني <span class="badge-discount">يصلك عبره كود الخصم والمكافأة 🎁</span></label>
            <input 
              type="email" 
              class="form-control"
              [(ngModel)]="clientEmail" 
              name="clientEmail" 
              placeholder="name@example.com" 
              dir="ltr" />
          </div>

          <!-- 4. Country (Dropdown) & City Row -->
          <div class="form-row">
            <div class="form-group">
              <label>الدولة <span class="req">*</span></label>
              <select class="form-control" [(ngModel)]="country" name="country">
                <option value="السعودية">🇸🇦 المملكة العربية السعودية</option>
                <option value="الإمارات">🇦🇪 الإمارات العربية المتحدة</option>
                <option value="الكويت">🇰🇼 دولة الكويت</option>
                <option value="قطر">🇶🇦 دولة قطر</option>
                <option value="البحرين">🇧🇭 مملكة البحرين</option>
                <option value="عمان">🇴🇲 سلطنة عمان</option>
                <option value="مصر">🇪🇬 جمهورية مصر العربية</option>
                <option value="الأردن">🇯🇴 المملكة الأردنية الهاشمية</option>
                <option value="أخرى">🌐 دولة أخرى</option>
              </select>
            </div>

            <div class="form-group">
              <label>المدينة / المنطقة</label>
              <input 
                type="text" 
                class="form-control"
                [(ngModel)]="city" 
                name="city" 
                placeholder="مثال: الرياض، جدة، الطائف..." />
            </div>
          </div>

          <!-- 5. University / Specialization -->
          <div class="form-group">
            <label>الجامعة أو الدرجة العلمية</label>
            <input 
              type="text" 
              class="form-control"
              [(ngModel)]="clientUniversity" 
              name="clientUniversity" 
              placeholder="مثال: ماجستير إدارة أعمال — جامعة الملك سعود" />
          </div>

          <!-- 6. Comment / Review -->
          <div class="form-group">
            <label>رأيك وتجربتك الأكاديمية بالتفصيل <span class="req">*</span></label>
            <textarea 
              class="form-control"
              [(ngModel)]="contentAr" 
              name="contentAr" 
              rows="3" 
              placeholder="اكتب تقييمك ورأيك في جودة الخدمة، الالتزام بالمواعيد، والتعامل الأكاديمي..."
              required></textarea>
          </div>

          <div *ngIf="errorMessage" class="error-banner">
            ⚠️ {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn-saudi-primary btn-submit-full" 
            [disabled]="isSubmitting">
            <span *ngIf="!isSubmitting">نشر التقييم واستلام كود الخصم ✨</span>
            <span *ngIf="isSubmitting">جاري الحفظ وإرسال المكافأة... ⏳</span>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(6, 19, 13, 0.88);
      backdrop-filter: blur(14px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      width: 100%;
      max-width: 580px;
      background: #0B1C15;
      border: 1.5px solid rgba(201, 169, 110, 0.4);
      border-radius: var(--radius-xl);
      padding: 2rem;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(201, 169, 110, 0.2);
      max-height: 90vh;
      overflow-y: auto;
      direction: rtl;
    }

    .modal-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1.2rem;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      margin-bottom: 1.2rem;
      position: relative;
    }

    .header-icon-box {
      font-size: 1.8rem;
      width: 48px;
      height: 48px;
      background: rgba(201, 169, 110, 0.15);
      border: 1.5px solid #C9A96E;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .header-titles h3 {
      font-size: 1.25rem;
      color: #FFFFFF;
      margin: 0 0 2px 0;
      font-weight: 800;
    }

    .header-titles p {
      font-size: 0.8rem;
      color: #A3B8B0;
      margin: 0;
    }

    .btn-close {
      position: absolute;
      left: 0;
      top: 0;
      background: none;
      border: none;
      color: #A3B8B0;
      font-size: 1.3rem;
      cursor: pointer;
      padding: 0.4rem;
      transition: color 0.2s;
    }

    .btn-close:hover { color: #DFC698; }

    /* Reward Alert Ribbon */
    .reward-ribbon {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      background: linear-gradient(135deg, rgba(201, 169, 110, 0.15), rgba(27, 67, 50, 0.4));
      border: 1px solid #C9A96E;
      border-radius: var(--radius-md);
      padding: 0.85rem 1rem;
      margin-bottom: 1.2rem;
    }

    .ribbon-icon { font-size: 1.4rem; }
    .ribbon-text strong { color: #DFC698; font-size: 0.84rem; display: block; }
    .ribbon-text span { color: #C1D6CD; font-size: 0.78rem; line-height: 1.4; }

    .review-form {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .form-group label {
      font-size: 0.84rem;
      color: #FFFFFF;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .badge-discount {
      font-size: 0.72rem;
      color: #DFC698;
      background: rgba(201, 169, 110, 0.15);
      padding: 2px 7px;
      border-radius: var(--radius-sm);
      font-weight: 700;
    }

    .req { color: #E76F51; font-weight: 900; }

    .form-control {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(201, 169, 110, 0.3);
      color: #FFFFFF;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.88rem;
      transition: all 0.2s;
    }

    .form-control:focus {
      outline: none;
      border-color: #DFC698;
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 15px rgba(201, 169, 110, 0.25);
    }

    .form-control option {
      background: #0B1C15;
      color: #FFFFFF;
    }

    /* Phone with Country Code Group */
    .phone-input-group {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .country-code-select {
      width: 145px;
      background: #091A13;
      border: 1px solid rgba(201, 169, 110, 0.35);
      color: #DFC698;
      padding: 0.75rem 0.5rem;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .country-code-select option { background: #0B1C15; color: #FFFFFF; }

    .phone-field {
      flex: 1;
      font-family: var(--font-family-latin);
      font-weight: 600;
    }

    .field-hint {
      font-size: 0.72rem;
      color: #839E93;
      margin-top: 2px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    /* Rating Stars Picker */
    .rating-group {
      align-items: center;
      background: rgba(255, 255, 255, 0.03);
      padding: 0.9rem;
      border-radius: var(--radius-md);
      border: 1px solid rgba(201, 169, 110, 0.2);
    }

    .stars-picker {
      display: flex;
      gap: 0.5rem;
      font-size: 2.2rem;
      cursor: pointer;
      direction: ltr;
    }

    .star-item {
      color: rgba(255, 255, 255, 0.2);
      transition: color 0.15s, transform 0.15s;
    }

    .star-item:hover, .star-item.filled {
      color: #C9A96E;
      text-shadow: 0 0 12px rgba(201, 169, 110, 0.6);
      transform: scale(1.1);
    }

    .rating-label-hint {
      font-size: 0.82rem;
      color: #DFC698;
      font-weight: 700;
      margin-top: 0.3rem;
    }

    .btn-submit-full {
      width: 100%;
      padding: 0.95rem;
      font-size: 1rem;
      font-weight: 800;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, #C9A96E 0%, #A48348 100%);
      color: #06130D;
      border: none;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(201, 169, 110, 0.3);
      transition: all 0.2s;
    }

    .btn-submit-full:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(201, 169, 110, 0.45);
    }

    .btn-submit-full:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-banner {
      background: rgba(231, 111, 81, 0.15);
      border: 1px solid #E76F51;
      color: #FF8A70;
      padding: 0.6rem 0.9rem;
      border-radius: var(--radius-md);
      font-size: 0.82rem;
      font-weight: 700;
    }

    /* Success Screen */
    .success-screen {
      text-align: center;
      padding: 1.5rem 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .success-icon-box {
      font-size: 3rem;
      animation: bounce 0.6s ease-in-out infinite alternate;
    }

    @keyframes bounce {
      from { transform: translateY(0); }
      to { transform: translateY(-8px); }
    }

    .success-screen h3 {
      font-size: 1.4rem;
      color: #FFFFFF;
      margin: 0;
      font-weight: 800;
    }

    .success-screen p {
      font-size: 0.88rem;
      color: #C1D6CD;
      margin: 0;
      line-height: 1.6;
    }

    .reward-voucher-box {
      width: 100%;
      background: linear-gradient(135deg, rgba(201, 169, 110, 0.2), rgba(27, 67, 50, 0.5));
      border: 1.5px dashed #C9A96E;
      border-radius: var(--radius-lg);
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      align-items: center;
    }

    .voucher-head {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #DFC698;
      font-size: 0.95rem;
    }

    .voucher-code-row {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .code-badge {
      background: #C9A96E;
      color: #06130D;
      font-weight: 900;
      font-family: var(--font-family-latin);
      padding: 4px 14px;
      border-radius: var(--radius-md);
      font-size: 1.2rem;
      letter-spacing: 2px;
      box-shadow: 0 4px 15px rgba(201, 169, 110, 0.4);
    }

    .voucher-discount {
      color: #52B788;
      font-weight: 800;
      font-size: 0.88rem;
    }

    .voucher-note {
      font-size: 0.78rem;
      color: #A3B8B0;
    }

    .voucher-note strong { color: #FFFFFF; }

    @media (max-width: 580px) {
      .form-row { grid-template-columns: 1fr; }
      .phone-input-group { flex-direction: column; }
      .country-code-select { width: 100%; }
    }
  `]
})
export class AddReviewModalComponent {
  api = inject(ApiService);
  audio = inject(AudioService);

  @Output() closeEvent = new EventEmitter<void>();
  @Output() reviewAdded = new EventEmitter<Testimonial>();

  rating = 5;
  clientName = '';
  phoneCode = '+966';
  clientPhone = '';
  clientEmail = '';
  country = 'السعودية';
  city = 'الرياض';
  clientUniversity = '';
  contentAr = '';

  isSubmitting = false;
  isSubmitted = false;
  errorMessage = '';

  setRating(val: number): void {
    this.rating = val;
    this.audio.playClick();
  }

  getRatingText(): string {
    switch (this.rating) {
      case 5: return '⭐⭐⭐⭐⭐ ممتاز جداً وموصى به بشدة';
      case 4: return '⭐⭐⭐⭐ جيد جداً وتجربة مميزة';
      case 3: return '⭐⭐⭐ جيد ومرضي';
      case 2: return '⭐⭐ مقبول';
      default: return '⭐ يحتاج لتحسين';
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (!this.clientName.trim()) {
      this.errorMessage = 'يرجى إدخال اسمك الكريم.';
      return;
    }
    if (!this.contentAr.trim()) {
      this.errorMessage = 'يرجى كتابة رأيك وتجربتك الأكاديمية.';
      return;
    }

    this.isSubmitting = true;
    const fullPhone = this.clientPhone.trim() ? `${this.phoneCode} ${this.clientPhone.trim()}` : '';

    this.api.submitReview({
      clientName: this.clientName.trim(),
      clientPhone: fullPhone,
      clientEmail: this.clientEmail.trim(),
      country: this.country,
      city: this.city.trim(),
      clientUniversity: this.clientUniversity.trim(),
      contentAr: this.contentAr.trim(),
      rating: this.rating
    }).subscribe({
      next: (created) => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.audio.playSuccess();
        this.reviewAdded.emit(created);
      },
      error: () => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.audio.playSuccess();
      }
    });
  }

  close(): void {
    this.closeEvent.emit();
  }
}
