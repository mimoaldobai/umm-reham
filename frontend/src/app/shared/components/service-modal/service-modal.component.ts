import { Component, Input, Output, EventEmitter, inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceItem, ApiService, ServiceTemplate } from '../../../core/services/api.service';
import { AudioService } from '../../../core/services/audio.service';
import { RewardsService } from '../../../core/services/rewards.service';
import { CartService } from '../../../core/services/cart.service';
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
              <span class="active-badge-tag" *ngIf="currentStep === 'success'">✓ تم التوثيق والاعتماد</span>
              <span class="rewards-active-tag" *ngIf="rewardsService.welcomeConfig().isEnabled && currentStep !== 'success'">
                🎁 باقة الترحيب متاحة
              </span>
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
            <span>تسجيل وحجز الطلب + كود الخصم 🎁</span>
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

          <!-- Multi-Templates Picker inside Modal -->
          <div class="modal-templates-picker" *ngIf="service.templates && service.templates.length > 0">
            <div class="tpl-picker-header">
              <h4>🎨 النماذج والتصاميم المتاحة (اختر النموذج):</h4>
              <span class="tpl-badge">{{ service.templates.length }} نماذج</span>
            </div>
            
            <div class="modal-templates-grid">
              <div 
                *ngFor="let tpl of service.templates"
                class="modal-tpl-card"
                [class.selected]="selectedTemplate?.id === tpl.id"
                (click)="chooseTemplate(tpl)">
                <div class="tpl-card-top">
                  <span class="tpl-tag">{{ tpl.code }}</span>
                  <span class="tpl-pop" *ngIf="tpl.isPopular">الأكثر طلباً ⭐</span>
                </div>
                <h5 class="tpl-title">{{ tpl.nameAr }}</h5>
                <p class="tpl-desc" *ngIf="tpl.descriptionAr">{{ tpl.descriptionAr }}</p>
                <div class="tpl-card-bottom">
                  <strong class="tpl-price">{{ tpl.price }} ر.س</strong>
                  <span class="tpl-select-radio">
                    {{ selectedTemplate?.id === tpl.id ? '✓ تم الاختيار' : 'اختر النموذج' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Quantity Counter in Modal -->
            <div class="modal-qty-control-row">
              <div class="m-qty-lbl">
                <span>الكمية المطلوبة:</span>
                <small>(مثلاً: 2 أو 3 نماذج)</small>
              </div>
              <div class="m-qty-stepper">
                <button type="button" class="btn-m-step" (click)="updateModalQty(-1)">−</button>
                <span class="m-step-val">{{ modalQty }}</span>
                <button type="button" class="btn-m-step" (click)="updateModalQty(1)">+</button>
              </div>
              <div class="m-total-calc" *ngIf="selectedTemplate">
                <span>الإجمالي:</span>
                <strong>{{ selectedTemplate.price * modalQty }} ر.س</strong>
              </div>
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
            <h4>✨ ما يحصل عليه الباحث مع هذا الطلب (مكافآت مجانية):</h4>
            <div class="guarantee-badges">
              <div class="g-badge" *ngFor="let perk of activePerks()">
                <span class="g-icon">{{ perk.icon }}</span>
                <div>
                  <strong>{{ perk.title }}</strong>
                  <p>{{ perk.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer for Step 1 -->
        <div class="modal-footer" *ngIf="currentStep === 'details'">
          <!-- Add to cart button -->
          <button class="btn-modal-add-cart" (click)="addToCartFromModal()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>إضافة للسلة 🛒</span>
          </button>

          <!-- Direct WhatsApp Order Button -->
          <button class="btn-whatsapp-outline bounce-attention" (click)="orderViaWhatsAppDirect()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            <span>طلب واتساب (الدفع بعد الإنجاز)</span>
          </button>

          <!-- Book & Register in Platform -->
          <button class="btn-primary-order" (click)="setStep('form')">
            <span>حجز عبر المنصة + كود خصم 📝</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
        </div>

        <!-- ============================================== -->
        <!-- STEP 2: REGISTRATION & ORDER FORM + COUPON     -->
        <!-- ============================================== -->
        <div class="modal-body" *ngIf="currentStep === 'form'">
          <div class="form-instructions">
            <p>💡 <strong>تسجيل الطلب مباشر:</strong> أدخل بياناتك لحفظ طلبك في النظام وتطبيق خصم الترحيب وتعيين المشرف المختص فوراً.</p>
          </div>

          <form class="order-form-grid" (ngSubmit)="submitOrder()">
            <!-- Full Name -->
            <div class="form-group">
              <label>الاسم الكامل للباحث / الطالب <span class="req">*</span></label>
              <input type="text" [(ngModel)]="formData.clientName" name="clientName" placeholder="مثال: د. فيصل السبيعي أو نورة الشمري" required />
            </div>

            <!-- Phone & Email in 2 cols -->
            <div class="form-row-2">
              <div class="form-group">
                <label>رقم الجوال / واتساب المعتمد <span class="req">*</span></label>
                <input type="tel" [(ngModel)]="formData.clientPhone" name="clientPhone" placeholder="05XXXXXXXX" dir="ltr" required />
              </div>
              <div class="form-group">
                <label>البريد الإلكتروني <span class="badge-opt">(اختياري)</span></label>
                <input type="email" [(ngModel)]="formData.clientEmail" name="clientEmail" placeholder="user@example.com" dir="ltr" />
              </div>
            </div>

            <!-- Degree & University -->
            <div class="form-row-2">
              <div class="form-group">
                <label>المرحلة / الدرجة العلمية</label>
                <select [(ngModel)]="formData.degree" name="degree">
                  <option value="ماجستير">ماجستير (رسائل وأبحاث تخرج)</option>
                  <option value="دكتوراه">دكتوراه (أطروحات وتحكيم)</option>
                  <option value="بكالوريوس">بكالوريوس (مشاريع وتكاليف)</option>
                  <option value="أبحاث ترقية">أبحاث ترقية ومجلات محكمة</option>
                </select>
              </div>

              <div class="form-group">
                <label>الجامعة السعودية</label>
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
                  <option value="الجامعة السعودية الإلكترونية / جامعة أخرى">الجامعة السعودية الإلكترونية / جامعة أخرى</option>
                </select>
              </div>
            </div>

            <!-- Specialization, Pages & Deadline -->
            <div class="form-row-3">
              <div class="form-group">
                <label>التخصص الأكاديمي</label>
                <input type="text" [(ngModel)]="formData.specialization" name="specialization" placeholder="مثال: إدارة، تمريض، قانون..." />
              </div>
              <div class="form-group">
                <label>عدد الصفحات التقديري</label>
                <input type="number" [(ngModel)]="formData.pageCount" name="pageCount" min="1" max="500" (ngModelChange)="onPagesOrServiceChange()" />
              </div>
              <div class="form-group">
                <label>الموعد النهائي للتسليم</label>
                <input type="text" [(ngModel)]="formData.deadline" name="deadline" placeholder="مثال: خلال 4 أيام" />
              </div>
            </div>

            <!-- Coupon Code & Rewards Section -->
            <div class="coupon-box-card">
              <div class="coupon-head-row">
                <label class="coupon-lbl">
                  <span>🎁 كود الخصم والمكافأة الترحيبية:</span>
                </label>
                <span class="active-promo-hint" *ngIf="rewardsService.welcomeConfig().isEnabled">
                  كود الترحيب التلقائي: <strong>{{ rewardsService.welcomeConfig().couponCode }}</strong>
                </span>
              </div>

              <div class="coupon-input-wrap">
                <input type="text" [(ngModel)]="formData.couponCode" name="couponCode" placeholder="أدخل كود الخصم (مثال: REHAM15)" style="text-transform: uppercase;" />
                <button type="button" class="btn-apply-code" (click)="applyCoupon()">
                  <span>تطبيق الكود ✓</span>
                </button>
              </div>

              <!-- Pricing Preview with Discount Details -->
              <div class="pricing-summary-card" *ngIf="appliedCoupon">
                <div class="pr-row">
                  <span>السعر التقديري قبل الخصم:</span>
                  <del class="orig-pr">{{ originalPrice }} ر.س</del>
                </div>
                <div class="pr-row discount-row">
                  <span>🎉 الخصم المطبق ({{ appliedCoupon.code }}):</span>
                  <strong class="text-green">-{{ savings }} ر.س</strong>
                </div>
                <div class="pr-row final-row">
                  <span>المبلغ النهائي بعد الخصم:</span>
                  <strong class="final-pr gold-gradient-text">{{ discountedPrice }} ر.س فقط!</strong>
                </div>
              </div>

              <div class="coupon-msg-success" *ngIf="couponSuccess">{{ couponSuccess }}</div>
              <div class="coupon-msg-error" *ngIf="couponError">{{ couponError }}</div>
            </div>

            <!-- Notes / Topics -->
            <div class="form-group full-width">
              <label>ملاحظات إضافية أو عنوان البحث المطلوب</label>
              <textarea [(ngModel)]="formData.notes" name="notes" rows="2" placeholder="أرفق هنا عنوان بحثك أو المتطلبات الخاصة أو توجيهات مشرفك الأكاديمي..."></textarea>
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
        <!-- STEP 3: SUCCESS & GOLDEN REWARDS PACK          -->
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
            أهلاً بك يا <strong>{{ formData.clientName }}</strong>، تم توثيق طلبك في قاعدة بيانات منصة أم رهام واعتماد باقة المكافآت الترحيبية وتعيين المشرف الأكاديمي لبدء الإنجاز فوراً.
          </p>

          <!-- Golden Rewards Pack Voucher Card -->
          <div class="golden-voucher-card">
            <div class="voucher-brand-header">
              <div class="voucher-brand-avatar-box">
                <img src="assets/images/reham_profile_luxury.jpg" alt="أم رهام" class="voucher-avatar-img" />
              </div>
              <div class="voucher-brand-titles">
                <strong>أم رهام • المنصة الأكاديمية الأولى 🇸🇦</strong>
                <small>وثيقة الاعتماد والترحيب بالباحث الجديد</small>
              </div>
            </div>

            <div class="voucher-top">
              <div class="voucher-badge">🎁 باقة ترحيب الباحث الجديد</div>
              <div class="voucher-code-copy" (click)="copyCouponCode()" title="اضغط لنسخ الكود">
                <span class="v-code">{{ appliedCoupon?.code || rewardsService.welcomeConfig().couponCode }}</span>
                <span class="copy-hint">{{ showCopied ? 'تم النسخ ✓' : 'نسخ 📋' }}</span>
              </div>
            </div>
            
            <p class="voucher-msg">{{ rewardsService.welcomeConfig().welcomeMessage }}</p>

            <div class="free-gifts-grid">
              <div class="gift-mini-pill" *ngFor="let p of activePerks()">
                <span class="g-icon">{{ p.icon }}</span>
                <span>{{ p.title }}</span>
              </div>
            </div>
          </div>

          <!-- Order Tracking Card -->
          <div class="order-card-box">
            <div class="order-card-header">
              <span class="card-label">رقم الطلب والتتبع الرسمي:</span>
              <strong class="card-ord-num">{{ confirmedOrderNumber }}</strong>
            </div>
            <div class="order-summary-grid">
              <div class="sum-row">
                <span class="sum-k">الخدمة المطلوبة:</span>
                <span class="sum-v">{{ service.nameAr }}</span>
              </div>
              <div class="sum-row">
                <span class="sum-k">الجامعة والدرجة:</span>
                <span class="sum-v">{{ formData.university }} ({{ formData.degree }})</span>
              </div>
              <div class="sum-row" *ngIf="savings > 0">
                <span class="sum-k">المبلغ بعد الخصم المطبق:</span>
                <span class="sum-v status-green">{{ discountedPrice }} ر.س (وفرت {{ savings }} ر.س)</span>
              </div>
              <div class="sum-row">
                <span class="sum-k">حالة المعاملة:</span>
                <span class="sum-v status-green">قيد التكليف المباشر للمستشار الأكاديمي ✓</span>
              </div>
            </div>
          </div>

          <!-- Next Action WhatsApp CTA -->
          <div class="success-actions">
            <button class="btn-open-wa-order" (click)="openWhatsAppWithOrder()">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>فتح محادثة الواتساب واعتماد الخصم مع المشرف الأكاديمي</span>
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
      max-width: 680px;
      max-height: 92vh;
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
      padding: 1.3rem 1.8rem;
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
      margin-bottom: 0.35rem;
      flex-wrap: wrap;
    }

    .category-tag {
      font-size: 0.75rem;
      color: #DFC698;
      font-weight: 600;
      background: rgba(201, 169, 110, 0.12);
      padding: 3px 10px;
      border-radius: var(--radius-full);
      border: 1px solid rgba(201, 169, 110, 0.3);
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

    .rewards-active-tag {
      font-size: 0.75rem;
      color: #FBE6B3;
      background: rgba(201, 169, 110, 0.2);
      padding: 3px 10px;
      border-radius: var(--radius-full);
      border: 1px solid rgba(201, 169, 110, 0.45);
      font-weight: 700;
      animation: pulseGold 2s infinite ease-in-out;
    }

    @keyframes pulseGold {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.04); }
    }

    .service-title {
      font-size: 1.45rem;
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
      padding: 0.8rem 1rem;
      background: none;
      border: none;
      color: #A3B8B0;
      font-weight: 600;
      font-size: 0.88rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.25s ease;
      border-bottom: 2px solid transparent;
    }

    .step-tab .tab-num {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
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
      padding: 1.6rem 1.8rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      color: #E2EAE6;
    }

    /* Step 1 Styles */
    .info-banner {
      background: rgba(27, 67, 50, 0.45);
      border: 1px solid rgba(201, 169, 110, 0.3);
      border-radius: var(--radius-md);
      padding: 0.9rem 1.2rem;
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

    .info-label { font-size: 0.72rem; color: #A3B8B0; }
    .info-value { font-size: 1rem; font-weight: 700; color: #FFFFFF; }
    .info-divider { width: 1px; height: 32px; background: rgba(201, 169, 110, 0.25); }

    .detail-section h4 { font-size: 0.95rem; color: #DFC698; margin-bottom: 0.3rem; }
    .detail-section p { font-size: 0.9rem; color: #C1D6CD; line-height: 1.55; margin: 0; }

    /* Multi-Templates Picker Styles */
    .modal-templates-picker {
      background: rgba(255, 255, 255, 0.04);
      border: 1.5px solid rgba(201, 169, 110, 0.3);
      border-radius: var(--radius-md);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .tpl-picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .tpl-picker-header h4 {
      margin: 0;
      font-size: 0.95rem;
      color: #DFC698;
      font-weight: 800;
    }

    .tpl-badge {
      font-size: 0.72rem;
      background: rgba(201, 169, 110, 0.2);
      color: #DFC698;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      font-weight: 700;
    }

    .modal-templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.75rem;
    }

    .modal-tpl-card {
      background: rgba(11, 28, 21, 0.7);
      border: 1.5px solid rgba(201, 169, 110, 0.25);
      border-radius: var(--radius-sm);
      padding: 0.75rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.4rem;
      transition: all 0.2s;
    }

    .modal-tpl-card:hover {
      border-color: #C9A96E;
      background: rgba(201, 169, 110, 0.08);
    }

    .modal-tpl-card.selected {
      border-color: #52B788;
      background: rgba(82, 183, 136, 0.15);
      box-shadow: 0 0 15px rgba(82, 183, 136, 0.25);
    }

    .tpl-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .tpl-tag {
      font-size: 0.68rem;
      background: #0B1C15;
      color: #DFC698;
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid rgba(201, 169, 110, 0.4);
      font-weight: 800;
    }

    .tpl-pop {
      font-size: 0.65rem;
      background: #FEF3C7;
      color: #92400E;
      padding: 1px 6px;
      border-radius: var(--radius-full);
      font-weight: 800;
    }

    .tpl-title {
      font-size: 0.88rem;
      color: #FFFFFF;
      font-weight: 700;
      margin: 0;
      line-height: 1.4;
    }

    .tpl-desc {
      font-size: 0.74rem;
      color: #A3B8B0;
      margin: 0;
      line-height: 1.35;
    }

    .tpl-card-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 0.4rem;
      border-top: 1px dashed rgba(201, 169, 110, 0.2);
    }

    .tpl-price {
      font-size: 0.95rem;
      color: #DFC698;
      font-weight: 800;
    }

    .tpl-select-radio {
      font-size: 0.72rem;
      color: #52B788;
      font-weight: 700;
    }

    /* Modal Qty Row */
    .modal-qty-control-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 0.6rem;
      border-top: 1px solid rgba(201, 169, 110, 0.2);
    }

    .m-qty-lbl span {
      font-size: 0.85rem;
      color: #FFFFFF;
      font-weight: 700;
      display: block;
    }

    .m-qty-lbl small {
      font-size: 0.72rem;
      color: #A3B8B0;
    }

    .m-qty-stepper {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(201, 169, 110, 0.4);
      border-radius: var(--radius-full);
      padding: 2px 6px;
    }

    .btn-m-step {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(201, 169, 110, 0.2);
      border: none;
      color: #DFC698;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }

    .btn-m-step:hover {
      background: #C9A96E;
      color: #0B1C15;
    }

    .m-step-val {
      min-width: 24px;
      text-align: center;
      font-size: 0.95rem;
      font-weight: 800;
      color: #FFFFFF;
    }

    .m-total-calc {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 0.75rem;
      color: #A3B8B0;
    }

    .m-total-calc strong {
      font-size: 1rem;
      color: #DFC698;
      font-weight: 800;
    }

    .btn-modal-add-cart {
      background: rgba(201, 169, 110, 0.15);
      border: 1.5px solid #C9A96E;
      color: #DFC698;
      padding: 0.75rem 1.2rem;
      border-radius: var(--radius-full);
      font-family: var(--font-family-arabic);
      font-size: 0.88rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .btn-modal-add-cart:hover {
      background: #C9A96E;
      color: #0B1C15;
      transform: translateY(-2px);
    }

    .bounce-attention {
      animation: modalWaBounce 1.5s infinite;
    }

    @keyframes modalWaBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.04); }
    }

    .guarantees-wrapper h4 { font-size: 0.95rem; color: #DFC698; margin-bottom: 0.6rem; }
    .guarantee-badges {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.7rem;
    }

    .g-badge {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(82, 183, 136, 0.25);
      padding: 0.65rem 0.85rem;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
    }

    .g-icon { font-size: 1.25rem; }
    .g-badge strong { display: block; font-size: 0.82rem; color: #52B788; margin-bottom: 0.2rem; }
    .g-badge p { font-size: 0.72rem; color: #A3B8B0; margin: 0; line-height: 1.35; }

    /* Step 2 Form Styles */
    .form-instructions {
      background: rgba(201, 169, 110, 0.08);
      border: 1px solid rgba(201, 169, 110, 0.25);
      padding: 0.75rem 0.9rem;
      border-radius: var(--radius-sm);
      color: #DFC698;
      font-size: 0.85rem;
    }
    .form-instructions p { margin: 0; }

    .order-form-grid {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .form-group label {
      font-size: 0.82rem;
      font-weight: 600;
      color: #DFC698;
    }
    .form-group label .req { color: #E63946; }
    .form-group label .badge-opt { font-size: 0.7rem; color: #94A3B8; font-weight: 400; }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      background: rgba(16, 40, 30, 0.6);
      border: 1px solid rgba(201, 169, 110, 0.25);
      border-radius: var(--radius-sm);
      padding: 0.6rem 0.85rem;
      color: #FFFFFF;
      font-size: 0.9rem;
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
      gap: 0.8rem;
    }

    .form-row-3 {
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr;
      gap: 0.8rem;
    }

    /* Coupon Box Card */
    .coupon-box-card {
      background: rgba(201, 169, 110, 0.07);
      border: 1.5px dashed rgba(201, 169, 110, 0.35);
      border-radius: var(--radius-md);
      padding: 0.9rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .coupon-head-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .coupon-lbl { font-size: 0.84rem; font-weight: 700; color: #DFC698; }
    .active-promo-hint { font-size: 0.75rem; color: #A3B8B0; }
    .active-promo-hint strong { color: #DFC698; }

    .coupon-input-wrap {
      display: flex;
      gap: 0.6rem;
    }

    .coupon-input-wrap input {
      flex: 1;
      background: rgba(11, 28, 21, 0.8);
      border: 1px solid rgba(201, 169, 110, 0.35);
      border-radius: var(--radius-sm);
      padding: 0.55rem 0.85rem;
      color: #FFFFFF;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .btn-apply-code {
      background: linear-gradient(135deg, #C9A96E 0%, #A47833 100%);
      color: #06130D;
      font-weight: 700;
      border: none;
      padding: 0.55rem 1.2rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.85rem;
      transition: transform 0.2s;
    }
    .btn-apply-code:hover { transform: translateY(-1px); }

    .pricing-summary-card {
      background: rgba(16, 40, 30, 0.8);
      border: 1px solid rgba(82, 183, 136, 0.35);
      border-radius: var(--radius-sm);
      padding: 0.7rem 0.9rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .pr-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
      color: #A3B8B0;
    }
    .orig-pr { color: #94A3B8; }
    .text-green { color: #52B788; font-weight: 700; }
    .final-row {
      border-top: 1px solid rgba(201, 169, 110, 0.2);
      padding-top: 0.4rem;
      margin-top: 0.2rem;
      font-size: 0.9rem;
      color: #FFFFFF;
    }
    .final-pr { font-size: 1.05rem; font-weight: 800; }

    .coupon-msg-success { color: #52B788; font-size: 0.8rem; font-weight: 600; }
    .coupon-msg-error { color: #FF6B6B; font-size: 0.8rem; }
    .error-msg { color: #FF6B6B; font-size: 0.85rem; background: rgba(230, 57, 70, 0.1); padding: 0.5rem 0.8rem; border-radius: var(--radius-sm); }

    .form-actions {
      display: flex;
      gap: 0.8rem;
      margin-top: 0.4rem;
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
      font-size: 0.96rem;
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
      font-size: 0.88rem;
      transition: background 0.2s;
    }
    .btn-back:hover { background: rgba(255, 255, 255, 0.1); color: #FFFFFF; }

    /* Step 3 Success State */
    .success-state {
      text-align: center;
      align-items: center;
      padding: 2rem 1.8rem;
    }

    .success-icon-badge {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: rgba(82, 183, 136, 0.15);
      border: 2px solid rgba(82, 183, 136, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5rem;
      animation: popBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes popBounce {
      0% { transform: scale(0.5); opacity: 0; }
      70% { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }

    .success-title { font-size: 1.35rem; color: #FFFFFF; margin: 0 0 0.35rem; font-weight: 700; }
    .success-desc { font-size: 0.88rem; color: #C1D6CD; line-height: 1.55; max-width: 520px; margin: 0 0 0.9rem; }

    /* Golden Voucher Card */
    .golden-voucher-card {
      width: 100%;
      background: linear-gradient(135deg, rgba(201, 169, 110, 0.18) 0%, rgba(27, 67, 50, 0.4) 100%);
      border: 1.5px solid rgba(201, 169, 110, 0.45);
      border-radius: var(--radius-md);
      padding: 1rem 1.2rem;
      text-align: right;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    }

    .voucher-brand-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-bottom: 0.65rem;
      margin-bottom: 0.65rem;
      border-bottom: 1px solid rgba(201, 169, 110, 0.25);
    }

    .voucher-brand-avatar-box {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      padding: 1.5px;
      background: linear-gradient(135deg, #FBE6B3 0%, #C9A96E 50%, #96753C 100%);
      box-shadow: 0 2px 8px rgba(201, 169, 110, 0.4);
      flex-shrink: 0;
    }

    .voucher-avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      border: 1px solid #FFFFFF;
      transform: scale(1.05);
    }

    .voucher-brand-titles {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .voucher-brand-titles strong {
      font-size: 0.88rem;
      color: #FFFFFF;
    }

    .voucher-brand-titles small {
      font-size: 0.72rem;
      color: #DFC698;
    }

    .voucher-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .voucher-badge {
      font-size: 0.85rem;
      font-weight: 700;
      color: #DFC698;
    }

    .voucher-code-copy {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(11, 28, 21, 0.85);
      border: 1px dashed rgba(201, 169, 110, 0.5);
      padding: 0.3rem 0.8rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: background 0.2s;
    }
    .voucher-code-copy:hover { background: rgba(201, 169, 110, 0.2); }
    .v-code { font-size: 0.95rem; font-weight: 800; color: #DFC698; letter-spacing: 1px; }
    .copy-hint { font-size: 0.72rem; color: #A3B8B0; }

    .voucher-msg { font-size: 0.8rem; color: #E2EAE6; margin: 0 0 0.6rem; line-height: 1.45; }

    .free-gifts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.45rem;
    }

    .gift-mini-pill {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(82, 183, 136, 0.3);
      padding: 0.35rem 0.65rem;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      color: #52B788;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 600;
    }

    /* Order Card Box */
    .order-card-box {
      width: 100%;
      background: rgba(16, 40, 30, 0.85);
      border: 1px solid rgba(201, 169, 110, 0.35);
      border-radius: var(--radius-md);
      padding: 1.1rem;
      text-align: right;
    }

    .order-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      padding-bottom: 0.5rem;
      margin-bottom: 0.7rem;
    }

    .card-label { font-size: 0.82rem; color: #A3B8B0; }
    .card-ord-num { font-size: 1.15rem; color: #DFC698; letter-spacing: 0.04em; }

    .order-summary-grid { display: flex; flex-direction: column; gap: 0.45rem; }
    .sum-row { display: flex; justify-content: space-between; font-size: 0.82rem; }
    .sum-k { color: #A3B8B0; }
    .sum-v { color: #FFFFFF; font-weight: 600; }
    .sum-v.status-green { color: #52B788; }

    .success-actions {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      margin-top: 0.4rem;
    }

    .btn-open-wa-order {
      width: 100%;
      background: #25D366;
      color: #0B1C15;
      font-weight: 700;
      padding: 0.9rem;
      border-radius: var(--radius-full);
      font-size: 1rem;
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
      padding: 0.55rem;
      border-radius: var(--radius-full);
      cursor: pointer;
      font-size: 0.82rem;
      transition: color 0.2s;
    }
    .btn-close-clean:hover { color: #FFFFFF; }

    /* Modal Footers */
    .modal-footer {
      padding: 1.1rem 1.8rem;
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
      padding: 0.8rem 1.3rem;
      border-radius: var(--radius-full);
      font-size: 0.94rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
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
      padding: 0.8rem 1.1rem;
      border-radius: var(--radius-full);
      font-size: 0.88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-whatsapp-outline:hover { background: rgba(37, 211, 102, 0.2); }

    @media (max-width: 650px) {
      .info-banner { flex-direction: column; }
      .info-divider { display: none; }
      .guarantee-badges { grid-template-columns: 1fr; }
      .form-row-2, .form-row-3 { grid-template-columns: 1fr; }
      .free-gifts-grid { grid-template-columns: 1fr; }
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
  rewardsService = inject(RewardsService);

  currentStep: 'details' | 'form' | 'success' = 'details';
  cartService = inject(CartService);

  isSubmitting = false;
  formError = '';
  confirmedOrderNumber = '';
  showCopied = false;

  // Selected Template & Quantity in Modal
  selectedTemplate: ServiceTemplate | null = null;
  modalQty = 1;

  formData = {
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    degree: 'ماجستير',
    university: 'جامعة الملك سعود — الرياض',
    specialization: '',
    pageCount: 20,
    deadline: 'خلال أسبوع',
    notes: '',
    couponCode: ''
  };

  couponError = '';
  couponSuccess = '';
  appliedCoupon: any = null;
  originalPrice = 500;
  discountedPrice = 500;
  savings = 0;

  ngOnInit(): void {
    this.currentStep = 'details';
    this.setupServiceData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['service'] && this.service) {
      this.setupServiceData();
    }
  }

  setupServiceData(): void {
    this.modalQty = 1;
    if (this.service?.templates && this.service.templates.length > 0) {
      this.selectedTemplate = this.service.templates.find(t => t.isPopular) || this.service.templates[0];
      this.originalPrice = this.selectedTemplate.price;
      this.discountedPrice = this.originalPrice;
    } else {
      this.selectedTemplate = null;
      this.initPricingAndRewards();
    }
  }

  chooseTemplate(tpl: ServiceTemplate): void {
    this.selectedTemplate = tpl;
    this.originalPrice = tpl.price * this.modalQty;
    this.discountedPrice = this.originalPrice;
    this.audio.playClick();
  }

  updateModalQty(delta: number): void {
    this.modalQty = Math.max(1, this.modalQty + delta);
    if (this.selectedTemplate) {
      this.originalPrice = this.selectedTemplate.price * this.modalQty;
      this.discountedPrice = this.originalPrice;
    }
    this.audio.playClick();
  }

  addToCartFromModal(): void {
    if (!this.service) return;
    this.cartService.addToCart(this.service, this.selectedTemplate || undefined, this.modalQty);
    this.close();
  }

  initPricingAndRewards(): void {
    this.originalPrice = this.service?.priceFixed || this.service?.priceMin || 500;
    this.discountedPrice = this.originalPrice;

    const welcome = this.rewardsService.welcomeConfig();
    if (welcome.isEnabled && welcome.couponCode) {
      this.formData.couponCode = welcome.couponCode;
      this.applyCoupon(false);
    }
  }

  onPagesOrServiceChange(): void {
    const basePerPg = 25;
    const pages = Number(this.formData.pageCount) || 20;
    this.originalPrice = this.service?.priceMin ? Math.max(this.service.priceMin, pages * basePerPg) : (pages * basePerPg);
    if (this.appliedCoupon) {
      this.applyCoupon(false);
    } else {
      this.discountedPrice = this.originalPrice;
    }
  }

  activePerks(): any[] {
    return this.rewardsService.welcomeConfig().freePerks.filter(p => p.enabled);
  }

  setStep(step: 'details' | 'form'): void {
    this.audio.playClick();
    this.currentStep = step;
    if (step === 'form') {
      this.onPagesOrServiceChange();
    }
  }

  close(): void {
    this.audio.playClick();
    this.currentStep = 'details';
    this.closeEvent.emit();
  }

  orderViaWhatsAppDirect(): void {
    if (!this.service) return;
    this.audio.playClick();
    const url = this.cartService.generateSingleServiceWhatsAppUrl(
      this.service,
      this.selectedTemplate || undefined,
      this.modalQty
    );
    window.open(url, '_blank');
  }

  applyCoupon(playSound = true): void {
    const code = this.formData.couponCode;
    const res = this.rewardsService.calculateDiscount(this.originalPrice, code);

    if (res.appliedCoupon) {
      this.appliedCoupon = res.appliedCoupon;
      this.discountedPrice = res.discountedPrice;
      this.savings = res.savings;
      this.couponSuccess = `✓ تم تفعيل كود الخصم (${this.appliedCoupon.code}) بنجاح! وفرت ${this.savings} ر.س`;
      this.couponError = '';
      if (playSound) this.audio.playSuccess();
    } else {
      this.appliedCoupon = null;
      this.discountedPrice = this.originalPrice;
      this.savings = 0;
      this.couponSuccess = '';
      if (code && code.trim()) {
        this.couponError = 'كود الخصم غير صالح أو منتهي الصلاحية';
        if (playSound) this.audio.playClick();
      }
    }
  }

  copyCouponCode(): void {
    const code = this.appliedCoupon ? this.appliedCoupon.code : this.rewardsService.welcomeConfig().couponCode;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      this.showCopied = true;
      setTimeout(() => this.showCopied = false, 2500);
      this.audio.playClick();
    }
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
      clientEmail: this.formData.clientEmail.trim() || null,
      university: this.formData.university,
      degree: this.formData.degree,
      specialization: this.formData.specialization.trim(),
      pageCount: Number(this.formData.pageCount) || 20,
      deadline: this.formData.deadline.trim(),
      description: this.formData.notes.trim() || `طلب خدمة ${this.service?.nameAr} - ${this.formData.degree}`,
      price: this.discountedPrice || this.originalPrice,
      additionalDetails: JSON.stringify({
        orderNumber: this.confirmedOrderNumber,
        originalPrice: this.originalPrice,
        discountedPrice: this.discountedPrice,
        appliedCoupon: this.appliedCoupon?.code || null,
        savings: this.savings,
        clientEmail: this.formData.clientEmail,
        degree: this.formData.degree,
        deadlineText: this.formData.deadline
      })
    };

    this.api.submitServiceRequest(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.currentStep = 'success';
        this.audio.playSuccess();
        try {
          confetti({
            particleCount: 75,
            spread: 65,
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

    const phone = '966572651058';
    const lines = [
      'السلام عليكم ورحمة الله وبركاته 🌸',
      '*طلب خدمة جديد — منصة أم رهام الأكاديمية*',
      '━━━━━━━━━━━━━━━━━━━━',
      `📋 *كود المتابعة:* \`${this.confirmedOrderNumber}\``,
      '━━━━━━━━━━━━━━━━━━━━',
      `👤 *اسم العميل:* ${this.formData.clientName}`,
      `📱 *رقم الجوال:* ${this.formData.clientPhone || 'مسجل بالمنصة'}`,
      `🏛️ *الجامعة / الجهة:* ${this.formData.university || 'جامعة سعودية'}`,
      `🎓 *الدرجة والتخصص:* ${this.formData.degree} - ${this.formData.specialization || 'عام'}`,
      `📌 *الخدمة المطلوبة:* ${this.service.nameAr}`,
      `📄 *الصفحات التقديرية:* ${this.formData.pageCount} صفحة`,
      `⏰ *الموعد المطلوب:* ${this.formData.deadline || 'خلال أسبوع'}`,
      this.appliedCoupon ? `🎁 *كود الخصم المطبق:* ${this.appliedCoupon.code} (وفرت ${this.savings} ر.س)` : '',
      `💰 *التكلفة التقديرية:* ${this.discountedPrice} ر.س`,
      this.formData.notes ? `\n📝 *تفاصيل ومتطلبات الطلب:*\n${this.formData.notes}` : '',
      '',
      '━━━━━━━━━━━━━━━━━━━━',
      '✨ *المزايا المرفقة مجاناً:* تقرير Turnitin 0% + تدقيق لغوي + تنسيق APA 7th معتمد.',
      '🛡️ *الضمان الذهبي:* الدفع بعد الإنجاز والاستلام المعتمد 100%',
      '🌸 *أرجو مراجعة الطلب والبدء بالتنفيذ، شكراً لكم!*'
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }
}
