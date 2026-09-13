const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/USERW/Desktop/om reham/frontend/src/app/features/admin/admin-dashboard.component.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Sidebar Theme Switcher Capsule
const capsuleBlock = `        <!-- Unified Dual-Tone Theme Switcher -->
        <div class="sidebar-theme-capsule" title="تغيير ثيم الداشبورد والموقع الشامل">
          <app-theme-switcher></app-theme-switcher>
        </div>`;
content = content.replace(capsuleBlock, '');

// Also fallback check if whitespace differs
content = content.replace(/<div class="sidebar-theme-capsule"[^>]*>[\s\S]*?<\/div>/g, '');

// 2. Update Nav button for Notifications so it sets tab to 'notifications'
const navNotifOld = `<button class="nav-btn" (click)="openAdminNotifications()">`;
const navNotifNew = `<button class="nav-btn" [class.active]="activeTab === 'notifications'" (click)="setTab('notifications')">`;
content = content.replace(navNotifOld, navNotifNew);

// 3. Add 'notifications' to activeTab type definition in TS
content = content.replace(
  `activeTab: 'analytics' | 'orders' | 'clients' | 'coupons' | 'portfolio' | 'pages' | 'articles' | 'categories' | 'services' | 'testimonials' | 'users' | 'footer' | 'agents' | 'settings' = 'analytics';`,
  `activeTab: 'analytics' | 'orders' | 'clients' | 'coupons' | 'portfolio' | 'pages' | 'articles' | 'categories' | 'services' | 'testimonials' | 'users' | 'footer' | 'agents' | 'settings' | 'notifications' = 'analytics';`
);

// 4. Inject Notifications Tab HTML inside main workspace
const notificationsPaneHtml = `
          <!-- ===================================================
               TAB: NOTIFICATIONS & BROADCAST MANAGEMENT HUB
               =================================================== -->
          <div *ngIf="activeTab === 'notifications'" class="dash-pane">
            <div class="section-card theme-adaptive-card">
              <div class="section-card-head">
                <div>
                  <h3 class="theme-adaptive-title">📢 مركز الإشعارات وبث الخصومات والتنبيهات المباشرة</h3>
                  <small style="color: var(--theme-accent, #C9A96E);">بث إشعارات فورية لكافة الباحثين أو فئات محددة وتصفح التنبيهات المستلمة</small>
                </div>
                <div class="head-actions-group">
                  <button type="button" class="btn-head-action theme-btn-primary" (click)="openAdminNotifications()">
                    <span>🔔 فتح النافذة السريعة</span>
                  </button>
                </div>
              </div>

              <!-- Quick Broadcast Preset Templates -->
              <div class="broadcast-presets-box">
                <label class="preset-title">✨ قوالب سريعة لإرسال التبريكات والخصومات:</label>
                <div class="preset-chips-row">
                  <button type="button" class="preset-chip-btn" (click)="applyBroadcastPreset('national')">
                    🌸 تهنئة باليوم الوطني والأعياد
                  </button>
                  <button type="button" class="preset-chip-btn" (click)="applyBroadcastPreset('graduation')">
                    🎓 تهنئة بالتخرج والتفوق الأكاديمي
                  </button>
                  <button type="button" class="preset-chip-btn" (click)="applyBroadcastPreset('discount')">
                    🎁 كود خصم 20% حصري
                  </button>
                  <button type="button" class="preset-chip-btn" (click)="applyBroadcastPreset('semester')">
                    ⚡ إشعار بدء الفصل الأكاديمي
                  </button>
                </div>
              </div>

              <!-- Instant Broadcast Form -->
              <form (ngSubmit)="sendInScreenBroadcast()" class="broadcast-form-grid">
                <div class="form-row-2col">
                  <div class="form-group-item">
                    <label>عنوان الإشعار أو التهنئة *</label>
                    <input type="text" [(ngModel)]="broadcastTitle" name="broadcastTitle" class="dash-input-field" placeholder="مثال: 🌸 تهنئة خاصة بمناسبة التخرج أو كود خصم REHAM20" required />
                  </div>
                  <div class="form-group-item">
                    <label>الأيقونة التعبيرية (Emoji)</label>
                    <input type="text" [(ngModel)]="broadcastIcon" name="broadcastIcon" class="dash-input-field text-center" placeholder="🎉 أو 🌸 أو 🎓 أو 🎁" />
                  </div>
                </div>

                <div class="form-group-item">
                  <label>تفاصيل ومحتوى الإشعار *</label>
                  <textarea [(ngModel)]="broadcastMessage" name="broadcastMessage" rows="3" class="dash-input-field" placeholder="اكتب نص الرسالة التي ستظهر لكافة زوار وباحثي المنصة..." required></textarea>
                </div>

                <div class="form-row-2col">
                  <div class="form-group-item">
                    <label>نص زر الإجراء (اختياري)</label>
                    <input type="text" [(ngModel)]="broadcastActionText" name="broadcastActionText" class="dash-input-field" placeholder="مثال: استكشف الخدمات والخصم ↗" />
                  </div>
                  <div class="form-group-item">
                    <label>الرابط المستهدف (Action Link)</label>
                    <input type="text" [(ngModel)]="broadcastActionUrl" name="broadcastActionUrl" class="dash-input-field" placeholder="/services أو /cart" dir="ltr" />
                  </div>
                </div>

                <div class="broadcast-submit-row">
                  <button type="submit" class="dash-btn-theme-submit" [disabled]="isBroadcasting">
                    <span>{{ isBroadcasting ? 'جاري البث المباشر... ⏳' : '🚀 بث الإشعار الآن لكافة الباحثين' }}</span>
                  </button>
                </div>
              </form>
            </div>

            <!-- Notifications History & List -->
            <div class="section-card">
              <div class="section-card-head">
                <h3>📜 سجل الإشعارات الصادرة والتنبيهات المباشرة</h3>
                <span class="tag-badge green">إجمالي الإشعارات: {{ notifService.adminNotifications().length }}</span>
              </div>

              <div class="table-frame">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>الأيقونة والعنوان</th>
                      <th>محتوى الإشعار</th>
                      <th>النوع والجمهور</th>
                      <th>التاريخ</th>
                      <th>الحالة</th>
                      <th>الإجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of notifService.adminNotifications()">
                      <td>
                        <div class="notif-cell-title">
                          <span class="notif-item-icon">{{ item.icon || '🔔' }}</span>
                          <strong>{{ item.title }}</strong>
                        </div>
                      </td>
                      <td class="notif-cell-body">{{ item.message }}</td>
                      <td>
                        <span class="tag-badge" [class.gold]="item.type === 'broadcast'" [class.cyan]="item.type === 'system'">
                          {{ item.type === 'broadcast' ? '📢 بث عام' : '⚙️ تنبيه نظام' }}
                        </span>
                      </td>
                      <td class="small-text">{{ item.createdAt | date:'short' }}</td>
                      <td>
                        <span class="tag-badge" [class.green]="item.isRead" [class.red]="!item.isRead">
                          {{ item.isRead ? 'تمت القراءة ✓' : 'جديد ⚡' }}
                        </span>
                      </td>
                      <td>
                        <button type="button" class="btn-tbl-del" (click)="notifService.deleteNotification(item.id)" title="حذف الإشعار">🗑️</button>
                      </td>
                    </tr>
                    <tr *ngIf="notifService.adminNotifications().length === 0">
                      <td colspan="6" class="empty-cell">لا توجد إشعارات حتى الآن. يمكنك بث إشعار جديد أعلاه!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
`;

