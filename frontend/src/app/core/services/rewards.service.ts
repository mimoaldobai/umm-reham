import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface FreePerk {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  enabled: boolean;
}

export interface CouponItem {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxUsage: number;
  currentUsage: number;
  expiryDate?: string;
  isActive: boolean;
  description: string;
  createdAt: string;
}

export interface WelcomeRewardConfig {
  isEnabled: boolean;
  couponCode: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  welcomeMessage: string;
  freePerks: FreePerk[];
  guideDownloadUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5073/api';

  // Signals for reactive UI
  public welcomeConfig = signal<WelcomeRewardConfig>({
    isEnabled: true,
    couponCode: 'REHAM15',
    discountType: 'percentage',
    discountValue: 15,
    welcomeMessage: 'أهلاً وسهلاً بك في منصة أم رهام! كباحث جديد، نهديك خصم 15% فوري مع حزمة التميز الأكاديمي الشاملة مجاناً 🎁',
    guideDownloadUrl: 'https://wa.me/966572651058?text=' + encodeURIComponent('السلام عليكم، أود استلام دليل الباحث الأكاديمي المجاني هدية التسجيل 📚'),
    freePerks: [
      {
        id: 'turnitin',
        title: 'تقرير Turnitin أصالة 0% مجاناً',
        subtitle: 'فحص استلال علمي دقيق معتمد دولياً (بقيمة 100 ر.س مجاناً)',
        icon: '📜',
        enabled: true
      },
      {
        id: 'apa7',
        title: 'تنسيق وتوثيق مراجع APA 7th مجاناً',
        subtitle: 'مطابقة تامة لدليل عمادة الدراسات العليا بجامعتك',
        icon: '🏛️',
        enabled: true
      },
      {
        id: 'revisions',
        title: 'مراجعات واستشارات مفتوحة مجاناً',
        subtitle: 'تعديلات مستمرة حتى موافقة المشرف الأكاديمي الجامعي',
        icon: '🔄',
        enabled: true
      },
      {
        id: 'guide',
        title: 'دليل الباحث للأطروحات والنشر العلمي',
        subtitle: 'كتاب رقمي حصري شامل لخطوات البحث الأكاديمي الرصين',
        icon: '🎁',
        enabled: true
      }
    ]
  });

  public coupons = signal<CouponItem[]>([
    {
      id: 'c_1',
      code: 'REHAM15',
      discountType: 'percentage',
      discountValue: 15,
      maxUsage: 1000,
      currentUsage: 84,
      isActive: true,
      description: 'كوبون الترحيب المعتمد للباحثين والعملاء الجدد',
      createdAt: '2026-08-25'
    },
    {
      id: 'c_2',
      code: 'MASTER20',
      discountType: 'percentage',
      discountValue: 20,
      maxUsage: 250,
      currentUsage: 42,
      isActive: true,
      description: 'عرض خاص لرسائل ومقترحات الماجستير',
      createdAt: '2026-08-28'
    },
    {
      id: 'c_3',
      code: 'PHD50',
      discountType: 'fixed',
      discountValue: 50,
      maxUsage: 500,
      currentUsage: 19,
      isActive: true,
      description: 'خصم نقدي 50 ر.س مباشر لأطروحات الدكتوراه وأبحاث الترقية',
      createdAt: '2026-08-30'
    }
  ]);

  constructor() {
    this.loadSettingsFromBackend();
  }

  /**
   * Load rewards settings and coupons from SQLite backend via /api/settings/public
   */
  public loadSettingsFromBackend(): void {
    this.http.get<any[]>(`${this.apiUrl}/settings/public`).pipe(
      catchError(() => of([]))
    ).subscribe(settings => {
      if (!settings || settings.length === 0) return;

      const welcomeSetting = settings.find(s => s.key === 'welcome_rewards_config');
      if (welcomeSetting && welcomeSetting.value) {
        try {
          const parsed = JSON.parse(welcomeSetting.value);
          this.welcomeConfig.set(parsed);
        } catch (e) {
          console.warn('Could not parse welcome_rewards_config:', e);
        }
      }

      const couponsSetting = settings.find(s => s.key === 'active_coupons_list');
      if (couponsSetting && couponsSetting.value) {
        try {
          const parsed = JSON.parse(couponsSetting.value);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.coupons.set(parsed);
          }
        } catch (e) {
          console.warn('Could not parse active_coupons_list:', e);
        }
      }
    });
  }

  /**
   * Save Welcome Reward Config to backend SQLite via /api/settings
   */
  public saveWelcomeConfig(config: WelcomeRewardConfig): Observable<any> {
    this.welcomeConfig.set(config);
    const payload = {
      key: 'welcome_rewards_config',
      value: JSON.stringify(config),
      valueType: 'json',
      groupName: 'rewards'
    };
    return this.http.post(`${this.apiUrl}/settings`, payload).pipe(
      catchError(() => of({ success: true, localOnly: true }))
    );
  }

  /**
   * Save Coupons List to backend SQLite via /api/settings
   */
  public saveCouponsList(couponsList: CouponItem[]): Observable<any> {
    this.coupons.set(couponsList);
    const payload = {
      key: 'active_coupons_list',
      value: JSON.stringify(couponsList),
      valueType: 'json',
      groupName: 'rewards'
    };
    return this.http.post(`${this.apiUrl}/settings`, payload).pipe(
      catchError(() => of({ success: true, localOnly: true }))
    );
  }

  /**
   * Validate a coupon code against active coupons and welcome coupon
   */
  public validateCoupon(code: string): { valid: boolean; coupon?: any; error?: string } {
    if (!code || !code.trim()) {
      return { valid: false, error: 'يرجى إدخال كود الخصم' };
    }

    const clean = code.trim().toUpperCase();
    const cfg = this.welcomeConfig();

    // Check welcome coupon
    if (cfg.isEnabled && cfg.couponCode.toUpperCase() === clean) {
      return {
        valid: true,
        coupon: {
          code: cfg.couponCode,
          discountType: cfg.discountType,
          discountValue: cfg.discountValue,
          description: 'كوبون الترحيب بالباحث الجديد'
        }
      };
    }

    // Check general coupons list
    const found = this.coupons().find(c => c.isActive && c.code.toUpperCase() === clean);
    if (found) {
      return {
        valid: true,
        coupon: found
      };
    }

    return { valid: false, error: 'كود الخصم غير صالح أو منتهي الصلاحية' };
  }

  /**
   * Calculate final discounted price given an original price and a coupon
   */
  public calculateDiscount(originalPrice: number, code?: string): {
    originalPrice: number;
    discountedPrice: number;
    savings: number;
    appliedCoupon: any | null;
  } {
    if (!originalPrice || originalPrice <= 0) {
      return { originalPrice: 0, discountedPrice: 0, savings: 0, appliedCoupon: null };
    }

    const targetCode = code || (this.welcomeConfig().isEnabled ? this.welcomeConfig().couponCode : '');
    const validation = this.validateCoupon(targetCode);

    if (!validation.valid || !validation.coupon) {
      return {
        originalPrice,
        discountedPrice: originalPrice,
        savings: 0,
        appliedCoupon: null
      };
    }

    const cp = validation.coupon;
    let savings = 0;

    if (cp.discountType === 'percentage') {
      savings = Math.round((originalPrice * cp.discountValue) / 100);
    } else {
      savings = Math.min(originalPrice, cp.discountValue);
    }

    const discountedPrice = Math.max(0, originalPrice - savings);

    return {
      originalPrice,
      discountedPrice,
      savings,
      appliedCoupon: cp
    };
  }
}
