import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AudioService } from './audio.service';
import { of, catchError } from 'rxjs';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'order_status' | 'broadcast' | 'discount' | 'welcome' | 'system';
  target?: string; // 'all' or clientId
  icon?: string;
  link?: string;
  actionLabel?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'new_order' | 'new_client' | 'new_inquiry' | 'new_review' | 'system';
  icon?: string;
  tab?: string; // Tab to switch to in admin dashboard
  isRead: boolean;
  createdAt: string;
  meta?: any;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);
  private audio = inject(AudioService);

  private readonly CLIENT_NOTIFS_KEY = 'ummreham_client_notifications_v1';
  private readonly ADMIN_NOTIFS_KEY = 'ummreham_admin_notifications_v1';

  // Signals State
  clientNotifications = signal<AppNotification[]>([]);
  adminNotifications = signal<AdminNotification[]>([]);
  isClientDrawerOpen = signal<boolean>(false);
  isAdminDrawerOpen = signal<boolean>(false);
  activeToast = signal<AppNotification | null>(null);

  private toastTimeout: any = null;

  // Computed Unread Badges
  clientUnreadCount = computed(() => 
    this.clientNotifications().filter(n => !n.isRead).length
  );

  adminUnreadCount = computed(() => 
    this.adminNotifications().filter(n => !n.isRead).length
  );

  constructor() {
    this.loadInitialNotifications();
  }

  // =========================================================================
  // 1. INITIALIZATION & LOCAL PERSISTENCE
  // =========================================================================
  private loadInitialNotifications(): void {
    if (typeof localStorage === 'undefined') return;

    // 1. Client Notifications
    try {
      const storedClient = localStorage.getItem(this.CLIENT_NOTIFS_KEY);
      if (storedClient) {
        this.clientNotifications.set(JSON.parse(storedClient));
      } else {
        const seedClient: AppNotification[] = [
          {
            id: 'cn-1',
            title: '🎁 باقة الترحيب مفعلة لك!',
            message: 'مرحباً بك في منصة أم رهام! كود الخصم الترحيبي REHAM15 مفعل الآن بخصم 15% فوري على كافة خدماتنا.',
            type: 'welcome',
            icon: '🎁',
            actionLabel: 'تصفح الخدمات',
            link: '/services',
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
          },
          {
            id: 'cn-2',
            title: '🛡️ ضمان الأصالة الأكاديمية 0% اقتباس',
            message: 'فحص Turnitin المعتمد مع تقرير رسمي دولي مجاناً مع جميع أبحاث ورسائل الماجستير والدكتوراه.',
            type: 'system',
            icon: '🛡️',
            actionLabel: 'تعرف على الضمانات',
            link: '/services',
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
          },
          {
            id: 'cn-3',
            title: '🌸 تهنئة خاصة ببدء الفصل الأكاديمي',
            message: 'يسر إدارة منصة أم رهام تهنئتكم بحلول الموسم الأكاديمي الجديد، ونتمنى لجميع الباحثين التميز والريادة 🇸🇦.',
            type: 'broadcast',
            icon: '🌸',
            actionLabel: 'تواصل مع مستشارك',
            link: '/contact',
            isRead: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
          }
        ];
        this.clientNotifications.set(seedClient);
        this.saveClientNotifications();
      }
    } catch (e) {
      console.error('Error loading client notifications', e);
    }

    // 2. Admin Notifications
    try {
      const storedAdmin = localStorage.getItem(this.ADMIN_NOTIFS_KEY);
      if (storedAdmin) {
        this.adminNotifications.set(JSON.parse(storedAdmin));
      } else {
        const seedAdmin: AdminNotification[] = [
          {
            id: 'an-1',
            title: '📦 طلب بحث جديد وصل',
            message: 'الباحث سلطان الشمري (#OR-REQ-98421) - خدمة: إعداد رسائل الماجستير (جامعة الملك سعود).',
            type: 'new_order',
            icon: '📦',
            tab: 'orders',
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
          },
          {
            id: 'an-2',
            title: '👤 تسجيل باحث جديد بالمنصة',
            message: 'انضمت الباحثة د. نورة القحطاني (هندسة برمجيات وذكاء اصطناعي - جامعة الطائف).',
            type: 'new_client',
            icon: '👤',
            tab: 'clients',
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
          },
          {
            id: 'an-3',
            title: '💬 رسالة استفسار من صفحة التواصل',
            message: 'استفسار من أ. مشعل العتيبي بخصوص تدقيق ومراجعة أطروحة الدكتوراه وحساب تكلفة النشر.',
            type: 'new_inquiry',
            icon: '💬',
            tab: 'orders',
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
          },
          {
            id: 'an-4',
            title: '⭐ تقييم أكاديمي جديد 5/5',
            message: 'تقييم ممتاز وشهادة شكر من د. فهد الدوسري على خدمة العروض التقديمية وتصميم المناقشة.',
            type: 'new_review',
            icon: '⭐',
            tab: 'testimonials',
            isRead: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
          }
        ];
        this.adminNotifications.set(seedAdmin);
        this.saveAdminNotifications();
      }
    } catch (e) {
      console.error('Error loading admin notifications', e);
    }
  }

  private saveClientNotifications(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.CLIENT_NOTIFS_KEY, JSON.stringify(this.clientNotifications()));
      } catch (e) { }
    }
  }

  private saveAdminNotifications(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.ADMIN_NOTIFS_KEY, JSON.stringify(this.adminNotifications()));
      } catch (e) { }
    }
  }

  // =========================================================================
  // 2. CLIENT NOTIFICATION DISPATCHING & LIVE TOAST
  // =========================================================================
  sendClientNotification(notif: Partial<AppNotification>): void {
    const full: AppNotification = {
      id: notif.id || 'cn_' + Date.now(),
      title: notif.title || 'تنبيه أكاديمي جديد',
      message: notif.message || '',
      type: notif.type || 'system',
      target: notif.target || 'all',
      icon: notif.icon || (notif.type === 'order_status' ? '📋' : (notif.type === 'discount' ? '🎁' : '🔔')),
      link: notif.link,
      actionLabel: notif.actionLabel,
      isRead: false,
      createdAt: notif.createdAt || new Date().toISOString()
    };

    this.clientNotifications.update(list => [full, ...list]);
    this.saveClientNotifications();

    // Sound chime
    try {
      this.audio.playNotification();
    } catch (e) { }

    // Live Toast Popup for 5 seconds
    this.triggerLiveToast(full);

    // Sync with backend if available
    this.http.post('/api/notifications/broadcast', {
      title: full.title,
      message: full.message,
      type: full.type,
      target: full.target,
      icon: full.icon,
      link: full.link,
      actionLabel: full.actionLabel,
      recipientType: 'client'
    }).pipe(catchError(() => of(null))).subscribe();
  }

  private triggerLiveToast(notif: AppNotification): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.activeToast.set(notif);
    this.toastTimeout = setTimeout(() => {
      this.activeToast.set(null);
    }, 5500);
  }

  dismissToast(): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.activeToast.set(null);
  }

  // =========================================================================
  // 3. ADMIN NOTIFICATION DISPATCHING
  // =========================================================================
  sendAdminNotification(notif: Partial<AdminNotification>): void {
    const full: AdminNotification = {
      id: notif.id || 'an_' + Date.now(),
      title: notif.title || 'إشعار إداري جديد',
      message: notif.message || '',
      type: notif.type || 'system',
      icon: notif.icon || '🔔',
      tab: notif.tab || 'analytics',
      isRead: false,
      createdAt: notif.createdAt || new Date().toISOString(),
      meta: notif.meta
    };

    this.adminNotifications.update(list => [full, ...list]);
    this.saveAdminNotifications();

    // Sound alert
    try {
      this.audio.playSuccess();
    } catch (e) { }

    // Sync with backend if available
    this.http.post('/api/notifications/broadcast', {
      title: full.title,
      message: full.message,
      type: full.type,
      target: 'admin',
      icon: full.icon,
      link: full.tab,
      recipientType: 'admin'
    }).pipe(catchError(() => of(null))).subscribe();
  }

  // =========================================================================
  // 4. AUTOMATIC BUSINESS EVENT TRIGGERS
  // =========================================================================

  /**
   * Called when an order status changes (e.g. from Admin Dashboard)
   */
  triggerOrderStatusChangeNotification(orderNumber: string, newStatusLabel: string, clientName?: string): void {
    const title = `📋 تحديث حالة طلبك (${orderNumber})`;
    const message = `عزيزي الباحث ${clientName ? clientName : ''}، تم تحديث حالة طلبك (${orderNumber}) بنجاح إلى: ${newStatusLabel}. نسعد بخدمتك دائماً.`;
    this.sendClientNotification({
      title,
      message,
      type: 'order_status',
      icon: '📋',
      actionLabel: 'متابعة الطلب',
      link: '/services'
    });
  }

  /**
   * Called when a new client registers in the platform
   */
  triggerNewClientRegistered(clientOrName: string | { fullName: string; academicLevel?: string; university?: string }, academicLevelOrPhone?: string, university?: string): void {
    const fullName = typeof clientOrName === 'string' ? clientOrName : clientOrName.fullName;
    const academicLevel = typeof clientOrName === 'string' ? academicLevelOrPhone : clientOrName.academicLevel;
    const univ = typeof clientOrName === 'string' ? university : clientOrName.university;

    // 1. Send Alert to Admin
    this.sendAdminNotification({
      title: '👤 تسجيل باحث جديد بالمنصة',
      message: `تم انضمام الباحث: ${fullName} (${academicLevel || 'دراسات عليا'} - ${univ || 'جامعة سعودية'}).`,
      type: 'new_client',
      icon: '👤',
      tab: 'clients'
    });

    // 2. Send Welcome Notification to Client
    this.sendClientNotification({
      title: '🎓 مرحباً بك في منصة أم رهام!',
      message: `أهلاً بك أستاذ/ة ${fullName}! تم تفعيل حسابك وحزمة الخصم الترحيبي REHAM15 بنسبة 15% فوري.`,
      type: 'welcome',
      icon: '🎁',
      actionLabel: 'استكشف الخدمات',
      link: '/services'
    });
  }

  /**
   * Called when a new order or consultation request is submitted
   */
  triggerNewOrderCreated(orderOrNum: string | { orderNumber: string; clientName: string; serviceTitle: string; price?: number }, clientName?: string, serviceTitle?: string, price?: number): void {
    const orderNumber = typeof orderOrNum === 'string' ? orderOrNum : orderOrNum.orderNumber;
    const cName = typeof orderOrNum === 'string' ? (clientName || 'باحث أكاديمي') : orderOrNum.clientName;
    const sTitle = typeof orderOrNum === 'string' ? (serviceTitle || 'خدمة أكاديمية') : orderOrNum.serviceTitle;
    const pVal = typeof orderOrNum === 'string' ? price : orderOrNum.price;

    this.sendAdminNotification({
      title: '📦 وصول طلب خدمة جديد!',
      message: `طلب جديد (${orderNumber}) من الباحث: ${cName} لخدمة: ${sTitle}${pVal ? ` بمبلغ ${pVal} ر.س` : ''}.`,
      type: 'new_order',
      icon: '📦',
      tab: 'orders'
    });

    // Client confirmation notification
    this.sendClientNotification({
      title: `✅ تم استلام طلبك (${orderNumber})`,
      message: `شكراً لثقتكم. تم استلام طلب (${sTitle}) بنجاح، وسيتواصل معك مستشارك الأكاديمي فوراً.`,
      type: 'order_status',
      icon: '✅',
      actionLabel: 'متابعة الطلب',
      link: '/services'
    });
  }

  /**
   * Called when a contact inquiry is sent
   */
  triggerNewInquiry(contactOrName: string | { name: string; phone?: string; subject?: string }, subject?: string, phone?: string): void {
    const name = typeof contactOrName === 'string' ? contactOrName : contactOrName.name;
    const subj = typeof contactOrName === 'string' ? subject : contactOrName.subject;
    const ph = typeof contactOrName === 'string' ? phone : contactOrName.phone;

    this.sendAdminNotification({
      title: '💬 استفسار تواصل جديد',
      message: `رسالة جديدة من: ${name} (${ph || ''}) - موضوع: ${subj || 'استفسار أكاديمي'}.`,
      type: 'new_inquiry',
      icon: '💬',
      tab: 'orders'
    });
  }

  /**
   * Called when a new review/testimonial is submitted
   */
  triggerNewReview(reviewOrName: string | { clientName: string; rating?: number; university?: string }, rating?: number, university?: string): void {
    const clientName = typeof reviewOrName === 'string' ? reviewOrName : reviewOrName.clientName;
    const rate = typeof reviewOrName === 'string' ? rating : reviewOrName.rating;
    const univ = typeof reviewOrName === 'string' ? university : reviewOrName.university;

    this.sendAdminNotification({
      title: '⭐ تقييم وتوثيق أكاديمي جديد',
      message: `أضاف ${clientName} (${univ || ''}) تقييماً جديداً ${rate ? `(${rate} نجوم)` : ''} على المنصة.`,
      type: 'new_review',
      icon: '⭐',
      tab: 'testimonials'
    });
  }

  // =========================================================================
  // 5. READ & DELETE ACTIONS
  // =========================================================================
  markClientAsRead(id: string): void {
    this.clientNotifications.update(list => 
      list.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    this.saveClientNotifications();
  }

  markAllClientAsRead(): void {
    this.clientNotifications.update(list => 
      list.map(n => ({ ...n, isRead: true }))
    );
    this.saveClientNotifications();
    this.audio.playClick();
  }

  deleteClientNotification(id: string): void {
    this.clientNotifications.update(list => list.filter(n => n.id !== id));
    this.saveClientNotifications();
    this.audio.playClick();
  }

  clearAllClientNotifications(): void {
    this.clientNotifications.set([]);
    this.saveClientNotifications();
    this.audio.playClick();
  }

  markAdminAsRead(id: string): void {
    this.adminNotifications.update(list => 
      list.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    this.saveAdminNotifications();
  }

  markAllAdminAsRead(): void {
    this.adminNotifications.update(list => 
      list.map(n => ({ ...n, isRead: true }))
    );
    this.saveAdminNotifications();
    this.audio.playClick();
  }

  deleteAdminNotification(id: string): void {
    this.adminNotifications.update(list => list.filter(n => n.id !== id));
    this.saveAdminNotifications();
    this.audio.playClick();
  }

  clearAllAdminNotifications(): void {
    this.adminNotifications.set([]);
    this.saveAdminNotifications();
    this.audio.playClick();
  }

  // =========================================================================
  // 6. DRAWER & MODAL CONTROLS
  // =========================================================================
  openClientDrawer(): void {
    this.isClientDrawerOpen.set(true);
    this.audio.playClick();
  }

  toggleClientDrawer(): void {
    this.isClientDrawerOpen.update(v => !v);
    this.audio.playClick();
  }

  closeClientDrawer(): void {
    this.isClientDrawerOpen.set(false);
  }

  openAdminDrawer(): void {
    this.isAdminDrawerOpen.set(true);
    this.audio.playClick();
  }

  openAdminModal(): void {
    this.isAdminDrawerOpen.set(true);
    this.audio.playClick();
  }

  toggleAdminDrawer(): void {
    this.isAdminDrawerOpen.update(v => !v);
    this.audio.playClick();
  }

  closeAdminDrawer(): void {
    this.isAdminDrawerOpen.set(false);
  }

  closeAdminModal(): void {
    this.isAdminDrawerOpen.set(false);
  }
}
