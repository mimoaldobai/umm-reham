import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService, AdminNotification } from '../../../core/services/notification.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-admin-notifications-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Backdrop -->
    <div 
      class="admin-notif-backdrop" 
      *ngIf="notifService.isAdminDrawerOpen()" 
      (click)="notifService.closeAdminDrawer()"
      dir="rtl">
      
      <!-- Panel -->
      <div class="admin-notif-panel glass-panel" (click)="$event.stopPropagation()">
        
        <!-- Header -->
        <div class="panel-header">
          <div class="header-title">
            <span class="bell-icon">🔔</span>
            <div>
              <h3>إشعارات وتنبيهات الإدارة</h3>
              <p>متابعة العمليات المباشرة والطلبات والعملاء الجدد</p>
            </div>
          </div>
          <button class="btn-close" (click)="notifService.closeAdminDrawer()" title="إغلاق">✕</button>
        </div>

        <!-- Mode Tabs: الإشعارات الواردة | إرسال إشعار للعملاء -->
        <div class="mode-tabs">
          <button 
            type="button" 
            class="tab-btn" 
            [class.active]="activeMode === 'inbox'"
            (click)="setMode('inbox')">
            <span>📥 الوارد للوحة التحكم</span>
            <span class="tab-badge" *ngIf="notifService.adminUnreadCount() > 0">{{ notifService.adminUnreadCount() }}</span>
          </button>
          <button 
            type="button" 
            class="tab-btn" 
            [class.active]="activeMode === 'broadcast'"
            (click)="setMode('broadcast')">
            <span>📢 بث إشعار للعملاء</span>
          </button>
        </div>

        <!-- MODE 1: INBOX (الوارد) -->
        <div class="panel-body" *ngIf="activeMode === 'inbox'">
          
          <div class="inbox-actions" *ngIf="notifService.adminNotifications().length > 0">
            <span>{{ notifService.adminUnreadCount() }} تنبيه جديد لم يُقرأ</span>
            <button class="btn-text-action" *ngIf="notifService.adminUnreadCount() > 0" (click)="notifService.markAllAdminAsRead()">
              ✓ تحديد الكل كمقروء
            </button>
          </div>

          <div class="empty-inbox" *ngIf="notifService.adminNotifications().length === 0">
            <span class="empty-icon">📭</span>
            <h4>لا توجد تنبيهات إدارية جديدة</h4>
            <p>جميع طلبات الباحثين والعملاء الجدد والرسائل ستصلك هنا فوراً مع رنين تنبيه.</p>
          </div>

          <div class="notif-list" *ngIf="notifService.adminNotifications().length > 0">
            <div 
              *ngFor="let item of notifService.adminNotifications()" 
              class="admin-notif-item"
              [class.unread]="!item.isRead"
              (click)="onAdminNotifClick(item)">
              
              <div class="item-icon-wrap" [attr.data-type]="item.type">
                <span>{{ item.icon || '🔔' }}</span>
              </div>

              <div class="item-content">
                <div class="item-head">
                  <span class="item-tag">{{ getAdminTypeLabel(item.type) }}</span>
                  <span class="item-time">{{ formatTime(item.createdAt) }}</span>
                  <span class="unread-pill" *ngIf="!item.isRead">جديد</span>
                </div>
                <h4 class="item-title">{{ item.title }}</h4>
                <p class="item-msg">{{ item.message }}</p>
                <div class="item-action-hint">
                  <span>انقر للانتقال المباشر للقسم ↗</span>
                  <button type="button" class="btn-del-single" (click)="deleteItem(item.id, $event)">✕</button>
                </div>
              </div>
            </div>
          </div>

          <div class="panel-bottom-bar" *ngIf="notifService.adminNotifications().length > 0">
            <button class="btn-clear-inbox" (click)="notifService.clearAllAdminNotifications()">مسح كافة التنبيهات</button>
          </div>
        </div>

        <!-- MODE 2: BROADCAST (إرسال إشعار للعملاء) -->
        <div class="panel-body broadcast-body" *ngIf="activeMode === 'broadcast'">
          <div class="broadcast-banner">
            <strong>📢 إرسال إشعار فوري للباحثين والعملاء</strong>
            <p>سيظهر هذا الإشعار في هيدر الموقع ومركز تنبيهات العميل مصحوباً برنين تنبيه فوري.</p>
          </div>

          <!-- Quick Templates -->
          <div class="quick-templates">
            <label class="section-lbl">قوالب سريعة جاهزة للإرسال:</label>
            <div class="templates-chips">
              <button type="button" class="chip-btn" (click)="applyTemplate('eid')">🌸 تهنئة بالعيد</button>
              <button type="button" class="chip-btn" (click)="applyTemplate('semester')">🎓 بدء الفصل الأكاديمي</button>
              <button type="button" class="chip-btn" (click)="applyTemplate('discount')">🎁 خصم 20% خاص</button>
              <button type="button" class="chip-btn" (click)="applyTemplate('turnitin')">🛡️ فحص الأصالة مجاناً</button>
            </div>
          </div>

          <!-- Broadcast Form -->
          <div class="broadcast-form">
            <div class="form-group">
              <label>عنوان الإشعار *</label>
              <input type="text" [(ngModel)]="broadcastModel.title" placeholder="مثال: 🎁 خصم حصري 20% بمناسبة اليوم الوطني" class="form-input" />
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>نوع الإشعار</label>
                <select [(ngModel)]="broadcastModel.type" class="form-select">
                  <option value="broadcast">📢 إعلان عام</option>
                  <option value="discount">🎁 خصم وعرض</option>
                  <option value="welcome">🌸 تهنئة ومكافأة</option>
                  <option value="order_status">📋 متابعة طلبات</option>
                  <option value="system">🔔 تنبيه نظام</option>
                </select>
              </div>
              <div class="form-group half">
                <label>الأيقونة التعبيرية</label>
                <input type="text" [(ngModel)]="broadcastModel.icon" placeholder="مثال: 🎁 أو 🌸 أو 🎓" class="form-input text-center" />
              </div>
            </div>

            <div class="form-group">
              <label>نص وتفاصيل الإشعار *</label>
              <textarea [(ngModel)]="broadcastModel.message" rows="3" placeholder="اكتب نص الرسالة التي ستصل للباحثين بالتفصيل..." class="form-textarea"></textarea>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>نص زر الإجراء (اختياري)</label>
                <input type="text" [(ngModel)]="broadcastModel.actionLabel" placeholder="مثال: استفد من العرض الآن" class="form-input" />
              </div>
              <div class="form-group half">
                <label>الرابط التوجيهي (اختياري)</label>
                <input type="text" [(ngModel)]="broadcastModel.link" placeholder="/services" class="form-input" />
              </div>
            </div>

            <button type="button" class="btn-send-broadcast" (click)="sendBroadcast()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              <span>بث الإشعار الآن لكافة العملاء 🚀</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .admin-notif-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 99999;
      display: flex;
      justify-content: flex-start;
      animation: fadeIn 0.25s ease;
      font-family: var(--font-family-arabic);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .admin-notif-panel {
      width: 100%;
      max-width: 480px;
      height: 100%;
      background: #0A1E16;
      border-left: 1.5px solid rgba(197, 168, 105, 0.35);
      display: flex;
      flex-direction: column;
      box-shadow: -15px 0 50px rgba(0, 0, 0, 0.7);
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .panel-header {
      padding: 1.25rem 1.4rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.02);
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .bell-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(197, 168, 105, 0.18);
      border: 1px solid rgba(197, 168, 105, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
    }

    .panel-header h3 {
      font-size: 1.12rem;
      font-weight: 800;
      color: #FFFFFF !important;
      margin: 0;
    }

    .panel-header p {
      font-size: 0.74rem;
      color: rgba(255, 255, 255, 0.65) !important;
      margin: 2px 0 0 0;
    }

    .btn-close {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .btn-close:hover {
      background: rgba(239, 68, 68, 0.25);
      border-color: rgba(239, 68, 68, 0.4);
      color: #EF4444;
    }

    .mode-tabs {
      display: flex;
      padding: 0.65rem 1rem;
      gap: 0.5rem;
      background: rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .tab-btn {
      flex: 1;
      padding: 0.6rem 0.8rem;
      border-radius: 10px;
      background: transparent;
      border: 1px solid transparent;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
    }

    .tab-btn.active {
      background: rgba(197, 168, 105, 0.2);
      border-color: rgba(197, 168, 105, 0.45);
      color: #FFFFFF;
    }

    .tab-badge {
      background: #EF4444;
      color: #FFFFFF;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 10px;
    }

    .panel-body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
    }

    .inbox-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.85rem;
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.7);
    }

    .btn-text-action {
      background: none;
      border: none;
      color: #DFC698;
      font-size: 0.74rem;
      cursor: pointer;
      font-weight: 700;
      text-decoration: underline;
    }

    .empty-inbox {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 3rem 1.5rem;
    }

    .empty-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      filter: drop-shadow(0 0 16px rgba(197, 168, 105, 0.25));
    }

    .empty-inbox h4 {
      font-size: 1.15rem;
      font-weight: 800;
      color: #FFFFFF !important;
      margin: 0 0 0.5rem 0;
    }

    .empty-inbox p {
      font-size: 0.82rem;
      color: rgba(255, 255, 255, 0.65) !important;
      line-height: 1.6;
    }

    .notif-list {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .admin-notif-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 0.95rem 1rem;
      display: flex;
      gap: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .admin-notif-item:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(197, 168, 105, 0.35);
      transform: translateY(-2px);
    }

    .admin-notif-item.unread {
      background: rgba(197, 168, 105, 0.08);
      border-color: rgba(197, 168, 105, 0.4);
    }

    .item-icon-wrap {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .item-icon-wrap[data-type="new_order"] {
      background: rgba(16, 185, 129, 0.18);
      border-color: rgba(16, 185, 129, 0.35);
    }

    .item-icon-wrap[data-type="new_client"] {
      background: rgba(59, 130, 246, 0.18);
      border-color: rgba(59, 130, 246, 0.35);
    }

    .item-content {
      flex: 1;
      min-width: 0;
    }

    .item-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.3rem;
    }

    .item-tag {
      font-size: 0.65rem;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 4px;
      background: rgba(197, 168, 105, 0.22);
      color: #DFC698;
    }

    .item-time {
      font-size: 0.68rem;
      color: rgba(255, 255, 255, 0.45);
    }

    .unread-pill {
      font-size: 0.62rem;
      font-weight: 800;
      background: #10B981;
      color: #FFFFFF;
      padding: 1px 5px;
      border-radius: 4px;
    }

    .item-title {
      font-size: 0.88rem;
      font-weight: 800;
      color: #FFFFFF !important;
      margin: 0 0 0.3rem 0;
    }

    .item-msg {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.75) !important;
      line-height: 1.5;
      margin: 0 0 0.5rem 0;
    }

    .item-action-hint {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 0.4rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 0.72rem;
      color: #DFC698;
      font-weight: 700;
    }

    .btn-del-single {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      font-size: 0.8rem;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .btn-del-single:hover {
      color: #EF4444;
      background: rgba(239, 68, 68, 0.15);
    }

    .panel-bottom-bar {
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: center;
    }

    .btn-clear-inbox {
      background: none;
      border: none;
      color: #EF4444;
      font-size: 0.76rem;
      cursor: pointer;
      text-decoration: underline;
    }

    /* Broadcast Tab */
    .broadcast-body {
      gap: 1rem;
    }

    .broadcast-banner {
      background: rgba(197, 168, 105, 0.12);
      border: 1px solid rgba(197, 168, 105, 0.3);
      padding: 0.85rem 1rem;
      border-radius: 10px;
    }

    .broadcast-banner strong {
      display: block;
      color: #DFC698;
      font-size: 0.86rem;
      margin-bottom: 0.2rem;
    }

    .broadcast-banner p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.76rem;
      margin: 0;
      line-height: 1.4;
    }

    .section-lbl {
      display: block;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.76rem;
      font-weight: 700;
      margin-bottom: 0.45rem;
    }

    .templates-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
    }

    .chip-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #FFFFFF;
      padding: 0.4rem 0.75rem;
      border-radius: 20px;
      font-size: 0.74rem;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s;
    }

    .chip-btn:hover {
      background: rgba(197, 168, 105, 0.25);
      border-color: #DFC698;
    }

    .broadcast-form {
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
      font-size: 0.76rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.8);
    }

    .form-row {
      display: flex;
      gap: 0.75rem;
    }

    .form-group.half {
      flex: 1;
    }

    .form-input, .form-select, .form-textarea {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 0.55rem 0.85rem;
      color: #FFFFFF;
      font-size: 0.82rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }

    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: #DFC698;
      background: rgba(255, 255, 255, 0.1);
    }

    .form-select option {
      background: #0A1E16;
      color: #FFFFFF;
    }

    .text-center {
      text-align: center;
      font-size: 1.1rem;
    }

    .btn-send-broadcast {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      background: linear-gradient(135deg, #0F5132 0%, #1A6B44 100%);
      color: #FFFFFF;
      border: 1.5px solid rgba(197, 168, 105, 0.45);
      padding: 0.8rem;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(15, 81, 50, 0.45);
      transition: all 0.25s;
      margin-top: 0.5rem;
    }

    .btn-send-broadcast:hover {
      background: linear-gradient(135deg, #125F3B 0%, #208454 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 22px rgba(197, 168, 105, 0.4);
    }
  `]
})
export class AdminNotificationsModalComponent {
  notifService = inject(NotificationService);
  audio = inject(AudioService);

  @Output() tabSelected = new EventEmitter<string>();

  activeMode: 'inbox' | 'broadcast' = 'inbox';

  broadcastModel = {
    title: '',
    message: '',
    type: 'broadcast' as any,
    icon: '📢',
    actionLabel: 'استكشف الخدمات',
    link: '/services'
  };

  setMode(mode: 'inbox' | 'broadcast'): void {
    this.activeMode = mode;
    this.audio.playClick();
  }

  onAdminNotifClick(item: AdminNotification): void {
    this.notifService.markAdminAsRead(item.id);
    this.notifService.closeAdminDrawer();
    if (item.tab) {
      this.tabSelected.emit(item.tab);
    }
  }

  deleteItem(id: string, event: Event): void {
    event.stopPropagation();
    this.notifService.deleteAdminNotification(id);
  }

  applyTemplate(key: string): void {
    this.audio.playClick();
    if (key === 'eid') {
      this.broadcastModel = {
        title: '🌸 تهنئة خاصة بمناسبة العيد المبارك',
        message: 'يسر أسرة منصة أم رهام تهنئتكم بحلول العيد، أعاده الله عليكم باليُمن والبركات والتوفيق العلمي المستمر.',
        type: 'welcome',
        icon: '🌸',
        actionLabel: 'تواصل معنا',
        link: '/contact'
      };
    } else if (key === 'semester') {
      this.broadcastModel = {
        title: '🎓 انطلاق الفصل الدراسي الجديد والبحوث الجامعية',
        message: 'مع انطلاق العام الدراسي، نتيح باقة من الاستشارات المجانية وجلسات التدقيق الأكاديمي مع نخبة المستشارين.',
        type: 'broadcast',
        icon: '🎓',
        actionLabel: 'حجز استشارة',
        link: '/contact'
      };
    } else if (key === 'discount') {
      this.broadcastModel = {
        title: '🎁 كود خصم حصري 20% لفترة محدودة!',
        message: 'استخدم كود الخصم الأكاديمي المميز [EXCELLENCE20] للحصول على تخفيض 20% على إعداد وتدقيق رسائل الماجستير.',
        type: 'discount',
        icon: '🎁',
        actionLabel: 'تطبيق الكوبون',
        link: '/services'
      };
    } else if (key === 'turnitin') {
      this.broadcastModel = {
        title: '🛡️ خدمة فحص الاستلال Turnitin مجاناً 100%',
        message: 'نقدم لك فحصاً دورياً مجانياً لنسبة الاقتباس وفق اشتراطات عمادات الدراسات العليا مع تقرير تفصيلي معتمد.',
        type: 'system',
        icon: '🛡️',
        actionLabel: 'طلب الفحص',
        link: '/services'
      };
    }
  }

  sendBroadcast(): void {
    if (!this.broadcastModel.title.trim() || !this.broadcastModel.message.trim()) {
      alert('يرجى ملء عنوان ونص الإشعار قبل البث');
      return;
    }

    this.notifService.sendClientNotification({
      title: this.broadcastModel.title,
      message: this.broadcastModel.message,
      type: this.broadcastModel.type,
      icon: this.broadcastModel.icon || '📢',
      link: this.broadcastModel.link,
      actionLabel: this.broadcastModel.actionLabel
    });

    this.audio.playSuccess();
    this.notifService.closeAdminDrawer();
    alert('تم بث الإشعار بنجاح إلى جميع الباحثين وزوار المنصة! 🚀');

    // Reset form
    this.broadcastModel = {
      title: '',
      message: '',
      type: 'broadcast',
      icon: '📢',
      actionLabel: 'استكشف الخدمات',
      link: '/services'
    };
  }

  getAdminTypeLabel(type?: string): string {
    switch (type) {
      case 'new_order': return 'طلب خدمة';
      case 'new_client': return 'باحث جديد';
      case 'new_inquiry': return 'استفسار تواصل';
      case 'new_review': return 'تقييم موثق';
      default: return 'تنبيه نظام';
    }
  }

  formatTime(isoString?: string): string {
    if (!isoString) return 'الآن';
    const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diff < 60) return 'منذ لحظات';
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} د`;
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} س`;
    return 'اليوم';
  }
}
