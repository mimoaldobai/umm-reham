import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ApiService, ServiceItem } from '../../../core/services/api.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-favorites-drawer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Backdrop Overlay -->
    <div 
      class="favorites-backdrop" 
      *ngIf="cartService.isFavoritesOpen()"
      (click)="cartService.closeFavorites()"
      dir="rtl">
      
      <!-- Drawer Panel -->
      <div class="favorites-panel glass-panel" (click)="$event.stopPropagation()">
        
        <!-- Header -->
        <div class="drawer-header">
          <div class="header-title-box">
            <div class="heart-badge-icon">❤️</div>
            <div>
              <h3>المفضلة الأكاديمية</h3>
              <p>خدماتك وأبحاثك المحفوظة للرجوع السريع</p>
            </div>
          </div>
          <button class="btn-close-drawer" (click)="cartService.closeFavorites()" title="إغلاق">✕</button>
        </div>

        <!-- Empty State -->
        <div class="drawer-empty" *ngIf="favoriteServices.length === 0">
          <div class="empty-icon-glow">🤍</div>
          <h4>قائمتك المفضلة فارغة</h4>
          <p>استكشف خدماتنا الأكاديمية المتميزة وانقر على أيقونة القلب لحفظ أي خدمة في قائمتك الخاصة.</p>
          <a routerLink="/services" class="btn-explore-services" (click)="cartService.closeFavorites()">
            <span>استعراض الخدمات والمتجر</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <!-- Items List -->
        <div class="drawer-content" *ngIf="favoriteServices.length > 0">
          <div class="fav-count-banner">
            <span>لديك <strong>{{ favoriteServices.length }}</strong> خدمات في قائمتك المفضلة</span>
            <button class="btn-clear-text" (click)="cartService.clearFavorites()">تفريغ المفضلة</button>
          </div>

          <div class="favorite-items-deck">
            <div *ngFor="let s of favoriteServices" class="fav-item-card">
              <div class="fav-item-info">
                <div class="fav-item-icon">
                  <span *ngIf="s.coverImageUrl" class="service-img-wrap">
                    <img [src]="s.coverImageUrl" [alt]="s.nameAr" />
                  </span>
                  <span *ngIf="!s.coverImageUrl" class="service-emoji">🎓</span>
                </div>
                <div class="fav-item-meta">
                  <span class="fav-item-category">{{ s.categoryNameAr || 'خدمة أكاديمية' }}</span>
                  <h4 class="fav-item-title">{{ s.nameAr }}</h4>
                  <div class="fav-item-price-badge">
                    <span *ngIf="s.priceFixed" class="price-val">{{ s.priceFixed }} ر.س</span>
                    <span *ngIf="!s.priceFixed && s.priceMin" class="price-val">يبدأ من {{ s.priceMin }} ر.س</span>
                    <span *ngIf="!s.priceFixed && !s.priceMin" class="price-quote">حسب المواصفات</span>
                    <span class="gold-guarantee-pill">🛡️ ضمان 100%</span>
                  </div>
                </div>
              </div>

              <!-- Item Actions -->
              <div class="fav-item-actions">
                <button class="btn-quick-cart" (click)="addToCart(s)" title="إضافة للسلة">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  <span>أضف للسلة</span>
                </button>
                <a [href]="cartService.generateSingleServiceWhatsAppUrl(s)" target="_blank" class="btn-quick-wa" title="طلب مباشر عبر الواتساب">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.201.3-.778.979-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.783-1.674-2.084-.176-.3-.019-.463.132-.612.136-.135.301-.35.452-.526.15-.175.201-.3.301-.5.101-.2.051-.375-.025-.525-.075-.15-.678-1.634-.929-2.239-.245-.589-.494-.509-.678-.519-.176-.01-.377-.01-.577-.01-.201 0-.527.075-.803.375-.276.3-1.054 1.03-1.054 2.513 0 1.482 1.079 2.913 1.23 3.114.15.2 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.379.197 1.898.12.579-.087 1.78-.727 2.03-1.43.251-.703.251-1.306.176-1.43-.075-.125-.276-.2-.577-.35zM12 2a10 10 0 0 0-8.66 15L2 22l5.13-1.34A10 10 0 1 0 12 2z"/></svg>
                  <span>واتساب</span>
                </a>
                <button class="btn-remove-fav" (click)="cartService.toggleFavorite(s.id)" title="إزالة من المفضلة">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="drawer-footer" *ngIf="favoriteServices.length > 0">
          <button class="btn-add-all-cart" (click)="addAllToCart()">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>إضافة كافة المفضلة إلى السلة ({{ favoriteServices.length }})</span>
          </button>
          <button class="btn-close-ghost" (click)="cartService.closeFavorites()">متابعة التصفح</button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .favorites-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(4, 12, 8, 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 99999;
      display: flex;
      justify-content: flex-start;
      animation: fadeInBackdrop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fadeInBackdrop {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .favorites-panel {
      width: 100%;
      max-width: 440px;
      height: 100%;
      background: rgba(14, 28, 22, 0.96);
      border-left: 1px solid rgba(212, 175, 55, 0.25);
      display: flex;
      flex-direction: column;
      box-shadow: -15px 0 50px rgba(0, 0, 0, 0.6);
      animation: slideInDrawer 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideInDrawer {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .drawer-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.02);
    }

    .header-title-box {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .heart-badge-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      box-shadow: 0 0 15px rgba(239, 68, 68, 0.2);
    }

    .header-title-box h3 {
      font-size: 1.15rem;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0;
    }

    .header-title-box p {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.6);
      margin: 2px 0 0 0;
    }

    .btn-close-drawer {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      transition: all 0.2s ease;
    }

    .btn-close-drawer:hover {
      background: rgba(239, 68, 68, 0.25);
      border-color: rgba(239, 68, 68, 0.4);
      color: #EF4444;
      transform: scale(1.05);
    }

    /* Empty State */
    .drawer-empty {
      flex: 1;
      padding: 3rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .empty-icon-glow {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.2));
    }

    .drawer-empty h4 {
      font-size: 1.2rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 0.5rem;
    }

    .drawer-empty p {
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.6;
      margin-bottom: 1.75rem;
    }

    .btn-explore-services {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.8rem 1.6rem;
      background: linear-gradient(135deg, #0F5132 0%, #1A6B44 100%) !important;
      border: 1.5px solid rgba(201, 169, 110, 0.5) !important;
      color: #FFFFFF;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.92rem;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
      transition: all 0.2s ease;
    }

    .btn-explore-services:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45);
    }

    /* Content & Deck */
    .drawer-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 1.25rem;
    }

    .fav-count-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 8px;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.75);
      margin-bottom: 1rem;
    }

    .fav-count-banner strong {
      color: #E5B94F;
    }

    .btn-clear-text {
      background: none;
      border: none;
      color: #EF4444;
      font-size: 0.75rem;
      cursor: pointer;
      padding: 0;
      text-decoration: underline;
      transition: opacity 0.2s;
    }

    .btn-clear-text:hover { opacity: 0.8; }

    .favorite-items-deck {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .fav-item-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 1rem;
      transition: all 0.2s ease;
    }

    .fav-item-card:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(212, 175, 55, 0.3);
      transform: translateY(-1.5px);
    }

    .fav-item-info {
      display: flex;
      gap: 0.85rem;
      align-items: flex-start;
      margin-bottom: 0.85rem;
    }

    .fav-item-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
    }

    .service-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .service-emoji { font-size: 1.4rem; }

    .fav-item-meta { flex: 1; }

    .fav-item-category {
      font-size: 0.7rem;
      color: #E5B94F;
      font-weight: 700;
      display: block;
      margin-bottom: 2px;
    }

    .fav-item-title {
      font-size: 0.92rem;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0 0 6px 0;
      line-height: 1.4;
    }

    .fav-item-price-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .price-val {
      font-size: 0.82rem;
      font-weight: 800;
      color: #10B981;
    }

    .price-quote {
      font-size: 0.75rem;
      color: #38BDF8;
      font-weight: 600;
    }

    .gold-guarantee-pill {
      font-size: 0.68rem;
      color: #E5B94F;
      background: rgba(229, 185, 79, 0.12);
      padding: 1px 6px;
      border-radius: 6px;
      font-weight: 600;
    }

    /* Fav Item Actions */
    .fav-item-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      padding-top: 0.65rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .btn-quick-cart {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.55rem;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #10B981;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-quick-cart:hover {
      background: #10B981;
      color: #FFFFFF;
    }

    .btn-quick-wa {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.55rem 0.75rem;
      background: rgba(37, 211, 102, 0.15);
      border: 1px solid rgba(37, 211, 102, 0.35);
      color: #25D366;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.82rem;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-quick-wa:hover {
      background: #25D366;
      color: #FFFFFF;
    }

    .btn-remove-fav {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-remove-fav:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.4);
      color: #EF4444;
    }

    /* Footer */
    .drawer-footer {
      padding: 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .btn-add-all-cart {
      width: 100%;
      padding: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      background: linear-gradient(135deg, #E5B94F, #C9A96E);
      color: #0A2F24;
      border: none;
      border-radius: 12px;
      font-weight: 800;
      font-size: 0.92rem;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(229, 185, 79, 0.25);
      transition: all 0.2s ease;
    }

    .btn-add-all-cart:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(229, 185, 79, 0.4);
    }

    .btn-close-ghost {
      width: 100%;
      padding: 0.65rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-close-ghost:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #FFFFFF;
    }
  `]
})
export class FavoritesDrawerComponent {
  cartService = inject(CartService);
  api = inject(ApiService);
  audio = inject(AudioService);

  get favoriteServices(): ServiceItem[] {
    const favIds = this.cartService.favorites();
    return this.api.defaultServices.filter(s => favIds.includes(s.id));
  }

  addToCart(service: ServiceItem): void {
    this.cartService.addToCart(service);
  }

  addAllToCart(): void {
    for (const s of this.favoriteServices) {
      this.cartService.addToCart(s, undefined, 1, false);
    }
    this.audio.playSuccess();
    this.cartService.closeFavorites();
    this.cartService.openCart();
  }
}
