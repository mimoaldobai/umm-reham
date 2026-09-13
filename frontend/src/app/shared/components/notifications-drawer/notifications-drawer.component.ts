import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService, AppNotification } from '../../../core/services/notification.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-notifications-drawer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Backdrop Overlay -->
    <div 
      class="notif-backdrop" 
      *ngIf="notifService.isClientDrawerOpen()"
      (click)="notifService.closeClientDrawer()"
      dir="rtl">
      
      <!-- Drawer Panel -->
      <div class="notif-panel glass-panel" (click)="$event.stopPropagation()">
        
        <!-- Header -->
        <div class="notif-header">
          <div class="notif-header-title">
            <div class="bell-glow-icon">🔔</div>
            <div>
              <h3>مركز التنبيهات الأكاديمية</h3>
              <p>متابعة فورية لحالات الطلبات، الخصومات ورسائل المنصة</p>
            </div>
          </div>
          <button class="btn-close-notif" (click)="notifService.closeClientDrawer()" title="إغلاق">✕</button>
        </div>

        <!-- Filter and Actions Row -->
        <div class="notif-actions-bar" *ngIf="notifService.clientNotifications().length > 0">
          <div class="notif-count-badge">
            <span>لديك <strong>{{ notifService.clientUnreadCount() }}</strong> إشعار غير مقروء</span>
          </div>
          <button 
            type="button" 
            class="btn-mark-all" 
            *ngIf="notifService.clientUnreadCount() > 0"
            (click)="notifService.markAllClientAsRead()">
            ✓ تحديد الكل كمقروء
          </button>
        </div>

        <!-- Empty State -->
        <div class="notif-empty" *ngIf="notifService.clientNotifications().length === 0">
          <div class="empty-icon-glow">🔔</div>
          <h4>لا توجد إشعارات حالياً</h4>
          <p>جميع إشعاراتك ومستجدات أبحاثك وخصوماتك الخاصة ستظهر هنا فور إرسالها.</p>
          <a routerLink="/services" class="btn-browse-services" (click)="notifService.closeClientDrawer()">
            <span>استكشف عوالم وخدمات أم رهام</span>
            <span>←</span>
          </a>
        </div>

        <!-- Notifications Deck -->
        <div class="notif-deck" *ngIf="notifService.clientNotifications().length > 0">
          <div 
            *ngFor="let n of notifService.clientNotifications()" 
            class="notif-card"
            [class.unread]="!n.isRead"
            (click)="onNotificationClick(n)">
            
            <div class="notif-card-icon-wrap" [attr.data-type]="n.type">
              <span>{{ n.icon || '🔔' }}</span>
            </div>

            <div class="notif-card-body">
              <div class="notif-card-head">
                <span class="notif-type-pill" [attr.data-type]="n.type">{{ getTypeLabel(n.type) }}</span>
                <span class="notif-time">{{ formatTime(n.createdAt) }}</span>
                <span class="unread-dot" *ngIf="!n.isRead" title="غير مقروء"></span>
              </div>

              <h4 class="notif-card-title">{{ n.title }}</h4>
              <p class="notif-card-msg">{{ n.message }}</p>

              <div class="notif-card-footer" *ngIf="n.link || n.actionLabel">
                <a *ngIf="n.link" [routerLink]="n.link" class="btn-notif-action" (click)="notifService.closeClientDrawer()">
                  <span>{{ n.actionLabel || 'عرض التفاصيل' }}</span>
                  <span>←</span>
                </a>
                <button type="button" class="btn-delete-notif" (click)="deleteNotif(n.id, $event)" title="حذف الإشعار">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="18" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="notif-footer" *ngIf="notifService.clientNotifications().length > 0">
          <button type="button" class="btn-clear-all" (click)="notifService.clearAllClientNotifications()">
            <span>مسح كافة الإشعارات</span>
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .notif-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(4, 12, 8, 0.72);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
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

    .notif-panel {
      width: 100%;
      max-width: 440px;
      height: 100%;
      background: #0C1E17;
      border-left: 1.5px solid rgba(201, 169, 110, 0.35);
      display: flex;
      flex-direction: column;
      box-shadow: -15px 0 50px rgba(0, 0, 0, 0.65);
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .notif-header {
      padding: 1.25rem 1.4rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.02);
    }

    .notif-header-title {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .bell-glow-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(201, 169, 110, 0.15);
      border: 1px solid rgba(201, 169, 110, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      box-shadow: 0 0 16px rgba(201, 169, 110, 0.2);
    }

    .notif-header h3 {
      font-size: 1.12rem;
      font-weight: 800;
      color: #FFFFFF !important;
      margin: 0;
    }

    .notif-header p {
      font-size: 0.76rem;
      color: rgba(255, 255, 255, 0.65) !important;
      margin: 2px 0 0 0;
    }

    .btn-close-notif {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #FFFFFF;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .btn-close-notif:hover {
      background: rgba(239, 68, 68, 0.25);
      border-color: rgba(239, 68, 68, 0.4);
      color: #EF4444;
    }

    .notif-actions-bar {
      padding: 0.65rem 1.25rem;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .notif-count-badge span {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.8);
    }

    .notif-count-badge strong {
      color: #DFC698;
    }

    .btn-mark-all {
      background: none;
      border: none;
      color: #DFC698;
      font-size: 0.74rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: underline;
      transition: color 0.2s;
    }

    .btn-mark-all:hover {
      color: #FFFFFF;
    }

    /* Empty State */
    .notif-empty {
      flex: 1;
      padding: 3rem 1.8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .empty-icon-glow {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      filter: drop-shadow(0 0 20px rgba(201, 169, 110, 0.3));
    }

    .notif-empty h4 {
      font-size: 1.15rem;
      font-weight: 800;
      color: #FFFFFF !important;
      margin-bottom: 0.5rem;
    }

    .notif-empty p {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.65) !important;
      line-height: 1.6;
      margin-bottom: 1.75rem;
    }

    .btn-browse-services {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #0F5132 0%, #1A6B44 100%);
      color: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.4);
      text-decoration: none;
      font-weight: 700;
      font-size: 0.9rem;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(15, 81, 50, 0.4);
      transition: all 0.2s;
    }

    .btn-browse-services:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(15, 81, 50, 0.5);
    }

    /* Deck */
    .notif-deck {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .notif-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 0.95rem 1rem;
      display: flex;
      gap: 0.85rem;
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
    }

    .notif-card:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(201, 169, 110, 0.3);
      transform: translateY(-2px);
    }

    .notif-card.unread {
      background: rgba(201, 169, 110, 0.06);
      border-color: rgba(201, 169, 110, 0.35);
    }

    .notif-card-icon-wrap {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .notif-card-icon-wrap[data-type="order_status"] {
      background: rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.3);
    }

    .notif-card-icon-wrap[data-type="discount"] {
      background: rgba(234, 179, 8, 0.15);
      border-color: rgba(234, 179, 8, 0.3);
    }

    .notif-card-icon-wrap[data-type="broadcast"] {
      background: rgba(168, 85, 247, 0.15);
      border-color: rgba(168, 85, 247, 0.3);
    }

    .notif-card-body {
      flex: 1;
      min-width: 0;
    }

    .notif-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.35rem;
    }

    .notif-type-pill {
      font-size: 0.65rem;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 4px;
      background: rgba(201, 169, 110, 0.2);
      color: #DFC698;
    }

    .notif-time {
      font-size: 0.68rem;
      color: rgba(255, 255, 255, 0.45);
    }

    .unread-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 6px #10B981;
    }

    .notif-card-title {
      font-size: 0.88rem;
      font-weight: 800;
      color: #FFFFFF !important;
      margin: 0 0 0.3rem 0;
      line-height: 1.35;
    }

    .notif-card-msg {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.72) !important;
      line-height: 1.5;
      margin: 0 0 0.65rem 0;
    }

    .notif-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 0.45rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .btn-notif-action {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: #DFC698;
      font-size: 0.75rem;
      font-weight: 700;
      text-decoration: none;
      transition: color 0.2s;
    }

    .btn-notif-action:hover {
      color: #FFFFFF;
    }

    .btn-delete-notif {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.35);
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .btn-delete-notif:hover {
      color: #EF4444;
      background: rgba(239, 68, 68, 0.15);
    }

    .notif-footer {
      padding: 0.85rem 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.15);
      display: flex;
      justify-content: center;
    }

    .btn-clear-all {
      background: none;
      border: none;
      color: #EF4444;
      font-size: 0.78rem;
      cursor: pointer;
      font-weight: 700;
      text-decoration: underline;
    }
  `]
})
export class NotificationsDrawerComponent {
  notifService = inject(NotificationService);
  audio = inject(AudioService);

  onNotificationClick(n: AppNotification): void {
    if (!n.isRead) {
      this.notifService.markClientAsRead(n.id);
    }
  }

  deleteNotif(id: string, event: Event): void {
    event.stopPropagation();
    this.notifService.deleteClientNotification(id);
  }

  getTypeLabel(type?: string): string {
    switch (type) {
      case 'order_status': return 'حالة الطلب';
      case 'discount': return 'خصم خاص 🎁';
      case 'welcome': return 'ترحيب ومكافأة';
      case 'broadcast': return 'إعلان عام 📢';
      default: return 'تنبيه نظام';
    }
  }

  formatTime(isoString?: string): string {
    if (!isoString) return 'الآن';
    const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diff < 60) return 'منذ لحظات';
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
    return 'منذ يوم أو أكثر';
  }
}