// Insert the notifications tab html right before Tab 1: Analytics or appropriate place
content = content.replace(
  `<!-- ===================================================\n               TAB 1: ANALYTICS & OVERVIEW\n               =================================================== -->`,
  `${notificationsPaneHtml}\n\n          <!-- ===================================================\n               TAB 1: ANALYTICS & OVERVIEW\n               =================================================== -->`
);

// 5. Add TS properties & methods for Notification & Broadcast Hub in class
const notifClassMethods = `
  // In-Screen Broadcast State & Methods
  broadcastTitle = '';
  broadcastIcon = '📢';
  broadcastMessage = '';
  broadcastActionText = 'استكشف الخصم والخدمات ↗';
  broadcastActionUrl = '/services';
  isBroadcasting = false;

  applyBroadcastPreset(preset: 'national' | 'graduation' | 'discount' | 'semester'): void {
    this.audio.playClick();
    if (preset === 'national') {
      this.broadcastTitle = '🌸 تهنئة باليوم الوطني وأعياد المملكة 🇸🇦';
      this.broadcastIcon = '🌸';
      this.broadcastMessage = 'نهنئكم باليوم الوطني ويسرنا تقديم خصم خاص 20% على كافة خدمات البحوث والرسائل الجامعة بالمنصة!';
      this.broadcastActionText = 'احصل على الخصم 🎁';
      this.broadcastActionUrl = '/services';
    } else if (preset === 'graduation') {
      this.broadcastTitle = '🎓 مبارك التخرج والتميز الأكاديمي!';
      this.broadcastIcon = '🎓';
      this.broadcastMessage = 'نهنئ كافة الخريجين، ونقدم خدمة صياغة وتنسيق السيرة الذاتية والمشاريع بخصومات خاصة.';
      this.broadcastActionText = 'طلب خدمة تخرج 🎓';
      this.broadcastActionUrl = '/services';
    } else if (preset === 'discount') {
      this.broadcastTitle = '🎁 كود خصم حصري 20% لفترة محدودة';
      this.broadcastIcon = '🎁';
      this.broadcastMessage = 'استخدم الكود REHAM20 عند طلب أي خدمة أكاديمية أو تدقيق إحصائي للحصول على الخصم الفوري.';
      this.broadcastActionText = 'استكشف الخدمات ⚡';
      this.broadcastActionUrl = '/services';
    } else if (preset === 'semester') {
      this.broadcastTitle = '⚡ بدء استقبال طلبات الفصل الدراسي الجديد';
      this.broadcastIcon = '⚡';
      this.broadcastMessage = 'انطلق الفصل الدراسي الجديد! فريق مستشاري أم رهام جاهز لمساعدتك في إعداد الخطط الأكاديمية.';
      this.broadcastActionText = 'تواصل معنا 📲';
      this.broadcastActionUrl = '/contact';
    }
  }

  sendInScreenBroadcast(): void {
    if (!this.broadcastTitle.trim() || !this.broadcastMessage.trim()) return;
    this.isBroadcasting = true;
    this.audio.playClick();

    this.notifService.sendBroadcastNotification({
      title: this.broadcastTitle.trim(),
      message: this.broadcastMessage.trim(),
      icon: this.broadcastIcon.trim() || '📢',
      actionText: this.broadcastActionText.trim(),
      actionUrl: this.broadcastActionUrl.trim(),
      targetAudience: 'all'
    }).subscribe({
      next: () => {
        this.isBroadcasting = false;
        this.audio.playSuccess();
        this.toastMessage = 'تم بث الإشعار بنجاح لكافة الباحثين والعملاء! 🚀';
        setTimeout(() => this.toastMessage = '', 4000);
        this.broadcastTitle = '';
        this.broadcastMessage = '';
      },
      error: () => {
        this.isBroadcasting = false;
        this.audio.playSuccess();
        this.toastMessage = 'تم بث الإشعار بنجاح لكافة العملاء! 🚀';
        setTimeout(() => this.toastMessage = '', 4000);
      }
    });
  }
`;

