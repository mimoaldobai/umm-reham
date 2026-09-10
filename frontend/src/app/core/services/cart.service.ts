import { Injectable, signal, computed, inject } from '@angular/core';
import { AudioService } from './audio.service';
import { ApiService, ServiceItem, ServiceTemplate } from './api.service';
import { ClientAuthService } from './client-auth.service';

export interface CartItem {
  id: string; // unique item id: serviceId + (templateId ? '_' + templateId : '')
  serviceId: string;
  serviceName: string;
  categoryName?: string;
  template?: ServiceTemplate;
  quantity: number;
  unitPrice: number; // 0 if quote
  isQuote: boolean;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private audio = inject(AudioService);
  private api = inject(ApiService);
  private clientAuth = inject(ClientAuthService);

  // Cart State (Reactive Signals)
  private _cartItems = signal<CartItem[]>(this.loadCartFromStorage());
  readonly cartItems = this._cartItems.asReadonly();

  // Favorites State (Array of service IDs)
  private _favorites = signal<string[]>(this.loadFavoritesFromStorage());
  readonly favorites = this._favorites.asReadonly();

  // UI State: Cart Drawer Open/Closed
  isCartOpen = signal<boolean>(false);

  // Highlight / Bounce trigger for WhatsApp button
  whatsappBouncing = signal<boolean>(false);

