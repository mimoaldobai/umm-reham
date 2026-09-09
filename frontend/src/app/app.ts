import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AudioService } from './core/services/audio.service';
import { AuthService } from './core/services/auth.service';
import { SaudFarahAgentService } from './core/services/saud-farah-agent.service';
import { AdminLoginModalComponent } from './shared/components/admin-login-modal/admin-login-modal.component';
import { SaudFarahWelcomeComponent } from './shared/components/saud-farah-welcome/saud-farah-welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent, 
    AdminLoginModalComponent,
    SaudFarahWelcomeComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  router = inject(Router);
  audio = inject(AudioService);
  authService = inject(AuthService);
  agentService = inject(SaudFarahAgentService);

  isAdminRoute(): boolean {
    return this.router.url ? this.router.url.startsWith('/admin') : false;
  }
}


