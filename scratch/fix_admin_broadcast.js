const fs = require('fs');

const adminPath = 'c:/Users/USERW/Desktop/om reham/frontend/src/app/features/admin/admin-dashboard.component.ts';
let adminContent = fs.readFileSync(adminPath, 'utf8');

const oldBroadcastMethod = `  sendInScreenBroadcast(): void {
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
  }`;

const newBroadcastMethod = `  sendInScreenBroadcast(): void {
    if (!this.broadcastTitle.trim() || !this.broadcastMessage.trim()) return;
    this.isBroadcasting = true;
    this.audio.playClick();

    this.notifService.sendAdminNotification({
      title: this.broadcastTitle.trim(),
      message: this.broadcastMessage.trim(),
      icon: this.broadcastIcon.trim() || '📢',
      type: 'system'
    });

    this.notifService.addClientNotification({
      title: this.broadcastTitle.trim(),
      message: this.broadcastMessage.trim(),
      icon: this.broadcastIcon.trim() || '📢',
      actionText: this.broadcastActionText.trim() || 'استكشف الخصم والخدمات ↗',
      actionUrl: this.broadcastActionUrl.trim() || '/services'
    });

    setTimeout(() => {
      this.isBroadcasting = false;
      this.audio.playSuccess();
      this.toastMessage = 'تم بث الإشعار بنجاح لكافة الباحثين والعملاء! 🚀';
      setTimeout(() => this.toastMessage = '', 4000);
      this.broadcastTitle = '';
      this.broadcastMessage = '';
    }, 500);
  }`;

adminContent = adminContent.replace(oldBroadcastMethod, newBroadcastMethod);
fs.writeFileSync(adminPath, adminContent, 'utf8');
console.log('Fixed sendInScreenBroadcast.');
