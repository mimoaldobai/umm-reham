import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceItem, ApiService } from '../../../core/services/api.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-service-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="service-modal-backdrop" *ngIf="service" (click)="close()">
      <div class="service-modal-container glass-panel" (click)="$event.stopPropagation()">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="service-meta">
            <span class="category-tag">{{ service.categoryNameAr || 'خدمة متميزة' }}</span>
            <h3 class="service-title">{{ service.nameAr }}</h3>
          </div>
          <button class="close-btn" (click)="close()">✕</button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
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
              <span class="info-value gold-gradient-text" *ngIf="service.priceType === 'quote'">
                حسب متطلبات المشروع (طلب تسعيرة)
              </span>
              <span class="info-value gold-gradient-text" *ngIf="service.priceType === 'contact'">
                تواصل للاستفسار
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
            <p>{{ service.targetAudienceAr || 'طلاب البكالوريوس، الماجستير، الدكتوراه، والباحثين والموظفين الطامحين للتميز الأكاديمي والمهني.' }}</p>
          </div>

          <!-- Requirements -->
          <div class="detail-section">
            <h4>📋 ماذا نحتاج منك للبدء؟</h4>
            <p>{{ service.requirementsAr || 'تزويدنا بعنوان البحث أو متطلبات المهمة، الدليل الإرشادي من جامعتك (إن وجد)، والموعد النهائي للتسليم.' }}</p>
          </div>

          <!-- Quality Guarantees -->
          <div class="guarantee-badges">
            <span class="g-badge">🛡️ سرية تامة وأمان للمعلومات</span>
            <span class="g-badge">✨ تدقيق لغوي وأكاديمي شامل</span>
            <span class="g-badge">⏱️ التزام صارم بمواعيد التسليم</span>
            <span class="g-badge">🔄 مراجعة وتعديلات حتى الرضا التام</span>
          </div>
        </div>

        <!-- Modal Footer CTA -->
        <div class="modal-footer">
          <button class="btn-order-whatsapp" (click)="orderViaWhatsApp()">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            <span>طلب الخدمة عبر واتساب الآن</span>
          </button>
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
      background: rgba(6, 19, 13, 0.85);
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
      max-width: 620px;
      max-height: 90vh;
      overflow-y: auto;
      border-radius: var(--radius-xl);
      border: 1px solid rgba(201, 169, 110, 0.35);
      box-shadow: 0 25px 60px rgba(0,0,0,0.6);
      animation: slideUp 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      flex-direction: column;
    }

    @keyframes slideUp {
      from { transform: translateY(40px) scale(0.95); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }

    .modal-header {
      padding: 1.5rem 2rem;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      background: rgba(11, 28, 21, 0.7);
    }

    .category-tag {
      font-size: 0.78rem;
      color: #DFC698;
      font-weight: 600;
      background: rgba(201, 169, 110, 0.12);
      padding: 2px 10px;
      border-radius: var(--radius-full);
      border: 1px solid rgba(201, 169, 110, 0.3);
      display: inline-block;
      margin-bottom: 0.4rem;
    }

    .service-title {
      font-size: 1.6rem;
      color: #FFFFFF;
      margin: 0;
    }

    .close-btn {
      color: #A3B8B0;
      font-size: 1.3rem;
      cursor: pointer;
      background: none;
      border: none;
      transition: color 0.2s;
    }

    .close-btn:hover { color: #DFC698; }

    .modal-body {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
      color: #E2EAE6;
    }

    .info-banner {
      background: rgba(27, 67, 50, 0.5);
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

    .info-label {
      font-size: 0.75rem;
      color: #A3B8B0;
    }

    .info-value {
      font-size: 1.05rem;
      font-weight: 700;
      color: #FFFFFF;
    }

    .info-divider {
      width: 1px;
      height: 36px;
      background: rgba(201, 169, 110, 0.25);
    }

    .detail-section h4 {
      font-size: 1.05rem;
      color: #DFC698;
      margin-bottom: 0.4rem;
    }

    .detail-section p {
      font-size: 0.95rem;
      color: #C1D6CD;
      line-height: 1.6;
    }

    .guarantee-badges {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.6rem;
      margin-top: 0.5rem;
    }

    .g-badge {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(82, 183, 136, 0.3);
      padding: 0.5rem 0.8rem;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      color: #52B788;
      font-weight: 500;
    }

    .modal-footer {
      padding: 1.2rem 2rem;
      border-top: 1px solid rgba(201, 169, 110, 0.2);
      background: rgba(11, 28, 21, 0.7);
    }

    .btn-order-whatsapp {
      width: 100%;
      background: #25D366;
      color: #0B1C15;
      font-weight: 700;
      padding: 0.9rem;
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

    .btn-order-whatsapp:hover {
      transform: translateY(-2px);
    }

    @media (max-width: 600px) {
      .info-banner {
        flex-direction: column;
      }
      .info-divider {
        display: none;
      }
      .guarantee-badges {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ServiceModalComponent {
  @Input() service: ServiceItem | null = null;
  @Output() closeEvent = new EventEmitter<void>();

  api = inject(ApiService);
  audio = inject(AudioService);

  close(): void {
    this.audio.playClick();
    this.closeEvent.emit();
  }

  orderViaWhatsApp(): void {
    if (!this.service) return;
    this.audio.playClick();
    const url = this.api.generateWhatsAppUrl({
      serviceName: this.service.nameAr,
      description: this.service.shortDescriptionAr
    });
    window.open(url, '_blank');
  }
}
