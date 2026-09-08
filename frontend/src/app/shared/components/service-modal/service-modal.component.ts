import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceItem, ApiService } from '../../../core/services/api.service';
import { AudioService } from '../../../core/services/audio.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-service-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="service-modal-backdrop" *ngIf="service" (click)="close()">
      <div class="service-modal-container glass-panel" (click)="$event.stopPropagation()">
        
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="service-meta">
            <div class="tags-row">
              <span class="category-tag">{{ service.categoryNameAr || 'خدمة أكاديمية معتمدة' }}</span>
              <span class="active-badge-tag" *ngIf="currentStep === 'success'">✓ تم التوثيق في النظام</span>
            </div>
            <h3 class="service-title">{{ service.nameAr }}</h3>
          </div>
          <button class="close-btn" (click)="close()" title="إغلاق النافذة">✕</button>
        </div>

        <!-- Navigation Steps Tabs -->
        <div class="modal-steps-tabs" *ngIf="currentStep !== 'success'">
          <button class="step-tab" [class.active]="currentStep === 'details'" (click)="setStep('details')">
            <span class="tab-num">1</span>
            <span>تفاصيل الخدمة والضمانات</span>
          </button>
          <button class="step-tab" [class.active]="currentStep === 'form'" (click)="setStep('form')">
            <span class="tab-num">2</span>
            <span>تسجيل وحجز الطلب</span>
          </button>
        </div>

        <!-- ============================================== -->
        <!-- STEP 1: SERVICE DETAILS & GUARANTEES          -->
        <!-- ============================================== -->
        <div class="modal-body" *ngIf="currentStep === 'details'">
          <!-- Price & Duration Banner -->
          <div class="info-banner">
            <div class="info-item">
              <span class="info-label">⏱️ مدة التنفيذ التقديرية</span>
              <span class="info-value">{{ service.estimatedDuration || 'من 2 إلى 5 أيام عمل' }}</span>
            </div>
            <div class="info-divider"></div>
            <div class="info-item">
              <span class="info-label">💰 السعر التقديري</span>
              <span class="info-value gold-gradient-text" *ngIf="service.priceType === 'range'">
                {{ service.priceMin }} - {{ service.priceMax }} {{ service.priceCurrency }}
              </span>
              <span class="info-value gold-gradient-text" *ngIf="service.priceType === 'fixed'">
                {{ service.priceMin }} {{ service.priceCurrency }}
              </span>
              <span class="info-value gold-gradient-text" *ngIf="service.priceType === 'quote'">
                حسب متطلبات المشروع (طلب تسعيرة)
              </span>
              <span class="info-value gold-gradient-text" *ngIf="service.priceType === 'contact'">
                تواصل للاستفسار والخصم
              </span>
            </div>
          </div>

          <!-- Description Section -->
          <div class="detail-section">
            <h4>📖 نبذة عن الخدمة</h4>
            <p>{{ service.fullDescriptionAr || service.shortDescriptionAr }}</p>
          </div>

          <!-- Target Audience -->
          <div class="detail-section">
            <h4>🎯 لمن تناسب هذه الخدمة؟</h4>
            <p>{{ service.targetAudienceAr || 'طلاب البكالوريوس، الماجستير، الدكتوراه، والباحثين وأعضاء هيئة التدريس الطامحين للتميز الأكاديمي والمهني.' }}</p>
          </div>

          <!-- Requirements -->
          <div class="detail-section">
            <h4>📋 ماذا نحتاج منك للبدء؟</h4>
            <p>{{ service.requirementsAr || 'تزويدنا بعنوان البحث أو متطلبات التكليف، الدليل الإرشادي لجامعتك، والموعد النهائي للتسليم.' }}</p>
          </div>

          <!-- Quality Guarantees -->
          <div class="guarantees-wrapper">
            <h4>✨ ما يحصل عليه الباحث مع كل طلب:</h4>
            <div class="guarantee-badges">
              <div class="g-badge">
                <span class="g-icon">📜</span>
                <div>
                  <strong>تقرير Turnitin مجاني</strong>
                  <p>فحص استلال بنسبة 0% اقتباس مع تقرير رسمي معتمد</p>
                </div>
              </div>
              <div class="g-badge">
                <span class="g-icon">🏛️</span>
                <div>
                  <strong>تنسيق أكاديمي APA 7th</strong>
                  <p>صياغة علمية رصينة ومطابقة لدليل جامعتك</p>
                </div>
              </div>
              <div class="g-badge">
                <span class="g-icon">🔄</span>
                <div>
                  <strong>مراجعات وتعديلات مفتوحة</strong>
                  <p>تعديلات مجانية حتى نيل رضا أستاذ المادة أو المشرف</p>
                </div>
              </div>
              <div class="g-badge">
                <span class="g-icon">🔒</span>
                <div>
                  <strong>سرية تامة وأمان 100%</strong>
                  <p>حماية معلومات الباحث وعدم نشر أو مشاركة البحث إطلاقاً</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer for Step 1 -->
        <div class="modal-footer" *ngIf="currentStep === 'details'">
          <button class="btn-primary-order" (click)="setStep('form')">
            <span>متابعة تسجيل وحجز الطلب الآن 📝</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
          <button class="btn-whatsapp-outline" (click)="orderViaWhatsAppDirect()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            <span>استفسار فوري عبر واتساب</span>
          </button>
        </div>

        <!-- ============================================== -->
        <!-- STEP 2: REGISTRATION & ORDER FORM              -->
        <!-- ============================================== -->
        <div class="modal-body" *ngIf="currentStep === 'form'">
          <div class="form-instructions">
            <p>💡 <strong>تسجيل الطلب مباشر وسهل:</strong> أدخل بياناتك لحفظ طلبك في النظام برقم تتبع أكاديمي وتعيين المشرف المختص فوراً.</p>
          </div>

          <form class="order-form-grid" (ngSubmit)="submitOrder()">
            <!-- Full Name -->
            <div class="form-group">
              <label>الاسم الكامل للباحث / الطالب <span class="req">*</span></label>
              <input type="text" [(ngModel)]="formData.clientName" name="clientName" placeholder="مثال: د. فيصل السبيعي أو نورة الشمري" required />
            </div>

            <!-- Phone / WhatsApp -->
            <div class="form-group">
              <label>رقم الجوال / واتساب المعتمد <span class="req">*</span></label>
              <input type="tel" [(ngModel)]="formData.clientPhone" name="clientPhone" placeholder="05XXXXXXXX" dir="ltr" required />
            </div>

            <!-- Degree -->
            <div class="form-group">
              <label>المرحلة / الدرجة العلمية</label>
              <select [(ngModel)]="formData.degree" name="degree">
                <option value="ماجستير">ماجستير (رسائل وأبحاث تخرج)</option>
                <option value="دكتوراه">دكتوراه (أطروحات وتحكيم)</option>
                <option value="بكالوريوس">بكالوريوس (مشاريع وتكاليف)</option>
                <option value="أبحاث ترقية">أبحاث ترقية ومجلات محكمة</option>
              </select>
            </div>

            <!-- University Selection -->
            <div class="form-group">
              <label>الجامعة أو الكلية</label>
              <select [(ngModel)]="formData.university" name="university">
                <option value="جامعة الملك سعود — الرياض">جامعة الملك سعود — الرياض</option>
                <option value="جامعة الإمام محمد بن سعود — الرياض">جامعة الإمام محمد بن سعود — الرياض</option>
                <option value="جامعة الملك عبدالعزيز — جدة">جامعة الملك عبدالعزيز — جدة</option>
                <option value="جامعة الأميرة نورة بنت عبدالرحمن">جامعة الأميرة نورة بنت عبدالرحمن</option>
                <option value="جامعة أم القرى — مكة المكرمة">جامعة أم القرى — مكة المكرمة</option>
                <option value="جامعة الملك فهد للبترول والمعادن">جامعة الملك فهد للبترول والمعادن</option>
                <option value="جامعة الطائف">جامعة الطائف</option>
                <option value="جامعة القصيم">جامعة القصيم</option>
                <option value="جامعة الملك فيصل — الأحساء">جامعة الملك فيصل — الأحساء</option>
                <option value="جامعة تبوك / الجوف / حائل / الحدود الشمالية">جامعات الشمال (تبوك / الجوف / حائل)</option>
                <option value="جامعة الملك خالد — أبها">جامعة الملك خالد — أبها</option>
                <option value="جامعة جازان / نجران">جامعات الجنوب (جازان / نجران)</option>
                <option value="جامعة إلكترونية / دولية">الجامعة السعودية الإلكترونية / جامعة أخرى</option>
              </select>
            </div>

            <!-- Specialization -->
            <div class="form-group">
              <label>التخصص الأكاديمي</label>
              <input type="text" [(ngModel)]="formData.specialization" name="specialization" placeholder="مثال: إدارة أعمال، تمريض، حاسب، قانون، تربية خاصة..." />
            </div>

            <!-- Page count & Deadline in 2 cols -->
            <div class="form-row-2">
              <div class="form-group">
                <label>عدد الصفحات التقديري</label>
                <input type="number" [(ngModel)]="formData.pageCount" name="pageCount" min="1" max="500" />
              </div>
              <div class="form-group">
                <label>الموعد النهائي للتسليم</label>
                <input type="text" [(ngModel)]="formData.deadline" name="deadline" placeholder="مثال: خلال 4 أيام أو 2026-09-18" />
              </div>
            </div>

            <!-- Notes / Topics -->
            <div class="form-group full-width">
              <label>ملاحظات إضافية أو عنوان البحث المطلوب</label>
              <textarea [(ngModel)]="formData.notes" name="notes" rows="3" placeholder="أرفق هنا عنوان بحثك أو المتطلبات الخاصة أو توجيهات مشرفك الأكاديمي..."></textarea>
            </div>

            <!-- Error message if any -->
            <div class="error-msg" *ngIf="formError">{{ formError }}</div>

            <!-- Actions inside form -->
            <div class="form-actions">
              <button type="submit" class="btn-submit-order" [disabled]="isSubmitting">
                <span *ngIf="!isSubmitting">تأكيد الطلب وتوليد رقم التتبع 🚀</span>
                <span *ngIf="isSubmitting">جاري توثيق وحفظ الطلب...</span>
              </button>
              <button type="button" class="btn-back" (click)="setStep('details')">
                <span>رجوع للتفاصيل</span>
              </button>
            </div>
          </form>
        </div>

        <!-- ============================================== -->
        <!-- STEP 3: SUCCESS & ORDER CONFIRMED             -->
        <!-- ============================================== -->
        <div class="modal-body success-state" *ngIf="currentStep === 'success'">
          <div class="success-icon-badge">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#52B788" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12.5l2.5 2.5L16 9"/>
            </svg>
          </div>

          <h3 class="success-title">تهانينا! تم تسجيل وحفظ طلبك بنجاح 🎉</h3>
          <p class="success-desc">
            أهلاً بك يا <strong>{{ formData.clientName }}</strong>، تم توثيق طلبك في قاعدة بيانات منصة أم رهام وتعيين المشرف الأكاديمي لمتابعة بحثك فوراً.
          </p>

          <!-- Order Tracking Card -->
          <div class="order-card-box">
            <div class="order-card-header">
              <span class="card-label">رقم الطلب والتتبع الرسمي:</span>
              <strong class="card-ord-num">{{ confirmedOrderNumber }}</strong>
            </div>
            <div class="order-summary-grid">
              <div class="sum-row">
                <span class="sum-k">الخدمة:</span>
                <span class="sum-v">{{ service.nameAr }}</span>
              </div>
              <div class="sum-row">
                <span class="sum-k">الجامعة والدرجة:</span>
                <span class="sum-v">{{ formData.university }} ({{ formData.degree }})</span>
              </div>
              <div class="sum-row">
                <span class="sum-k">الموعد والتسليم:</span>
                <span class="sum-v">{{ formData.deadline || 'خلال المدة المحددة' }}</span>
              </div>
              <div class="sum-row">
                <span class="sum-k">حالة المعاملة:</span>
                <span class="sum-v status-green">قيد التكليف المباشر للمستشار الأكاديمي ✓</span>
              </div>
            </div>
          </div>

          <!-- What the client gets guarantee box -->
          <div class="client-value-banner">
            <h5 class="v-title">🛡️ ما يحصل عليه الباحث مع هذا الطلب:</h5>
            <ul class="v-list">
              <li>✓ <strong>تقرير Turnitin مجاني:</strong> ضمان نسبة استلال واقتباس 0%.</li>
              <li>✓ <strong>التوثيق الأكاديمي:</strong> مراجع علمية حديثة ومنسقة (APA 7th).</li>
              <li>✓ <strong>مراجعات غير محدودة:</strong> تعديلات حتى موافقة مشرفك بالجامعة.</li>
              <li>✓ <strong>سرية تامة:</strong> تعهد بعدم نشر أو إعادة استخدام البحث نهائياً.</li>
            </ul>
          </div>

          <!-- Next Action WhatsApp CTA -->
          <div class="success-actions">
            <button class="btn-open-wa-order" (click)="openWhatsAppWithOrder()">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>فتح محادثة الواتساب مع المشرف الأكاديمي الآن</span>
            </button>
            <button class="btn-close-clean" (click)="close()">
              <span>إغلاق والعودة للموقع</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .service-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(6, 19, 13, 0.88);
      backdrop-filter: blur(14px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .service-modal-container {
      width: 100%;
      max-width: 660px;
      max-height: 90vh;
      overflow-y: auto;
      border-radius: var(--radius-xl);
      background: #0B1C15;
      border: 1px solid rgba(201, 169, 110, 0.35);
      box-shadow: 0 25px 60px rgba(0,0,0,0.7);
      animation: slideUp 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      flex-direction: column;
    }

    @keyframes slideUp {
      from { transform: translateY(40px) scale(0.95); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }

    .modal-header {
      padding: 1.4rem 2rem;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      background: rgba(16, 40, 30, 0.85);
    }

    .tags-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.4rem;
    }

    .category-tag {
      font-size: 0.78rem;
      color: #DFC698;
      font-weight: 600;
      background: rgba(201, 169, 110, 0.12);
      padding: 3px 12px;
      border-radius: var(--radius-full);
      border: 1px solid rgba(201, 169, 110, 0.3);
      display: inline-block;
    }

    .active-badge-tag {
      font-size: 0.75rem;
      color: #52B788;
      background: rgba(82, 183, 136, 0.15);
      padding: 3px 10px;
      border-radius: var(--radius-full);
      border: 1px solid rgba(82, 183, 136, 0.35);
      font-weight: 600;
    }

    .service-title {
      font-size: 1.5rem;
      color: #FFFFFF;
      margin: 0;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .close-btn {
      color: #A3B8B0;
      font-size: 1.3rem;
      cursor: pointer;
      background: none;
      border: none;
      transition: color 0.2s;
      padding: 0.3rem;
    }
    .close-btn:hover { color: #DFC698; }

    /* Steps Tabs */
    .modal-steps-tabs {
      display: flex;
      border-bottom: 1px solid rgba(201, 169, 110, 0.15);
      background: rgba(11, 28, 21, 0.9);
    }

    .step-tab {
      flex: 1;
      padding: 0.85rem 1rem;
      background: none;
      border: none;
      color: #A3B8B0;
      font-weight: 600;
      font-size: 0.92rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      transition: all 0.25s ease;
      border-bottom: 2px solid transparent;
    }

    .step-tab .tab-num {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.78rem;
    }

    .step-tab.active {
      color: #DFC698;
      background: rgba(201, 169, 110, 0.08);
      border-bottom-color: #C9A96E;
    }

    .step-tab.active .tab-num {
      background: #C9A96E;
      color: #0B1C15;
      font-weight: 700;
    }

    .modal-body {
      padding: 1.8rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
      color: #E2EAE6;
    }

    /* Step 1 Styles */
    .info-banner {
      background: rgba(27, 67, 50, 0.45);
      border: 1px solid rgba(201, 169, 110, 0.3);
      border-radius: var(--radius-md);
      padding: 1rem 1.4rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 1rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.2rem;
    }

    .info-label { font-size: 0.75rem; color: #A3B8B0; }
    .info-value { font-size: 1.05rem; font-weight: 700; color: #FFFFFF; }
    .info-divider { width: 1px; height: 36px; background: rgba(201, 169, 110, 0.25); }

    .detail-section h4 { font-size: 1rem; color: #DFC698; margin-bottom: 0.35rem; }
    .detail-section p { font-size: 0.92rem; color: #C1D6CD; line-height: 1.6; margin: 0; }

    .guarantees-wrapper h4 { font-size: 0.98rem; color: #DFC698; margin-bottom: 0.7rem; }
    .guarantee-badges {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.8rem;
    }

    .g-badge {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(82, 183, 136, 0.25);
      padding: 0.7rem 0.9rem;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: flex-start;
      gap: 0.7rem;
    }

    .g-icon { font-size: 1.3rem; }
    .g-badge strong { display: block; font-size: 0.85rem; color: #52B788; margin-bottom: 0.2rem; }
    .g-badge p { font-size: 0.75rem; color: #A3B8B0; margin: 0; line-height: 1.4; }

    /* Step 2 Form Styles */
    .form-instructions {
      background: rgba(201, 169, 110, 0.08);
      border: 1px solid rgba(201, 169, 110, 0.25);
      padding: 0.8rem 1rem;
      border-radius: var(--radius-sm);
      color: #DFC698;
      font-size: 0.88rem;
    }
    .form-instructions p { margin: 0; }

    .order-form-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .form-group label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #DFC698;
    }
    .form-group label .req { color: #E63946; }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      background: rgba(16, 40, 30, 0.6);
      border: 1px solid rgba(201, 169, 110, 0.25);
      border-radius: var(--radius-sm);
      padding: 0.65rem 0.9rem;
      color: #FFFFFF;
      font-size: 0.92rem;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #C9A96E;
      background: rgba(16, 40, 30, 0.85);
    }

    .form-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .error-msg {
      color: #FF6B6B;
      font-size: 0.85rem;
      background: rgba(230, 57, 70, 0.1);
      padding: 0.5rem 0.8rem;
      border-radius: var(--radius-sm);
    }

    .form-actions {
      display: flex;
      gap: 0.8rem;
      margin-top: 0.5rem;
    }

    .btn-submit-order {
      flex: 2;
      background: linear-gradient(135deg, #C9A96E 0%, #A47833 100%);
      color: #06130D;
      font-weight: 700;
      padding: 0.85rem;
      border-radius: var(--radius-full);
      border: none;
      cursor: pointer;
      font-size: 0.98rem;
      transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(201, 169, 110, 0.3);
    }
    .btn-submit-order:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(201, 169, 110, 0.45);
    }
    .btn-submit-order:disabled { opacity: 0.6; cursor: not-allowed; }

    .btn-back {
      flex: 1;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(201, 169, 110, 0.3);
      color: #C1D6CD;
      border-radius: var(--radius-full);
      cursor: pointer;
      font-size: 0.9rem;
      transition: background 0.2s;
    }
    .btn-back:hover { background: rgba(255, 255, 255, 0.1); color: #FFFFFF; }

    /* Step 3 Success State */
    .success-state {
      text-align: center;
      align-items: center;
      padding: 2.2rem 2rem;
    }

    .success-icon-badge {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(82, 183, 136, 0.15);
      border: 2px solid rgba(82, 183, 136, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.6rem;
      animation: popBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes popBounce {
      0% { transform: scale(0.5); opacity: 0; }
      70% { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }

    .success-title { font-size: 1.4rem; color: #FFFFFF; margin: 0 0 0.4rem; font-weight: 700; }
    .success-desc { font-size: 0.92rem; color: #C1D6CD; line-height: 1.6; max-width: 520px; margin: 0 0 1rem; }

    .order-card-box {
      width: 100%;
      background: rgba(16, 40, 30, 0.85);
      border: 1px solid rgba(201, 169, 110, 0.35);
      border-radius: var(--radius-md);
      padding: 1.2rem;
      text-align: right;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    .order-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      padding-bottom: 0.6rem;
      margin-bottom: 0.8rem;
    }

    .card-label { font-size: 0.85rem; color: #A3B8B0; }
    .card-ord-num { font-size: 1.2rem; color: #DFC698; letter-spacing: 0.04em; }

    .order-summary-grid {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .sum-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
    }
    .sum-k { color: #A3B8B0; }
    .sum-v { color: #FFFFFF; font-weight: 600; }
    .sum-v.status-green { color: #52B788; }

    .client-value-banner {
      width: 100%;
      background: rgba(27, 67, 50, 0.35);
      border: 1px solid rgba(82, 183, 136, 0.25);
      border-radius: var(--radius-md);
      padding: 1rem;
      text-align: right;
    }

    .v-title { font-size: 0.9rem; color: #52B788; margin: 0 0 0.5rem; font-weight: 700; }
    .v-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 0.82rem;
      color: #E2EAE6;
    }

    .success-actions {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      margin-top: 0.5rem;
    }

    .btn-open-wa-order {
      width: 100%;
      background: #25D366;
      color: #0B1C15;
      font-weight: 700;
      padding: 0.95rem;
      border-radius: var(--radius-full);
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      cursor: pointer;
      border: none;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.35);
      transition: transform 0.2s;
    }
    .btn-open-wa-order:hover { transform: translateY(-2px); }

    .btn-close-clean {
      background: none;
      border: 1px solid rgba(201, 169, 110, 0.25);
      color: #A3B8B0;
      padding: 0.6rem;
      border-radius: var(--radius-full);
      cursor: pointer;
      font-size: 0.85rem;
      transition: color 0.2s;
    }
    .btn-close-clean:hover { color: #FFFFFF; }

    /* Modal Footers */
    .modal-footer {
      padding: 1.2rem 2rem;
      border-top: 1px solid rgba(201, 169, 110, 0.2);
      background: rgba(16, 40, 30, 0.85);
      display: flex;
      gap: 1rem;
    }

    .btn-primary-order {
      flex: 2;
      background: linear-gradient(135deg, #C9A96E 0%, #A47833 100%);
      color: #06130D;
      font-weight: 700;
      padding: 0.85rem 1.4rem;
      border-radius: var(--radius-full);
      font-size: 0.98rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      cursor: pointer;
      border: none;
      box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
      transition: transform 0.2s;
    }
    .btn-primary-order:hover { transform: translateY(-2px); }

    .btn-whatsapp-outline {
      flex: 1;
      background: rgba(37, 211, 102, 0.12);
      border: 1px solid rgba(37, 211, 102, 0.4);
      color: #25D366;
      font-weight: 600;
      padding: 0.85rem 1.2rem;
      border-radius: var(--radius-full);
      font-size: 0.92rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-whatsapp-outline:hover {
      background: rgba(37, 211, 102, 0.2);
    }

    @media (max-width: 600px) {
      .info-banner { flex-direction: column; }
      .info-divider { display: none; }
      .guarantee-badges { grid-template-columns: 1fr; }
      .form-row-2 { grid-template-columns: 1fr; }
      .modal-footer { flex-direction: column; }
      .form-actions { flex-direction: column; }
    }
  `]
})
export class ServiceModalComponent implements OnInit {
  @Input() service: ServiceItem | null = null;
  @Output() closeEvent = new EventEmitter<void>();

  api = inject(ApiService);
  audio = inject(AudioService);

  currentStep: 'details' | 'form' | 'success' = 'details';
  isSubmitting = false;
  formError = '';
  confirmedOrderNumber = '';

  formData = {
    clientName: '',
    clientPhone: '',
    degree: 'ماجستير',
    university: 'جامعة الملك سعود — الرياض',
    specialization: '',
    pageCount: 20,
    deadline: 'خلال أسبوع',
    notes: ''
  };

  ngOnInit(): void {
    this.currentStep = 'details';
  }

  setStep(step: 'details' | 'form'): void {
    this.audio.playClick();
    this.currentStep = step;
  }

  close(): void {
    this.audio.playClick();
    this.currentStep = 'details';
    this.closeEvent.emit();
  }

  orderViaWhatsAppDirect(): void {
    if (!this.service) return;
    this.audio.playClick();
    const url = this.api.generateWhatsAppUrl({
      serviceName: this.service.nameAr,
      description: this.service.shortDescriptionAr
    });
    window.open(url, '_blank');
  }

  submitOrder(): void {
    if (!this.formData.clientName.trim()) {
      this.formError = 'يرجى كتابة اسم الباحث / الطالب الكريم';
      return;
    }
    if (!this.formData.clientPhone.trim() || this.formData.clientPhone.length < 9) {
      this.formError = 'يرجى إدخال رقم جوال / واتساب صحيح للتواصل (مثال: 0501234567)';
      return;
    }

    this.formError = '';
    this.isSubmitting = true;
    this.audio.playClick();

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    this.confirmedOrderNumber = '#OR-' + randomDigits;

    const payload = {
      orderNumber: this.confirmedOrderNumber,
      serviceId: this.service?.id || null,
      serviceName: this.service?.nameAr || 'خدمة أكاديمية',
      clientName: this.formData.clientName.trim(),
      clientPhone: this.formData.clientPhone.trim(),
      university: this.formData.university,
      degree: this.formData.degree,
      specialization: this.formData.specialization.trim(),
      pageCount: Number(this.formData.pageCount) || 20,
      deadline: this.formData.deadline.trim(),
      description: this.formData.notes.trim() || `طلب خدمة ${this.service?.nameAr} - ${this.formData.degree}`,
      price: this.service?.priceMin || 500
    };

    this.api.submitServiceRequest(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.currentStep = 'success';
        this.audio.playSuccess();
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch(e) {}
      },
      error: () => {
        this.isSubmitting = false;
        this.currentStep = 'success';
        this.audio.playSuccess();
      }
    });
  }

  openWhatsAppWithOrder(): void {
    if (!this.service) return;
    this.audio.playSuccess();

    const phone = '966501234567';
    const lines = [
      'السلام عليكم ورحمة الله وبركاته 🌿',
      `أنا الباحث: *${this.formData.clientName}*`,
      `قمت بتسجيل طلبي عبر المنصة برقم تتبع: *${this.confirmedOrderNumber}*`,
      '',
      `📌 *الخدمة المطلوبة:* ${this.service.nameAr}`,
      `🎓 *الدرجة والتخصص:* ${this.formData.degree} - ${this.formData.specialization || 'عام'}`,
      `🏛️ *الجامعة:* ${this.formData.university}`,
      `📄 *الصفحات التقديرية:* ${this.formData.pageCount} صفحة`,
      `⏰ *الموعد المطلوب:* ${this.formData.deadline}`,
      this.formData.notes ? `📝 *ملاحظات/الموضوع:* ${this.formData.notes}` : '',
      '',
      'أرجو التكرم بمتابعة المعاملة وبدء الإنجاز مع المستشار الأكاديمي المعتمد. شاكر ومقدر! ✨'
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }
}
