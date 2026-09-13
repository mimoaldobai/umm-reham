import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-live-notification-toast',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div 
      class="live-toast-wrapper" 
      *ngIf="notifService.activeToast() as toast"
      dir="rtl"
      (click)="openDrawer()">
      
      <div class="live-toast-card">
        <div class="toast-icon-wrap">
          <span>{{ toast.icon || '🔔' }}</span>
        </div>

        <div class="toast-content">
          <div class="toast-head">
            <span class="toast-badge">إشعار فوري جديد ✨</span>
            <button type="button" class="btn-dismiss" (click)="dismiss($event)" title="إغلاق">✕</button>
          </div>
          <strong class="toast-title">{{ toast.title }}</strong>
          <p class="toast-msg">{{ toast.message }}</p>
          <div class="toast-actions" *ngIf="toast.link">
            <a [routerLink]="toast.link" class="toast-link" (click)="$event.stopPropagation(); notifService.dismissToast()">
              <span>{{ toast.actionLabel || 'عرض التفاصيل' }}</span>
              <span>←</span>
            </a>
          </div>
        </div>
      </div>

      <div class="toast-progress-bar"></div>
    </div>
  `,
  styles: [`
    .live-toast-wrapper {
      position: fixed;
      top: 85px;
      left: 24px;
      z-index: 999999;
      max-width: 380px;
      width: calc(100vw - 48px);
      background: #0A1E16;
      border: 1.5px solid rgba(201, 169, 110, 0.45);
      border-radius: 14px;
      box-shadow: 0 16px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(15, 81, 50, 0.35);
      cursor: pointer;
      overflow: hidden;
      animation: slideInToast 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: var(--font-family-arabic);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .live-toast-wrapper:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(197, 168, 105, 0.3);
    }

    @keyframes slideInToast {
      from { transform: translateX(-110%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .live-toast-card {
      padding: 0.95rem 1.1rem;
      display: flex;
      align-items: flex-start;
      gap: 0.85rem;
    }

    .toast-icon-wrap {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(197, 168, 105, 0.2);
      border: 1.5px solid rgba(197, 168, 105, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      flex-shrink: 0;
      box-shadow: 0 0 16px rgba(197, 168, 105, 0.25);
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.25rem;
    }

    .toast-badge {
      font-size: 0.68rem;
      font-weight: 800;
      color: #DFC698;
      background: rgba(197, 168, 105, 0.15);
      padding: 1px 6px;
      border-radius: 4px;
    }

    .btn-dismiss {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      font-size: 0.85rem;
      padding: 0 4px;
      transition: color 0.2s;
    }

    .btn-dismiss:hover {
      color: #EF4444;
    }

    .toast-title {
      display: block;
      font-size: 0.9rem;
      font-weight: 800;
      color: #FFFFFF !important;
      margin-bottom: 0.25rem;
      line-height: 1.3;
    }

    .toast-msg {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.82) !important;
      line-height: 1.45;
      margin: 0 0 0.45rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .toast-actions {
      display: flex;
      justify-content: flex-start;
    }

    .toast-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: #DFC698;
      font-size: 0.76rem;
      font-weight: 800;
      text-decoration: none;
    }

    .toast-link:hover {
      color: #FFFFFF;
    }

    .toast-progress-bar {
      height: 3px;
      background: linear-gradient(90deg, #10B981, #C5A869);
      width: 100%;
      animation: toastProgress 5.5s linear forwards;
    }

    @keyframes toastProgress {
      from { width: 100%; }
      to { width: 0%; }
    }

    @media (max-width: 480px) {
      .live-toast-wrapper {
        top: 68px;
        left: 12px;
        right: 12px;
        width: auto;
        max-width: none;
      }
    }
  `]
})
export class LiveNotificationToastComponent {
  notifService = inject(NotificationService);

  openDrawer(): void {
    this.notifService.dismissToast();
    this.notifService.toggleClientDrawer();
  }

  dismiss(event: Event): void {
    event.stopPropagation();
    this.notifService.dismissToast();
  }
}