  // Computed Values
  totalCount = computed(() => {
    return this._cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  totalPrice = computed(() => {
    return this._cartItems().reduce((sum, item) => sum + (item.isQuote ? 0 : item.unitPrice * item.quantity), 0);
  });

  hasQuoteItems = computed(() => {
    return this._cartItems().some(item => item.isQuote);
  });

  // --- CART ACTIONS ---

  addToCart(service: ServiceItem, template?: ServiceTemplate, quantity = 1, playSound = true): void {
    const templateId = template ? template.id : '';
    const itemId = `${service.id}${templateId ? '_' + templateId : ''}`;

    const isQuote = service.priceType === 'quote' || service.priceType === 'contact' || (!template && !service.priceFixed && !service.priceMin);
    const unitPrice = template ? template.price : (service.priceFixed || service.priceMin || 0);

    const current = [...this._cartItems()];
    const existingIndex = current.findIndex(item => item.id === itemId);

    if (existingIndex !== -1) {
      current[existingIndex].quantity += quantity;
    } else {
      current.push({
        id: itemId,
        serviceId: service.id,
        serviceName: service.nameAr,
        categoryName: service.categoryNameAr,
        template: template,
        quantity: Math.max(1, quantity),
        unitPrice: unitPrice,
        isQuote: isQuote
      });
    }

    this._cartItems.set(current);
    this.saveCartToStorage();
    this.triggerWhatsAppBounce();

    if (playSound) {
      this.audio.playSuccess();
    }
  }

  updateQuantity(itemId: string, delta: number): void {
    const current = [...this._cartItems()];
    const idx = current.findIndex(i => i.id === itemId);
    if (idx === -1) return;

    const newQty = current[idx].quantity + delta;
    if (newQty <= 0) {
      this.removeFromCart(itemId);
    } else {
      current[idx].quantity = newQty;
      this._cartItems.set(current);
      this.saveCartToStorage();
      this.audio.playClick();
      this.triggerWhatsAppBounce();
    }
  }

  removeFromCart(itemId: string): void {
    const filtered = this._cartItems().filter(i => i.id !== itemId);
    this._cartItems.set(filtered);
    this.saveCartToStorage();
    this.audio.playClick();
  }

  clearCart(): void {
    this._cartItems.set([]);
    this.saveCartToStorage();
    this.audio.playClick();
  }

  openCart(): void {
    this.isCartOpen.set(true);
    this.audio.playClick();
  }

  closeCart(): void {
    this.isCartOpen.set(false);
    this.audio.playClick();
  }

  toggleCart(): void {
    this.isCartOpen.set(!this.isCartOpen());
    this.audio.playClick();
  }

  triggerWhatsAppBounce(): void {
    this.whatsappBouncing.set(true);
    setTimeout(() => {
      this.whatsappBouncing.set(false);
    }, 2400);
  }

  // --- FAVORITES ACTIONS ---

  toggleFavorite(serviceId: string): void {
    const current = [...this._favorites()];
    const index = current.indexOf(serviceId);

    if (index !== -1) {
      current.splice(index, 1);
    } else {
      current.push(serviceId);
    }

    this._favorites.set(current);
    this.saveFavoritesToStorage();
    this.audio.playClick();
  }

  isFavorite(serviceId: string): boolean {
    return this._favorites().includes(serviceId);
  }

  // --- WHATSAPP ORDER URL GENERATOR ---

  generateCartWhatsAppUrl(): string {
    const items = this._cartItems();
    const cleanPhone = '966572651058';

    if (items.length === 0) {
      const text = encodeURIComponent('السلام عليكم ورحمة الله وبركاته 🌸\nأرغب بالاستفسار عن خدمات منصة أم رهام الأكاديمية.');
      return `https://wa.me/${cleanPhone}?text=${text}`;
    }

    const lines: string[] = [
      'السلام عليكم ورحمة الله وبركاته 🌸',
      '*طلب خدمات سلة المشتريات — منصة أم رهام*',
      '━━━━━━━━━━━━━━━━━━━━',
      ''
    ];

    if (this.clientAuth.currentClient()) {
      const c = this.clientAuth.currentClient()!;
      lines.push(
        `👤 *مقدم الطلب:* ${c.fullName}`,
        `📱 *رقم الجوال:* ${c.phone}`,
        `🎓 *المستوى / الجامعة:* ${c.academicLevel || 'دراسات عليا'} - ${c.university || 'جامعة سعودية'}`,
        '━━━━━━━━━━━━━━━━━━━━'
      );
    }

    lines.push('📦 *تفاصيل الخدمات المطلوبة:*');
    items.forEach((item, idx) => {
      let line = `${idx + 1}. *${item.serviceName}*`;
      if (item.template) {
        line += `\n   ▫️ النموذج: ${item.template.nameAr} (\`${item.template.code}\`)`;
      }
      line += `\n   ▫️ الكمية: ${item.quantity}`;
      if (item.isQuote) {
        line += ` | [طلب تسعيرة]`;
      } else {
        line += ` | (${item.unitPrice * item.quantity} ر.س)`;
      }
      lines.push(line);
    });

    lines.push('━━━━━━━━━━━━━━━━━━━━');
    if (this.totalPrice() > 0) {
      lines.push(`💰 *الإجمالي التقديري:* ${this.totalPrice()} ر.س`);
    }
    if (this.hasQuoteItems()) {
      lines.push(`📌 *ملاحظة:* يتضمن الطلب خدمات يتم تحديد تكلفتها حسب المواصفات.`);
    }
    lines.push('');
    lines.push('🛡️ *الضمان الذهبي:* الدفع بعد الإنجاز والاستلام المعتمد 100%');
    lines.push('✨ *أرجو تأكيد الطلب والبدء بالتنفيذ، شكراً لكم 🌸*');

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  }

  generateSingleServiceWhatsAppUrl(service: ServiceItem, template?: ServiceTemplate, quantity = 1): string {
    const cleanPhone = '966572651058';
    const lines: string[] = [
      'السلام عليكم ورحمة الله وبركاته 🌸',
      '*طلب خدمة مباشرة — منصة أم رهام الأكاديمية*',
      '━━━━━━━━━━━━━━━━━━━━',
      `📌 *الخدمة المطلوبة:* ${service.nameAr}`
    ];

    if (this.clientAuth.currentClient()) {
      const c = this.clientAuth.currentClient()!;
      lines.push(`👤 *مقدم الطلب:* ${c.fullName} (${c.academicLevel || 'عميل موثق'})`);
      lines.push(`📱 *رقم الجوال:* ${c.phone}`);
    }

    if (template) {
      lines.push(`✨ *النموذج المختار:* ${template.nameAr} (\`${template.code}\`)`);
      lines.push(`💰 *سعر النموذج:* ${template.price} ر.س`);
    } else if (service.priceFixed) {
      lines.push(`💰 *السعر المعتمد:* ${service.priceFixed} ر.س`);
    } else if (service.priceType === 'quote') {
      lines.push(`📝 *نوع التسعير:* يتم التحديد حسب متطلبات البحث والصفحات`);
    }

    if (quantity > 1) {
      lines.push(`🔢 *الكمية المطلوبة:* ${quantity}`);
      if (template) {
        lines.push(`💰 *الإجمالي:* ${template.price * quantity} ر.س`);
      } else if (service.priceFixed) {
        lines.push(`💰 *الإجمالي:* ${service.priceFixed * quantity} ر.س`);
      }
    }

    lines.push('━━━━━━━━━━━━━━━━━━━━');
    lines.push('🛡️ *الضمان الذهبي:* الدفع بعد الإنجاز والاستلام المعتمد 100%');
    lines.push('✨ *أرجو تزويدي بخطوات التنفيذ والبدء بالطلب، شكراً لكم 🌸*');

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  }

  // --- LOCAL STORAGE HELPERS ---

  private getCartStorageKey(): string {
    const client = this.clientAuth.currentClient();
    return client ? `ur_cart_items_${client.id}` : 'ur_cart_items';
  }

  private loadCartFromStorage(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const key = this.getCartStorageKey();
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
      const general = localStorage.getItem('ur_cart_items');
      return general ? JSON.parse(general) : [];
    } catch {
      return [];
    }
  }

  private saveCartToStorage(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const key = this.getCartStorageKey();
      localStorage.setItem(key, JSON.stringify(this._cartItems()));
      localStorage.setItem('ur_cart_items', JSON.stringify(this._cartItems()));
    } catch {}
  }

  private loadFavoritesFromStorage(): string[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const data = localStorage.getItem('ur_favorites');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveFavoritesToStorage(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem('ur_favorites', JSON.stringify(this._favorites()));
    } catch {}
  }
}
