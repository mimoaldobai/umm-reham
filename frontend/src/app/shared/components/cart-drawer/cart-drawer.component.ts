import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Cart Backdrop -->
    <div class="cart-backdrop" *ngIf="cart.isCartOpen()" (click)="cart.closeCart()"></div>

    <!-- Cart Drawer Panel -->
    <aside class="cart-drawer-panel" [class.open]="cart.isCartOpen()" dir="rtl">
      
      <!-- Drawer Header -->
      <div class="cart-drawer-header">
        <div class="cart-title-wrap">
          <div class="cart-icon-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <div>
            <h3 class="cart-title">سلة طلباتك الأكاديمية</h3>
            <span class="cart-subtitle">{{ cart.totalCount() }} خدمة ونموذج مختار</span>
          </div>
        </div>
        <button class="cart-close-btn" (click)="cart.closeCart()" title="إغلاق السلة">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Trust & Payment Banner -->
      <div class="cart-guarantee-banner">
        <span class="shield-icon">🛡️</span>
        <div>
          <strong>ضمان منصة أم رهام:</strong>
          <span>الدفع بعد الإنجاز والاستلام المعتمد 100%</span>
        </div>
      </div>

      <!-- Cart Items List (Scrollable) -->
      <div class="cart-items-scrollable">
        
        <!-- Empty State -->
        <div class="cart-empty-state" *ngIf="cart.cartItems().length === 0">
          <div class="empty-icon-circle">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1.5"></circle>
              <circle cx="20" cy="21" r="1.5"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h4>سلتك خالية حالياً</h4>
          <p>تصفح متجر الخدمات واختر النماذج والخدمات التي ترغب بإنجازها.</p>
          <a routerLink="/services" class="btn-browse-store" (click)="cart.closeCart()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>تصفح المتجر والخدمات الآن</span>
            <span>←</span>
          </a>
        </div>

        <!-- Populated State -->
        <div class="cart-item-card" *ngFor="let item of cart.cartItems()">
          <div class="item-head">
            <div class="item-meta">
              <span class="item-cat-badge" *ngIf="item.categoryName">{{ item.categoryName }}</span>
              <h4 class="item-title">{{ item.serviceName }}</h4>
            </div>
            <button class="btn-remove-item" (click)="cart.removeFromCart(item.id)" title="حذف من السلة">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>

          <!-- Template Details if present -->
          <div class="item-template-tag" *ngIf="item.template">
            <span class="tpl-code">{{ item.template.code }}</span>
            <span class="tpl-name">{{ item.template.nameAr }}</span>
          </div>

          <!-- Price & Quantity Row -->
          <div class="item-bottom-row">
            <div class="item-price-col">
              <div *ngIf="!item.isQuote" class="price-val">
                <strong>{{ item.unitPrice * item.quantity }} ر.س</strong>
                <small *ngIf="item.quantity > 1">({{ item.unitPrice }} × {{ item.quantity }})</small>
              </div>
              <div *ngIf="item.isQuote" class="quote-val">
                <span>طلب تسعيرة</span>
                <small>حسب متطلباتك</small>
              </div>
            </div>

            <!-- Quantity Stepper -->
            <div class="qty-stepper">
              <button type="button" class="btn-qty" (click)="cart.updateQuantity(item.id, -1)" title="تقليل">−</button>
              <span class="qty-display">{{ item.quantity }}</span>
              <button type="button" class="btn-qty" (click)="cart.updateQuantity(item.id, 1)" title="زيادة">+</button>
            </div>
          </div>
        </div>

      </div>

      <!-- Drawer Footer -->
      <div class="cart-drawer-footer" *ngIf="cart.cartItems().length > 0">
        
        <!-- Summary Rows -->
        <div class="cart-summary-box">
          <div class="summary-line">
            <span>عدد الخدمات المختارة:</span>
            <strong>{{ cart.totalCount() }} عنصر</strong>
          </div>
          <div class="summary-line total" *ngIf="cart.totalPrice() > 0">
            <span>المجموع التقديري:</span>
            <strong class="gold-gradient-text">{{ cart.totalPrice() }} ر.س</strong>
          </div>
          <div class="summary-line quote-note" *ngIf="cart.hasQuoteItems()">
            <span>📌 يتضمن خدمات تتحدد تسعيرتها حسب متطلباتك</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="cart-action-buttons">
          <!-- WhatsApp Order Button -->
          <a [href]="cart.generateCartWhatsAppUrl()" 
             target="_blank" 
             class="btn-checkout-whatsapp" 
             [class.bounce-now]="cart.whatsappBouncing()"
             (click)="onWhatsAppCheckout()">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            <span>إرسال الطلب عبر واتساب (الدفع بعد الإنجاز)</span>
          </a>

          <!-- Clear Cart button -->
          <button type="button" class="btn-clear-cart" (click)="cart.clearCart()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>تفريغ السلة</span>
          </button>
        </div>

      </div>

    </aside>
  `,
  styles: [`
    .cart-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(10, 47, 36, 0.5);
      backdrop-filter: blur(6px);
      z-index: 1100;
      animation: fadeIn 0.25s ease;
    }

    .cart-drawer-panel {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      max-width: 440px;
      background: #FFFFFF;
      z-index: 1200;
      box-shadow: 10px 0 40px rgba(10, 47, 36, 0.25);
      display: flex;
      flex-direction: column;
      transform: translateX(-100%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: var(--font-family-arabic);
    }

    .cart-drawer-panel.open {
      transform: translateX(0);
    }

    /* Header */
    .cart-drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.4rem;
      border-bottom: 1.5px solid #F1ECE1;
      background: #FAF7F2;
    }

    .cart-title-wrap {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .cart-icon-badge {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, #1B4332 0%, #0D251A 100%);
      color: #DFC698;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(27, 67, 50, 0.2);
    }

    .cart-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #0D251A;
      margin: 0;
    }

    .cart-subtitle {
      font-size: 0.78rem;
      color: #64748B;
      font-weight: 500;
    }

    .cart-close-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #E2D9C8;
      background: #FFFFFF;
      color: #485A53;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .cart-close-btn:hover {
      background: #F87171;
      color: #FFFFFF;
      border-color: #F87171;
    }

    /* Guarantee Banner */
    .cart-guarantee-banner {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      background: #ECFDF5;
      border-bottom: 1px solid #A7F3D0;
      padding: 0.75rem 1.4rem;
      font-size: 0.82rem;
      color: #065F46;
    }

    .cart-guarantee-banner strong {
      display: block;
      font-weight: 700;
    }

    .cart-guarantee-banner span {
      font-size: 0.76rem;
      color: #047857;
    }

    /* Scrollable Items */
    .cart-items-scrollable {
      flex: 1;
      overflow-y: auto;
      padding: 1.25rem 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      -webkit-overflow-scrolling: touch;
    }

    /* Empty State */
    .cart-empty-state {
      text-align: center;
      padding: 3rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .empty-icon-circle {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(197, 168, 105, 0.15);
      border: 1.5px solid rgba(197, 168, 105, 0.35);
      color: #C5A869;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5rem;
    }

    .cart-empty-state h4 {
      font-size: 1.2rem;
      font-weight: 800;
      color: #1E293B;
      margin: 0;
    }

    .cart-empty-state p {
      font-size: 0.88rem;
      color: #64748B;
      line-height: 1.6;
      max-width: 280px;
    }

    .btn-browse-store {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, #1B4332 0%, #0D251A 100%);
      color: #FFFFFF;
      font-size: 0.88rem;
      font-weight: 700;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.2);
      transition: all 0.25s;
    }

    .btn-browse-store:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(27, 67, 50, 0.3);
    }

    /* Item Card */
    .cart-item-card {
      background: #FAF7F2;
      border: 1.5px solid #EBE5D8;
      border-radius: 12px;
      padding: 1rem 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: all 0.2s;
    }

    .cart-item-card:hover {
      border-color: #C5A869;
      box-shadow: 0 4px 14px rgba(10, 47, 36, 0.06);
    }

    .item-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .item-cat-badge {
      font-size: 0.7rem;
      background: rgba(197, 168, 105, 0.2);
      color: #8C6D2D;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      font-weight: 700;
      display: inline-block;
      margin-bottom: 0.3rem;
    }

    .item-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: #0F281C;
      margin: 0;
      line-height: 1.4;
    }

    .btn-remove-item {
      background: transparent;
      border: 1px solid transparent;
      color: #94A3B8;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .btn-remove-item:hover {
      color: #EF4444;
      background: #FEE2E2;
    }

    .item-template-tag {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      background: #FFFFFF;
      border: 1px dashed #C5A869;
      border-radius: 6px;
      padding: 0.35rem 0.6rem;
      font-size: 0.78rem;
    }

    .tpl-code {
      background: #1B4332;
      color: #DFC698;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 800;
      font-size: 0.72rem;
    }

    .tpl-name {
      color: #2D3748;
      font-weight: 600;
    }

    .item-bottom-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 0.45rem;
      border-top: 1px solid #EAE3D5;
    }

    .item-price-col strong {
      font-size: 1.05rem;
      color: #1B4332;
      font-weight: 800;
    }

    .item-price-col small {
      display: block;
      font-size: 0.7rem;
      color: #64748B;
    }

    .quote-val span {
      font-size: 0.85rem;
      font-weight: 700;
      color: #C5A869;
    }

    .quote-val small {
      display: block;
      font-size: 0.68rem;
      color: #64748B;
    }

    /* Qty Stepper */
    .qty-stepper {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: #FFFFFF;
      border: 1.5px solid #D5CCBC;
      border-radius: var(--radius-full);
      padding: 2px 6px;
    }

    .btn-qty {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: none;
      background: #F1ECE1;
      color: #1B4332;
      font-size: 1rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-qty:hover {
      background: #1B4332;
      color: #FFFFFF;
    }

    .qty-display {
      min-width: 22px;
      text-align: center;
      font-weight: 800;
      font-size: 0.9rem;
      color: #0F281C;
    }

    /* Footer */
    .cart-drawer-footer {
      border-top: 1.5px solid #F1ECE1;
      padding: 1.25rem 1.4rem;
      background: #FAF7F2;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-summary-box {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .summary-line {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: #52665C;
    }

    .summary-line.total {
      font-size: 1.15rem;
      font-weight: 800;
      color: #0F281C;
      padding-top: 0.4rem;
      border-top: 1px dashed #D5CCBC;
    }

    .quote-note {
      font-size: 0.75rem;
      color: #B45309;
      font-weight: 600;
    }

    .cart-action-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    /* Bouncing WhatsApp CTA */
    .btn-checkout-whatsapp {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      padding: 0.88rem 1.2rem;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
      color: #FFFFFF;
      font-size: 0.92rem;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
    }

    .btn-checkout-whatsapp:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 211, 102, 0.45);
    }

    .btn-checkout-whatsapp.bounce-now {
      animation: checkoutBounce 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) 3;
    }

    @keyframes checkoutBounce {
      0%, 100% { transform: scale(1); }
      30% { transform: scale(1.06) translateY(-4px); }
      50% { transform: scale(0.96) translateY(2px); }
      70% { transform: scale(1.03) translateY(-2px); }
    }

    .btn-clear-cart {
      background: transparent;
      border: 1px solid #D5CCBC;
      color: #64748B;
      padding: 0.5rem;
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: all 0.2s;
    }

    .btn-clear-cart:hover {
      background: #FEE2E2;
      color: #EF4444;
      border-color: #FCA5A5;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @media (max-width: 480px) {
      .cart-drawer-panel {
        max-width: 100%;
      }
    }
  `]
})
export class CartDrawerComponent {
  cart = inject(CartService);
  private audio = inject(AudioService);

  onWhatsAppCheckout(): void {
    this.audio.playSuccess();
  }
}
