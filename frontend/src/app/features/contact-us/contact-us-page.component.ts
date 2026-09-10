import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AudioService } from '../../core/services/audio.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact-us-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="contact-us-wrapper bg-ivory-warm" dir="rtl">
      <div class="container section-padding">
        
        <!-- Header & Gold Badge -->
        <div class="section-badge-center">
          <span class="badge-gold">✨ قنوات الدعم والاستشارات المباشرة</span>
          <h1 class="page-title">
            تواصل مع <span class="green-gradient-text">فريق أم رهام</span>
          </h1>
          <p class="page-desc">
            يسعدنا استقبال استفساراتكم والرد على كافة تساؤلاتكم الأكاديمية والبحثية، وتزويدكم بالاستشارات التخصصية على مدار الساعة.
          </p>
        </div>

        <!-- Quick Channels 4 Cards Grid -->
        <div class="channels-grid">
          
          <!-- Card 1: WhatsApp -->
          <div class="channel-card">
            <div class="channel-icon-circle whatsapp-bg">
              <span>💬</span>
            </div>
            <div class="channel-content">
              <span class="channel-badge green">رد فوري خلال دقائق</span>
              <h3>المحادثة الفورية عبر واتساب</h3>
              <p>تواصل المباشر مع المستشار الأكاديمي لمناقشة فكرتك وتفاصيل العمل لحظياً.</p>
              <strong class="channel-contact-val" dir="ltr">+966 57 265 1058</strong>
            </div>
            <a [href]="getWhatsAppLink()" target="_blank" class="btn-channel-action btn-wa" (click)="onActionClick()">
              <span>بدء محادثة واتساب ←</span>
            </a>
          </div>

          <!-- Card 2: Phone Call -->
          <div class="channel-card">
            <div class="channel-icon-circle phone-bg">
              <span>📞</span>
            </div>
            <div class="channel-content">
              <span class="channel-badge gold">متاح يومياً</span>
              <h3>الاتصال الهاتفي المباشر</h3>
              <p>للاستفسارات العاجلة، الاستشارات الخاصة، ومتابعة المشاريع الكبرى.</p>
              <strong class="channel-contact-val" dir="ltr">+966 57 265 1058</strong>
            </div>
            <a href="tel:+966572651058" class="btn-channel-action btn-phone" (click)="onActionClick()">
              <span>اتصال هاتفي مباشر ←</span>
            </a>
          </div>

          <!-- Card 3: Email -->
          <div class="channel-card">
            <div class="channel-icon-circle email-bg">
              <span>✉️</span>
            </div>
            <div class="channel-content">
              <span class="channel-badge blue">خطابات ومسودات</span>
              <h3>البريد الإلكتروني الرسمي</h3>
              <p>لاستقبال الخطابات الرسمية، العقود، وملفات الأبحاث والمسودات الكبيرة.</p>
              <strong class="channel-contact-val email-text" dir="ltr">support&#64;ummreham.com</strong>
            </div>
            <a href="mailto:support@ummreham.com?subject=استفسار منصة أم رهام" class="btn-channel-action btn-email" (click)="onActionClick()">
              <span>مراسلة عبر البريد ←</span>
            </a>
          </div>

          <!-- Card 4: Location & Coverage -->
          <div class="channel-card">
            <div class="channel-icon-circle loc-bg">
              <span>📍</span>
            </div>
            <div class="channel-content">
              <span class="channel-badge emerald">🇸🇦 تغطية شاملة</span>
              <h3>المقر ونطاق التغطية</h3>
              <p>الرياض، المملكة العربية السعودية. نخدم جميع جامعات ومدارس المملكة ودول الخليج والمبتعثين.</p>
              <strong class="channel-contact-val">خدمة سريعة لكافة المناطق</strong>
            </div>
            <a routerLink="/about" class="btn-channel-action btn-outline" (click)="onActionClick()">
              <span>تعرف على منظومتنا ←</span>
            </a>
          </div>

        </div>

        <!-- Main Interaction Section: Contact Form + Service Order Transition -->
        <div class="contact-interaction-grid">
          
          <!-- Right: Interactive Message & Inquiry Form -->
          <div class="contact-form-panel">
            <div class="form-header">
              <div class="form-header-badge">📩 نموذج تواصل سريع</div>
              <h2>أرسل رسالتك أو استفسارك</h2>
              <p>املأ النموذج أدناه، وسيتواصل معك مستشارنا الأكاديمي المختص في أقرب وقت.</p>
            </div>

            <!-- Success message -->
            <div *ngIf="messageSent" class="form-success-banner animate-fade-in">
              <div class="success-icon">🎉</div>
              <div>
                <strong>شكراً لتواصلك معنا!</strong>
                <p>تم استلام استفسارك بنجاح، وسيقوم فريقنا بالتواصل معك عبر الواتساب أو البريد الإلكتروني فوراً.</p>
              </div>
              <a [href]="getWhatsAppMessageLink()" target="_blank" class="btn-wa-followup">
                <span>💬 متابعة فورية على واتساب الآن</span>
              </a>
            </div>

            <!-- Form -->
            <form *ngIf="!messageSent" (ngSubmit)="submitMessage()" class="inquiry-form">
              <div class="form-row two-cols">
                <div class="form-group">
                  <label>الاسم الكريم <span class="req">*</span></label>
                  <input 
                    type="text" 
                    [(ngModel)]="formModel.name" 
                    name="name" 
                    required 
                    placeholder="مثال: د. فهد العتيبي" 
                    class="luxury-input" />
                </div>
                <div class="form-group">
                  <label>رقم الجوال / واتساب <span class="req">*</span></label>
                  <input 
                    type="tel" 
                    [(ngModel)]="formModel.phone" 
                    name="phone" 
                    required 
                    placeholder="05XXXXXXXX" 
                    dir="ltr" 
                    class="luxury-input" />
                </div>
              </div>

              <div class="form-row two-cols">
                <div class="form-group">
                  <label>البريد الإلكتروني (اختياري)</label>
                  <input 
                    type="email" 
                    [(ngModel)]="formModel.email" 
                    name="email" 
                    placeholder="name@example.com" 
                    dir="ltr" 
                    class="luxury-input" />
                </div>
                <div class="form-group">
                  <label>موضوع التواصل <span class="req">*</span></label>
                  <select [(ngModel)]="formModel.subject" name="subject" class="luxury-input luxury-select">
                    <option value="استفسار عن خدمة أكاديمية">استفسار عن خدمة أكاديمية</option>
                    <option value="استشارة بحثية خاصة">استشارة بحثية خاصة</option>
                    <option value="متابعة أو استفسار عام">متابعة أو استفسار عام</option>
                    <option value="اقتراح أو ملاحظة">اقتراح أو ملاحظة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label>نص الرسالة أو الاستفسار <span class="req">*</span></label>
                <textarea 
                  [(ngModel)]="formModel.message" 
                  name="message" 
                  required 
                  rows="4" 
                  placeholder="اكتب تفاصيل استفسارك أو طلبك هنا..." 
                  class="luxury-input textarea"></textarea>
              </div>

              <div class="form-submit-row">
                <button type="submit" [disabled]="isSubmitting || !formModel.name || !formModel.phone || !formModel.message" class="btn-send-message">
                  <span *ngIf="!isSubmitting">إرسال الرسالة الآن ✉️</span>
                  <span *ngIf="isSubmitting">جاري الإرسال... ⏳</span>
                </button>
                <span class="privacy-notice">🔒 نضمن سرية بياناتك التامة وفق ميثاق الأمان NDA.</span>
              </div>
            </form>
          </div>

          <!-- Left: Service Request & Order Banner (Direct Link to Order Page) -->
          <div class="order-redirect-card">
            <div class="orc-badge">✨ هل ترغب في طلب خدمة فوراً؟</div>
            <h3>جاهز لبدء مشروعك أو بحثك الأكاديمي؟</h3>
            <p>
              إذا كنت تود تسجيل طلبك مباشرة والحصول على كود تتبع حصري وخصم المنصة الفوري ومتابعة مراحل الإنجاز:
            </p>

            <ul class="orc-features">
              <li><span>✓</span> كود تتبع رقمي خاص بكل طلب</li>
              <li><span>✓</span> خصم فوري ومباشر على الخدمة</li>
              <li><span>✓</span> إمكانية رفع الملفات والشروط الجامعية</li>
              <li><span>✓</span> ضمان الدفع بعد المعاينة ورضاك 100%</li>
            </ul>

            <a routerLink="/order" class="btn-go-to-order" (click)="onActionClick()">
              <span>انتقل إلى بوابة «طلب خدمة» ✍️</span>
            </a>

            <!-- Working Hours Box -->
            <div class="hours-micro-box">
              <div class="hm-item">
                <span class="hm-icon">🕒</span>
                <div>
                  <strong>ساعات العمل:</strong>
                  <span>24 ساعة / 7 أيام أسبوعياً</span>
                </div>
              </div>
              <div class="hm-item">
                <span class="hm-icon">⚡</span>
                <div>
                  <strong>سرعة الاستجابة:</strong>
                  <span>خلال دقائق عبر واتساب</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  `,
  styles: [`
    .contact-us-wrapper {
      min-height: 100vh;
      padding-top: 5rem;
      background: #FAF8F5;
    }

    .page-title {
      font-size: clamp(2rem, 4vw, 3.2rem);
      color: #0A2F24;
      margin: 0.8rem 0;
      font-weight: 900;
    }

    .page-desc {
      color: #485A53;
      font-size: 1.1rem;
      line-height: 1.8;
      max-width: 780px;
      margin: 0 auto;
    }

    /* 4 Channels Grid */
    .channels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
      margin: 3.5rem 0;
    }

    .channel-card {
      background: #FFFFFF;
      border-radius: 20px;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      padding: 2rem 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 10px 25px rgba(10, 47, 36, 0.04);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .channel-card:hover {
      transform: translateY(-6px);
      border-color: #C5A869;
      box-shadow: 0 18px 40px rgba(10, 47, 36, 0.08);
    }

    .channel-icon-circle {
      width: 58px;
      height: 58px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin-bottom: 1.3rem;
    }

    .whatsapp-bg { background: rgba(37, 211, 102, 0.12); border: 1px solid rgba(37, 211, 102, 0.25); }
    .phone-bg { background: rgba(197, 168, 105, 0.14); border: 1px solid rgba(197, 168, 105, 0.35); }
    .email-bg { background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.25); }
    .loc-bg { background: rgba(10, 47, 36, 0.1); border: 1px solid rgba(10, 47, 36, 0.2); }

    .channel-badge {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 9999px;
      margin-bottom: 0.6rem;
    }

    .channel-badge.green { background: rgba(37, 211, 102, 0.15); color: #059669; }
    .channel-badge.gold { background: rgba(197, 168, 105, 0.15); color: #9B7E3E; }
    .channel-badge.blue { background: rgba(59, 130, 246, 0.12); color: #2563EB; }
    .channel-badge.emerald { background: rgba(10, 47, 36, 0.12); color: #0A2F24; }

    .channel-content h3 {
      font-size: 1.15rem;
      color: #0A2F24;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    .channel-content p {
      color: #556B62;
      font-size: 0.88rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .channel-contact-val {
      display: block;
      font-size: 1.05rem;
      font-weight: 800;
      color: #0A2F24;
      margin-bottom: 1.4rem;
      font-family: var(--font-family-latin, sans-serif);
    }

    .email-text {
      font-size: 0.95rem;
      color: #0F5132;
    }

    .btn-channel-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0.75rem 1.2rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .btn-wa { background: #25D366; color: #FFFFFF; }
    .btn-wa:hover { background: #1EBE5D; transform: translateY(-2px); }

    .btn-phone { background: #0A2F24; color: #FFFFFF; }
    .btn-phone:hover { background: #134B3B; transform: translateY(-2px); }

    .btn-email { background: #F4EFE6; color: #0A2F24; border: 1px solid rgba(197, 168, 105, 0.4); }
    .btn-email:hover { background: #EFE8DC; color: #0A2F24; }

    .btn-outline { background: #FFFFFF; color: #0A2F24; border: 1.5px solid rgba(15, 81, 50, 0.2); }
    .btn-outline:hover { border-color: #C5A869; color: #9B7E3E; }

    /* Interaction Grid */
    .contact-interaction-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 2.2rem;
      margin-top: 2rem;
      margin-bottom: 4rem;
    }

    @media (max-width: 992px) {
      .contact-interaction-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Form Panel */
    .contact-form-panel {
      background: #FFFFFF;
      border-radius: 24px;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      padding: 2.5rem;
      box-shadow: 0 12px 30px rgba(10, 47, 36, 0.05);
    }

    .form-header-badge {
      display: inline-block;
      font-size: 0.8rem;
      color: #9B7E3E;
      background: rgba(197, 168, 105, 0.14);
      border: 1px solid rgba(197, 168, 105, 0.35);
      padding: 4px 12px;
      border-radius: 9999px;
      font-weight: 700;
      margin-bottom: 0.6rem;
    }

    .form-header h2 {
      font-size: 1.6rem;
      color: #0A2F24;
      font-weight: 800;
      margin-bottom: 0.4rem;
    }

    .form-header p {
      color: #556B62;
      font-size: 0.95rem;
      margin-bottom: 1.8rem;
    }

    .form-row.two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
      margin-bottom: 1.2rem;
    }

    @media (max-width: 600px) {
      .form-row.two-cols {
        grid-template-columns: 1fr;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.2rem;
    }

    .form-group label {
      font-size: 0.88rem;
      font-weight: 700;
      color: #0A2F24;
      margin-bottom: 0.45rem;
    }

    .req { color: #E53E3E; }

    .luxury-input {
      padding: 0.8rem 1.1rem;
      border-radius: 12px;
      border: 1.5px solid rgba(15, 81, 50, 0.18);
      background: #FCFBF9;
      font-size: 0.95rem;
      color: #1A3026;
      font-family: inherit;
      transition: all 0.2s ease;
      outline: none;
    }

    .luxury-input:focus {
      background: #FFFFFF;
      border-color: #0F5132;
      box-shadow: 0 0 0 3px rgba(15, 81, 50, 0.1);
    }

    .luxury-select {
      cursor: pointer;
    }

    .textarea {
      resize: vertical;
      min-height: 110px;
    }

    .form-submit-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .btn-send-message {
      background: linear-gradient(135deg, #0F5132 0%, #0A2F24 100%);
      color: #FFFFFF;
      border: none;
      padding: 0.9rem 2rem;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 4px 15px rgba(15, 81, 50, 0.25);
    }

    .btn-send-message:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(15, 81, 50, 0.35);
    }

    .btn-send-message:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .privacy-notice {
      font-size: 0.78rem;
      color: #6A7E75;
    }

    /* Success banner */
    .form-success-banner {
      background: #F0FDF4;
      border: 1.5px solid rgba(37, 211, 102, 0.4);
      border-radius: 16px;
      padding: 1.8rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .success-icon { font-size: 2.5rem; }
    .form-success-banner strong { font-size: 1.2rem; color: #065F46; }
    .form-success-banner p { color: #047857; font-size: 0.92rem; }

    .btn-wa-followup {
      background: #25D366;
      color: #FFFFFF;
      text-decoration: none;
      padding: 0.7rem 1.4rem;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.92rem;
      display: inline-block;
    }

    /* Order Redirect Card */
    .order-redirect-card {
      background: linear-gradient(135deg, #0A2F24 0%, #061F17 100%);
      border-radius: 24px;
      border: 1.5px solid rgba(197, 168, 105, 0.4);
      padding: 2.5rem;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 15px 35px rgba(10, 47, 36, 0.2);
    }

    .orc-badge {
      font-size: 0.8rem;
      color: #DFC698;
      font-weight: 700;
      margin-bottom: 0.8rem;
    }

    .order-redirect-card h3 {
      font-size: 1.5rem;
      color: #FFFFFF;
      font-weight: 900;
      margin-bottom: 0.8rem;
      line-height: 1.35;
    }

    .order-redirect-card p {
      color: #C0D6CD;
      font-size: 0.92rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .orc-features {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }

    .orc-features li {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.88rem;
      color: #E2ECE7;
    }

    .orc-features li span {
      color: #25D366;
      font-weight: 900;
    }

    .btn-go-to-order {
      background: linear-gradient(135deg, #C5A869 0%, #A98745 100%);
      color: #0A2F24;
      text-decoration: none;
      padding: 1rem 1.8rem;
      border-radius: 14px;
      font-size: 1rem;
      font-weight: 900;
      text-align: center;
      display: block;
      transition: all 0.25s ease;
      box-shadow: 0 6px 20px rgba(197, 168, 105, 0.35);
      margin-bottom: 2rem;
    }

    .btn-go-to-order:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(197, 168, 105, 0.5);
    }

    .hours-micro-box {
      border-top: 1px solid rgba(197, 168, 105, 0.25);
      padding-top: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .hm-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .hm-icon { font-size: 1.2rem; }

    .hm-item strong {
      display: block;
      font-size: 0.82rem;
      color: #DFC698;
    }

    .hm-item span {
      font-size: 0.8rem;
      color: #A3BDB1;
    }
  `]
})
export class ContactUsPageComponent {
  private audio = inject(AudioService);
  private api = inject(ApiService);

  formModel = {
    name: '',
    phone: '',
    email: '',
    subject: 'استفسار عن خدمة أكاديمية',
    message: ''
  };

  isSubmitting = false;
  messageSent = false;

  getWhatsAppLink(): string {
    const text = encodeURIComponent('السلام عليكم أم رهام 🌟\nأرغب بالتواصل المباشر والاستفسار عن خدمات المنصة.');
    return `https://wa.me/966572651058?text=${text}`;
  }

  getWhatsAppMessageLink(): string {
    const text = encodeURIComponent(
      `السلام عليكم ورحمة الله 🌟\nأنا: ${this.formModel.name}\nالموضوع: ${this.formModel.subject}\nرسالتي: ${this.formModel.message}`
    );
    return `https://wa.me/966572651058?text=${text}`;
  }

  onActionClick(): void {
    this.audio.playClick();
  }

  submitMessage(): void {
    if (!this.formModel.name || !this.formModel.phone || !this.formModel.message) return;
    this.isSubmitting = true;
    this.audio.playClick();

    setTimeout(() => {
      this.isSubmitting = false;
      this.messageSent = true;
      this.audio.playNotification();
    }, 600);
  }
}
