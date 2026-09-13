const fs = require('fs');

// 1. Fix admin-dashboard.component.ts
const adminPath = 'c:/Users/USERW/Desktop/om reham/frontend/src/app/features/admin/admin-dashboard.component.ts';
let adminContent = fs.readFileSync(adminPath, 'utf8');

adminContent = adminContent.replace(
  `this.notifService.sendBroadcastNotification({`,
  `this.notifService.sendAdminNotification({`
);

fs.writeFileSync(adminPath, adminContent, 'utf8');

// 2. Fix home.component.ts
const homePath = 'c:/Users/USERW/Desktop/om reham/frontend/src/app/features/home/home.component.ts';
let homeContent = fs.readFileSync(homePath, 'utf8');

homeContent = homeContent.replace(
  `reviewsRow1 = [`,
  `reviewsRow1: Array<{ quote: string; name: string; subject: string; emoji: string; avatarBg: string; isAudio?: boolean; audioUrl?: string; imageUrl?: string; }> = [`
);

homeContent = homeContent.replace(
  `reviewsRow2 = [`,
  `reviewsRow2: Array<{ quote: string; name: string; subject: string; emoji: string; avatarBg: string; isAudio?: boolean; audioUrl?: string; imageUrl?: string; }> = [`
);

fs.writeFileSync(homePath, homeContent, 'utf8');
console.log('Fixed build TS types.');
