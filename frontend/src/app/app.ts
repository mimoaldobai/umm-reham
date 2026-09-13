import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AudioService } from './core/services/audio.service';
import { AuthService } from './core/services/auth.service';
import { SaudFarahAgentService } from './core/services/saud-farah-agent.service';
import { AdminLoginModalComponent } from './shared/components/admin-login-modal/admin-login-modal.component';
import { SaudFarahWelcomeComponent } from './shared/components/saud-farah-welcome/saud-farah-welcome.component';
import { LiveNotificationToastComponent } from './shared/components/live-notification-toast/live-notification-toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterModule,
    HeaderComponent, 
    FooterComponent, 
    AdminLoginModalComponent,
    SaudFarahWelcomeComponent,
    LiveNotificationToastComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  router = inject(Router);
  audio = inject(AudioService);
  authService = inject(AuthService);
  agentService = inject(SaudFarahAgentService);

  constructor() {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          requestAnimationFrame(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          });
          setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }, 60);
        }
      }
    });
  }

  onNavTabClick(): void {
    this.audio.playClick();
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  isAdminRoute(): boolean {
    return this.router.url ? this.router.url.startsWith('/admin') : false;
  }

  toggleAccessibility(): void {
    this.audio.playClick();
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      if (html.classList.contains('accessible-large-font')) {
        html.classList.remove('accessible-large-font');
      } else {
        html.classList.add('accessible-large-font');
      }
    }
  }
}