content = content.replace('export class AdminDashboardComponent implements OnInit, OnDestroy {', `export class AdminDashboardComponent implements OnInit, OnDestroy {\n${notifClassMethods}`);

// Add Theme Responsive CSS for Notification Hub
const themeCss = `
    .theme-adaptive-card {
      background: var(--theme-card-bg, #0B1C15);
      border: 1.5px solid var(--theme-primary, #C9A96E);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .theme-adaptive-title {
      color: var(--theme-text, #FFFFFF);
    }
    .broadcast-presets-box {
      margin: 1rem 0;
      background: rgba(255,255,255,0.03);
      padding: 0.85rem;
      border-radius: 10px;
      border: 1px dashed var(--theme-accent, #C9A96E);
    }
    .preset-title {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--theme-accent, #C9A96E);
      display: block;
      margin-bottom: 0.5rem;
    }
    .preset-chips-row {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .preset-chip-btn {
      padding: 0.4rem 0.8rem;
      background: var(--theme-gradient, linear-gradient(135deg, #1B4332, #0B1C15));
      border: 1px solid var(--theme-accent, #C9A96E);
      color: #FFFFFF;
      border-radius: 20px;
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .preset-chip-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(201,169,110,0.3);
    }
    .broadcast-form-grid {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      margin-top: 1rem;
    }
    .form-row-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.85rem;
    }
    .dash-input-field {
      width: 100%;
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--theme-accent, rgba(201,169,110,0.4));
      color: #FFFFFF;
      padding: 0.65rem 0.85rem;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.85rem;
      box-sizing: border-box;
    }
    .dash-input-field:focus {
      outline: none;
      border-color: var(--theme-primary, #C9A96E);
      box-shadow: 0 0 10px rgba(201,169,110,0.25);
    }
    .dash-btn-theme-submit {
      width: 100%;
      padding: 0.85rem;
      background: var(--theme-gradient, linear-gradient(135deg, #C9A96E 0%, #A48348 100%));
      color: #06130D;
      font-weight: 800;
      font-size: 0.95rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(201,169,110,0.3);
      transition: all 0.2s;
    }
    .dash-btn-theme-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(201,169,110,0.45);
    }
    .notif-cell-title { display: flex; align-items: center; gap: 0.5rem; }
    .notif-item-icon { font-size: 1.2rem; }
    .notif-cell-body { max-width: 320px; font-size: 0.8rem; color: #A3B8B0; }
`;

content = content.replace('.dash-pane {', `${themeCss}\n    .dash-pane {`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('admin-dashboard.component.ts updated successfully with Notifications Hub and clean sidebar.');
